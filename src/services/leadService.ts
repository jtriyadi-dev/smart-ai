import {
  Lead,
  LeadStatus,
  LeadPriority,
  LeadSource,
  LeadActivity,
  LeadNote,
  LeadScore,
  LeadScoreFactor,
  LeadFilterOptions
} from '../types';
import { LeadNotificationService } from './leadNotificationService';

const STORAGE_KEY_LEADS = 'smart_ai_leads_collection';
const STORAGE_KEY_ACTIVE_LEAD = 'smart_ai_current_lead_session';

export class LeadService {
  /**
   * Calculate objective, non-biased Lead Score (0 - 100)
   * Factors are strictly based on business interaction, engagement, and provided project scope.
   */
  public static calculateLeadScore(leadData: Partial<Lead>): LeadScore {
    const factors: LeadScoreFactor[] = [];

    // 1. AI Tool Engagement Depth (Max 55 points)
    let aiToolPoints = 0;
    if (leadData.estimateId) {
      aiToolPoints += 20;
      factors.push({
        factorName: 'AI Project Estimator Completed',
        scoreContribution: 20,
        maxScore: 20,
        reason: 'Pengguna telah melakukan kalkulasi estimasi investasi & roadmap secara lengkap.'
      });
    }

    if (leadData.architectureId) {
      aiToolPoints += 15;
      factors.push({
        factorName: 'AI Solution Architecture Generated',
        scoreContribution: 15,
        maxScore: 15,
        reason: 'Pengguna telah merancang blueprint arsitektur sistem.'
      });
    }

    if (leadData.requirementId) {
      aiToolPoints += 12;
      factors.push({
        factorName: 'AI Requirement Analyzer Completed',
        scoreContribution: 12,
        maxScore: 12,
        reason: 'Pengguna telah melakukan analisis dokumen requirement.'
      });
    }

    if (leadData.moduleConfigurationId) {
      aiToolPoints += 8;
      factors.push({
        factorName: 'AI Module Generator Completed',
        scoreContribution: 8,
        maxScore: 8,
        reason: 'Pengguna telah mengonfigurasi modul-modul aplikasi.'
      });
    }

    // 2. High Intent Service / Consultation Request (Max 25 points)
    if (leadData.service === 'Consulting' || leadData.source === 'Direct Consultation') {
      factors.push({
        factorName: 'Direct Consultation Request',
        scoreContribution: 25,
        maxScore: 25,
        reason: 'Niat tinggi untuk melakukan sesi diskusi konsultasi secara langsung.'
      });
    } else if (leadData.applicationDetails) {
      factors.push({
        factorName: 'Detailed Application Request Provided',
        scoreContribution: 20,
        maxScore: 20,
        reason: 'Formulasi masalah bisnis dan daftar fitur aplikasi disampaikan secara terstruktur.'
      });
    } else {
      factors.push({
        factorName: 'Standard Inquiry Form',
        scoreContribution: 10,
        maxScore: 10,
        reason: 'Pengisian form kontak umum.'
      });
    }

    // 3. Contact & Business Completeness (Max 20 points)
    let completenessPoints = 0;
    if (leadData.company && leadData.company !== '-') completenessPoints += 10;
    if (leadData.whatsapp || leadData.phone) completenessPoints += 10;

    factors.push({
      factorName: 'Business & Contact Information Completeness',
      scoreContribution: completenessPoints,
      maxScore: 20,
      reason: 'Kelengkapan profil perusahaan dan kontak WhatsApp/telepon yang valid.'
    });

    const totalScore = factors.reduce((sum, f) => sum + f.scoreContribution, 0);

    let level: 'Cold' | 'Warm' | 'Hot' = 'Warm';
    if (totalScore >= 65) level = 'Hot';
    else if (totalScore < 35) level = 'Cold';

    return {
      totalScore,
      level,
      factors,
      explanation: `AI-generated lead score: Lead berkategori ${level} dengan skor total ${totalScore}/100 berdasarkan kedalaman interaksi AI tools dan kelengkapan kebutuhan proyek.`
    };
  }

  /**
   * Determine Lead Priority based on complexity and score
   */
  public static calculatePriority(scoreTotal: number, leadData: Partial<Lead>): LeadPriority {
    if (scoreTotal >= 75 || leadData.source === 'AI Project Estimator') return 'High';
    if (scoreTotal >= 50) return 'Medium';
    return 'Low';
  }

  /**
   * Create a new Lead
   */
  public static async createLead(rawInput: Partial<Lead>): Promise<Lead> {
    const timestamp = new Date().toISOString();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const referenceCode = `SAI-2026-${randomNum}`;

    const score = this.calculateLeadScore(rawInput);
    const priority = rawInput.priority || this.calculatePriority(score.totalScore, rawInput);

    // Initial Lead Activity
    const initialActivity: LeadActivity = {
      id: `ACT-${Date.now()}-1`,
      leadId: '',
      type: rawInput.source === 'AI Project Estimator'
        ? 'estimate_generated'
        : rawInput.source === 'AI Application Builder'
        ? 'ai_builder_completed'
        : 'contact_form_submitted',
      title: `Lead Diterima via ${rawInput.source || 'Website'}`,
      description: `Formulir dikirim oleh ${rawInput.name || 'Pengunjung'} (${rawInput.email || ''}). Ref: ${referenceCode}`,
      timestamp
    };

    const newLead: Lead = {
      id: `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      referenceCode,
      name: rawInput.name || 'Anonymous Prospect',
      company: rawInput.company || 'Perusahaan Prospect',
      email: rawInput.email || '',
      phone: rawInput.phone || rawInput.whatsapp || '',
      whatsapp: rawInput.whatsapp || rawInput.phone || '',
      industry: rawInput.industry || 'General Industry',
      companySize: rawInput.companySize || '10-50 Karyawan',
      service: rawInput.service || 'Custom Web Application',
      projectType: rawInput.projectType || 'AI Software Development',
      message: rawInput.message || '',
      source: rawInput.source || 'Website Contact Form',
      campaign: rawInput.campaign || 'Organic',
      landingPage: rawInput.landingPage || window.location.pathname,
      referrer: rawInput.referrer || document.referrer || 'Direct',
      utmSource: rawInput.utmSource,
      utmMedium: rawInput.utmMedium,
      utmCampaign: rawInput.utmCampaign,
      utmContent: rawInput.utmContent,
      status: 'New',
      priority,
      score,
      assignedTo: 'Sales Engineering Team',
      assignedRole: 'Technical Consultant',
      estimateId: rawInput.estimateId,
      estimateSummary: rawInput.estimateSummary,
      requirementId: rawInput.requirementId,
      architectureId: rawInput.architectureId,
      moduleConfigurationId: rawInput.moduleConfigurationId,
      applicationDetails: rawInput.applicationDetails,
      consultationDetails: rawInput.consultationDetails,
      activities: [initialActivity],
      notes: [],
      consent: rawInput.consent || {
        contactConsent: true,
        marketingConsent: false,
        consentTimestamp: timestamp
      },
      createdAt: timestamp,
      updatedAt: timestamp,
      lastActivityAt: timestamp
    };

    initialActivity.leadId = newLead.id;

    // Check for possible duplicate lead (same email or whatsapp)
    const existingLeads = this.getLeadsLocal();
    const duplicateMatch = existingLeads.find(
      (l) => (l.email && l.email.toLowerCase() === newLead.email.toLowerCase()) ||
             (l.whatsapp && l.whatsapp === newLead.whatsapp)
    );

    if (duplicateMatch) {
      newLead.possibleDuplicateOf = duplicateMatch.id;
    }

    // Save locally
    const updatedCollection = [newLead, ...existingLeads];
    this.saveLeadsLocal(updatedCollection);
    this.setSessionLead(newLead);

    // Try posting to Express API backend if connected
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
    } catch (e) {
      console.warn('Backend /api/leads endpoint call failed, lead persisted in local engine:', e);
    }

    // Trigger Notification Service
    LeadNotificationService.notifyNewLead(newLead);

    return newLead;
  }

  /**
   * Get lead by ID
   */
  public static getLeadById(leadId: string): Lead | undefined {
    return this.getLeadsLocal().find((l) => l.id === leadId);
  }

  /**
   * Get all leads locally
   */
  public static getLeadsLocal(): Lead[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading leads local collection', e);
    }
    return this.getMockInitialLeads();
  }

  /**
   * Save leads collection locally
   */
  public static saveLeadsLocal(leads: Lead[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    } catch (e) {
      console.warn('Failed saving leads local collection', e);
    }
  }

  /**
   * Set active lead session
   */
  public static setSessionLead(lead: Lead): void {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_LEAD, JSON.stringify(lead));
    } catch (e) {
      console.warn('Failed setting active lead session', e);
    }
  }

  /**
   * Get current session lead
   */
  public static getSessionLead(): Lead | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_LEAD);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading active lead session', e);
    }
    return null;
  }

  /**
   * Filter and search leads
   */
  public static filterLeads(leads: Lead[], filters: LeadFilterOptions): Lead[] {
    return leads.filter((l) => {
      if (filters.status && filters.status !== 'all' && l.status !== filters.status) return false;
      if (filters.source && filters.source !== 'all' && l.source !== filters.source) return false;
      if (filters.priority && filters.priority !== 'all' && l.priority !== filters.priority) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = l.name.toLowerCase().includes(q);
        const matchComp = l.company.toLowerCase().includes(q);
        const matchEmail = l.email.toLowerCase().includes(q);
        const matchRef = l.referenceCode.toLowerCase().includes(q);
        if (!matchName && !matchComp && !matchEmail && !matchRef) return false;
      }
      return true;
    });
  }

  /**
   * Update lead status & log activity
   */
  public static updateLeadStatus(leadId: string, newStatus: LeadStatus, reason?: string): Lead | null {
    const leads = this.getLeadsLocal();
    const idx = leads.findIndex((l) => l.id === leadId);
    if (idx === -1) return null;

    const timestamp = new Date().toISOString();
    const oldStatus = leads[idx].status;
    leads[idx].status = newStatus;
    leads[idx].updatedAt = timestamp;
    leads[idx].lastActivityAt = timestamp;

    if (newStatus === 'Won') {
      leads[idx].convertedAt = timestamp;
    } else if (newStatus === 'Lost') {
      leads[idx].lostReason = reason || 'No specific reason provided';
    }

    const activity: LeadActivity = {
      id: `ACT-${Date.now()}`,
      leadId,
      type: 'status_changed',
      title: `Status Diubah: ${oldStatus} ➔ ${newStatus}`,
      description: reason ? `Catatan Alasan: ${reason}` : `Status prospek diperbarui menjadi ${newStatus}.`,
      timestamp,
      actor: 'Admin Manager'
    };

    leads[idx].activities = [activity, ...leads[idx].activities];
    this.saveLeadsLocal(leads);
    return leads[idx];
  }

  /**
   * Add internal note to lead
   */
  public static addLeadNote(leadId: string, content: string, author: string = 'Admin'): LeadNote | null {
    const leads = this.getLeadsLocal();
    const idx = leads.findIndex((l) => l.id === leadId);
    if (idx === -1) return null;

    const timestamp = new Date().toISOString();
    const newNote: LeadNote = {
      id: `NOTE-${Date.now()}`,
      leadId,
      author,
      content,
      timestamp,
      isInternal: true
    };

    leads[idx].notes = [newNote, ...(leads[idx].notes || [])];
    leads[idx].lastActivityAt = timestamp;
    this.saveLeadsLocal(leads);
    return newNote;
  }

  /**
   * Assign lead to representative
   */
  public static assignLead(leadId: string, assignedTo: string, role: string): Lead | null {
    const leads = this.getLeadsLocal();
    const idx = leads.findIndex((l) => l.id === leadId);
    if (idx === -1) return null;

    const timestamp = new Date().toISOString();
    leads[idx].assignedTo = assignedTo;
    leads[idx].assignedRole = role;
    leads[idx].updatedAt = timestamp;

    const activity: LeadActivity = {
      id: `ACT-${Date.now()}`,
      leadId,
      type: 'assigned',
      title: `Lead Ditugaskan ke ${assignedTo}`,
      description: `Penugasan penanganan prospek kepada ${assignedTo} (${role}).`,
      timestamp,
      actor: 'System Admin'
    };

    leads[idx].activities = [activity, ...leads[idx].activities];
    this.saveLeadsLocal(leads);
    return leads[idx];
  }

  /**
   * Dashboard Summary Statistics
   */
  public static getLeadStats(leads: Lead[]) {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const qualified = leads.filter((l) => l.status === 'Qualified').length;
    const consultations = leads.filter((l) => l.status === 'Consultation Scheduled').length;
    const won = leads.filter((l) => l.status === 'Won').length;
    const lost = leads.filter((l) => l.status === 'Lost').length;

    return {
      total,
      newLeads,
      qualified,
      consultations,
      won,
      lost,
      winRatePercentage: total > 0 ? Math.round((won / total) * 100) : 0
    };
  }

  /**
   * Pre-populated mock initial leads for clean dashboard demo
   */
  private static getMockInitialLeads(): Lead[] {
    return [
      {
        id: 'LEAD-MOCK-001',
        referenceCode: 'SAI-2026-88129',
        name: 'Budi Santoso',
        company: 'PT Logistik Nusantara Utama',
        email: 'budi.santoso@logistiknusantara.co.id',
        phone: '081298765432',
        whatsapp: '081298765432',
        industry: 'Logistics & Supply Chain',
        companySize: '100-500 Karyawan',
        service: 'AI Application',
        projectType: 'Fleet & Warehouse AI Operations',
        message: 'Tertarik mengembangkan sistem manajemen armada terintegrasi AI dengan live GPS tracking.',
        source: 'AI Project Estimator',
        status: 'Consultation Scheduled',
        priority: 'High',
        score: {
          totalScore: 88,
          level: 'Hot',
          factors: [
            { factorName: 'AI Estimator Completed', scoreContribution: 20, maxScore: 20, reason: 'Pengguna telah menyelesaikan kalkulasi estimasi.' },
            { factorName: 'Architecture Blueprint', scoreContribution: 15, maxScore: 15, reason: 'Mempunyai blueprint arsitektur terdefinisi.' }
          ],
          explanation: 'AI-generated lead score: Hot Prospect dengan estimasi anggaran Business Tier dan roadmap 3-5 Bulan.'
        },
        assignedTo: 'Andi Wijaya, S.T.',
        assignedRole: 'Senior Solutions Architect',
        estimateSummary: {
          title: 'Fleet & Warehouse Management Platform',
          complexity: '68/100 (High)',
          timeline: '3 - 5 Bulan',
          investment: 'Rp 280.000.000 - Rp 420.000.000'
        },
        activities: [
          {
            id: 'ACT-M01',
            leadId: 'LEAD-MOCK-001',
            type: 'consultation_requested',
            title: 'Sesi Konsultasi Diterwalkan',
            description: 'Jadwal diskusi via Zoom untuk penelaahan proposal teknis.',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
          }
        ],
        notes: [
          {
            id: 'NOTE-M01',
            leadId: 'LEAD-MOCK-001',
            author: 'Andi Wijaya',
            content: 'Klien menginginkan integrasi API dengan sistem SAP lama.',
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
            isInternal: true
          }
        ],
        consent: { contactConsent: true, marketingConsent: true, consentTimestamp: new Date().toISOString() },
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        lastActivityAt: new Date(Date.now() - 3600000 * 12).toISOString()
      },
      {
        id: 'LEAD-MOCK-002',
        referenceCode: 'SAI-2026-44310',
        name: 'Siti Rahmawati',
        company: 'Klinik Sehat Medika',
        email: 'siti.rahma@sehatmedika.com',
        phone: '081311223344',
        whatsapp: '081311223344',
        industry: 'Healthcare',
        companySize: '50-100 Karyawan',
        service: 'Custom Web Application',
        message: 'Ingin membuat sistem rekam medis elektronik & sistem antrian pasien online.',
        source: 'Website Contact Form',
        status: 'New',
        priority: 'Medium',
        score: {
          totalScore: 45,
          level: 'Warm',
          factors: [
            { factorName: 'Standard Inquiry Form', scoreContribution: 10, maxScore: 10, reason: 'Pengisian form kontak umum.' }
          ],
          explanation: 'AI-generated lead score: Warm Prospect yang memerlukan kualifikasi kebutuhan lebih rinci.'
        },
        assignedTo: 'Sales Engineering Team',
        assignedRole: 'Technical Consultant',
        activities: [],
        notes: [],
        consent: { contactConsent: true, marketingConsent: false, consentTimestamp: new Date().toISOString() },
        createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
        lastActivityAt: new Date(Date.now() - 3600000 * 10).toISOString()
      }
    ];
  }
}
