import { Invoice, InvoiceStatus, PaymentStatusType } from '../types';

export class PaymentStatusService {
  public static calculateDaysOverdue(dueDateStr: string): number {
    if (!dueDateStr) return 0;
    const due = new Date(dueDateStr);
    const today = new Date();
    // Normalize time to midnight
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (today <= due) return 0;

    const diffMs = today.getTime() - due.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  public static isOverdue(dueDateStr: string, outstandingAmount: number): boolean {
    if (outstandingAmount <= 0) return false;
    return this.calculateDaysOverdue(dueDateStr) > 0;
  }

  public static calculatePaymentStatus(grandTotal: number, paidAmount: number): PaymentStatusType {
    if (paidAmount <= 0) return 'UNPAID';
    if (paidAmount < grandTotal) return 'PARTIALLY_PAID';
    if (paidAmount === grandTotal) return 'PAID';
    return 'OVERPAID';
  }

  public static calculateInvoiceStatus(
    currentStatus: InvoiceStatus,
    grandTotal: number,
    paidAmount: number,
    dueDateStr: string
  ): InvoiceStatus {
    if (currentStatus === 'CANCELLED') return 'CANCELLED';

    const outstanding = Math.max(0, grandTotal - paidAmount);

    // Rule: PAID > OVERDUE
    if (outstanding <= 0 && grandTotal > 0) {
      return 'PAID';
    }

    const daysOverdue = this.calculateDaysOverdue(dueDateStr);

    if (paidAmount > 0 && outstanding > 0) {
      if (daysOverdue > 0) {
        return 'OVERDUE';
      }
      return 'PARTIALLY_PAID';
    }

    // paidAmount === 0
    if (daysOverdue > 0) {
      return 'OVERDUE';
    }

    if (currentStatus === 'DRAFT') {
      return 'DRAFT';
    }

    return 'SENT';
  }

  public static getAgingReport(invoices: Invoice[]) {
    const report = {
      current: { count: 0, total: 0 },
      days1To30: { count: 0, total: 0 },
      days31To60: { count: 0, total: 0 },
      days61To90: { count: 0, total: 0 },
      days90Plus: { count: 0, total: 0 },
      totalOutstanding: 0
    };

    invoices.forEach((inv) => {
      if (inv.status === 'CANCELLED' || inv.outstandingAmount <= 0) return;

      const outstanding = inv.outstandingAmount;
      const daysOverdue = this.calculateDaysOverdue(inv.dueDate);

      report.totalOutstanding += outstanding;

      if (daysOverdue <= 0) {
        report.current.count += 1;
        report.current.total += outstanding;
      } else if (daysOverdue <= 30) {
        report.days1To30.count += 1;
        report.days1To30.total += outstanding;
      } else if (daysOverdue <= 60) {
        report.days31To60.count += 1;
        report.days31To60.total += outstanding;
      } else if (daysOverdue <= 90) {
        report.days61To90.count += 1;
        report.days61To90.total += outstanding;
      } else {
        report.days90Plus.count += 1;
        report.days90Plus.total += outstanding;
      }
    });

    return report;
  }
}
