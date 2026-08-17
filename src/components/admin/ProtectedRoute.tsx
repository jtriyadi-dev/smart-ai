import React from 'react';
import { ShieldAlert, Lock, ArrowLeft, RefreshCw } from 'lucide-react';
import { RBACService } from '../../services/RBACService';
import { AdminUser } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: string;
  resourceContext?: {
    customerId?: string;
    companyId?: string;
    ownerId?: string;
  };
  currentUser?: AdminUser;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  resourceContext,
  currentUser,
  fallbackTitle = 'Akses Ditolak (403 Forbidden)',
  fallbackMessage = 'Role dan akun Anda tidak memiliki hak akses (permission) yang cukup untuk membuka atau mengubah modul ini.'
}) => {
  const activeUser = currentUser || RBACService.getCurrentUser();

  // If permission code is provided, verify access
  if (permission && !RBACService.hasPermission(activeUser, permission, resourceContext)) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="glass-card max-w-lg w-full rounded-2xl p-8 border border-rose-500/20 bg-slate-900/90 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400 animate-pulse">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800 uppercase tracking-widest">
              HTTP 403 FORBIDDEN
            </span>
            <h2 className="text-xl font-bold font-display text-white">{fallbackTitle}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{fallbackMessage}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-[11px] space-y-1">
            <div className="text-slate-500 uppercase tracking-wider text-[9px]">Detail Otorisasi RBAC:</div>
            <div className="flex justify-between text-slate-300">
              <span>Current User:</span>
              <span className="text-cyan-400 font-bold">{activeUser.name}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Active Role:</span>
              <span className="text-purple-400 font-bold">{activeUser.role}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Required Permission:</span>
              <span className="text-amber-400 font-bold">{permission}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali Ke Halaman Sebelumnya</span>
            </button>
            <button
              onClick={() => {
                RBACService.setCurrentUserRole('SUPER_ADMIN');
                window.location.reload();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Switch ke Super Admin (Simulasi Test)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
