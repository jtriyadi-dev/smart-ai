import React from 'react';
import { Download, Smartphone, Monitor, Zap, WifiOff, CheckCircle2, X, ArrowUpRight, Share2, PlusSquare } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstalled, isInstallable, platform, installApp } = usePWA();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const res = await installApp();
    if (res.outcome === 'accepted') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0c1220] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <img src="/icons/icon.svg" alt="SMART-AI.ID" className="w-9 h-9" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1">
              <Zap className="w-3 h-3" /> Progressive Web App (PWA)
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Install Aplikasi SMART-AI.ID
            </h3>
          </div>
        </div>

        {/* Status or Benefits */}
        {isInstalled ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Aplikasi Sudah Terpasang</p>
              <p className="text-xs text-emerald-400/80">SMART-AI.ID sedang berjalan dalam mode aplikasi mandiri (PWA Standalone).</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <p className="text-sm text-slate-300 leading-relaxed">
              Pasang aplikasi SMART-AI.ID langsung ke layar utama smartphone atau desktop Anda tanpa perlu mengunduh melalui Play Store / App Store.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-200 block">Akses Instan & Cepat</span>
                  <span className="text-slate-400">Booting cepat dalam hitungan milidetik.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <WifiOff className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-200 block">Offline Resilient</span>
                  <span className="text-slate-400">Katalog & tools tetap dapat dibuka offline.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-200 block">Hemat Memori & Data</span>
                  <span className="text-slate-400">Ukuran ringan (&lt; 2 MB) tanpa bloatware.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <Monitor className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-200 block">Tampilan Fullscreen</span>
                  <span className="text-slate-400">Bebas bilah alamat browser yang mengganggu.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Platform Specific Instructions */}
        {platform === 'ios' && !isInstalled && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-slate-300 text-xs space-y-2 mb-6">
            <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> Cara Install di iPhone / iPad (Safari):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300">
              <li>Ketuk tombol <strong className="text-white inline-flex items-center gap-1"><Share2 className="w-3.5 h-3.5 text-cyan-400 inline" /> Bagikan (Share)</strong> di bilah bawah Safari.</li>
              <li>Gulir ke bawah dan pilih <strong className="text-white inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 text-cyan-400 inline" /> Tambahkan ke Layar Utama (Add to Home Screen)</strong>.</li>
              <li>Ketuk <strong>Tambah (Add)</strong> di pojok kanan atas.</li>
            </ol>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {!isInstalled && isInstallable && (
            <button
              onClick={handleInstallClick}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Install Sekarang
            </button>
          )}

          {isInstalled && (
            <div className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-slate-800 text-slate-300 text-center font-medium text-sm">
              Mode PWA Aktif
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
