import { Quotation, QuotationAIReview, Proposal } from '../types';
import { QuotationScopeValidator } from './QuotationScopeValidator';

export class QuotationAIReviewService {
  /**
   * Conducts a commercial AI review of the quotation
   */
  public static reviewQuotation(quotation: Quotation, proposal?: Proposal): QuotationAIReview {
    const issues: { category: string; description: string; severity: 'high' | 'medium' | 'low' }[] = [];
    const recommendations: string[] = [];

    let penaltyScore = 0;

    // 1. Check Line Items
    if (!quotation.items || quotation.items.length === 0) {
      issues.push({
        category: 'Pricing Completeness',
        description: 'Quotation tidak memiliki item penawaran sama sekali.',
        severity: 'high'
      });
      penaltyScore += 40;
    } else {
      let zeroPriceCount = 0;
      quotation.items.forEach((item, idx) => {
        if (item.unitPrice === 0) {
          zeroPriceCount++;
        }
        if (!item.description || item.description.trim() === '') {
          issues.push({
            category: 'Item Detail',
            description: `Item #${idx + 1} (${item.name || 'Tanpa Nama'}) tidak memiliki deskripsi spesifikasi.`,
            severity: 'low'
          });
          penaltyScore += 3;
        }
      });

      if (zeroPriceCount > 0) {
        issues.push({
          category: 'Pricing Completeness',
          description: `Terdapat ${zeroPriceCount} item dengan harga Rp 0. Pastikan ini adalah bonus opsional yang disengaja.`,
          severity: 'medium'
        });
        penaltyScore += 10;
        recommendations.push('Berikan catatan eksplisit untuk item berharga Rp 0 (misal: "Gratis Garansi 6 Bulan").');
      }
    }

    // 2. Check Scope Mismatch vs Proposal
    if (proposal && proposal.modules) {
      const scopeDiff = QuotationScopeValidator.validateScopeVsProposal(proposal.modules, quotation.items);
      if (scopeDiff.hasScopeMismatch) {
        issues.push({
          category: 'Scope Consistency',
          description: scopeDiff.summaryMessage,
          severity: 'medium'
        });
        penaltyScore += 15;
        recommendations.push('Jelaskan perubahan scope di bagian Catatan Komersial agar Klien tidak bingung.');
      }
    }

    // 3. Discount Anomaly Check
    if (quotation.discountValue && quotation.discountValue > 0) {
      if (!quotation.discountReason || quotation.discountReason.trim() === '') {
        issues.push({
          category: 'Discount Governance',
          description: 'Diskon diberikan tanpa menuliskan Alasan Diskon (Discount Reason).',
          severity: 'high'
        });
        penaltyScore += 20;
        recommendations.push('Isi alasan diskon (misal: "Diskon Kemitraan Strategis BUMN") untuk audit internal.');
      }

      if (quotation.discountType === 'Percentage' && quotation.discountValue > 10) {
        issues.push({
          category: 'Discount Threshold',
          description: `Diskon sebesar ${quotation.discountValue}% melebihi ambang batas reguler (10%). Membutuhkan persetujuan Director/Admin.`,
          severity: 'medium'
        });
        penaltyScore += 10;
        recommendations.push('Minta persetujuan khusus dari Direksi sebelum mengirimkan penawaran ini ke Klien.');
      }
    }

    // 4. Tax Verification
    if (!quotation.taxRate || quotation.taxRate === 0) {
      issues.push({
        category: 'Tax Configuration',
        description: 'Tarif pajak diatur ke 0%. Jika proyek ini terutang PPN 11%, mohon cantumkan tarif pajak.',
        severity: 'low'
      });
      penaltyScore += 5;
      recommendations.push('Pastikan kepatuhan perpajakan perusahaan (PPN 11% / Tax Included).');
    }

    // 5. Payment Terms & Milestones
    if (quotation.paymentTermsType === 'Milestone') {
      const totalPct = (quotation.paymentMilestones || []).reduce((sum, m) => sum + (m.percentage || 0), 0);
      if (Math.abs(totalPct - 100) > 0.01) {
        issues.push({
          category: 'Payment Terms',
          description: `Total persentase milestone pembayaran adalah ${totalPct}%, bukan 100%.`,
          severity: 'high'
        });
        penaltyScore += 30;
        recommendations.push('Sesuaikan persentase milestone hingga total bernilai persis 100%.');
      }
    }

    // 6. Validity & Support Clarity
    if (!quotation.validityDays || quotation.validityDays < 7) {
      issues.push({
        category: 'Validity Period',
        description: 'Masa berlaku penawaran sangat singkat (kurang dari 7 hari) atau belum diset.',
        severity: 'low'
      });
      penaltyScore += 5;
    }

    if (!quotation.items?.some((i) => i.category === 'Maintenance' || i.category === 'Cloud')) {
      recommendations.push('Sertakan paket SLA Maintenance & Cloud Infrastructure pendukung agar ada arus pendapatan berulang (Recurring Revenue).');
    }

    const calculatedScore = Math.max(0, 100 - penaltyScore);
    const status: 'READY FOR REVIEW' | 'NEEDS ATTENTION' =
      calculatedScore >= 80 && issues.filter((i) => i.severity === 'high').length === 0
        ? 'READY FOR REVIEW'
        : 'NEEDS ATTENTION';

    if (status === 'READY FOR REVIEW') {
      recommendations.unshift('Dokumen Quotation siap diajukan untuk proses Approval Manajerial.');
    } else {
      recommendations.unshift('Perbaiki isu berprioritas Tinggi/Sedang sebelum mengajukan persetujuan.');
    }

    return {
      id: `REV-${Date.now()}`,
      quotationId: quotation.id,
      score: calculatedScore,
      status,
      issues,
      recommendations,
      createdAt: new Date().toISOString()
    };
  }
}
