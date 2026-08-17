import React, { useState, useEffect } from 'react';
import { PortfolioScreenshotItem } from '../../types';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface PortfolioLightboxModalProps {
  isOpen: boolean;
  screenshots: PortfolioScreenshotItem[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const PortfolioLightboxModal: React.FC<PortfolioLightboxModalProps> = ({
  isOpen,
  screenshots,
  currentIndex,
  onClose,
  onSelectIndex
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, screenshots.length]);

  if (!isOpen || screenshots.length === 0) return null;

  const active = screenshots[currentIndex] || screenshots[0];

  const handlePrev = () => {
    const prev = currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1;
    onSelectIndex(prev);
  };

  const handleNext = () => {
    const next = currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1;
    onSelectIndex(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              CONCEPT UI
            </span>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{active.title}</h3>
              <p className="text-xs text-slate-400">{active.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 min-w-[40px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-800 mx-1" />
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-950/50 hover:bg-red-900/60 border border-red-500/30 text-red-300 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div className="relative flex-1 bg-slate-950/90 overflow-auto flex items-center justify-center p-6 min-h-[300px]">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-950 text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-lg cursor-pointer"
            title="Previous Image (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="overflow-auto max-h-full max-w-full flex items-center justify-center transition-transform duration-200" style={{ transform: `scale(${zoomLevel})` }}>
            <img
              src={active.image}
              alt={active.title}
              className="max-h-[60vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-950 text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-lg cursor-pointer"
            title="Next Image (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Bar Thumbnail Carousel */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-t border-slate-800 gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {screenshots.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => onSelectIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'border-cyan-400 ring-2 ring-cyan-500/30 scale-105'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
            {currentIndex + 1} / {screenshots.length}
          </span>
        </div>

      </div>
    </div>
  );
};
