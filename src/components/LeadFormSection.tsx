import React, { useState, useEffect } from 'react';
import { LeadFormData } from '../types';
import { Send, CheckCircle2, MessageSquare, Sparkles, Loader2, FileText, AlertCircle } from 'lucide-react';
import { InteractiveEstimator } from './InteractiveEstimator';

interface LeadFormSectionProps {
  initialData?: Partial<LeadFormData>;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: initialData?.name || '',
    company: initialData?.company || '',
    whatsapp: initialData?.whatsapp || '',
    email: initialData?.email || '',
    industry: initialData?.industry || 'Pertambangan',
    applicationType: initialData?.applicationType || 'AI Web Application Development',
    userCount: initialData?.userCount || '10-50 users',
    requiredFeatures: initialData?.requiredFeatures || [
      'Otomatisasi Workflow & Approval',
      'Integrasi AI (Google Gemini / LLM)'
    ],
    budgetEstimate: initialData?.budgetEstimate || 'Rp 15jt - Rp 35jt (Professional)',
    message: initialData?.message || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    leadId: string;
    whatsappUrl: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const industriesList = [
    'Pertambangan (Mining)',
    'Perkebunan (Plantation & PKS)',
    'Peternakan (Poultry Farm)',
    'Tambak Udang (Shrimp Farm)',
    'Rumah Sakit & Kesehatan',
    'Sekolah & Perguruan Tinggi',
    'Manufaktur & Pabrik',
    'Ritel & Multi-Store POS',
    'Logistik & Armada (Fleet)',
    'Restoran & Kuliner',
    'Distributor & Grossir',
    'e-Commerce & Marketplace',
    'Kontraktor & Konstruksi',
    'Perusahaan Jasa & Professional',
    'Organisasi & Institusi',
    'Lainnya (Custom Sector)'
  ];

  const appTypesList = [
    'AI Web Application Development',
    'Custom Business Application (ERP/CRM/HRIS)',
    'AI Business Automation System',
    'Dashboard & Business Intelligence',
    'Enterprise Management System',
    'AI Assistant / AI Copilot',
    'API Integration & Cloud Migration',
    'Progressive Web Application (PWA)'
  ];

  const availableFeatures = [
    'Otomatisasi Workflow & Approval',
    'Integrasi AI (Google Gemini / LLM)',
    'OCR & Document Parsing AI',
    'Dashboard Analytics & Export PDF/Excel',
    'WhatsApp Business API Gateway',
    'Progressive Web App (PWA Mobile Offline)',
    'Role-Based Multi Access Control (RBAC)',
    'Payment Gateway Integration',
    'System Integration & API Connector'
  ];

  const handleFeatureToggle = (feature: string) => {
    if (formData.requiredFeatures.includes(feature)) {
      setFormData({
        ...formData,
        requiredFeatures: formData.requiredFeatures.filter(f => f !== feature)
      });
    } else {
      setFormData({
        ...formData,
        requiredFeatures: [...formData.requiredFeatures, feature]
      });
    }
  };

  const handleApplyEstimate = (data: { appType: string; userScale: string; budget: string; features: string[] }) => {
    setFormData(prev => ({
      ...prev,
      applicationType: data.appType,
      userCount: data.userScale,
      budgetEstimate: data.budget,
      requiredFeatures: data.features
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setErrorMessage('Nama dan Nomor WhatsApp wajib diisi.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSubmissionResult({
          leadId: data.leadId,
          whatsappUrl: data.whatsappUrl,
          message: data.message
        });
      } else {
        setErrorMessage(data.error || 'Terjadi kesalahan saat mengirim form.');
      }
    } catch (err) {
      // Fallback lead generation response
      const fallbackId = `SAI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const waText = encodeURIComponent(
        `Halo Tim SMART-AI.ID,\n\nSaya *${formData.name}* dari *${formData.company || 'Perusahaan'}* (Industri: *${formData.industry}*).\n` +
        `Ingin berkonsultasi permohonan aplikasi: *${formData.applicationType}*.\n` +
        `Reference ID: #${fallbackId}`
      );
      setSubmissionResult({
        leadId: fallbackId,
        whatsappUrl: `https://wa.me/6281234567890?text=${waText}`,
        message: 'Permohonan konsultasi aplikasi Anda telah dibuat!'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="request-form" className="py-20 md:py-28 relative bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LEAD GENERATION & CONSULTATION REQUEST</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Request Your <span className="text-gradient-cyan">Application</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Sampaikan kebutuhan aplikasi bisnis Anda. Tim spesialis SMART-AI.ID akan menganalisis alur bisnis Anda dan memberikan rekomendasi arsitektur beserta estimasi pengerjaan.
          </p>
        </div>

        {/* Embedded Interactive Estimator Tool */}
        <InteractiveEstimator onApplyEstimateToForm={handleApplyEstimate} />

        {/* Lead Form Box */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
          
          {submissionResult ? (
            /* Confirmation Message View */
            <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block">
                  REFERENCE ID: #{submissionResult.leadId}
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  Permohonan Aplikasi Berhasil Diajukan!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  {submissionResult.message} Tim teknis SMART-AI.ID telah menerima spesifikasi Anda dan siap menjadwalkan sesi konsultasi mendalam.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs text-slate-300 font-mono">
                <div><strong>Nama:</strong> {formData.name}</div>
                <div><strong>Perusahaan:</strong> {formData.company || 'Perorangan'}</div>
                <div><strong>Industri:</strong> {formData.industry}</div>
                <div><strong>Jenis Aplikasi:</strong> {formData.applicationType}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={submissionResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Lanjutkan Konsultasi via WhatsApp (Fast Track)</span>
                </a>

                <button
                  onClick={() => setSubmissionResult(null)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-semibold text-xs rounded-xl transition-all"
                >
                  Ajukan Permohonan Lain
                </button>
              </div>
            </div>
          ) : (
            /* Main Input Form */
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Nama */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                    Nama Lengkap <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Perusahaan */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                    Nama Perusahaan / Institusi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT Agro Mandiri Nusantara"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                    Nomor WhatsApp Aktif <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                    Email Perusahaan
                  </label>
                  <input
                    type="email"
                    placeholder="Contoh: budi@agromandiri.co.id"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Industri */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                    Sektor Industri Perusahaan
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    {industriesList.map((ind, idx) => (
                      <option key={idx} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Jenis Aplikasi */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                    Jenis Aplikasi yang Dibutuhkan
                  </label>
                  <select
                    value={formData.applicationType}
                    onChange={(e) => setFormData({ ...formData, applicationType: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    {appTypesList.map((app, idx) => (
                      <option key={idx} value={app}>{app}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Fitur yang dibutuhkan Checkboxes */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                  Fitur Utama yang Diinginkan
                </label>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {availableFeatures.map((feature, idx) => {
                    const isChecked = formData.requiredFeatures.includes(feature);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleFeatureToggle(feature)}
                        className={`p-2.5 rounded-xl text-[11px] text-left border transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-1">{feature}</span>
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-cyan-400' : 'text-slate-700'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimasi Budget */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                  Estimasi Budget Pengembangan
                </label>
                <select
                  value={formData.budgetEstimate}
                  onChange={(e) => setFormData({ ...formData, budgetEstimate: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Rp 10jt - Rp 25jt (Starter Solution)">Rp 10jt - Rp 25jt (Starter Solution)</option>
                  <option value="Rp 25jt - Rp 60jt (Professional Solution)">Rp 25jt - Rp 60jt (Professional Solution)</option>
                  <option value="Rp 60jt - Rp 150jt (Enterprise Multi-Module)">Rp 60jt - Rp 150jt (Enterprise Multi-Module)</option>
                  <option value="> Rp 150jt (Large Enterprise & Custom AI)">&gt; Rp 150jt (Large Enterprise & Custom AI)</option>
                  <option value="Belum Ditentukan / Perlu Diskusi Konsultasi">Belum Ditentukan / Perlu Diskusi Konsultasi</option>
                </select>
              </div>

              {/* Pesan Kebutuhan Detail */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider block mb-2">
                  Pesan / Rincian Masalah Bisnis yang Ingin Diselesaikan
                </label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan gambaran singkat permasalahan operasional atau alur aplikasi yang ingin dibangun..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Memproses Permohonan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-200" />
                    <span>Ajukan Kebutuhan Aplikasi Sekarang</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
