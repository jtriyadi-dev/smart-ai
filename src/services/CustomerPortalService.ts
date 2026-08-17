import {
  CustomerUser,
  CustomerCompany,
  CustomerRole,
  CustomerAccount,
  CustomerProject,
  Ticket,
  TicketMessage,
  TicketCategory,
  TicketPriority,
  CustomerNotification,
  CustomerActivity,
  CustomerDocument,
  CustomerInvitation,
  ProjectStatus
} from '../types';
import { InvoiceService } from './InvoiceService';
import { PaymentService } from './PaymentService';
import { ReceiptService } from './ReceiptService';
import { QuotationDocumentService } from './QuotationDocumentService';
import { ProposalDocumentService } from './proposalDocumentService';
import { CRMService } from './crmService';

const STORAGE_USERS = 'smart_ai_customer_users';
const STORAGE_COMPANIES = 'smart_ai_customer_companies';
const STORAGE_PROJECTS = 'smart_ai_customer_projects';
const STORAGE_TICKETS = 'smart_ai_customer_tickets';
const STORAGE_NOTIFICATIONS = 'smart_ai_customer_notifications';
const STORAGE_ACTIVITIES = 'smart_ai_customer_activities';
const STORAGE_DOCUMENTS = 'smart_ai_customer_documents';
const STORAGE_SESSION = 'smart_ai_customer_session';
const STORAGE_INVITATIONS = 'smart_ai_customer_invitations';

export interface CustomerSession {
  user: CustomerUser;
  company: CustomerCompany;
  token: string;
  loginAt: string;
}

export class CustomerPortalService {
  /**
   * Seed initial data if empty
   */
  public static initialize(): void {
    if (!localStorage.getItem(STORAGE_COMPANIES)) {
      const defaultCompany: CustomerCompany = {
        id: 'COMP-001',
        name: 'PT Nusantara Mining Energy',
        legalName: 'PT Nusantara Mining Energy Tbk',
        industry: 'Pertambangan & Energi',
        website: 'https://nusantaramining.co.id',
        email: 'info@nusantaramining.co.id',
        phone: '+62 21 555 7890',
        address: 'Gedung Menara Palma Lt. 18, Jl. H.R. Rasuna Said Block X-2',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        country: 'Indonesia',
        taxInformation: 'NPWP: 01.234.567.8-012.000',
        createdAt: '2026-08-01T09:00:00Z',
        updatedAt: '2026-08-10T14:30:00Z'
      };
      localStorage.setItem(STORAGE_COMPANIES, JSON.stringify([defaultCompany]));
    }

    if (!localStorage.getItem(STORAGE_USERS)) {
      const defaultUsers: CustomerUser[] = [
        {
          id: 'CUSER-001',
          companyId: 'COMP-001',
          name: 'Hendra Wijaya',
          email: 'client@nusantaramining.co.id',
          phone: '+62 812 9876 5432',
          position: 'VP of Technology & Digital Transformation',
          role: 'CUSTOMER_ADMIN',
          status: 'ACTIVE',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          lastLoginAt: new Date().toISOString(),
          createdAt: '2026-08-01T09:00:00Z',
          updatedAt: '2026-08-15T10:00:00Z'
        },
        {
          id: 'CUSER-002',
          companyId: 'COMP-001',
          name: 'Siti Rahmayanti',
          email: 'finance@nusantaramining.co.id',
          phone: '+62 811 2345 6789',
          position: 'Finance Manager',
          role: 'CUSTOMER_FINANCE',
          status: 'ACTIVE',
          createdAt: '2026-08-02T10:00:00Z',
          updatedAt: '2026-08-10T11:00:00Z'
        }
      ];
      localStorage.setItem(STORAGE_USERS, JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem(STORAGE_PROJECTS)) {
      const defaultProjects: CustomerProject[] = [
        {
          id: 'PROJ-001',
          companyId: 'COMP-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          description: 'Sistem manajemen armada tambang cerdas terintegrasi dengan sensor IoT telemetry, AI route optimization, dan real-time maintenance alert.',
          status: 'IN_PROGRESS',
          progressPercentage: 68,
          startDate: '2026-07-01',
          expectedCompletion: '2026-10-31',
          projectManager: 'Budi Santoso (SMART-AI.ID)',
          industry: 'Pertambangan & Energi',
          techStack: ['React', 'Node.js', 'PostgreSQL', 'TensorFlow IoT', 'MQTT'],
          modules: [
            { id: 'MOD-1', name: 'IoT Telemetry & Sensor Tracking', progress: 100, status: 'Completed' },
            { id: 'MOD-2', name: 'Fleet Route Optimization Engine', progress: 85, status: 'In Progress' },
            { id: 'MOD-3', name: 'Predictive Maintenance Analytics', progress: 60, status: 'In Progress' },
            { id: 'MOD-4', name: 'Executive Dashboard & PDF Reporting', progress: 30, status: 'In Progress' },
            { id: 'MOD-5', name: 'Mobile App Operator Driver', progress: 10, status: 'Pending' }
          ],
          milestones: [
            { id: 'M-1', name: 'Kickoff & Requirements Confirmation', dueDate: '2026-07-15', progress: 100, status: 'COMPLETED', description: 'Finalisasi blueprint arsitektur & persetujuan ERD.' },
            { id: 'M-2', name: 'IoT Telemetry & Route Engine Release', dueDate: '2026-08-20', progress: 85, status: 'IN_PROGRESS', description: 'Rilis modul pelacakan armada & optimasi rute tambang.' },
            { id: 'M-3', name: 'UAT & Predictive Analytics Testing', dueDate: '2026-09-30', progress: 20, status: 'UPCOMING', description: 'Testing skenario lapangan dengan 50 unit alat berat.' },
            { id: 'M-4', name: 'Final Deployment & Handover', dueDate: '2026-10-31', progress: 0, status: 'UPCOMING', description: 'Penyelenggaraan pelatihan user & serah terima sistem.' }
          ],
          updates: [
            { id: 'UPD-1', title: 'Penyelesaian Modul IoT Sensor Data Feed', content: 'Infrastruktur pemprosesan sensor telemetry 1.000 ping/detik telah lulus uji beban di staging server.', date: '2026-08-12', author: 'Budi Santoso' },
            { id: 'UPD-2', title: 'Persiapan UAT Modul Route Engine', content: 'Integrasi peta elevasi lokasi site Sangatta Kaltim telah diupload dan dikalibrasi.', date: '2026-08-08', author: 'Ahmad Tech Lead' }
          ],
          financialSummary: {
            contractValue: 500000000,
            invoiced: 300000000,
            paid: 300000000,
            outstanding: 0,
            overdue: 0
          }
        }
      ];
      localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(defaultProjects));
    }

    if (!localStorage.getItem(STORAGE_TICKETS)) {
      const defaultTickets: Ticket[] = [
        {
          id: 'TCK-2026-001',
          ticketNumber: 'SAI-TCK-2026-001',
          companyId: 'COMP-001',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          subject: 'Kalibrasi Sensor Telemetry Alat Berat Caterpillar 777',
          category: 'Technical Support',
          priority: 'HIGH',
          status: 'IN_PROGRESS',
          description: 'Data konsumsi bahan bakar pada unit CAT 777-B12 menunjukkan lonjakan spike di dashboard jam 14:00 WITA. Mohon diverifikasi filter anomaly noise.',
          assignedTo: 'Tim Support Field SMART-AI.ID',
          createdBy: 'Hendra Wijaya',
          createdAt: '2026-08-14T09:30:00Z',
          updatedAt: '2026-08-14T11:00:00Z',
          messages: [
            {
              id: 'MSG-1',
              ticketId: 'TCK-2026-001',
              senderId: 'CUSER-001',
              senderName: 'Hendra Wijaya',
              senderType: 'CUSTOMER',
              message: 'Data konsumsi bahan bakar pada unit CAT 777-B12 menunjukkan lonjakan spike di dashboard jam 14:00 WITA. Mohon diverifikasi filter anomaly noise.',
              createdAt: '2026-08-14T09:30:00Z'
            },
            {
              id: 'MSG-2',
              ticketId: 'TCK-2026-001',
              senderId: 'SUP-001',
              senderName: 'Budi (SMART-AI Lead)',
              senderType: 'SUPPORT',
              message: 'Halo Pak Hendra, kami sedang memeriksa log filter Moving Average pada pipeline Kafka MQTT telemetry. Kami akan melakukan patch smoothing algoritma sore ini.',
              createdAt: '2026-08-14T11:00:00Z'
            }
          ]
        }
      ];
      localStorage.setItem(STORAGE_TICKETS, JSON.stringify(defaultTickets));
    }

    if (!localStorage.getItem(STORAGE_NOTIFICATIONS)) {
      const defaultNotifications: CustomerNotification[] = [
        {
          id: 'NOTIF-1',
          companyId: 'COMP-001',
          userId: 'CUSER-001',
          type: 'PROJECT_UPDATE',
          title: 'Update Progress Project Smart Mining Fleet',
          message: 'Modul IoT Telemetry & Sensor Tracking telah selesai 100%.',
          read: false,
          linkUrl: '/portal/projects/PROJ-001',
          createdAt: '2026-08-12T10:00:00Z'
        },
        {
          id: 'NOTIF-2',
          companyId: 'COMP-001',
          userId: 'CUSER-001',
          type: 'INVOICE',
          title: 'Invoice Diterbitkan',
          message: 'Invoice Milestone 2 SAI-INV-2026-0001 senilai Rp150.000.000 telah terbit.',
          read: true,
          linkUrl: '/portal/invoices',
          createdAt: '2026-08-10T08:00:00Z'
        }
      ];
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(defaultNotifications));
    }

    if (!localStorage.getItem(STORAGE_DOCUMENTS)) {
      const defaultDocs: CustomerDocument[] = [
        {
          id: 'DOC-1',
          companyId: 'COMP-001',
          projectId: 'PROJ-001',
          type: 'PROJECT',
          name: 'System Architecture Blueprint & ERD Document.pdf',
          storageReference: '/docs/COMP-001/System_Architecture_Blueprint.pdf',
          accessLevel: 'CUSTOMER_ALL',
          fileSize: '4.2 MB',
          createdAt: '2026-07-10T10:00:00Z',
          downloadCount: 5
        },
        {
          id: 'DOC-2',
          companyId: 'COMP-001',
          type: 'PROPOSAL',
          name: 'Proposal_Pengembangan_Smart_Mining_v2.pdf',
          storageReference: '/docs/COMP-001/Proposal_Pengembangan_Smart_Mining_v2.pdf',
          accessLevel: 'CUSTOMER_ALL',
          fileSize: '2.8 MB',
          createdAt: '2026-06-20T14:00:00Z',
          downloadCount: 12
        }
      ];
      localStorage.setItem(STORAGE_DOCUMENTS, JSON.stringify(defaultDocs));
    }
  }

  // ==================== AUTHENTICATION & SESSION ====================

  public static getCurrentSession(): CustomerSession | null {
    try {
      this.initialize();
      const raw = localStorage.getItem(STORAGE_SESSION);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to parse customer session', e);
    }
    return null;
  }

  public static login(email: string, password: string): { success: boolean; message: string; session?: CustomerSession } {
    this.initialize();
    const users: CustomerUser[] = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    const user = users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim());

    if (!user) {
      return { success: false, message: 'Kombinasi email dan kata sandi tidak ditemukan.' };
    }

    if (user.status === 'SUSPENDED' || user.status === 'DEACTIVATED') {
      return { success: false, message: 'Akun Anda sedang dinonaktifkan. Silakan hubungi admin SMART-AI.ID.' };
    }

    const companies: CustomerCompany[] = JSON.parse(localStorage.getItem(STORAGE_COMPANIES) || '[]');
    let company = companies.find((c) => c.id === user.companyId);

    if (!company) {
      company = {
        id: user.companyId || 'COMP-001',
        name: 'Perusahaan Client',
        legalName: 'Perusahaan Client PT',
        industry: 'Teknologi & Bisnis',
        website: 'https://client.com',
        email: email,
        phone: user.phone || '+62 812 0000 0000',
        address: 'Alamat Klien',
        city: 'Jakarta',
        province: 'DKI Jakarta',
        country: 'Indonesia',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    // Update last login
    user.lastLoginAt = new Date().toISOString();
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));

    const session: CustomerSession = {
      user,
      company,
      token: 'STOKEN_' + Math.random().toString(36).substring(2) + Date.now(),
      loginAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));

    // Log activity
    this.logActivity(user.companyId, user.id, user.name, 'LOGIN', 'CustomerUser', user.id, { ip: '127.0.0.1' });

    return { success: true, message: 'Berhasil masuk ke Customer Portal.', session };
  }

  public static register(data: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    password: string;
    position?: string;
    website?: string;
  }): { success: boolean; message: string; session?: CustomerSession } {
    this.initialize();

    const users: CustomerUser[] = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    if (users.some((u) => u.email.toLowerCase().trim() === data.email.toLowerCase().trim())) {
      return { success: false, message: 'Akun dengan email ini sudah terdaftar. Silakan login atau gunakan reset password.' };
    }

    const companyId = 'COMP-' + Math.floor(100 + Math.random() * 900);
    const newCompany: CustomerCompany = {
      id: companyId,
      name: data.companyName,
      legalName: data.companyName,
      industry: 'Umum & Teknologi',
      website: data.website || '',
      email: data.email,
      phone: data.phone,
      address: 'Belum Diisi',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      country: 'Indonesia',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const companies: CustomerCompany[] = JSON.parse(localStorage.getItem(STORAGE_COMPANIES) || '[]');
    companies.push(newCompany);
    localStorage.setItem(STORAGE_COMPANIES, JSON.stringify(companies));

    const newUser: CustomerUser = {
      id: 'CUSER-' + Date.now(),
      companyId: companyId,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      position: data.position || 'Executive Contact',
      role: 'CUSTOMER_ADMIN',
      status: 'ACTIVE',
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));

    const session: CustomerSession = {
      user: newUser,
      company: newCompany,
      token: 'STOKEN_' + Math.random().toString(36).substring(2) + Date.now(),
      loginAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));

    // Log Activity & Create Notification
    this.logActivity(companyId, newUser.id, newUser.name, 'REGISTER', 'CustomerUser', newUser.id);
    this.addNotification(companyId, newUser.id, 'SYSTEM', 'Selamat Datang di Portal SMART-AI.ID', 'Akun portal Anda telah berhasil dibuat. Nikmati kemudahan melacak proyek, proposal, kuotasi, dan invoice.');

    return { success: true, message: 'Pendaftaran berhasil. Selamat datang di Portal Klien SMART-AI.ID!', session };
  }

  public static logout(): void {
    localStorage.removeItem(STORAGE_SESSION);
  }

  public static forgotPassword(email: string): { success: boolean; message: string } {
    // Generic response to prevent account enumeration as per instructions
    return {
      success: true,
      message: 'Jika alamat email tersebut terdaftar di sistem kami, tautan instruksi pemulihan kata sandi telah dikirimkan ke kotak masuk Anda.'
    };
  }

  public static updateProfile(userId: string, data: Partial<CustomerUser>): { success: boolean; message: string; updatedUser?: CustomerUser } {
    const users: CustomerUser[] = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return { success: false, message: 'User tidak ditemukan.' };

    users[idx] = { ...users[idx], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));

    // Update session if current
    const session = this.getCurrentSession();
    if (session && session.user.id === userId) {
      session.user = users[idx];
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    }

    return { success: true, message: 'Profil berhasil diperbarui.', updatedUser: users[idx] };
  }

  public static updateCompany(companyId: string, data: Partial<CustomerCompany>): { success: boolean; message: string } {
    const companies: CustomerCompany[] = JSON.parse(localStorage.getItem(STORAGE_COMPANIES) || '[]');
    const idx = companies.findIndex((c) => c.id === companyId);
    if (idx === -1) return { success: false, message: 'Data perusahaan tidak ditemukan.' };

    companies[idx] = { ...companies[idx], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_COMPANIES, JSON.stringify(companies));

    // Update session if current
    const session = this.getCurrentSession();
    if (session && session.company.id === companyId) {
      session.company = companies[idx];
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    }

    return { success: true, message: 'Profil perusahaan berhasil diperbarui.' };
  }

  // ==================== TENANT ISOLATED DATA FETCHERS ====================

  public static getProjects(companyId: string): CustomerProject[] {
    this.initialize();
    const projects: CustomerProject[] = JSON.parse(localStorage.getItem(STORAGE_PROJECTS) || '[]');
    return projects.filter((p) => p.companyId === companyId);
  }

  public static getProjectById(companyId: string, projectId: string): CustomerProject | undefined {
    return this.getProjects(companyId).find((p) => p.id === projectId);
  }

  public static getProposals(companyId: string, companyName?: string) {
    const all = ProposalDocumentService.getAllProposals();
    return all.filter((p) => (p as any).companyId === companyId || p.companyName.toLowerCase().includes((companyName || '').toLowerCase()));
  }

  public static getQuotations(companyId: string, companyName?: string) {
    const all = QuotationDocumentService.getAllQuotations();
    return all.filter((q) => q.companyId === companyId || q.companyName.toLowerCase().includes((companyName || '').toLowerCase()));
  }

  public static getInvoices(companyId: string, companyName?: string) {
    const all = InvoiceService.getAllInvoices();
    return all.filter((inv) => inv.companyId === companyId || inv.companyName.toLowerCase().includes((companyName || '').toLowerCase()));
  }

  public static getPayments(companyId: string, companyName?: string) {
    const all = PaymentService.getAllPayments();
    return all.filter((p) => p.companyName.toLowerCase().includes((companyName || '').toLowerCase()));
  }

  public static getReceipts(companyId: string, companyName?: string) {
    const all = ReceiptService.getAllReceipts();
    return all.filter((r) => r.companyName.toLowerCase().includes((companyName || '').toLowerCase()));
  }

  public static getDocuments(companyId: string): CustomerDocument[] {
    this.initialize();
    const docs: CustomerDocument[] = JSON.parse(localStorage.getItem(STORAGE_DOCUMENTS) || '[]');
    return docs.filter((d) => d.companyId === companyId);
  }

  public static getTickets(companyId: string): Ticket[] {
    this.initialize();
    const tickets: Ticket[] = JSON.parse(localStorage.getItem(STORAGE_TICKETS) || '[]');
    return tickets.filter((t) => t.companyId === companyId);
  }

  public static getTicketById(companyId: string, ticketId: string): Ticket | undefined {
    return this.getTickets(companyId).find((t) => t.id === ticketId);
  }

  public static createTicket(
    companyId: string,
    data: {
      subject: string;
      category: TicketCategory;
      priority: TicketPriority;
      description: string;
      projectId?: string;
      projectName?: string;
      createdBy: string;
    }
  ): Ticket {
    this.initialize();
    const tickets: Ticket[] = JSON.parse(localStorage.getItem(STORAGE_TICKETS) || '[]');
    const newId = 'SAI-TCK-2026-' + Math.floor(100 + Math.random() * 900);

    const newTicket: Ticket = {
      id: newId,
      ticketNumber: newId,
      companyId: companyId,
      projectId: data.projectId,
      projectName: data.projectName,
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: 'OPEN',
      description: data.description,
      createdBy: data.createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'MSG-' + Date.now(),
          ticketId: newId,
          senderId: data.createdBy,
          senderName: data.createdBy,
          senderType: 'CUSTOMER',
          message: data.description,
          createdAt: new Date().toISOString()
        }
      ]
    };

    tickets.unshift(newTicket);
    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));

    this.logActivity(companyId, data.createdBy, data.createdBy, 'CREATE_TICKET', 'Ticket', newId, { subject: data.subject });
    return newTicket;
  }

  public static replyTicket(
    companyId: string,
    ticketId: string,
    senderId: string,
    senderName: string,
    message: string,
    attachments?: { name: string; url: string; size?: string }[]
  ): Ticket | undefined {
    const tickets: Ticket[] = JSON.parse(localStorage.getItem(STORAGE_TICKETS) || '[]');
    const idx = tickets.findIndex((t) => t.id === ticketId && t.companyId === companyId);
    if (idx === -1) return undefined;

    const newMessage: TicketMessage = {
      id: 'MSG-' + Date.now(),
      ticketId,
      senderId,
      senderName,
      senderType: 'CUSTOMER',
      message,
      attachments,
      createdAt: new Date().toISOString()
    };

    tickets[idx].messages.push(newMessage);
    tickets[idx].updatedAt = new Date().toISOString();
    tickets[idx].status = 'WAITING_CUSTOMER'; // Customer replied

    localStorage.setItem(STORAGE_TICKETS, JSON.stringify(tickets));
    return tickets[idx];
  }

  public static getNotifications(companyId: string, userId: string): CustomerNotification[] {
    this.initialize();
    const notifs: CustomerNotification[] = JSON.parse(localStorage.getItem(STORAGE_NOTIFICATIONS) || '[]');
    return notifs.filter((n) => n.companyId === companyId);
  }

  public static markNotificationAsRead(id: string): void {
    const notifs: CustomerNotification[] = JSON.parse(localStorage.getItem(STORAGE_NOTIFICATIONS) || '[]');
    const idx = notifs.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notifs[idx].read = true;
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(notifs));
    }
  }

  public static markAllNotificationsAsRead(companyId: string): void {
    const notifs: CustomerNotification[] = JSON.parse(localStorage.getItem(STORAGE_NOTIFICATIONS) || '[]');
    notifs.forEach((n) => {
      if (n.companyId === companyId) {
        n.read = true;
      }
    });
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(notifs));
  }

  public static addNotification(companyId: string, userId: string, type: any, title: string, message: string, linkUrl?: string) {
    const notifs: CustomerNotification[] = JSON.parse(localStorage.getItem(STORAGE_NOTIFICATIONS) || '[]');
    notifs.unshift({
      id: 'NOTIF-' + Date.now(),
      companyId,
      userId,
      type,
      title,
      message,
      read: false,
      linkUrl,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(notifs));
  }

  public static getCompanyUsers(companyId: string): CustomerUser[] {
    this.initialize();
    const users: CustomerUser[] = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    return users.filter((u) => u.companyId === companyId);
  }

  public static inviteUser(companyId: string, email: string, role: CustomerRole, invitedBy: string): CustomerInvitation {
    const invs: CustomerInvitation[] = JSON.parse(localStorage.getItem(STORAGE_INVITATIONS) || '[]');
    const newInv: CustomerInvitation = {
      id: 'INV-' + Date.now(),
      companyId,
      email,
      role,
      status: 'PENDING',
      token: 'INVTOKEN_' + Math.random().toString(36).substring(2),
      invitedBy,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    invs.unshift(newInv);
    localStorage.setItem(STORAGE_INVITATIONS, JSON.stringify(invs));
    return newInv;
  }

  public static getInvitations(companyId: string): CustomerInvitation[] {
    const invs: CustomerInvitation[] = JSON.parse(localStorage.getItem(STORAGE_INVITATIONS) || '[]');
    return invs.filter((i) => i.companyId === companyId);
  }

  public static logActivity(companyId: string, userId: string, userName: string, type: string, entityType: string, entityId: string, metadata?: Record<string, any>) {
    const acts: CustomerActivity[] = JSON.parse(localStorage.getItem(STORAGE_ACTIVITIES) || '[]');
    acts.unshift({
      id: 'ACT-' + Date.now(),
      companyId,
      userId,
      userName,
      type,
      entityType,
      entityId,
      metadata,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_ACTIVITIES, JSON.stringify(acts));
  }

  public static getActivities(companyId: string): CustomerActivity[] {
    const acts: CustomerActivity[] = JSON.parse(localStorage.getItem(STORAGE_ACTIVITIES) || '[]');
    return acts.filter((a) => a.companyId === companyId);
  }

  public static requestConsultation(companyId: string, userId: string, userName: string, data: { topic: string; preferredDate: string; message: string }) {
    this.logActivity(companyId, userId, userName, 'REQUEST_CONSULTATION', 'Lead', companyId, data);
    return { success: true, message: 'Permintaan konsultasi Anda telah diterima. Tim Technical Consultant SMART-AI.ID akan menghubungi Anda segera.' };
  }
}
