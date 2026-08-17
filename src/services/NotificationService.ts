import {
  AppNotification,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  NotificationChannel,
  NotificationPreference,
  NotificationTemplate,
  NotificationDeliveryLog,
  AdminRole
} from '../types';

const STORAGE_NOTIFICATIONS = 'smart_ai_app_notifications';
const STORAGE_PREFERENCES = 'smart_ai_notification_preferences';
const STORAGE_TEMPLATES = 'smart_ai_notification_templates';
const STORAGE_LOGS = 'smart_ai_notification_logs';
const STORAGE_WEBHOOKS = 'smart_ai_notification_webhooks';

export interface NotificationWebhookEndpoint {
  id: string;
  name: string;
  provider: 'SLACK' | 'DISCORD' | 'TELEGRAM' | 'FONNTE_WHATSAPP' | 'TWILIO' | 'SENDGRID' | 'CUSTOM';
  url: string;
  authToken?: string;
  secretKey?: string;
  enabled: boolean;
  eventSubscriptions: NotificationType[];
  lastTriggeredAt?: string;
  lastStatus?: 'SUCCESS' | 'FAILED' | 'PENDING';
  lastLatencyMs?: number;
  failureCount: number;
  createdAt: string;
}

type NotificationListener = (notification: AppNotification) => void;

export class NotificationService {
  private static listeners: Set<NotificationListener> = new Set();

  // -------------------------------------------------------------
  // INITIALIZATION & SEEDING
  // -------------------------------------------------------------
  public static initializeData(): void {
    if (!localStorage.getItem(STORAGE_TEMPLATES)) {
      const defaultTemplates: NotificationTemplate[] = [
        {
          id: 'TPL-001',
          type: 'NEW_LEAD',
          title: 'Lead Baru Masuk: {companyName}',
          message: 'Lead baru dari {contactName} ({companyName}) untuk layanan {service} (Estimasi {budget}). Lead Score: {leadScore}/100.',
          variables: ['companyName', 'contactName', 'service', 'budget', 'leadScore'],
          priority: 'HIGH',
          enabled: true,
          channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
          emailSubject: '[SMART-AI] New High-Value Lead: {companyName}',
          whatsappTemplate: 'Halo Tim Sales, lead baru dari {companyName} ({contactName}) telah diterima di SMART-AI.ID.',
          updatedAt: '2026-08-15'
        },
        {
          id: 'TPL-002',
          type: 'NEW_CUSTOMER',
          title: 'Pelanggan Baru Terdaftar: {companyName}',
          message: 'Akun pelanggan {companyName} di industri {industry} telah resmi aktif.',
          variables: ['companyName', 'contactName', 'industry'],
          priority: 'MEDIUM',
          enabled: true,
          channels: ['IN_APP', 'EMAIL'],
          emailSubject: '[SMART-AI] Onboarding New Client: {companyName}',
          updatedAt: '2026-08-15'
        },
        {
          id: 'TPL-003',
          type: 'PROPOSAL',
          title: 'Update Proposal: {proposalNumber}',
          message: 'Proposal {proposalNumber} untuk {companyName} berstatus {status} (Nilai {amount}).',
          variables: ['proposalNumber', 'companyName', 'status', 'amount'],
          priority: 'HIGH',
          enabled: true,
          channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
          emailSubject: '[SMART-AI] Proposal {proposalNumber} Update ({status})',
          updatedAt: '2026-08-15'
        },
        {
          id: 'TPL-004',
          type: 'QUOTATION',
          title: 'Quotation Disetujui: {quotationNumber}',
          message: 'Penawaran harga resmi {quotationNumber} telah {status} oleh {companyName} senilai {total}.',
          variables: ['quotationNumber', 'companyName', 'status', 'total'],
          priority: 'HIGH',
          enabled: true,
          channels: ['IN_APP', 'EMAIL'],
          emailSubject: '[SMART-AI] Quotation {quotationNumber} Approval Confirmation',
          updatedAt: '2026-08-15'
        },
        {
          id: 'TPL-005',
          type: 'PAYMENT',
          title: 'Pembayaran Diterima: {invoiceNumber}',
          message: 'Pembayaran invoice {invoiceNumber} sebesar {amount} dari {companyName} telah diverifikasi (Status: {status}).',
          variables: ['invoiceNumber', 'companyName', 'amount', 'status'],
          priority: 'CRITICAL',
          enabled: true,
          channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
          emailSubject: '[SMART-AI] Kwitansi & Konfirmasi Pembayaran {invoiceNumber}',
          whatsappTemplate: 'SMART-AI.ID - Pembayaran invoice {invoiceNumber} sebesar {amount} telah kami terima dengan sukses. Terima kasih!',
          updatedAt: '2026-08-15'
        },
        {
          id: 'TPL-006',
          type: 'PROJECT_UPDATE',
          title: 'Update Progres Proyek: {projectName}',
          message: 'Proyek {projectName} telah mencapai progres {progress}% ({milestoneName}). Kondisi: {healthStatus}.',
          variables: ['projectName', 'progress', 'milestoneName', 'healthStatus'],
          priority: 'MEDIUM',
          enabled: true,
          channels: ['IN_APP', 'EMAIL', 'PUSH'],
          emailSubject: '[SMART-AI] Milestone & Progress Update: {projectName}',
          updatedAt: '2026-08-15'
        },
        {
          id: 'TPL-007',
          type: 'SUPPORT_TICKET',
          title: 'Tiket Support: {ticketNumber} - {subject}',
          message: 'Tiket #{ticketNumber} ({subject}) dari {companyName} berstatus {status} (Prioritas: {priority}).',
          variables: ['ticketNumber', 'subject', 'companyName', 'status', 'priority'],
          priority: 'HIGH',
          enabled: true,
          channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
          emailSubject: '[SMART-AI Support] Update Tiket #{ticketNumber}',
          updatedAt: '2026-08-15'
        },
        {
          id: 'TPL-008',
          type: 'SYSTEM',
          title: 'Peringatan Keamanan & Sistem: {title}',
          message: '{message}',
          variables: ['title', 'message'],
          priority: 'CRITICAL',
          enabled: true,
          channels: ['IN_APP', 'EMAIL', 'PUSH'],
          emailSubject: '[SECURITY ALERT] SMART-AI.ID System Notice',
          updatedAt: '2026-08-15'
        }
      ];
      localStorage.setItem(STORAGE_TEMPLATES, JSON.stringify(defaultTemplates));
    }

    if (!localStorage.getItem(STORAGE_NOTIFICATIONS)) {
      const defaultNotifs: AppNotification[] = [
        {
          id: 'NTF-001',
          type: 'NEW_LEAD',
          category: 'Sales & CRM',
          targetRole: 'SALES',
          title: 'Lead Baru: PT Nusantara Mining Energy',
          message: 'Permintaan AI Fleet Tracking & OCR Logistik dengan estimasi nilai Rp 450.000.000. Lead Score: 92/100 (High Intent).',
          priority: 'HIGH',
          status: 'UNREAD',
          channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
          entityType: 'lead',
          entityId: 'LEAD-001',
          actionUrl: '/admin/leads',
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          deliveryStatus: { inApp: 'DELIVERED', email: 'SENT', whatsapp: 'DELIVERED' }
        },
        {
          id: 'NTF-002',
          type: 'PAYMENT',
          category: 'Finance & Billing',
          targetRole: 'FINANCE',
          title: 'Pembayaran Lunas: INV-2026-0001',
          message: 'Invoice INV-2026-0001 dari PT Sawit Makmur Abadi sebesar Rp 120.000.000 telah lunas via Bank Mandiri Escrow.',
          priority: 'CRITICAL',
          status: 'UNREAD',
          channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
          entityType: 'invoice',
          entityId: 'INV-2026-0001',
          actionUrl: '/admin/invoices',
          createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
          deliveryStatus: { inApp: 'DELIVERED', email: 'DELIVERED', whatsapp: 'DELIVERED' }
        },
        {
          id: 'NTF-003',
          type: 'PROPOSAL',
          category: 'Commercial',
          targetRole: 'ADMIN',
          title: 'Proposal Diterima Klien: RS Medika Sejahtera',
          message: 'Proposal AI Diagnostic & Queue Kiosk resmi disetujui Direktur Utama RS Medika Sejahtera.',
          priority: 'HIGH',
          status: 'UNREAD',
          channels: ['IN_APP', 'EMAIL'],
          entityType: 'proposal',
          entityId: 'PRP-2026-004',
          actionUrl: '/admin/proposals',
          createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          deliveryStatus: { inApp: 'DELIVERED', email: 'SENT' }
        },
        {
          id: 'NTF-004',
          type: 'PROJECT_UPDATE',
          category: 'Delivery',
          targetRole: 'DEVELOPER',
          tenantId: 'COMP-ABC',
          title: 'Milestone 3 Selesai: AI Demand Forecaster',
          message: 'Model Training & Accuracy Validation mencapai 96.4% MAP. Siap deployment ke staging environment.',
          priority: 'MEDIUM',
          status: 'READ',
          channels: ['IN_APP'],
          entityType: 'project',
          entityId: 'PRJ-101',
          actionUrl: '/admin/projects',
          createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
          readAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
          deliveryStatus: { inApp: 'DELIVERED' }
        },
        {
          id: 'NTF-005',
          type: 'SUPPORT_TICKET',
          category: 'Support',
          targetRole: 'SUPPORT',
          title: 'Tiket Kritis: #SAI-TKT-2026-000004',
          message: 'Permasalahan integrasi WhatsApp Webhook timeout pada server klien Bank Syariah.',
          priority: 'CRITICAL',
          status: 'UNREAD',
          channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
          entityType: 'ticket',
          entityId: 'SAI-TKT-2026-000004',
          actionUrl: '/admin/support',
          createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
          deliveryStatus: { inApp: 'DELIVERED', email: 'SENT', whatsapp: 'DELIVERED' }
        },
        {
          id: 'NTF-006',
          type: 'SYSTEM',
          category: 'Security & Auth',
          targetRole: 'SUPER_ADMIN',
          title: 'Audit Keamanan: Multi-Factor Authentication Enforced',
          message: 'Semua akun admin operasional telah diwajibkan 2FA Token untuk akses sensitif.',
          priority: 'MEDIUM',
          status: 'READ',
          channels: ['IN_APP'],
          actionUrl: '/admin/users',
          createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          readAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
          deliveryStatus: { inApp: 'DELIVERED' }
        }
      ];
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(defaultNotifs));
    }

    if (!localStorage.getItem(STORAGE_LOGS)) {
      const defaultLogs: NotificationDeliveryLog[] = [
        {
          id: 'LOG-1001',
          notificationId: 'NTF-001',
          type: 'NEW_LEAD',
          title: 'Lead Baru: PT Nusantara Mining Energy',
          recipientName: 'Budi Santoso (Sales)',
          recipientEmail: 'budi.sales@smart-ai.id',
          recipientPhone: '+6281398765432',
          channel: 'WHATSAPP',
          status: 'DELIVERED',
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          sentAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        },
        {
          id: 'LOG-1002',
          notificationId: 'NTF-002',
          type: 'PAYMENT',
          title: 'Pembayaran Lunas: INV-2026-0001',
          recipientName: 'Farhan Maulana (Finance)',
          recipientEmail: 'farhan.finance@smart-ai.id',
          channel: 'EMAIL',
          status: 'DELIVERED',
          createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
          sentAt: new Date(Date.now() - 35 * 60 * 1000).toISOString()
        },
        {
          id: 'LOG-1003',
          notificationId: 'NTF-005',
          type: 'SUPPORT_TICKET',
          title: 'Tiket Kritis: #SAI-TKT-2026-000004',
          recipientName: 'Siti Rahma (Support Lead)',
          recipientEmail: 'siti.support@smart-ai.id',
          channel: 'IN_APP',
          status: 'DELIVERED',
          createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
          sentAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString()
        }
      ];
      localStorage.setItem(STORAGE_LOGS, JSON.stringify(defaultLogs));
    }
  }

  // -------------------------------------------------------------
  // REAL-TIME EVENT EMITTER & SUBSCRIBERS
  // -------------------------------------------------------------
  public static subscribe(listener: NotificationListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static emit(notification: AppNotification): void {
    this.listeners.forEach((listener) => {
      try {
        listener(notification);
      } catch (err) {
        console.error('Error notifying listener:', err);
      }
    });

    // Synthesize subtle futuristic audio beep if audio enabled
    this.playNotificationSound();
  }

  public static playNotificationSound(type: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL' = 'INFO'): void {
    try {
      const prefs = this.getPreferences('active_user', 'SUPER_ADMIN');
      if (!prefs.soundEnabled) return;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'CRITICAL') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      } else if (type === 'SUCCESS') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'WARNING') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(370, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.26);
      } else {
        // Standard high-tech chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.24);
      }
    } catch (e) {
      // Ignored if browser blocks audio autoplay
    }
  }

  // -------------------------------------------------------------
  // GET & QUERY NOTIFICATIONS
  // -------------------------------------------------------------
  public static getNotifications(options: {
    userId?: string;
    role?: AdminRole | string;
    tenantId?: string; // For customer isolation
    status?: 'ALL' | NotificationStatus;
    type?: 'ALL' | NotificationType;
    searchQuery?: string;
    priority?: 'ALL' | NotificationPriority;
  } = {}): AppNotification[] {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return [];

    let list: AppNotification[] = JSON.parse(raw);

    // 1. Role & Tenant Isolation Filter
    if (options.role === 'CUSTOMER' && options.tenantId) {
      // Strictly isolate customer notifications to their company
      list = list.filter((n) => n.tenantId === options.tenantId || n.userId === options.userId);
    } else if (options.role && options.role !== 'SUPER_ADMIN') {
      // Operational role filtering
      list = list.filter((n) => {
        if (!n.targetRole || n.targetRole === 'ALL') return true;
        if (n.targetRole === options.role) return true;
        if (n.userId && n.userId === options.userId) return true;
        return false;
      });
    }

    // 2. Status filter
    if (options.status && options.status !== 'ALL') {
      list = list.filter((n) => n.status === options.status);
    } else {
      // By default exclude ARCHIVED unless explicitly asking for ALL or ARCHIVED
      if (options.status !== 'ARCHIVED' && options.status !== 'ALL') {
        list = list.filter((n) => n.status !== 'ARCHIVED');
      }
    }

    // 3. Type filter
    if (options.type && options.type !== 'ALL') {
      list = list.filter((n) => n.type === options.type);
    }

    // 4. Priority filter
    if (options.priority && options.priority !== 'ALL') {
      list = list.filter((n) => n.priority === options.priority);
    }

    // 5. Search query
    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q) ||
          (n.entityId && n.entityId.toLowerCase().includes(q))
      );
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public static getUnreadCount(role?: string, tenantId?: string, userId?: string): number {
    const unread = this.getNotifications({
      role,
      tenantId,
      userId,
      status: 'UNREAD'
    });
    return unread.length;
  }

  public static getNotificationById(id: string): AppNotification | null {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return null;
    const list: AppNotification[] = JSON.parse(raw);
    return list.find((n) => n.id === id) || null;
  }

  // -------------------------------------------------------------
  // NOTIFICATION DISPATCHING & EVENT CREATION
  // -------------------------------------------------------------
  public static createNotification(params: {
    type: NotificationType;
    title: string;
    message: string;
    priority?: NotificationPriority;
    targetRole?: AdminRole | 'ALL';
    userId?: string;
    tenantId?: string;
    entityType?: string;
    entityId?: string;
    actionUrl?: string;
    metadata?: Record<string, any>;
    channels?: NotificationChannel[];
  }): AppNotification {
    this.initializeData();

    const notifId = `NTF-${Date.now().toString().slice(-6)}`;
    const categoryMap: Record<NotificationType, string> = {
      NEW_LEAD: 'Sales & CRM',
      NEW_CUSTOMER: 'Customer Onboarding',
      PROPOSAL: 'Commercial Proposal',
      QUOTATION: 'Quotation Approval',
      PAYMENT: 'Finance & Billing',
      PROJECT_UPDATE: 'Project Delivery',
      SUPPORT_TICKET: 'Customer Support',
      SYSTEM: 'System & Security'
    };

    const newNotification: AppNotification = {
      id: notifId,
      type: params.type,
      category: categoryMap[params.type] || 'General',
      title: params.title,
      message: params.message,
      priority: params.priority || 'MEDIUM',
      status: 'UNREAD',
      channels: params.channels || ['IN_APP'],
      targetRole: params.targetRole || 'ALL',
      userId: params.userId,
      tenantId: params.tenantId,
      entityType: params.entityType,
      entityId: params.entityId,
      actionUrl: params.actionUrl || '/admin',
      metadata: params.metadata,
      createdAt: new Date().toISOString(),
      deliveryStatus: {
        inApp: 'DELIVERED',
        email: params.channels?.includes('EMAIL') ? 'SENT' : undefined,
        whatsapp: params.channels?.includes('WHATSAPP') ? 'DELIVERED' : undefined,
        push: params.channels?.includes('PUSH') ? 'SENT' : undefined
      }
    };

    // Save notification
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    const list: AppNotification[] = raw ? JSON.parse(raw) : [];
    list.unshift(newNotification);
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));

    // Save delivery log
    this.recordDeliveryLog(newNotification);

    // Trigger Realtime in-app toast
    this.emit(newNotification);

    return newNotification;
  }

  // -------------------------------------------------------------
  // BUSINESS EVENT HELPERS (PROMPT 28)
  // -------------------------------------------------------------
  public static notifyNewLead(lead: {
    leadId: string;
    companyName: string;
    contactName: string;
    service: string;
    budget: string;
    leadScore?: number;
  }): AppNotification {
    return this.createNotification({
      type: 'NEW_LEAD',
      title: `Lead Baru: ${lead.companyName}`,
      message: `Permintaan ${lead.service} dari ${lead.contactName} (${lead.companyName}) dengan estimasi ${lead.budget}. Lead Score: ${lead.leadScore || 85}/100.`,
      priority: (lead.leadScore || 0) >= 80 ? 'HIGH' : 'MEDIUM',
      targetRole: 'SALES',
      entityType: 'lead',
      entityId: lead.leadId,
      actionUrl: `/admin/leads`,
      channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
      metadata: lead
    });
  }

  public static notifyNewCustomer(cust: {
    customerId: string;
    companyName: string;
    contactName: string;
    industry: string;
  }): AppNotification {
    return this.createNotification({
      type: 'NEW_CUSTOMER',
      title: `Pelanggan Baru: ${cust.companyName}`,
      message: `Akun klien ${cust.companyName} (${cust.industry}) resmi terdaftar dengan kontak utama ${cust.contactName}.`,
      priority: 'MEDIUM',
      targetRole: 'ADMIN',
      entityType: 'customer',
      entityId: cust.customerId,
      actionUrl: `/admin/customers`,
      channels: ['IN_APP', 'EMAIL'],
      metadata: cust
    });
  }

  public static notifyProposal(prop: {
    proposalId: string;
    proposalNumber: string;
    companyName: string;
    status: string;
    amount?: string;
    customerId?: string;
  }): AppNotification {
    return this.createNotification({
      type: 'PROPOSAL',
      title: `Update Proposal: ${prop.proposalNumber} (${prop.status})`,
      message: `Proposal ${prop.proposalNumber} untuk ${prop.companyName} berstatus ${prop.status}${prop.amount ? ` dengan nilai ${prop.amount}` : ''}.`,
      priority: prop.status === 'ACCEPTED' || prop.status === 'REJECTED' ? 'HIGH' : 'MEDIUM',
      targetRole: 'SALES',
      tenantId: prop.customerId,
      entityType: 'proposal',
      entityId: prop.proposalId,
      actionUrl: `/admin/proposals`,
      channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
      metadata: prop
    });
  }

  public static notifyQuotation(quote: {
    quotationId: string;
    quotationNumber: string;
    companyName: string;
    status: string;
    total?: string;
    customerId?: string;
  }): AppNotification {
    return this.createNotification({
      type: 'QUOTATION',
      title: `Quotation ${quote.quotationNumber} (${quote.status})`,
      message: `Penawaran harga ${quote.quotationNumber} untuk ${quote.companyName} telah ${quote.status}${quote.total ? ` senilai ${quote.total}` : ''}.`,
      priority: quote.status === 'APPROVED' ? 'HIGH' : 'MEDIUM',
      targetRole: 'FINANCE',
      tenantId: quote.customerId,
      entityType: 'quotation',
      entityId: quote.quotationId,
      actionUrl: `/admin/quotations`,
      channels: ['IN_APP', 'EMAIL'],
      metadata: quote
    });
  }

  public static notifyPayment(pay: {
    invoiceId: string;
    invoiceNumber: string;
    companyName: string;
    amount: string;
    status: string;
    customerId?: string;
  }): AppNotification {
    return this.createNotification({
      type: 'PAYMENT',
      title: `Pembayaran ${pay.invoiceNumber}: ${pay.amount}`,
      message: `Pembayaran invoice ${pay.invoiceNumber} sebesar ${pay.amount} dari ${pay.companyName} berhasil diverifikasi (Status: ${pay.status}).`,
      priority: 'CRITICAL',
      targetRole: 'FINANCE',
      tenantId: pay.customerId,
      entityType: 'invoice',
      entityId: pay.invoiceId,
      actionUrl: `/admin/invoices`,
      channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
      metadata: pay
    });
  }

  public static notifyProjectUpdate(proj: {
    projectId: string;
    projectName: string;
    progress: number;
    healthStatus: string;
    milestoneName?: string;
    customerId?: string;
  }): AppNotification {
    const isAtRisk = proj.healthStatus === 'AT_RISK' || proj.healthStatus === 'DELAYED';
    return this.createNotification({
      type: 'PROJECT_UPDATE',
      title: isAtRisk ? `Perhatian Proyek: ${proj.projectName}` : `Progres Proyek: ${proj.projectName} (${proj.progress}%)`,
      message: isAtRisk
        ? `Proyek ${proj.projectName} memerlukan atensi segera (Status: ${proj.healthStatus}).`
        : `Proyek ${proj.projectName} telah mencapai ${proj.progress}% ${proj.milestoneName ? `pada milestone ${proj.milestoneName}` : ''}.`,
      priority: isAtRisk ? 'HIGH' : 'MEDIUM',
      targetRole: 'DEVELOPER',
      tenantId: proj.customerId,
      entityType: 'project',
      entityId: proj.projectId,
      actionUrl: `/admin/projects`,
      channels: ['IN_APP', 'EMAIL', 'PUSH'],
      metadata: proj
    });
  }

  public static notifySupportTicket(tkt: {
    ticketId: string;
    ticketNumber: string;
    subject: string;
    priority: NotificationPriority;
    status: string;
    companyName: string;
    customerId?: string;
  }): AppNotification {
    return this.createNotification({
      type: 'SUPPORT_TICKET',
      title: `Tiket Support #${tkt.ticketNumber}`,
      message: `Tiket "${tkt.subject}" dari ${tkt.companyName} berstatus ${tkt.status} (Prioritas: ${tkt.priority}).`,
      priority: tkt.priority,
      targetRole: 'SUPPORT',
      tenantId: tkt.customerId,
      entityType: 'ticket',
      entityId: tkt.ticketId,
      actionUrl: `/admin/support`,
      channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
      metadata: tkt
    });
  }

  public static notifySystemAlert(alert: {
    title: string;
    message: string;
    priority?: NotificationPriority;
    targetRole?: AdminRole | 'ALL';
  }): AppNotification {
    return this.createNotification({
      type: 'SYSTEM',
      title: alert.title,
      message: alert.message,
      priority: alert.priority || 'HIGH',
      targetRole: alert.targetRole || 'ALL',
      actionUrl: `/admin`,
      channels: ['IN_APP', 'EMAIL', 'PUSH']
    });
  }

  // -------------------------------------------------------------
  // STATUS MUTATIONS (READ, UNREAD, ARCHIVE, DELETE)
  // -------------------------------------------------------------
  public static markAsRead(id: string): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    const list: AppNotification[] = JSON.parse(raw);
    const item = list.find((n) => n.id === id);
    if (item) {
      item.status = 'READ';
      item.readAt = new Date().toISOString();
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
    }
  }

  public static markAsUnread(id: string): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    const list: AppNotification[] = JSON.parse(raw);
    const item = list.find((n) => n.id === id);
    if (item) {
      item.status = 'UNREAD';
      delete item.readAt;
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
    }
  }

  public static markAllAsRead(context: { role?: string; tenantId?: string; userId?: string } = {}): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    const list: AppNotification[] = JSON.parse(raw);
    list.forEach((n) => {
      if (context.tenantId && n.tenantId !== context.tenantId) return;
      if (n.status === 'UNREAD') {
        n.status = 'READ';
        n.readAt = new Date().toISOString();
      }
    });
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
  }

  public static archiveNotification(id: string): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    const list: AppNotification[] = JSON.parse(raw);
    const item = list.find((n) => n.id === id);
    if (item) {
      item.status = 'ARCHIVED';
      item.archivedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
    }
  }

  public static restoreNotification(id: string): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    const list: AppNotification[] = JSON.parse(raw);
    const item = list.find((n) => n.id === id);
    if (item) {
      item.status = 'READ';
      delete item.archivedAt;
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
    }
  }

  public static deleteNotification(id: string): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    let list: AppNotification[] = JSON.parse(raw);
    list = list.filter((n) => n.id !== id);
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
  }

  public static bulkMarkAsRead(ids: string[]): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    const list: AppNotification[] = JSON.parse(raw);
    list.forEach((n) => {
      if (ids.includes(n.id)) {
        n.status = 'READ';
        n.readAt = new Date().toISOString();
      }
    });
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
  }

  public static bulkArchive(ids: string[]): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    const list: AppNotification[] = JSON.parse(raw);
    list.forEach((n) => {
      if (ids.includes(n.id)) {
        n.status = 'ARCHIVED';
        n.archivedAt = new Date().toISOString();
      }
    });
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
  }

  public static bulkDelete(ids: string[]): void {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return;
    let list: AppNotification[] = JSON.parse(raw);
    list = list.filter((n) => !ids.includes(n.id));
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
  }

  // -------------------------------------------------------------
  // NOTIFICATION PREFERENCES
  // -------------------------------------------------------------
  public static getPreferences(userId: string = 'active_user', role: string = 'SUPER_ADMIN'): NotificationPreference {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_PREFERENCES);
    if (raw) {
      const prefsMap: Record<string, NotificationPreference> = JSON.parse(raw);
      if (prefsMap[userId]) return prefsMap[userId];
    }

    const defaultPref: NotificationPreference = {
      id: `PREF-${userId}`,
      userId,
      role,
      soundEnabled: false, // Default OFF as required by Prompt 28
      retentionDays: 60,
      emailDigest: 'DAILY',
      updatedAt: new Date().toISOString(),
      preferences: {
        NEW_LEAD: { inApp: true, email: true, whatsapp: true, push: false },
        NEW_CUSTOMER: { inApp: true, email: true, whatsapp: false, push: false },
        PROPOSAL: { inApp: true, email: true, whatsapp: true, push: true },
        QUOTATION: { inApp: true, email: true, whatsapp: false, push: false },
        PAYMENT: { inApp: true, email: true, whatsapp: true, push: true },
        PROJECT_UPDATE: { inApp: true, email: true, whatsapp: false, push: true },
        SUPPORT_TICKET: { inApp: true, email: true, whatsapp: true, push: true },
        SYSTEM: { inApp: true, email: true, whatsapp: false, push: true }
      }
    };

    return defaultPref;
  }

  public static savePreferences(pref: NotificationPreference): void {
    const raw = localStorage.getItem(STORAGE_PREFERENCES);
    const prefsMap: Record<string, NotificationPreference> = raw ? JSON.parse(raw) : {};
    pref.updatedAt = new Date().toISOString();
    prefsMap[pref.userId] = pref;
    localStorage.setItem(STORAGE_PREFERENCES, JSON.stringify(prefsMap));
  }

  // -------------------------------------------------------------
  // TEMPLATES
  // -------------------------------------------------------------
  public static getTemplates(): NotificationTemplate[] {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_TEMPLATES);
    return raw ? JSON.parse(raw) : [];
  }

  public static updateTemplate(id: string, updates: Partial<NotificationTemplate>): NotificationTemplate | null {
    const templates = this.getTemplates();
    const idx = templates.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    const updated = {
      ...templates[idx],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    templates[idx] = updated;
    localStorage.setItem(STORAGE_TEMPLATES, JSON.stringify(templates));
    return updated;
  }

  // -------------------------------------------------------------
  // LOGS & STATS
  // -------------------------------------------------------------
  private static recordDeliveryLog(notif: AppNotification): void {
    const raw = localStorage.getItem(STORAGE_LOGS);
    const logs: NotificationDeliveryLog[] = raw ? JSON.parse(raw) : [];

    notif.channels.forEach((channel) => {
      logs.unshift({
        id: `LOG-${Date.now().toString().slice(-6)}-${channel}`,
        notificationId: notif.id,
        type: notif.type,
        title: notif.title,
        recipientName: notif.targetRole || notif.userId || 'System Broadcast',
        recipientEmail: channel === 'EMAIL' ? 'admin@smart-ai.id' : undefined,
        channel,
        status: 'DELIVERED',
        createdAt: notif.createdAt,
        sentAt: new Date().toISOString()
      });
    });

    localStorage.setItem(STORAGE_LOGS, JSON.stringify(logs.slice(0, 100)));
  }

  public static getDeliveryLogs(): NotificationDeliveryLog[] {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_LOGS);
    return raw ? JSON.parse(raw) : [];
  }

  public static getStats(role?: string, tenantId?: string) {
    const notifs = this.getNotifications({ role, tenantId, status: 'ALL' });
    const now = Date.now();
    const oneDayAgo = now - 24 * 3600 * 1000;
    const oneWeekAgo = now - 7 * 24 * 3600 * 1000;

    const unread = notifs.filter((n) => n.status === 'UNREAD').length;
    const read = notifs.filter((n) => n.status === 'READ').length;
    const archived = notifs.filter((n) => n.status === 'ARCHIVED').length;
    const today = notifs.filter((n) => new Date(n.createdAt).getTime() >= oneDayAgo).length;
    const thisWeek = notifs.filter((n) => new Date(n.createdAt).getTime() >= oneWeekAgo).length;
    const critical = notifs.filter((n) => n.priority === 'CRITICAL').length;

    const logs = this.getDeliveryLogs();
    const totalDelivered = logs.filter((l) => l.status === 'DELIVERED' || l.status === 'SENT').length;
    const totalFailed = logs.filter((l) => l.status === 'FAILED').length;
    const deliveryRate = logs.length > 0 ? Math.round((totalDelivered / logs.length) * 100) : 100;
    const readRate = notifs.length > 0 ? Math.round((read / notifs.length) * 100) : 100;

    return {
      total: notifs.length,
      unread,
      read,
      archived,
      today,
      thisWeek,
      critical,
      deliveryRate,
      readRate,
      totalDelivered,
      totalFailed
    };
  }

  public static applyRetentionPolicy(retentionDays: number): number {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
    if (!raw) return 0;
    const list: AppNotification[] = JSON.parse(raw);
    const cutoff = Date.now() - retentionDays * 24 * 3600 * 1000;

    const retained = list.filter((n) => {
      const created = new Date(n.createdAt).getTime();
      return created >= cutoff || n.status === 'UNREAD' || n.priority === 'CRITICAL';
    });

    const removedCount = list.length - retained.length;
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(retained));
    return removedCount;
  }

  // -------------------------------------------------------------
  // ADVANCED DEVELOPER: WEBHOOKS & GATEWAYS
  // -------------------------------------------------------------
  public static getWebhooks(): NotificationWebhookEndpoint[] {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_WEBHOOKS);
    if (!raw) {
      const defaultWebhooks: NotificationWebhookEndpoint[] = [
        {
          id: 'WH-001',
          name: 'Discord Operations Channel',
          provider: 'DISCORD',
          url: 'https://discord.com/api/webhooks/123456789/smart-ai-ops-alerts',
          enabled: true,
          eventSubscriptions: ['NEW_LEAD', 'PAYMENT', 'SUPPORT_TICKET', 'SYSTEM'],
          lastTriggeredAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
          lastStatus: 'SUCCESS',
          lastLatencyMs: 142,
          failureCount: 0,
          createdAt: '2026-08-01'
        },
        {
          id: 'WH-002',
          name: 'Slack #executive-alerts',
          provider: 'SLACK',
          url: 'https://hooks.slack.com/services/T000/B000/XXXXX',
          enabled: true,
          eventSubscriptions: ['PAYMENT', 'PROPOSAL', 'QUOTATION'],
          lastTriggeredAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
          lastStatus: 'SUCCESS',
          lastLatencyMs: 98,
          failureCount: 0,
          createdAt: '2026-08-05'
        },
        {
          id: 'WH-003',
          name: 'Fonnte WhatsApp Business Gateway',
          provider: 'FONNTE_WHATSAPP',
          url: 'https://api.fonnte.com/send',
          authToken: 'FONNTE_TOKEN_PROD_******',
          enabled: true,
          eventSubscriptions: ['NEW_LEAD', 'PAYMENT', 'SUPPORT_TICKET'],
          lastTriggeredAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          lastStatus: 'SUCCESS',
          lastLatencyMs: 230,
          failureCount: 0,
          createdAt: '2026-08-10'
        }
      ];
      localStorage.setItem(STORAGE_WEBHOOKS, JSON.stringify(defaultWebhooks));
      return defaultWebhooks;
    }
    return JSON.parse(raw);
  }

  public static saveWebhook(webhook: NotificationWebhookEndpoint): void {
    const list = this.getWebhooks();
    const idx = list.findIndex((w) => w.id === webhook.id);
    if (idx >= 0) {
      list[idx] = webhook;
    } else {
      list.push(webhook);
    }
    localStorage.setItem(STORAGE_WEBHOOKS, JSON.stringify(list));
  }

  public static deleteWebhook(id: string): void {
    const list = this.getWebhooks().filter((w) => w.id !== id);
    localStorage.setItem(STORAGE_WEBHOOKS, JSON.stringify(list));
  }

  public static async testWebhook(id: string): Promise<{ success: boolean; latencyMs: number; message: string }> {
    const list = this.getWebhooks();
    const item = list.find((w) => w.id === id);
    if (!item) return { success: false, latencyMs: 0, message: 'Webhook endpoint tidak ditemukan' };

    const startTime = performance.now();
    await new Promise((r) => setTimeout(r, Math.floor(120 + Math.random() * 200)));
    const latency = Math.round(performance.now() - startTime);

    item.lastTriggeredAt = new Date().toISOString();
    item.lastStatus = 'SUCCESS';
    item.lastLatencyMs = latency;
    this.saveWebhook(item);

    return {
      success: true,
      latencyMs: latency,
      message: `Ping webhook "${item.name}" berhasil dikirim (${latency}ms)!`
    };
  }

  // -------------------------------------------------------------
  // ADVANCED DEVELOPER: TEMPLATE OPERATIONS
  // -------------------------------------------------------------
  public static createCustomTemplate(tpl: Omit<NotificationTemplate, 'id' | 'updatedAt'>): NotificationTemplate {
    const list = this.getTemplates();
    const newTpl: NotificationTemplate = {
      ...tpl,
      id: `TPL-${Date.now().toString().slice(-4)}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    list.push(newTpl);
    localStorage.setItem(STORAGE_TEMPLATES, JSON.stringify(list));
    return newTpl;
  }

  public static deleteTemplate(id: string): boolean {
    let list = this.getTemplates();
    const initialLen = list.length;
    list = list.filter((t) => t.id !== id);
    if (list.length !== initialLen) {
      localStorage.setItem(STORAGE_TEMPLATES, JSON.stringify(list));
      return true;
    }
    return false;
  }

  public static resetDefaultTemplates(): void {
    localStorage.removeItem(STORAGE_TEMPLATES);
    this.initializeData();
  }

  // -------------------------------------------------------------
  // ADVANCED DEVELOPER: BROADCAST DISPATCHER
  // -------------------------------------------------------------
  public static broadcastNotification(params: {
    title: string;
    message: string;
    priority: NotificationPriority;
    targetRole?: AdminRole | 'ALL';
    channels: NotificationChannel[];
    actionUrl?: string;
    category?: string;
    metadata?: Record<string, any>;
  }): AppNotification {
    const created = this.createNotification({
      type: 'SYSTEM',
      title: params.title,
      message: params.message,
      priority: params.priority,
      targetRole: params.targetRole || 'ALL',
      channels: params.channels,
      actionUrl: params.actionUrl || '/admin',
      metadata: { ...params.metadata, isBroadcast: true, broadcastAt: new Date().toISOString() }
    });

    if (params.category) {
      created.category = params.category;
    }

    return created;
  }

  // -------------------------------------------------------------
  // ADVANCED DEVELOPER: LOG OPERATIONS & DIAGNOSTICS
  // -------------------------------------------------------------
  public static retryDeliveryLog(logId: string): boolean {
    const logs = this.getDeliveryLogs();
    const log = logs.find((l) => l.id === logId);
    if (!log) return false;

    log.status = 'DELIVERED';
    log.sentAt = new Date().toISOString();
    delete log.failureReason;
    localStorage.setItem(STORAGE_LOGS, JSON.stringify(logs));
    return true;
  }

  public static retryAllFailedLogs(): number {
    const logs = this.getDeliveryLogs();
    let fixed = 0;
    logs.forEach((l) => {
      if (l.status === 'FAILED') {
        l.status = 'DELIVERED';
        l.sentAt = new Date().toISOString();
        delete l.failureReason;
        fixed++;
      }
    });
    localStorage.setItem(STORAGE_LOGS, JSON.stringify(logs));
    return fixed;
  }

  public static clearDeliveryLogs(): void {
    localStorage.setItem(STORAGE_LOGS, JSON.stringify([]));
  }

  public static exportLogsJSON(): string {
    const logs = this.getDeliveryLogs();
    return JSON.stringify(logs, null, 2);
  }

  public static getQueueDiagnostics() {
    const notifs = this.getNotifications({ status: 'ALL' });
    const logs = this.getDeliveryLogs();
    const templates = this.getTemplates();
    const webhooks = this.getWebhooks();

    const notifsBytes = new Blob([localStorage.getItem(STORAGE_NOTIFICATIONS) || '']).size;
    const logsBytes = new Blob([localStorage.getItem(STORAGE_LOGS) || '']).size;
    const totalStorageKB = ((notifsBytes + logsBytes) / 1024).toFixed(2);

    const channelBreakdown = {
      IN_APP: logs.filter((l) => l.channel === 'IN_APP').length,
      EMAIL: logs.filter((l) => l.channel === 'EMAIL').length,
      WHATSAPP: logs.filter((l) => l.channel === 'WHATSAPP').length,
      PUSH: logs.filter((l) => l.channel === 'PUSH').length
    };

    return {
      totalNotifications: notifs.length,
      unreadCount: notifs.filter((n) => n.status === 'UNREAD').length,
      totalDeliveryLogs: logs.length,
      failedLogsCount: logs.filter((l) => l.status === 'FAILED').length,
      templateCount: templates.length,
      webhookCount: webhooks.length,
      activeWebhooksCount: webhooks.filter((w) => w.enabled).length,
      totalStorageKB,
      channelBreakdown
    };
  }
}
