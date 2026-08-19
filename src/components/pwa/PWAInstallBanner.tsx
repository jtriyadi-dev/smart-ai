import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, Zap } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

interface PWAInstallBannerProps {
  onOpenModal: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onOpenModal }) => {
  const { isInstalled, isInstallable, installApp, platform } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('smart_ai_pwa_banner_dismissed') === 'true';
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  // Do not show if already running in standalone mode or dismissed in this session
  if (isInstalled || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('smart_ai_pwa_banner_dismissed', 'true');
  };

  const handleInstall = async () => {
    if (isInstallable) {
      const res = await installApp();
      if (res.outcome === 'accepted') {
        setDismissed(true);
      }
    } else {
      onOpenModal();
    }
  };

  return (
    <aside 
      aria-label="Notifikasi PWA Install"
      className="fixed bottom-20 sm:bottom-24 lg:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-40 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative p-3.5 sm:p-4 rounded-2xl bg-[#090d16]/95 border border-cyan-500/30 backdrop-blur-xl shadow-xl shadow-cyan-950/40 text-slate-100 flex items-center gap-3">
        {/* Glow */}
        <div className="absolute -top-1 -right-1 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />

        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
          <img src="/icons/icon.svg" alt="App Icon" className="w-6 h-6" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400">
            <Zap className="w-3 h-3" /> PWA Ready
          </div>
          <p className="text-xs font-bold text-white truncate">Install SMART-AI.ID</p>
          <p className="text-[11px] text-slate-400 truncate">Akses cepat & hemat kuota</p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1 transition-transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            aria-label="Tutup Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
