import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    // Save subscription locally
    const existing = JSON.parse(localStorage.getItem('smart_ai_blog_newsletter') || '[]');
    existing.push({ email, consent, subscribedAt: new Date().toISOString() });
    localStorage.setItem('smart_ai_blog_newsletter', JSON.stringify(existing));

    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 border border-cyan-500/30 relative overflow-hidden my-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-4 text-center relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
          <Mail className="w-6 h-6" />
        </div>

        <h3 className="text-2xl font-display font-bold text-white">Subscribe to SMART-AI.ID Tech Insights</h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
          Dapatkan analisis eksklusif seputar Artificial Intelligence, studi kasus arsitektur software, dan panduan otomatisasi bisnis langsung ke email Anda.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Terima kasih telah berlangganan! Kami telah mencatat preferensi email Anda.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Masukkan email bisnis Anda..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={!consent}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-400 text-left pt-1">
              <input
                type="checkbox"
                id="news-consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
              />
              <label htmlFor="news-consent" className="cursor-pointer">
                Saya menyetujui penerimaan buletin teknologi SMART-AI.ID. Kebijakan privasi menjamin data tidak akan dijual ke pihak ketiga. Anda dapat berhenti berlangganan kapan saja.
              </label>
            </div>
          </form>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Zero-Spam Policy • Strict Data Protection</span>
        </div>
      </div>
    </div>
  );
};
