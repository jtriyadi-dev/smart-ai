import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { CustomerAIAssistantDrawer } from './CustomerAIAssistantDrawer';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Receipt,
  CreditCard,
  CheckSquare,
  LifeBuoy,
  Building2,
  User,
  Bell,
  Settings,
  LogOut,
  Bot,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Globe,
  Sparkles,
  FileCheck,
  FolderOpen
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
  activePath: string;
}

export const CustomerPortalLayout: React.FC<Props> = ({ children, activePath }) => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let currentSession = CustomerPortalService.getCurrentSession();
    if (!currentSession) {
      // Auto login sample client for presentation if user visits portal directly
      const loginRes = CustomerPortalService.login('client@nusantaramining.co.id', 'password123');
      if (loginRes.session) {
        currentSession = loginRes.session;
      }
    }
    setSession(currentSession);

    if (currentSession) {
      const notifs = CustomerPortalService.getNotifications(currentSession.company.id, currentSession.user.id);
      setUnreadCount(notifs.filter((n) => !n.read).length);
    }
  }, []);

  const handleLogout = () => {
    CustomerPortalService.logout();
    navigate('/portal/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/portal/projects', icon: FolderKanban },
    { label: 'Proposals', path: '/portal/proposals', icon: FileText },
    { label: 'Quotations', path: '/portal/quotations', icon: FileCheck },
    { label: 'Invoices', path: '/portal/invoices', icon: Receipt },
    { label: 'Payments', path: '/portal/payments', icon: CreditCard },
    { label: 'Receipts', path: '/portal/receipts', icon: CheckSquare },
    { label: 'Documents', path: '/portal/documents', icon: FolderOpen },
    { label: 'Support Tickets', path: '/portal/tickets', icon: LifeBuoy },
    { label: 'Company Profile', path: '/portal/company', icon: Building2 },
    { label: 'Notifications', path: '/portal/notifications', icon: Bell, badge: unreadCount },
    { label: 'Settings', path: '/portal/settings', icon: Settings }
  ];

  if (!session) {
    return (
      <div className="min-h-screen bg-[#06090e] flex items-center justify-center p-4">
        <div className="text-center text-slate-400 text-sm flex flex-col items-center gap-3">
          <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
          <span>Memuat Portal Klien SMART-AI.ID...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm text-white truncate max-w-[180px]">
            {session.company.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiDrawerOpen(true)}
            className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
          >
            <Bot className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`w-64 bg-[#090d16] border-r border-slate-800/80 flex flex-col justify-between fixed md:sticky top-0 h-screen z-40 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Company & Client Brand Header */}
          <div className="p-5 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-md">
                SAI
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                  SMART-AI.ID
                </div>
                <div className="text-xs font-semibold text-white truncate max-w-[150px]">
                  {session.company.name}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Tenant Isolated
              </span>
              <span className="font-mono text-cyan-300 font-bold">{session.user.role}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.path || activePath.startsWith(item.path + '/');
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
          <button
            onClick={() => setAiDrawerOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 text-xs font-semibold transition"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>AI Client Assistant</span>
          </button>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-300">
                {session.user.name.charAt(0)}
              </div>
              <div className="truncate max-w-[100px]">
                <div className="text-white text-[11px] font-medium truncate">{session.user.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{session.user.position}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#06090e]">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#090d16]/80 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                Selamat Datang, {session.company.name}
              </h1>
              <p className="text-xs text-slate-400">
                Portal Manajemen Proyek, Tagihan & Layanan SMART-AI.ID
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAiDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Tanya AI Client</span>
            </button>

            <button
              onClick={() => navigate('/portal/notifications')}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Situs Utama</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 md:p-8 flex-1">{children}</div>
      </main>

      {/* AI Assistant Drawer */}
      <CustomerAIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        companyId={session.company.id}
        companyName={session.company.name}
      />
    </div>
  );
};
