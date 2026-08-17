import { Receipt, ReceiptStatus, Payment, Invoice } from '../types';
import { ReceiptNumberService } from './ReceiptNumberService';

const RECEIPT_STORAGE_KEY = 'smart_ai_receipts_v1';

export class ReceiptService {
  public static getAllReceipts(): Receipt[] {
    try {
      const data = localStorage.getItem(RECEIPT_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse receipts from storage', e);
    }
    return [];
  }

  private static saveReceipts(list: Receipt[]): void {
    try {
      localStorage.setItem(RECEIPT_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save receipts', e);
    }
  }

  public static getReceiptById(id: string): Receipt | undefined {
    return this.getAllReceipts().find((r) => r.id === id || r.receiptNumber === id);
  }

  public static getReceiptByPaymentId(paymentId: string): Receipt | undefined {
    return this.getAllReceipts().find((r) => r.paymentId === paymentId);
  }

  public static getReceiptsForInvoice(invoiceId: string): Receipt[] {
    return this.getAllReceipts().filter((r) => r.invoiceId === invoiceId || r.invoiceNumber === invoiceId);
  }

  public static generateReceipt(payment: Payment, invoice: Invoice, actor: string = 'Finance Admin'): Receipt {
    const receipts = this.getAllReceipts();
    const receiptNumber = ReceiptNumberService.generateReceiptNumber();

    const remainingBalance = Math.max(0, invoice.grandTotal - (invoice.paidAmount + payment.amount));

    const newReceipt: Receipt = {
      id: `rcp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      receiptNumber,
      paymentId: payment.id,
      paymentNumber: payment.paymentNumber,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      companyName: invoice.companyName,
      contactName: invoice.contactName,
      projectName: invoice.projectName,
      amount: payment.amount,
      currency: payment.currency || invoice.currency || 'IDR',
      issuedAt: new Date().toISOString(),
      paymentMethod: payment.paymentMethod,
      referenceNumber: payment.referenceNumber || payment.externalReference || 'N/A',
      remainingBalance,
      notes: payment.notes || `Official Payment Receipt for Invoice ${invoice.invoiceNumber}`,
      status: 'ISSUED',
      createdBy: actor
    };

    receipts.unshift(newReceipt);
    this.saveReceipts(receipts);
    return newReceipt;
  }

  public static cancelReceipt(receiptId: string, reason: string, actor: string = 'Finance Admin'): Receipt | undefined {
    const receipts = this.getAllReceipts();
    const receipt = receipts.find((r) => r.id === receiptId);
    if (!receipt) return undefined;

    receipt.status = 'CANCELLED';
    receipt.cancellationReason = reason;
    receipt.cancelledBy = actor;
    receipt.cancelledAt = new Date().toISOString();

    this.saveReceipts(receipts);
    return receipt;
  }
}
