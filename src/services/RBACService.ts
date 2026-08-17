import {
  Role,
  Permission,
  UserPermissionOverride,
  AdminUser,
  AdminAuditLog
} from '../types';

const STORAGE_ROLES = 'smart_ai_rbac_roles_v2';
const STORAGE_PERMISSIONS = 'smart_ai_rbac_permissions_v2';
const STORAGE_USER_OVERRIDES = 'smart_ai_rbac_user_overrides_v2';
const STORAGE_ACTIVE_USER = 'smart_ai_rbac_active_user_v2';
const STORAGE_SECURITY_LOGS = 'smart_ai_rbac_security_logs_v2';

export const MODULE_LIST = [
  'DASHBOARD',
  'LEADS',
  'CRM',
  'CUSTOMERS',
  'PROJECTS',
  'SERVICES',
  'INDUSTRIES',
  'PORTFOLIO',
  'BLOG',
  'PROPOSALS',
  'QUOTATIONS',
  'INVOICES',
  'PAYMENTS',
  'SUPPORT',
  'AI',
  'KNOWLEDGE_BASE',
  'SEO',
  'USERS',
  'ROLES',
  'PERMISSIONS',
  'SETTINGS',
  'REPORTS',
  'AUDIT_LOGS'
] as const;

export const ACTION_LIST = [
  'VIEW',
  'CREATE',
  'EDIT',
  'DELETE',
  'APPROVE',
  'PUBLISH',
  'SEND',
  'EXPORT',
  'ASSIGN',
  'ARCHIVE',
  'RESTORE'
] as const;

export class RBACService {
  // -------------------------------------------------------------
  // INITIALIZATION & DEFAULT SEEDING
  // -------------------------------------------------------------
  public static initializeData(): void {
    if (!localStorage.getItem(STORAGE_PERMISSIONS)) {
      const defaultPermissions: Permission[] = [];
      
      MODULE_LIST.forEach((module) => {
        ACTION_LIST.forEach((action) => {
          defaultPermissions.push({
            id: `PERM-${module}-${action}`,
            code: `${module}_${action}`,
            name: `${action} ${module.replace('_', ' ')}`,
            description: `Izin untuk melakukan ${action} pada modul ${module.replace('_', ' ')}`,
            module: module,
            action: action,
            createdAt: '2026-01-01'
          });
        });
      });

      // Add special ownership / tenant permissions
      defaultPermissions.push({
        id: 'PERM-OWN-RECORD',
        code: 'OWN_RECORD',
        name: 'Akses Resource Milik Sendiri',
        description: 'Membatasi penglihatan/pengubahan hanya ke resource milik customer/user bersangkutan',
        module: 'CUSTOMERS',
        action: 'VIEW',
        createdAt: '2026-01-01'
      });

      localStorage.setItem(STORAGE_PERMISSIONS, JSON.stringify(defaultPermissions));
    }

    if (!localStorage.getItem(STORAGE_ROLES)) {
      const rawPerms = localStorage.getItem(STORAGE_PERMISSIONS);
      const permsList: Permission[] = rawPerms ? JSON.parse(rawPerms) : [];
      const allPerms = permsList.map((p) => p.code);

      const superAdminPerms = [...allPerms];

      const adminPerms = allPerms.filter(
        (code) => !code.startsWith('ROLES_DELETE') && !code.startsWith('SETTINGS_DELETE')
      );

      const salesPerms = [
        'DASHBOARD_VIEW',
        'LEADS_VIEW', 'LEADS_CREATE', 'LEADS_EDIT', 'LEADS_ASSIGN', 'LEADS_EXPORT',
        'CRM_VIEW', 'CRM_CREATE', 'CRM_EDIT',
        'CUSTOMERS_VIEW', 'CUSTOMERS_CREATE',
        'PROPOSALS_VIEW', 'PROPOSALS_CREATE', 'PROPOSALS_EDIT', 'PROPOSALS_SEND', 'PROPOSALS_EXPORT',
        'QUOTATIONS_VIEW', 'QUOTATIONS_CREATE', 'QUOTATIONS_EDIT', 'QUOTATIONS_SEND', 'QUOTATIONS_EXPORT',
        'AI_VIEW', 'AI_CREATE',
        'REPORTS_VIEW'
      ];

      const developerPerms = [
        'DASHBOARD_VIEW',
        'PROJECTS_VIEW', 'PROJECTS_CREATE', 'PROJECTS_EDIT', 'PROJECTS_ASSIGN', 'PROJECTS_EXPORT',
        'SERVICES_VIEW', 'SERVICES_EDIT',
        'INDUSTRIES_VIEW',
        'PORTFOLIO_VIEW',
        'BLOG_VIEW',
        'SUPPORT_VIEW', 'SUPPORT_EDIT', 'SUPPORT_ASSIGN',
        'AI_VIEW', 'AI_CREATE',
        'KNOWLEDGE_BASE_VIEW', 'KNOWLEDGE_BASE_CREATE',
        'SETTINGS_VIEW', 'SETTINGS_EDIT',
        'USERS_VIEW',
        'AUDIT_LOGS_VIEW',
        'REPORTS_VIEW',
        'LEADS_VIEW',
        'CRM_VIEW',
        'CUSTOMERS_VIEW',
        'PROPOSALS_VIEW',
        'QUOTATIONS_VIEW',
        'INVOICES_VIEW'
      ];

      const financePerms = [
        'DASHBOARD_VIEW',
        'CUSTOMERS_VIEW',
        'QUOTATIONS_VIEW', 'QUOTATIONS_EXPORT',
        'INVOICES_VIEW', 'INVOICES_CREATE', 'INVOICES_EDIT', 'INVOICES_SEND', 'INVOICES_EXPORT', 'INVOICES_APPROVE',
        'PAYMENTS_VIEW', 'PAYMENTS_CREATE', 'PAYMENTS_EDIT', 'PAYMENTS_EXPORT',
        'REPORTS_VIEW', 'REPORTS_EXPORT'
      ];

      const supportPerms = [
        'DASHBOARD_VIEW',
        'CUSTOMERS_VIEW',
        'PROJECTS_VIEW',
        'SUPPORT_VIEW', 'SUPPORT_CREATE', 'SUPPORT_EDIT', 'SUPPORT_ASSIGN', 'SUPPORT_APPROVE', 'SUPPORT_EXPORT',
        'KNOWLEDGE_BASE_VIEW', 'KNOWLEDGE_BASE_CREATE', 'KNOWLEDGE_BASE_EDIT'
      ];

      const customerPerms = [
        'DASHBOARD_VIEW',
        'PROJECTS_VIEW',
        'PROPOSALS_VIEW',
        'QUOTATIONS_VIEW',
        'INVOICES_VIEW',
        'PAYMENTS_VIEW',
        'SUPPORT_VIEW', 'SUPPORT_CREATE', 'SUPPORT_EDIT',
        'OWN_RECORD'
      ];

      const defaultRoles: Role[] = [
        {
          id: 'ROL-001',
          code: 'SUPER_ADMIN',
          name: 'Super Admin',
          description: 'Akses penuh ke seluruh sistem, manajemen pengguna, RBAC, API, dan pengaturan keamanan.',
          status: 'ACTIVE',
          isSystemRole: true,
          permissions: superAdminPerms,
          userCount: 1,
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'ROL-002',
          code: 'ADMIN',
          name: 'Admin Operational',
          description: 'Akses operasional luas untuk CRM, proyek, keuangan, dan konten tanpa akses hapus sistem kritis.',
          status: 'ACTIVE',
          isSystemRole: true,
          permissions: adminPerms,
          userCount: 2,
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'ROL-003',
          code: 'SALES',
          name: 'Sales & Business Consultant',
          description: 'Fokus pada pengelolaan Leads, CRM, pembuatan proposal, penawaran harga (quotation), dan AI Sales Assistant.',
          status: 'ACTIVE',
          isSystemRole: true,
          permissions: salesPerms,
          userCount: 3,
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'ROL-004',
          code: 'DEVELOPER',
          name: 'Developer & Technical Architect',
          description: 'Fokus pada manajemen proyek, milestone, tugas teknis, dokumen arsitektur, dan tiket support teknis.',
          status: 'ACTIVE',
          isSystemRole: true,
          permissions: developerPerms,
          userCount: 4,
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'ROL-005',
          code: 'FINANCE',
          name: 'Finance & Billing Specialist',
          description: 'Fokus pada pengelolaan penagihan invoice, pencatatan pembayaran, laporan keuangan, dan verifikasi kuitansi.',
          status: 'ACTIVE',
          isSystemRole: true,
          permissions: financePerms,
          userCount: 2,
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'ROL-006',
          code: 'SUPPORT',
          name: 'Customer Support Representative',
          description: 'Fokus pada penanganan tiket bantuan customer, koordinasi penanganan isu, dan basis pengetahuan support.',
          status: 'ACTIVE',
          isSystemRole: true,
          permissions: supportPerms,
          userCount: 3,
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'ROL-007',
          code: 'CUSTOMER',
          name: 'Customer Client Portal',
          description: 'Akses khusus klien untuk melihat proyek, dokumen, proposal, invoice, dan mengajukan tiket bantuan pribadi.',
          status: 'ACTIVE',
          isSystemRole: true,
          permissions: customerPerms,
          userCount: 15,
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'ROL-008',
          code: 'PROJECT_COORDINATOR',
          name: 'Project Coordinator (Custom)',
          description: 'Custom Role untuk koordinasi jadwal, laporan proyek, dan interaksi klien.',
          status: 'ACTIVE',
          isSystemRole: false,
          permissions: ['PROJECTS_VIEW', 'PROJECTS_EDIT', 'CUSTOMERS_VIEW', 'SUPPORT_VIEW'],
          userCount: 1,
          createdAt: '2026-02-10',
          updatedAt: '2026-02-10'
        }
      ];

      localStorage.setItem(STORAGE_ROLES, JSON.stringify(defaultRoles));
    }

    if (!localStorage.getItem(STORAGE_ACTIVE_USER)) {
      const defaultUser: AdminUser = {
        id: 'USR-001',
        name: 'Jay Triyadi',
        email: 'jtriyadi@gmail.com',
        role: 'SUPER_ADMIN',
        roles: ['SUPER_ADMIN'],
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'ACTIVE',
        department: 'Executive Board',
        phone: '+62 812 3456 7890',
        createdAt: '2026-01-10'
      };
      localStorage.setItem(STORAGE_ACTIVE_USER, JSON.stringify(defaultUser));
    }
  }

  // -------------------------------------------------------------
  // PERMISSION QUERIES
  // -------------------------------------------------------------
  public static getPermissions(): Permission[] {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_PERMISSIONS);
    return raw ? JSON.parse(raw) : [];
  }

  public static getPermissionsByModule(): Record<string, Permission[]> {
    const permissions = this.getPermissions();
    const grouped: Record<string, Permission[]> = {};
    permissions.forEach((p) => {
      if (!grouped[p.module]) {
        grouped[p.module] = [];
      }
      grouped[p.module].push(p);
    });
    return grouped;
  }

  // -------------------------------------------------------------
  // ROLE MANAGEMENT (CRUD, DUPLICATE, CLONE)
  // -------------------------------------------------------------
  public static getRoles(): Role[] {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_ROLES);
    return raw ? JSON.parse(raw) : [];
  }

  public static getRoleByCode(code: string): Role | undefined {
    return this.getRoles().find((r) => r.code.toUpperCase() === code.toUpperCase());
  }

  public static saveRole(roleData: Partial<Role>): Role {
    const roles = this.getRoles();
    const now = new Date().toISOString().split('T')[0];

    let code = roleData.code ? roleData.code.toUpperCase().replace(/\s+/g, '_') : 'CUSTOM_ROLE';
    const existingIndex = roles.findIndex((r) => r.id === roleData.id || r.code === code);

    if (existingIndex >= 0) {
      // Update
      const existing = roles[existingIndex];
      const updated: Role = {
        ...existing,
        ...roleData,
        code: existing.isSystemRole ? existing.code : code,
        updatedAt: now
      };
      roles[existingIndex] = updated;
      localStorage.setItem(STORAGE_ROLES, JSON.stringify(roles));

      this.logAudit('SYS', 'Active User', 'SUPER_ADMIN', 'UPDATE_ROLE', 'ROLES', `Mengubah konfig role ${updated.name}`);
      return updated;
    } else {
      // Create
      const newRole: Role = {
        id: `ROL-${Date.now().toString().slice(-4)}`,
        code: code,
        name: roleData.name || 'Custom Role Baru',
        description: roleData.description || 'Custom role khusus organisasi',
        status: roleData.status || 'ACTIVE',
        isSystemRole: false,
        permissions: roleData.permissions || ['DASHBOARD_VIEW'],
        userCount: 0,
        createdAt: now,
        updatedAt: now
      };
      roles.push(newRole);
      localStorage.setItem(STORAGE_ROLES, JSON.stringify(roles));

      this.logAudit('SYS', 'Active User', 'SUPER_ADMIN', 'CREATE_ROLE', 'ROLES', `Membuat role baru ${newRole.name} (${newRole.code})`);
      return newRole;
    }
  }

  public static duplicateRole(sourceRoleCode: string, newRoleName: string): Role {
    const sourceRole = this.getRoleByCode(sourceRoleCode);
    if (!sourceRole) {
      throw new Error(`Role sumber ${sourceRoleCode} tidak ditemukan`);
    }

    const newCode = `${sourceRole.code}_COPY_${Date.now().toString().slice(-4)}`;
    return this.saveRole({
      name: newRoleName,
      code: newCode,
      description: `Duplikat dari role ${sourceRole.name}. ${sourceRole.description}`,
      status: 'ACTIVE',
      isSystemRole: false,
      permissions: [...sourceRole.permissions]
    });
  }

  public static updateRolePermissions(roleCode: string, permissionCodes: string[]): Role {
    const roles = this.getRoles();
    const index = roles.findIndex((r) => r.code.toUpperCase() === roleCode.toUpperCase());
    if (index === -1) {
      throw new Error(`Role ${roleCode} tidak ditemukan`);
    }

    const role = roles[index];
    role.permissions = Array.from(new Set(permissionCodes));
    role.updatedAt = new Date().toISOString().split('T')[0];
    roles[index] = role;

    localStorage.setItem(STORAGE_ROLES, JSON.stringify(roles));
    this.logAudit('SYS', 'Active User', 'SUPER_ADMIN', 'UPDATE_PERMISSIONS', 'ROLES', `Memperbarui ${permissionCodes.length} izin pada role ${role.name}`);
    return role;
  }

  public static toggleRoleStatus(roleCode: string): Role {
    const roles = this.getRoles();
    const index = roles.findIndex((r) => r.code.toUpperCase() === roleCode.toUpperCase());
    if (index === -1) throw new Error('Role tidak ditemukan');

    const role = roles[index];
    if (role.isSystemRole && role.code === 'SUPER_ADMIN') {
      throw new Error('Role SUPER_ADMIN tidak boleh dinonaktifkan!');
    }

    role.status = role.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    role.updatedAt = new Date().toISOString().split('T')[0];
    roles[index] = role;

    localStorage.setItem(STORAGE_ROLES, JSON.stringify(roles));
    this.logAudit('SYS', 'Active User', 'SUPER_ADMIN', 'TOGGLE_ROLE_STATUS', 'ROLES', `Mengubah status role ${role.name} menjadi ${role.status}`);
    return role;
  }

  public static deleteRole(roleCode: string): { success: boolean; message?: string } {
    const roles = this.getRoles();
    const role = roles.find((r) => r.code.toUpperCase() === roleCode.toUpperCase());

    if (!role) {
      return { success: false, message: 'Role tidak ditemukan' };
    }

    if (role.isSystemRole) {
      return { success: false, message: 'System Role bawaan tidak boleh dihapus!' };
    }

    if (role.userCount && role.userCount > 0) {
      return { success: false, message: `Role masih digunakan oleh ${role.userCount} pengguna. Pindahkan user terlebih dahulu.` };
    }

    const filtered = roles.filter((r) => r.code.toUpperCase() !== roleCode.toUpperCase());
    localStorage.setItem(STORAGE_ROLES, JSON.stringify(filtered));

    this.logAudit('SYS', 'Active User', 'SUPER_ADMIN', 'DELETE_ROLE', 'ROLES', `Menghapus role custom ${role.name}`);
    return { success: true };
  }

  // -------------------------------------------------------------
  // USER PERMISSION OVERRIDES & EFFECTIVE PERMISSIONS
  // -------------------------------------------------------------
  public static getUserOverrides(userId: string): UserPermissionOverride[] {
    const raw = localStorage.getItem(STORAGE_USER_OVERRIDES);
    const overrides: UserPermissionOverride[] = raw ? JSON.parse(raw) : [];
    return overrides.filter((o) => o.userId === userId);
  }

  public static setUserOverride(userId: string, permissionCode: string, effect: 'ALLOW' | 'DENY', assignedBy = 'SUPER_ADMIN'): void {
    const raw = localStorage.getItem(STORAGE_USER_OVERRIDES);
    let overrides: UserPermissionOverride[] = raw ? JSON.parse(raw) : [];

    // Remove existing for same user & permission
    overrides = overrides.filter((o) => !(o.userId === userId && o.permissionCode === permissionCode));

    overrides.push({
      userId,
      permissionCode,
      effect,
      createdAt: new Date().toISOString().split('T')[0],
      assignedBy
    });

    localStorage.setItem(STORAGE_USER_OVERRIDES, JSON.stringify(overrides));
    this.logAudit('SYS', 'Active User', 'SUPER_ADMIN', 'SET_USER_OVERRIDE', 'USERS', `Set explicit override ${effect} untuk ${permissionCode} pada user ${userId}`);
  }

  public static removeUserOverride(userId: string, permissionCode: string): void {
    const raw = localStorage.getItem(STORAGE_USER_OVERRIDES);
    let overrides: UserPermissionOverride[] = raw ? JSON.parse(raw) : [];
    overrides = overrides.filter((o) => !(o.userId === userId && o.permissionCode === permissionCode));
    localStorage.setItem(STORAGE_USER_OVERRIDES, JSON.stringify(overrides));
  }

  public static getUserEffectivePermissions(user: AdminUser): string[] {
    if (!user) return [];

    const userRoles = user.roles && user.roles.length > 0 ? user.roles : [user.role];
    const rolesList = this.getRoles();

    // Union permissions across assigned roles
    const permissionSet = new Set<string>();

    userRoles.forEach((roleCode) => {
      const matchedRole = rolesList.find((r) => r.code.toUpperCase() === roleCode.toUpperCase() && r.status === 'ACTIVE');
      if (matchedRole) {
        matchedRole.permissions.forEach((p) => permissionSet.add(p));
      }
    });

    // Apply explicit user permission overrides (DENY has top priority)
    const overrides = user.permissionOverrides || this.getUserOverrides(user.id);
    overrides.forEach((ov) => {
      if (ov.effect === 'ALLOW') {
        permissionSet.add(ov.permissionCode);
      } else if (ov.effect === 'DENY') {
        permissionSet.delete(ov.permissionCode);
      }
    });

    return Array.from(permissionSet);
  }

  // -------------------------------------------------------------
  // AUTHORIZATION GUARDS & RESOURCE OWNERSHIP CHECKS
  // -------------------------------------------------------------
  public static hasPermission(
    user: AdminUser | null,
    permissionCode: string,
    resourceContext?: { customerId?: string; companyId?: string; ownerId?: string }
  ): boolean {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true; // Super Admin bypass

    const effectivePermissions = this.getUserEffectivePermissions(user);

    // Explicit check
    const hasBasePermission = effectivePermissions.includes(permissionCode);

    if (!hasBasePermission) {
      return false;
    }

    // Customer Isolation Guard
    if (user.role === 'CUSTOMER') {
      if (resourceContext?.customerId && user.customerId) {
        if (resourceContext.customerId !== user.customerId) {
          return false; // Cross customer block
        }
      }
      if (resourceContext?.companyId && user.companyId) {
        if (resourceContext.companyId !== user.companyId) {
          return false; // Cross company tenant block
        }
      }
    }

    return true;
  }

  public static checkTenantAccess(user: AdminUser | null, targetCustomerId?: string, targetCompanyId?: string): boolean {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') return true;

    if (user.role === 'CUSTOMER') {
      if (targetCustomerId && user.customerId && targetCustomerId !== user.customerId) {
        return false;
      }
      if (targetCompanyId && user.companyId && targetCompanyId !== user.companyId) {
        return false;
      }
    }
    return true;
  }

  // -------------------------------------------------------------
  // ACTIVE USER CONTEXT & SESSION SIMULATION
  // -------------------------------------------------------------
  public static getCurrentUser(): AdminUser {
    this.initializeData();
    const raw = localStorage.getItem(STORAGE_ACTIVE_USER);
    if (raw) {
      return JSON.parse(raw);
    }
    return {
      id: 'USR-001',
      name: 'Jay Triyadi',
      email: 'jtriyadi@gmail.com',
      role: 'SUPER_ADMIN',
      roles: ['SUPER_ADMIN'],
      status: 'ACTIVE',
      createdAt: '2026-01-10'
    };
  }

  public static setCurrentUserRole(roleCode: string): AdminUser {
    const user = this.getCurrentUser();
    const roleObj = this.getRoleByCode(roleCode);
    const newRoleCode = roleObj ? roleObj.code : roleCode;

    const updatedUser: AdminUser = {
      ...user,
      role: newRoleCode,
      roles: [newRoleCode]
    };

    localStorage.setItem(STORAGE_ACTIVE_USER, JSON.stringify(updatedUser));
    this.logAudit(updatedUser.id, updatedUser.name, updatedUser.role, 'SWITCH_ROLE', 'SESSION', `Simulasi pergantian role menjadi ${newRoleCode}`);
    return updatedUser;
  }

  // -------------------------------------------------------------
  // SECURITY AUDIT LOGGING
  // -------------------------------------------------------------
  public static logAudit(userId: string, userName: string, userRole: string, action: string, module: string, details: string): void {
    const raw = localStorage.getItem(STORAGE_SECURITY_LOGS);
    const logs: AdminAuditLog[] = raw ? JSON.parse(raw) : [];

    const newLog: AdminAuditLog = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      userId,
      userName,
      userRole,
      action,
      module,
      details,
      timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'medium' }),
      ipAddress: '180.252.12.98 (Secure Tunnel)'
    };

    logs.unshift(newLog);
    // Keep last 100 entries
    localStorage.setItem(STORAGE_SECURITY_LOGS, JSON.stringify(logs.slice(0, 100)));
  }

  public static getSecurityAuditLogs(): AdminAuditLog[] {
    const raw = localStorage.getItem(STORAGE_SECURITY_LOGS);
    return raw ? JSON.parse(raw) : [];
  }
}
