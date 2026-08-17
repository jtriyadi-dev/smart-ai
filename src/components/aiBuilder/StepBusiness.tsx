import React from 'react';
import { AIBuilderInput } from '../../types';
import { Building2, MapPin, Briefcase, FileText, Sparkles } from 'lucide-react';
import { INDUSTRY_SPECIFIC_FEATURE_GROUPS, IndustryFeatureService } from '../../data/industryFeaturesData';

interface StepBusinessProps {
  formData: AIBuilderInput;
  onChange: (field: keyof AIBuilderInput, value: any) => void;
  errors: Record<string, string>;
}

export const StepBusiness: React.FC<StepBusinessProps> = ({ formData, onChange, errors }) => {
  const businessTypes: AIBuilderInput['businessType'][] = [
    'Startup',
    'Small Business',
    'Medium Business',
    'Enterprise',
    'Organization'
  ];

  const handleIndustryChange = (newIndustry: string) => {
    onChange('businessIndustry', newIndustry);
    // Automatically preset recommended features for this industry if current selection is small or default
    const group = IndustryFeatureService.getFeatureGroupForIndustry(newIndustry);
    if (group && group.recommendedPresets && group.recommendedPresets.length > 0) {
      onChange('selectedFeatures', group.recommendedPresets);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-cyan-400" />
          <span>Ceritakan Tentang Bisnis Anda</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Bantu AI memahami latar belakang perusahaan, industri, dan bentuk operasional organisasi Anda.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Business Name */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nama Perusahaan / Bisnis</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: PT Batubara Mandiri Perkasa"
            value={formData.businessName}
            onChange={(e) => onChange('businessName', e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sektor Industri <span className="text-red-400">*</span></span>
          </label>
          <select
            value={formData.businessIndustry}
            onChange={(e) => handleIndustryChange(e.target.value)}
            className={`w-full bg-slate-900/90 border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all ${
              errors.businessIndustry ? 'border-red-500' : 'border-slate-700/80'
            }`}
          >
            <option value="">-- Pilih Sektor Industri --</option>
            {INDUSTRY_SPECIFIC_FEATURE_GROUPS.map((grp) => (
              <option key={grp.industryId} value={grp.industryName}>
                {grp.industryName} ({grp.category})
              </option>
            ))}
          </select>
          {errors.businessIndustry && (
            <p className="text-[11px] text-red-400 mt-1">{errors.businessIndustry}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Business Type */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block mb-1.5">
            Tipe Skala Organisasi
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {businessTypes.map((type) => {
              const selected = formData.businessType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => onChange('businessType', type)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                    selected
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold shadow-md shadow-cyan-950/50'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Business Location */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase font-mono block mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lokasi Operasional Utama</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Kalimantan Timur & Jakarta"
            value={formData.businessLocation}
            onChange={(e) => onChange('businessLocation', e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Business Description */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase font-mono block mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Deskripsi Aktivitas Bisnis & Alur Operasional <span className="text-red-400">*</span></span>
          </span>
          <span className="text-[10px] text-slate-500 font-normal">Minimal 15 karakter</span>
        </label>
        <textarea
          rows={4}
          placeholder="Contoh: Saya memiliki perusahaan tambang batubara dengan aktivitas produksi, hauling, alat berat, stockpile dan maintenance."
          value={formData.businessDescription}
          onChange={(e) => onChange('businessDescription', e.target.value)}
          className={`w-full bg-slate-900/90 border rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all ${
            errors.businessDescription ? 'border-red-500' : 'border-slate-700/80'
          }`}
        ></textarea>
        {errors.businessDescription ? (
          <p className="text-[11px] text-red-400 mt-1">{errors.businessDescription}</p>
        ) : (
          <p className="text-[11px] text-slate-500 mt-1">
            Makin jelas deskripsi alur kerja Anda, makin presisi cetak biru arsitektur aplikasi yang dirumuskan AI.
          </p>
        )}
      </div>

      <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center gap-2.5 text-xs text-cyan-300">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>Tips: Anda tidak perlu menjelaskan istilah teknis. Jelaskan saja apa yang dikerjakan tim Anda sehari-hari.</span>
      </div>
    </div>
  );
};
