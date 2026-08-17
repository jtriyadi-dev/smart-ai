import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Calendar,
  Send,
  Zap,
  Clock,
  Layers,
  Building2,
  User,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  FileText,
  Target,
  BarChart2,
  ArrowRight,
  PhoneCall,
  Flame,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Opportunity,
  Lead,
  AISalesAnalysisResult,
  AISalesFollowUpMessageVariants,
  AISalesMeetingBrief
} from '../../types';
import { AISalesAssistantService } from '../../services/aiSalesAssistantService';
import { AISalesScoreService } from '../../services/aiSalesScoreService';
import { generateWhatsAppUrl } from '../../services/whatsappService';
import { GenerateProposalModal } from '../proposal/GenerateProposalModal';

interface AISalesAssistantPanelProps {
  opportunity?: Opportunity | Lead | any;
  onClose?: () => void;
  onOpenConsultationModal?: () => void;
  onActionTriggered?: (actionType: string, detail: any) => void;
}

export const AISalesAssistantPanel: React.FC<AISalesAssistantPanelProps> = ({
  opportunity,
  onClose,
  onOpenConsultationModal,
  onActionTriggered
}) => {
  const [analysis, setAnalysis] = useState<AISalesAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reAnalyzing, setReAnalyzing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'followup' | 'discovery' | 'meeting' | 'objections' | 'chat'>('overview');

  // Follow up generator state
  const [selectedVariant, setSelectedVariant] = useState<keyof AISalesFollowUpMessageVariants>('professional');
  const [messageVariants, setMessageVariants] = useState<AISalesFollowUpMessageVariants | null>(null);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [customPromptNote, setCustomPromptNote] = useState<string>('');

  // Meeting brief state
  const [meetingBrief, setMeetingBrief] = useState<AISalesMeetingBrief | null>(null);

  // Interactive Discovery Assistant State
  const [discoveryAnswers, setDiscoveryAnswers] = useState<Record<string, string>>({});
  const [interactiveAnalysisNote, setInteractiveAnalysisNote] = useState<string>('');

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Halo! Saya AI Sales Assistant SMART-AI.ID. Ada yang ingin Anda tanyakan tentang strategi penutupan lead ini atau penyesuaian penawaran?',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  // Feedback state
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean | null>(null);

  // Generate Proposal Modal State
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [opportunity?.id]);

  const loadAnalysis = async (force: boolean = false) => {
    if (force) setReAnalyzing(true);
    else setLoading(true);

    try {
      const oppData = opportunity || {
        id: 'LEAD-DEFAULT',
        companyName: 'PT Pertambangan Nusantara',
        contactName: 'Ir. Hendra Gunawan',
        industry: 'Mining & Logistics',
        name: 'Fleet & Telemetry AI Platform',
        estimatedValueMax: 250e6,
        stage: 'QUALIFIED'
      };

      const res = await AISalesAssistantService.analyzeLead(oppData, force);
      setAnalysis(res);

      const variants = AISalesAssistantService.generateMessageVariants(res, oppData.contactName || oppData.name);
      setMessageVariants(variants);

      const brief = AISalesAssistantService.prepareMeeting(res);
      setMeetingBrief(brief);
    } catch (err) {
      console.error('Failed to load AI Sales Analysis:', err);
    } finally {
      setLoading(false);
      setReAnalyzing(false);
    }
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleSendWhatsApp = (text: string) => {
    const phone = opportunity?.whatsapp || opportunity?.phone || opportunity?.contactPhone || '6281234567890';
    const url = generateWhatsAppUrl(phone, text);
    window.open(url, '_blank');
    if (onActionTriggered) {
      onActionTriggered('WHATSAPP_SENT', { phone, text });
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');

    const newMsgs = [
      ...chatMessages,
      { sender: 'user' as const, text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setChatMessages(newMsgs);

    setTimeout(() => {
      let aiResponse = `Berdasarkan data lead ${analysis?.companyName}, penawaran sebaiknya menekankan ${analysis?.talkingPoints[0] || 'efisiensi operasional'}.`;
      if (userMsg.toLowerCase().includes('harga') || userMsg.toLowerCase().includes('diskon')) {
        aiResponse = `Untuk negosiasi harga dengan ${analysis?.companyName}, disarankan tidak memotong harga awal, melainkan menawarkan bundling penahapan (MVP di Tahap 1, modul AI di Tahap 2).`;
      } else if (userMsg.toLowerCase().includes('kompetitor') || userMsg.toLowerCase().includes('pesaing')) {
        aiResponse = `Keunggulan SMART-AI.ID terletak pada arsitektur hybrid Cloud Run + Gemini Flash lokal yang terintegrasi langsung dengan WhatsApp & IoT Gateway tanpa ketergantungan vendor luar.`;
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 800);
  };

  const handleFeedback = (helpful: boolean) => {
    if (analysis) {
      AISalesAssistantService.submitRecommendationFeedback(analysis.id, helpful);
      setFeedbackSubmitted(helpful);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center space-y-4 bg-slate-900/60 rounded-xl border border-slate-800">
        <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" />
        <div>
          <h3 className="text-lg font-bold text-white">Menganalisis Lead dengan Executive AI Sales Assistant...</h3>
          <p className="text-sm text-slate-400 mt-1">
            Menghitung Lead Score 0-100, merekomendasikan solusi terarah, dan menganalisis kesiapan proposal.
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div id="ai-sales-assistant-panel" className="bg-[#0b0f17] border border-cyan-500/20 rounded-2xl p-6 text-slate-200 shadow-2xl relative">
      {/* Header Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Sales Intelligence v2.5
              </span>
              <span className="text-xs text-slate-400">
                Terakhir dianalisis: {new Date(analysis.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
              AI Sales Assistant: <span className="text-cyan-300">{analysis.companyName}</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsProposalModalOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generate Proposal
          </button>
          <button
            onClick={() => loadAnalysis(true)}
            disabled={reAnalyzing}
            className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${reAnalyzing ? 'animate-spin text-cyan-400' : ''}`} />
            {reAnalyzing ? 'Re-analyzing...' : 'Re-analyze Lead'}
          </button>
          {onClose && (
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Top Banner KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        {/* Score Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="relative flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="6" className="text-slate-800" fill="transparent" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="6"
                className={analysis.leadScore.score >= 80 ? 'text-emerald-400' : analysis.leadScore.score >= 60 ? 'text-cyan-400' : 'text-amber-400'}
                strokeDasharray={163}
                strokeDashoffset={163 - (163 * analysis.leadScore.score) / 100}
                fill="transparent"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-white">{analysis.leadScore.score}</span>
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">AI Lead Score</span>
            <div className="text-lg font-extrabold text-white flex items-center gap-1.5 mt-0.5">
              <span>{analysis.leadScore.level}</span>
              {analysis.leadScore.score >= 80 && <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />}
            </div>
            <span className="text-[11px] text-cyan-400 font-medium">Confidence: {analysis.leadScore.confidence}</span>
          </div>
        </div>

        {/* Priority Badge */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Prioritas Sales</span>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                analysis.priority.level === 'URGENT'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                  : analysis.priority.level === 'HIGH'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              }`}
            >
              {analysis.priority.level} PRIORITY
            </span>
          </div>
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{analysis.priority.reason}</p>
        </div>

        {/* Recommended Action */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Rekomendasi Langkah</span>
          <div className="text-sm font-bold text-cyan-300 flex items-center gap-1.5 mt-1">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">{analysis.nextAction.action}</span>
          </div>
          <span className="text-[11px] text-slate-400">{analysis.nextAction.timing} via {analysis.nextAction.channel}</span>
        </div>

        {/* Proposal Readiness */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Kesiapan Proposal</span>
          <div className="flex items-center space-x-2 mt-1">
            {analysis.proposalReadiness.isReady ? (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Proposal Ready
              </span>
            ) : (
              <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Discovery Needed
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400">Score Kelengkapan: {analysis.requirementCompleteness.score}%</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Strategic Overview
        </button>
        <button
          onClick={() => setActiveTab('followup')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'followup'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Follow-up WhatsApp Generator
        </button>
        <button
          onClick={() => setActiveTab('discovery')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'discovery'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Discovery Assistant
        </button>
        <button
          onClick={() => setActiveTab('meeting')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'meeting'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" /> Pre-Meeting Briefing
        </button>
        <button
          onClick={() => setActiveTab('objections')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'objections'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Objections & Talking Points
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'chat'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Ask AI Copilot
        </button>
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive Summary Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-cyan-400" /> Ringkasan Eksekutif Lead
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{analysis.executiveSummary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recommended Solution Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" /> Rekomendasi Solusi Sistem
                </h3>
                <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  {analysis.recommendedSolution.recommendedPlatform}
                </span>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-cyan-300">{analysis.recommendedSolution.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{analysis.recommendedSolution.description}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 uppercase">Modul Utama:</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.recommendedSolution.coreModules.map((m, i) => (
                    <span key={i} className="text-xs bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-md">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 uppercase">Kapabilitas AI & Integrasi:</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {analysis.recommendedSolution.aiCapabilities.map((ai, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{ai}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Arsitektur: </span>
                {analysis.recommendedSolution.recommendedArchitecture}
              </div>
            </div>

            {/* Score Factors Breakdown & Positive/Negative Drivers */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" /> Faktor Penilaian Score ({analysis.leadScore.score}/100)
              </h3>

              <div className="space-y-3">
                {analysis.leadScore.factors.map((f, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">{f.category}</span>
                      <span className="font-bold text-cyan-400">+{f.points} pts</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(f.points / 20) * 100}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400">{f.reason}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300 block mb-1">Analisis Faktor Tambahan:</span>
                <pre className="text-xs text-slate-400 font-sans whitespace-pre-wrap leading-relaxed">
                  {analysis.leadScore.explanation}
                </pre>
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Siap Menindaklanjuti Lead Ini?
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Gunakan template pesan WhatsApp otomatis atau langsung buat jadwal sesi konsultasi teknis.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('followup')}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Generate Follow-up
              </button>
              {onOpenConsultationModal && (
                <button
                  onClick={onOpenConsultationModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold border border-slate-700 transition flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Schedule Consultation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: FOLLOW-UP WHATSAPP GENERATOR */}
      {activeTab === 'followup' && messageVariants && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Pilih Gaya Nada Pesan (Tone)
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
              {[
                { id: 'professional', label: 'Professional' },
                { id: 'friendly', label: 'Friendly' },
                { id: 'executive', label: 'Executive' },
                { id: 'technical', label: 'Technical' },
                { id: 'shortWhatsapp', label: 'Short WA' }
              ].map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id as any)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                    selectedVariant === variant.id
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {variant.label}
                </button>
              ))}
            </div>

            {/* Generated Message Box */}
            <div className="bg-[#070b12] border border-slate-800 rounded-xl p-4 relative">
              <div className="text-xs text-slate-400 uppercase font-semibold mb-2 flex items-center justify-between">
                <span>Pratinjau Pesan WhatsApp ({selectedVariant})</span>
                <span className="text-emerald-400 font-mono text-[11px]">Auto-formatted for WhatsApp</span>
              </div>
              <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {messageVariants[selectedVariant]}
              </p>

              <div className="flex items-center justify-end space-x-3 mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleCopyMessage(messageVariants[selectedVariant])}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                >
                  {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedMessage ? 'Copied!' : 'Copy Text'}
                </button>
                <button
                  onClick={() => handleSendWhatsApp(messageVariants[selectedVariant])}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
                >
                  <Send className="w-3.5 h-3.5" /> Kirim via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: DISCOVERY ASSISTANT */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" /> Pertanyaan Kunci Discovery
              </h3>
              <span className="text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2.5 py-0.5 rounded-full font-medium">
                {analysis.discoveryQuestions.length} Pertanyaan Disarankan
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Gunakan pertanyaan ini saat meeting kualifikasi untuk menggali informasi bisnis yang belum lengkap.
            </p>

            <div className="space-y-3">
              {analysis.discoveryQuestions.map((q, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5 flex flex-col space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                      Q{idx + 1}
                    </span>
                    <p className="text-xs font-medium text-slate-200 mt-0.5">{q}</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan jawaban dari klien untuk memperbarui analisis AI..."
                    value={discoveryAnswers[idx] || ''}
                    onChange={(e) => setDiscoveryAnswers({ ...discoveryAnswers, [idx]: e.target.value })}
                    className="w-full text-xs bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => loadAnalysis(true)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-analyze with Client Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: PRE-MEETING BRIEFING */}
      {activeTab === 'meeting' && meetingBrief && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" /> Executive Pre-Meeting Briefing Document
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5">
                <span className="text-xs font-bold text-cyan-400 uppercase block mb-1">Tujuan Utama Meeting</span>
                <p className="text-xs text-slate-300">{meetingBrief.objective}</p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5">
                <span className="text-xs font-bold text-emerald-400 uppercase block mb-1">Rekomendasi Langkah Penutup</span>
                <p className="text-xs text-slate-300">{meetingBrief.recommendedNextStep}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase block">Poin Diskusi Kunci (Talking Points):</span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {meetingBrief.talkingPoints.map((tp, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded border border-slate-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{tp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: OBJECTIONS */}
      {activeTab === 'objections' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Analisis Keberatan Klien & Jawaban Rekomendasi
            </h3>

            <div className="space-y-3">
              {analysis.potentialObjections.map((obj, i) => (
                <div key={i} className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" /> Potensi Keberatan Klien: "{obj.objection}"
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-3 rounded text-xs text-slate-300">
                    <span className="text-emerald-400 font-bold block mb-1">Rekomendasi Jawaban Sales:</span>
                    {obj.suggestedResponse}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: AI CHAT */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 h-64 overflow-y-auto space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-60 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Tanyakan sesuatu tentang lead ini (misal: 'Bagaimana menanggapi permintaan diskon?')..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSendChat}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Kirim
            </button>
          </div>
        </div>
      )}

      {/* Footer Feedback Bar */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Apakah analisis AI Sales Assistant ini membantu?</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFeedback(true)}
            className={`p-1.5 rounded-lg border transition ${
              feedbackSubmitted === true ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'hover:bg-slate-800 border-slate-700'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className={`p-1.5 rounded-lg border transition ${
              feedbackSubmitted === false ? 'bg-rose-950 text-rose-400 border-rose-800' : 'hover:bg-slate-800 border-slate-700'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Generate Proposal Modal */}
      <GenerateProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        initialData={{
          companyName: analysis?.companyName,
          contactName: opportunity?.contactName || 'Executive Lead',
          industry: analysis?.industry,
          projectTitle: opportunity?.name || `Penawaran Solusi - ${analysis?.companyName}`,
          estimatedValueMax: opportunity?.estimatedValueMax || 250000000,
          opportunityId: opportunity?.id
        }}
        onProposalCreated={(newProp) => {
          window.location.href = `/admin/proposals/${newProp.id}`;
        }}
      />
    </div>
  );
};
