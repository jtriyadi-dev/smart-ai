import { DataSourceConfig, SemanticMetricMapping, IndustryType, MetricType, TimeRangeType, UserRole } from '../../types';

export class DataRegistryService {
  // Configured Data Sources
  static getDataSources(): DataSourceConfig[] {
    return [
      {
        id: 'ds-sql-sales',
        name: 'Enterprise ERP & Sales DB (PostgreSQL)',
        type: 'SQL',
        connectionStatus: 'CONNECTED',
        lastSync: '2026-08-15 08:30 WIB',
        tablesCount: 24,
        recordsCount: 148500,
        readOnly: true
      },
      {
        id: 'ds-mining-telematics',
        name: 'Mining Fleet Telematics & Production IoT (MQTT/Timescale)',
        type: 'IOT_STREAM',
        connectionStatus: 'CONNECTED',
        lastSync: '2026-08-15 08:58 WIB',
        tablesCount: 12,
        recordsCount: 2490000,
        readOnly: true
      },
      {
        id: 'ds-simrs-ehr',
        name: 'Hospital SIMRS EHR & Billing System',
        type: 'SIMRS',
        connectionStatus: 'CONNECTED',
        lastSync: '2026-08-15 08:45 WIB',
        tablesCount: 38,
        recordsCount: 890000,
        readOnly: true
      },
      {
        id: 'ds-manufacturing-scada',
        name: 'Factory PLC/SCADA Machine Telemetry',
        type: 'IOT_STREAM',
        connectionStatus: 'CONNECTED',
        lastSync: '2026-08-15 08:50 WIB',
        tablesCount: 8,
        recordsCount: 1200000,
        readOnly: true
      },
      {
        id: 'ds-plantation-gis',
        name: 'Agri-GIS Plantation & Block Yield DB',
        type: 'REST_API',
        connectionStatus: 'CONNECTED',
        lastSync: '2026-08-15 07:00 WIB',
        tablesCount: 15,
        recordsCount: 320000,
        readOnly: true
      },
      {
        id: 'ds-aquaculture-sensors',
        name: 'Shrimp & Poultry Smart Sensors',
        type: 'IOT_STREAM',
        connectionStatus: 'CONNECTED',
        lastSync: '2026-08-15 08:55 WIB',
        tablesCount: 6,
        recordsCount: 540000,
        readOnly: true
      }
    ];
  }

  // Semantic Mappings
  static getSemanticMappings(industry: IndustryType): SemanticMetricMapping[] {
    const base: SemanticMetricMapping[] = [
      {
        id: 'sem-1',
        metric: 'REVENUE',
        displayName: 'Total Revenue / Omset',
        industry: 'RETAIL',
        sourceTable: 'orders',
        formula: 'SUM(total_amount)',
        unit: 'IDR',
        defaultTimeFrame: 'THIS_MONTH'
      },
      {
        id: 'sem-2',
        metric: 'PROFIT',
        displayName: 'Laba Bersih Operasional',
        industry: 'RETAIL',
        sourceTable: 'financial_ledger',
        formula: 'SUM(revenue) - SUM(cogs + opex)',
        unit: 'IDR',
        defaultTimeFrame: 'THIS_MONTH'
      },
      {
        id: 'sem-3',
        metric: 'PRODUCTION',
        displayName: 'Produksi Batu Bara / Ore / Output',
        industry: 'MINING',
        sourceTable: 'fleet_logs',
        formula: 'SUM(payload_tons)',
        unit: 'ton',
        defaultTimeFrame: 'THIS_MONTH'
      },
      {
        id: 'sem-4',
        metric: 'FUEL',
        displayName: 'Konsumsi Bahan Bakar Solar',
        industry: 'MINING',
        sourceTable: 'fuel_dispense_logs',
        formula: 'SUM(liters)',
        unit: 'liter',
        defaultTimeFrame: 'THIS_MONTH'
      },
      {
        id: 'sem-5',
        metric: 'PATIENTS',
        displayName: 'Kunjungan Pasien Rawat Jalan & Inap',
        industry: 'HOSPITAL',
        sourceTable: 'patient_registrations',
        formula: 'COUNT(patient_id)',
        unit: 'pasien',
        defaultTimeFrame: 'THIS_MONTH'
      },
      {
        id: 'sem-6',
        metric: 'OEE',
        displayName: 'Overall Equipment Effectiveness',
        industry: 'MANUFACTURING',
        sourceTable: 'machine_oee_metrics',
        formula: '(Availability x Performance x Quality)',
        unit: '%',
        defaultTimeFrame: 'THIS_MONTH'
      },
      {
        id: 'sem-7',
        metric: 'FCR',
        displayName: 'Feed Conversion Ratio',
        industry: 'POULTRY',
        sourceTable: 'feed_consumption_logs',
        formula: 'Total Feed Consumed (kg) / Total Weight Gain (kg)',
        unit: 'ratio',
        defaultTimeFrame: 'THIS_MONTH'
      }
    ];

    return base.filter((m) => m.industry === industry || industry === 'CUSTOM' || m.industry === 'RETAIL');
  }

  // Domain Data Store (Simulated Data Warehouses)
  static getIndustryData(industry: IndustryType, metric: MetricType, timeRange: TimeRangeType) {
    // Current period vs Previous period mock generator adhering to realistic numbers
    if (industry === 'MINING') {
      if (metric === 'PRODUCTION') {
        return {
          currentTotal: 185000, // 185,000 Tons
          previousTotal: 162000,
          targetTotal: 180000,
          unit: 'ton',
          periodLabel: '1–14 Agustus 2026',
          dataSourceName: 'Mining Fleet Telematics IoT',
          lastUpdated: '15 Aug 2026 08:58 WIB',
          dataPoints: [
            { label: 'Minggu 1', currentValue: 92000, previousValue: 80000, targetValue: 90000, unit: 'ton' },
            { label: 'Minggu 2', currentValue: 93000, previousValue: 82000, targetValue: 90000, unit: 'ton' }
          ],
          breakdowns: [
            { name: 'Fleet EX-01 (Komatsu PC2000)', val: 62000, status: 'PERFORMA TERBAIK' },
            { name: 'Fleet EX-02 (Hitachi EX1200)', val: 58000, status: 'NORMAL' },
            { name: 'Fleet EX-03 (CAT 6015)', val: 42000, status: 'DOWNTIME TERSEDIA' },
            { name: 'Fleet EX-04 (Volvo EC950)', val: 23000, status: 'PERLU MAINTENANCE' }
          ]
        };
      } else if (metric === 'FUEL') {
        return {
          currentTotal: 342000, // 342,000 Liters
          previousTotal: 310000,
          targetTotal: 330000,
          unit: 'liter',
          periodLabel: '1–14 Agustus 2026',
          dataSourceName: 'Fuel Dispense System IoT',
          lastUpdated: '15 Aug 2026 08:40 WIB',
          dataPoints: [
            { label: 'Minggu 1', currentValue: 168000, previousValue: 152000, unit: 'liter' },
            { label: 'Minggu 2', currentValue: 174000, previousValue: 158000, unit: 'liter' }
          ],
          breakdowns: [
            { name: 'CAT 777 Hauler Fleet', val: 185000, status: 'KONSUMSI TINGGI' },
            { name: 'Excavator Heavy Fleet', val: 112000, status: 'NORMAL' },
            { name: 'Support Vehicles & Genset', val: 45000, status: 'NORMAL' }
          ]
        };
      } else if (metric === 'DOWNTIME') {
        return {
          currentTotal: 68, // 68 Hours
          previousTotal: 42,
          targetTotal: 40,
          unit: 'jam',
          periodLabel: '1–14 Agustus 2026',
          dataSourceName: 'Equipment Maintenance System',
          lastUpdated: '15 Aug 2026 08:30 WIB',
          dataPoints: [
            { label: 'Minggu 1', currentValue: 28, previousValue: 18, unit: 'jam' },
            { label: 'Minggu 2', currentValue: 40, previousValue: 24, unit: 'jam' }
          ],
          breakdowns: [
            { name: 'Dump Truck DT-104 (Hydraulic Leak)', val: 24, status: 'CRITICAL' },
            { name: 'Excavator EX-04 (Engine Overheat)', val: 18, status: 'WARNING' },
            { name: 'Bulldozer DZ-02 (Track Shoe)', val: 14, status: 'NORMAL' }
          ]
        };
      }
    }

    if (industry === 'HOSPITAL') {
      if (metric === 'PATIENTS') {
        return {
          currentTotal: 8450, // 8,450 Patients
          previousTotal: 7600,
          targetTotal: 8000,
          unit: 'pasien',
          periodLabel: '1–14 Agustus 2026',
          dataSourceName: 'SIMRS EHR Registration DB',
          lastUpdated: '15 Aug 2026 08:45 WIB',
          dataPoints: [
            { label: 'Poliklinik Anak', currentValue: 2150, previousValue: 1800, unit: 'pasien' },
            { label: 'Poliklinik Penyakit Dalam', currentValue: 2400, previousValue: 2200, unit: 'pasien' },
            { label: 'Poliklinik Jantung', currentValue: 1650, previousValue: 1450, unit: 'pasien' },
            { label: 'IGD & Emergency', currentValue: 2250, previousValue: 2150, unit: 'pasien' }
          ],
          breakdowns: [
            { name: 'Poli Penyakit Dalam', val: 2400, status: 'PALING RAMAI' },
            { name: 'Poli Anak', val: 2150, status: 'PERTUMBUHAN +19%' },
            { name: 'IGD Emergency', val: 2250, status: 'RATA2 TUNGGU 12 MENIT' }
          ]
        };
      }
    }

    if (industry === 'MANUFACTURING') {
      return {
        currentTotal: 88.5, // 88.5% OEE
        previousTotal: 82.1,
        targetTotal: 85.0,
        unit: '%',
        periodLabel: '1–14 Agustus 2026',
        dataSourceName: 'SCADA PLC Machine Telemetry',
        lastUpdated: '15 Aug 2026 08:50 WIB',
        dataPoints: [
          { label: 'Line Assembly 1', currentValue: 91.2, previousValue: 86.0, unit: '%' },
          { label: 'Line Stamping 2', currentValue: 84.8, previousValue: 79.5, unit: '%' },
          { label: 'Line Packaging 3', currentValue: 89.5, previousValue: 80.8, unit: '%' }
        ],
        breakdowns: [
          { name: 'Availability Rate', val: 92.4, status: 'BAGUS' },
          { name: 'Performance Rate', val: 94.1, status: 'BAGUS' },
          { name: 'Quality Rate (Defect 1.5%)', val: 98.5, status: 'BAGUS' }
        ]
      };
    }

    if (industry === 'PLANTATION') {
      return {
        currentTotal: 14200, // 14,200 Ton TBS (Tandan Buah Segar)
        previousTotal: 12500,
        targetTotal: 13500,
        unit: 'ton',
        periodLabel: '1–14 Agustus 2026',
        dataSourceName: 'Agri-GIS Plantation DB',
        lastUpdated: '15 Aug 2026 07:00 WIB',
        dataPoints: [
          { label: 'Blok Alpha (Sawit Usia Emas 12 Thn)', currentValue: 6800, previousValue: 5900, unit: 'ton' },
          { label: 'Blok Beta (Sawit Usia 8 Thn)', currentValue: 4900, previousValue: 4300, unit: 'ton' },
          { label: 'Blok Gamma (Sawit Usia Muda 4 Thn)', currentValue: 2500, previousValue: 2300, unit: 'ton' }
        ],
        breakdowns: [
          { name: 'Blok Alpha', val: 6800, status: 'PRODUKTIVITAS TERTINGGI (2.4 Ton/Ha)' },
          { name: 'Blok Beta', val: 4900, status: 'PRODUKTIVITAS NORMAL (1.9 Ton/Ha)' }
        ]
      };
    }

    if (industry === 'POULTRY') {
      return {
        currentTotal: 1.52, // FCR 1.52
        previousTotal: 1.64,
        targetTotal: 1.55,
        unit: 'FCR Ratio',
        periodLabel: '1–14 Agustus 2026',
        dataSourceName: 'Smart Poultry Sensor System',
        lastUpdated: '15 Aug 2026 08:55 WIB',
        dataPoints: [
          { label: 'Kandang Closed House 1', currentValue: 1.48, previousValue: 1.60, unit: 'FCR' },
          { label: 'Kandang Closed House 2', currentValue: 1.51, previousValue: 1.62, unit: 'FCR' },
          { label: 'Kandang Semi-Open 3', currentValue: 1.58, previousValue: 1.70, unit: 'FCR' }
        ],
        breakdowns: [
          { name: 'Mortalitas Rata-rata', val: 1.8, status: 'LOW (EFFISIEN)' },
          { name: 'Total Pakan Consumed', val: 42.5, status: 'TON' }
        ]
      };
    }

    if (industry === 'SHRIMP_FARM') {
      return {
        currentTotal: 87.4, // Survival Rate 87.4%
        previousTotal: 81.2,
        targetTotal: 85.0,
        unit: '% SR',
        periodLabel: '1–14 Agustus 2026',
        dataSourceName: 'Aquaculture Sensor Network',
        lastUpdated: '15 Aug 2026 08:55 WIB',
        dataPoints: [
          { label: 'Kolam Intensif 01', currentValue: 90.2, previousValue: 84.0, unit: '%' },
          { label: 'Kolam Intensif 02', currentValue: 88.1, previousValue: 82.5, unit: '%' },
          { label: 'Kolam Intensif 03', currentValue: 83.9, previousValue: 77.1, unit: '%' }
        ],
        breakdowns: [
          { name: 'Estimasi Tonase Panen', val: 24.5, status: 'TON VANAME' },
          { name: 'Kualitas Air Salinitas/DO', val: 98, status: 'OPTIMAL' }
        ]
      };
    }

    // Default / RETAIL / CUSTOM Business Data (Sales & Revenue)
    return {
      currentTotal: 1180000000, // Rp 1.18 Miliar
      previousTotal: 1000000000, // Rp 1.00 Miliar
      targetTotal: 1200000000, // Rp 1.20 Miliar
      unit: 'IDR',
      periodLabel: '1–14 Agustus 2026',
      dataSourceName: 'Sales & Invoicing PostgreSQL DB',
      lastUpdated: '15 Aug 2026 08:30 WIB',
      dataPoints: [
        { label: 'Minggu 1', currentValue: 560000000, previousValue: 480000000, targetValue: 600000000, unit: 'IDR' },
        { label: 'Minggu 2', currentValue: 620000000, previousValue: 520000000, targetValue: 600000000, unit: 'IDR' }
      ],
      breakdowns: [
        { name: 'Produk A (Smart AI Automation Suite)', val: 420000000, status: 'PERTUMBUHAN +32%' },
        { name: 'Cabang Utama Jakarta', val: 580000000, status: 'PERFORMA TERBAIK (+24%)' },
        { name: 'Cabang Surabaya', val: 340000000, status: 'PERTUMBUHAN +12%' },
        { name: 'Cabang Medan', val: 260000000, status: 'STABIL (+5%)' }
      ]
    };
  }

  // Permission Verification per Role
  static checkRolePermission(role: UserRole, metric: MetricType): boolean {
    if (role === 'CEO' || role === 'GENERAL_MANAGER') return true;

    if (role === 'FINANCE') {
      return ['REVENUE', 'SALES', 'PROFIT', 'COST', 'ORDERS', 'CUSTOMERS'].includes(metric);
    }

    if (role === 'OPERATIONS') {
      return ['PRODUCTION', 'UTILIZATION', 'DOWNTIME', 'FUEL', 'MAINTENANCE', 'OEE', 'FCR', 'YIELD', 'INVENTORY'].includes(metric);
    }

    if (role === 'WAREHOUSE') {
      return ['INVENTORY', 'ORDERS', 'FUEL', 'MAINTENANCE'].includes(metric);
    }

    if (role === 'HR') {
      return ['ATTENDANCE', 'CUSTOMERS', 'STUDENTS', 'PATIENTS'].includes(metric);
    }

    return true;
  }
}
