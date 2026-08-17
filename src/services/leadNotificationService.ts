import { Lead } from '../types';

export class LeadNotificationService {
  /**
   * Abstract notification handler for new leads
   */
  public static async notifyNewLead(lead: Lead): Promise<{ success: boolean; channel: string }> {
    console.log(`[LeadNotificationService] New Lead Received [${lead.referenceCode}]:`, {
      name: lead.name,
      company: lead.company,
      service: lead.service,
      source: lead.source,
      priority: lead.priority,
      score: lead.score.totalScore
    });

    // Simulated email / webhook dispatch abstraction
    return {
      success: true,
      channel: 'Console Abstraction (Ready for SendGrid / Webhook integration)'
    };
  }

  /**
   * Customer Confirmation Email Abstraction
   */
  public static async sendCustomerConfirmation(lead: Lead): Promise<{ success: boolean; message: string }> {
    console.log(`[LeadNotificationService] Customer Confirmation Dispatch to ${lead.email}: Reference Code ${lead.referenceCode}`);
    return {
      success: true,
      message: `Konfirmasi pendaftaran [${lead.referenceCode}] telah diproses untuk ${lead.email}.`
    };
  }
}
