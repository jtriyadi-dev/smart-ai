import React, { useState } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalService } from '../../services/CustomerPortalService';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle, KeyRound } from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('client@nusantaramining.co.id');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = CustomerPortalService.login(email, password);
      setLoading(false);
      if (res.success) {
        navigate('/portal/dashboard');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> SMART-AI.ID Client Portal
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Login Portal Klien</h1>
          <p className="text-xs text-slate-400 mt-1">
            Akses aman untuk memantau proyek, proposal, quotation, invoice & tiket support.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Alamat Email Klien</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.co.id"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Kata Sandi</label>
                <button
                  type="button"
                  onClick={() => navigate('/portal/forgot-password')}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 mt-6"
            >
              <span>{loading ? 'Memverifikasi Access...' : 'Masuk ke Customer Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Note */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-2 font-medium">Demo Access Prepared:</div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1">
              <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" /> PT Nusantara Mining Energy
              </div>
              <div className="text-slate-400 font-mono text-[11px]">Email: client@nusantaramining.co.id</div>
              <div className="text-slate-400 font-mono text-[11px]">Pass: password123</div>
            </div>
          </div>
        </div>

        {/* Bottom Switch to Register */}
        <div className="text-center mt-6 text-xs text-slate-400">
          Belum memiliki akun portal perusahaan?{' '}
          <button
            onClick={() => navigate('/portal/register')}
            className="text-cyan-400 font-semibold hover:underline"
          >
            Daftar Akun Klien Baru
          </button>
        </div>
      </div>
    </div>
  );
};
