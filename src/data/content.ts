import { ServiceItem, IndustrySolution, PortfolioItem, TechItem, ProcessStep, FAQItem } from '../types';

export const MAIN_SERVICES: ServiceItem[] = [
  {
    id: 'ai-app-dev',
    title: 'AI Application Development',
    shortDesc: 'Pengembangan aplikasi web custom terintegrasi AI Generatif, Natural Language Processing, dan model kecerdasan buatan spesifik bisnis.',
    fullDesc: 'Kami merancang dan membangun aplikasi web berkinerja tinggi yang ditenagai oleh kecerdasan buatan. Mulai dari pemrosesan dokumen otomatis, rekomendasi cerdas, pencarian berbasis AI (RAG), hingga analisis kecenderungan data.',
    iconName: 'Cpu',
    badge: 'Flagship Service',
    features: [
      'Integrasi Google Gemini & LLM Enterprise',
      'Custom Retrieval-Augmented Generation (RAG)',
      'OCR & Parsing Dokumen Cerdas',
      'Computer Vision & Deteksi Objek/Anomali',
      'Pemrosesan Bahasa Alami Bahasa Indonesia'
    ],
    recommendedFor: ['Startup', 'Perusahaan Swasta', 'Institusi Keuangan', 'e-Commerce', 'Manufaktur']
  },
  {
    id: 'custom-business-app',
    title: 'Business Management System',
    shortDesc: 'Sistem informasi operasional custom (ERP/CRM/HRIS) yang dirancang 100% mengikuti alur kerja dan aturan bisnis unik perusahaan Anda.',
    fullDesc: 'Tidak ada lagi pemaksaan alur bisnis sesuai software jadi. Kami membangun sistem manajemen bisnis yang dibuat khusus dari nol, fleksibel, terenkripsi, dan siap dikembangkan sesuai skala pertumbuhan bisnis Anda.',
    iconName: 'Building2',
    features: [
      'Alur Kerja Custom Tanpa Lisensi Per-User Mahal',
      'Multi-Role Access Control & Audit Log Kompleks',
      'Otomatisasi Approval & Notifikasi WhatsApp/Email',
      'Modul Keuangan, Stok, SDM & Operasional',
      'Arsitektur Scalable & Siap Cloud'
    ],
    recommendedFor: ['Distributor', 'Kontraktor', 'Manufaktur', 'Perusahaan Jasa', 'Rumah Sakit']
  },
  {
    id: 'ai-automation',
    title: 'AI Business Automation',
    shortDesc: 'Otomatisasi proses bisnis berulang, pengolahan data otomatis, dan pembuatan laporan cerdas tanpa keterlibatan manual yang melelahkan.',
    fullDesc: 'Eliminasi bottleneck operasional dengan otomatisasi alur kerja tingkat lanjut. Sistem dapat membaca invoice, mencocokkan transaksi, mengirim reminder pembayaran, dan memicu aksi bisnis secara otomatis 24/7.',
    iconName: 'Zap',
    badge: 'Popular',
    features: [
      'Automated Data Extraction & Entry',
      'Webhook & Event-Driven Workflow Automation',
      'Automated Notification System (WhatsApp API)',
      'Pengolahan Invoice & Purchase Order Otomatis',
      'Error Recovery & Real-time Logging'
    ],
    recommendedFor: ['Logistik', 'Retail', 'e-Commerce', 'Distributor', 'Tambak & Perkebunan']
  },
  {
    id: 'business-dashboard',
    title: 'Dashboard & Business Intelligence',
    shortDesc: 'Visualisasi data real-time, executive dashboard, dan ringkasan eksekutif berbasis AI untuk mengambil keputusan bisnis yang presisi.',
    fullDesc: 'Ubah data mentah dari berbagai cabang dan departemen menjadi grafik interaktif yang mudah dipahami. Dilengkapi dengan ringkasan AI harian dan alert otomatis jika terjadi anomali kinerja.',
    iconName: 'BarChart3',
    features: [
      'Real-time Metric Tracking & KPI Dashboards',
      'Multi-source Data Aggregation (SQL, Excel, API)',
      'AI Executive Summary & Trend Anomaly Detection',
      'Interactive Charting & Multi-Filter Analytics',
      'Role-based Custom Dashboard Views'
    ],
    recommendedFor: ['Direksi', 'Manajer Operasional', 'Tim Keuangan', 'Pemilik Bisnis UMKM / Enterprise']
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant / AI Copilot',
    shortDesc: 'Asisten cerdas berbasis AI internal yang dilatih dengan SOP, database produk, dan dokumen perusahaan untuk membantu karyawan & customer.',
    fullDesc: 'Hadirkan Copilot khusus perusahaan Anda sendiri. Karyawan dapat bertanya tentang SOP, mencari riwayat dokumen, membuat draf balasan customer, hingga menganalisis laporan dalam hitungan detik.',
    iconName: 'Bot',
    badge: 'High Impact',
    features: [
      'Internal Knowledge Base Chatbot (SOP & Manuals)',
      'Customer Support AI Copilot 24/7',
      'Context-Aware Smart Querying',
      'Penyaringan Data Sensitif & Hak Akses',
      'Integrasi Web, Mobile & Platform Internal'
    ],
    recommendedFor: ['Rumah Sakit', 'Sekolah', 'Layanan Pelanggan', 'Institusi', 'Enterprise']
  },
  {
    id: 'api-integration',
    title: 'API Integration & Cloud System',
    shortDesc: 'Menghubungkan aplikasi web dengan berbagai layanan pihak ketiga seperti Payment Gateway, WhatsApp API, E-Faktur, ERP, & Cloud.',
    fullDesc: 'Jembatani sistem yang terpisah dengan arsitektur integrasi API yang aman dan handal. Kami memastikan pertukaran data antar aplikasi berlangsung lancar tanpa jeda waktu.',
    iconName: 'Network',
    features: [
      'Payment Gateway Integration (Midtrans, Xendit, dll)',
      'WhatsApp Business API & Gateway Notifications',
      'Third-party ERP & Accounting System Connector',
      'Cloud Infrastructure Setup & Optimization',
      'High Security REST & GraphQL API Gateway'
    ],
    recommendedFor: ['Marketplace', 'Retail', 'Sekolah', 'Rumah Sakit', 'Aplikasi Mobile & Web']
  }
];

export const SERVICES_LIST = MAIN_SERVICES;

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'mining',
    title: 'Mining Management System',
    category: 'primary',
    iconName: 'Pickaxe',
    shortDesc: 'Sistem pengawasan operasional tambang, pengerjaan unit, pemantauan bahan bakar, dan mitigasi keselamatan kerja.',
    fullDesc: 'Solusi digital terpadu untuk industri pertambangan. Melacak tonase, pemakaian solar, ritase alat berat, pemeliharaan armada, dan pelaporan compliance K3 secara real-time dari lokasi tambang.',
    keyFeatures: ['Ritase & Fleet Tracker', 'Fuel Consumption Analytics', 'Equipment Breakdown Alert', 'K3 Incident Digital Report'],
    aiCapability: 'Prediksi Kerusakan Alat Heavy Machinery & Optimasi Konsumsi BBM',
    impactMetrics: 'Efisiensi Operasional hingga 35%'
  },
  {
    id: 'plantation',
    title: 'Plantation Management System',
    category: 'primary',
    iconName: 'Trees',
    shortDesc: 'Manajemen kebun kelapa sawit, karet, dan teh dari pemetaan blok, hasil panen TBS, hingga timbang barang.',
    fullDesc: 'Sistem informasi perkebunan terintegrasi GPS & mobile web offline-first untuk mencatat panen di lapangan, pengiriman ke PKS, absensi pekerja kebun, dan prediksi estimasi hasil panen.',
    keyFeatures: ['Pencatatan TBS & Timbang Masuk', 'GPS Block Mapping', 'BPH (Buku Pedoman Hasil) Digital', 'Sistem Gaji Borongan Kebun'],
    aiCapability: 'Model Prediksi Tonase Panen Berdasarkan Cuaca & Data Histori',
    impactMetrics: 'Pengurangan Losses Hasil Panen 20%'
  },
  {
    id: 'poultry',
    title: 'Peternakan Ayam & Poultry Management',
    category: 'agriculture',
    iconName: 'Egg',
    shortDesc: 'Monitoring kandang closed-house ayam broiler & layer, FCR (Feed Conversion Ratio), mortalitas, dan pakan.',
    fullDesc: 'Aplikasi pengelolaan peternakan ayam modern berbasis AI & IoT. Memantau iklim mikro kandang, kesehatan ternak, jadwal vaksinasi, histori pakan harian, serta analisis efisiensi FCR dan prediksi panen secara presisi.',
    keyFeatures: ['Kalkulator FCR Otomatis', 'Sensor IoT Suhu & Amonia Kandang', 'Tracking Mortalitas & Penyakit', 'Manajemen Stok Pakan & Sapronak', 'Laporan Kemitraan Inti-Plasma'],
    aiCapability: 'Deteksi Dini Anomali Mortalitas & Rekomendasi Porsi Pakan Ideal',
    impactMetrics: 'Peningkatan Efisiensi FCR hingga 15%'
  },
  {
    id: 'shrimp',
    title: 'Shrimp Farm Management',
    category: 'agriculture',
    iconName: 'Waves',
    shortDesc: 'Sistem manajemen tambak udang vaname: pemantauan kualitas air, pakan harian, sampling bobot, dan panen.',
    fullDesc: 'Digitalisasi tambak udang presisi. Melacak parameter pH, salinitas, DO (Dissolved Oxygen), jadwal Anco, estimasi Biomassa, dan laporan biaya produksi per petak tambak.',
    keyFeatures: ['Kualitas Air & Log Parametrik', 'Sampling Biomassa & ADG', 'Biaya Produksi Per Petak', 'Jadwal Pakan & Anco Log'],
    aiCapability: 'Prediksi Laju Tumbuh (ADG) & Alert Dini Penurunan Kualitas Air',
    impactMetrics: 'Mitigasi Gagal Panen hingga 40%'
  },
  {
    id: 'hospital',
    title: 'Hospital Management System (SIMRS)',
    category: 'healthcare',
    iconName: 'Activity',
    shortDesc: 'Sistem Informasi Manajemen Rumah Sakit (SIMRS) terintegrasi pendaftaran, EMR, farmasi, rawat inap, & BPJS.',
    fullDesc: 'Aplikasi layanan kesehatan berbasis web modern. Memudahkan pengelolaan rekam medis elektronik, antrean pasien online, ketersediaan bed rawat inap, stok obat farmasi, dan integrasi SATUSEHAT / BPJS VClaim.',
    keyFeatures: ['Rekam Medis Elektronik (RME)', 'Sistem Antrean Online Pasien', 'Manajemen Farmasi & Depo Obat', 'Integrasi SatuSehat & Billing BPJS'],
    aiCapability: 'AI Co-pilot Pencarian Rekam Medis & Sintesis Resume Medis Pasien',
    impactMetrics: 'Waktu Tunggu Pasien Berkurang 50%'
  },
  {
    id: 'clinic',
    title: 'Smart Clinic Management System',
    category: 'healthcare',
    iconName: 'Stethoscope',
    shortDesc: 'Software Klinik Pratama & Utama: Antrean Poli, Rekam Medis Elektronik (RME SATUSEHAT), Kasir & Resep.',
    fullDesc: 'Sistem manajemen klinik terpadu untuk klinik dokter umum, gigi, spesialis, dan poli terpadu. Dilengkapi sistem reservasi online, RME standar Kemenkes, modul kasir & tarif tindakan, serta manajemen stok obat klinik.',
    keyFeatures: ['RME Standar SATUSEHAT Kemenkes', 'Antrean Pasien TV & WhatsApp', 'Kasir & Tarif Tindakan Multi-Dokter', 'Manajemen Obat & E-Prescription', 'Laporan Kinerja & Bagi Hasil Dokter'],
    aiCapability: 'AI Assistant Diagnosis & Voice-to-Text Transkripsi Rekam Medis',
    impactMetrics: 'Efisiensi Administrasi Pasien +60%'
  },
  {
    id: 'pharmacy',
    title: 'Smart Pharmacy & Apotek System',
    category: 'healthcare',
    iconName: 'Pill',
    shortDesc: 'Sistem Apotek Modern: POS Kasir Obat, Resep Dokter, Stok FIFO/FEFO, Surat Pesanan (SP), & Batch Expiry.',
    fullDesc: 'Aplikasi kasir dan manajemen persediaan apotek lengkap. Mengontrol pergerakan obat berdasarkan tanggal kadaluarsa (FEFO), pencatatan resep dokter dan racikan, pembuatan Surat Pesanan resmi (Narkotika, Psikotropika, Prekursor), serta pengingat stok menipis.',
    keyFeatures: ['POS Kasir Resep & Non-Resep', 'Stok FEFO & Batch Expiry Alert', 'Surat Pesanan (SP) Narkotika & Prekursor', 'Smart Auto-Reorder Point Obat', 'Pengingat Minum Obat via WhatsApp'],
    aiCapability: 'AI Prediksi Kebutuhan Stok Obat & Deteksi Resep Dokter Otomatis (OCR)',
    impactMetrics: 'Reduksi Kerugian Obat Kadaluarsa 90%'
  },
  {
    id: 'aesthetic_clinic',
    title: 'Aesthetic & Beauty Clinic System',
    category: 'healthcare',
    iconName: 'Sparkles',
    shortDesc: 'Software Klinik Kecantikan & Estetika: Rekam Medis Kulit, Foto Before-After, Paket Treatment Multi-Sesi, E-Consent, & Kasir Skincare.',
    fullDesc: 'Platform digitalisasi komprehensif untuk klinik estetika, dermatologi, dan pusat perawatan kecantikan. Dilengkapi manajemen janji temu dokter & beautician, visual before-after progression, face mapping injeksi, paket perawatan multi-kunjungan, deposit saldo member, dan komisi tindakan otomatis.',
    keyFeatures: ['Rekam Medis Estetika & Skincare EMR', 'Foto Before-After & Face Mapping Grid', 'Paket Treatment Multi-Sesi & Deposit Member', 'Informed Consent Digital (E-Sign Tablet)', 'Kasir Skincare & Komisi Dokter/Beautician'],
    aiCapability: 'AI Skin Analysis, Face Comparison Alignment, & Smart Treatment Retouch Predictor',
    impactMetrics: 'Peningkatan Repeat Order & Kepuasan Klien hingga 45%'
  },
  {
    id: 'hotel',
    title: 'Hotel & Hospitality Management System (PMS)',
    category: 'commerce',
    iconName: 'Hotel',
    shortDesc: 'Property Management System (PMS) Hotel & Resort: Booking Engine, Front Office, Housekeeping, & Channel Manager.',
    fullDesc: 'Platform perhotelan terintegrasi cloud untuk hotel bintang, boutique hotel, dan resort. Mengelola pemesanan kamar dari website & OTA, check-in/out cepat, status kebersihan kamar (Housekeeping), layanan F&B room service, serta event banquet.',
    keyFeatures: ['Cloud PMS Front Desk & Check-in', 'Channel Manager OTA & Direct Booking', 'Housekeeping & Room Status Real-time', 'F&B Room Service & Banquet Event', 'Smart Digital Room Key & Guest Portal'],
    aiCapability: 'AI Dynamic Pricing Ruangan & 24/7 Multi-language WhatsApp Concierge',
    impactMetrics: 'Tingkat Okupansi & Pendapatan Kamar +24%'
  },
  {
    id: 'school',
    title: 'School Management System',
    category: 'operations',
    iconName: 'GraduationCap',
    shortDesc: 'Platform portal sekolah, nilai akademik, absensi facial/QR, pembayaran SPP, dan komunikasi orang tua.',
    fullDesc: 'Sistem akademik sekolah terpadu dari jenjang SD hingga Perguruan Tinggi. Dilengkapi dengan portal siswa, jadwal pelajaran, penilaian kurikulum merdeka, dan tagihan SPP terintegrasi payment gateway.',
    keyFeatures: ['Portal Orang Tua & Siswa', 'Absensi QR / GPS Mobile', 'E-Rapor & Ledger Nilai', 'Payment Gateway SPP Otomatis'],
    aiCapability: 'Analisis Perkembangan Akademik Siswa & Rekomendasi Pembelajaran',
    impactMetrics: 'Kecepatan Pelaporan Rapor 3x Lebih Cepat'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing System',
    category: 'operations',
    iconName: 'Factory',
    shortDesc: 'Perencanaan produksi (MRP), pencatatan Bill of Materials (BOM), QC, dan pelacakan barang jadi pabrik.',
    fullDesc: 'Digitalisasi lantai produksi pabrik. Mengontrol rantai bahan baku, penjadwalan mesin, inspeksi kualitas produk, efisiensi OEE (Overall Equipment Effectiveness), dan waste management.',
    keyFeatures: ['Bill of Materials (BOM) Multi-level', 'Work Order & Job Sheet Tracking', 'Inspeksi QC & Scrap Management', 'OEE Real-time Monitoring'],
    aiCapability: 'Prediksi Kebutuhan Bahan Baku & Optimasi Penjadwalan Mesin',
    impactMetrics: 'Reduksi Downtime Produksi 25%'
  },
  {
    id: 'retail',
    title: 'Retail Management System',
    category: 'commerce',
    iconName: 'ShoppingBag',
    shortDesc: 'Aplikasi kasir multi-cabang (POS), manajemen stok cabang, program loyalitas, dan integrasi omni-channel.',
    fullDesc: 'Solusi jaringan ritel modern. Sinkronisasi stok antar toko real-time, laporan penjualan harian otomatis, retur barang, promo diskon, dan manajemen member pelanggan.',
    keyFeatures: ['Cloud POS Multi-Store', 'Real-time Stock Transfer', 'Member Loyalty & Point Program', 'Dynamic Discount Engine'],
    aiCapability: 'Prediksi Produk Terlaris & Auto Re-order Point Stok Barcode',
    impactMetrics: 'Akurasi Stok Cabang mencapai 99.8%'
  },
  {
    id: 'warehouse',
    title: 'Warehouse Management System',
    category: 'operations',
    iconName: 'Warehouse',
    shortDesc: 'Manajemen gudang pintar: Inbound, Outbound, FIFO/LIFO batch tracking, Putaway, dan Opname stok digital.',
    fullDesc: 'Sistem pengawasan pergudangan presisi tingat tinggi. Pemindaian lokasi rak, cetak label barcode/QR, pelacakan tanggal kadaluarsa, serta sinkronisasi mutasi barang.',
    keyFeatures: ['Multi-Bin & Rack Location Mapping', 'Batch & Expiry Date Management', 'Opname Stok Mobile App', 'Pick & Pack Verification'],
    aiCapability: 'Optimasi Rute Picking Gudang & Analisis Fast-Moving Goods',
    impactMetrics: 'Kecepatan Processing Order +45%'
  },
  {
    id: 'distributor',
    title: 'Distributor Management System',
    category: 'commerce',
    iconName: 'Truck',
    shortDesc: 'Sistem canvassing salesman, penagihan piutang toko, batas kredit (credit limit), dan rute kunjungan.',
    fullDesc: 'Aplikasi bisnis distributor & grosir. Memudahkan tim sales lapangan mengambil order melalui HP, cek piutang toko di tempat, validasi lokasi toko, dan pelacakan armada pengiriman.',
    keyFeatures: ['Mobile Sales Order (Taking Order / Canvas)', 'Sistem Credit Limit & Jatuh Tempo', 'Map Route Plan Salesman', 'Faktur & Suraj Jalan Digital'],
    aiCapability: 'Smart Credit Scoring Toko & Rekomendasi Cross-Selling Produk',
    impactMetrics: 'Penagihan Piutang Tepat Waktu +30%'
  },
  {
    id: 'restaurant',
    title: 'Restaurant & F&B Management System',
    category: 'commerce',
    iconName: 'Utensils',
    shortDesc: 'Sistem Kasir Cafe & Restoran, Kitchen Display System (KDS), QR Order Meja, & Resep HPP Bahan Makanan.',
    fullDesc: 'Kelola operasional kuliner modern. Pesan langsung dari meja via QR Code, pesanan terkirim otomatis ke layar dapur, pemotongan stok bahan baku berdasarkan resep, dan laporan profit harian.',
    keyFeatures: ['Self-Service QR Order Meja', 'Kitchen Display System (KDS)', 'Resep & Pemotongan Otomatis Stok Bahan', 'Laporan Margin HPP & Food Waste', 'Integrasi Multi-Payment & Kasir Cloud'],
    aiCapability: 'Prediksi Estimasi Jam Sibuk & Forecasting Kebutuhan Bahan Segar',
    impactMetrics: 'Perputaran Meja Restoran +25%'
  },
  {
    id: 'enterprise',
    title: 'Custom Enterprise System',
    category: 'primary',
    iconName: 'ShieldCheck',
    shortDesc: 'Pengembangan software enterprise berskala besar, arsitektur microservices, high-security, & SLA support.',
    fullDesc: 'Dirancang khusus untuk institusi dan grup holding dengan kebutuhan integrasi data kompleks, kepatuhan keamanan cyber tinggi, kustomisasi penuh, dan layanan maintenance dedicated.',
    keyFeatures: ['Microservices Architecture', 'SSO & Enterprise Encryption', 'Dedicated Cloud Infrastructure', 'Full Source Code Ownership Option'],
    aiCapability: 'Custom Enterprise AI Agent Trained on Company Private Data',
    impactMetrics: 'Keamanan Data & Compliance 100%'
  }
];

export const AI_BENEFITS = [
  {
    title: 'Workflow Automation',
    desc: 'Mengurangi hingga 80% pekerjaan administratif berulang dengan proses yang berjalan otomatis secara mandiri.',
    iconName: 'Zap'
  },
  {
    title: 'Smart Analytics',
    desc: 'Mengubah ribuan data bisnis mentah menjadi wawasan visual yang actionable untuk jajaran pimpinan.',
    iconName: 'PieChart'
  },
  {
    title: 'Predictive Insights',
    desc: 'Mengantisipasi trend stok, potensi risiko operasional, dan estimasi penjualan berbasis histori data.',
    iconName: 'TrendingUp'
  },
  {
    title: 'Intelligent Recommendation',
    desc: 'Memberikan saran tindakan bisnis otomatis untuk mengoptimalkan efisiensi dan margin keuntungan.',
    iconName: 'Sparkles'
  },
  {
    title: 'AI Assistant Copilot',
    desc: 'Membantu staf menjawab pertanyaan operasional, menyusun dokumen, dan mengekstrak data dalam hitungan detik.',
    iconName: 'Bot'
  },
  {
    title: 'Smart Document Processing',
    desc: 'Membaca dan memproses ribuan PDF invoice, kwitansi, dan kontrak secara otomatis dengan OCR tingkat tinggi.',
    iconName: 'FileText'
  },
  {
    title: 'Real-time Decision Support',
    desc: 'Sistem peringatan dini (early warning system) saat indikator bisnis penting keluar dari batas aman.',
    iconName: 'ShieldAlert'
  },
  {
    title: 'Data Analysis & Mining',
    desc: 'Menemukan pola tersembunyi antar cabang, perilaku pelanggan, dan titik pemborosan biaya perusahaan.',
    iconName: 'Database'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Konsultasi & Discovery',
    subtitle: 'Memahami Visi & Permasalahan',
    description: 'Diskusi awal mendalam dengan tim spesialis SMART-AI.ID untuk mengidentifikasi tantangan bisnis, tujuan aplikasi, dan hasil yang diharapkan.',
    deliverables: ['Daftar Kebutuhan Bisnis', 'Ringkasan Alur Kerja Utama', 'Rekomendasi Pendekatan Teknologi'],
    duration: '1-2 Hari',
    iconName: 'MessageSquare'
  },
  {
    stepNumber: 2,
    title: 'Analisis Kebutuhan & Scope',
    subtitle: 'Perancangan Detail Modul',
    description: 'Penyusunan dokumen spesifikasi teknis (BRD/SRS), identifikasi kebutuhan data, model AI yang diperlukan, serta estimasi waktu dan biaya yang transparan.',
    deliverables: ['Dokumen Scope of Work (SOW)', 'Arsitektur Sistem & Database Scheme', 'Estimasi Timeline & Budget'],
    duration: '2-4 Hari',
    iconName: 'FileSearch'
  },
  {
    stepNumber: 3,
    title: 'Perancangan System & UI/UX',
    subtitle: 'Prototype & Arsitektur',
    description: 'Desain antarmuka aplikasi modern, responsif, dan mudah digunakan (UI/UX) beserta penyiapan fondasi arsitektur cloud dan pipeline API.',
    deliverables: ['Interactive Wireframe & Prototype', 'Design System & UI Components', 'API Contract Specification'],
    duration: '1 Minggu',
    iconName: 'Layout'
  },
  {
    stepNumber: 4,
    title: 'Development & AI Training',
    subtitle: 'Iterative Sprint Building',
    description: 'Proses pengodean aplikasi frontend & backend secara agile. Pengintegrasian model AI, pelatihan data internal, dan pembuatan modul bisnis.',
    deliverables: ['Source Code Module Iterations', 'Integrasi Model AI / Gemini API', 'Akses Staging Server Preview'],
    duration: '2-4 Minggu',
    iconName: 'Code'
  },
  {
    stepNumber: 5,
    title: 'Testing & Quality Assurance',
    subtitle: 'Validasi Keamanan & Performa',
    description: 'Pengujian menyeluruh mencakup tes performa, pengujian fungsionalitas, keamanan data, respon tampilan di berbagai perangkat, dan UAT bersama klien.',
    deliverables: ['Laporan QA Testing & Bug Fixing', 'Sesi User Acceptance Testing (UAT)', 'Manual Guide & Training Staf'],
    duration: '3-5 Hari',
    iconName: 'CheckCircle2'
  },
  {
    stepNumber: 6,
    title: 'Deployment & Support',
    subtitle: 'Go-Live & Pendampingan',
    description: 'Peluncuran resmi ke server cloud production (domain perusahaan Anda), konfigurasi keamanan SSL, serta dukungan pemeliharaan jangka panjang.',
    deliverables: ['Go-Live Production Deployment', 'Serah Terima Dokumentasi Sistem', 'Garansi & Maintenance Support'],
    duration: 'Berkelanjutan',
    iconName: 'Rocket'
  }
];

export const TECH_STACK: TechItem[] = [
  // Frontend
  { name: 'React 19', category: 'frontend', icon: 'Atom', description: 'Library UI modern berkinerja tinggi untuk antarmuka interaktif responsif.' },
  { name: 'Next.js', category: 'frontend', icon: 'Globe', description: 'Framework React enterprise dengan SSR, SEO optimization, dan arsitektur handal.' },
  { name: 'TypeScript', category: 'frontend', icon: 'FileCode', description: 'Pengodean terstruktur tipe data ketat untuk meminimalisir bug dalam skala besar.' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'Palette', description: 'Framework styling fleksibel untuk tampilan luxury technology modern.' },
  { name: 'Progressive Web App (PWA)', category: 'frontend', icon: 'Smartphone', description: 'Aplikasi web dapat diinstall di HP (Android/iOS) dengan fitur offline support.' },

  // Backend
  { name: 'Node.js Express', category: 'backend', icon: 'Server', description: 'Backend runtime sangat cepat untuk memproses ribuan request secara bersamaan.' },
  { name: 'Python FastAPI', category: 'backend', icon: 'Terminal', description: 'Bahasa utama pemrosesan data, machine learning, dan API AI berkecepatan tinggi.' },
  { name: 'REST & GraphQL API', category: 'backend', icon: 'Network', description: 'Standar komunikasi API yang terenkripsi dan mudah dihubungkan ke sistem manapun.' },

  // Database
  { name: 'PostgreSQL', category: 'database', icon: 'Database', description: 'Database relasional enterprise berstandar industri dengan keandalan data tinggi.' },
  { name: 'MySQL / MariaDB', category: 'database', icon: 'HardDrive', description: 'Penyimpanan data efisien yang populer dan kompatibel dengan berbagai infrastruktur.' },
  { name: 'Supabase', category: 'database', icon: 'Zap', description: 'Platform Backend-as-a-Service berbasis Postgres dengan Realtime Subscription.' },
  { name: 'Firebase', category: 'database', icon: 'Flame', description: 'Penyimpanan Firestore real-time & Authentication terintegrasi cepat.' },

  // AI
  { name: 'Google Gemini 2.5', category: 'ai', icon: 'Sparkles', description: 'Model AI multimodal tercanggih untuk analisis teks, gambar, dan penalaran cepat.' },
  { name: 'OpenAI GPT-4o', category: 'ai', icon: 'Bot', description: 'Model bahasa canggih untuk pemrosesan conversational & instruksi kompleks.' },
  { name: 'Generative AI & RAG', category: 'ai', icon: 'Cpu', description: 'Pencarian cerdas berbasis dokumen perusahaan dengan akurasi jawaban tepat.' },
  { name: 'AI Agents & Automation', category: 'ai', icon: 'Workflow', description: 'Agen cerdas yang dapat mengeksekusi instruksi bisnis bertahap secara otomatis.' },

  // Cloud
  { name: 'Google Cloud Platform (GCP)', category: 'cloud', icon: 'Cloud', description: 'Infrastruktur cloud enterprise dengan tingkat uptime dan keamanan terbaik.' },
  { name: 'Cloudflare', category: 'cloud', icon: 'Shield', description: 'Perlindungan DDOS, CDN Global, dan percepatan akses aplikasi dari mana saja.' },
  { name: 'AWS Cloud', category: 'cloud', icon: 'Server', description: 'Layanan cloud komprehensif untuk skala penyimpanan dan compute tak terbatas.' },
  { name: 'Vercel / Cloud Run', category: 'cloud', icon: 'Play', description: 'Platform hosting modern dengan deployment otomatis dan respons latensi rendah.' }
];

export const PORTFOLIO_CONCEPTS: PortfolioItem[] = [
  {
    id: 'p-mining',
    title: 'Smart Mining Operational Platform',
    industry: 'Pertambangan Batubara & Mineral',
    badge: 'Concept / Custom Solution',
    description: 'Sistem pengawasan tambang terpadu untuk monitoring ritase alat berat, konsumsi solar harian, pemetaan GPS lokasi tambang, dan keselamatan kerja (K3).',
    fullDetails: 'Platform ini merangkum seluruh aktivitas dari Pit hingga Port. Pengemudi dapat mengisi ritase via PWA offline, sementara manajemen memantau tonase harian dan efisiensi BBM di dashboard eksekutif.',
    tags: ['Pertambangan', 'Fleet Management', 'AI BBM Forecasting', 'Offline PWA'],
    metrics: [
      { label: 'Efisiensi BBM', value: '+22%' },
      { label: 'Akurasi Ritase', value: '99.5%' }
    ],
    aiFeature: 'Prediksi Kerusakan Komponen Engine & Deteksi Anomali Solar',
    imageBg: 'from-amber-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'p-plantation',
    title: 'Smart Plantation & PKS Command Center',
    industry: 'Perkebunan Kelapa Sawit & PKS',
    badge: 'Concept / Custom Solution',
    description: 'Digitalisasi rantai pasok kelapa sawit: dari pencatatan panen TBS di afdeling, pengiriman truk, timbang masuk PKS, hingga perhitungan rendemen minyak.',
    fullDetails: 'Menghilangkan kebocoran hasil panen dengan pencatatan digital berkoordinat GPS. Dilengkapi dengan kalkulasi otomatis gaji borongan pemanen dan notifikasi tonase kritis.',
    tags: ['Perkebunan', 'Supply Chain', 'GPS Tracking', 'Sawit & PKS'],
    metrics: [
      { label: 'Pencegahan Losses', value: '18%' },
      { label: 'Kecepatan Timbang', value: '2x Cepat' }
    ],
    aiFeature: 'Prediksi Estimasi Tonase Panen Mingguan Berdasarkan Histori Curah Hujan',
    imageBg: 'from-emerald-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'p-hospital',
    title: 'Smart Hospital & RME Copilot',
    industry: 'Rumah Sakit & Jaringan Klinik',
    badge: 'Concept / Custom Solution',
    description: 'Sistem Informasi Manajemen Rumah Sakit (SIMRS) dengan Rekam Medis Elektronik (RME) terintegrasi AI Copilot untuk resume medis & pendaftaran online.',
    fullDetails: 'Memenuhi standar regulasi SatuSehat Kemenkes dengan antarmuka yang sangat responsif. Dokter dapat membaca riwayat penyakit pasien dalam hitungan detik ditenagai pencarian AI.',
    tags: ['Rumah Sakit', 'Rekam Medis Elektronik', 'SatuSehat BPJS', 'AI Copilot'],
    metrics: [
      { label: 'Waktu Tunggu', value: '-45%' },
      { label: 'Akurasi Data', value: '100%' }
    ],
    aiFeature: 'AI Co-pilot Sintesis Diagnosa & Pencarian Cepat Rekam Medis Pasien',
    imageBg: 'from-cyan-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'p-school',
    title: 'Smart School & Academic Portal',
    industry: 'Sekolah & Institusi Pendidikan',
    badge: 'Concept / Custom Solution',
    description: 'Portal manajemen sekolah terpadu: absensi GPS/Facial, e-Rapor Kurikulum Merdeka, tagihan SPP otomatis via WA Gateway, dan LMS interaktif.',
    fullDetails: 'Menghubungkan sekolah, guru, siswa, dan orang tua dalam satu platform. Orang tua menerima notifikasi kehadiran siswa dan tagihan pembayaran secara langsung.',
    tags: ['Pendidikan', 'E-Rapor', 'WhatsApp Gateway', 'Payment SPP'],
    metrics: [
      { label: 'Ketepatan Bayar SPP', value: '+35%' },
      { label: 'Efisiensi Guru', value: '15 Jam/Bulan' }
    ],
    aiFeature: 'Analisis Evaluasi Belajar Siswa & Rekomendasi Modul Pembelajaran',
    imageBg: 'from-indigo-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'p-farm',
    title: 'Smart Agriculture & Farm Monitor',
    industry: 'Tambak Udang & Peternakan Ayam',
    badge: 'Concept / Custom Solution',
    description: 'Sistem pengawasan kualitas air tambang udang vaname dan otomatisasi perhitungan FCR peternakan ayam broiler dengan analisis biomassa.',
    fullDetails: 'Membantu peternak dan pengelola tambak mengontrol biaya pakan yang menyerap 70% operasional. Parameter air dan bobot harian terpantau real-time dari HP.',
    tags: ['Tambak Udang', 'Peternakan Ayam', 'Kalkulator FCR', 'IoT Ready'],
    metrics: [
      { label: 'Efisiensi Pakan', value: '+14%' },
      { label: 'Risiko Gagal Panen', value: '-60%' }
    ],
    aiFeature: 'Smart Early Warning Alarm Penurunan Kualitas Air & Penyesuaian Pakan',
    imageBg: 'from-blue-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'p-manufacturing',
    title: 'Smart Manufacturing ERP & MRP',
    industry: 'Manufaktur & Pabrik',
    badge: 'Concept / Custom Solution',
    description: 'Sistem kontrol lantai produksi pabrik: perencanaan bahan baku (MRP), jadwal mesin, pencatatan BOM, inspeksi QC, dan efisiensi OEE.',
    fullDetails: 'Memberikan transparansi penuh terhadap alur produksi barang dari bahan mentah hingga barang jadi di gudang. Mengurangi pemborosan scrap dan keterlambatan pengiriman.',
    tags: ['Pabrik', 'MRP', 'Overall Equipment Efficiency', 'BOM Multi-level'],
    metrics: [
      { label: 'Lead Time Produksi', value: '-28%' },
      { label: 'OEE Rating', value: '88%' }
    ],
    aiFeature: 'Forecasting Kebutuhan Bahan Baku & Optimasi Penjadwalan Shift Mesin',
    imageBg: 'from-violet-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'p-retail',
    title: 'Smart Retail & Omni-Channel POS',
    industry: 'Ritel Multi-Cabang & Distributor',
    badge: 'Concept / Custom Solution',
    description: 'Aplikasi kasir cloud, manajemen transfer stok antar toko, penagihan salesman lapangan, dan program keanggotaan loyalitas pelanggan.',
    fullDetails: 'Menghubungkan toko fisik dan gudang pusat. Pemilik dapat melihat omset harian seluruh cabang dari satu layar, lengkap dengan peringatan stok menipis.',
    tags: ['Retail', 'Cloud POS', 'Salesman Mobile App', 'Multi-Store'],
    metrics: [
      { label: 'Akurasi Stok', value: '99.9%' },
      { label: 'Omset Tracking', value: 'Real-time' }
    ],
    aiFeature: 'Rekomendasi Auto-Reorder Point Stok & Prediksi Trend Penjualan Produk',
    imageBg: 'from-fuchsia-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'p-dashboard',
    title: 'AI Business Intelligence Dashboard',
    industry: 'Holding Company & Executive Management',
    badge: 'Concept / Custom Solution',
    description: 'Dashboard eksekutif terpusat yang menggabungkan data keuangan, operasional, SDM, dan penjualan dengan narasi ringkasan AI harian.',
    fullDetails: 'Tidak perlu lagi menunggu staf membuat slide presentasi bulanan. AI secara otomatis menyusun narasi ringkasan bisnis, menyoroti pencapaian target, dan menunjukkan area kritis.',
    tags: ['Executive Dashboard', 'AI Executive Summary', 'Cross-Platform Data', 'High Security'],
    metrics: [
      { label: 'Pembuatan Laporan', value: 'Instan' },
      { label: 'Pengambilan Keputusan', value: '3x Lebih Cepat' }
    ],
    aiFeature: 'Automated Executive Narrative Generation & Anomaly Detection',
    imageBg: 'from-sky-900/40 via-slate-900 to-slate-950'
  }
];

export const PORTFOLIO_LIST = PORTFOLIO_CONCEPTS;

export const WHY_CHOOSE_US = [
  {
    title: '100% Custom Development',
    desc: 'Bukan software pasaran atau template kaku. Kami membangun aplikasi yang disesuaikan tepat dengan struktur bisnis & alur kerja unik Anda.',
    iconName: 'Code2'
  },
  {
    title: 'Ditenagai AI Generatif',
    desc: 'Memanfaatkan teknologi kecerdasan buatan terdepan (Google Gemini & LLM) untuk otomatisasi cerdas, analisis presisi, dan daya saing tinggi.',
    iconName: 'Sparkles'
  },
  {
    title: 'Fokus Solusi Bisnis & ROI',
    desc: 'Kami tidak sekadar menulis kode, kami berfokus pada hasil nyata: efisiensi biaya operasional, peningkatan omset, dan penghematan waktu staf.',
    iconName: 'Target'
  },
  {
    title: 'Arsitektur Teknologi Modern',
    desc: 'Menggunakan teknologi stack enterprise (React, TypeScript, Node.js, Cloud Native) yang cepat, aman, responsif, dan bebas hambatan.',
    iconName: 'Layers'
  },
  {
    title: 'Scalable & Cloud Ready',
    desc: 'Sistem dirancang siap tumbuh. Dari puluhan pengguna hingga puluhan ribu pengguna tanpa perlu bongkar ulang fondasi aplikasi.',
    iconName: 'Server'
  },
  {
    title: 'Garansi & Maintenance Berkelanjutan',
    desc: 'Pendampingan penuh pasca peluncuran, mencakup perbaikan bug, pembaruan keamanan, garansi sistem, dan dukungan tim responsif.',
    iconName: 'ShieldCheck'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Apa itu SMART-AI.ID?',
    answer: 'SMART-AI.ID adalah perusahaan teknologi dan partner digital transformation yang bergerak di bidang pengembangan aplikasi web custom berbasis Artificial Intelligence (AI), custom business software, sistem informasi perusahaan, automation, dashboard analytics, dan integrasi API untuk berbagai sektor industri.'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Aplikasi apa saja yang bisa dibuat oleh SMART-AI.ID?',
    answer: 'Kami membuat berbagai jenis aplikasi web custom seperti AI Business Copilot, Enterprise Management System (ERP/MRP), SIMRS & EMR Rumah Sakit, Smart Mining System, Portal Akademik Sekolah, Warehouse & Logistics System, POS Multi-cabang, Custom CRM, hingga Dashboard Analitik Eksekutif.'
  },
  {
    id: 'faq-3',
    category: 'technical',
    question: 'Mengapa bisnis membutuhkan aplikasi berbasis AI?',
    answer: 'Aplikasi berbasis AI bukan hanya mencatat data, tetapi membantu bisnis mengotomatisasi pekerjaan berulang, mengekstrak informasi dari dokumen fisik/PDF, memprediksi kebutuhan stok dan penjualan, serta memberikan rekomendasi keputusan bisnis secara real-time sehingga meningkatkan efisiensi dan profitabilitas.'
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'Apakah SMART-AI.ID hanya menyediakan template website?',
    answer: 'Tidak. SMART-AI.ID bukan penyedia template generik. Seluruh aplikasi yang kami bangun adalah 100% Custom Software Development yang dirancang dari nol berdasarkan proses bisnis, kebutuhan operasional, dan aturan spesifik perusahaan Anda.'
  },
  {
    id: 'faq-5',
    category: 'general',
    question: 'Berapa lama proses pembuatan aplikasi di SMART-AI.ID?',
    answer: 'Waktu pengembangan bervariasi tergantung skala modul. Aplikasi bisnis kustom skala menengah umumnya membutuhkan waktu 3 hingga 5 minggu, sedangkan sistem enterprise kompleks membutuhkan waktu 6 hingga 10 minggu. Kami menerapkan metodologi agile sehingga modul dapat dicoba dan direview secara bertahap.'
  },
  {
    id: 'faq-6',
    category: 'pricing',
    question: 'Berapa estimasi biaya pembuatan aplikasi?',
    answer: 'Estimasi biaya dihitung secara transparan berdasarkan kompleksitas modul, jumlah pengguna, integrasi API, dan kapabilitas AI yang dibutuhkan. Anda dapat melakukan konsultasi gratis dan menggunakan fitur AI Requirement Analyzer di website kami untuk mendapatkan rancangan blueprint scope dan estimasi biaya awal.'
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'Bagaimana cara memulai konsultasi dengan SMART-AI.ID?',
    answer: 'Anda dapat memulai konsultasi secara gratis dengan menekan tombol "Mulai Konsultasi" atau WhatsApp di website ini, atau mengisi Form Pengajuan Kebutuhan Aplikasi. Tim konsultan teknis kami akan segera menghubungi Anda untuk menjadwalkan sesi diskusi kebutuhan.'
  },
  {
    id: 'faq-8',
    category: 'technical',
    question: 'Apakah aplikasi yang dibuat dapat diintegrasikan dengan sistem yang sudah ada?',
    answer: 'Ya. Aplikasi yang kami bangun dirancang berbasis API (API-First Architecture) sehingga dapat diintegrasikan secara aman dengan sistem existing Anda, seperti Payment Gateway, WhatsApp API, software akuntansi, sistem kasir/POS, maupun database internal.'
  },
  {
    id: 'faq-9',
    category: 'support',
    question: 'Apakah SMART-AI.ID memberikan dukungan setelah aplikasi selesai dibuat?',
    answer: 'Ya. Kami memberikan garansi bebas bug, sesi pelatihan penggunaan bagi tim internal Anda, penyerahan dokumentasi teknis, serta opsi layanan Maintenance & SLA Support jangka panjang untuk memastikan aplikasi tetap berjalan optimal dan selalu up-to-date.'
  },
  {
    id: 'faq-10',
    category: 'general',
    question: 'Industri apa saja yang dapat dilayani oleh SMART-AI.ID?',
    answer: 'Kami melayani berbagai sektor industri di Indonesia, antara lain Pertambangan (Batubara/Nikel), Perkebunan & PKS, Peternakan & Tambak, Rumah Sakit & Klinik, Sekolah & Perguruan Tinggi, Manufaktur & Pabrik, Ritel & E-Commerce, Restoran & Cafe, Logistik & Distributor, serta Enterprise Holdings.'
  }
];
