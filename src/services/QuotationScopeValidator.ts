import { ProposalModule, QuotationItem } from '../types';

export interface ScopeDiffResult {
  hasScopeMismatch: boolean;
  addedModules: string[];
  removedModules: string[];
  matchedModules: string[];
  summaryMessage: string;
}

export class QuotationScopeValidator {
  /**
   * Compares Proposal modules vs Quotation items
   */
  public static validateScopeVsProposal(
    proposalModules: ProposalModule[] = [],
    quotationItems: QuotationItem[] = []
  ): ScopeDiffResult {
    const propNames = (proposalModules || []).map((m) => m.name.toLowerCase().trim());
    const quoteModuleItems = (quotationItems || []).filter(
      (item) => item.category === 'Module' || item.category === 'Package'
    );
    const quoteNames = quoteModuleItems.map((item) => item.name.toLowerCase().trim());

    const addedModules: string[] = [];
    const removedModules: string[] = [];
    const matchedModules: string[] = [];

    // Find modules present in proposal but missing in quotation
    proposalModules.forEach((m) => {
      const lower = m.name.toLowerCase().trim();
      if (quoteNames.some((qn) => qn.includes(lower) || lower.includes(qn))) {
        matchedModules.push(m.name);
      } else {
        removedModules.push(m.name);
      }
    });

    // Find items in quotation that were not in proposal
    quoteModuleItems.forEach((item) => {
      const lower = item.name.toLowerCase().trim();
      if (!propNames.some((pn) => pn.includes(lower) || lower.includes(pn))) {
        addedModules.push(item.name);
      }
    });

    const hasScopeMismatch = addedModules.length > 0 || removedModules.length > 0;

    let summaryMessage = 'Cakupan quotation sesuai dengan proposal yang telah disetujui.';
    if (hasScopeMismatch) {
      const parts: string[] = [];
      if (addedModules.length > 0) {
        parts.push(`${addedModules.length} modul baru ditambahkan: [${addedModules.join(', ')}]`);
      }
      if (removedModules.length > 0) {
        parts.push(`${removedModules.length} modul proposal dikurangi: [${removedModules.join(', ')}]`);
      }
      summaryMessage = `Perhatian: Scope penawaran berbeda dengan proposal awal. ${parts.join('. ')}.`;
    }

    return {
      hasScopeMismatch,
      addedModules,
      removedModules,
      matchedModules,
      summaryMessage
    };
  }
}
