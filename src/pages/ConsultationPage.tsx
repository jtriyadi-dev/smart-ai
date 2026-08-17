import React, { useState, useEffect } from 'react';
import { useRouter } from '../lib/router';
import { LeadService } from '../services/leadService';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { Calendar, Clock, Send, Sparkles, Shield, User, Building, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  const { navigate } = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Enterprise Software',
    projectType: 'AI Software & App Development',
    projectDescription: '',
    preferredContactMethod: 'Google Meet',
    preferredContactTime: 'Siang (13:00 - 16:00 WIB)',
    honeypot: ''
  });

  const [estimateContext, setEstimateContext] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Book a Consultation | SMART-AI.ID';

    try {
      const savedEst = localStorage.getItem('smart_ai_project_estimate_latest');
      if (savedEst) {
        const parsed = JSON.parse(savedEst);
        setEstimateContext(parsed);
        setFormData((prev) => ({
          ...prev,
          industry: parsed.industry || prev.industry,
          projectDescription: `[Hasil AI Estimator]: ${parsed.projectTitle} (Complexity: ${parsed.complexity?.level}, Timeline: ${parsed.timeline?.minMonths}-${parsed.timeline?.maxMonths} Bln, Investasi: Rp ${(parsed.investment?.minIDR/1000000).toFixed(0)}M-${(parsed.investment?.maxIDR/1000000).toFixed(0)}M)`
        }));
      }
    } catch (e) {
      console.warn('Failed loading estimate context', e);
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Masukkan nama Anda.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Masukkan email valid.';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Masukkan nomor WhatsApp valid.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const createdLead = await LeadService.createLead({
        name: formData.name,
        company: formData.company || 'Perusahaan Klien',
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.phone,
        industry: formData.industry,
        service: 'Consulting',
        projectType: formData.projectType,
        source: estimateContext ? 'AI Project Estimator' : 'Direct Consultation',
        estimateId: estimateContext?.id,
        estimateSummary: estimateContext ? {
          title: estimateContext.projectTitle,
          complexity: `${estimateContext.complexity?.score}/100 (${estimateContext.complexity?.level})`,
          timeline: `${estimateContext.timeline?.minMonths}-${estimateContext.timeline?.maxMonths} Bulan`,
          investment: `Rp ${(estimateContext.investment?.minIDR/1000000).toFixed(0)}M - Rp ${(estimateContext.investment?.maxIDR/1000000).toFixed(0)}M`
        } : undefined,
        consultationDetails: {
          preferredContactMethod: formData.preferredContactMethod,
          preferredContactTime: formData.preferredContactTime,
          projectDescription: formData.projectDescription
        }
      });

      navigate(`/thank-you?ref=${createdLead.referenceCode}`);
    } catch (err) {
      console.error('Failed booking consultation:', err);
      setErrors({ general: 'Gagal menjadwalkan konsultasi. Silakan coba kembali.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Schedule Technical Review</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Book a Technical Consultation
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Jadwalkan sesi diskusi eksklusif bersama tim Senior Solution Architect SMART-AI.ID untuk membahas detail spesifikasi dan strategi implementasi.
          </p>
        </div>

        {/* Estimate Context Banner if loaded */}
        {estimateContext && (
          <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Contextual Estimate Attached:
              </span>
              <h3 className="text-sm font-bold text-white">{estimateContext.projectTitle}</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Timeline: {estimateContext.timeline?.minMonths}-{estimateContext.timeline?.maxMonths} Bln | Complexity: {estimateContext.complexity?.level}
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold shrink-0">
              ID: {estimateContext.id}
            </span>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} className="hidden" tabIndex={-1} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  placeholder="e.g. Andi Wijaya"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                {errors.name && <p className="text-rose-400 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Nama Perusahaan</label>
                <input
                  type="text"
                  placeholder="e.g. PT Industri Nusantara"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Email Bisnis *</label>
                <input
                  type="email"
                  placeholder="andi@industri.co.id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                {errors.email && <p className="text-rose-400 text-[11px] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  placeholder="081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                {errors.phone && <p className="text-rose-400 text-[11px] mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Metode Diskusi Yang Diinginkan</label>
                <select
                  value={formData.preferredContactMethod}
                  onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Google Meet">Online Video Call (Google Meet / Zoom)</option>
                  <option value="WhatsApp">WhatsApp Call / Discussion</option>
                  <option value="Email">Email Communication</option>
                  <option value="Direct Meeting">Direct Meeting (On-site Jakarta / Tangsel)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Waktu Kontak Yang Disukai</label>
                <select
                  value={formData.preferredContactTime}
                  onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Pagi (09:00 - 12:00 WIB)">Pagi (09:00 - 12:00 WIB)</option>
                  <option value="Siang (13:00 - 16:00 WIB)">Siang (13:00 - 16:00 WIB)</option>
                  <option value="Sore (16:00 - 18:00 WIB)">Sore (16:00 - 18:00 WIB)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Catatan Topik Diskusi</label>
              <textarea
                rows={3}
                placeholder="Tuliskan poin penting yang ingin Anda diskusikan..."
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40 cursor-pointer disabled:opacity-50"
              >
                <Calendar className="w-4 h-4" />
                <span>{isSubmitting ? 'Memproses Request...' : 'Request Consultation'}</span>
              </button>

              <WhatsAppButton
                source="Consultation Page"
                variant="Secondary"
                label="Chat WA Langsung"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
