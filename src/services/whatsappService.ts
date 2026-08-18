import { WhatsAppConfig } from '../types';

const STORAGE_KEY_WA_CONFIG = 'smart_ai_whatsapp_config';

export const DEFAULT_WHATSAPP_CONFIG: WhatsAppConfig = {
  whatsappNumber: '6285187869164',
  businessName: 'SMART-AI.ID',
  defaultMessage: 'Halo SMART-AI.ID, saya tertarik untuk berkonsultasi mengenai solusi AI dan pembuatan aplikasi kustom.'
};

export class WhatsAppService {
  /**
   * Retrieve active WhatsApp configuration or default
   */
  public static getConfig(): WhatsAppConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WA_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading WhatsApp config', e);
    }
    return DEFAULT_WHATSAPP_CONFIG;
  }

  /**
   * Save WhatsApp config (Admin capability)
   */
  public static saveConfig(config: WhatsAppConfig): void {
    localStorage.setItem(STORAGE_KEY_WA_CONFIG, JSON.stringify(config));
  }

  /**
   * Clean WhatsApp phone number for wa.me URL
   */
  public static formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    return cleaned;
  }

  /**
   * Build contextual WhatsApp URL
   */
  public static buildWhatsAppUrl(
    source?: string,
    contextData?: {
      title?: string;
      referenceCode?: string;
      estimateSummary?: string;
      industry?: string;
      name?: string;
      customNote?: string;
    }
  ): string {
    const config = this.getConfig();
    const cleanNumber = this.formatPhoneNumber(config.whatsappNumber);

    let messageText = config.defaultMessage;

    if (source === 'AI Project Estimator' || source === '/ai-project-estimator') {
      messageText = `Halo ${config.businessName}, saya ingin mendiskusikan proyek aplikasi saya berbasis hasil AI Project Estimator.\n\n` +
        (contextData?.title ? `*Judul Proyek:* ${contextData.title}\n` : '') +
        (contextData?.referenceCode ? `*Kode Referensi:* ${contextData.referenceCode}\n` : '') +
        (contextData?.estimateSummary ? `*Estimasi:* ${contextData.estimateSummary}\n` : '') +
        `Mohon info ketersediaan sesi konsultasi kelanjutan proyek ini. Terima kasih!`;
    } else if (source === 'AI Application Builder' || source === '/ai-app-builder') {
      messageText = `Halo ${config.businessName}, saya baru saja mendesain konsep aplikasi menggunakan AI Application Builder.\n\n` +
        (contextData?.title ? `*Konsep Aplikasi:* ${contextData.title}\n` : '') +
        (contextData?.industry ? `*Industri:* ${contextData.industry}\n` : '') +
        `Saya ingin berdiskusi dengan tim konsultan teknis untuk implementasi lebih lanjut.`;
    } else if (source === 'AI Requirement Analyzer') {
      messageText = `Halo ${config.businessName}, saya sudah menganalisis dokumen requirement SRS dengan AI Requirement Analyzer.\n\n` +
        (contextData?.title ? `*Topik Requirement:* ${contextData.title}\n` : '') +
        `Mohon dibantu review teknis oleh tim spesialis SMART-AI.ID.`;
    } else if (source === 'AI Solution Architect') {
      messageText = `Halo ${config.businessName}, saya berminat mendiskusikan blueprint arsitektur sistem (${contextData?.title || 'Sistem AI'}) yang telah saya susun. Mohon info tahapan selanjutnya.`;
    } else if (contextData?.customNote) {
      messageText = `Halo ${config.businessName}, ${contextData.customNote}`;
    }

    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }

  /**
   * Helper to generate WhatsApp URL directly for a phone number, recipient name and context
   */
  public static generateWhatsAppUrl(phone: string, recipientName?: string, contextMessage?: string): string {
    const cleanNumber = this.formatPhoneNumber(phone || '6285187869164');
    const greeting = recipientName ? `Halo ${recipientName}, ` : `Halo, `;
    const text = contextMessage
      ? `${greeting}${contextMessage}`
      : `${greeting}saya dari tim SMART-AI.ID ingin memfollow-up diskusi proyek kita.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  }

  /**
   * Trigger WhatsApp open & track event
   */
  public static openWhatsApp(
    source: string = 'General',
    contextData?: any
  ): void {
    const url = this.buildWhatsAppUrl(source, contextData);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export function generateWhatsAppUrl(phone: string, text?: string): string {
  const cleanNumber = WhatsAppService.formatPhoneNumber(phone || '6285187869164');
  const messageText = text || 'Halo, saya dari tim SMART-AI.ID.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}
