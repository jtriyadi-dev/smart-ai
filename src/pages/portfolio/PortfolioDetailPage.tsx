import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '../../lib/router';
import { PortfolioService } from '../../services/PortfolioService';
import { PortfolioConfig, PortfolioScreenshotItem } from '../../types';
import { PortfolioLightboxModal } from '../../components/portfolio/PortfolioLightboxModal';
import {
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Box,
  LayoutDashboard,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Database,
  Globe,
  FileText,
  Activity,
  Wrench,
  Truck,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Building,
  CheckSquare
} from 'lucide-react';

interface PortfolioDetailPageProps {
  onOpenConsultationForm?: (initialData: { applicationType: string; requiredFeatures: string[]; message: string }) => void;
}

export const PortfolioDetailPage: React.FC<PortfolioDetailPageProps> = ({ onOpenConsultationForm }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState<PortfolioConfig | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  useEffect(() => {
    if (slug) {
      const found = PortfolioService.getPortfolioBySlug(slug);
      setPortfolio(found);
      if (found) {
        PortfolioService.trackView(found.slug);
      }
    }
  }, [slug]);

  if (!portfolio) {
    return (
      <div className="py-32 bg-[#06090e] min-h-screen flex items-center justify-center text-center px-4">
        <div className="space-y-4 max-w-md">
          <Box className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Portfolio Case Study Not Found</h2>
          <p className="text-xs text-slate-400">The requested portfolio showcase could not be loaded or is unavailable.</p>
          <button
            onClick={() => navigate('/portfolio')}
            className="px-6 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/40 transition-colors cursor-pointer"
          >
            Explore All Portfolios
          </button>
        </div>
      </div>
    );
  }

  const handleBuildSimilar = () => {
    PortfolioService.trackClick(portfolio.slug);
    navigate(`/ai-app-builder?industry=${encodeURIComponent(portfolio.industry)}`);
  };

  const handleEstimateSimilar = () => {
    PortfolioService.trackClick(portfolio.slug);
    navigate(`/ai-project-estimator?industry=${encodeURIComponent(portfolio.industry)}`);
  };

  const handleDiscussSolution = () => {
    PortfolioService.trackClick(portfolio.slug);
    const message = `[Portfolio Lead Inquiry]:\nProject: ${portfolio.name}\nIndustry: ${portfolio.industry}\nStatus: ${portfolio.status}\nRequested Modules: ${portfolio.modules.map((m) => m.name).join(', ')}`;

    if (onOpenConsultationForm) {
      onOpenConsultationForm({
        applicationType: portfolio.name,
        requiredFeatures: portfolio.modules.map((m) => m.name),
        message
      });
    } else {
      navigate('/consultation');
    }
  };

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const relatedPortfolios = PortfolioService.getAllPortfolios({
    category: portfolio.category,
    approvalStatus: 'PUBLISHED'
  }).filter((p) => p.id !== portfolio.id).slice(0, 3);

  return (
    <div className="py-20 md:py-28 bg-[#06090e] bg-tech-grid text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* TOP NAVIGATION BREADCRUMB */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <button
            onClick={() => navigate('/portfolio')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio Catalog</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Portfolio</span>
            <span>/</span>
            <span className="text-cyan-400 font-bold">{portfolio.name}</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${portfolio.coverImage} border shadow-2xl space-y-6 relative overflow-hidden`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded bg-slate-950/80 text-cyan-300 font-mono font-bold text-xs uppercase border border-cyan-500/40">
              {portfolio.status}
            </span>
            <span className="text-xs font-mono text-slate-300 bg-slate-950/70 px-3 py-1 rounded border border-slate-800">
              Industry: {portfolio.industry}
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              {portfolio.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {portfolio.fullDescription}
            </p>
          </div>

          {/* CONCEPT DISCLAIMER BANNER */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2 max-w-3xl">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Concept Project:</strong> A conceptual solution designed by SMART-AI.ID to demonstrate how AI-powered digital systems can be applied to this industry.
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={handleBuildSimilar}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl transition-all shadow-xl shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Build Similar Solution</span>
            </button>
            <button
              onClick={handleEstimateSimilar}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Estimate Similar Project</span>
            </button>
            <button
              onClick={handleDiscussSolution}
              className="px-6 py-3.5 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Discuss This Solution</span>
            </button>
          </div>
        </div>

        {/* 01 — BUSINESS CHALLENGES */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>01 &bull; CHALLENGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Common Business Problems
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.problems.map((prob, idx) => (
              <div key={prob.id || idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 font-mono text-xs font-bold">
                  P{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-white">{prob.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prob.description}</p>
                {prob.impact && (
                  <div className="pt-2 text-[11px] font-mono text-red-300/80 border-t border-slate-800/80 flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                    <span>Impact: {prob.impact}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 02 — OUR DIGITAL SOLUTION */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>02 &bull; SOLUTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            SMART-AI.ID Solution Concept
          </h2>

          <div className="grid md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Core Summary</span>
              <p className="text-xs text-slate-300 leading-relaxed">{portfolio.solution.summary}</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Digital Architecture</span>
              <p className="text-xs text-slate-300 leading-relaxed">{portfolio.solution.digitalSolution}</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Business Impact</span>
              <p className="text-xs text-slate-300 leading-relaxed">{portfolio.solution.businessImpact}</p>
            </div>
          </div>
        </div>

        {/* 03 — ARCHITECTURE & TECH STACK */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>03 &bull; ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Modern Technology Stack
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {portfolio.technology.map((tech, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
                  {tech.category}
                </span>
                <h4 className="text-sm font-bold text-white pt-1">{tech.name}</h4>
                {tech.description && <p className="text-[11px] text-slate-400">{tech.description}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* 04 — CORE MODULES */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>04 &bull; MODULES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Core Solution Modules ({portfolio.modules.length})
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.modules.map((mod) => (
              <div key={mod.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                    <Box className="w-5 h-5" />
                  </div>
                  {mod.aiEnabled && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-bold">
                      AI ENABLED
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">{mod.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 05 — AI CAPABILITIES */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>05 &bull; AI CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            AI-Powered Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolio.aiFeatures.map((af) => (
              <div key={af.id} className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>{af.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-purple-500/40 text-purple-300 font-bold uppercase">
                    {af.status === 'CONCEPT' ? 'AI CONCEPT' : af.status === 'PLANNED' ? 'PLANNED AI CAPABILITY' : af.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{af.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 06 — INTERACTIVE DASHBOARD PREVIEW */}
        {portfolio.dashboardPreview && (
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <LayoutDashboard className="w-4 h-4" />
                <span>06 &bull; DASHBOARD PREVIEW</span>
              </div>
              <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
                Interactive Demo &mdash; Sample Data
              </span>
            </div>

            {/* KPI Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {portfolio.dashboardPreview.kpis.map((kpi, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 font-mono">{kpi.label}</span>
                  <div className="text-xl font-display font-bold text-white">{kpi.value}</div>
                  {kpi.change && <span className="text-[10px] font-mono text-emerald-400">{kpi.change}</span>}
                </div>
              ))}
            </div>

            {/* Recent Sample Data Table */}
            {portfolio.dashboardPreview.recentData && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 font-mono uppercase">Operational Records (Sample Data)</h4>
                <div className="divide-y divide-slate-800 text-xs">
                  {portfolio.dashboardPreview.recentData.map((row, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                      <span className="font-bold text-slate-200">{row.col1}</span>
                      <span className="text-slate-400">{row.col2}</span>
                      <span className="font-mono text-cyan-300">{row.col3}</span>
                      {row.status && (
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                          {row.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Insights Alert */}
            {portfolio.dashboardPreview.aiInsights && (
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 space-y-1">
                {portfolio.dashboardPreview.aiInsights.map((note, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{note}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 07 — SCREENSHOTS & MOCKUPS */}
        {portfolio.screenshots && portfolio.screenshots.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <span>07 &bull; SCREENSHOTS & MOCKUPS</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">
                Click image to enlarge
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.screenshots.map((sc, idx) => (
                <div
                  key={sc.id || idx}
                  onClick={() => openLightboxAt(idx)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-lg"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={sc.image}
                      alt={sc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-slate-950/80 rounded border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
                      CONCEPT UI
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{sc.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{sc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 08 — WORKFLOW */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>08 &bull; WORKFLOW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Operational Process Flow
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {portfolio.workflow.map((wf) => (
              <div key={wf.step} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 relative">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                  STEP {wf.step}
                </span>
                <h4 className="text-xs font-bold text-white pt-1">{wf.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{wf.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 09 — POTENTIAL BENEFITS */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <span>09 &bull; POTENTIAL BENEFITS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Potential Business Outcomes
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {portfolio.benefits.map((ben, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">{ben}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 10 — RELATED SOLUTIONS & PORTFOLIOS */}
        <div className="pt-8 border-t border-slate-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display">Related Industry Solutions & Showcase</h3>
            {portfolio.relatedIndustrySlug && (
              <button
                onClick={() => navigate(`/solutions/${portfolio.relatedIndustrySlug}`)}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View {portfolio.industry} Solution</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPortfolios.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/portfolio/${rel.slug}`)}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer space-y-2 group"
              >
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{rel.industry}</span>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{rel.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{rel.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 11 — BOTTOM ACTION CTA BAR */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/40 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Build Your Own {portfolio.industry} Application
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Transform this concept into a customized production application tailored specifically for your organization.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleBuildSimilar}
              className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Build Similar Solution</span>
            </button>
            <button
              onClick={handleEstimateSimilar}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Estimate Similar Project</span>
            </button>
            <button
              onClick={handleDiscussSolution}
              className="px-6 py-3.5 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Request Consultation</span>
            </button>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <PortfolioLightboxModal
        isOpen={lightboxOpen}
        screenshots={portfolio.screenshots || []}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
