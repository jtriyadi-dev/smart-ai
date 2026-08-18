import {
  Ticket,
  TicketMessage,
  TicketAttachment,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  TicketResolution,
  TicketSatisfaction,
  SupportAgent,
  SupportSLAPolicy,
  SupportCategoryConfig,
  SupportSystemSettings,
  KnowledgeBaseArticle,
  SLAStatus
} from '../types';

const STORAGE_TICKETS = 'smart_ai_support_tickets';
const STORAGE_AGENTS = 'smart_ai_support_agents';
const STORAGE_SLA_POLICIES = 'smart_ai_support_sla_policies';
const STORAGE_CATEGORIES = 'smart_ai_support_categories';
const STORAGE_SETTINGS = 'smart_ai_support_settings';
const STORAGE_KB_ARTICLES = 'smart_ai_support_kb_articles';

export class SupportTicketService {
  /**
   * Helper to format status display label for customer vs admin
   */
  public static getCustomerStatusLabel(status: TicketStatus): string {
    switch (status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'WAITING_FOR_CUSTOMER':
      case 'WAITING_CUSTOMER':
        return 'Waiting for Your Response';
      case 'WAITING_FOR_INTERNAL':
        return 'Waiting for Support Team';
      case 'TESTING':
        return 'Testing';
      case 'RESOLVED':
        return 'Resolved';
      case 'CLOSED':
        return 'Closed';
      case 'REOPENED':
        return 'Reopened';
      default:
        return status;
    }
  }

  /**
   * Helper to format category display label
   */
  public static getCategoryLabel(category: TicketCategory): string {
    switch (category) {
      case 'BUG_REPORT':
      case 'Bug':
        return 'Bug Report';
      case 'TECHNICAL_SUPPORT':
      case 'Technical Support':
        return 'Technical Support';
      case 'FEATURE_REQUEST':
      case 'Feature Request':
        return 'Feature Request';
      case 'ACCOUNT_ISSUE':
      case 'Account':
        return 'Account Issue';
      case 'BILLING_ISSUE':
      case 'Billing':
        return 'Billing Issue';
      default:
        return category;
    }
  }

  /**
   * Initialize default seed datasets if empty
   */
  public static initialize(): void {
    // 1. System Settings
    if (!localStorage.getItem(STORAGE_SETTINGS)) {
      const defaultSettings: SupportSystemSettings = {
        ticketPrefix: 'SAI-TKT',
        numberFormat: 'SAI-TKT-2026-{6DIGITS}',
        autoCloseDays: 7,
        enableAutoClose: false,
        enableAutoAssignment: false,
        enableMalwareScan: true,
        allowedFileTypes: ['.png', '.jpg', '.jpeg', '.pdf', '.docx', '.txt', '.log', '.zip', '.mp4'],
        maxFileSizeMb: 25,
        whatsappSupportNumber: '+6285187869164',
        businessHours: 'Monday–Friday 08:00–17:00 WIB'
      };
      localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(defaultSettings));
    }

    // 2. Categories
    if (!localStorage.getItem(STORAGE_CATEGORIES)) {
      const defaultCategories: SupportCategoryConfig[] = [
        {
          id: 'CAT-1',
          code: 'BUG_REPORT',
          name: 'Bug Report',
          description: 'Pelaporan kendala visual, fungsi error, atau system crash pada aplikasi.',
          recommendedRole: 'DEVELOPER',
          active: true
        },
        {
          id: 'CAT-2',
          code: 'TECHNICAL_SUPPORT',
          name: 'Technical Support',
          description: 'Bantuan konfigurasi, integrasi API, koneksi IoT, atau performa server.',
          recommendedRole: 'SUPPORT_AGENT',
          active: true
        },
        {
          id: 'CAT-3',
          code: 'FEATURE_REQUEST',
          name: 'Feature Request',
          description: 'Pengajuan modifikasi fitur baru atau penambahan alur kerja aplikasi.',
          recommendedRole: 'PROJECT_MANAGER',
          active: true
        },
        {
          id: 'CAT-4',
          code: 'ACCOUNT_ISSUE',
          name: 'Account Issue',
          description: 'Masalah hak akses user, aktivasi akun, verifikasi email & otorisasi.',
          recommendedRole: 'SUPPORT_AGENT',
          active: true
        },
        {
          id: 'CAT-5',
          code: 'BILLING_ISSUE',
          name: 'Billing Issue',
          description: 'Pertanyaan tagihan invoice, konfirmasi pembayaran & masalah kwitansi.',
          recommendedRole: 'FINANCE_SPECIALIST',
          active: true
        }
      ];
      localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(defaultCategories));
    }

    // 3. SLA Policies
    if (!localStorage.getItem(STORAGE_SLA_POLICIES)) {
      const defaultPolicies: SupportSLAPolicy[] = [
        {
          id: 'SLA-1',
          name: 'Low Priority SLA',
          priority: 'LOW',
          responseTimeTargetHours: 24,
          resolutionTimeTargetHours: 72,
          businessHours: 'Monday–Friday 08:00–17:00 WIB',
          active: true
        },
        {
          id: 'SLA-2',
          name: 'Medium Priority SLA',
          priority: 'MEDIUM',
          responseTimeTargetHours: 12,
          resolutionTimeTargetHours: 48,
          businessHours: 'Monday–Friday 08:00–17:00 WIB',
          active: true
        },
        {
          id: 'SLA-3',
          name: 'High Priority SLA',
          priority: 'HIGH',
          responseTimeTargetHours: 4,
          resolutionTimeTargetHours: 24,
          businessHours: 'Monday–Friday 08:00–17:00 WIB',
          active: true
        },
        {
          id: 'SLA-4',
          name: 'Urgent Critical SLA',
          priority: 'URGENT',
          responseTimeTargetHours: 1,
          resolutionTimeTargetHours: 8,
          businessHours: '24/7 Priority Emergency Support',
          active: true
        }
      ];
      localStorage.setItem(STORAGE_SLA_POLICIES, JSON.stringify(defaultPolicies));
    }

    // 4. Support Agents
    if (!localStorage.getItem(STORAGE_AGENTS)) {
      const defaultAgents: SupportAgent[] = [
        {
          id: 'SUP-001',
          userId: 'ADMIN-001',
          name: 'Budi Santoso',
          email: 'budi.santoso@smart-ai.id',
          role: 'PROJECT_MANAGER',
          skills: ['Technical', 'Bug', 'Feature', 'IoT', 'Mining'],
          activeStatus: 'AVAILABLE',
          currentWorkload: 2,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          phone: '+6281298765432'
        },
        {
          id: 'SUP-002',
          userId: 'DEV-001',
          name: 'Ahmad Tech Lead',
          email: 'ahmad@smart-ai.id',
          role: 'DEVELOPER',
          skills: ['Bug', 'React', 'Node.js', 'PostgreSQL', 'API'],
          activeStatus: 'AVAILABLE',
          currentWorkload: 3,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        },
        {
          id: 'SUP-003',
          userId: 'FIN-001',
          name: 'Dian Finance Support',
          email: 'finance@smart-ai.id',
          role: 'FINANCE_SPECIALIST',
          skills: ['Billing', 'Invoice', 'Payment'],
          activeStatus: 'AVAILABLE',
          currentWorkload: 1
        },
        {
          id: 'SUP-004',
          userId: 'QA-001',
          name: 'Maya QA Engine',
          email: 'maya.qa@smart-ai.id',
          role: 'SUPPORT_AGENT',
          skills: ['Bug', 'Account', 'Testing', 'UAT'],
          activeStatus: 'AVAILABLE',
          currentWorkload: 1
        }
      ];
      localStorage.setItem(STORAGE_AGENTS, JSON.stringify(defaultAgents));
    }

    // 5. Knowledge Base Articles
    if (!localStorage.getItem(STORAGE_KB_ARTICLES)) {
      const defaultArticles: KnowledgeBaseArticle[] = [
        {
          id: 'KB-001',
          title: 'Cara Mengatur Hak Akses User dalam Customer Portal',
          slug: 'cara-mengatur-hak-akses-user',
          category: 'Account',
          content: 'Untuk menambahkan atau mengubah hak akses anggota tim perusahaan Anda di Customer Portal SMART-AI.ID:\n1. Buka menu **Company Profile** di Customer Portal.\n2. Pilih tab **Team & Access Management**.\n3. Klik tombol **Invite New Member** atau pilih ikon edit pada user existing.\n4. Tentukan Role: CUSTOMER_ADMIN, CUSTOMER_PM, CUSTOMER_FINANCE, atau CUSTOMER_VIEWER.\n5. Simpan perubahan. Undangan email akan otomatis dikirimkan.',
          tags: ['Account', 'Permission', 'User Management', 'Portal'],
          status: 'PUBLISHED',
          visibility: 'CUSTOMER_VISIBLE',
          views: 142,
          helpfulCount: 38,
          unhelpfulCount: 1,
          authorName: 'Budi Santoso',
          createdAt: '2026-08-01T10:00:00Z',
          updatedAt: '2026-08-10T14:00:00Z'
        },
        {
          id: 'KB-002',
          title: 'Panduan Kalibrasi Feed Sensor Telemetry Alat Berat IoT',
          slug: 'panduan-kalibrasi-sensor-telemetry-iot',
          category: 'Technical',
          content: 'Jika data konsumsi bahan bakar atau GPS telemetry di dashboard menunjukkan noise/spike:\n1. Pastikan modul gateway MQTT pada unit terhubung ke endpoint `mqtt.smart-ai.id:8883` via SSL.\n2. Periksa frekuensi ping sensor (disarankan interval 5.000 ms).\n3. Gunakan fitur **Moving Average Noise Filter** pada setting modul Telemetry.\n4. Jika kendala berlanjut, buat Support Ticket kategori **Technical Support** dengan menyertakan log file MQTT.',
          tags: ['IoT', 'Telemetry', 'Sensor', 'Calibration', 'MQTT'],
          status: 'PUBLISHED',
          visibility: 'CUSTOMER_VISIBLE',
          views: 98,
          helpfulCount: 24,
          unhelpfulCount: 0,
          authorName: 'Ahmad Tech Lead',
          createdAt: '2026-08-05T11:00:00Z',
          updatedAt: '2026-08-12T09:00:00Z'
        },
        {
          id: 'KB-003',
          title: 'Prosedur Pembayaran Invoice via Virtual Account & Transfer Bank',
          slug: 'prosedur-pembayaran-invoice-va-bank',
          category: 'Billing',
          content: 'Pembayaran invoice resmi SMART-AI.ID dilakukan melalui:\n1. Buka menu **Invoices & Billing** di Customer Portal.\n2. Pilih invoice berstatus **UNPAID**.\n3. Klik **Pay Now** untuk memilih metode Virtual Account (BCA, Mandiri, BNI, BRI) atau Transfer Bank Manual.\n4. Konfirmasi pembayaran otomatis terekam dalam waktu 1-3 menit setelah transfer berhasil.',
          tags: ['Invoice', 'Payment', 'Virtual Account', 'Billing'],
          status: 'PUBLISHED',
          visibility: 'CUSTOMER_VISIBLE',
          views: 210,
          helpfulCount: 65,
          unhelpfulCount: 2,
          authorName: 'Dian Finance Support',
          createdAt: '2026-08-02T08:00:00Z',
          updatedAt: '2026-08-11T16:00:00Z'
        }
      ];
      localStorage.setItem(STORAGE_KB_ARTICLES, JSON.stringify(defaultArticles));
    }

    // 6. Tickets
    if (!localStorage.getItem(STORAGE_TICKETS)) {
      const now = new Date();
      const defaultTickets: Ticket[] = [
        {
          id: 'TCK-2026-000001',
          ticketNumber: 'SAI-TKT-2026-000001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          customerUserId: 'CUSER-001',
          customerUserName: 'Hendra Wijaya',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          moduleId: 'MOD-1',
          moduleName: 'IoT Telemetry & Sensor Tracking',
          category: 'BUG_REPORT',
          priority: 'HIGH',
          status: 'IN_PROGRESS',
          subject: 'Spike Anomaly Anomali Sensor Telemetry Bahan Bakar CAT 777',
          description: 'Data konsumsi bahan bakar pada unit CAT 777-B12 menunjukkan lonjakan spike tidak teratur di dashboard pada jam 14:00 WITA. Mohon verifikasi filter smoothing noise data feed.',
          assignedTo: 'Ahmad Tech Lead',
          assigneeId: 'SUP-002',
          assigneeName: 'Ahmad Tech Lead',
          assigneeRole: 'DEVELOPER',
          createdBy: 'Hendra Wijaya',
          createdAt: new Date(now.getTime() - 24 * 3600 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(),
          slaPolicyId: 'SLA-3',
          slaStatus: 'ON_TIME',
          responseDueAt: new Date(now.getTime() - 20 * 3600 * 1000).toISOString(),
          resolutionDueAt: new Date(now.getTime() + 20 * 3600 * 1000).toISOString(),
          firstRespondedAt: new Date(now.getTime() - 22 * 3600 * 1000).toISOString(),
          categorySpecificData: {
            affectedModule: 'IoT Telemetry & Sensor Tracking',
            stepsToReproduce: '1. Buka Fleet Live Monitor\n2. Filter Unit Caterpillar 777-B12\n3. Amati Grafik Fuel Rate jam 14:00 WITA',
            expectedResult: 'Grafik kontinyu dalam range 45-60 Liter/jam',
            actualResult: 'Spike mendadak hingga 999 Liter/jam selama 3 detik',
            browser: 'Chrome 127.0.0',
            device: 'Desktop Workstation',
            operatingSystem: 'Windows 11 Pro'
          },
          messages: [
            {
              id: 'MSG-TKT-1',
              ticketId: 'TCK-2026-000001',
              senderId: 'CUSER-001',
              senderName: 'Hendra Wijaya',
              senderRole: 'VP of Technology',
              senderType: 'CUSTOMER',
              message: 'Data konsumsi bahan bakar pada unit CAT 777-B12 menunjukkan lonjakan spike tidak teratur di dashboard pada jam 14:00 WITA. Mohon verifikasi filter smoothing noise data feed.',
              messageType: 'CUSTOMER_REPLY',
              visibility: 'CUSTOMER_VISIBLE',
              createdAt: new Date(now.getTime() - 24 * 3600 * 1000).toISOString()
            },
            {
              id: 'MSG-TKT-2',
              ticketId: 'TCK-2026-000001',
              senderId: 'SUP-002',
              senderName: 'Ahmad Tech Lead',
              senderRole: 'DEVELOPER',
              senderType: 'SUPPORT',
              message: 'Halo Pak Hendra, kami telah menerima laporan bug ini. Tim IoT Backend sedang memeriksa buffer Kafka & pipeline Moving Average filter pada server telemetry.',
              messageType: 'SUPPORT_REPLY',
              visibility: 'CUSTOMER_VISIBLE',
              createdAt: new Date(now.getTime() - 22 * 3600 * 1000).toISOString()
            },
            {
              id: 'MSG-TKT-3',
              ticketId: 'TCK-2026-000001',
              senderId: 'SUP-002',
              senderName: 'Ahmad Tech Lead',
              senderRole: 'DEVELOPER',
              senderType: 'SUPPORT',
              message: 'Note Internal: Ditemukan outlier packet drop saat loss sinyal GSM seluler 4G site Sangatta. Perlu add outlier rejection logic di Golang ingestion pipeline.',
              messageType: 'INTERNAL_NOTE',
              visibility: 'INTERNAL',
              createdAt: new Date(now.getTime() - 10 * 3600 * 1000).toISOString()
            }
          ],
          attachments: [
            {
              id: 'ATT-1',
              name: 'Fuel_Spike_Log_CAT777.png',
              fileName: 'Fuel_Spike_Log_CAT777.png',
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
              storageReference: '/attachments/COMP-001/Fuel_Spike_Log_CAT777.png',
              size: '1.2 MB',
              fileSize: '1.2 MB',
              fileType: 'image/png',
              uploadedBy: 'CUSER-001',
              uploadedByName: 'Hendra Wijaya',
              isScanned: true,
              scanStatus: 'CLEAN',
              createdAt: new Date(now.getTime() - 24 * 3600 * 1000).toISOString()
            }
          ],
          statusHistory: [
            {
              id: 'HIST-1',
              ticketId: 'TCK-2026-000001',
              oldStatus: 'OPEN',
              newStatus: 'IN_PROGRESS',
              changedBy: 'SUP-002',
              changedByName: 'Ahmad Tech Lead',
              reason: 'Penugasan penanganan ke tim lead developer',
              createdAt: new Date(now.getTime() - 22 * 3600 * 1000).toISOString()
            }
          ],
          timeline: [
            {
              date: new Date(now.getTime() - 24 * 3600 * 1000).toISOString(),
              title: 'Ticket Created',
              description: 'Ticket dibuat oleh Hendra Wijaya dengan prioritas HIGH.',
              author: 'Hendra Wijaya'
            },
            {
              date: new Date(now.getTime() - 22 * 3600 * 1000).toISOString(),
              title: 'Assigned & In Progress',
              description: 'Ditugaskan kepada Ahmad Tech Lead untuk investigasi.',
              author: 'Ahmad Tech Lead'
            }
          ]
        },
        {
          id: 'TCK-2026-000002',
          ticketNumber: 'SAI-TKT-2026-000002',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          customerUserId: 'CUSER-001',
          customerUserName: 'Hendra Wijaya',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          moduleId: 'MOD-2',
          moduleName: 'Fleet Route Optimization Engine',
          category: 'FEATURE_REQUEST',
          priority: 'MEDIUM',
          status: 'OPEN',
          subject: 'Pengajuan Modul Estimasi Waktu Tempuh Rute Hauling dengan Peta Elevasi',
          description: 'Pengajuan penambahan algoritma perhitungan gradien kecenderungan lereng jalan tambang pada kalkulasi estimasi ETA truk pemuat.',
          createdBy: 'Hendra Wijaya',
          createdAt: new Date(now.getTime() - 48 * 3600 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - 48 * 3600 * 1000).toISOString(),
          slaPolicyId: 'SLA-2',
          slaStatus: 'ON_TIME',
          responseDueAt: new Date(now.getTime() + 12 * 3600 * 1000).toISOString(),
          resolutionDueAt: new Date(now.getTime() + 48 * 3600 * 1000).toISOString(),
          categorySpecificData: {
            featureName: 'Slope Elevation Gradient Route ETA Calculation',
            businessNeed: 'Akurasi jadwal pengiriman batubara ke crusher plant meningkat 15%',
            expectedBenefit: 'Mengurangi antrean unit di titik unloading',
            priority: 'MEDIUM'
          },
          messages: [
            {
              id: 'MSG-TKT-4',
              ticketId: 'TCK-2026-000002',
              senderId: 'CUSER-001',
              senderName: 'Hendra Wijaya',
              senderType: 'CUSTOMER',
              message: 'Pengajuan penambahan algoritma perhitungan gradien kecenderungan lereng jalan tambang pada kalkulasi estimasi ETA truk pemuat.',
              messageType: 'CUSTOMER_REPLY',
              visibility: 'CUSTOMER_VISIBLE',
              createdAt: new Date(now.getTime() - 48 * 3600 * 1000).toISOString()
            }
          ],
          timeline: [
            {
              date: new Date(now.getTime() - 48 * 3600 * 1000).toISOString(),
              title: 'Ticket Created',
              description: 'Feature Request diajukan untuk evaluasi Product Manager.',
              author: 'Hendra Wijaya'
            }
          ]
        }
      ];
      localStorage.setItem(STORAGE_TICKETS, JSON.stringify(defaultTickets));
    }
  }

  // ==================== TICKET CRUD & QUERIES ====================

  public static getTickets(companyIdFilter?: string, isCustomer: boolean = true): Ticket[] {
    this.initialize();
    try {
      const raw = localStorage.getItem(STORAGE_TICKETS);
      if (!raw) return [];
      let list: Ticket[] = JSON.parse(raw);

      if (isCustomer && companyIdFilter) {
        list = list.filter((t) => t.companyId === companyIdFilter);
      }

      // Sort by newest created first
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
      console.error('Error reading support tickets', e);
      return [];
    }
  }

  public static getTicketById(id: string, companyIdFilter?: string, isCustomer: boolean = true): Ticket | null {
    const list = this.getTickets(companyIdFilter, isCustomer);
    return list.find((t) => t.id === id || t.ticketNumber === id) || null;
  }

  public static createTicket(data: {
    companyId: string;
    companyName?: string;
    customerUserId: string;
    customerUserName: string;
    projectId?: string;
    projectName?: string;
    moduleId?: string;
    moduleName?: string;
    category: TicketCategory;
    priority: TicketPriority;
    subject: string;
    description: string;
    categorySpecificData?: any;
    attachments?: TicketAttachment[];
  }): Ticket {
    this.initialize();
    const rawTickets = localStorage.getItem(STORAGE_TICKETS);
    const tickets: Ticket[] = rawTickets ? JSON.parse(rawTickets) : [];

    const now = new Date();
    const year = now.getFullYear();
    const sequence = (tickets.length + 1).toString().padStart(6, '0');
    const ticketNumber = `SAI-TKT-${year}-${sequence}`;
    const id = `TCK-${year}-${sequence}`;

    // SLA Calculation
    const slaPolicies: SupportSLAPolicy[] = JSON.parse(localStorage.getItem(STORAGE_SLA_POLICIES) || '[]');
    const policy = slaPolicies.find((p) => p.priority === data.priority) || slaPolicies[0];

    const respHours = policy ? policy.responseTimeTargetHours : 12;
    const resolHours = policy ? policy.resolutionTimeTargetHours : 48;

    const responseDueAt = new Date(now.getTime() + respHours * 3600 * 1000).toISOString();
    const resolutionDueAt = new Date(now.getTime() + resolHours * 3600 * 1000).toISOString();

    const initialMessage: TicketMessage = {
      id: `MSG-${Date.now()}-1`,
      ticketId: id,
      senderId: data.customerUserId,
      senderName: data.customerUserName,
      senderRole: 'Customer User',
      senderType: 'CUSTOMER',
      message: data.description,
      messageType: 'CUSTOMER_REPLY',
      visibility: 'CUSTOMER_VISIBLE',
      attachments: data.attachments || [],
      createdAt: now.toISOString()
    };

    const newTicket: Ticket = {
      id,
      ticketNumber,
      companyId: data.companyId,
      companyName: data.companyName || 'PT Customer Company',
      customerUserId: data.customerUserId,
      customerUserName: data.customerUserName,
      projectId: data.projectId,
      projectName: data.projectName,
      moduleId: data.moduleId,
      moduleName: data.moduleName,
      category: data.category,
      priority: data.priority,
      status: 'OPEN',
      subject: data.subject,
      description: data.description,
      createdBy: data.customerUserName,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      slaPolicyId: policy?.id,
      slaStatus: 'ON_TIME',
      responseDueAt,
      resolutionDueAt,
      categorySpecificData: data.categorySpecificData || {},
      messages: [initialMessage],
      attachments: data.attachments || [],
      statusHistory: [
        {
          id: `HIST-${Date.now()}`,
          ticketId: id,
          oldStatus: 'OPEN',
          newStatus: 'OPEN',
          changedBy: data.customerUserId,
          changedByName: data.customerUserName,
          reason: 'Ticket Created',
          createdAt: now.toISOString()
        }
      ],
      timeline: [
        {
          date: now.toISOString(),
          title: 'Ticket Created',
          description: `Ticket ${ticketNumber} berhasil dibuat dengan prioritas ${data.priority}.`,
          author: data.customerUserName
        }
      ]
    };

    tickets.unshift(newTicket);
    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));

    return newTicket;
  }

  public static addMessage(
    ticketId: string,
    messageData: {
      senderId: string;
      senderName: string;
      senderRole?: string;
      senderType: 'CUSTOMER' | 'SUPPORT' | 'SYSTEM';
      message: string;
      messageType?: 'CUSTOMER_REPLY' | 'SUPPORT_REPLY' | 'INTERNAL_NOTE' | 'SYSTEM_EVENT';
      visibility?: 'CUSTOMER_VISIBLE' | 'INTERNAL';
      attachments?: TicketAttachment[];
    }
  ): Ticket | null {
    this.initialize();
    const raw = localStorage.getItem(STORAGE_TICKETS);
    if (!raw) return null;
    const tickets: Ticket[] = JSON.parse(raw);
    const index = tickets.findIndex((t) => t.id === ticketId || t.ticketNumber === ticketId);
    if (index === -1) return null;

    const ticket = tickets[index];
    const now = new Date();

    const msgType = messageData.messageType || (messageData.senderType === 'CUSTOMER' ? 'CUSTOMER_REPLY' : 'SUPPORT_REPLY');
    const visibility = messageData.visibility || (msgType === 'INTERNAL_NOTE' ? 'INTERNAL' : 'CUSTOMER_VISIBLE');

    const newMsg: TicketMessage = {
      id: `MSG-${Date.now()}`,
      ticketId: ticket.id,
      senderId: messageData.senderId,
      senderName: messageData.senderName,
      senderRole: messageData.senderRole,
      senderType: messageData.senderType,
      message: messageData.message,
      messageType: msgType,
      visibility,
      attachments: messageData.attachments || [],
      createdAt: now.toISOString()
    };

    ticket.messages.push(newMsg);
    ticket.updatedAt = now.toISOString();

    if (!ticket.firstRespondedAt && messageData.senderType === 'SUPPORT' && msgType === 'SUPPORT_REPLY') {
      ticket.firstRespondedAt = now.toISOString();
    }

    // Auto status update logic
    if (messageData.senderType === 'CUSTOMER' && ticket.status === 'WAITING_FOR_CUSTOMER') {
      ticket.status = 'IN_PROGRESS';
    } else if (messageData.senderType === 'SUPPORT' && msgType === 'SUPPORT_REPLY' && ticket.status === 'OPEN') {
      ticket.status = 'IN_PROGRESS';
    }

    // Append attachments
    if (messageData.attachments && messageData.attachments.length > 0) {
      if (!ticket.attachments) ticket.attachments = [];
      ticket.attachments.push(...messageData.attachments);
    }

    tickets[index] = ticket;
    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));
    return ticket;
  }

  public static updateTicketStatus(
    ticketId: string,
    newStatus: TicketStatus,
    changedBy: string,
    changedByName: string,
    reason?: string,
    resolutionData?: Partial<TicketResolution>
  ): Ticket | null {
    this.initialize();
    const raw = localStorage.getItem(STORAGE_TICKETS);
    if (!raw) return null;
    const tickets: Ticket[] = JSON.parse(raw);
    const index = tickets.findIndex((t) => t.id === ticketId || t.ticketNumber === ticketId);
    if (index === -1) return null;

    const ticket = tickets[index];
    const oldStatus = ticket.status;
    const now = new Date();

    ticket.status = newStatus;
    ticket.updatedAt = now.toISOString();

    if (newStatus === 'RESOLVED') {
      ticket.resolvedAt = now.toISOString();
      if (resolutionData && resolutionData.summary) {
        ticket.resolution = {
          id: `RES-${Date.now()}`,
          ticketId: ticket.id,
          summary: resolutionData.summary,
          rootCause: resolutionData.rootCause || 'To be verified in release notes',
          fixVersion: resolutionData.fixVersion || 'v1.0.1',
          testResult: resolutionData.testResult || 'PASSED',
          tester: resolutionData.tester || changedByName,
          testDate: now.toISOString(),
          resolvedBy: changedBy,
          resolvedByName: changedByName,
          resolvedAt: now.toISOString()
        };
      }
    } else if (newStatus === 'CLOSED') {
      ticket.closedAt = now.toISOString();
    } else if (newStatus === 'REOPENED') {
      ticket.resolvedAt = undefined;
      ticket.closedAt = undefined;
    }

    // History Log
    if (!ticket.statusHistory) ticket.statusHistory = [];
    ticket.statusHistory.push({
      id: `HIST-${Date.now()}`,
      ticketId: ticket.id,
      oldStatus,
      newStatus,
      changedBy,
      changedByName,
      reason: reason || `Status changed from ${oldStatus} to ${newStatus}`,
      createdAt: now.toISOString()
    });

    // Timeline Log
    if (!ticket.timeline) ticket.timeline = [];
    ticket.timeline.push({
      date: now.toISOString(),
      title: `Status: ${this.getCustomerStatusLabel(newStatus)}`,
      description: reason || `Status ticket diperbarui menjadi ${newStatus}.`,
      author: changedByName
    });

    // System event message
    ticket.messages.push({
      id: `MSG-SYS-${Date.now()}`,
      ticketId: ticket.id,
      senderId: changedBy,
      senderName: changedByName,
      senderType: 'SYSTEM',
      message: `Status ticket diubah dari ${this.getCustomerStatusLabel(oldStatus)} menjadi ${this.getCustomerStatusLabel(newStatus)}.${reason ? ` Alasan: ${reason}` : ''}`,
      messageType: 'SYSTEM_EVENT',
      visibility: 'CUSTOMER_VISIBLE',
      createdAt: now.toISOString()
    });

    tickets[index] = ticket;
    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));
    return ticket;
  }

  public static resolveTicket(
    ticketId: string,
    changedBy: string,
    changedByName: string,
    summary: string,
    fixVersion?: string
  ): Ticket | null {
    return this.updateTicketStatus(
      ticketId,
      'RESOLVED',
      changedBy,
      changedByName,
      `Ticket resolved: ${summary}`,
      { summary, fixVersion }
    );
  }

  public static updateTicketPriority(
    ticketId: string,
    newPriority: TicketPriority,
    changedBy: string,
    changedByName: string
  ): Ticket | null {
    this.initialize();
    const raw = localStorage.getItem(STORAGE_TICKETS);
    if (!raw) return null;
    const tickets: Ticket[] = JSON.parse(raw);
    const index = tickets.findIndex((t) => t.id === ticketId || t.ticketNumber === ticketId);
    if (index === -1) return null;

    const ticket = tickets[index];
    const oldPriority = ticket.priority;
    ticket.priority = newPriority;
    ticket.updatedAt = new Date().toISOString();

    if (!ticket.timeline) ticket.timeline = [];
    ticket.timeline.push({
      date: new Date().toISOString(),
      title: 'Priority Updated',
      description: `Prioritas ticket diubah dari ${oldPriority} menjadi ${newPriority}`,
      author: changedByName
    });

    tickets[index] = ticket;
    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));
    return ticket;
  }

  public static assignTicket(
    ticketId: string,
    assigneeId: string,
    assignedBy: string,
    assignedByName: string
  ): Ticket | null {
    this.initialize();
    const raw = localStorage.getItem(STORAGE_TICKETS);
    if (!raw) return null;
    const tickets: Ticket[] = JSON.parse(raw);
    const index = tickets.findIndex((t) => t.id === ticketId || t.ticketNumber === ticketId);
    if (index === -1) return null;

    const agents = this.getAgents();
    const agent = agents.find((a) => a.id === assigneeId || a.userId === assigneeId);

    const ticket = tickets[index];
    const now = new Date();

    ticket.assigneeId = assigneeId;
    ticket.assigneeName = agent ? agent.name : assigneeId;
    ticket.assigneeRole = agent ? agent.role : 'SUPPORT_AGENT';
    ticket.assignedTo = agent ? agent.name : assigneeId;
    ticket.updatedAt = now.toISOString();

    if (ticket.status === 'OPEN') {
      ticket.status = 'IN_PROGRESS';
    }

    if (!ticket.timeline) ticket.timeline = [];
    ticket.timeline.push({
      date: now.toISOString(),
      title: 'Ticket Assigned',
      description: `Ticket ditugaskan kepada ${ticket.assigneeName}.`,
      author: assignedByName
    });

    ticket.messages.push({
      id: `MSG-SYS-${Date.now()}`,
      ticketId: ticket.id,
      senderId: assignedBy,
      senderName: assignedByName,
      senderType: 'SYSTEM',
      message: `Ticket telah ditugaskan kepada ${ticket.assigneeName} (${ticket.assigneeRole}).`,
      messageType: 'SYSTEM_EVENT',
      visibility: 'CUSTOMER_VISIBLE',
      createdAt: now.toISOString()
    });

    tickets[index] = ticket;
    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));
    return ticket;
  }

  public static submitCSAT(ticketId: string, rating: number, feedback?: string): Ticket | null {
    this.initialize();
    const raw = localStorage.getItem(STORAGE_TICKETS);
    if (!raw) return null;
    const tickets: Ticket[] = JSON.parse(raw);
    const index = tickets.findIndex((t) => t.id === ticketId || t.ticketNumber === ticketId);
    if (index === -1) return null;

    const ticket = tickets[index];
    const sentiment = rating >= 4 ? 'POSITIVE' : rating === 3 ? 'NEUTRAL' : 'NEGATIVE';

    ticket.satisfaction = {
      id: `CSAT-${Date.now()}`,
      ticketId: ticket.id,
      companyId: ticket.companyId,
      companyName: ticket.companyName,
      rating,
      feedback,
      sentiment,
      createdAt: new Date().toISOString()
    };

    tickets[index] = ticket;
    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));
    return ticket;
  }

  // ==================== SUPPORT AGENTS & CONFIG QUERIES ====================

  public static getAgents(): SupportAgent[] {
    this.initialize();
    try {
      const raw = localStorage.getItem(STORAGE_AGENTS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  public static getSLAPolicies(): SupportSLAPolicy[] {
    this.initialize();
    try {
      const raw = localStorage.getItem(STORAGE_SLA_POLICIES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  public static getCategories(): SupportCategoryConfig[] {
    this.initialize();
    try {
      const raw = localStorage.getItem(STORAGE_CATEGORIES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  public static getSettings(): SupportSystemSettings {
    this.initialize();
    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS);
      return raw ? JSON.parse(raw) : {
        ticketPrefix: 'SAI-TKT',
        numberFormat: 'SAI-TKT-2026-{6DIGITS}',
        autoCloseDays: 7,
        enableAutoClose: false,
        enableAutoAssignment: false,
        enableMalwareScan: true,
        allowedFileTypes: ['.png', '.jpg', '.jpeg', '.pdf', '.docx', '.txt', '.log', '.zip'],
        maxFileSizeMb: 20,
        whatsappSupportNumber: '+6285187869164',
        businessHours: 'Monday–Friday 08:00–17:00 WIB'
      };
    } catch (e) {
      return {} as any;
    }
  }

  public static updateSettings(newSettings: Partial<SupportSystemSettings>): SupportSystemSettings {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(updated));
    return updated;
  }
}
