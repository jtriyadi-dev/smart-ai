import React, { useState } from 'react';
import { Calculator, Clock, Layers, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface InteractiveEstimatorProps {
  onApplyEstimateToForm: (data: { appType: string; userScale: string; budget: string; features: string[] }) => void;
}

export const InteractiveEstimator: React.FC<InteractiveEstimatorProps> = ({ onApplyEstimateToForm }) => {
  const [appType, setAppType] = useState<string>('Custom Business Application & AI');
  const [userScale, setUserScale] = useState<string>('10-50 Users (Tim Internal)');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Otomatisasi Workflow & Approval',
    'Integrasi AI (Google Gemini / LLM)',
    'Dashboard Analytics & Export Data'
  ]);
  const [budgetTier, setBudgetTier] = useState<string>('Paket Professional (Rp 15jt - 35jt)');

  const availableFeatures = [
    'Otomatisasi Workflow & Approval',
    'Integrasi AI (Google Gemini / LLM)',
    'OCR & Document Parsing AI',
    'Dashboard Analytics & Export Data',
    'WhatsApp Business API Gateway',
    'Progressive Web App (PWA Mobile Offline)',
    'Role-Based Multi Access Control (RBAC)',
    'Payment Gateway Integration'
  ];

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  // Calculate estimated timeline weeks dynamically
  const calculatedWeeksMin = Math.max(2, Math.floor(2 + selectedFeatures.length * 0.5));
  const calculatedWeeksMax = calculatedWeeksMin + 2;

  const handleApply = () => {
    onApplyEstimateToForm({
      appType,
      userScale,
      budget: budgetTier,
      features: selectedFeatures
    });

    const formEl = document.querySelector('#request-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl mb-12">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-display text-white">Interactive Application Scope Estimator</h3>
          <p className="text-xs text-slate-300">Simulasikan perkiraan waktu dan spesifikasi sebelum mengajukan permohonan</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Configurator Column */}
        <div className="lg:col-span-8 space-y-6 text-left">
          
          {/* App Type */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
              1. Jenis Aplikasi Utama:
            </label>
            <select
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="AI Web Application Development">AI Web Application Development</option>
              <option value="Custom Business Application & ERP">Custom Business Application & ERP</option>
              <option value="AI Business Automation System">AI Business Automation System</option>
              <option value="Dashboard & Business Intelligence">Dashboard & Business Intelligence</option>
              <option value="Custom Industry System (Tambang, Kebun, RS, dll)">Custom Industry System (Tambang, Kebun, RS, dll)</option>
            </select>
          </div>

          {/* User Scale */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
              2. Estimasi Jumlah Pengguna (User Volume):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                '1-10 Users',
                '10-50 Users',
                '50-500 Users',
                '500+ Users (Enterprise)'
              ].map(scale => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setUserScale(scale)}
                  className={`p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    userScale === scale
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>
          </div>

          {/* Features Checkboxes */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
              3. Pilih Modul & Fitur Kunci yang Dibutuhkan:
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {availableFeatures.map(feat => {
                const isChecked = selectedFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{feat}</span>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isChecked ? 'text-cyan-400' : 'text-slate-700'}`} />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Estimation Summary Box */}
        <div className="lg:col-span-4 bg-slate-950/90 rounded-xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold">
              Hasil Estimasi Proyek:
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Estimasi Durasi Pengerjaan:</div>
              <div className="text-xl font-extrabold text-cyan-300 font-mono mt-0.5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>{calculatedWeeksMin} - {calculatedWeeksMax} Minggu</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Total Modul Terpilih:</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">
                {selectedFeatures.length} Modul Utam
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
              ✓ Termasuk garansi bug-free, setup cloud server, dan training tim internal.
            </div>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Terapkan ke Form Permohonan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
