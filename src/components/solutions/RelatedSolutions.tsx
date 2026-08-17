import React from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowRight, Layers } from 'lucide-react';
import { IndustrySolutionsService } from '../../services/IndustrySolutionsService';

interface RelatedSolutionsProps {
  relatedSlugs: string[];
  currentSlug: string;
}

export const RelatedSolutions: React.FC<RelatedSolutionsProps> = ({ relatedSlugs, currentSlug }) => {
  const navigate = useNavigate();
  const all = IndustrySolutionsService.getAllSolutions();

  const relatedList = all.filter(
    (item) => relatedSlugs.includes(item.slug) && item.slug !== currentSlug
  );

  if (relatedList.length === 0) return null;

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Explore More
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Solusi Industri Terkait (Related Solutions)
            </h2>
          </div>

          <button
            onClick={() => navigate('/solutions')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Lihat Semua Solusi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedList.map((sol) => (
            <div
              key={sol.slug}
              onClick={() => navigate(`/solutions/${sol.slug}`)}
              className="bg-slate-900/60 border border-slate-800 hover:border-cyan-600/60 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="text-3xl mb-3">{sol.icon}</div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                {sol.name}
              </h3>
              <p className="text-slate-400 text-xs line-clamp-2 mb-3">
                {sol.subtitle}
              </p>
              <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Pelajari Solusi</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
