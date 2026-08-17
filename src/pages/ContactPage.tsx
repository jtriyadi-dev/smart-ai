import React, { useState, useEffect } from 'react';
import { useRouter } from '../lib/router';
import { LeadService } from '../services/leadService';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { MessageSquare, Send, CheckCircle2, Shield, User, Building, Mail, Phone, Sparkles, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onOpenConsultation?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenConsultation }) => {
  const { navigate } = useRouter();

  useEffect(() => {
    document.title = 'Hubungi Kami | SMART-AI.ID';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Enterprise / B2B',
    companySize: '10-50 Karyawan',
    service: 'Custom Web Application',
    message: '',
    budgetRange: 'Rp 100jt - 300jt',
    preferredContactMethod: 'WhatsApp',
    contactConsent: true,
    marketingConsent: false,
    honeypot: '' // Anti-spam field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Masukkan nama lengkap Anda.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Masukkan alamat email yang valid.';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Masukkan nomor WhatsApp / Telepon yang valid.';
    if (!formData.contactConsent) errs.consent = 'Persetujuan komunikasi diperlukan untuk memproses permintaan Anda.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Anti-spam silent drop

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
        company: formData.company || 'Perusahaan Prospect',
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.phone,
        industry: formData.industry,
        companySize: formData.companySize,
        service: formData.service,
        message: formData.message,
        source: 'Website Contact Form',
        consent: {
          contactConsent: formData.contactConsent,
          marketingConsent: formData.marketingConsent,
          consentTimestamp: new Date().toISOString()
        }
      });

      navigate(`/thank-you?ref=${createdLead.referenceCode}`);
    } catch (err) {
      console.error('Failed submitting contact form:', err);
      setErrors({ general: 'Terjadi kendala jaringan. Silakan coba kembali atau hubungi via WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Sales & Technical Consultation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hubungi Tim Konsultan SMART-AI.ID
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Diskusikan kebutuhan otomasi software, arsitektur AI, atau pembuatan aplikasi kustom untuk mendukung efisiensi bisnis perusahaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Form Card */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {errors.general && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website_hp"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Nama Lengkap *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  {errors.name && <p className="text-rose-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Nama Perusahaan / Organisasi</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. PT Logistik Nusantara"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Alamat Email Bisnis *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="budi@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  {errors.email && <p className="text-rose-400 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Nomor WhatsApp / Telepon *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      placeholder="081234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  {errors.phone && <p className="text-rose-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Layanan Yang Dibutuhkan</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Custom Web Application">Custom Web Application</option>
                    <option value="AI Application">AI Application & Chatbots</option>
                    <option value="Mobile Application">Mobile Application (iOS/Android)</option>
                    <option value="AI Integration">AI Integration & RAG Pipeline</option>
                    <option value="Business Automation">Business Process Automation</option>
                    <option value="ERP / Management System">ERP / Enterprise Management System</option>
                    <option value="Consulting">Konsultasi Arsitektur Software</option>
                    <option value="Other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Ukuran Perusahaan</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="1-10 Karyawan">1 - 10 Karyawan (Startup / SME)</option>
                    <option value="10-50 Karyawan">10 - 50 Karyawan (Growing)</option>
                    <option value="50-250 Karyawan">50 - 250 Karyawan (Mid-Market)</option>
                    <option value="250+ Karyawan">250+ Karyawan (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">Pesan / Gambaran Kebutuhan Proyek</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan gambaran singkat tantangan bisnis atau aplikasi yang ingin Anda bangun..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Consents */}
              <div className="pt-2 space-y-2 border-t border-slate-800 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.contactConsent}
                    onChange={(e) => setFormData({ ...formData, contactConsent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-purple-500 bg-slate-950"
                  />
                  <span className="text-slate-400 text-[11px] leading-relaxed">
                    Saya menyetujui informasi yang saya kirim digunakan untuk menghubungi saya terkait permintaan konsultasi ini.
                  </span>
                </label>
                {errors.consent && <p className="text-rose-400 text-[11px]">{errors.consent}</p>}

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-purple-500 bg-slate-950"
                  />
                  <span className="text-slate-500 text-[11px] leading-relaxed">
                    (Opsional) Saya ingin menerima berita, studi kasus, dan update teknologi dari SMART-AI.ID.
                  </span>
                </label>
              </div>

              {/* Form Action CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirim Permintaan...' : 'Kirim Permintaan'}</span>
                </button>

                <WhatsAppButton
                  source="Contact Page"
                  variant="Secondary"
                  label="Chat via WhatsApp"
                  size="md"
                  className="w-full sm:w-auto"
                />
              </div>
            </form>
          </div>

          {/* Right Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Jaminan Privasi Data</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Informasi yang Anda kirimkan hanya digunakan oleh tim spesialis SMART-AI.ID untuk merespons kebutuhan proyek Anda secara profesional.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-white mb-3">Respon Cepat</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Tim Technical Consultant kami umumnya meninjau dan merespons setiap formulir dalam kurun waktu kurang dari 24 jam kerja.
              </p>

              <WhatsAppButton
                source="Contact Page Sidebar"
                variant="Primary"
                label="Butuh Respon Instan? Chat WA"
                size="md"
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
