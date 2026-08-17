import React from 'react';
import { MessageSquare } from 'lucide-react';
import { WhatsAppService } from '../../services/whatsappService';

interface WhatsAppButtonProps {
  message?: string;
  source?: string;
  contextData?: any;
  variant?: 'Primary' | 'Secondary' | 'Floating' | 'Compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  source = 'Website CTA',
  contextData,
  variant = 'Primary',
  size = 'md',
  className = '',
  label = 'Chat via WhatsApp'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const data = contextData || (message ? { customNote: message } : undefined);
    WhatsAppService.openWhatsApp(source, data);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-3 py-1.5 text-xs gap-1.5';
      case 'lg': return 'px-6 py-3 text-sm font-bold gap-2.5';
      default: return 'px-4 py-2.5 text-xs font-semibold gap-2';
    }
  };

  if (variant === 'Floating') {
    return (
      <button
        onClick={handleClick}
        aria-label="Chat via WhatsApp"
        className={`group relative p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-2xl shadow-emerald-900/60 transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer ${className}`}
      >
        <MessageSquare className="w-6 h-6 stroke-[2.5]" />
        <span className="absolute right-14 bg-slate-900 text-slate-100 text-xs px-3 py-1.5 rounded-xl border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          Chat Konsultasi WhatsApp
        </span>
      </button>
    );
  }

  if (variant === 'Compact') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer ${getSizeClasses()} ${className}`}
      >
        <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{label}</span>
      </button>
    );
  }

  if (variant === 'Secondary') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer ${getSizeClasses()} ${className}`}
      >
        <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{label}</span>
      </button>
    );
  }

  // Primary
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-950/40 cursor-pointer ${getSizeClasses()} ${className}`}
    >
      <MessageSquare className="w-4 h-4 stroke-[2.5] shrink-0" />
      <span>{label}</span>
    </button>
  );
};
