import React, { useState, useEffect } from 'react';
import { useRouter } from '../lib/router';
import { LeadService } from '../services/leadService';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { Rocket, Send, Sparkles, Building, Mail, Phone, User, CheckCircle2, Shield, Layers } from 'lucide-react';

export const RequestApplicationPage: React.FC = () => {
  const { navigate } = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Enterprise / Custom B2B',
    applicationType: 'Web & Mobile System',
    businessProblem: '',
    mainGoals: '',
    expectedUsers: '100-500 Users',
    branchesCount: '1-3 Cabang',
    platform: 'Web + Mobile',
    requiredFeatures: 'Core Authentication, Dashboard Analytics, Role Permission',
    aiRequirements: 'Basic AI Copilot & Automation',
    integrationRequirements: 'REST API, Webhooks',
    additionalNotes: '',
    honeypot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pre-fill context if available from prior AI Tools
  useEffect(() => {
    document.title = 'Request Your Application | SMART-AI.ID';

    try {
      const savedBuilder = localStorage.getItem('smart_ai_app_builder_latest');
      const savedModules = localStorage.getItem('smart_ai_module_config');
      const savedEstimate = localStorage.getItem('smart_ai_project_estimate_latest');

      let prefillNotes = '';
      if (savedBuilder) {
        const parsed = JSON.parse(savedBuilder);
        if (parsed.appIdea) prefillNotes += `[AI Builder Idea]: ${parsed.appIdea}\n`;
      }

      if (savedEstimate) {
        const est = JSON.parse(savedEstimate);
        if (est.projectTitle) prefillNotes += `[AI Project Estimate]: ${est.projectTitle} (Timeline: ${est.timeline?.minMonths}-${est.timeline?.maxMonths} Bln, Complexity: ${est.complexity?.level})\n`;
      }

      if (prefillNotes) {
        setFormData((prev) => ({
          ...prev,
          additionalNotes: prefillNotes
        }));
      }
    } catch (e) {
      console.warn('Failed prefilling context', e);
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Masukkan nama Anda.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Masukkan email bisnis yang valid.';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Masukkan nomor WhatsApp yang valid.';
    if (!formData.businessProblem.trim()) errs.businessProblem = 'Jelaskan tantangan bisnis atau masalah yang ingin diselesaikan.';
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
        service: formData.applicationType,
        projectType: formData.applicationType,
        source: 'AI Application Builder',
        applicationDetails: {
          businessProblem: formData.businessProblem,
          mainGoals: formData.mainGoals,
          expectedUsers: formData.expectedUsers,
          branchesCount: formData.branchesCount,
          targetPlatform: formData.platform,
          requiredFeatures: formData.requiredFeatures.split(',').map((s) => s.trim()),
          aiRequirements: formData.aiRequirements,
          integrationRequirements: formData.integrationRequirements,
          additionalNotes: formData.additionalNotes
        }
      });

      navigate(`/thank-you?ref=${createdLead.referenceCode}`);
    } catch (err) {
      console.error('Failed submitting application request:', err);
      setErrors({ general: 'Gagal mengirim formulir. Silakan coba kembali atau kontak via WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Banner Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5 text-indigo-400" />
            <span>Application Request Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Request Your Application
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Ceritakan aplikasi yang ingin Anda bangun. Tim konsultan & insinyur SMART-AI.ID akan meninjau spesifikasi kebutuhan Anda secara mendalam.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {errors.general && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} className="hidden" tabIndex={-1} />

            {/* Section 1: Contact Information */}
            <div>
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>1. Informasi Pemohon</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    placeholder="e.g. Siti Rahmawati"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  {errors.name && <p className="text-rose-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Nama Perusahaan / Organisasi</label>
                  <input
                    type="text"
                    placeholder="e.g. PT Medika Digital"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Email Bisnis *</label>
                  <input
                    type="email"
                    placeholder="siti@medika.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  {errors.email && <p className="text-rose-400 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Nomor WhatsApp *</label>
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
            </div>

            {/* Section 2: Application Context */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>2. Konsep & Spesifikasi Aplikasi</span>
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Sektor Industri</label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Target Platform Deployment</label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Web">Web Application Only</option>
                      <option value="Mobile">Mobile App Only (iOS/Android)</option>
                      <option value="Web + Mobile">Web + Mobile App (Integrated)</option>
                      <option value="PWA">Progressive Web App (PWA)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Tantangan / Masalah Bisnis Utama *</label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan masalah operasional yang ingin diselesaikan melalui aplikasi ini..."
                    value={formData.businessProblem}
                    onChange={(e) => setFormData({ ...formData, businessProblem: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  {errors.businessProblem && <p className="text-rose-400 text-[11px] mt-1">{errors.businessProblem}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Fitur Utama Yang Diharapkan</label>
                  <input
                    type="text"
                    placeholder="e.g. Realtime Fleet Tracking, AI Chatbot, Document OCR, Multi-level Approval"
                    value={formData.requiredFeatures}
                    onChange={(e) => setFormData({ ...formData, requiredFeatures: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Catatan Tambahan / Hasil AI Tools (Opsional)</label>
                  <textarea
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Mengirim Detail...' : 'Submit Application Request'}</span>
              </button>

              <WhatsAppButton
                source="Request Application Page"
                variant="Secondary"
                label="Konsultasi Langsung via WA"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
