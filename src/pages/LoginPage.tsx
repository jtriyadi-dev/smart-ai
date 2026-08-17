import React, { useState } from 'react';
import { Bot, ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: 'admin' | 'customer') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'admin'>('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-6 text-center">
          
          {/* Logo Branding */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-[15px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl font-display font-extrabold text-white">
              SMART-AI<span className="text-cyan-400">.ID</span>
            </h1>
            <p className="text-xs text-slate-400">Enterprise Portal Access</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'customer'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Portal
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('admin')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'admin'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-mono font-bold text-slate-300 block mb-1">Email Klien / Admin:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="user@perusahaan.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-300 block mb-1">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk Portal ({selectedRole === 'customer' ? 'Customer' : 'Admin'})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span>Perlu akses portal enterprise? Hubungi tim support SMART-AI.ID.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
