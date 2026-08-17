import { Proposal, ProposalStatus } from '../types';
import { ProposalDocumentService } from './proposalDocumentService';

export interface ProposalInputData {
  leadId?: string;
  opportunityId?: string;
  companyName: string;
  contactName: string;
  contactPosition?: string;
  contactEmail?: string;
  contactPhone?: string;
  companyAddress?: string;
  companyWebsite?: string;
  industry?: string;
  projectTitle?: string;
  message?: string;
  requiredFeatures?: string[];
  userCount?: string | number;
  estimatedValueMax?: number;
  stage?: string;
  // Module & Architecture context
  modules?: any[];
  architecture?: any;
  estimate?: any;
  salesAnalysis?: any;
}

export class AIProposalService {
  /**
   * Generates a complete Proposal document using backend AI or client fallback
   */
  public static async generateProposal(input: ProposalInputData): Promise<Proposal> {
    const propNum = ProposalDocumentService.generateProposalNumber();
    const token = ProposalDocumentService.generateSecureToken();

    try {
      const res = await fetch('/api/crm/ai-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputData: input, proposalNumber: propNum, token })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.proposal) {
          return ProposalDocumentService.saveProposal(json.proposal);
        }
      }
    } catch (err) {
      console.warn('Backend AI Proposal API error, generating locally:', err);
    }

    // Client-side fallback generation engine
    const fallbackProposal = this.generateFallbackProposal(input, propNum, token);
    return ProposalDocumentService.saveProposal(fallbackProposal);
  }

  /**
   * Local fallback AI generation engine
   */
  private static generateFallbackProposal(input: ProposalInputData, propNum: string, token: string): Proposal {
    const compName = input.companyName || 'Perusahaan Klien';
    const contact = input.contactName || 'Penanggung Jawab';
    const ind = input.industry || 'Enterprise & Technology';
    const title = input.projectTitle || `Penawaran Solusi Sistem Enterprise & AI Platform - ${compName}`;
    const now = new Date().toISOString();
    const validUntil = new Date(Date.now() + 30 * 86400000).toISOString();

    const estMin = input.estimatedValueMax ? Math.round(input.estimatedValueMax * 0.8) : 250000000;
    const estMax = input.estimatedValueMax ? Math.round(input.estimatedValueMax * 1.2) : 400000000;

    return {
      id: `PROP-${Date.now().toString(36)}`,
      proposalNumber: propNum,
      publicToken: token,
      version: 'v1',
      status: 'DRAFT',
      leadId: input.leadId,
      opportunityId: input.opportunityId,
      companyName: compName,
      contactName: contact,
      contactPosition: input.contactPosition || 'Direksi / Kepala Divisi IT',
      contactEmail: input.contactEmail || 'contact@clientcompany.com',
      contactPhone: input.contactPhone || '+62 812-0000-0000',
      companyAddress: input.companyAddress || 'Gedung Perkantoran Pusat, Jakarta',
      companyWebsite: input.companyWebsite || 'https://clientcompany.com',
      title,
      executiveSummary: `SMART-AI.ID menyajikan penawaran pengembangan sistem perangkat lunak kustom berbasis kecerdasan buatan untuk ${compName}. Dokumen ini merangkum kebutuhan operasional, arsitektur teknologi, serta rancangan investasi yang dirancang untuk mendukung efisiensi skala enterprise.`,
      customerProblem: {
        currentSituation: `${compName} mengelola proses bisnis ${ind} yang membutuhkan kecepatan pemrosesan data, pemantauan real-time, serta visibilitas eksekutif terpusat.`,
        keyChallenges: [
          'Keterbatasan visibilitas data operasional secara real-time antar cabang.',
          'Proses konsolidasi pelaporan manual yang membutuhkan waktu berhari-hari.',
          'Potensi kerugian akibat keterlambatan respon insiden operasional.'
        ],
        businessImpact: 'Keterbatasan otomatisasi berisiko menghambat ekspansi bisnis dan memicu biaya operasional tinggi.'
      },
      projectObjectives: [
        'Membangun platform terpusat berbasis web dan mobile PWA.',
        'Mengintegrasikan engine analitik AI Google Gemini Flash untuk otomatisasi laporan.',
        'Mengurangi waktu pemrosesan data operasional hingga 80%.',
        'Menyediakan dasbor eksekutif terpadu dengan hak akses berjenjang.'
      ],
      proposedSolution: {
        overview: `Solusi perangkat lunak terintegrasi yang mencakup modul manajemen operasional, analitik real-time, dan AI Copilot.`,
        coreCapabilities: ['Realtime Operations Dashboard', 'Automated Executive Reporting', 'AI Analytics Copilot', 'Role-Based Access Control'],
        architectureApproach: 'Cloud Run Microservices + Firestore DB + Event-driven Messaging Gateway',
        aiCapabilities: ['Google Gemini Flash AI Engine', 'Predictive Anomaly Scoring', 'Natural Language Copilot'],
        integrationApproach: 'RESTful API / WebSockets Gateway terintegrasi dengan WhatsApp Business API dan sistem existing.'
      },
      features: [
        {
          name: 'Central Executive Dashboard',
          description: 'Pusat kendali visual data operasional secara real-time.',
          businessValue: 'Mempercepat keputusan strategis direksi.'
        },
        {
          name: 'AI Analytics Copilot',
          description: 'Engine tanya-jawab data berbasis bahasa alami.',
          businessValue: 'Memudahkan ekstraksi wawasan tanpa kerumitan query SQL.'
        },
        {
          name: 'Automated Notification Gateway',
          description: 'Notifikasi instan via WhatsApp saat terjadi peringatan penting.',
          businessValue: 'Respon cepat terhadap kondisi darurat.'
        }
      ],
      modules: [
        {
          name: 'Core Operations & Management',
          category: 'Core Management',
          description: 'Modul utama pengelolaan data master, entitas, dan hak akses.',
          keyFeatures: ['Master Data Management', 'User Hierarchy & Roles', 'Audit Trail Log'],
          businessValue: 'Keamanan data dan tata kelola terstruktur.'
        },
        {
          name: 'Executive Reporting & Analytics',
          category: 'Analytics',
          description: 'Modul kompilasi laporan otomatis.',
          keyFeatures: ['Automated PDF Export', 'Filterable Visual Charts', 'Branch Comparison'],
          businessValue: 'Efisiensi waktu pembuatan laporan hingga 90%.'
        },
        {
          name: 'AI Intelligence Suite',
          category: 'AI',
          description: 'Integrasi model AI Gemini Flash.',
          keyFeatures: ['Smart Text Summary', 'Predictive Trend Analysis', 'OCR Document Scanner'],
          businessValue: 'Otomatisasi pengolahan dokumen dan wawasan masa depan.'
        }
      ],
      scope: {
        included: [
          'Analisis Spesifikasi & Desain UI/UX',
          'Pengembangan Aplikasi Web Admin & Mobile PWA',
          'Integrasi Engine AI Gemini & WhatsApp Gateway API',
          'Pengujian QA, Security Hardening, & UAT',
          'Deployment Cloud Infrastructure & User Training'
        ],
        excluded: [
          { text: 'Pengadaan perangkat keras / hardware fisik', isSuggested: false },
          { text: 'Biaya langganan API pihak ketiga yang ditagih terpisah', isSuggested: false },
          { text: 'Kustomisasi di luar kesepakatan scope dokumen pengerjaan', isSuggested: true }
        ]
      },
      technologyStack: {
        frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Express', 'TypeScript ESM'],
        database: ['Cloud Firestore / PostgreSQL'],
        api: ['RESTful API', 'WebSockets Gateway'],
        ai: ['Google Gemini 2.5 Flash', 'Google GenAI SDK'],
        cloud: ['Google Cloud Run', 'Google Cloud Storage'],
        monitoring: ['Cloud Logging & Health Check']
      },
      architectureSummary: 'Arsitektur cloud-native modern berbasis Google Cloud Run untuk kinerja tinggi, keamanan teruji, dan skala otomatis.',
      aiCapabilities: ['Gemini 2.5 Flash Text & Data Analytics', 'Automated Executive Report Synthesis'],
      integrations: [
        { name: 'WhatsApp Business API Gateway', status: 'Confirmed' },
        { name: 'External Legacy ERP Connector', status: 'Proposed Integration' }
      ],
      platforms: ['Web Desktop Admin', 'Mobile PWA'],
      estimatedUsers: String(input.userCount || '100+ Users'),
      estimatedBranches: 'Multi-Cabang',
      securityFeatures: [
        'Role-Based Access Control (RBAC)',
        'OAuth 2.0 / JWT Token Authentication',
        'Data Encryption in-Transit (TLS 1.3) and at-Rest',
        'Comprehensive Audit Trail Logging'
      ],
      developmentMethodology: [
        { step: 'Phase 1: Requirements Finalization & Discovery', description: 'Workshop teknis dan penyesuaian skema.' },
        { step: 'Phase 2: UI/UX Wireframing & Prototyping', description: 'Perancangan antarmuka visual.' },
        { step: 'Phase 3: Core Engineering & AI Integration', description: 'Sprint pengembangan backend, frontend, dan AI.' },
        { step: 'Phase 4: QA, Hardening & UAT', description: 'Pengujian menyeluruh dan persetujuan Klien.' },
        { step: 'Phase 5: Production Launch & Handover', description: 'Go-live, migrasi, dan pendampingan.' }
      ],
      timeline: {
        totalMonths: '3-4 Bulan',
        breakdown: [
          { phase: 'Discovery & Design', duration: '3 Minggu', details: 'Requirements & UI/UX Design' },
          { phase: 'Development Sprint', duration: '6 Minggu', details: 'Core Web & Mobile PWA Engineering' },
          { phase: 'AI & Integration', duration: '3 Minggu', details: 'Gemini AI Engine & API Gateway' },
          { phase: 'QA, UAT & Launch', duration: '3 Minggu', details: 'Testing, Hardening, & Deployment' }
        ],
        disclaimer:
          'Timeline merupakan estimasi awal dan dapat berubah berdasarkan finalisasi scope, requirement, dependencies, technical validation, customer feedback, dan project conditions.'
      },
      investment: {
        mode: 'Estimated',
        rangeMin: estMin,
        rangeMax: estMax,
        breakdown: [
          { category: 'Software Development (Web & Mobile PWA)', cost: Math.round(estMin * 0.5) },
          { category: 'AI Analytics & Copilot Engine', cost: Math.round(estMin * 0.25) },
          { category: 'Integrations & Cloud Setup', cost: Math.round(estMin * 0.15) },
          { category: 'QA, Hardening & Training', cost: Math.round(estMin * 0.1) }
        ]
      },
      support: {
        name: 'Standard Support Package',
        periodDays: 30,
        responseTime: '2-4 Jam Kerja',
        supportChannel: 'WhatsApp Group & Ticket Portal',
        maintenanceScope: 'Perbaikan bug, pemantauan kesehatan server, dan pembaruan patch keamanan.',
        updateScope: 'Optimasi performa minor.'
      },
      paymentTerms: [
        { milestone: '30% — Project Initiation (DP)', percentage: 30, description: 'Penandatanganan kesepakatan dan kickoff meeting.' },
        { milestone: '30% — Development Milestone (Beta)', percentage: 30, description: 'Demonstrasi modul utama.' },
        { milestone: '30% — User Acceptance Testing (UAT)', percentage: 30, description: 'Penyelesaian pengujian UAT.' },
        { milestone: '10% — Production Launch', percentage: 10, description: 'Go-live dan penyerahan dokumentasi.' }
      ],
      warranty: 'Garansi pemeliharaan cacat sistem berlaku selama 30 hari kalender sejak peluncuran produksi.',
      assumptions: [
        'Persyaratan berdasarkan kualifikasi awal.',
        'API pihak ketiga tersedia dengan akses memadai.',
        'Scope final akan dikonfirmasi kembali saat penandatanganan kesepakatan pengerjaan.'
      ],
      termsAndConditions: [
        {
          title: 'Scope & Alterations',
          content: 'Perubahan di luar lingkup yang disepakati akan diproses melalui Change Request Policy.'
        },
        {
          title: 'Payment Terms',
          content: 'Pembayaran wajib dilakukan dalam waktu 14 hari kerja setelah invoice diterbitkan.'
        },
        {
          title: 'Confidentiality',
          content: 'Proposal ini bersifat rahasia dan diperuntukkan khusus bagi tim internal Klien.'
        }
      ],
      validUntil,
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
      versions: [
        {
          version: 'v1',
          status: 'DRAFT',
          author: 'AI Proposal Service',
          date: now,
          summaryOfChanges: 'AI-generated first draft. Human review required.'
        }
      ],
      changeLogs: [
        {
          id: 'LOG-001',
          section: 'AI Proposal Generation',
          oldValue: 'None',
          newValue: 'Draft Created',
          changedBy: 'AI System',
          date: now
        }
      ]
    };
  }
}
