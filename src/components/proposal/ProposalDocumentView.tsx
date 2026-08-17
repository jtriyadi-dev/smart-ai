import React from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  FileText,
  Globe,
  Layers,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Zap,
  DollarSign,
  Briefcase,
  AlertTriangle,
  UserCheck,
  Server,
  ArrowRight
} from 'lucide-react';
import { Proposal } from '../../types';

interface ProposalDocumentViewProps {
  proposal: Proposal;
  isPrintMode?: boolean;
}

export const ProposalDocumentView: React.FC<ProposalDocumentViewProps> = ({ proposal, isPrintMode = false }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatDate = (isoStr: string) => {
    try {
      return new Date(isoStr).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div
      id="proposal-document-content"
      className={`max-w-4xl mx-auto font-sans bg-[#080d1a] text-slate-200 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl ${
        isPrintMode ? 'print:bg-white print:text-slate-900 print:border-none print:shadow-none print:max-w-none' : ''
      }`}
    >
      {/* ======================================================== */}
      {/* SECTION 1: COVER PAGE (DARK LUXURY TECHNOLOGY) */}
      {/* ======================================================== */}
      <div className="relative min-h-[750px] p-8 md:p-14 flex flex-col justify-between bg-gradient-to-br from-[#060a14] via-[#0a1128] to-[#040812] border-b border-cyan-500/20 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header / Branding */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
              AI
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white block">SMART-AI.ID</span>
              <span className="text-[10px] text-cyan-400 font-semibold tracking-widest uppercase">Enterprise Software & AI Platform</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono tracking-widest uppercase rounded-full">
            CONFIDENTIAL PROPOSAL
          </span>
        </div>

        {/* Title & Project Name */}
        <div className="my-12 space-y-6 z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900/80 border border-slate-700/60 rounded-lg text-slate-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>BUSINESS & TECHNICAL PROPOSAL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-2xl">
            {proposal.title}
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
            Dokumen resmi penawaran pengembangan perangkat lunak kustom dan integrasi platform berbasis AI untuk transformasi operasional.
          </p>
        </div>

        {/* Prepared For / By Info Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 pt-8 border-t border-slate-800/80 text-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">PREPARED FOR:</span>
            <div className="text-sm font-bold text-white">{proposal.companyName}</div>
            <div className="text-slate-300">{proposal.contactName} ({proposal.contactPosition || 'Executive'})</div>
            <div className="text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-slate-500" /> {proposal.contactEmail || '-'}
            </div>
            <div className="text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-500" /> {proposal.contactPhone || '-'}
            </div>
          </div>

          <div className="space-y-1.5 md:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">PREPARED BY:</span>
            <div className="text-sm font-bold text-white">SMART-AI.ID Enterprise Team</div>
            <div className="text-slate-300">PT Smart AI Solutions Technology</div>
            <div className="text-slate-400">www.smart-ai.id | info@smart-ai.id</div>
            <div className="text-slate-400">Nomor Proposal: <span className="font-mono text-cyan-300 font-bold">{proposal.proposalNumber}</span></div>
            <div className="text-slate-400">Versi: <span className="font-bold text-amber-300">{proposal.version}</span> | Tanggal: {formatDate(proposal.createdAt)}</div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 2: EXECUTIVE SUMMARY */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>01. Executive Summary</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Ringkasan Eksekutif</h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          {proposal.executiveSummary}
        </p>

        {/* Commercial Highlights Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimasi Waktu</span>
            <span className="text-sm font-bold text-cyan-300 mt-1 block">{proposal.timeline.totalMonths}</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Investasi Proyek</span>
            <span className="text-sm font-bold text-emerald-400 mt-1 block">
              {proposal.investment.mode === 'Fixed' && proposal.investment.fixedPrice
                ? formatCurrency(proposal.investment.fixedPrice)
                : `${formatCurrency(proposal.investment.rangeMin)} - ${formatCurrency(proposal.investment.rangeMax)}`}
            </span>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Masa Garansi</span>
            <span className="text-sm font-bold text-amber-300 mt-1 block">{proposal.support.periodDays} Hari Kalender</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Masa Berlaku Penawaran</span>
            <span className="text-sm font-bold text-slate-200 mt-1 block">{formatDate(proposal.validUntil)}</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 3: CUSTOMER PROBLEM & OBJECTIVES */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>02. Customer Problem & Objectives</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Tantangan Bisnis & Tujuan Strategis</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Customer Problem */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Tantangan Saat Ini (Challenges)
            </h3>
            <p className="text-slate-300 leading-relaxed">{proposal.customerProblem.currentSituation}</p>
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="font-bold text-slate-200 block">Kendala Utama:</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                {proposal.customerProblem.keyChallenges.map((ch, idx) => (
                  <li key={idx}>{ch}</li>
                ))}
              </ul>
            </div>
            <div className="pt-2 text-slate-400 italic">
              <strong>Dampak Bisnis:</strong> {proposal.customerProblem.businessImpact}
            </div>
          </div>

          {/* Project Objectives */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Target & Tujuan Proyek (Objectives)
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Pengembangan platform dirancang untuk mencapai indikator keberhasilan berikut:
            </p>
            <ul className="space-y-2.5 pt-2">
              {proposal.projectObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                    {idx + 1}
                  </div>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 4: PROPOSED SOLUTION & CORE CAPABILITIES */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>03. Proposed Solution</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Rekomendasi Solusi & Pendekatan Teknis</h2>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <p className="text-slate-300 leading-relaxed text-sm">{proposal.proposedSolution.overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <span className="font-bold text-white block mb-2 uppercase tracking-wider text-[11px] text-cyan-400">
                Kapabilitas Utama Solusi:
              </span>
              <ul className="space-y-1.5 text-slate-300">
                {proposal.proposedSolution.coreCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-white block mb-2 uppercase tracking-wider text-[11px] text-cyan-400">
                Integrasi & Pendekatan AI:
              </span>
              <p className="text-slate-300 mb-2">{proposal.proposedSolution.architectureApproach}</p>
              <div className="flex flex-wrap gap-1.5">
                {proposal.aiCapabilities.map((aiCap, i) => (
                  <span key={i} className="px-2 py-0.5 bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[10px] rounded-md font-mono">
                    {aiCap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 5: PROJECT MODULES & KEY FEATURES */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>04. Modules & Key Features</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Cakupan Modul Aplikasi</h2>

        <div className="space-y-4">
          {proposal.modules.map((mod, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{mod.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">{mod.category}</span>
                  </div>
                </div>
                {mod.businessValue && (
                  <span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium rounded-lg hidden md:inline-block">
                    {mod.businessValue}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{mod.description}</p>

              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Fitur Utama Modul:</span>
                <div className="flex flex-wrap gap-2">
                  {mod.keyFeatures.map((kf, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-cyan-400" /> {kf}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 6: TECHNOLOGY & ARCHITECTURE */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>05. Technology & Visual Architecture</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Arsitektur Infrastruktur & Teknologi</h2>

        {/* Visual Architecture Diagram Box */}
        <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 space-y-4">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">Target Architecture Diagram</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-cyan-400 uppercase">CLIENT LAYER</span>
              <div className="font-bold text-white">{proposal.platforms.join(' / ')}</div>
              <p className="text-[11px] text-slate-400">Responsive Admin Web & Mobile PWA</p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">API & AI GATEWAY</span>
              <div className="font-bold text-white">Express & Gemini 2.5 Flash</div>
              <p className="text-[11px] text-slate-400">Microservices Cloud Run & RAG Analytics</p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">DATA & INTEGRATIONS</span>
              <div className="font-bold text-white">Firestore & External APIs</div>
              <p className="text-[11px] text-slate-400">Encrypted DB & WhatsApp API Gateway</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic text-center pt-2">{proposal.architectureSummary}</p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-cyan-400 font-bold uppercase block mb-1">Frontend</span>
            <div className="text-slate-200 font-medium">{proposal.technologyStack.frontend.join(', ')}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-indigo-400 font-bold uppercase block mb-1">Backend</span>
            <div className="text-slate-200 font-medium">{proposal.technologyStack.backend.join(', ')}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-1">Database</span>
            <div className="text-slate-200 font-medium">{proposal.technologyStack.database.join(', ')}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">AI Engine</span>
            <div className="text-slate-200 font-medium">{proposal.technologyStack.ai.join(', ')}</div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 7: SCOPE, ASSUMPTIONS & EXCLUSIONS */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          <span>06. Project Scope, Assumptions & Exclusions</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Lingkup Pekerjaan & Batasan Sistem</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Scope Included */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Scope Pekerjaan Termasuk (Included)
            </h3>
            <ul className="space-y-2 text-slate-300">
              {proposal.scope.included.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scope Excluded */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Batasan Scope (Exclusions)
            </h3>
            <ul className="space-y-2 text-slate-300">
              {proposal.scope.excluded.map((exc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">&times;</span>
                  <span>
                    {exc.text} {exc.isSuggested && <span className="text-[10px] text-amber-400 font-mono">(Suggested Exclusion)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Assumptions */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-xs space-y-2">
          <span className="font-bold text-slate-200 block uppercase tracking-wider text-[10px] text-cyan-400">Assumptions (Asumsi Proyek):</span>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {proposal.assumptions.map((ass, i) => (
              <li key={i}>{ass}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 8: DEVELOPMENT METHODOLOGY & TIMELINE */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>07. Timeline & Methodology</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Estimasi Timeline Pengembangan</h2>

        {/* Timeline Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {proposal.timeline.breakdown.map((tb, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1 text-xs">
              <span className="text-[10px] font-bold text-cyan-400 uppercase block">{tb.phase}</span>
              <div className="text-sm font-bold text-white">{tb.duration}</div>
              <p className="text-slate-400 text-[11px] mt-1">{tb.details}</p>
            </div>
          ))}
        </div>

        {/* Mandatory Timeline Disclaimer */}
        <div className="bg-amber-950/40 border border-amber-500/30 text-amber-300/90 text-xs p-4 rounded-xl flex items-start gap-2.5 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Penting Timeline:</strong> {proposal.timeline.disclaimer}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 9: COMMERCIAL & INVESTMENT BREAKDOWN */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <DollarSign className="w-4 h-4" />
          <span>08. Commercial Investment</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Investasi Proyek & Skema Pembayaran</h2>

        <div className="bg-slate-900/80 border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block">
                Mode Investasi: <span className="text-cyan-400">{proposal.investment.mode}</span>
              </span>
              <div className="text-2xl md:text-4xl font-black text-emerald-400 mt-1">
                {proposal.investment.mode === 'Fixed' && proposal.investment.fixedPrice
                  ? formatCurrency(proposal.investment.fixedPrice)
                  : `${formatCurrency(proposal.investment.rangeMin)} - ${formatCurrency(proposal.investment.rangeMax)}`}
              </div>
            </div>
            <span className="px-3.5 py-1.5 bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-bold rounded-xl self-start md:self-center">
              {proposal.investment.mode === 'Estimated' ? 'Estimated Investment' : 'Fixed Price Proposal'}
            </span>
          </div>

          {/* Investment Breakdown Table */}
          {proposal.investment.breakdown && proposal.investment.breakdown.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase block">Rincian Komponen Investasi:</span>
              <div className="space-y-2 text-xs">
                {proposal.investment.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-300">{item.category}</span>
                    <span className="font-mono font-bold text-white">{formatCurrency(item.cost)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Terms */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase block">Tahapan Pembayaran (Payment Terms):</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {proposal.paymentTerms.map((pt, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">{pt.milestone}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 font-mono font-bold rounded">
                      {pt.percentage}%
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{pt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 10: SUPPORT, MAINTENANCE & WARRANTY */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>09. Support & Warranty</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Layanan Pendampingan & Garansi</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-white">{proposal.support.name}</h3>
            <div className="space-y-2 text-slate-300">
              <div><strong>Durasi Garansi:</strong> {proposal.support.periodDays} Hari Kalender</div>
              <div><strong>Response Time:</strong> {proposal.support.responseTime}</div>
              <div><strong>Kanal Support:</strong> {proposal.support.supportChannel}</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-white">Cakupan Garansi Sistem</h3>
            <p className="text-slate-300 leading-relaxed">{proposal.warranty}</p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 11: TERMS & CONDITIONS */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 border-b border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>10. Terms & Conditions</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Syarat & Ketentuan Ketentuan Proyek</h2>

        <div className="space-y-3 text-xs">
          {proposal.termsAndConditions.map((term, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
              <span className="font-bold text-cyan-300 block">{idx + 1}. {term.title}</span>
              <p className="text-slate-300 leading-relaxed">{term.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 12: SIGNATURE AREA / ACCEPTANCE */}
      {/* ======================================================== */}
      <div className="p-8 md:p-12 space-y-8 bg-slate-950/80">
        <h2 className="text-xl font-bold text-white text-center">Persetujuan & Pengesahan Proposal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs pt-4">
          {/* Customer Signature Box */}
          <div className="border border-slate-800 rounded-2xl p-6 text-center space-y-8 bg-slate-900/40">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Pihak Klien (Customer Acceptance)</span>
              <span className="font-bold text-white text-sm mt-1 block">{proposal.companyName}</span>
            </div>

            <div className="h-24 border-b border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-xs italic">
              {proposal.acceptedAt ? (
                <div className="text-emerald-400 font-bold space-y-1">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <span>ACCEPTED & SIGNED DIGITALLY</span>
                  <div className="text-[10px] text-slate-400">{formatDate(proposal.acceptedAt)}</div>
                </div>
              ) : (
                'Printable Signature Area'
              )}
            </div>

            <div className="space-y-1 text-slate-300">
              <div>Nama: _______________________</div>
              <div>Jabatan: {proposal.contactPosition || 'Direksi'}</div>
              <div>Tanggal: ______________________</div>
            </div>
          </div>

          {/* SMART-AI.ID Representative Signature Box */}
          <div className="border border-slate-800 rounded-2xl p-6 text-center space-y-8 bg-slate-900/40">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Pihak Penyedia Solusi</span>
              <span className="font-bold text-white text-sm mt-1 block">SMART-AI.ID Solutions</span>
            </div>

            <div className="h-24 border-b border-dashed border-slate-700 flex items-center justify-center text-cyan-400 font-bold">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 mx-auto flex items-center justify-center text-cyan-300 font-mono text-xs">
                  SAI
                </div>
                <span className="text-xs">SMART-AI.ID AUTHORIZED</span>
              </div>
            </div>

            <div className="space-y-1 text-slate-300">
              <div>Nama: Solutions Architect Team</div>
              <div>Jabatan: VP Business & Enterprise Tech</div>
              <div>Tanggal: {formatDate(proposal.createdAt)}</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 pt-8 border-t border-slate-800/60 space-y-1">
          <div>SMART-AI.ID Enterprise Solutions | www.smart-ai.id | Proposal #{proposal.proposalNumber}</div>
          <div>Halaman Proposal Resmi — Rahasia & Terbatas untuk {proposal.companyName}</div>
        </div>
      </div>
    </div>
  );
};
