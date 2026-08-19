import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setShowReconnected(false);
    } else if (wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (isOnline && !showReconnected) {
    return null;
  }

  if (showReconnected) {
    return (
      <div 
        role="status"
        aria-live="polite"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
      >
        <div className="px-4 py-2 rounded-full bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md text-emerald-300 text-xs font-semibold shadow-lg shadow-emerald-950/40 flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span>Koneksi Internet Tersambung Kembali</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      role="status"
      aria-live="polite"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
    >
      <div className="px-4 py-2 rounded-full bg-amber-950/90 border border-amber-500/50 backdrop-blur-md text-amber-200 text-xs font-semibold shadow-lg shadow-amber-950/40 flex items-center gap-2.5">
        <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Mode Offline Aktif — Menampilkan data tersimpan</span>
        <button
          onClick={() => window.location.reload()}
          className="ml-1 px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Cek
        </button>
      </div>
    </div>
  );
};
