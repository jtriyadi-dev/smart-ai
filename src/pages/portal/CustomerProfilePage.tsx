import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { CustomerUser } from '../../types';
import { User, KeyRound, CheckCircle2, ShieldCheck, Mail, Phone, Building } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [userProfile, setUserProfile] = useState<CustomerUser | null>(null);
  const [savedMsg, setSavedMsg] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      setUserProfile(s.user);
    }
  }, []);

  if (!session || !userProfile) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const res = CustomerPortalService.updateProfile(userProfile.id, userProfile);
    if (res.success) {
      setSavedMsg('Profil Anda berhasil diperbarui.');
      setTimeout(() => setSavedMsg(''), 2500);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPassMsg('Kata sandi baru minimal 6 karakter.');
      return;
    }
    setPassMsg('Kata sandi telah berhasil diperbarui!');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setPassMsg(''), 2500);
  };

  return (
    <CustomerPortalLayout activePath="/portal/profile">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" /> Profil & Keamanan Akun
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Pengaturan informasi diri, kontak, dan kata sandi pengguna.
        </p>
      </div>

      {savedMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {savedMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" /> Informasi Diri
          </h2>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Alamat Email</label>
              <input
                type="email"
                disabled
                value={userProfile.email}
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-3.5 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor Telepon / WhatsApp</label>
              <input
                type="text"
                value={userProfile.phone}
                onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Jabatan di Perusahaan</label>
              <input
                type="text"
                value={userProfile.position}
                onChange={(e) => setUserProfile({ ...userProfile, position: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
              >
                Simpan Profil
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl h-fit">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-cyan-400" /> Ubah Kata Sandi
          </h2>

          {passMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {passMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kata Sandi Saat Ini</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kata Sandi Baru</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
              >
                Perbarui Kata Sandi
              </button>
            </div>
          </form>
        </div>
      </div>
    </CustomerPortalLayout>
  );
};
