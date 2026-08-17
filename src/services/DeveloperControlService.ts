export interface DeveloperSystemState {
  appVersion: string;
  environment: 'production' | 'staging' | 'development';
  maintenanceMode: boolean;
  maintenanceNotice: string;
  featureFlags: {
    enableAICopilot: boolean;
    enableFloatingChatbot: boolean;
    enableWhatsAppCTA: boolean;
    enableCustomerPortalRegistration: boolean;
    enableInstantQuotationPDF: boolean;
    enableLiveVideoShowcase: boolean;
    enableDebugConsole: boolean;
  };
  customHeaderScripts: string;
  customFooterScripts: string;
  cacheLastPurgedAt: string;
}

const STORAGE_DEV_SYSTEM_STATE = 'smart_ai_developer_system_state';

const DEFAULT_DEV_SYSTEM_STATE: DeveloperSystemState = {
  appVersion: 'v2.6.4-prod-build.928',
  environment: 'production',
  maintenanceMode: false,
  maintenanceNotice: 'Sistem sedang dalam optimalisasi server terjadwal. Silakan hubungi support@smart-ai.id untuk kebutuhan darurat.',
  featureFlags: {
    enableAICopilot: true,
    enableFloatingChatbot: true,
    enableWhatsAppCTA: true,
    enableCustomerPortalRegistration: true,
    enableInstantQuotationPDF: true,
    enableLiveVideoShowcase: true,
    enableDebugConsole: false
  },
  customHeaderScripts: '<!-- Google Tag Manager / Meta Pixel Header Slot -->',
  customFooterScripts: '<!-- Custom LiveChat or Analytics Script Slot -->',
  cacheLastPurgedAt: new Date().toISOString()
};

export class DeveloperControlService {
  public static getSystemState(): DeveloperSystemState {
    try {
      const stored = localStorage.getItem(STORAGE_DEV_SYSTEM_STATE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse developer system state', e);
    }
    localStorage.setItem(STORAGE_DEV_SYSTEM_STATE, JSON.stringify(DEFAULT_DEV_SYSTEM_STATE));
    return DEFAULT_DEV_SYSTEM_STATE;
  }

  public static saveSystemState(updates: Partial<DeveloperSystemState>): DeveloperSystemState {
    const current = this.getSystemState();
    const updated: DeveloperSystemState = {
      ...current,
      ...updates,
      featureFlags: updates.featureFlags ? { ...current.featureFlags, ...updates.featureFlags } : current.featureFlags
    };
    localStorage.setItem(STORAGE_DEV_SYSTEM_STATE, JSON.stringify(updated));
    return updated;
  }

  public static toggleMaintenanceMode(enabled: boolean, notice?: string): DeveloperSystemState {
    return this.saveSystemState({
      maintenanceMode: enabled,
      maintenanceNotice: notice || 'Sistem sedang dalam optimalisasi server terjadwal.'
    });
  }

  public static purgeAllCache(): { purgedKeys: number; timestamp: string } {
    const keysToCheck = [
      'smart_ai_website_cms_content_cache',
      'smart_ai_quote_draft',
      'smart_ai_proposal_temp'
    ];
    let count = 0;
    keysToCheck.forEach((k) => {
      if (localStorage.getItem(k)) {
        localStorage.removeItem(k);
        count++;
      }
    });

    const now = new Date().toLocaleString('id-ID');
    this.saveSystemState({ cacheLastPurgedAt: now });
    return { purgedKeys: count + 1, timestamp: now };
  }

  public static exportFullSystemSnapshotJSON(): string {
    const snapshot: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('smart_ai_')) {
        try {
          snapshot[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          snapshot[key] = localStorage.getItem(key);
        }
      }
    }
    return JSON.stringify(snapshot, null, 2);
  }

  public static importFullSystemSnapshotJSON(jsonString: string): { success: boolean; importedKeysCount: number } {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed !== 'object' || parsed === null) {
        return { success: false, importedKeysCount: 0 };
      }
      let count = 0;
      Object.keys(parsed).forEach((k) => {
        if (k.startsWith('smart_ai_')) {
          localStorage.setItem(k, typeof parsed[k] === 'string' ? parsed[k] : JSON.stringify(parsed[k]));
          count++;
        }
      });
      return { success: true, importedKeysCount: count };
    } catch (e) {
      console.error('Import error', e);
      return { success: false, importedKeysCount: 0 };
    }
  }
}
