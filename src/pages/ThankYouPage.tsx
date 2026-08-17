import React, { useEffect, useState } from 'react';
import { useRouter } from '../lib/router';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { CheckCircle2, Sparkles, ArrowLeft, Cpu, Copy, Check } from 'lucide-react';

export const ThankYouPage: React.FC = () => {
  const { navigate } = useRouter();
  const [refCode, setRefCode] = useState<string>('SAI-2026-88129');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Terima Kasih | SMART-AI.ID';

    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) setRefCode(ref);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[80vh] bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-slate-900 border border-purple-800/30 rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-950/50">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Terima Kasih!
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Permintaan Anda telah berhasil dikirim. Tim spesialis SMART-AI.ID akan meninjau kebutuhan proyek Anda dan menghubungi Anda kembali.
          </p>

          {/* Reference Number Card */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-8 inline-flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Kode Referensi Permintaan Anda:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono font-black text-purple-300 tracking-wider">
                {refCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Salin Kode Referensi"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <WhatsAppButton
              source="Thank You Page"
              contextData={{ referenceCode: refCode }}
              variant="Primary"
              size="lg"
              className="w-full justify-center"
              label="Konfirmasi Instan via WhatsApp"
            />

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </button>

              <button
                onClick={() => navigate('/ai-app-builder')}
                className="w-full sm:w-1/2 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 text-xs font-bold flex items-center justify-center gap-2 border border-purple-800/40 cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>Coba AI App Builder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
