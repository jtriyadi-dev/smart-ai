export interface ManagedAPIKeyConfig {
  id: string;
  provider: 'gemini' | 'openai' | 'claude' | 'deepseek' | 'whatsapp' | 'google_maps' | 'midtrans' | 'satusehat' | 's3_storage';
  name: string;
  category: 'AI & LLM' | 'Messaging' | 'Location & Maps' | 'Payment Gateway' | 'Healthcare API' | 'Cloud Storage';
  apiKey: string;
  apiSecret?: string;
  endpointUrl?: string;
  environment: 'production' | 'sandbox';
  status: 'active' | 'inactive' | 'invalid' | 'testing';
  lastTestedAt?: string;
  latencyMs?: number;
  monthlyQuotaUsage?: number;
  monthlyQuotaLimit?: number;
  description: string;
  updatedAt: string;
}

const STORAGE_API_KEYS = 'smart_ai_managed_api_keys';

const DEFAULT_API_KEYS: ManagedAPIKeyConfig[] = [
  {
    id: 'key-gemini',
    provider: 'gemini',
    name: 'Google Gemini AI Suite (2.5 Flash / Pro)',
    category: 'AI & LLM',
    apiKey: 'AIzaSyA489X_DEMO_KEY_SMARTAI_GEMINI_PRODUCTION',
    endpointUrl: 'https://generativelanguage.googleapis.com/v1beta',
    environment: 'production',
    status: 'active',
    lastTestedAt: '2026-08-16 09:42',
    latencyMs: 142,
    monthlyQuotaUsage: 145000,
    monthlyQuotaLimit: 1000000,
    description: 'Kunci API utama untuk AI Copilot, Blueprint Generator, Document OCR, dan Voice Scribe transkripsi.',
    updatedAt: '2026-08-16'
  },
  {
    id: 'key-openai',
    provider: 'openai',
    name: 'OpenAI GPT-4o & DALL-E 3 API',
    category: 'AI & LLM',
    apiKey: 'sk-proj-9821hjsdf98234jksdf87234ksdf092348hsdf',
    endpointUrl: 'https://api.openai.com/v1',
    environment: 'production',
    status: 'active',
    lastTestedAt: '2026-08-15 18:20',
    latencyMs: 285,
    monthlyQuotaUsage: 48200,
    monthlyQuotaLimit: 500000,
    description: 'Model sekunder untuk cross-validation penalaran arsitektur software dan multimodal image analysis.',
    updatedAt: '2026-08-15'
  },
  {
    id: 'key-claude',
    provider: 'claude',
    name: 'Anthropic Claude 3.5 Sonnet',
    category: 'AI & LLM',
    apiKey: 'sk-ant-api03-098234kjsdf98234-DEMO',
    endpointUrl: 'https://api.anthropic.com/v1',
    environment: 'production',
    status: 'active',
    lastTestedAt: '2026-08-14 11:15',
    latencyMs: 310,
    monthlyQuotaUsage: 22000,
    monthlyQuotaLimit: 250000,
    description: 'Enjin pemrosesan dokumen hukum, perbandingan klausa kontrak, dan sintesis spesifikasi teknis.',
    updatedAt: '2026-08-14'
  },
  {
    id: 'key-whatsapp',
    provider: 'whatsapp',
    name: 'WhatsApp Business API Gateway (Fonnte / Twilio)',
    category: 'Messaging',
    apiKey: 'fonnte_token_8892347293847293847293',
    endpointUrl: 'https://api.fonnte.com/send',
    environment: 'production',
    status: 'active',
    lastTestedAt: '2026-08-16 10:05',
    latencyMs: 88,
    monthlyQuotaUsage: 1420,
    monthlyQuotaLimit: 10000,
    description: 'Notifikasi otomatis WhatsApp untuk kirim invoice, kode OTP, pengingat janji temu, dan peringatan IoT.',
    updatedAt: '2026-08-16'
  },
  {
    id: 'key-maps',
    provider: 'google_maps',
    name: 'Google Maps Places & Routes API',
    category: 'Location & Maps',
    apiKey: 'AIzaSyB9921_GOOGLE_MAPS_ROUTING_KEY',
    endpointUrl: 'https://maps.googleapis.com/maps/api',
    environment: 'production',
    status: 'active',
    lastTestedAt: '2026-08-13 14:00',
    latencyMs: 95,
    monthlyQuotaUsage: 8900,
    monthlyQuotaLimit: 50000,
    description: 'Pelacakan GPS armada tambang, geocoding alamat pelanggan, dan routing logistik truk perkebunan.',
    updatedAt: '2026-08-13'
  },
  {
    id: 'key-midtrans',
    provider: 'midtrans',
    name: 'Midtrans Payment Gateway (Snap & Core API)',
    category: 'Payment Gateway',
    apiKey: 'SB-Mid-server-98234kjhsdf87234kjsdf9',
    apiSecret: 'SB-Mid-client-88234kljsdf98234klj',
    endpointUrl: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
    environment: 'sandbox',
    status: 'active',
    lastTestedAt: '2026-08-16 08:30',
    latencyMs: 160,
    description: 'Penerimaan pembayaran otomatis QRIS dinamis, Virtual Account BCA/Mandiri, Kartu Kredit, dan e-Wallet.',
    updatedAt: '2026-08-16'
  },
  {
    id: 'key-satusehat',
    provider: 'satusehat',
    name: 'Kemenkes SATUSEHAT & BPJS PCare Bridge',
    category: 'Healthcare API',
    apiKey: 'satusehat_client_id_medika_001928',
    apiSecret: 'satusehat_secret_998234jklnsdf87234',
    endpointUrl: 'https://api-satusehat.kemkes.go.id/fhir-r4/v1',
    environment: 'production',
    status: 'active',
    lastTestedAt: '2026-08-15 16:45',
    latencyMs: 240,
    description: 'Interoperabilitas data Rekam Medis Elektronik (RME) SIMRS dan Klinik Pratama ke server Kemenkes RI.',
    updatedAt: '2026-08-15'
  }
];

export class APIKeyManagementService {
  public static getAllKeys(): ManagedAPIKeyConfig[] {
    try {
      const stored = localStorage.getItem(STORAGE_API_KEYS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse API keys', e);
    }
    localStorage.setItem(STORAGE_API_KEYS, JSON.stringify(DEFAULT_API_KEYS));
    return DEFAULT_API_KEYS;
  }

  public static saveKey(keyConfig: ManagedAPIKeyConfig): ManagedAPIKeyConfig {
    const list = this.getAllKeys();
    const index = list.findIndex((k) => k.id === keyConfig.id);
    const updatedConfig: ManagedAPIKeyConfig = {
      ...keyConfig,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (index >= 0) {
      list[index] = updatedConfig;
    } else {
      list.push(updatedConfig);
    }
    localStorage.setItem(STORAGE_API_KEYS, JSON.stringify(list));
    return updatedConfig;
  }

  public static deleteKey(id: string): boolean {
    const list = this.getAllKeys();
    const filtered = list.filter((k) => k.id !== id);
    localStorage.setItem(STORAGE_API_KEYS, JSON.stringify(filtered));
    return true;
  }

  public static async testKeyConnection(id: string): Promise<{ success: boolean; latencyMs: number; message: string }> {
    const list = this.getAllKeys();
    const target = list.find((k) => k.id === id);
    if (!target) {
      return { success: false, latencyMs: 0, message: 'Kunci API tidak ditemukan' };
    }

    // Simulate real handshake verification
    const simulatedLatency = Math.floor(Math.random() * 120) + 65;
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!target.apiKey || target.apiKey.trim().length < 5) {
      target.status = 'invalid';
      target.lastTestedAt = new Date().toLocaleString('id-ID');
      this.saveKey(target);
      return { success: false, latencyMs: simulatedLatency, message: 'Kunci API kosong atau format tidak valid.' };
    }

    target.status = 'active';
    target.latencyMs = simulatedLatency;
    target.lastTestedAt = new Date().toLocaleString('id-ID');
    this.saveKey(target);

    return {
      success: true,
      latencyMs: simulatedLatency,
      message: `Handshake ${target.name} Berhasil! Response code 200 OK (${simulatedLatency}ms)`
    };
  }

  public static maskKey(key: string): string {
    if (!key) return '';
    if (key.length <= 8) return '••••••••';
    const prefix = key.slice(0, 7);
    const suffix = key.slice(-4);
    return `${prefix}••••••••${suffix}`;
  }
}
