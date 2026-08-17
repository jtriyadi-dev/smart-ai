import { CustomerPortalService } from './CustomerPortalService';
import { CustomerDashboardService } from './CustomerDashboardService';

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'PROJECT' | 'FINANCIAL' | 'TICKET' | 'GENERAL';
}

export class AICustomerAssistantService {
  /**
   * Process client prompt securely with company-restricted context
   */
  public static async answerClientQuestion(
    companyId: string,
    companyName: string,
    prompt: string
  ): Promise<{ answer: string; category: 'PROJECT' | 'FINANCIAL' | 'TICKET' | 'GENERAL' }> {
    const kpis = CustomerDashboardService.getDashboardKPIs(companyId, companyName);
    const projects = CustomerPortalService.getProjects(companyId);
    const invoices = CustomerPortalService.getInvoices(companyId, companyName);
    const tickets = CustomerPortalService.getTickets(companyId);
    const proposals = CustomerPortalService.getProposals(companyId, companyName);

    const lower = prompt.toLowerCase();

    // 1. Project Progress Questions
    if (lower.includes('progress') || lower.includes('proyek') || lower.includes('project') || lower.includes('selesai') || lower.includes('kapan')) {
      if (projects.length === 0) {
        return {
          category: 'PROJECT',
          answer: `Saat ini belum ada proyek aktif yang tercatat untuk ${companyName}. Jika Anda sedang mengajukan proyek baru, Anda dapat memantau status Proposal atau Quotation pada menu navigasi portal.`
        };
      }

      const projListText = projects.map((p) => {
        const nextM = p.milestones.find((m) => m.status === 'IN_PROGRESS' || m.status === 'UPCOMING');
        return `• **${p.projectName}**: Status **${p.status}** (${p.progressPercentage}% selesai).\n  - Target Selesai: **${p.expectedCompletion}**\n  - Milestone Terdekat: **${nextM ? nextM.name + ' (' + nextM.dueDate + ')' : 'Semua Milestone Selesai'}**\n  - Modul Selesai: ${p.modules.filter((m) => m.status === 'Completed').length} dari ${p.modules.length} modul.`;
      }).join('\n\n');

      return {
        category: 'PROJECT',
        answer: `Berikut ringkasan status & progress proyek **${companyName}**:\n\n${projListText}\n\n*Tim SMART-AI.ID selalu memastikan pengiriman tepat waktu sesuai SLA proyek Anda.*`
      };
    }

    // 2. Invoice & Financial Questions
    if (lower.includes('invoice') || lower.includes('bayar') || lower.includes('pembayaran') || lower.includes('tagihan') || lower.includes('outstanding') || lower.includes('overdue')) {
      const outstanding = invoices.filter((inv) => inv.status === 'SENT' || inv.status === 'PARTIALLY_PAID' || inv.status === 'OVERDUE');

      if (outstanding.length === 0) {
        return {
          category: 'FINANCIAL',
          answer: `Selamat! **${companyName}** tidak memiliki tagihan outstanding atau invoice tertunggak saat ini. Semua kewajiban pembayaran telah lunas (PAID).`
        };
      }

      const invText = outstanding.map((inv) => {
        const fmtTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: inv.currency || 'IDR', maximumFractionDigits: 0 }).format(inv.outstandingAmount);
        return `• **Invoice #${inv.invoiceNumber}**: Sisa Tagihan **${fmtTotal}** | Jatuh Tempo: **${inv.dueDate}** | Status: **${inv.status}**`;
      }).join('\n');

      const totalFmt = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(kpis.totalOutstandingAmount);

      return {
        category: 'FINANCIAL',
        answer: `Ringkasan Tagihan Outstanding untuk **${companyName}**:\n\nTotal Kewajiban Tagihan: **${totalFmt}** (${outstanding.length} invoice)\n\nRincian Invoice:\n${invText}\n\nAnda dapat mengunduh salinan PDF Invoice dan instruksi pembayaran transfer bank langsung dari menu **Invoices** di portal ini.`
      };
    }

    // 3. Ticket & Support Questions
    if (lower.includes('ticket') || lower.includes('tiket') || lower.includes('kendala') || lower.includes('support') || lower.includes('bantuan') || lower.includes('bug')) {
      if (tickets.length === 0) {
        return {
          category: 'TICKET',
          answer: `Saat ini tidak ada Support Ticket terbuka untuk **${companyName}**. Jika Anda mengalami kendala teknis atau memerlukan bantuan, Anda dapat membuka tiket baru via tombol **Open Ticket**.`
        };
      }

      const ticketText = tickets.map((t) => {
        return `• **[${t.ticketNumber}] ${t.subject}**:\n  - Status: **${t.status}** | Prioritas: **${t.priority}** | Kategori: **${t.category}**\n  - Dibuat: ${new Date(t.createdAt).toLocaleDateString('id-ID')}`;
      }).join('\n\n');

      return {
        category: 'TICKET',
        answer: `Berikut status Support Ticket untuk **${companyName}**:\n\n${ticketText}\n\n*Tim Support SMART-AI.ID siap merespons setiap tiket sesuai prioritas.*`
      };
    }

    // 4. Default General Answer
    return {
      category: 'GENERAL',
      answer: `Halo! Saya AI Client Assistant SMART-AI.ID untuk **${companyName}**.\n\nSaya dapat membantu Anda memberikan informasi cepat terkait:\n1. **Progress Proyek** (misal: *"Bagaimana progress project saya?"*)\n2. **Status Tagihan & Invoice** (misal: *"Invoice mana yang belum dibayar?"*)\n3. **Support Ticket** (misal: *"Bagaimana status tiket saya?"*)\n4. **Jadwal Milestone & Estimasi Selesai**\n\nSilakan ajukan pertanyaan Anda!`
    };
  }
}
