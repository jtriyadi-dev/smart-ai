import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const defaultMessages = [
    'Halo, saya mau buat aplikasi custom berbasis AI untuk perusahaan',
    'Berapa estimasi biaya pembuatan sistem informasi perusahaan?',
    'Apakah SMART-AI.ID bisa buat sistem kebun sawit / tambang?'
  ];

  const handleSendWA = (msgText: string) => {
    const text = encodeURIComponent(msgText || 'Halo Tim SMART-AI.ID, saya ingin berkonsultasi mengenai perancangan aplikasi web.');
    window.open(`https://wa.me/6285187869164?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-50">
      
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-88 glass-card rounded-2xl border border-emerald-500/40 p-4 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200 text-left space-y-3">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <div className="text-xs font-bold text-white font-display">Konsultan SMART-AI.ID</div>
                <div className="text-[10px] text-emerald-400 font-mono">Online • Respon Cepat</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Halo! Ada yang bisa kami bantu mengenai pembuatan aplikasi web custom berbasis AI untuk bisnis Anda?
          </p>

          <div className="space-y-1.5">
            <div className="text-[10px] text-slate-400 font-mono">Pilih pertanyaan cepat:</div>
            {defaultMessages.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => handleSendWA(msg)}
                className="w-full text-left text-[11px] p-2 rounded-lg bg-slate-900/80 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-all flex items-center justify-between group"
              >
                <span className="truncate pr-1">{msg}</span>
                <Send className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))}
          </div>

          <div className="pt-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik pesan Anda..."
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendWA(quickMsg)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSendWA(quickMsg)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shrink-0"
              >
                Kirim
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-full shadow-2xl shadow-emerald-600/40 transition-all cursor-pointer border border-emerald-400/30"
        aria-label="Konsultasi WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-4 h-4 text-white" />
        <span className="hidden sm:inline">Konsultasi WhatsApp</span>
      </button>

    </div>
  );
};
