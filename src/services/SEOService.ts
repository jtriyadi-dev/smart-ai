import {
  SEOLandingPage,
  SEOKeyword,
  SEORedirect,
  SEOAuditResult,
  SEOPageMeta,
  SEOInternalLink,
  SEOSettings,
  SEOAuditIssue,
  SearchIntentType
} from '../types';

export class SEOService {
  private static STORAGE_KEY_LANDING = 'smartai_seo_landing_pages_v1';
  private static STORAGE_KEY_KEYWORDS = 'smartai_seo_keywords_v1';
  private static STORAGE_KEY_REDIRECTS = 'smartai_seo_redirects_v1';
  private static STORAGE_KEY_LINKS = 'smartai_seo_internal_links_v1';
  private static STORAGE_KEY_SETTINGS = 'smartai_seo_settings_v1';

  // Seed Primary SEO Landing Pages
  private static defaultLandingPages: SEOLandingPage[] = [
    {
      id: 'seo-lp-1',
      title: 'Jasa Pembuatan Aplikasi AI untuk Bisnis',
      slug: 'jasa-pembuatan-aplikasi-ai',
      keyword: 'jasa pembuatan aplikasi AI',
      secondaryKeywords: [
        'developer aplikasi AI',
        'pengembangan AI custom',
        'jasa AI business application',
        'custom AI software Indonesia'
      ],
      description: 'SMART-AI.ID menyediakan jasa pembuatan aplikasi AI enterprise custom untuk otomasi operasional, prediksi data, chatbot pintar, dan AI agent di Indonesia.',
      content: `<p>Perkembangan Artificial Intelligence (AI) telah mengubah lanskap bisnis modern secara fundamental. SMART-AI.ID hadir sebagai partner strategi teknologi terdepan dalam merancang, membangun, dan mengimplementasikan aplikasi berbasis kecerdasan buatan (AI) yang disesuaikan dengan kebutuhan spesifik industri Anda di Indonesia.</p>`,
      hero: {
        title: 'Jasa Pembuatan Aplikasi AI Enterprise & Custom Indonesia',
        subtitle: 'Transformasikan proses bisnis Anda dengan integrasi Large Language Models (LLM), Predictive Analytics, Machine Vision, dan Intelligent Automation.',
        ctaText: 'Konsultasikan Aplikasi Anda',
        secondaryCtaText: 'Coba AI App Builder'
      },
      industry: 'Multi-Industry',
      service: 'AI Application Development',
      problems: [
        {
          title: 'Proses Manual yang Memakan Waktu & Biaya High-CapEx',
          desc: 'Tim Anda terbebani pemrosesan data berulang, analisis manual, dan penanganan dokumen yang lambat.'
        },
        {
          title: 'Kesulitan Mengintegrasikan Model AI ke System Existing',
          desc: 'Banyak perusahaan kesulitan menghubungkan API AI modern dengan ERP, CRM, atau database legacy.'
        },
        {
          title: 'Kekhawatiran Keamanan & Privasi Data Perusahaan',
          desc: 'Penggunaan AI publik berisiko membocorkan data rahasia tanpa perlindungan enkripsi enterprise-grade.'
        }
      ],
      solutions: [
        {
          title: 'Arsitektur AI Custom Private & Secure On-Premise / Hybrid Cloud',
          desc: 'Kami membangun solusi AI yang berjalan di infrastructure terisolasi untuk memastikan kedaulatan data.'
        },
        {
          title: 'Otomasi Workflow End-to-End dengan Autonomous Agents',
          desc: 'Integrasi LLM agent yang mampu mengeksekusi tugas kompleks secara otomatis dan mandiri.'
        },
        {
          title: 'Real-Time Predictive Analytics & Business Intelligence',
          desc: 'Dashboard analitik cerdas yang memberikan proyeksi tren bisnis dan deteksi anomali secara instan.'
        }
      ],
      capabilities: [
        { title: 'Generative AI & LLM Copilots', desc: 'Sistem asisten AI kustom yang terlatih dengan Knowledge Base perusahaan Anda.' },
        { title: 'Computer Vision & Quality Inspection', desc: 'Deteksi cacat produksi, verifikasi identitas, dan analisis video stream otomatis.' },
        { title: 'Predictive Maintenance & Demand Forecasting', desc: 'Model prediksi kegagalan mesin dan optimasi stok inventaris berbasis ML.' },
        { title: 'Intelligent Document Processing (IDP)', desc: 'Ekstraksi data otomatis dari invoice, kontrak, dan dokumen PDF tanpa ketik ulang.' }
      ],
      processSteps: [
        { step: '01', title: 'Requirement & Feasibility Assessment', desc: 'Analisis kebutuhan bisnis, availability data, dan pemilihan arsitektur AI yang tepat.' },
        { step: '02', title: 'Data Pipeline & AI Model Training', desc: 'Pembersihan data, fine-tuning model, dan konfigurasi RAG (Retrieval-Augmented Generation).' },
        { step: '03', title: 'Full-Stack Software Engineering', desc: 'Pengembangan backend API, UI/UX frontend modern, dan integrasi sistem.' },
        { step: '04', title: 'Deployment, Monitoring & Security Audit', desc: 'Peluncuran di Production Server, setup rate limiting, dan garansi pemeliharaan SLA.' }
      ],
      faq: [
        {
          question: 'Berapa lama estimasi pengerjaan aplikasi AI?',
          answer: 'Waktu pengerjaan berkisar antara 4 hingga 12 minggu tergantung pada kompleksitas fitur, integrasi data, dan kebutuhan fine-tuning model AI.'
        },
        {
          question: 'Apakah data rahasia perusahaan kami aman?',
          answer: 'Sangat aman. Kami menggunakan private API endpoints dan enkripsi end-to-end, sehingga data perusahaan Anda tidak akan digunakan untuk melatih model publik.'
        },
        {
          question: 'Apakah SMART-AI.ID menyediakan garansi pemeliharaan?',
          answer: 'Ya, seluruh pengembangan mencakup garansi bug-fix dan SLA dukungan teknis berkala pasca-launch.'
        }
      ],
      seoTitle: 'Jasa Pembuatan Aplikasi AI Custom & Enterprise Indonesia | SMART-AI.ID',
      seoDescription: 'Jasa pembuatan aplikasi AI terpercaya di Indonesia. Kembangkan LLM Copilot, Predictive Analytics, & Intelligent Automation kustom untuk bisnis Anda.',
      canonicalUrl: 'https://www.smart-ai.id/jasa-pembuatan-aplikasi-ai',
      ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      status: 'PUBLISHED',
      createdAt: '2026-01-10T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z'
    },
    {
      id: 'seo-lp-2',
      title: 'Jasa Pembuatan Aplikasi Web Custom & Business Automation',
      slug: 'jasa-pembuatan-aplikasi-web',
      keyword: 'jasa pembuatan aplikasi web',
      secondaryKeywords: [
        'custom web application',
        'jasa development aplikasi web',
        'pembuatan dashboard ERP CRM',
        'web app software house Indonesia'
      ],
      description: 'Layanan jasa pembuatan aplikasi web custom berkinerja tinggi, aman, dan dapat diskalakan untuk sistem internal perusahaan, ERP, CRM, dan platform SaaS.',
      content: `<p>Aplikasi web modern merupakan tulang punggung efisiensi operasional perusahaan. SMART-AI.ID membangun aplikasi web berstandar enterprise yang menggabungkan desain UI/UX responsif, arsitektur microservices/serverless, dan integrasi kecerdasan buatan.</p>`,
      hero: {
        title: 'Jasa Pembuatan Aplikasi Web Custom & Modern Enterprise',
        subtitle: 'Solusi perangkat lunak berbasis web kustom untuk Dashboard Analitik, ERP, CRM, System Automation, dan SaaS Platform.',
        ctaText: 'Mulai Konsultasi Web App',
        secondaryCtaText: 'Lihat Portfolio Web'
      },
      industry: 'Enterprise Software',
      service: 'Web Application Development',
      problems: [
        {
          title: 'Software Generik Tidak Sesuai SOP Perusahaan',
          desc: 'Aplikasi siap pakai sering kali terlalu kaku dan memaksa Anda merombak proses kerja yang sudah berjalan.'
        },
        {
          title: 'Performa Sistem Lambat & Terbatas Saat Skala Bertambah',
          desc: 'Aplikasi lama sering mengalmi crash saat diakses ratusan pengguna atau saat mengolah dataset besar.'
        }
      ],
      solutions: [
        {
          title: 'Custom Architecture yang Disesuaikan 100% Kebutuhan',
          desc: 'Sistem dibangun persis mengikuti alur kerja dan aturan bisnis perusahaan Anda tanpa kompromi.'
        },
        {
          title: 'Modern Tech Stack (React, Node.js, Cloud Native)',
          desc: 'Performa tinggi, waktu muat cepat, dan siap diintegrasikan dengan modul AI kapan saja.'
        }
      ],
      capabilities: [
        { title: 'Custom ERP & Inventory Management', desc: 'Pengelolaan aset, stok gudang, dan rantai pasok secara terintegrasi.' },
        { title: 'Interactive Analytics Dashboard', desc: 'Visualisasi data grafik real-time dengan akses peran (Role-Based Access Control).' },
        { title: 'SaaS & Multi-Tenant Platforms', desc: 'Arsitektur cloud terisolasi aman untuk platform berlangganan bisnis.' },
        { title: 'REST & GraphQL API Integration', desc: 'Koneksi mulus dengan sistem akuntansi, gateway pembayaran, dan layanan pihak ketiga.' }
      ],
      processSteps: [
        { step: '01', title: 'System Blueprint & UI/UX Wireframing', desc: 'Perancangan struktur database, tata letak antarmuka, dan alur kerja pengguna.' },
        { step: '02', title: 'Agile Software Engineering', desc: 'Pengembangan iteratif dengan sprint mingguan dan pembaruan berkala.' },
        { step: '03', title: 'QA Security & Performance Testing', desc: 'Pengetesan beban tinggi, audit keamanan, dan optimasi SEO teknis.' },
        { step: '04', title: 'Production Deployment & SLA', desc: 'Peluncuran ke server cloud dengan cadangan data otomatis dan dukungan berkelanjutan.' }
      ],
      faq: [
        {
          question: 'Apakah aplikasi web buatan SMART-AI.ID ramah perangkat mobile?',
          answer: 'Ya, seluruh aplikasi web yang kami kembangkan mengusung desain fully responsive yang optimal diakses dari desktop, tablet, maupun smartphone.'
        },
        {
          question: 'Dapatkah aplikasi terhubung dengan software lama yang kami pakai?',
          answer: 'Bisa. Kami berpengalaman membangun API bridge dan middleware untuk mengintegrasikan aplikasi web baru dengan database atau sistem legacy.'
        }
      ],
      seoTitle: 'Jasa Pembuatan Aplikasi Web Custom & Software House | SMART-AI.ID',
      seoDescription: 'Jasa pembuatan aplikasi web custom profesional di Indonesia. Bangun ERP, CRM, SaaS, dan Dashboard analitik aman berkinerja tinggi.',
      canonicalUrl: 'https://www.smart-ai.id/jasa-pembuatan-aplikasi-web',
      ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      status: 'PUBLISHED',
      createdAt: '2026-01-12T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z'
    },
    {
      id: 'seo-lp-3',
      title: 'Aplikasi Berbasis AI: Otomasi, Analitik & Asisten Pintar',
      slug: 'aplikasi-berbasis-ai',
      keyword: 'aplikasi berbasis AI',
      secondaryKeywords: [
        'AI business application',
        'fitur berbasis AI',
        'otomasi AI perusahaan',
        'AI copilot bisnis'
      ],
      description: 'Temukan bagaimana aplikasi berbasis AI membantu mempercepat pertumbuhan bisnis Anda melalui otomasi alur kerja, prediksi keputusan, dan integrasi AI Copilot.',
      content: `<p>Aplikasi berbasis AI bukan sekadar tren, melainkan kebutuhan mendesak untuk mempertahankan daya saing industri. Dengan kemampuan analisis data super cepat, aplikasi pintar mampu memberikan wawasan prediksi dan mengotomatiskan tugas-tugas kompleks.</p>`,
      hero: {
        title: 'Kembangkan Aplikasi Berbasis AI Pintar untuk Efisiensi Bisnis',
        subtitle: 'Tingkatkan produktivitas tim hingga 10x lipat dengan solusi aplikasi berbasis AI, Machine Learning, dan Natural Language Processing.',
        ctaText: 'Eksplorasi Solusi AI',
        secondaryCtaText: 'Diskusi Kebutuhan'
      },
      industry: 'Cross-Industry Solutions',
      service: 'AI Software Integration',
      problems: [
        {
          title: 'Data Bisnis Menumpuk Tanpa Analisis Berarti',
          desc: 'Perusahaan memiliki gigabyte data operasional tetapi tidak bisa memanfaatkannya untuk keputusan strategis.'
        },
        {
          title: 'Respon Pelanggan Lambat di Luar Jam Kerja',
          desc: 'Tim Customer Support kewalahan melayani ribuan pertanyaan berulang dari pelanggan secara manual.'
        }
      ],
      solutions: [
        {
          title: 'AI Analytics & Automatic Insights Engine',
          desc: 'Mengubah data mentah menjadi rekomendasi tindakan bisnis konkret secara otomatis.'
        },
        {
          title: '24/7 Intelligent Omni-Channel AI Agent',
          desc: 'Melayani percakapan pelanggan dengan konteks alami dan kemampuan bertransaksi langsung.'
        }
      ],
      capabilities: [
        { title: 'AI Automated Decisioning', desc: 'Persetujuan kredit, skoring risiko, dan verifikasi klaim otomatis.' },
        { title: 'Speech-to-Text & Conversational AI', desc: 'Asisten suara dan transkripsi rapat otomatis dengan analisis sentimen.' },
        { title: 'Dynamic Pricing & Demand Forecast', desc: 'Penyesuaian harga dan perencanaan pasokan barang berbasis algoritma cerdas.' },
        { title: 'Knowledge Base Search AI', desc: 'Pencarian dokumen internal perusahaan secepat kilat dengan pencarian kontekstual (Vector Search).' }
      ],
      processSteps: [
        { step: '01', title: 'Consultation & AI Readiness Mapping', desc: 'Identifikasi titik sentuh bisnis yang berpotensi menghasilkan dampak terbesar dengan AI.' },
        { step: '02', title: 'Proof of Concept (PoC)', desc: 'Pengujian awal model AI dengan dataset terbatas untuk memvalidasi akurasi.' },
        { step: '03', title: 'Custom App Development & Integration', desc: 'Membangun aplikasi full-stack yang menyatu dengan workflow operasional harian.' }
      ],
      faq: [
        {
          question: 'Apakah aplikasi berbasis AI memerlukan spesifikasi server khusus?',
          answer: 'Tergantung opsi deployment. Kami menyediakan opsi Serverless AI Cloud yang efisien biaya tanpa investasi server mahal, maupun opsi On-Premise GPU Server untuk kedaulatan data penuh.'
        }
      ],
      seoTitle: 'Aplikasi Berbasis AI untuk Otomasi Bisnis & Analitik | SMART-AI.ID',
      seoDescription: 'Bangun aplikasi berbasis AI untuk efisiensi bisnis. Solusi AI Copilot, Predictive Analytics, Chatbot Pintar, dan Otomasi Workflow di Indonesia.',
      canonicalUrl: 'https://www.smart-ai.id/aplikasi-berbasis-ai',
      ogImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      status: 'PUBLISHED',
      createdAt: '2026-01-15T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z'
    },
    {
      id: 'seo-lp-4',
      title: 'Custom Software Development & System Integration Indonesia',
      slug: 'custom-software-indonesia',
      keyword: 'custom software Indonesia',
      secondaryKeywords: [
        'software development Indonesia',
        'pengembangan software bisnis',
        'sistem integrasi enterprise',
        'software house Jakarta Surabaya'
      ],
      description: 'Mitra pengembang custom software terpercaya di Indonesia. Kami merancang solusi sistem informasi, aplikasi bisnis, dan integrasi cloud berskala besar.',
      content: `<p>Setiap bisnis memiliki keunikan operasional. Custom software development memberikan keunggulan kompetitif yang tidak bisa dicapai oleh paket software standar.</p>`,
      hero: {
        title: 'Custom Software Development & Digital Transformation Partner',
        subtitle: 'Pengembangan perangkat lunak kustom berstandar enterprise untuk mendorong efisiensi dan skalabilitas bisnis perusahaan Anda di Indonesia.',
        ctaText: 'Konsultasi Software Kustom',
        secondaryCtaText: 'Portofolio Proyek'
      },
      industry: 'Enterprise Technology',
      service: 'Custom Software Engineering',
      problems: [
        {
          title: 'Keterbatasan Lisensi Software Vendor',
          desc: 'Biaya langganan melambung seiring bertambahnya jumlah pengguna tanpa kustomisasi fitur baru.'
        }
      ],
      solutions: [
        {
          title: 'Kepemilikan Penuh Source Code & Lisensi Kustom',
          desc: 'Anda memegang kendali penuh atas kode sumber dan aset intelektual aplikasi tanpa biaya tersembunyi.'
        }
      ],
      capabilities: [
        { title: 'Legacy System Modernization', desc: 'Migrasi aplikasi lama ke arsitektur cloud modern tanpa menggangu operasional.' },
        { title: 'Enterprise Middleware & Bus', desc: 'Penghubung komunikasi antarsistem berskala ribuan transaksi per detik.' }
      ],
      processSteps: [
        { step: '01', title: 'Discovery & System Design', desc: 'Pemetaan proses bisnis dan perancangan arsitektur sistem.' },
        { step: '02', title: 'Agile Engineering & CI/CD', desc: 'Pengembangan cepat berbasis komponen teruji dengan integrasi otomatis.' }
      ],
      faq: [
        {
          question: 'Apakah SMART-AI.ID menyerahkan Hak Kekayaan Intelektual (Source Code)?',
          answer: 'Ya, seluruh source code dan hak intelektual proyek custom dikirimkan penuh kepada klien setelah penyelesaian pekerjaan.'
        }
      ],
      seoTitle: 'Custom Software Indonesia & Enterprise Application | SMART-AI.ID',
      seoDescription: 'Jasa custom software development terbaik di Indonesia. Pengembang sistem informasi enterprise, integrasi cloud, dan otomatisasi bisnis kustom.',
      canonicalUrl: 'https://www.smart-ai.id/custom-software-indonesia',
      ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      status: 'PUBLISHED',
      createdAt: '2026-01-20T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z'
    },
    {
      id: 'seo-lp-5',
      title: 'AI Application Development Services Indonesia',
      slug: 'ai-application-development',
      keyword: 'ai application development',
      secondaryKeywords: [
        'ai software development company',
        'enterprise ai development indonesia',
        'custom llm application',
        'ai integration company indonesia'
      ],
      description: 'Leading AI application development company in Indonesia. We build production-ready Generative AI, Machine Learning, and Computer Vision enterprise software.',
      content: `<p>Accelerate your business transformation with cutting-edge AI application development services. SMART-AI.ID bridges complex AI research and scalable production software.</p>`,
      hero: {
        title: 'Enterprise AI Application Development Services',
        subtitle: 'Empower your company with bespoke Generative AI agents, Predictive Machine Learning models, and automated business workflows.',
        ctaText: 'Schedule AI Discovery Call',
        secondaryCtaText: 'View AI Case Studies'
      },
      industry: 'Global Technology',
      service: 'AI Engineering',
      problems: [
        {
          title: 'High Complexity in Deploying AI Models to Production',
          desc: 'Bridging data science models to real-time, low-latency web interfaces requires deep full-stack AI expertise.'
        }
      ],
      solutions: [
        {
          title: 'End-to-End MLOps & Robust LLM Architecture',
          desc: 'Battle-tested AI deployments with automatic scaling, RAG pipelines, and fallback mechanisms.'
        }
      ],
      capabilities: [
        { title: 'Generative AI & Agentic Workflows', desc: 'Autonomic agents executing multi-step tasks with tool usage.' },
        { title: 'Enterprise Vector Database & RAG', desc: 'Secure contextual search over millions of internal documents.' }
      ],
      processSteps: [
        { step: '01', title: 'Architecture & Model Selection', desc: 'Benchmarking closed-source and open-source models for performance and cost.' },
        { step: '02', title: 'Production Engineering & SLA Testing', desc: 'Stress testing API response speeds and accuracy benchmarks.' }
      ],
      faq: [
        {
          question: 'Do you offer English support and international software standards?',
          answer: 'Yes, our team works with global development standards, clean documentation, and ISO-aligned security compliance.'
        }
      ],
      seoTitle: 'AI Application Development Services Indonesia | SMART-AI.ID',
      seoDescription: 'Premier AI application development company in Indonesia. Custom LLM integration, Machine Learning, Computer Vision, and MLOps engineering.',
      canonicalUrl: 'https://www.smart-ai.id/ai-application-development',
      ogImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      status: 'PUBLISHED',
      createdAt: '2026-02-01T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z'
    },
    {
      id: 'seo-lp-6',
      title: 'Software Development Indonesia: Enterprise AI & Web Apps',
      slug: 'software-development-indonesia',
      keyword: 'software development Indonesia',
      secondaryKeywords: [
        'indonesia software house',
        'top software developers jakarta',
        'custom web development indonesia',
        'tech solution provider indonesia'
      ],
      description: 'Top-tier software development provider in Indonesia. Building scalable web systems, custom enterprise platforms, and integrated AI solutions for forward-thinking businesses.',
      content: `<p>SMART-AI.ID is an Indonesian software development agency delivering high-impact technological solutions for domestic and international organizations.</p>`,
      hero: {
        title: 'Full-Service Software Development in Indonesia',
        subtitle: 'Delivering end-to-end web applications, custom enterprise platforms, and AI-driven automation built by top Indonesian software engineers.',
        ctaText: 'Start Your Project',
        secondaryCtaText: 'Explore Solutions'
      },
      industry: 'Software Services',
      service: 'Full-Stack Software Engineering',
      problems: [
        {
          title: 'Unpredictable Software Vendors & Quality Risks',
          desc: 'Delays, poor code maintenance, and lack of long-term support hinder business growth.'
        }
      ],
      solutions: [
        {
          title: 'Certified Engineers & Transparent Milestones',
          desc: 'Clear project governance, daily updates, and guaranteed code delivery.'
        }
      ],
      capabilities: [
        { title: 'Custom Web & Mobile Development', desc: 'High performance applications with seamless responsive UX.' },
        { title: 'AI & Data Engineering Services', desc: 'Custom ML pipelines and enterprise dashboard visualizers.' }
      ],
      processSteps: [
        { step: '01', title: 'Consultation & Scoping', desc: 'Understanding functional scope, timeline, and architectural requirements.' },
        { step: '02', title: 'Agile Delivery & Launch', desc: 'Sprinting towards production-ready launch with thorough QA checks.' }
      ],
      faq: [
        {
          question: 'Where is SMART-AI.ID located?',
          answer: 'SMART-AI.ID is headquartered in Indonesia, serving clients nationwide and across the Southeast Asian region.'
        }
      ],
      seoTitle: 'Software Development Indonesia - Custom AI & Web Systems | SMART-AI.ID',
      seoDescription: 'Leading software development agency in Indonesia. Enterprise web apps, custom software engineering, and AI integrations.',
      canonicalUrl: 'https://www.smart-ai.id/software-development-indonesia',
      ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      status: 'PUBLISHED',
      createdAt: '2026-02-05T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z'
    }
  ];

  // Seed Keywords
  private static defaultKeywords: SEOKeyword[] = [
    { id: 'kw-1', keyword: 'jasa pembuatan aplikasi AI', searchIntent: 'Commercial', targetPage: '/jasa-pembuatan-aplikasi-ai', priority: 'CRITICAL', status: 'ACTIVE', notes: 'Primary target keyword for AI services' },
    { id: 'kw-2', keyword: 'jasa pembuatan aplikasi web', searchIntent: 'Commercial', targetPage: '/jasa-pembuatan-aplikasi-web', priority: 'HIGH', status: 'ACTIVE', notes: 'Core web app keyword' },
    { id: 'kw-3', keyword: 'aplikasi berbasis AI', searchIntent: 'Informational', targetPage: '/aplikasi-berbasis-ai', priority: 'HIGH', status: 'ACTIVE', notes: 'Middle of funnel keyword' },
    { id: 'kw-4', keyword: 'custom software Indonesia', searchIntent: 'Commercial', targetPage: '/custom-software-indonesia', priority: 'HIGH', status: 'ACTIVE', notes: 'Enterprise custom keyword' },
    { id: 'kw-5', keyword: 'AI application development', searchIntent: 'Commercial', targetPage: '/ai-application-development', priority: 'HIGH', status: 'ACTIVE', notes: 'English target keyword' },
    { id: 'kw-6', keyword: 'software development Indonesia', searchIntent: 'Commercial', targetPage: '/software-development-indonesia', priority: 'HIGH', status: 'ACTIVE', notes: 'English agency keyword' },
    { id: 'kw-7', keyword: 'developer aplikasi AI', searchIntent: 'Commercial', targetPage: '/jasa-pembuatan-aplikasi-ai', priority: 'MEDIUM', status: 'ACTIVE' },
    { id: 'kw-8', keyword: 'jasa development aplikasi', searchIntent: 'Commercial', targetPage: '/jasa-pembuatan-aplikasi-web', priority: 'MEDIUM', status: 'ACTIVE' },
    { id: 'kw-9', keyword: 'pengembangan aplikasi custom', searchIntent: 'Commercial', targetPage: '/custom-software-indonesia', priority: 'MEDIUM', status: 'ACTIVE' },
    { id: 'kw-10', keyword: 'software house Indonesia', searchIntent: 'Navigational', targetPage: '/custom-software-indonesia', priority: 'MEDIUM', status: 'ACTIVE' },
    { id: 'kw-11', keyword: 'AI software development', searchIntent: 'Commercial', targetPage: '/ai-application-development', priority: 'MEDIUM', status: 'ACTIVE' },
    { id: 'kw-12', keyword: 'custom web application', searchIntent: 'Commercial', targetPage: '/jasa-pembuatan-aplikasi-web', priority: 'MEDIUM', status: 'ACTIVE' },
    { id: 'kw-13', keyword: 'AI business application', searchIntent: 'Informational', targetPage: '/aplikasi-berbasis-ai', priority: 'LOW', status: 'ACTIVE' },
    { id: 'kw-14', keyword: 'aplikasi enterprise', searchIntent: 'Commercial', targetPage: '/custom-software-indonesia', priority: 'LOW', status: 'ACTIVE' },
    { id: 'kw-15', keyword: 'pengembangan software bisnis', searchIntent: 'Commercial', targetPage: '/software-development-indonesia', priority: 'LOW', status: 'ACTIVE' }
  ];

  // Seed Redirects
  private static defaultRedirects: SEORedirect[] = [
    { id: 'red-1', source: '/services/ai', destination: '/jasa-pembuatan-aplikasi-ai', statusCode: 301, active: true, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
    { id: 'red-2', source: '/services/web', destination: '/jasa-pembuatan-aplikasi-web', statusCode: 301, active: true, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' },
    { id: 'red-3', source: '/blog/jasa-ai', destination: '/jasa-pembuatan-aplikasi-ai', statusCode: 301, active: true, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z' }
  ];

  // Seed Internal Links
  private static defaultLinks: SEOInternalLink[] = [
    { id: 'link-1', sourcePage: '/blog', targetPage: '/jasa-pembuatan-aplikasi-ai', anchorText: 'jasa pembuatan aplikasi AI', status: 'ACTIVE', createdAt: '2026-01-01T00:00:00Z' },
    { id: 'link-2', sourcePage: '/solusi-industri', targetPage: '/jasa-pembuatan-aplikasi-web', anchorText: 'jasa pembuatan aplikasi web', status: 'ACTIVE', createdAt: '2026-01-01T00:00:00Z' },
    { id: 'link-3', sourcePage: '/portfolio', targetPage: '/aplikasi-berbasis-ai', anchorText: 'aplikasi berbasis AI', status: 'ACTIVE', createdAt: '2026-01-01T00:00:00Z' },
    { id: 'link-4', sourcePage: '/ai-app-builder', targetPage: '/custom-software-indonesia', anchorText: 'custom software Indonesia', status: 'ACTIVE', createdAt: '2026-01-01T00:00:00Z' }
  ];

  // Default Settings
  private static defaultSettings: SEOSettings = {
    siteName: 'SMART-AI.ID',
    siteUrl: 'https://www.smart-ai.id',
    defaultTitle: 'Jasa Pembuatan Aplikasi AI & Web Custom Indonesia | SMART-AI.ID',
    defaultDescription: 'SMART-AI.ID menyediakan jasa pembuatan aplikasi AI, aplikasi web custom, dan software bisnis enterprise untuk berbagai industri di Indonesia.',
    defaultOgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    robotsRules: `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /portal/\nDisallow: /internal/\n\nSitemap: https://www.smart-ai.id/sitemap.xml`,
    sitemapEnabled: true,
    schemaEnabled: true,
    searchConsoleConnected: false,
    analyticsConnected: false
  };

  // GETTERS & SETTERS
  public static getLandingPages(): SEOLandingPage[] {
    const raw = localStorage.getItem(this.STORAGE_KEY_LANDING);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY_LANDING, JSON.stringify(this.defaultLandingPages));
      return this.defaultLandingPages;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.defaultLandingPages;
    }
  }

  public static getLandingPageBySlug(slug: string): SEOLandingPage | null {
    if (!slug || !slug.trim()) return null;
    const normalized = slug.trim().replace(/^\//, '');
    if (!normalized) return null;
    const pages = this.getLandingPages();
    return pages.find((p) => p.slug === normalized || p.slug === slug || p.slug === `/${normalized}`) || null;
  }

  public static saveLandingPage(page: Partial<SEOLandingPage>): SEOLandingPage {
    const pages = this.getLandingPages();
    const now = new Date().toISOString();

    if (page.id) {
      const idx = pages.findIndex((p) => p.id === page.id);
      if (idx !== -1) {
        const updated: SEOLandingPage = {
          ...pages[idx],
          ...page,
          updatedAt: now
        } as SEOLandingPage;
        pages[idx] = updated;
        localStorage.setItem(this.STORAGE_KEY_LANDING, JSON.stringify(pages));
        return updated;
      }
    }

    const newPage: SEOLandingPage = {
      id: `seo-lp-${Date.now()}`,
      title: page.title || 'Untitled SEO Page',
      slug: page.slug || `page-${Date.now()}`,
      keyword: page.keyword || 'target keyword',
      secondaryKeywords: page.secondaryKeywords || [],
      description: page.description || '',
      content: page.content || '',
      hero: page.hero || {
        title: page.title || '',
        subtitle: page.description || '',
        ctaText: 'Konsultasi Sekarang',
        secondaryCtaText: 'Lihat Portfolio'
      },
      faq: page.faq || [],
      seoTitle: page.seoTitle || page.title || '',
      seoDescription: page.seoDescription || page.description || '',
      canonicalUrl: page.canonicalUrl || `https://www.smart-ai.id/${page.slug}`,
      ogImage: page.ogImage || this.defaultSettings.defaultOgImage,
      status: page.status || 'DRAFT',
      createdAt: now,
      updatedAt: now
    };

    pages.push(newPage);
    localStorage.setItem(this.STORAGE_KEY_LANDING, JSON.stringify(pages));
    return newPage;
  }

  public static getKeywords(): SEOKeyword[] {
    const raw = localStorage.getItem(this.STORAGE_KEY_KEYWORDS);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY_KEYWORDS, JSON.stringify(this.defaultKeywords));
      return this.defaultKeywords;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.defaultKeywords;
    }
  }

  public static saveKeyword(kw: Partial<SEOKeyword>): SEOKeyword {
    const kws = this.getKeywords();
    const now = new Date().toISOString();

    if (kw.id) {
      const idx = kws.findIndex((k) => k.id === kw.id);
      if (idx !== -1) {
        kws[idx] = { ...kws[idx], ...kw, updatedAt: now };
        localStorage.setItem(this.STORAGE_KEY_KEYWORDS, JSON.stringify(kws));
        return kws[idx];
      }
    }

    const newKw: SEOKeyword = {
      id: `kw-${Date.now()}`,
      keyword: kw.keyword || '',
      searchIntent: kw.searchIntent || 'Commercial',
      targetPage: kw.targetPage || '/',
      priority: kw.priority || 'MEDIUM',
      status: kw.status || 'ACTIVE',
      notes: kw.notes,
      createdAt: now,
      updatedAt: now
    };

    kws.push(newKw);
    localStorage.setItem(this.STORAGE_KEY_KEYWORDS, JSON.stringify(kws));
    return newKw;
  }

  public static getRedirects(): SEORedirect[] {
    const raw = localStorage.getItem(this.STORAGE_KEY_REDIRECTS);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY_REDIRECTS, JSON.stringify(this.defaultRedirects));
      return this.defaultRedirects;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.defaultRedirects;
    }
  }

  public static saveRedirect(red: Partial<SEORedirect>): SEORedirect {
    const reds = this.getRedirects();
    const now = new Date().toISOString();

    if (red.id) {
      const idx = reds.findIndex((r) => r.id === red.id);
      if (idx !== -1) {
        reds[idx] = { ...reds[idx], ...red, updatedAt: now };
        localStorage.setItem(this.STORAGE_KEY_REDIRECTS, JSON.stringify(reds));
        return reds[idx];
      }
    }

    const newRed: SEORedirect = {
      id: `red-${Date.now()}`,
      source: red.source || '',
      destination: red.destination || '',
      statusCode: red.statusCode || 301,
      active: red.active !== undefined ? red.active : true,
      createdAt: now,
      updatedAt: now
    };

    reds.push(newRed);
    localStorage.setItem(this.STORAGE_KEY_REDIRECTS, JSON.stringify(reds));
    return newRed;
  }

  public static deleteRedirect(id: string): void {
    const reds = this.getRedirects().filter((r) => r.id !== id);
    localStorage.setItem(this.STORAGE_KEY_REDIRECTS, JSON.stringify(reds));
  }

  public static getInternalLinks(): SEOInternalLink[] {
    const raw = localStorage.getItem(this.STORAGE_KEY_LINKS);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY_LINKS, JSON.stringify(this.defaultLinks));
      return this.defaultLinks;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.defaultLinks;
    }
  }

  public static saveInternalLink(link: Partial<SEOInternalLink>): SEOInternalLink {
    const links = this.getInternalLinks();
    const now = new Date().toISOString();

    const newLink: SEOInternalLink = {
      id: `link-${Date.now()}`,
      sourcePage: link.sourcePage || '',
      targetPage: link.targetPage || '',
      anchorText: link.anchorText || '',
      status: link.status || 'ACTIVE',
      createdAt: now
    };

    links.push(newLink);
    localStorage.setItem(this.STORAGE_KEY_LINKS, JSON.stringify(links));
    return newLink;
  }

  public static getSettings(): SEOSettings {
    const raw = localStorage.getItem(this.STORAGE_KEY_SETTINGS);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY_SETTINGS, JSON.stringify(this.defaultSettings));
      return this.defaultSettings;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.defaultSettings;
    }
  }

  public static saveSettings(sets: Partial<SEOSettings>): SEOSettings {
    const cur = this.getSettings();
    const updated = { ...cur, ...sets };
    localStorage.setItem(this.STORAGE_KEY_SETTINGS, JSON.stringify(updated));
    return updated;
  }

  // TECHNICAL SEO GENERATORS
  public static generateSitemapXml(): string {
    const settings = this.getSettings();
    const landingPages = this.getLandingPages().filter((p) => p.status === 'PUBLISHED');

    let urls = [
      { loc: `${settings.siteUrl}/`, priority: '1.0', changefreq: 'daily' },
      { loc: `${settings.siteUrl}/layanan`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${settings.siteUrl}/solusi-industri`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${settings.siteUrl}/portfolio`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${settings.siteUrl}/blog`, priority: '0.9', changefreq: 'daily' },
      { loc: `${settings.siteUrl}/teknologi`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${settings.siteUrl}/tentang-kami`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${settings.siteUrl}/faq`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${settings.siteUrl}/contact`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${settings.siteUrl}/ai-app-builder`, priority: '0.9', changefreq: 'weekly' }
    ];

    landingPages.forEach((lp) => {
      urls.push({
        loc: `${settings.siteUrl}/${lp.slug}`,
        priority: '0.9',
        changefreq: 'weekly'
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return xml;
  }

  public static generateRobotsTxt(): string {
    const settings = this.getSettings();
    return settings.robotsRules;
  }

  // SEO AUDIT ENGINE
  public static runAudit(): {
    overallScore: number;
    results: SEOAuditResult[];
    totalChecked: number;
    issuesCount: { critical: number; high: number; medium: number; low: number };
    orphanPages: string[];
    cannibalizationWarnings: string[];
  } {
    const landingPages = this.getLandingPages();
    const keywords = this.getKeywords();
    const results: SEOAuditResult[] = [];

    let totalCritical = 0;
    let totalHigh = 0;
    let totalMedium = 0;
    let totalLow = 0;

    // Check Landing Pages
    landingPages.forEach((lp) => {
      let score = 100;
      const issues: SEOAuditIssue[] = [];
      const warnings: string[] = [];

      // Check Title
      if (!lp.seoTitle) {
        score -= 20;
        issues.push({ type: 'CRITICAL', code: 'MISSING_TITLE', message: 'Halaman tidak memiliki SEO Title.' });
        totalCritical++;
      } else if (lp.seoTitle.length < 30 || lp.seoTitle.length > 70) {
        score -= 5;
        issues.push({ type: 'LOW', code: 'TITLE_LENGTH', message: `Panjang SEO Title (${lp.seoTitle.length} karakter) tidak optimal (30-70 karakter).` });
        totalLow++;
      }

      // Check Description
      if (!lp.seoDescription) {
        score -= 20;
        issues.push({ type: 'CRITICAL', code: 'MISSING_DESC', message: 'Halaman tidak memiliki Meta Description.' });
        totalCritical++;
      } else if (lp.seoDescription.length < 120 || lp.seoDescription.length > 160) {
        score -= 5;
        issues.push({ type: 'LOW', code: 'DESC_LENGTH', message: `Panjang Meta Description (${lp.seoDescription.length} karakter) di luar saran (120-160 karakter).` });
        totalLow++;
      }

      // Check Canonical
      if (!lp.canonicalUrl) {
        score -= 15;
        issues.push({ type: 'HIGH', code: 'MISSING_CANONICAL', message: 'Canonical URL belum diatur.' });
        totalHigh++;
      }

      // Check OG Image
      if (!lp.ogImage) {
        score -= 10;
        issues.push({ type: 'MEDIUM', code: 'MISSING_OG_IMAGE', message: 'Open Graph Image belum tersedia.' });
        totalMedium++;
      }

      // Check FAQ Structured Data
      if (!lp.faq || lp.faq.length === 0) {
        warnings.push('Halaman belum memiliki FAQ visual untuk mendukung FAQPage Schema.');
      }

      results.push({
        id: `audit-${lp.id}`,
        pageUrl: `/${lp.slug}`,
        pageType: 'SEO Landing Page',
        score: Math.max(0, score),
        issues,
        warnings,
        checkedAt: new Date().toISOString()
      });
    });

    // Detect Cannibalization
    const kwMap: { [key: string]: string[] } = {};
    keywords.forEach((k) => {
      if (!kwMap[k.keyword]) kwMap[k.keyword] = [];
      kwMap[k.keyword].push(k.targetPage);
    });

    const cannibalizationWarnings: string[] = [];
    Object.keys(kwMap).forEach((kw) => {
      if (kwMap[kw].length > 1) {
        cannibalizationWarnings.push(`Potensi Keyword Cannibalization pada keyword "${kw}" yang ditargetkan oleh beberapa halaman: ${kwMap[kw].join(', ')}.`);
      }
    });

    // Detect Orphan Pages (landing pages without active internal link pointing to them)
    const activeLinks = this.getInternalLinks();
    const orphanPages: string[] = [];
    landingPages.forEach((lp) => {
      const targetUrl = `/${lp.slug}`;
      const hasLink = activeLinks.some((l) => l.targetPage === targetUrl || l.targetPage === lp.slug);
      if (!hasLink) {
        orphanPages.push(targetUrl);
      }
    });

    const avgScore = results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length) : 100;

    return {
      overallScore: avgScore,
      results,
      totalChecked: results.length,
      issuesCount: {
        critical: totalCritical,
        high: totalHigh,
        medium: totalMedium,
        low: totalLow
      },
      orphanPages,
      cannibalizationWarnings
    };
  }

  // AI SEO ASSISTANT
  public static aiSuggestMetadata(keyword: string): {
    suggestedTitle: string;
    suggestedMetaDescription: string;
    secondaryKeywords: string[];
    searchIntent: SearchIntentType;
    outline: string[];
  } {
    const kwClean = keyword.trim().toLowerCase();

    return {
      suggestedTitle: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} | SMART-AI.ID`,
      suggestedMetaDescription: `SMART-AI.ID menyediakan ${kwClean} terpercaya untuk transformasi digital bisnis Anda di Indonesia. Hubungi kami untuk konsultasi aplikasi custom.`,
      secondaryKeywords: [
        `developer ${kwClean}`,
        `jasa ${kwClean} indonesia`,
        `pengembangan ${kwClean} enterprise`,
        `solusi ${kwClean} bisnis`
      ],
      searchIntent: kwClean.includes('jasa') || kwClean.includes('pembuatan') ? 'Commercial' : 'Informational',
      outline: [
        '1. Hero & Value Proposition Utama',
        '2. Tantangan & Problem Pernyataan Bisnis',
        '3. Solusi Kustom & Kapabilitas Utama',
        '4. Alur Kerja Pengembangan (Workflow)',
        '5. Portofolio & Studi Kasus Relevan',
        '6. FAQ & Call to Action (CTA)'
      ]
    };
  }
}
