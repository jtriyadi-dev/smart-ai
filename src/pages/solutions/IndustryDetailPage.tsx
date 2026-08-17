import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '../../lib/router';
import { Bot, ArrowLeft, Send, CheckCircle2, X } from 'lucide-react';

import { IndustryBreadcrumb } from '../../components/solutions/IndustryBreadcrumb';
import { IndustryHero } from '../../components/solutions/IndustryHero';
import { ProblemSection } from '../../components/solutions/ProblemSection';
import { SolutionSection } from '../../components/solutions/SolutionSection';
import { ModuleGrid } from '../../components/solutions/ModuleGrid';
import { AIFeatureGrid } from '../../components/solutions/AIFeatureGrid';
import { WorkflowSection } from '../../components/solutions/WorkflowSection';
import { DashboardPreview } from '../../components/solutions/DashboardPreview';
import { BenefitsSection } from '../../components/solutions/BenefitsSection';
import { UseCaseSection } from '../../components/solutions/UseCaseSection';
import { IntegrationSection } from '../../components/solutions/IntegrationSection';
import { IndustryCTA } from '../../components/solutions/IndustryCTA';
import { RelatedSolutions } from '../../components/solutions/RelatedSolutions';

import { IndustrySolutionsService } from '../../services/IndustrySolutionsService';
import { LeadService } from '../../services/leadService';
import { IndustrySolutionConfig } from '../../types';

export const IndustryDetailPage: React.FC = () => {
  const { industrySlug: paramsSlug } = useParams<{ industrySlug: string }>();
  const navigate = useNavigate();

  // Extract slug from URL if paramsSlug is undefined
  const rawPath = window.location.pathname;
  const slugFromPath = rawPath.startsWith('/solutions/') ? rawPath.replace('/solutions/', '').split('/')[0] : '';
  const industrySlug = paramsSlug || slugFromPath;

  const [solution, setSolution] = useState<IndustrySolutionConfig | null>(null);

  const [loading, setLoading] = useState(true);

  // Consultation Modal State
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    if (industrySlug) {
      const data = IndustrySolutionsService.getSolutionBySlug(industrySlug);
      if (data) {
        setSolution(data);
      } else {
        setSolution(null);
      }
    }
    setLoading(false);
  }, [industrySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Memuat solusi industri...
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 text-center">
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-2">Industry Solution Not Found</h1>
          <p className="text-slate-400 text-sm mb-6">
            Solusi industri yang Anda cari belum tersedia atau URL tidak valid.
          </p>
          <button
            onClick={() => navigate('/solutions')}
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore All Solutions</span>
          </button>
        </div>
      </div>
    );
  }

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    // Create lead via LeadService with source = Industry Solution
    LeadService.createLead({
      company: leadForm.company || leadForm.name,
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone,
      industry: solution.name,
      source: `Industry Page` as any,
      message: `Consultation request from /solutions/${solution.slug}. Notes: ${leadForm.notes}`,
      notes: [
        {
          id: `NOTE-${Date.now()}`,
          leadId: '',
          author: 'System',
          content: `Consultation request for ${solution.name}. Notes: ${leadForm.notes}`,
          timestamp: new Date().toISOString(),
          isInternal: false
        }
      ],
    });

    setLeadSubmitted(true);
    setTimeout(() => {
      setShowConsultModal(false);
      setLeadSubmitted(false);
      setLeadForm({ name: '', email: '', phone: '', company: '', notes: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* SEO Title & Meta update simulation */}
      <IndustryBreadcrumb industryName={solution.name} />

      {/* Hero */}
      <IndustryHero
        title={solution.subtitle || solution.heroTagline}
        subtitle={solution.heroDescription}
        icon={solution.icon}
        category={solution.name}
        buildSlug={solution.slug}
        onRequestConsultation={() => setShowConsultModal(true)}
        onEstimate={() => navigate(`/ai-project-estimator?industry=${encodeURIComponent(solution.slug)}`)}
      />

      {/* Common Business Problems */}
      <ProblemSection problems={solution.problems} />

      {/* SMART-AI.ID Solution Overview & Impact */}
      <SolutionSection
        overview={solution.solutionOverview}
        impacts={solution.businessImpactSummary}
      />

      {/* Core Modules */}
      <ModuleGrid modules={solution.modules} />

      {/* AI Features */}
      <AIFeatureGrid features={solution.aiFeatures} />

      {/* Visual Workflow */}
      <WorkflowSection steps={solution.workflowSteps} />

      {/* Interactive Dashboard Preview */}
      <DashboardPreview
        config={solution.dashboardPreview}
        industryName={solution.name}
      />

      {/* Business Benefits */}
      <BenefitsSection benefits={solution.benefits} />

      {/* Real World Use Cases */}
      <UseCaseSection useCases={solution.useCases} />

      {/* Integrations & Tech Architecture */}
      <IntegrationSection
        integrations={solution.integrations}
        technologies={solution.technologies}
      />

      {/* Industry CTA */}
      <IndustryCTA
        industrySlug={solution.slug}
        industryName={solution.name}
        onRequestConsultation={() => setShowConsultModal(true)}
      />

      {/* Related Solutions */}
      <RelatedSolutions
        relatedSlugs={solution.relatedSlugs}
        currentSlug={solution.slug}
      />

      {/* Consultation Request Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setShowConsultModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {leadSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Permintaan Konsultasi Diterima!</h3>
                <p className="text-slate-300 text-sm">
                  Tim Pakar Industri SMART-AI.ID ({solution.name}) akan menghubungi Anda dalam waktu maksimal 1x24 jam.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Konsultasi Solusi {solution.name}</h3>
                    <p className="text-xs text-slate-400">
                      Diskusikan kebutuhan spesifik bisnis Anda dengan Konsultan SMART-AI.ID
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Budi Santoso"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Bisnis *
                    </label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="budi@perusahaan.co.id"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      No. WhatsApp / HP
                    </label>
                    <input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="081234567890"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nama Perusahaan / Organisasi
                  </label>
                  <input
                    type="text"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    placeholder="PT Nusantara Jaya"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Catatan Kebutuhan Singkat
                  </label>
                  <textarea
                    rows={3}
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    placeholder="Contoh: Butuh sistem integrasi fleet pertambangan 50 dump truck..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Permintaan Konsultasi</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
