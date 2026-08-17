import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { CustomerNotification } from '../../types';
import { Bell, CheckCheck, FolderKanban, Receipt, LifeBuoy, FileText, ArrowRight } from 'lucide-react';

export const CustomerNotificationsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [notifications, setNotifications] = useState<CustomerNotification[]>([]);

  const loadNotifications = () => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const list = CustomerPortalService.getNotifications(s.company.id, s.user.id);
      setNotifications(list);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  if (!session) return null;

  const handleMarkAllRead = () => {
    CustomerPortalService.markAllNotificationsAsRead(session.company.id);
    loadNotifications();
  };

  const handleNotificationClick = (notif: CustomerNotification) => {
    CustomerPortalService.markNotificationAsRead(notif.id);
    if (notif.linkUrl) {
      navigate(notif.linkUrl);
    } else {
      loadNotifications();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'PROJECT_UPDATE':
        return <FolderKanban className="w-4 h-4 text-cyan-400" />;
      case 'INVOICE':
      case 'PAYMENT':
        return <Receipt className="w-4 h-4 text-amber-400" />;
      case 'TICKET':
        return <LifeBuoy className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <CustomerPortalLayout activePath="/portal/notifications">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" /> Notifications Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pusat Pemberitahuan Aktivitas Proyek, Tagihan & Tiket Perusahaan {session.company.name}.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <CheckCheck className="w-4 h-4 text-cyan-400" /> Tandai Semua Dibaca
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          Tidak ada pemberitahuan baru saat ini.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                n.read
                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                  : 'bg-slate-900 border-cyan-500/40 text-white shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-slate-500 mt-2 block">
                    {new Date(n.createdAt).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {n.linkUrl && (
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </CustomerPortalLayout>
  );
};
