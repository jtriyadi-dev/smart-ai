import { CopilotAuditRecord, FailedQuestionRecord, ExecutiveBriefing, IndustryType, UserRole } from '../../types';

export class CopilotAuditService {
  private static auditLogs: CopilotAuditRecord[] = [
    {
      id: 'aud-101',
      userName: 'Jono Triyadi (CEO)',
      userRole: 'CEO',
      industry: 'RETAIL',
      question: 'Analisa penjualan bulan ini.',
      intentMode: 'ANALYTICS',
      metricsQueried: ['REVENUE', 'SALES'],
      dataSource: 'Sales & Invoicing PostgreSQL DB',
      executionTimeMs: 142,
      confidence: 'HIGH',
      timestamp: '2026-08-15 08:30:12'
    },
    {
      id: 'aud-102',
      userName: 'Site Operations Manager',
      userRole: 'OPERATIONS',
      industry: 'MINING',
      question: 'Berapa produksi batu bara dan fleet mana paling produktif?',
      intentMode: 'ANALYTICS',
      metricsQueried: ['PRODUCTION', 'DOWNTIME'],
      dataSource: 'Mining Fleet Telematics IoT',
      executionTimeMs: 185,
      confidence: 'HIGH',
      timestamp: '2026-08-15 08:42:00'
    }
  ];

  private static failedQuestions: FailedQuestionRecord[] = [
    {
      id: 'fq-01',
      question: 'Berapa rata-rata jam tidur operator tambang shift malam?',
      userRole: 'OPERATIONS',
      industry: 'MINING',
      failureReason: 'Metric "operator_sleep_hours" belum memiliki mapping di Business Semantic Layer.',
      timestamp: '2026-08-14 22:15:00',
      status: 'UNRESOLVED',
      notes: 'Disarankan menambah tabel fatigue_monitoring ke Data Source Telematics.'
    }
  ];

  static logAudit(record: Omit<CopilotAuditRecord, 'id' | 'timestamp'>) {
    const newRecord: CopilotAuditRecord = {
      ...record,
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID')
    };
    this.auditLogs.unshift(newRecord);
  }

  static getAuditLogs(): CopilotAuditRecord[] {
    return this.auditLogs;
  }

  static logFailedQuestion(q: string, role: UserRole, industry: IndustryType, reason: string) {
    this.failedQuestions.unshift({
      id: `fq-${Date.now()}`,
      question: q,
      userRole: role,
      industry,
      failureReason: reason,
      timestamp: new Date().toLocaleString('id-ID'),
      status: 'UNRESOLVED'
    });
  }

  static getFailedQuestions(): FailedQuestionRecord[] {
    return this.failedQuestions;
  }

  static resolveFailedQuestion(id: string, notes: string) {
    const item = this.failedQuestions.find((f) => f.id === id);
    if (item) {
      item.status = 'RESOLVED';
      item.notes = notes;
    }
  }

  static getExecutiveBriefing(industry: IndustryType, userRole: UserRole): ExecutiveBriefing {
    let greeting = `Selamat Pagi, ${userRole === 'CEO' ? 'Direksi' : userRole}!`;
    let healthScore = 92;
    let healthStatus: any = 'HEALTHY';

    if (industry === 'MINING') {
      return {
        greeting,
        healthScore: 89,
        healthStatus: 'HEALTHY',
        keyMetricsSummary: [
          { label: 'Produksi Batu Bara', val: '185.000 Ton', change: '+14,2%', isPositive: true },
          { label: 'Konsumsi Fuel', val: '342.000 Liter', change: '+10,3%', isPositive: true },
          { label: 'Total Downtime', val: '68 Jam', change: '+61,9%', isPositive: false }
        ],
        criticalAlerts: [
          {
            id: 'al-m',
            title: '⚠ Lonjakan Downtime DT-104',
            severity: 'CRITICAL',
            metric: 'DOWNTIME',
            detectedAt: '14 Aug 2026',
            magnitude: '24 Jam Shutdown',
            whatHappened: 'Kebocoran hidrolik berat pada Fleet EX-04 / DT-104.',
            potentialFactors: ['Preventive maintenance terlewat'],
            recommendedAction: 'Percepat klaim seal kit dari vendor.'
          }
        ],
        top3Insights: [
          'Fleet EX-01 mencatat produktivitas tertinggi (62.000 ton/bulan).',
          'Konsumsi solar naik seiring efisiensi Haul Road A yang membaik (+12%).',
          'Downtime terpusat di 2 unit hauler tua yang membutuhkan major overhaul.'
        ],
        recommendedActions: [
          {
            id: 'rec-m1',
            title: 'Jadwalkan Major Overhaul DT-104',
            actionText: 'Kirim unit DT-104 ke workshop utama untuk perbaikan sistem hidrolik.',
            priority: 'HIGH',
            impactDescription: 'Mencegah potensi kerugian produksi 800 ton/hari.'
          }
        ]
      };
    }

    // Default Retail / Business Executive Briefing
    return {
      greeting,
      healthScore,
      healthStatus,
      keyMetricsSummary: [
        { label: 'Total Penjualan', val: 'Rp 1,18 Miliar', change: '+18,0%', isPositive: true },
        { label: 'Target Achievement', val: '98,3%', change: '-1,7%', isPositive: false },
        { label: 'Margin Operasional', val: '34,2%', change: '+2,1%', isPositive: true }
      ],
      criticalAlerts: [
        {
          id: 'al-r',
          title: '⚠ Peringatan Stok Produk A',
          severity: 'WARNING',
          metric: 'INVENTORY',
          detectedAt: '15 Aug 2026',
          magnitude: '45 Unit Tersisa',
          whatHappened: 'Laju permintaan tinggi, potensi stockout dalam 5 hari.',
          potentialFactors: ['Konversi campaign marketing melonjak'],
          recommendedAction: 'Lakukan reorder 150 unit.'
        }
      ],
      top3Insights: [
        'Penjualan bulan ini tumbuh +18,0% dibanding bulan lalu, didorong Produk A (+32%).',
        'Cabang Utama Jakarta memberikan kontribusi omset terbesar (Rp 580 Juta).',
        'Efisiensi operasional meningkat dengan rasio margin bersih 34,2%.'
      ],
      recommendedActions: [
        {
          id: 'rec-r1',
          title: 'Reorder Stok Produk A',
          actionText: 'Terbitkan Purchase Order 150 unit Produk A ke principal.',
          priority: 'HIGH',
          impactDescription: 'Mengamankan proyeksi omset Rp 420 Juta hingga akhir bulan.'
        }
      ]
    };
  }
}
