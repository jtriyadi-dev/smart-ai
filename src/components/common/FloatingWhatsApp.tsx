import React, { useState } from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { MessageSquare, X, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 left-4 sm:left-auto sm:right-24 z-40 flex flex-col items-start sm:items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-72 max-w-[calc(100vw-2rem)] bg-slate-900 border border-emerald-500/30 rounded-3xl p-4 shadow-2xl shadow-slate-950/80 animate-fade-in relative">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Tutup Popover WhatsApp"
            className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <span>Konsultan SMART-AI.ID</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Halo! Ada yang bisa kami bantu mengenai pembuatan aplikasi AI atau solusi software perusahaan Anda?
          </p>

          <WhatsAppButton
            source="Floating Widget"
            variant="Primary"
            size="sm"
            className="w-full justify-center min-h-[44px]"
            label="Mulai Chat WhatsApp"
          />
        </div>
      )}

      {/* Floating Toggle Icon */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle WhatsApp Chat"
          className="min-h-[44px] min-w-[44px] p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-2xl shadow-emerald-950/80 transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer relative"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-950" />
        </button>
      </div>
    </div>
  );
};
