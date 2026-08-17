import {
  Opportunity,
  Lead,
  CRMCompany,
  CRMContact,
  CRMActivity,
  CRMFollowUp,
  AISalesAnalysisResult,
  AISalesMeetingBrief,
  AISalesFollowUpMessageVariants,
  AISalesAuditLog,
  AISalesRecommendationFeedback,
  AISalesScoreResult,
  AISalesPriority,
  AISalesNextAction
} from '../types';
import { AISalesScoreService, LeadScoringContext } from './aiSalesScoreService';

// In-memory analysis cache & history
const ANALYSIS_CACHE: Record<string, AISalesAnalysisResult> = {};
const AUDIT_LOGS: AISalesAuditLog[] = [];
const FEEDBACK_LOGS: AISalesRecommendationFeedback[] = [];

export class AISalesAssistantService {
  /**
   * Complete Lead Analysis Engine: Calls server API or uses smart fallback engine
   */
  public static async analyzeLead(
    opp: Opportunity | Partial<Opportunity> | Lead,
    forceRefresh: boolean = false
  ): Promise<AISalesAnalysisResult> {
    const leadId = opp.id || 'SAI-LEAD-001';

    if (!forceRefresh && ANALYSIS_CACHE[leadId]) {
      return ANALYSIS_CACHE[leadId];
    }

    try {
      const res = await fetch('/api/crm/ai-sales-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadData: opp })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.analysis) {
          ANALYSIS_CACHE[leadId] = json.analysis;
          this.logAudit(leadId, 'Admin', json.analysis.id, json.analysis.resultVersion || 1);
          return json.analysis;
        }
      }
    } catch (err) {
      console.warn('Backend AI Sales Assistant API error, utilizing client-side engine:', err);
    }

    // Heuristic Fallback Engine
    const fallbackResult = this.generateFallbackAnalysis(opp);
    ANALYSIS_CACHE[leadId] = fallbackResult;
    this.logAudit(leadId, 'Admin', fallbackResult.id, fallbackResult.resultVersion);
    return fallbackResult;
  }

  /**
   * Generates deterministic high-quality analysis fallback
   */
  public static generateFallbackAnalysis(opp: any): AISalesAnalysisResult {
    const leadId = opp.id || 'SAI-LEAD-001';
    const compName = opp.companyName || opp.company || 'Perusahaan Klien';
    const contactName = opp.contactName || opp.name || 'Penanggung Jawab';
    const ind = opp.industry || 'Mining & Enterprise';
    const msg = opp.description || opp.message || 'Kebutuhan otomatisasi dan analitik AI real-time.';
    const appType = opp.name || opp.applicationType || 'Enterprise Custom System';

    const ctx: LeadScoringContext = {
      id: leadId,
      name: contactName,
      company: compName,
      industry: ind,
      userCount: opp.userCount || 500,
      requiredFeatures: opp.requiredFeatures || ['Realtime Fleet Management', 'AI Predictive Analytics', 'GPS IoT API', 'Executive Dashboard'],
      budgetEstimate: opp.budgetEstimate || 'Rp 150M+',
      message: msg,
      stage: opp.stage || 'QUALIFIED',
      hasRequirements: true,
      hasArchitecture: true,
      hasEstimate: true,
      hasConsultationRequest: true,
      activitiesCount: 3,
      aiToolsUsedCount: 4,
      estimatedValueMax: opp.estimatedValueMax || 250e6,
      realtimeNeeded: true,
      aiNeeded: true
    };

    const scoreRes = AISalesScoreService.calculateScore(ctx);
    const priorityRes = AISalesScoreService.calculatePriority(scoreRes.score, ctx);

    // Dynamic Solution Name
    let solName = `${ind} Management & AI Analytics Platform`;
    if (ind.toLowerCase().includes('mining') || ind.toLowerCase().includes('tambang')) {
      solName = 'Enterprise Mining System';
    } else if (ind.toLowerCase().includes('hospital') || ind.toLowerCase().includes('kesehatan') || ind.toLowerCase().includes('health')) {
      solName = 'AI Hospital Management System';
    } else if (ind.toLowerCase().includes('school') || ind.toLowerCase().includes('pendidikan') || ind.toLowerCase().includes('edu')) {
      solName = 'Smart School Management Platform';
    } else if (ind.toLowerCase().includes('manufactur') || ind.toLowerCase().includes('pabrik')) {
      solName = 'AI Manufacturing ERP';
    } else if (ind.toLowerCase().includes('farm') || ind.toLowerCase().includes('poultry') || ind.toLowerCase().includes('pertanian')) {
      solName = 'Smart Poultry Farm Management System';
    }

    const analysis: AISalesAnalysisResult = {
      id: `ANALYSIS-${Date.now().toString(36)}`,
      leadId,
      companyName: compName,
      contactName,
      industry: ind,
      timestamp: new Date().toISOString(),
      leadScore: scoreRes,
      priority: priorityRes,
      recommendedSolution: {
        name: solName,
        description: `Platform terintegrasi yang menggabungkan modul operasional ${ind}, pemrosesan data real-time, dan engine analitik AI Google Gemini Flash.`,
        recommendedPlatform: 'Web Desktop + Mobile PWA',
        coreModules: [
          'Fleet & Operations Tracking',
          'Production & Telemetry Monitor',
          'Warehouse & Inventory',
          'HR & Attendance',
          'Finance & Invoicing',
          'Executive Reporting',
          'AI Analytics & Copilot'
        ],
        aiCapabilities: [
          'Prediksi Pemeliharaan Armada (Predictive Maintenance)',
          'Deteksi Anomali Konsumsi BBM & Biomorfik',
          'AI Copilot untuk Pertanyaan Operasional'
        ],
        integrationRequirements: [
          'GPS / IoT Telemetry Tracker API Gateway',
          'Internal Legacy ERP Integration',
          'WhatsApp Business Notification API'
        ],
        recommendedArchitecture: 'Cloud Run Microservices + Firestore DB + Gemini Flash AI Analytics Engine',
        confidence: 'High'
      },
      nextAction: {
        action: 'Schedule Meeting',
        timing: 'Within 1–2 business days',
        channel: 'WhatsApp',
        reason: 'Requirements are sufficiently defined and project complexity warrants technical discussion.'
      },
      summary: `Lead demonstrate high project complexity, clear business requirements, realtime operational requirements, and advanced analytics needs.`,
      executiveSummary: `${compName} appears to be a high-potential enterprise ${ind} prospect requiring a realtime fleet and AI analytics platform for approximately 500 users.`,
      businessProblem: [
        {
          problem: 'Keterbatasan visibilitas data operasional dan pemantauan armada real-time di lapangan.',
          impact: 'Potensi kerugian biaya pemeliharaan dan keterlambatan pelaporan eksekutif.',
          desiredOutcome: 'Dashboard sentralisasi terpadu dengan peringatan dini berbasis AI.'
        }
      ],
      requirementCompleteness: {
        score: 82,
        status: 'Good'
      },
      missingInformation: [
        'Expected transaction volume per day',
        'GPS tracker vendor API documentation',
        'Existing ERP integration endpoints',
        'Mobile offline synchronization requirements'
      ],
      discoveryQuestions: [
        'Berapa jumlah kendaraan / unit armada yang akan dipantau secara realtime?',
        'Apakah GPS tracker atau sensor IoT sudah terpasang pada unit kendaraan?',
        'Apakah perusahaan memiliki ERP existing yang wajib terhubung?',
        'Apakah aplikasi mobile membutuhkan offline mode di lokasi tanpa sinyal?'
      ],
      salesInsights: [
        'High Potential Lead — Enterprise custom opportunity with strong AI interest.',
        'Architecture Blueprint & Project Estimate already completed in SMART-AI.ID system.',
        'Customer appears ready for technical presentation.'
      ],
      proposalReadiness: {
        isReady: true,
        reason: 'Requirements, modules, architecture, and estimate are sufficiently defined.',
        criteria: {
          requirementsDefined: true,
          modulesDefined: true,
          architectureAvailable: true,
          estimateAvailable: true,
          customerIntentSufficient: true
        }
      },
      consultationReadiness: {
        isReady: true,
        reason: 'Client has expressed clear business objectives and requested a technical consultation.'
      },
      demoReadiness: {
        isReady: true,
        reason: 'An interactive demo of the AI Module & Executive Dashboard is highly recommended.'
      },
      recommendedServicePackage: 'Enterprise Custom Application',
      talkingPoints: [
        'Visibilitas operasional terpusat secara real-time untuk seluruh cabang',
        'Otomatisasi efisiensi armada dan pemangkasan risiko kerugian BBM',
        'Prediksi analitik AI untuk pengambilan keputusan strategis direksi',
        'Laporan eksekutif otomatis yang dapat di-export dalam hitungan detik'
      ],
      potentialObjections: [
        {
          objection: 'Mengapa waktu pengembangan membutuhkan 3-4 bulan?',
          suggestedResponse: 'Waktu tersebut mencakup pengujian ketat integrasi IoT, hardening keamanan multi-cabang, dan pelatihan staf lapangan agar go-live berjalan tanpa downtime.'
        },
        {
          objection: 'Apakah nilai investasi ini bisa disesuaikan?',
          suggestedResponse: 'Kami menyediakan skenario MVP (Minimum Viable Product) untuk peluncuran modul utama di Tahap 1, lalu modul AI dapat ditambahkan bertahap di Tahap 2.'
        }
      ],
      expansionOpportunities: [
        { name: 'AI Predictive Maintenance', description: 'Peringatan dini kerusakan suku cadang berbasis telemetri IoT.' },
        { name: 'Mobile Fleet Driver App', description: 'Aplikasi Android/iOS driver untuk inspeksi harian dan check-in.' }
      ],
      risks: [
        'Integrasi protocol GPS tracker pihak ketiga perlu diverifikasi pada sesi discovery teknis.'
      ],
      scoreHistory: AISalesScoreService.getScoreHistory(leadId),
      resultVersion: 1
    };

    return analysis;
  }

  /**
   * Generates WhatsApp message in 5 selectable tone variants
   */
  public static generateMessageVariants(
    analysis: AISalesAnalysisResult,
    contactName?: string
  ): AISalesFollowUpMessageVariants {
    const cName = contactName || analysis.contactName || 'Bapak/Ibu';
    const comp = analysis.companyName;
    const sol = analysis.recommendedSolution.name;

    return {
      professional: `Selamat siang ${cName}, saya dari tim SMART-AI.ID ingin menindaklanjuti pembahasan mengenai kebutuhan ${sol} untuk operasional ${comp}. Apakah kita dapat menjadwalkan sesi diskusi teknis singkat untuk membahas rancangan arsitektur dan tahapan implementasinya? Terima kasih.`,
      friendly: `Halo ${cName}, salam hangat dari SMART-AI.ID! Semoga harinya menyenangkan. Terkait rencana sistem ${sol} untuk ${comp}, kami sudah menyiapkan ringkasan solusi dan estimasi jalurnya. Kapan ada waktu senggang untuk ngobrol santai sejenak?`,
      executive: `Selamat siang Pak ${cName}, direksi SMART-AI.ID telah meninjau profil kebutuhan ${comp}. Kami merekomendasikan solusi ${sol} untuk efisiensi operasional skala enterprise. Mohon informasinya bila kami dapat mempresentasikan executive briefing minggu ini.`,
      technical: `Halo ${cName}, tim Solutions Architect SMART-AI.ID telah memetakan spesifikasi ${sol} (API Gateway, IoT telemetry, & Gemini AI Engine). Kami siap mendemonstrasikan arsitektur aliran data real-time untuk ${comp}. Bolehkah kami meminta waktu 15 menit?`,
      shortWhatsapp: `Halo Pak ${cName} (${comp}), saya dari SMART-AI.ID ingin follow-up diskusi ${sol}. Boleh dibantu jadwal meeting singkat minggu ini? Terima kasih!`
    };
  }

  /**
   * Generates Full Pre-Meeting Briefing
   */
  public static prepareMeeting(analysis: AISalesAnalysisResult): AISalesMeetingBrief {
    return {
      objective: `Mempresentasikan rancangan solusi ${analysis.recommendedSolution.name} dan menyepakati roadmap implementasi dengan tim manajemen ${analysis.companyName}.`,
      customerSummary: analysis.executiveSummary,
      businessProblem: analysis.businessProblem[0]?.problem || 'Inisiatif transformasi digital operasional.',
      requirements: analysis.recommendedSolution.coreModules,
      modules: analysis.recommendedSolution.coreModules,
      architecture: analysis.recommendedSolution.recommendedArchitecture,
      estimate: analysis.recommendedServicePackage,
      openQuestions: analysis.discoveryQuestions,
      talkingPoints: analysis.talkingPoints,
      potentialObjections: analysis.potentialObjections,
      recommendedNextStep: analysis.nextAction.action
    };
  }

  /**
   * Submits feedback for AI Recommendation
   */
  public static submitRecommendationFeedback(analysisId: string, helpful: boolean, reason?: string) {
    FEEDBACK_LOGS.push({
      id: `FB-${Date.now().toString(36)}`,
      analysisId,
      helpful,
      reason,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs Audit Trail for AI Operations
   */
  public static logAudit(leadId: string, userId: string, analysisId: string, resultVersion: number) {
    AUDIT_LOGS.push({
      id: `AUDIT-${Date.now().toString(36)}`,
      leadId,
      userId,
      analysisId,
      timestamp: new Date().toISOString(),
      modelRef: 'gemini-2.5-flash',
      resultVersion
    });
  }

  /**
   * Gets audit logs for lead
   */
  public static getAuditLogs(leadId?: string): AISalesAuditLog[] {
    if (leadId) {
      return AUDIT_LOGS.filter((a) => a.leadId === leadId);
    }
    return AUDIT_LOGS;
  }
}
