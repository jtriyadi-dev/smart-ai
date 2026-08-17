import {
  Opportunity,
  OpportunityStage,
  CRMCompany,
  CRMContact,
  CRMNote,
  CRMActivity,
  CRMFollowUp,
  CRMAuditLog,
  CRMRole,
  LeadPriority,
  NoteType,
  ActivityType,
  FollowUpStatus,
  LostReasonOption,
  Lead
} from '../types';
import { LeadService } from './leadService';

const STORAGE_KEY_OPPORTUNITIES = 'smart_ai_crm_opportunities';
const STORAGE_KEY_COMPANIES = 'smart_ai_crm_companies';
const STORAGE_KEY_CONTACTS = 'smart_ai_crm_contacts';
const STORAGE_KEY_AUDIT_LOGS = 'smart_ai_crm_audit_logs';
const STORAGE_KEY_TAGS = 'smart_ai_crm_tags';

export class CRMService {
  /**
   * Initial seed data for immediate out-of-the-box presentation
   */
  public static initializeInitialData(): void {
    if (!localStorage.getItem(STORAGE_KEY_COMPANIES)) {
      const sampleCompanies: CRMCompany[] = [
        {
          id: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          industry: 'Pertambangan & Energi',
          website: 'https://nusantaramining.co.id',
          companySize: '500+ karyawan',
          numberOfEmployees: '1,200',
          branches: '4 Lokasi (Kaltim, Sumsel, Papua, Jakarta)',
          address: 'Gedung Menara Palma Lt. 18, Jl. H.R. Rasuna Said',
          city: 'Jakarta Selatan',
          country: 'Indonesia',
          description: 'Perusahaan tambang batu bara & nikel terintegrasi.',
          source: 'AI Requirement Analyzer',
          status: 'Active',
          assignedOwner: 'Budi Santoso',
          createdAt: '2026-08-01T09:00:00Z',
          updatedAt: '2026-08-10T14:30:00Z'
        },
        {
          id: 'COMP-002',
          companyName: 'RS Medika Sejahtera Utama',
          industry: 'Kesehatan & Rumah Sakit',
          website: 'https://medikasejahtera.com',
          companySize: '250-500 karyawan',
          numberOfEmployees: '350',
          branches: '2 Rumah Sakit (Jakarta, Tangerang)',
          address: 'Jl. Boulevard Bintaro Jaya Sektor 7',
          city: 'Tangerang Selatan',
          country: 'Indonesia',
          description: 'Jaringan rumah sakit swasta tipe B modern.',
          source: 'AI Solution Architect',
          status: 'Prospect',
          assignedOwner: 'Siti Rahma',
          createdAt: '2026-08-03T10:15:00Z',
          updatedAt: '2026-08-11T11:00:00Z'
        },
        {
          id: 'COMP-003',
          companyName: 'PT Bank Fintek Indonesia',
          industry: 'Keuangan & Perbankan',
          website: 'https://bankfintek.co.id',
          companySize: '1000+ karyawan',
          numberOfEmployees: '2,500',
          branches: '25 Kantor Cabang',
          address: 'Financial Club Tower Lt. 25, SCBD',
          city: 'Jakarta Selatan',
          country: 'Indonesia',
          description: 'Lembaga keuangan digital dan layanan mikro perbankan.',
          source: 'AI Project Estimator',
          status: 'Active',
          assignedOwner: 'Rian Pratama',
          createdAt: '2026-08-05T08:30:00Z',
          updatedAt: '2026-08-12T16:20:00Z'
        },
        {
          id: 'COMP-004',
          companyName: 'Logistik Cepat Nusantara',
          industry: 'Logistik & Supply Chain',
          website: 'https://logistikcepat.id',
          companySize: '100-250 karyawan',
          numberOfEmployees: '180',
          branches: '12 Hub Gudang Regional',
          address: 'Kawasan Industri Jababeka Phase III',
          city: 'Cikarang',
          country: 'Indonesia',
          description: 'Penyedia jasa pengiriman kargo dan pergudangan pintar.',
          source: 'Direct Consultation',
          status: 'Prospect',
          assignedOwner: 'Dewi Lestari',
          createdAt: '2026-08-08T13:45:00Z',
          updatedAt: '2026-08-13T09:10:00Z'
        },
        {
          id: 'COMP-005',
          companyName: 'Yayasan Pendidikan Smart Generation',
          industry: 'Pendidikan & EdTech',
          website: 'https://smartgen.edu.id',
          companySize: '50-100 karyawan',
          numberOfEmployees: '85',
          branches: '3 Kampus/Sekolah',
          address: 'Jl. Margonda Raya No. 120',
          city: 'Depok',
          country: 'Indonesia',
          description: 'Institusi pendidikan terpadu dari SD hingga Perguruan Tinggi.',
          source: 'Website Contact Form',
          status: 'Active',
          assignedOwner: 'Budi Santoso',
          createdAt: '2026-08-09T15:20:00Z',
          updatedAt: '2026-08-14T08:00:00Z'
        }
      ];
      localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(sampleCompanies));
    }

    if (!localStorage.getItem(STORAGE_KEY_CONTACTS)) {
      const sampleContacts: CRMContact[] = [
        {
          id: 'CONT-001',
          name: 'Hendra Gunawan',
          position: 'VP of Information Technology',
          email: 'hendra.gunawan@nusantaramining.co.id',
          phone: '+6281298765432',
          whatsapp: '+6281298765432',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          role: 'Decision Maker',
          preferredContactMethod: 'WhatsApp',
          notes: 'Fokus utama pada keamanan data, pemantauan Armada IoT real-time, dan uptime 99.9%.',
          createdAt: '2026-08-01T09:30:00Z',
          updatedAt: '2026-08-10T14:30:00Z'
        },
        {
          id: 'CONT-002',
          name: 'dr. Anita Wijaya, M.Kes',
          position: 'Direktur Operasional & Layanan Medik',
          email: 'anita.wijaya@medikasejahtera.com',
          phone: '+6281388776655',
          whatsapp: '+6281388776655',
          companyId: 'COMP-002',
          companyName: 'RS Medika Sejahtera Utama',
          role: 'Sponsor',
          preferredContactMethod: 'Meeting',
          notes: 'Membutuhkan AI triage dan integrasi SIMRS ICD-10.',
          createdAt: '2026-08-03T10:30:00Z',
          updatedAt: '2026-08-11T11:00:00Z'
        },
        {
          id: 'CONT-003',
          name: 'Bambang Kusuma',
          position: 'Head of Digital Banking & Innovation',
          email: 'bambang.kusuma@bankfintek.co.id',
          phone: '+6281122334455',
          whatsapp: '+6281122334455',
          companyId: 'COMP-003',
          companyName: 'PT Bank Fintek Indonesia',
          role: 'Decision Maker',
          preferredContactMethod: 'Email',
          notes: 'Membutuhkan AI Credit Scoring & Automated Onboarding Document OCR.',
          createdAt: '2026-08-05T09:00:00Z',
          updatedAt: '2026-08-12T16:20:00Z'
        },
        {
          id: 'CONT-004',
          name: 'Agus Setiawan',
          position: 'General Manager Operations',
          email: 'agus.setiawan@logistikcepat.id',
          phone: '+6281766554433',
          whatsapp: '+6281766554433',
          companyId: 'COMP-004',
          companyName: 'Logistik Cepat Nusantara',
          role: 'Technical Evaluator',
          preferredContactMethod: 'WhatsApp',
          notes: 'Tertarik pada AI Route Optimization & Fleet Telematics Engine.',
          createdAt: '2026-08-08T14:00:00Z',
          updatedAt: '2026-08-13T09:10:00Z'
        },
        {
          id: 'CONT-005',
          name: 'Maya Putri, M.Pd',
          position: 'Kepala Bagian Kurikulum & Teknologi',
          email: 'maya.putri@smartgen.edu.id',
          phone: '+6281900112233',
          whatsapp: '+6281900112233',
          companyId: 'COMP-005',
          companyName: 'Yayasan Pendidikan Smart Generation',
          role: 'User',
          preferredContactMethod: 'WhatsApp',
          notes: 'Ingin portal pembelajaran adaptif AI untuk evaluasi siswa otomatis.',
          createdAt: '2026-08-09T15:40:00Z',
          updatedAt: '2026-08-14T08:00:00Z'
        }
      ];
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(sampleContacts));
    }

    if (!localStorage.getItem(STORAGE_KEY_OPPORTUNITIES)) {
      const sampleOpps: Opportunity[] = [
        {
          id: 'OPP-2026-001',
          leadId: 'SAI-2026-MINE01',
          companyId: 'COMP-001',
          contactId: 'CONT-001',
          companyName: 'PT Nusantara Mining Energy',
          contactName: 'Hendra Gunawan',
          contactEmail: 'hendra.gunawan@nusantaramining.co.id',
          contactPhone: '+6281298765432',
          name: 'Mining Fleet IoT & Predictive AI Maintenance Platform',
          description: 'Sistem manajemen armada tambang terintegrasi IoT telemetri dengan modul AI pemantauan kesehatan mesin batubara & prediksi breakdown.',
          industry: 'Pertambangan & Energi',
          stage: 'NEGOTIATION',
          estimatedValueMin: 450000000,
          estimatedValueMax: 650000000,
          currency: 'IDR',
          probability: 80,
          weightedValue: 440000000,
          leadScore: 92,
          priority: 'Urgent',
          owner: 'Budi Santoso',
          technicalConsultant: 'Dr. Irfan AI Specialist',
          projectManager: 'Eko Prasetyo',
          source: 'AI Requirement Analyzer',
          expectedCloseDate: '2026-08-30',
          createdAt: '2026-08-01T09:30:00Z',
          updatedAt: '2026-08-14T08:30:00Z',
          lastActivityAt: '2026-08-14T08:30:00Z',
          nextFollowUpDate: '2026-08-15',
          proposalId: 'PROP-2026-088',
          proposalStatus: 'Sent',
          proposalDate: '2026-08-10',
          tags: ['Hot Lead', 'Enterprise', 'AI', 'Mining', 'High Value']
        },
        {
          id: 'OPP-2026-002',
          leadId: 'SAI-2026-MED02',
          companyId: 'COMP-002',
          contactId: 'CONT-002',
          companyName: 'RS Medika Sejahtera Utama',
          contactName: 'dr. Anita Wijaya, M.Kes',
          contactEmail: 'anita.wijaya@medikasejahtera.com',
          contactPhone: '+6281388776655',
          name: 'AI Triage & Smart Electronic Medical Record (EMR)',
          description: 'Aplikasi antrean pintar, AI diagnosa awal dokter umum, dan otomatisasi klaim BPJS & Asuransi swasta.',
          industry: 'Kesehatan & Rumah Sakit',
          stage: 'PROPOSAL',
          estimatedValueMin: 320000000,
          estimatedValueMax: 480000000,
          currency: 'IDR',
          probability: 60,
          weightedValue: 240000000,
          leadScore: 88,
          priority: 'High',
          owner: 'Siti Rahma',
          technicalConsultant: 'Deni Tech Specialist',
          source: 'AI Solution Architect',
          expectedCloseDate: '2026-09-15',
          createdAt: '2026-08-03T10:45:00Z',
          updatedAt: '2026-08-13T16:00:00Z',
          lastActivityAt: '2026-08-13T16:00:00Z',
          nextFollowUpDate: '2026-08-16',
          proposalId: 'PROP-2026-092',
          proposalStatus: 'Sent',
          proposalDate: '2026-08-12',
          tags: ['Hospital', 'AI', 'High Value']
        },
        {
          id: 'OPP-2026-003',
          leadId: 'SAI-2026-BANK03',
          companyId: 'COMP-003',
          contactId: 'CONT-003',
          companyName: 'PT Bank Fintek Indonesia',
          contactName: 'Bambang Kusuma',
          contactEmail: 'bambang.kusuma@bankfintek.co.id',
          contactPhone: '+6281122334455',
          name: 'AI Credit Scoring & e-KYC Automated Onboarding',
          description: 'Modul AI analisa kelayakan kredit UMKM berdasarkan histori transaksi mikro & OCR dokumen identitas otomatis.',
          industry: 'Keuangan & Perbankan',
          stage: 'QUALIFIED',
          estimatedValueMin: 500000000,
          estimatedValueMax: 750000000,
          currency: 'IDR',
          probability: 40,
          weightedValue: 250000000,
          leadScore: 95,
          priority: 'Urgent',
          owner: 'Rian Pratama',
          technicalConsultant: 'Dr. Irfan AI Specialist',
          source: 'AI Project Estimator',
          expectedCloseDate: '2026-09-30',
          createdAt: '2026-08-05T09:15:00Z',
          updatedAt: '2026-08-12T14:20:00Z',
          lastActivityAt: '2026-08-12T14:20:00Z',
          nextFollowUpDate: '2026-08-17',
          tags: ['Enterprise', 'AI', 'High Value']
        },
        {
          id: 'OPP-2026-004',
          leadId: 'SAI-2026-LOG04',
          companyId: 'COMP-004',
          contactId: 'CONT-004',
          companyName: 'Logistik Cepat Nusantara',
          contactName: 'Agus Setiawan',
          contactEmail: 'agus.setiawan@logistikcepat.id',
          contactPhone: '+6281766554433',
          name: 'Smart Route & Warehouse AI Dispatcher',
          description: 'Aplikasi optimasi rute pengiriman kargo instan untuk menekan konsumsi bahan bakar hingga 18%.',
          industry: 'Logistik & Supply Chain',
          stage: 'CONTACTED',
          estimatedValueMin: 180000000,
          estimatedValueMax: 250000000,
          currency: 'IDR',
          probability: 20,
          weightedValue: 430000000,
          leadScore: 78,
          priority: 'Medium',
          owner: 'Dewi Lestari',
          source: 'Direct Consultation',
          expectedCloseDate: '2026-10-10',
          createdAt: '2026-08-08T14:15:00Z',
          updatedAt: '2026-08-10T10:00:00Z',
          lastActivityAt: '2026-08-10T10:00:00Z',
          nextFollowUpDate: '2026-08-14',
          tags: ['AI', 'MVP']
        },
        {
          id: 'OPP-2026-005',
          leadId: 'SAI-2026-EDU05',
          companyId: 'COMP-005',
          contactId: 'CONT-005',
          companyName: 'Yayasan Pendidikan Smart Generation',
          contactName: 'Maya Putri, M.Pd',
          contactEmail: 'maya.putri@smartgen.edu.id',
          contactPhone: '+6281900112233',
          name: 'Adaptive Learning Portal & AI Homework Grading',
          description: 'Platform edtech kustom dengan kecerdasan buatan untuk rekomendasi materi belajar siswa secara personal.',
          industry: 'Pendidikan & EdTech',
          stage: 'NEW',
          estimatedValueMin: 120000000,
          estimatedValueMax: 180000000,
          currency: 'IDR',
          probability: 10,
          weightedValue: 15000000,
          leadScore: 65,
          priority: 'Medium',
          owner: 'Budi Santoso',
          source: 'Website Contact Form',
          expectedCloseDate: '2026-10-30',
          createdAt: '2026-08-09T16:00:00Z',
          updatedAt: '2026-08-09T16:00:00Z',
          lastActivityAt: '2026-08-09T16:00:00Z',
          nextFollowUpDate: '2026-08-15',
          tags: ['School', 'MVP']
        },
        {
          id: 'OPP-2026-006',
          companyName: 'PT Retail Modern Indonesia',
          contactName: 'Rudi Hartono',
          contactEmail: 'rudi.h@retailmodern.co.id',
          contactPhone: '+6281233445566',
          name: 'Omnichannel POS & AI Demand Forecasting',
          description: 'Sistem ritel terintegrasi dengan rekomendasi inventori otomatis berbasis histori penjualan musim.',
          industry: 'Ritel & E-Commerce',
          stage: 'WON',
          estimatedValueMin: 280000000,
          estimatedValueMax: 350000000,
          currency: 'IDR',
          probability: 100,
          weightedValue: 310000000,
          finalDealValue: 310000000,
          winningReason: 'Solusi AI arsitektur terbukti efisien & timeline pengadaan cepat.',
          projectReference: 'PROJ-2026-RETAIL',
          leadScore: 90,
          priority: 'High',
          owner: 'Rian Pratama',
          source: 'AI Requirement Analyzer',
          createdAt: '2026-07-15T09:00:00Z',
          updatedAt: '2026-08-05T11:20:00Z',
          lastActivityAt: '2026-08-05T11:20:00Z',
          wonAt: '2026-08-05T11:20:00Z',
          tags: ['Enterprise', 'Existing Customer']
        }
      ];
      localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(sampleOpps));
    }

    if (!localStorage.getItem(STORAGE_KEY_TAGS)) {
      const defaultTags = [
        'Hot Lead',
        'Enterprise',
        'AI',
        'Mining',
        'Hospital',
        'School',
        'Urgent',
        'High Value',
        'MVP',
        'Existing Customer'
      ];
      localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(defaultTags));
    }
  }

  // ==========================================
  // OPPORTUNITIES CRUD
  // ==========================================

  public static getOpportunities(): Opportunity[] {
    this.initializeInitialData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY_OPPORTUNITIES);
      if (!raw) return [];
      const opps: Opportunity[] = JSON.parse(raw);
      return opps.filter((o) => !o.deletedAt);
    } catch {
      return [];
    }
  }

  public static getOpportunity(id: string): Opportunity | undefined {
    const opps = this.getOpportunities();
    return opps.find((o) => o.id === id);
  }

  public static createOpportunity(data: Partial<Opportunity>): Opportunity {
    this.initializeInitialData();
    const opps = this.getOpportunities();

    const minVal = data.estimatedValueMin || 100000000;
    const maxVal = data.estimatedValueMax || 200000000;
    const avgVal = (minVal + maxVal) / 2;
    const stage = data.stage || 'NEW';
    const prob = this.getStageProbability(stage);

    const newOpp: Opportunity = {
      id: `OPP-2026-${Math.floor(100 + Math.random() * 900)}`,
      companyName: data.companyName || 'Perusahaan Prospek',
      contactName: data.contactName || 'Kontak Utama',
      contactEmail: data.contactEmail || '',
      contactPhone: data.contactPhone || '',
      name: data.name || 'Proyek AI Kustom',
      description: data.description || 'Proyek pengembangan aplikasi kustom SMART-AI.ID.',
      industry: data.industry || 'Umum',
      stage,
      estimatedValueMin: minVal,
      estimatedValueMax: maxVal,
      currency: data.currency || 'IDR',
      probability: prob,
      weightedValue: (avgVal * prob) / 100,
      leadScore: data.leadScore || 70,
      priority: data.priority || 'Medium',
      owner: data.owner || 'Budi Santoso',
      technicalConsultant: data.technicalConsultant,
      projectManager: data.projectManager,
      source: data.source || 'Website Contact Form',
      expectedCloseDate: data.expectedCloseDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      tags: data.tags || ['Hot Lead']
    };

    opps.unshift(newOpp);
    localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(opps));
    this.logAudit('Admin', 'Create', 'Opportunity', newOpp.id, `Created opportunity ${newOpp.name}`);
    return newOpp;
  }

  public static updateOpportunity(id: string, updates: Partial<Opportunity>): Opportunity {
    const opps = this.getOpportunities();
    const index = opps.findIndex((o) => o.id === id);
    if (index === -1) throw new Error('Opportunity not found');

    const current = opps[index];
    const stage = updates.stage || current.stage;
    const prob = updates.probability !== undefined ? updates.probability : this.getStageProbability(stage);
    const minVal = updates.estimatedValueMin !== undefined ? updates.estimatedValueMin : current.estimatedValueMin;
    const maxVal = updates.estimatedValueMax !== undefined ? updates.estimatedValueMax : current.estimatedValueMax;
    const avgVal = (minVal + maxVal) / 2;

    const updated: Opportunity = {
      ...current,
      ...updates,
      stage,
      probability: prob,
      estimatedValueMin: minVal,
      estimatedValueMax: maxVal,
      weightedValue: Math.round((avgVal * prob) / 100),
      updatedAt: new Date().toISOString()
    };

    opps[index] = updated;
    localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(opps));
    this.logAudit('Admin', 'Update', 'Opportunity', id, `Updated opportunity ${updated.name}`);
    return updated;
  }

  public static deleteOpportunity(id: string, user = 'Admin'): boolean {
    const opps = this.getOpportunities();
    const opp = opps.find((o) => o.id === id);
    if (!opp) return false;

    opp.deletedAt = new Date().toISOString();
    opp.deletedBy = user;
    localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(opps));
    this.logAudit(user, 'Delete', 'Opportunity', id, `Soft deleted opportunity ${opp.name}`);
    return true;
  }

  public static getStageProbability(stage: OpportunityStage): number {
    switch (stage) {
      case 'NEW': return 10;
      case 'CONTACTED': return 20;
      case 'QUALIFIED': return 40;
      case 'PROPOSAL': return 60;
      case 'NEGOTIATION': return 80;
      case 'WON': return 100;
      case 'LOST': return 0;
      default: return 10;
    }
  }

  // ==========================================
  // COMPANIES CRUD
  // ==========================================

  public static getCompanies(): CRMCompany[] {
    this.initializeInitialData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY_COMPANIES);
      if (!raw) return [];
      const companies: CRMCompany[] = JSON.parse(raw);
      return companies.filter((c) => !c.deletedAt);
    } catch {
      return [];
    }
  }

  public static getCompany(id: string): CRMCompany | undefined {
    return this.getCompanies().find((c) => c.id === id);
  }

  public static createCompany(data: Partial<CRMCompany>): CRMCompany {
    this.initializeInitialData();
    const companies = this.getCompanies();

    const newCompany: CRMCompany = {
      id: `COMP-${Math.floor(100 + Math.random() * 900)}`,
      companyName: data.companyName || 'Perusahaan Baru',
      industry: data.industry || 'Teknologi',
      website: data.website || '',
      companySize: data.companySize || '50-100 karyawan',
      numberOfEmployees: data.numberOfEmployees || '50',
      branches: data.branches || '1 Lokasi',
      address: data.address || '',
      city: data.city || 'Jakarta',
      country: data.country || 'Indonesia',
      description: data.description || '',
      source: data.source || 'Direct Contact',
      status: data.status || 'Prospect',
      assignedOwner: data.assignedOwner || 'Budi Santoso',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    companies.unshift(newCompany);
    localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(companies));
    this.logAudit('Admin', 'Create', 'Company', newCompany.id, `Created company ${newCompany.companyName}`);
    return newCompany;
  }

  public static updateCompany(id: string, updates: Partial<CRMCompany>): CRMCompany {
    const companies = this.getCompanies();
    const index = companies.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Company not found');

    const updated: CRMCompany = {
      ...companies[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    companies[index] = updated;
    localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(companies));
    this.logAudit('Admin', 'Update', 'Company', id, `Updated company ${updated.companyName}`);
    return updated;
  }

  public static deleteCompany(id: string, user = 'Admin'): boolean {
    const companies = this.getCompanies();
    const comp = companies.find((c) => c.id === id);
    if (!comp) return false;

    comp.deletedAt = new Date().toISOString();
    comp.deletedBy = user;
    localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(companies));
    this.logAudit(user, 'Delete', 'Company', id, `Soft deleted company ${comp.companyName}`);
    return true;
  }

  // ==========================================
  // CONTACTS CRUD
  // ==========================================

  public static getContacts(): CRMContact[] {
    this.initializeInitialData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONTACTS);
      if (!raw) return [];
      const contacts: CRMContact[] = JSON.parse(raw);
      return contacts.filter((c) => !c.deletedAt);
    } catch {
      return [];
    }
  }

  public static getContact(id: string): CRMContact | undefined {
    return this.getContacts().find((c) => c.id === id);
  }

  public static createContact(data: Partial<CRMContact>): CRMContact {
    this.initializeInitialData();
    const contacts = this.getContacts();

    const newContact: CRMContact = {
      id: `CONT-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name || 'Kontak Baru',
      position: data.position || 'Manager',
      email: data.email || '',
      phone: data.phone || '',
      whatsapp: data.whatsapp || data.phone || '',
      companyId: data.companyId,
      companyName: data.companyName || 'Umum',
      role: data.role || 'Decision Maker',
      preferredContactMethod: data.preferredContactMethod || 'WhatsApp',
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    contacts.unshift(newContact);
    localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(contacts));
    this.logAudit('Admin', 'Create', 'Contact', newContact.id, `Created contact ${newContact.name}`);
    return newContact;
  }

  public static updateContact(id: string, updates: Partial<CRMContact>): CRMContact {
    const contacts = this.getContacts();
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Contact not found');

    const updated: CRMContact = {
      ...contacts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    contacts[index] = updated;
    localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(contacts));
    this.logAudit('Admin', 'Update', 'Contact', id, `Updated contact ${updated.name}`);
    return updated;
  }

  public static deleteContact(id: string, user = 'Admin'): boolean {
    const contacts = this.getContacts();
    const cont = contacts.find((c) => c.id === id);
    if (!cont) return false;

    cont.deletedAt = new Date().toISOString();
    cont.deletedBy = user;
    localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(contacts));
    this.logAudit(user, 'Delete', 'Contact', id, `Soft deleted contact ${cont.name}`);
    return true;
  }

  // ==========================================
  // CONVERT LEAD TO OPPORTUNITY
  // ==========================================

  public static convertLeadToOpportunity(leadId: string, customTitle?: string): Opportunity {
    const lead = LeadService.getLeadById(leadId);
    if (!lead) throw new Error('Lead not found');

    // 1. Ensure Company exists or create
    let companyObj = this.getCompanies().find((c) => c.companyName.toLowerCase() === lead.company.toLowerCase());
    if (!companyObj) {
      companyObj = this.createCompany({
        companyName: lead.company,
        industry: lead.industry || 'Teknologi',
        companySize: lead.companySize || '50-100 karyawan',
        source: lead.source,
        status: 'Prospect'
      });
    }

    // 2. Ensure Contact exists or create
    let contactObj = this.getContacts().find((c) => c.email.toLowerCase() === lead.email.toLowerCase());
    if (!contactObj) {
      contactObj = this.createContact({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        whatsapp: lead.whatsapp,
        companyId: companyObj.id,
        companyName: companyObj.companyName,
        position: 'Penanggung Jawab Proyek',
        preferredContactMethod: 'WhatsApp'
      });
    }

    // 3. Create Opportunity
    const title = customTitle || lead.estimateSummary?.title || `${lead.service || 'Solusi AI'} - ${lead.company}`;
    const opp = this.createOpportunity({
      leadId: lead.id,
      companyId: companyObj.id,
      contactId: contactObj.id,
      companyName: companyObj.companyName,
      contactName: contactObj.name,
      contactEmail: contactObj.email,
      contactPhone: contactObj.whatsapp || contactObj.phone,
      name: title,
      description: lead.message || lead.applicationDetails?.businessProblem || 'Proyek konversi dari Lead SMART-AI.ID.',
      industry: lead.industry || 'Umum',
      stage: 'QUALIFIED',
      estimatedValueMin: 150000000,
      estimatedValueMax: 300000000,
      leadScore: lead.score?.totalScore || 80,
      priority: lead.priority || 'High',
      owner: lead.assignedTo || 'Budi Santoso',
      source: lead.source,
      tags: ['Hot Lead', 'AI']
    });

    // Update lead status
    LeadService.updateLeadStatus(leadId, 'Qualified', 'Converted to CRM Opportunity');

    return opp;
  }

  // ==========================================
  // AUDIT LOG
  // ==========================================

  public static getAuditLogs(): CRMAuditLog[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_AUDIT_LOGS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static logAudit(
    user: string,
    action: CRMAuditLog['action'],
    entity: CRMAuditLog['entity'],
    entityId: string,
    details?: string
  ): void {
    const logs = this.getAuditLogs();
    const newLog: CRMAuditLog = {
      id: `AUD-${Date.now().toString(36)}`,
      user,
      action,
      entity,
      entityId,
      timestamp: new Date().toISOString(),
      details
    };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_KEY_AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
  }

  // ==========================================
  // TAGS
  // ==========================================

  public static getTags(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TAGS);
      if (!raw) return ['Hot Lead', 'Enterprise', 'AI', 'Mining', 'Hospital', 'School', 'Urgent', 'High Value', 'MVP', 'Existing Customer'];
      return JSON.parse(raw);
    } catch {
      return ['Hot Lead', 'Enterprise', 'AI'];
    }
  }

  public static addTag(newTag: string): string[] {
    const tags = this.getTags();
    if (!tags.includes(newTag)) {
      tags.push(newTag);
      localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(tags));
    }
    return tags;
  }
}
