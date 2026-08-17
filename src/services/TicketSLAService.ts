import { Ticket, SLAStatus, TicketPriority } from '../types';
import { SupportTicketService } from './SupportTicketService';

export class TicketSLAService {
  /**
   * Determine SLA status: ON_TIME, AT_RISK (<25% time remaining), or BREACHED
   */
  public static getSLAStatus(ticket: Ticket): {
    status: SLAStatus;
    hoursRemaining: number;
    minutesRemaining: number;
    isBreached: boolean;
    displayLabel: string;
  } {
    const targetIso = ticket.resolutionDueAt || ticket.responseDueAt;
    if (!targetIso) {
      return {
        status: 'ON_TIME',
        hoursRemaining: 24,
        minutesRemaining: 0,
        isBreached: false,
        displayLabel: 'SLA On Track'
      };
    }

    const now = new Date().getTime();
    const dueTime = new Date(targetIso).getTime();
    const diffMs = dueTime - now;

    if (diffMs <= 0) {
      const overMs = Math.abs(diffMs);
      const hoursOver = Math.floor(overMs / (1000 * 3600));
      const minsOver = Math.floor((overMs % (1000 * 3600)) / (1000 * 60));
      return {
        status: 'BREACHED',
        hoursRemaining: -hoursOver,
        minutesRemaining: -minsOver,
        isBreached: true,
        displayLabel: `SLA Breached by ${hoursOver}h ${minsOver}m`
      };
    }

    const totalHours = Math.floor(diffMs / (1000 * 3600));
    const totalMins = Math.floor((diffMs % (1000 * 3600)) / (1000 * 60));

    // Calculate total policy window hours
    const createdTime = new Date(ticket.createdAt).getTime();
    const totalPolicyMs = dueTime - createdTime;
    const ratioLeft = diffMs / totalPolicyMs;

    const status: SLAStatus = ratioLeft < 0.25 ? 'AT_RISK' : 'ON_TIME';

    return {
      status,
      hoursRemaining: totalHours,
      minutesRemaining: totalMins,
      isBreached: false,
      displayLabel: `${totalHours}h ${totalMins}m remaining`
    };
  }

  /**
   * Format SLA target badge details
   */
  public static getSLAColorClasses(status: SLAStatus): { bg: string; text: string; border: string } {
    switch (status) {
      case 'ON_TIME':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30'
        };
      case 'AT_RISK':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          border: 'border-amber-500/30'
        };
      case 'BREACHED':
        return {
          bg: 'bg-rose-500/10',
          text: 'text-rose-400',
          border: 'border-rose-500/30'
        };
      default:
        return {
          bg: 'bg-slate-800',
          text: 'text-slate-300',
          border: 'border-slate-700'
        };
    }
  }
}
