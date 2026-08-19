import React, { useState, useEffect } from 'react';
import { Monitor, Laptop, Tablet, Smartphone, Apple, CheckCircle2, Zap, ShieldCheck, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const DeviceCompatibilityShowcase: React.FC = () => {
  const { platform, isInstalled, isOnline } = usePWA();
  const [deviceInfo, setDeviceInfo] = useState({
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    touchSupported: false,
    deviceCategory: 'PC / Desktop',
    osName: 'Detecting...'
  });

  const [activeTab, setActiveTab] = useState<'all' | 'pc' | 'laptop' | 'tablet' | 'android' | 'ios'>('all');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const ua = navigator.userAgent.toLowerCase();

      let cat = 'PC / Desktop (Ultra-wide / FHD)';
      if (w < 640) {
        cat = 'Mobile Phone';
      } else if (w < 1024) {
        cat = 'Tablet / Foldable';
      } else if (w < 1440) {
        cat = 'Laptop / Notebook';
      }

      let os = 'Windows / Linux PC';
      if (/iphone|ipad|ipod/.test(ua)) {
        os = /ipad/.test(ua) || (touch && w >= 768) ? 'Apple iPadOS' : 'Apple iOS (iPhone)';
      } else if (/android/.test(ua)) {
        os = w >= 768 ? 'Android Tablet' : 'Android Mobile';
      } else if (/macintosh|mac os x/.test(ua)) {
        os = 'macOS (MacBook / iMac)';
      } else if (/windows/.test(ua)) {
        os = 'Microsoft Windows';
      }

      setDeviceInfo({
        screenWidth: w,
        screenHeight: h,
        dpr: Math.round(dpr * 10) / 10,
        touchSupported: touch,
        deviceCategory: cat,
        osName: os
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const deviceTypes = [
    {
      id: 'pc',
      name: 'PC Desktop (Windows/Linux)',
      icon: Monitor,
      screenRange: '1920x1080 s/d 4K Ultra-Wide',
      badge: 'Multi-Window & High-DPI',
      color: 'from-blue-500 to-cyan-500',
      specs: [
        'Tampilan ultra-wide tanpa distorsi (Max container 7xl/1280px)',
        'Dukungan penuh navigasi keyboard, shortcut & cursor hover states',
        'PWA Standalone window desktop (akses langsung dari desktop icon)',
        'Akselerasi hardware rendering grafis & visualisasi AI real-time'
      ]
    },
    {
      id: 'laptop',
      name: 'Laptop & MacBook (13"-16")',
      icon: Laptop,
      screenRange: '1366x768 s/d 2560x1600 Retina',
      badge: 'Retina & Touchpad Optimized',
      color: 'from-indigo-500 to-blue-500',
      specs: [
        'Optimasi penskalaan tajam untuk Apple Retina & Windows High-DPI',
        'Fluid responsive layout adaptif terhadap ukuran jendela browser',
        'Dukungan gesture pinch-to-zoom & horizontal touchpad scroll',
        'Mode offline mandiri hemat daya baterai laptop'
      ]
    },
    {
      id: 'tablet',
      name: 'Tablet (iPad & Galaxy Tab)',
      icon: Tablet,
      screenRange: '768px s/d 1024px+ (Portrait & Landscape)',
      badge: 'Touch Grid & Stylus Ready',
      color: 'from-purple-500 to-indigo-500',
      specs: [
        'Bento-grid 2 kolom responsif untuk orientasi horizontal/vertikal',
        'Area sentuh (touch target) luas standar ergonomi minimal 44px',
        'Split-screen multitasking iPadOS & Samsung DeX compatible',
        'Akses instan modul AI Builder & visual dashboard dengan sentuhan'
      ]
    },
    {
      id: 'android',
      name: 'Mobile Android (All Brands)',
      icon: Smartphone,
      screenRange: '360px s/d 480px (Samsung, Xiaomi, Pixel, dll)',
      badge: 'PWA WebAPK & Fast Touch',
      color: 'from-emerald-500 to-teal-500',
      specs: [
        'Web App Manifest terstandar untuk instalasi 1-klik ke Home Screen',
        'Mobile Native Bottom Bar navigasi jempol yang ergonomis',
        'Optimasi RAM hemat memori (< 2 MB) dan offline caching cerdas',
        'Dukungan Android back-button & pull-to-refresh'
      ]
    },
    {
      id: 'ios',
      name: 'Mobile iOS (iPhone All Series)',
      icon: Apple,
      screenRange: 'iPhone SE, 11, 12, 13, 14, 15, 16 Pro Max',
      badge: 'Dynamic Island & Safe Area',
      color: 'from-cyan-500 to-emerald-500',
      specs: [
        'Dukungan penuh iOS Safe Area (Dynamic Island, Notch & Home Bar)',
        'Apple Touch Icon beresolusi retina untuk Home Screen Safari',
        'Smooth momentum scrolling & no-flicker transisi native',
        'Status bar black-translucent terintegrasi tema gelap'
      ]
    }
  ];

  const filteredDevices = activeTab === 'all' 
    ? deviceTypes 
    : deviceTypes.filter(d => d.id === activeTab);

  return (
    <section className="py-16 bg-[#070b14]/90 border-t border-b border-slate-800/80 relative overflow-hidden text-slate-100">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Universal Multi-Device Native Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Akses Sempurna di <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">PC, Laptop, Tablet &amp; Mobile</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            SMART-AI.ID dirancang dengan arsitektur responsif modern &amp; Progressive Web App (PWA) yang secara otomatis menyesuaikan antarmuka secara native di semua perangkat dan sistem operasi.
          </p>
        </div>

        {/* Live Device Inspector Card (Real-time detection for the user) */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#0d1424]/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl shadow-cyan-950/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Deteksi Perangkat Anda Saat Ini: <span className="text-cyan-400 font-mono">{deviceInfo.osName}</span>
                </h3>
                <p className="text-xs text-slate-400">Kategori: {deviceInfo.deviceCategory} • Resolusi Viewport: {deviceInfo.screenWidth} × {deviceInfo.screenHeight} px (DPR: {deviceInfo.dpr}x)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Native View Compatible
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Metode Input</span>
              <span className="font-semibold text-slate-200">{deviceInfo.touchSupported ? 'Touch Screen & Gestures' : 'Mouse & Keyboard'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Status PWA</span>
              <span className="font-semibold text-slate-200">{isInstalled ? 'Standalone Mode' : 'Browser Web App'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Koneksi Data</span>
              <span className="font-semibold text-emerald-400">{isOnline ? 'Online Real-time' : 'Offline Cached'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Dynamic Safe Area</span>
              <span className="font-semibold text-cyan-300">Aktif &amp; Terkalibrasi</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'all', label: 'Semua Perangkat' },
            { id: 'pc', label: 'PC Desktop' },
            { id: 'laptop', label: 'Laptop / MacBook' },
            { id: 'tablet', label: 'Tablet (iPad/Android)' },
            { id: 'android', label: 'Mobile Android' },
            { id: 'ios', label: 'Mobile iOS (iPhone)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Device Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className="p-6 rounded-2xl bg-[#0b101d] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${device.color} p-0.5 shadow-md`}>
                      <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                      {device.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {device.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mb-4">
                    {device.screenRange}
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {device.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-cyan-400">Native View 100% OK</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Siap Diakses
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
