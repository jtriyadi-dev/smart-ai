import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Bot, ChevronRight } from 'lucide-react';
import { useNavigate } from '../../lib/router';

interface IndustryHeroProps {
  title: string;
  subtitle: string;
  icon?: string;
  category?: string;
  buildSlug?: string;
  onRequestConsultation?: () => void;
  onEstimate?: () => void;
}

export const IndustryHero: React.FC<IndustryHeroProps> = ({
  title,
  subtitle,
  icon = '✨',
  category,
  buildSlug,
  onRequestConsultation,
  onEstimate,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800/80 py-16 md:py-24 text-white">
      {/* Subtle Background Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {category && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-xs font-medium mb-6 backdrop-blur-md"
            >
              <span className="text-base">{icon}</span>
              <span>{category} Solution Architecture</span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate(`/ai-app-builder?industry=${encodeURIComponent(buildSlug || '')}`)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Build With AI</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {onRequestConsultation && (
              <button
                onClick={onRequestConsultation}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold backdrop-blur-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Bot className="w-5 h-5 text-cyan-400" />
                <span>Talk to Our Expert</span>
              </button>
            )}

            {onEstimate && (
              <button
                onClick={onEstimate}
                className="px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 font-medium text-sm flex items-center gap-1.5 transition-all"
              >
                <span>Get Initial Estimate</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
