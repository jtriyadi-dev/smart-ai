import React, { useState, useEffect } from 'react';
import { PortfolioService } from '../../services/PortfolioService';
import { PortfolioConfig } from '../../types';
import { useNavigate } from '../../lib/router';
import {
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Cpu,
  Box,
  Compass,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

const CATEGORY_FILTERS = [
  'All',
  'Mining',
  'Agriculture',
  'Aquaculture',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Food & Beverage',
  'Travel & Umroh',
  'Logistics',
  'Enterprise'
];

export const PortfolioLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'industry' | 'ai'>('featured');
  const [portfolios, setPortfolios] = useState<PortfolioConfig[]>([]);

  useEffect(() => {
    loadPortfolios();
  }, [searchQuery, selectedCategory, sortBy]);

  const loadPortfolios = () => {
    const list = PortfolioService.getAllPortfolios({
      query: searchQuery,
      category: selectedCategory,
      sortBy: sortBy,
      approvalStatus: 'PUBLISHED'
    });
    setPortfolios(list);
  };

  const handleBuildSolution = () => {
    navigate('/ai-app-builder');
  };

  const handleSelectPortfolio = (slug: string) => {
    PortfolioService.trackClick(slug);
    navigate(`/portfolio/${slug}`);
  };

  return (
    <div className="py-20 md:py-28 bg-[#06090e] bg-tech-grid text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/50">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENTERPRISE SOLUTION SHOWCASE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            Solutions We've Designed <br />
            for <span className="text-gradient-cyan">Smarter Businesses</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore our AI-powered application concepts, platforms, and business solutions tailored for complex enterprise processes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#portfolio-grid"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore Portfolio</span>
            </a>
            <button
              onClick={handleBuildSolution}
              className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-xl shadow-cyan-500/25 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Build Your Solution</span>
            </button>
          </div>
        </div>

        {/* CONCEPT DISCLAIMER BANNER */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-cyan-900 text-cyan-200 font-mono font-bold text-[10px] uppercase border border-cyan-400/30">
              CONCEPT PROJECT
            </span>
            <p className="text-slate-300">
              Concept Project — A conceptual solution designed by SMART-AI.ID to demonstrate how AI-powered digital systems can be applied to this industry.
            </p>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div id="portfolio-grid" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search portfolio, industry, module, tech stack..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="featured">Featured Projects</option>
                <option value="newest">Newest Added</option>
                <option value="industry">Alphabetical Industry</option>
                <option value="ai">Most AI Capabilities</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10 font-bold'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PORTFOLIO GRID */}
        {portfolios.length === 0 ? (
          <div className="py-20 text-center space-y-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Box className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Portfolio Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your keyword or industry filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectPortfolio(item.slug)}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Card Header Banner */}
                  <div className={`h-40 bg-gradient-to-br ${item.coverImage} p-5 flex flex-col justify-between relative`}>
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-950/80 text-cyan-300 border border-cyan-500/40">
                        {item.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2.5 py-1 rounded border border-slate-800">
                        {item.industry}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-display font-bold text-white z-10 group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-300/80 font-mono mt-1">
                        {item.modules.length} Core Modules &bull; {item.aiFeatures.length} AI Features
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* AI Feature highlight */}
                    {item.aiFeatures[0] && (
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                        <div className="text-[10px] font-mono text-purple-300 font-bold uppercase flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          <span>AI Capability: {item.aiFeatures[0].name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {item.aiFeatures[0].description}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.technology.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPortfolio(item.slug);
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
