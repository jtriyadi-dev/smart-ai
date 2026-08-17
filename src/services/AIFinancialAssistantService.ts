import { Invoice, Payment } from '../types';
import { PaymentStatusService } from './PaymentStatusService';

export interface CollectionPriorityItem {
  invoiceNumber: string;
  companyName: string;
  projectName: string;
  outstandingAmount: number;
  currency: string;
  daysOverdue: number;
  urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: string;
}

export interface AIFinancialInsights {
  summaryText: string;
  totalReceivablesIDR: number;
  totalOverdueIDR: number;
  collectionPriorities: CollectionPriorityItem[];
  riskAlerts: string[];
  recommendations: string[];
}

export class AIFinancialAssistantService {
  public static generateFinancialInsights(invoices: Invoice[], payments: Payment[]): AIFinancialInsights {
    const activeInvoices = invoices.filter((inv) => inv.status !== 'CANCELLED');
    const overdueInvoices = activeInvoices.filter(
      (inv) => inv.status === 'OVERDUE' || PaymentStatusService.isOverdue(inv.dueDate, inv.outstandingAmount)
    );

    let totalReceivablesIDR = 0;
    let totalOverdueIDR = 0;

    activeInvoices.forEach((inv) => {
      const val = inv.currency === 'USD' ? inv.outstandingAmount * (inv.exchangeRate || 16200) : inv.outstandingAmount;
      totalReceivablesIDR += val;
      if (inv.status === 'OVERDUE' || PaymentStatusService.isOverdue(inv.dueDate, inv.outstandingAmount)) {
        totalOverdueIDR += val;
      }
    });

    // Compute Priorities
    const collectionPriorities: CollectionPriorityItem[] = overdueInvoices
      .map((inv) => {
        const daysOverdue = PaymentStatusService.calculateDaysOverdue(inv.dueDate);
        let urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
        let action = 'Kirim penagihan standar via Email & WhatsApp.';

        if (daysOverdue > 30 || inv.outstandingAmount > 200000000) {
          urgencyLevel = 'CRITICAL';
          action = 'Eskalasi ke Manajemen Client / Finance Director & kirimkan Surat Peringatan Resmi.';
        } else if (daysOverdue > 14) {
          urgencyLevel = 'HIGH';
          action = 'Jadwalkan panggilan telepon langsung dengan tim Procurement Client.';
        }

        return {
          invoiceNumber: inv.invoiceNumber,
          companyName: inv.companyName,
          projectName: inv.projectName,
          outstandingAmount: inv.outstandingAmount,
          currency: inv.currency,
          daysOverdue,
          urgencyLevel,
          recommendedAction: action
        };
      })
      .sort((a, b) => b.daysOverdue - a.daysOverdue);

    // Risk alerts
    const riskAlerts: string[] = [];
    if (overdueInvoices.length > 0) {
      riskAlerts.push(
        `Terdapat ${overdueInvoices.length} invoice senilai estimasi Rp ${totalOverdueIDR.toLocaleString('id-ID')} yang telah melewati jatuh tempo.`
      );
    }
    const criticals = collectionPriorities.filter((c) => c.urgencyLevel === 'CRITICAL');
    if (criticals.length > 0) {
      riskAlerts.push(
        `Perhatian khusus pada client ${criticals.map((c) => c.companyName).join(', ')} karena saldo keterlambatan bernilai tinggi.`
      );
    }

    // Recommendations
    const recommendations: string[] = [
      'Prioritaskan penagihan berdasarkan durasi keterlambatan dan besaran outstanding balance.',
      'Aktifkan notifikasi otomatis WhatsApp/Email 3 hari sebelum jatuh tempo untuk mencegah keterlambatan.',
      'Gunakan fitur Payment Allocation jika client melakukan pembayaran terpadu untuk beberapa invoice sekaligus.'
    ];

    const summaryText = `Sistem mencatat total Piutang (Outstanding Receivables) sebesar Rp ${totalReceivablesIDR.toLocaleString('id-ID')} dari ${activeInvoices.length} invoice aktif, di mana Rp ${totalOverdueIDR.toLocaleString('id-ID')} tergolong Overdue.`;

    return {
      summaryText,
      totalReceivablesIDR,
      totalOverdueIDR,
      collectionPriorities,
      riskAlerts,
      recommendations
    };
  }
}
