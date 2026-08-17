import {
  Invoice,
  InvoiceStatus,
  InvoiceItem,
  Quotation,
  PaymentMilestone,
  BankSettings
} from '../types';
import { InvoiceNumberService } from './InvoiceNumberService';
import { PaymentStatusService } from './PaymentStatusService';
import { QuotationDocumentService } from './QuotationDocumentService';
import { ActivityService } from './activityService';

const INVOICE_STORAGE_KEY = 'smart_ai_invoices_v1';

export const DEFAULT_BANK_SETTINGS: BankSettings = {
  bankName: 'Bank Central Asia (BCA)',
  accountName: 'PT SMART AI INDONESIA',
  accountNumber: '888-0912-334',
  swiftCode: 'CENAIDJA',
  branch: 'KCU Jakarta Selatan',
  paymentInstructions: 'Mohon cantumkan Nomor Invoice (misal: SAI-INV-2026-0001) pada berita/keterangan transfer bank.'
};

export class InvoiceService {
  public static getAllInvoices(): Invoice[] {
    try {
      const data = localStorage.getItem(INVOICE_STORAGE_KEY);
      if (data) {
        const parsed: Invoice[] = JSON.parse(data);
        // Refresh dynamic overdue statuses automatically
        return parsed.map((inv) => this.refreshInvoiceStatus(inv));
      }
    } catch (e) {
      console.warn('Failed to parse invoices from storage', e);
    }

    const samples = this.generateSampleInvoices();
    this.saveInvoices(samples);
    return samples;
  }

  public static saveInvoices(list: Invoice[]): void {
    try {
      localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save invoices', e);
    }
  }

  public static getInvoiceById(id: string): Invoice | undefined {
    const list = this.getAllInvoices();
    return list.find((inv) => inv.id === id || inv.invoiceNumber === id);
  }

  public static getInvoiceBySecureToken(token: string): Invoice | undefined {
    const list = this.getAllInvoices();
    return list.find((inv) => inv.secureToken === token);
  }

  public static refreshInvoiceStatus(invoice: Invoice): Invoice {
    if (invoice.status === 'CANCELLED') return invoice;

    const daysOverdue = PaymentStatusService.calculateDaysOverdue(invoice.dueDate);
    const calculatedStatus = PaymentStatusService.calculateInvoiceStatus(
      invoice.status,
      invoice.grandTotal,
      invoice.paidAmount,
      invoice.dueDate
    );

    return {
      ...invoice,
      status: calculatedStatus,
      overdueDays: daysOverdue,
      paymentStatus: PaymentStatusService.calculatePaymentStatus(invoice.grandTotal, invoice.paidAmount)
    };
  }

  public static saveInvoice(invoice: Invoice, actor: string = 'User'): Invoice {
    const list = this.getAllInvoices();
    const index = list.findIndex((i) => i.id === invoice.id);

    // Recalculate item subtotals
    let subtotal = 0;
    const items: InvoiceItem[] = invoice.items.map((item, idx) => {
      const itemSub = item.quantity * item.unitPrice;
      const itemTax = (itemSub * (item.taxRate || 0)) / 100;
      subtotal += itemSub;
      return {
        ...item,
        subtotal: itemSub,
        taxAmount: itemTax,
        total: itemSub + itemTax,
        sortOrder: idx + 1
      };
    });

    const discountAmount = invoice.discountAmount || 0;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = (taxableAmount * (invoice.taxRate || 0)) / 100;
    const grandTotal = taxableAmount + taxAmount;
    const outstandingAmount = Math.max(0, grandTotal - (invoice.paidAmount || 0));

    const updatedInv: Invoice = {
      ...invoice,
      items,
      subtotal,
      taxableAmount,
      taxAmount,
      grandTotal,
      outstandingAmount,
      updatedAt: new Date().toISOString()
    };

    const finalInv = this.refreshInvoiceStatus(updatedInv);

    if (index !== -1) {
      list[index] = finalInv;
    } else {
      list.unshift(finalInv);
    }

    this.saveInvoices(list);
    return finalInv;
  }

  public static createInvoiceFromQuotation(
    quotation: Quotation,
    milestoneIndex?: number,
    actor: string = 'Finance Manager',
    manualOverride: boolean = false
  ): Invoice {
    if (quotation.status !== 'APPROVED' && !manualOverride) {
      throw new Error('Quotation must be approved before creating an official invoice.');
    }

    const invoiceNumber = InvoiceNumberService.generateInvoiceNumber();
    const secureToken = `sec_inv_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const todayStr = new Date().toISOString().split('T')[0];

    // Default 30 days terms
    const dueDateObj = new Date();
    dueDateObj.setDate(dueDateObj.getDate() + 30);
    const dueDateStr = dueDateObj.toISOString().split('T')[0];

    let items: InvoiceItem[] = [];
    let milestoneName: string | undefined;
    let milestonePercentage: number | undefined;
    let grandTotal = quotation.grandTotal;
    let subtotal = quotation.subtotal;
    let discountAmount = quotation.discountAmount;
    let taxAmount = quotation.taxAmount;

    if (milestoneIndex !== undefined && quotation.paymentMilestones?.[milestoneIndex]) {
      const milestone = quotation.paymentMilestones[milestoneIndex];
      const mName = milestone.milestoneName || milestone.name || 'Termin';
      milestoneName = mName;
      milestonePercentage = milestone.percentage;
      grandTotal = milestone.amount;
      subtotal = milestone.amount;
      discountAmount = 0;
      taxAmount = 0;

      items = [
        {
          id: `inv_item_${Date.now()}_0`,
          invoiceId: '',
          description: `Pembayaran ${mName} (${milestone.percentage}% dari Total Proyek ${quotation.projectName})`,
          category: 'Milestone Payment',
          quantity: 1,
          unit: 'Termin',
          unitPrice: milestone.amount,
          discount: 0,
          taxRate: 0,
          subtotal: milestone.amount,
          taxAmount: 0,
          total: milestone.amount,
          sortOrder: 1
        }
      ];
    } else {
      items = quotation.items.map((item, idx) => {
        const itemSub = item.quantity * item.unitPrice;
        return {
          id: `inv_item_${Date.now()}_${idx}`,
          invoiceId: '',
          description: `${item.name} - ${item.description}`,
          category: item.category,
          quantity: item.quantity,
          unit: 'Unit',
          unitPrice: item.unitPrice,
          discount: item.discountAmount,
          taxRate: quotation.taxRate,
          subtotal: itemSub,
          taxAmount: (itemSub * (quotation.taxRate || 0)) / 100,
          total: itemSub * (1 + (quotation.taxRate || 0) / 100),
          sortOrder: idx + 1
        };
      });
    }

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      invoiceNumber,
      status: 'DRAFT',
      paymentStatus: 'UNPAID',
      secureToken,
      quotationId: quotation.id,
      quotationNumber: quotation.quotationNumber,
      proposalId: quotation.proposalId,
      proposalNumber: quotation.proposalNumber,
      projectId: quotation.projectId,
      projectName: quotation.projectName,
      leadId: quotation.leadId,
      companyId: quotation.companyId,
      contactId: quotation.contactId,
      companyName: quotation.companyName || 'Not Provided',
      contactName: quotation.contactName || 'Not Provided',
      contactEmail: quotation.contactEmail || 'Not Provided',
      contactPhone: quotation.contactPhone || 'Not Provided',
      companyAddress: quotation.companyAddress || 'Not Provided',
      industry: quotation.industry || 'Technology',
      currency: quotation.currency || 'IDR',
      exchangeRate: quotation.exchangeRate || 1,
      invoiceDate: todayStr,
      dueDate: dueDateStr,
      paymentTerms: quotation.termsAndConditions?.paymentTerms || 'Net 30 Days',
      milestoneName,
      milestonePercentage,
      items,
      subtotal,
      discountAmount,
      taxName: quotation.taxName || 'PPN',
      taxRate: quotation.taxRate || 11,
      taxAmount,
      taxableAmount: Math.max(0, subtotal - discountAmount),
      grandTotal,
      paidAmount: 0,
      outstandingAmount: grandTotal,
      overdueDays: 0,
      bankDetails: DEFAULT_BANK_SETTINGS,
      notes: `Invoice resmi diterbitkan berdasarkan Quotation ${quotation.quotationNumber}.`,
      paymentInstructions: DEFAULT_BANK_SETTINGS.paymentInstructions,
      version: 'v1',
      createdBy: actor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditLogs: [
        {
          id: `audit_${Date.now()}`,
          invoiceId: '',
          action: 'INVOICE_CREATED',
          performedBy: actor,
          details: `Invoice ${invoiceNumber} berhasil dibuat dari Quotation ${quotation.quotationNumber}`,
          timestamp: new Date().toISOString()
        }
      ],
      reminderLogs: []
    };

    // Update item invoiceIds
    newInvoice.items.forEach((it) => (it.invoiceId = newInvoice.id));
    newInvoice.auditLogs.forEach((a) => (a.invoiceId = newInvoice.id));

    this.saveInvoice(newInvoice, actor);

    // Log CRM Activity
    try {
      ActivityService.logProposalSent(
        quotation.leadId || quotation.companyName,
        `Invoice ${invoiceNumber} created for ${quotation.projectName} (${quotation.currency} ${grandTotal.toLocaleString('id-ID')})`,
        quotation.companyName
      );
    } catch (e) {
      console.warn('Activity logging failed', e);
    }

    return newInvoice;
  }

  public static cancelInvoice(invoiceId: string, reason: string, actor: string = 'Finance Admin'): Invoice {
    const list = this.getAllInvoices();
    const invoice = list.find((i) => i.id === invoiceId);
    if (!invoice) throw new Error('Invoice not found');

    invoice.status = 'CANCELLED';
    invoice.cancellationReason = reason;
    invoice.cancelledBy = actor;
    invoice.cancelledAt = new Date().toISOString();
    invoice.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      invoiceId,
      action: 'INVOICE_CANCELLED',
      performedBy: actor,
      details: `Invoice dibatalkan. Reason: ${reason}`,
      timestamp: new Date().toISOString()
    });

    this.saveInvoices(list);
    return invoice;
  }

  public static sendInvoiceReminder(
    invoiceId: string,
    channel: 'Email' | 'WhatsApp' | 'SMS' | 'In-App' = 'Email',
    actor: string = 'Finance Admin'
  ) {
    const list = this.getAllInvoices();
    const invoice = list.find((i) => i.id === invoiceId);
    if (!invoice) throw new Error('Invoice not found');

    const reminderType =
      invoice.overdueDays > 0 ? 'OVERDUE' : invoice.overdueDays === 0 ? 'DUE_TODAY' : 'BEFORE_DUE';

    const reminderMessage = `Yth. ${invoice.contactName} (${invoice.companyName}), mengingatkan tagihan Invoice ${
      invoice.invoiceNumber
    } sebesar ${invoice.currency} ${invoice.outstandingAmount.toLocaleString('id-ID')} dengan jatuh tempo ${
      invoice.dueDate
    }. Terima kasih.`;

    invoice.reminderLogs.unshift({
      id: `rem_${Date.now()}`,
      invoiceId: invoice.id,
      type: reminderType,
      channel,
      sentTo: channel === 'WhatsApp' ? invoice.contactPhone : invoice.contactEmail,
      sentAt: new Date().toISOString(),
      status: 'SENT',
      message: reminderMessage
    });

    invoice.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      invoiceId,
      action: 'REMINDER_SENT',
      performedBy: actor,
      details: `Payment reminder sent via ${channel} to ${
        channel === 'WhatsApp' ? invoice.contactPhone : invoice.contactEmail
      }`,
      timestamp: new Date().toISOString()
    });

    this.saveInvoices(list);
    return invoice;
  }

  private static generateSampleInvoices(): Invoice[] {
    const today = new Date();
    const dateToday = today.toISOString().split('T')[0];

    const date30Ago = new Date(today);
    date30Ago.setDate(date30Ago.getDate() - 35);

    const date15Ago = new Date(today);
    date15Ago.setDate(date15Ago.getDate() - 15);

    const date10DaysFuture = new Date(today);
    date10DaysFuture.setDate(date10DaysFuture.getDate() + 10);

    const date15DaysFuture = new Date(today);
    date15DaysFuture.setDate(date15DaysFuture.getDate() + 15);

    const samples: Invoice[] = [
      {
        id: 'inv_sample_101',
        invoiceNumber: 'SAI-INV-2026-0001',
        status: 'PAID',
        paymentStatus: 'PAID',
        secureToken: 'token_inv_101_paid_secure',
        quotationId: 'qtn_sample_001',
        quotationNumber: 'SAI-QTN-2026-0001',
        proposalNumber: 'SAI-PRP-2026-0001',
        projectName: 'Smart CRM & AI Lead Generation Engine',
        companyName: 'PT Nusantara Teknologi Perkasa',
        contactName: 'Budi Santoso',
        contactEmail: 'budi.santoso@nusantara.co.id',
        contactPhone: '+6281298765432',
        companyAddress: 'Gedung Menara Mandiri Lt. 18, Jl. Jend. Sudirman, Jakarta Selatan',
        taxId: '01.345.678.9-012.000',
        industry: 'Fintech & Financial Services',
        currency: 'IDR',
        exchangeRate: 1,
        invoiceDate: '2026-07-01',
        dueDate: '2026-07-31',
        paymentTerms: 'DP 50% Project Initiation',
        milestoneName: 'DP 50% Project Initiation',
        milestonePercentage: 50,
        items: [
          {
            id: 'item_101_1',
            invoiceId: 'inv_sample_101',
            description: 'DP 50% SMART CRM & AI Lead Generation System Development',
            category: 'Milestone Payment',
            quantity: 1,
            unit: 'Termin',
            unitPrice: 125000000,
            discount: 0,
            taxRate: 11,
            subtotal: 125000000,
            taxAmount: 13750000,
            total: 138750000,
            sortOrder: 1
          }
        ],
        subtotal: 125000000,
        discountAmount: 0,
        taxName: 'PPN',
        taxRate: 11,
        taxAmount: 13750000,
        taxableAmount: 125000000,
        grandTotal: 138750000,
        paidAmount: 138750000,
        outstandingAmount: 0,
        overdueDays: 0,
        bankDetails: DEFAULT_BANK_SETTINGS,
        notes: 'Terima kasih atas pembayaran tepat waktu.',
        paymentInstructions: DEFAULT_BANK_SETTINGS.paymentInstructions,
        version: 'v1',
        createdBy: 'Finance Admin',
        createdAt: '2026-07-01T08:00:00Z',
        updatedAt: dateToday,
        auditLogs: [
          {
            id: 'a_101_1',
            invoiceId: 'inv_sample_101',
            action: 'INVOICE_CREATED',
            performedBy: 'Finance Admin',
            details: 'Invoice SAI-INV-2026-0001 diterbitkan',
            timestamp: '2026-07-01T08:00:00Z'
          },
          {
            id: 'a_101_2',
            invoiceId: 'inv_sample_101',
            action: 'PAYMENT_RECORDED',
            performedBy: 'Finance Admin',
            details: 'Pembayaran Lunas IDR 138.750.000 dicatat via Bank Transfer BCA (TRX-20260715-001)',
            timestamp: '2026-07-15T10:30:00Z'
          }
        ],
        reminderLogs: []
      },
      {
        id: 'inv_sample_102',
        invoiceNumber: 'SAI-INV-2026-0002',
        status: 'OVERDUE',
        paymentStatus: 'UNPAID',
        secureToken: 'token_inv_102_overdue_secure',
        quotationId: 'qtn_sample_002',
        quotationNumber: 'SAI-QTN-2026-0002',
        projectName: 'AI Supply Chain & Analytics Platform',
        companyName: 'PT Logistic Express Logistics',
        contactName: 'Agus Setiawan',
        contactEmail: 'a.setiawan@logisticexpress.id',
        contactPhone: '+6281809876543',
        companyAddress: 'Kawasan Industri Jababeka V Block C-12, Cikarang',
        industry: 'Logistics & Supply Chain',
        currency: 'IDR',
        exchangeRate: 1,
        invoiceDate: date30Ago.toISOString().split('T')[0],
        dueDate: date15Ago.toISOString().split('T')[0],
        paymentTerms: 'Net 14 Days',
        items: [
          {
            id: 'item_102_1',
            invoiceId: 'inv_sample_102',
            description: 'Development Milestone 1: Core Telemetry Engine',
            category: 'Development',
            quantity: 1,
            unit: 'Milestone',
            unitPrice: 210000000,
            discount: 10000000,
            taxRate: 11,
            subtotal: 200000000,
            taxAmount: 22000000,
            total: 222000000,
            sortOrder: 1
          }
        ],
        subtotal: 210000000,
        discountAmount: 10000000,
        taxName: 'PPN',
        taxRate: 11,
        taxAmount: 22000000,
        taxableAmount: 200000000,
        grandTotal: 222000000,
        paidAmount: 0,
        outstandingAmount: 222000000,
        overdueDays: 15,
        bankDetails: DEFAULT_BANK_SETTINGS,
        notes: 'Tagihan telah melewati tanggal jatuh tempo.',
        paymentInstructions: DEFAULT_BANK_SETTINGS.paymentInstructions,
        version: 'v1',
        createdBy: 'Finance Manager',
        createdAt: date30Ago.toISOString(),
        updatedAt: dateToday,
        auditLogs: [
          {
            id: 'a_102_1',
            invoiceId: 'inv_sample_102',
            action: 'INVOICE_SENT',
            performedBy: 'Finance Manager',
            details: 'Invoice dikirim ke email client',
            timestamp: date30Ago.toISOString()
          }
        ],
        reminderLogs: [
          {
            id: 'rem_102_1',
            invoiceId: 'inv_sample_102',
            type: 'OVERDUE',
            channel: 'WhatsApp',
            sentTo: '+6281809876543',
            sentAt: dateToday,
            status: 'SENT',
            message: 'Payment reminder for overdue invoice SAI-INV-2026-0002'
          }
        ]
      },
      {
        id: 'inv_sample_103',
        invoiceNumber: 'SAI-INV-2026-0003',
        status: 'PARTIALLY_PAID',
        paymentStatus: 'PARTIALLY_PAID',
        secureToken: 'token_inv_103_partial_secure',
        quotationId: 'qtn_sample_003',
        quotationNumber: 'SAI-QTN-2026-0003',
        projectName: 'Smart Hospital Patient Portal & Telemedicine',
        companyName: 'RS Medika Sejahtera Group',
        contactName: 'Dr. Hendra Wijaya',
        contactEmail: 'hendra.w@medikagroup.co.id',
        contactPhone: '+628111222333',
        companyAddress: 'Jl. Ahmad Yani No. 88, Surabaya',
        industry: 'Healthcare & Pharma',
        currency: 'IDR',
        exchangeRate: 1,
        invoiceDate: dateToday,
        dueDate: date15DaysFuture.toISOString().split('T')[0],
        paymentTerms: 'Termin 1 (30%), Termin 2 (40%), Termin 3 (30%)',
        items: [
          {
            id: 'item_103_1',
            invoiceId: 'inv_sample_103',
            description: 'AI Telemedicine Module & Electronic Health Record Sync',
            category: 'Healthcare System',
            quantity: 1,
            unit: 'Module',
            unitPrice: 350000000,
            discount: 0,
            taxRate: 11,
            subtotal: 350000000,
            taxAmount: 38500000,
            total: 388500000,
            sortOrder: 1
          }
        ],
        subtotal: 350000000,
        discountAmount: 0,
        taxName: 'PPN',
        taxRate: 11,
        taxAmount: 38500000,
        taxableAmount: 350000000,
        grandTotal: 388500000,
        paidAmount: 100000000,
        outstandingAmount: 288500000,
        overdueDays: 0,
        bankDetails: DEFAULT_BANK_SETTINGS,
        notes: 'DP Partial Payment received IDR 100.000.000',
        paymentInstructions: DEFAULT_BANK_SETTINGS.paymentInstructions,
        version: 'v1',
        createdBy: 'Finance Manager',
        createdAt: dateToday,
        updatedAt: dateToday,
        auditLogs: [
          {
            id: 'a_103_1',
            invoiceId: 'inv_sample_103',
            action: 'INVOICE_CREATED',
            performedBy: 'Finance Manager',
            details: 'Invoice diterbitkan',
            timestamp: dateToday
          },
          {
            id: 'a_103_2',
            invoiceId: 'inv_sample_103',
            action: 'PAYMENT_RECORDED',
            performedBy: 'Finance Admin',
            details: 'Partial payment IDR 100.000.000 received',
            timestamp: dateToday
          }
        ],
        reminderLogs: []
      },
      {
        id: 'inv_sample_104',
        invoiceNumber: 'SAI-INV-2026-0004',
        status: 'SENT',
        paymentStatus: 'UNPAID',
        secureToken: 'token_inv_104_sent_secure',
        projectName: 'Smart Banking AI Fraud Detection',
        companyName: 'Bank Digital Indonesia',
        contactName: 'Siti Rahmawati',
        contactEmail: 'siti.rahma@bankdigital.id',
        contactPhone: '+6281233445566',
        companyAddress: 'SCBD Lot 28, Jakarta Selatan',
        industry: 'Fintech & Financial Services',
        currency: 'USD',
        exchangeRate: 16200,
        invoiceDate: dateToday,
        dueDate: date10DaysFuture.toISOString().split('T')[0],
        paymentTerms: 'Net 14 Days',
        items: [
          {
            id: 'item_104_1',
            invoiceId: 'inv_sample_104',
            description: 'AI Anomaly Detection Core Engine Setup',
            category: 'AI Engine',
            quantity: 1,
            unit: 'License',
            unitPrice: 25000,
            discount: 0,
            taxRate: 0,
            subtotal: 25000,
            taxAmount: 0,
            total: 25000,
            sortOrder: 1
          }
        ],
        subtotal: 25000,
        discountAmount: 0,
        taxName: 'N/A',
        taxRate: 0,
        taxAmount: 0,
        taxableAmount: 25000,
        grandTotal: 25000,
        paidAmount: 0,
        outstandingAmount: 25000,
        overdueDays: 0,
        bankDetails: DEFAULT_BANK_SETTINGS,
        notes: 'Official USD Invoice for Bank Digital Indonesia',
        paymentInstructions: DEFAULT_BANK_SETTINGS.paymentInstructions,
        version: 'v1',
        createdBy: 'Finance Manager',
        createdAt: dateToday,
        updatedAt: dateToday,
        auditLogs: [],
        reminderLogs: []
      }
    ];

    return samples;
  }
}
