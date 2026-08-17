import { CustomerPortalService } from './CustomerPortalService';
import { CustomerProject, Ticket } from '../types';

export class CustomerDashboardService {
  public static getDashboardKPIs(companyId: string, companyName?: string) {
    const projects = CustomerPortalService.getProjects(companyId);
    const activeProjects = projects.filter((p) => p.status === 'IN_PROGRESS' || p.status === 'PLANNING' || p.status === 'UAT');
    const completedProjects = projects.filter((p) => p.status === 'COMPLETED');

    const proposals = CustomerPortalService.getProposals(companyId, companyName);
    const pendingProposals = proposals.filter((p) => p.status === 'SENT' || p.status === 'VIEWED');

    const quotations = CustomerPortalService.getQuotations(companyId, companyName);
    const approvedQuotations = quotations.filter((q) => q.status === 'APPROVED');

    const invoices = CustomerPortalService.getInvoices(companyId, companyName);
    const outstandingInvoices = invoices.filter((inv) => inv.status === 'SENT' || inv.status === 'PARTIALLY_PAID' || inv.status === 'OVERDUE');
    
    const totalOutstandingAmount = outstandingInvoices.reduce((sum, inv) => sum + (inv.outstandingAmount || 0), 0);
    const overdueInvoices = invoices.filter((inv) => inv.status === 'OVERDUE');

    const tickets = CustomerPortalService.getTickets(companyId);
    const openTickets = tickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS' || t.status === 'WAITING_CUSTOMER');

    // Milestones from projects
    const upcomingMilestones: { projectName: string; milestoneName: string; dueDate: string; progress: number; status: string }[] = [];
    projects.forEach((proj) => {
      proj.milestones.forEach((m) => {
        if (m.status === 'UPCOMING' || m.status === 'IN_PROGRESS') {
          upcomingMilestones.push({
            projectName: proj.projectName,
            milestoneName: m.name,
            dueDate: m.dueDate,
            progress: m.progress,
            status: m.status
          });
        }
      });
    });

    return {
      activeProjectsCount: activeProjects.length,
      totalProjectsCount: projects.length,
      completedProjectsCount: completedProjects.length,
      pendingProposalsCount: pendingProposals.length,
      approvedQuotationsCount: approvedQuotations.length,
      outstandingInvoicesCount: outstandingInvoices.length,
      totalOutstandingAmount,
      overdueInvoicesCount: overdueInvoices.length,
      openTicketsCount: openTickets.length,
      activeProjects,
      pendingProposals,
      outstandingInvoices,
      openTickets,
      upcomingMilestones: upcomingMilestones.slice(0, 5)
    };
  }
}
