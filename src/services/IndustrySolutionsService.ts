import { IndustrySolutionConfig, IndustrySolutionCategory } from '../types';

const SOLUTIONS_STORAGE_KEY = 'smart_ai_industry_solutions_v1';

export const INITIAL_INDUSTRY_SOLUTIONS: IndustrySolutionConfig[] = [
  // 1. MINING
  {
    slug: 'mining',
    name: 'Mining',
    subtitle: 'Smart Mining Operations & Fleet Intelligence Platform',
    category: 'Industrial',
    isFeatured: true,
    published: true,
    icon: '⛏️',
    heroTagline: 'Sistem Manajemen Tambang Berbasis AI & Telematika IoT',
    heroDescription:
      'Kelola seluruh rantai operasi tambang mulai dari Pit, Hauling, Stockpile, Fleet, Fuel Consumption, hingga Financial Reporting secara terpusat dengan kecerdasan artifisial.',
    metaTitle: 'AI Mining Software & Fleet Management System | SMART-AI.ID',
    metaDescription:
      'Solusi software pertambangan terintegrasi dengan AI Analytics, Fleet Telematics, Fuel Monitoring, dan Production Forecasting.',
    problems: [
      {
        id: 'p1',
        title: 'Laporan Produksi Manual & Terfragmentasi',
        description: 'Data Ritase dan Tonnase dicatat secara manual di lapangan, rentan manipulasi dan keterlambatan laporan hingga 24 jam.',
        impact: 'Keterlambatan pengambilan keputusan eksekutif & potensi kerugian tonnase.',
        solutionHighlight: 'Digitalisasi ritase otomatis via scanner QR/RFID dan validasi AI otomatis.'
      },
      {
        id: 'p2',
        title: 'High Fleet Downtime & Breakdown Mendadak',
        description: 'Kurangnya pemantauan kondisi armada Dump Truck dan Excavator secara real-time memicu breakdown parah.',
        impact: 'Pembengkakan biaya perbaikan hingga 35% dan terhentinya target produksi mingguan.',
        solutionHighlight: 'Prediksi maintenance AI berdasarkan jam kerja (HM) dan telematika sensor.'
      },
      {
        id: 'p3',
        title: 'Kebocoran Konsumsi Bahan Bakar (Solar)',
        description: 'Konsumsi BBM solar alat berat sulit diawasi secara akurat, membuka celah pencurian dan inefisiensi pakan armada.',
        impact: 'Solar memakan hingga 40% total OPEX tambang.',
        solutionHighlight: 'Anomali detektor AI untuk deteksi kebocoran dan rasio liter/tonnase yang tidak wajar.'
      },
      {
        id: 'p4',
        title: 'Kurangnya Visibilitas Stockpile & Blending',
        description: 'Pencatatan volume dan kalori batu bara/bijih di stockpile tidak akurat sebelum loading ke vessel.',
        impact: 'Kenaikan penalti demurrage dan mismatch kualitas dengan klaim buyer.',
        solutionHighlight: 'Tracking stok otomatis dengan AI Blending Suggester.'
      }
    ],
    solutionOverview:
      'Platform Smart Mining SMART-AI.ID mengintegrasikan data dispatch lapangan, sensor GPS/BBM, ritase digital, dan AI Copilot dalam satu layar Command Center.',
    businessImpactSummary: [
      'Peningkatan Efisiensi Fleet (OEE Alat Berat) sebesar 28%',
      'Penurunan Pemborosan Fuel Solar hingga 18%',
      'Laporan Produksi Real-time 100% Bebas Kertas',
      'Prediksi Akurat Target produksi vs Aktual mingguan'
    ],
    modules: [
      { id: 'm1', name: 'Executive Dashboard & Command Center', description: 'Monitoring KPI produksi, ritase, fleet active, dan fuel real-time.', iconName: 'BarChart3', aiBadge: 'AI Realtime' },
      { id: 'm2', name: 'Fleet & Dispatch Management', description: 'Pengaturan rute hauling, antrean excavator, dan statistik HM alat berat.', iconName: 'Truck', aiBadge: 'Route Optimizer' },
      { id: 'm3', name: 'Production & Tonnage Tracking', description: 'Pencatatan ritase overburden (OB) dan ore/coal volume otomatis.', iconName: 'Layers' },
      { id: 'm4', name: 'Fuel & Oil Monitoring', description: 'Pelacakan pengisian tangki solar, rasio konsumsi/tonnase, dan stok bowser.', iconName: 'Fuel', aiBadge: 'Anomaly Detector' },
      { id: 'm5', name: 'Preventive Maintenance & Spareparts', description: 'Penjadwalan servis berkala, WO mekanik, dan inventaris suku cadang.', iconName: 'Wrench', aiBadge: 'Predictive' },
      { id: 'm6', name: 'Stockpile & Quality Control', description: 'Monitoring elevasi, volume kalori/grade, dan rencana pengapalan (barging).', iconName: 'Database' }
    ],
    aiFeatures: [
      { id: 'f1', name: 'AI Production Forecasting', description: 'Memproyeksikan estimasi pencapaian tonnase akhir bulan berdasarkan ritase harian.', iconName: 'TrendingUp', type: 'Forecasting' },
      { id: 'f2', name: 'AI Fuel Anomaly Alert', description: 'Memberikan peringatan dini jika terdapat indikasi pengurasan BBM yang tidak alami.', iconName: 'AlertTriangle', type: 'Anomaly Detection' },
      { id: 'f3', name: 'AI Mining Copilot Engine', description: 'Asisten AI tempat Direktur & KTT bertanya status produksi via bahasa alami.', iconName: 'Bot', type: 'Copilot' },
      { id: 'f4', name: 'AI Dispatch Suggestion', description: 'Rekomendasi alokasi DT ke Digger untuk menekan waktu tunggu (queue time).', iconName: 'Zap', type: 'Recommendations' }
    ],
    workflowSteps: [
      { step: 1, title: 'Data Capture Lapangan', desc: 'Petugas/Sensor mencatat ritase di Pit dan Blasting via aplikasi mobile.', icon: 'Smartphone' },
      { step: 2, title: 'IoT & Telematics Stream', desc: 'Sensor GPS dan BBM alat berat mengirimkan koordinat dan konsumsi BBM.', icon: 'Radio' },
      { step: 3, title: 'Central Dispatch Engine', desc: 'Sistem mengkalkulasi kecepatan, waktu edar (cycle time), dan efisiensi.', icon: 'Cpu' },
      { step: 4, title: 'AI Analytics & Alerting', desc: 'AI mendeteksi anomali ritase, potensi bottleneck, dan prediksi maintenance.', icon: 'Sparkles' },
      { step: 5, title: 'Executive Decision Support', desc: 'KTT dan Manajemen mengambil tindakan pencegahan melalui Command Center.', icon: 'CheckCircle2' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Produksi OB (BCM)', value: '1.240.500', change: '+12,4%', isPositive: true, subtext: 'Target 1.100.000 BCM' },
        { label: 'Total Produksi Coal (Ton)', value: '385.200', change: '+8,1%', isPositive: true, subtext: 'Target 350.000 Ton' },
        { label: 'Fleet Availability (MA)', value: '91,5%', change: '+3,2%', isPositive: true, subtext: 'Standar Mining > 88%' },
        { label: 'Rasio BBM Solar (L/BCM)', value: '0,82', change: '-5,4%', isPositive: true, subtext: 'Efisien (Hemat 4.200 L)' }
      ],
      chartTitle: 'Tren Ritase vs Target Harian (Minggu Ini)',
      chartData: [
        { name: 'Sen', actual: 4200, target: 4000 },
        { name: 'Sel', actual: 4400, target: 4000 },
        { name: 'Rab', actual: 3900, target: 4000 },
        { name: 'Kam', actual: 4600, target: 4000 },
        { name: 'Jum', actual: 4800, target: 4000 },
        { name: 'Sab', actual: 4100, target: 4000 },
        { name: 'Min', actual: 4350, target: 4000 }
      ],
      tableTitle: 'Ringkasan Kinerja Fleet Alat Berat (Pit A & B)',
      tableHeaders: ['Unit ID', 'Tipe Armada', 'Driver/Operator', 'Cycle Time', 'Fuel/Jam', 'Status AI'],
      tableRows: [
        { 'Unit ID': 'DT-201', 'Tipe Armada': 'Volvo FMX 440', 'Driver/Operator': 'Budi Santoso', 'Cycle Time': '18,5 m', 'Fuel/Jam': '24,2 L', 'Status AI': 'Optimal' },
        { 'Unit ID': 'DT-204', 'Tipe Armada': 'Scania P410', 'Driver/Operator': 'Eko Prasetyo', 'Cycle Time': '24,1 m', 'Fuel/Jam': '31,5 L', 'Status AI': '⚠️ Bottleneck Queue' },
        { 'Unit ID': 'EX-301', 'Tipe Armada': 'Komatsu PC1250', 'Driver/Operator': 'Agus R', 'Cycle Time': '0,4 m', 'Fuel/Jam': '72,0 L', 'Status AI': 'Optimal' },
        { 'Unit ID': 'DT-210', 'Tipe Armada': 'Mercedes Actros', 'Driver/Operator': 'Rahmat H', 'Cycle Time': '19,0 m', 'Fuel/Jam': '25,1 L', 'Status AI': 'Optimal' }
      ],
      aiInsightBanner: '💡 AI Summary: Efisiensi hauling Pit A naik 8,5% setelah optimasi antrean Excavator EX-301. Ditemukan 1 indikasi anomali fuel pada DT-204.'
    },
    benefits: [
      'Visibilitas penuh ritase dan tonnase dari smartphone tanpa menunggu rekap harian.',
      'Sistem pencegahan kerusakan alat berat melalui jadwal maintenance berbasis beban kerja nyata.',
      'Akurasi data rekonsil pembayaran kontraktor hauling dan supplier bahan bakar.',
      'Laporan ESG & keselamatan kerja (K3) pertambangan yang lebih patuh aturan.'
    ],
    useCases: [
      {
        id: 'uc1',
        title: 'Optimalisasi Antrean Truck di Front Excavator',
        scenario: 'Antrean DT memanjang hingga 5 unit di Pit B, menyia-nyiakan waktu dan bahan bakar solar.',
        aiRole: 'AI Dispatch memberikan rute pengalihan dinamis ke Pit C yang sedang kosong.',
        outcome: 'Waktu tunggu turun dari 12 menit menjadi 3 menit per ritase.'
      },
      {
        id: 'uc2',
        title: 'Pencegahan Kerusakan Engine Alat Berat',
        scenario: 'Suhu oli mesin EX-302 meningkat konsisten selama 3 jam di luar batas toleransi.',
        aiRole: 'AI Anomaly Detector mengirimkan notifikasi darurat ke HP Kepala Mekanik.',
        outcome: 'Servis darurat dilakukan sebelum engine jebol, menghemat biaya perbaikan ratusan juta.'
      }
    ],
    integrations: ['GPS Fleet Telematics', 'Jembatan Timbang Automation', 'Fuel Flow Meter IoT', 'SAP / ERP Accounting', 'Google Maps Platform'],
    technologies: [
      { category: 'Frontend & UI', stack: ['React 18', 'Tailwind CSS', 'Recharts Analytics', 'Lucide Vector Icons'] },
      { category: 'Backend & Engine', stack: ['Express.js', 'Node.js', 'TypeScript', 'Deterministic Calculation Engine'] },
      { category: 'AI & Intelligence', stack: ['Gemini 2.5 Flash', 'SMART-AI RAG Knowledge Engine', 'Anomaly Matrix'] }
    ],
    relatedSlugs: ['coal-mining', 'nickel-mining', 'manufacturing', 'logistics'],
    cta: {
      buildText: 'Bangun Aplikasi Tambang Ini',
      consultText: 'Konsultasi Tim Ahli Mining',
      estimateText: 'Hitung Estimasi Biaya'
    }
  },

  // 2. COAL MINING
  {
    slug: 'coal-mining',
    name: 'Coal Mining',
    subtitle: 'End-to-End Coal Pit-to-Port Management System',
    category: 'Industrial',
    isFeatured: true,
    published: true,
    icon: '🪨',
    heroTagline: 'Solusi Khusus Tambang Batu Bara Integrasi Pit, Stockpile & Barging',
    heroDescription:
      'Optimalkan penambangan batu bara, kelola kalori (GAR/NAR), kontrol pencampuran (blending), hingga pemuatan tongkang (barging) tanpa risiko demurrage.',
    metaTitle: 'Software Tambang Batu Bara & Blending Kalori AI | SMART-AI.ID',
    metaDescription: 'Sistem manajemen batu bara terintegrasi Pit to Port, QC Kalori, Stockpile, dan AI Coal Blending Optimizer.',
    problems: [
      { id: 'cp1', title: 'Mismatch Kalori Batu Bara Saat Barging', description: 'Pencampuran batu bara yang manual menghasilkan GAR tidak sesuai spesifikasi kontrak buyer.', impact: 'Penalti penolakan kargo atau potongan harga tonnase yang signifikan.', solutionHighlight: 'AI Coal Blending Optimizer menghitung proporsi persis dari tiap jetty/stockpile.' },
      { id: 'cp2', title: 'Risiko Swabakar (Self-Heating) di Stockpile', description: 'Penumpukan batu bara yang terlalu lama tanpa pemantauan suhu memicu kebakaran spontan.', impact: 'Kehilangan tonnase batu bara bernilai miliaran rupiah.', solutionHighlight: 'Integrasi sensor termal dengan AI Risk Alert.' }
    ],
    solutionOverview: 'Sistem manajemen pertambangan batu bara khusus dengan modul kontrol kualitas kalori, pencatatan barging, dan AI Blending.',
    businessImpactSummary: ['Bebas dari Penalti Mismatch Kalori Buyer', 'Penghematan Demurrage Tongkang hingga 25%', 'Monitoring Live Tonnase Pit to Port'],
    modules: [
      { id: 'cm1', name: 'Pit & Stripping Ratio Tracker', description: 'Tracking OB BCM dan Coal Tonnase harian per blok.', iconName: 'Layers' },
      { id: 'cm2', name: 'Coal Quality & Laboratory QC', description: 'Pencatatan data laboratorium GAR, Total Moisture, Ash, dan Sulfur.', iconName: 'FlaskConical', aiBadge: 'Quality AI' },
      { id: 'cm3', name: 'Stockpile & Blending Management', description: 'Simulasi pencampuran kalori batu bara antar dome secara presisi.', iconName: 'Boxes', aiBadge: 'AI Blending' },
      { id: 'cm4', name: 'Jetty & Barging Conveyor Dispatch', description: 'Monitoring loading rate conveyor dan waktu sandar tongkang.', iconName: 'Ship' }
    ],
    aiFeatures: [
      { id: 'cf1', name: 'AI Coal Blending Suggester', description: 'Rekomendasi otomatis formula pencampuran batu bara terbaik agar mencapai GAR target dengan cost terendah.', iconName: 'Sparkles', type: 'Recommendations' },
      { id: 'cf2', name: 'Barging Demurrage Predictor', description: 'Memprediksi potensi keterlambatan loading tongkang untuk menghindari penalti demurrage.', iconName: 'Clock', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Ekskavasi & Pit Hauling', desc: 'Pengangkutan batu bara dari rom ke crusher.', icon: 'Truck' },
      { step: 2, title: 'Sampling & Lab QC', desc: 'Pengujian spesifikasi kalori dan moisture di laboratorium.', icon: 'FlaskConical' },
      { step: 3, title: 'Stockpile Management', desc: 'Penempatan stok berdasarkan kelas kalori (High/Medium/Low GAR).', icon: 'Boxes' },
      { step: 4, title: 'AI Blending & Barging', desc: 'Eksekusi pencampuran presisi dan pemuatan ke tongkang.', icon: 'Ship' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Stok Batu Bara Stockpile', value: '145.800 Ton', change: '+5,2%', isPositive: true, subtext: 'Siap Barging 85.000 Ton' },
        { label: 'Rata-rata Kalori (GAR)', value: '4.180 kcal/kg', change: '+0,8%', isPositive: true, subtext: 'Target Buyer: 4.200 kcal' },
        { label: 'Loading Rate Conveyor', value: '1.250 Ton/Jam', change: '+15,0%', isPositive: true, subtext: 'Performa Sangat Baik' },
        { label: 'Barging Demurrage Risk', value: '0 Jam (Safe)', change: '0%', isPositive: true, subtext: 'Bebas Penalti' }
      ],
      chartTitle: 'Proyeksi & Realisasi Tonnase Coal Barging (Bulan Ini)',
      chartData: [
        { name: 'M1', actual: 45000, target: 40000 },
        { name: 'M2', actual: 48000, target: 40000 },
        { name: 'M3', actual: 42000, target: 40000 },
        { name: 'M4', actual: 51000, target: 40000 }
      ],
      tableTitle: 'Status Blending Kargo Tongkang (MV Nusantara-08)',
      tableHeaders: ['Dome Origin', 'Spesifikasi GAR', 'Tonnase Mix', 'Kontribusi Kalori', 'Status AI'],
      tableRows: [
        { 'Dome Origin': 'Dome A (High)', 'Spesifikasi GAR': '4.800 kcal', 'Tonnase Mix': '12.000 Ton', 'Kontribusi Kalori': '57,6%', 'Status AI': 'Optimal' },
        { 'Dome Origin': 'Dome C (Low)', 'Spesifikasi GAR': '3.400 kcal', 'Tonnase Mix': '8.000 Ton', 'Kontribusi Kalori': '42,4%', 'Status AI': 'Optimal' }
      ],
      aiInsightBanner: '💡 AI Blending Note: Campuran 60% Dome A + 40% Dome C menghasilkan GAR 4.240 kcal/kg, memenuhi syarat kontrak buyer dengan biaya minimal.'
    },
    benefits: ['Akurasi garansi kualitas kalori saat loading tongkang.', 'Efisiensi waktu kerja conveyor dan alat pendorong stockpile.', 'Pengendalian stok batu bara yang transparan bagi manajemen.'],
    useCases: [
      {
        id: 'ucc1',
        title: 'Pencegahan Penalti Kargo Batu Bara',
        scenario: 'Buyer meminta spesifikasi ketat GAR 4.200 ± 50 kcal dengan Ash < 7%.',
        aiRole: 'AI Blending menghitung proporsi akurat dari 3 dome berbeda.',
        outcome: 'Hasil sampel independen lab surveyor sesuai 100%, bebas klaim penalti.'
      }
    ],
    integrations: ['Laboratorium QC LIMS', 'Conveyor Belt Weigher', 'Jembatan Timbang Jetty', 'AIS Vessel Tracking'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'Recharts'] },
      { category: 'Backend', stack: ['Express.js', 'Deterministic Math Engine'] }
    ],
    relatedSlugs: ['mining', 'nickel-mining', 'logistics'],
    cta: { buildText: 'Bangun Software Batu Bara', consultText: 'Konsultasi Pakar Batu Bara', estimateText: 'Hitung Estimasi' }
  },

  // 3. NICKEL MINING
  {
    slug: 'nickel-mining',
    name: 'Nickel Mining',
    subtitle: 'Grade Control & Smelter Feed Nickel Intelligence',
    category: 'Industrial',
    isFeatured: true,
    published: true,
    icon: '⚡',
    heroTagline: 'Manajemen Pertambangan Bijih Nikel (Saprolit & Limonit) Terintegrasi',
    heroDescription:
      'Kelola penambangan bijih nikel dengan pengendalian kadar (Ni, Fe, SiO2/MgO ratio), pengalokasian ke smelter/HPAL, dan optimasi pemuatan kargo secara presisi.',
    metaTitle: 'Software Tambang Nikel & Grade Control AI | SMART-AI.ID',
    metaDescription: 'Solusi aplikasi pertambangan nikel khusus Grade Control, Saprolit/Limonit Tracking, dan Smelter Delivery Analytics.',
    problems: [
      { id: 'np1', title: 'Kadar Nikel (Ni Grade) Fluktuatif & Reject Smelter', description: 'Pengiriman ore dengan kadar nikel di bawah batas spesifikasi teknis smelter kerap ditolak di pelabuhan tujuan.', impact: 'Rugi ongkos angkut dan kerugian material hingga milyaran rupiah.', solutionHighlight: 'Grade Control AI dengan peta kontur blok nikel.' }
    ],
    solutionOverview: 'Sistem pertambangan nikel khusus dengan modul analisis kadar Ni/Fe/SiO2, pengelompokan ETO/EFO, dan pengiriman ke smelter.',
    businessImpactSummary: ['Nol Kasus Reject Ore di Smelter', 'Optimasi Penjualan Saprolit Kadar Tinggi', 'Tracking Real-time Ore dari Block ke Barging'],
    modules: [
      { id: 'nm1', name: 'Mine Planning & Block Model', description: 'Visualisasi blok tambang nikel limonit dan saprolit.', iconName: 'Grid' },
      { id: 'nm2', name: 'Grade Control & XRF Lab Integration', description: 'Integrasi hasil tes assay XRF untuk kadar Ni, Fe, SiO2, MgO.', iconName: 'Cpu', aiBadge: 'Grade AI' },
      { id: 'nm3', name: 'ETO / EFO Stockpile Tracking', description: 'Pelacakan tempat penumpukan sementara bijih nikel berdasarkan kelas kadar.', iconName: 'Boxes' }
    ],
    aiFeatures: [
      { id: 'nf1', name: 'AI Nickel Ore Blending Suggester', description: 'Menghitung rasio pencampuran ore agar sesuai kriteria ratio SiO2/MgO smelter.', iconName: 'Sparkles', type: 'Recommendations' }
    ],
    workflowSteps: [
      { step: 1, title: 'Assay Drilling & Sampling', desc: 'Pengambilan sampel titik pemboran dan tes XRF.', icon: 'Crosshair' },
      { step: 2, title: 'Mining Saprolite/Limonite', desc: 'Penambangan selektif berdasarkan peta grade.', icon: 'Layers' },
      { step: 3, title: 'Barging to Smelter', desc: 'Pemuatan ke tongkang menuju smelter RKEF atau HPAL.', icon: 'Ship' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Produksi Saprolit (Ni > 1.6%)', value: '62.400 Ton', change: '+14,2%', isPositive: true, subtext: 'Grade rata-rata 1.72%' },
        { label: 'Produksi Limonit (HPAL Feed)', value: '48.100 Ton', change: '+9,0%', isPositive: true, subtext: 'Grade rata-rata 1.25%' },
        { label: 'Smelter Acceptance Rate', value: '100%', change: '0%', isPositive: true, subtext: 'Bebas Reject' },
        { label: 'Rasio SiO2/MgO', value: '2,15', change: 'Optimal', isPositive: true, subtext: 'Memenuhi Syarat Smelter' }
      ],
      chartTitle: 'Distribusi Kadar Nikel (Ni %) Hasil Produksi',
      chartData: [
        { name: 'Blok A1', actual: 1.75, target: 1.6 },
        { name: 'Blok A2', actual: 1.68, target: 1.6 },
        { name: 'Blok B1', actual: 1.82, target: 1.6 },
        { name: 'Blok C2', actual: 1.55, target: 1.6 }
      ],
      tableTitle: 'Hasil Pengujian XRF Assay Lapangan',
      tableHeaders: ['Sample ID', 'Lokasi Blok', 'Ni (%)', 'Fe (%)', 'SiO2/MgO', 'Rekomendasi AI'],
      tableRows: [
        { 'Sample ID': 'SMP-101', 'Lokasi Blok': 'Blok A1', 'Ni (%)': '1,78%', 'Fe (%)': '18,2%', 'SiO2/MgO': '2,1', 'Rekomendasi AI': 'Direct to Smelter Barging' },
        { 'Sample ID': 'SMP-104', 'Lokasi Blok': 'Blok C2', 'Ni (%)': '1,52%', 'Fe (%)': '22,4%', 'SiO2/MgO': '1,8', 'Rekomendasi AI': 'Blend with High Grade A1' }
      ],
      aiInsightBanner: '💡 AI Grade Advisory: Blok C2 memerlukan pencampuran 30% dari Blok B1 untuk menaikkan Ni menjadi >1.65% sebelum loading.'
    },
    benefits: ['Mencegah kargo nikel ditolak smelter.', 'Maksimalkan margin harga patokan mineral (HPM) nikel.'],
    useCases: [
      { id: 'ucn1', title: 'Pencegahan Reject Smelter RKEF', scenario: 'Nikel dengan kadar 1.58% terancam ditolak karena di bawah syarat 1.60%.', aiRole: 'AI menyarankan pencampuran cepat dengan stok ETO High Grade.', outcome: 'Kargo lolos verifikasi verifikator independen.' }
    ],
    integrations: ['Mesin XRF Analyzer', 'Jembatan Timbang Smelter', 'Sistem HPM Kemen ESDM'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js', 'PostgreSQL / Firestore'] }
    ],
    relatedSlugs: ['mining', 'coal-mining', 'logistics'],
    cta: { buildText: 'Bangun Software Nikel', consultText: 'Konsultasi Tambang Nikel', estimateText: 'Hitung Estimasi' }
  },

  // 4. PLANTATION
  {
    slug: 'plantation',
    name: 'Plantation',
    subtitle: 'Smart Agro & Palm Oil Estate Management System',
    category: 'Agriculture',
    isFeatured: true,
    published: true,
    icon: '🌴',
    heroTagline: 'Sistem Manajemen Perkebunan Kelapa Sawit & Agrobisnis AI',
    heroDescription:
      'Kelola operasi kebun sawit/karet/tebu, rotasi panen TBS, produktivitas pemanen per blok, pemupukan presisi, hingga pengiriman ke PKS (Pabrik Kelapa Sawit).',
    metaTitle: 'Software Perkebunan Kelapa Sawit & Smart Agro AI | SMART-AI.ID',
    metaDescription: 'Solusi manajemen perkebunan terintegrasi rotasi panen, pemupukan presisi, tracking BKM/BKM, dan AI Yield Forecast.',
    problems: [
      { id: 'pp1', title: 'Buah Restan & Kerugian Tonase TBS', description: 'Tandan Buah Segar (TBS) yang dipanen terlambat diangkut ke PKS sehingga asam lemak bebas (ALB) naik.', impact: 'Penurunan kualitas CPO dan kerugian tonase TBS yang membusuk.', solutionHighlight: 'Tracking BKM & Dispatch Truck Panen berbasis QR Code.' }
    ],
    solutionOverview: 'Platform perkebunan pintar dengan fitur tracking panen harian per divisi/blok, manajemen pupuk presisi, dan AI Yield Forecasting.',
    businessImpactSummary: ['Penurunan Angka Buah Restan hingga < 1%', 'Akurasi Penggunaan Pupuk NPK/Urea 98%', 'Monitoring Real-time Restan ke PKS'],
    modules: [
      { id: 'pm1', name: 'Estate & Block Division Model', description: 'Pemetaan blok kebun, umur tanaman (TM/TBM), dan populasi pokok.', iconName: 'Map' },
      { id: 'pm2', name: 'Harvest & TBS Tonnage Tracking', description: 'Pencatatan janjang panen harian per pemanen dan BKM digital.', iconName: 'Layers', aiBadge: 'Harvest AI' },
      { id: 'pm3', name: 'Precision Fertilizer & Pesticide', description: 'Jadwal dan dosis pemupukan presisi berdasarkan analisis tanah.', iconName: 'Sprout' }
    ],
    aiFeatures: [
      { id: 'pf1', name: 'AI Yield & Crop Forecasting', description: 'Memproyeksikan estimasi tonnase panen TBS bulan depan berdasarkan histori curah hujan dan tren pembungaan.', iconName: 'TrendingUp', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Sensoring & Sensus Pokok', desc: 'Sensus kerapatan buah matang di lapangan.', icon: 'Eye' },
      { step: 2, title: 'Panen & QR BKM', desc: 'Pemanen mencatat hasil panen dan menempelkan QR pada TPH.', icon: 'CheckSquare' },
      { step: 3, title: 'Transportasi ke PKS', desc: 'Truck angkut membawa TBS ke PKS sebelum ALB naik.', icon: 'Truck' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Hasil Panen TBS (Ton)', value: '3.420 Ton', change: '+8,4%', isPositive: true, subtext: 'Target 3.200 Ton' },
        { label: 'Rata-Rata Berat Janjang (BJJ)', value: '18,5 kg', change: '+2,1%', isPositive: true, subtext: 'Ideal TM-2' },
        { label: 'Angka Buah Restan', value: '0,2%', change: '-1,5%', isPositive: true, subtext: 'Sangat Baik (< 1%)' },
        { label: 'Produktivitas Pemanen', value: '1,8 Ton/HK', change: '+5,0%', isPositive: true, subtext: 'Di atas rata-rata' }
      ],
      chartTitle: 'Tren Panen TBS per Divisi Kebun (Minggu Ini)',
      chartData: [
        { name: 'Divisi 1', actual: 850, target: 800 },
        { name: 'Divisi 2', actual: 920, target: 800 },
        { name: 'Divisi 3', actual: 780, target: 800 },
        { name: 'Divisi 4', actual: 870, target: 800 }
      ],
      tableTitle: 'Ringkasan Panen Harian per Blok Kebun',
      tableHeaders: ['Blok Kebun', 'Status Pokok', 'Pemanen Aktif', 'Janjang Matang', 'Est. Tonase', 'Status AI'],
      tableRows: [
        { 'Blok Kebun': 'Blok A-12', 'Status Pokok': 'TM-2015', 'Pemanen Aktif': '14 HK', 'Janjang Matang': '1.420 BJJ', 'Est. Tonase': '26,2 Ton', 'Status AI': 'Selesai Angkut' },
        { 'Blok Kebun': 'Blok B-08', 'Status Pokok': 'TM-2018', 'Pemanen Aktif': '18 HK', 'Janjang Matang': '1.850 BJJ', 'Est. Tonase': '34,2 Ton', 'Status AI': '⚠️ Butuh Truck Tambahan' }
      ],
      aiInsightBanner: '💡 AI Agro Alert: Blok B-08 membutuhkan 2 unit truk tambahan dalam 2 jam ke depan untuk mencegah buah restan melampaui batas ALB.'
    },
    benefits: ['Tracking transparan premi pemanen.', 'Optimasi pemakaian pupuk kimia.'],
    useCases: [
      { id: 'ucp1', title: 'Pencegahan Buah Restan Meningkat', scenario: 'Produksi panen melonjak di Divisi 2 hingga armada truk kewalahan.', aiRole: 'AI meragihkan pengalihan truk dari Divisi 1 yang telah selesai.', outcome: 'Seluruh TBS diangkut ke PKS sebelum malam hari.' }
    ],
    integrations: ['Jembatan Timbang PKS', 'Mobile App Offline BKM', 'GIS Mapping Software'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js'] }
    ],
    relatedSlugs: ['poultry', 'shrimp-farming', 'logistics'],
    cta: { buildText: 'Bangun Software Perkebunan', consultText: 'Konsultasi Perkebunan', estimateText: 'Hitung Estimasi Biaya' }
  },

  // 5. POULTRY / PETERNAKAN AYAM
  {
    slug: 'poultry',
    name: 'Peternakan Ayam (Poultry)',
    subtitle: 'Smart Closed House Poultry, FCR Optimizer & Broiler Analytics',
    category: 'Agriculture',
    isFeatured: true,
    published: true,
    icon: '🐔',
    heroTagline: 'Solusi Manajemen Peternakan Ayam Broiler & Layer Berbasis IoT & AI',
    heroDescription:
      'Pantau kondisi iklim kandang closed house (suhu, kelembapan, kadar amonia, ventilasi kipas), kalkulasi FCR (Feed Conversion Ratio) otomatis, jadwal vaksinasi, manajemen pakan harian, dan deteksi anomali mortalitas dini.',
    metaTitle: 'Software Peternakan Ayam & FCR Analytics AI | SMART-AI.ID',
    metaDescription: 'Solusi manajemen peternakan ayam Broiler & Layer dengan IoT Closed House, FCR Calculator, Pakan Sapronak, dan AI Farm Copilot.',
    problems: [
      { id: 'pop1', title: 'FCR (Feed Conversion Ratio) Tinggi & Pemborosan Pakan', description: 'Pemberian pakan yang tidak efisien atau fluktuasi suhu kandang yang buruk membuat FCR membengkak.', impact: 'Margin keuntungan peternak tergerus habis oleh pakan.', solutionHighlight: 'Analisis FCR AI & rekomendasi presisi jadwal serta porsi pakan harian.' },
      { id: 'pop2', title: 'Risiko Kematian Massal Akibat Heat Stroke & Lonjakan Amonia', description: 'Kipas kandang mati mendadak atau gas amonia melonjak tanpa notifikasi instan ke anak kandang.', impact: 'Kematian ribuan ekor ayam dalam hitungan jam dan kerugian ratusan juta.', solutionHighlight: 'IoT Climate Controller & Alarm Darurat WhatsApp 24/7.' }
    ],
    solutionOverview: 'Sistem peternakan ayam pintar yang mengintegrasikan sensor IoT kandang closed house, pencatatan pakan sapronak, prediksi bobot harian (ABW), dan manajemen kemitraan inti-plasma.',
    businessImpactSummary: ['Penurunan FCR hingga 0,08 - 0,12 poin', 'Menekan Angka Mortalitas di bawah 2,5%', 'Otomasi Jadwal Panen Broiler Sesuai Target Bobot', 'Monitoring 10+ Kandang dari 1 Smartphone'],
    modules: [
      { id: 'pom1', name: 'Closed House Climate & IoT Monitoring', description: 'Monitoring suhu, RH kelembapan, gas amonia, dan status exhaust fan secara real-time.', iconName: 'Activity', aiBadge: 'IoT AI' },
      { id: 'pom2', name: 'Feed & FCR Calculator Engine', description: 'Pencatatan konsumsi pakan harian, restok pakan, dan kalkulasi rasio konversi pakan otomatis.', iconName: 'Calculator', aiBadge: 'FCR AI' },
      { id: 'pom3', name: 'DOC Tracking & Daily Body Weight (ABW)', description: 'Pencatatan populasi DOC, sampling bobot ayam berkala, dan perbandingan dengan kurva standar ras Cobb/Ross.', iconName: 'TrendingUp' },
      { id: 'pom4', name: 'Kemitraan Inti-Plasma & Harvest Logistics', description: 'Manajemen sapronak (DOC, pakan, obat), pencatatan bon panen timbang hidup, dan bagi hasil peternak plasma.', iconName: 'Truck' }
    ],
    aiFeatures: [
      { id: 'pof1', name: 'AI Mortality Anomaly Alert', description: 'Mendeteksi tren kematian tak wajar dalam hitungan jam sebagai peringatan dini potensi wabah virus/penyakit kandang.', iconName: 'AlertTriangle', type: 'Anomaly Detection' },
      { id: 'pof2', name: 'AI Harvest Date & Weight Predictor', description: 'Memprediksi tanggal panen ideal dan estimasi tonase karkas ayam berdasarkan laju pertumbuhan aktual.', iconName: 'Sparkles', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Chicking DOC In', desc: 'Pencatatan populasi awal DOC, grading bibit, dan bobot awal kandang.', icon: 'Check' },
      { step: 2, title: 'Monitoring Harian IoT', desc: 'Sensor otomatis mencatat suhu/amonia dan input pakan harian via mobile.', icon: 'Activity' },
      { step: 3, title: 'Sampling Bobot Mingguan', desc: 'Sampling penimbangan ayam dan kalibrasi kurva FCR.', icon: 'Scale' },
      { step: 4, title: 'Panen Broiler & Settlement', desc: 'Penjualan ke RPU/bakul berdasarkan tonase dan perhitungan bagi hasil plasma.', icon: 'Truck' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Populasi Ayam Aktif', value: '85.000 Ekor', change: 'Kandang 1-4', isPositive: true, subtext: 'Broiler Umur 24 Hari' },
        { label: 'Rata-rata Bobot (ABW)', value: '1,42 kg', change: '+4,2%', isPositive: true, subtext: 'Target Standar 1,38 kg' },
        { label: 'Nilai FCR Real-time', value: '1,41', change: '-0,05', isPositive: true, subtext: 'Sangat Efisien (Target < 1,48)' },
        { label: 'Tingkat Mortalitas', value: '1,6%', change: 'Aman', isPositive: true, subtext: 'Standar Industri < 3.5%' }
      ],
      chartTitle: 'Grafik Pertumbuhan Bobot Ayam vs Kurva Standar Strain (Gram)',
      chartData: [
        { name: 'Hari 5', actual: 145, target: 135 },
        { name: 'Hari 10', actual: 330, target: 310 },
        { name: 'Hari 15', actual: 620, target: 590 },
        { name: 'Hari 20', actual: 1060, target: 1010 },
        { name: 'Hari 24', actual: 1420, target: 1380 }
      ],
      tableTitle: 'Kondisi Kandang Closed House (Live IoT Sensor Feed)',
      tableHeaders: ['Kandang', 'Suhu (°C)', 'Kelembapan', 'Gas Amonia', 'FCR Status', 'Status AI'],
      tableRows: [
        { 'Kandang': 'House 01 (Closed)', 'Suhu (°C)': '28,2°C', 'Kelembapan': '65%', 'Gas Amonia': '8 ppm', 'FCR Status': '1,39', 'Status AI': 'Optimal' },
        { 'Kandang': 'House 02 (Closed)', 'Suhu (°C)': '28,5°C', 'Kelembapan': '68%', 'Gas Amonia': '9 ppm', 'FCR Status': '1,40', 'Status AI': 'Optimal' },
        { 'Kandang': 'House 03 (Closed)', 'Suhu (°C)': '31,5°C', 'Kelembapan': '78%', 'Gas Amonia': '18 ppm', 'FCR Status': '1,48', 'Status AI': '⚠️ Suhu & Amonia Tinggi - Exhaust Fan Nyala' }
      ],
      aiInsightBanner: '💡 AI Farm Advisory: Kinerja FCR House 01 sangat unggul (1,39). Disarankan penambahan durasi siklus exhaust fan di House 03 untuk menekan amonia.'
    },
    benefits: [
      'Mengurangi risiko kerugian fatal akibat heat stroke dan kematian massal.',
      'Efisiensi biaya pakan hingga puluhan juta rupiah per siklus panen.',
      'Laporan real-time transparan untuk manajemen kemitraan inti-plasma.'
    ],
    useCases: [
      { id: 'ucpo1', title: 'Pencegahan Heat Stroke di Kandang Siang Hari', scenario: 'Suhu siang hari melonjak ekstrem hingga 32°C di kandang 3 akibat cuaca terik.', aiRole: 'AI IoT mengirimkan alarm darurat ke HP anak kandang dan menyalakan evaporative cooling pad otomatis.', outcome: 'Suhu stabil ke 28°C dalam 15 menit, menyelamatkan 20.000 ekor ayam dari kematian.' }
    ],
    integrations: ['Sensor Suhu/Amonia/RH IoT', 'Timbangan Digital TPH', 'Sistem Kemitraan Sapronak ERP', 'WhatsApp Notification Gateway'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'Mobile PWA'] },
      { category: 'Backend', stack: ['Express.js', 'MQTT IoT Protocol', 'PostgreSQL'] }
    ],
    relatedSlugs: ['plantation', 'shrimp-farming', 'fish-farming'],
    cta: { buildText: 'Bangun Software Peternakan Ayam', consultText: 'Konsultasi Peternakan Ayam', estimateText: 'Hitung Estimasi Biaya' }
  },

  // 6. SHRIMP FARMING
  {
    slug: 'shrimp-farming',
    name: 'Shrimp Farming',
    subtitle: 'Smart Tambak Udang Vaname & Aquaculture Analytics',
    category: 'Aquaculture',
    isFeatured: false,
    published: true,
    icon: '🦐',
    heroTagline: 'Sistem Manajemen Tambak Udang Vaname Berbasis Sensor Water Quality & AI',
    heroDescription:
      'Optimalkan budidaya udang vaname dengan monitoring kincir/oksigen terlarut (DO), pH, salinitas, FCR pakan, sampling MBW, hingga estimasi tonase panen.',
    metaTitle: 'Software Tambak Udang Vaname & Water Quality AI | SMART-AI.ID',
    metaDescription: 'Solusi manajemen tambak udang vaname terintegrasi sensor DO, MBW sampling, FCR calculator, dan AI Aquaculture Copilot.',
    problems: [
      { id: 'sfp1', title: 'Drop Oksigen Terlarut (DO) & Kematian Massal', description: 'Penurunan DO secara mendadak di malam hari sering tidak terdeteksi hingga udang mati di dasar kolam.', impact: 'Kerugian gagal panen total bernilai ratusan juta rupiah per kolam.', solutionHighlight: 'IoT Sensor DO real-time dengan Alarm Dini AI.' }
    ],
    solutionOverview: 'Platform akuakultur pintar khusus tambang udang vaname yang menghubungkan sensor DO/pH, kontrol pakan auto-feeder, dan AI Growth Modeling.',
    businessImpactSummary: ['Tingkat Kelangsungan Hidup (SR) Naik hingga 88%', 'Optimasi FCR Pakan Udang di bawah 1,3', 'Pencegahan Dini Penyakit WSSV/AHPND'],
    modules: [
      { id: 'sfm1', name: 'Water Quality IoT Stream', description: 'Monitoring DO, pH, Salinitas, Suhu, dan ORP kolam 24/7.', iconName: 'Waves', aiBadge: 'IoT AI' },
      { id: 'sfm2', name: 'Feed & Auto-Feeder Schedule', description: 'Pengaturan pakan berdasarkan MBW (Mean Body Weight) dan anco.', iconName: 'Sliders' }
    ],
    aiFeatures: [
      { id: 'sff1', name: 'AI Survival Rate (SR) Estimator', description: 'Estimasi jumlah udang hidup di dasar kolam berdasarkan sampling dan konsumsi pakan.', iconName: 'BarChart2', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Tebar Benur', desc: 'Pencatatan jumlah benur dan estimasi awal.', icon: 'Check' },
      { step: 2, title: 'Sampling & Pakan', desc: 'Sampling rutin MBW dan penyesuaian pakan.', icon: 'Sliders' },
      { step: 3, title: 'Panen Parsial/Total', desc: 'Penjualan ke cold storage berdasarkan size udang.', icon: 'Truck' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Kolam Aktif', value: '12 Kolam', change: 'DOC 65 Hari', isPositive: true, subtext: 'Luas Total 4,2 Ha' },
        { label: 'Rata-rata Size Udang', value: 'Size 52', change: '+12%', isPositive: true, subtext: 'MBW 19,2 gram' },
        { label: 'Kadar Oksigen (DO)', value: '5,8 mg/L', change: 'Aman', isPositive: true, subtext: 'Batas Kritis < 4.0' },
        { label: 'Estimasi Survival Rate (SR)', value: '86,4%', change: '+3,1%', isPositive: true, subtext: 'Target Panen 22 Ton' }
      ],
      chartTitle: 'Laju Pertumbuhan Udang (MBW Gram) per Minggu',
      chartData: [
        { name: 'DOC 20', actual: 3.2, target: 3.0 },
        { name: 'DOC 35', actual: 7.8, target: 7.5 },
        { name: 'DOC 50', actual: 13.5, target: 13.0 },
        { name: 'DOC 65', actual: 19.2, target: 18.5 }
      ],
      tableTitle: 'Kondisi Kualitas Air Kolam Tambak (Live Stream)',
      tableHeaders: ['Kolam ID', 'DO (mg/L)', 'pH', 'Salinitas', 'Status Anco', 'Rekomendasi AI'],
      tableRows: [
        { 'Kolam ID': 'Kolam A1', 'DO (mg/L)': '6,2', 'pH': '7,8', 'Salinitas': '18 ppt', 'Status Anco': 'Habis Bersih', 'Rekomendasi AI': 'Naikkan Pakan 5%' },
        { 'Kolam ID': 'Kolam B2', 'DO (mg/L)': '4,1', 'pH': '8,2', 'Salinitas': '20 ppt', 'Status Anco': 'Sisa Pakan 10%', 'Rekomendasi AI': '⚠️ Hidupkan Kincir Cadangan' }
      ],
      aiInsightBanner: '💡 AI Aquaculture Advisory: Kolam B2 menunjukkan penurunan DO ke 4.1 mg/L. Kincir tambahan direkomendasikan menyala sebelum pukul 22:00.'
    },
    benefits: ['Meningkatkan kepastian hasil panen udang.', 'Menghemat pengeluaran pakan porsi terbesar.'],
    useCases: [
      { id: 'ucsf1', title: 'Pencegahan Drop Oksigen Dini', scenario: 'Listrik PLN padam dan genset lambat otomatis menyala.', aiRole: 'AI mengirimkan panggilan darurat ke HP Manajer Tambak.', outcome: 'Genset dinyalakan dalam 4 menit, menyelematkan 5 kolam udang.' }
    ],
    integrations: ['Sensor DO/pH IoT', 'Auto-Feeder Machine', 'Digital Scale'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Node.js', 'MQTT IoT'] }
    ],
    relatedSlugs: ['fish-farming', 'poultry', 'plantation'],
    cta: { buildText: 'Bangun Software Tambak Udang', consultText: 'Konsultasi Tambak Udang', estimateText: 'Hitung Estimasi Biaya' }
  },

  // 7. FISH FARMING
  {
    slug: 'fish-farming',
    name: 'Fish Farming',
    subtitle: 'Smart Freshwater & Marine Fish Aquaculture System',
    category: 'Aquaculture',
    isFeatured: false,
    published: true,
    icon: '🐟',
    heroTagline: 'Solusi Manajemen Budidaya Ikan Nila, Gurame, & Lele Terintegrasi',
    heroDescription:
      'Kelola kolam ikan darat & Keramba Jaring Apung (KJA), pakan otomatis, monitoring kualitas air, dan estimasi tanggal panen ikan.',
    metaTitle: 'Software Budidaya Ikan & Fish Farm AI | SMART-AI.ID',
    metaDescription: 'Solusi manajemen budidaya ikan Nila/Lele/Gurame dengan FCR Calculator, Water Quality IoT, dan AI Harvest Predictor.',
    problems: [
      { id: 'ffp1', title: 'Pertumbuhan Ikan Tidak Merata (Heterogen)', description: 'Ukuran ikan bervariasi tajam dalam satu kolam akibat persaingan pakan.', impact: 'Harga jual turun karena persentase ikan ukuran kerdil tinggi.', solutionHighlight: 'Sorting Schedule & Feed Distribution Suggester AI.' }
    ],
    solutionOverview: 'Sistem budidaya ikan terpadu untuk monitoring kolam, pakan, penyakit, dan pencatatan panen.',
    businessImpactSummary: ['Keseragaman Ukuran Ikan mencapai 92%', 'EFCR Pakan Lebih Hemat 12%', 'Pencatatan Keuangan Kolam Transparan'],
    modules: [
      { id: 'ffm1', name: 'Pond & KJA Management', description: 'Data dimensi kolam, volume air, dan benih ikan.', iconName: 'Box' },
      { id: 'ffm2', name: 'Growth Sampling & Feed Index', description: 'Monitoring sampling bobot dan penyesuaian pakan.', iconName: 'Scale' }
    ],
    aiFeatures: [
      { id: 'fff1', name: 'AI Fish Growth Simulator', description: 'Memprediksi bobot panen ikan berdasarkan suhu air dan nutrisi pakan.', iconName: 'TrendingUp', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Tebar Benih', desc: 'Pencatatan ukuran benih awal.', icon: 'Check' },
      { step: 2, title: 'Pemberian Pakan', desc: 'Pengaturan rasio pakan harian.', icon: 'Sliders' },
      { step: 3, title: 'Panen & Penjualan', desc: 'Pemasaran ke pedagang besar atau pasar modern.', icon: 'Truck' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Kolam Nila', value: '24 Kolam', change: 'Aktif', isPositive: true, subtext: 'KJA & Kolam Tanah' },
        { label: 'Rata-Rata ABW Ikan', value: '320 gram', change: '+8,5%', isPositive: true, subtext: 'Target Panen 400g' },
        { label: 'FCR Pakan Ikan', value: '1,28', change: 'Optimal', isPositive: true, subtext: 'Hemat Pakan' },
        { label: 'Estimasi Tonase Panen', value: '18,5 Ton', change: 'Bulan Depan', isPositive: true, subtext: 'Siap Jual' }
      ],
      chartTitle: 'Proyeksi Laju Pertumbuhan Ikan Nila per Kolam',
      chartData: [
        { name: 'Bulan 1', actual: 50, target: 45 },
        { name: 'Bulan 2', actual: 140, target: 130 },
        { name: 'Bulan 3', actual: 240, target: 230 },
        { name: 'Bulan 4', actual: 320, target: 310 }
      ],
      tableTitle: 'Daftar Kolam Budidaya Ikan Nila',
      tableHeaders: ['Kolam ID', 'Jenis Ikan', 'Populasi', 'ABW Saat Ini', 'Estimasi Panen', 'Status AI'],
      tableRows: [
        { 'Kolam ID': 'Nila-01', 'Jenis Ikan': 'Nila Merah', 'Populasi': '15.000 Ekor', 'ABW Saat Ini': '340g', 'Estimasi Panen': '12 Hari Lagi', 'Status AI': 'Siap Panen' },
        { 'Kolam ID': 'Nila-04', 'Jenis Ikan': 'Nila Hitam', 'Populasi': '20.000 Ekor', 'ABW Saat Ini': '210g', 'Estimasi Panen': '45 Hari Lagi', 'Status AI': 'Optimal' }
      ],
      aiInsightBanner: '💡 AI Fish Farm Advisory: Kolam Nila-01 sudah mencapai bobot komersial (340g). Penjualan disarankan dimulai minggu ini.'
    },
    benefits: ['Akurasi estimasi tanggal panen.', 'Pengendalian biaya operasional pakan.'],
    useCases: [
      { id: 'ucff1', title: 'Penentuan Waktu Panen Harga Terbaik', scenario: 'Harga ikan nila melambung menjelang hari raya.', aiRole: 'AI mensimulasikan percepatan pemberian pakan agar ikan siap panen tepat waktu.', outcome: 'Margin keuntungan naik 25%.' }
    ],
    integrations: ['Automatic Feeder', 'Water Quality Tester'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js'] }
    ],
    relatedSlugs: ['shrimp-farming', 'poultry'],
    cta: { buildText: 'Bangun Software Budidaya Ikan', consultText: 'Konsultasi Budidaya Ikan', estimateText: 'Hitung Estimasi' }
  },

  // 8. HOSPITAL
  {
    slug: 'hospital',
    name: 'Hospital',
    subtitle: 'Enterprise SIMRS & Clinical AI Analytics Platform',
    category: 'Healthcare',
    isFeatured: true,
    published: true,
    icon: '🏥',
    heroTagline: 'Sistem Informasi Manajemen Rumah Sakit (SIMRS) Generasi Baru',
    heroDescription:
      'Platform SIMRS terpadu standar Kemkes (SatuSehat BPJS) mengintegrasikan Rawat Jalan, Rawat Inap, IGD, Farmasi, Laboratorium, Radiologi, hingga Billing.',
    metaTitle: 'SIMRS Enterprise & Clinical AI Hospital Software | SMART-AI.ID',
    metaDescription: 'Solusi SIMRS terintegrasi BPJS VClaim, SatuSehat, Farmasi, EMR, dan AI Hospital Command Center.',
    problems: [
      { id: 'hp1', title: 'Antrean Poliklinik Membludak & Waktu Tunggu Lama', description: 'Pasien menumpuk di pendaftaran dan poliklinik karena proses verifikasi berkas BPJS manual.', impact: 'Penurunan skor kepuasan pasien dan keluhan publik.', solutionHighlight: 'Anjungan Mandiri & Queue Management AI Suggester.' },
      { id: 'hp2', title: 'Klaim BPJS Terhambat (Pending Claim)', description: 'Berkas rekam medis dan koding ICD-10/ICD-9 tidak cocok saat diunggah ke e-Klaim.', impact: 'Cashflow rumah sakit tertahan hingga milyaran rupiah.', solutionHighlight: 'e-Klaim Pre-Validator AI untuk mendeteksi potensi dispute klaim.' }
    ],
    solutionOverview: 'Sistem SIMRS modular dengan arsitektur mikro, integrasi SatuSehat Kemenkes, BPJS Antrean & VClaim, dan AI Executive Dashboard.',
    businessImpactSummary: ['Penurunan Waktu Tunggu Pasien hingga 60%', 'Klaim BPJS Lolos Verifikasi Pertama 96%', 'Integrasi 100% BPJS & SatuSehat'],
    modules: [
      { id: 'hm1', name: 'Outpatient & Inpatient EMR', description: 'Rekam Medis Elektronik (RME) dokter & perawat standar ICD-10.', iconName: 'FileText', aiBadge: 'RME AI' },
      { id: 'hm2', name: 'Pharmacy & Drug Inventory', description: 'Resep elektronik, depo obat, stok opname, dan peringatan Kadaluarsa.', iconName: 'Pill' },
      { id: 'hm3', name: 'BPJS VClaim & SatuSehat Connector', description: 'Bridge otomatis BPJS VClaim, Mobile JKN, dan SatuSehat Kemkes.', iconName: 'ShieldCheck' },
      { id: 'hm4', name: 'Billing & Cashier Integrated', description: 'Pembayaran tunai, asuransi swasta, BPJS, dan kasir terpusat.', iconName: 'CreditCard' }
    ],
    aiFeatures: [
      { id: 'hf1', name: 'AI BPJS Dispute Predictor', description: 'Menganalisis potensi penolakan klaim BPJS sebelum berkas dikirim ke verifikator.', iconName: 'AlertCircle', type: 'Anomaly Detection' },
      { id: 'hf2', name: 'AI Patient Volume Forecaster', description: 'Memproyeksikan lonjakan pasien poliklinik untuk alokasi dokter dan perawat.', iconName: 'TrendingUp', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Pendaftaran Online / Anjungan', desc: 'Pasien mendaftar via Mobile JKN atau Kios KMandiri.', icon: 'Smartphone' },
      { step: 2, title: 'Pemeriksaan Dokter (RME)', desc: 'Dokter mengisi rekam medis elektronik dan resep digital.', icon: 'FileText' },
      { step: 3, title: 'Pelayanan Farmasi / Lab', desc: 'Petugas memproses resep dan tes lab terhubung SIMRS.', icon: 'Pill' },
      { step: 4, title: 'Billing & e-Klaim BPJS', desc: 'Koding ICD otomatis dan verifikasi klaim BPJS.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Kunjungan Pasien Hari Ini', value: '1.480 Pasien', change: '+15,2%', isPositive: true, subtext: 'R.Jalan 1.200 | IGD 80 | R.Inap 200' },
        { label: 'Bed Occupancy Rate (BOR)', value: '78,5%', change: '+3,1%', isPositive: true, subtext: 'Ideal (Standard 60-80%)' },
        { label: 'Rata-rata Waktu Tunggu Poli', value: '14 Menit', change: '-45%', isPositive: true, subtext: 'Target < 30 Menit' },
        { label: 'BPJS Claim Accuracy', value: '98,2%', change: '+4,0%', isPositive: true, subtext: 'Bebas Dispute' }
      ],
      chartTitle: 'Jumlah Kunjungan Pasien Poliklinik (Minggu Ini)',
      chartData: [
        { name: 'Poli Penyakit Dalam', actual: 420, target: 400 },
        { name: 'Poli Anak', actual: 310, target: 300 },
        { name: 'Poli Kebidanan', actual: 280, target: 250 },
        { name: 'Poli Bedah', actual: 190, target: 200 }
      ],
      tableTitle: 'Status Ketersediaan Tempat Tidur Rawat Inap (Live BOR)',
      tableHeaders: ['Kamar / Bangsal', 'Kelas Kamar', 'Kapasitas', 'Terisi', 'Tersedia', 'Status AI'],
      tableRows: [
        { 'Kamar / Bangsal': 'Bangsal Melati', 'Kelas Kamar': 'Kelas 1', 'Kapasitas': '20 Bed', 'Terisi': '18 Bed', 'Tersedia': '2 Bed', 'Status AI': 'Hampir Penuh' },
        { 'Kamar / Bangsal': 'Bangsal Mawar', 'Kelas Kamar': 'Kelas 3', 'Kapasitas': '40 Bed', 'Terisi': '32 Bed', 'Tersedia': '8 Bed', 'Status AI': 'Optimal' }
      ],
      aiInsightBanner: '💡 AI Hospital Insight: Poliklinik Penyakit Dalam mengalami puncak antrean antara pukul 09:00 - 11:00. Disarankan penambahan 1 loket verifikasi.'
    },
    benefits: ['Kepatuhan 100% terhadap regulasi RME Kemenkes.', 'Proses klaim BPJS lebih cepat cair.'],
    useCases: [
      { id: 'uch1', title: 'Penguraian Antrean Poliklinik', scenario: 'Poliklinik mata diserbu 200 pasien BPJS di pagi hari.', aiRole: 'AI Antrean mengarahkan pasien terverifikasi langsung ke ruang tunggu dokter tanpa antre kasir.', outcome: 'Waktu tunggu terpangkas dari 2 jam menjadi 20 menit.' }
    ],
    integrations: ['BPJS VClaim & Mobile JKN', 'SatuSehat Kemenkes API', 'LIS (Lab Info System)', 'PACS Radiologi'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js', 'PostgreSQL (HIPAA/Data Isolation)'] }
    ],
    relatedSlugs: ['dental-clinic', 'midwife-clinic', 'school'],
    cta: { buildText: 'Bangun SIMRS Hospital', consultText: 'Konsultasi SIMRS Rumah Sakit', estimateText: 'Hitung Estimasi SIMRS' }
  },

  // 9. DENTAL CLINIC
  {
    slug: 'dental-clinic',
    name: 'Dental Clinic',
    subtitle: 'Smart Dental Practice & Odontogram Management System',
    category: 'Healthcare',
    isFeatured: false,
    published: true,
    icon: '🦷',
    heroTagline: 'Software Klinik Gigi Modern dengan Odontogram Digital & Reminder AI',
    heroDescription:
      'Kelola praktik dokter gigi, odontogram digital interaktif, rencana perawatan, stok bahan medis gigi, dan asisten pengingat kontrol pasien.',
    metaTitle: 'Software Klinik Gigi & Odontogram Digital AI | SMART-AI.ID',
    metaDescription: 'Solusi aplikasi klinik gigi terintegrasi Odontogram Digital, Rekam Medis Gigi, Billing, dan WhatsApp AI Reminder.',
    problems: [
      { id: 'dp1', title: 'Pasien Lupa Jadwal Kontrol Behel / Perawatan', description: 'Tingkat kedatangan pasien kontrol ulang rendah karena tidak ada sistem reminder otomatis.', impact: 'Pendapatan berulang klinik terbuang dan perawatan pasien terhambat.', solutionHighlight: 'WhatsApp AI Reminder Assistant otomatis.' }
    ],
    solutionOverview: 'Sistem khusus klinik gigi dengan fitur Odontogram 2D/3D interaktif, modul perawatan, dan AI Patient Retention.',
    businessImpactSummary: ['Kenaikan Kedatangan Pasien Kontrol hingga 35%', 'Rekam Medis Odontogram Rapi & Cepat', 'Manajemen Stok Bahan Gigi Presisi'],
    modules: [
      { id: 'dm1', name: 'Interactive Digital Odontogram', description: 'Pencatatan kondisi gigi (tambal, karies, behel, cabut) secara visual.', iconName: 'Activity', aiBadge: 'Visual' },
      { id: 'dm2', name: 'Treatment Plan & Cost Estimator', description: 'Penyusunan rencana tindakan gigi dan rincian biaya transparan.', iconName: 'FileText' }
    ],
    aiFeatures: [
      { id: 'df1', name: 'AI Dental Recall Assistant', description: 'Mengirimkan pesan reminder kontrol gigi berkala via WhatsApp secara otomatis.', iconName: 'MessageSquare', type: 'Copilot' }
    ],
    workflowSteps: [
      { step: 1, title: 'Booking Pasien', desc: 'Pasien memilih dokter gigi dan jam kunjung.', icon: 'Calendar' },
      { step: 2, title: 'Pemeriksaan & Odontogram', desc: 'Dokter memperbarui odontogram digital.', icon: 'Activity' },
      { step: 3, title: 'Tindakan & Kasir', desc: 'Pembayaran dan cetak rekam tindakan.', icon: 'CreditCard' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Pasien Hari Ini', value: '28 Pasien', change: '+20%', isPositive: true, subtext: '18 Kontrol | 10 Baru' },
        { label: 'Tingkat Kehadiran Booking', value: '92%', change: '+5%', isPositive: true, subtext: 'Berkat WA Reminder' },
        { label: 'Pendapatan Klinik (Bulan Ini)', value: 'Rp 85,4 Juta', change: '+12,5%', isPositive: true, subtext: 'Target Rp 80 Juta' },
        { label: 'Stok Bahan Komposit Gigi', value: 'Aman', change: '8 Tube', isPositive: true, subtext: 'Cukup 3 Minggu' }
      ],
      chartTitle: 'Jenis Perawatan Gigi Paling Populer (Bulan Ini)',
      chartData: [
        { name: 'Pembersihan Karang (Scaling)', actual: 85, target: 70 },
        { name: 'Penambalan Komposit', actual: 64, target: 50 },
        { name: 'Kontrol Behel (Orthodontic)', actual: 110, target: 100 },
        { name: 'Pencabutan Gigi', actual: 22, target: 20 }
      ],
      tableTitle: 'Jadwal Janji Temu Dokter Gigi Hari Ini',
      tableHeaders: ['Waktu', 'Nama Pasien', 'Dokter Gigi', 'Tindakan', 'Status Reminder', 'Status AI'],
      tableRows: [
        { 'Waktu': '09:00', 'Nama Pasien': 'Siti Rahma', 'Dokter Gigi': 'drg. Anisa Sp.Ort', 'Tindakan': 'Kontrol Behel', 'Status Reminder': 'Terkirim WA', 'Status AI': 'Konfirmasi Hadir' },
        { 'Waktu': '10:30', 'Nama Pasien': 'Budi Pekerti', 'Dokter Gigi': 'drg. Hendra', 'Tindakan': 'Scaling', 'Status Reminder': 'Terkirim WA', 'Status AI': 'Konfirmasi Hadir' }
      ],
      aiInsightBanner: '💡 AI Clinic Advisory: 85% pasien behel yang mendapatkan reminder WhatsApp H-1 mengonfirmasi kehadiran tepat waktu.'
    },
    benefits: ['Odontogram standar ICD-10 kesehatan gigi.', 'Loyalitas pasien meningkat.'],
    useCases: [
      { id: 'ucd1', title: 'Peningkatan Pasien Scalling Berkala 6 Bulan', scenario: 'Pasien yang sudah 6 bulan tidak scaling terdeteksi oleh sistem.', aiRole: 'AI Reminder mengirimkan voucher diskon scaling via WhatsApp.', outcome: '32 pasien lama datang kembali berkat penawaran otomatis.' }
    ],
    integrations: ['WhatsApp Gateway API', 'X-Ray Dental Imaging (PACS)'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js'] }
    ],
    relatedSlugs: ['hospital', 'midwife-clinic'],
    cta: { buildText: 'Bangun Software Klinik Gigi', consultText: 'Konsultasi Klinik Gigi', estimateText: 'Hitung Estimasi' }
  },

  // 10. MIDWIFE CLINIC
  {
    slug: 'midwife-clinic',
    name: 'Midwife Clinic',
    subtitle: 'Smart Midwifery Practice & Maternal Care Assistant',
    category: 'Healthcare',
    isFeatured: false,
    published: true,
    icon: '🤱',
    heroTagline: 'Sistem Informasi Praktek Mandiri Bidan (PMB) & Kesehatan Ibu Anak',
    heroDescription:
      'Kelola pelayanan kebidanan, kartu KMS ibu hamil, buku KIA digital, jadwal imunisasi bayi, persalinan, KB, dan laporan bulanan dinas kesehatan.',
    metaTitle: 'Software Klinik Bidan Mandiri (PMB) & Buku KIA Digital | SMART-AI.ID',
    metaDescription: 'Solusi aplikasi Bidan Mandiri dengan Buku KIA Digital, Jadwal Imunisasi AI, Rekam Medis Ibu Anak, dan Laporan Dinkes.',
    problems: [
      { id: 'mp1', title: 'Laporan Bulanan Dinkes Rawan Ketinggalan', description: 'Pengisian buku KIA dan rekap Kohort Ibu/Bayi manual memakan waktu bidan setiap akhir bulan.', impact: 'Laporan administratif tertunda dan data ibu hamil berisiko tidak terpantau.', solutionHighlight: 'Rekap Kohort & Laporan Dinkes Otomatis 1-Klik.' }
    ],
    solutionOverview: 'Sistem khusus bidan mandiri yang menyederhanakan pencatatan kehamilan (ANC), persalinan, imunisasi, dan kontrasepsi KB.',
    businessImpactSummary: ['Laporan Bulanan Kohort Dinkes Selesai 1-Klik', 'Pengingat Imunisasi Bayi Otomatis', 'Pencatatan Keuangan Bidan Rapi'],
    modules: [
      { id: 'mm1', name: 'Maternal ANC & Pregnancy Care', description: 'Kartu periksa hamil, HPHT, HPL, dan grafik TFU.', iconName: 'Heart', aiBadge: 'KIA Digital' },
      { id: 'mm2', name: 'Child Immunization & Growth (KMS)', description: 'Tracking jadwal imunisasi dan kurva tumbuh kembang WHO.', iconName: 'Baby' }
    ],
    aiFeatures: [
      { id: 'mf1', name: 'AI Immunization & ANC Reminder', description: 'Mengirimkan pesan pengingat jadwal periksa hamil dan imunisasi anak ke HP ibu.', iconName: 'MessageSquare', type: 'Copilot' }
    ],
    workflowSteps: [
      { step: 1, title: 'Registrasi Ibu Hamil', desc: 'Pencatatan HPHT dan estimasi tanggal lahir.', icon: 'UserPlus' },
      { step: 2, title: 'Pemeriksaan Rutin (ANC)', desc: 'Pemeriksaan tensi, berat badan, dan denyut jantung janin.', icon: 'Heart' },
      { step: 3, title: 'Persalinan & KB', desc: 'Pencatatan persalinan aman dan layanan KB.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Ibu Hamil Dipantau (ANC)', value: '142 Ibu', change: 'Aktif', isPositive: true, subtext: '24 Resti (Risiko Tinggi)' },
        { label: 'Kunjungan Imunisasi Bulan Ini', value: '85 Bayi', change: '+10%', isPositive: true, subtext: 'Lengkap' },
        { label: 'Persalinan Bulan Ini', value: '12 Persalinan', change: 'Aman', isPositive: true, subtext: '100% Selamat' },
        { label: 'Laporan Dinkes Kohort', value: 'Ready', change: '100%', isPositive: true, subtext: 'Siap Kirim' }
      ],
      chartTitle: 'Status Kategori Risiko Ibu Hamil (ANC)',
      chartData: [
        { name: 'KRR (Risiko Rendah)', actual: 118, target: 100 },
        { name: 'KRT (Risiko Tinggi)', actual: 20, target: 15 },
        { name: 'KRST (Sangat Tinggi)', actual: 4, target: 2 }
      ],
      tableTitle: 'Daftar Ibu Hamil mendekati Hari Perkiraan Lahir (HPL)',
      tableHeaders: ['Nama Ibu', 'Umur', 'Usia Kehamilan', 'HPL', 'Kategori KRR/KRT', 'Status AI'],
      tableRows: [
        { 'Nama Ibu': 'Ny. Maria', 'Umur': '28 Thn', 'Usia Kehamilan': '38 Minggu', 'HPL': '18 Ags 2026', 'Kategori KRR/KRT': 'KRR', 'Status AI': 'Siap Siaga' },
        { 'Nama Ibu': 'Ny. Dewi', 'Umur': '36 Thn', 'Usia Kehamilan': '37 Minggu', 'HPL': '25 Ags 2026', 'Kategori KRR/KRT': 'KRT (Hipertensi)', 'Status AI': '⚠️ Butuh Pantauan Tensi' }
      ],
      aiInsightBanner: '💡 AI Midwife Notice: Ny. Dewi masuk kategori KRT. Pengingat pemeriksaan tensi dikirimkan via WhatsApp.'
    },
    benefits: ['Mencegah ibu hamil terlewat tanggal periksa.', 'Keamanan data pasien terjamin.'],
    useCases: [
      { id: 'ucm1', title: 'Pemantauan Ibu Hamil Risiko Tinggi (Resti)', scenario: 'Ibu hamil dengan riwayat hipertensi mendekati HPL.', aiRole: 'AI memberikan peringatan ke Bidan untuk melakukan kunjungan rumah.', outcome: 'Ibu hamil dapat dirujuk ke RS tepat waktu.' }
    ],
    integrations: ['WhatsApp Gateway', 'Laporan e-Kohort Kemenkes'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js'] }
    ],
    relatedSlugs: ['dental-clinic', 'hospital', 'familyhub'],
    cta: { buildText: 'Bangun Software Bidan Mandiri', consultText: 'Konsultasi Bidan Mandiri', estimateText: 'Hitung Estimasi' }
  },

  // 11. SMART CLINIC / KLINIK PRATAMA & UTAMA
  {
    slug: 'clinic',
    name: 'Klinik (Smart Clinic)',
    subtitle: 'Smart Multi-Poli Clinic Management & SATUSEHAT Integration',
    category: 'Healthcare',
    isFeatured: true,
    published: true,
    icon: '🩺',
    heroTagline: 'Sistem Informasi Manajemen Klinik Pratama, Utama & Multi-Poli Berbasis AI',
    heroDescription:
      'Solusi digitalisasi operasional klinik komprehensif: Reservasi online, antrean cerdas poli dokter (Display TV & WhatsApp), Rekam Medis Elektronik (RME) standar Kemenkes SATUSEHAT, modul kasir & tarif tindakan medis, depo farmasi klinik, dan kalkulasi otomatis bagi hasil dokter.',
    metaTitle: 'Software Klinik Medis & RME SATUSEHAT AI | SMART-AI.ID',
    metaDescription: 'Solusi SIM Klinik Pratama & Utama terintegrasi RME Kemenkes SATUSEHAT, Antrean Pasien Online, Kasir Billing, Farmasi, dan AI Clinical Assistant.',
    problems: [
      { id: 'clp1', title: 'Antrean Pasien Menumpuk & Waktu Tunggu Tidak Pasti', description: 'Pasien datang bersamaan di jam sibuk tanpa nomor antrean terpusat, menimbulkan kepadatan ruang tunggu.', impact: 'Pasien membatalkan kunjungan dan ulasan reputasi klinik menurun.', solutionHighlight: 'Sistem Antrean Cerdas WhatsApp & Layar TV Multi-Poli dengan estimasi menit real-time.' },
      { id: 'clp2', title: 'Kewajiban Rekam Medis Elektronik (RME) SATUSEHAT Kemenkes', description: 'Banyak klinik masih memakai rekam medis kertas manual yang rentan hilang, rusak, dan melanggar regulasi Kemenkes.', impact: 'Sanksi akreditasi klinik dan risiko malpraktik akibat riwayat alergi pasien tidak terbaca.', solutionHighlight: 'RME Standar SATUSEHAT FHIR Interoperability dengan Voice-to-Text AI Assistant.' },
      { id: 'clp3', title: 'Perhitungan Komisi & Bagi Hasil Dokter Rumit', description: 'Rekap manual lembar tindakan medis per dokter setiap akhir bulan memakan waktu berhari-hari dan rawan selisih.', impact: 'Ketidakpuasan dokter mitra dan potensi kebocoran pendapatan klinik.', solutionHighlight: 'Kalkulator Bagi Hasil Jasa Medis Otomatis per Tindakan & Obat.' }
    ],
    solutionOverview: 'Platform manajemen klinik modern berbasis cloud yang menyatukan resepsionis, ruang periksa dokter, kasir kasir, apotek klinik, laboratorium, dan pelaporan eksekutif pemilik klinik.',
    businessImpactSummary: [
      'Kepatuhan 100% Regulasi RME Kemenkes RI (SATUSEHAT Ready)',
      'Waktu Tunggu Pasien Berkurang 55%',
      'Laporan Keuangan & Bagi Hasil Dokter Real-Time 1-Klik',
      'Peningkatan Pasien Kembali (Retention) hingga 30%'
    ],
    modules: [
      { id: 'clm1', name: 'Smart Queue & Online Appointment', description: 'Pendaftaran mandiri via WhatsApp/Website, tiket antrean QR, dan integrasi layar display poli.', iconName: 'Users', aiBadge: 'Queue AI' },
      { id: 'clm2', name: 'Rekam Medis Elektronik (RME) Standar Kemenkes', description: 'Anamnesis, diagnosis ICD-10, tindakan ICD-9-CM, riwayat alergi, dan tanda vital terstandarisasi.', iconName: 'FileText', aiBadge: 'RME AI' },
      { id: 'clm3', name: 'E-Prescription & Pharmacy Depot', description: 'Dokter meresepkan obat langsung dari ruang periksa, stok obat otomatis terpotong di depo farmasi.', iconName: 'Pill' },
      { id: 'clm4', name: 'Cashier, Billing & Fee Sharing Dokter', description: 'Kasir multi-payment (QRIS, Kartu, Asuransi, Tunai) dengan pembagian jasa medis dokter otomatis.', iconName: 'CreditCard' },
      { id: 'clm5', name: 'SATUSEHAT & BPJS PCare Connector', description: 'Jembatan data bridge resmi ke server Kemenkes SATUSEHAT dan BPJS PCare secara aman.', iconName: 'ShieldCheck' }
    ],
    aiFeatures: [
      { id: 'clf1', name: 'AI Voice-to-Text Clinical Scribe', description: 'Mendengarkan konsultasi dokter dan otomatis mentranskripsikan ke dalam format SOAP Rekam Medis terstruktur.', iconName: 'Mic', type: 'Copilot' },
      { id: 'clf2', name: 'AI Drug Interaction & Allergy Warning', description: 'Memberikan peringatan instan jika obat yang diresepkan berinteraksi negatif dengan riwayat alergi atau obat lain pasien.', iconName: 'AlertTriangle', type: 'Alerts' },
      { id: 'clf3', name: 'AI Patient Visit Forecaster & Doctor Scheduler', description: 'Memprediksi lonjakan kunjungan pasien per hari untuk optimasi jadwal jaga dokter dan staf perawat.', iconName: 'TrendingUp', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Registrasi & Ambil Nomor Antrean', desc: 'Pasien mendaftar online atau scan QR di kiosk pendaftaran klinik.', icon: 'QrCode' },
      { step: 2, title: 'Triage & Vital Signs Perawat', desc: 'Perawat menginput tensi, suhu, berat badan ke dalam RME.', icon: 'Activity' },
      { step: 3, title: 'Pemeriksaan Dokter & E-Resep', desc: 'Dokter mengisi RME, memilih diagnosis ICD-10, dan menerbitkan resep digital.', icon: 'FileText' },
      { step: 4, title: 'Pengambilan Obat & Pembayaran Kasir', desc: 'Apotek menyiapkan obat dan kasir menerima pembayaran sekaligus menerbitkan kuitansi.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Kunjungan Pasien Hari Ini', value: '184 Pasien', change: '+24%', isPositive: true, subtext: 'Poli Umum 110 | Gigi 42 | Anak 32' },
        { label: 'Rata-rata Waktu Tunggu Pasien', value: '11,5 Menit', change: '-48%', isPositive: true, subtext: 'Standar Layanan Unggul (< 15 Min)' },
        { label: 'Pendapatan Klinik Hari Ini', value: 'Rp 34.650.000', change: '+18,5%', isPositive: true, subtext: 'Tindakan & Farmasi' },
        { label: 'Sinkronisasi SATUSEHAT', value: '100% Berhasil', change: 'Live Connected', isPositive: true, subtext: '184 dari 184 Encounter Terkirim' }
      ],
      chartTitle: 'Distribusi Kunjungan Pasien per Poli (Bulan Ini)',
      chartData: [
        { name: 'Poli Umum', actual: 1250, target: 1100 },
        { name: 'Poli Gigi', actual: 480, target: 400 },
        { name: 'Poli Anak & Imunisasi', actual: 390, target: 350 },
        { name: 'Poli Kandungan (KIA)', actual: 280, target: 250 },
        { name: 'Laboratorium Medis', actual: 210, target: 180 }
      ],
      tableTitle: 'Antrean Poliklinik Dokter Aktif (Real-Time)',
      tableHeaders: ['No Antrean', 'Nama Pasien', 'Poli Tujuan', 'Dokter Praktik', 'Waktu Masuk', 'Status AI'],
      tableRows: [
        { 'No Antrean': 'A-042', 'Nama Pasien': 'Tn. Ahmad Fauzi', 'Poli Tujuan': 'Poli Umum', 'Dokter Praktik': 'dr. Budi Santoso', 'Waktu Masuk': '09:15', 'Status AI': 'Sedang Diperiksa' },
        { 'No Antrean': 'B-018', 'Nama Pasien': 'Ananda Rian (5 Thn)', 'Poli Tujuan': 'Poli Anak', 'Dokter Praktik': 'dr. Sarah Sp.A', 'Waktu Masuk': '09:20', 'Status AI': 'Panggilan Berikutnya' },
        { 'No Antrean': 'G-009', 'Nama Pasien': 'Ny. Melati Indah', 'Poli Tujuan': 'Poli Gigi', 'Dokter Praktik': 'drg. Kevin', 'Waktu Masuk': '09:30', 'Status AI': 'Menunggu di Ruang Tunggu' }
      ],
      aiInsightBanner: '💡 AI Clinical Insight: Poli Umum mengalami kepadatan tertinggi jam 09:00 - 11:00. Disarankan membuka loket triage tambahan dan aktivasi panggilan WhatsApp H-10 menit.'
    },
    benefits: [
      'Rekam medis pasien rapi, aman, dan siap audit akreditasi klinik.',
      'Kepuasan pasien meningkat drastis dengan kepastian estimasi waktu antrean.',
      'Pengelolaan keuangan dan komisi dokter transparan tanpa selisih.'
    ],
    useCases: [
      { id: 'uccl1', title: 'Peringatan Kontraindikasi Obat Otomatis', scenario: 'Dokter meresepkan antibiotik golongan kuinolon untuk pasien yang memiliki riwayat gagal ginjal ringan di data RME.', aiRole: 'AI Clinical Safety langsung memunculkan pop-up peringatan merah dengan opsi dosis penyesuaian.', outcome: 'Dokter mengubah resep ke antibiotik yang aman sebelum obat terlanjur diracik.' }
    ],
    integrations: ['Kemenkes SATUSEHAT FHIR API', 'BPJS PCare & Antrean Online', 'WhatsApp Gateway Resmi', 'Mesin Lab Hematologi & Urine Analyzer'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'PWA Kiosk Screen'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js', 'PostgreSQL (Enkripsi Medis AES-256)'] }
    ],
    relatedSlugs: ['hospital', 'pharmacy', 'dental-clinic', 'midwife-clinic'],
    cta: { buildText: 'Bangun Software Smart Clinic', consultText: 'Konsultasi Solusi Klinik', estimateText: 'Hitung Estimasi Biaya Klinik' }
  },

  // 11.5 SMART AESTHETIC & BEAUTY CLINIC
  {
    slug: 'aesthetic-clinic',
    name: 'Klinik Kecantikan & Estetika',
    subtitle: 'Smart Aesthetic Clinic EMR, Before-After Face Mapping & Treatment Package Management',
    category: 'Healthcare',
    isFeatured: true,
    published: true,
    icon: '✨',
    heroTagline: 'Software Manajemen Klinik Kecantikan & Estetika Medis Berbasis AI',
    heroDescription:
      'Solusi terpadu digitalisasi klinik kecantikan, estetika, dan pusat dermatologi: Rekam Medis Estetika (EMR), dokumentasi foto klinis Before-After dengan Face Mapping Annotation, paket perawatan multi-sesi, e-Consent persetujuan tindakan, kasir skincare BPOM & racikan, serta perhitungan otomatis komisi dokter dan beautician.',
    metaTitle: 'Software Klinik Kecantikan & Estetika Medis AI | SMART-AI.ID',
    metaDescription:
      'Aplikasi klinik kecantikan terpadu: Rekam Medis Estetika, Foto Before-After HD, E-Consent Digital, Paket Treatment Multi-Sesi, Kasir Skincare, dan AI Face & Skin Analysis.',
    problems: [
      {
        id: 'aep1',
        title: 'Dokumentasi Foto Before-After Berserakan & Sulit Dibandingkan',
        description: 'Foto progres wajah pasien tersimpan acak di ponsel dokter/terapis tanpa sudut (angle) dan pencahayaan yang konsisten, sulit dicari saat pasien komplain.',
        impact: 'Klaim hasil tindakan diragukan pasien dan hilangnya bukti otentik progres klinis.',
        solutionHighlight: 'Grid Foto Before-After HD dengan Face Angle Alignment & Mapping Titik Injeksi / Laser.'
      },
      {
        id: 'aep2',
        title: 'Pengelolaan Paket Perawatan Multi-Visit & Deposit Saldo Rawan Selisih',
        description: 'Pencatatan sisa sesi treatment (misal: Paket Laser 5x) di kartu kertas sering hilang, dipalsukan, atau hangus tanpa transparansi.',
        impact: 'Kerugian finansial klinik, selisih kas, dan kekecewaan pasien langganan VIP.',
        solutionHighlight: 'Sistem Kartu Sesi Digital & Dompet Deposit Saldo Member real-time dengan notifikasi WhatsApp.'
      },
      {
        id: 'aep3',
        title: 'Kalkulasi Komisi & Fee Tindakan Dokter/Terapis Sangat Kompleks',
        description: 'Perbedaan skema bagi hasil dokter, komisi pengerjaan beautician per tindakan facial, dan bonus penjualan skincare memerlukan rekap manual berhari-hari.',
        impact: 'Keterlambatan slip gaji, selisih perhitungan insentif, dan demotivasi staf klinik.',
        solutionHighlight: 'Otomatisasi Kalkulator Jasa Medis Dokter & Poin Komisi Beautician per Invoice Kasir.'
      },
      {
        id: 'aep4',
        title: 'Pasien Tidak Melakukan Retouch / Treatment Berkala (Low Retention)',
        description: 'Klinik kehilangan potensi repeat visit karena lupa mengingatkan pasien saat jadwal retouch botox, filler, atau facial bulanan jatuh tempo.',
        impact: 'Penurunan omset bulanan hingga 35% akibat retensi pasien yang rendah.',
        solutionHighlight: 'AI Churn Predictor & WhatsApp Automated Recall Engine untuk jadwal retouch berkala.'
      }
    ],
    solutionOverview:
      'Platform Smart Aesthetic SMART-AI.ID mengintegrasikan reservasi dokter & beautician, ruang periksa spesialis kulit, treatment room, kasir skincare POS, loyalty member, dan AI Skin Analyzer dalam satu ekosistem cloud.',
    businessImpactSummary: [
      'Peningkatan Pasien Repeat Visit & Retouch hingga 45%',
      '100% Bebas Selisih Paket Multi-Sesi & Deposit Member',
      'Efisiensi Waktu Konsultasi dengan E-Consent & Face Mapping Digital',
      'Slip Komisi Dokter & Beautician Terbit Otomatis 1-Klik'
    ],
    modules: [
      { id: 'aem1', name: 'Aesthetic EMR & Face Mapping Chart', description: 'Rekam medis kulit, tipe Fitzpatrick, riwayat alergi produk, dan charting visual titik injeksi/benang/laser.', iconName: 'Sparkles', aiBadge: 'Face Mapping' },
      { id: 'aem2', name: 'Before-After HD Progression Gallery', description: 'Kamera klinis terintegrasi sudut pandang standar, side-by-side comparison, watermark klinik, dan slider progres kulit.', iconName: 'Image' },
      { id: 'aem3', name: 'Treatment Packages & Member Prepaid Wallet', description: 'Pencatatan paket multi-sesi (5x/10x), tracking sisa kunjungan, deposit saldo perawatan, dan tier VIP member.', iconName: 'CreditCard' },
      { id: 'aem4', name: 'Tablet Digital Informed Consent (E-Sign)', description: 'Lembar persetujuan tindakan medis/estetika digital tanpa kertas dengan tanda tangan elektronik aman.', iconName: 'FileCheck' },
      { id: 'aem5', name: 'Doctor, Beautician & Room Scheduler', description: 'Penjadwalan slot konsultasi dokter, terapis facial, dan alokasi mesin laser/ruang tindakan secara presisi.', iconName: 'Calendar' },
      { id: 'aem6', name: 'Skincare POS, E-Prescription & Fee Sharing', description: 'Kasir terintegrasi resep racikan dokter, stok skincare FEFO BPOM, QRIS/EDC, dan bagi hasil otomatis.', iconName: 'ShoppingBag' }
    ],
    aiFeatures: [
      { id: 'aef1', name: 'AI Skin Condition & Problem Detector', description: 'Menganalisis foto wajah pasien untuk deteksi otomatis level pori, hiperpigmentasi/melasma, kerutan, dan jerawat.', iconName: 'ScanFace', type: 'Copilot' },
      { id: 'aef2', name: 'AI Before-After Face Alignment & Morphing', description: 'Menyelaraskan sudut foto wajah secara otomatis untuk perbandingan visual sebelum dan sesudah tindakan yang presisi.', iconName: 'Layers', type: 'Analytics' },
      { id: 'aef3', name: 'AI Patient Retouch & Churn Recall Predictor', description: 'Memprediksi siklus pudarnya hasil treatment (botox, filler, facial) dan otomatis mengirim pengingat personal via WhatsApp.', iconName: 'TrendingUp', type: 'Automation' }
    ],
    workflowSteps: [
      { step: 1, title: 'Booking & Reservasi Slot Terapis/Dokter', desc: 'Pasien memilih jadwal dokter estetika atau beautician favorit melalui portal web atau WhatsApp.', icon: 'Calendar' },
      { step: 2, title: 'Foto Klinis & Anamnesis Kulit', desc: 'Resepsionis/perawat mengambil foto profil wajah dasar dan mendata keluhan kulit pasien.', icon: 'Camera' },
      { step: 3, title: 'Konsultasi Dokter, Face Chart & E-Consent', desc: 'Dokter menganalisis wajah, menggambar titik treatment di face chart digital, dan pasien menandatangani e-Consent.', icon: 'FileSignature' },
      { step: 4, title: 'Tindakan Treatment & Deduct Paket', desc: 'Beautician/Dokter melakukan perawatan di treatment room, sistem otomatis memotong kuota paket multi-sesi.', icon: 'Sparkles' },
      { step: 5, title: 'Kasir Skincare & WhatsApp Follow-Up', desc: 'Pembayaran kasir selesai, resep krim dicetak, dan AI menjadwalkan WhatsApp follow-up kondisi kulit H+3.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Treatment Hari Ini', value: '48 Sesi', change: '+22%', isPositive: true, subtext: 'Laser 18 | Injeksi 12 | Facial 18' },
        { label: 'Pendapatan Hari Ini', value: 'Rp 62.450.000', change: '+28,4%', isPositive: true, subtext: 'Treatment Rp 44jt | Skincare Rp 18,4jt' },
        { label: 'Paket Treatment Aktif', value: '342 Pasien', change: '+15%', isPositive: true, subtext: 'Total Nilai Deposit: Rp 480 Juta' },
        { label: 'Repeat Order Retouch (AI)', value: '76,8%', change: '+34%', isPositive: true, subtext: 'Konversi WhatsApp Recall Sukses' }
      ],
      chartTitle: 'Tren Pendapatan Treatment vs Produk Skincare (6 Bulan Terakhir)',
      chartData: [
        { name: 'Januari', actual: 240, target: 200 },
        { name: 'Februari', actual: 285, target: 250 },
        { name: 'Maret', actual: 330, target: 300 },
        { name: 'April', actual: 390, target: 350 },
        { name: 'Mei', actual: 440, target: 400 },
        { name: 'Juni', actual: 510, target: 450 }
      ],
      tableTitle: 'Jadwal Treatment Room & Sesi Pasien (Hari Ini)',
      tableHeaders: ['Waktu', 'Nama Pasien', 'Tindakan Treatment', 'Dokter / Beautician', 'Ruang', 'Status'],
      tableRows: [
        { 'Waktu': '10:00', 'Nama Pasien': 'Ny. Jessica Sandra', 'Tindakan Treatment': 'Pico Laser Rejuvenation (Sesi 3/5)', 'Dokter / Beautician': 'dr. Amanda Sp.KK', 'Ruang': 'Laser Room 1', 'Status': 'Sedang Tindakan' },
        { 'Waktu': '10:30', 'Nama Pasien': 'Nn. Clarissa Putri', 'Tindakan Treatment': 'Hydro Facial Glow & Serum Infusion', 'Dokter / Beautician': 'Terapis Rini', 'Ruang': 'Facial Room 2', 'Status': 'Persiapan Ruang' },
        { 'Waktu': '11:15', 'Nama Pasien': 'Ny. Ratna Dewi', 'Tindakan Treatment': 'Botox Forehead & Jawline Slimming', 'Dokter / Beautician': 'dr. Amanda Sp.KK', 'Ruang': 'Action Room 1', 'Status': 'Anestesi Topikal (20m)' }
      ],
      aiInsightBanner: '💡 AI Aesthetic Insight: 32 pasien injeksi Botox bulan lalu telah memasuki siklus H+90 hari. Rekomendasi otomatis WhatsApp recall retouch telah disiapkan dengan potensi omset Rp 48.000.000.'
    },
    benefits: [
      'Visualisasi Before-After HD meningkatkan kepercayaan dan kepuasan pasien.',
      'Paket treatment multi-sesi dan deposit wallet terkontrol 100% tanpa selisih.',
      'Skema bagi hasil dokter dan komisi beautician terhitung otomatis dan akurat.',
      'AI Recall meningkatkan loyalitas dan jadwal kunjungan ulang pasien secara konsisten.'
    ],
    useCases: [
      {
        id: 'uca1',
        title: 'Komparasi Progres Before-After & E-Consent Tindakan Laser',
        scenario: 'Pasien ingin melihat perkembangan melasma setelah 3 kali sesi treatment Pico Laser.',
        aiRole: 'AI Face Alignment menampilkan foto perbandingan sudut wajah yang simetris dan menghitung penurunan indeks pigmentasi sebesar 68%.',
        outcome: 'Pasien sangat puas melihat bukti objektif dan langsung memperpanjang paket perawatan 5 sesi berikutnya.'
      }
    ],
    integrations: ['Kemenkes SATUSEHAT RME', 'WhatsApp Business API', 'Payment Gateway (QRIS, Kartu Kredit, Cicilan)', 'Tablet Digital Pen E-Consent', 'Barcode Scanner Skincare BPOM'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'Canvas Face Annotation', 'Tablet E-Sign Module'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js', 'PostgreSQL (Enkripsi Medis)', 'AI Vision Image Engine'] }
    ],
    relatedSlugs: ['clinic', 'pharmacy', 'hospital', 'dental-clinic'],
    cta: { buildText: 'Bangun Software Klinik Estetika', consultText: 'Konsultasi Solusi Estetika', estimateText: 'Hitung Biaya Klinik Estetika' }
  },

  // 12. SMART PHARMACY / APOTEK MODERN
  {
    slug: 'pharmacy',
    name: 'Apotek (Smart Pharmacy)',
    subtitle: 'Smart Drugstore Inventory, E-Prescription & FEFO Expiry Management',
    category: 'Healthcare',
    isFeatured: true,
    published: true,
    icon: '💊',
    heroTagline: 'Sistem Kasir POS & Manajemen Persediaan Apotek Berbasis AI',
    heroDescription:
      'Aplikasi apotek modern terlengkap: Kasir penjualan resep & non-resep cepat, kontrol stok persediaan metode FEFO/FIFO, barcode scanner obat, Surat Pesanan (SP) otomatis untuk Narkotika/Psikotropika/Prekursor/Reguler, peringatan obat kadaluarsa dini, dan AI Smart Reorder Point.',
    metaTitle: 'Software Apotek & Manajemen Stok Obat FEFO AI | SMART-AI.ID',
    metaDescription: 'Solusi aplikasi kasir Apotek terintegrasi stok obat FEFO, Resep Dokter OCR, SP Narkotika, PBF Distributor, dan AI Reorder Point.',
    problems: [
      { id: 'php1', title: 'Kerugian Besar Akibat Obat Kadaluarsa (Expired)', description: 'Stok obat menumpuk di rak tanpa kontrol batch & expiry date, baru diketahui saat obat sudah melewati masa edar.', impact: 'Kerugian jutaan hingga puluhan juta rupiah per bulan akibat obat rusak/dibuang.', solutionHighlight: 'Sistem Tracking Batch FEFO (First-Expired, First-Out) dengan Alert H-90, H-60, H-30 Hari.' },
      { id: 'php2', title: 'Kehabisan Stok Obat Laris (Stockout) Saat Dibutuhkan Pasien', description: 'Pemesanan obat ke PBF terlambat karena penghitungan stok fisik (Stock Opname) dilakukan manual dan lambat.', impact: 'Pasien beralih ke apotek lain dan kehilangan potensi pendapatan harian.', solutionHighlight: 'AI Dynamic Reorder Point yang otomatis menyusun draft pesanan saat stok mencapai batas kritis.' },
      { id: 'php3', title: 'Pembuatan Surat Pesanan (SP) Manual Rumit & Regulasi BPOM', description: 'Pemisahan Surat Pesanan resmi untuk Narkotika, Psikotropika, Prekursor, dan Obat-Obat Tertentu (OOT) memakan waktu petugas APA (Apoteker Penanggung Jawab).', impact: 'Risiko temuan pelanggaran audit BPOM dan tertundanya pengiriman dari PBF.', solutionHighlight: 'Generator Surat Pesanan Otomatis Standar BPOM & Kemenkes dengan Tanda Tangan Digital.' }
    ],
    solutionOverview: 'Sistem operasional apotek terpadu yang menghubungkan kasir POS penjualan, gudang obat, katalog master obat nasional, monitoring izin apotek, dan analitik keuntungan harian.',
    businessImpactSummary: [
      'Reduksi Kerugian Obat Kadaluarsa hingga 90%',
      'Kecepatan Pelayanan Kasir Obat Resep/Non-Resep 2x Lebih Cepat',
      'Stock Opname Digital Akurat dengan Barcode Scanner',
      'Laporan Penjualan, Margin HPP & Laba Rugi Real-Time'
    ],
    modules: [
      { id: 'phm1', name: 'Pharmacy POS & Cashier System', description: 'Penjualan obat bebas, HV, OWA, resep dokter, obat racikan (kapsul/puyer/sirup), dan cetak struk/etiket obat.', iconName: 'ShoppingCart', aiBadge: 'POS Core' },
      { id: 'phm2', name: 'Inventory & Batch FEFO Controller', description: 'Pelacakan stok multi-lokasi (Etalase, Gudang Depo), nomor batch pabrik, dan tanggal kadaluarsa obat.', iconName: 'Package', aiBadge: 'FEFO AI' },
      { id: 'phm3', name: 'Surat Pesanan (SP) BPOM Generator', description: 'Format SP resmi regulasi BPOM: SP Reguler, SP Narkotika, SP Psikotropika, SP Prekursor, dan SP OOT.', iconName: 'FileCheck' },
      { id: 'phm4', name: 'E-Prescription & Medicine Etiquette Print', description: 'Input resep dokter, hitung tuslah & embalase, serta cetak stiker aturan pakai (etiket) otomatis.', iconName: 'Printer' },
      { id: 'phm5', name: 'PBF Supplier & Purchase Order (PO)', description: 'Manajemen distributor farmasi (PBF), faktur pembelian, pencatatan hutang dagang, dan retur obat.', iconName: 'Truck' }
    ],
    aiFeatures: [
      { id: 'phf1', name: 'AI Smart Reorder Point & Purchasing Copilot', description: 'Menganalisis tren penjualan 30 hari terakhir untuk memprediksi kapan dan berapa kuantitas obat yang harus di-reorder ke PBF.', iconName: 'TrendingUp', type: 'Forecasting' },
      { id: 'phf2', name: 'AI Prescription OCR Scanner', description: 'Memindai foto resep dokter tulisan tangan dan mendeteksi nama obat, sediaan dosis, dan aturan pakai secara otomatis.', iconName: 'Eye', type: 'Automation' },
      { id: 'phf3', name: 'AI Medication Reminder via WhatsApp', description: 'Mengirimkan notifikasi pengingat otomatis ke WhatsApp pasien untuk menebus resep obat kronis (Hipertensi/Diabetes) saat obat habis.', iconName: 'MessageSquare', type: 'Automation' }
    ],
    workflowSteps: [
      { step: 1, title: 'Penerimaan Resep / Pembelian Bebas', desc: 'Kasir scan barcode obat atau scan resep dokter dengan OCR AI.', icon: 'Barcode' },
      { step: 2, title: 'Pengecekan Stok & Batch FEFO', desc: 'Sistem merekomendasikan nomor batch yang memiliki masa kadaluarsa terdekat.', icon: 'CheckSquare' },
      { step: 3, title: 'Peracikan & Cetak Etiket', desc: 'Petugas farmasi meracik dan menempelkan stiker aturan pakai otomatis.', icon: 'Printer' },
      { step: 4, title: 'Pembayaran Kasir & Update Stok', desc: 'Pembayaran diterima (QRIS/Tunai/Debit) dan stok gudang otomatis terpotong.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Omset Penjualan Hari Ini', value: 'Rp 18.250.000', change: '+16,4%', isPositive: true, subtext: '142 Transaksi (88 Bebas | 54 Resep)' },
        { label: 'Total Item Obat Aktif', value: '2.450 SKU', change: 'Lengkap', isPositive: true, subtext: '98,5% Ketersediaan Stok' },
        { label: 'Peringatan Obat Mendekati Expired', value: '6 Batch', change: 'Perlu Promosi', isPositive: false, subtext: 'Kadaluarsa < 60 Hari' },
        { label: 'Rekomendasi Auto-PO ke PBF', value: '14 Item', change: 'Draft Siap', isPositive: true, subtext: 'Stok Mendekati Batas Kritis' }
      ],
      chartTitle: 'Kategori Obat Terlaris Berdasarkan Nilai Transaksi (Bulan Ini)',
      chartData: [
        { name: 'Antibiotik & Antivirus', actual: 45000000, target: 40000000 },
        { name: 'Obat Kronis (Hipertensi/DM)', actual: 68000000, target: 60000000 },
        { name: 'Analgesik & Antipiretik', actual: 32000000, target: 30000000 },
        { name: 'Vitamin & Suplemen', actual: 28000000, target: 25000000 },
        { name: 'Alat Kesehatan (Alkes)', actual: 16000000, target: 15000000 }
      ],
      tableTitle: 'Status Obat Mendekati Batas Kritis & Rekomendasi Reorder',
      tableHeaders: ['Nama Obat', 'Stok Sisa', 'Kebutuhan Mingguan', 'Distributor PBF', 'Batch Terdekat', 'Status AI'],
      tableRows: [
        { 'Nama Obat': 'Amlodipine 10mg Tab', 'Stok Sisa': '4 Box', 'Kebutuhan Mingguan': '12 Box', 'Distributor PBF': 'PT Kimia Farma Trading', 'Batch Terdekat': 'EXP: Nov 2027', 'Status AI': '⚠️ Stok Kritis - Segera Buat SP' },
        { 'Nama Obat': 'Paracetamol Sirup 120mg', 'Stok Sisa': '24 Botol', 'Kebutuhan Mingguan': '18 Botol', 'Distributor PBF': 'PT Mensa Binasukses', 'Batch Terdekat': 'EXP: Jan 2028', 'Status AI': 'Aman' },
        { 'Nama Obat': 'Cefixime 200mg Kapsul', 'Stok Sisa': '3 Box', 'Kebutuhan Mingguan': '8 Box', 'Distributor PBF': 'PT Anugrah Argon', 'Batch Terdekat': 'EXP: Sep 2026', 'Status AI': '⚠️ Segera Order PBF' }
      ],
      aiInsightBanner: '💡 AI Pharmacy Note: 3 produk obat kronis terlaris mencapai reorder point. Draft Surat Pesanan ke PBF telah dibuat otomatis dan menunggu verifikasi Apoteker.'
    },
    benefits: [
      'Nol potensi denda BPOM dengan penataan Surat Pesanan (SP) patuh regulasi.',
      'Memangkas waktu stock opname dari seharian penuh menjadi 1-2 jam.',
      'Margin laba meningkat dengan eliminasi obat basi dan kadaluarsa.'
    ],
    useCases: [
      { id: 'ucph1', title: 'Mitigasi Stok Obat Mendekati Kadaluarsa', scenario: 'Sistem mendeteksi 10 strip multivitamin akan kadaluarsa dalam 45 hari kedepan.', aiRole: 'AI menyarankan promo bundling kasir atau retur cepat ke distributor sebelum batas retur habis.', outcome: 'Seluruh stok habis terjual dalam program promo sehat tanpa kerugian.' }
    ],
    integrations: ['Barcode Scanner USB/Bluetooth', 'Printer Kasir Thermal & Label Etiket', 'Gateway WhatsApp Notifikasi Pasien', 'Sistem Kemenkes SATUSEHAT Farmasi'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'Desktop Web App'] },
      { category: 'Backend', stack: ['Express.js', 'PostgreSQL Multi-Store'] }
    ],
    relatedSlugs: ['clinic', 'hospital', 'retail'],
    cta: { buildText: 'Bangun Software Apotek Modern', consultText: 'Konsultasi Sistem Apotek', estimateText: 'Hitung Estimasi Software Apotek' }
  },

  // 13. FAMILYHUB
  {
    slug: 'familyhub',
    name: 'FamilyHub',
    subtitle: 'Smart Family Planning, Health & Expense Management',
    category: 'Enterprise',
    isFeatured: false,
    published: true,
    icon: '🏠',
    heroTagline: 'Platform Digital Manajemen Keluarga Sehat & Finansial Cerdas',
    heroDescription:
      'Solusi terpadu untuk mengelola kalender keluarga, anggaran rumah tangga, dokumen penting (KK/KTP/Ijazah), rekam medis keluarga, dan pengingat harian.',
    metaTitle: 'FamilyHub App & Smart Family Assistant AI | SMART-AI.ID',
    metaDescription: 'Aplikasi manajemen keluarga pintar dengan AI Expense Advisor, Kalender Bersama, Health Vault, dan Document Hub.',
    problems: [
      { id: 'fhp1', title: 'Dokumen & Tagihan Keluarga Berserakan', description: 'Polis asuransi, surat tanah, dan masa berlaku STNK sering lupa diperbarui.', impact: 'Denda keterlambatan dan kesulitan saat kondisi darurat.', solutionHighlight: 'Vault Dokumen Terenkripsi & AI Expiry Reminder.' }
    ],
    solutionOverview: 'Aplikasi keluarga terenkripsi untuk mengorganisir finansial, kesehatan, pendidikan anak, dan aktivitas keluarga.',
    businessImpactSummary: ['Arsip Dokumen Keluarga 100% Aman', 'Pengontrolan Anggaran Bulanan', 'Pengingat Jadwal Sehat Keluarga'],
    modules: [
      { id: 'fhm1', name: 'Family Calendar & Shared Tasks', description: 'Kalender bersama untuk acara keluarga dan tugas rumah.', iconName: 'Calendar' },
      { id: 'fhm2', name: 'Document Vault & Expiry Alert', description: 'Penyimpanan dokumen penting terenkripsi dengan alarm perpanjangan.', iconName: 'Lock' }
    ],
    aiFeatures: [
      { id: 'fhf1', name: 'AI Family Assistant', description: 'Asisten cerdas keluarga untuk rekomendasi resep, hemat anggaran, dan jadwal.', iconName: 'Sparkles', type: 'Copilot' }
    ],
    workflowSteps: [
      { step: 1, title: 'Unduh & Tambah Anggota', desc: 'Ayah, Ibu, dan Anak terhubung dalam satu ruang.', icon: 'Users' },
      { step: 2, title: 'Atur Anggaran & Dokumen', desc: 'Unggah arsip dan atur pos keuangan.', icon: 'FileText' },
      { step: 3, title: 'Asisten AI Aktif', desc: 'AI memberikan pengingat rutin dan insight.', icon: 'Sparkles' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Anggota Keluarga', value: '4 Orang', change: 'Terhubung', isPositive: true, subtext: 'Ayah, Ibu, 2 Anak' },
        { label: 'Anggaran Bulan Ini', value: 'Rp 15.000.000', change: 'Terpakai 62%', isPositive: true, subtext: 'Sisa Rp 5.700.000' },
        { label: 'Dokumen Tersimpan', value: '24 Arsip', change: 'Aman', isPositive: true, subtext: 'Terenkripsi AES-256' },
        { label: 'Jadwal Agenda Minggu Ini', value: '6 Kegiatan', change: 'Terjadwal', isPositive: true, subtext: 'Semua Teringatkan' }
      ],
      chartTitle: 'Distribusi Pengeluaran Rumah Tangga (Bulan Ini)',
      chartData: [
        { name: 'Pendidikan', actual: 4500, target: 5000 },
        { name: 'Kebutuhan Dapur', actual: 3200, target: 3500 },
        { name: 'Utilitas & Tagihan', actual: 1800, target: 2000 },
        { name: 'Tabungan/Investasi', actual: 3000, target: 3000 }
      ],
      tableTitle: 'Pengingat Dokumen & Agenda Keluarga Mendatang',
      tableHeaders: ['Agenda / Dokumen', 'Kategori', 'Tanggal / Jatuh Tempo', 'PJ Keluarga', 'Status AI'],
      tableRows: [
        { 'Agenda / Dokumen': 'Perpanjang STNK Mobil', 'Kategori': 'Kendaraan', 'Tanggal / Jatuh Tempo': '28 Ags 2026', 'PJ Keluarga': 'Ayah', 'Status AI': '⚠️ H-13 Peringatan' },
        { 'Agenda / Dokumen': 'Vaksinasi Anak Kedua', 'Kategori': 'Kesehatan', 'Tanggal / Jatuh Tempo': '05 Sep 2026', 'PJ Keluarga': 'Ibu', 'Status AI': 'Terjadwal' }
      ],
      aiInsightBanner: '💡 Family Assistant Note: Pengeluaran dapur terpakai 80% di pertengahan bulan. AI merekomendasikan opsi belanja hemat.'
    },
    benefits: ['Privasi data keluarga terlindungi.', 'Kehidupan keluarga lebih tertata.'],
    useCases: [
      { id: 'ucfh1', title: 'Pencegahan Denda STNK Mati', scenario: 'STNK mobil akan habis dalam 2 minggu.', aiRole: 'AI memberi pengingat dan link ke Samsat online.', outcome: 'STNK diperpanjang tanpa denda.' }
    ],
    integrations: ['Google Calendar Sync', 'Encrypted Cloud Storage'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js'] }
    ],
    relatedSlugs: ['personal-finance-assistant', 'school'],
    cta: { buildText: 'Bangun Platform FamilyHub', consultText: 'Konsultasi Fitur Keluarga', estimateText: 'Hitung Estimasi Biaya' }
  },

  // 12. SCHOOL
  {
    slug: 'school',
    name: 'School',
    subtitle: 'Smart School Management & Academic AI System',
    category: 'Education',
    isFeatured: false,
    published: true,
    icon: '🏫',
    heroTagline: 'Sistem Informasi Manajemen Sekolah (SIMS) & e-Learning Berbasis AI',
    heroDescription:
      'Digitalisasi sekolah secara menyeluruh: Absensi presensi wajah/QR, pembayaran SPP e-payment, E-Rapor Kurikulum Merdeka, ujian CBT, dan AI Student Academic Analytics.',
    metaTitle: 'Software Manajemen Sekolah & E-Rapor AI | SMART-AI.ID',
    metaDescription: 'Solusi SIMS Sekolah terintegrasi Absensi QR, SPP Online, E-Rapor Kurikulum Merdeka, dan AI Academic Insight.',
    problems: [
      { id: 'scp1', title: 'Tunggakan SPP & Pencatatan Keuangan Manual', description: 'Pengelolaan tagihan SPP dan iuran sekolah secara manual memicu keterlambatan kas sekolah.', impact: 'Operasional sekolah terganggu dan rekapitulasi pembayaran terlambat.', solutionHighlight: 'Virtual Account Multi-Bank & Notification Gateway.' }
    ],
    solutionOverview: 'Platform sekolah pintar terpadu untuk siswa, guru, orang tua, dan kepala sekolah.',
    businessImpactSummary: ['Kecepatan Penerimaan SPP Naik 40%', 'Presensi Siswa Transparan ke Orang Tua', 'E-Rapor Generasi Otomatis'],
    modules: [
      { id: 'scm1', name: 'Student & Teacher Academic Hub', description: 'Manajemen data siswa, guru, jadwal pelajaran, dan kelas.', iconName: 'Users' },
      { id: 'scm2', name: 'E-Rapor Kurikulum Merdeka', description: 'Penilaian capaian pembelajaran dan cetak rapor otomatis.', iconName: 'GraduationCap', aiBadge: 'Rapor AI' }
    ],
    aiFeatures: [
      { id: 'scf1', name: 'AI Academic Performance Insight', description: 'Menganalisis nilai siswa dan memberikan early warning jika potensi penurunan nilai.', iconName: 'Sparkles', type: 'Analytics' }
    ],
    workflowSteps: [
      { step: 1, title: 'Presensi Pagi', desc: 'Siswa scan QR atau wajah di gerbang sekolah.', icon: 'CheckCircle' },
      { step: 2, title: 'KBM & Penilaian', desc: 'Guru menginput nilai harian di aplikasi mobile.', icon: 'BookOpen' },
      { step: 3, title: 'Laporan Orang Tua', desc: 'Notifikasi presensi dan Rapor dikirim ke WhatsApp ortu.', icon: 'MessageSquare' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Siswa Aktif', value: '1.250 Siswa', change: '36 Kelas', isPositive: true, subtext: 'Tingkat SMP & SMA' },
        { label: 'Tingkat Kehadiran Hari Ini', value: '97,2%', change: '+1,5%', isPositive: true, subtext: 'Sakit 12 | Izin 8' },
        { label: 'Penerimaan SPP Bulan Ini', value: '91,5%', change: '+8,0%', isPositive: true, subtext: 'Berkat Payment Gateway' },
        { label: 'Rata-rata Nilai Akademik', value: '82,4', change: '+2,1%', isPositive: true, subtext: 'Di atas KKM (75)' }
      ],
      chartTitle: 'Tren Kehadiran Siswa per Tingkat Kelas (Minggu Ini)',
      chartData: [
        { name: 'Kelas X', actual: 98, target: 95 },
        { name: 'Kelas XI', actual: 96, target: 95 },
        { name: 'Kelas XII', actual: 97, target: 95 }
      ],
      tableTitle: 'Ringkasan Status Keuangan SPP per Angkatan',
      tableHeaders: ['Angkatan / Kelas', 'Jumlah Siswa', 'Lunas SPP', 'Belum Lunas', 'Persentase', 'Status AI'],
      tableRows: [
        { 'Angkatan / Kelas': 'Kelas X (360 Siswa)', 'Jumlah Siswa': '360', 'Lunas SPP': '340 Siswa', 'Belum Lunas': '20 Siswa', 'Persentase': '94,4%', 'Status AI': 'Sangat Baik' },
        { 'Angkatan / Kelas': 'Kelas XI (380 Siswa)', 'Jumlah Siswa': '380', 'Lunas SPP': '330 Siswa', 'Belum Lunas': '50 Siswa', 'Persentase': '86,8%', 'Status AI': '⚠️ Kirim WA Reminder' }
      ],
      aiInsightBanner: '💡 AI Academic Advisory: 94% siswa kelas XII siap menghadapi ujian nasional berdasarkan simulasi nilai tryout CBT.'
    },
    benefits: ['Komunikasi dengan orang tua lebih harmonis.', 'Penghematan kertas hingga 80%.'],
    useCases: [
      { id: 'ucsc1', title: 'Deteksi Dini Penurunan Nilai Siswa', scenario: 'Seorang siswa mengalami penurunan nilai berturut-turut.', aiRole: 'AI memberi notifikasi ke Guru BK untuk konseling.', outcome: 'Nilai siswa kembali membaik.' }
    ],
    integrations: ['Virtual Account Bank (BCA, Mandiri, BRI)', 'WhatsApp Gateway', 'Dapodik Dikdasmen API'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js'] }
    ],
    relatedSlugs: ['hospital', 'familyhub'],
    cta: { buildText: 'Bangun Software Sekolah', consultText: 'Konsultasi Manajemen Sekolah', estimateText: 'Hitung Estimasi' }
  },

  // 13. MANUFACTURING
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    subtitle: 'Smart Factory, OEE Analytics & Predictive Maintenance',
    category: 'Industrial',
    isFeatured: true,
    published: true,
    icon: '🏭',
    heroTagline: 'Sistem Eksekusi Manufaktur (MES) & Industri 4.0 Berbasis AI',
    heroDescription:
      'Tingkatkan efisiensi pabrik dengan pelacakan Overall Equipment Effectiveness (OEE), deteksi downtime mesin, kontrol kualitas (QC Reject), dan AI Predictive Maintenance.',
    metaTitle: 'Software Manufaktur MES & OEE Analytics AI | SMART-AI.ID',
    metaDescription: 'Solusi sistem manufaktur MES terintegrasi OEE Analytics, PLC/SCADA IoT, Quality Control, dan AI Predictive Maintenance.',
    problems: [
      { id: 'mp1', title: 'Unplanned Downtime Mesin Pabrik', description: 'Kerusakan komponen mesin produksi secara mendadak menghentikan seluruh lini perakitan.', impact: 'Kerugian target produksi harian dan biaya lembur karyawan.', solutionHighlight: 'AI Predictive Maintenance & Vibration IoT Sensor.' }
    ],
    solutionOverview: 'Sistem MES pintar yang mengintegrasikan data sensor mesin PLC/SCADA, jadwal Work Order (WO), dan efisiensi OEE.',
    businessImpactSummary: ['Skor OEE Lini Pabrik Naik hingga 82%', 'Penurunan Downtime Mesin sebesar 32%', 'Tracking Batch Produksi Real-time'],
    modules: [
      { id: 'mm1', name: 'OEE & Line Efficiency Analytics', description: 'Kalkulasi skor Availability, Performance, dan Quality real-time.', iconName: 'Activity', aiBadge: 'OEE AI' },
      { id: 'mm2', name: 'Work Order & Production Planning', description: 'Penjadwalan rute produksi, BOM (Bill of Materials), dan bahan baku.', iconName: 'Cpu' }
    ],
    aiFeatures: [
      { id: 'mf1', name: 'AI Machine Breakdown Predictor', description: 'Memprediksi sisa umur pakai komponen mesin sebelum terjadi kegagalan fatal.', iconName: 'Wrench', type: 'Anomaly Detection' }
    ],
    workflowSteps: [
      { step: 1, title: 'Release Work Order', desc: 'Manager merilis order produksi dan stok bahan.', icon: 'FileText' },
      { step: 2, title: 'Eksekusi Lini Pabrik', desc: 'Mesin berjalan dengan pemantauan sensor OEE.', icon: 'Activity' },
      { step: 3, title: 'Quality Control & Packing', desc: 'Pemeriksaan sampel produk jadi dan lolos QC.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Skor OEE Lini Utama', value: '84,2%', change: '+5,1%', isPositive: true, subtext: 'Target World Class 85%' },
        { label: 'Availability Rate', value: '92,0%', change: '+2,0%', isPositive: true, subtext: 'Downtime Minimal' },
        { label: 'Quality First Pass Yield', value: '98,8%', change: '+0,5%', isPositive: true, subtext: 'Reject Rate 1,2%' },
        { label: 'Output Produksi Hari Ini', value: '42.500 Unit', change: '+8,0%', isPositive: true, subtext: 'Target 40.000 Unit' }
      ],
      chartTitle: 'Grafik Skor OEE per Lini Produksi (Shift 1 & 2)',
      chartData: [
        { name: 'Line 01', actual: 86, target: 80 },
        { name: 'Line 02', actual: 82, target: 80 },
        { name: 'Line 03', actual: 78, target: 80 },
        { name: 'Line 04', actual: 88, target: 80 }
      ],
      tableTitle: 'Status Mesin Lini Produksi (Live PLC Connection)',
      tableHeaders: ['Mesin ID', 'Nama Mesin', 'Status Operasi', 'Speed (RPM)', 'Temp (°C)', 'Status AI'],
      tableRows: [
        { 'Mesin ID': 'MCH-101', 'Nama Mesin': 'CNC Milling A', 'Status Operasi': 'RUNNING', 'Speed (RPM)': '3.200', 'Temp (°C)': '42°C', 'Status AI': 'Optimal' },
        { 'Mesin ID': 'MCH-104', 'Nama Mesin': 'Stamping Press B', 'Status Operasi': 'WARNING', 'Speed (RPM)': '2.800', 'Temp (°C)': '68°C', 'Status AI': '⚠️ Getaran Tinggi - Servis' }
      ],
      aiInsightBanner: '💡 AI Factory Note: Lini 04 mencapai efisiensi tertinggi (88%). Mesin MCH-104 memerlukan penggantian bearing dalam 48 jam.'
    },
    benefits: ['Efisiensi biaya perawatan pabrik.', 'Sistem pendaftaran lot produksi transparan.'],
    useCases: [
      { id: 'ucm1', title: 'Pencegahan Kerusakan Mesin Stamping', scenario: 'Sensor getaran mendeteksi anomali pada bearing mesin MCH-104.', aiRole: 'AI menjadwalkan Work Order maintenance otomatis saat pergantian shift.', outcome: 'Mesin diperbaiki tanpa mengganggu jam kerja shift utama.' }
    ],
    integrations: ['PLC/SCADA Modbus', 'ERP SAP / Oracle', 'Barcode/RFID Scanner'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js', 'Industrial IoT'] }
    ],
    relatedSlugs: ['mining', 'distributor', 'logistics'],
    cta: { buildText: 'Bangun Software Manufaktur', consultText: 'Konsultasi Sistem Pabrik', estimateText: 'Hitung Estimasi MES' }
  },

  // 14. RETAIL
  {
    slug: 'retail',
    name: 'Retail',
    subtitle: 'Smart Omnichannel POS & Inventory Demand Intelligence',
    category: 'Retail',
    isFeatured: true,
    published: true,
    icon: '🏪',
    heroTagline: 'Sistem Kasir POS & Rantai Pasok Retail Multi-Cabang Berbasis AI',
    heroDescription:
      'Solusi retail omnichannel: Kasir POS cepat, manajemen stok multi-cabang, deteksi barang tidak laku (slow-moving), prediksi kebutuhan stok, dan program loyalitas.',
    metaTitle: 'Software Retail Multi-Cabang & Smart POS AI | SMART-AI.ID',
    metaDescription: 'Solusi software retail multi-cabang terintegrasi POS Kasir, AI Inventory Optimization, Loyalty Program, dan Sales Forecast.',
    problems: [
      { id: 'rp1', title: 'Stok Mati (Deadstock) & Out of Stock Kasir', description: 'Sebagian cabang mengalami kehabisan barang terlaris, sementara cabang lain kelebihan stok tak laku.', impact: 'Modal kerja tertahan di gudang dan kehilangan potensi penjualan.', solutionHighlight: 'AI Stock Transfer & Reorder Suggestion.' }
    ],
    solutionOverview: 'Sistem retail cerdas yang menghubungkan kasir toko fisik, gudang pusat, e-commerce, dan prediksi permintaan pelanggan.',
    businessImpactSummary: ['Penurunan Deadstock hingga 28%', 'Kecepatan Transaksi Kasir 3 Detik', 'Akurasi Stok Opname Multi-Cabang 99%'],
    modules: [
      { id: 'rm1', name: 'Omnichannel Cloud POS', description: 'Aplikasi kasir cepat pendukung QRIS, EDC, tunai, dan cetak struk.', iconName: 'CreditCard', aiBadge: 'Fast POS' },
      { id: 'rm2', name: 'Multi-Branch Inventory', description: 'Pelacakan stok antar toko, gudang pusat, dan transfer stok.', iconName: 'Boxes' }
    ],
    aiFeatures: [
      { id: 'rf1', name: 'AI Demand & Reorder Forecaster', description: 'Memprediksi jumlah barang yang harus diorder ke supplier sebelum stok di toko habis.', iconName: 'TrendingUp', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Pemesanan Supplier', desc: 'Sistem merekomendasikan PO berdasarkan prediksi AI.', icon: 'ShoppingCart' },
      { step: 2, title: 'Distribusi ke Cabang', desc: 'Transfer barang dari gudang utama ke toko.', icon: 'Truck' },
      { step: 3, title: 'Penjualan di Kasir', desc: 'Transaksi kasir POS terhubung stok pusat.', icon: 'CreditCard' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Penjualan Hari Ini', value: 'Rp 142.500.000', change: '+18,2%', isPositive: true, subtext: '12 Cabang Toko' },
        { label: 'Total Transaksi Kasir', value: '1.840 Trx', change: '+12,0%', isPositive: true, subtext: 'Rata-rata Rp 77.400' },
        { label: 'Skor Perputaran Stok', value: '4,2x / Thn', change: '+0,8', isPositive: true, subtext: 'Efisiensi Tinggi' },
        { label: 'Alert Stok Hampir Habis', value: '6 Produk', change: 'Segera PO', isPositive: true, subtext: 'Barang Fast-Moving' }
      ],
      chartTitle: 'Perbandingan Penjualan per Cabang Toko Retail (Bulan Ini)',
      chartData: [
        { name: 'Toko Mal', actual: 480, target: 400 },
        { name: 'Toko Pusat', actual: 390, target: 350 },
        { name: 'Toko Barat', actual: 280, target: 250 },
        { name: 'Toko Selatan', actual: 275, target: 250 }
      ],
      tableTitle: 'Rekomendasi Reorder Stok Produk Fast-Moving',
      tableHeaders: ['Kode SKU', 'Nama Produk', 'Stok Saat Ini', 'Rata-Rata Terjual/Hari', 'Rekomendasi AI Order', 'Status AI'],
      tableRows: [
        { 'Kode SKU': 'SKU-8821', 'Nama Produk': 'Kemeja Katun M', 'Stok Saat Ini': '12 Pcs', 'Rata-Rata Terjual/Hari': '8 Pcs', 'Rekomendasi AI Order': 'Order 100 Pcs', 'Status AI': '⚠️ Stok Kritis' },
        { 'Kode SKU': 'SKU-4412', 'Nama Produk': 'Celana Chino 32', 'Stok Saat Ini': '45 Pcs', 'Rata-Rata Terjual/Hari': '5 Pcs', 'Rekomendasi AI Order': 'Tahan Order', 'Status AI': 'Aman' }
      ],
      aiInsightBanner: '💡 AI Retail Advisory: Produk Kemeja Katun M diprediksi habis dalam 36 jam di Toko Mal. Segera eksekusi transfer dari Toko Barat.'
    },
    benefits: ['Keputusan pembelian barang berbasis data penjualan nyata.', 'Loyalitas pelanggan terjaga.'],
    useCases: [
      { id: 'ucr1', title: 'Pencegahan Kehabisan Barang Promosi', scenario: 'Promo diskon akhir pekan melonjakkan permintaan sepatu.', aiRole: 'AI mendeteksi lonjakan kecepatan transaksi dan membuatkan PO darurat ke supplier.', outcome: 'Toko tidak pernah kehabisan stok selama event promo.' }
    ],
    integrations: ['QRIS Payment Gateway', 'EDC Multi-Bank', 'Barcode Scanner'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js'] }
    ],
    relatedSlugs: ['distributor', 'restaurant', 'logistics'],
    cta: { buildText: 'Bangun Software Retail POS', consultText: 'Konsultasi Retail Multi-Cabang', estimateText: 'Hitung Estimasi POS' }
  },

  // 15. PERSONAL FINANCE ASSISTANT
  {
    slug: 'personal-finance-assistant',
    name: 'Personal Finance Assistant',
    subtitle: 'AI Money Manager & Smart Financial Advisor',
    category: 'Finance',
    isFeatured: false,
    published: true,
    icon: '💰',
    heroTagline: 'Aplikasi Pengelola Keuangan Pribadi & Asisten Investasi Cerdas',
    heroDescription:
      'Kelola arus kas pribadi, kategorisasi otomatis transaksi e-wallet/bank, penyusunan anggaran bulanan, pelacakan tabungan, dan nasihat keuangan berbasis AI.',
    metaTitle: 'Aplikasi Keuangan Pribadi & AI Financial Advisor | SMART-AI.ID',
    metaDescription: 'Solusi aplikasi Money Manager terintegrasi kategorisasi otomatis AI, budgeting, cashflow forecast, dan laporan sehat finansial.',
    problems: [
      { id: 'pfp1', title: 'Bocor Halus & Kebiasaan Belanja Tidak Terkontrol', description: 'Pengeluaran-pengeluaran kecil harian akumulatif membuat gaji habis sebelum akhir bulan.', impact: 'Kegagalan dalam menabung dan tidak memiliki dana darurat.', solutionHighlight: 'Kategorisasi Otomatis AI & Alert Batas Budget.' }
    ],
    solutionOverview: 'Aplikasi asisten keuangan pribadi yang mencatat transaksi, menganalisis pola belanja, dan memberikan saran alokasi dana.',
    businessImpactSummary: ['Peningkatan Rata-rata Tabungan Bulanan 25%', 'Deteksi Dini Pengeluaran Implulsif', 'Laporan Kesehatan Finansial Transparan'],
    modules: [
      { id: 'pfm1', name: 'Auto Expense Categorizer', description: 'Pengelompokan transaksi otomatis (makanan, tagihan, hiburan).', iconName: 'PieChart', aiBadge: 'AI Categorizer' },
      { id: 'pfm2', name: 'Budgeting & Saving Target', description: 'Pengaturan batas anggaran dan pelacak progres dana darurat.', iconName: 'Target' }
    ],
    aiFeatures: [
      { id: 'pff1', name: 'AI Financial Coach', description: 'Memberikan masukan cerdas saat pengguna melebihi anggaran kategori tertentu.', iconName: 'Sparkles', type: 'Copilot' }
    ],
    workflowSteps: [
      { step: 1, title: 'Input Transaksi', desc: 'Pengguna mencatat atau unggah resi belanja.', icon: 'CreditCard' },
      { step: 2, title: 'Analisis AI', desc: 'AI mengategorikan dan mengevaluasi sisa budget.', icon: 'Cpu' },
      { step: 3, title: 'Nasihat Finansial', desc: 'AI memberikan tips alokasi tabungan dan investasi.', icon: 'Sparkles' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Pemasukan Bulan Ini', value: 'Rp 18.500.000', change: '+5%', isPositive: true, subtext: 'Gaji & Side Income' },
        { label: 'Total Pengeluaran', value: 'Rp 9.200.000', change: '50% Budget', isPositive: true, subtext: 'Batas Rp 12.000.000' },
        { label: 'Tingkat Tabungan (Savings Rate)', value: '38%', change: '+8%', isPositive: true, subtext: 'Sehat (> 20%)' },
        { label: 'Dana Darurat Terkumpul', value: 'Rp 45.000.000', change: '75% Goal', isPositive: true, subtext: 'Target 6x Gaji' }
      ],
      chartTitle: 'Breakdown Pengeluaran per Kategori (Bulan Ini)',
      chartData: [
        { name: 'Makanan & Kopi', actual: 3200, target: 3000 },
        { name: 'Sewa & Utilitas', actual: 2800, target: 3000 },
        { name: 'Transportasi', actual: 1200, target: 1500 },
        { name: 'Hiburan', actual: 1100, target: 1000 }
      ],
      tableTitle: 'Transaksi Terakhir & Evaluasi AI',
      tableHeaders: ['Tanggal', 'Deskripsi Transaksi', 'Kategori', 'Jumlah', 'Evaluasi AI'],
      tableRows: [
        { 'Tanggal': '14 Ags 2026', 'Deskripsi Transaksi': 'Supermarket X', 'Kategori': 'Kebutuhan Rumah', 'Jumlah': 'Rp 450.000', 'Evaluasi AI': 'Sesuai Budget' },
        { 'Tanggal': '12 Ags 2026', 'Deskripsi Transaksi': 'Kopi Kekinian Y', 'Kategori': 'Hiburan/Gaya Hidup', 'Jumlah': 'Rp 85.000', 'Evaluasi AI': '⚠️ Melebihi Batas Harian' }
      ],
      aiInsightBanner: '💡 Financial Disclaimer: Nasihat AI bersifat informatif sebagai panduan mandiri dan bukan saran finansial resmi berlisensi OJK.'
    },
    benefits: ['Disiplin finansial meningkat.', 'Pencapaian target masa depan lebih terstruktur.'],
    useCases: [
      { id: 'ucpf1', title: 'Peringatan Anggaran Kopi & Hiburan', scenario: 'Pengeluaran kopi melebih alokasi bulanan di minggu kedua.', aiRole: 'AI memberi pop-up ramah menyarankan pembuatan kopi sendiri.', outcome: 'Pengguna menghemat Rp 600.000 dalam 2 minggu.' }
    ],
    integrations: ['Bank Statement Parser (CSV/PDF)', 'E-Wallet Log Parser'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js'] }
    ],
    relatedSlugs: ['familyhub', 'retail'],
    cta: { buildText: 'Bangun App Finansial', consultText: 'Konsultasi Fitur Finansial', estimateText: 'Hitung Estimasi' }
  },

  // 16. RESTAURANT / RESTORAN & F&B
  {
    slug: 'restaurant',
    name: 'Restoran & F&B (Restaurant)',
    subtitle: 'Smart F&B POS, Self-Order QR, Kitchen Display (KDS) & Food Costing',
    category: 'Food & Beverage',
    isFeatured: true,
    published: true,
    icon: '🍽️',
    heroTagline: 'Sistem Manajemen Restoran, Cafe, Bakery & F&B Multi-Outlet Berbasis AI',
    heroDescription:
      'Digitalisasi operasional kuliner modern: Pemesanan langsung dari meja via QR Code Self-Order, Kitchen Display System (KDS) multi-stasiun dapur & bar, resep bahan baku & auto inventory deduction (BOM), kalkulasi margin HPP/COGS otomatis, integrasi POS kasir omni-channel (GrabFood/GoFood/ShopeeFood), dan AI demand forecasting jam sibuk.',
    metaTitle: 'Software Restoran POS, KDS & Food Cost AI | SMART-AI.ID',
    metaDescription: 'Solusi software restoran & cafe terintegrasi QR Order Meja, Kitchen Display System (KDS), Resep HPP Bahan Baku, dan AI Sales Predictor.',
    problems: [
      { id: 'resp1', title: 'Food Cost (HPP) Membengkak & Bahan Baku Rusak/Terbuang', description: 'Penggunaan bahan makanan di dapur tidak terukur dan tidak ada tracking resep baku per porsi menu.', impact: 'Margin laba bisnis kuliner tergerus hingga 20-30%.', solutionHighlight: 'Recipe Management (BOM) & Auto Deduct Stok Bahan Baku per Transaksi.' },
      { id: 'resp2', title: 'Salah Catat Bon Manual & Antrean Makanan Keluar Lama', description: 'Order kertas manual sering hilang atau salah dibaca koki dapur, menimbulkan komplain pelanggan.', impact: 'Waktu saji meja lambat dan rating review Google Maps menurun.', solutionHighlight: 'Kitchen Display System (KDS) Digital dengan Timer Waktu Saji Interaktif.' }
    ],
    solutionOverview: 'Sistem operasional restoran terpadu dari pemesanan mandiri di meja smartphone pelanggan, aliran pesanan ke layar koki dapur, kasir POS, hingga monitoring inventori bahan segar.',
    businessImpactSummary: ['Penurunan Biaya Waste Bahan Baku 22%', 'Pesanan Sampai di Meja 35% Lebih Cepat', 'Akurasi HPP Resep Makanan 100%', 'Peningkatan Omset Meja (Table Turnover) +28%'],
    modules: [
      { id: 'resm1', name: 'QR Table Self-Ordering & Digital Menu', description: 'Pelanggan scan QR meja untuk melihat foto menu HD, custom notes (pedas/less sugar), dan bayar instan.', iconName: 'QrCode', aiBadge: 'Self-Order' },
      { id: 'resm2', name: 'Kitchen Display System (KDS) & Bar Station', description: 'Layar dapur digital menggantikan kertas bon, lengkap dengan kategori stasiun masak dan timer penyajian.', iconName: 'Tv', aiBadge: 'KDS Core' },
      { id: 'resm3', name: 'Recipe (BOM) & Auto Raw Material Deduction', description: 'Setiap menu terhubung ke gramatur bahan baku; stok daging, minyak, bumbu otomatis berkurang saat terjual.', iconName: 'Layers' },
      { id: 'resm4', name: 'Cloud POS Kasir, Split Bill & Multi-Payment', description: 'Kasir cepat dengan fitur split bill per orang/menu, integrasi QRIS dinamis, EDC, dan cetak printer dapur.', iconName: 'CreditCard' }
    ],
    aiFeatures: [
      { id: 'resf1', name: 'AI Smart Upselling & Menu Recommendation', description: 'Merekomendasikan menu pendamping (side dish & minuman favorit) secara cerdas saat pelanggan memilih makanan utama via QR.', iconName: 'Sparkles', type: 'Recommendations' },
      { id: 'resf2', name: 'AI Demand & Busy Hour Forecasting', description: 'Memproyeksikan lonjakan volume pengunjung pada akhir pekan dan hari libur untuk persiapan porsi bumbu siap saji.', iconName: 'TrendingUp', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Pelanggan Scan QR Meja', desc: 'Memilih menu dan memasukkan catatan khusus langsung dari smartphone.', icon: 'Smartphone' },
      { step: 2, title: 'KDS Dapur Memasak', desc: 'Koki melihat urutan order di layar KDS dapur dan menandai status Done saat matang.', icon: 'Tv' },
      { step: 3, title: 'Penyajian & Kasir', desc: 'Pelayan menyajikan makanan, kasir menerima pembayaran, dan stok bahan baku terpotong otomatis.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Omset Resto Hari Ini', value: 'Rp 28.400.000', change: '+22%', isPositive: true, subtext: '210 Transaksi Meja & Takeaway' },
        { label: 'Rata-rata Durasi Dapur (Prep Time)', value: '8,5 Menit', change: '-2,5 Min', isPositive: true, subtext: 'Sangat Cepat (Target < 12 Min)' },
        { label: 'Rata-rata Food Cost (HPP)', value: '31,2%', change: 'Ideal', isPositive: true, subtext: 'Target Standar < 35%' },
        { label: 'Menu Paling Laris Hari Ini', value: 'Nasi Goreng Wagyu', change: '85 Porsi', isPositive: true, subtext: 'Favorit Pelanggan' }
      ],
      chartTitle: 'Volume Pesanan per Jam (Jam Makan Siang vs Makan Malam)',
      chartData: [
        { name: '11:00', actual: 25, target: 20 },
        { name: '13:00', actual: 68, target: 50 },
        { name: '15:00', actual: 22, target: 20 },
        { name: '17:00', actual: 35, target: 30 },
        { name: '19:00', actual: 92, target: 75 },
        { name: '21:00', actual: 44, target: 35 }
      ],
      tableTitle: 'Status Ketersediaan Bahan Baku Utama Dapur & Resep',
      tableHeaders: ['Bahan Baku', 'Stok Saat Ini', 'Kebutuhan Harian', 'Batas Kritis', 'Status AI'],
      tableRows: [
        { 'Bahan Baku': 'Daging Wagyu Slice (Gram)', 'Stok Saat Ini': '14,5 kg', 'Kebutuhan Harian': '10 kg', 'Batas Kritis': '5 kg', 'Status AI': 'Aman' },
        { 'Bahan Baku': 'Beras Premium Ramos', 'Stok Saat Ini': '50 kg', 'Kebutuhan Harian': '25 kg', 'Batas Kritis': '15 kg', 'Status AI': 'Aman' },
        { 'Bahan Baku': 'Saus Teriyaki Racikan', 'Stok Saat Ini': '1,2 Liter', 'Kebutuhan Harian': '3,5 Liter', 'Batas Kritis': '2 Liter', 'Status AI': '⚠️ Stok Kritis - Segera Racik' }
      ],
      aiInsightBanner: '💡 AI Resto Note: Pesanan jam 19:00 diprediksi melonjak 30%. Siapkan 2 liter porsi bumbu saus teriyaki tambahan sebelum jam makan malam dimulai.'
    },
    benefits: ['Layanan resto lebih cepat dan modern, bebas kesalahan bon salah catat.', 'Kontrol ketat persediaan bahan baku dan food cost transparan.'],
    useCases: [
      { id: 'ucres1', title: 'Upselling Otomatis Saat Scan QR', scenario: 'Pelanggan memesan burger Wagyu.', aiRole: 'Sistem merekomendasikan kentang goreng truffle & es teh leci dingin dengan 1 klik.', outcome: 'Nilai rata-rata keranjang belanja naik Rp 35.000 per transaksi meja.' }
    ],
    integrations: ['Printer Thermal LAN/Bluetooth Dapur', 'QRIS Dinamis & Mesin EDC', 'Integrasi GrabFood / GoFood Merchant API'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'PWA Table Mode'] },
      { category: 'Backend', stack: ['Express.js', 'PostgreSQL', 'Socket Real-Time KDS'] }
    ],
    relatedSlugs: ['retail', 'distributor', 'hotel'],
    cta: { buildText: 'Bangun Software Restoran Modern', consultText: 'Konsultasi Solusi Restoran', estimateText: 'Hitung Estimasi Biaya F&B' }
  },

  // 17. HOTEL & HOSPITALITY
  {
    slug: 'hotel',
    name: 'Hotel & Hospitality (Smart Hotel)',
    subtitle: 'Cloud PMS, Two-Way OTA Channel Manager & AI Guest Experience',
    category: 'Hospitality',
    isFeatured: true,
    published: true,
    icon: '🏨',
    heroTagline: 'Sistem Manajemen Hotel, Resort & Villa Berbasis Cloud & AI',
    heroDescription:
      'Solusi Property Management System (PMS) all-in-one: Kelola reservasi kamar, sinkronisasi inventori OTA dua arah (Tiket.com, Traveloka, Agoda, Booking.com), operasional Housekeeping real-time, front desk express check-in/out, restoran hotel & banquet MICE, serta WhatsApp AI Concierge 24/7.',
    metaTitle: 'Software Hotel PMS, Channel Manager & AI Concierge | SMART-AI.ID',
    metaDescription: 'Solusi Property Management System (PMS) Hotel & Resort terintegrasi OTA Channel Manager, Mobile Housekeeping, F&B Billing, dan AI Dynamic Pricing.',
    problems: [
      { id: 'hotp1', title: 'Risiko Overbooking & Keterlambatan Update Ketersediaan di OTA', description: 'Update alokasi kamar manual di banyak platform OTA sering menyebabkan double booking dan komplain tamu.', impact: 'Kerugian reputasi hotel dan denda pembatalan OTA bernilai jutaan rupiah.', solutionHighlight: 'Two-Way Instant OTA Channel Manager Sync secara real-time antar platform.' },
      { id: 'hotp2', title: 'Housekeeping Lambat & Kamar Belum Siap Saat Tamu Tiba', description: 'Komunikasi status pembersihan kamar via walkie-talkie lambat dan sering terjadi miskomunikasi status Clean/Dirty.', impact: 'Waktu tunggu tamu di lobby lama dan skor ulasan TripAdvisor/Google Maps menurun.', solutionHighlight: 'Mobile Housekeeping App dengan auto-dispatch tugas kamar kotor ke staf kebersihan.' },
      { id: 'hotp3', title: 'Harga Kamar Statis Tidak Mengikuti Dinamika Pasar', description: 'Tarif kamar tidak disesuaikan dengan lonjakan permintaan saat ada event konser, musim liburan, atau harga pesaing.', impact: 'Kehilangan potensi pendapatan kamar (RevPAR) hingga puluhan persen.', solutionHighlight: 'AI Dynamic Room Pricing Engine yang mengoptimalkan rate harian secara otomatis.' }
    ],
    solutionOverview: 'Sistem operasional perhotelan modern yang menghubungkan reservasi online, front office, housekeeping, restoran hotel, billing kasir, dan smart guest portal.',
    businessImpactSummary: [
      'Peningkatan Okupansi Kamar & RevPAR hingga 24%',
      'Nol Insiden Overbooking Antar-Channel OTA',
      'Kecepatan Check-In Tamu 3x Lebih Cepat',
      'Kepuasan Tamu (Guest CSAT) Mencapai 4.8 / 5.0'
    ],
    modules: [
      { id: 'hotm1', name: 'Cloud Front Desk & PMS Engine', description: 'Manajemen reservasi, room grid visual interaktif, express check-in/out, folio tagihan, dan night audit otomatis.', iconName: 'Building2', aiBadge: 'PMS Core' },
      { id: 'hotm2', name: 'Two-Way OTA Channel Manager', description: 'Sinkronisasi harga dan ketersediaan kamar otomatis ke Traveloka, Tiket.com, Agoda, Booking.com, dan Airbnb.', iconName: 'Globe', aiBadge: 'OTA Sync' },
      { id: 'hotm3', name: 'Mobile Housekeeping & Room Status', description: 'Lacak status Clean, Dirty, Inspected, Out of Order secara real-time dari smartphone staf kebersihan.', iconName: 'Sparkles' },
      { id: 'hotm4', name: 'F&B Room Service & Banquet MICE POS', description: 'Pemesanan makanan ke kamar, billing terintegrasi ke folio kamar tamu, dan manajemen event wedding/MICE.', iconName: 'Utensils' }
    ],
    aiFeatures: [
      { id: 'hotf1', name: 'AI Dynamic Room Pricing Engine', description: 'Menyesuaikan tarif kamar otomatis berdasarkan tren demand, okupansi riil, hari libur nasional, dan harga kompetitor.', iconName: 'TrendingUp', type: 'Forecasting' },
      { id: 'hotf2', name: '24/7 Multi-Language WhatsApp Guest Concierge', description: 'Asisten AI ramah menjawab pertanyaan fasilitas hotel, melayani room service, dan memberikan panduan wisata lokal dalam berbagai bahasa.', iconName: 'MessageSquare', type: 'Copilot' }
    ],
    workflowSteps: [
      { step: 1, title: 'Direct / OTA Booking', desc: 'Tamu memesan kamar dari website hotel atau mitra OTA terhubung.', icon: 'Globe' },
      { step: 2, title: 'Express Front Desk Check-in', desc: 'Scan KTP/Paspor, pilih kamar interaktif, dan cetak Smart Room Key.', icon: 'Key' },
      { step: 3, title: 'In-Stay Guest Experience', desc: 'Tamu memesan amenities dan F&B melalui WhatsApp AI Concierge.', icon: 'Coffee' },
      { step: 4, title: 'Instant Express Check-out', desc: 'Folio billing terbayar lunas otomatis, status kamar beralih ke Dirty untuk dibersihkan.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Tingkat Okupansi Hari Ini', value: '88,4%', change: '+12,5%', isPositive: true, subtext: '142 dari 160 Kamar Terisi' },
        { label: 'Average Daily Rate (ADR)', value: 'Rp 875.000', change: '+8,2%', isPositive: true, subtext: 'Target Rp 800.000' },
        { label: 'RevPAR (Revenue per Room)', value: 'Rp 773.500', change: '+18,4%', isPositive: true, subtext: 'Performa Sangat Tinggi' },
        { label: 'Skor Kepuasan Tamu (CSAT)', value: '4,8 / 5.0', change: 'Excellent', isPositive: true, subtext: 'Berdasarkan 320 Ulasan' }
      ],
      chartTitle: 'Tren Okupansi Kamar & Pendapatan Harian (Minggu Ini)',
      chartData: [
        { name: 'Senin', actual: 72, target: 65 },
        { name: 'Selasa', actual: 68, target: 65 },
        { name: 'Rabu', actual: 80, target: 70 },
        { name: 'Kamis', actual: 85, target: 75 },
        { name: 'Jumat', actual: 95, target: 90 },
        { name: 'Sabtu', actual: 98, target: 95 },
        { name: 'Minggu', actual: 88, target: 80 }
      ],
      tableTitle: 'Status Operasional Kamar & Housekeeping (Live Feed)',
      tableHeaders: ['No Kamar', 'Tipe Kamar', 'Nama Tamu', 'Status Kamar', 'Housekeeping', 'Status AI'],
      tableRows: [
        { 'No Kamar': 'Deluxe 301', 'Tipe Kamar': 'Deluxe Ocean View', 'Nama Tamu': 'Bpk. Hendra Gunawan', 'Status Kamar': 'Occupied', 'Housekeeping': 'Clean', 'Status AI': 'Aman' },
        { 'No Kamar': 'Suite 502', 'Tipe Kamar': 'Executive Suite', 'Nama Tamu': 'Ibu Ratna Dewi', 'Status Kamar': 'Due Out (12:00)', 'Housekeeping': 'Assigned Staff', 'Status AI': 'Prioritas Bersih - Tamu Berikutnya Check-In 14:00' },
        { 'No Kamar': 'Superior 204', 'Tipe Kamar': 'Superior Twin', 'Nama Tamu': '-', 'Status Kamar': 'Vacant Ready', 'Housekeeping': 'Inspected OK', 'Status AI': 'Siap Dijual (OTA Live)' }
      ],
      aiInsightBanner: '💡 AI Revenue Advisor: Weekend ini diprediksi lonjakan wisatawan keluarga. Disarankan menaikkan rate kamar Family Suite sebesar 15%.'
    },
    benefits: [
      'Manajemen reservasi terpusat bebas risiko overbooking.',
      'Peningkatan kepuasan tamu dengan layanan AI Concierge cepat.',
      'Laporan night audit dan integrasi keuangan otomatis.'
    ],
    useCases: [
      {
        id: 'uchot1',
        title: 'Otomasi Penyesuaian Harga Saat High Season',
        scenario: 'Terdapat event festival musik besar berjarak 2 km dari hotel pada akhir pekan.',
        aiRole: 'AI mendeteksi kenaikan pencarian OTA dan otomatis menyesuaikan ADR kamar ke tarif optimal.',
        outcome: 'Pendapatan hotel melonjak 32% dibanding tarif reguler.'
      }
    ],
    integrations: ['Channel Manager API (Traveloka, Tiket, Agoda, Booking)', 'Payment Gateway QRIS/CC', 'Smart Door Lock IoT Key', 'Mesin EDC Bank'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'Mobile PWA'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js', 'PostgreSQL Multi-Tenant'] }
    ],
    relatedSlugs: ['restaurant', 'retail', 'enterprise'],
    cta: { buildText: 'Bangun Software Hotel & PMS', consultText: 'Konsultasi Solusi Perhotelan', estimateText: 'Hitung Estimasi Hotel' }
  },

  // 17. DISTRIBUTOR
  {
    slug: 'distributor',
    name: 'Distributor',
    subtitle: 'Smart Distribution Management System (DMS)',
    category: 'Logistics',
    isFeatured: false,
    published: true,
    icon: '📦',
    heroTagline: 'Sistem Manajemen Distribusi, Sales Canvas & Gudang FMCG',
    heroDescription:
      'Solusi bisnis distributor: Aplikasi Salesman Canvassing GPS, pengelolaan toko/outlet, piutang (AR/AP), alokasi armada pengiriman, dan AI Sales Target Optimization.',
    metaTitle: 'Software Distributor FMCG & Sales Canvassing AI | SMART-AI.ID',
    metaDescription: 'Solusi aplikasi distributor DMS terintegrasi Sales Mobile App, Tracking Toko, Manajemen Piutang, dan AI Demand Predictor.',
    problems: [
      { id: 'disp1', title: 'Kunjungan Salesman Fiktif & Piutang Macet', description: 'Salesman tidak benar-benar mendatangi toko outlet dan tagihan piutang menumpuk tak tertagih.', impact: 'Cashflow distributor terganggu dan barang kadaluarsa di toko.', solutionHighlight: 'GPS Geofencing Sales Visit & Credit Limit AI.' }
    ],
    solutionOverview: 'Sistem DMS komprehensif untuk mengelola rantai pasok dari produsen ke distributor hingga ribuan outlet retail.',
    businessImpactSummary: ['Cakupan Kunjungan Salesman Naik 35%', 'Penurunan Piutang Macet hingga 24%', 'Efisiensi Rute Pengiriman Barang'],
    modules: [
      { id: 'dism1', name: 'Salesman Mobile Canvassing', description: 'Aplikasi salesman lapanga dengan fitur GPS check-in, katalog, dan TAKA.', iconName: 'Smartphone', aiBadge: 'Geofence' },
      { id: 'dism2', name: 'Credit Limit & AR Collection', description: 'Pengawasan plafon kredit toko dan jadwal penagihan kolektor.', iconName: 'DollarSign' }
    ],
    aiFeatures: [
      { id: 'disf1', name: 'AI Sales Route & Order Advisor', description: 'Menyarankan urutan kunjungan toko paling efisien dan produk wajib ditawarkan.', iconName: 'Navigation', type: 'Recommendations' }
    ],
    workflowSteps: [
      { step: 1, title: 'Kunjungan Salesman', desc: 'Salesman melakukan check-in GPS di lokasi toko.', icon: 'MapPin' },
      { step: 2, title: 'Input Order (Taking Order)', desc: 'Order terikat plafon kredit toko terverifikasi.', icon: 'ShoppingCart' },
      { step: 3, title: 'Pengiriman & Surat Jalan', desc: 'Armada pengiriman mengantar barang dan rekap tagihan.', icon: 'Truck' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Omset Distribusi', value: 'Rp 1,84 Miliar', change: '+14,5%', isPositive: true, subtext: 'Bulan Ini' },
        { label: 'Cakupan Outlet Aktif (Effective Call)', value: '840 Toko', change: '+8,2%', isPositive: true, subtext: 'Dari 950 Outlet' },
        { label: 'Tingkat Piutang Lancar', value: '92,4%', change: '+3,0%', isPositive: true, subtext: 'Jatuh Tempo Aman' },
        { label: 'Jumlah Salesman Aktif', value: '24 Personel', change: 'Sesuai Rute', isPositive: true, subtext: 'GPS Online' }
      ],
      chartTitle: 'Capaian Omset Penjualan per Tim Salesman Distributor',
      chartData: [
        { name: 'Tim Utara', actual: 520, target: 450 },
        { name: 'Tim Selatan', actual: 480, target: 450 },
        { name: 'Tim Barat', actual: 410, target: 450 },
        { name: 'Tim Timur', actual: 430, target: 450 }
      ],
      tableTitle: 'Status Kunjungan Salesman Hari Ini (Live GPS Check-in)',
      tableHeaders: ['Nama Salesman', 'Wilayah Rute', 'Target Outlet', 'Dikunjungi', 'Total Order', 'Status AI'],
      tableRows: [
        { 'Nama Salesman': 'Dedi Suhendar', 'Wilayah Rute': 'Area Utara A', 'Target Outlet': '18 Toko', 'Dikunjungi': '16 Toko', 'Total Order': 'Rp 42.000.000', 'Status AI': 'Optimal' },
        { 'Nama Salesman': 'Rian Hidayat', 'Wilayah Rute': 'Area Barat B', 'Target Outlet': '20 Toko', 'Dikunjungi': '12 Toko', 'Target Order': 'Rp 28.000.000', 'Status AI': '⚠️ Rute Terlambat' }
      ],
      aiInsightBanner: '💡 AI DMS Note: Rute Area Utara A menghasilkan angka Taking Order tertinggi hari ini. Kredit limit Toko Subur dinaikkan otomatis.'
    },
    benefits: ['Transparansi penuh aktivitas tim penjualan lapangan.', 'Perputaran kas lebih cepat.'],
    useCases: [
      { id: 'ucdis1', title: 'Pencegahan Kredit Macet Toko Retail', scenario: 'Sebuah toko memesan barang senilai 20 juta padahal ada tagihan menunggak.', aiRole: 'AI memblokir pembuatan Surat Jalan otomatis hingga tunggakan terbayar.', outcome: 'Distributor terhindar dari potensi piutang macet.' }
    ],
    integrations: ['GPS Mobile Tracking', 'ERP Accounting', 'Bluetooth Thermal Printer'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js'] }
    ],
    relatedSlugs: ['retail', 'logistics', 'manufacturing'],
    cta: { buildText: 'Bangun Software Distributor', consultText: 'Konsultasi Distribusi', estimateText: 'Hitung Estimasi DMS' }
  },

  // 18. LOGISTICS
  {
    slug: 'logistics',
    name: 'Logistics',
    subtitle: 'Smart Freight, Cargo Fleet & Transport Management System',
    category: 'Logistics',
    isFeatured: false,
    published: true,
    icon: '🚛',
    heroTagline: 'Sistem Manajemen Logistik, Kargo & Fleet Tracking Berbasis AI',
    heroDescription:
      'Solusi perusahaan logistik & ekspedisi: Routing pengiriman optimal, tracking posisi truk GPS, pengelolaan POD (Proof of Delivery), biaya BBM/Tol, dan prediksi ETA.',
    metaTitle: 'Software Logistik Ekspedisi & Fleet Tracking AI | SMART-AI.ID',
    metaDescription: 'Solusi manajemen logistik TMS terintegrasi Fleet GPS, Route Optimizer, Digital POD, dan AI Maintenance Predictor.',
    problems: [
      { id: 'logp1', title: 'Inefisiensi Rute Pengiriman & Biaya BBM', description: 'Driver mengambil rute memutar atau terjebak kemacetan panjang.', impact: 'Pembengkakan uang jalan BBM dan keterlambatan barang sampai ke pemesan.', solutionHighlight: 'AI Dynamic Route Optimizer & ETA Engine.' }
    ],
    solutionOverview: 'Platform TMS pintar untuk mengendalikan pengiriman kargo darat, laut, dan udara dalam satu layar monitoring.',
    businessImpactSummary: ['Efisiensi Biaya BBM Pengiriman 18%', 'Akurasi Waktu Tiba (ETA) 96%', 'Digitalisasi Surat Jalan / POD 100%'],
    modules: [
      { id: 'logm1', name: 'Fleet Tracking & GPS Command Center', description: 'Pelacakan armada truk kontainer, fuso, dan tronton 24 jam.', iconName: 'Navigation', aiBadge: 'GPS Live' },
      { id: 'logm2', name: 'Digital POD & Shipment Dispatch', description: 'Surat jalan digital dengan foto bukti serah terima barang.', iconName: 'FileCheck' }
    ],
    aiFeatures: [
      { id: 'logf1', name: 'AI Route & Fuel Efficiency Optimizer', description: 'Menghitung rute tercepat dan paling hemat tol/BBM untuk setiap perjalanan pengiriman.', iconName: 'Sparkles', type: 'Recommendations' }
    ],
    workflowSteps: [
      { step: 1, title: 'Order Pengiriman', desc: 'Customer membuat resi pengiriman kargo.', icon: 'FileText' },
      { step: 2, title: 'Dispatch Driver', desc: 'Armada dan driver ditugaskan ke rute optimal.', icon: 'Truck' },
      { step: 3, title: 'Serah Terima (POD)', desc: 'Penerima menandatangani bukti digital POD.', icon: 'CheckCircle' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Pengiriman Hari Ini', value: '342 Kargo', change: '+12%', isPositive: true, subtext: 'Darat & Laut' },
        { label: 'Armada Aktif di Jalan', value: '88 Unit', change: 'GPS Online', isPositive: true, subtext: 'Dari 95 Truk' },
        { label: 'Ketepatan Waktu Tiba (On-Time)', value: '96,4%', change: '+2,1%', isPositive: true, subtext: 'Target > 95%' },
        { label: 'Status POD Terverifikasi', value: '310 POD', change: 'Instant Digital', isPositive: true, subtext: 'Langsung Tagih' }
      ],
      chartTitle: 'Volume Pengiriman Kargo per Wilayah Tujuan (Minggu Ini)',
      chartData: [
        { name: 'DKI Jakarta', actual: 1200, target: 1100 },
        { name: 'Jawa Barat', actual: 950, target: 900 },
        { name: 'Jawa Tengah', actual: 780, target: 750 },
        { name: 'Jawa Timur', actual: 860, target: 800 }
      ],
      tableTitle: 'Status Live Tracking Pengiriman Utama (TMS)',
      tableHeaders: ['No Resi / Surat Jalan', 'Driver & Armada', 'Rute Asal-Tujuan', 'Estimasi Tiba (ETA)', 'Status POD', 'Status AI'],
      tableRows: [
        { 'No Resi / Surat Jalan': 'LOG-9912', 'Driver & Armada': 'Bambang (Truk Fuso)', 'Rute Asal-Tujuan': 'Jakarta -> Semarang', 'Estimasi Tiba (ETA)': '18:30 (Sesuai Jadwal)', 'Status POD': 'Dalam Perjalanan', 'Status AI': 'Rute Optimal' },
        { 'No Resi / Surat Jalan': 'LOG-9920', 'Driver & Armada': 'Suryadi (Tronton)', 'Rute Asal-Tujuan': 'Bandung -> Surabaya', 'Estimasi Tiba (ETA)': '22:15 (Terlambat 30m)', 'Status POD': 'Dalam Perjalanan', 'Status AI': '⚠️ Macet Jalan Tol' }
      ],
      aiInsightBanner: '💡 AI Logistics Advisory: Rute Pantura aman lancar. Truk LOG-9920 disarankan keluar pintu tol Pejagan untuk menghindari kemacetan.'
    },
    benefits: ['Kepastian lokasi kargo bagi pengirim.', 'Pencairan tagihan ekspedisi lebih cepat.'],
    useCases: [
      { id: 'uclog1', title: 'Pencegahan Terlambat Sampai Pabrik Buyer', scenario: 'Macet parah melanda rute reguler tol Cikampek.', aiRole: 'AI merekomendasikan rute alternatif jalur selatan.', outcome: 'Komponen pabrik tiba tepat waktu, bebas klaim keterlambatan.' }
    ],
    integrations: ['GPS Device API (Teltonika, Ruptela)', 'Google Maps Routing API'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js'] }
    ],
    relatedSlugs: ['distributor', 'manufacturing', 'mining'],
    cta: { buildText: 'Bangun Software Logistik', consultText: 'Konsultasi Logistik', estimateText: 'Hitung Estimasi TMS' }
  },

  // 18.5 SMART FLEET MANAGEMENT SYSTEM (FMS)
  {
    slug: 'fleet-management',
    name: 'Fleet Management System (FMS)',
    subtitle: 'Smart Fleet Telematics, Real-Time GPS Tracking, Fuel Anti-Theft & Driver Safety Intelligence',
    category: 'Logistics',
    isFeatured: true,
    published: true,
    icon: '🚛',
    heroTagline: 'Software Manajemen Armada & Pelacak GPS Truk Terintegrasi AI',
    heroDescription:
      'Solusi komprehensif telematika armada transportasi, kargo, logistik, tambang, dan distribusi: Real-Time GPS Tracking dengan status kontak mesin (IGN ON/OFF), sensor level BBM solar anti-siphoning/pencurian, driver behavior scorecard (harsh braking & overspeeding), siklus rotasi ban & jadwal servis odometer, digital dispatching multi-stop, e-Surat Jalan (e-POD), dan AI Predictive Maintenance.',
    metaTitle: 'Software Fleet Management System & GPS Tracking AI | SMART-AI.ID',
    metaDescription:
      'Aplikasi manajemen armada dan tracking truk terpadu: Sensor BBM solar, driver safety scorecard, manajemen ban, jadwal servis odometer, e-POD surat jalan digital, dan AI Predictive Maintenance.',
    problems: [
      {
        id: 'fmp1',
        title: 'Biaya BBM Solar Membengkak & Rawan Pencurian (Siphoning)',
        description: 'Pengeluaran solar tidak sebanding dengan jarak tempuh riil. Pencurian BBM di rest area atau manipulasi struk SPBU sulit dibuktikan tanpa sensor tangki otomatis.',
        impact: 'Pemborosan biaya operasional armada hingga 25% dan kerugian jutaan rupiah per unit per bulan.',
        solutionHighlight: 'Sensor Level BBM Solar Presisi Tinggi dengan Notifikasi Instan Deteksi Penurunan Drastis (Siphoning Alert).'
      },
      {
        id: 'fmp2',
        title: 'Perilaku Sopir Ugal-ugalan, Kecepatan Berlebih & Jam Istirahat Kurang',
        description: 'Sopir kerap melakukan akselerasi kasar, rem mendadak (harsh braking), mengebut melebihi batas (overspeeding), dan idling mesin berjam-jam saat parkir.',
        impact: 'Tingginya risiko kecelakaan lalu lintas, keausan rem/mesin dini, serta klaim asuransi dan kerusakan muatan kargo.',
        solutionHighlight: 'Driver Safety Scorecard & DMS Telemetry dengan peringatan audio kabin dan sistem reward pengemudi teladan.'
      },
      {
        id: 'fmp3',
        title: 'Armada Breakdown Tiba-tiba & Manajemen Ban Tidak Terpantau',
        description: 'Jadwal ganti oli terlewat, rotasi ban tidak terjadwal, dan ban vulkanisir meletus di jalan tol karena tekanan angin tidak terpantau secara berkala.',
        impact: 'Keterlambatan pengiriman beruntun, penalti dari pemilik barang (shipper), dan biaya derek darurat yang mahal.',
        solutionHighlight: 'Manajemen Siklus Hidup Ban (Tyre Lifecycle) & Pengingat Servis Preventif Berbasis Odometer / Jam Mesin.'
      },
      {
        id: 'fmp4',
        title: 'Inefisiensi Rute Multi-Drop & Surat Jalan Kertas Sering Hilang',
        description: 'Dispatching pengiriman manual menghasilkan rute bolak-balik yang boros BBM. Surat jalan kertas basah, sobek, atau terlambat diserahkan ke tim keuangan.',
        impact: 'Penagihan invoice ke klien tertunda hingga berminggu-minggu, memperlambat arus kas (cashflow).',
        solutionHighlight: 'AI Route & Multi-Stop Dispatch Optimizer dengan Driver Mobile App e-POD (Tanda Tangan & Foto Digital).'
      }
    ],
    solutionOverview:
      'Platform Fleet Management SMART-AI.ID mengintegrasikan perangkat GPS Tracker IoT, sensor solar ultrasonik/kapasitif, diagnosa CAN-bus OBD-II, dan Driver Mobile App ke dalam satu Command Center terpusat.',
    businessImpactSummary: [
      'Penghematan Biaya Konsumsi BBM Solar 18% - 25%',
      'Penurunan Angka Kecelakaan & Pelanggaran Rute hingga 40%',
      'Masa Pakai Ban & Komponen Kendaraan Naik 35%',
      'Proses Tagihan 3x Lebih Cepat dengan Surat Jalan e-POD Digital'
    ],
    modules: [
      { id: 'fmm1', name: 'Live GPS Telematics & Command Center', description: 'Peta live posisi armada, status mesin kontak IGN ON/OFF, geofencing lokasi gudang/pelabuhan, dan playback jejak rute.', iconName: 'Navigation', aiBadge: 'Live GPS' },
      { id: 'fmm2', name: 'Fuel Level Sensor & Siphoning Alarm', description: 'Monitoring grafik volume solar tangki per liter, deteksi pencurian BBM saat parkir, dan rasio efisiensi KM/Liter.', iconName: 'Fuel', aiBadge: 'Anti-Theft' },
      { id: 'fmm3', name: 'Driver Behavior & Safety Scorecard', description: 'Skor keselamatan mengemudi berdasarkan sensor harsh braking, overspeeding, tikungan tajam, dan durasi idling.', iconName: 'ShieldCheck' },
      { id: 'fmm4', name: 'Tyre Lifecycle & Maintenance Scheduler', description: 'Tracking posisi nomor seri ban, ketebalan alur (tread depth), jadwal rotasi, serta servis oli berkala per odometer.', iconName: 'Wrench' },
      { id: 'fmm5', name: 'Multi-Stop Dispatch & Route Sequencer', description: 'Alokasi armada terdekat, pengurutan titik bongkar muat efisien, dan kalkulasi estimasi waktu tiba (ETA) akurat.', iconName: 'Layers' },
      { id: 'fmm6', name: 'Driver Mobile App & Digital e-POD', description: 'Aplikasi sopir untuk terima SPK jalan, upload foto kondisi barang, tanda tangan digital penerima, dan klaim uang jalan/tol.', iconName: 'Smartphone' }
    ],
    aiFeatures: [
      { id: 'fmf1', name: 'AI Predictive Vehicle Breakdown Forecaster', description: 'Menganalisis pola telemetri mesin dan getaran sensor untuk memprediksi kerusakan transmisi, aki, atau radiator sebelum mogok.', iconName: 'Wrench', type: 'Forecasting' },
      { id: 'fmf2', name: 'AI Fuel Siphoning & Anomaly Theft Detector', description: 'Algoritma machine learning yang membedakan penurunan solar alami saat tanjakan/beban berat vs aksi pencurian solar saat parkir.', iconName: 'AlertTriangle', type: 'Anomaly Detection' },
      { id: 'fmf3', name: 'AI Dynamic Route & Multi-Drop Fuel Optimizer', description: 'Menghitung rute tercepat dengan mempertimbangkan kepadatan lalu lintas, pembatasan jam truk, dan biaya tarif tol terhemat.', iconName: 'Sparkles', type: 'Recommendations' }
    ],
    workflowSteps: [
      { step: 1, title: 'Pembuatan Surat Perintah Kerja (SPK) & Dispatch', desc: 'Planner menentukan rute, muatan, unit armada terbaik, dan menugaskan sopir via aplikasi seluler.', icon: 'FileText' },
      { step: 2, title: 'Inspeksi Pra-Jalan (P2H) & Check-Out Armada', desc: 'Driver memeriksa kondisi rem, ban, oli, dan lampu via checklist digital di HP sebelum keluar pool/garasi.', icon: 'ClipboardCheck' },
      { step: 3, title: 'Monitoring Perjalanan, Kecepatan & BBM Real-Time', desc: 'Command center memantau pergerakan unit, deviasi rute, sensor solar, dan alarm keselamatan secara kontinu.', icon: 'MapPin' },
      { step: 4, title: 'Bongkar Muatan & Bukti Serah Terima (e-POD)', desc: 'Penerima menandatangani digital e-POD di layar smartphone sopir dan sistem otomatis memverifikasi lokasi penerima.', icon: 'CheckCircle' },
      { step: 5, title: 'Rekap Biaya Operasional (CPK) & Riwayat Odometer', desc: 'Sistem merekap pemakaian solar, biaya tol, klaim uang jalan, serta memperbarui odometer untuk servis berkala berikutnya.', icon: 'DollarSign' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Armada Terhubung', value: '128 Unit', change: 'Live GPS 98%', isPositive: true, subtext: '94 Bergerak | 28 Standby | 6 Servis' },
        { label: 'Efisiensi Rata-rata BBM', value: '3,84 KM/L', change: '+18,2%', isPositive: true, subtext: 'Penghematan Rp 42.500.000 / bln' },
        { label: 'Skor Keselamatan Pengemudi', value: '92,8 / 100', change: 'Safety Score A', isPositive: true, subtext: '0 Kecelakaan & 98% Patuh Rute' },
        { label: 'Ketepatan Waktu Delivery (On-Time)', value: '97,4%', change: '+3,5%', isPositive: true, subtext: 'Target Shipper > 95%' }
      ],
      chartTitle: 'Tren Konsumsi Solar (Liter) vs Jarak Tempuh Armada (6 Bulan Terakhir)',
      chartData: [
        { name: 'Januari', actual: 48000, target: 52000 },
        { name: 'Februari', actual: 45000, target: 50000 },
        { name: 'Maret', actual: 43000, target: 49000 },
        { name: 'April', actual: 41500, target: 48000 },
        { name: 'Mei', actual: 39800, target: 47000 },
        { name: 'Juni', actual: 38200, target: 46000 }
      ],
      tableTitle: 'Live Command Center Telemetri Armada Truk (Real-Time Live Feed)',
      tableHeaders: ['No Polisi / Unit', 'Jenis Armada', 'Nama Driver', 'Lokasi & Kecepatan', 'Status Mesin & BBM', 'Status AI'],
      tableRows: [
        { 'No Polisi / Unit': 'B 9821 UXT (TR-04)', 'Jenis Armada': 'Truk Fuso Box (12 Ton)', 'Nama Driver': 'Bambang Riyadi', 'Lokasi & Kecepatan': 'Tol Cipali KM 102 (78 km/jam)', 'Status Mesin & BBM': 'IGN ON | Solar 74% (180L)', 'Status AI': 'Optimal - Eco Driving' },
        { 'No Polisi / Unit': 'B 9132 FX (TR-12)', 'Jenis Armada': 'Tronton Wingbox (24 Ton)', 'Nama Driver': 'Agus Sulistyo', 'Lokasi & Kecepatan': 'Rest Area KM 57 (0 km/jam)', 'Status Mesin & BBM': 'IGN OFF | Solar 88% (320L)', 'Status AI': 'Parkir Aman (Geofence OK)' },
        { 'No Polisi / Unit': 'B 9445 TY (TR-09)', 'Jenis Armada': 'Dump Truck 10-Roda', 'Nama Driver': 'Dedi Wahyudi', 'Lokasi & Kecepatan': 'Jalur Tambang Site A (42 km/jam)', 'Status Mesin & BBM': 'IGN ON | Solar 45% (110L)', 'Status AI': '⚠️ Harsh Braking Alert (2x)' }
      ],
      aiInsightBanner: '💡 AI Fleet Security Alert: Unit TR-18 terdeteksi parkir di luar geofence resmi dengan konsumsi BBM normal. Seluruh 124 unit lainnya beroperasi dengan efisiensi solar prima.'
    },
    benefits: [
      'Visibilitas posisi dan status armada secara real-time 24/7 di seluruh Indonesia.',
      'Sensor solar anti-siphoning mengeliminasi kecurangan dan kebocoran BBM.',
      'Driver scorecard menurunkan risiko kecelakaan dan memperpanjang umur armada.',
      'Siklus hidup ban dan jadwal ganti oli terjaga presisi berbasis data odometer digital.'
    ],
    useCases: [
      {
        id: 'ucfms1',
        title: 'Deteksi Siphoning Solar & Efisiensi Bahan Bakar Truk Berat',
        scenario: 'Sebuah perusahaan kargo ekspedisi dengan 80 unit truk sering mengalami selisih klaim solar hingga puluhan juta per bulan.',
        aiRole: 'AI memetakan telemetri sensor BBM ultrasonik dan mendeteksi anomali penurunan solar 40L secara instan saat truk parkir di bahu jalan tak resmi.',
        outcome: 'Perusahaan berhasil membuktikan kecurangan oknum, memangkas biaya bahan bakar 22%, dan menghemat Rp 68 juta setiap bulannya.'
      }
    ],
    integrations: [
      'IoT GPS Tracker (Teltonika, Ruptela, Queclink, Meitrack)',
      'Capacitive & Ultrasonic Fuel Level Sensors (RS485/BLE)',
      'OBD-II / J1939 CAN-bus Vehicle Telemetry',
      'Dashcam AI (ADAS & Driver Fatigue DMS Camera)',
      'Google Maps & HERE Routing Engine API',
      'Integration ERP / Accounting (SAP, Accurate, Jurnal)'
    ],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'Live Mapbox GL Telemetry', 'Driver Mobile PWA'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js', 'PostgreSQL / TimescaleDB Time-Series', 'MQTT / TCP Telematics Broker'] }
    ],
    relatedSlugs: ['logistics', 'distributor', 'mining', 'manufacturing'],
    cta: { buildText: 'Bangun Software Fleet Management', consultText: 'Konsultasi Solusi Armada', estimateText: 'Hitung Estimasi Biaya FMS' }
  },

  // 19. ENTERPRISE
  {
    slug: 'enterprise',
    name: 'Enterprise',
    subtitle: 'Integrated Enterprise Resource Planning (ERP) & Executive AI',
    category: 'Enterprise',
    isFeatured: true,
    published: true,
    icon: '🏢',
    heroTagline: 'Platform ERP Enterprise & AI Executive Copilot Terintegrasi',
    heroDescription:
      'Digitalisasi grup perusahaan skala besar: Konsolidasi keuangan multi-entitas, CRM, HRIS Payroll, Procure-to-Pay, Asset Management, dan Executive Decision Support System.',
    metaTitle: 'Enterprise ERP Software & Executive AI Copilot | SMART-AI.ID',
    metaDescription: 'Solusi sistem ERP Enterprise terintegrasi Multi-Company Accounting, HRIS Payroll, Procurement, dan Executive AI Decision Engine.',
    problems: [
      { id: 'entp1', title: 'Silo Data Antar Anak Perusahaan / Holding', description: 'Holding kesulitan mengonsolidasikan laporan keuangan dan operasional dari belasan anak perusahaan.', impact: 'Pengambilan keputusan lambat dan visibilitas risiko grup minim.', solutionHighlight: 'Multi-Tenant Consolidated Dashboard & Executive AI.' }
    ],
    solutionOverview: 'Sistem ERP tingkat tinggi khusus korporasi dengan keamanan bertingkat, audit trail lengkap, dan kecerdasan eksekutif.',
    businessImpactSummary: ['Konsolidasi Laporan Keuangan Holding 1 Hari', 'Penghematan Operasional Grup hingga 22%', 'Keamanan Data Kelas Enterprise (SOC2/AES-256)'],
    modules: [
      { id: 'entm1', name: 'Executive Control & Multi-Company ERP', description: 'Konsolidasi neraca, laba rugi, dan transaksi antar anak perusahaan.', iconName: 'Building2', aiBadge: 'Executive AI' },
      { id: 'entm2', name: 'Enterprise HRIS & Automated Payroll', description: 'Manajemen 5.000+ karyawan, PPh21, BPJS, dan absensi terpusat.', iconName: 'Users' }
    ],
    aiFeatures: [
      { id: 'entf1', name: 'Enterprise AI Business Copilot', description: 'Asisten AI tempat jajaran Direksi bertanya performa bisnis holding via suara/teks.', iconName: 'Bot', type: 'Copilot' }
    ],
    workflowSteps: [
      { step: 1, title: 'Input Data Entitas', desc: 'Anak perusahaan menginput transaksi harian.', icon: 'Database' },
      { step: 2, title: 'Konsolidasi Otomatis', desc: 'Sistem menggabungkan data keuangan & operasional.', icon: 'Layers' },
      { step: 3, title: 'Executive AI Insight', desc: 'Direksi menerima proyeksi dan rekomendasi strategis.', icon: 'Sparkles' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Konsolidasi Revenue Holding', value: 'Rp 42,8 Miliar', change: '+16,4%', isPositive: true, subtext: '5 Anak Perusahaan' },
        { label: 'EBITDA Margin Grup', value: '24,8%', change: '+2,1%', isPositive: true, subtext: 'Sangat Sehat' },
        { label: 'Total Karyawan Grup', value: '2.450 Orang', change: 'Terintegrasi', isPositive: true, subtext: 'HRIS Multi-Branch' },
        { label: 'Skor Kesehatan Bisnis', value: '94 / 100', change: 'Excellence', isPositive: true, subtext: 'Pemeriksaan AI' }
      ],
      chartTitle: 'Kontribusi Pendapatan per Anak Perusahaan (Bulan Ini)',
      chartData: [
        { name: 'PT Mining Utama', actual: 18500, target: 16000 },
        { name: 'PT Agro Sawit', actual: 12400, target: 11000 },
        { name: 'PT Logistik Fast', actual: 6800, target: 6000 },
        { name: 'PT Retail Indo', actual: 5100, target: 5000 }
      ],
      tableTitle: 'Ringkasan Kinerja Anak Perusahaan Holding',
      tableHeaders: ['Entitas Perusahaan', 'Sektor Industri', 'Revenue Bulan Ini', 'Growth YoY', 'Cashflow Status', 'Status AI'],
      tableRows: [
        { 'Entitas Perusahaan': 'PT Mining Utama', 'Sektor Industri': 'Pertambangan', 'Revenue Bulan Ini': 'Rp 18,5 Miliar', 'Growth YoY': '+18,2%', 'Cashflow Status': 'Sangat Kuat', 'Status AI': 'Optimal' },
        { 'Entitas Perusahaan': 'PT Agro Sawit', 'Sektor Industri': 'Perkebunan', 'Revenue Bulan Ini': 'Rp 12,4 Miliar', 'Growth YoY': '+14,0%', 'Cashflow Status': 'Kuat', 'Status AI': 'Optimal' }
      ],
      aiInsightBanner: '💡 Executive AI Note: Seluruh entitas anak perusahaan mencapai target EBITDA kuartal ini. PT Mining Utama memberikan kontribusi laba terbesar.'
    },
    benefits: ['Efisiensi konsolidasi holding perusahaan.', 'Tata kelola bisnis (GCG) terukur.'],
    useCases: [
      { id: 'ucent1', title: 'Konsolidasi Laporan Keuangan Akhir Tahun', scenario: 'Holding harus menyajikan laporan konsolidasi 5 anak perusahaan untuk audit.', aiRole: 'AI merakap eliminasi transaksi antar entitas otomatis.', outcome: 'Laporan selesai dalam 2 hari dari biasanya 3 minggu.' }
    ],
    integrations: ['SAP / Oracle ERP', 'Bank Cash Management API', 'Core HR System'],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS'] },
      { category: 'Backend', stack: ['Express.js', 'PostgreSQL Distributed'] }
    ],
    relatedSlugs: ['mining', 'hospital', 'manufacturing'],
    cta: { buildText: 'Bangun Platform Enterprise', consultText: 'Konsultasi Enterprise ERP', estimateText: 'Hitung Estimasi Enterprise' }
  },

  // 20. TRAVEL HAJI & UMROH
  {
    slug: 'travel-haji-umroh',
    name: 'Travel Haji & Umroh',
    subtitle: 'Platform Manajemen Travel Haji, Umroh, Manifest Jamaah & Keuangan Terintegrasi AI',
    category: 'Travel & Umroh',
    isFeatured: true,
    published: true,
    icon: '🕋',
    heroTagline: 'Sistem Terpadu Biro Travel Haji & Umroh Berbasis AI & Siskopatuh Ready',
    heroDescription:
      'Kelola seluruh alur operasional biro haji & umroh: Pendaftaran online, AI OCR scan paspor/KTP, manifest tiket penerbangan, visa Nusuk/Muassasah, pembagian kamar hotel Makkah/Madinah, pembayaran cicilan, hingga AI asisten manasik jamaah di tanah suci.',
    metaTitle: 'Software Manajemen Travel Haji & Umroh Berbasis AI | SMART-AI.ID',
    metaDescription:
      'Solusi software biro perjalanan Haji Khusus dan Umroh terintegrasi: OCR Paspor, Manifest Maskapai, Rooming Hotel, Sistem Cicilan Tabungan, dan AI Asisten Manasik.',
    problems: [
      {
        id: 'tp1',
        title: 'Input Data Paspor & Dokumen Jamaah Lambat & Rawan Typo',
        description: 'Ribuan paspor dan KTP jamaah harus diketik manual oleh staf, memicu kesalahan fatal pada pengajuan visa atau tiket maskapai.',
        impact: 'Visa ditolak (reject), biaya perbaikan nama tiket mahal, dan jamaah terlambat berangkat.',
        solutionHighlight: 'AI OCR otomatis membaca foto paspor/KTP dalam 2 detik dengan akurasi 99.8%.'
      },
      {
        id: 'tp2',
        title: 'Pembagian Kamar Hotel (Rooming List) Makkah/Madinah Rumit',
        description: 'Menyusun pembagian kamar Quad, Triple, Double yang harus memisahkan ikhwan/akhwat dan menyatukan mahram keluarga memakan waktu berhari-hari.',
        impact: 'Komplain jamaah saat check-in hotel dan denda kamar kosong (empty bed charge) dari pihak hotel.',
        solutionHighlight: 'Smart Auto-Rooming Engine yang mengalokasikan kamar secara otomatis berdasarkan aturan mahram & tipe paket.'
      },
      {
        id: 'tp3',
        title: 'Pelacakan Pembayaran Cicilan & Rekonsiliasi Tabungan Jamaah',
        description: 'Sulit melacak jamaah yang belum lunas, pelunasan bertahap, dan komisi agen/cabang travel yang masih dicatat spreadsheet manual.',
        impact: 'Kebocoran arus kas dan sengketa komisi agen pemasaran travel.',
        solutionHighlight: 'Billing otomatis dengan Virtual Account, invoice WhatsApp bertahap, dan kalkulator komisi agen real-time.'
      },
      {
        id: 'tp4',
        title: 'Mutawwif Kerepotan Menjawab Pertanyaan Berulang & Koordinasi Lapangan',
        description: 'Di tanah suci, pembimbing ibadah (mutawwif) harus menjawab pertanyaan tata cara ibadah dan rute kumpul berulang-ulang dari puluhan jamaah.',
        impact: 'Jamaah tersesat di sekitar Masjidil Haram atau terlewat jadwal ziarah/manasik.',
        solutionHighlight: 'AI Asisten Mutawwif & Tanya Jawab Manasik 24/7 di aplikasi mobile jamaah.'
      }
    ],
    solutionOverview:
      'Platform Travel Haji & Umroh SMART-AI.ID menggabungkan CRM jamaah, OCR paspor, manifest penerbangan, manifest rooming hotel, pembayaran cicilan, dan mobile companion jamaah dalam satu sistem terintegrasi.',
    businessImpactSummary: [
      'Proses Input & Verifikasi Berkas Jamaah 4x Lebih Cepat',
      'Penyusunan Rooming List Hotel Selesai dalam Hitungan Menit',
      'Zero Error Manifest Tiket Pesawat & Visa Kemenag/Nusuk',
      'Kepuasan & Ketenangan Jamaah Meningkat Signifikan'
    ],
    modules: [
      { id: 'tm1', name: 'Manajemen Paket & Kuota Keberangkatan', description: 'Atur paket Umroh Reguler/VIP/Plus dan Haji Khusus, kuota seat, dan tanggal flight.', iconName: 'Calendar', aiBadge: 'Smart Quota' },
      { id: 'tm2', name: 'Registrasi Jamaah & AI OCR Paspor', description: 'Ekstraksi otomatis foto paspor/KTP, data mahram, rekam kesehatan, dan riwayat vaksin.', iconName: 'ScanLine', aiBadge: 'Vision AI' },
      { id: 'tm3', name: 'Manifest Penerbangan & Tracking Visa', description: 'Manajemen PNR tiket grup, penerbitan visa Muassasah/Nusuk, dan manifest bus bandara.', iconName: 'Plane' },
      { id: 'tm4', name: 'Smart Hotel Rooming Engine', description: 'Alokasi otomatis kamar hotel Makkah & Madinah (Quad, Triple, Double) sesuai mahram.', iconName: 'Hotel', aiBadge: 'Auto Allocate' },
      { id: 'tm5', name: 'Billing, Cicilan & Komisi Agen Travel', description: 'Penerbitan invoice DP, simulasi cicilan biaya keberangkatan, payment gateway VA, dan komisi agen.', iconName: 'CreditCard' },
      { id: 'tm6', name: 'Logistik Perlengkapan & Koper Jamaah', description: 'Manajemen stok seragam batik, koper, kain ihram, barcode koper, dan tracking pengiriman.', iconName: 'Package' }
    ],
    aiFeatures: [
      { id: 'tf1', name: 'AI Passport & Document OCR', description: 'Ekstraksi instan data teks paspor internasional (MRZ scanner) dan e-KTP tanpa ketik manual.', iconName: 'FileText', type: 'Automation' },
      { id: 'tf2', name: 'AI Smart Rooming Allocator', description: 'Algoritma pencocokan cerdas kamar hotel berdasarkan gender, ikatan keluarga/mahram, dan preferensi bed.', iconName: 'LayoutGrid', type: 'Recommendations' },
      { id: 'tf3', name: 'AI Asisten Mutawwif & Panduan Manasik', description: 'Chatbot asisten AI interaktif untuk panduan doa tawaf, sai, tahallul, fikih wanita haid, dan lokasi penting.', iconName: 'Bot', type: 'Copilot' },
      { id: 'tf4', name: 'AI Departure Trend & Seat Forecasting', description: 'Prediksi tren permintaan musim umroh (Ramadhan/Awal Musim) dan rekomendasi harga paket optimal.', iconName: 'TrendingUp', type: 'Forecasting' }
    ],
    workflowSteps: [
      { step: 1, title: 'Pemilihan Paket & Upload Dokumen', desc: 'Jamaah/agen mendaftar via web/mobile dan upload foto paspor & KTP.', icon: 'Smartphone' },
      { step: 2, title: 'Ekstraksi AI & Validasi Berkas', desc: 'AI OCR mengekstrak identitas paspor dan mengecek masa berlaku > 6 bulan.', icon: 'ScanLine' },
      { step: 3, title: 'Pembayaran DP & Cicilan Otomatis', desc: 'Jamaah membayar via Virtual Account dan otomatis menerima kuitansi resmi.', icon: 'CreditCard' },
      { step: 4, title: 'Penerbitan Tiket, Visa & Rooming', desc: 'Admin memproses PNR tiket, visa Muassasah, dan auto-generate rooming hotel.', icon: 'CheckCircle2' },
      { step: 5, title: 'Pendampingan Jamaah di Tanah Suci', desc: 'Jamaah menggunakan aplikasi mobile untuk jadwal harian dan AI panduan manasik.', icon: 'Sparkles' }
    ],
    dashboardPreview: {
      kpis: [
        { label: 'Total Jamaah Musim Ini', value: '1.450 Jamaah', change: '+28,5%', isPositive: true, subtext: '12 Grup Keberangkatan' },
        { label: 'Status Visa Terbit', value: '98,2%', change: '+4,1%', isPositive: true, subtext: 'Tersisa 26 proses kedutaan' },
        { label: 'Total Pendapatan Paket', value: 'Rp 41,2 Miliar', change: '+32,0%', isPositive: true, subtext: 'Target Rp 38 Miliar' },
        { label: 'Tingkat Pelunasan Tagihan', value: '94,6%', change: '+5,2%', isPositive: true, subtext: 'Auto Reminder WA Aktif' }
      ],
      chartTitle: 'Tren Keberangkatan Jamaah per Bulan (Musim Umroh 1447H)',
      chartData: [
        { name: 'Muh', actual: 120, target: 100 },
        { name: 'Saf', actual: 180, target: 150 },
        { name: 'Rab', actual: 240, target: 200 },
        { name: 'Jum', actual: 310, target: 250 },
        { name: 'Raj', actual: 280, target: 250 },
        { name: 'Sya', actual: 320, target: 300 }
      ],
      tableTitle: 'Status Manifest & Rombongan Keberangkatan Terdekat',
      tableHeaders: ['Kode Paket', 'Nama Paket Umroh', 'Tanggal Terbang', 'Seat Terisi', 'Status Visa', 'Status Rooming'],
      tableRows: [
        { 'Kode Paket': 'UMR-VIP-101', 'Nama Paket Umroh': 'Umroh VIP Bintang 5 Awal Musim (9 Hari)', 'Tanggal Terbang': '24 Nov 2026', 'Seat Terisi': '45 / 45 (Full)', 'Status Visa': '100% Issued', 'Status Rooming': 'Selesai (AI Matched)' },
        { 'Kode Paket': 'UMR-REG-204', 'Nama Paket Umroh': 'Umroh Reguler Plus Turki (12 Hari)', 'Tanggal Terbang': '02 Des 2026', 'Seat Terisi': '88 / 90', 'Status Visa': '82/88 Issued', 'Status Rooming': 'Draft Alokasi' },
        { 'Kode Paket': 'HAJ-FRO-001', 'Nama Paket Umroh': 'Haji Khusus Furoda Eksklusif 1448H', 'Tanggal Terbang': '15 Jun 2027', 'Seat Terisi': '30 / 30 (Full)', 'Status Visa': 'Dokumen Lengkap', 'Status Rooming': 'Selesai (AI Matched)' }
      ],
      aiInsightBanner: '💡 AI Travel Insights: Paket Umroh VIP 24 Nov telah 100% teralokasikan rooming hotel tanpa single supplement berlebih. AI merekomendasikan penambahan 1 kloter di bulan Rajab karena lonjakan lead jamaah.'
    },
    benefits: [
      'Menghilangkan 90% human error penulisan nama di paspor, visa, dan tiket pesawat.',
      'Otomatisasi rooming list hotel Makkah & Madinah sesuai aturan syar\'i mahram.',
      'Rekonsiliasi pembayaran cicilan jamaah real-time dengan integrasi Virtual Account.',
      'Meningkatkan reputasi biro travel dengan mobile app jamaah berfitur AI Mutawwif canggih.'
    ],
    useCases: [
      {
        id: 'uct1',
        title: 'Verifikasi Berkas Paspor 500 Jamaah Secara Massal',
        scenario: 'Biro travel menerima 500 berkas paspor jamaah dari berbagai kantor cabang dalam waktu singkat.',
        aiRole: 'AI OCR memindai seluruh paspor secara batch, mengekstrak data nama/nomor/expired, dan mendeteksi paspor yang masa berlakunya kurang dari 6 bulan.',
        outcome: 'Penyusunan manifest tiket maskapai selesai dalam 2 jam tanpa satupun kesalahan ketik nama.'
      },
      {
        id: 'uct2',
        title: 'Bantuan Manasik & Jamaah Terpisah di Makkah',
        scenario: 'Seorang jamaah lansia terpisah dari rombongan setelah shalat Isya di pelataran Masjidil Haram.',
        aiRole: 'Aplikasi mobile jamaah mendeteksi lokasi dan memberikan rute kembali ke hotel dengan panduan audio bahasa Indonesia, sekaligus mengirimkan koordinat ke HP Mutawwif.',
        outcome: 'Jamaah dapat dijemput oleh tim mutawwif dalam waktu kurang dari 15 menit.'
      }
    ],
    integrations: [
      'Siskopatuh Kemenag RI Integration',
      'Nusuk & Muassasah Visa Portal API',
      'Airline GDS / PNR Ticket Booking',
      'Bank Syariah Indonesia (BSI) / Virtual Account Gateway',
      'WhatsApp Business API Notification Broadcast'
    ],
    technologies: [
      { category: 'Frontend', stack: ['React 18', 'Tailwind CSS', 'Mobile PWA Jamaah', 'Responsive Travel Admin'] },
      { category: 'Backend', stack: ['Node.js', 'Express.js', 'PostgreSQL / Firestore', 'High-Concurrency Manifest Service'] },
      { category: 'AI & Intelligence', stack: ['Gemini 2.5 Flash Multimodal', 'Passport OCR Vision Engine', 'Smart Rooming Optimizer'] }
    ],
    relatedSlugs: ['hotel', 'logistics', 'fleet-management', 'enterprise'],
    cta: {
      buildText: 'Bangun Software Travel Haji & Umroh',
      consultText: 'Konsultasi Solusi Travel Umroh',
      estimateText: 'Hitung Estimasi Biaya Travel'
    }
  }
];

const ALIAS_MAP: Record<string, string> = {
  'peternakan-ayam': 'poultry',
  'ayam': 'poultry',
  'poultry-farming': 'poultry',
  'smart-poultry': 'poultry',
  'haji': 'travel-haji-umroh',
  'umroh': 'travel-haji-umroh',
  'umrah': 'travel-haji-umroh',
  'travel-haji': 'travel-haji-umroh',
  'travel-umroh': 'travel-haji-umroh',
  'travel-haji-umroh': 'travel-haji-umroh',
  'biro-haji': 'travel-haji-umroh',
  'biro-umroh': 'travel-haji-umroh',
  'jamaah': 'travel-haji-umroh',
  'siskopatuh': 'travel-haji-umroh',
  'mutawwif': 'travel-haji-umroh',
  'hotel': 'hotel',
  'hospitality': 'hotel',
  'smart-hotel': 'hotel',
  'hotel-resort': 'hotel',
  'resort': 'hotel',
  'klinik': 'clinic',
  'smart-clinic': 'clinic',
  'clinic': 'clinic',
  'klinik-medis': 'clinic',
  'apotek': 'pharmacy',
  'farmasi': 'pharmacy',
  'smart-pharmacy': 'pharmacy',
  'pharmacy': 'pharmacy',
  'drugstore': 'pharmacy',
  'restoran': 'restaurant',
  'cafe': 'restaurant',
  'smart-restaurant': 'restaurant',
  'fnb': 'restaurant',
  'rumah-sakit': 'hospital',
  'simrs': 'hospital',
  'tambang': 'mining',
  'sawit': 'plantation',
  'perkebunan': 'plantation',
  'udang': 'shrimp-farming',
  'ikan': 'fish-farming',
  'sekolah': 'school',
  'pabrik': 'manufacturing',
  'gudang': 'warehouse',
  'ritel': 'retail',
  'distribusi': 'distributor',
  'klinik-kecantikan': 'aesthetic-clinic',
  'beauty-clinic': 'aesthetic-clinic',
  'estetika': 'aesthetic-clinic',
  'aesthetic': 'aesthetic-clinic',
  'aesthetic_clinic': 'aesthetic-clinic',
  'fleet': 'fleet-management',
  'fleet-management': 'fleet-management',
  'fleet_management': 'fleet-management',
  'armada': 'fleet-management',
  'fms': 'fleet-management',
  'truk': 'fleet-management',
  'kendaraan': 'fleet-management',
  'fleet-tracking': 'fleet-management'
};

export class IndustrySolutionsService {
  public static getAllSolutions(): IndustrySolutionConfig[] {
    try {
      const stored = localStorage.getItem(SOLUTIONS_STORAGE_KEY);
      if (stored) {
        const parsed: IndustrySolutionConfig[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_INDUSTRY_SOLUTIONS.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored industry solutions:', e);
    }
    return INITIAL_INDUSTRY_SOLUTIONS;
  }

  public static getSolutionBySlug(slug: string): IndustrySolutionConfig | undefined {
    if (!slug) return undefined;
    const normalized = slug.trim().toLowerCase();
    const targetSlug = ALIAS_MAP[normalized] || normalized;
    const list = this.getAllSolutions();
    return list.find((s) => s.slug.toLowerCase() === targetSlug || s.slug.toLowerCase() === normalized);
  }

  public static getFeaturedSolutions(): IndustrySolutionConfig[] {
    const list = this.getAllSolutions();
    return list.filter((s) => s.isFeatured && s.published);
  }

  public static saveSolution(solution: IndustrySolutionConfig): void {
    const list = this.getAllSolutions();
    const idx = list.findIndex((s) => s.slug === solution.slug);
    if (idx !== -1) {
      list[idx] = solution;
    } else {
      list.push(solution);
    }
    localStorage.setItem(SOLUTIONS_STORAGE_KEY, JSON.stringify(list));
  }

  public static deleteSolution(slug: string): void {
    const list = this.getAllSolutions().filter((s) => s.slug !== slug);
    localStorage.setItem(SOLUTIONS_STORAGE_KEY, JSON.stringify(list));
  }
}
