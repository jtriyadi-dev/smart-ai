import { MAIN_SERVICES, INDUSTRY_SOLUTIONS, PROCESS_STEPS, FAQ_ITEMS } from '../data/content';

export interface WebsiteHeroContent {
  badgeText: string;
  headlineMain: string;
  headlineHighlight: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  tertiaryCtaText: string;
  checkItem1: string;
  checkItem2: string;
  backgroundVideoUrl?: string;
  backgroundImageUrl?: string;
  heroVisualType: 'interactive_copilot' | 'video_player' | 'custom_image';
}

export interface WebsiteAboutContent {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  foundedYear: string;
  totalProjectsDelivered: string;
  clientSatisfactionRate: string;
  teamEngineersCount: string;
  videoProfileUrl?: string;
}

export interface WebsiteContactFooterContent {
  companyLegalName: string;
  brandName: string;
  tagline: string;
  officeAddress: string;
  officialEmail: string;
  phoneHotline: string;
  whatsappNumber: string;
  operationalHours: string;
  mapsEmbedUrl: string;
  socialLinkedin?: string;
  socialInstagram?: string;
  socialYoutube?: string;
  socialGithub?: string;
  copyrightText: string;
}

export interface MediaAssetItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  category: 'hero' | 'logo' | 'showcase' | 'portfolio' | 'team' | 'banner' | 'other';
  url: string;
  thumbnailUrl?: string;
  altText: string;
  dimensions?: string;
  sizeBytes?: number;
  uploadedAt: string;
  isUsedInWebsite: boolean;
  videoEmbedProvider?: 'youtube' | 'vimeo' | 'mp4_direct';
}

export interface WebsiteCMSData {
  hero: WebsiteHeroContent;
  about: WebsiteAboutContent;
  contactFooter: WebsiteContactFooterContent;
  lastUpdated: string;
  updatedBy: string;
}

const STORAGE_CMS_CONTENT = 'smart_ai_website_cms_content';
const STORAGE_MEDIA_ASSETS = 'smart_ai_media_library';

const DEFAULT_HERO_CONTENT: WebsiteHeroContent = {
  badgeText: 'AI-POWERED APPLICATION DEVELOPMENT',
  headlineMain: 'Bangun Aplikasi Bisnis Lebih Cerdas dengan',
  headlineHighlight: 'AI',
  subheadline:
    'SMART-AI.ID membantu bisnis membangun aplikasi web custom berbasis AI untuk mengotomatisasi proses, mengolah data, meningkatkan efisiensi, dan mempercepat pertumbuhan.',
  primaryCtaText: 'Mulai Konsultasi',
  secondaryCtaText: 'Jelajahi Solusi',
  tertiaryCtaText: 'AI Blueprint Generator',
  checkItem1: 'Custom-built for your business.',
  checkItem2: 'From idea to production-ready application.',
  backgroundVideoUrl: '',
  backgroundImageUrl: '',
  heroVisualType: 'interactive_copilot'
};

const DEFAULT_ABOUT_CONTENT: WebsiteAboutContent = {
  badge: 'TENTANG SMART-AI.ID',
  title: 'Partner Transformasi Digital & Rekayasa Software Berbasis AI',
  description1:
    'SMART-AI.ID adalah studio rekayasa perangkat lunak enterprise spesialis solusi kecerdasan buatan, sistem informasi operasional terintegrasi, dan otomatisasi alur kerja tingkat lanjut.',
  description2:
    'Kami menggabungkan keahlian mendalam dalam arsitektur cloud scalable, algoritma machine learning terkini, dan antarmuka berstandar internasional untuk menciptakan sistem yang memberi dampak nyata pada pertumbuhan profitabilitas klien.',
  foundedYear: '2022',
  totalProjectsDelivered: '85+',
  clientSatisfactionRate: '99.4%',
  teamEngineersCount: '28+ Fullstack & AI Engineers',
  videoProfileUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};

const DEFAULT_CONTACT_FOOTER_CONTENT: WebsiteContactFooterContent = {
  companyLegalName: 'PT SMART AI INDONESIA',
  brandName: 'SMART-AI.ID',
  tagline: 'Engineering the Future of Intelligent Enterprise Software.',
  officeAddress: 'Cyber 2 Tower, Lt. 18, Jl. H. R. Rasuna Said, Kuningan, Jakarta Selatan 12950',
  officialEmail: 'contact@smart-ai.id',
  phoneHotline: '+62 21 5088 9000',
  whatsappNumber: '+6285187869164',
  operationalHours: 'Senin - Jumat: 08.30 - 17.30 WIB',
  mapsEmbedUrl: 'https://maps.google.com',
  socialLinkedin: 'https://linkedin.com/company/smart-ai-id',
  socialInstagram: 'https://instagram.com/smartai.id',
  socialYoutube: 'https://youtube.com/@smartai-indonesia',
  socialGithub: 'https://github.com/smart-ai-id',
  copyrightText: '© 2026 PT SMART AI INDONESIA. All rights reserved.'
};

const DEFAULT_MEDIA_ASSETS: MediaAssetItem[] = [
  {
    id: 'med-001',
    name: 'Executive AI Dashboard Hero Mockup',
    type: 'image',
    category: 'hero',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80',
    altText: 'Mockup Executive Dashboard Analytics',
    dimensions: '1920x1080',
    sizeBytes: 345000,
    uploadedAt: '2026-08-10',
    isUsedInWebsite: true
  },
  {
    id: 'med-002',
    name: 'Smart Mining Fleet Automation Video Demo',
    type: 'video',
    category: 'showcase',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80',
    altText: 'Video Demo Smart Mining Fleet Telemetry',
    uploadedAt: '2026-08-12',
    isUsedInWebsite: true,
    videoEmbedProvider: 'youtube'
  },
  {
    id: 'med-003',
    name: 'Smart Hospital EMR & SATUSEHAT Integration Demo',
    type: 'video',
    category: 'showcase',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
    altText: 'Video Demo SIMRS SATUSEHAT',
    uploadedAt: '2026-08-14',
    isUsedInWebsite: true,
    videoEmbedProvider: 'youtube'
  },
  {
    id: 'med-004',
    name: 'AI Neural Network Cyber Banner',
    type: 'image',
    category: 'banner',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
    altText: 'AI Futuristic Neural Visual',
    dimensions: '1920x800',
    sizeBytes: 512000,
    uploadedAt: '2026-08-01',
    isUsedInWebsite: true
  }
];

type CMSListener = (data: WebsiteCMSData) => void;

export class WebsiteCMSContentService {
  private static listeners: CMSListener[] = [];

  public static getCMSData(): WebsiteCMSData {
    try {
      const stored = localStorage.getItem(STORAGE_CMS_CONTENT);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored CMS content, using defaults', e);
    }

    const initialData: WebsiteCMSData = {
      hero: DEFAULT_HERO_CONTENT,
      about: DEFAULT_ABOUT_CONTENT,
      contactFooter: DEFAULT_CONTACT_FOOTER_CONTENT,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System Default'
    };

    localStorage.setItem(STORAGE_CMS_CONTENT, JSON.stringify(initialData));
    return initialData;
  }

  public static saveCMSData(data: Partial<WebsiteCMSData>, updatedBy: string = 'Developer'): WebsiteCMSData {
    const current = this.getCMSData();
    const updated: WebsiteCMSData = {
      hero: data.hero ? { ...current.hero, ...data.hero } : current.hero,
      about: data.about ? { ...current.about, ...data.about } : current.about,
      contactFooter: data.contactFooter ? { ...current.contactFooter, ...data.contactFooter } : current.contactFooter,
      lastUpdated: new Date().toISOString(),
      updatedBy
    };

    localStorage.setItem(STORAGE_CMS_CONTENT, JSON.stringify(updated));
    this.notifyListeners(updated);
    return updated;
  }

  public static resetToDefaults(): WebsiteCMSData {
    const defaultData: WebsiteCMSData = {
      hero: DEFAULT_HERO_CONTENT,
      about: DEFAULT_ABOUT_CONTENT,
      contactFooter: DEFAULT_CONTACT_FOOTER_CONTENT,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Factory Reset'
    };
    localStorage.setItem(STORAGE_CMS_CONTENT, JSON.stringify(defaultData));
    this.notifyListeners(defaultData);
    return defaultData;
  }

  // -------------------------------------------------------------
  // MEDIA LIBRARY MANAGEMENT
  // -------------------------------------------------------------
  public static getAllMediaAssets(): MediaAssetItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_MEDIA_ASSETS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse media assets', e);
    }
    localStorage.setItem(STORAGE_MEDIA_ASSETS, JSON.stringify(DEFAULT_MEDIA_ASSETS));
    return DEFAULT_MEDIA_ASSETS;
  }

  public static addMediaAsset(asset: Omit<MediaAssetItem, 'id' | 'uploadedAt'>): MediaAssetItem {
    const list = this.getAllMediaAssets();
    const newAsset: MediaAssetItem = {
      ...asset,
      id: `med-${Date.now().toString().slice(-5)}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newAsset, ...list];
    localStorage.setItem(STORAGE_MEDIA_ASSETS, JSON.stringify(updated));
    return newAsset;
  }

  public static updateMediaAsset(id: string, updates: Partial<MediaAssetItem>): MediaAssetItem | null {
    const list = this.getAllMediaAssets();
    const index = list.findIndex((m) => m.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    localStorage.setItem(STORAGE_MEDIA_ASSETS, JSON.stringify(list));
    return list[index];
  }

  public static deleteMediaAsset(id: string): boolean {
    const list = this.getAllMediaAssets();
    const filtered = list.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_MEDIA_ASSETS, JSON.stringify(filtered));
    return true;
  }

  // -------------------------------------------------------------
  // REACTIVE SUBSCRIBERS
  // -------------------------------------------------------------
  public static subscribe(listener: CMSListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private static notifyListeners(data: WebsiteCMSData): void {
    this.listeners.forEach((fn) => {
      try {
        fn(data);
      } catch (err) {
        console.error('Error notifying CMS listener', err);
      }
    });
  }
}
