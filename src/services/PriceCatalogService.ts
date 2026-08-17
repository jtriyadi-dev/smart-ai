import { PriceCatalogItem } from '../types';

const CATALOG_STORAGE_KEY = 'smart_ai_price_catalog_v1';

export class PriceCatalogService {
  public static getAllCatalogItems(): PriceCatalogItem[] {
    try {
      const data = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load price catalog from storage', e);
    }

    const defaultCatalog = this.generateSampleCatalog();
    this.saveCatalog(defaultCatalog);
    return defaultCatalog;
  }

  public static getActiveCatalogItems(): PriceCatalogItem[] {
    return this.getAllCatalogItems().filter((item) => item.active);
  }

  public static saveCatalogItem(
    item: PriceCatalogItem,
    updatedBy: string = 'Admin',
    reason: string = 'Update Katalog Harga'
  ): PriceCatalogItem {
    const catalog = this.getAllCatalogItems();
    const index = catalog.findIndex((i) => i.id === item.id);

    const now = new Date().toISOString();

    if (index >= 0) {
      const oldItem = catalog[index];
      if (oldItem.defaultPrice !== item.defaultPrice) {
        item.priceHistory = [
          ...(oldItem.priceHistory || []),
          {
            oldPrice: oldItem.defaultPrice,
            newPrice: item.defaultPrice,
            changedBy: updatedBy,
            reason,
            date: now
          }
        ];
      } else {
        item.priceHistory = oldItem.priceHistory || [];
      }
      item.updatedBy = updatedBy;
      item.updatedAt = now;
      catalog[index] = item;
    } else {
      item.id = item.id || `CAT-${Date.now()}`;
      item.priceHistory = [];
      item.updatedBy = updatedBy;
      item.updatedAt = now;
      item.active = item.active !== undefined ? item.active : true;
      catalog.unshift(item);
    }

    this.saveCatalog(catalog);
    return item;
  }

  private static saveCatalog(catalog: PriceCatalogItem[]): void {
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
    } catch (e) {
      console.error('Failed to save price catalog', e);
    }
  }

  private static generateSampleCatalog(): PriceCatalogItem[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'CAT-MOD-001',
        category: 'Module',
        name: 'Executive Dashboard & KPI Analytics',
        description: 'Dasbor interaktif real-time dengan visualisasi grafik, ringkasan KPI, dan filter periode.',
        defaultPrice: 45000000,
        pricingModel: 'Per Module',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-MOD-002',
        category: 'Module',
        name: 'Fleet Management & Telemetry Control',
        description: 'Pemantauan lokasi kendaraan, status mesin, konsumsi BBM, dan geofencing alert.',
        defaultPrice: 65000000,
        pricingModel: 'Per Module',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-MOD-003',
        category: 'Module',
        name: 'Predictive Maintenance & Inspection Engine',
        description: 'Modul penjadwalan servis preventif, manajemen sparepart, dan log perbaikan kendaraan.',
        defaultPrice: 50000000,
        pricingModel: 'Per Module',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-AI-001',
        category: 'AI',
        name: 'Google Gemini Flash AI Copilot & Query Engine',
        description: 'Asisten kecerdasan buatan untuk analisis data dengan bahasa alami dan ekstraksi wawasan otomatis.',
        defaultPrice: 55000000,
        pricingModel: 'Fixed Price',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-AI-002',
        category: 'AI',
        name: 'AI Anomaly & Fraud Detection Engine',
        description: 'Algoritma ML untuk mendeteksi kecurangan transaksi, kejanggalan BBM, dan lonjakan biaya abnormal.',
        defaultPrice: 40000000,
        pricingModel: 'Fixed Price',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-INT-001',
        category: 'Integration',
        name: 'WhatsApp Business API Notification Gateway',
        description: 'Integrasi pengiriman notifikasi otomatis, alert darurat, dan OTP via WhatsApp API.',
        defaultPrice: 20000000,
        pricingModel: 'Fixed Price',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-INT-002',
        category: 'Integration',
        name: 'Enterprise ERP / Core Banking API Gateway',
        description: 'Integrasi dua arah dengan SAP, Oracle, Xero, atau Core Banking System via REST/gRPC.',
        defaultPrice: 35000000,
        pricingModel: 'Fixed Price',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-MOB-001',
        category: 'Mobile',
        name: 'Field Driver & Operator Mobile PWA Application',
        description: 'Aplikasi mobile PWA responsif untuk inspeksi lapangan, driver check-in, dan scan QR offline.',
        defaultPrice: 45000000,
        pricingModel: 'Fixed Price',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-CLD-001',
        category: 'Cloud',
        name: 'Google Cloud Platform Serverless Infrastructure Setup',
        description: 'Konfigurasi Cloud Run, Firestore, Secret Manager, SSL CDN, dan CI/CD Deployment Pipeline.',
        defaultPrice: 25000000,
        pricingModel: 'Fixed Price',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      },
      {
        id: 'CAT-MNT-001',
        category: 'Maintenance',
        name: 'Standard SLA Maintenance & Support (Annual)',
        description: 'Layanan pemeliharaan sistem, bug fixing, update keamanan, dan SLA respon maksimal 4 jam.',
        defaultPrice: 60000000,
        pricingModel: 'Per Month',
        currency: 'IDR',
        active: true,
        updatedBy: 'System Admin',
        updatedAt: now,
        priceHistory: []
      }
    ];
  }
}
