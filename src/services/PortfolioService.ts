import {
  PortfolioConfig,
  PortfolioAuditLog,
  PortfolioVersionSnapshot,
  PortfolioApprovalStatus,
  PortfolioVisibility
} from '../types';

const STORAGE_PORTFOLIOS = 'smartai_portfolios_v1';
const STORAGE_LOGS = 'smartai_portfolio_audit_logs_v1';
const STORAGE_VERSIONS = 'smartai_portfolio_versions_v1';

export const INITIAL_PORTFOLIOS: PortfolioConfig[] = [
  {
    id: 'port-mining',
    name: 'Smart Mining',
    slug: 'smart-mining',
    industry: 'Mining',
    category: 'Mining',
    description: 'Sistem AI terpadu untuk monitoring produksi tambang, optimasi armada haulage, dan pengawasan konsumsi bahan bakar.',
    fullDescription: 'Smart Mining Management Platform dirancang sebagai solusi konseptual arsitektur terintegrasi untuk mengoptimalkan operasional tambang skala besar. Platform ini menggabungkan telemetry IoT, pengawasan GPS armada, serta algoritma machine learning untuk memprediksi perawatan alat berat dan mencegah keborosan BBM.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-amber-600/30 via-orange-900/20 to-slate-950 border-amber-500/30',
    relatedIndustrySlug: 'mining',
    featured: true,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Data Operasional Terfragmentasi', description: 'Integrasi manual antar unit pit, hauling, dan refinery memicu keterlambatan laporan harian hingga 24 jam.', impact: 'Respon operasional lambat' },
      { id: 'p2', title: 'Inefisiensi Rute & Fuel Anomaly', description: 'Ketidakpastian idle time truk dan pencurian BBM solar tak terdeteksi dengan tepat.', impact: 'Kerugian BBM hingga 12% per bulan' },
      { id: 'p3', title: 'Downtime Alat Berat Tak Terduga', description: 'Kerusakan komponen dump truck tanpa prediksi dini menghentikan target stripping harian.', impact: 'Biaya maintenance darurat membengkak' }
    ],
    solution: {
      summary: 'Platform komando digital yang mengkonsolidasi telemetry alat berat, GPS armada, dan analytics AI ke dalam satu ruang kontrol.',
      digitalSolution: 'Mengintegrasikan data produksi pit, hauling ritase, stok BBM, serta indikator kesehatan mesin secara real-time melalui dashboard komando visual.',
      businessImpact: 'Memangkas waktu penyusunan laporan harian hingga 90%, mengoptimalkan penggunaan BBM, dan menurunkan risiko breakdown mendadak.'
    },
    modules: [
      { id: 'm1', name: 'Production Monitor', description: 'Tracking tonnage stripping OB & Ore harian', iconName: 'Activity', aiEnabled: true },
      { id: 'm2', name: 'Fleet Telemetry', description: 'Pemantauan lokasi GPS, idle time & ritase armada', iconName: 'Truck', aiEnabled: true },
      { id: 'm3', name: 'Fuel Management', description: 'Monitoring pengisian & audit konsumsi solar', iconName: 'Fuel', aiEnabled: true },
      { id: 'm4', name: 'Predictive Maintenance', description: 'Jadwal servis berkala & health check mesin', iconName: 'Wrench', aiEnabled: true },
      { id: 'm5', name: 'Pit Command Center', description: 'Pusat koordinasi tim lapangan & dispatch', iconName: 'Layers', aiEnabled: false }
    ],
    technology: [
      { name: 'React + Vite + TypeScript', category: 'Frontend', description: 'Single-page command center UI' },
      { name: 'Node.js Express + TS', category: 'Backend', description: 'High-throughput telemetry ingestion' },
      { name: 'PostgreSQL / Firestore', category: 'Database', description: 'Time-series spatial records' },
      { name: 'Gemini AI API SDK', category: 'AI', description: 'Anomaly detection & executive summary' },
      { name: 'IoT Telemetry Gateway', category: 'API', description: 'Integration available / Can be integrated' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Production Forecast AI', description: 'Prediksi pencapaian target ritase dan tonnage mingguan berdasarkan histori cuaca & kondisi armada.', status: 'CONCEPT', iconName: 'TrendingUp' },
      { id: 'af2', name: 'Fuel Anomaly Detector', description: 'Deteksi otomatis ketidaksesuaian rasio BBM terhadap jarak tempuh & jam kerja mesin.', status: 'PLANNED', iconName: 'AlertTriangle' },
      { id: 'af3', name: 'Predictive Downtime Assistant', description: 'Rekomendasi tindakan pencegahan kerusakan komponen hidrolik dan transmisi.', status: 'CONCEPT', iconName: 'Cpu' }
    ],
    workflow: [
      { step: 1, title: 'Data Input & Sensor Ingestion', description: 'Sensor GPS & telemetry alat berat mengirimkan logs kecepatan, suhu mesin, dan lokasi ritase.' },
      { step: 2, title: 'Operational Monitoring', description: 'Operator dispatcher memantau rotasi armada dan status pengisian BBM di Pit.' },
      { step: 3, title: 'Analytics & AI Evaluation', description: 'Sistem menganalisis efisiensi siklus hauling dan mendeteksi anomali konsumsi BBM.' },
      { step: 4, title: 'Decision & Action Support', description: 'Rekomendasi penyesuaian rute dan alokasi armada otomatis dikirim ke pengawas lapangan.' }
    ],
    benefits: [
      'Visibilitas Operasional Real-Time 24/7',
      'Penghematan Konsumsi BBM Solar',
      'Prediksi Perawatan Alat Berat Sebelum Breakdown',
      'Laporan Eksekutif Otomatis Berbasis AI'
    ],
    screenshots: [
      { id: 'sc1', title: 'Mining Command Center', description: 'Tampilan peta interaktif & ritase fleet harian', image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 },
      { id: 'sc2', title: 'Fuel Anomaly Dashboard', description: 'Grafik konsumsi solar vs jam kerja mesin', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', device: 'dashboard', sortOrder: 2 },
      { id: 'sc3', title: 'Fleet Mobile Dispatch UI', description: 'Antarmuka aplikasi tablet pengawas lapangan', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', device: 'mobile', sortOrder: 3 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Production (Ton)', value: '148,250', change: '+8.4%', trend: 'up' },
        { label: 'Active Fleet Count', value: '42 Units', change: '95% Active', trend: 'up' },
        { label: 'Avg Fuel Ratio (L/Ton)', value: '0.48 L', change: '-3.2%', trend: 'up' },
        { label: 'Safety Incidents', value: '0 Event', change: 'Zero Harm', trend: 'neutral' }
      ],
      charts: [
        { title: 'Tonnage Stripping Harian (Sample Data)', type: 'bar', data: [{ day: 'Sen', val: 22000 }, { day: 'Sel', val: 24500 }, { day: 'Rab', val: 21000 }, { day: 'Kam', val: 26000 }, { day: 'Jum', val: 25000 }, { day: 'Sab', val: 28000 }] }
      ],
      recentData: [
        { col1: 'DT-104 (Volvo FMX)', col2: 'Hauling Block B -> Pit 2', col3: '28.5 Ton', status: 'ON ROUTE' },
        { col1: 'EX-202 (CAT 390F)', col2: 'Digging Pit 1 Main Wall', col3: 'OEE 92%', status: 'OPERATIONAL' },
        { col1: 'FT-02 (Fuel Truck)', col2: 'Refueling Point Alpha', col3: 'Dispensed 1,200L', status: 'COMPLETED' }
      ],
      aiInsights: [
        'AI Note: Efisiensi ritase Block B meningkat 6% setelah pembersihan rute hauling utama.',
        'Alert: Armada DT-108 menunjukkan kecenderungan suhu transmisi lebih tinggi 4°C dari rata-rata.'
      ]
    }
  },
  {
    id: 'port-nickel',
    name: 'Smart Nickel',
    slug: 'smart-nickel',
    industry: 'Nickel Mining',
    category: 'Mining',
    description: 'Sistem manajemen tambang nikel pintar dengan grade tracking kadar Ni, stockpile management, dan ore dispatch.',
    fullDescription: 'Smart Nickel Platform dirancang khusus untuk memenuhi kompleksitas penambangan nikel laterit. Solusi konseptual ini mempermudah pencatatan kadar ore (Ni % & Fe %), optimasi blending di stockpile, serta pemantauan pengiriman tongkang ke smelter.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-emerald-600/30 via-teal-900/20 to-slate-950 border-emerald-500/30',
    relatedIndustrySlug: 'nickel-mining',
    featured: true,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Pencampuran Ore (Blending) Tidak Akurat', description: 'Ketidakpastian kadar nikel dari Pit saat penumpukan di Stockpile memicu klaim penolakan kualitas oleh smelter.', impact: 'Penalti harga & pemborosan ore' },
      { id: 'p2', title: 'Pelacakan Tongkang & Ore Tracking Manual', description: 'Pencatatan manual manifest barging sering berbeda antara tim tambang dan jetty.', impact: 'Perselisihan verifikasi tonase' }
    ],
    solution: {
      summary: 'Sistem Grade Control & Ore Dispatch digital yang memantau kadar nikel dari Pit hingga muatan Tongkang.',
      digitalSolution: 'Visualisasi peta blok tambang berdasarkan sampel lab, simulasi blending otomatis, serta tracking muatan jetty secara realtime.',
      businessImpact: 'Memaksimalkan margin Ore Saprolite & Limonite sesuai spesifikasi kontrak pembeli.'
    },
    modules: [
      { id: 'm1', name: 'Grade Control & Lab Assay', description: 'Pencatatan hasil sampel bor & kadar Ni/Fe/SiO2', iconName: 'CheckCircle', aiEnabled: true },
      { id: 'm2', name: 'Stockpile Blending Simulator', description: 'Perhitungan komposisi campuran ore ideal', iconName: 'Layers', aiEnabled: true },
      { id: 'm3', name: 'Ore Dispatch & Jetty Logistics', description: 'Pengawasan pengiriman truk ke jetty & barging', iconName: 'Truck', aiEnabled: false },
      { id: 'm4', name: 'Mine Pit Surveyor', description: 'Mapping elevasi pit & kemajuan penambangan', iconName: 'Compass', aiEnabled: false }
    ],
    technology: [
      { name: 'React + Vite', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Ore Grade Predictor AI', description: 'Estimasi kadar nikel berdasarkan sampel spasial geologi pit.', status: 'CONCEPT', iconName: 'Cpu' },
      { id: 'af2', name: 'Smart Blending Recommender', description: 'Rekomendasi rasio pencampuran limonite & saprolite untuk target Ni 1.8%.', status: 'PLANNED', iconName: 'Sparkles' }
    ],
    workflow: [
      { step: 1, title: 'Sample Assay Logging', description: 'Tim lab mengunggah data kadar hasil assay sampel bor Pit.' },
      { step: 2, title: 'Stockpile Classification', description: 'Ore ditumpuk berdasarkan klasifikasi kadar High/Medium/Low Grade.' },
      { step: 3, title: 'Barging Dispatch', description: 'Truk mengangkut ore terverifikasi menuju Jetty pelabuhan.' }
    ],
    benefits: [
      'Presisi Blending Ore Sesuai Spesifikasi Smelter',
      'Pengurangan Penalti Kadar Ni pada Kontrak',
      'Transparansi Stockpile Realtime'
    ],
    screenshots: [
      { id: 'sc1', title: 'Grade Control Dashboard', description: 'Sebaran kadar nikel di Pit A & Stockpile 2', image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Saprolite Inventory', value: '45,200 Ton', change: 'Ni Avg 1.78%', trend: 'up' },
        { label: 'Limonite Inventory', value: '82,100 Ton', change: 'Fe Avg 48%', trend: 'neutral' },
        { label: 'Barging Volume (MoTD)', value: '120,000 Ton', change: '4 Barges Loaded', trend: 'up' }
      ],
      aiInsights: [
        'AI Note: Rekomendasi tambahan 15% Ore Block C ke Stockpile 3 untuk mempertahankan Ni 1.80%.'
      ]
    }
  },
  {
    id: 'port-plantation',
    name: 'Smart Plantation',
    slug: 'smart-plantation',
    industry: 'Plantation',
    category: 'Agriculture',
    description: 'Sistem manajemen perkebunan kelapa sawit & komoditas terpadu, pemantauan panen TBS, dan manajemen tenaga kerja.',
    fullDescription: 'Smart Plantation Management System merupakan arsitektur solusi digital terintegrasi untuk mengelola estate perkebunan. Dari pelacakan blok tanaman, jadwal pemupukan, restan TBS di TPH, hingga integrasi timbangan PKS (Pabrik Kelapa Sawit).',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-green-600/30 via-emerald-900/20 to-slate-950 border-green-500/30',
    relatedIndustrySlug: 'plantation',
    featured: true,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Restan TBS di TPH Tertunda', description: 'Tandan Buah Segar yang terlalu lama menumpuk di TPH menurunkan kadar Asam Lemak Bebas (ALB/FFA).', impact: 'Penurunan mutu CPO' },
      { id: 'p2', title: 'Pengawasan Pemupukan & Hama Kurang Optimal', description: 'Penyebaran pupuk yang tidak merata menurunkan produktivitas tonase per hektar.', impact: 'Yield buah tidak optimal' }
    ],
    solution: {
      summary: 'Sistem operasional perkebunan berbasis GIS dan PWA mobile untuk asisten afdeling dan mandor panen.',
      digitalSolution: 'Input hasil panen harian via aplikasi offline-first, pelacakan armada angkut TBS, serta analisis produktivitas blok.',
      businessImpact: 'Meminimalisir restan >24 jam dan meningkatkan rendemen minyak sawit di mill.'
    },
    modules: [
      { id: 'm1', name: 'Harvest & TPH Log', description: 'Pencatatan janjang panen & nomor TPH', iconName: 'Wheat', aiEnabled: true },
      { id: 'm2', name: 'Hauling & Mill Ingestion', description: 'Penimbangan truk di pks & tiket timbang', iconName: 'Truck', aiEnabled: false },
      { id: 'm3', name: 'Block Yield Analytics', description: 'Monitoring produktivitas ton/ha tiap afdeling', iconName: 'BarChart2', aiEnabled: true },
      { id: 'm4', name: 'Estate Worker Payroll', description: 'Hitung premi mandor & pemanen otomatis', iconName: 'Users', aiEnabled: false }
    ],
    technology: [
      { name: 'React PWA', category: 'Frontend' },
      { name: 'Express Node.js', category: 'Backend' },
      { name: 'Firestore / Postgres', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Yield Prediction Engine', description: 'Estimasi tonase panen bulan depan berdasarkan data historis pupuk & curah hujan.', status: 'CONCEPT', iconName: 'TrendingUp' },
      { id: 'af2', name: 'Plantation Health Advisor', description: 'Rekomendasi penanganan otomatis saat terdeteksi indikasi hama/penyakit tajuk.', status: 'PLANNED', iconName: 'Sparkles' }
    ],
    workflow: [
      { step: 1, title: 'Harvest Recording at TPH', description: 'Mandor mencatat jumlah janjang buah di TPH menggunakan mobile app offline.' },
      { step: 2, title: 'Fruit Transport Dispatch', description: 'Truk angkut menjemput TBS sesuai urutan prioritas tingkat kematangan buah.' },
      { step: 3, title: 'Weighbridge Processing', description: 'Truk ditimbang di PKS dan data tonase langsung tercatat di ERP.' }
    ],
    benefits: [
      'Menurunkan Rasio Buah Restan < 2%',
      'Transparansi Premi Pemanen secara Harian',
      'Optimasi Jadwal Pemupukan Berbasis Data Blok'
    ],
    screenshots: [
      { id: 'sc1', title: 'Estate Yield Dashboard', description: 'Visualisasi hasil panen TBS per Afdeling', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'TBS Harvested Today', value: '420.5 Ton', change: '+5.2%', trend: 'up' },
        { label: 'Restan at TPH', value: '12 Ton', change: 'All Assigned', trend: 'up' },
        { label: 'Avg Extraction Rate (OER)', value: '23.4%', change: 'Target 23.0%', trend: 'up' }
      ],
      aiInsights: [
        'AI Note: Blok C-12 membutuhkan jadwal pemupukan nitrogen minggu ini untuk menjaga stabilitas berat janjang.'
      ]
    }
  },
  {
    id: 'port-poultry',
    name: 'Smart Poultry',
    slug: 'smart-poultry',
    industry: 'Poultry',
    category: 'Agriculture',
    description: 'Sistem manajemen peternakan ayam broiler & layer pintar dengan monitoring FCR, mortalitas, dan kontrol pakan.',
    fullDescription: 'Smart Poultry Platform dirancang untuk pengelola peternakan unggas komersial (Closed House & Open House). Mengotomatisasi pemantauan rasio konversi pakan (FCR), grafik mortalitas harian, kontrol suhu lingkungan kandang, hingga estimasi umur panen.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-yellow-600/30 via-amber-900/20 to-slate-950 border-yellow-500/30',
    relatedIndustrySlug: 'poultry',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Pembengkakan Nilai FCR Pakan', description: 'Pemberian pakan yang tidak efisien tanpa pemantauan pertumbuhan harian memicu FCR tinggi.', impact: 'Biaya operasional pakan melonjak' },
      { id: 'p2', title: 'Pencegahan Wabah Late Response', description: 'Kenaikan tren mortalitas tidak langsung terdeteksi sehingga penanganan terlambat.', impact: 'Kerugian populasi ternak' }
    ],
    solution: {
      summary: 'Aplikasi manajemen flok & kandang berbasis IoT & AI untuk peternak mandiri maupun kemitraan.',
      digitalSolution: 'Tracking intake pakan, sampel bobot badan harian, vaksinasi, dan peringatan dini mortalitas.',
      businessImpact: 'Menjaga FCR ideal di bawah 1.45 dan memaksimalkan indeks performa (IP) saat panen.'
    },
    modules: [
      { id: 'm1', name: 'Flock & Batch Management', description: 'Tracking populasi DOC, umur & recording harian', iconName: 'Bird', aiEnabled: true },
      { id: 'm2', name: 'Feed & FCR Calculator', description: 'Pencatatan konsumsi pakan vs pertambahan bobot', iconName: 'Activity', aiEnabled: true },
      { id: 'm3', name: 'Mortality & Health Alerts', description: 'Grafik kematian & jadwal vaksinasi flok', iconName: 'AlertCircle', aiEnabled: true },
      { id: 'm4', name: 'Harvest & Sales Order', description: 'Manajemen penangkapan ayam & Surat Jalan', iconName: 'ShoppingBag', aiEnabled: false }
    ],
    technology: [
      { name: 'React + Tailwind', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'Firestore Database', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'FCR Optimizer AI', description: 'Prediksi bobot panen berdasarkan kurva pakan & rekomendasi penyesuaian pakan.', status: 'CONCEPT', iconName: 'TrendingUp' },
      { id: 'af2', name: 'Mortality Anomaly Detector', description: 'Peringatan otomatis saat tingkat Kematian harian melebihi ambang batas toleransi.', status: 'PLANNED', iconName: 'AlertTriangle' }
    ],
    workflow: [
      { step: 1, title: 'Daily Flock Recording', description: 'Anak kandang menginput pakan masuk, mati, dan sampel timbang bobot.' },
      { step: 2, title: 'Performance Index Calculation', description: 'Sistem menghitung nilai IP dan rasio FCR harian secara otomatis.' },
      { step: 3, title: 'Harvest Schedule Optimization', description: 'Rekomendasi jadwal panen bertahap dikirim ke manajer operasional.' }
    ],
    benefits: [
      'Peningkatan Indeks Performa (IP) Kandang',
      'Efisiensi Penggunaan Pakan Broiler',
      'Peringatan Dini Kesehatan Populasi Ayam'
    ],
    screenshots: [
      { id: 'sc1', title: 'House Dashboard', description: 'Monitoring FCR & bobot rata-rata Kandang 1-4', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Current Population', value: '48,500 Tail', change: 'Age 24 Days', trend: 'up' },
        { label: 'Current FCR', value: '1.38', change: 'Optimal Target', trend: 'up' },
        { label: 'Avg Body Weight', value: '1.42 Kg', change: '+60g / day', trend: 'up' }
      ],
      aiInsights: [
        'AI Note: Performa FCR Kandang 2 berada di indikator sangat baik (1.35). Pertahankan ventilasi malam.'
      ]
    }
  },
  {
    id: 'port-shrimp-farm',
    name: 'Smart Shrimp Farm',
    slug: 'smart-shrimp-farm',
    industry: 'Shrimp Farming',
    category: 'Aquaculture',
    description: 'Sistem akuakultur pintar pemantauan kualitas air kolam tambak udang vaname, pakan otomatis, dan estimasi biomassa.',
    fullDescription: 'Smart Shrimp Farm Management Platform merupakan solusi digital untuk budidaya udang vaname intensif & super-intensif. Memantau parameter kualitas air (DO, pH, Salinitas, Suhu, Salinitas), rasio pakan (FR), sampling Mean Body Weight (MBW), dan prediksi biomassa kolam.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-cyan-600/30 via-blue-900/20 to-slate-950 border-cyan-500/30',
    relatedIndustrySlug: 'shrimp-farming',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Anjloknya Oksigen Terlarut (DO) Malam Hari', description: 'Fluktuasi kualitas air malam hari tanpa deteksi dini mengakibatkan kematian udang mendadak (drop DO).', impact: 'Gagal panen parparsial' },
      { id: 'p2', title: 'Overfeeding & Pencemaran Dasar Kolam', description: 'Pemberian pakan berlebih mengotori dasar kolam (sisa pakan) dan menaikkan amonia.', impact: 'Penyakit udang & pakan terbuang' }
    ],
    solution: {
      summary: 'Platform pemantauan tambang udang terpadu dengan integrasi sensor IoT & algoritma saran pakan.',
      digitalSolution: 'Recording kualitas air pagi-sore, kalkulasi sampling MBW, estimasi Survival Rate (SR), serta alarm bahaya.',
      businessImpact: 'Mencegah insiden drop DO, menjaga FCR udang < 1.25, dan mengoptimalkan siklus panen.'
    },
    modules: [
      { id: 'm1', name: 'Water Quality Logger', description: 'Recording DO, pH, Suhu, Salinitas & Amonia', iconName: 'Droplet', aiEnabled: true },
      { id: 'm2', name: 'Feeding & Anco Manager', description: 'Jadwal pakan & kalkulasi persentase anco', iconName: 'Sliders', aiEnabled: true },
      { id: 'm3', name: 'Sampling & Biomass Estimator', description: 'Pencatatan MBW, ADG, & perkiraan biomassa', iconName: 'TrendingUp', aiEnabled: true },
      { id: 'm4', name: 'Harvest & Partial Order', description: 'Perencanaan panen parsial & panen total', iconName: 'CheckCircle', aiEnabled: false }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'Firestore / SQLite', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Water Quality AI Alert', description: 'Prediksi penurunan DO berdasarkan tren suhu & cuaca malam hari.', status: 'CONCEPT', iconName: 'AlertTriangle' },
      { id: 'af2', name: 'Biomass & Feed Advisor', description: 'Kalkulasi persentase pakan optimal berdasarkan MBW & tingkat konsumsi anco.', status: 'PLANNED', iconName: 'Cpu' }
    ],
    workflow: [
      { step: 1, title: 'Water Parameter Logging', description: 'Teknisi mengukur dan menginput data DO, pH, dan amonia kolam.' },
      { step: 2, title: 'Anco Checking & Feed Adjust', description: 'Monitoring pakan di anco diinput untuk kalkulasi pakan jam berikutnya.' },
      { step: 3, title: 'Weekly Sampling Analysis', description: 'Data MBW mingguan digunakan untuk memperbarui grafik pertumbuhan ADG.' }
    ],
    benefits: [
      'Meminimalisir Risiko Kematian Massal Akibat Drop DO',
      'Penghematan Biaya Pakan Udang (FCR Rendah)',
      'Akurasi Estimasi Biomassa Saat Panen'
    ],
    screenshots: [
      { id: 'sc1', title: 'Pond Water Quality Dashboard', description: 'Peta status 8 kolam tambang & parameter air real-time', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Active Ponds', value: '12 Kolam', change: 'DOC 45 Avg', trend: 'up' },
        { label: 'Estimated Biomass', value: '18.4 Ton', change: 'SR 88%', trend: 'up' },
        { label: 'Current Avg FCR', value: '1.22', change: 'Good Efficiency', trend: 'up' }
      ],
      aiInsights: [
        'AI Note: Kolam A3 membutuhkan penambahan jam nyala kincir jam 22.00 untuk mengantisipasi drop DO.'
      ]
    }
  },
  {
    id: 'port-hospital',
    name: 'Smart Hospital',
    slug: 'smart-hospital',
    industry: 'Hospital',
    category: 'Healthcare',
    description: 'Sistem Informasi Manajemen Rumah Sakit (SIMRS) berbasis AI untuk integrasi poliklinik, rawat inap, farmasi, dan rekam medis.',
    fullDescription: 'Smart Hospital Management System merupakan arsitektur solusi SIMRS terintegrasi yang dirancang untuk meningkatkan efisiensi operasional rumah sakit dan pengalaman pasien. Mendukung rekam medis elektronik (RME/EMR), penanganan antrean poliklinik, e-resep farmasi, billing terpadu, hingga eksekutif analytics.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-blue-600/30 via-sky-900/20 to-slate-950 border-blue-500/30',
    relatedIndustrySlug: 'hospital',
    featured: true,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Antrean Poliklinik & Pendaftaran Membludak', description: 'Proses admisi manual menimbulkan penumpukan pasien di ruang tunggu dan waktu tunggu lama.', impact: 'Kepuasan pasien menurun' },
      { id: 'p2', title: 'Rekam Medis Terpisah & Stok Obat Tidak Sinkron', description: 'Dokter kesulitan melihat histori medis lintas unit dan stok obat di depo sering habis tanpa warning.', impact: 'Hambatan pelayanan medis' }
    ],
    solution: {
      summary: 'Platform SIMRS enterprise yang menghubungkan front-office pendaftaran hingga back-office keuangan & RME.',
      digitalSolution: 'Sistem antrean online, e-Prescribing dokter ke depo farmasi, modul rekam medis SOAP terstandar, dan audit log keamanan data.',
      businessImpact: 'Memangkas waktu tunggu pasien hingga 60% dan mempercepat proses klaim/billing.'
    },
    modules: [
      { id: 'm1', name: 'Patient Admission & Queue', description: 'Pendaftaran online, bridging BPJS & antrean poliklinik', iconName: 'Users', aiEnabled: false },
      { id: 'm2', name: 'Electronic Health Record (EHR)', description: 'Catatan medis SOAP dokter & riwayat pemeriksaan', iconName: 'FileText', aiEnabled: true },
      { id: 'm3', name: 'Pharmacy & Inventory', description: 'E-resep, stok obat real-time & alert kadaluarsa', iconName: 'Pill', aiEnabled: true },
      { id: 'm4', name: 'Inpatient & Bed Management', description: 'Monitoring ketersediaan kamar rawat inap', iconName: 'Bed', aiEnabled: false },
      { id: 'm5', name: 'Hospital Executive Analytics', description: 'KPI bed occupancy rate (BOR) & pendapatan', iconName: 'Activity', aiEnabled: true }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'PostgreSQL / Firestore', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' },
      { name: 'HL7 / SatuSehat Integration', category: 'API' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Patient Flow Predictor AI', description: 'Forecast lonjakan pasien poliklinik harian berdasarkan histori & musim penyakit.', status: 'CONCEPT', iconName: 'TrendingUp' },
      { id: 'af2', name: 'Pharmacy Demand Forecast', description: 'Prediksi kebutuhan stok obat bulanan untuk mencegah ketersediaan kosong.', status: 'PLANNED', iconName: 'Sparkles' }
    ],
    workflow: [
      { step: 1, title: 'Online Registration & Check-In', description: 'Pasien mendaftar via portal/kios antrean dan mendapat nomor panggilan.' },
      { step: 2, title: 'Consultation & EHR Entry', description: 'Dokter mengisi rekam medis elektronik SOAP dan mengirim e-resep ke depo.' },
      { step: 3, title: 'Dispensing & Billing Clearance', description: 'Farmasi menyiapkan obat dan kasir memproses pembayaran/BPJS.' }
    ],
    benefits: [
      'Integrasi Rekam Medis Elektronik Sesuai Standar',
      'Pengurangan Waktu Tunggu Antrean Poliklinik',
      'Visibilitas Ketersediaan Kamar Rawat Inap (BOR)'
    ],
    screenshots: [
      { id: 'sc1', title: 'Hospital Executive Command Center', description: 'Overview BOR, kunjungan poli, dan transaksi hari ini', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Outpatient Today', value: '384 Patients', change: '+12%', trend: 'up' },
        { label: 'Bed Occupancy Rate (BOR)', value: '78.5%', change: '142 Beds Occupied', trend: 'up' },
        { label: 'Avg Clinic Wait Time', value: '18 Mins', change: '-45% Time', trend: 'up' }
      ],
      aiInsights: [
        'AI Note: Estimasi lonjakan pasien Poliklinik Anak pada hari Senin jam 09.00-11.00. Disarankan buka 2 loket pendaftaran tambahan.'
      ]
    }
  },
  {
    id: 'port-dental-clinic',
    name: 'Smart Dental Clinic',
    slug: 'smart-dental-clinic',
    industry: 'Dental Clinic',
    category: 'Healthcare',
    description: 'Sistem manajemen klinik gigi modern dengan odontogram digital, penjadwalan janji temu, dan rekam medis perawatan gigi.',
    fullDescription: 'Smart Dental Clinic System dirancang khusus untuk mempermudah operasional dokter gigi dan manajemen klinik. Menampilkan odontogram interaktif digital, pengingat janji temu otomatis via WhatsApp, rekam medis tindakan per gigi, dan billing kasir.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-cyan-600/30 via-teal-900/20 to-slate-950 border-cyan-500/30',
    relatedIndustrySlug: 'dental-clinic',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Odontogram Kertas Manual', description: 'Pencatatan kondisi gigi pada kertas rentan terselip dan sulit dibaca oleh dokter pengganti.', impact: 'Riwayat perawatan tidak konsisten' },
      { id: 'p2', title: 'Tinggi Angka No-Show Pasien', description: 'Pasien sering lupa jadwal kontrol berkala atau tindakan lanjutan.', impact: 'Slot jadwal dokter terbuang' }
    ],
    solution: {
      summary: 'Aplikasi klinik gigi komprehensif dengan modul Odontogram visual dan pengingat janji otomatis.',
      digitalSolution: 'Odontogram interaktif dengan pemilihan nomor gigi & simbol tindakan, pengingat WA otomatis, serta laporan omset per tindakan.',
      businessImpact: 'Menurunkan tingkat no-show pasien hingga 70% dan mempercepat konsultasi dokter.'
    },
    modules: [
      { id: 'm1', name: 'Interactive Digital Odontogram', description: 'Visualisasi 32 gigi adult & desidui dengan simbol standar', iconName: 'Activity', aiEnabled: false },
      { id: 'm2', name: 'Smart Appointment Scheduling', description: 'Jadwal dokter, slot waktu & WhatsApp auto-reminder', iconName: 'Calendar', aiEnabled: true },
      { id: 'm3', name: 'Treatment & Billing Package', description: 'Pencatatan tindakan skaling, penambalan, kawat & kasir', iconName: 'CreditCard', aiEnabled: false },
      { id: 'm4', name: 'Dental Materials Inventory', description: 'Stok komposit, bahan cetak, & alat steril', iconName: 'Box', aiEnabled: false }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'Firestore', category: 'Database' },
      { name: 'WhatsApp API Integration', category: 'API' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Patient Recall Assistant', description: 'Identifikasi otomatis pasien yang waktunya skaling/kontrol rutin 6 bulanan.', status: 'CONCEPT', iconName: 'Sparkles' }
    ],
    workflow: [
      { step: 1, title: 'Booking & WA Confirmation', description: 'Pasien memesan slot janji temu online dan mendapat konfirmasi WA otomatis.' },
      { step: 2, title: 'Odontogram & Diagnosis', description: 'Dokter membuka odontogram digital pasien dan memperbarui kondisi gigi.' },
      { step: 3, title: 'Payment & Follow-up Plan', description: 'Kasir memproses pembayaran dan mengagendakan jadwal kontrol berikutnya.' }
    ],
    benefits: [
      'Rekam Medis Odontogram Digital Tersimpan Rapi',
      'Penurunan Drastis No-Show dengan Reminder Otomatis',
      'Kemudahan Manajemen Stok Material Kedokteran Gigi'
    ],
    screenshots: [
      { id: 'sc1', title: 'Digital Odontogram UI', description: 'Visualisasi diagram gigi & riwayat penambalan', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Appointments Today', value: '24 Patients', change: '85% Confirmed', trend: 'up' },
        { label: 'No-Show Rate', value: '4.2%', change: 'Low Ratio', trend: 'up' },
        { label: 'Monthly Revenue', value: 'Rp 85.5M', change: '+15%', trend: 'up' }
      ]
    }
  },
  {
    id: 'port-midwife-clinic',
    name: 'Smart Midwife Clinic',
    slug: 'smart-midwife-clinic',
    industry: 'Midwife Clinic',
    category: 'Healthcare',
    description: 'Sistem manajemen Praktik Mandiri Bidan (PMB) untuk pemantauan kehamilan (ANC), persalinan, imunisasi bayi, dan KB.',
    fullDescription: 'Smart Midwife Clinic Management System dikembangkan untuk memenuhi kebutuhan Praktik Bidan Mandiri & Klinik Bersalin. Mengelola buku KIA digital, jadwal pemeriksaan kehamilan (ANC), rekam medis imunisasi anak, stok obat bidan, dan laporan pelayanan.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-pink-600/30 via-rose-900/20 to-slate-950 border-pink-500/30',
    relatedIndustrySlug: 'midwife-clinic',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Buku KIA Manual Sering Hilang', description: 'Ibu hamil sering tidak membawa buku KIA saat kontrol kehamilan.', impact: 'Bidan kehilangan rekam jejak ANC' },
      { id: 'p2', title: 'Penjadwalan Imunisasi Bayi Terlewat', description: 'Orang tua sering terlambat membawa bayi untuk imunisasi lanjutan.', impact: 'Cakupan imunisasi tidak lengkap' }
    ],
    solution: {
      summary: 'Aplikasi klinik bidan terpadu dengan fitur Rekam Kehamilan Digital & Pengingat Imunisasi.',
      digitalSolution: 'Pencatatan HPHT/HPL otomatis, grafik perkembangan berat janin/bayi, reminder jadwal KB & imunisasi via WA.',
      businessImpact: 'Mempermudah administrasi bidan mandiri dan meningkatkan ketepatan waktu imunisasi bayi.'
    },
    modules: [
      { id: 'm1', name: 'Antenatal Care (ANC) Log', description: 'Pencatatan HPHT, HPL, tekanan darah & DJJ janin', iconName: 'Heart', aiEnabled: false },
      { id: 'm2', name: 'Child Immunization Tracker', description: 'Jadwal imunisasi BCG, DPT, Polio & tumbuh kembang', iconName: 'Shield', aiEnabled: false },
      { id: 'm3', name: 'Contraceptive (KB) Services', description: 'Pencatatan KB Suntik, IUD, Implan & reminder balik', iconName: 'Calendar', aiEnabled: false },
      { id: 'm4', name: 'Medicine & Midwife Billing', description: 'Penjualan vitamin, suplemen & tarif persalinan', iconName: 'CreditCard', aiEnabled: false }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'Firestore', category: 'Database' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Midwife Administrative Assistant', description: 'Asisten otomatis pembuat ringkasan rekapitulasi laporan kunjungan bulanan.', status: 'CONCEPT', iconName: 'FileText' }
    ],
    workflow: [
      { step: 1, title: 'Patient Registration & HPHT', description: 'Bidan memasukkan HPHT pasien untuk menghitung otomatis HPL dan usia kehamilan.' },
      { step: 2, title: 'ANC Checkup Entry', description: 'Bidan menginput hasil tensi, berat badan, TFU, dan denyut jantung janin.' },
      { step: 3, title: 'Automated Reminders', description: 'Sistem mengirimkan reminder otomatis jadwal kontrol ANC atau suntik KB.' }
    ],
    benefits: [
      'Rekam Medis Kehamilan & Imunisasi Tersimpan Aman',
      'Pengingat Otomatis Jadwal KB & Imunisasi Bayi',
      'Pelaporan Administrasi Bidan yang Praktis'
    ],
    screenshots: [
      { id: 'sc1', title: 'ANC Digital Record', description: 'Tampilan riwayat kehamilan & grafik berat janin', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Active ANC Patients', value: '58 Mothers', change: 'HPL Month: 12', trend: 'up' },
        { label: 'Immunization Due Today', value: '8 Children', change: 'All Reminded', trend: 'up' },
        { label: 'KB Patients Active', value: '112 Patients', change: 'Active Recalls', trend: 'neutral' }
      ]
    }
  },
  {
    id: 'port-school',
    name: 'Smart School',
    slug: 'smart-school',
    industry: 'School',
    category: 'Education',
    description: 'Sistem Informasi Akademik (SIAKAD) & Portal Sekolah pintar untuk presensi guru/siswa, nilai rapor, dan SPP online.',
    fullDescription: 'Smart School Management Platform dirancang sebagai ekosistem digital sekolah (SD, SMP, SMA/K). Menghubungkan manajemen sekolah, guru, siswa, dan orang tua dalam satu portal terpadu untuk presensi RFID/QR, jurnal mengajar, e-Rapor, pembukuan SPP, dan pengumuman.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-indigo-600/30 via-purple-900/20 to-slate-950 border-indigo-500/30',
    relatedIndustrySlug: 'school',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Rekap Presensi & Nilai Rapor Manual', description: 'Guru menghabiskan waktu berhari-hari mengompilasi nilai harian & presensi ke lembar rapor.', impact: 'Beban administrasi guru tinggi' },
      { id: 'p2', title: 'Kurangnya Transparansi Informasi Orang Tua', description: 'Orang tua tidak mengetahui kehadiran harian siswa dan status penunggakan SPP.', impact: 'Miskomunikasi dengan sekolah' }
    ],
    solution: {
      summary: 'Platform ekosistem sekolah digital berbasis web & mobile untuk efisiensi akademik dan komunikasi orang tua.',
      digitalSolution: 'Presensi instan, e-Rapor kurikulum terintegrasi, pembayaran SPP via virtual account, dan pengumuman sekolah.',
      businessImpact: 'Memotong waktu pengolahan rapor hingga 80% dan meningkatkan ketepatan pembayaran SPP.'
    },
    modules: [
      { id: 'm1', name: 'Academic & Class Schedule', description: 'Manajemen mata pelajaran, kelas, & jadwal pelajaran', iconName: 'BookOpen', aiEnabled: false },
      { id: 'm2', name: 'Attendance & Student Portal', description: 'Presensi QR/GPS siswa & integrasi laporan ortu', iconName: 'CheckSquare', aiEnabled: true },
      { id: 'm3', name: 'e-Rapor & Grade Book', description: 'Input nilai tugas, UTS, UAS & pencetakan rapor', iconName: 'Award', aiEnabled: true },
      { id: 'm4', name: 'SPP & School Finance', description: 'Virtual account SPP, tagihan otomatis & laporan kas', iconName: 'CreditCard', aiEnabled: false }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Student Academic Analytics', description: 'Deteksi dini penurunan prestasi belajar siswa berdasarkan riwayat nilai & absensi.', status: 'CONCEPT', iconName: 'TrendingUp' }
    ],
    workflow: [
      { step: 1, title: 'Daily Attendance Tap', description: 'Siswa melakukan presensi QR saat tiba di sekolah, notifikasi terkirim ke ortu.' },
      { step: 2, title: 'Teacher Grade Input', description: 'Guru menginput nilai harian dan kuis ke dalam modul e-Rapor.' },
      { step: 3, title: 'Parent Portal Review', description: 'Orang tua memantau perkembangan nilai dan membayar SPP via aplikasi.' }
    ],
    benefits: [
      'Digitalisasi Administrasi e-Rapor Terpadu',
      'Keterbukaan Informasi Kehadiran ke Orang Tua',
      'Kemudahan Pembayaran SPP Online'
    ],
    screenshots: [
      { id: 'sc1', title: 'School Academic Dashboard', description: 'Overview tingkat kehadiran & statistik pembayaran SPP', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Enrolled Students', value: '1,240 Students', change: '36 Classes', trend: 'up' },
        { label: 'Daily Attendance Rate', value: '96.8%', change: 'Punctual Attendance', trend: 'up' },
        { label: 'SPP Collection (MoTD)', value: '88.2%', change: '+12% vs last mo', trend: 'up' }
      ]
    }
  },
  {
    id: 'port-family-hub',
    name: 'Smart Family Hub',
    slug: 'smart-family-hub',
    industry: 'FamilyHub',
    category: 'Enterprise',
    description: 'Platform manajemen keuangan & aktivitas keluarga pintar untuk pencatatan anggaran, kalender bersama, dan rekam kesehatan.',
    fullDescription: 'Smart Family Hub merupakan aplikasi manajemen kehidupan keluarga modern. Menjaga privasi keluarga sambil mempermudah kolaborasi pencatatan keuangan harian, tagihan rutin, jadwal kegiatan anak, daftar belanjaan, serta arsip dokumen penting keluarga.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-violet-600/30 via-purple-900/20 to-slate-950 border-violet-500/30',
    relatedIndustrySlug: 'familyhub',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Pengeluaran Rumah Tangga Tidak Terkontrol', description: 'Pencatatan pengeluaran harian tidak konsisten antara suami & istri.', impact: 'Target tabungan keluarga tidak tercapai' },
      { id: 'p2', title: 'Jadwal & Dokumen Keluarga Berceceran', description: 'Dokumen asuransi, paspor, dan jadwal kegiatan anak tersebar di berbagai chat.', impact: 'Kesulitan saat kebutuhan darurat' }
    ],
    solution: {
      summary: 'Platform privat keluarga terpadu untuk keuangan, jadwal bersama, dan arsip dokumen keluarga.',
      digitalSolution: 'Kategori pengeluaran otomatis, kalender terintegrasi, vault dokumen terenkripsi, dan asisten AI keuangan keluarga.',
      businessImpact: 'Mempermudah perencanaan finansial rumah tangga dan menjaga kerapian agenda keluarga.'
    },
    modules: [
      { id: 'm1', name: 'Shared Family Expense & Budget', description: 'Catat pemasukan, pengeluaran & alokasi dompet', iconName: 'DollarSign', aiEnabled: true },
      { id: 'm2', name: 'Family Calendar & Tasks', description: 'Jadwal dokter, kegiatan sekolah anak & pembagian tugas', iconName: 'Calendar', aiEnabled: false },
      { id: 'm3', name: 'Document Vault', description: 'Penyimpanan aman KK, Akta, Polis Asuransi', iconName: 'Shield', aiEnabled: false },
      { id: 'm4', name: 'Health & Vaccination Log', description: 'Riwayat medis & alergi anggota keluarga', iconName: 'Heart', aiEnabled: false }
    ],
    technology: [
      { name: 'React + Tailwind', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'Firestore', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'AI Family Budget Advisor', description: 'Analisis kebiasaan belanja harian dan rekomendasi penghematan bulanan.', status: 'CONCEPT', iconName: 'Sparkles' }
    ],
    workflow: [
      { step: 1, title: 'Expense Entry', description: 'Suami/istri mencatat transaksi harian atau scan struk belanja.' },
      { step: 2, title: 'Budget Allocation Check', description: 'Sistem menampilkan sisa kuota anggaran kategori pos bulanan.' },
      { step: 3, title: 'Monthly Insights', description: 'Laporan visual keuangan dan progres tabungan keluarga diperbarui.' }
    ],
    benefits: [
      'Transparansi Keuangan Rumah Tangga',
      'Keamanan Arsip Dokumen Keluarga Terenkripsi',
      'Penjadwalan Aktivitas Keluarga Terorganisir'
    ],
    screenshots: [
      { id: 'sc1', title: 'Family Dashboard Overview', description: 'Grafik pengeluaran bulanan & agenda keluarga minggu ini', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Monthly Budget Used', value: '62.5%', change: 'Rp 12.5M / 20M', trend: 'up' },
        { label: 'Savings Progress', value: 'Rp 45.0M', change: 'Target 50M', trend: 'up' },
        { label: 'Upcoming Family Events', value: '3 Events', change: 'This Week', trend: 'neutral' }
      ]
    }
  },
  {
    id: 'port-manufacturing',
    name: 'Smart Manufacturing',
    slug: 'smart-manufacturing',
    industry: 'Manufacturing',
    category: 'Manufacturing',
    description: 'Sistem manajemen pabrik pintar dengan monitoring Overall Equipment Effectiveness (OEE), rencana produksi (PPIC), dan pemeliharaan mesin.',
    fullDescription: 'Smart Manufacturing Management System dirancang sebagai arsitektur solusi industri 4.0 untuk pabrik manufaktur. Mengintegrasikan pemantauan lini produksi, kalkulasi OEE (Availability, Performance, Quality), inspeksi QC, stok bahan baku warehouse, hingga estimasi perawatan mesin.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-orange-600/30 via-red-900/20 to-slate-950 border-orange-500/30',
    relatedIndustrySlug: 'manufacturing',
    featured: true,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Downtime Mesin Tidak Terprediksi', description: 'Kemacetan pada lini perakitan akibat kegagalan sparepart tanpa peringatan dini.', impact: 'Target output produksi terhambat' },
      { id: 'p2', title: 'Visibilitas Nilai OEE Rendah', description: 'Kalkulasi efisiensi mesin secara manual sering terlambat dan tidak akurat.', impact: 'Sulit mengidentifikasi bottleneck' }
    ],
    solution: {
      summary: 'Sistem komando pabrik digital yang memantau kinerja mesin dan lini produksi secara real-time.',
      digitalSolution: 'Tracking jam kerja mesin, logging cacat produk QC, penjadwalan PPIC, dan modul predictive maintenance.',
      businessImpact: 'Meningkatkan skor OEE lini produksi dan menekan rasio produk cacat (reject rate).'
    },
    modules: [
      { id: 'm1', name: 'Production & OEE Monitor', description: 'Tracking real-time skor OEE, Availability & Performance', iconName: 'Cpu', aiEnabled: true },
      { id: 'm2', name: 'PPIC & Work Order Planner', description: 'Perencanaan Bill of Materials (BOM) & Work Order', iconName: 'Layers', aiEnabled: false },
      { id: 'm3', name: 'Quality Control (QC) & Inspection', description: 'Pencatatan defect type & standar toleransi produk', iconName: 'CheckCircle', aiEnabled: true },
      { id: 'm4', name: 'Predictive Equipment Maintenance', description: 'Manajemen sparepart & kalibrasi jadwal mesin', iconName: 'Wrench', aiEnabled: true }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Predictive Maintenance Engine', description: 'Deteksi tren getaran & suhu mesin abnormal untuk mencegah breakdown.', status: 'CONCEPT', iconName: 'Wrench' },
      { id: 'af2', name: 'Defect Pattern Analytics', description: 'Analisis faktor penyebab cacat produk berdasarkan batch bahan baku & shift.', status: 'PLANNED', iconName: 'Sparkles' }
    ],
    workflow: [
      { step: 1, title: 'Work Order Creation', description: 'Tim PPIC menerbitkan Work Order produksi berdasarkan Work Plan.' },
      { step: 2, title: 'Line Execution & OEE Tracking', description: 'Operator mengonfirmasi jalannya lini dan sistem mencatat siklus per menit.' },
      { step: 3, title: 'Quality Assurance Gate', description: 'Inspektur QC memasukkan hasil uji sampel produk sebelum masuk gudang jadi.' }
    ],
    benefits: [
      'Peningkatan Nilai OEE Lini Produksi > 85%',
      'Penurunan Downtime Mesin Unplanned',
      'Kontrol Stok Bahan Baku & Sparepart Presisi'
    ],
    screenshots: [
      { id: 'sc1', title: 'Factory Floor OEE Dashboard', description: 'Monitoring status Lini 1-4 & indikator OEE harian', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Factory OEE Average', value: '84.2%', change: '+3.5%', trend: 'up' },
        { label: 'Unplanned Downtime', value: '1.2 Hours', change: '-40%', trend: 'up' },
        { label: 'Reject Rate (Defect)', value: '0.8%', change: 'Target < 1.0%', trend: 'up' }
      ],
      aiInsights: [
        'AI Note: Lini Packaging 2 beroperasi pada efisiensi 91%. Disarankan maintenance pencegahan pada Conveyor Belt B akhir pekan ini.'
      ]
    }
  },
  {
    id: 'port-retail',
    name: 'Smart Retail',
    slug: 'smart-retail',
    industry: 'Retail',
    category: 'Retail',
    description: 'Sistem Point of Sale (POS) multi-cabang & manajemen inventaris ritel terpadu dengan analisis stok slow-moving.',
    fullDescription: 'Smart Retail Management System dirancang untuk jaringan toko ritel, minimarket, dan bisnis franchise. Menghubungkan kasir POS multi-cabang, kontrol stok real-time, manajemen pembelian supplier, program loyalitas pelanggan, serta rekomendasi promosi.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-teal-600/30 via-emerald-900/20 to-slate-950 border-teal-500/30',
    relatedIndustrySlug: 'retail',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Stok Mati (Slow-Moving) Menumpuk', description: 'Barang tidak laku menumpuk di gudang tanpa terdeteksi cepat, memicu barang kadaluarsa.', impact: 'Modal kerja tertahan' },
      { id: 'p2', title: 'Discrepancy Stok Antar Cabang', description: 'Perbedaan pencatatan fisik toko vs sistem akibat selisih kasir manual.', impact: 'Kerugian variansi inventaris' }
    ],
    solution: {
      summary: 'Sistem Omnichannel Retail & POS multi-toko dengan fitur otomatisasi restock & analisis stok.',
      digitalSolution: 'Kasir POS cepat, transfer stok antar cabang, deteksi barang slow-moving vs fast-moving, dan laporan margin laba rugi.',
      businessImpact: 'Memaksimalkan perputaran stok (inventory turnover) dan meningkatkan penjualan harian.'
    },
    modules: [
      { id: 'm1', name: 'Multi-Branch POS System', description: 'Kasir online/offline, barcode scanner & cetak struk', iconName: 'ShoppingCart', aiEnabled: false },
      { id: 'm2', name: 'Inventory & Stock Transfer', description: 'Gudang pusat, stok cabang, & mutasi barang', iconName: 'Box', aiEnabled: true },
      { id: 'm3', name: 'Purchase & Supplier Order', description: 'Reorder point otomatis & histori pembelian', iconName: 'Truck', aiEnabled: false },
      { id: 'm4', name: 'Customer Loyalty & Promo', description: 'Poin member, diskon bundel & analisis promosi', iconName: 'Tag', aiEnabled: true }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Gemini AI API', category: 'AI' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Slow-Moving Stock Analyzer', description: 'Rekomendasi diskon bundel otomatis untuk menghabiskan stok lambat terjual.', status: 'CONCEPT', iconName: 'Tag' }
    ],
    workflow: [
      { step: 1, title: 'POS Checkout Processing', description: 'Kasir melakukan scan barcode barang, sistem langsung mengurangi stok cabang secara otomatis.' },
      { step: 2, title: 'Stock Threshold Warning', description: 'Saat stok mencapai batas minimum, PO otomatis dibuat untuk dikirim ke supplier.' },
      { step: 3, title: 'Sales Analytics Review', description: 'Pemilik usaha memantau profitabilitas produk dan performa tiap cabang.' }
    ],
    benefits: [
      'Visibilitas Stok Multi-Cabang Real-Time',
      'Pengurangan Risiko Barang Kadaluarsa/Stok Mati',
      'Peningkatan Kecepatan Transaksi Kasir'
    ],
    screenshots: [
      { id: 'sc1', title: 'Omnichannel POS & Retail Dashboard', description: 'Overview penjualan 5 cabang toko & stok kritis', image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Retail Sales Today', value: 'Rp 64.8M', change: '+14%', trend: 'up' },
        { label: 'Transactions Count', value: '1,420 Bills', change: 'Avg Rp 45k', trend: 'up' },
        { label: 'Inventory Turnover Rate', value: '4.8x', change: 'Optimal Ratio', trend: 'up' }
      ]
    }
  },
  {
    id: 'port-restaurant',
    name: 'Smart Restaurant',
    slug: 'smart-restaurant',
    industry: 'Restaurant',
    category: 'Food & Beverage',
    description: 'Sistem POS kuliner & Kitchen Display System (KDS) terintegrasi dengan manajemen resep, meja, dan estimasi bahan baku.',
    fullDescription: 'Smart Restaurant Management Platform merupakan solusi F&B komprehensif untuk restoran, kafe, dan bakery. Menghubungkan kasir POS, pemesanan QR meja (Self-Order), Kitchen Display System (KDS) dapur, stok resep bahan baku (COGS), serta laporan margin menu.',
    projectType: 'Concept',
    status: 'CONCEPT PROJECT',
    coverImage: 'from-rose-600/30 via-red-900/20 to-slate-950 border-rose-500/30',
    relatedIndustrySlug: 'restaurant',
    featured: false,
    visibility: 'PUBLIC',
    approvalStatus: 'PUBLISHED',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    problems: [
      { id: 'p1', title: 'Keterlambatan Pesanan ke Dapur', description: 'Order kertas manual sering hilang atau salah ketik, memicu keluhan pelanggan.', impact: 'Waktu saji pesanan lama' },
      { id: 'p2', title: 'Food Waste & COGS Tidak Terukur', description: 'Bahan baku dapur terbuang tanpa perhitungan resep baku yang presisi.', impact: 'Margin keuntungan F&B tergerus' }
    ],
    solution: {
      summary: 'Aplikasi restoran modern yang mengotomatisasi aliran pesanan meja ke layar KDS dapur.',
      digitalSolution: 'QR Self-Ordering, Kitchen Display Screen, pengurangan bahan otomatis berbasis resep, dan analisis menu terlaris.',
      businessImpact: 'Memotong waktu tunggu sajian makanan dan mengontrol Cost of Goods Sold (COGS).'
    },
    modules: [
      { id: 'm1', name: 'Restaurant POS & Table Map', description: 'Layout meja interaktif, status terisi & bill gabung/pisah', iconName: 'Coffee', aiEnabled: false },
      { id: 'm2', name: 'Kitchen Display System (KDS)', description: 'Layar dapur digital pengganti kertas order', iconName: 'Layers', aiEnabled: false },
      { id: 'm3', name: 'Recipe & Raw Material Stock', description: 'HPP menu, porsi resep, & pengurangan stok otomatis', iconName: 'Utensils', aiEnabled: true },
      { id: 'm4', name: 'QR Self-Order Portal', description: 'Menu digital & pembayaran langsung via HP pelanggan', iconName: 'QrCode', aiEnabled: false }
    ],
    technology: [
      { name: 'React + TypeScript', category: 'Frontend' },
      { name: 'Node.js Express', category: 'Backend' },
      { name: 'Firestore', category: 'Database' }
    ],
    aiFeatures: [
      { id: 'af1', name: 'Menu Popularity & Demand Forecast', description: 'Prediksi kebutuhan stok bahan makanan berdasarkan histori reservasi & hari libur.', status: 'CONCEPT', iconName: 'TrendingUp' }
    ],
    workflow: [
      { step: 1, title: 'Order Placement', description: 'Pelanggan scan QR meja / waiter menginput pesanan ke aplikasi POS.' },
      { step: 2, title: 'Kitchen Preparation', description: 'Pesanan langsung muncul di layar KDS Dapur dengan indikator timer waktu saji.' },
      { step: 3, title: 'Billing & Stock Deduction', description: 'Kasir memproses pembayaran dan bahan baku berkurang otomatis sesuai resep.' }
    ],
    benefits: [
      'Penyajian Makanan Lebih Cepat Tanpa Salah Order',
      'Akurasi HPP/COGS Resep Bahan Baku',
      'Kemudahan Manajemen Meja & QR Self-Order'
    ],
    screenshots: [
      { id: 'sc1', title: 'Kitchen Display & POS Interface', description: 'Tampilan antrean dapur real-time & layout meja', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', device: 'desktop', sortOrder: 1 }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Today F&B Sales', value: 'Rp 28.4M', change: '+18%', trend: 'up' },
        { label: 'Avg Kitchen Prep Time', value: '11 Mins', change: 'Fast Service', trend: 'up' },
        { label: 'Table Turnover Rate', value: '3.2x', change: 'High Demand', trend: 'up' }
      ]
    }
  }
];

export class PortfolioService {
  private static initialize(): PortfolioConfig[] {
    const raw = localStorage.getItem(STORAGE_PORTFOLIOS);
    if (!raw) {
      localStorage.setItem(STORAGE_PORTFOLIOS, JSON.stringify(INITIAL_PORTFOLIOS));
      return INITIAL_PORTFOLIOS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.setItem(STORAGE_PORTFOLIOS, JSON.stringify(INITIAL_PORTFOLIOS));
      return INITIAL_PORTFOLIOS;
    }
  }

  public static getAllPortfolios(options?: {
    query?: string;
    category?: string;
    status?: string;
    visibility?: PortfolioVisibility;
    featuredOnly?: boolean;
    approvalStatus?: PortfolioApprovalStatus;
    sortBy?: 'featured' | 'newest' | 'industry' | 'ai';
  }): PortfolioConfig[] {
    let list = this.initialize();

    // Filter by approval status
    if (options?.approvalStatus) {
      list = list.filter((p) => p.approvalStatus === options.approvalStatus);
    } else {
      // Default for public view is PUBLISHED
      list = list.filter((p) => p.approvalStatus === 'PUBLISHED');
    }

    // Filter by visibility
    if (options?.visibility) {
      list = list.filter((p) => p.visibility === options.visibility);
    }

    // Filter by category / industry
    if (options?.category && options.category !== 'All') {
      const cat = options.category.toLowerCase();
      list = list.filter(
        (p) =>
          p.category.toLowerCase() === cat ||
          p.industry.toLowerCase().includes(cat)
      );
    }

    // Filter by status badge
    if (options?.status && options.status !== 'All') {
      list = list.filter((p) => p.status === options.status);
    }

    // Filter by featured
    if (options?.featuredOnly) {
      list = list.filter((p) => p.featured);
    }

    // Search query
    if (options?.query && options.query.trim()) {
      const q = options.query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.modules.some((m) => m.name.toLowerCase().includes(q)) ||
          p.technology.some((t) => t.name.toLowerCase().includes(q)) ||
          p.aiFeatures.some((af) => af.name.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (options?.sortBy) {
      if (options.sortBy === 'featured') {
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      } else if (options.sortBy === 'newest') {
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (options.sortBy === 'industry') {
        list.sort((a, b) => a.industry.localeCompare(b.industry));
      } else if (options.sortBy === 'ai') {
        list.sort((a, b) => b.aiFeatures.length - a.aiFeatures.length);
      }
    }

    return list;
  }

  public static getPortfolioBySlug(slug: string): PortfolioConfig | null {
    const list = this.initialize();
    return list.find((p) => p.slug === slug || p.id === slug) || null;
  }

  public static trackView(slug: string): void {
    const list = this.initialize();
    const idx = list.findIndex((p) => p.slug === slug || p.id === slug);
    if (idx !== -1) {
      list[idx].viewsCount = (list[idx].viewsCount || 0) + 1;
      localStorage.setItem(STORAGE_PORTFOLIOS, JSON.stringify(list));
    }
  }

  public static trackClick(slug: string): void {
    const list = this.initialize();
    const idx = list.findIndex((p) => p.slug === slug || p.id === slug);
    if (idx !== -1) {
      list[idx].clicksCount = (list[idx].clicksCount || 0) + 1;
      localStorage.setItem(STORAGE_PORTFOLIOS, JSON.stringify(list));
    }
  }

  // Admin CRUD Methods
  public static createPortfolio(
    data: Omit<PortfolioConfig, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'viewsCount' | 'clicksCount'>,
    authorName: string = 'Admin User'
  ): PortfolioConfig {
    const list = this.initialize();
    const newId = `port-${Date.now()}`;
    const newConfig: PortfolioConfig = {
      ...data,
      id: newId,
      version: 1,
      viewsCount: 0,
      clicksCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    list.unshift(newConfig);
    localStorage.setItem(STORAGE_PORTFOLIOS, JSON.stringify(list));

    this.logAudit(newId, newConfig.name, 'Created', authorName, `Created portfolio item ${newConfig.name}`);
    this.saveVersionSnapshot(newConfig, authorName, 'Initial Version');

    return newConfig;
  }

  public static updatePortfolio(
    id: string,
    data: Partial<PortfolioConfig>,
    authorName: string = 'Admin User',
    changeDesc: string = 'Updated details'
  ): PortfolioConfig | null {
    const list = this.initialize();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const current = list[idx];
    const newVersion = (current.version || 1) + 1;

    const updated: PortfolioConfig = {
      ...current,
      ...data,
      version: newVersion,
      updatedAt: new Date().toISOString()
    };

    list[idx] = updated;
    localStorage.setItem(STORAGE_PORTFOLIOS, JSON.stringify(list));

    this.logAudit(id, updated.name, 'Updated', authorName, changeDesc);
    this.saveVersionSnapshot(updated, authorName, changeDesc);

    return updated;
  }

  public static deletePortfolio(id: string, authorName: string = 'Admin User'): boolean {
    const list = this.initialize();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return false;

    const p = list[idx];
    list.splice(idx, 1);
    localStorage.setItem(STORAGE_PORTFOLIOS, JSON.stringify(list));

    this.logAudit(id, p.name, 'Deleted', authorName, `Deleted portfolio ${p.name}`);
    return true;
  }

  public static setFeatured(id: string, featured: boolean, authorName: string = 'Admin User'): boolean {
    const res = this.updatePortfolio(id, { featured }, authorName, `Set featured=${featured}`);
    return !!res;
  }

  public static setApprovalStatus(
    id: string,
    approvalStatus: PortfolioApprovalStatus,
    authorName: string = 'Admin User'
  ): boolean {
    const action = approvalStatus === 'PUBLISHED' ? 'Published' : approvalStatus === 'ARCHIVED' ? 'Archived' : 'Unpublished';
    const res = this.updatePortfolio(id, { approvalStatus }, authorName, `Changed status to ${approvalStatus}`);
    if (res) {
      this.logAudit(id, res.name, action as any, authorName, `Status updated to ${approvalStatus}`);
    }
    return !!res;
  }

  // Audit Logs
  private static logAudit(
    portfolioId: string,
    portfolioName: string,
    action: PortfolioAuditLog['action'],
    author: string,
    details?: string
  ): void {
    const raw = localStorage.getItem(STORAGE_LOGS);
    const logs: PortfolioAuditLog[] = raw ? JSON.parse(raw) : [];
    logs.unshift({
      id: `log-${Date.now()}`,
      portfolioId,
      portfolioName,
      action,
      author,
      timestamp: new Date().toISOString(),
      details
    });
    localStorage.setItem(STORAGE_LOGS, JSON.stringify(logs.slice(0, 100)));
  }

  public static getAuditLogs(): PortfolioAuditLog[] {
    const raw = localStorage.getItem(STORAGE_LOGS);
    return raw ? JSON.parse(raw) : [];
  }

  // Versioning
  private static saveVersionSnapshot(config: PortfolioConfig, author: string, desc: string): void {
    const raw = localStorage.getItem(STORAGE_VERSIONS);
    const versions: PortfolioVersionSnapshot[] = raw ? JSON.parse(raw) : [];
    versions.unshift({
      id: `ver-${Date.now()}`,
      portfolioId: config.id,
      version: config.version || 1,
      snapshot: config,
      author,
      timestamp: new Date().toISOString(),
      changesDescription: desc
    });
    localStorage.setItem(STORAGE_VERSIONS, JSON.stringify(versions.slice(0, 50)));
  }

  public static getVersionsForPortfolio(portfolioId: string): PortfolioVersionSnapshot[] {
    const raw = localStorage.getItem(STORAGE_VERSIONS);
    const versions: PortfolioVersionSnapshot[] = raw ? JSON.parse(raw) : [];
    return versions.filter((v) => v.portfolioId === portfolioId);
  }

  public static restoreVersion(
    versionId: string,
    authorName: string = 'Admin User'
  ): PortfolioConfig | null {
    const raw = localStorage.getItem(STORAGE_VERSIONS);
    const versions: PortfolioVersionSnapshot[] = raw ? JSON.parse(raw) : [];
    const found = versions.find((v) => v.id === versionId);
    if (!found) return null;

    return this.updatePortfolio(
      found.portfolioId,
      found.snapshot,
      authorName,
      `Restored version ${found.version}`
    );
  }

  // Statistics
  public static getAnalyticsSummary() {
    const list = this.initialize();
    const total = list.length;
    const published = list.filter((p) => p.approvalStatus === 'PUBLISHED').length;
    const concept = list.filter((p) => p.status === 'CONCEPT PROJECT').length;
    const client = list.filter((p) => p.status === 'CLIENT PROJECT').length;
    const featured = list.filter((p) => p.featured).length;

    const sortedByViews = [...list].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    const sortedByClicks = [...list].sort((a, b) => (b.clicksCount || 0) - (a.clicksCount || 0));

    return {
      total,
      published,
      concept,
      client,
      featured,
      mostViewed: sortedByViews[0] || null,
      mostClicked: sortedByClicks[0] || null
    };
  }
}
