import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useRouter } from '../../lib/router';
import { AdminControlService } from '../../services/AdminControlService';
import { CommandPaletteModal } from './CommandPaletteModal';
import { NotificationDrawer } from './NotificationDrawer';
import { QuickActionsModal } from './QuickActionsModal';
import { AdminErrorBoundary } from './AdminErrorBoundary';
import { AdminRole, AdminUser } from '../../types';
import { CONTROL_PANEL_NAVIGATION, NavigationItem, getActiveNavigationItem } from '../../config/navigationConfig';

import { NotificationService } from '../../services/NotificationService';
import { RBACService } from '../../services/RBACService';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeRoute: string;
  pageTitle: string;
  pageSubtitle?: string;
  breadcrumbs?: { label: string; link?: string }[];
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ElementType;
  };
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeRoute,
  pageTitle,
  pageSubtitle,
  breadcrumbs = [{ label: 'Admin', link: '/admin' }],
  primaryAction
}) => {
  const { currentPath, navigate } = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [activeUser, setActiveUser] = useState<AdminUser>(RBACService.getCurrentUser());

  const handleUpdateNotifCount = () => {
    const count = NotificationService.getUnreadCount(activeUser.role, (activeUser as any).companyId, activeUser.id);
    setUnreadNotifCount(count);
  };

  useEffect(() => {
    handleUpdateNotifCount();
    const unsubscribe = NotificationService.subscribe(() => {
      handleUpdateNotifCount();
    });
    return () => {
      unsubscribe();
    };
  }, [activeUser.id, activeUser.role]);

  // Filter menu items dynamically based on current user permissions
  const accessibleMenuItems = CONTROL_PANEL_NAVIGATION.filter((item) =>
    RBACService.hasPermission(activeUser, item.permission)
  );

  const availableRoles = RBACService.getRoles();

  const handleRoleSwitch = (newRoleCode: string) => {
    const updated = RBACService.setCurrentUserRole(newRoleCode);
    setActiveUser(updated);
    setProfileDropdownOpen(false);
  };

  const isMenuItemActive = (menu: NavigationItem) => {
    if (activeRoute === menu.route || currentPath === menu.route) return true;
    if (menu.aliases && (menu.aliases.includes(activeRoute) || menu.aliases.includes(currentPath))) return true;
    if (menu.id !== 'dashboard') {
      if (activeRoute.startsWith(menu.route) || currentPath.startsWith(menu.route)) return true;
      if (menu.aliases.some((alias) => alias !== '/admin' && alias !== '/control-panel' && (activeRoute.startsWith(alias) || currentPath.startsWith(alias)))) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80 h-16 flex items-center justify-between px-4 sm:px-6">
        {/* Left Side: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-slate-400 hover:text-white"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 group shrink-0 cursor-pointer text-left">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
              AI
            </div>
            <div className="flex flex-col whitespace-nowrap justify-center">
              <span className="font-display font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap leading-none">
                SMART-AI.ID
              </span>
              <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest mt-0.5 whitespace-nowrap leading-tight">
                ENTERPRISE CONTROL
              </span>
            </div>
          </button>
        </div>

        {/* Center: Command Search Bar Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200 text-xs flex items-center justify-between transition-all group shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Pencarian Global (Leads, Customer, Project, Invoice)...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right Side: Quick Actions, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search button mobile */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Quick Actions Button */}
          <button
            onClick={() => setQuickActionsOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Action</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setNotificationDrawerOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 relative transition-colors"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <img
                src={activeUser.avatarUrl}
                alt={activeUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/50"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">{activeUser.name}</span>
                <span className="text-[9px] font-mono text-cyan-400 font-bold">{activeUser.role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-3 text-xs">
                <div className="pb-2 border-b border-slate-800 flex items-center gap-2.5">
                  <img src={activeUser.avatarUrl} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-white">{activeUser.name}</div>
                    <div className="text-[10px] text-slate-400">{activeUser.email}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800 text-[9px] font-mono font-bold">
                      {activeUser.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    SIMULASI RBAC ROLE SWITCHER
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
                    {availableRoles.map((r) => (
                      <button
                        key={r.code}
                        onClick={() => handleRoleSwitch(r.code)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-mono flex items-center justify-between ${
                          activeUser.role === r.code
                            ? 'bg-purple-900/40 text-purple-200 font-bold border border-purple-700/50'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{r.name}</span>
                        {activeUser.role === r.code && <UserCheck className="w-3 h-3 text-purple-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/admin/settings');
                    }}
                    className="text-slate-400 hover:text-white font-mono text-[11px]"
                  >
                    Setelan Akun
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="text-rose-400 hover:text-rose-300 font-mono text-[11px] flex items-center gap-1 font-bold"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY CONTENT CONTAINER */}
      <div className="flex-1 flex">
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden md:flex flex-col bg-[#070b14] border-r border-slate-800/80 transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="p-4 flex-1 overflow-y-auto space-y-1">
            {accessibleMenuItems.map((menu) => {
              const Icon = menu.icon;
              const isActive = isMenuItemActive(menu);

              return (
                <button
                  key={menu.id}
                  id={`sidebar-menu-item-${menu.id}`}
                  onClick={() => navigate(menu.route)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-500/40 text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                  }`}
                  title={sidebarCollapsed ? menu.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!sidebarCollapsed && <span className="truncate">{menu.label}</span>}
                  {!sidebarCollapsed && isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-auto shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>

          {!sidebarCollapsed && (
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/50 text-[10px] font-mono text-slate-500 space-y-1">
              <div className="flex items-center justify-between text-slate-400 font-bold">
                <span>SMART-AI.ID v2.6</span>
                <span className="text-emerald-400 font-mono">ONLINE</span>
              </div>
              <p>Enterprise Control Center</p>
            </div>
          )}
        </aside>

        {/* MOBILE DRAWER SIDEBAR */}
        {mobileMenuOpen && (
          <div
            id="mobile-sidebar-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileMenuOpen(false);
            }}
            className="fixed inset-0 z-50 flex md:hidden bg-slate-950/80 backdrop-blur-md"
          >
            <div className="w-4/5 max-w-xs bg-[#070b14] border-r border-slate-800 h-full p-4 flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-display font-bold text-white text-sm">Navigation Menu</span>
                <button
                  id="btn-close-mobile-menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1">
                {accessibleMenuItems.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = isMenuItemActive(menu);

                  return (
                    <button
                      key={menu.id}
                      id={`mobile-menu-item-${menu.id}`}
                      onClick={() => {
                        navigate(menu.route);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-950 to-purple-950 text-cyan-300 border border-cyan-800'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{menu.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
          {/* BREADCRUMBS & PAGE HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                {breadcrumbs.map((bc, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-600" />}
                    {bc.link ? (
                      <button onClick={() => navigate(bc.link!)} className="hover:text-cyan-400">
                        {bc.label}
                      </button>
                    ) : (
                      <span className="text-cyan-400 font-bold">{bc.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                {pageTitle}
              </h1>

              {pageSubtitle && <p className="text-xs text-slate-400 mt-1">{pageSubtitle}</p>}
            </div>

            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all self-start md:self-auto cursor-pointer"
              >
                {primaryAction.icon && <primaryAction.icon className="w-4 h-4" />}
                <span>{primaryAction.label}</span>
              </button>
            )}
          </div>

          {/* PAGE CONTENT CHILD */}
          <AdminErrorBoundary fallbackTitle={`Modul ${pageTitle}`}>
            {children}
          </AdminErrorBoundary>
        </main>
      </div>

      {/* MODALS & DRAWERS */}
      <CommandPaletteModal isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        onUpdateCount={handleUpdateNotifCount}
      />
      <QuickActionsModal isOpen={quickActionsOpen} onClose={() => setQuickActionsOpen(false)} />
    </div>
  );
};
