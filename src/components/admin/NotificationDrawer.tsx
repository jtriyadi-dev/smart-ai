import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  CheckCheck,
  ExternalLink,
  ShieldAlert,
  FileText,
  Users,
  DollarSign,
  Building2,
  Receipt,
  FolderKanban,
  LifeBuoy,
  Volume2,
  VolumeX,
  ArrowRight
} from 'lucide-react';
import { NotificationService } from '../../services/NotificationService';
import { AppNotification, NotificationType } from '../../types';
import { useRouter } from '../../lib/router';
import { RBACService } from '../../services/RBACService';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCount: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose, onUpdateCount }) => {
  const { navigate } = useRouter();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const currentUser = RBACService.getCurrentUser();

  const loadNotifs = () => {
    const list = NotificationService.getNotifications({
      role: currentUser.role,
      tenantId: (currentUser as any).companyId,
      userId: currentUser.id,
      status: filter === 'UNREAD' ? 'UNREAD' : 'ALL'
    });
    setNotifications(list);
    const prefs = NotificationService.getPreferences(currentUser.id, currentUser.role);
    setSoundEnabled(prefs.soundEnabled);
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifs();
    }
  }, [isOpen, filter]);

  if (!isOpen) return null;

  const handleMarkRead = (id: string) => {
    NotificationService.markAsRead(id);
    loadNotifs();
    onUpdateCount();
  };

  const handleMarkAllRead = () => {
    NotificationService.markAllAsRead({
      role: currentUser.role,
      tenantId: (currentUser as any).companyId,
      userId: currentUser.id
    });
    loadNotifs();
    onUpdateCount();
  };

  const handleNavigate = (link?: string, id?: string) => {
    if (id) NotificationService.markAsRead(id);
    onUpdateCount();
    if (link) navigate(link);
    onClose();
  };

  const handleToggleSound = () => {
    const prefs = NotificationService.getPreferences(currentUser.id, currentUser.role);
    prefs.soundEnabled = !prefs.soundEnabled;
    NotificationService.savePreferences(prefs);
    setSoundEnabled(prefs.soundEnabled);
  };

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
        return <Bell className="w-4 h-4 text-purple-400" />;
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#080d1a] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-800/60">
              <Bell className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Notification Center</h3>
              <p className="text-[10px] font-mono text-slate-400">Pusat Alert & Pemberitahuan Real-time</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className={`p-1.5 rounded-lg border transition ${
                soundEnabled
                  ? 'bg-purple-950/60 border-purple-700 text-purple-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Suara Notifikasi: ON' : 'Suara Notifikasi: OFF'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Action bar */}
        <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                filter === 'ALL' ? 'bg-purple-600 text-white' : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('UNREAD')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                filter === 'UNREAD' ? 'bg-purple-600 text-white' : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Belum Dibaca
            </button>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>

        {/* Notification List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-slate-500 font-mono text-xs flex flex-col items-center gap-2">
              <Bell className="w-8 h-8 text-slate-700 stroke-1" />
              <span>Tidak ada notifikasi saat ini.</span>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border text-xs space-y-2 transition-all ${
                  item.status === 'UNREAD'
                    ? 'bg-purple-950/20 border-purple-800/60 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800/70 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <span className="font-bold text-white block leading-tight">{item.title}</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-slate-500">{formatTimeAgo(item.createdAt)}</span>
                    {item.priority === 'CRITICAL' && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[8px] font-mono font-bold">
                        CRITICAL
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed text-[11px] pl-1">{item.message}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  {item.status === 'UNREAD' ? (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="text-[10px] font-mono text-cyan-400 hover:underline"
                    >
                      Tandai Dibaca
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">Sudah dibaca</span>
                  )}
                  {item.actionUrl && (
                    <button
                      onClick={() => handleNavigate(item.actionUrl, item.id)}
                      className="ml-auto flex items-center gap-1 text-[11px] font-mono text-purple-400 hover:text-purple-300 font-bold"
                    >
                      <span>Lihat Rincian</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Link to Full Notification Center */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <button
            onClick={() => {
              navigate('/admin/notifications');
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
          >
            <span>Buka Seluruh Notifikasi & Preferensi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
