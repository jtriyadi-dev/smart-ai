import { SupportTicketService } from './SupportTicketService';

const STORAGE_NOTIFICATIONS = 'smart_ai_customer_notifications';

export class SupportNotificationService {
  public static notifyCustomer(data: {
    companyId: string;
    userId: string;
    title: string;
    message: string;
    ticketId: string;
  }): void {
    try {
      const raw = localStorage.getItem(STORAGE_NOTIFICATIONS);
      const list = raw ? JSON.parse(raw) : [];

      const notif = {
        id: `NOTIF-${Date.now()}`,
        companyId: data.companyId,
        userId: data.userId,
        type: 'TICKET',
        title: data.title,
        message: data.message,
        read: false,
        linkUrl: `/portal/support/${data.ticketId}`,
        createdAt: new Date().toISOString()
      };

      list.unshift(notif);
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to dispatch notification', e);
    }
  }

  public static getWhatsAppSupportUrl(ticketNumber?: string, subject?: string): string {
    const settings = SupportTicketService.getSettings();
    const cleanNumber = settings.whatsappSupportNumber.replace(/[^0-9]/g, '');
    let text = `Halo Tim Support SMART-AI.ID, saya membutuhkan bantuan mengenai `;
    if (ticketNumber) {
      text += `Ticket #${ticketNumber} (${subject || ''})`;
    } else {
      text += `layanan aplikasi SMART-AI.ID`;
    }
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  }
}
