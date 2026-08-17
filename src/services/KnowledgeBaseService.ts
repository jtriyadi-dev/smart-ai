import {
  KnowledgeArticle,
  KnowledgeCategory,
  KnowledgeMainCategory,
  KnowledgeStatus,
  KnowledgeVisibility,
  UnansweredQuestion,
  PricingRule,
  CompanyInfo,
  KnowledgeAuditLog
} from '../types';
import { GoogleGenAI } from '@google/genai';

const KB_ARTICLES_KEY = 'smart_ai_knowledge_articles';
const KB_UNANSWERED_KEY = 'smart_ai_unanswered_questions';
const KB_COMPANY_INFO_KEY = 'smart_ai_company_info';
const KB_PRICING_RULES_KEY = 'smart_ai_pricing_rules';
const KB_AUDIT_LOG_KEY = 'smart_ai_knowledge_audit_logs';

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: 'PT SMART AI INDONESIA',
  brandName: 'SMART-AI.ID',
  website: 'https://www.smart-ai.id',
  email: 'info@smart-ai.id',
  phone: '+62 812-3456-7890',
  whatsapp: '+62 812-3456-7890',
  address: 'Enterprise Tech Center, Jakarta & Bandung, Indonesia',
  description: 'SMART-AI.ID adalah penyedia solusi IT Enterprise, Pengembangan Aplikasi Custom, dan Integrasi Artificial Intelligence (AI) terkemuka di Indonesia.',
  mission: 'Mentransformasi bisnis tradisional Indonesia menjadi cerdas, efisien, dan berbasis data melalui solusi perangkat lunak AI terintegrasi.',
  vision: 'Menjadi mitra pengembang software & AI enterprise nomor 1 di Asia Tenggara.',
  coreValues: ['Client Success First', 'Zero Technical Debt', 'AI-Driven Innovation', 'Enterprise Security'],
  history: 'Didirikan oleh tim Solution Architects dan AI Engineers senior untuk memberikan alternatif kustomisasi tinggi dibanding software kaku off-the-shelf.',
  businessFocus: ['Custom Web & Mobile Apps', 'Mining Fleet Management', 'SIMRS & Healthcare Tech', 'AI Analytics & Copilot', 'IoT & Telematics']
};

const DEFAULT_PRICING_RULES: PricingRule[] = [
  {
    id: 'PR-01',
    name: 'Multi-Module Complexity Factor',
    description: 'Menambahkan bobot estimasi jika sistem membutuhkan > 5 modul terintegrasi',
    condition: 'modulesCount > 5',
    multiplier: 1.25,
    calculationType: 'MULTIPLIER',
    priority: 1,
    active: true
  },
  {
    id: 'PR-02',
    name: 'Enterprise High User Volume Tier',
    description: 'Menambahkan alokasi infrastructure & load balancing untuk > 500 active users',
    condition: 'userScale > 500',
    multiplier: 1.3,
    calculationType: 'MULTIPLIER',
    priority: 2,
    active: true
  },
  {
    id: 'PR-03',
    name: 'Realtime Hardware/IoT Protocol Integration',
    description: 'Integrasi hardware GPS, jembatan timbang, atau sensor PLC/SCADA',
    condition: 'hasHardwareIoT === true',
    multiplier: 15000000,
    calculationType: 'FLAT_ADDITION',
    priority: 3,
    active: true
  }
];

const DEFAULT_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'KB-001',
    title: 'Aplikasi Manajemen Tambang & Operasional Pertambangan Custom',
    slug: 'aplikasi-manajemen-tambang-custom',
    category: 'Industries',
    summary: 'Solusi perangkat lunak custom terintegrasi untuk bisnis pertambangan batubara, nikel, dan mineral di Indonesia.',
    content: `
SMART-AI.ID menyediakan pengembangan aplikasi custom manajemen pertambangan berbasis AI untuk mengoptimalkan efisiensi operasional hulu ke hilir.

Modul Utama yang Dapat Dibuat:
• Production Tracking (Ritase, Tonase, Hauling, Pit to Stockpile)
• Fleet Management System (Sewa Alat Berat, Jam Kerja/HM, Maintenance Schedule)
• GPS & Telematics Tracking Realtime
• Fuel Management System (Konsumsi BBM, Dispensasi, Monitoring Storage)
• Heavy Equipment Maintenance & Sparepart Inventory
• Warehouse & Logistics Management
• HR, Payroll & HSE Safety Compliance
• Financial Accounting & Billing Integration
• AI Analytics & Operational Bottleneck Prediction

Setiap aplikasi dapat dihubungkan dengan Sensor IoT, GPS Tracker, Scale Bridge (Jembatan Timbang) otomatis, dan Dashboard Analytics Executive.
    `,
    tags: ['tambang', 'mining', 'fleet management', 'gps', 'operasional', 'produksi', 'alat berat'],
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    priority: 1,
    version: 1,
    views: 342,
    helpfulCount: 48,
    unhelpfulCount: 1,
    authorName: 'SMART-AI Solution Architect',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'KB-002',
    title: 'Estimasi Biaya & Struktur Harga Pengembang Aplikasi SMART-AI.ID',
    slug: 'estimasi-biaya-dan-struktur-harga',
    category: 'Pricing Guidance',
    summary: 'Panduan transparansi penentuan biaya investasi pengembangan sistem aplikasi enterprise berbasis AI.',
    content: `
Biaya pengembangan aplikasi di SMART-AI.ID dihitung berdasarkan konfigurasi teknis dan kebutuhan riil perusahaan Anda, bukan paket rigid standar.

Faktor Utama yang Memengaruhi Biaya & Estimasi:
1. Jumlah & Kompleksitas Modul (e.g. 3 modul vs 15 modul terintegrasi)
2. Jumlah Pengguna (User Tiers: 50 user, 500 user, atau Unlimited Enterprise)
3. Fitur AI & Machine Learning (e.g. OCR Dokumen, Computer Vision, Predictor, Chatbot RAG)
4. Integrasi Hardware/API (GPS, SAP, Core Banking, Payment Gateway, Sensor IoT)
5. Multi-Branch & Multi-Tenant Architecture
6. Persyaratan Keamanan (Role-Based Access Control, Custom Encryption, Audit Logs)

Setiap estimasi yang diberikan oleh AI Estimator atau Chatbot merupakan ESTIMASI AWAL non-binding. Penawaran harga resmi (Quotation/Proposal) diterbitkan setelah proses Requirement Analysis menyeluruh oleh Tim Solution Architect SMART-AI.ID.
    `,
    tags: ['harga', 'biaya', 'estimasi', 'pricing', 'proposal', 'quotation', 'investasi'],
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    priority: 2,
    version: 1,
    views: 520,
    helpfulCount: 89,
    unhelpfulCount: 2,
    authorName: 'SMART-AI Finance & Sales',
    createdAt: '2026-01-05T08:00:00Z',
    updatedAt: '2026-02-10T09:00:00Z'
  },
  {
    id: 'KB-003',
    title: 'Integrasi GPS Tracking & Perangkat Telematika Kendaraan',
    slug: 'integrasi-gps-tracking-telematika',
    category: 'Integration',
    summary: 'Panduan integrasi hardware GPS, protokol API telematika, dan tracking realtime kendaraan operasional.',
    content: `
SMART-AI.ID mendukung integrasi beragam hardware GPS dan perangkat IoT telematika untuk manajemen armada dan aset bergerak.

Kemampuan Integrasi GPS:
• Protocol & API: Webhook HTTP REST, TCP/UDP Direct Socket Listener, MQTT, Meitrack, Teltonika, Concox, CalAmp, Ruptela
• Realtime Tracking Map (OpenStreetMap & Google Maps Platform API)
• Geofencing & Alerting (Overspeed, Geofence In/Out, Engine On/Off, Idling Time)
• Driver Behavior Analysis (Sudden Braking, Rapid Acceleration)
• Telemetry Data (Sensor Bahan Bakar, Sensor Suhu Engine, Odometer)

Penggunaan Umum:
- Fleet Tracking Logistik & Ekspedisi
- Fleet & Heavy Equipment Manajemen Pertambangan
- Asset & Container Tracking Pelabuhan
- Employee/Field Force Tracking Realtime
    `,
    tags: ['gps', 'tracking', 'telematics', 'fleet', 'integrasi', 'maps', 'iot'],
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    priority: 1,
    version: 1,
    views: 289,
    helpfulCount: 37,
    unhelpfulCount: 0,
    authorName: 'SMART-AI Lead IoT Engineer',
    createdAt: '2026-01-12T08:00:00Z',
    updatedAt: '2026-02-05T11:00:00Z'
  },
  {
    id: 'KB-004',
    title: 'Kapabilitas Integrasi Fitur AI & Machine Learning Enterprise',
    slug: 'kapabilitas-integrasi-ai-machine-learning',
    category: 'AI Capabilities',
    summary: 'Daftar kapabilitas AI yang dapat diintegrasikan ke dalam sistem aplikasi bisnis custom SMART-AI.ID.',
    content: `
SMART-AI.ID mengintegrasikan teknologi Artificial Intelligence (AI) terdepan untuk mentransformasi operasional bisnis tradisional menjadi cerdas.

Fitur AI yang Tersedia:
1. AI Analytics & Predictive Maintenance: Prediksi kerusakan mesin/alat berat sebelum terjadi down-time.
2. AI OCR & Document Intelligence: Ekstraksi otomatis invoice, KTP, Surat Jalan, dan Dokumen Logistik.
3. AI Forecasting & Production Analytics: Estimasi hasil panen sawit, produksi tambang, dan proyeksi penjualan.
4. Computer Vision & Automated Quality Control: Deteksi cacat produksi via kamera & visual inspection.
5. AI Smart Recommendation Engine: Rekomendasi stok warehouse, alokasi driver, dan penawaran CRM.
6. AI Anomaly & Fraud Detection: Identifikasi transaksi finansial yang mencurigakan secara realtime.
7. RAG AI Chatbot & Customer Support Assistant: Asisten virtual internal atau publik berbasis Knowledge Base perusahaan.
8. Executive AI Natural Language Reporting: Tanya jawab laporan dalam Bahasa Indonesia (contoh: "Berapa total hauling hari ini?").
    `,
    tags: ['ai', 'artificial intelligence', 'machine learning', 'ocr', 'computer vision', 'predictive', 'chatbot'],
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    priority: 1,
    version: 1,
    views: 610,
    helpfulCount: 112,
    unhelpfulCount: 3,
    authorName: 'SMART-AI Chief AI Officer',
    createdAt: '2026-01-02T08:00:00Z',
    updatedAt: '2026-02-12T14:00:00Z'
  },
  {
    id: 'KB-005',
    title: 'Sistem Informasi Rumah Sakit & Klinik (SIMRS) Custom',
    slug: 'sistem-informasi-rumah-sakit-simrs-custom',
    category: 'Industries',
    summary: 'Aplikasi manajemen pelayanan kesehatan, rekam medis elektronik (RME/EMR), dan integrasi SATUSEHAT BPJS.',
    content: `
SMART-AI.ID membangun Sistem Informasi Manajemen Rumah Sakit (SIMRS) modern dan aplikasi Klinik terpadu.

Modul Pelayanan Kesehatan:
• Pendaftaran Pasien & Antrean Online berbasis AI
• Rekam Medis Elektronik (RME / EMR) sesuai standar Kemenkes
• Integrasi Portal SATUSEHAT Kemenkes & BPJS VClaim / Antrean Online
• Poliklinik, Rawat Jalan, Rawat Inap, & IGD Management
• Farmasi, E-Resep & Gudang Obat
• Laboratorium (LIS) & Radiologi (RIS/PACS)
• Billing, Casemix, BPJS Claiming, & Keuangan RS
• AI Medical Assistant untuk bantu dokter menelaah riwayat rekam medis pasien
    `,
    tags: ['rumah sakit', 'simrs', 'klinik', 'rme', 'rekam medis', 'satusehat', 'bpjs', 'kesehatan'],
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    priority: 2,
    version: 1,
    views: 412,
    helpfulCount: 65,
    unhelpfulCount: 1,
    authorName: 'SMART-AI Healthtech Lead',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-02-08T12:00:00Z'
  },
  {
    id: 'KB-006',
    title: 'Proses Pengembangan Aplikasi Custom di SMART-AI.ID',
    slug: 'proses-pengembangan-aplikasi-custom',
    category: 'Process',
    summary: 'Metodologi kerja Agile Software Development 4-Tahap di SMART-AI.ID.',
    content: `
Proses kerja SMART-AI.ID dirancang cepat, transparan, dan terukur menggunakan AI-Assisted Agile Methodology.

4 Tahapan Utama Pengembangan:
1. Discovery & Requirement Analysis (AI Requirement Analyzer & Solution Architect merumuskan SRS & Blueprint Arsitektur).
2. UI/UX Design & Prototype (Prototyping interaktif & desain sistem sesuai standar Dark/Light Luxury UI/UX).
3. Sprint Development & Iteration (Coding modular, AI Integration, Microservices/Serverless, & CI/CD Automated Testing).
4. Deployment, Training & Support (UAT, Cloud Deployment, Handover Source Code, Dokumentasi & Guarantee SLA Support).
    `,
    tags: ['proses', 'metodologi', 'agile', 'tahapan', 'pengembangan', 'sdlc', 'garansi'],
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    priority: 3,
    version: 1,
    views: 198,
    helpfulCount: 29,
    unhelpfulCount: 0,
    authorName: 'SMART-AI Project Manager',
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-02-14T08:00:00Z'
  },
  {
    id: 'KB-007',
    title: 'Kebijakan SLA Service Support, Maintenance & Garansi Aplikasi',
    slug: 'kebijakan-sla-support-maintenance',
    category: 'Support',
    summary: 'Komitmen waktu respon helpdesk, garansi bug-free, dan pemeliharaan sistem pasca-launching.',
    content: `
SMART-AI.ID memberikan jaminan garansi purna-jual dan layanan helpdesk ticketing profesional.

Komitmen SLA Target Time:
• Priority Urgent (Sistem Down / Critical Security): Response < 1 Jam, Resolution < 8 Jam.
• Priority High (Fitur Utama Terganggu): Response < 4 Jam, Resolution < 24 Jam.
• Priority Medium (Kendala Minor): Response < 12 Jam, Resolution < 48 Jam.
• Priority Low (Pertanyaan / Request Modifikasi): Response < 24 Jam, Resolution < 72 Jam.

Seluruh tiket support ditangani secara terstruktur via Helpdesk Portal, WhatsApp Notification, dan Dedicated Support Engineer.
    `,
    tags: ['support', 'sla', 'garansi', 'maintenance', 'helpdesk', 'tiket', 'bug'],
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    priority: 1,
    version: 1,
    views: 310,
    helpfulCount: 52,
    unhelpfulCount: 1,
    authorName: 'SMART-AI Support Director',
    createdAt: '2026-01-22T08:00:00Z',
    updatedAt: '2026-02-14T10:00:00Z'
  }
];

export class KnowledgeBaseService {
  private static getStoredArticles(): KnowledgeArticle[] {
    try {
      const data = localStorage.getItem(KB_ARTICLES_KEY);
      if (!data) {
        localStorage.setItem(KB_ARTICLES_KEY, JSON.stringify(DEFAULT_ARTICLES));
        return DEFAULT_ARTICLES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_ARTICLES;
    }
  }

  private static saveArticles(articles: KnowledgeArticle[]): void {
    localStorage.setItem(KB_ARTICLES_KEY, JSON.stringify(articles));
  }

  public static getArticles(
    visibility: KnowledgeVisibility | 'ALL' = 'ALL',
    category: KnowledgeCategory | 'ALL' = 'ALL',
    searchQuery: string = ''
  ): KnowledgeArticle[] {
    let list = this.getStoredArticles();

    if (visibility !== 'ALL') {
      if (visibility === 'PUBLIC') {
        list = list.filter((a) => a.visibility === 'PUBLIC');
      } else if (visibility === 'CUSTOMER') {
        list = list.filter((a) => a.visibility === 'PUBLIC' || a.visibility === 'CUSTOMER');
      } else {
        list = list.filter((a) => a.visibility === visibility);
      }
    }

    if (category !== 'ALL') {
      list = list.filter((a) => a.category === category);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  /**
   * Search Articles specifically for RAG Grounding in Chatbot
   */
  public static searchKnowledgeBase(query: string, maxResults: number = 3, userRole: 'GUEST' | 'CUSTOMER' | 'ADMIN' = 'GUEST'): KnowledgeArticle[] {
    const all = this.getStoredArticles().filter((a) => a.status === 'PUBLISHED');

    const allowed = all.filter((a) => {
      if (userRole === 'ADMIN') return true;
      if (userRole === 'CUSTOMER') return a.visibility === 'PUBLIC' || a.visibility === 'CUSTOMER';
      return a.visibility === 'PUBLIC';
    });

    const qWords = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    if (qWords.length === 0) return allowed.slice(0, maxResults);

    const scored = allowed.map((article) => {
      let score = 0;
      const titleLower = article.title.toLowerCase();
      const summaryLower = article.summary.toLowerCase();
      const contentLower = article.content.toLowerCase();
      const tagsLower = article.tags.map((t) => t.toLowerCase());

      qWords.forEach((word) => {
        if (titleLower.includes(word)) score += 10;
        if (tagsLower.some((t) => t.includes(word))) score += 7;
        if (summaryLower.includes(word)) score += 4;
        if (contentLower.includes(word)) score += 2;
      });

      return { article, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // Filter articles with score > 0, fallback to highest if query matched nothing
    const matched = scored.filter((s) => s.score > 0).map((s) => s.article);
    if (matched.length > 0) return matched.slice(0, maxResults);

    return [];
  }

  public static getArticleById(id: string): KnowledgeArticle | null {
    const list = this.getStoredArticles();
    return list.find((a) => a.id === id) || null;
  }

  public static createArticle(article: Omit<KnowledgeArticle, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'helpfulCount' | 'unhelpfulCount'>): KnowledgeArticle {
    const list = this.getStoredArticles();
    const newId = `KB-${String(list.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const newArticle: KnowledgeArticle = {
      ...article,
      id: newId,
      slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      views: 0,
      helpfulCount: 0,
      unhelpfulCount: 0,
      version: 1,
      versions: [
        {
          version: 1,
          content: article.content,
          summary: article.summary,
          updatedAt: now,
          updatedBy: article.authorName || 'Admin'
        }
      ],
      createdAt: now,
      updatedAt: now
    };

    list.unshift(newArticle);
    this.saveArticles(list);
    return newArticle;
  }

  public static updateArticle(id: string, updates: Partial<KnowledgeArticle>, updatedByName: string = 'Admin'): KnowledgeArticle | null {
    const list = this.getStoredArticles();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const current = list[index];
    const now = new Date().toISOString();
    const nextVersion = (current.version || 1) + 1;

    const updatedVersions = [
      ...(current.versions || []),
      {
        version: nextVersion,
        content: updates.content || current.content,
        summary: updates.summary || current.summary,
        updatedAt: now,
        updatedBy: updatedByName
      }
    ];

    const updated: KnowledgeArticle = {
      ...current,
      ...updates,
      version: nextVersion,
      versions: updatedVersions,
      updatedAt: now
    };

    list[index] = updated;
    this.saveArticles(list);
    return updated;
  }

  public static deleteArticle(id: string): boolean {
    const list = this.getStoredArticles();
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length === list.length) return false;
    this.saveArticles(filtered);
    return true;
  }

  // --- Unanswered Questions Gap Tracking ---

  public static getUnansweredQuestions(): UnansweredQuestion[] {
    try {
      const data = localStorage.getItem(KB_UNANSWERED_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static addUnansweredQuestion(question: string, intent: string, sessionTitle?: string): UnansweredQuestion {
    const list = this.getUnansweredQuestions();
    const newQuestion: UnansweredQuestion = {
      id: `GAP-${Date.now()}`,
      question,
      intent,
      sessionTitle,
      createdAt: new Date().toISOString(),
      status: 'OPEN'
    };
    list.unshift(newQuestion);
    localStorage.setItem(KB_UNANSWERED_KEY, JSON.stringify(list));
    return newQuestion;
  }

  public static resolveUnansweredQuestion(id: string, convertedArticleId?: string): void {
    const list = this.getUnansweredQuestions();
    const updated = list.map((q) => {
      if (q.id === id) {
        return { ...q, status: 'RESOLVED' as const, convertedArticleId };
      }
      return q;
    });
    localStorage.setItem(KB_UNANSWERED_KEY, JSON.stringify(updated));
  }

  // --- Company Info Management ---
  public static getCompanyInfo(): CompanyInfo {
    try {
      const data = localStorage.getItem(KB_COMPANY_INFO_KEY);
      return data ? JSON.parse(data) : DEFAULT_COMPANY_INFO;
    } catch {
      return DEFAULT_COMPANY_INFO;
    }
  }

  public static saveCompanyInfo(info: CompanyInfo): void {
    localStorage.setItem(KB_COMPANY_INFO_KEY, JSON.stringify(info));
  }

  // --- Pricing Rules Engine Management ---
  public static getPricingRules(): PricingRule[] {
    try {
      const data = localStorage.getItem(KB_PRICING_RULES_KEY);
      return data ? JSON.parse(data) : DEFAULT_PRICING_RULES;
    } catch {
      return DEFAULT_PRICING_RULES;
    }
  }

  public static savePricingRule(rule: PricingRule): void {
    const list = this.getPricingRules();
    const idx = list.findIndex((r) => r.id === rule.id);
    if (idx !== -1) {
      list[idx] = rule;
    } else {
      list.push(rule);
    }
    localStorage.setItem(KB_PRICING_RULES_KEY, JSON.stringify(list));
  }

  // --- Version Rollback ---
  public static rollbackVersion(articleId: string, targetVersion: number, user: string = 'Admin'): KnowledgeArticle | null {
    const list = this.getStoredArticles();
    const index = list.findIndex((a) => a.id === articleId);
    if (index === -1) return null;

    const current = list[index];
    const versionObj = current.versions?.find((v) => v.version === targetVersion);
    if (!versionObj) return null;

    const now = new Date().toISOString();
    const nextVersion = (current.version || 1) + 1;

    const updated: KnowledgeArticle = {
      ...current,
      content: versionObj.content,
      summary: versionObj.summary,
      version: nextVersion,
      versions: [
        ...(current.versions || []),
        {
          version: nextVersion,
          content: versionObj.content,
          summary: versionObj.summary,
          updatedAt: now,
          updatedBy: `Rollback to v${targetVersion} by ${user}`
        }
      ],
      updatedAt: now
    };

    list[index] = updated;
    this.saveArticles(list);
    this.logAuditAction(articleId, current.title, 'ROLLBACK', nextVersion, user);
    return updated;
  }

  // --- Duplicate Article Detection ---
  public static detectDuplicates(title: string): KnowledgeArticle[] {
    const titleWords = title.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    if (titleWords.length === 0) return [];

    return this.getStoredArticles().filter((article) => {
      const artTitle = article.title.toLowerCase();
      const matchCount = titleWords.filter((w) => artTitle.includes(w)).length;
      return matchCount >= 2 || artTitle.includes(title.toLowerCase());
    });
  }

  // --- Audit Trail Logging ---
  public static getAuditLogs(): KnowledgeAuditLog[] {
    try {
      const data = localStorage.getItem(KB_AUDIT_LOG_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static logAuditAction(
    articleId: string,
    articleTitle: string,
    action: KnowledgeAuditLog['action'],
    version: number,
    user: string
  ): void {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: `LOG-${Date.now()}`,
      articleId,
      articleTitle,
      action,
      version,
      user,
      timestamp: new Date().toLocaleString('id-ID')
    });
    localStorage.setItem(KB_AUDIT_LOG_KEY, JSON.stringify(logs.slice(0, 50)));
  }

  // --- RAG Grounded Context Generator for Chatbot & AI Assistants ---
  public static retrieveRAGContext(query: string, userRole: 'GUEST' | 'CUSTOMER' | 'ADMIN' = 'GUEST'): {
    contextText: string;
    sources: { id: string; title: string }[];
  } {
    const matched = this.searchKnowledgeBase(query, 3, userRole);
    if (matched.length === 0) {
      const company = this.getCompanyInfo();
      return {
        contextText: `INFO PERUSAHAAN: ${company.brandName} (${company.name})\nWebsite: ${company.website}\nEmail: ${company.email}\nDeskripsi: ${company.description}`,
        sources: [{ id: 'COMPANY-INFO', title: `${company.brandName} Company Knowledge` }]
      };
    }

    const contextText = matched
      .map(
        (m, idx) => `[DOKUMEN ${idx + 1}: ${m.title} (${m.category})]\nRingkasan: ${m.summary}\nIsi: ${m.content.trim()}`
      )
      .join('\n\n---\n\n');

    const sources = matched.map((m) => ({ id: m.id, title: m.title }));

    return { contextText, sources };
  }

  // --- AI Article Generator ---

  public static async generateArticleDraftWithAI(topic: string, category: KnowledgeCategory): Promise<{ title: string; summary: string; content: string; tags: string[] }> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        title: `Panduan ${topic}`,
        summary: `Artikel panduan pengetahuan mengenai ${topic} untuk solusi SMART-AI.ID.`,
        content: `### ${topic}\n\nPenjelasan lengkap mengenai ${topic} dalam ekosistem solusi SMART-AI.ID.\n\n#### Fitur Utama:\n- Modul kustomisasi tinggi\n- Integrasi API & IoT\n- Dukungan AI Analytics\n\nUntuk informasi lebih lanjut, hubungi Tim SMART-AI.ID.`,
        tags: [topic.toLowerCase(), 'smart-ai', category.toLowerCase()]
      };
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
Anda adalah AI Knowledge Specialist SMART-AI.ID.
Buatlah artikel pengetahuan resmi (Knowledge Article) Bahasa Indonesia yang berkualitas tinggi mengenai topik: "${topic}" dalam kategori: "${category}".

Output dalam format JSON murni tanpa markdown wrapper:
{
  "title": "Judul Artikel yang Menarik dan Profesional",
  "summary": "Ringkasan 2 kalimat artikel",
  "content": "Isi lengkap artikel dalam Markdown dengan sub-heading, bullet points, dan rincian fitur/solusi",
  "tags": ["tag1", "tag2", "tag3"]
}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        title: parsed.title || `Panduan ${topic}`,
        summary: parsed.summary || `Ringkasan materi ${topic}.`,
        content: parsed.content || `Isi materi ${topic}.`,
        tags: Array.isArray(parsed.tags) ? parsed.tags : [topic.toLowerCase(), 'smart-ai']
      };
    } catch (e) {
      return {
        title: `Panduan ${topic}`,
        summary: `Panduan dan informasi mengenai ${topic}.`,
        content: `### ${topic}\n\nPenjelasan lengkap mengenai ${topic} dalam ekosistem solusi SMART-AI.ID.\n\n- Fitur kustomisasi tinggi\n- Integrasi AI & Dashboard Realtime`,
        tags: [topic.toLowerCase(), 'smart-ai']
      };
    }
  }
}
