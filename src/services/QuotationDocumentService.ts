import {
  Quotation,
  QuotationStatus,
  QuotationApproval,
  QuotationAuditLog,
  QuotationVersionItem,
  QuotationItem,
  Proposal
} from '../types';
import { QuotationPricingService } from './QuotationPricingService';
import { QuotationAIReviewService } from './QuotationAIReviewService';
import { ActivityService } from './activityService';

const QUOTATION_STORAGE_KEY = 'smart_ai_quotations_v1';

export class QuotationDocumentService {
  public static getAllQuotations(): Quotation[] {
    try {
      const data = localStorage.getItem(QUOTATION_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse quotations from storage', e);
    }

    const defaultList = this.generateSampleQuotations();
    this.saveQuotations(defaultList);
    return defaultList;
  }

  public static getQuotationById(id: string): Quotation | undefined {
    const list = this.getAllQuotations();
    return list.find((q) => q.id === id || q.quotationNumber === id);
  }

  public static getQuotationBySecureToken(token: string): Quotation | undefined {
    const list = this.getAllQuotations();
    return list.find((q) => q.secureToken === token);
  }

  public static getQuotationsByLeadOrOpp(leadOrOppId: string): Quotation[] {
    const list = this.getAllQuotations();
    return list.filter((q) => q.leadId === leadOrOppId || q.companyId === leadOrOppId);
  }

  public static saveQuotation(quotation: Quotation, actor: string = 'User'): Quotation {
    const list = this.getAllQuotations();
    const index = list.findIndex((q) => q.id === quotation.id);

    // Recalculate totals centrally
    const subtotal = QuotationPricingService.calculateSubtotal(quotation.items);
    const discountAmount = QuotationPricingService.calculateDiscount(
      subtotal,
      quotation.discountType,
      quotation.discountValue
    );
    const { taxAmount, taxableAmount } = QuotationPricingService.calculateTax(
      subtotal,
      discountAmount,
      quotation.taxRate,
      quotation.taxIncluded
    );
    const grandTotal = QuotationPricingService.calculateGrandTotal(taxableAmount, taxAmount, quotation.taxIncluded);
    const recurring = QuotationPricingService.calculateRecurringCost(quotation.items);
    const milestones = QuotationPricingService.calculatePaymentMilestones(grandTotal, quotation.paymentMilestones);

    quotation.subtotal = subtotal;
    quotation.discountAmount = discountAmount;
    quotation.taxableAmount = taxableAmount;
    quotation.taxAmount = taxAmount;
    quotation.grandTotal = grandTotal;
    quotation.recurringMonthly = recurring.monthly;
    quotation.recurringAnnual = recurring.annual;
    quotation.paymentMilestones = milestones;
    quotation.updatedAt = new Date().toISOString();

    // Run AI review update
    quotation.aiReview = QuotationAIReviewService.reviewQuotation(quotation);

    if (index >= 0) {
      // Audit log
      quotation.auditLogs = [
        ...(quotation.auditLogs || []),
        {
          id: `LOG-${Date.now()}`,
          quotationId: quotation.id,
          action: 'Quotation Saved',
          changedBy: actor,
          details: `Diperbarui dengan total nilai: Rp ${grandTotal.toLocaleString('id-ID')}`,
          timestamp: new Date().toISOString()
        }
      ];
      list[index] = quotation;
    } else {
      quotation.auditLogs = [
        {
          id: `LOG-${Date.now()}`,
          quotationId: quotation.id,
          action: 'Quotation Created',
          changedBy: actor,
          details: `Dokumen penawaran resmi baru dibuat (${quotation.quotationNumber})`,
          timestamp: new Date().toISOString()
        }
      ];
      list.unshift(quotation);
    }

    this.saveQuotations(list);
    return quotation;
  }

  public static createNewVersion(id: string, summaryOfChanges: string = 'Revisi Penawaran', author: string = 'Sales Rep'): Quotation | undefined {
    const original = this.getQuotationById(id);
    if (!original) return undefined;

    const list = this.getAllQuotations();
    const currVerNum = parseInt(original.version.replace('v', ''), 10) || 1;
    const newVer = `v${currVerNum + 1}`;

    const newQuotation: Quotation = {
      ...JSON.parse(JSON.stringify(original)),
      version: newVer,
      status: 'DRAFT',
      approvedBy: undefined,
      updatedAt: new Date().toISOString(),
      auditLogs: [
        ...(original.auditLogs || []),
        {
          id: `LOG-${Date.now()}`,
          quotationId: original.id,
          action: 'New Version Created',
          changedBy: author,
          details: `Dibuat versi baru ${newVer}: ${summaryOfChanges}`,
          timestamp: new Date().toISOString()
        }
      ],
      versionHistory: [
        ...(original.versionHistory || []),
        {
          version: newVer,
          status: 'DRAFT',
          author,
          date: new Date().toISOString(),
          summaryOfChanges
        }
      ]
    };

    const idx = list.findIndex((q) => q.id === id);
    if (idx >= 0) {
      list[idx] = newQuotation;
      this.saveQuotations(list);
    }

    return newQuotation;
  }

  public static duplicateQuotation(id: string, author: string = 'User'): Quotation | undefined {
    const source = this.getQuotationById(id);
    if (!source) return undefined;

    const newId = `QTN-${Date.now()}`;
    const newNumber = this.generateQuotationNumber();
    const newToken = this.generateSecureToken();

    const duplicated: Quotation = {
      ...JSON.parse(JSON.stringify(source)),
      id: newId,
      quotationNumber: newNumber,
      secureToken: newToken,
      version: 'v1',
      status: 'DRAFT',
      viewCount: 0,
      firstViewedAt: undefined,
      lastViewedAt: undefined,
      customerResponse: undefined,
      approvalHistory: [],
      createdBy: author,
      approvedBy: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditLogs: [
        {
          id: `LOG-${Date.now()}`,
          quotationId: newId,
          action: 'Quotation Duplicated',
          changedBy: author,
          details: `Diduplikasi dari penawaran ${source.quotationNumber}`,
          timestamp: new Date().toISOString()
        }
      ],
      versionHistory: [
        {
          version: 'v1',
          status: 'DRAFT',
          author,
          date: new Date().toISOString(),
          summaryOfChanges: `Duplikasi dari ${source.quotationNumber}`
        }
      ]
    };

    this.saveQuotation(duplicated, author);
    return duplicated;
  }

  public static submitForApproval(id: string, actor: string = 'Sales Rep'): Quotation | undefined {
    const q = this.getQuotationById(id);
    if (!q) return undefined;

    q.status = 'IN REVIEW';
    q.auditLogs.push({
      id: `LOG-${Date.now()}`,
      quotationId: q.id,
      action: 'Submitted For Approval',
      changedBy: actor,
      details: 'Diajukan untuk review manajerial & approval komersial.',
      timestamp: new Date().toISOString()
    });

    return this.saveQuotation(q, actor);
  }

  public static approveQuotation(id: string, approverName: string, role: string, comment: string): Quotation | undefined {
    const q = this.getQuotationById(id);
    if (!q) return undefined;

    q.status = 'APPROVED';
    q.approvedBy = `${approverName} (${role})`;

    q.approvalHistory.unshift({
      id: `APP-${Date.now()}`,
      quotationId: q.id,
      approverId: 'USER-ADMIN',
      approverName,
      role,
      status: 'APPROVED',
      comment: comment || 'Penawaran disetujui secara komersial.',
      createdAt: new Date().toISOString()
    });

    q.auditLogs.push({
      id: `LOG-${Date.now()}`,
      quotationId: q.id,
      action: 'Quotation Approved',
      changedBy: approverName,
      details: `Disetujui oleh ${approverName} (${role}). Catatan: ${comment || 'Approved.'}`,
      timestamp: new Date().toISOString()
    });

    // Log to CRM activities
    try {
      ActivityService.logProposalSent(
        q.leadId || q.companyName,
        `Official Quotation Disetujui: ${q.quotationNumber} (${q.projectName})`,
        q.companyName
      );
    } catch (e) {
      console.warn('CRM activity log failed', e);
    }

    return this.saveQuotation(q, approverName);
  }

  public static rejectQuotation(id: string, approverName: string, role: string, comment: string): Quotation | undefined {
    const q = this.getQuotationById(id);
    if (!q) return undefined;

    q.status = 'REJECTED';
    q.approvalHistory.unshift({
      id: `APP-${Date.now()}`,
      quotationId: q.id,
      approverId: 'USER-ADMIN',
      approverName,
      role,
      status: 'REJECTED',
      comment,
      createdAt: new Date().toISOString()
    });

    q.auditLogs.push({
      id: `LOG-${Date.now()}`,
      quotationId: q.id,
      action: 'Quotation Rejected',
      changedBy: approverName,
      details: `Ditolak oleh ${approverName} (${role}). Alasan: ${comment}`,
      timestamp: new Date().toISOString()
    });

    return this.saveQuotation(q, approverName);
  }

  public static requestRevision(id: string, approverName: string, role: string, comment: string): Quotation | undefined {
    const q = this.getQuotationById(id);
    if (!q) return undefined;

    q.status = 'REVISION REQUIRED';
    q.approvalHistory.unshift({
      id: `APP-${Date.now()}`,
      quotationId: q.id,
      approverId: 'USER-ADMIN',
      approverName,
      role,
      status: 'REVISION_REQUESTED',
      comment,
      createdAt: new Date().toISOString()
    });

    q.auditLogs.push({
      id: `LOG-${Date.now()}`,
      quotationId: q.id,
      action: 'Revision Requested',
      changedBy: approverName,
      details: `Diminta revisi oleh ${approverName} (${role}): ${comment}`,
      timestamp: new Date().toISOString()
    });

    return this.saveQuotation(q, approverName);
  }

  public static trackView(idOrToken: string): void {
    const list = this.getAllQuotations();
    const q = list.find((item) => item.id === idOrToken || item.secureToken === idOrToken);
    if (q) {
      const now = new Date().toISOString();
      if (!q.firstViewedAt) {
        q.firstViewedAt = now;
      }
      q.lastViewedAt = now;
      q.viewCount = (q.viewCount || 0) + 1;
      if (q.status === 'SENT') {
        q.status = 'VIEWED';
      }
      this.saveQuotations(list);
    }
  }

  public static recordCustomerResponse(
    idOrToken: string,
    status: 'ACCEPTED' | 'REVISION_REQUESTED',
    comment: string,
    signerName?: string,
    signerPosition?: string
  ): Quotation | undefined {
    const list = this.getAllQuotations();
    const q = list.find((item) => item.id === idOrToken || item.secureToken === idOrToken);
    if (!q) return undefined;

    const now = new Date().toISOString();
    q.customerResponse = {
      status,
      comment,
      timestamp: now,
      signerName,
      signerPosition
    };

    if (status === 'ACCEPTED') {
      q.status = 'ACCEPTED';
    } else {
      q.status = 'REVISION REQUIRED';
    }

    q.auditLogs.push({
      id: `LOG-${Date.now()}`,
      quotationId: q.id,
      action: `Customer Response: ${status}`,
      changedBy: signerName || q.contactName || 'Klien',
      details: `Tanggapan Klien: ${status}. Catatan: ${comment}`,
      timestamp: now
    });

    this.saveQuotations(list);
    return q;
  }

  public static submitCustomerResponse(
    quotationId: string,
    response: {
      status: 'ACCEPTED' | 'REVISION_REQUESTED';
      comment: string;
      timestamp: string;
      signerName: string;
      signerPosition?: string;
    }
  ): Quotation | undefined {
    return this.recordCustomerResponse(
      quotationId,
      response.status,
      response.comment,
      response.signerName,
      response.signerPosition
    );
  }

  public static createQuotationFromProposal(proposal: Proposal, actor: string = 'Sales Rep'): Quotation {
    const qNum = this.generateQuotationNumber();
    const token = this.generateSecureToken();

    const items: QuotationItem[] = (proposal.modules || []).map((m, idx) => ({
      id: `ITEM-${idx + 1}`,
      quotationId: `QTN-${Date.now()}`,
      category: 'Module',
      name: m.name,
      description: m.description,
      pricingType: 'Per Module',
      quantity: 1,
      unit: 'Module',
      unitPrice: m.category === 'AI' ? 55000000 : 45000000,
      discountType: 'Percentage',
      discountValue: 0,
      discountAmount: 0,
      taxRate: 11,
      taxAmount: 0,
      subtotal: m.category === 'AI' ? 55000000 : 45000000,
      total: m.category === 'AI' ? 55000000 : 45000000,
      recurringFrequency: 'One-time',
      sortOrder: idx + 1
    }));

    // Add Cloud & Maintenance items by default
    items.push({
      id: `ITEM-CLOUD`,
      quotationId: `QTN-${Date.now()}`,
      category: 'Cloud',
      name: 'Google Cloud Platform Enterprise Infrastructure Setup',
      description: 'Setup Cloud Run, Firestore, SSL Security & CI/CD Pipeline',
      pricingType: 'Fixed Price',
      quantity: 1,
      unit: 'Project',
      unitPrice: 25000000,
      discountType: 'Percentage',
      discountValue: 0,
      discountAmount: 0,
      taxRate: 11,
      taxAmount: 0,
      subtotal: 25000000,
      total: 25000000,
      recurringFrequency: 'One-time',
      sortOrder: items.length + 1
    });

    items.push({
      id: `ITEM-SUPPORT`,
      quotationId: `QTN-${Date.now()}`,
      category: 'Maintenance',
      name: 'Standard SLA Maintenance & Support (Monthly)',
      description: 'Dukungan pemeliharaan sistem, garansi SLA 4 jam & patching keamanan',
      pricingType: 'Per Month',
      quantity: 12,
      unit: 'Month',
      unitPrice: 5000000,
      discountType: 'Percentage',
      discountValue: 0,
      discountAmount: 0,
      taxRate: 11,
      taxAmount: 0,
      subtotal: 60000000,
      total: 60000000,
      recurringFrequency: 'Monthly',
      sortOrder: items.length + 2
    });

    const quotation: Quotation = {
      id: `QTN-${Date.now()}`,
      quotationNumber: qNum,
      version: 'v1',
      secureToken: token,
      status: 'DRAFT',
      leadId: proposal.leadId,
      companyId: proposal.opportunityId,
      proposalId: proposal.id,
      proposalNumber: proposal.proposalNumber,
      companyName: proposal.companyName,
      contactName: proposal.contactName,
      contactPosition: proposal.contactPosition || 'IT Executive',
      contactEmail: proposal.contactEmail || '',
      contactPhone: proposal.contactPhone || '',
      companyAddress: proposal.companyAddress || '',
      projectName: proposal.title,
      industry: 'Teknologi & Operasional',
      platform: proposal.platforms ? proposal.platforms.join(' + ') : 'Web Desktop + PWA',
      usersCount: proposal.estimatedUsers || '50-200 Users',
      branchesCount: proposal.estimatedBranches || '1 Branch',
      projectType: 'Enterprise AI Solution',
      packageName: 'Enterprise',
      currency: 'IDR',
      exchangeRate: 1,
      subtotal: 0,
      discountType: 'Percentage',
      discountValue: 0,
      discountAmount: 0,
      discountReason: '',
      taxName: 'PPN',
      taxRate: 11,
      taxIncluded: false,
      taxAmount: 0,
      taxableAmount: 0,
      grandTotal: 0,
      recurringMonthly: 5000000,
      recurringAnnual: 60000000,
      items,
      paymentTermsType: 'Milestone',
      paymentMilestones: [
        { id: 'M1', milestoneName: 'Project Initiation & Design Approval', percentage: 30, amount: 0, dueCondition: 'Upon Contract Signing' },
        { id: 'M2', milestoneName: 'Core Development & Integration', percentage: 40, amount: 0, dueCondition: 'After Beta / UAT Milestone' },
        { id: 'M3', milestoneName: 'UAT Approval & Deployment', percentage: 20, amount: 0, dueCondition: 'Before Production Launch' },
        { id: 'M4', milestoneName: 'Handover & Knowledge Transfer', percentage: 10, amount: 0, dueCondition: '30 Days Post Launch' }
      ],
      validityDays: 30,
      quotationDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      commercialNotes: 'Harga penawaran ini disusun berdasarkan spesifikasi arsitektur proposal yang telah disetujui.',
      technicalNotes: 'Termasuk penyiapan infrastruktur cloud Google Cloud Platform dan integrasi API.',
      customerNotes: 'Masa garansi pemeliharaan berlaku selama 6 bulan sejak tanggal go-live.',
      assumptions: [
        'Cakupan pengembangan mengacu pada dokumen proposal resmi.',
        'Layanan pihak ketiga (biaya API WA Business, Maps) ditagih sesuai penggunaan aktual.',
        'Perubahan spesifikasi di luar dokumen akan diproses melalui mekanisme Change Request.'
      ],
      exclusions: [
        'Pengadaan perangkat keras / hardware fisik.',
        'Biaya langganan lisensi pihak ketiga non-SMART-AI.ID.'
      ],
      termsAndConditions: {
        paymentTerms: 'Pembayaran dilakukan sesuai jadwal milestone melalui transfer bank resmi SMART-AI.ID.',
        scope: 'Penawaran ini mengikat sesuai spesifikasi teknis dan modul yang tercantum.',
        changeRequest: 'Setiap penambahan fitur di luar scope akan ditagihkan secara terpisah via Change Request.',
        timeline: 'Estimasi pengerjaan dihitung sejak tanggal penerimaan DP Milestone 1.',
        customerResponsibilities: 'Klien wajib menyediakan akses staging, data sampel, dan PIC pengetesan.',
        thirdPartyCosts: 'Biaya API pihak ketiga ditanggung oleh Klien.',
        warranty: 'Garansi pemeliharaan sistem gratis selama 6 bulan post-launch.',
        maintenance: 'Layanan dukungan purna jual mengacu pada SLA paket yang dipilih.',
        cancellation: 'Pembatalan sepihak setelah kontrak ditandatangani akan dikenakan biaya pembatalan 20%.',
        confidentiality: 'Kedua belah pihak menjaga kerahasiaan informasi proyek (NDA).',
        intellectualProperty: 'Hak cipta kode sumber menjadi milik Klien setelah pelunasan 100%.',
        acceptance: 'Penandatanganan dokumen ini atau persetujuan digital merupakan penawaran komersial resmi.'
      },
      createdBy: actor,
      approvalHistory: [],
      auditLogs: [],
      versionHistory: [
        {
          version: 'v1',
          status: 'DRAFT',
          author: actor,
          date: new Date().toISOString(),
          summaryOfChanges: 'Dibuat otomatis dari Proposal Resmi'
        }
      ],
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return this.saveQuotation(quotation, actor);
  }

  public static generateQuotationNumber(): string {
    const list = this.getAllQuotations();
    const year = new Date().getFullYear();
    const count = list.length + 1;
    const seq = count.toString().padStart(4, '0');
    return `SAI-QTN-${year}-${seq}`;
  }

  public static generateSecureToken(): string {
    return 'qtn_sec_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
  }

  private static saveQuotations(list: Quotation[]): void {
    try {
      localStorage.setItem(QUOTATION_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save quotations to storage', e);
    }
  }

  private static generateSampleQuotations(): Quotation[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'QTN-SAMPLE-001',
        quotationNumber: 'SAI-QTN-2026-0001',
        version: 'v1',
        secureToken: 'qtn_sec_9a87f8as79d8f',
        status: 'APPROVED',
        leadId: 'SAI-LEAD-001',
        companyName: 'PT Pertambangan Nusantara',
        contactName: 'Ir. Hendra Gunawan',
        contactPosition: 'VP Information Technology',
        contactEmail: 'hendra.gunawan@pertambangan-nusantara.co.id',
        contactPhone: '+62 812-9876-5432',
        companyAddress: 'Gedung Wisma Pertambangan Lt. 12, Jl. HR Rasuna Said, Jakarta Selatan',
        projectName: 'Enterprise Mining System & AI Fleet Telemetry',
        industry: 'Pertambangan & Energi',
        platform: 'Web Desktop + PWA Mobile Driver',
        usersCount: '500+ Users',
        branchesCount: '8 Sites',
        projectType: 'Enterprise Custom',
        packageName: 'Enterprise',
        currency: 'IDR',
        exchangeRate: 1,
        subtotal: 280000000,
        discountType: 'Percentage',
        discountValue: 5,
        discountAmount: 14000000,
        discountReason: 'Diskon Kemitraan Strategis BUMN',
        taxName: 'PPN',
        taxRate: 11,
        taxIncluded: false,
        taxAmount: 29260000,
        taxableAmount: 266000000,
        grandTotal: 295260000,
        recurringMonthly: 5000000,
        recurringAnnual: 60000000,
        items: [
          {
            id: 'ITEM-1',
            quotationId: 'QTN-SAMPLE-001',
            category: 'Module',
            name: 'Fleet & Telemetry Monitor Module',
            description: 'Pemantauan real-time lokasi 500+ armada tambang, status mesin, dan geofencing alert.',
            pricingType: 'Per Module',
            quantity: 1,
            unit: 'Module',
            unitPrice: 65000000,
            discountType: 'Percentage',
            discountValue: 0,
            discountAmount: 0,
            taxRate: 11,
            taxAmount: 7150000,
            subtotal: 65000000,
            total: 65000000,
            recurringFrequency: 'One-time',
            sortOrder: 1
          },
          {
            id: 'ITEM-2',
            quotationId: 'QTN-SAMPLE-001',
            category: 'AI',
            name: 'Google Gemini Flash AI Copilot & Anomaly Engine',
            description: 'Engine prediksi maintenance komponen kendaraan dan interaksi AI natural language query.',
            pricingType: 'Fixed Price',
            quantity: 1,
            unit: 'Engine',
            unitPrice: 60000000,
            discountType: 'Percentage',
            discountValue: 0,
            discountAmount: 0,
            taxRate: 11,
            taxAmount: 6600000,
            subtotal: 60000000,
            total: 60000000,
            recurringFrequency: 'One-time',
            sortOrder: 2
          },
          {
            id: 'ITEM-3',
            quotationId: 'QTN-SAMPLE-001',
            category: 'Mobile',
            name: 'Field Driver & Inspector PWA Application',
            description: 'Aplikasi mobile PWA untuk driver check-in, insiden foto, dan inspeksi lapangan.',
            pricingType: 'Fixed Price',
            quantity: 1,
            unit: 'App',
            unitPrice: 45000000,
            discountType: 'Percentage',
            discountValue: 0,
            discountAmount: 0,
            taxRate: 11,
            taxAmount: 4950000,
            subtotal: 45000000,
            total: 45000000,
            recurringFrequency: 'One-time',
            sortOrder: 3
          },
          {
            id: 'ITEM-4',
            quotationId: 'QTN-SAMPLE-001',
            category: 'Integration',
            name: 'GPS Telemetry Gateway & WhatsApp API Integration',
            description: 'Integrasi dengan sensor GPS vendor pertambangan dan WhatsApp Business API.',
            pricingType: 'Fixed Price',
            quantity: 1,
            unit: 'Integration',
            unitPrice: 50000000,
            discountType: 'Percentage',
            discountValue: 0,
            discountAmount: 0,
            taxRate: 11,
            taxAmount: 5500000,
            subtotal: 50000000,
            total: 50000000,
            recurringFrequency: 'One-time',
            sortOrder: 4
          },
          {
            id: 'ITEM-5',
            quotationId: 'QTN-SAMPLE-001',
            category: 'Maintenance',
            name: 'SLA Support & Cloud Operations (Monthly)',
            description: 'Dukungan pemeliharaan 24/7, garansi respon SLA 2 jam, dan patch keamanan bulanan.',
            pricingType: 'Per Month',
            quantity: 12,
            unit: 'Month',
            unitPrice: 5000000,
            discountType: 'Percentage',
            discountValue: 0,
            discountAmount: 0,
            taxRate: 11,
            taxAmount: 6600000,
            subtotal: 60000000,
            total: 60000000,
            recurringFrequency: 'Monthly',
            sortOrder: 5
          }
        ],
        paymentTermsType: 'Milestone',
        paymentMilestones: [
          { id: 'M1', milestoneName: 'Project Initiation & Design Approval', percentage: 30, amount: 88578000, dueCondition: 'Penandatanganan Kontrak' },
          { id: 'M2', milestoneName: 'Core Development & Integration', percentage: 40, amount: 118104000, dueCondition: 'Penyelesaian Sesi UAT Lapangan' },
          { id: 'M3', milestoneName: 'Deployment & Training', percentage: 20, amount: 59052000, dueCondition: 'Go-Live Sistem' },
          { id: 'M4', milestoneName: 'Handover & Final Sign-off', percentage: 10, amount: 29526000, dueCondition: '30 Hari Post Go-Live' }
        ],
        validityDays: 30,
        quotationDate: '2026-08-01',
        validUntil: '2026-08-31',
        commercialNotes: 'Penawaran resmi harga khusus korporat pertambangan.',
        technicalNotes: 'Memanfaatkan infrastruktur Cloud Run dan Firestore terakselerasi.',
        customerNotes: 'Sudah mencakup garansi pemeliharaan 6 bulan.',
        assumptions: [
          'Akses data telemetry GPS disediakan oleh pihak ketiga Klien.',
          'UAT dilaksanakan secara hybrid bersama tim IT Klien.'
        ],
        exclusions: [
          'Pengadaan fisik hardware sensor GPS.'
        ],
        termsAndConditions: {
          paymentTerms: 'Pembayaran ditransfer ke rekening resmi SMART-AI.ID.',
          scope: 'Mengacu pada spesifikasi teknis proposal terlampir.',
          changeRequest: 'Penambahan scope di luar lampiran ditagih via Change Request.',
          timeline: 'Pengerjaan diperkirakan selama 12 minggu kerja.',
          customerResponsibilities: 'Menyediakan staging environment dan akses API GPS.',
          thirdPartyCosts: 'Biaya penggunaan API Maps & WA ditanggung Klien.',
          warranty: 'Garansi pemeliharaan selama 6 bulan.',
          maintenance: 'SLA respon perbaikan maksimal 2 jam.',
          cancellation: 'Pembatalan kontrak dikenakan biaya admin 15%.',
          confidentiality: 'Mengikat perjanjian NDA dua arah.',
          intellectualProperty: 'Hak milik sistem menjadi milik Klien.',
          acceptance: 'Persetujuan resmi menandai dimulainya pengerjaan.'
        },
        createdBy: 'Budi Santoso (Senior Sales Manager)',
        approvedBy: 'Rahmat Wijaya (Director of Commercials)',
        approvalHistory: [
          {
            id: 'APP-101',
            quotationId: 'QTN-SAMPLE-001',
            approverId: 'USER-DIR',
            approverName: 'Rahmat Wijaya',
            role: 'Director of Commercials',
            status: 'APPROVED',
            comment: 'Approved for PT Pertambangan Nusantara based on enterprise terms.',
            createdAt: now
          }
        ],
        auditLogs: [
          {
            id: 'LOG-101',
            quotationId: 'QTN-SAMPLE-001',
            action: 'Quotation Approved',
            changedBy: 'Rahmat Wijaya',
            details: 'Disetujui untuk pengiriman resmi.',
            timestamp: now
          }
        ],
        versionHistory: [
          {
            version: 'v1',
            status: 'APPROVED',
            author: 'Budi Santoso',
            date: now,
            summaryOfChanges: 'Versi awal resmi disetujui'
          }
        ],
        viewCount: 4,
        firstViewedAt: '2026-08-02T09:00:00Z',
        lastViewedAt: now,
        createdAt: '2026-08-01T08:00:00Z',
        updatedAt: now
      }
    ];
  }
}
