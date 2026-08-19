import React from 'react';
import { Home, Layers, Boxes, Cpu, Briefcase, MessageSquare, Sparkles } from 'lucide-react';

interface MobileNativeBottomBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const MobileNativeBottomBar: React.FC<MobileNativeBottomBarProps> = ({
  currentPath,
  onNavigate,
  onOpenConsultation,
}) => {
  // Don't show bottom bar in admin/crm/portal deep dashboards where sidebar is active
  if (
    currentPath.startsWith('/admin') ||
    currentPath.startsWith('/portal') ||
    currentPath.startsWith('/customer')
  ) {
    return null;
  }

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Solusi', path: '/solutions', icon: Boxes },
    { name: 'AI Builder', path: '/ai-app-builder', icon: Cpu, isHighlight: true },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Konsultasi', path: '/contact', icon: MessageSquare, isAction: true },
  ];

  return (
    <nav 
      aria-label="Navigasi Mobile Native"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#070b14]/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/80"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          if (item.isAction) {
            return (
              <button
                key={item.name}
                onClick={onOpenConsultation}
                className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-emerald-400 hover:text-emerald-300 transition-transform active:scale-90 cursor-pointer min-w-[56px] min-h-[44px]"
                aria-label="Mulai Konsultasi"
              >
                <div className="relative flex items-center justify-center">
                  <div className="p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <span className="text-[10px] font-semibold tracking-tight text-emerald-300 mt-1">
                  {item.name}
                </span>
              </button>
            );
          }

          if (item.isHighlight) {
            return (
              <button
                key={item.name}
                onClick={() => onNavigate(item.path)}
                className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-transform active:scale-90 cursor-pointer min-w-[56px] min-h-[44px]"
                aria-label="Buka AI Builder"
              >
                <div className={`p-1.5 rounded-xl ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' 
                    : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive ? 'text-cyan-300' : 'text-cyan-400/90'}`}>
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-transform active:scale-90 cursor-pointer min-w-[56px] min-h-[44px] ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={item.name}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'text-cyan-300 font-bold' : 'text-slate-400 font-medium'}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
