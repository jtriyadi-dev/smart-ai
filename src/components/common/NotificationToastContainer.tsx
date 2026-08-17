import React, { useState, useEffect } from 'react';
import { AppNotification, NotificationType } from '../../types';
import { NotificationService } from '../../services/NotificationService';
import { useRouter } from '../../lib/router';
import {
  Users,
  Building2,
  FileText,
  DollarSign,
  Receipt,
  FolderKanban,
  LifeBuoy,
  ShieldAlert,
  Bell,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const NotificationToastContainer: React.FC = () => {
  const { navigate } = useRouter();
  const [toasts, setToasts] = useState<AppNotification[]>([]);

  useEffect(() => {
    // Subscribe to realtime notification events
    const unsubscribe = NotificationService.subscribe((notification) => {
      setToasts((prev) => [notification, ...prev.slice(0, 3)]); // Keep max 4 active toasts

      // Auto dismiss after 7 seconds unless it is critical
      if (notification.priority !== 'CRITICAL') {
        setTimeout(() => {
          setToasts((current) => current.filter((t) => t.id !== notification.id));
        }, 7000);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToastClick = (toast: AppNotification) => {
    NotificationService.markAsRead(toast.id);
    dismissToast(toast.id);
    if (toast.actionUrl) {
      navigate(toast.actionUrl);
    }
  };

  if (toasts.length === 0) return null;

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'NEW_LEAD':
        return <Users className="w-4 h-4 text-cyan-400" />;
      case 'NEW_CUSTOMER':
        return <Building2 className="w-4 h-4 text-indigo-400" />;
      case 'PROPOSAL':
        return <FileText className="w-4 h-4 text-amber-400" />;
      case 'QUOTATION':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'PAYMENT':
        return <Receipt className="w-4 h-4 text-teal-400" />;
      case 'PROJECT_UPDATE':
        return <FolderKanban className="w-4 h-4 text-blue-400" />;
      case 'SUPPORT_TICKET':
        return <LifeBuoy className="w-4 h-4 text-rose-400" />;
      case 'SYSTEM':
        return <ShieldAlert className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 transform translate-y-0 opacity-100 flex flex-col gap-2 ${
            toast.priority === 'CRITICAL'
              ? 'bg-rose-950/95 border-rose-600/80 shadow-rose-900/30'
              : 'bg-slate-900/95 border-purple-500/40 shadow-purple-950/40'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center">
                {getTypeIcon(toast.type)}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                {toast.category}
              </span>
              {toast.priority === 'CRITICAL' && (
                <span className="px-1.5 py-0.2 rounded bg-rose-900 text-rose-200 text-[9px] font-mono font-bold animate-pulse">
                  CRITICAL
                </span>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Tutup Notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div>
            <h4 className="text-xs font-bold text-white font-display leading-snug">{toast.title}</h4>
            <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">{toast.message}</p>
          </div>

          {/* Action CTA */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 mt-1">
            <span className="text-[9px] font-mono text-slate-500">Baru saja</span>
            <button
              onClick={() => handleToastClick(toast)}
              className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 font-mono transition"
            >
              <span>Buka Detail</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
