import { QuotationItem, DiscountType, PaymentMilestone, Quotation } from '../types';

export class QuotationPricingService {
  /**
   * Calculates subtotal for an array of quotation line items using exact arithmetic
   */
  public static calculateSubtotal(items: QuotationItem[]): number {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => {
      const qty = Math.max(0, item.quantity || 0);
      const price = Math.max(0, item.unitPrice || 0);
      const lineSubtotal = qty * price;
      return sum + lineSubtotal;
    }, 0);
  }

  /**
   * Calculates discount amount based on type (Percentage or Fixed)
   */
  public static calculateDiscount(subtotal: number, type: DiscountType, value: number): number {
    if (!subtotal || subtotal <= 0 || !value || value <= 0) return 0;
    if (type === 'Percentage') {
      const pct = Math.min(100, Math.max(0, value));
      return Math.round((subtotal * pct) / 100);
    } else {
      return Math.min(subtotal, Math.max(0, value));
    }
  }

  /**
   * Calculates tax amount and taxable base
   */
  public static calculateTax(
    subtotal: number,
    discountAmount: number,
    taxRate: number,
    taxIncluded: boolean
  ): { taxAmount: number; taxableAmount: number } {
    const taxableBase = Math.max(0, subtotal - discountAmount);
    if (!taxRate || taxRate <= 0) {
      return { taxAmount: 0, taxableAmount: taxableBase };
    }

    if (taxIncluded) {
      // If tax is included: Taxable Base + Tax = Total
      // Tax = Total * (Rate / (100 + Rate))
      const taxAmount = Math.round((taxableBase * taxRate) / (100 + taxRate));
      const netTaxable = taxableBase - taxAmount;
      return { taxAmount, taxableAmount: netTaxable };
    } else {
      const taxAmount = Math.round((taxableBase * taxRate) / 100);
      return { taxAmount, taxableAmount: taxableBase };
    }
  }

  /**
   * Calculates Grand Total
   */
  public static calculateGrandTotal(taxableAmount: number, taxAmount: number, taxIncluded: boolean): number {
    if (taxIncluded) {
      return Math.round(taxableAmount + taxAmount);
    }
    return Math.round(taxableAmount + taxAmount);
  }

  /**
   * Separates One-time investment from Recurring Costs (Monthly / Annual)
   */
  public static calculateRecurringCost(items: QuotationItem[]): { monthly: number; annual: number; oneTime: number } {
    let monthly = 0;
    let annual = 0;
    let oneTime = 0;

    (items || []).forEach((item) => {
      const lineTotal = item.subtotal - (item.discountAmount || 0);
      if (item.recurringFrequency === 'Monthly') {
        monthly += lineTotal;
      } else if (item.recurringFrequency === 'Annual') {
        annual += lineTotal;
      } else if (item.recurringFrequency === 'Quarterly') {
        monthly += lineTotal / 3;
      } else {
        oneTime += lineTotal;
      }
    });

    return {
      monthly: Math.round(monthly),
      annual: Math.round(annual),
      oneTime: Math.round(oneTime)
    };
  }

  /**
   * Calculates specific currency values for payment milestones based on grandTotal
   */
  public static calculatePaymentMilestones(grandTotal: number, milestones: PaymentMilestone[]): PaymentMilestone[] {
    if (!milestones) return [];
    return milestones.map((m) => {
      const pct = Math.max(0, m.percentage || 0);
      const amount = Math.round((grandTotal * pct) / 100);
      return {
        ...m,
        amount
      };
    });
  }

  /**
   * Performs commercial validation before approval or saving
   */
  public static validatePricing(quotation: Partial<Quotation>): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!quotation.companyName || quotation.companyName.trim() === '') {
      errors.push('Nama perusahaan / customer wajib diisi.');
    }

    if (!quotation.projectName || quotation.projectName.trim() === '') {
      errors.push('Nama proyek wajib diisi.');
    }

    if (!quotation.items || quotation.items.length === 0) {
      errors.push('Quotation wajib memiliki minimal 1 item penawaran.');
    } else {
      quotation.items.forEach((item, idx) => {
        if (item.quantity <= 0) {
          errors.push(`Item #${idx + 1} (${item.name || 'Tanpa Nama'}): Kuantitas harus lebih dari 0.`);
        }
        if (item.unitPrice < 0) {
          errors.push(`Item #${idx + 1} (${item.name || 'Tanpa Nama'}): Harga satuan tidak boleh negatif.`);
        }
        if (item.unitPrice === 0) {
          warnings.push(`Item #${idx + 1} (${item.name || 'Tanpa Nama'}): Item memiliki harga Rp 0 (Zero-price item).`);
        }
      });
    }

    if (quotation.discountValue && quotation.discountValue > 0) {
      if (!quotation.discountReason || quotation.discountReason.trim() === '') {
        errors.push('Alasan diskon (Discount Reason) wajib diisi ketika memberikan diskon.');
      }
      if (quotation.discountType === 'Percentage' && quotation.discountValue > 10) {
        warnings.push('Diskon di atas 10% membutuhkan persetujuan khusus dari Director / Admin.');
      }
    }

    if (quotation.paymentTermsType === 'Milestone') {
      const totalPct = (quotation.paymentMilestones || []).reduce((sum, m) => sum + (m.percentage || 0), 0);
      if (Math.abs(totalPct - 100) > 0.01) {
        errors.push(`Total persentase milestone pembayaran harus tepat 100%. Saat ini: ${totalPct}%.`);
      }
    }

    if (!quotation.validityDays || quotation.validityDays <= 0) {
      warnings.push('Masa berlaku penawaran (validity) belum ditentukan. Default 30 hari.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}
