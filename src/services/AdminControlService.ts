import {
  AdminUser,
  AdminRole,
  AdminPermission,
  RolePermissionMatrix,
  AdminNotification,
  AdminApprovalItem,
  AdminAuditLog,
  AdminSystemSettings,
  Customer
} from '../types';

import { LeadService } from './leadService';
import { CRMService } from './crmService';
import { ProjectService } from './ProjectService';
import { InvoiceService } from './InvoiceService';
import { ProposalDocumentService } from './proposalDocumentService';
import { QuotationDocumentService } from './QuotationDocumentService';
import { SupportTicketService } from './SupportTicketService';
import { BlogService } from './BlogService';
import { PortfolioService } from './PortfolioService';
import { SEOService } from './SEOService';
import { IndustrySolutionsService } from './IndustrySolutionsService';
import { PriceCatalogService } from './PriceCatalogService';
import { ActivityService } from './activityService';

const STORAGE_USERS = 'smart_ai_admin_users';
const STORAGE_NOTIFICATIONS = 'smart_ai_admin_notifications';
const STORAGE_APPROVALS = 'smart_ai_admin_approvals';
const STORAGE_AUDIT_LOGS = 'smart_ai_admin_audit_logs';
const STORAGE_SETTINGS = 'smart_ai_admin_settings';
const STORAGE_CUSTOMERS = 'smart_ai_admin_customers';

export class AdminControlService {
  // -------------------------------------------------------------
  // INITIALIZATION & MOCK DATA SEEDING
  // -------------------------------------------------------------
  public static initializeData(): void {
    if (!localStorage.getItem(STORAGE_USERS)) {
      const defaultUsers: AdminUser[] = [
        {
          id: 'USR-001',
          name: 'Jay Triyadi (Super Admin)',
          email: 'jtriyadi@gmail.com',
          role: 'SUPER_ADMIN',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          status: 'ACTIVE',
          department: 'Executive',
          phone: '+62 812 3456 7890',
          lastLogin: 'Hari ini, 09:15',
          createdAt: '2026-01-10'
        },
        {
          id: 'USR-002',
          name: 'Budi Santoso',
          email: 'budi.santoso@smart-ai.id',
          role: 'SALES',
          status: 'ACTIVE',
          department: 'Sales & Commercial',
          phone: '+62 813 9876 5432',
          lastLogin: 'Kemarin, 16:30',
          createdAt: '2026-02-01'
        },
        {
          id: 'USR-003',
          name: 'Siti Rahmawati',
          email: 'siti.rahma@smart-ai.id',
          role: 'PROJECT_MANAGER',
          status: 'ACTIVE',
          department: 'Delivery & Engineering',
          phone: '+62 811 2233 4455',
          lastLogin: 'Hari ini, 08:45',
          createdAt: '2026-02-15'
        },
        {
          id: 'USR-004',
          name: 'Dewi Lestari',
          email: 'dewi.lestari@smart-ai.id',
          role: 'FINANCE',
          status: 'ACTIVE',
          department: 'Finance & Accounting',
          phone: '+62 815 6677 8899',
          lastLogin: '12 Aug 2026',
          createdAt: '2026-03-01'
        },
        {
          id: 'USR-005',
          name: 'Rian Pratama',
          email: 'rian.pratama@smart-ai.id',
          role: 'CONTENT_MANAGER',
          status: 'ACTIVE',
          department: 'Marketing & SEO',
          phone: '+62 817 1122 3344',
          lastLogin: 'Hari ini, 10:00',
          createdAt: '2026-03-10'
        },
        {
          id: 'USR-006',
          name: 'Agus Setiawan',
          email: 'agus.setiawan@smart-ai.id',
          role: 'SUPPORT',
          status: 'ACTIVE',
          department: 'Client Support & SLA',
          phone: '+62 818 9900 1122',
          lastLogin: 'Hari ini, 07:30',
          createdAt: '2026-04-01'
        }
      ];
      localStorage.setItem(STORAGE_USERS, JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem(STORAGE_NOTIFICATIONS)) {
      const defaultNotifs: AdminNotification[] = [
        {
          id: 'NOTIF-001',
          title: 'Lead Baru Masuk',
          message: 'PT Nusantara Mining Energy mengirimkan permintaan "Fleet Tracking & Fuel OCR".',
          type: 'LEAD',
          status: 'UNREAD',
          link: '/admin/leads',
          timestamp: '10 menit lalu'
        },
        {
          id: 'NOTIF-002',
          title: 'Proposal Disetujui Client',
          message: 'RS Medika Sejahtera menyetujui proposal "Queue AI & Medical Records V2".',
          type: 'PROPOSAL',
          status: 'UNREAD',
          link: '/admin/proposals',
          timestamp: '1 jam lalu'
        },
        {
          id: 'NOTIF-003',
          title: 'Pembayaran Invoice Diterima',
          message: 'Invoice INV-2026-0001 (PT Sawit Makmur) senilai Rp 120.000.000 telah LUNAS.',
          type: 'INVOICE',
          status: 'READ',
          link: '/admin/invoices',
          timestamp: 'Kemarin'
        },
        {
          id: 'NOTIF-004',
          title: 'Critical Ticket Dibuka',
          message: 'Ticket #TCK-902 (Integrasi API WhatsApp Down) membutuhkan penanganan segera.',
          type: 'TICKET',
          status: 'UNREAD',
          link: '/admin/support',
          timestamp: '3 jam lalu'
        }
      ];
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(defaultNotifs));
    }

    if (!localStorage.getItem(STORAGE_APPROVALS)) {
      const defaultApprovals: AdminApprovalItem[] = [
        {
          id: 'APP-001',
          itemType: 'PROPOSAL',
          title: 'Proposal AI Fleet Telemetry - PT Nusantara Mining',
          requestedBy: 'Budi Santoso (Sales)',
          requestedAt: '2026-08-14 14:30',
          status: 'REVIEW',
          dataRefId: 'PROP-2026-001',
          notes: 'Membutuhkan persetujuan potongan harga khusus 5% untuk kontrak tahunan.'
        },
        {
          id: 'APP-002',
          itemType: 'QUOTATION',
          title: 'Quotation QTN-2026-000002 - RS Medika Sejahtera',
          requestedBy: 'Budi Santoso (Sales)',
          requestedAt: '2026-08-13 11:00',
          status: 'REVIEW',
          dataRefId: 'QTN-2026-000002',
          notes: 'Quotation kustom pengembangan modul OCR rekam medis AI.'
        },
        {
          id: 'APP-003',
          itemType: 'CONTENT',
          title: 'Artikel Blog: Panduan Implementasi LLM Llama-3 pada Enterprise',
          requestedBy: 'Rian Pratama (Content Manager)',
          requestedAt: '2026-08-12 16:00',
          status: 'REVIEW',
          dataRefId: 'BLOG-003',
          notes: 'Pemeriksaan teknis oleh Solution Architect sebelum publish.'
        }
      ];
      localStorage.setItem(STORAGE_APPROVALS, JSON.stringify(defaultApprovals));
    }

    if (!localStorage.getItem(STORAGE_AUDIT_LOGS)) {
      const defaultLogs: AdminAuditLog[] = [
        {
          id: 'LOG-001',
          userId: 'USR-001',
          userName: 'Jay Triyadi',
          userRole: 'SUPER_ADMIN',
          action: 'LOGIN',
          module: 'SYSTEM',
          details: 'Admin login berhasil dari IP 180.252.88.10',
          timestamp: '2026-08-15 09:15:00',
          ipAddress: '180.252.88.10'
        },
        {
          id: 'LOG-002',
          userId: 'USR-002',
          userName: 'Budi Santoso',
          userRole: 'SALES',
          action: 'CREATE',
          module: 'PROPOSAL',
          recordId: 'PROP-2026-001',
          recordName: 'Proposal AI Fleet Telemetry',
          details: 'Membuat draf proposal baru untuk PT Nusantara Mining Energy.',
          timestamp: '2026-08-14 14:28:00'
        },
        {
          id: 'LOG-003',
          userId: 'USR-004',
          userName: 'Dewi Lestari',
          userRole: 'FINANCE',
          action: 'PAYMENT_RECORD',
          module: 'INVOICE',
          recordId: 'INV-2026-0001',
          recordName: 'Invoice PT Sawit Makmur',
          details: 'Mencatat pembayaran masuk Rp 120.000.000 via Transfer BCA.',
          timestamp: '2026-08-14 10:15:00'
        }
      ];
      localStorage.setItem(STORAGE_AUDIT_LOGS, JSON.stringify(defaultLogs));
    }

    if (!localStorage.getItem(STORAGE_SETTINGS)) {
      const defaultSettings: AdminSystemSettings = {
        company: {
          companyName: 'PT SMART AI INDONESIA',
          logoUrl: '/favicon.ico',
          faviconUrl: '/favicon.ico',
          brandName: 'SMART-AI.ID',
          defaultOgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
          address: 'Cyber 2 Tower, Lt. 18, Jl. H. R. Rasuna Said, Kuningan, Jakarta Selatan 12950',
          email: 'contact@smart-ai.id',
          phone: '+62 21 5088 9000',
          website: 'https://www.smart-ai.id',
          taxInformation: 'NPWP: 01.234.567.8-012.000',
          bankInformation: 'Bank BCA KCP Rasuna Said - A/C 888-099-2345 a.n. PT SMART AI INDONESIA'
        },
        branding: {
          logo: '/favicon.ico',
          favicon: '/favicon.ico',
          brandName: 'SMART-AI.ID',
          defaultOgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
        },
        notifications: {
          emailEnabled: true,
          whatsappEnabled: true,
          inAppEnabled: true,
          leadNotifyEmail: 'sales@smart-ai.id',
          invoiceNotifyEmail: 'finance@smart-ai.id'
        },
        aiConfig: {
          provider: 'Google AI Studio / Gemini Proxy',
          model: 'gemini-2.5-flash',
          temperature: 0.2,
          maxTokens: 8192,
          systemPrompt: 'Anda adalah Senior AI Solution Architect untuk SMART-AI.ID...',
          maskedApiKey: 'AIzaSy********************'
        },
        security: {
          sessionTimeoutMinutes: 120,
          mfaRequired: false,
          passwordMinLength: 8
        }
      };
      localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(defaultSettings));
    }

    if (!localStorage.getItem(STORAGE_CUSTOMERS)) {
      const defaultCustomers: Customer[] = [
        {
          id: 'CUST-001',
          companyName: 'PT Nusantara Mining Energy',
          contactPerson: 'Hendra Gunawan',
          email: 'hendra@nusantaramining.co.id',
          phone: '+62 812 9988 7766',
          industry: 'Pertambangan',
          status: 'ACTIVE_CLIENT',
          totalProjects: 2,
          createdAt: '2026-01-15'
        },
        {
          id: 'CUST-002',
          companyName: 'RS Medika Sejahtera Utama',
          contactPerson: 'dr. Anita Wijaya, M.Kes',
          email: 'anita@medikasejahtera.com',
          phone: '+62 811 4455 6677',
          industry: 'Kesehatan / Rumah Sakit',
          status: 'ACTIVE_CLIENT',
          totalProjects: 1,
          createdAt: '2026-02-10'
        },
        {
          id: 'CUST-003',
          companyName: 'PT Sawit Makmur Indah',
          contactPerson: 'Bambang Kusuma',
          email: 'bambang@sawitmakmur.co.id',
          phone: '+62 813 1122 3344',
          industry: 'Perkebunan',
          status: 'ACTIVE_CLIENT',
          totalProjects: 1,
          createdAt: '2026-03-01'
        },
        {
          id: 'CUST-004',
          companyName: 'PT Bank Fintek Indonesia',
          contactPerson: 'Surya Setiadi',
          email: 'surya@fintekbank.id',
          phone: '+62 815 7788 9900',
          industry: 'Personal Finance & Banking',
          status: 'PROSPECT',
          totalProjects: 0,
          createdAt: '2026-04-12'
        }
      ];
      localStorage.setItem(STORAGE_CUSTOMERS, JSON.stringify(defaultCustomers));
    }
  }

  // -------------------------------------------------------------
  // DASHBOARD OVERVIEW DATA AGGREGATION
  // -------------------------------------------------------------
  public static getDashboardOverview(period: '7d' | '30d' | '90d' | '12m' = '30d') {
    this.initializeData();

    // Pull real datasets from services
    const leads = LeadService.getLeadsLocal();
    const crmOpportunities = CRMService.getOpportunities();
    const projects = ProjectService.getAllProjects();
    const invoices = InvoiceService.getAllInvoices();
    const proposals = ProposalDocumentService.getAllProposals();
    const quotations = QuotationDocumentService.getAllQuotations();
    const tickets = SupportTicketService.getTickets();

    // Stats calculations
    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const activeCustomers = this.getCustomers().filter((c) => c.status === 'ACTIVE_CLIENT').length;
    const activeProjects = projects.filter((p) => p.status === 'DEVELOPMENT' || p.status === 'TESTING' || p.status === 'PLANNING').length;
    const pendingProposals = proposals.filter((pr) => pr.status === 'SENT' || pr.status === 'VIEWED' || pr.status === 'IN REVIEW').length;

    // Financial calculations
    const outstandingInvoices = invoices.filter((i) => i.status === 'SENT' || i.status === 'PARTIALLY_PAID' || i.status === 'OVERDUE');
    const totalOutstandingAmount = outstandingInvoices.reduce((sum, inv) => sum + (inv.outstandingAmount || (inv.grandTotal - (inv.paidAmount || 0))), 0);

    const paidInvoices = invoices.filter((i) => i.status === 'PAID');
    const totalMonthlyRevenue = paidInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0);

    const openTickets = tickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS' || t.status === 'TESTING').length;

    // Pipeline Stage counts
    const pipelineCounts = {
      NEW: crmOpportunities.filter((o) => o.stage === 'NEW').length + leads.filter((l) => l.status === 'New').length,
      CONTACTED: crmOpportunities.filter((o) => o.stage === 'CONTACTED').length + leads.filter((l) => l.status === 'Contacted').length,
      QUALIFIED: crmOpportunities.filter((o) => o.stage === 'QUALIFIED').length + leads.filter((l) => l.status === 'Qualified').length,
      PROPOSAL: crmOpportunities.filter((o) => o.stage === 'PROPOSAL').length + proposals.length,
      NEGOTIATION: crmOpportunities.filter((o) => o.stage === 'NEGOTIATION').length,
      WON: crmOpportunities.filter((o) => o.stage === 'WON').length,
      LOST: crmOpportunities.filter((o) => o.stage === 'LOST').length
    };

    // Project Health Counts
    const projectHealth = {
      ON_TRACK: projects.filter((p) => p.health === 'ON_TRACK' || !p.health).length,
      AT_RISK: projects.filter((p) => p.health === 'AT_RISK').length,
      DELAYED: projects.filter((p) => p.health === 'DELAYED').length,
      COMPLETED: projects.filter((p) => p.status === 'COMPLETED').length
    };

    // Support Tickets Summary
    const supportSummary = {
      OPEN: tickets.filter((t) => t.status === 'OPEN').length,
      IN_PROGRESS: tickets.filter((t) => t.status === 'IN_PROGRESS').length,
      TESTING: tickets.filter((t) => t.status === 'TESTING').length,
      RESOLVED: tickets.filter((t) => t.status === 'RESOLVED' || t.status === 'CLOSED').length
    };

    // Invoice Summary
    const invoiceSummary = {
      PAID: invoices.filter((i) => i.status === 'PAID').length,
      PARTIALLY_PAID: invoices.filter((i) => i.status === 'PARTIALLY_PAID').length,
      OUTSTANDING: invoices.filter((i) => i.status === 'SENT').length,
      OVERDUE: invoices.filter((i) => i.status === 'OVERDUE').length
    };

    return {
      kpis: {
        totalLeads,
        newLeads,
        activeCustomers,
        activeProjects,
        pendingProposals,
        outstandingInvoicesCount: outstandingInvoices.length,
        totalOutstandingAmount,
        openTickets,
        totalMonthlyRevenue,
        comparison: {
          leadGrowth: '+18.4%',
          revenueGrowth: '+24.1%',
          projectDeliveryRate: '96.5%'
        }
      },
      pipelineCounts,
      projectHealth,
      supportSummary,
      invoiceSummary,
      recentLeads: leads.slice(0, 5),
      recentProjects: projects.slice(0, 5),
      recentProposals: proposals.slice(0, 5),
      recentInvoices: invoices.slice(0, 5),
      aiTelemetry: {
        totalAiRequests: 1420,
        appBuilderSessions: 380,
        requirementAnalyses: 210,
        proposalsGenerated: 85,
        salesAnalyses: 145,
        chatbotConversations: 600,
        successRate: '99.4%',
        avgResponseTime: '1.2s'
      },
      aiInsight:
        'Aktivitas generasi proposal AI meningkat 32% bulan ini. Kualifikasi lead sektor Pertambangan & Kesehatan memiliki konversi tertinggi ke tahap Kontrak.',
      alerts: [
        { id: 'AL-1', type: 'INVOICE', text: '1 Invoice Overdue dari PT Sawit Makmur Indah (INV-2026-0003)', level: 'HIGH' },
        { id: 'AL-2', type: 'PROJECT', text: '1 Project "Fleet Tracking IoT" mendekati deadline milestone 2', level: 'MEDIUM' },
        { id: 'AL-3', type: 'TICKET', text: '1 Critical Ticket #TCK-902 memerlukan respon SLA dalam 30 menit', level: 'CRITICAL' }
      ]
    };
  }

  // -------------------------------------------------------------
  // GLOBAL COMMAND CENTER SEARCH (CTRL + K)
  // -------------------------------------------------------------
  public static globalSearch(query: string) {
    if (!query || query.trim().length === 0) return { leads: [], customers: [], projects: [], documents: [], content: [] };
    const q = query.toLowerCase().trim();

    const leads = LeadService.getLeadsLocal().filter((l) => l.company?.toLowerCase().includes(q) || l.name?.toLowerCase().includes(q) || l.industry?.toLowerCase().includes(q));
    const customers = this.getCustomers().filter((c) => c.companyName.toLowerCase().includes(q) || c.contactPerson.toLowerCase().includes(q));
    const projects = ProjectService.getAllProjects().filter((p) => p.projectName.toLowerCase().includes(q) || p.customerName?.toLowerCase().includes(q));
    
    const proposals = ProposalDocumentService.getAllProposals().filter((p) => p.proposalNumber.toLowerCase().includes(q) || p.title.toLowerCase().includes(q));
    const quotations = QuotationDocumentService.getAllQuotations().filter((qt) => qt.quotationNumber.toLowerCase().includes(q) || qt.projectName.toLowerCase().includes(q));
    const invoices = InvoiceService.getAllInvoices().filter((inv) => inv.invoiceNumber.toLowerCase().includes(q) || inv.companyName.toLowerCase().includes(q));

    const documents = [
      ...proposals.map((p) => ({ id: p.id, title: `${p.proposalNumber} - ${p.title}`, type: 'Proposal', link: `/admin/proposals/${p.id}` })),
      ...quotations.map((qt) => ({ id: qt.id, title: `${qt.quotationNumber} - ${qt.projectName}`, type: 'Quotation', link: `/admin/quotations/${qt.id}` })),
      ...invoices.map((inv) => ({ id: inv.id, title: `${inv.invoiceNumber} - ${inv.companyName}`, type: 'Invoice', link: `/admin/invoices/${inv.id}` }))
    ];

    const articles = BlogService.getArticles().filter((a) => a.title.toLowerCase().includes(q) || a.tags?.some((t) => t.toLowerCase().includes(q)));
    const content = articles.map((a) => ({ id: a.id, title: a.title, type: 'Blog Article', link: `/blog/${a.slug}` }));

    return {
      leads: leads.map((l) => ({ id: l.id, title: `${l.company} (${l.name})`, type: 'Lead', link: `/admin/leads` })),
      customers: customers.map((c) => ({ id: c.id, title: `${c.companyName} - ${c.contactPerson}`, type: 'Customer', link: `/admin/customers` })),
      projects: projects.map((p) => ({ id: p.id, title: p.projectName, type: 'Project', link: `/admin/projects/${p.id}` })),
      documents,
      content
    };
  }

  // -------------------------------------------------------------
  // CUSTOMERS MANAGEMENT
  // -------------------------------------------------------------
  public static getCustomers(): Customer[] {
    this.initializeData();
    try {
      const raw = localStorage.getItem(STORAGE_CUSTOMERS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static saveCustomer(data: Partial<Customer>): Customer {
    this.initializeData();
    const customers = this.getCustomers();
    if (data.id) {
      const idx = customers.findIndex((c) => c.id === data.id);
      if (idx !== -1) {
        customers[idx] = { ...customers[idx], ...data };
      }
    } else {
      const newCust: Customer = {
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        companyName: data.companyName || 'PT Perusahaan Baru',
        contactPerson: data.contactPerson || 'Nama Kontak',
        email: data.email || 'email@company.com',
        phone: data.phone || '+62 812 0000 0000',
        industry: data.industry || 'Enterprise',
        status: data.status || 'ACTIVE_CLIENT',
        totalProjects: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      customers.unshift(newCust);
      this.logAudit('CREATE', 'CUSTOMER', newCust.id, newCust.companyName, 'Membuat record customer baru');
      localStorage.setItem(STORAGE_CUSTOMERS, JSON.stringify(customers));
      return newCust;
    }
    localStorage.setItem(STORAGE_CUSTOMERS, JSON.stringify(customers));
    return customers.find((c) => c.id === data.id)!;
  }

  // -------------------------------------------------------------
  // USER & RBAC MANAGEMENT
  // -------------------------------------------------------------
  public static getUsers(): AdminUser[] {
    this.initializeData();
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static saveUser(user: Partial<AdminUser>): AdminUser {
    this.initializeData();
    const users = this.getUsers();
    if (user.id) {
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...user };
        this.logAudit('UPDATE', 'USER', user.id, user.name, `Memperbarui role/status user ke ${user.role}`);
      }
    } else {
      const newUser: AdminUser = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: user.name || 'User Baru',
        email: user.email || 'user@smart-ai.id',
        role: user.role || 'SALES',
        status: 'ACTIVE',
        department: user.department || 'General',
        phone: user.phone || '+62 800 0000 0000',
        createdAt: new Date().toISOString().split('T')[0]
      };
      users.unshift(newUser);
      this.logAudit('CREATE', 'USER', newUser.id, newUser.name, `Membuat user admin baru role ${newUser.role}`);
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
      return newUser;
    }
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    return users.find((u) => u.id === user.id)!;
  }

  public static toggleUserStatus(userId: string): void {
    const users = this.getUsers();
    const user = users.find((u) => u.id === userId);
    if (user) {
      user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
      this.logAudit('STATUS_CHANGE', 'USER', user.id, user.name, `Status user diubah ke ${user.status}`);
    }
  }

  public static getPermissionMatrix(): RolePermissionMatrix[] {
    const roles: AdminRole[] = [
      'SUPER_ADMIN',
      'ADMIN',
      'SALES',
      'PROJECT_MANAGER',
      'DEVELOPER',
      'CONTENT_MANAGER',
      'FINANCE',
      'SUPPORT',
      'ANALYST'
    ];

    const allPerms: AdminPermission[] = ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'APPROVE', 'PUBLISH', 'EXPORT'];

    return roles.map((r) => {
      if (r === 'SUPER_ADMIN') {
        return {
          role: r,
          modulePermissions: {
            Leads: allPerms,
            CRM: allPerms,
            Customers: allPerms,
            Projects: allPerms,
            Services: allPerms,
            Industries: allPerms,
            Portfolio: allPerms,
            Blog: allPerms,
            Proposals: allPerms,
            Quotations: allPerms,
            Invoices: allPerms,
            Support: allPerms,
            AI: allPerms,
            Users: allPerms,
            Settings: allPerms
          }
        };
      }
      if (r === 'SALES') {
        return {
          role: r,
          modulePermissions: {
            Leads: ['VIEW', 'CREATE', 'EDIT', 'EXPORT'],
            CRM: ['VIEW', 'CREATE', 'EDIT'],
            Customers: ['VIEW'],
            Proposals: ['VIEW', 'CREATE', 'EDIT'],
            Quotations: ['VIEW', 'CREATE', 'EDIT']
          }
        };
      }
      if (r === 'FINANCE') {
        return {
          role: r,
          modulePermissions: {
            Invoices: allPerms,
            Quotations: ['VIEW', 'APPROVE'],
            Proposals: ['VIEW'],
            Customers: ['VIEW']
          }
        };
      }
      if (r === 'CONTENT_MANAGER') {
        return {
          role: r,
          modulePermissions: {
            Blog: allPerms,
            Portfolio: allPerms,
            Services: ['VIEW', 'EDIT'],
            Industries: ['VIEW', 'EDIT'],
            SEO: allPerms
          }
        };
      }
      if (r === 'PROJECT_MANAGER') {
        return {
          role: r,
          modulePermissions: {
            Projects: allPerms,
            Customers: ['VIEW'],
            Support: ['VIEW', 'EDIT']
          }
        };
      }
      return {
        role: r,
        modulePermissions: {
          Dashboard: ['VIEW']
        }
      };
    });
  }

  // -------------------------------------------------------------
  // APPROVALS CENTER
  // -------------------------------------------------------------
  public static getApprovals(): AdminApprovalItem[] {
    this.initializeData();
    try {
      const raw = localStorage.getItem(STORAGE_APPROVALS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static updateApprovalStatus(id: string, status: 'APPROVED' | 'REJECTED', notes?: string) {
    const items = this.getApprovals();
    const item = items.find((i) => i.id === id);
    if (item) {
      item.status = status;
      if (notes) item.notes = notes;
      localStorage.setItem(STORAGE_APPROVALS, JSON.stringify(items));
      this.logAudit('APPROVAL', item.itemType, item.id, item.title, `Persetujuan diubah ke ${status}`);
    }
  }

  // -------------------------------------------------------------
  // NOTIFICATIONS CENTER
  // -------------------------------------------------------------
  public static getNotifications(): AdminNotification[] {
    this.initializeData();
    try {
      const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static markNotificationRead(id: string) {
    const notifs = this.getNotifications();
    const notif = notifs.find((n) => n.id === id);
    if (notif) {
      notif.status = 'READ';
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(notifs));
    }
  }

  public static markAllNotificationsRead() {
    const notifs = this.getNotifications().map((n) => ({ ...n, status: 'READ' as const }));
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(notifs));
  }

  // -------------------------------------------------------------
  // SYSTEM SETTINGS
  // -------------------------------------------------------------
  public static getSettings(): AdminSystemSettings {
    this.initializeData();
    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS);
      return raw ? JSON.parse(raw) : ({} as AdminSystemSettings);
    } catch {
      return {} as AdminSystemSettings;
    }
  }

  public static saveSettings(newSettings: AdminSystemSettings): void {
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(newSettings));
    this.logAudit('SETTINGS_UPDATE', 'SYSTEM', 'GLOBAL', 'System Settings', 'Konfigurasi enterprise sistem diperbarui.');
  }

  // -------------------------------------------------------------
  // AUDIT LOG & ACTIVITY TRAIL
  // -------------------------------------------------------------
  public static getAuditLogs(): AdminAuditLog[] {
    this.initializeData();
    try {
      const raw = localStorage.getItem(STORAGE_AUDIT_LOGS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static logAudit(
    action: string,
    module: string,
    recordId?: string,
    recordName?: string,
    details?: string
  ) {
    this.initializeData();
    const logs = this.getAuditLogs();
    const newLog: AdminAuditLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: 'USR-001',
      userName: 'Jay Triyadi',
      userRole: 'SUPER_ADMIN',
      action,
      module,
      recordId,
      recordName,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '180.252.88.10'
    };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_AUDIT_LOGS, JSON.stringify(logs.slice(0, 200)));
  }
}
