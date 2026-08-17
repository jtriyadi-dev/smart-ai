import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Save,
  CheckSquare,
  Square,
  Search,
  Filter,
  Users,
  AlertTriangle,
  ArrowLeft,
  X,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { RBACService, MODULE_LIST, ACTION_LIST } from '../../services/RBACService';
import { AdminControlService } from '../../services/AdminControlService';
import { Role, Permission, AdminUser } from '../../types';
import { useRouter } from '../../lib/router';

interface AdminRoleDetailPageProps {
  roleId?: string;
}

export const AdminRoleDetailPage: React.FC<AdminRoleDetailPageProps> = ({ roleId: propRoleId }) => {
  const { navigate } = useRouter();

  // Extract ID from prop or window location pathname
  const pathParts = window.location.pathname.split('/');
  const extractedId = propRoleId || pathParts[pathParts.length - 1];

  const roles = RBACService.getRoles();
  const [role, setRole] = useState<Role | undefined>(
    roles.find((r) => r.id === extractedId || r.code.toUpperCase() === extractedId.toUpperCase()) || roles[0]
  );

  const [activePermissions, setActivePermissions] = useState<string[]>(role ? role.permissions : []);
  const [activeTab, setActiveTab] = useState<'matrix' | 'users'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('ALL');

  // Confirmation modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const allPermissions = RBACService.getPermissions();
  const permissionsByModule = RBACService.getPermissionsByModule();

  // Users assigned to this role
  const allUsers = AdminControlService.getUsers();
  const assignedUsers = allUsers.filter((u) => u.role === role?.code || (u.roles && u.roles.includes(role?.code || '')));

  useEffect(() => {
    if (role) {
      setActivePermissions(role.permissions);
    }
  }, [role]);

  if (!role) {
    return (
      <div className="p-8 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Role Tidak Ditemukan</h2>
        <button onClick={() => navigate('/admin/users/roles')} className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs">
          Kembali ke Daftar Role
        </button>
      </div>
    );
  }

  const handleTogglePermission = (code: string) => {
    if (activePermissions.includes(code)) {
      setActivePermissions(activePermissions.filter((p) => p !== code));
    } else {
      setActivePermissions([...activePermissions, code]);
    }
  };

  const handleToggleModuleAll = (moduleName: string) => {
    const modulePermCodes = (permissionsByModule[moduleName] || []).map((p) => p.code);
    const allSelected = modulePermCodes.every((code) => activePermissions.includes(code));

    if (allSelected) {
      // Remove all module perms
      setActivePermissions(activePermissions.filter((code) => !modulePermCodes.includes(code)));
    } else {
      // Add all module perms
      setActivePermissions(Array.from(new Set([...activePermissions, ...modulePermCodes])));
    }
  };

  const handleSaveMatrix = () => {
    RBACService.updateRolePermissions(role.code, activePermissions);
    const updated = RBACService.getRoleByCode(role.code);
    if (updated) setRole(updated);
    setConfirmModalOpen(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 4000);
  };

  const filteredModules = MODULE_LIST.filter((moduleName) => {
    if (selectedModuleFilter !== 'ALL' && selectedModuleFilter !== moduleName) return false;
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const modulePerms = permissionsByModule[moduleName] || [];
    return (
      moduleName.toLowerCase().includes(query) ||
      modulePerms.some((p) => p.name.toLowerCase().includes(query) || p.code.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Navigation & Role Info Banner */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/users/roles')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Roles</span>
        </button>

        {saveSuccessNotice && (
          <div className="px-4 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Matrix Hak Akses Berhasil Diperbarui!</span>
          </div>
        )}
      </div>

      {/* Role Banner Card */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono text-xs font-bold">
                {role.code}
              </span>
              <h2 className="text-2xl font-bold font-display text-white">{role.name}</h2>
              {role.isSystemRole ? (
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono font-bold">
                  SYSTEM ROLE
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono font-bold">
                  CUSTOM ROLE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 max-w-3xl">{role.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setConfirmModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Matrix ({activePermissions.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher & Quick Stats */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'matrix' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Permission Matrix ({activePermissions.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'users' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Assigned Users ({assignedUsers.length})
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Total Perms: <strong className="text-emerald-400">{activePermissions.length}</strong> / {allPermissions.length}</span>
            <span>Status: <strong className="text-cyan-400">{role.status}</strong></span>
          </div>
        </div>
      </div>

      {activeTab === 'matrix' ? (
        /* INTERACTIVE PERMISSION MATRIX EDITOR */
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
          {/* Matrix Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari izin modul, kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedModuleFilter}
                onChange={(e) => setSelectedModuleFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">Semua Modul Sistem ({MODULE_LIST.length})</option>
                {MODULE_LIST.map((mod) => (
                  <option key={mod} value={mod}>
                    Modul {mod}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Module List & Matrix Checkboxes */}
          <div className="space-y-6">
            {filteredModules.map((moduleName) => {
              const modulePerms = permissionsByModule[moduleName] || [];
              const allSelected = modulePerms.every((p) => activePermissions.includes(p.code));
              const someSelected = modulePerms.some((p) => activePermissions.includes(p.code));

              return (
                <div key={moduleName} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <h4 className="font-bold text-white font-mono text-sm uppercase tracking-wider">{moduleName}</h4>
                      <span className="text-[10px] font-mono text-slate-500">({modulePerms.length} Action Types)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleModuleAll(moduleName)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                        allSelected
                          ? 'bg-purple-950 text-purple-300 border border-purple-800 hover:bg-purple-900'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {allSelected ? 'Deselect Module All' : 'Select Module All'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                    {modulePerms.map((perm) => {
                      const isChecked = activePermissions.includes(perm.code);
                      return (
                        <button
                          key={perm.code}
                          type="button"
                          onClick={() => handleTogglePermission(perm.code)}
                          className={`p-2.5 rounded-xl text-left border text-xs flex items-start gap-2 transition-all ${
                            isChecked
                              ? 'bg-purple-950/60 border-purple-600/80 text-white shadow-sm'
                              : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="mt-0.5">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-purple-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold font-mono text-[11px] leading-tight">{perm.action}</div>
                            <div className="text-[9px] text-slate-500 font-mono mt-0.5 truncate">{perm.code}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ASSIGNED USERS TAB */
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white font-display">
            Pengguna dengan Role {role.name} ({assignedUsers.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 font-mono text-[10px] text-purple-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Departemen</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Terakhir Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {assignedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-500">
                      Belum ada pengguna yang ditugaskan ke role ini.
                    </td>
                  </tr>
                ) : (
                  assignedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/50">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-bold text-white">{u.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-mono">{u.department || 'General'}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-400">{u.lastLogin || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECURITY CONFIRMATION WARNING MODAL */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Konfirmasi Perubahan Hak Akses</h3>
                <span className="text-[10px] font-mono text-amber-400">SECURITY AUDIT PROTOCOL</span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">
              "You are changing access permissions. This may affect system security."
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
              <div>Role Target: <strong className="text-purple-400">{role.name} ({role.code})</strong></div>
              <div>Total Perms Baru: <strong className="text-emerald-400">{activePermissions.length} Permissions</strong></div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveMatrix}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
              >
                Ya, Konfirmasi & Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
