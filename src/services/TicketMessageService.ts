import { TicketMessage, TicketAttachment, TicketMessageType, TicketMessageVisibility } from '../types';
import { SupportTicketService } from './SupportTicketService';

export class TicketMessageService {
  /**
   * Get filtered conversation array for a ticket based on viewer role (Customer vs Support Admin)
   * Internal notes and internal system messages are stripped for customer viewers.
   */
  public static getConversation(ticketId: string, companyIdFilter?: string, isCustomer: boolean = true): TicketMessage[] {
    const ticket = SupportTicketService.getTicketById(ticketId, companyIdFilter, isCustomer);
    if (!ticket || !ticket.messages) return [];

    if (isCustomer) {
      return ticket.messages.filter(
        (m) => m.visibility === 'CUSTOMER_VISIBLE' && m.messageType !== 'INTERNAL_NOTE'
      );
    }

    return ticket.messages;
  }

  /**
   * Send reply or internal note
   */
  public static sendMessage(
    ticketId: string,
    senderId: string,
    senderName: string,
    senderRole: string,
    senderType: 'CUSTOMER' | 'SUPPORT' | 'SYSTEM',
    message: string,
    messageType: TicketMessageType = 'CUSTOMER_REPLY',
    visibility: TicketMessageVisibility = 'CUSTOMER_VISIBLE',
    attachments?: TicketAttachment[]
  ) {
    return SupportTicketService.addMessage(ticketId, {
      senderId,
      senderName,
      senderRole,
      senderType,
      message,
      messageType,
      visibility,
      attachments
    });
  }

  /**
   * Add internal note for support team only
   */
  public static addInternalNote(
    ticketId: string,
    senderId: string,
    senderName: string,
    senderRole: string,
    noteText: string
  ) {
    return SupportTicketService.addMessage(ticketId, {
      senderId,
      senderName,
      senderRole,
      senderType: 'SUPPORT',
      message: noteText,
      messageType: 'INTERNAL_NOTE',
      visibility: 'INTERNAL'
    });
  }
}
