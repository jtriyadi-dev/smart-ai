export interface InternalUserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'SUPER_ADMIN' | 'DEVELOPER' | 'SALES' | 'PROJECT_MANAGER' | 'FINANCE' | 'CONTENT_MANAGER' | 'SUPPORT';
  department: string;
  phone: string;
  avatarUrl?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  lastLogin?: string;
  createdAt: string;
  permissions?: string[];
  magicToken?: string;
}

export interface CustomerClientAccount {
  id: string;
  companyName: string;
  picName: string;
  picEmail: string;
  picPhone: string;
  industry: string;
  subscriptionPlan: 'Enterprise AI Tier' | 'Professional Cloud' | 'Custom Project SLA' | 'Pilot Prototype';
  assignedProjectCount: number;
  activeProjects: string[];
  portalAccessStatus: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  aiTokenMonthlyLimit: number;
  aiTokenUsageCurrent: number;
  initialPasswordGenerated?: string;
  createdAt: string;
  lastAccess?: string;
}

const STORAGE_INTERNAL_USERS = 'smart_ai_admin_users';
const STORAGE_CUSTOMER_ACCOUNTS = 'smart_ai_customer_portal_accounts';

const DEFAULT_CUSTOMER_ACCOUNTS: CustomerClientAccount[] = [
  {
    id: 'CUST-001',
    companyName: 'PT Nusantara Mining Energy Tbk',
    picName: 'Ir. Hendra Gunawan, MT',
    picEmail: 'hendra.gunawan@nusantaramining.co.id',
    picPhone: '+62 811 8899 0011',
    industry: 'Pertambangan & Alat Berat',
    subscriptionPlan: 'Enterprise AI Tier',
    assignedProjectCount: 2,
    activeProjects: ['Smart Fleet Telemetry & Fuel AI', 'Heavy Equipment Predictive Maintenance'],
    portalAccessStatus: 'ACTIVE',
    aiTokenMonthlyLimit: 500000,
    aiTokenUsageCurrent: 142000,
    createdAt: '2026-02-10',
    lastAccess: 'Hari ini, 09:12'
  },
  {
    id: 'CUST-002',
    companyName: 'RS Medika Sejahtera Hospital Group',
    picName: 'dr. Ratna Kartika, Sp.A',
    picEmail: 'ratna.kartika@medikasejahtera.com',
    picPhone: '+62 812 9900 1122',
    industry: 'Healthcare & Rumah Sakit',
    subscriptionPlan: 'Enterprise AI Tier',
    assignedProjectCount: 1,
    activeProjects: ['SIMRS SATUSEHAT Cloud & AI Voice Scribe'],
    portalAccessStatus: 'ACTIVE',
    aiTokenMonthlyLimit: 750000,
    aiTokenUsageCurrent: 289000,
    createdAt: '2026-03-05',
    lastAccess: 'Kemarin, 14:30'
  },
  {
    id: 'CUST-003',
    companyName: 'PT Agro Sawit Makmur Group',
    picName: 'Bambang Sudiro, S.P.',
    picEmail: 'bambang.sudiro@sawitmakmur.co.id',
    picPhone: '+62 813 4455 6677',
    industry: 'Perkebunan Kelapa Sawit',
    subscriptionPlan: 'Professional Cloud',
    assignedProjectCount: 1,
    activeProjects: ['TBS Harvest Logistics & Mandor Mobile App'],
    portalAccessStatus: 'ACTIVE',
    aiTokenMonthlyLimit: 250000,
    aiTokenUsageCurrent: 98000,
    createdAt: '2026-04-12',
    lastAccess: '14 Aug 2026'
  },
  {
    id: 'CUST-004',
    companyName: 'Klinik Pratama Sehat Terpadu',
    picName: 'dr. Kevin Sanjaya',
    picEmail: 'kevin.sanjaya@kliniksehat.id',
    picPhone: '+62 815 1234 5678',
    industry: 'Klinik Pratama',
    subscriptionPlan: 'Professional Cloud',
    assignedProjectCount: 1,
    activeProjects: ['Smart Clinic Queue & RME Kemenkes'],
    portalAccessStatus: 'ACTIVE',
    aiTokenMonthlyLimit: 150000,
    aiTokenUsageCurrent: 32000,
    createdAt: '2026-05-18',
    lastAccess: 'Hari ini, 08:20'
  }
];

export class UserAccountManagementService {
  // -------------------------------------------------------------
  // INTERNAL USERS
  // -------------------------------------------------------------
  public static getAllInternalUsers(): InternalUserAccount[] {
    try {
      const stored = localStorage.getItem(STORAGE_INTERNAL_USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse internal users', e);
    }

    const defaultUsers: InternalUserAccount[] = [
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
        createdAt: '2026-01-10',
        magicToken: 'magic_jtriyadi_dev_master'
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
        phone: '+62 818 0987 6543',
        lastLogin: 'Kemarin, 11:20',
        createdAt: '2026-03-20'
      }
    ];

    localStorage.setItem(STORAGE_INTERNAL_USERS, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  public static createInternalUser(
    user: Omit<InternalUserAccount, 'id' | 'createdAt'>
  ): InternalUserAccount {
    const list = this.getAllInternalUsers();
    const newUser: InternalUserAccount = {
      ...user,
      id: `USR-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      magicToken: `magic_${Math.random().toString(36).substring(2, 10)}`
    };
    list.unshift(newUser);
    localStorage.setItem(STORAGE_INTERNAL_USERS, JSON.stringify(list));
    return newUser;
  }

  public static updateInternalUser(
    id: string,
    updates: Partial<InternalUserAccount>
  ): InternalUserAccount | null {
    const list = this.getAllInternalUsers();
    const index = list.findIndex((u) => u.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    localStorage.setItem(STORAGE_INTERNAL_USERS, JSON.stringify(list));
    return list[index];
  }

  public static deleteInternalUser(id: string): boolean {
    const list = this.getAllInternalUsers();
    const filtered = list.filter((u) => u.id !== id);
    localStorage.setItem(STORAGE_INTERNAL_USERS, JSON.stringify(filtered));
    return true;
  }

  // -------------------------------------------------------------
  // CUSTOMER / CLIENT ACCOUNTS
  // -------------------------------------------------------------
  public static getAllCustomerAccounts(): CustomerClientAccount[] {
    try {
      const stored = localStorage.getItem(STORAGE_CUSTOMER_ACCOUNTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse customer accounts', e);
    }
    localStorage.setItem(STORAGE_CUSTOMER_ACCOUNTS, JSON.stringify(DEFAULT_CUSTOMER_ACCOUNTS));
    return DEFAULT_CUSTOMER_ACCOUNTS;
  }

  public static createCustomerAccount(
    cust: Omit<CustomerClientAccount, 'id' | 'createdAt'>
  ): CustomerClientAccount {
    const list = this.getAllCustomerAccounts();
    const newCust: CustomerClientAccount = {
      ...cust,
      id: `CUST-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(newCust);
    localStorage.setItem(STORAGE_CUSTOMER_ACCOUNTS, JSON.stringify(list));
    return newCust;
  }

  public static updateCustomerAccount(
    id: string,
    updates: Partial<CustomerClientAccount>
  ): CustomerClientAccount | null {
    const list = this.getAllCustomerAccounts();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    localStorage.setItem(STORAGE_CUSTOMER_ACCOUNTS, JSON.stringify(list));
    return list[index];
  }

  public static deleteCustomerAccount(id: string): boolean {
    const list = this.getAllCustomerAccounts();
    const filtered = list.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_CUSTOMER_ACCOUNTS, JSON.stringify(filtered));
    return true;
  }

  public static generateTemporaryPassword(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
