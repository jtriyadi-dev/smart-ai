import React from 'react';
import { Bot, ArrowLeft, Home } from 'lucide-react';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="py-32 bg-[#06090e] bg-tech-grid min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md mx-auto px-4 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
          <Bot className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-display font-extrabold text-white">404 - Page Not Found</h1>
        <p className="text-sm text-slate-400">
          Halaman yang Anda cari tidak ditemukan. Silakan kembali ke halaman utama SMART-AI.ID.
        </p>
        <button
          onClick={onGoHome}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
