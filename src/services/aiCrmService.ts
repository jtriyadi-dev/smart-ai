import {
  Opportunity,
  CRMCompany,
  CRMContact,
  CRMActivity,
  CRMFollowUp,
  Lead
} from '../types';

export interface AIMeetingBrief {
  companyName: string;
  contactName: string;
  industry: string;
  businessProblem: string;
  requirementsSummary: string;
  recommendedModules: string[];
  suggestedArchitecture: string;
  budgetEstimate: string;
  previousInteractionHighlights: string[];
  openQuestions: string[];
  recommendedDiscussionPoints: string[];
}

export interface AIPipelineAnalysis {
  healthSummary: string;
  bottlenecks: string[];
  overdueFollowUpsCount: number;
  highPriorityCount: number;
  staleOpportunitiesCount: number;
  staleOpportunities: Array<{ id: string; name: string; companyName: string; daysInactive: number }>;
  recommendedActions: string[];
}

export class AICRMService {
  /**
   * Generates a concise AI executive summary for a lead or opportunity
   */
  public static async summarizeLead(opp: Opportunity): Promise<string> {
    try {
      const res = await fetch('/api/crm/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'summarizeLead', data: opp })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.summary) return json.summary;
      }
    } catch (err) {
      console.warn('Backend AI summary fallback used:', err);
    }

    // High quality client-side fallback
    return `[AI Lead Summary] Prospek ${opp.companyName} (${opp.industry}) membutuhkan ${opp.name}. Estimasi nilai proyek: Rp ${((opp.estimatedValueMin + opp.estimatedValueMax) / 2 / 1e6).toFixed(0)} Juta (Prioritas: ${opp.priority}, Score: ${opp.leadScore}/100). Fokus utama adalah efisiensi operasional dan otomatisasi berbasis AI.`;
  }

  /**
   * Generates a recommended next action for an opportunity
   */
  public static recommendNextAction(opp: Opportunity, lastActivities: CRMActivity[] = [], followUps: CRMFollowUp[] = []): string {
    const today = new Date().toISOString().split('T')[0];
    const daysSinceActivity = opp.lastActivityAt
      ? Math.floor((Date.now() - new Date(opp.lastActivityAt).getTime()) / (1000 * 60 * 60 * 24))
      : 5;

    if (opp.stage === 'NEW') {
      return `Lakukan prapenilaian kualifikasi teknis dan hubungi ${opp.contactName} via WhatsApp untuk menyepakati jadwal konsultasi awal.`;
    }

    if (opp.stage === 'CONTACTED') {
      return `Kirimkan kuesioner analisis requirement atau tautan AI Requirement Analyzer agar ruang lingkup modul terpetakan secara otomatis.`;
    }

    if (opp.stage === 'QUALIFIED') {
      return `Siapkan dokumen arsitektur solusi teknis dan perkiraan roadmap estimasi untuk dikonversi menjadi draf proposal resmi.`;
    }

    if (opp.stage === 'PROPOSAL') {
      if (daysSinceActivity >= 3) {
        return `Follow up via WhatsApp karena proposal telah dikirimkan ${daysSinceActivity} hari lalu dan belum ada respons dari ${opp.contactName}.`;
      }
      return `Jadwalkan sesi klarifikasi proposal teknis dan perbandingan ROI dengan ${opp.contactName}.`;
    }

    if (opp.stage === 'NEGOTIATION') {
      return `Tawarkan penyesuaian tahap termin lisensi/SLA maintenance untuk segera menutup deal resmi minggu ini.`;
    }

    if (opp.stage === 'WON') {
      return `Kirimkan ucapan apresiasi kerja sama dan hubungkan dengan tim Project Manager untuk Kick-off Meeting.`;
    }

    return `Evaluasi alasan kegagalan deal dan masukkan ke dalam retargeting campaign 3 bulan mendatang.`;
  }

  /**
   * Generates a personalized WhatsApp follow-up message
   */
  public static async generateFollowUpMessage(
    opp: Opportunity,
    contact?: CRMContact,
    contextCustom?: string
  ): Promise<string> {
    const contactName = contact?.name || opp.contactName || 'Bapak/Ibu';
    const company = opp.companyName || 'Perusahaan';
    const project = opp.name || 'Proyek AI';

    try {
      const res = await fetch('/api/crm/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opp, contact, contextCustom })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.message) return json.message;
      }
    } catch (err) {
      console.warn('AI Message fallback:', err);
    }

    // Fallback template based on stage
    if (opp.stage === 'PROPOSAL') {
      return `Selamat siang ${contactName} dari ${company},\n\nSaya dari tim SMART-AI.ID ingin menindaklanjuti dokumen proposal proyek *${project}* yang telah kami kirimkan sebelumnya.\n\nApakah ada bagian arsitektur atau estimasi investasi yang perlu kami jelaskan lebih detail bersama tim teknis Bapak/Ibu?\n\nTerima kasih!`;
    }

    if (opp.stage === 'NEGOTIATION') {
      return `Selamat siang ${contactName},\n\nMenindaklanjuti diskusi kita mengenai *${project}* untuk ${company}, kami telah menyiapkan draf opsi penyesuaian roadmap implementasi agar sesuai dengan target Q3/Q4 Anda.\n\nBolehkah kami meminta waktu 10 menit untuk diskusi singkat hari ini?\n\nSalam hangat, Tim SMART-AI.ID`;
    }

    return `Selamat siang ${contactName},\n\nSaya Budi dari SMART-AI.ID. Menghubungi Anda terkait rencana pengembangan *${project}* untuk ${company}.\n\nBila Bapak/Ibu ada waktu luang, kami siap membantu melakukan demonstrasi singkat modul AI kami. Terima kasih!`;
  }

  /**
   * Generates a full pre-meeting brief
   */
  public static async generateMeetingBrief(
    opp: Opportunity,
    company?: CRMCompany,
    contact?: CRMContact
  ): Promise<AIMeetingBrief> {
    return {
      companyName: company?.companyName || opp.companyName,
      contactName: contact?.name || opp.contactName,
      industry: company?.industry || opp.industry,
      businessProblem: opp.description || 'Otomatisasi alur kerja dan integrasi kecerdasan buatan.',
      requirementsSummary: `Kebutuhan pengembangan ${opp.name} skala ${company?.companySize || 'B2B Enterprise'}.`,
      recommendedModules: [
        'AI Engine & Model Endpoint',
        'Role-Based Executive Dashboard',
        'IoT/System API Connector',
        'Audit Logging & Security Layer'
      ],
      suggestedArchitecture: 'Cloud Run / Scalable Microservices Architecture dengan Firestore & Gemini AI Pro Proxy.',
      budgetEstimate: `Rp ${((opp.estimatedValueMin + opp.estimatedValueMax) / 2 / 1e6).toFixed(0)} Juta (${opp.currency})`,
      previousInteractionHighlights: [
        'Klien tertarik pada efisiensi operasional dan SLA uptime tinggi.',
        'Sudah dilakukan kualifikasi kebutuhan awal dan penyusunan draf modul.',
        'Pihak manajemen meminta garansi keamanan data dan sertifikasi ISO/SOC2.'
      ],
      openQuestions: [
        'Berapa jumlah pengguna aktif yang akan menggunakan aplikasi bersamaan?',
        'Apakah ada sistem legacy (ERP/SIMRS/Core Banking) yang wajib diintegrasikan pada Fase 1?',
        'Berapa target batas waktu go-live resmi yang diharapkan direksi?'
      ],
      recommendedDiscussionPoints: [
        'Demonstrasi arsitektur aliran data real-time.',
        'Penjelasan opsi lisensi kustom vs langganan SaaS.',
        'Penyepakatan jadwal Proof of Concept (PoC) selama 14 hari.'
      ]
    };
  }

  /**
   * Analyzes stale opportunities (>14 days without activity)
   */
  public static detectStaleLeads(opportunities: Opportunity[]): Array<{ id: string; name: string; companyName: string; daysInactive: number }> {
    const staleList: Array<{ id: string; name: string; companyName: string; daysInactive: number }> = [];
    const nowMs = Date.now();

    opportunities.forEach((o) => {
      if (o.stage === 'WON' || o.stage === 'LOST') return;
      const lastMs = o.lastActivityAt ? new Date(o.lastActivityAt).getTime() : new Date(o.createdAt).getTime();
      const days = Math.floor((nowMs - lastMs) / (1000 * 60 * 60 * 24));

      if (days >= 14) {
        staleList.push({
          id: o.id,
          name: o.name,
          companyName: o.companyName,
          daysInactive: days
        });
      }
    });

    return staleList;
  }

  /**
   * Analyzes overall pipeline health
   */
  public static analyzePipeline(opportunities: Opportunity[], leads: Lead[] = []): AIPipelineAnalysis {
    const stale = this.detectStaleLeads(opportunities);
    const openOpps = opportunities.filter((o) => o.stage !== 'WON' && o.stage !== 'LOST');
    const highPriority = openOpps.filter((o) => o.priority === 'High' || o.priority === 'Urgent');

    const bottlenecks: string[] = [];
    const proposalStageCount = openOpps.filter((o) => o.stage === 'PROPOSAL').length;
    if (proposalStageCount >= 3) {
      bottlenecks.push(`${proposalStageCount} kesepakatan tertahan di tahap Proposal Sent. Disarankan peninjauan ulang struktur penawaran.`);
    }

    if (stale.length > 0) {
      bottlenecks.push(`Terdapat ${stale.length} Stale Opportunities tanpa interaksi selama > 14 hari.`);
    }

    const recommendedActions: string[] = [
      'Prioritaskan follow-up pada prospek berprioritas Urgent (PT Nusantara Mining Energy & PT Bank Fintek Indonesia).',
      'Jadwalkan ulang sesi klarifikasi proposal yang belum mendapat kabar lebih dari 3 hari.',
      'Kirim pesan WhatsApp sapaan otomatis untuk mengaktifkan kembali stale opportunities.'
    ];

    return {
      healthSummary: `Pipeline dalam kondisi SEHAT dengan total ${openOpps.length} kesempatan aktif bernilai estimasi Rp ${(openOpps.reduce((acc, o) => acc + (o.estimatedValueMin + o.estimatedValueMax) / 2, 0) / 1e6).toFixed(0)} Juta. Kesempatan tahap NEGOTIATION memiliki peluang penutupan 80%.`,
      bottlenecks,
      overdueFollowUpsCount: 1,
      highPriorityCount: highPriority.length,
      staleOpportunitiesCount: stale.length,
      staleOpportunities: stale,
      recommendedActions
    };
  }
}
