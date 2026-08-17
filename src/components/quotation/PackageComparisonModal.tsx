import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap, Layers, AlertCircle, Building2, Calendar, RefreshCw, Gem } from 'lucide-react';
import { QuotationPackage } from '../../types';
import { CurrencyService } from '../../services/CurrencyService';
import { IndustryPricingService, INDUSTRY_SECTOR_CONFIGS } from '../../services/IndustryPricingService';

interface PackageComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (pkg: Partial<QuotationPackage>, selectedIndustryName?: string) => void;
  currentIndustry?: string;
  currency?: string;
  initialPricingModel?: 'One-time' | 'Monthly' | 'Hybrid';
}

export const PackageComparisonModal: React.FC<PackageComparisonModalProps> = ({
  isOpen,
  onClose,
  onSelectPackage,
  currentIndustry = 'Pertambangan Batubara & Mineral',
  currency = 'IDR',
  initialPricingModel = 'One-time'
}) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(() => {
    const found = IndustryPricingService.getIndustryById(currentIndustry);
    return found.id;
  });
  const [pricingModel, setPricingModel] = useState<'One-time' | 'Monthly' | 'Hybrid'>(initialPricingModel);

  useEffect(() => {
    if (currentIndustry) {
      const found = IndustryPricingService.getIndustryById(currentIndustry);
      setSelectedIndustryId(found.id);
    }
  }, [currentIndustry, isOpen]);

  useEffect(() => {
    if (initialPricingModel) {
      setPricingModel(initialPricingModel);
    }
  }, [initialPricingModel, isOpen]);

  if (!isOpen) return null;

  const currentIndustryConfig = IndustryPricingService.getIndustryById(selectedIndustryId);
  const packages = IndustryPricingService.getPackagesForIndustry(selectedIndustryId, currency, pricingModel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl p-6 sm:p-8 my-8 shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Matriks Harga Paket & Layanan Bulanan
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pilihan Model Finansial & Paket Sektor Industri
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pilih antara investasi kepemilikan penuh (One-time CapEx), langganan SaaS bulanan terkelola (Monthly OpEx), atau model Hybrid.
          </p>
        </div>

        {/* Pricing Model Segmented Control */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex flex-wrap items-center gap-1.5 shadow-inner">
            <button
              onClick={() => setPricingModel('One-time')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                pricingModel === 'One-time'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Gem className="w-3.5 h-3.5" />
              Proyek Sekali Bayar (CapEx)
            </button>

            <button
              onClick={() => setPricingModel('Monthly')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                pricingModel === 'Monthly'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Layanan Bulanan (SaaS / Retainer)
            </button>

            <button
              onClick={() => setPricingModel('Hybrid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                pricingModel === 'Hybrid'
                  ? 'bg-purple-500 text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Hybrid (Setup + Retainer Bulanan)
            </button>
          </div>
        </div>

        {/* Industry Selector Bar */}
        <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold mb-0.5">
                Sektor / Industri Klien:
              </label>
              <select
                value={selectedIndustryId}
                onChange={(e) => setSelectedIndustryId(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-cyan-500 w-full sm:w-80 cursor-pointer"
              >
                {INDUSTRY_SECTOR_CONFIGS.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.name} (Multiplier: {ind.priceMultiplier}x)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Industry info badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              <span className="text-slate-400">Model: </span>
              <span className={`font-semibold ${pricingModel === 'Monthly' ? 'text-emerald-400' : pricingModel === 'Hybrid' ? 'text-purple-400' : 'text-cyan-400'}`}>
                {pricingModel === 'Monthly' ? 'Layanan Bulanan (OpEx)' : pricingModel === 'Hybrid' ? 'Hybrid (CapEx + OpEx)' : 'Proyek Penuh (CapEx)'}
              </span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              <span className="text-slate-400">Tingkat: </span>
              <span className="font-semibold text-cyan-400">{currentIndustryConfig.complexityLevel}</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              <span className="text-slate-400">Rate: </span>
              <span className="font-mono font-bold text-amber-400">{currentIndustryConfig.priceMultiplier}x</span>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, idx) => {
            const isFeatured = pkg.name === 'Professional';
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500/50 ring-1 ring-cyan-500/30 shadow-xl shadow-cyan-950/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-md">
                    <Zap className="w-3 h-3 fill-slate-950" /> Rekomendasi Sektor
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {currentIndustryConfig.category.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[42px]">{pkg.description}</p>

                  {/* Price Box */}
                  <div className="mb-5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    {pricingModel === 'Monthly' ? (
                      <>
                        <span className="text-[10px] text-emerald-400 block uppercase font-mono tracking-wider mb-0.5 flex items-center justify-center gap-1">
                          <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" style={{ animationDuration: '6s' }} />
                          Biaya Langganan Bulanan
                        </span>
                        <div className="text-xl font-extrabold text-emerald-400 tracking-tight">
                          {CurrencyService.formatCurrency(pkg.monthlyPrice || 0, currency)}
                          <span className="text-xs font-normal text-slate-400 ml-1">/ bulan</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Tahunan: {CurrencyService.formatCurrency((pkg.monthlyPrice || 0) * 10, currency)} <span className="text-emerald-400 font-semibold">(Hemat 2 bln)</span>
                        </span>
                      </>
                    ) : pricingModel === 'Hybrid' ? (
                      <>
                        <span className="text-[10px] text-purple-400 block uppercase font-mono tracking-wider mb-0.5">
                          Implementasi + Retainer Bulanan
                        </span>
                        <div className="text-base font-extrabold text-cyan-400 tracking-tight">
                          {CurrencyService.formatCurrency(pkg.basePrice || 0, currency)}
                          <span className="text-[10px] font-normal text-slate-400 ml-1">setup</span>
                        </div>
                        <div className="text-sm font-bold text-purple-400 mt-0.5">
                          + {CurrencyService.formatCurrency(pkg.monthlyPrice || 0, currency)}
                          <span className="text-[10px] font-normal text-slate-400 ml-1">/ bulan SLA</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider mb-0.5">
                          Investasi Penuh (One-Time)
                        </span>
                        <span className="text-xl font-extrabold text-cyan-400 tracking-tight">
                          {CurrencyService.formatCurrency(pkg.basePrice || 0, currency)}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Kepemilikan Source Code Penuh
                        </span>
                      </>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 text-xs text-slate-300 mb-5">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span><strong>Kapasitas:</strong> {pkg.users}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span><strong>Platform:</strong> {pkg.platform}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span><strong>Dukungan SLA:</strong> {pkg.support}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span><strong>Masa Garansi / Servis:</strong> {pkg.warranty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span><strong>Estimasi:</strong> {pkg.timeline}</span>
                    </div>
                  </div>

                  {/* Features list */}
                  {pkg.features && pkg.features.length > 0 && (
                    <div className="border-t border-slate-800/80 pt-3 mb-4">
                      <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider block mb-1.5">
                        Inklusi Layanan {pricingModel === 'Monthly' ? 'SaaS' : 'Paket'}:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {pkg.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 text-[11px]">
                            <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="border-t border-slate-800/80 pt-3.5 mb-5">
                    <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider block mb-2 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-cyan-400" /> Modul Sektor {currentIndustryConfig.name.split(' ')[0]}:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {pkg.modules?.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5 text-[11px] leading-snug">
                          <span className="text-cyan-400 mt-0.5 font-bold">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectPackage({ ...pkg, pricingModel }, currentIndustryConfig.name);
                    onClose();
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    pricingModel === 'Monthly'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20'
                      : isFeatured
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  {pricingModel === 'Monthly' ? `Terapkan Langganan Bulanan (${pkg.name})` : `Terapkan Paket ${pkg.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Notes */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400" />
            <span>
              {pricingModel === 'Monthly'
                ? 'Paket layanan bulanan sudah mencakup cloud infrastructure, pemeliharaan bugfix, dan SLA garansi aktif.'
                : 'Memilih paket akan otomatis mengonfigurasi rincian modul dan harga di lembar penawaran.'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
