import { Proposal, ProposalStatus, ProposalVersionItem, ProposalChangeLog } from '../types';

const PROPOSAL_STORAGE_KEY = 'smart_ai_proposals_v1';

export class ProposalDocumentService {
  /**
   * Initializes default proposals if empty
   */
  public static getAllProposals(): Proposal[] {
    try {
      const data = localStorage.getItem(PROPOSAL_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse proposals from storage', e);
    }

    const defaultList = this.generateSampleProposals();
    this.saveProposals(defaultList);
    return defaultList;
  }

  public static getProposalById(id: string): Proposal | undefined {
    const list = this.getAllProposals();
    return list.find((p) => p.id === id || p.proposalNumber === id);
  }

  public static getProposalByPublicToken(token: string): Proposal | undefined {
    const list = this.getAllProposals();
    return list.find((p) => p.publicToken === token);
  }

  public static getProposalsByLeadOrOpp(leadIdOrOppId: string): Proposal[] {
    const list = this.getAllProposals();
    return list.filter((p) => p.leadId === leadIdOrOppId || p.opportunityId === leadIdOrOppId);
  }

  public static saveProposal(proposal: Proposal): Proposal {
    const list = this.getAllProposals();
    const index = list.findIndex((p) => p.id === proposal.id);

    proposal.updatedAt = new Date().toISOString();

    if (index >= 0) {
      list[index] = proposal;
    } else {
      list.unshift(proposal);
    }

    this.saveProposals(list);
    return proposal;
  }

  public static updateProposalStatus(
    id: string,
    status: ProposalStatus,
    author: string = 'Sales Admin',
    extraNotes?: string
  ): Proposal | undefined {
    const proposal = this.getProposalById(id);
    if (!proposal) return undefined;

    const oldStatus = proposal.status;
    proposal.status = status;

    if (status === 'APPROVED') {
      proposal.approvedAt = new Date().toISOString();
      proposal.approvedBy = author;
    } else if (status === 'SENT') {
      proposal.sentAt = new Date().toISOString();
    } else if (status === 'VIEWED') {
      if (!proposal.firstViewedAt) proposal.firstViewedAt = new Date().toISOString();
      proposal.lastViewedAt = new Date().toISOString();
      proposal.viewCount = (proposal.viewCount || 0) + 1;
    } else if (status === 'ACCEPTED') {
      proposal.acceptedAt = new Date().toISOString();
    } else if (status === 'REJECTED') {
      proposal.rejectedAt = new Date().toISOString();
      if (extraNotes) proposal.rejectionReason = extraNotes;
    }

    proposal.changeLogs.push({
      id: `LOG-${Date.now().toString(36)}`,
      section: 'Status Change',
      oldValue: oldStatus,
      newValue: status,
      changedBy: author,
      date: new Date().toISOString()
    });

    return this.saveProposal(proposal);
  }

  /**
   * Creates new version (e.g. v2, v3) if edited after approval or client revision
   */
  public static createNewVersion(
    proposal: Proposal,
    updatedBy: string = 'Sales Admin',
    changeSummary: string = 'Revised proposal scope and commercial terms'
  ): Proposal {
    const currentVerNum = parseInt(proposal.version.replace('v', ''), 10) || 1;
    const nextVer = `v${currentVerNum + 1}`;

    proposal.versions.push({
      version: nextVer,
      status: 'DRAFT',
      author: updatedBy,
      date: new Date().toISOString(),
      summaryOfChanges: changeSummary
    });

    proposal.version = nextVer;
    proposal.status = 'DRAFT';
    proposal.approvedAt = undefined;
    proposal.approvedBy = undefined;

    return this.saveProposal(proposal);
  }

  public static generateProposalNumber(): string {
    const list = this.getAllProposals();
    const year = new Date().getFullYear();
    const count = list.length + 1;
    const padCount = count.toString().padStart(4, '0');
    return `SAI-PROP-${year}-${padCount}`;
  }

  public static generateSecureToken(): string {
    return 'prop_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
  }

  private static saveProposals(list: Proposal[]): void {
    try {
      localStorage.setItem(PROPOSAL_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save proposals', e);
    }
  }

  private static generateSampleProposals(): Proposal[] {
    const sampleDate = new Date().toISOString();
    const validUntilDate = new Date(Date.now() + 30 * 86400000).toISOString();

    return [
      {
        id: 'PROP-001',
        proposalNumber: 'SAI-PROP-2026-0001',
        publicToken: 'prop_sec_98a7s8f7a8s',
        version: 'v1',
        status: 'IN REVIEW',
        leadId: 'SAI-LEAD-001',
        opportunityId: 'OPP-001',
        companyName: 'PT Pertambangan Nusantara',
        contactName: 'Ir. Hendra Gunawan',
        contactPosition: 'VP Information Technology',
        contactEmail: 'hendra.gunawan@pertambangan-nusantara.co.id',
        contactPhone: '+62 812-9876-5432',
        companyAddress: 'Gedung Wisma Pertambangan Lt. 12, Jl. HR Rasuna Said, Jakarta Selatan',
        companyWebsite: 'https://pertambangan-nusantara.co.id',
        title: 'Penawaran Solusi Platform Enterprise Mining System & AI Fleet Telemetry',
        executiveSummary:
          'SMART-AI.ID dengan bangga mengajukan penawaran pengembangan platform Enterprise Mining System terintegrasi. Solusi ini dirancang khusus untuk mengotomatisasi pemantauan 500+ unit armada tambang secara real-time, mendeteksi anomali operasional, dan memberikan dasbor analitik berbasis AI Google Gemini Flash.',
        customerProblem: {
          currentSituation:
            'PT Pertambangan Nusantara saat ini mengelola operasional armada tambang secara manual dengan pemantauan terpisah di 8 cabang lapangan.',
          keyChallenges: [
            'Visibilitas data operasional dan pemantauan BBM armada terlambat hingga 24 jam.',
            'Tingginya potensi kecelakaan akibat kelelahan pengemudi yang tidak terdeteksi secara dini.',
            'Proses kompilasi laporan eksekutif mingguan memakan waktu 3 hari kerja.'
          ],
          businessImpact:
            'Keterlambatan data berdampak pada pemborosan biaya pemeliharaan armada dan risiko downtime operasional senilai ratusan juta rupiah per bulan.'
        },
        projectObjectives: [
          'Sentralisasi visibilitas operasional 500 unit armada secara real-time.',
          'Implementasi AI Predictive Maintenance untuk pencegahan kerusakan dini.',
          'Otomatisasi Laporan Eksekutif dalam hitungan detik.',
          'Integrasi seamless dengan sensor IoT GPS Tracker dan WhatsApp Notification Gateway.'
        ],
        proposedSolution: {
          overview:
            'Platform Enterprise Custom terpadu yang memadukan aplikasi Web Eksekutif, PWA Mobile Lapangan, dan Microservices Cloud Run terakselerasi AI.',
          coreCapabilities: [
            'Real-time Telemetry & Fleet Tracking',
            'Predictive Fuel & Maintenance Analytics',
            'Executive Dashboard & Custom Reporting',
            'Mobile Driver Check-in & Inspections'
          ],
          architectureApproach: 'Cloud-native Microservices dengan Google Cloud Run, Firestore DB, dan Pub/Sub Event Stream.',
          aiCapabilities: ['Google Gemini Flash AI Copilot', 'Anomaly Detection Algorithm', 'Predictive Maintenance Engine'],
          integrationApproach: 'RESTful / gRPC API Gateway untuk GPS Vendor, WhatsApp Business API, dan SAP ERP.'
        },
        features: [
          {
            name: 'Real-time Fleet Tracking',
            description: 'Pemantauan lokasi, status mesin, dan kecepatan armada tambang di peta interaktif.',
            businessValue: 'Meningkatkan transparansi lapangan dan memangkas waktu tanggap insiden hingga 70%.'
          },
          {
            name: 'AI Predictive Maintenance',
            description: 'Deteksi kecenderungan aus komponen berbasis jam kerja mesin dan data telemetri.',
            businessValue: 'Mencegah breakdown mendadak dan menghemat biaya perbaikan darurat.'
          },
          {
            name: 'Executive AI Copilot',
            description: 'Interaksi tanya-jawab bahasa alami untuk analisis kinerja cabang dan proyeksi operasional.',
            businessValue: 'Mempercepat pengambilan keputusan direksi secara instan tanpa menunggu staf.'
          }
        ],
        modules: [
          {
            name: 'Fleet & Telemetry Monitor',
            category: 'Operations',
            description: 'Modul pemantauan pergerakan dan status sensor IoT kendaraan tambang.',
            keyFeatures: ['Live GPS Tracking', 'Geofencing Alert', 'Engine Diagnostic Log'],
            businessValue: 'Visibilitas total 24/7 di seluruh site pertambangan.'
          },
          {
            name: 'Warehouse & Inventory',
            category: 'Core Management',
            description: 'Manajemen stok suku cadang dan konsumsi BBM.',
            keyFeatures: ['Stock In/Out Tracking', 'Reorder Point Warning', 'Fuel Dispense Audit'],
            businessValue: 'Mencegah kebocoran BBM dan kelangkaan sparepart vital.'
          },
          {
            name: 'AI Analytics & Copilot',
            category: 'AI',
            description: 'Engine kecerdasan buatan untuk analisis tren dan rekomendasi tindakan.',
            keyFeatures: ['Natural Language Querying', 'Predictive Fuel Cost', 'Anomaly Alerting'],
            businessValue: 'Keputusan berbasis data berakurasi tinggi.'
          }
        ],
        scope: {
          included: [
            'Desain UI/UX & Prototipe Interaktif',
            'Pengembangan Aplikasi Web Dashboard Eksekutif',
            'Pengembangan Aplikasi Mobile PWA Driver & Field Inspector',
            'Integrasi GPS Telemetry API Gateway & WhatsApp API',
            'Pengujian QA, Hardening Keamanan, & UAT',
            'Deployment ke Google Cloud Infrastructure & Sesi Pelatihan User'
          ],
          excluded: [
            { text: 'Pengadaan perangkat keras/hardware GPS Tracker fisik', isSuggested: false },
            { text: 'Biaya langganan API pihak ketiga (Google Maps, WA Business) yang ditagih terpisah', isSuggested: false },
            { text: 'Pengembangan modul ERP Keuangan Kustom di luar cakupan spesifikasi', isSuggested: true }
          ]
        },
        technologyStack: {
          frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          backend: ['Node.js', 'Express', 'TypeScript ESM'],
          database: ['Cloud Firestore / PostgreSQL'],
          api: ['REST API Gateway', 'WebSockets Realtime'],
          ai: ['Google Gemini 2.5 Flash', 'Google GenAI SDK'],
          cloud: ['Google Cloud Run', 'Google Cloud Storage'],
          monitoring: ['Cloud Logging & Health Checker']
        },
        architectureSummary: 'Microservices berbasis Cloud Run dengan komunikasi event-driven real-time dan AI Copilot terisolasi.',
        aiCapabilities: [
          'Gemini 2.5 Flash Text & Data Analytics',
          'Automated Executive Report Synthesis',
          'Predictive Maintenance Anomaly Scoring'
        ],
        integrations: [
          { name: 'GPS Tracker Vendor Telemetry API', status: 'Confirmed' },
          { name: 'WhatsApp Business API Gateway', status: 'Confirmed' },
          { name: 'Internal SAP ERP Connector', status: 'Proposed Integration' }
        ],
        platforms: ['Web Desktop Admin', 'Mobile PWA Lapangan'],
        estimatedUsers: '500 Active Users',
        estimatedBranches: '8 Cabang Field Site',
        securityFeatures: [
          'Role-Based Access Control (RBAC)',
          'JWT & OAuth 2.0 Client Authentication',
          'Encrypted Data At-Rest & In-Transit (TLS 1.3)',
          'Comprehensive System Audit Logs'
        ],
        developmentMethodology: [
          { step: 'Phase 1: Discovery & Requirements Finalization', description: 'Workshop kualifikasi teknis dan validasi skema data.' },
          { step: 'Phase 2: UI/UX Wireframing & Design System', description: 'Perancangan antarmuka interaktif dan kaji ulang pengguna.' },
          { step: 'Phase 3: Core Engineering & AI Integration', description: 'Iterasi sprint pengembangan modul backend, web, mobile, dan AI.' },
          { step: 'Phase 4: QA, Security Hardening & UAT', description: 'Pengujian integrasi, uji beban, dan persetujuan pengujian lapangan.' },
          { step: 'Phase 5: Production Deployment & Training', description: 'Peluncuran sistem, migrasi data awal, dan pendampingan user.' }
        ],
        timeline: {
          totalMonths: '4 Bulan (16 Minggu)',
          breakdown: [
            { phase: 'Discovery & Design', duration: '3 Minggu', details: 'Requirements, UI/UX, & API Schema' },
            { phase: 'Core Development', duration: '7 Minggu', details: 'Web, Mobile PWA, & Microservices' },
            { phase: 'AI & Integrations', duration: '3 Minggu', details: 'Gemini Copilot & GPS Telemetry Gateway' },
            { phase: 'QA, UAT & Launch', duration: '3 Minggu', details: 'Testing, Hardening, & Deployment' }
          ],
          disclaimer:
            'Timeline merupakan estimasi awal dan dapat berubah berdasarkan finalisasi scope, requirement, dependencies, technical validation, customer feedback, dan project conditions.'
        },
        investment: {
          mode: 'Estimated',
          rangeMin: 350000000,
          rangeMax: 500000000,
          breakdown: [
            { category: 'Software Engineering (Web & Mobile PWA)', cost: 180000000 },
            { category: 'AI Analytics & Gemini Copilot Module', cost: 90000000 },
            { category: 'Integrations (GPS Telemetry & WA Gateway)', cost: 50000000 },
            { category: 'Cloud Infrastructure, QA & Training', cost: 40000000 }
          ]
        },
        support: {
          name: 'Standard Support',
          periodDays: 30,
          responseTime: '2-4 Jam Kerja',
          supportChannel: 'Dedicated WhatsApp Group & Ticket Portal',
          maintenanceScope: 'Perbaikan bug, monitoring kesehatan server Cloud Run, dan pembaruan patch keamanan.',
          updateScope: 'Pembaruan minor dan optimasi performa query.'
        },
        paymentTerms: [
          { milestone: 'Project Initiation (DP)', percentage: 30, description: 'Dibayarkan saat penandatanganan kesepakatan dan kickoff.' },
          { milestone: 'Development Milestone (Beta Build)', percentage: 30, description: 'Dibayarkan setelah demonstrasi modul utama.' },
          { milestone: 'User Acceptance Testing (UAT Pass)', percentage: 30, description: 'Dibayarkan saat penyelesaian pengujian UAT.' },
          { milestone: 'Production Launch & Handover', percentage: 10, description: 'Dibayarkan setelah go-live dan penyerahan dokumentasi.' }
        ],
        warranty: 'Garansi pemeliharaan cacat sistem (warranty period) berlaku selama 30 hari kalender sejak tanggal peluncuran produksi.',
        assumptions: [
          'Requirements berdasarkan data kualifikasi awal.',
          'API vendor GPS Tracker tersedia dan dapat diakses publik dengan dokumentasi memadai.',
          'Biaya pemakaian cloud Google Cloud Platform bervariasi sesuai penggunaan aktual.',
          'Scope final akan dikonfirmasi kembali saat dokumen pengerjaan (SOW) disetujui.'
        ],
        termsAndConditions: [
          {
            title: 'Scope & Alterations',
            content: 'Perubahan di luar lingkup yang telah disetujui akan diproses melalui Change Request Policy dengan penyesuaian biaya dan timeline.'
          },
          {
            title: 'Payment Terms',
            content: 'Pembayaran wajib dilakukan dalam waktu 14 hari kalender setelah faktur diterbitkan oleh SMART-AI.ID.'
          },
          {
            title: 'Confidentiality',
            content: 'Dokumen proposal ini bersifat rahasia dan hanya ditujukan untuk evaluasi internal PT Pertambangan Nusantara.'
          },
          {
            title: 'Intellectual Property',
            content: 'Hak kekayaan intelektual atas kode sumber custom akan diserahkan secara penuh kepada Klien setelah seluruh kewajiban pembayaran lunas.'
          }
        ],
        validUntil: validUntilDate,
        createdAt: sampleDate,
        updatedAt: sampleDate,
        viewCount: 2,
        versions: [
          {
            version: 'v1',
            status: 'IN REVIEW',
            author: 'Solutions Architect Team',
            date: sampleDate,
            summaryOfChanges: 'Draft proposal awal dibuat secara otomatis oleh AI Proposal Generator.'
          }
        ],
        changeLogs: [
          {
            id: 'LOG-001',
            section: 'Initial Generation',
            oldValue: 'None',
            newValue: 'Draft Created',
            changedBy: 'AI System',
            date: sampleDate
          }
        ]
      }
    ];
  }
}
