import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { useNavigate } from '../../lib/router';
import { IndustrySolutionConfig } from '../../types';

interface IndustryCardProps {
  solution: IndustrySolutionConfig;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ solution }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl transition-all shadow-xl hover:shadow-cyan-500/10"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {solution.icon}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            AI Badge
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
          {solution.name}
        </h3>

        <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {solution.heroTagline || solution.subtitle}
        </p>

        {/* Popular Modules Pill preview */}
        <div className="mb-6 space-y-1.5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Popular Modules:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {solution.modules.slice(0, 4).map((mod) => (
              <span
                key={mod.id}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/50"
              >
                {mod.name}
              </span>
            ))}
            {solution.modules.length > 4 && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/30 text-slate-500">
                +{solution.modules.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-500 font-medium">
          {solution.category}
        </span>
        <button
          onClick={() => navigate(`/solutions/${solution.slug}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
        >
          <span>Explore Solution</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
