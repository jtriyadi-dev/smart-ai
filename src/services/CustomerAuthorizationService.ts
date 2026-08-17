import { CustomerRole } from '../types';

export class CustomerAuthorizationService {
  public static canViewProject(role: CustomerRole): boolean {
    return role === 'CUSTOMER_ADMIN' || role === 'CUSTOMER_PROJECT_MANAGER' || role === 'CUSTOMER_USER';
  }

  public static canManageProject(role: CustomerRole): boolean {
    return role === 'CUSTOMER_ADMIN' || role === 'CUSTOMER_PROJECT_MANAGER';
  }

  public static canViewFinancials(role: CustomerRole): boolean {
    return role === 'CUSTOMER_ADMIN' || role === 'CUSTOMER_FINANCE';
  }

  public static canManageFinancials(role: CustomerRole): boolean {
    return role === 'CUSTOMER_ADMIN' || role === 'CUSTOMER_FINANCE';
  }

  public static canViewTickets(role: CustomerRole): boolean {
    return true; // All client roles can view tickets
  }

  public static canCreateTicket(role: CustomerRole): boolean {
    return true; // All client roles can open tickets
  }

  public static canViewDocuments(role: CustomerRole): boolean {
    return true;
  }

  public static canManageCompanyUsers(role: CustomerRole): boolean {
    return role === 'CUSTOMER_ADMIN';
  }

  public static canManageSettings(role: CustomerRole): boolean {
    return role === 'CUSTOMER_ADMIN';
  }
}
