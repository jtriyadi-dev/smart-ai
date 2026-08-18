import React, { useState, useMemo } from 'react';
import { useNavigate } from '../../lib/router';
import { Search, Sparkles, Filter, Layers, ArrowRight, Bot } from 'lucide-react';
import { IndustryHero } from '../../components/solutions/IndustryHero';
import { IndustryGrid } from '../../components/solutions/IndustryGrid';
import { IndustryCard } from '../../components/solutions/IndustryCard';
import { IndustrySolutionsService } from '../../services/IndustrySolutionsService';
import { IndustrySolutionCategory } from '../../types';

const CATEGORIES: IndustrySolutionCategory[] = [
  'All',
  'Industrial',
  'Healthcare',
  'Education',
  'Agriculture',
  'Aquaculture',
  'Hospitality',
  'Travel & Umroh',
  'Retail',
  'Finance',
  'Food & Beverage',
  'Logistics',
  'Enterprise',
];

export const IndustrySolutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IndustrySolutionCategory>('All');

  const allSolutions = useMemo(() => {
    return IndustrySolutionsService.getAllSolutions().filter((s) => s.published);
  }, []);

  const featuredSolutions = useMemo(() => {
    return IndustrySolutionsService.getFeaturedSolutions();
  }, []);

  const filteredSolutions = useMemo(() => {
    return allSolutions.filter((sol) => {
      const matchCat =
        selectedCategory === 'All' || sol.category === selectedCategory;
      const matchQuery =
        searchTerm.trim() === '' ||
        sol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.heroTagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.modules.some((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [allSolutions, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero */}
      <IndustryHero
        title="AI-Powered Solutions for Every Industry"
        subtitle="SMART-AI.ID membangun aplikasi web dan software berbasis AI yang dirancang khusus sesuai proses bisnis unik setiap industri."
        category="Industry Solutions Catalog"
      />

      {/* Featured Solutions Section */}
      {featuredSolutions.length > 0 && selectedCategory === 'All' && searchTerm === '' && (
        <section className="py-12 bg-slate-900/40 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/50 px-3 py-1 rounded-full">
                  Featured Solutions
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-2">
                  Solusi Industri Utama (Paling Banyak Digunakan)
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSolutions.map((sol) => (
                <IndustryCard key={sol.slug} solution={sol} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <section className="py-8 bg-slate-950 sticky top-16 z-30 border-b border-slate-800/80 backdrop-blur-xl bg-slate-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your industry..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>
                Catalog Solutions ({filteredSolutions.length} Solusi Industri)
              </span>
            </h2>
          </div>

          <IndustryGrid solutions={filteredSolutions} />
        </div>
      </section>
    </div>
  );
};
