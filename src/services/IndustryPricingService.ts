import { IndustrySectorConfig, QuotationPackage } from '../types';

export const INDUSTRY_SECTOR_CONFIGS: IndustrySectorConfig[] = [
  {
    id: 'mining',
    name: 'Pertambangan Batubara & Mineral',
    category: 'Energi & Sumber Daya Alam',
    iconName: 'Pickaxe',
    tagline: 'Sistem operasional pit tambang, telemetri alat berat, pemantauan solar, dan kepatuhan K3 ESDM.',
    complexityLevel: 'Mission-Critical',
    priceMultiplier: 1.28,
    packagePrices: {
      MVP: 150000000,
      Standard: 280000000,
      Professional: 450000000,
      Enterprise: 750000000
    },
    monthlyPackagePrices: {
      MVP: 8500000,
      Standard: 16000000,
      Professional: 26000000,
      Enterprise: 45000000
    },
    packageDescriptions: {
      MVP: 'Validasi monitoring ritase dasar, pencatatan solar truk, dan dasbor operasional single-pit.',
      Standard: 'Sistem fleet tambang lengkap, akuntansi BBM & solar loss detection, log kerusakan alat, dan laporan digital K3.',
      Professional: 'Platform dispatch pit cerdas, AI Anomali Konsumsi BBM & Anti-Theft, billing kontraktor, dan WhatsApp Alert darurat.',
      Enterprise: 'Arsitektur multi-pit terpusat, telemetry IoT alat berat real-time, AI predictive maintenance, dan integrasi SAP/ERP.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan bulanan cloud pit tracker, backup harian data ritase, dan SLA response 24 jam.',
      Standard: 'Managed fleet service bulanan, monitoring konsumsi solar real-time, WhatsApp Gateway, dan SLA 8 jam.',
      Professional: 'Managed Pit Copilot AI, kuota deteksi anomali BBM, backup multi-region, dan dedicated engineer pit.',
      Enterprise: 'Mission-Critical 24/7 Control Room SLA, telemetry streaming cluster, high-availability, dan onsite response.'
    },
    packageModules: {
      MVP: [
        'Ritase & Fleet Telemetry Tracker (Single Pit)',
        'Pencatatan Konsumsi Solar & Dispenser BBM',
        'User Access & Shift Operator Console'
      ],
      Standard: [
        'Mining Fleet Dispatch & Production Tracking',
        'Fuel & Solar Fuel Accounting & Leakage Alert',
        'Equipment Breakdown & Preventive Maintenance Log',
        'K3 Incident Digital Report & Inspection Checklist',
        'WhatsApp Gateway Notifikasi Alert Operasional'
      ],
      Professional: [
        'Executive Multi-Pit Telemetry & KPI Dashboard',
        'Mining Fleet Copilot & Smart Dispatch Engine',
        'AI Fuel Anomaly & Fuel Anti-Theft Detector',
        'Contractor Billing & Production Reconciler',
        'Emergency Alert & WhatsApp Notification Hub'
      ],
      Enterprise: [
        'Centralized Multi-Pit Dispatch Control Room',
        'Heavy Machinery IoT Engine & Sensor Telemetry',
        'AI Preventive Maintenance & Wear-Out Predictor',
        'Enterprise SAP/Oracle ERP Connector',
        '24/7 Mining Control Room SLA & Compliance Hub'
      ]
    },
    complianceStandards: ['Kepmen ESDM No. 1827 K/30/MEM/2018', 'K3 Pertambangan', 'Offline-First Pit Sync', 'ISO 45001'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration', 'Infrastructure']
  },
  {
    id: 'healthcare_hospital',
    name: 'Rumah Sakit & SIMRS (Kemenkes SATUSEHAT)',
    category: 'Kesehatan & Farmasi',
    iconName: 'Activity',
    tagline: 'Sistem Informasi Manajemen Rumah Sakit (SIMRS) bridging SATUSEHAT, BPJS V-Claim, EMR, dan Farmasi.',
    complexityLevel: 'High-Compliance',
    priceMultiplier: 1.18,
    packagePrices: {
      MVP: 135000000,
      Standard: 250000000,
      Professional: 420000000,
      Enterprise: 680000000
    },
    monthlyPackagePrices: {
      MVP: 7500000,
      Standard: 14500000,
      Professional: 24500000,
      Enterprise: 40000000
    },
    packageDescriptions: {
      MVP: 'Pendaftaran pasien, antrean poli, rekam medis rawat jalan dasar, dan kasir billing.',
      Standard: 'SIMRS komprehensif rawat inap/jalan, Rekam Medis Elektronik (RME) standar SATUSEHAT, modul farmasi & BPJS VClaim 2.0.',
      Professional: 'SIMRS Enterprise dengan AI Medical Resume, modul LIS Laboratorium, RIS Radiologi, dan WhatsApp Antrean Pasien.',
      Enterprise: 'Jaringan multi-RS (Hospital Group), PACS DICOM image integration, AI Clinical Decision Support, dan High-Availability Cluster.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan cloud RME & backup medis harian terenkripsi, integrasi SATUSEHAT dasar, dan update regulasi.',
      Standard: 'SaaS SIMRS terkelola, bridging BPJS V-Claim 2.0 & SATUSEHAT, WhatsApp Antrean, dan SLA prioritas 8 jam.',
      Professional: 'Managed Healthtech Cloud, AI Resume Medis & ICD-10 Coding, bridge LIS/RIS, dan dedicated support RS.',
      Enterprise: 'Hospital Network 99.99% HA Cluster, PACS Imaging Server Managed, 24/7 On-Call Medical IT SLA.'
    },
    packageModules: {
      MVP: [
        'Pendaftaran Pasien & Antrean Rawat Jalan',
        'Rekam Medis Elektronik (RME) Dasar',
        'Kasir & Billing Pasien Umum'
      ],
      Standard: [
        'SIMRS Core (Rawat Inap, Rawat Jalan & IGD)',
        'EMR Terakreditasi Standar SATUSEHAT Kemenkes',
        'Manajemen Farmasi & Depo Obat FEFO',
        'Integrasi BPJS VClaim 2.0 & Antrean RS'
      ],
      Professional: [
        'SIMRS Enterprise Suite & Ruang Operasi (OK)',
        'SATUSEHAT Cloud Gateway & BPJS Bridging',
        'AI Medical Resume & ICD-10 Auto-Coding',
        'Laboratorium (LIS) & Radiologi (RIS) Bridge',
        'WhatsApp Antrean & Pengingat Kontrol Pasien'
      ],
      Enterprise: [
        'Multi-Hospital Network SIMRS & Centralized EMR',
        'Full SATUSEHAT Interoperability & E-Klaim INA-CBG',
        'AI Clinical Decision Support Engine',
        'PACS Medical Imaging Bridge & Zero Footprint Viewer',
        'High-Availability 99.99% Healthcare Data Center'
      ]
    },
    complianceStandards: ['Permenkes No 24 Tahun 2022 (RME)', 'Kemenkes SATUSEHAT Interoperability', 'BPJS Kesehatan VClaim 2.0', 'HIPAA/ISO 27799'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI', 'Security']
  },
  {
    id: 'clinic_pharmacy',
    name: 'Klinik Pratama & Apotek Terpadu',
    category: 'Kesehatan & Farmasi',
    iconName: 'Stethoscope',
    tagline: 'Sistem klinik pratama/utama, antrean poli, resep elektronik, dan manajemen stok obat apotek FEFO.',
    complexityLevel: 'Standard',
    priceMultiplier: 0.75,
    packagePrices: {
      MVP: 85000000,
      Standard: 165000000,
      Professional: 270000000,
      Enterprise: 440000000
    },
    monthlyPackagePrices: {
      MVP: 4500000,
      Standard: 9000000,
      Professional: 15000000,
      Enterprise: 25000000
    },
    packageDescriptions: {
      MVP: 'Pendaftaran pasien, antrean poli umum/gigi, dan pencatatan kasir klinik.',
      Standard: 'RME standar SATUSEHAT, e-Prescription obat, inventori apotek FEFO/FIFO, dan sistem bagi hasil dokter.',
      Professional: 'Multi-poli, WhatsApp reminder obat pasien, AI voice transcription rekam medis, dan laporan lab klinik.',
      Enterprise: 'Jaringan klinik & apotek waralaba/multi-cabang dengan pengadaan terpusat dan konsolidasi finansial.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Langganan klinik cloud, sinkronisasi SATUSEHAT Kemenkes, dan support via WhatsApp.',
      Standard: 'Managed Klinik & Apotek SaaS, modul BPJS PCare, backup otomatis obat FEFO, dan update regulasi BPOM.',
      Professional: 'AI Voice Dictation Rekam Medis, broadcast WhatsApp pengingat kontrol, dan laporan margin harian.',
      Enterprise: 'Multi-branch cloud gateway, central pharmacy procurement, SLA 4 jam, dan custom report eksekutif.'
    },
    packageModules: {
      MVP: [
        'Pendaftaran Pasien & Antrean TV Poli',
        'Rekam Medis Klinik Sederhana',
        'Kasir Tindakan & Struk Pembayaran'
      ],
      Standard: [
        'RME Terakreditasi SATUSEHAT Kemenkes',
        'E-Prescription & Kasir Farmasi',
        'Manajemen Stok Obat FEFO & Surat Pesanan (SP)',
        'Sistem Bagi Hasil & Tarif Multi-Dokter'
      ],
      Professional: [
        'Multi-Poli & Multi-Dokter Scheduling Suite',
        'AI Medical Speech-to-Text Transcription',
        'WhatsApp Notifikasi Resep & Pengingat Kontrol',
        'Laporan Laba/Rugi & Analisis Margin Klinik'
      ],
      Enterprise: [
        'Jaringan Multi-Klinik & Apotek Multi-Cabang',
        'Centralized Pharmacy Purchasing & Distribution',
        'SATUSEHAT Multi-Tenant Cloud Gateway',
        'Executive Financial & Patient Demographic Dashboard'
      ]
    },
    complianceStandards: ['SATUSEHAT Klinik Kemenkes', 'BPJS PCare', 'Standar BPOM & Dinkes'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI']
  },
  {
    id: 'aesthetic_clinic',
    name: 'Klinik Kecantikan & Estetika',
    category: 'Kesehatan & Estetika',
    iconName: 'Sparkles',
    tagline: 'Sistem operasional klinik kecantikan & skincare, foto before-after, e-consent, paket treatment, komisi dokter & beautician.',
    complexityLevel: 'Standard',
    priceMultiplier: 0.85,
    packagePrices: {
      MVP: 85000000,
      Standard: 165000000,
      Professional: 275000000,
      Enterprise: 460000000
    },
    monthlyPackagePrices: {
      MVP: 4800000,
      Standard: 9500000,
      Professional: 16000000,
      Enterprise: 27000000
    },
    packageDescriptions: {
      MVP: 'Pendaftaran pasien, foto klinis before/after dasar, kasir treatment & produk skincare, dan antrean poli.',
      Standard: 'Rekam Medis Estetika lengkap, face mapping digital, paket treatment multi-sesi, e-consent tablet, dan komisi beautician & dokter.',
      Professional: 'AI Skin Health Analysis, otomatisasi WhatsApp pengingat retouch/facial, deposit saldo pasien, dan multi-room scheduling.',
      Enterprise: 'Jaringan klinik estetika multi-cabang (franchise), central skincare inventory BPOM, AI face comparison morphing, dan executive dashboard.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan cloud klinik kecantikan, penyimpanan foto before-after terenkripsi, dan support harian.',
      Standard: 'Managed Aesthetic SaaS, WhatsApp broadcast recall jadwal retouch, perhitungan komisi staf otomatis, dan backup harian.',
      Professional: 'AI Skin Analyzer Cloud, sistem deposit saldo & paket multi-visit, sinkronisasi RME SATUSEHAT, dan dedicated support.',
      Enterprise: 'Multi-branch cloud cluster, master procurement krim & skincare terpusat, 99.9% uptime SLA, dan custom branding portal.'
    },
    packageModules: {
      MVP: [
        'Pendaftaran Pasien & Jadwal Booking Sederhana',
        'Foto Before-After & Rekam Medis Estetika Dasar',
        'Kasir Treatment & Penjualan Produk Skincare'
      ],
      Standard: [
        'Rekam Medis Estetika & Skincare EMR Lengkap',
        'Foto Before-After HD & Face Mapping Annotation',
        'Paket Perawatan Multi-Sesi & Tracking Sisa Visit',
        'Informed Consent Digital (E-Sign Tablet)',
        'Perhitungan Komisi Dokter & Terapis/Beautician'
      ],
      Professional: [
        'AI Skin Analysis & Churn Retouch Predictor',
        'Multi-Room & Doctor/Beautician Scheduling Suite',
        'WhatsApp Reminder Jadwal Treatment & Ulang Tahun',
        'Deposit Saldo & Membership Tiering (VIP System)',
        'Manajemen Stok Skincare & Auto-Deduct BMHP per Tindakan'
      ],
      Enterprise: [
        'Jaringan Klinik Estetika & Franchise Multi-Cabang',
        'Centralized Skincare Procurement & BPOM Batch Tracking',
        'AI Face Alignment & Morphing Progression Viewer',
        'SATUSEHAT Kemenkes RME Multi-Tenant Cloud Gateway',
        'Executive Revenue & Aesthetic Performance Dashboard'
      ]
    },
    complianceStandards: ['SATUSEHAT Rekam Medis Kemenkes', 'Standar BPOM Skincare & Kosmetik', 'Informed Consent Digital UU ITE', 'Permenkes No 14/2021 Klinik Estetika'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration', 'Security']
  },
  {
    id: 'plantation',
    name: 'Perkebunan Kelapa Sawit & Agrikultur',
    category: 'Energi & Sumber Daya Alam',
    iconName: 'Trees',
    tagline: 'Manajemen panen TBS, GIS blok kebun, timbang masuk PKS, upah borongan, dan logistik kebun.',
    complexityLevel: 'High-Compliance',
    priceMultiplier: 1.10,
    packagePrices: {
      MVP: 130000000,
      Standard: 240000000,
      Professional: 390000000,
      Enterprise: 620000000
    },
    monthlyPackagePrices: {
      MVP: 7500000,
      Standard: 14000000,
      Professional: 23000000,
      Enterprise: 36000000
    },
    packageDescriptions: {
      MVP: 'Pencatatan panen TBS di lapangan, Buku Pedoman Hasil (BPH) digital, dan timbang masuk pabrik sawit.',
      Standard: 'Pemetaan blok kebun GPS, sistem upah borongan pemanen, integrasi timbangan PKS, dan tracking armada.',
      Professional: 'Dasbor eksekutif perkebunan, AI prediksi tonase hasil panen cuaca, dan manajemen pupuk/gudang afdeling.',
      Enterprise: 'Platform multi-estate & multi-PKS, citra satelit/drone crop health, offline-first sync, dan integrasi SAP.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Cloud sync panen sawit offline, backup data jembatan timbang PKS, dan technical support.',
      Standard: 'Managed Estate GPS & Dispatching, pemantauan konsumsi solar traktor/truk, dan WhatsApp Mandor Alert.',
      Professional: 'AI Prediksi Tonase Hasil Panen, manajemen inventori pupuk/pestisida, dan dedicated agro consultant.',
      Enterprise: 'Multi-Estate & Multi-Mill HA Architecture, satellite crop processing engine, dan 24/7 Estate Ops SLA.'
    },
    packageModules: {
      MVP: [
        'Pencatatan Panen TBS Lapangan (Mobile Offline)',
        'Buku Pedoman Hasil (BPH) Digital',
        'Timbang Masuk Jembatan Timbang PKS'
      ],
      Standard: [
        'Manajemen Blok Kebun & GPS Mapping',
        'Pencatatan TBS & Timbang Masuk Pabrik Kelapa Sawit',
        'Sistem Perhitungan Gaji Borongan Pemanen Kebun',
        'Tracking Truk Angkut & Logistik Sawit'
      ],
      Professional: [
        'Executive Plantation Dashboard & Afdeling KPI',
        'AI Estimasi Tonase Panen Berdasarkan Cuaca & Histori',
        'GPS Fleet & Monitoring Pemakaian Solar Kebun',
        'Manajemen Pupuk, Pestisida & Gudang Afdeling',
        'WhatsApp Alert Lapangan & Laporan Mandor'
      ],
      Enterprise: [
        'Multi-Estate & Multi-PKS Central Control Platform',
        'AI Satellite & Drone Crop Health Monitoring',
        'Offline-First Mobile Sync Engine untuk Remote Area',
        'SAP / Oracle Agro ERP Connector',
        '24/7 Estate Operation SLA'
      ]
    },
    complianceStandards: ['ISPO / RSPO Compliance', 'Permentan No 18/2008', 'Agronomy Best Practices'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration']
  },
  {
    id: 'poultry',
    name: 'Peternakan Ayam (Poultry Closed-House)',
    category: 'Agrikultur & Peternakan',
    iconName: 'Egg',
    tagline: 'Monitoring kandang closed-house, otomatisasi kalkulator FCR, iklim mikro IoT, dan kemitraan inti-plasma.',
    complexityLevel: 'Standard',
    priceMultiplier: 0.85,
    packagePrices: {
      MVP: 95000000,
      Standard: 180000000,
      Professional: 290000000,
      Enterprise: 480000000
    },
    monthlyPackagePrices: {
      MVP: 5500000,
      Standard: 10500000,
      Professional: 17000000,
      Enterprise: 28000000
    },
    packageDescriptions: {
      MVP: 'Pencatatan mortalitas, konsumsi pakan harian, kalkulator FCR, dan ringkasan panen kandang.',
      Standard: 'Sensor IoT amonia & suhu kandang closed-house, manajemen sapronak, tracking kemitraan inti-plasma, dan jadwal vaksin.',
      Professional: 'AI deteksi dini mortalitas & anomali FCR, rekomendasi ransum pakan otomatis, dan WhatsApp alert cuaca ekstrem.',
      Enterprise: 'Manajemen multi-farm, feedmill, RPH (Rumah Potong Hewan) integrasi, dan kontrak kemitraan skala nasional.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Cloud hosting kalkulator FCR & pencatatan sapronak harian, backup data siklus kandang.',
      Standard: 'IoT telemetry gateway amonia & suhu, alert WhatsApp kondisi kritis kandang, dan rekonsiliasi plasma.',
      Professional: 'Managed AI Early Warning Mortalitas, optimasi formulasi ransum pakan harian, dan support prioritas.',
      Enterprise: 'Multi-Farm Centralized Cloud, computer vision automated weight logging, dan 24/7 Farm Control SLA.'
    },
    packageModules: {
      MVP: [
        'Pencatatan Mortalitas & Pakan Harian Kandang',
        'Kalkulator FCR (Feed Conversion Ratio) Otomatis',
        'Laporan Siklus Panen & Bobot Rata-rata'
      ],
      Standard: [
        'IoT Closed-House Climate & Ammonia Monitoring',
        'Manajemen Sapronak, DOC & Gudang Pakan',
        'Tracking Kemitraan Inti-Plasma & Laba Bersih',
        'Jadwal Vaksinasi, Vitamin & Log Medis'
      ],
      Professional: [
        'Executive Poultry Dashboard & Benchmarking Kandang',
        'AI Early Warning Mortalitas & Anomali FCR',
        'Rekomendasi Porsi Pakan Cerdas & Optimasi Pertumbuhan',
        'WhatsApp Alert Kondisi Kritis Kandang'
      ],
      Enterprise: [
        'Multi-Farm, Feedmill & Hatchery Central Platform',
        'AI Computer Vision Weight Estimator Camera',
        'Contract Farming & Supply Chain Management',
        'Automated Slaughterhouse (RPH) Dispatch Engine'
      ]
    },
    complianceStandards: ['Permentan Peternakan Unggas', 'Good Animal Husbandry Practice (GAHP)'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration']
  },
  {
    id: 'shrimp_farm',
    name: 'Tambak Udang Vaname (Aquaculture)',
    category: 'Agrikultur & Peternakan',
    iconName: 'Waves',
    tagline: 'Digitalisasi budidaya udang vaname: sensor kualitas air (pH/DO), estimasi biomassa, log anco, dan biaya petak.',
    complexityLevel: 'Standard',
    priceMultiplier: 0.85,
    packagePrices: {
      MVP: 95000000,
      Standard: 185000000,
      Professional: 295000000,
      Enterprise: 490000000
    },
    monthlyPackagePrices: {
      MVP: 5500000,
      Standard: 11000000,
      Professional: 17500000,
      Enterprise: 29000000
    },
    packageDescriptions: {
      MVP: 'Pencatatan parameter kualitas air manual, log pakan harian, sampling bobot udang, dan estimasi SR.',
      Standard: 'Monitoring kualitas air multi-petak, estimasi biomassa & ADG, perhitungan biaya produksi per petak, dan jadwal anco.',
      Professional: 'AI prediksi laju pertumbuhan udang (ADG), alert dini drop DO & salinitas, dan manajemen pemberian pakan presisi.',
      Enterprise: 'Platform multi-cluster tambak, integrasi cold storage, traceability ekspor, dan sensor IoT real-time.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan cloud kualitas air & log anco, pencatatan harian pakan, dan backup mingguan.',
      Standard: 'Sensor telemetry gateway DO & pH, kalkulator ADG/Biomassa otomatis, dan WhatsApp alert drop oksigen.',
      Professional: 'Managed AI Aquaculture Model, integrasi auto-feeder cerdas, dan analisis estimasi margin panen.',
      Enterprise: 'Multi-Cluster Cloud Command Center, export traceability certs, dan 24/7 Critical Pond Alarm SLA.'
    },
    packageModules: {
      MVP: [
        'Log Kualitas Air (pH, DO, Salinitas & Suhu)',
        'Pencatatan Pakan Harian & Sampling Mingguan',
        'Estimasi SR (Survival Rate) & Laporan Siklus'
      ],
      Standard: [
        'Monitoring Kualitas Air Multi-Petak Tambak',
        'Estimasi Biomassa & ADG (Average Daily Gain)',
        'Biaya Produksi & HPP Per Kolam Tambak',
        'Jadwal Anco Digital & Analisis Nafsu Makan Udang'
      ],
      Professional: [
        'AI Prediction Laju Pertumbuhan Udang (ADG)',
        'Alert Dini Penurunan Kualitas Air & Pencegahan Drop DO',
        'Manajemen Pemberian Pakan Otomatis (Auto-Feeder Bridge)',
        'Laporan Estimasi Panen & Margin Penjualan'
      ],
      Enterprise: [
        'Multi-Cluster Tambak Central Management',
        'IoT Water Sensor Real-time Telemetry Gateway',
        'AI Disease Outbreak Prevention & Early Warning',
        'Cold Storage & Export Traceability Integration'
      ]
    },
    complianceStandards: ['Indonesian Good Aquaculture Practice (IndoGAP)', 'ASC Shrimp Standard', 'BAP Certification'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration']
  },
  {
    id: 'manufacturing',
    name: 'Manufaktur & Pabrik (MRP & BOM)',
    category: 'Manufaktur & Industri',
    iconName: 'Factory',
    tagline: 'Perencanaan produksi MRP, Bill of Materials (BOM), monitoring efisiensi mesin OEE, dan kontrol kualitas QC.',
    complexityLevel: 'High-Compliance',
    priceMultiplier: 1.22,
    packagePrices: {
      MVP: 140000000,
      Standard: 260000000,
      Professional: 420000000,
      Enterprise: 690000000
    },
    monthlyPackagePrices: {
      MVP: 8000000,
      Standard: 15000000,
      Professional: 24500000,
      Enterprise: 42000000
    },
    packageDescriptions: {
      MVP: 'Pencatatan work order dasar, Bill of Materials (BOM) sederhana, dan laporan hasil produksi per shift.',
      Standard: 'MRP multi-level BOM, job sheet digital, inspeksi QC & scrap management, serta kontrol stok bahan baku.',
      Professional: 'OEE real-time monitoring mesin, AI predictive material requirement, maintenance mesin, dan alert downtime.',
      Enterprise: 'Multi-plant MES (Manufacturing Execution System), AI computer vision quality inspection, SCADA/PLC bridge, dan SAP.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Cloud production log per shift, backup BOM resep, dan laporan scrap harian.',
      Standard: 'Managed MRP & Job Sheet tracking, notifikasi WhatsApp downtime line produksi, dan SLA 8 jam.',
      Professional: 'Managed OEE & Machine Telemetry AI, pemeliharaan preventif terjadwal, dan kuota prediksi material.',
      Enterprise: 'Multi-Plant MES High-Availability Cluster, SCADA bridge maintenance, dan 24/7 Factory Operations SLA.'
    },
    packageModules: {
      MVP: [
        'Pencatatan Work Order Dasar Per Shift',
        'Bill of Materials (BOM) Sederhana',
        'Laporan Hasil Produksi & Scrap Harian'
      ],
      Standard: [
        'Multi-level BOM & Material Requirement Planning (MRP)',
        'Work Order & Job Sheet Tracking Real-time',
        'Inspeksi QC & Scrap Management',
        'Manajemen Gudang Bahan Baku & Finished Goods'
      ],
      Professional: [
        'Manufacturing Operations Dashboard & KPI Line',
        'OEE (Overall Equipment Effectiveness) Real-time Monitor',
        'AI Predictive Material Requirement & Restock',
        'Preventive Maintenance Mesin Pabrik',
        'WhatsApp Alert Line Downtime & Defect Spike'
      ],
      Enterprise: [
        'Multi-Plant Factory Central Control & MES',
        'AI Computer Vision Quality Inspection Camera',
        'SCADA / PLC Industrial IoT Bridge',
        'Enterprise SAP / Infor ERP Production Connector',
        '24/7 Factory Operations SLA'
      ]
    },
    complianceStandards: ['ISO 9001:2015', 'Good Manufacturing Practice (GMP)', 'OEE Best Practices'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration', 'Infrastructure']
  },
  {
    id: 'logistics_fleet',
    name: 'Logistik, Cargo & Fleet Tracking',
    category: 'Logistik & Transportasi',
    iconName: 'Truck',
    tagline: 'Real-time GPS telemetri armada, e-Surat Jalan (e-POD), optimasi rute AI, dan kontrol operasional BBM.',
    complexityLevel: 'Medium-High',
    priceMultiplier: 1.05,
    packagePrices: {
      MVP: 125000000,
      Standard: 230000000,
      Professional: 380000000,
      Enterprise: 590000000
    },
    monthlyPackagePrices: {
      MVP: 7000000,
      Standard: 13500000,
      Professional: 22000000,
      Enterprise: 35000000
    },
    packageDescriptions: {
      MVP: 'Pencatatan surat jalan digital, pelacakan armada sederhana, dan laporan riwayat pengiriman.',
      Standard: 'Real-time GPS fleet telemetry, delivery order & e-POD mobile app, billing ongkos kirim, dan kontrol BBM.',
      Professional: 'Logistics control tower, AI route optimization & dispatching, multi-hub cross-docking, dan WhatsApp resi otomatis.',
      Enterprise: 'Jaringan kargo nasional multi-cabang, dispatch otomatis, deteksi anomali BBM, dan integrasi WMS/ERP.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Cloud delivery log & e-POD receipt storage, tracking armada dasar, dan email support.',
      Standard: 'Managed GPS Telemetry & e-POD gateway, auto-billing ongkos kirim, dan WhatsApp notifikasi resi.',
      Professional: 'Managed AI Dispatch & Route Optimizer, driver performance scorecard, dan prioritas support 4 jam.',
      Enterprise: 'National Cargo Multi-Hub High-Availability Platform, fuel fraud detection AI, dan 24/7 Logistics SLA.'
    },
    packageModules: {
      MVP: [
        'Surat Jalan Digital & Status Pengiriman',
        'Manajemen Data Armada & Driver',
        'Laporan Delivery Log & Tanda Terima'
      ],
      Standard: [
        'Real-time GPS Fleet Telemetry & Geofencing',
        'Delivery Order (DO) & E-POD Mobile Driver App',
        'Perhitungan Ongkir, Tarif Klien & Billing',
        'Alert Konsumsi BBM & Riwayat Perjalanan'
      ],
      Professional: [
        'Logistics Control Tower & Live Dispatch Console',
        'AI Route Optimization & Multi-Drop Dispatch',
        'Multi-Hub Cross-Docking & Manifest Tracking',
        'WhatsApp Notifikasi Resi & Tracking Pelanggan',
        'Driver Performance & Safety Scorecard'
      ],
      Enterprise: [
        'National Multi-Hub Cargo & Freight Network',
        'Automated High-Volume Dispatching Engine',
        'AI Fuel Siphoning & Fraud Detection Engine',
        'Enterprise WMS & ERP Connector',
        '24/7 Logistics Operations SLA'
      ]
    },
    complianceStandards: ['Kemenhub Transportasi Darat', 'ISO 28000 Supply Chain Security'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI']
  },
  {
    id: 'fintech_banking',
    name: 'Perbankan & Financial Technology (Fintech)',
    category: 'Keuangan & Fintech',
    iconName: 'Building2',
    tagline: 'Sistem core banking/lending, e-KYC biometrik, AI deteksi fraud transaksi, dan bridging BI-FAST / ISO-8583.',
    complexityLevel: 'Mission-Critical',
    priceMultiplier: 1.50,
    packagePrices: {
      MVP: 180000000,
      Standard: 340000000,
      Professional: 580000000,
      Enterprise: 950000000
    },
    monthlyPackagePrices: {
      MVP: 10500000,
      Standard: 20000000,
      Professional: 34000000,
      Enterprise: 58000000
    },
    packageDescriptions: {
      MVP: 'Onboarding nasabah, KYC dasar, buku besar akuntansi umum, dan audit log.',
      Standard: 'Core banking/lending engine, e-KYC verifikasi biometrik, payment gateway, dan filter AML (Anti-Money Laundering).',
      Professional: 'AI fraud detection real-time, switching transaksi berkecepatan tinggi, business intelligence, dan multi-factor auth.',
      Enterprise: 'Mission-critical core banking, ISO-8583 / BI-FAST bridge, active-active high-availability DC, dan tier-1 banking SLA.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Cloud banking ledger compliance, audit log immutable, dan enkripsi data nasabah standar OJK.',
      Standard: 'Managed Core Engine, e-KYC Biometric Verification Bridge, AML filter auto-update, dan SLA 8 jam.',
      Professional: 'Real-time AI Fraud Scoring Engine, switching gateway managed, backup hot-standby, dan SLA 4 jam.',
      Enterprise: 'Tier-1 High-Availability DC Active-Active Cluster, PCI-DSS Managed Compliance, dan 24/7 Incident SLA 1 Jam.'
    },
    packageModules: {
      MVP: [
        'Customer Onboarding & Basic KYC Module',
        'General Ledger & Transaction Bookkeeping',
        'Role-Based Permissions & Immutable Audit Trail'
      ],
      Standard: [
        'Core Banking / Loan Management Engine',
        'E-KYC & Biometric Face Verification Bridge',
        'Multi-Channel Payment Gateway & QRIS Switch',
        'Anti-Money Laundering (AML) & Sanction Screener'
      ],
      Professional: [
        'Real-time AI Fraud Detection & Transaction Scoring',
        'High-Throughput Financial Switching Engine',
        'Executive BI Financial Analytics & Cashflow Copilot',
        'Multi-Factor Authentication (MFA) & Hardware Token Bridge',
        'OJK / Bank Indonesia Regulatory Reporting Suite'
      ],
      Enterprise: [
        'Mission-Critical Core Banking & Lending Switch',
        'ISO-8583 / BI-FAST / SNAP Open Banking Connector',
        'Real-time AI Credit Scoring & Risk Engine',
        'High-Availability Active-Active Data Center Cluster',
        'Tier-1 Banking Security SLA & PCI-DSS Tier 1'
      ]
    },
    complianceStandards: ['POJK & BI Regulatory Compliance', 'PCI-DSS Level 1', 'ISO 27001 Security', 'SNAP BI Open API'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration', 'Security', 'Infrastructure']
  },
  {
    id: 'retail_commerce',
    name: 'Ritel & Multi-Store Commerce (POS)',
    category: 'Perdagangan & Retail',
    iconName: 'ShoppingBag',
    tagline: 'Aplikasi kasir multi-cabang (Cloud POS), transfer stok antar cabang, omnichannel e-commerce, dan loyalty.',
    complexityLevel: 'Standard',
    priceMultiplier: 0.70,
    packagePrices: {
      MVP: 75000000,
      Standard: 150000000,
      Professional: 260000000,
      Enterprise: 420000000
    },
    monthlyPackagePrices: {
      MVP: 4000000,
      Standard: 8500000,
      Professional: 15000000,
      Enterprise: 25000000
    },
    packageDescriptions: {
      MVP: 'Kasir Cloud POS, manajemen produk barcode, dan rekapitulasi penjualan harian.',
      Standard: 'Cloud POS multi-cabang, transfer stok otomatis, promo diskon dinamis, member point, dan integrasi QRIS/EDC.',
      Professional: 'Omnichannel commerce (toko fisik + online store), AI rekomendasi restock barang, dan WhatsApp broadcast promo.',
      Enterprise: 'Jaringan 100+ outlet terpusat, WMS pergudangan besar, dynamic pricing engine, dan integrasi ERP multi-PT.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan Cloud POS kasir, backup katalog produk, dan laporan omzet harian.',
      Standard: 'Managed Multi-Store Sync, sinkronisasi transfer stok cabang, QRIS payment gateway, dan WhatsApp support.',
      Professional: 'AI Auto-Reorder & Restock Predictor, omnichannel synchronization, dan broadcast voucher pelanggan.',
      Enterprise: '100+ Outlets Central Cloud Architecture, High-Speed WMS sync, dan 24/7 Retail Operations SLA.'
    },
    packageModules: {
      MVP: [
        'Cloud POS Kasir Barcode & Struk Cetak',
        'Manajemen Master Produk, Varian & Harga',
        'Laporan Kasir & Rekap Penjualan Harian'
      ],
      Standard: [
        'Cloud POS Multi-Store & Sinkronisasi Stok Cabang',
        'Transfer Stok Antar Outlet & Surat Jalan Toko',
        'Member Loyalty Point, Voucher & Promo Dinamis',
        'Integrasi Payment Gateway QRIS & EDC Bank'
      ],
      Professional: [
        'Omnichannel Commerce Sync (Store, Marketplace, Web)',
        'AI Restocking Predictor & Auto-Reorder Point',
        'Customer Lifetime Value & Analytics Copilot',
        'WhatsApp Notifikasi Nota & Broadcast Promo Member'
      ],
      Enterprise: [
        '100+ Outlet Centralized Retail Engine',
        'Warehouse Management System (WMS) Distribution',
        'Dynamic Pricing & Multi-Currency Engine',
        'Enterprise Multi-Company ERP Accounting Bridge'
      ]
    },
    complianceStandards: ['Standar Akuntansi Keuangan (SAK)', 'QRIS Standar Bank Indonesia'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI']
  },
  {
    id: 'hotel_hospitality',
    name: 'Perhotelan & Resort (PMS)',
    category: 'Pariwisata & Hospitaliti',
    iconName: 'Hotel',
    tagline: 'Property Management System (PMS): front desk, housekeeping real-time, channel manager OTA, dan guest portal.',
    complexityLevel: 'Medium-High',
    priceMultiplier: 0.95,
    packagePrices: {
      MVP: 110000000,
      Standard: 210000000,
      Professional: 340000000,
      Enterprise: 540000000
    },
    monthlyPackagePrices: {
      MVP: 6500000,
      Standard: 12500000,
      Professional: 20000000,
      Enterprise: 32000000
    },
    packageDescriptions: {
      MVP: 'Front desk check-in/out, kalender ketersediaan kamar, dan kasir billing tamu.',
      Standard: 'Cloud PMS hotel lengkap, housekeeping real-time, channel manager integrasi OTA, dan F&B room service.',
      Professional: 'Portal mobile tamu, AI dynamic room pricing, WhatsApp concierge otomatis 24/7, dan loyalty member hotel.',
      Enterprise: 'Manajemen jaringan hotel multi-properti, Central Reservation System (CRS), billing korporat, dan ERP terpusat.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan PMS front desk cloud, backup folio reservasi tamu, dan support via ticketing.',
      Standard: 'Channel Manager OTA real-time sync (Traveloka, Agoda, Booking.com), housekeeping live status, dan SLA 8 jam.',
      Professional: 'Managed AI Dynamic Pricing & Yield Management, WhatsApp 24/7 AI Concierge Bot, dan dedicated engineer.',
      Enterprise: 'Multi-Property CRS Cloud Platform, high-volume direct booking engine, dan 24/7 Hotel Operations SLA.'
    },
    packageModules: {
      MVP: [
        'Front Desk Check-in / Check-out & Room Calendar',
        'Pencatatan Reservasi Kamar & Deposit Tamu',
        'Billing Folio Tamu & Cetak Invoice'
      ],
      Standard: [
        'Cloud PMS Hotel & Room Inventory Engine',
        'Housekeeping & Status Kebersihan Kamar Real-time',
        'Channel Manager OTA (Traveloka, Agoda, Booking.com)',
        'F&B Resto, Room Service & Banquet Billing'
      ],
      Professional: [
        'Guest Mobile Web Portal & Digital Room Service',
        'AI Dynamic Room Pricing & Yield Management',
        'WhatsApp 24/7 Multi-Language Concierge Bot',
        'Guest Loyalty Program & CRM History'
      ],
      Enterprise: [
        'Multi-Property Hotel Chain Management Platform',
        'Central Reservation System (CRS) & Corporate Portal',
        'Integrated Banquet & Event Management Suite',
        'Full Hospitality Accounting, Asset & Payroll ERP'
      ]
    },
    complianceStandards: ['PHRI Standards', 'PCI-DSS Booking Security'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI']
  },
  {
    id: 'education_school',
    name: 'Pendidikan & Kampus (SIAKAD)',
    category: 'Pendidikan & Pelatihan',
    iconName: 'GraduationCap',
    tagline: 'Sistem Informasi Akademik (SIAKAD): portal siswa/orang tua, pembayaran SPP otomatis, e-Rapor, dan CBT.',
    complexityLevel: 'Standard',
    priceMultiplier: 0.65,
    packagePrices: {
      MVP: 70000000,
      Standard: 140000000,
      Professional: 240000000,
      Enterprise: 390000000
    },
    monthlyPackagePrices: {
      MVP: 4000000,
      Standard: 8000000,
      Professional: 14000000,
      Enterprise: 23000000
    },
    packageDescriptions: {
      MVP: 'Portal siswa, ledger nilai mata pelajaran, dan pencatatan absensi kelas.',
      Standard: 'SIAKAD lengkap, tagihan SPP payment gateway otomatis, e-Rapor Kurikulum Merdeka, dan absensi mobile QR.',
      Professional: 'Ujian Computer Based Test (CBT), AI learning analytics, dan WhatsApp notifikasi otomatis ke orang tua murid.',
      Enterprise: 'ERP perguruan tinggi multi-kampus, portofolio riset dosen, integrasi Kemendikbud Dikti (PDDIKTI), dan aset.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan cloud portal siswa & ledger akademik, backup database nilai siswa harian.',
      Standard: 'Managed SIAKAD & Payment Gateway SPP, e-Rapor Kurikulum Merdeka update berkala, dan WhatsApp support.',
      Professional: 'High-Capacity Cloud CBT Ujian Online, AI Learning Analytics, dan auto-notification WhatsApp wali murid.',
      Enterprise: 'Multi-Campus Enterprise SIAKAD Cloud, jembatan pelaporan PDDIKTI otomatis, dan SLA dukungan 24/7.'
    },
    packageModules: {
      MVP: [
        'Portal Siswa & Pengumuman Sekolah',
        'Ledger Nilai Mata Pelajaran & Absensi Siswa',
        'Cetak Kartu Ujian & Transkrip Sederhana'
      ],
      Standard: [
        'Sistem Informasi Akademik (SIAKAD) Terpadu',
        'Tagihan SPP & Payment Gateway Virtual Account',
        'E-Rapor Standar Kurikulum Merdeka / K13',
        'Presensi GPS & QR Mobile Siswa & Guru'
      ],
      Professional: [
        'Computer Based Test (CBT) & Bank Soal Online',
        'AI Learning Analytics & Deteksi Dini Siswa Tertinggal',
        'WhatsApp Notifikasi Otomatis ke Orang Tua Siswa',
        'Manajemen Konseling BP/BK & Ekstrakurikuler'
      ],
      Enterprise: [
        'Multi-Campus University Management Suite',
        'Integrasi Pelaporan PDDIKTI Kemendikbud',
        'Portofolio Riset, Hibah & BKD Dosen',
        'Digital Library & Campus Smart Card RFID Integration'
      ]
    },
    complianceStandards: ['Standar Kemendikbudristek', 'Integrasi PDDIKTI (Perguruan Tinggi)'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI']
  },
  {
    id: 'food_beverage',
    name: 'Food & Beverage (F&B Restoran / Kafe Franchise)',
    category: 'Perdagangan & Retail',
    iconName: 'Utensils',
    tagline: 'POS kasir restoran, Kitchen Display System (KDS), QR table self-order, dan pemotongan bahan baku resep otomatis.',
    complexityLevel: 'Standard',
    priceMultiplier: 0.60,
    packagePrices: {
      MVP: 65000000,
      Standard: 130000000,
      Professional: 220000000,
      Enterprise: 360000000
    },
    monthlyPackagePrices: {
      MVP: 3500000,
      Standard: 7500000,
      Professional: 13000000,
      Enterprise: 21000000
    },
    packageDescriptions: {
      MVP: 'Kasir POS meja & takeaway, cetak struk dapur, dan rekapitulasi shift kasir.',
      Standard: 'Kitchen Display System (KDS), Table QR self-order menu, resep bahan baku terpotong otomatis, dan multi-outlet.',
      Professional: 'Central kitchen distribusi bahan baku, AI optimasi HPP menu, loyalty stamp, dan integrasi GrabFood/GoFood.',
      Enterprise: 'Franchise management 50+ outlet, rantai pasok cold storage, royalti billing, dan real-time live revenue.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan POS kasir restoran cloud, cetak struk dapur, dan rekap kasir harian.',
      Standard: 'Kitchen Display & QR Self-Order Menu SaaS, pemotongan stok resep otomatis, dan multi-outlet sync.',
      Professional: 'Central Kitchen Management SaaS, AI Recipe Costing, dan webhook integrasi GrabFood/GoFood.',
      Enterprise: '50+ Franchise Outlets Cloud Cluster, Live Sales & Food Waste Dashboard, dan 24/7 F&B SLA.'
    },
    packageModules: {
      MVP: [
        'POS Kasir Meja, Dine-in & Takeaway',
        'Cetak Struk Dapur / Bar Otomatis',
        'Laporan Penjualan Shift & Rekap Kasir'
      ],
      Standard: [
        'Kitchen Display System (KDS) & Waiter Order App',
        'Table QR Self-Order & Menu Digital Interaktif',
        'Manajemen Resep & Pemotongan Bahan Baku Otomatis',
        'Multi-Outlet POS Sync & Petty Cash Management'
      ],
      Professional: [
        'Central Kitchen & Bahan Baku Distribution Engine',
        'AI Recipe Costing & Margin Optimization Copilot',
        'Loyalty Stamp, Cashback & WhatsApp Voucher Promo',
        'Integrasi Pesanan Online (GrabFood / GoFood Webhook)'
      ],
      Enterprise: [
        '50+ Outlet Franchise & Royalty Management Platform',
        'Central Supply Chain & Cold Storage Logistics',
        'Multi-Brand Restaurant Holding Management',
        'Real-time Live Sales & Food Waste Prevention Dashboard'
      ]
    },
    complianceStandards: ['Sertifikasi Halal BPJPH', 'Standar Higiene BPOM'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI']
  },
  {
    id: 'property_realestate',
    name: 'Properti & Real Estate Development',
    category: 'Properti & Konstruksi',
    iconName: 'Home',
    tagline: 'Site plan unit interaktif, Surat Pesanan Rumah (SPR), cicilan & KPR bank, komisi agen, dan billing IPL perumahan.',
    complexityLevel: 'Medium-High',
    priceMultiplier: 1.00,
    packagePrices: {
      MVP: 120000000,
      Standard: 225000000,
      Professional: 360000000,
      Enterprise: 570000000
    },
    monthlyPackagePrices: {
      MVP: 7000000,
      Standard: 13000000,
      Professional: 21000000,
      Enterprise: 34000000
    },
    packageDescriptions: {
      MVP: 'Unit master & site plan status, booking fee & SPR digital, dan laporan penjualan marketing.',
      Standard: 'Tracking cicilan DP & KPR bank, kalkulator komisi broker, billing IPL iuran warga, dan legalitas dokumen.',
      Professional: 'Site plan 2D/3D interaktif, AI lead scoring WhatsApp follow-up, portal penghuni mobile, dan payment IPL.',
      Enterprise: 'Platform township & multi-proyek, progres konstruksi & billing kontraktor, serta cashflow forecast ERP.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan cloud unit master kavling, backup SPR digital, dan laporan leads sales.',
      Standard: 'Managed Real Estate CRM & Billing IPL Warga, reminder jatuh tempo cicilan via WhatsApp, dan SLA 8 jam.',
      Professional: 'Interactive 3D Site Plan Cloud, AI Lead Scoring Assistant, portal mobile penghuni, dan payment gateway IPL.',
      Enterprise: 'Township Multi-Project High-Availability Cluster, Contractor Progress Sync, dan 24/7 SLA.'
    },
    packageModules: {
      MVP: [
        'Unit Master, Ketersediaan Kavling & Site Plan Status',
        'Booking Fee & Surat Pesanan Rumah (SPR) Digital',
        'Laporan Penjualan Tim Marketing'
      ],
      Standard: [
        'Real Estate Management: Jadwal Cicilan DP & KPR Bank',
        'Tracking Legalitas, PPJB & Sertifikat Rumah',
        'Komisi Broker & Sales Lead Assignment',
        'Billing IPL (Iuran Pemeliharaan Lingkungan) & Air'
      ],
      Professional: [
        'Interactive 2D/3D Site Plan Unit Picker',
        'AI Lead Scoring & WhatsApp Follow-up Automation',
        'Resident Mobile App (Lapor Keluhan & Bayar IPL)',
        'Payment Gateway Virtual Account Iuran Warga'
      ],
      Enterprise: [
        'Township & Multi-Project Development ERP',
        'Construction Progress Tracker & Contractor Billing',
        'Cashflow & Revenue Recognition Forecasting Engine',
        'Legal, Land Acquisition & Landbank Management'
      ]
    },
    complianceStandards: ['Standar BPN / ATR', 'PPJB & Hukum Properti'],
    recommendedCatalogCategories: ['Module', 'Integration', 'AI']
  },
  {
    id: 'general_enterprise',
    name: 'Holding & General Enterprise / B2B Custom',
    category: 'Korporat & Holding',
    iconName: 'Layers',
    tagline: 'Solusi enterprise adaptif: custom workflow arsitektur microservices, AI Copilot, dan integrasi ERP korporasi.',
    complexityLevel: 'High-Compliance',
    priceMultiplier: 1.00,
    packagePrices: {
      MVP: 120000000,
      Standard: 220000000,
      Professional: 350000000,
      Enterprise: 550000000
    },
    monthlyPackagePrices: {
      MVP: 7000000,
      Standard: 13000000,
      Professional: 21000000,
      Enterprise: 33000000
    },
    packageDescriptions: {
      MVP: 'Dasbor eksekutif dasar, manajemen operasional, dan kontrol akses pengguna.',
      Standard: 'Solusi terintegrasi operasional, finance & billing, advanced analytics, dan integrasi WhatsApp.',
      Professional: 'Platform AI Copilot berbasis Google Gemini, customer & vendor portal, serta audit logging.',
      Enterprise: 'Arsitektur skala besar multi-cabang/anak perusahaan, custom AI models, dan SLA 24/7.'
    },
    monthlyPackageDescriptions: {
      MVP: 'Layanan cloud dashboard eksekutif, backup operasional harian, dan support email.',
      Standard: 'Managed Operations & Billing Cloud, WhatsApp Enterprise Gateway, dan SLA prioritas 8 jam.',
      Professional: 'Managed Google Gemini AI Copilot, kuota token bulanan, vendor portal managed, dan SLA 4 jam.',
      Enterprise: 'Enterprise Microservices High-Availability Cluster, 24/7 Security Operations Center, dan On-Call SLA 2 Jam.'
    },
    packageModules: {
      MVP: [
        'Executive Dashboard Core',
        'Basic Operations & Task Management',
        'User Access Control & Audit Log'
      ],
      Standard: [
        'Operations & Logistics Management',
        'Finance & Billing Module',
        'Advanced Analytics & Reporting Engine',
        'WhatsApp Business Gateway Integration'
      ],
      Professional: [
        'Executive BI Dashboard & KPI Copilot',
        'Google Gemini AI Query & Insights Engine',
        'Customer & Vendor Portal Multi-Tenant',
        'ERP API Gateway & Audit Compliance'
      ],
      Enterprise: [
        'Custom Microservices Architecture',
        'Enterprise AI Model & Telemetry Engine',
        'Multi-Branch Hierarchy & Corporate Holding',
        'High-Availability Cloud Cluster with 24/7 SLA'
      ]
    },
    complianceStandards: ['ISO 27001 Security', 'Enterprise SLA 99.9%'],
    recommendedCatalogCategories: ['Module', 'AI', 'Integration', 'Infrastructure', 'Security']
  }
];

export class IndustryPricingService {
  /**
   * Return all registered industries
   */
  public static getAllIndustries(): IndustrySectorConfig[] {
    return INDUSTRY_SECTOR_CONFIGS;
  }

  /**
   * Find an industry by ID or name
   */
  public static getIndustryById(idOrName?: string): IndustrySectorConfig {
    if (!idOrName) {
      return INDUSTRY_SECTOR_CONFIGS[0];
    }
    const clean = idOrName.toLowerCase().trim();
    const found = INDUSTRY_SECTOR_CONFIGS.find(
      (ind) =>
        ind.id.toLowerCase() === clean ||
        ind.name.toLowerCase().includes(clean) ||
        clean.includes(ind.id.toLowerCase())
    );
    return found || INDUSTRY_SECTOR_CONFIGS[0];
  }

  /**
   * Generate packages list customized for an industry, supporting One-time, Monthly (SaaS), or Hybrid
   */
  public static getPackagesForIndustry(
    industryIdOrName?: string,
    _currency: string = 'IDR',
    pricingModel: 'One-time' | 'Monthly' | 'Hybrid' = 'One-time'
  ): Partial<QuotationPackage>[] {
    const ind = this.getIndustryById(industryIdOrName);
    const mPrices = ind.monthlyPackagePrices || {
      MVP: Math.round(ind.packagePrices.MVP * 0.055),
      Standard: Math.round(ind.packagePrices.Standard * 0.055),
      Professional: Math.round(ind.packagePrices.Professional * 0.055),
      Enterprise: Math.round(ind.packagePrices.Enterprise * 0.055)
    };

    return [
      {
        name: 'MVP',
        description:
          pricingModel === 'Monthly'
            ? ind.monthlyPackageDescriptions?.MVP || 'Layanan bulanan software & cloud hosting dasar, auto-backup harian.'
            : ind.packageDescriptions?.MVP || 'Cocok untuk validasi konsep, uji coba operasional skala awal.',
        basePrice: ind.packagePrices.MVP,
        monthlyPrice: mPrices.MVP,
        pricingModel,
        modules: ind.packageModules.MVP,
        features:
          pricingModel === 'Monthly'
            ? [
                'Cloud Server & DB Managed',
                'Harian Auto-Backup',
                'Email Support (SLA 24 Jam)',
                'Pemeliharaan Bugfix Rutin'
              ]
            : [
                'Standard Reporting',
                'Email/WhatsApp Notification',
                'Single Admin Console'
              ],
        users: 'Up to 25 Users',
        platform: 'Web Desktop App',
        support: 'Email Support (SLA 24 Jam)',
        warranty: pricingModel === 'Monthly' ? 'Selama Berlangganan Aktif' : '3 Bulan Garansi',
        timeline: pricingModel === 'Monthly' ? 'Instan / 1-2 Minggu Setup' : '4 - 6 Minggu'
      },
      {
        name: 'Standard',
        description:
          pricingModel === 'Monthly'
            ? ind.monthlyPackageDescriptions?.Standard || 'Layanan SaaS terkelola, cloud cluster, integrasi WhatsApp, backup real-time.'
            : ind.packageDescriptions?.Standard || 'Solusi terintegrasi lengkap dengan kebutuhan otomasi proses.',
        basePrice: ind.packagePrices.Standard,
        monthlyPrice: mPrices.Standard,
        pricingModel,
        modules: ind.packageModules.Standard,
        features:
          pricingModel === 'Monthly'
            ? [
                'Cloud High-Availability',
                'WhatsApp Gateway Terkelola',
                'Priority Support (SLA 8 Jam)',
                'Minor Feature Upgrades Berkala'
              ]
            : [
                'Advanced Analytics',
                'WhatsApp Gateway Integration',
                'Role-Based Permissions'
              ],
        users: 'Up to 100 Users',
        platform: 'Web Desktop + PWA Mobile',
        support: 'Priority Support (SLA 8 Jam)',
        warranty: pricingModel === 'Monthly' ? 'Selama Berlangganan Aktif' : '6 Bulan Garansi',
        timeline: pricingModel === 'Monthly' ? '2-3 Minggu Onboarding' : '8 - 10 Minggu'
      },
      {
        name: 'Professional',
        description:
          pricingModel === 'Monthly'
            ? ind.monthlyPackageDescriptions?.Professional || 'Managed AI Copilot & Cloud High-Availability, kuota AI Gemini bulanan, maintenance berkala.'
            : ind.packageDescriptions?.Professional || 'Platform skala menengah tinggi dilengkapi AI Copilot dan integrasi API.',
        basePrice: ind.packagePrices.Professional,
        monthlyPrice: mPrices.Professional,
        pricingModel,
        modules: ind.packageModules.Professional,
        features:
          pricingModel === 'Monthly'
            ? [
                'Managed Google Gemini AI & Quota',
                'Multi-Region Cloud Hosting',
                'Dedicated Account Engineer (SLA 4 Jam)',
                'Continuous Security & Patching'
              ]
            : [
                'Google Gemini AI Copilot',
                'Predictive Engine',
                'WhatsApp & Email Gateway',
                'Audit Logging'
              ],
        users: 'Up to 300 Users',
        platform: 'Web + Android & iOS PWA',
        support: 'Dedicated Manager (SLA 4 Jam)',
        warranty: pricingModel === 'Monthly' ? 'Selama Berlangganan Aktif' : '6 Bulan Garansi',
        timeline: pricingModel === 'Monthly' ? '3-4 Minggu Custom Onboarding' : '10 - 12 Minggu'
      },
      {
        name: 'Enterprise',
        description:
          pricingModel === 'Monthly'
            ? ind.monthlyPackageDescriptions?.Enterprise || 'Enterprise 24/7 Managed DevOps, high-availability multi-zone, SLA on-call 2 jam, audit keamanan berkala.'
            : ind.packageDescriptions?.Enterprise || 'Arsitektur skala besar berkinerja tinggi untuk korporasi & multi-cabang.',
        basePrice: ind.packagePrices.Enterprise,
        monthlyPrice: mPrices.Enterprise,
        pricingModel,
        modules: ind.packageModules.Enterprise,
        features:
          pricingModel === 'Monthly'
            ? [
                'Custom AI Engine & Large Quota',
                '24/7 Security Operations & SLA 2 Jam',
                'Active-Active Multi-Zone Cloud',
                'Dedicated Technical Architect Team'
              ]
            : [
                'Custom AI Models',
                'High Availability Cloud Cluster',
                '24/7 Security Monitoring',
                'Dedicated On-site SLA'
              ],
        users: 'Unlimited Users / Branches',
        platform: 'Web + Android + iOS Native/PWA',
        support: '24/7 On-Call SLA 2 Jam',
        warranty: pricingModel === 'Monthly' ? 'Selama Berlangganan Aktif' : '12 Bulan Garansi',
        timeline: pricingModel === 'Monthly' ? '4-6 Minggu Enterprise Rollout' : '12 - 16 Minggu'
      }
    ];
  }

  /**
   * Calculate adjusted price for custom catalog items based on industry complexity and frequency
   */
  public static calculateItemPrice(
    basePrice: number,
    industryIdOrName?: string,
    frequency: 'One-time' | 'Monthly' | 'Quarterly' | 'Annual' = 'One-time'
  ): number {
    const ind = this.getIndustryById(industryIdOrName);
    const adjustedOneTime = Math.round(basePrice * ind.priceMultiplier);
    if (frequency === 'Monthly') {
      return Math.round(adjustedOneTime * 0.055);
    }
    if (frequency === 'Quarterly') {
      return Math.round(adjustedOneTime * 0.055 * 3 * 0.95);
    }
    if (frequency === 'Annual') {
      return Math.round(adjustedOneTime * 0.055 * 10); // 10 months price (2 months free discount)
    }
    return adjustedOneTime;
  }
}
