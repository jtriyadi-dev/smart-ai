import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Copy,
  Edit,
  Trash2,
  Users,
  CheckCircle2,
  XCircle,
  Lock,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  X
} from 'lucide-react';
import { RBACService } from '../../services/RBACService';
import { Role } from '../../types';
import { useRouter } from '../../lib/router';

export const AdminRolesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [roles, setRoles] = useState<Role[]>(RBACService.getRoles());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'SYSTEM' | 'CUSTOM'>('ALL');

  // Modal States
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [selectedRoleForClone, setSelectedRoleForClone] = useState<Role | null>(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE'
  });

  const [cloneRoleName, setCloneRoleName] = useState('');

  const reloadRoles = () => {
    setRoles(RBACService.getRoles());
  };

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'SYSTEM') return matchesSearch && role.isSystemRole;
    if (filterType === 'CUSTOM') return matchesSearch && !role.isSystemRole;
    return matchesSearch;
  });

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      RBACService.saveRole({
        name: formData.name,
        code: formData.code,
        description: formData.description,
        status: formData.status,
        permissions: ['DASHBOARD_VIEW']
      });
      reloadRoles();
      setCreateModalOpen(false);
      setFormData({ name: '', code: '', description: '', status: 'ACTIVE' });
    } catch (err: any) {
      alert(err.message || 'Gagal membuat custom role');
    }
  };

  const handleCloneRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleForClone) return;
    try {
      RBACService.duplicateRole(selectedRoleForClone.code, cloneRoleName);
      reloadRoles();
      setCloneModalOpen(false);
      setCloneRoleName('');
      setSelectedRoleForClone(null);
    } catch (err: any) {
      alert(err.message || 'Gagal menduplikasi role');
    }
  };

  const handleToggleStatus = (roleCode: string) => {
    try {
      RBACService.toggleRoleStatus(roleCode);
      reloadRoles();
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah status role');
    }
  };

  const handleDeleteRole = (roleCode: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus custom role ini?')) return;
    const res = RBACService.deleteRole(roleCode);
    if (!res.success) {
      alert(res.message);
    } else {
      reloadRoles();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold font-display text-white">Enterprise Role Management</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50 text-[10px] font-mono font-bold">
              RBAC v2
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Kelola hierarki peran, hak akses operasional (permissions), pembatasan keamanan, dan kustomisasi role tim perusahaan SMART-AI.ID.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Custom Role</span>
        </button>
      </div>

      {/* Controls Bar: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama role, kode, deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filterType === 'ALL'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Semua Role ({roles.length})
          </button>
          <button
            onClick={() => setFilterType('SYSTEM')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filterType === 'SYSTEM'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            System Roles ({roles.filter((r) => r.isSystemRole).length})
          </button>
          <button
            onClick={() => setFilterType('CUSTOM')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filterType === 'CUSTOM'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Custom Roles ({roles.filter((r) => !r.isSystemRole).length})
          </button>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className={`glass-card rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 hover:border-purple-500/50 ${
              role.status === 'INACTIVE' ? 'opacity-60 border-rose-900/30 bg-slate-950/80' : 'border-white/10'
            }`}
          >
            {/* Top Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white font-display text-base">{role.name}</h3>
                    {role.isSystemRole ? (
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] font-mono font-bold" title="System Role bawaan">
                        SYSTEM
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[9px] font-mono font-bold">
                        CUSTOM
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-purple-400 font-bold">{role.code}</div>
                </div>

                <button
                  onClick={() => handleToggleStatus(role.code)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 border ${
                    role.status === 'ACTIVE'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}
                  title="Klik untuk ubah status active/inactive"
                >
                  {role.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>{role.status}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px]">{role.description}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 font-mono text-xs">
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="text-[9px] text-slate-500 uppercase">Assigned Users</div>
                <div className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{role.userCount || 0} Pengguna</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="text-[9px] text-slate-500 uppercase">Hak Akses Active</div>
                <div className="text-emerald-400 font-bold mt-0.5">
                  {role.permissions.length} Permissions
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => navigate(`/admin/users/roles/${role.id}`)}
                className="flex-1 py-2 px-3 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 border border-purple-700/50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Kelola Hak Akses Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setSelectedRoleForClone(role);
                  setCloneRoleName(`${role.name} Copy`);
                  setCloneModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                title="Duplikat / Clone Role Ini"
              >
                <Copy className="w-4 h-4" />
              </button>

              {!role.isSystemRole && (
                <button
                  onClick={() => handleDeleteRole(role.code)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 transition-colors"
                  title="Hapus Custom Role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CREATE CUSTOM ROLE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">Buat Custom Role Baru</h3>
              <button onClick={() => setCreateModalOpen(false)} className="p-1 rounded bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Role</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Project Coordinator, Sales Manager"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const code = name.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
                    setFormData({ ...formData, name, code });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kode Role (Auto-Generated)</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-purple-400 font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Deskripsi & Ruang Lingkup</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan cakupan wewenang role ini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Simpan & Set Matrix
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLONE / DUPLICATE ROLE MODAL */}
      {cloneModalOpen && selectedRoleForClone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">Duplikat Role: {selectedRoleForClone.name}</h3>
              <button onClick={() => setCloneModalOpen(false)} className="p-1 rounded bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCloneRole} className="space-y-3">
              <p className="text-slate-400 text-xs">
                Sistem akan menyalin seluruh {selectedRoleForClone.permissions.length} hak akses dari role <strong className="text-white">{selectedRoleForClone.name}</strong> ke role baru.
              </p>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Role Baru</label>
                <input
                  type="text"
                  required
                  value={cloneRoleName}
                  onChange={(e) => setCloneRoleName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCloneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                >
                  Duplikat Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
