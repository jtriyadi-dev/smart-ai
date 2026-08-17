import React, { useState } from 'react';
import { EstimationPricingConfig } from '../../types';
import { X, Settings, Save, RefreshCw, Check } from 'lucide-react';

interface PricingConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: EstimationPricingConfig;
  onSaveConfig: (updated: EstimationPricingConfig) => void;
}

export const PricingConfigModal: React.FC<PricingConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  const [formData, setFormData] = useState<EstimationPricingConfig>({ ...config });
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Konfigurasi Pricing & Rate Engine (Admin)</h2>
              <p className="text-xs text-slate-400">Atur bobot biaya komponen dasar untuk simulasi estimasi.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Base Project Cost (IDR)</label>
              <input
                type="number"
                value={formData.baseProjectCost}
                onChange={(e) => setFormData({ ...formData, baseProjectCost: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Cost Per Module (IDR)</label>
              <input
                type="number"
                value={formData.costPerModule}
                onChange={(e) => setFormData({ ...formData, costPerModule: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Cost Per Feature (IDR)</label>
              <input
                type="number"
                value={formData.costPerFeature}
                onChange={(e) => setFormData({ ...formData, costPerFeature: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Rate Per Person-Day (IDR)</label>
              <input
                type="number"
                value={formData.ratePerPersonDay}
                onChange={(e) => setFormData({ ...formData, ratePerPersonDay: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Cost Per API Integration (IDR)</label>
              <input
                type="number"
                value={formData.apiWeightPerIntegration}
                onChange={(e) => setFormData({ ...formData, apiWeightPerIntegration: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              Bobot Tambahan Layanan AI (AI Weight Multiplier IDR):
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Basic', 'Intermediate', 'Advanced', 'Enterprise'].map((lvl) => (
                <div key={lvl}>
                  <label className="block text-slate-400 text-[11px] mb-1">Level {lvl}</label>
                  <input
                    type="number"
                    value={formData.aiWeightMultiplier[lvl] || 0}
                    onChange={(e) => setFormData({
                      ...formData,
                      aiWeightMultiplier: {
                        ...formData.aiWeightMultiplier,
                        [lvl]: parseInt(e.target.value) || 0
                      }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono text-[11px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            *Perubahan bobot akan langsung mempengaruhi perhitungan estimasi lokal.
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Batal
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? 'Tersimpan!' : 'Simpan Konfigurasi'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
