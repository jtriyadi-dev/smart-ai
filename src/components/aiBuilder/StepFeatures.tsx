import React, { useState, useMemo } from 'react';
import { AIBuilderInput } from '../../types';
import { 
  Layers, Check, Sparkles, Plus, Bot, Star, 
  Search, RotateCcw, CheckCircle2, SlidersHorizontal,
  Pickaxe, Activity, Stethoscope, Trees, Egg, Fish, Factory,
  Truck, CreditCard, ShoppingCart, Bed, GraduationCap, Utensils,
  Building, ShieldCheck, Briefcase
} from 'lucide-react';
import { IndustryFeatureService, IndustryFeatureItem, INDUSTRY_SPECIFIC_FEATURE_GROUPS } from '../../data/industryFeaturesData';

interface StepFeaturesProps {
  formData: AIBuilderInput;
  onChange: (field: keyof AIBuilderInput, value: any) => void;
}

export const StepFeatures: React.FC<StepFeaturesProps> = ({ formData, onChange }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'industry' | 'general' | 'ai'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get dynamic combined feature sets based on current industry selection
  const featureData = useMemo(() => {
    return IndustryFeatureService.getCombinedFeaturesForIndustry(formData.businessIndustry);
  }, [formData.businessIndustry]);

  const { industryGroup, industryFeatures, generalFeatures, aiFeatures, allFeatures } = featureData;

  const toggleFeature = (featId: string) => {
    const current = formData.selectedFeatures || [];
    if (current.includes(featId)) {
      onChange('selectedFeatures', current.filter((f) => f !== featId));
    } else {
      onChange('selectedFeatures', [...current, featId]);
    }
  };

  // Quick Preset Actions
  const applyRecommendedPreset = () => {
    const recommended = industryGroup.recommendedPresets || [];
    // Merge existing non-conflicting selections or apply recommended
    const merged = Array.from(new Set([...recommended]));
    onChange('selectedFeatures', merged);
  };

  const selectAllIndustryFeatures = () => {
    const current = new Set(formData.selectedFeatures || []);
    industryFeatures.forEach((f) => current.add(f.id));
    onChange('selectedFeatures', Array.from(current));
  };

  const resetAllFeatures = () => {
    onChange('selectedFeatures', []);
  };

  // Filter features by tab and search
  const filteredFeatures = useMemo(() => {
    let list: IndustryFeatureItem[] = [];
    if (activeTab === 'industry') {
      list = industryFeatures;
    } else if (activeTab === 'general') {
      list = generalFeatures;
    } else if (activeTab === 'ai') {
      list = aiFeatures;
    } else {
      list = allFeatures;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          (f.badge && f.badge.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeTab, searchQuery, industryFeatures, generalFeatures, aiFeatures, allFeatures]);

  // Dynamic industry icon mapping
  const renderIndustryIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Pickaxe': return <Pickaxe className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'Trees': return <Trees className={className} />;
      case 'Egg': return <Egg className={className} />;
      case 'Fish': return <Fish className={className} />;
      case 'Factory': return <Factory className={className} />;
      case 'Truck': return <Truck className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      case 'ShoppingCart': return <ShoppingCart className={className} />;
      case 'Bed': return <Bed className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Building': return <Building className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Briefcase className={className} />;
    }
  };

  const selectedCount = (formData.selectedFeatures || []).length;
  const industrySelectedCount = industryFeatures.filter((f) => (formData.selectedFeatures || []).includes(f.id)).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      {/* Header with Industry Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            <span>Fitur-Fitur yang Anda Harapkan</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Disesuaikan khusus untuk kebutuhan operasional sektor <strong className="text-cyan-300">{industryGroup.industryName}</strong>.
          </p>
        </div>

        {/* Industry Sector Indicator & Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-cyan-500/30 rounded-xl px-3.5 py-2 shrink-0">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            {renderIndustryIcon(industryGroup.iconName, 'w-4 h-4')}
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold tracking-wider">Sektor Industri</div>
            <select
              value={formData.businessIndustry}
              onChange={(e) => onChange('businessIndustry', e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer pr-2"
            >
              {INDUSTRY_SPECIFIC_FEATURE_GROUPS.map((grp) => (
                <option key={grp.industryId} value={grp.industryName} className="bg-slate-900 text-white">
                  {grp.industryName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Preset Quick Actions Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-slate-900/80 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-cyan-950/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Star className="w-5 h-5 fill-cyan-400/20" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Paket Modul Rekomendasi Sektor {industryGroup.industryName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {industryGroup.recommendedPresets.length} Modul Terpilih
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {industryGroup.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={applyRecommendedPreset}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Terapkan Paket Rekomendasi</span>
          </button>
          
          <button
            type="button"
            onClick={resetAllFeatures}
            title="Reset Pilihan"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua ({allFeatures.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('industry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'industry'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/20'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Spesifik {industryGroup.category.split('&')[0]} ({industryFeatures.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'general'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Operasional ({generalFeatures.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white font-bold shadow'
                : 'text-purple-400 hover:text-purple-300 bg-purple-950/30 border border-purple-800/40'
            }`}
          >
            <Bot className="w-3 h-3" />
            <span>AI & Otomasi ({aiFeatures.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari modul atau fitur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Feature Grid List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredFeatures.map((item) => {
          const isSelected = (formData.selectedFeatures || []).includes(item.id);
          const isIndustrySpecific = item.category === 'Industry Specific';
          const isAI = item.isAI || item.category === 'AI';

          return (
            <div
              key={item.id}
              onClick={() => toggleFeature(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? isAI
                    ? 'bg-purple-950/40 border-purple-500/80 shadow-md shadow-purple-950/30 ring-1 ring-purple-500/40'
                    : 'bg-cyan-950/40 border-cyan-500/80 shadow-md shadow-cyan-950/30 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                {/* Header item: Checkbox & Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-all ${
                        isSelected
                          ? isAI
                            ? 'bg-purple-500 border-purple-400 text-white'
                            : 'bg-cyan-500 border-cyan-400 text-slate-950'
                          : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {item.badge && (
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                        isAI
                          ? 'bg-purple-950 text-purple-300 border-purple-800'
                          : isIndustrySpecific
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {isIndustrySpecific && !item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400" />
                        <span>Sektor</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Feature Name */}
                <h4 className={`text-xs font-bold leading-snug ${isSelected ? (isAI ? 'text-purple-200' : 'text-cyan-200') : 'text-slate-200 group-hover:text-white'}`}>
                  {item.name}
                </h4>

                {/* Feature Description */}
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Status footer inside card */}
              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                <span className={isSelected ? (isAI ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold') : 'text-slate-500'}>
                  {isSelected ? '✓ Ditambahkan ke Scope' : '+ Klik untuk memilih'}
                </span>
                {item.isRecommended && (
                  <span className="text-[9px] text-amber-400 flex items-center gap-0.5 font-medium">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <span>Rekomendasi</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-400">Tidak ada fitur yang cocok dengan pencarian "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            Bersihkan filter pencarian
          </button>
        </div>
      )}

      {/* Selected Summary Bar */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-white font-medium">
            Total Terpilih: <strong className="text-cyan-400">{selectedCount} Modul</strong>
            {industrySelectedCount > 0 && (
              <span className="text-slate-400 ml-1">
                ({industrySelectedCount} modul spesifik sektor {industryGroup.industryName})
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={selectAllIndustryFeatures}
            className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg transition-all border border-slate-700 cursor-pointer"
          >
            + Pilih Semua Modul Sektor
          </button>
        </div>
      </div>

      {/* Custom Feature Input */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase font-mono block flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fitur Kustom Khusus Lainnya (Opsional)</span>
        </label>
        <input
          type="text"
          placeholder="Sebutkan jika ada kebutuhan integrasi hardware khusus, SOP unik, atau modul kustom Anda..."
          value={formData.customFeatures}
          onChange={(e) => onChange('customFeatures', e.target.value)}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
        />
      </div>

      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>Pilihan fitur ini akan menjadi acuan modul utama dalam cetak biru arsitektur aplikasi Anda.</span>
      </div>
    </div>
  );
};
