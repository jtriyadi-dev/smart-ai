import { CRMActivity, ActivityType } from '../types';

const STORAGE_KEY_ACTIVITIES = 'smart_ai_crm_activities';

export class ActivityService {
  public static initializeInitialData(): void {
    if (!localStorage.getItem(STORAGE_KEY_ACTIVITIES)) {
      const sampleActivities: CRMActivity[] = [
        {
          id: 'ACT-001',
          type: 'WhatsApp',
          subject: 'Kirim Draf Penawaran & Spesifikasi Armada IoT',
          description: 'Mengirimkan dokumen ringkasan arsitektur & modul IoT telemetri ke Bapak Hendra Gunawan via WhatsApp.',
          date: '2026-08-14',
          time: '09:30',
          contactId: 'CONT-001',
          contactName: 'Hendra Gunawan',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          opportunityId: 'OPP-2026-001',
          assignedTo: 'Budi Santoso',
          actor: 'Budi Santoso',
          timestamp: '2026-08-14T09:30:00Z'
        },
        {
          id: 'ACT-002',
          type: 'Meeting',
          subject: 'Diskusi Skenario Triage AI & SIMRS Integration',
          description: 'Sesi meeting Zoom dengan Dr. Anita dan tim IT Rumah Sakit untuk mereview skenario Triage ICD-10.',
          date: '2026-08-13',
          time: '14:00',
          duration: '60 min',
          contactId: 'CONT-002',
          contactName: 'dr. Anita Wijaya, M.Kes',
          companyId: 'COMP-002',
          companyName: 'RS Medika Sejahtera Utama',
          opportunityId: 'OPP-2026-002',
          assignedTo: 'Siti Rahma',
          actor: 'Siti Rahma',
          timestamp: '2026-08-13T14:00:00Z'
        },
        {
          id: 'ACT-003',
          type: 'Proposal',
          subject: 'Pengiriman Proposal AI Credit Scoring V1',
          description: 'Proposal komersial dan dokumen arsitektur teknis dikirimkan ke Head of Digital Banking PT Bank Fintek Indonesia.',
          date: '2026-08-12',
          time: '11:15',
          contactId: 'CONT-003',
          contactName: 'Bambang Kusuma',
          companyId: 'COMP-003',
          companyName: 'PT Bank Fintek Indonesia',
          opportunityId: 'OPP-2026-003',
          assignedTo: 'Rian Pratama',
          actor: 'Rian Pratama',
          timestamp: '2026-08-12T11:15:00Z'
        },
        {
          id: 'ACT-004',
          type: 'Status Change',
          subject: 'Pindah Stage: PROPOSAL ke NEGOTIATION',
          description: 'Status kesempatan PT Nusantara Mining Energy diperbarui menjadi NEGOTIATION setelah review teknis direksi.',
          date: '2026-08-11',
          time: '16:45',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          opportunityId: 'OPP-2026-001',
          assignedTo: 'Budi Santoso',
          actor: 'Admin',
          timestamp: '2026-08-11T16:45:00Z'
        },
        {
          id: 'ACT-005',
          type: 'Call',
          subject: 'Konfirmasi Jadwal Technical Demo Logistik',
          description: 'Panggilan telepon dengan Bapak Agus Setiawan untuk jadwal demo modul AI Route Optimization minggu depan.',
          date: '2026-08-10',
          time: '10:00',
          duration: '15 min',
          contactId: 'CONT-004',
          contactName: 'Agus Setiawan',
          companyId: 'COMP-004',
          companyName: 'Logistik Cepat Nusantara',
          opportunityId: 'OPP-2026-004',
          assignedTo: 'Dewi Lestari',
          actor: 'Dewi Lestari',
          timestamp: '2026-08-10T10:00:00Z'
        }
      ];
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(sampleActivities));
    }
  }

  public static getActivities(): CRMActivity[] {
    this.initializeInitialData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static getTimeline(entityType?: 'lead' | 'company' | 'contact' | 'opportunity', entityId?: string): CRMActivity[] {
    const activities = this.getActivities();
    if (!entityType || !entityId) return activities;

    return activities.filter((act) => {
      if (entityType === 'company') return act.companyId === entityId;
      if (entityType === 'contact') return act.contactId === entityId;
      if (entityType === 'opportunity') return act.opportunityId === entityId;
      if (entityType === 'lead') return act.leadId === entityId;
      return true;
    });
  }

  public static createActivity(data: Partial<CRMActivity>): CRMActivity {
    this.initializeInitialData();
    const activities = this.getActivities();

    const now = new Date();
    const newAct: CRMActivity = {
      id: `ACT-${Math.floor(100 + Math.random() * 900)}`,
      type: data.type || 'Note',
      subject: data.subject || 'Aktivitas CRM',
      description: data.description || '',
      date: data.date || now.toISOString().split('T')[0],
      time: data.time || now.toTimeString().split(' ')[0].substring(0, 5),
      duration: data.duration,
      contactId: data.contactId,
      contactName: data.contactName,
      companyId: data.companyId,
      companyName: data.companyName,
      leadId: data.leadId,
      opportunityId: data.opportunityId,
      assignedTo: data.assignedTo || 'Budi Santoso',
      actor: data.actor || 'Admin',
      timestamp: now.toISOString()
    };

    activities.unshift(newAct);
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
    return newAct;
  }

  public static logStatusChange(
    opportunityId: string,
    oldStage: string,
    newStage: string,
    actor = 'Admin'
  ): CRMActivity {
    return this.createActivity({
      type: 'Status Change',
      subject: `Pindah Stage: ${oldStage} → ${newStage}`,
      description: `Status kesempatan diperbarui dari ${oldStage} ke ${newStage}.`,
      opportunityId,
      actor
    });
  }

  public static logWhatsAppClick(
    contactName: string,
    phone: string,
    context: string,
    actor = 'Admin'
  ): CRMActivity {
    return this.createActivity({
      type: 'WhatsApp',
      subject: `Interaksi WhatsApp dengan ${contactName}`,
      description: `Membuka pesan WhatsApp (${phone}) untuk konteks: ${context}`,
      contactName,
      actor
    });
  }

  public static logProposalSent(
    opportunityId: string,
    proposalTitle: string,
    actor = 'Admin'
  ): CRMActivity {
    return this.createActivity({
      type: 'Proposal',
      subject: `Proposal Dikirim: ${proposalTitle}`,
      description: `Dokumen proposal resmi dikirimkan ke calon customer.`,
      opportunityId,
      actor
    });
  }

  public static logMeeting(
    opportunityId: string,
    meetingTitle: string,
    duration: string,
    notes: string,
    actor = 'Admin'
  ): CRMActivity {
    return this.createActivity({
      type: 'Meeting',
      subject: `Sesi Diskusi: ${meetingTitle}`,
      description: notes,
      duration,
      opportunityId,
      actor
    });
  }
}
