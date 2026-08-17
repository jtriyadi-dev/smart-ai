import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Bot, Sparkles, ShieldCheck, Activity, CheckCircle2, 
  Code2, Zap, TrendingUp, DollarSign, RefreshCw, Brain, Users, ShoppingCart
} from 'lucide-react';
import { WebsiteCMSContentService } from '../services/WebsiteCMSContentService';

interface HeroProps {
  onStartConsultation: () => void;
  onOpenAIGenerator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartConsultation, onOpenAIGenerator }) => {
  const [activeTab, setActiveTab] = useState<'copilot' | 'insights' | 'recommendations'>('copilot');
  const [heroContent, setHeroContent] = useState(WebsiteCMSContentService.getCMSData().hero);

  useEffect(() => {
    const unsubscribe = WebsiteCMSContentService.subscribe((cms) => {
      if (cms.hero) {
        setHeroContent(cms.hero);
      }
    });
    return () => unsubscribe();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial-glow bg-tech-grid">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 text-left space-y-6">
            
            {/* Small Label Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <Bot className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-[11px] tracking-tight uppercase">{heroContent.badgeText}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12]">
              {heroContent.headlineMain} <span className="text-gradient-cyan">{heroContent.headlineHighlight}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {heroContent.subheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onStartConsultation}
                className="btn-primary px-8 py-3.5 text-sm font-bold flex items-center justify-center gap-2.5 glow-primary-cta cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>{heroContent.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('#layanan')}
                className="btn-secondary px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{heroContent.secondaryCtaText}</span>
              </button>

              <button
                onClick={onOpenAIGenerator}
                className="btn-outline px-4 py-3.5 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>{heroContent.tertiaryCtaText}</span>
              </button>
            </div>

            {/* Hero Micro Copy Statements */}
            <div className="pt-6 grid grid-cols-2 gap-3 text-xs text-slate-300 font-mono border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{heroContent.checkItem1 || 'Custom-built for your business.'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{heroContent.checkItem2 || 'From idea to production-ready application.'}</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual: AI BUSINESS COPILOT */}
          <div className="lg:col-span-6 relative">
            
            {/* Backlight Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10"></div>

            <div className="card-featured p-6 rounded-2xl border border-white/10 shadow-2xl space-y-5 text-left relative">
              
              {/* Cockpit Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono font-bold text-white ml-2 tracking-wider">
                    AI BUSINESS COPILOT
                  </span>
                </div>

                {/* DEMO DATA Badge */}
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/90 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>DEMO DATA / SAMPLE DATA</span>
                </span>
              </div>

              {/* Sample Metrics (Section 7 Exact Numbers) */}
              <div className="grid grid-cols-3 gap-3 font-mono">
                
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>REVENUE</span>
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-lg font-extrabold text-white">
                    Rp 4.28B
                  </div>
                  <div className="text-[10px] text-emerald-400 font-sans">
                    Target Met
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>GROWTH</span>
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-lg font-extrabold text-cyan-300">
                    +18.4%
                  </div>
                  <div className="text-[10px] text-cyan-400 font-sans">
                    vs Last Month
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>ACTIVE USERS</span>
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="text-lg font-extrabold text-white">
                    12,480
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">
                    System Users
                  </div>
                </div>

              </div>

              {/* AI Insight Box (Section 7 Exact Text) */}
              <div className="p-4 rounded-xl bg-[#0d172e] border border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono text-xs">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>AI INSIGHT & RECOMMENDATION</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    REAL-TIME
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  "Operational efficiency improved based on current business data. Otomatisasi pendaftaran & verifikasi dokumen mengurangi waktu siklus pemrosesan sebesar 74%."
                </p>
              </div>

              {/* Mini Chart & Activity Stream */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>AI AUTOMATION STATUS</span>
                  <span className="text-emerald-400 font-bold">ALL SYSTEMS GO (99.98%)</span>
                </div>
                
                {/* Mini chart bar visual */}
                <div className="h-10 flex items-end gap-1.5 pt-1">
                  <div className="flex-1 bg-slate-800 rounded-t h-[40%]"></div>
                  <div className="flex-1 bg-slate-800 rounded-t h-[55%]"></div>
                  <div className="flex-1 bg-slate-800 rounded-t h-[70%]"></div>
                  <div className="flex-1 bg-slate-800 rounded-t h-[85%]"></div>
                  <div className="flex-1 bg-gradient-to-t from-cyan-600 to-indigo-500 rounded-t h-[100%] shadow-lg shadow-cyan-500/20"></div>
                </div>
              </div>

              {/* Bottom Visual Action */}
              <div className="pt-1 flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-slate-400 font-sans">
                  Demo Dashboard Interactive Component
                </span>
                <button
                  onClick={onOpenAIGenerator}
                  className="text-cyan-400 font-bold hover:underline cursor-pointer flex items-center gap-1 text-xs"
                >
                  <span>Analisis Sistem Anda</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
