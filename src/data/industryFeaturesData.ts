export interface IndustryFeatureItem {
  id: string;
  name: string;
  category: 'Industry Specific' | 'Operations' | 'Finance' | 'Sales' | 'HR' | 'Security' | 'Analytics' | 'AI' | 'Automation' | 'Integration' | 'Maintenance';
  description: string;
  isRecommended?: boolean;
  badge?: string;
  isAI?: boolean;
}

export interface IndustryFeatureGroup {
  industryId: string;
  industryName: string;
  industryAliases: string[];
  category: string;
  iconName: string;
  description: string;
  recommendedPresets: string[];
  features: IndustryFeatureItem[];
}

export const GENERAL_CORE_FEATURES: IndustryFeatureItem[] = [
  {
    id: 'Dashboard Eksekutif',
    name: 'Dashboard Eksekutif',
    category: 'Analytics',
    description: 'Visualisasi KPI bisnis terpadu, tren revenue, status operasional, dan ringkasan eksekutif real-time.',
    isRecommended: true
  },
  {
    id: 'User Management & Roles (RBAC)',
    name: 'User Management & Roles (RBAC)',
    category: 'Security',
    description: 'Otorisasi bertingkat berdasarkan peran jabatan, permission granular, dan multi-user audit trail.',
    isRecommended: true
  },
  {
    id: 'Customer Management (CRM)',
    name: 'Customer Management (CRM)',
    category: 'Sales',
    description: 'Database pelanggan, pipeline prospek, riwayat interaksi, follow-up, dan segmentasi klien.'
  },
  {
    id: 'Employee Management (HRIS)',
    name: 'Employee Management (HRIS)',
    category: 'HR',
    description: 'Manajemen data staf, absensi digital, struktur organisasi, jadwal shift, dan payroll dasar.'
  },
  {
    id: 'Inventory & Stock Management',
    name: 'Inventory & Stock Management',
    category: 'Operations',
    description: 'Pencatatan mutasi stok gudang, alert stok minimum, kartu stok digital, dan reorder point otomatis.',
    isRecommended: true
  },
  {
    id: 'Purchasing & Procurement',
    name: 'Purchasing & Procurement',
    category: 'Finance',
    description: 'Purchase Request (PR), Purchase Order (PO), verifikasi vendor, dan matching faktur supplier.'
  },
  {
    id: 'Finance & Accounting',
    name: 'Finance & Accounting',
    category: 'Finance',
    description: 'Buku besar (General Ledger), pencatatan arus kas, jurnal otomatis, dan laporan laba/rugi.'
  },
  {
    id: 'Multi-Level Approval Workflow',
    name: 'Multi-Level Approval Workflow',
    category: 'Automation',
    description: 'Otorisasi berjenjang untuk pengeluaran anggaran, PO, SPK, dan dokumen penting dengan notifikasi.',
    isRecommended: true
  },
  {
    id: 'Dynamic Reporting & Export Center',
    name: 'Dynamic Reporting & Export Center',
    category: 'Analytics',
    description: 'Kustomisasi filter laporan fleksibel, export otomatis PDF, Excel, dan CSV terjadwal.',
    isRecommended: true
  },
  {
    id: 'Notification Engine (WhatsApp/Email)',
    name: 'Notification Engine (WhatsApp/Email)',
    category: 'Automation',
    description: 'Trigger notifikasi instan WhatsApp & Email untuk status transaksi, approval, dan alert darurat.',
    isRecommended: true
  },
  {
    id: 'Third-Party REST API Integration',
    name: 'Third-Party REST API Integration',
    category: 'Integration',
    description: 'Konektor API ke sistem eksternal, Payment Gateway, ERP existing, atau sistem regulator.'
  }
];

export const AI_INNOVATION_FEATURES: IndustryFeatureItem[] = [
  {
    id: 'AI Business Assistant (Copilot)',
    name: 'AI Business Assistant (Copilot)',
    category: 'AI',
    description: 'Asisten cerdas berbasis LLM untuk menjawab data bisnis, analisis dokumen, dan rekomendasi operasional.',
    isRecommended: true,
    isAI: true,
    badge: 'Gemini AI'
  },
  {
    id: 'AI Document OCR & PDF Extractor',
    name: 'AI Document OCR & PDF Extractor',
    category: 'AI',
    description: 'Ekstraksi otomatis invoice, surat jalan, KTP/SIM, dan dokumen fisik menjadi data tabular terstruktur.',
    isAI: true,
    badge: 'Vision AI'
  },
  {
    id: 'AI Predictive Trend & Analytics',
    name: 'AI Predictive Trend & Analytics',
    category: 'AI',
    description: 'Forecasting permintaan pasar, proyeksi kebutuhan stok, dan estimasi beban kerja masa depan.',
    isAI: true,
    badge: 'Predictive'
  },
  {
    id: 'AI Anomaly & Risk Detection',
    name: 'AI Anomaly & Risk Detection',
    category: 'AI',
    description: 'Deteksi otomatis ketidakwajaran data transaksi, indikasi fraud, kebocoran biaya, dan anomali proses.',
    isAI: true,
    badge: 'Security AI'
  },
  {
    id: 'Workflow Automation Engine',
    name: 'Workflow Automation Engine',
    category: 'Automation',
    description: 'Trigger otomatis aksi antar modul (misal: auto-generate PO saat stok kritis, auto-assign teknisi).',
    isRecommended: true
  }
];

export const INDUSTRY_SPECIFIC_FEATURE_GROUPS: IndustryFeatureGroup[] = [
  {
    industryId: 'mining',
    industryName: 'Pertambangan Batubara & Mineral',
    industryAliases: ['mining', 'coal mining', 'nickel mining', 'tambang', 'batu bara', 'nikel', 'mineral'],
    category: 'Energi & Sumber Daya Alam',
    iconName: 'Pickaxe',
    description: 'Operasional pit tambang, telemetri alat berat, pemantauan solar, dan kepatuhan K3 ESDM.',
    recommendedPresets: [
      'Ritase & Hauling Tracker Realtime',
      'Fuel Monitoring & Solar Loss Detection',
      'Equipment Fleet & Heavy Machinery IoT',
      'K3 & Pit Incident Inspection',
      'AI Mining Anomaly & Fuel Loss Detector',
      'Stockpile & ROM Balance Management',
      'Dashboard Eksekutif',
      'User Management & Roles (RBAC)',
      'Dynamic Reporting & Export Center'
    ],
    features: [
      {
        id: 'Ritase & Hauling Tracker Realtime',
        name: 'Ritase & Hauling Tracker Realtime',
        category: 'Industry Specific',
        description: 'Pencatatan ritase dump truck, waktu antrean loader, siklus hauling, dan tonase overburden/ore.',
        isRecommended: true,
        badge: 'Core Mining'
      },
      {
        id: 'Fuel Monitoring & Solar Loss Detection',
        name: 'Fuel Monitoring & Solar Loss Detection',
        category: 'Industry Specific',
        description: 'Manajemen dispenser BBM pit, rasio konsumsi solar per jam alat berat, dan deteksi kebocoran BBM.',
        isRecommended: true,
        badge: 'Cost Control'
      },
      {
        id: 'Equipment Fleet & Heavy Machinery IoT',
        name: 'Equipment Fleet & Heavy Machinery IoT',
        category: 'Industry Specific',
        description: 'Log jam operasi (Hour Meter/HM), status standby/breakdown excavator & dozer, serta jadwal overhaul.',
        isRecommended: true,
        badge: 'Fleet IoT'
      },
      {
        id: 'K3 & Pit Incident Inspection',
        name: 'K3 & Pit Incident Inspection',
        category: 'Industry Specific',
        description: 'Audit keselamatan kerja digital, inspeksi harian K3, log insiden pit, dan kepatuhan Kepmen ESDM.',
        isRecommended: true,
        badge: 'K3 ESDM'
      },
      {
        id: 'Stockpile & ROM Balance Management',
        name: 'Stockpile & ROM Balance Management',
        category: 'Industry Specific',
        description: 'Tracking volume stockpile, kualitas kalori batubara/kadar nikel, dan rekonsiliasi barge loading.'
      },
      {
        id: 'Contractor Billing & Production Reconciler',
        name: 'Contractor Billing & Production Reconciler',
        category: 'Industry Specific',
        description: 'Rekonsiliasi otomatis produksi kontraktor, perhitungan ritase, penalti denda, dan invoicing.'
      },
      {
        id: 'GPS Pit Geofencing & Vehicle Tracking',
        name: 'GPS Pit Geofencing & Vehicle Tracking',
        category: 'Operations',
        description: 'Pemantauan posisi armada di area konsesi tambang secara realtime dengan zona peringatan bahaya.'
      },
      {
        id: 'AI Mining Anomaly & Fuel Loss Detector',
        name: 'AI Mining Anomaly & Fuel Loss Detector',
        category: 'AI',
        description: 'AI pendeteksi ketidakwajaran konsumsi BBM dan anomali ritase operator untuk mencegah fraud.',
        isAI: true,
        badge: 'AI Shield'
      }
    ]
  },
  {
    industryId: 'healthcare_hospital',
    industryName: 'Rumah Sakit & SIMRS',
    industryAliases: ['hospital', 'rumah sakit', 'healthcare', 'simrs', 'rsud', 'rsia', 'medis'],
    category: 'Kesehatan & Farmasi',
    iconName: 'Activity',
    description: 'SIMRS komprehensif, integrasi SATUSEHAT Kemenkes, BPJS V-Claim, EMR & Rawat Inap.',
    recommendedPresets: [
      'Rekam Medis Elektronik (RME) SATUSEHAT',
      'Bridging BPJS V-Claim 2.0 & E-Klaim',
      'Antrean Poliklinik & Pendaftaran Pasien',
      'Manajemen Farmasi & Depo Obat FIFO/FEFO',
      'Billing Kasir & Asuransi Rawat Inap',
      'Bed Management & Rawat Inap (Ranap)',
      'AI Resume Medis & ICD-10 Coding Copilot',
      'Dashboard Eksekutif',
      'User Management & Roles (RBAC)'
    ],
    features: [
      {
        id: 'Rekam Medis Elektronik (RME) SATUSEHAT',
        name: 'Rekam Medis Elektronik (RME) SATUSEHAT',
        category: 'Industry Specific',
        description: 'RME terstandar FHIR Kemenkes RI, resume medis digital, riwayat alergi, dan SOAP dokter.',
        isRecommended: true,
        badge: 'Kemenkes RI'
      },
      {
        id: 'Bridging BPJS V-Claim 2.0 & E-Klaim',
        name: 'Bridging BPJS V-Claim 2.0 & E-Klaim',
        category: 'Industry Specific',
        description: 'Penerbitan SEP instan, validasi rujukan BPJS online, dan bridging klaim INA-CBG terpadu.',
        isRecommended: true,
        badge: 'BPJS Bridging'
      },
      {
        id: 'Antrean Poliklinik & Pendaftaran Pasien',
        name: 'Antrean Poliklinik & Pendaftaran Pasien',
        category: 'Industry Specific',
        description: 'Display nomor antrean TV poli, registrasi mandiri kiosk, dan integrasi WhatsApp nomor antrean.',
        isRecommended: true,
        badge: 'Front Office'
      },
      {
        id: 'Manajemen Farmasi & Depo Obat FIFO/FEFO',
        name: 'Manajemen Farmasi & Depo Obat FIFO/FEFO',
        category: 'Industry Specific',
        description: 'Resep elektronik dokter (e-Prescription), racikan obat, stok depo farmasi, dan batch expiry alert.',
        isRecommended: true,
        badge: 'Pharmacy'
      },
      {
        id: 'Bed Management & Rawat Inap (Ranap)',
        name: 'Bed Management & Rawat Inap (Ranap)',
        category: 'Industry Specific',
        description: 'Visualisasi ketersediaan tempat tidur (ICU/VIP/Kelas), visite dokter, asuhan keperawatan, & discharge.'
      },
      {
        id: 'LIS Laboratorium & RIS Radiologi Bridge',
        name: 'LIS Laboratorium & RIS Radiologi Bridge',
        category: 'Industry Specific',
        description: 'Integrasi hasil lab mesin otomatis, order radiologi, dan lampiran hasil pemeriksaan penunjang.'
      },
      {
        id: 'Billing Kasir & Asuransi Rawat Inap',
        name: 'Billing Kasir & Asuransi Rawat Inap',
        category: 'Finance',
        description: 'Kalkulasi total tarif tindakan, kamar, obat, penunjang, split-bill asuransi swasta & co-payment.'
      },
      {
        id: 'AI Resume Medis & ICD-10 Coding Copilot',
        name: 'AI Resume Medis & ICD-10 Coding Copilot',
        category: 'AI',
        description: 'AI pencocok otomatis kode diagnosa ICD-10 / ICD-9-CM dari narasi dokter untuk mempercepat klaim.',
        isAI: true,
        badge: 'Medical AI'
      }
    ]
  },
  {
    industryId: 'clinic_pharmacy',
    industryName: 'Klinik Pratama/Utama & Apotek',
    industryAliases: ['clinic', 'pharmacy', 'klinik', 'apotek', 'praktek dokter', 'dokter gigi', 'klinik umum'],
    category: 'Kesehatan & Farmasi',
    iconName: 'Stethoscope',
    description: 'Sistem operasional klinik rawat jalan, e-prescribing, kasir apotek, & BPJS PCare.',
    recommendedPresets: [
      'RME Standar SATUSEHAT Klinik',
      'Kasir Apotek & POS Obat FEFO',
      'Antrean Pasien & Rekam Medis Dokter',
      'Bagi Hasil Dokter & Komisi Paramedis',
      'WhatsApp Reminder Jadwal Kontrol Pasien',
      'Dashboard Eksekutif',
      'Inventory & Stock Management'
    ],
    features: [
      {
        id: 'RME Standar SATUSEHAT Klinik',
        name: 'RME Standar SATUSEHAT Klinik',
        category: 'Industry Specific',
        description: 'Pencatatan rekam medis elektronik ringkas siap sync SATUSEHAT untuk klinik umum & spesialis.',
        isRecommended: true,
        badge: 'SATUSEHAT'
      },
      {
        id: 'Kasir Apotek & POS Obat FEFO',
        name: 'Kasir Apotek & POS Obat FEFO',
        category: 'Industry Specific',
        description: 'Point of Sales apotek terintegrasi e-resep, pengingat kadaluarsa FEFO, dan kartu stok obat.',
        isRecommended: true,
        badge: 'Apotek POS'
      },
      {
        id: 'Antrean Pasien & Rekam Medis Dokter',
        name: 'Antrean Pasien & Rekam Medis Dokter',
        category: 'Industry Specific',
        description: 'Manajemen antrean dokter, riwayat kunjungan pasien, odontogram (gigi), dan diagnosa ICD-10.',
        isRecommended: true
      },
      {
        id: 'Bagi Hasil Dokter & Komisi Paramedis',
        name: 'Bagi Hasil Dokter & Komisi Paramedis',
        category: 'Finance',
        description: 'Perhitungan otomatis fee jasa medis dokter, perawat, dan terapis berdasarkan tindakan.',
        isRecommended: true,
        badge: 'Jasa Medis'
      },
      {
        id: 'Bridging BPJS PCare (Primary Care)',
        name: 'Bridging BPJS PCare (Primary Care)',
        category: 'Integration',
        description: 'Koneksi bridging pendaftaran dan entri pelayanan BPJS Kesehatan PCare untuk Fasilitas Kesehatan Tingkat Pertama (FKTP).'
      },
      {
        id: 'WhatsApp Reminder Jadwal Kontrol Pasien',
        name: 'WhatsApp Reminder Jadwal Kontrol Pasien',
        category: 'Automation',
        description: 'Kirim otomatis pengingat jadwal kontrol, jadwal minum obat, dan promo klinik melalui WhatsApp.'
      }
    ]
  },
  {
    industryId: 'aesthetic_clinic',
    industryName: 'Klinik Kecantikan & Estetika',
    industryAliases: ['aesthetic', 'beauty clinic', 'klinik kecantikan', 'estetika', 'skincare', 'dermatologi', 'perawatan kulit', 'spa medis', 'aesthetic clinic', 'klinik estetika'],
    category: 'Kesehatan & Estetika',
    iconName: 'Sparkles',
    description: 'Sistem operasional klinik kecantikan & skincare, foto before-after, paket treatment multi-sesi, e-consent, kasir skincare, komisi beautician & dokter.',
    recommendedPresets: [
      'Rekam Medis Estetika & Skincare EMR',
      'Foto Before-After & Facial Mapping Annotation',
      'Paket Treatment Multi-Sesi & Deposit Saldo',
      'Informed Consent Digital (E-Sign Pasien)',
      'Jadwal Dokter, Beautician & Treatment Room',
      'Kasir POS Estetika, Resep Krim & Skincare',
      'Komisi Tindakan Dokter & Beautician/Terapis',
      'AI Skin Analysis & Churn Retouch Predictor',
      'Dashboard Eksekutif',
      'Customer Management (CRM)'
    ],
    features: [
      {
        id: 'Rekam Medis Estetika & Skincare EMR',
        name: 'Rekam Medis Estetika & Skincare EMR',
        category: 'Industry Specific',
        description: 'Rekam medis pasien estetika, tipe kulit (Fitzpatrick scale), riwayat alergi produk, dan catatan tindakan laser/peeling/injeksi.',
        isRecommended: true,
        badge: 'Aesthetic EMR'
      },
      {
        id: 'Foto Before-After & Facial Mapping Annotation',
        name: 'Foto Before-After & Facial Mapping Annotation',
        category: 'Industry Specific',
        description: 'Dokumentasi foto klinis multi-angle HD, grid perbandingan Sebelum-Sesudah, dan mapping titik injeksi botox/filler/benang.',
        isRecommended: true,
        badge: 'Face Mapping'
      },
      {
        id: 'Paket Treatment Multi-Sesi & Deposit Saldo',
        name: 'Paket Treatment Multi-Sesi & Deposit Saldo',
        category: 'Industry Specific',
        description: 'Pengelolaan paket perawatan multi-visit (misal: Laser 5x Sesi), kartu sisa sesi digital, dan deposit saldo treatment member.',
        isRecommended: true,
        badge: 'Treatment Package'
      },
      {
        id: 'Informed Consent Digital (E-Sign Pasien)',
        name: 'Informed Consent Digital (E-Sign Pasien)',
        category: 'Industry Specific',
        description: 'Lembar persetujuan tindakan medis/estetika digital di tablet dengan tanda tangan elektronik berkekuatan hukum.',
        isRecommended: true,
        badge: 'E-Consent'
      },
      {
        id: 'Jadwal Dokter, Beautician & Treatment Room',
        name: 'Jadwal Dokter, Beautician & Treatment Room',
        category: 'Operations',
        description: 'Kalender reservasi pintar slot dokter spesialis/estetika, terapis beautician, dan ketersediaan bed/ruang tindakan.',
        isRecommended: true,
        badge: 'Slot Booking'
      },
      {
        id: 'Kasir POS Estetika, Resep Krim & Skincare',
        name: 'Kasir POS Estetika, Resep Krim & Skincare',
        category: 'Finance',
        description: 'Kasir cepat untuk pembayaran tindakan, penjualan produk kosmetik/skincare BPOM, e-resep racikan krim, dan split bill.',
        isRecommended: true,
        badge: 'Aesthetic POS'
      },
      {
        id: 'Komisi Tindakan Dokter & Beautician/Terapis',
        name: 'Komisi Tindakan Dokter & Beautician/Terapis',
        category: 'Finance',
        description: 'Perhitungan otomatis bagi hasil dokter, poin/komisi pengerjaan terapis per treatment, dan bonus penjualan produk.',
        isRecommended: true,
        badge: 'Komisi Staff'
      },
      {
        id: 'Membership VIP, Tiering & WhatsApp Recall',
        name: 'Membership VIP, Tiering & WhatsApp Recall',
        category: 'Sales',
        description: 'Manajemen tier member (Silver, Gold, Platinum), diskon otomatis, voucher ultah, dan broadcast WhatsApp pengingat retouch/facial.'
      },
      {
        id: 'Manajemen Stok Skincare & Auto-Deduct BMHP',
        name: 'Manajemen Stok Skincare & Auto-Deduct BMHP',
        category: 'Operations',
        description: 'Pengurangan otomatis stok bahan medis habis pakai (jarum, ampul serum, spuit) per tindakan dan stok skincare FEFO.'
      },
      {
        id: 'AI Skin Analysis & Churn Retouch Predictor',
        name: 'AI Skin Analysis & Churn Retouch Predictor',
        category: 'AI',
        description: 'AI deteksi masalah kulit (pori/flek/kerutan), rekomendasi paket treatment, dan prediksi jadwal retouch berkala pasien.',
        isAI: true,
        badge: 'Aesthetic AI'
      }
    ]
  },
  {
    industryId: 'plantation_agri',
    industryName: 'Perkebunan Kelapa Sawit & Agro',
    industryAliases: ['plantation', 'kelapa sawit', 'sawit', 'kebun', 'agro', 'pks', 'cpo', 'karet', 'pertanian'],
    category: 'Agrikultur & Kehutanan',
    iconName: 'Trees',
    description: 'Pencatatan panen TBS, Buku Pedoman Mandor, timbang PKS, premi panen, & GIS blok kebun.',
    recommendedPresets: [
      'Pencatatan Panen TBS Lapangan (Mobile Offline)',
      'Buku Pedoman Hasil (BPH) Mandor Digital',
      'Jembatan Timbang PKS & Grading Buah',
      'Premi Pemanen & Upah Borongan Lapangan',
      'Pemetaan Blok Kebun GPS & GIS',
      'Dashboard Eksekutif',
      'Inventory & Stock Management'
    ],
    features: [
      {
        id: 'Pencatatan Panen TBS Lapangan (Mobile Offline)',
        name: 'Pencatatan Panen TBS Lapangan (Mobile Offline)',
        category: 'Industry Specific',
        description: 'Aplikasi mobile mandor bekerja 100% offline di pelosok kebun dan auto-sync saat mendapat sinyal.',
        isRecommended: true,
        badge: 'Offline-First'
      },
      {
        id: 'Buku Pedoman Hasil (BPH) Mandor Digital',
        name: 'Buku Pedoman Hasil (BPH) Mandor Digital',
        category: 'Industry Specific',
        description: 'Input janjang panen, brondolan, denda buah mentah/tangkai panjang, dan rekap mandor per divisi.',
        isRecommended: true,
        badge: 'BPH Mandor'
      },
      {
        id: 'Jembatan Timbang PKS & Grading Buah',
        name: 'Jembatan Timbang PKS & Grading Buah',
        category: 'Industry Specific',
        description: 'Integrasi timbangan digital pabrik sawit (PKS), pencatatan SPB angkut, dan persentase grading.',
        isRecommended: true,
        badge: 'Pabrik PKS'
      },
      {
        id: 'Premi Pemanen & Upah Borongan Lapangan',
        name: 'Premi Pemanen & Upah Borongan Lapangan',
        category: 'Finance',
        description: 'Kalkulasi harian upah borongan pemanen sawit, premi lebih basis, dan denda kualitas panen.',
        isRecommended: true
      },
      {
        id: 'Pemetaan Blok Kebun GPS & GIS',
        name: 'Pemetaan Blok Kebun GPS & GIS',
        category: 'Industry Specific',
        description: 'Visualisasi peta blok afdeling, umur tanaman, jadwal pupuk, dan histori produktivitas per hektar.'
      },
      {
        id: 'AI Yield & Tonase Harvest Forecaster',
        name: 'AI Yield & Tonase Harvest Forecaster',
        category: 'AI',
        description: 'AI estimasi fluktuasi puncak panen buah sawit berdasarkan data curah hujan dan rotasi panen.',
        isAI: true,
        badge: 'Agro AI'
      }
    ]
  },
  {
    industryId: 'poultry_livestock',
    industryName: 'Peternakan Ayam & Unggas',
    industryAliases: ['poultry', 'ayam', 'peternakan', 'unggas', 'broiler', 'layer', 'closed house', 'kemitraan'],
    category: 'Agrikultur & Kehutanan',
    iconName: 'Egg',
    description: 'Monitoring kandang closed-house, FCR pakan, mortalitas harian, & kemitraan inti-plasma.',
    recommendedPresets: [
      'Pencatatan Mortalitas & Konsumsi Pakan Harian',
      'Kalkulator FCR (Feed Conversion Ratio) Otomatis',
      'Sensor IoT Suhu & Kelembaban Closed House',
      'Kemitraan Inti-Plasma & Rekonsiliasi Hasil',
      'Jadwal Vaksinasi & Sapronak Ayam',
      'Dashboard Eksekutif',
      'Inventory & Stock Management'
    ],
    features: [
      {
        id: 'Pencatatan Mortalitas & Konsumsi Pakan Harian',
        name: 'Pencatatan Mortalitas & Konsumsi Pakan Harian',
        category: 'Industry Specific',
        description: 'Log harian kematian ayam per flock/kandang, berat badan sampling, dan konsumsi sak pakan.',
        isRecommended: true,
        badge: 'Daily Recording'
      },
      {
        id: 'Kalkulator FCR (Feed Conversion Ratio) Otomatis',
        name: 'Kalkulator FCR (Feed Conversion Ratio) Otomatis',
        category: 'Industry Specific',
        description: 'Perhitungan real-time Indeks Performa (IP), FCR pakan terhadap bobot rata-rata harian.',
        isRecommended: true,
        badge: 'FCR Index'
      },
      {
        id: 'Sensor IoT Suhu & Kelembaban Closed House',
        name: 'Sensor IoT Suhu & Kelembaban Closed House',
        category: 'Industry Specific',
        description: 'Integrasi sensor realtime suhu kandang, kelembaban (RH), gas amonia, dan alarm blower mati.',
        isRecommended: true,
        badge: 'IoT Smart Kandang'
      },
      {
        id: 'Kemitraan Inti-Plasma & Rekonsiliasi Hasil',
        name: 'Kemitraan Inti-Plasma & Rekonsiliasi Hasil',
        category: 'Finance',
        description: 'Distribusi DOC, pakan & obat ke peternak plasma, serta perhitungan bagi hasil saat panen.',
        isRecommended: true
      },
      {
        id: 'Jadwal Vaksinasi & Sapronak Ayam',
        name: 'Jadwal Vaksinasi & Sapronak Ayam',
        category: 'Industry Specific',
        description: 'Kalender otomatis vaksinasi ayam umur 1-35 hari dan kartu riwayat obat/vitamin kandang.'
      },
      {
        id: 'AI Early Warning Penyakit & Mortalitas Unggas',
        name: 'AI Early Warning Penyakit & Mortalitas Unggas',
        category: 'AI',
        description: 'Deteksi dini lonjakan mortalitas tidak wajar untuk pencegahan wabah penyakit kandang.',
        isAI: true,
        badge: 'Poultry AI'
      }
    ]
  },
  {
    industryId: 'aquaculture_shrimp',
    industryName: 'Budidaya Tambak Udang & Perikanan',
    industryAliases: ['shrimp', 'aquaculture', 'tambak', 'udang', 'perikanan', 'vaname', 'ikan', 'hatchery'],
    category: 'Agrikultur & Kehutanan',
    iconName: 'Fish',
    description: 'Telemetri IoT kualitas air tambang udang vaname, kontrol anco pakan, ADG, & panen.',
    recommendedPresets: [
      'Log Kualitas Air (DO, pH, Salinitas, Suhu)',
      'Sensor IoT DO Telemetry Realtime & Alarm',
      'Pencatatan Pakan & Kontrol Anco Tambak',
      'Kalkulator ADG, Biomassa & Estimasi SR',
      'Manajemen Panen Parsial & Panen Total',
      'Dashboard Eksekutif',
      'Inventory & Stock Management'
    ],
    features: [
      {
        id: 'Log Kualitas Air (DO, pH, Salinitas, Suhu)',
        name: 'Log Kualitas Air (DO, pH, Salinitas, Suhu)',
        category: 'Industry Specific',
        description: 'Input parameter harian air pagi-malam, alkalinitas, nitrit, kecerahan air, dan plankton.',
        isRecommended: true,
        badge: 'Water Quality'
      },
      {
        id: 'Sensor IoT DO Telemetry Realtime & Alarm',
        name: 'Sensor IoT DO Telemetry Realtime & Alarm',
        category: 'Industry Specific',
        description: 'Pemantauan dissolved oxygen (DO) realtime dengan alarm sirine & WhatsApp jika oksigen drop di malam hari.',
        isRecommended: true,
        badge: 'IoT Kincir'
      },
      {
        id: 'Pencatatan Pakan & Kontrol Anco Tambak',
        name: 'Pencatatan Pakan & Kontrol Anco Tambak',
        category: 'Industry Specific',
        description: 'Jadwal pemberian pakan 4-5 kali sehari, persentase sisa anco, dan rekomendasi penyesuaian dosis.',
        isRecommended: true
      },
      {
        id: 'Kalkulator ADG, Biomassa & Estimasi SR',
        name: 'Kalkulator ADG, Biomassa & Estimasi SR',
        category: 'Industry Specific',
        description: 'Kalkulasi Average Daily Growth (ADG), estimasi Survival Rate (SR), dan estimasi total biomassa kolam.',
        isRecommended: true,
        badge: 'Growth Model'
      },
      {
        id: 'Manajemen Panen Parsial & Panen Total',
        name: 'Manajemen Panen Parsial & Panen Total',
        category: 'Finance',
        description: 'Pencatatan size udang panen, berat bersih keranjang, sampling defect, dan billing pembeli/cold storage.'
      },
      {
        id: 'AI Aquaculture Feeding Optimizer',
        name: 'AI Aquaculture Feeding Optimizer',
        category: 'AI',
        description: 'AI pengoptimal porsi pakan harian berdasarkan tren nafsu makan di anco dan kualitas air kolam.',
        isAI: true,
        badge: 'Aqua AI'
      }
    ]
  },
  {
    industryId: 'manufacturing',
    industryName: 'Manufaktur & Pabrikasi',
    industryAliases: ['manufacturing', 'manufaktur', 'pabrik', 'produksi', 'workshop', 'fabrication', 'industri'],
    category: 'Industri & Produksi',
    iconName: 'Factory',
    description: 'Work Order, Multi-Level Bill of Materials (BOM), MRP otomatis, QC, OEE, & mesin.',
    recommendedPresets: [
      'Work Order & Surat Perintah Kerja (SPK)',
      'Multi-Level Bill of Materials (BOM)',
      'Material Requirement Planning (MRP) Otomatis',
      'Quality Control (QC) & Scrap Tracking',
      'Preventive Maintenance Mesin & Sparepart',
      'Shop Floor Control & Job Sheet Digital',
      'Dashboard Eksekutif',
      'Inventory & Stock Management'
    ],
    features: [
      {
        id: 'Work Order & Surat Perintah Kerja (SPK)',
        name: 'Work Order & Surat Perintah Kerja (SPK)',
        category: 'Industry Specific',
        description: 'Penerbitan SPK produksi, alokasi mesin lini kerja, target output shift, dan status progress.',
        isRecommended: true,
        badge: 'Production SPK'
      },
      {
        id: 'Multi-Level Bill of Materials (BOM)',
        name: 'Multi-Level Bill of Materials (BOM)',
        category: 'Industry Specific',
        description: 'Struktur resep/formula komponen bertingkat, persentase waste bahan, dan kalkulasi HPP produk.',
        isRecommended: true,
        badge: 'BOM Engine'
      },
      {
        id: 'Material Requirement Planning (MRP) Otomatis',
        name: 'Material Requirement Planning (MRP) Otomatis',
        category: 'Industry Specific',
        description: 'Perhitungan otomatis kebutuhan bahan baku berdasarkan jadwal produksi dan stok saat ini.',
        isRecommended: true,
        badge: 'MRP'
      },
      {
        id: 'Shop Floor Control & Job Sheet Digital',
        name: 'Shop Floor Control & Job Sheet Digital',
        category: 'Operations',
        description: 'Pelacakan output per operator/stasiun kerja secara realtime dengan tablet scan barcode barcode part.',
        isRecommended: true
      },
      {
        id: 'Quality Control (QC) & Scrap Tracking',
        name: 'Quality Control (QC) & Scrap Tracking',
        category: 'Industry Specific',
        description: 'Inspeksi incoming material, in-process checking, outgoing QC, dan rekap barang cacat (reject/scrap).'
      },
      {
        id: 'Preventive Maintenance Mesin & Sparepart',
        name: 'Preventive Maintenance Mesin & Sparepart',
        category: 'Maintenance',
        description: 'Jadwal servis berkala mesin pabrik, riwayat perbaikan teknisi, dan manajemen stok sparepart kritis.'
      },
      {
        id: 'AI Preventive Maintenance & OEE Forecaster',
        name: 'AI Preventive Maintenance & OEE Forecaster',
        category: 'AI',
        description: 'Prediksi kegagalan komponen mesin sebelum terjadi downtime dan analisis Overall Equipment Effectiveness.',
        isAI: true,
        badge: 'Industry 4.0'
      }
    ]
  },
  {
    industryId: 'logistics_cargo',
    industryName: 'Logistik, Cargo & Ekspedisi',
    industryAliases: ['logistics', 'cargo', 'ekspedisi', 'freight', 'transport', 'shipping', 'pengiriman', 'kurir'],
    category: 'Transportasi & Logistik',
    iconName: 'Truck',
    description: 'Surat jalan digital, live GPS fleet, driver mobile e-POD, multi-hub, & tarif ongkir.',
    recommendedPresets: [
      'Surat Jalan Digital & Manifest Muatan',
      'Realtime GPS Fleet Tracking & Geofencing',
      'Driver Mobile App & e-POD (Proof of Delivery)',
      'Kalkulator Tarif Ongkir & Auto-Billing',
      'Kontrol BBM Solar & Uang Jalan Sopir',
      'Dashboard Eksekutif',
      'User Management & Roles (RBAC)'
    ],
    features: [
      {
        id: 'Surat Jalan Digital & Manifest Muatan',
        name: 'Surat Jalan Digital & Manifest Muatan',
        category: 'Industry Specific',
        description: 'Penerbitan surat jalan dengan QR code, pembuatan manifest container/truk, dan nomor resi digital.',
        isRecommended: true,
        badge: 'Digital POD'
      },
      {
        id: 'Realtime GPS Fleet Tracking & Geofencing',
        name: 'Realtime GPS Fleet Tracking & Geofencing',
        category: 'Industry Specific',
        description: 'Integrasi GPS armada truk, estimasi ETA tiba di tujuan, dan alert jika keluar jalur rute.',
        isRecommended: true,
        badge: 'GPS Fleet'
      },
      {
        id: 'Driver Mobile App & e-POD (Proof of Delivery)',
        name: 'Driver Mobile App & e-POD (Proof of Delivery)',
        category: 'Industry Specific',
        description: 'Aplikasi sopir untuk konfirmasi serah terima barang, foto bukti penerima, dan tanda tangan digital.',
        isRecommended: true,
        badge: 'Mobile App'
      },
      {
        id: 'Kontrol BBM Solar & Uang Jalan Sopir',
        name: 'Kontrol BBM Solar & Uang Jalan Sopir',
        category: 'Finance',
        description: 'Manajemen uang jalan, klaim tol/e-toll, konsumsi solar per kilometer, dan sisa kasbon sopir.',
        isRecommended: true
      },
      {
        id: 'Kalkulator Tarif Ongkir & Auto-Billing',
        name: 'Kalkulator Tarif Ongkir & Auto-Billing',
        category: 'Finance',
        description: 'Tarif otomatis berdasarkan berat/volume (kubikasi), zona tujuan, jenis armada, dan invoice otomatis.'
      },
      {
        id: 'AI Smart Route & Dispatch Optimizer',
        name: 'AI Smart Route & Dispatch Optimizer',
        category: 'AI',
        description: 'AI pengatur rute terhemat dan penugasan armada berdasarkan kapasitas muatan terdekat.',
        isAI: true,
        badge: 'Route AI'
      }
    ]
  },
  {
    industryId: 'fintech_banking',
    industryName: 'Fintech, BPR & Lembaga Keuangan',
    industryAliases: ['fintech', 'bpr', 'koperasi', 'finance', 'multifinance', 'pinjaman', 'keuangan', 'bank'],
    category: 'Keuangan & Finansial',
    iconName: 'CreditCard',
    description: 'Core lending pinjaman, e-KYC biometrik, skor kredit AI, kolektibilitas NPL, & OJK report.',
    recommendedPresets: [
      'Core Loan & Pinjaman Engine (Anuitas/Flat)',
      'Digital Onboarding & e-KYC Biometrik',
      'Kolektibilitas & Peringatan NPL Otomatis',
      'Payment Gateway (QRIS, VA, Bank Transfer)',
      'AI Real-Time Fraud & Credit Scoring',
      'Dashboard Eksekutif',
      'Finance & Accounting'
    ],
    features: [
      {
        id: 'Core Loan & Pinjaman Engine (Anuitas/Flat)',
        name: 'Core Loan & Pinjaman Engine (Anuitas/Flat)',
        category: 'Industry Specific',
        description: 'Simulasi jadwal angsuran, perhitungan bunga flat/efektif/anuitas, denda keterlambatan, dan pelunasan.',
        isRecommended: true,
        badge: 'Core Lending'
      },
      {
        id: 'Digital Onboarding & e-KYC Biometrik',
        name: 'Digital Onboarding & e-KYC Biometrik',
        category: 'Industry Specific',
        description: 'Verifikasi KTP OCR, liveness selfie face matching, dan pemeriksaan status Dukcapil.',
        isRecommended: true,
        badge: 'e-KYC'
      },
      {
        id: 'Kolektibilitas & Peringatan NPL Otomatis',
        name: 'Kolektibilitas & Peringatan NPL Otomatis',
        category: 'Industry Specific',
        description: 'Klasifikasi kolektibilitas debitur (Kol 1 - 5), pengingat jatuh tempo via WhatsApp, dan tugas field collector.',
        isRecommended: true,
        badge: 'NPL Control'
      },
      {
        id: 'Payment Gateway (QRIS, VA, Bank Transfer)',
        name: 'Payment Gateway (QRIS, VA, Bank Transfer)',
        category: 'Finance',
        description: 'Integrasi pembayaran angsuran melalui Virtual Account otomatis (BCA, Mandiri, BRI, BNI) dan QRIS.',
        isRecommended: true
      },
      {
        id: 'Mobile Collector App (Offline Sync)',
        name: 'Mobile Collector App (Offline Sync)',
        category: 'Operations',
        description: 'Aplikasi lapangan petugas tagih untuk terima pembayaran tunai debitur dengan cetak struk bluetooth portable.'
      },
      {
        id: 'AI Real-Time Fraud & Credit Scoring',
        name: 'AI Real-Time Fraud & Credit Scoring',
        category: 'AI',
        description: 'AI penilaian kelayakan kredit calon debitur dan deteksi dini indikasi pengajuan kredit fiktif.',
        isAI: true,
        badge: 'Risk AI'
      }
    ]
  },
  {
    industryId: 'retail_distribution',
    industryName: 'Retail, Minimarket & Distributor',
    industryAliases: ['retail', 'distributor', 'minimarket', 'toko', 'supermarket', 'grosir', 'pos kasir', 'dagang'],
    category: 'Perdagangan & Retail',
    iconName: 'ShoppingCart',
    description: 'Cloud POS kasir multi-cabang, barcode scan, promo diskon, transfer stok cabang, & PO.',
    recommendedPresets: [
      'Cloud POS Kasir Multi-Cabang & Barcode Scanner',
      'Multi-Store & Inter-Branch Stock Transfer',
      'Promo, Diskon Bertingkat & Member Loyalty Point',
      'Warehouse Bin Management & Stock Opname Mobile',
      'Pembayaran Terintegrasi QRIS & EDC',
      'Dashboard Eksekutif',
      'Inventory & Stock Management'
    ],
    features: [
      {
        id: 'Cloud POS Kasir Multi-Cabang & Barcode Scanner',
        name: 'Cloud POS Kasir Multi-Cabang & Barcode Scanner',
        category: 'Industry Specific',
        description: 'Aplikasi kasir cepat, support barcode scanner, printer thermal kasir, hold bill, dan laporan shift kasir.',
        isRecommended: true,
        badge: 'Cloud POS'
      },
      {
        id: 'Multi-Store & Inter-Branch Stock Transfer',
        name: 'Multi-Store & Inter-Branch Stock Transfer',
        category: 'Industry Specific',
        description: 'Permintaan mutasi antar cabang toko, approval kepala gudang, dan tracking pengiriman stok.',
        isRecommended: true,
        badge: 'Multi-Branch'
      },
      {
        id: 'Promo, Diskon Bertingkat & Member Loyalty Point',
        name: 'Promo, Diskon Bertingkat & Member Loyalty Point',
        category: 'Sales',
        description: 'Skema promo Beli X Gratis Y, diskon member bertingkat, voucher kupon, dan cashback poin belanja.',
        isRecommended: true
      },
      {
        id: 'Warehouse Bin Management & Stock Opname Mobile',
        name: 'Warehouse Bin Management & Stock Opname Mobile',
        category: 'Operations',
        description: 'Penataan lokasi rak gudang (Bin), scan stock opname periodik menggunakan kamera HP tanpa tutup toko.',
        isRecommended: true
      },
      {
        id: 'Pembayaran Terintegrasi QRIS & EDC',
        name: 'Pembayaran Terintegrasi QRIS & EDC',
        category: 'Finance',
        description: 'Penerimaan pembayaran dinamis QRIS instan, kartu debit/kredit, transfer, dan e-wallet.'
      },
      {
        id: 'AI Auto-Reorder & Restock Predictor',
        name: 'AI Auto-Reorder & Restock Predictor',
        category: 'AI',
        description: 'AI rekomendasi otomatis jumlah pemesanan ulang barang ke supplier sebelum kehabisan stok terlaris.',
        isAI: true,
        badge: 'Restock AI'
      }
    ]
  },
  {
    industryId: 'hospitality_hotel',
    industryName: 'Hotel, Resort & Hospitality',
    industryAliases: ['hotel', 'resort', 'hospitality', 'penginapan', 'villa', 'hostel', 'apartemen'],
    category: 'Pariwisata & Layanan',
    iconName: 'Bed',
    description: 'Property Management System (PMS), integrasi OTA, status housekeeping, & resto billing.',
    recommendedPresets: [
      'Front Desk PMS & Kalender Reservasi Kamar',
      'Housekeeping Live Status & Room Inspection',
      'Channel Manager OTA Sync (Traveloka, Agoda, Booking)',
      'Folio & Dynamic Billing Tamu / Korporat',
      'F&B Point of Sale & Room Service Billing',
      'Dashboard Eksekutif',
      'Customer Management (CRM)'
    ],
    features: [
      {
        id: 'Front Desk PMS & Kalender Reservasi Kamar',
        name: 'Front Desk PMS & Kalender Reservasi Kamar',
        category: 'Industry Specific',
        description: 'Visual grid kalender kamar, proses check-in/check-out cepat, key card interface, dan early/late charge.',
        isRecommended: true,
        badge: 'Core PMS'
      },
      {
        id: 'Housekeeping Live Status & Room Inspection',
        name: 'Housekeeping Live Status & Room Inspection',
        category: 'Industry Specific',
        description: 'Status kamar realtime (Clean, Dirty, Inspected, Out of Order) via aplikasi mobile room boy/maid.',
        isRecommended: true,
        badge: 'Housekeeping'
      },
      {
        id: 'Channel Manager OTA Sync (Traveloka, Agoda, Booking)',
        name: 'Channel Manager OTA Sync (Traveloka, Agoda, Booking)',
        category: 'Integration',
        description: 'Sinkronisasi ketersediaan kamar dan harga otomatis ke berbagai Online Travel Agent untuk cegah overbooking.',
        isRecommended: true,
        badge: 'OTA Sync'
      },
      {
        id: 'Folio & Dynamic Billing Tamu / Korporat',
        name: 'Folio & Dynamic Billing Tamu / Korporat',
        category: 'Finance',
        description: 'Penyatuan tagihan sewa kamar, laundry, mini bar, restoran, dan corporate voucher invoice.',
        isRecommended: true
      },
      {
        id: 'F&B Point of Sale & Room Service Billing',
        name: 'F&B Point of Sale & Room Service Billing',
        category: 'Operations',
        description: 'Kasir restoran hotel & order room service langsung dibebankan ke nomor kamar tamu.'
      },
      {
        id: 'AI Dynamic Room Pricing & 24/7 Concierge Bot',
        name: 'AI Dynamic Room Pricing & 24/7 Concierge Bot',
        category: 'AI',
        description: 'AI pengatur harga kamar otomatis berdasarkan okupansi dan bot WhatsApp pelayan tamu 24 jam.',
        isAI: true,
        badge: 'Hospitality AI'
      }
    ]
  },
  {
    industryId: 'education_school',
    industryName: 'Sekolah, Kampus & Edukasi',
    industryAliases: ['school', 'education', 'sekolah', 'kampus', 'universitas', 'pesantren', 'bimbel', 'akademi'],
    category: 'Pendidikan & Sosial',
    iconName: 'GraduationCap',
    description: 'Portal akademik SIAKAD, tagihan SPP payment gateway, e-Rapor, absensi QR, & CBT online.',
    recommendedPresets: [
      'Portal Akademik Siswa, Mahasiswa & Dosen',
      'Tagihan SPP & Payment Gateway Otomatis',
      'e-Rapor & Kurikulum Merdeka Generator',
      'Absensi QR Code Siswa & Notifikasi Orang Tua',
      'Computer Based Test (CBT) Ujian Online',
      'Dashboard Eksekutif',
      'User Management & Roles (RBAC)'
    ],
    features: [
      {
        id: 'Portal Akademik Siswa, Mahasiswa & Dosen',
        name: 'Portal Akademik Siswa, Mahasiswa & Dosen',
        category: 'Industry Specific',
        description: 'Kartu Rencana Studi (KRS), jadwal pelajaran/kuliah, pengumpulan tugas, dan transkrip nilai online.',
        isRecommended: true,
        badge: 'SIAKAD'
      },
      {
        id: 'Tagihan SPP & Payment Gateway Otomatis',
        name: 'Tagihan SPP & Payment Gateway Otomatis',
        category: 'Finance',
        description: 'Penerbitan tagihan uang sekolah otomatis setiap awal bulan, bayar via Virtual Account / QRIS, dan kuitansi instan.',
        isRecommended: true,
        badge: 'SPP Billing'
      },
      {
        id: 'e-Rapor & Kurikulum Merdeka Generator',
        name: 'e-Rapor & Kurikulum Merdeka Generator',
        category: 'Industry Specific',
        description: 'Pengisian nilai capaian pembelajaran, deskripsi otomatis, cetak buku rapor PDF sesuai format Kemdikbud.',
        isRecommended: true
      },
      {
        id: 'Absensi QR Code Siswa & Notifikasi Orang Tua',
        name: 'Absensi QR Code Siswa & Notifikasi Orang Tua',
        category: 'Operations',
        description: 'Scan kartu siswa/QR saat tiba di gerbang dan kirim notifikasi WhatsApp realtime ke nomor wali murid.',
        isRecommended: true
      },
      {
        id: 'Computer Based Test (CBT) Ujian Online',
        name: 'Computer Based Test (CBT) Ujian Online',
        category: 'Industry Specific',
        description: 'Bank soal, pengacakan butir ujian, timer anti-curang (tab lock), dan koreksi nilai otomatis.'
      },
      {
        id: 'AI Learning Analytics & Student Support',
        name: 'AI Learning Analytics & Student Support',
        category: 'AI',
        description: 'AI penganalisis perkembangan belajar siswa dan rekomendasi materi pengayaan atau remedial khusus.',
        isAI: true,
        badge: 'Edu AI'
      }
    ]
  },
  {
    industryId: 'restaurant_fnb',
    industryName: 'Restoran, Kafe & F&B',
    industryAliases: ['restaurant', 'fnb', 'restoran', 'kafe', 'cafe', 'makanan', 'kuliner', 'catering', 'bakery'],
    category: 'Perdagangan & Retail',
    iconName: 'Utensils',
    description: 'POS kasir meja, Kitchen Display System (KDS), QR Order meja tanpa aplikasi, & resep HPP bahan.',
    recommendedPresets: [
      'POS Kasir Dine-in, Takeaway & Split Bill',
      'Kitchen Display System (KDS) & Bar Station',
      'Table QR Self-Ordering Menu (Tanpa Aplikasi)',
      'Resep Bahan Baku & Auto-Deduct Inventory',
      'Multi-Outlet Sales Sync & Cashier Shift',
      'Dashboard Eksekutif',
      'Inventory & Stock Management'
    ],
    features: [
      {
        id: 'POS Kasir Dine-in, Takeaway & Split Bill',
        name: 'POS Kasir Dine-in, Takeaway & Split Bill',
        category: 'Industry Specific',
        description: 'Kasir layar sentuh, denah meja, pemisahan tagihan (split bill), gabung meja, dan cetak struk checker.',
        isRecommended: true,
        badge: 'F&B POS'
      },
      {
        id: 'Kitchen Display System (KDS) & Bar Station',
        name: 'Kitchen Display System (KDS) & Bar Station',
        category: 'Industry Specific',
        description: 'Layar monitor pesanan di dapur koki dengan timer warna antrean dan tombol pesanan siap saji.',
        isRecommended: true,
        badge: 'Kitchen KDS'
      },
      {
        id: 'Table QR Self-Ordering Menu (Tanpa Aplikasi)',
        name: 'Table QR Self-Ordering Menu (Tanpa Aplikasi)',
        category: 'Sales',
        description: 'Pelanggan scan stiker QR di meja untuk lihat menu foto, pilih varian topping, dan langsung bayar QRIS.',
        isRecommended: true,
        badge: 'QR Order'
      },
      {
        id: 'Resep Bahan Baku & Auto-Deduct Inventory',
        name: 'Resep Bahan Baku & Auto-Deduct Inventory',
        category: 'Operations',
        description: 'Pemotongan stok bahan baku otomatis berdasarkan porsi penjualan menu (misal: 1 cangkir kopi = 18gr biji + 150ml susu).',
        isRecommended: true
      },
      {
        id: 'Multi-Outlet Sales Sync & Cashier Shift',
        name: 'Multi-Outlet Sales Sync & Cashier Shift',
        category: 'Finance',
        description: 'Rekonsiliasi uang kas laci kasir saat pergantian shift dan konsolidasi omzet seluruh cabang.',
        isRecommended: true
      },
      {
        id: 'AI Recipe Costing & Food Waste Minimizer',
        name: 'AI Recipe Costing & Food Waste Minimizer',
        category: 'AI',
        description: 'AI kalkulator margin HPP resep makanan dan prediksi jumlah porsi harian agar tidak membuang bahan sisa.',
        isAI: true,
        badge: 'Chef AI'
      }
    ]
  },
  {
    industryId: 'real_estate_property',
    industryName: 'Properti & Real Estate',
    industryAliases: ['property', 'real estate', 'properti', 'perumahan', 'townhouse', 'developer', 'kontraktor', 'kavling'],
    category: 'Properti & Konstruksi',
    iconName: 'Building',
    description: 'Master unit kavling interaktif, Booking SPR, KPR tracking, IPL warga, & komisi broker.',
    recommendedPresets: [
      'Master Unit Kavling & Site Plan Interaktif',
      'Booking Fee & Surat Pesanan Rumah (SPR) Digital',
      'Tracking Cicilan DP, Akad KPR & Legalitas',
      'Billing Iuran Pengelolaan Lingkungan (IPL) Warga',
      'Komisi Broker & Marketing Performance',
      'Dashboard Eksekutif',
      'Customer Management (CRM)'
    ],
    features: [
      {
        id: 'Master Unit Kavling & Site Plan Interaktif',
        name: 'Master Unit Kavling & Site Plan Interaktif',
        category: 'Industry Specific',
        description: 'Peta denah perumahan interaktif dengan status unit real-time (Available, Booked, Terjual, Serah Terima).',
        isRecommended: true,
        badge: 'Site Plan'
      },
      {
        id: 'Booking Fee & Surat Pesanan Rumah (SPR) Digital',
        name: 'Booking Fee & Surat Pesanan Rumah (SPR) Digital',
        category: 'Sales',
        description: 'Penerbitan form SPR digital, upload berkas KTP/NPWP pembeli, dan lock unit kavling otomatis.',
        isRecommended: true,
        badge: 'SPR Digital'
      },
      {
        id: 'Tracking Cicilan DP, Akad KPR & Legalitas',
        name: 'Tracking Cicilan DP, Akad KPR & Legalitas',
        category: 'Finance',
        description: 'Jadwal cicilan uang muka (DP), status approval bank KPR, proses AJB/SHM, dan serah terima kunci (BAST).',
        isRecommended: true
      },
      {
        id: 'Billing Iuran Pengelolaan Lingkungan (IPL) Warga',
        name: 'Billing Iuran Pengelolaan Lingkungan (IPL) Warga',
        category: 'Operations',
        description: 'Tagihan bulanan air, keamanan, sampah perumahan, bukti bayar digital, dan broadcast pengumuman warga.',
        isRecommended: true
      },
      {
        id: 'Progress Konstruksi Kontraktor & Opname Fisik',
        name: 'Progress Konstruksi Kontraktor & Opname Fisik',
        category: 'Operations',
        description: 'Log kurva S progres pembangunan unit rumah oleh kontraktor untuk pencairan termin proyek.'
      },
      {
        id: 'AI Property Lead Scorer & Smart Follow-up',
        name: 'AI Property Lead Scorer & Smart Follow-up',
        category: 'AI',
        description: 'AI pengklasifikasi prospek pembeli rumah paling potensial dan asisten chat penawaran unit.',
        isAI: true,
        badge: 'Lead AI'
      }
    ]
  },
  {
    industryId: 'enterprise_holding',
    industryName: 'Enterprise & Holding Company',
    industryAliases: ['enterprise', 'holding', 'corporate', 'group', 'konglomerasi', 'multi-company', 'other'],
    category: 'Korporat & Jasa Profesional',
    iconName: 'ShieldCheck',
    description: 'Konsolidasi multi-perusahaan, audit compliance ISO, workflow approval hierarki, & AI Copilot.',
    recommendedPresets: [
      'Executive Multi-Company KPI Dashboard',
      'Multi-Tenant & Multi-Entity Consolidation',
      'Multi-Level Approval Hierarchy & Delegation',
      'AI Business Assistant (Copilot)',
      'Dynamic Reporting & Export Center',
      'User Management & Roles (RBAC)',
      'Finance & Accounting'
    ],
    features: [
      {
        id: 'Executive Multi-Company KPI Dashboard',
        name: 'Executive Multi-Company KPI Dashboard',
        category: 'Analytics',
        description: 'Konsolidasi laporan keuangan dan KPI kinerja dari seluruh anak perusahaan dalam satu pintu.',
        isRecommended: true,
        badge: 'Holding Portal'
      },
      {
        id: 'Multi-Tenant & Multi-Entity Consolidation',
        name: 'Multi-Tenant & Multi-Entity Consolidation',
        category: 'Industry Specific',
        description: 'Isolasi database anak perusahaan dengan kemampuan inter-company billing dan konsolidasi saldo.',
        isRecommended: true,
        badge: 'Multi-Entity'
      },
      {
        id: 'Multi-Level Approval Hierarchy & Delegation',
        name: 'Multi-Level Approval Hierarchy & Delegation',
        category: 'Automation',
        description: 'Matriks otorisasi transaksi sesuai batas plafon direksi, delegasi wewenang saat cuti, & log jejak audit.',
        isRecommended: true
      },
      {
        id: 'Audit Log, Security Compliance & ISO 27001',
        name: 'Audit Log, Security Compliance & ISO 27001',
        category: 'Security',
        description: 'Pencatatan riwayat setiap aksi user, enkripsi database, dan laporan kepatuhan keamanan data korporasi.'
      },
      {
        id: 'AI Corporate Intelligence & Executive Summary',
        name: 'AI Corporate Intelligence & Executive Summary',
        category: 'AI',
        description: 'AI penganalisis performa bisnis grup perusahaan dan generator ringkasan rapat dewan direksi otomatis.',
        isAI: true,
        badge: 'Enterprise AI'
      }
    ]
  }
];

export class IndustryFeatureService {
  /**
   * Find matching feature group for an industry name or ID
   */
  public static getFeatureGroupForIndustry(industryNameOrId?: string): IndustryFeatureGroup {
    if (!industryNameOrId) {
      return INDUSTRY_SPECIFIC_FEATURE_GROUPS[0];
    }
    const clean = industryNameOrId.toLowerCase().trim();

    // 1. Direct ID match
    const byId = INDUSTRY_SPECIFIC_FEATURE_GROUPS.find((g) => g.industryId.toLowerCase() === clean);
    if (byId) return byId;

    // 2. Alias match
    const byAlias = INDUSTRY_SPECIFIC_FEATURE_GROUPS.find((g) =>
      g.industryAliases.some((alias) => clean.includes(alias) || alias.includes(clean))
    );
    if (byAlias) return byAlias;

    // 3. Name partial match
    const byName = INDUSTRY_SPECIFIC_FEATURE_GROUPS.find((g) =>
      g.industryName.toLowerCase().includes(clean) || clean.includes(g.industryName.toLowerCase())
    );
    if (byName) return byName;

    return INDUSTRY_SPECIFIC_FEATURE_GROUPS[0];
  }

  /**
   * Return all unique available features combined for the given industry
   */
  public static getCombinedFeaturesForIndustry(industryNameOrId?: string): {
    industryGroup: IndustryFeatureGroup;
    industryFeatures: IndustryFeatureItem[];
    generalFeatures: IndustryFeatureItem[];
    aiFeatures: IndustryFeatureItem[];
    allFeatures: IndustryFeatureItem[];
  } {
    const group = this.getFeatureGroupForIndustry(industryNameOrId);
    
    // De-duplicate features by ID
    const seenIds = new Set<string>();
    const allFeatures: IndustryFeatureItem[] = [];

    const addUnique = (list: IndustryFeatureItem[]) => {
      for (const item of list) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          allFeatures.push(item);
        }
      }
    };

    addUnique(group.features);
    addUnique(GENERAL_CORE_FEATURES);
    addUnique(AI_INNOVATION_FEATURES);

    return {
      industryGroup: group,
      industryFeatures: group.features,
      generalFeatures: GENERAL_CORE_FEATURES,
      aiFeatures: AI_INNOVATION_FEATURES,
      allFeatures
    };
  }

  /**
   * Return list of all available industry definitions for selector UI
   */
  public static getAllIndustryOptions(): Array<{ id: string; name: string; category: string; iconName: string }> {
    return INDUSTRY_SPECIFIC_FEATURE_GROUPS.map((g) => ({
      id: g.industryId,
      name: g.industryName,
      category: g.category,
      iconName: g.iconName
    }));
  }
}
