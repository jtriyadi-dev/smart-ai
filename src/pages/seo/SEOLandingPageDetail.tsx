import React, { useState } from 'react';
import { SEOService } from '../../services/SEOService';
import { SEOHead } from '../../components/seo/SEOHead';
import { useRouter } from '../../lib/router';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  ShieldCheck,
  Code2,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Boxes,
  FileText,
  ChevronRight,
  Zap,
  Globe
} from 'lucide-react';

interface SEOLandingPageDetailProps {
  slug: string;
}

export const SEOLandingPageDetail: React.FC<SEOLandingPageDetailProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const page = SEOService.getLandingPageBySlug(slug);

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  if (!page) {
    return (
      <div className="min-h-screen bg-[#06090e] text-slate-100 flex items-center justify-center pt-24 pb-20 px-4">
        <SEOHead title="Halaman Tidak Ditemukan | SMART-AI.ID" noindex={true} />
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-rose-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">404 - Halaman SEO Tidak Ditemukan</h1>
          <p className="text-xs text-slate-400">
            Halaman dengan kata kunci ini tidak tersedia atau telah dipindahkan.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Generate Structured Data (JSON-LD)
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.description,
      provider: {
        '@type': 'Organization',
        name: 'SMART-AI.ID',
        url: 'https://www.smart-ai.id'
      },
      serviceType: page.service || 'Software Development & AI Solutions',
      areaServed: 'Indonesia'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.smart-ai.id'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.title,
          item: page.canonicalUrl
        }
      ]
    }
  ];

  if (page.faq && page.faq.length > 0) {
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    } as any);
  }

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pt-24 pb-20">
      {/* Dynamic SEO Tags */}
      <SEOHead
        title={page.seoTitle || page.title}
        description={page.seoDescription || page.description}
        canonicalUrl={page.canonicalUrl}
        ogImage={page.ogImage}
        jsonLd={jsonLdData}
      />

      <main className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button onClick={() => navigate('/')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-400 font-bold truncate">{page.title}</span>
        </nav>

        {/* HERO SECTION */}
        <section className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800/80 shadow-2xl overflow-hidden space-y-6">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>KEYWORD TARGET: {page.keyword.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
              {page.hero?.title || page.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {page.hero?.subtitle || page.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/consultation')}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <span>{page.hero?.ctaText || 'Konsultasikan Aplikasi Anda'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/ai-app-builder')}
                className="px-6 py-3.5 bg-slate-950 border border-cyan-500/40 text-cyan-300 hover:bg-slate-800 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{page.hero?.secondaryCtaText || 'Buat Aplikasi dengan AI'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* PROBLEMS & CHALLENGES SECTION */}
        {page.problems && page.problems.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">TANTANGAN OPERASIONAL</span>
              <h2 className="text-2xl font-bold text-white">Masalah yang Sering Dihadapi Industri Anda</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {page.problems.map((prob, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{prob.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{prob.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SOLUTIONS & AI CAPABILITIES */}
        {page.solutions && page.solutions.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">SOLUSI SMART-AI.ID</span>
              <h2 className="text-2xl font-bold text-white">Bagaimana Solusi Kami Menyelesaikan Masalah Anda</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {page.solutions.map((sol, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">{sol.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{sol.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* KEY CAPABILITIES */}
        {page.capabilities && page.capabilities.length > 0 && (
          <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">FITUR & KAPABILITAS UTAMA</span>
              <h2 className="text-2xl font-bold text-white">Teknologi Modern dalam Aplikasi Anda</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {page.capabilities.map((cap, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-white text-sm">{cap.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROCESS WORKFLOW */}
        {page.processSteps && page.processSteps.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">ALUR KERJA PENGEMBANGAN</span>
              <h2 className="text-2xl font-bold text-white">Tahapan Transparan hingga Production Launch</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {page.processSteps.map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
                  <div className="text-2xl font-bold font-mono text-cyan-400">{step.step}</div>
                  <h3 className="font-bold text-white text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INTERNAL LINKING ENGINE & RELATED CONTENT */}
        <section className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">INTERNAL LINKING & RELATED PAGES</span>
            <h2 className="text-xl font-bold text-white">Eksplorasi Layanan & Solusi Terkait</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/solusi-industri')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                <span>SOLUSI INDUSTRI</span>
                <Boxes className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Solusi AI Khusus Sektor Industri</h3>
              <p className="text-[11px] text-slate-400">Pertambangan, Kesehatan, Pendidikan, Perkebunan, dan Manufaktur.</p>
            </button>

            <button
              onClick={() => navigate('/portfolio')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-indigo-400 mb-2">
                <span>PORTOFOLIO</span>
                <Briefcase className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Studi Kasus & Project Concept</h3>
              <p className="text-[11px] text-slate-400">Lihat arsitektur nyata aplikasi AI dan web custom yang telah dirancang.</p>
            </button>

            <button
              onClick={() => navigate('/blog')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                <span>BLOG & INSIGHTS</span>
                <FileText className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Artikel Artikel Teknologi AI</h3>
              <p className="text-[11px] text-slate-400">Panduan implementasi LLM, RAG, dan arsitektur perangkat lunak modern.</p>
            </button>
          </div>
        </section>

        {/* FAQ SECTION WITH STRUCTURED DATA */}
        {page.faq && page.faq.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">PERTANYAAN UMUM (FAQ)</span>
              <h2 className="text-2xl font-bold text-white">Segala Sesuatu tentang {page.keyword}</h2>
            </div>

            <div className="space-y-3">
              {page.faq.map((item, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left font-bold text-white text-sm flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <ChevronRight className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* PRIMARY CONVERSION CTA BANNER */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/40 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Siap Membangun {page.title}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Tim Solution Architect SMART-AI.ID siap membantu memetakan arsitektur sistem, estimasi biaya, dan jadwal pengembangan aplikasi Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/consultation')}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-cyan-500/20 cursor-pointer"
            >
              Konsultasikan Aplikasi Anda
            </button>
            <button
              onClick={() => navigate('/ai-app-builder')}
              className="px-8 py-3.5 bg-slate-950 border border-cyan-500/40 text-cyan-300 hover:bg-slate-800 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
            >
              Buat Aplikasi dengan AI
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
