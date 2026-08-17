import React from 'react';
import { IndustryCard } from './IndustryCard';
import { IndustrySolutionConfig } from '../../types';

interface IndustryGridProps {
  solutions: IndustrySolutionConfig[];
}

export const IndustryGrid: React.FC<IndustryGridProps> = ({ solutions }) => {
  if (solutions.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
        <p className="text-slate-400 text-lg font-medium">Industry Solution Not Found</p>
        <p className="text-slate-500 text-sm mt-1">Coba kata kunci pencarian lain atau pilih kategori All.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {solutions.map((item) => (
        <IndustryCard key={item.slug} solution={item} />
      ))}
    </div>
  );
};
