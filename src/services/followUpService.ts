import { CRMFollowUp, FollowUpStatus, LeadPriority } from '../types';

const STORAGE_KEY_FOLLOWUPS = 'smart_ai_crm_followups';

export class FollowUpService {
  public static initializeInitialData(): void {
    if (!localStorage.getItem(STORAGE_KEY_FOLLOWUPS)) {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const inThreeDays = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];

      const sampleFollowUps: CRMFollowUp[] = [
        {
          id: 'FOL-001',
          opportunityId: 'OPP-2026-004',
          companyName: 'Logistik Cepat Nusantara',
          contactName: 'Agus Setiawan',
          task: 'Konfirmasi Jadwal Demo AI Route Optimization dengan tim IT Cikarang',
          dueDate: yesterday,
          dueTime: '10:00',
          priority: 'Urgent',
          assignedTo: 'Dewi Lestari',
          status: 'Overdue',
          notes: 'Belum mendapatkan balasan pesan WhatsApp dari Pak Agus.',
          createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
        },
        {
          id: 'FOL-002',
          opportunityId: 'OPP-2026-001',
          companyName: 'PT Nusantara Mining Energy',
          contactName: 'Hendra Gunawan',
          task: 'Follow-up penawaran biaya lisensi modul IoT telemetri tambang',
          dueDate: today,
          dueTime: '14:30',
          priority: 'High',
          assignedTo: 'Budi Santoso',
          notes: 'Kirim reminder invoice proposal V2 via WhatsApp.',
          status: 'Pending',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'FOL-003',
          opportunityId: 'OPP-2026-002',
          companyName: 'RS Medika Sejahtera Utama',
          contactName: 'dr. Anita Wijaya, M.Kes',
          task: 'Kirimkan draf SLA maintenance & keamanan data medis ICD-10',
          dueDate: tomorrow,
          dueTime: '11:00',
          priority: 'High',
          assignedTo: 'Siti Rahma',
          status: 'Pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 'FOL-004',
          opportunityId: 'OPP-2026-003',
          companyName: 'PT Bank Fintek Indonesia',
          contactName: 'Bambang Kusuma',
          task: 'Jadwalkan sesi klarifikasi tim Arsitektur AI & Security Audit',
          dueDate: inThreeDays,
          dueTime: '09:00',
          priority: 'Medium',
          assignedTo: 'Rian Pratama',
          status: 'Pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 'FOL-005',
          companyName: 'Yayasan Pendidikan Smart Generation',
          contactName: 'Maya Putri, M.Pd',
          task: 'Telepon pengenalan produk portal belajar adaptif AI',
          dueDate: yesterday,
          dueTime: '15:00',
          priority: 'Medium',
          assignedTo: 'Budi Santoso',
          status: 'Completed',
          completedAt: new Date(Date.now() - 86400000).toISOString(),
          notes: 'Klien tertarik dan meminta pengiriman proposal kasar.',
          createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
        }
      ];

      localStorage.setItem(STORAGE_KEY_FOLLOWUPS, JSON.stringify(sampleFollowUps));
    }
  }

  public static getFollowUps(): CRMFollowUp[] {
    this.initializeInitialData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY_FOLLOWUPS);
      if (!raw) return [];
      const followUps: CRMFollowUp[] = JSON.parse(raw);

      // Auto update overdue status if pending and past due date
      const today = new Date().toISOString().split('T')[0];
      return followUps.map((f) => {
        if (f.status === 'Pending' && f.dueDate < today) {
          return { ...f, status: 'Overdue' as FollowUpStatus };
        }
        return f;
      });
    } catch {
      return [];
    }
  }

  public static getTodayFollowUps(): CRMFollowUp[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getFollowUps().filter((f) => f.dueDate === today && f.status !== 'Completed' && f.status !== 'Cancelled');
  }

  public static getUpcomingFollowUps(): CRMFollowUp[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getFollowUps().filter((f) => f.dueDate > today && f.status !== 'Completed' && f.status !== 'Cancelled');
  }

  public static getOverdueFollowUps(): CRMFollowUp[] {
    return this.getFollowUps().filter((f) => f.status === 'Overdue');
  }

  public static getCompletedFollowUps(): CRMFollowUp[] {
    return this.getFollowUps().filter((f) => f.status === 'Completed');
  }

  public static createFollowUp(data: Partial<CRMFollowUp>): CRMFollowUp {
    this.initializeInitialData();
    const followUps = this.getFollowUps();

    const today = new Date().toISOString().split('T')[0];
    const newFol: CRMFollowUp = {
      id: `FOL-${Math.floor(100 + Math.random() * 900)}`,
      leadId: data.leadId,
      opportunityId: data.opportunityId,
      companyId: data.companyId,
      contactId: data.contactId,
      leadName: data.leadName,
      companyName: data.companyName || 'Prospek Klien',
      contactName: data.contactName || 'Kontak Utama',
      task: data.task || 'Follow-up tugas baru',
      dueDate: data.dueDate || today,
      dueTime: data.dueTime || '10:00',
      priority: data.priority || 'Medium',
      assignedTo: data.assignedTo || 'Budi Santoso',
      status: data.dueDate && data.dueDate < today ? 'Overdue' : 'Pending',
      notes: data.notes || '',
      createdAt: new Date().toISOString()
    };

    followUps.unshift(newFol);
    localStorage.setItem(STORAGE_KEY_FOLLOWUPS, JSON.stringify(followUps));
    return newFol;
  }

  public static updateFollowUp(id: string, updates: Partial<CRMFollowUp>): CRMFollowUp {
    const followUps = this.getFollowUps();
    const index = followUps.findIndex((f) => f.id === id);
    if (index === -1) throw new Error('Follow-up not found');

    const updated: CRMFollowUp = {
      ...followUps[index],
      ...updates
    };

    followUps[index] = updated;
    localStorage.setItem(STORAGE_KEY_FOLLOWUPS, JSON.stringify(followUps));
    return updated;
  }

  public static completeFollowUp(id: string, notes?: string): CRMFollowUp {
    return this.updateFollowUp(id, {
      status: 'Completed',
      completedAt: new Date().toISOString(),
      notes: notes ? `${notes}` : undefined
    });
  }

  public static rescheduleFollowUp(id: string, newDate: string, newTime: string): CRMFollowUp {
    const today = new Date().toISOString().split('T')[0];
    return this.updateFollowUp(id, {
      dueDate: newDate,
      dueTime: newTime,
      status: newDate < today ? 'Overdue' : 'Pending'
    });
  }

  public static cancelFollowUp(id: string): CRMFollowUp {
    return this.updateFollowUp(id, { status: 'Cancelled' });
  }
}
