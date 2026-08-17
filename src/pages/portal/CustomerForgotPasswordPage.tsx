import React, { useState } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalService } from '../../services/CustomerPortalService';
import { Mail, ArrowLeft, Send, CheckCircle2, KeyRound } from 'lucide-react';

export const CustomerForgotPasswordPage: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = CustomerPortalService.forgotPassword(email);
    setMessage(res.message);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => navigate('/portal/login')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Login
          </button>

          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit mb-4">
            <KeyRound className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-bold text-white mb-2">Lupa Kata Sandi?</h1>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Masukkan alamat email perusahaan yang terdaftar. Kami akan mengirimkan instruksi untuk menyetel ulang kata sandi Anda.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Perusahaan</label>
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

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>Kirim Instruksi Reset</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
