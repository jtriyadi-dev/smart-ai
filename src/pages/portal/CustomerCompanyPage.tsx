import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { CustomerCompany, CustomerUser, CustomerRole } from '../../types';
import { Building2, Users, UserPlus, CheckCircle2, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';

export const CustomerCompanyPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [company, setCompany] = useState<CustomerCompany | null>(null);
  const [companyUsers, setCompanyUsers] = useState<CustomerUser[]>([]);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<CustomerRole>('CUSTOMER_USER');
  const [inviteSent, setInviteSent] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const loadData = () => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      setCompany(s.company);
      const uList = CustomerPortalService.getCompanyUsers(s.company.id);
      setCompanyUsers(uList);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!session || !company) return null;

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    CustomerPortalService.updateCompany(company.id, company);
    setSavedMsg('Profil perusahaan berhasil diperbarui!');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    CustomerPortalService.inviteUser(company.id, inviteEmail, inviteRole, session.user.name);
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setInviteModalOpen(false);
      setInviteEmail('');
      loadData();
    }, 1500);
  };

  return (
    <CustomerPortalLayout activePath="/portal/company">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" /> Profil & Pengguna Perusahaan
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pengaturan Legalitas Perusahaan, NPWP & Akses Pengguna Klien.
          </p>
        </div>

        {session.user.role === 'CUSTOMER_ADMIN' && (
          <button
            onClick={() => setInviteModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Undang Pengguna Baru
          </button>
        )}
      </div>

      {savedMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {savedMsg}
        </div>
      )}

      {/* Company Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" /> Informasi Legalitas Perusahaan
        </h2>

        <form onSubmit={handleUpdateCompany} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Perusahaan (Brand)</label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Badan Hukum (Legal Name)</label>
              <input
                type="text"
                value={company.legalName}
                onChange={(e) => setCompany({ ...company, legalName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sektor Industri</label>
              <input
                type="text"
                value={company.industry}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">NPWP / Informasi Pajak</label>
              <input
                type="text"
                value={company.taxInformation || ''}
                onChange={(e) => setCompany({ ...company, taxInformation: e.target.value })}
                placeholder="NPWP: 00.000.000.0-000.000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Resmi Perusahaan</label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor Telepon Kantor</label>
              <input
                type="text"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Alamat Kantor Lengkap</label>
            <textarea
              rows={2}
              value={company.address}
              onChange={(e) => setCompany({ ...company, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {session.user.role === 'CUSTOMER_ADMIN' && (
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
              >
                Simpan Perubahan Perusahaan
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Company Users List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-400" /> Anggota & Role Portal ({companyUsers.length})
        </h2>

        <div className="space-y-3">
          {companyUsers.map((usr) => (
            <div
              key={usr.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-300">
                  {usr.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{usr.name}</div>
                  <div className="text-[11px] text-slate-400">{usr.email} • {usr.position}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {usr.role}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold uppercase">
                  {usr.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-1">Undang Anggota Tim Portal</h3>
            <p className="text-xs text-slate-400 mb-4">
              Kirimkan undangan akses portal ke alamat email staf perusahaan Anda.
            </p>

            {inviteSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Undangan berhasil dikirim!
              </div>
            ) : (
              <form onSubmit={handleInviteUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Calon Pengguna</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="nama@perusahaan.co.id"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Peran Akses</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as CustomerRole)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="CUSTOMER_ADMIN">CUSTOMER_ADMIN (Akses Penuh)</option>
                    <option value="CUSTOMER_FINANCE">CUSTOMER_FINANCE (Invoice & Pembayaran)</option>
                    <option value="CUSTOMER_PROJECT_MANAGER">CUSTOMER_PROJECT_MANAGER (Proyek & Tiket)</option>
                    <option value="CUSTOMER_USER">CUSTOMER_USER (Akses Baca Saja)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Kirim Undangan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
