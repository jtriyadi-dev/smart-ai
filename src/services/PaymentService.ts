import {
  Payment,
  PaymentAllocation,
  Invoice,
  PaymentMethodType
} from '../types';
import { PaymentStatusService } from './PaymentStatusService';
import { ReceiptService } from './ReceiptService';
import { ActivityService } from './activityService';

const PAYMENT_STORAGE_KEY = 'smart_ai_payments_v1';

export interface RecordPaymentPayload {
  invoiceId: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: PaymentMethodType;
  referenceNumber: string;
  externalReference?: string;
  bank: string;
  account?: string;
  notes?: string;
  proofUrl?: string;
  proofFileName?: string;
  appliedExchangeRate?: number;
  actor?: string;
}

export class PaymentService {
  public static getAllPayments(): Payment[] {
    try {
      const data = localStorage.getItem(PAYMENT_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse payments from storage', e);
    }
    return [];
  }

  public static savePayments(list: Payment[]): void {
    try {
      localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save payments', e);
    }
  }

  public static getPaymentsForInvoice(invoiceId: string): Payment[] {
    return this.getAllPayments().filter(
      (p) => p.invoiceId === invoiceId && p.status === 'VALID'
    );
  }

  public static getPaymentById(id: string): Payment | undefined {
    return this.getAllPayments().find((p) => p.id === id || p.paymentNumber === id);
  }

  public static generatePaymentNumber(): string {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const payments = this.getAllPayments();
    const countToday = payments.filter((p) => p.paymentNumber.includes(dateStr)).length + 1;
    return `TRX-${dateStr}-${String(countToday).padStart(3, '0')}`;
  }

  public static validatePayment(payload: RecordPaymentPayload, invoice: Invoice): { valid: boolean; error?: string } {
    if (!invoice) {
      return { valid: false, error: 'Invoice not found.' };
    }
    if (invoice.status === 'CANCELLED') {
      return { valid: false, error: 'Cannot record payment for a cancelled invoice.' };
    }
    if (payload.amount <= 0) {
      return { valid: false, error: 'Payment amount must be greater than zero. Negative payments are not allowed.' };
    }
    if (!payload.paymentDate) {
      return { valid: false, error: 'Payment date is required.' };
    }
    if (!payload.paymentMethod) {
      return { valid: false, error: 'Payment method is required.' };
    }
    return { valid: true };
  }

  public static calculateTotalPaidForInvoice(invoiceId: string): number {
    const validPayments = this.getPaymentsForInvoice(invoiceId);
    return validPayments.reduce((sum, p) => sum + (p.invoiceCurrencyAmount || p.amount), 0);
  }

  public static recordPayment(
    payload: RecordPaymentPayload,
    invoice: Invoice,
    updateInvoiceFn: (updatedInv: Invoice) => void
  ): {
    payment: Payment;
    receipt: any;
    isOverpaid: boolean;
    overpaidAmount: number;
  } {
    const validation = this.validatePayment(payload, invoice);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const actor = payload.actor || 'Finance User';
    const paymentNumber = this.generatePaymentNumber();

    // Check currency mismatch
    let invoiceCurrencyAmount = payload.amount;
    if (payload.currency !== invoice.currency) {
      const rate = payload.appliedExchangeRate || 1;
      invoiceCurrencyAmount = payload.amount * rate;
    }

    const currentPaid = this.calculateTotalPaidForInvoice(invoice.id);
    const newTotalPaid = currentPaid + invoiceCurrencyAmount;
    const outstandingBefore = Math.max(0, invoice.grandTotal - currentPaid);

    const isOverpaid = invoiceCurrencyAmount > outstandingBefore;
    const overpaidAmount = isOverpaid ? invoiceCurrencyAmount - outstandingBefore : 0;

    const allocationId = `alloc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const allocation: PaymentAllocation = {
      id: allocationId,
      paymentId: '', // set below
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      allocatedAmount: Math.min(invoiceCurrencyAmount, outstandingBefore),
      currency: invoice.currency,
      exchangeRate: payload.appliedExchangeRate || 1,
      createdAt: new Date().toISOString()
    };

    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    allocation.paymentId = paymentId;

    const newPayment: Payment = {
      id: paymentId,
      paymentNumber,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      companyName: invoice.companyName,
      amount: payload.amount,
      currency: payload.currency,
      appliedExchangeRate: payload.appliedExchangeRate || 1,
      invoiceCurrencyAmount,
      paymentDate: payload.paymentDate,
      paymentMethod: payload.paymentMethod,
      referenceNumber: payload.referenceNumber || `REF-${Date.now().toString().slice(-6)}`,
      externalReference: payload.externalReference,
      bank: payload.bank || 'Bank Transfer',
      account: payload.account,
      notes: payload.notes || 'Payment recorded via Financial System',
      status: 'VALID',
      proofUrl: payload.proofUrl,
      proofFileName: payload.proofFileName,
      allocations: [allocation],
      createdBy: actor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save payment
    const payments = this.getAllPayments();
    payments.unshift(newPayment);
    this.savePayments(payments);

    // Update invoice state
    const updatedInvoice: Invoice = { ...invoice };
    updatedInvoice.paidAmount = newTotalPaid;
    updatedInvoice.outstandingAmount = Math.max(0, updatedInvoice.grandTotal - newTotalPaid);
    updatedInvoice.paymentStatus = PaymentStatusService.calculatePaymentStatus(
      updatedInvoice.grandTotal,
      newTotalPaid
    );
    updatedInvoice.status = PaymentStatusService.calculateInvoiceStatus(
      updatedInvoice.status,
      updatedInvoice.grandTotal,
      newTotalPaid,
      updatedInvoice.dueDate
    );

    // Audit log on invoice
    updatedInvoice.auditLogs = updatedInvoice.auditLogs || [];
    updatedInvoice.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      invoiceId: invoice.id,
      action: 'PAYMENT_RECORDED',
      performedBy: actor,
      details: `Pembayaran sebesar ${payload.currency} ${payload.amount.toLocaleString('id-ID')} dicatat (${paymentNumber}, Method: ${payload.paymentMethod})`,
      timestamp: new Date().toISOString()
    });

    // Save updated invoice
    updateInvoiceFn(updatedInvoice);

    // Issue Receipt automatically
    const receipt = ReceiptService.generateReceipt(newPayment, updatedInvoice, actor);
    newPayment.receiptId = receipt.id;
    newPayment.receiptNumber = receipt.receiptNumber;

    // Save updated payment with receipt link
    const updatedPayments = this.getAllPayments();
    const idx = updatedPayments.findIndex((p) => p.id === newPayment.id);
    if (idx !== -1) {
      updatedPayments[idx] = newPayment;
      this.savePayments(updatedPayments);
    }

    // Log CRM Activity
    try {
      ActivityService.logProposalSent(
        invoice.leadId || invoice.companyName,
        `Payment Received (${paymentNumber}): ${payload.currency} ${payload.amount.toLocaleString('id-ID')} for Invoice ${invoice.invoiceNumber}`,
        invoice.companyName
      );
    } catch (e) {
      console.warn('CRM activity log failed', e);
    }

    return {
      payment: newPayment,
      receipt,
      isOverpaid,
      overpaidAmount
    };
  }

  public static voidPayment(
    paymentId: string,
    reason: string,
    actor: string,
    invoice: Invoice,
    updateInvoiceFn: (updatedInv: Invoice) => void
  ): { success: boolean; message: string } {
    const payments = this.getAllPayments();
    const payment = payments.find((p) => p.id === paymentId);

    if (!payment) {
      return { success: false, message: 'Payment record not found.' };
    }
    if (payment.status === 'VOIDED') {
      return { success: false, message: 'Payment is already voided.' };
    }

    payment.status = 'VOIDED';
    payment.voidReason = reason;
    payment.voidedBy = actor;
    payment.voidedAt = new Date().toISOString();

    this.savePayments(payments);

    // Cancel receipt if exists
    if (payment.receiptId) {
      ReceiptService.cancelReceipt(payment.receiptId, `Payment ${payment.paymentNumber} voided: ${reason}`, actor);
    }

    // Recalculate invoice totals
    const newTotalPaid = this.calculateTotalPaidForInvoice(invoice.id);
    const updatedInvoice: Invoice = { ...invoice };
    updatedInvoice.paidAmount = newTotalPaid;
    updatedInvoice.outstandingAmount = Math.max(0, updatedInvoice.grandTotal - newTotalPaid);
    updatedInvoice.paymentStatus = PaymentStatusService.calculatePaymentStatus(
      updatedInvoice.grandTotal,
      newTotalPaid
    );
    updatedInvoice.status = PaymentStatusService.calculateInvoiceStatus(
      updatedInvoice.status,
      updatedInvoice.grandTotal,
      newTotalPaid,
      updatedInvoice.dueDate
    );

    // Audit log
    updatedInvoice.auditLogs = updatedInvoice.auditLogs || [];
    updatedInvoice.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      invoiceId: invoice.id,
      action: 'PAYMENT_VOIDED',
      performedBy: actor,
      details: `Pembayaran ${payment.paymentNumber} dibatalkan (Reason: ${reason})`,
      timestamp: new Date().toISOString()
    });

    updateInvoiceFn(updatedInvoice);

    return { success: true, message: `Payment ${payment.paymentNumber} successfully voided.` };
  }
}
