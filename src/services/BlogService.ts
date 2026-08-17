import {
  BlogArticle,
  BlogCategory,
  BlogTag,
  BlogAuthor,
  BlogComment,
  MediaItem,
  ContentIdea,
  BlogAuditLog,
  BlogArticleVersion,
  BlogArticleStatus
} from '../types';

const BLOG_ARTICLES_KEY = 'smart_ai_blog_articles';
const BLOG_CATEGORIES_KEY = 'smart_ai_blog_categories';
const BLOG_TAGS_KEY = 'smart_ai_blog_tags';
const BLOG_AUTHORS_KEY = 'smart_ai_blog_authors';
const BLOG_COMMENTS_KEY = 'smart_ai_blog_comments';
const BLOG_MEDIA_KEY = 'smart_ai_blog_media';
const BLOG_IDEAS_KEY = 'smart_ai_blog_ideas';
const BLOG_AUDIT_KEY = 'smart_ai_blog_audit_logs';

// Helper to calculate reading time dynamically based on word count (approx 200 words per minute)
export function calculateReadingTime(text: string): number {
  if (!text) return 1;
  const words = text.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;
  const time = Math.ceil(words / 200);
  return time < 1 ? 1 : time;
}

// Default Seed Authors
const SEED_AUTHORS: BlogAuthor[] = [
  {
    id: 'author-1',
    name: 'SMART-AI.ID Editorial Team',
    slug: 'smart-ai-editorial',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    bio: 'Tim riset dan arsitek sistem SMART-AI.ID yang berfokus pada kecerdasan buatan, digitalisasi enterprise, dan pengayaan software kustom.',
    role: 'Enterprise AI & Tech Team',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      website: 'https://www.smart-ai.id'
    }
  },
  {
    id: 'author-2',
    name: 'Dr. Aris Setiawan',
    slug: 'aris-setiawan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'VP of AI Solutions & Chief Architect di SMART-AI.ID dengan pengalaman 15+ tahun di bidang Machine Learning dan Industrial Automation.',
    role: 'Chief AI Architect',
    socialLinks: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'author-3',
    name: 'Budi Santoso',
    slug: 'budi-santoso',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Software Engineer & Cloud Architect Spesialis Sistem ERP dan Manajemen Tambang & Manufaktur.',
    role: 'Lead Cloud Architect',
    socialLinks: {
      linkedin: 'https://linkedin.com'
    }
  }
];

// Default Seed Categories
const SEED_CATEGORIES: BlogCategory[] = [
  { id: 'cat-1', name: 'AI & Technology', slug: 'ai-technology', description: 'Tren terkini seputar Artificial Intelligence, Machine Learning, dan teknologi terdepan.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-2', name: 'Web Application', slug: 'web-application', description: 'Arsitektur software web modern, performa, dan scalability.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-3', name: 'Business Automation', slug: 'business-automation', description: 'Otomatisasi alur kerja operasional bisnis untuk efisiensi maksimal.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-4', name: 'Digital Transformation', slug: 'digital-transformation', description: 'Strategi migrasi dan modernisasi sistem legacy enterprise.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-5', name: 'Industry Solutions', slug: 'industry-solutions', description: 'Penerapan teknologi digital spesifik untuk berbagai sektor industri.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-6', name: 'Mining Technology', slug: 'mining-technology', description: 'Inovasi manajemen armada tambang, telemetri, dan jembatan timbang.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-7', name: 'Healthcare Technology', slug: 'healthcare-technology', description: 'Digitalisasi fasilitas kesehatan, SIMRS, dan rekam medis elektronik.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-8', name: 'Education Technology', slug: 'education-technology', description: 'Sistem informasi sekolah, LMS, dan AI tutor pembelajaran.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-9', name: 'Agriculture Technology', slug: 'agriculture-technology', description: 'Smart farming, prediksi panen, dan pemantauan kondisi tanah.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-10', name: 'Manufacturing Technology', slug: 'manufacturing-technology', description: 'Industri 4.0, sensor IoT pabrik, dan maintenance prediktif.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-11', name: 'Retail Technology', slug: 'retail-technology', description: 'Omnichannel POS, AI demand forecasting, dan manajemen stok.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-12', name: 'Business Intelligence', slug: 'business-intelligence', description: 'Visualisasi data, executive dashboard, dan analytics prediktif.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-13', name: 'AI Strategy', slug: 'ai-strategy', description: 'Panduan adopsi AI bagi jajaran eksekutif dan pembuat keputusan.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-14', name: 'Software Development', slug: 'software-development', description: 'Praktik terbaik pengkodean, estimasi proyek, dan jaminan kualitas.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat-15', name: 'Business Tips', slug: 'business-tips', description: 'Tips praktis mempercepat ROI dan keberhasilan implementasi software.', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

// Default Seed Tags
const SEED_TAGS: BlogTag[] = [
  { id: 'tag-1', name: 'AI', slug: 'ai', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-2', name: 'Artificial Intelligence', slug: 'artificial-intelligence', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-3', name: 'Machine Learning', slug: 'machine-learning', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-4', name: 'Automation', slug: 'automation', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-5', name: 'Dashboard', slug: 'dashboard', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-6', name: 'ERP', slug: 'erp', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-7', name: 'CRM', slug: 'crm', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-8', name: 'API', slug: 'api', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-9', name: 'Cloud', slug: 'cloud', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-10', name: 'SaaS', slug: 'saas', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-11', name: 'Mining', slug: 'mining', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-12', name: 'Nickel', slug: 'nickel', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-13', name: 'Hospital', slug: 'hospital', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-14', name: 'School', slug: 'school', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-15', name: 'Manufacturing', slug: 'manufacturing', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-16', name: 'Retail', slug: 'retail', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-17', name: 'GPS', slug: 'gps', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-18', name: 'Analytics', slug: 'analytics', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'tag-19', name: 'Business Intelligence', slug: 'business-intelligence', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

// Default Seed Articles
const SEED_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    title: 'Bagaimana AI Mengubah Cara Perusahaan Mengelola Operasional?',
    slug: 'bagaimana-ai-mengubah-cara-perusahaan-mengelola-operasional',
    subtitle: 'Strategi modernisasi operasional enterprise berbasis Artificial Intelligence',
    excerpt: 'Penerapan AI bukan lagi sekadar tren teknologi, melainkan fondasi utama efisiensi operasional. Ketahui bagaimana algoritma AI membantu pengambilan keputusan real-time.',
    content: `
<h2>Pendahuluan</h2>
<p>Dalam era ketidakpastian ekonomi global dan persaingan bisnis yang kian ketat, perusahaan dituntut untuk bertindak cepat. Pengambilan keputusan yang tertunda akibat proses manual kini menjadi risiko bisnis yang berbahaya.</p>

<p>Artificial Intelligence (AI) hadir bukan untuk menggantikan peran manusia sepenuhnya, melainkan sebagai augmentasi kecerdasan bisnis (augmented intelligence) yang memproses jutaan data titik operasional dalam hitungan detik.</p>

<h2>1. Otomatisasi Alur Kerja Berulang</h2>
<p>Sebagian besar waktu staf senior terbuang untuk entry data dan rekonsiliasi antar sistem yang terpisah. Dengan mengintegrasikan sistem AI Orchestrator, dokumen, email, dan transaksi dapat diverifikasi secara otomatis dengan tingkat akurasi hingga 99.4%.</p>

<h2>2. Analisis Prediktif & Anomali</h2>
<p>Berbeda dengan BI konvensional yang hanya menyajikan laporan historis (apa yang telah terjadi), sistem AI mampu memprediksi kemacetan operasional, anomali penggunaan bahan bakar, atau risiko churn pelanggan sebelum insiden terjadi.</p>

<div class="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/30 my-6">
  <strong class="text-cyan-300 font-bold block mb-1">💡 Ringkasan Manfaat Utama:</strong>
  <ul class="list-disc list-inside text-slate-300 space-y-1">
    <li>Penghematan biaya operasional hingga 30-40%.</li>
    <li>Pengurangan kesalahan manusia (human error) pada pencatatan data.</li>
    <li>Respons real-time terhadap perubahan kondisi pasar atau rantai pasok.</li>
  </ul>
</div>

<h2>Kesimpulan</h2>
<p>Perusahaan yang mengadopsi AI sejak awal tidak hanya menghemat biaya, tetapi menciptakan keunggulan kompetitif yang sulit dikejar oleh kompetitor tradisional.</p>
`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-1',
    categoryId: 'cat-1',
    tags: ['AI', 'Artificial Intelligence', 'Automation', 'Business Intelligence'],
    articleType: 'ARTICLE',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    publishedAt: '2026-08-10T09:00:00Z',
    updatedAt: '2026-08-10T09:00:00Z',
    createdAt: '2026-08-10T09:00:00Z',
    readingTime: 4,
    viewCount: 1420,
    ctaClicks: 98,
    seoTitle: 'Bagaimana AI Mengubah Operasional Perusahaan | SMART-AI.ID',
    seoDescription: 'Pelajari bagaimana penerapan Artificial Intelligence (AI) mengubah efisiensi operasional perusahaan dan mempercepat efisiensi bisnis.',
    seoKeywords: ['AI Perusahaan', 'Otomatisasi Bisnis', 'Artificial Intelligence Indonesia', 'Software AI'],
    canonicalUrl: 'https://www.smart-ai.id/blog/bagaimana-ai-mengubah-cara-perusahaan-mengelola-operasional',
    knowledgeEnabled: true,
    syncedToKnowledgeBase: true,
    cta: {
      type: 'AI_BUILDER',
      buttonText: 'Rancang Aplikasi AI Bisnis Anda',
      title: 'Ingin Mengintegrasikan AI ke Operasional Bisnis Anda?'
    }
  },
  {
    id: 'art-2',
    title: 'Berapa Biaya Membuat Aplikasi Web Custom?',
    slug: 'berapa-biaya-membuat-aplikasi-web-custom',
    subtitle: 'Panduan lengkap estimasi investasi pengolahan software enterprise dan variabel pembentuk harga',
    excerpt: 'Menghitung estimasi biaya pembuatan aplikasi kustom membutuhkan pemahaman terhadap variabel fitur, arsitektur data, integrasi API, dan skala pengguna.',
    content: `
<h2>Mengapa Harga Aplikasi Custom Bervariasi?</h2>
<p>Pertanyaan "Berapa biaya buat aplikasi?" mirip dengan pertanyaan "Berapa harga membangun gedung?". Jawabannya sangat tergantung pada spesifikasi, jumlah lantai, material, dan kompleksitas keamanan yang dibutuhkan.</p>

<h2>Faktor Utama Pembentuk Biaya</h2>
<ol class="list-decimal list-inside space-y-2 my-4">
  <li><strong>Skala Modul & Kompleksitas Fitur:</strong> Aplikasi katalog sederhana berbeda jauh dari ERP multi-cabang dengan integrasi jembatan timbang atau GPS.</li>
  <li><strong>Jumlah User Concurrent & Security:</strong> Penanganan 50 pengguna bersamaan versus 10,000 pengguna membutuhkan infrastruktur & load balancer berbeda.</li>
  <li><strong>Integrasi Pihak Ketiga:</strong> Koneksi ke sistem legacy, payment gateway, WhatsApp API, atau sensor IoT.</li>
  <li><strong>Kapabilitas AI & Analytics:</strong> Fitur prediktif, OCR dokumen, atau chatbot bisnis terintegrasi.</li>
</ol>

<h2>Tabel Range Estimasi Investasi</h2>
<table class="w-full text-left my-6 border-collapse border border-slate-800 text-xs">
  <thead>
    <tr class="bg-slate-900 text-cyan-400 font-mono">
      <th class="p-3 border border-slate-800">Skala Proyek</th>
      <th class="p-3 border border-slate-800">Cakupan Fitur</th>
      <th class="p-3 border border-slate-800">Kisaran Estimasi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-slate-800 font-bold">Modul / App Sederhana</td>
      <td class="p-3 border border-slate-800">3-5 Modul Dasar, Database standar, Auth, UI Responsive</td>
      <td class="p-3 border border-slate-800 font-mono text-emerald-400">Rp 15jt - 45jt</td>
    </tr>
    <tr>
      <td class="p-3 border border-slate-800 font-bold">Enterprise System</td>
      <td class="p-3 border border-slate-800">6-12 Modul Terintegrasi, Workflow Approval, Multi-Role, API</td>
      <td class="p-3 border border-slate-800 font-mono text-emerald-400">Rp 50jt - 150jt</td>
    </tr>
    <tr>
      <td class="p-3 border border-slate-800 font-bold">Complex AI Platform</td>
      <td class="p-3 border border-slate-800">Realtime IoT, Copilot AI, High Availability Cloud, Custom Engine</td>
      <td class="p-3 border border-slate-800 font-mono text-emerald-400">Rp 150jt +</td>
    </tr>
  </tbody>
</table>

<h2>Gunakan Calculator Tool SMART-AI.ID</h2>
<p>Anda tidak perlu menebak-nebak. SMART-AI.ID menyediakan alat <strong>AI Project Estimator</strong> instan yang menghitung estimasi biaya berdasarkan parameter riil bisnis Anda.</p>
`,
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-3',
    categoryId: 'cat-14',
    tags: ['Software Development', 'SaaS', 'API', 'Cloud'],
    articleType: 'GUIDE',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    isFeatured: false,
    isTrending: true,
    isPopular: true,
    publishedAt: '2026-08-11T10:30:00Z',
    updatedAt: '2026-08-11T10:30:00Z',
    createdAt: '2026-08-11T10:30:00Z',
    readingTime: 5,
    viewCount: 2180,
    ctaClicks: 184,
    seoTitle: 'Berapa Biaya Membuat Aplikasi Web Custom? | SMART-AI.ID',
    seoDescription: 'Panduan lengkap estimasi biaya pembuatan aplikasi web kustom untuk bisnis dan enterprise di Indonesia.',
    seoKeywords: ['Biaya Buat Aplikasi', 'Estimasi Software Custom', 'Harga Web App Indonesia'],
    canonicalUrl: 'https://www.smart-ai.id/blog/berapa-biaya-membuat-aplikasi-web-custom',
    knowledgeEnabled: true,
    syncedToKnowledgeBase: true,
    cta: {
      type: 'CUSTOM',
      buttonText: 'Hitung Estimasi Proyek Anda',
      linkUrl: '/ai-project-estimator',
      title: 'Dapatkan Estimasi Biaya Proyek Secara Instan'
    }
  },
  {
    id: 'art-3',
    title: 'AI untuk Industri Pertambangan: Use Case dan Manfaatnya',
    slug: 'ai-untuk-industri-pertambangan-use-case-dan-manfaatnya',
    subtitle: 'Transformasi tambang batubara dan nikel melalui integrasi telemetri GPS dan jembatan timbang',
    excerpt: 'Operasional tambang yang berisiko tinggi dan padat modal kini dapat dioptimalkan secara presisi menggunakan sistem pemantauan armada berbasis AI.',
    content: `
<h2>Tantangan Utama Industri Pertambangan</h2>
<p>Site pertambangan menghadapi kendala klasik: konsumsi bahan bakar yang tinggi, manipulasi ritase, ketidaksesuaian tonase timbangan, serta downtime alat berat yang mendadak.</p>

<h2>Use Case AI pada Site Tambang</h2>

<h3>1. Otomatisasi Ritase & Jembatan Timbang</h3>
<p>Sistem AI memverifikasi plat nomor dump truck, mencocokkan ID driver, dan membaca tonase secara otomatis dari indikator timbangan digital tanpa celah kecurangan manual.</p>

<h3>2. Pemantauan Konsumsi BBM & Geofencing GPS</h3>
<p>Algoritma menganalisis pola berkendara dan konsumsi solar per kilometer. Jika armada berhenti di luar area geofence resmi dengan mesin menyala, alarm otomatis terkirim ke supervisor site.</p>

<h3>3. Predictive Maintenance Engine</h3>
<p>Menggunakan data vibrasi dan suhu oli dari sensor telemetry untuk memprediksi kerusakan komponen sebelum breakdown parah terjadi.</p>

<div class="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 my-6">
  <span class="text-amber-400 font-mono text-xs font-bold uppercase block mb-1">Concept Case Study Highlight</span>
  <p class="text-xs text-slate-300">Lihat bagaimana rancangan konseptual <strong>Smart Mining Fleet System</strong> kami membantu menyelaraskan data ritase dan efisiensi bahan bakar site secara real-time.</p>
</div>
`,
    coverImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-2',
    categoryId: 'cat-6',
    tags: ['Mining', 'Nickel', 'GPS', 'Analytics', 'Automation'],
    articleType: 'CASE STUDY',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    isFeatured: true,
    isTrending: false,
    isPopular: true,
    publishedAt: '2026-08-12T08:15:00Z',
    updatedAt: '2026-08-12T08:15:00Z',
    createdAt: '2026-08-12T08:15:00Z',
    readingTime: 6,
    viewCount: 1890,
    ctaClicks: 142,
    industrySlug: 'mining',
    portfolioSlug: 'smart-mining',
    seoTitle: 'AI untuk Industri Pertambangan & Telemetri Fleet | SMART-AI.ID',
    seoDescription: 'Pelajari bagaimana AI dan IoT meningkatkan efisiensi armada tambang batubara dan nikel di Indonesia.',
    seoKeywords: ['AI Tambang', 'Mining Fleet Management', 'Jembatan Timbang Digital', 'Telemetri GPS Tambang'],
    canonicalUrl: 'https://www.smart-ai.id/blog/ai-untuk-industri-pertambangan-use-case-dan-manfaatnya',
    knowledgeEnabled: true,
    syncedToKnowledgeBase: true,
    cta: {
      type: 'PORTFOLIO',
      buttonText: 'Lihat Showcase Smart Mining',
      portfolioSlug: 'smart-mining',
      title: 'Pelajari Solusi Konseptual Smart Mining'
    }
  },
  {
    id: 'art-4',
    title: 'Smart Hospital: Bagaimana AI Membantu Operasional Rumah Sakit?',
    slug: 'smart-hospital-bagaimana-ai-membantu-operasional-rumah-sakit',
    subtitle: 'Integrasi SIMRS, rekam medis elektronik (RME), dan AI prediksi antrean pasien',
    excerpt: 'Rumah sakit modern mengintegrasikan sistem informasi SIMRS dengan kecerdasan buatan untuk mempercepat pelayanan rawat jalan dan otomatisasi klaim BPJS.',
    content: `
<h2>Modernisasi Fasilitas Kesehatan</h2>
<p>Integrasi Rekam Medis Elektronik (RME) yang diwajibkan regulasi kini menjadi momentum bagi RS untuk memperbarui SIMRS konvensional menjadi Smart Hospital System.</p>

<h2>Manfaat Utama Smart Hospital AI</h2>
<ul>
  <li><strong>Triase & Prediksi Antrean Pasien:</strong> Mengurangi waktu tunggu pendaftaran dan poli secara signifikan.</li>
  <li><strong>Validasi Klaim BPJS Otomatis:</strong> Mengurangi risiko klaim tertolak akibat ketidaksesuaian koding ICD-10/ICD-9.</li>
  <li><strong>Kontrol Stok Farmasi & Obat:</strong> Mencegah obat kadaluarsa dengan prediksi kebutuhan per resep medis.</li>
</ul>
`,
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-1',
    categoryId: 'cat-7',
    tags: ['Hospital', 'Healthcare', 'Automation', 'AI'],
    articleType: 'ARTICLE',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    isFeatured: false,
    isTrending: true,
    isPopular: false,
    publishedAt: '2026-08-13T11:00:00Z',
    updatedAt: '2026-08-13T11:00:00Z',
    createdAt: '2026-08-13T11:00:00Z',
    readingTime: 4,
    viewCount: 940,
    ctaClicks: 64,
    industrySlug: 'healthcare',
    seoTitle: 'Smart Hospital & SIMRS Berbasis AI | SMART-AI.ID',
    seoDescription: 'Solusi SIMRS dan AI kesehatan untuk rumah sakit dan klinik kesehatan di Indonesia.',
    seoKeywords: ['SIMRS AI', 'Smart Hospital Indonesia', 'Rekam Medis Elektronik'],
    canonicalUrl: 'https://www.smart-ai.id/blog/smart-hospital-bagaimana-ai-membantu-operasional-rumah-sakit',
    knowledgeEnabled: true,
    syncedToKnowledgeBase: true,
    cta: {
      type: 'INDUSTRY_SOLUTION',
      buttonText: 'Jelajahi Solusi Healthcare',
      industrySlug: 'healthcare',
      title: 'Tingkatkan Layanan Rumah Sakit Anda'
    }
  },
  {
    id: 'art-5',
    title: 'Smart School: Transformasi Digital Manajemen Sekolah',
    slug: 'smart-school-transformasi-digital-manajemen-sekolah',
    subtitle: 'Sistem informasi akademik terpadu, SPP online, dan pemantauan nilai siswa berbasis AI',
    excerpt: 'Mengelola ribuan siswa dan transaksi keuangan sekolah menjadi lebih mudah dengan platform Smart School terintegrasi.',
    content: `
<h2>Tantangan Pengelolaan Sekolah Modern</h2>
<p>Administrasi akademik yang terpisah antara bagian keuangan, kesiswaan, dan kurikulum sering memicu inefisiensi komunikasi dengan orang tua murid.</p>

<h2>Solusi Smart School System</h2>
<p>Platform Smart School menyatukan absensi RFID/WA notification, pembayaran SPP otomatis via Payment Gateway, e-learning LMS, dan analisis prestasi akademik berbasis grafik prediktif.</p>
`,
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-1',
    categoryId: 'cat-8',
    tags: ['School', 'Education', 'Automation', 'Dashboard'],
    articleType: 'ARTICLE',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    isFeatured: false,
    isTrending: false,
    isPopular: false,
    publishedAt: '2026-08-13T14:20:00Z',
    updatedAt: '2026-08-13T14:20:00Z',
    createdAt: '2026-08-13T14:20:00Z',
    readingTime: 3,
    viewCount: 780,
    ctaClicks: 42,
    industrySlug: 'education',
    seoTitle: 'Smart School & Sistem Informasi Sekolah | SMART-AI.ID',
    seoDescription: 'Transformasi digital manajemen sekolah, SPP online, dan sistem akademik berbasis AI.',
    seoKeywords: ['Smart School', 'Sistem Informasi Sekolah', 'Aplikasi Akademik'],
    canonicalUrl: 'https://www.smart-ai.id/blog/smart-school-transformasi-digital-manajemen-sekolah',
    knowledgeEnabled: true,
    syncedToKnowledgeBase: true,
    cta: {
      type: 'INDUSTRY_SOLUTION',
      buttonText: 'Jelajahi Solusi Education',
      industrySlug: 'education',
      title: 'Modernisasi Sistem Sekolah Anda'
    }
  },
  {
    id: 'art-6',
    title: 'AI untuk Perkebunan: Dari Data hingga Prediksi Produksi',
    slug: 'ai-untuk-perkebunan-dari-data-hingga-prediksi-produksi',
    subtitle: 'Penerapan drone imagery, pemantauan pupuk, dan estimasi hasil panen kelapa sawit',
    excerpt: 'Sektor perkebunan kelapa sawit dan tebu memanfaatkan sensor cuaca serta AI untuk menghitung estimasi panen harian.',
    content: `
<h2>Presisi dalam Agrikultur</h2>
<p>Cuaca ekstrim dan ketidakpastian iklim menuntut manajer kebun memiliki data riil kondisi kebun tanpa harus menunggu survei lapangan berminggu-minggu.</p>

<h2>Pemanfaatan AI Smart Farming</h2>
<p>Mengombinasikan citra satelit/drone dengan data sensor curah hujan untuk memprediksi puncak hasil panen dan penjadwalan pemupukan secara otomatis.</p>
`,
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-2',
    categoryId: 'cat-9',
    tags: ['Agriculture', 'Analytics', 'AI', 'Cloud'],
    articleType: 'CONCEPT',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    isFeatured: false,
    isTrending: false,
    isPopular: false,
    publishedAt: '2026-08-14T09:10:00Z',
    updatedAt: '2026-08-14T09:10:00Z',
    createdAt: '2026-08-14T09:10:00Z',
    readingTime: 4,
    viewCount: 650,
    ctaClicks: 31,
    industrySlug: 'agriculture',
    seoTitle: 'AI untuk Perkebunan & Smart Farming | SMART-AI.ID',
    seoDescription: 'Aplikasi AI dan IoT untuk prediksi hasil panen dan manajemen perkebunan di Indonesia.',
    seoKeywords: ['AI Perkebunan', 'Smart Farming Indonesia', 'Prediksi Panen Sawit'],
    canonicalUrl: 'https://www.smart-ai.id/blog/ai-untuk-perkebunan-dari-data-hingga-prediksi-produksi',
    knowledgeEnabled: true,
    syncedToKnowledgeBase: true,
    cta: {
      type: 'INDUSTRY_SOLUTION',
      buttonText: 'Jelajahi Solusi Agrikultur',
      industrySlug: 'agriculture',
      title: 'Tingkatkan Hasil Panen Perkebunan'
    }
  }
];

export class BlogService {
  // --- ARTICLES CRUD & SCHEDULING ---
  static getArticles(filter?: {
    categorySlug?: string;
    tagSlug?: string;
    authorSlug?: string;
    status?: BlogArticleStatus | 'ALL';
    query?: string;
    featuredOnly?: boolean;
    trendingOnly?: boolean;
    popularOnly?: boolean;
  }): BlogArticle[] {
    this.initStorage();
    this.checkScheduledArticles(); // auto-publish scheduled items

    let list: BlogArticle[] = JSON.parse(localStorage.getItem(BLOG_ARTICLES_KEY) || '[]');
    const categories = this.getCategories();
    const authors = this.getAuthors();

    // Map relations
    list = list.map((art) => ({
      ...art,
      category: categories.find((c) => c.id === art.categoryId || c.slug === art.categoryId),
      author: authors.find((a) => a.id === art.authorId || a.slug === art.authorId)
    }));

    if (filter?.status && filter.status !== 'ALL') {
      list = list.filter((a) => a.status === filter.status);
    }

    if (filter?.categorySlug && filter.categorySlug !== 'All') {
      list = list.filter((a) => a.category?.slug === filter.categorySlug || a.categoryId === filter.categorySlug);
    }

    if (filter?.tagSlug) {
      list = list.filter((a) => a.tags?.some((t) => t.toLowerCase() === filter.tagSlug?.toLowerCase()));
    }

    if (filter?.authorSlug) {
      list = list.filter((a) => a.author?.slug === filter.authorSlug || a.authorId === filter.authorSlug);
    }

    if (filter?.featuredOnly) {
      list = list.filter((a) => a.isFeatured);
    }

    if (filter?.trendingOnly) {
      list = list.filter((a) => a.isTrending);
    }

    if (filter?.popularOnly) {
      list = list.filter((a) => a.isPopular);
    }

    if (filter?.query && filter.query.trim() !== '') {
      const q = filter.query.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.category?.name.toLowerCase().includes(q) ||
          a.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }

  static getArticleBySlug(slug: string): BlogArticle | null {
    const articles = this.getArticles({ status: 'ALL' });
    return articles.find((a) => a.slug === slug) || null;
  }

  static getArticleById(id: string): BlogArticle | null {
    const articles = this.getArticles({ status: 'ALL' });
    return articles.find((a) => a.id === id) || null;
  }

  static trackView(slug: string): void {
    const articles = JSON.parse(localStorage.getItem(BLOG_ARTICLES_KEY) || '[]') as BlogArticle[];
    const idx = articles.findIndex((a) => a.slug === slug);
    if (idx !== -1) {
      articles[idx].viewCount = (articles[idx].viewCount || 0) + 1;
      localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(articles));
    }
  }

  static trackCTAClick(slug: string): void {
    const articles = JSON.parse(localStorage.getItem(BLOG_ARTICLES_KEY) || '[]') as BlogArticle[];
    const idx = articles.findIndex((a) => a.slug === slug);
    if (idx !== -1) {
      articles[idx].ctaClicks = (articles[idx].ctaClicks || 0) + 1;
      localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(articles));
    }
  }

  static createArticle(article: Partial<BlogArticle>): BlogArticle {
    this.initStorage();
    const articles = JSON.parse(localStorage.getItem(BLOG_ARTICLES_KEY) || '[]') as BlogArticle[];

    const newId = 'art-' + Date.now();
    const slug = article.slug || this.generateSlug(article.title || 'untitled');
    const readingTime = calculateReadingTime(article.content || '');

    const newArticle: BlogArticle = {
      id: newId,
      title: article.title || 'Untitled Article',
      slug,
      subtitle: article.subtitle || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      coverImage: article.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      authorId: article.authorId || 'author-1',
      categoryId: article.categoryId || 'cat-1',
      tags: article.tags || ['AI'],
      articleType: article.articleType || 'ARTICLE',
      status: article.status || 'DRAFT',
      visibility: article.visibility || 'PUBLIC',
      isFeatured: article.isFeatured || false,
      isTrending: article.isTrending || false,
      isPopular: article.isPopular || false,
      publishedAt: article.status === 'PUBLISHED' ? new Date().toISOString() : article.publishedAt,
      scheduledAt: article.scheduledAt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readingTime,
      viewCount: 0,
      ctaClicks: 0,
      seoTitle: article.seoTitle || article.title,
      seoDescription: article.seoDescription || article.excerpt,
      seoKeywords: article.seoKeywords || article.tags,
      canonicalUrl: article.canonicalUrl || `https://www.smart-ai.id/blog/${slug}`,
      knowledgeEnabled: article.knowledgeEnabled || false,
      syncedToKnowledgeBase: false,
      industrySlug: article.industrySlug,
      portfolioSlug: article.portfolioSlug,
      cta: article.cta,
      versions: [
        {
          version: 1,
          author: 'Admin',
          updatedAt: new Date().toISOString(),
          title: article.title || 'Untitled Article',
          content: article.content || '',
          changeSummary: 'Initial Creation'
        }
      ]
    };

    articles.unshift(newArticle);
    localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(articles));

    this.addAuditLog('CREATE', newId, newArticle.title, 'Admin', 'Article Created');
    return newArticle;
  }

  static updateArticle(id: string, updates: Partial<BlogArticle>): BlogArticle | null {
    const articles = JSON.parse(localStorage.getItem(BLOG_ARTICLES_KEY) || '[]') as BlogArticle[];
    const idx = articles.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    const current = articles[idx];
    const newContent = updates.content !== undefined ? updates.content : current.content;
    const readingTime = calculateReadingTime(newContent);

    // Save version history
    const currentVersions = current.versions || [];
    const newVersionNum = currentVersions.length + 1;
    const newVersion: BlogArticleVersion = {
      version: newVersionNum,
      author: 'Admin',
      updatedAt: new Date().toISOString(),
      title: updates.title || current.title,
      content: newContent,
      changeSummary: updates.status ? `Updated status to ${updates.status}` : `Version ${newVersionNum} update`
    };

    const updated: BlogArticle = {
      ...current,
      ...updates,
      readingTime,
      updatedAt: new Date().toISOString(),
      versions: [newVersion, ...currentVersions]
    };

    if (updates.status === 'PUBLISHED' && current.status !== 'PUBLISHED' && !updated.publishedAt) {
      updated.publishedAt = new Date().toISOString();
    }

    articles[idx] = updated;
    localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(articles));

    this.addAuditLog('EDIT', id, updated.title, 'Admin', `Updated article fields`);
    return updated;
  }

  static deleteArticle(id: string): boolean {
    let articles = JSON.parse(localStorage.getItem(BLOG_ARTICLES_KEY) || '[]') as BlogArticle[];
    const target = articles.find((a) => a.id === id);
    if (!target) return false;

    // Soft delete / archive or permanent delete
    articles = articles.filter((a) => a.id !== id);
    localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(articles));

    this.addAuditLog('DELETE', id, target.title, 'Admin', 'Article Deleted');
    return true;
  }

  static restoreVersion(id: string, versionNumber: number): BlogArticle | null {
    const article = this.getArticleById(id);
    if (!article || !article.versions) return null;

    const targetVer = article.versions.find((v) => v.version === versionNumber);
    if (!targetVer) return null;

    return this.updateArticle(id, {
      title: targetVer.title,
      content: targetVer.content
    });
  }

  static checkScheduledArticles(): void {
    const articles = JSON.parse(localStorage.getItem(BLOG_ARTICLES_KEY) || '[]') as BlogArticle[];
    let changed = false;
    const now = new Date();

    articles.forEach((a) => {
      if (a.status === 'SCHEDULED' && a.scheduledAt) {
        if (new Date(a.scheduledAt) <= now) {
          a.status = 'PUBLISHED';
          a.publishedAt = a.scheduledAt;
          changed = true;
          this.addAuditLog('PUBLISH', a.id, a.title, 'System Scheduler', 'Auto-published scheduled article');
        }
      }
    });

    if (changed) {
      localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(articles));
    }
  }

  // --- KNOWLEDGE BASE SYNC ---
  static syncToKnowledgeBase(articleId: string): boolean {
    const article = this.getArticleById(articleId);
    if (!article) return false;

    // Retrieve existing knowledge articles from localStorage
    const KB_KEY = 'smart_ai_knowledge_articles';
    const kbList = JSON.parse(localStorage.getItem(KB_KEY) || '[]');

    const kbItem = {
      id: `KB-BLOG-${article.id}`,
      title: article.title,
      category: 'Blog & Educational Guides',
      mainCategory: 'COMPANY_SERVICE',
      content: article.content,
      keywords: article.tags || ['blog', 'article'],
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      createdBy: 'Blog Engine',
      createdAt: article.createdAt,
      updatedAt: new Date().toISOString(),
      views: article.viewCount || 0
    };

    const existingIdx = kbList.findIndex((k: any) => k.id === kbItem.id);
    if (existingIdx !== -1) {
      kbList[existingIdx] = kbItem;
    } else {
      kbList.unshift(kbItem);
    }

    localStorage.setItem(KB_KEY, JSON.stringify(kbList));
    this.updateArticle(articleId, { syncedToKnowledgeBase: true });
    this.addAuditLog('SYNC_KB', articleId, article.title, 'Admin', 'Synced article to Knowledge Base');
    return true;
  }

  // --- CATEGORIES & TAGS ---
  static getCategories(): BlogCategory[] {
    this.initStorage();
    return JSON.parse(localStorage.getItem(BLOG_CATEGORIES_KEY) || '[]');
  }

  static createCategory(cat: Partial<BlogCategory>): BlogCategory {
    const list = this.getCategories();
    const newCat: BlogCategory = {
      id: 'cat-' + Date.now(),
      name: cat.name || 'New Category',
      slug: cat.slug || this.generateSlug(cat.name || 'category'),
      description: cat.description || '',
      status: cat.status || 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.push(newCat);
    localStorage.setItem(BLOG_CATEGORIES_KEY, JSON.stringify(list));
    return newCat;
  }

  static getTags(): BlogTag[] {
    this.initStorage();
    return JSON.parse(localStorage.getItem(BLOG_TAGS_KEY) || '[]');
  }

  static createTag(name: string): BlogTag {
    const list = this.getTags();
    const slug = this.generateSlug(name);
    const existing = list.find((t) => t.slug === slug);
    if (existing) return existing;

    const newTag: BlogTag = {
      id: 'tag-' + Date.now(),
      name,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.push(newTag);
    localStorage.setItem(BLOG_TAGS_KEY, JSON.stringify(list));
    return newTag;
  }

  static getAuthors(): BlogAuthor[] {
    this.initStorage();
    return JSON.parse(localStorage.getItem(BLOG_AUTHORS_KEY) || '[]');
  }

  // --- COMMENTS ---
  static getComments(articleId?: string): BlogComment[] {
    const comments: BlogComment[] = JSON.parse(localStorage.getItem(BLOG_COMMENTS_KEY) || '[]');
    if (articleId) {
      return comments.filter((c) => c.articleId === articleId);
    }
    return comments;
  }

  static addComment(comment: { articleId: string; articleTitle: string; name: string; email: string; comment: string }): BlogComment {
    const list = this.getComments();
    const newComment: BlogComment = {
      id: 'cmt-' + Date.now(),
      ...comment,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    list.unshift(newComment);
    localStorage.setItem(BLOG_COMMENTS_KEY, JSON.stringify(list));
    return newComment;
  }

  static updateCommentStatus(commentId: string, status: 'APPROVED' | 'REJECTED' | 'SPAM'): void {
    const list = this.getComments();
    const idx = list.findIndex((c) => c.id === commentId);
    if (idx !== -1) {
      list[idx].status = status;
      localStorage.setItem(BLOG_COMMENTS_KEY, JSON.stringify(list));
    }
  }

  // --- MEDIA LIBRARY ---
  static getMedia(): MediaItem[] {
    this.initStorage();
    return JSON.parse(localStorage.getItem(BLOG_MEDIA_KEY) || '[]');
  }

  static addMedia(media: Partial<MediaItem>): MediaItem {
    const list = this.getMedia();
    const newMedia: MediaItem = {
      id: 'med-' + Date.now(),
      filename: media.filename || 'image.jpg',
      url: media.url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      altText: media.altText || '',
      title: media.title || media.filename || 'Media Item',
      description: media.description || '',
      type: media.type || 'image',
      sizeBytes: media.sizeBytes || 245000,
      uploadedBy: 'Admin',
      createdAt: new Date().toISOString()
    };
    list.unshift(newMedia);
    localStorage.setItem(BLOG_MEDIA_KEY, JSON.stringify(list));
    return newMedia;
  }

  // --- CONTENT IDEAS & CALENDAR ---
  static getContentIdeas(): ContentIdea[] {
    this.initStorage();
    return JSON.parse(localStorage.getItem(BLOG_IDEAS_KEY) || '[]');
  }

  static addContentIdea(idea: Partial<ContentIdea>): ContentIdea {
    const list = this.getContentIdeas();
    const newIdea: ContentIdea = {
      id: 'idea-' + Date.now(),
      title: idea.title || 'Untitled Idea',
      topic: idea.topic || 'General AI',
      category: idea.category || 'AI & Technology',
      targetIndustry: idea.targetIndustry,
      keywords: idea.keywords || [],
      priority: idea.priority || 'MEDIUM',
      status: idea.status || 'IDEA',
      createdAt: new Date().toISOString()
    };
    list.unshift(newIdea);
    localStorage.setItem(BLOG_IDEAS_KEY, JSON.stringify(list));
    return newIdea;
  }

  static updateIdeaStatus(id: string, status: any): void {
    const list = this.getContentIdeas();
    const idx = list.findIndex((i) => i.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      localStorage.setItem(BLOG_IDEAS_KEY, JSON.stringify(list));
    }
  }

  // --- AUDIT LOGS ---
  static getAuditLogs(): BlogAuditLog[] {
    return JSON.parse(localStorage.getItem(BLOG_AUDIT_KEY) || '[]');
  }

  private static addAuditLog(action: any, articleId: string, articleTitle: string, actor: string, details?: string) {
    const logs = this.getAuditLogs();
    const newLog: BlogAuditLog = {
      id: 'log-' + Date.now(),
      action,
      articleId,
      articleTitle,
      actor,
      timestamp: new Date().toISOString(),
      details
    };
    logs.unshift(newLog);
    localStorage.setItem(BLOG_AUDIT_KEY, JSON.stringify(logs.slice(0, 50)));
  }

  // --- SEO QUALITY CHECK ---
  static checkArticleSEOQuality(article: Partial<BlogArticle>): {
    score: number;
    issues: { level: 'error' | 'warning' | 'pass'; message: string }[];
  } {
    const issues: { level: 'error' | 'warning' | 'pass'; message: string }[] = [];
    let score = 100;

    // Title Check
    if (!article.title || article.title.length < 10) {
      issues.push({ level: 'error', message: 'Judul terlalu pendek (minimal 10 karakter).' });
      score -= 20;
    } else if (article.title.length > 70) {
      issues.push({ level: 'warning', message: 'Judul agak panjang (disarankan max 70 karakter untuk SEO).' });
      score -= 5;
    } else {
      issues.push({ level: 'pass', message: 'Panjang judul ideal untuk SEO.' });
    }

    // Excerpt / Meta description Check
    if (!article.excerpt || article.excerpt.length < 30) {
      issues.push({ level: 'error', message: 'Ringkasan / Meta description belum diisi atau terlalu singkat.' });
      score -= 20;
    } else {
      issues.push({ level: 'pass', message: 'Meta description tersedia.' });
    }

    // Content Length Check
    const wordCount = (article.content || '').replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    if (wordCount < 150) {
      issues.push({ level: 'error', message: `Jumlah kata sangat rendah (${wordCount} kata). Artikel berkualitas disarankan > 300 kata.` });
      score -= 25;
    } else {
      issues.push({ level: 'pass', message: `Jumlah kata cukup (${wordCount} kata).` });
    }

    // Category & Tags
    if (!article.categoryId) {
      issues.push({ level: 'warning', message: 'Kategori belum dipilih.' });
      score -= 10;
    }
    if (!article.tags || article.tags.length === 0) {
      issues.push({ level: 'warning', message: 'Tag belum ditambahkan.' });
      score -= 10;
    } else {
      issues.push({ level: 'pass', message: `${article.tags.length} tag ditambahkan.` });
    }

    // Cover Image Check
    if (!article.coverImage) {
      issues.push({ level: 'warning', message: 'Gambar sampul (Cover image) belum ada.' });
      score -= 10;
    } else {
      issues.push({ level: 'pass', message: 'Gambar sampul tersedia.' });
    }

    return {
      score: Math.max(0, score),
      issues
    };
  }

  // --- ANALYTICS ---
  static getAnalyticsSummary() {
    const articles = this.getArticles({ status: 'ALL' });
    const published = articles.filter((a) => a.status === 'PUBLISHED');
    const drafts = articles.filter((a) => a.status === 'DRAFT');
    const scheduled = articles.filter((a) => a.status === 'SCHEDULED');
    const reviews = articles.filter((a) => a.status === 'REVIEW');

    const totalViews = published.reduce((acc, a) => acc + (a.viewCount || 0), 0);
    const totalCTAClicks = published.reduce((acc, a) => acc + (a.ctaClicks || 0), 0);
    const avgReadTime = published.length > 0 ? Math.round(published.reduce((acc, a) => acc + a.readingTime, 0) / published.length) : 0;

    const topArticles = [...published].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 5);

    return {
      totalArticles: articles.length,
      publishedCount: published.length,
      draftCount: drafts.length,
      scheduledCount: scheduled.length,
      reviewCount: reviews.length,
      totalViews,
      totalCTAClicks,
      avgReadTime,
      topArticles
    };
  }

  // --- AI CONTENT ASSISTANT HELPERS ---
  static aiGenerateOutline(topic: string) {
    return [
      `1. Pendahuluan & Definisi: Mengapa ${topic} penting untuk bisnis?`,
      `2. Tantangan Operasional Utama di Industri saat ini`,
      `3. Solusi Berbasis AI & Otomatisasi Terintegrasi`,
      `4. Langkah Implementasi & Estimasi ROI`,
      `5. Kesimpulan & Rekomendasi Tindakan`
    ];
  }

  static aiGenerateDraft(topic: string, outline: string[], categoryName: string): Partial<BlogArticle> {
    const title = `Panduan Lengkap: ${topic} untuk Efisiensi Bisnis`;
    const excerpt = `Pelajari bagaimana penerapan ${topic} dapat membantu perusahaan menghemat biaya operasional, mempercepat alur kerja, dan meningkatkan produktivitas.`;

    let contentHtml = `<h2>Pendahuluan</h2>\n<p>${topic} merupakan salah satu aspek paling krusial dalam transformasi digital perusahaan saat ini.</p>\n`;
    outline.forEach((section) => {
      contentHtml += `\n<h2>${section}</h2>\n<p>Penjelasan mendalam mengenai ${section.toLowerCase()} terkait efisiensi dan analisis berbasis data.</p>\n`;
    });

    contentHtml += `\n<div class="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/30 my-6">\n<strong class="text-cyan-300">💡 Fakta AI:</strong> Perusahaan yang memanfaatkan ${topic} secara konsisten mencatatkan efisiensi waktu hingga 35%.\n</div>`;

    return {
      title,
      subtitle: `Strategi praktis adopsi ${topic} di sektor ${categoryName}`,
      excerpt,
      content: contentHtml,
      status: 'DRAFT', // MANDATORY: AI content MUST always be DRAFT!
      articleType: 'ARTICLE',
      tags: ['AI', 'Automation', 'Digital Transformation'],
      knowledgeEnabled: false
    };
  }

  // --- UTILS ---
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  private static initStorage(): void {
    if (!localStorage.getItem(BLOG_ARTICLES_KEY)) {
      localStorage.setItem(BLOG_ARTICLES_KEY, JSON.stringify(SEED_ARTICLES));
    }
    if (!localStorage.getItem(BLOG_CATEGORIES_KEY)) {
      localStorage.setItem(BLOG_CATEGORIES_KEY, JSON.stringify(SEED_CATEGORIES));
    }
    if (!localStorage.getItem(BLOG_TAGS_KEY)) {
      localStorage.setItem(BLOG_TAGS_KEY, JSON.stringify(SEED_TAGS));
    }
    if (!localStorage.getItem(BLOG_AUTHORS_KEY)) {
      localStorage.setItem(BLOG_AUTHORS_KEY, JSON.stringify(SEED_AUTHORS));
    }
    if (!localStorage.getItem(BLOG_MEDIA_KEY)) {
      localStorage.setItem(BLOG_MEDIA_KEY, JSON.stringify([
        {
          id: 'med-1',
          filename: 'ai-ops-cover.jpg',
          url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
          altText: 'AI Operations Dashboard Network',
          title: 'AI Ops Cover',
          description: 'Illustration for AI operations article',
          type: 'image',
          sizeBytes: 340000,
          uploadedBy: 'Admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'med-2',
          filename: 'mining-site.jpg',
          url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&auto=format&fit=crop&q=80',
          altText: 'Mining Fleet Dump Truck Site',
          title: 'Mining Site Cover',
          description: 'Mining telemetry showcase',
          type: 'image',
          sizeBytes: 420000,
          uploadedBy: 'Admin',
          createdAt: new Date().toISOString()
        }
      ]));
    }
    if (!localStorage.getItem(BLOG_IDEAS_KEY)) {
      localStorage.setItem(BLOG_IDEAS_KEY, JSON.stringify([
        {
          id: 'idea-1',
          title: 'Penerapan OCR & AI untuk Pengolahan Invoice Otomatis',
          topic: 'Business Automation',
          category: 'Business Automation',
          keywords: ['OCR', 'Invoice', 'AI'],
          priority: 'HIGH',
          status: 'PLANNED',
          createdAt: new Date().toISOString()
        },
        {
          id: 'idea-2',
          title: 'Tips Memilih Tech Stack untuk SIMRS Rumah Sakit',
          topic: 'Healthcare',
          category: 'Healthcare Technology',
          keywords: ['SIMRS', 'Healthcare', 'Tech Stack'],
          priority: 'MEDIUM',
          status: 'IDEA',
          createdAt: new Date().toISOString()
        }
      ]));
    }
  }
}
