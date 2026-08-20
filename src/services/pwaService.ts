/**
 * SMART-AI.ID PWA Service
 * Handles Service Worker lifecycle, installation prompts, offline detection, and cache controls.
 */

export interface PWAState {
  isInstalled: boolean;
  isInstallable: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
  platform: 'android' | 'ios' | 'windows' | 'mac' | 'other';
}

type PWAChangeListener = (state: PWAState) => void;

class PWAServiceClass {
  private deferredPrompt: any = null;
  private registration: ServiceWorkerRegistration | null = null;
  private listeners: Set<PWAChangeListener> = new Set();
  private state: PWAState = {
    isInstalled: false,
    isInstallable: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    hasUpdate: false,
    platform: 'other'
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.detectPlatform();
      this.checkInstalledStatus();
      this.initNetworkListeners();
      this.initInstallPromptListener();
    }
  }

  private detectPlatform(): void {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/android/i.test(userAgent)) {
      this.state.platform = 'android';
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
      this.state.platform = 'ios';
    } else if (/win/i.test(userAgent)) {
      this.state.platform = 'windows';
    } else if (/mac/i.test(userAgent)) {
      this.state.platform = 'mac';
    } else {
      this.state.platform = 'other';
    }
  }

  private checkInstalledStatus(): void {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    this.state.isInstalled = isStandalone;
  }

  private initNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.state.isOnline = true;
      this.notifyListeners();
    });

    window.addEventListener('offline', () => {
      this.state.isOnline = false;
      this.notifyListeners();
    });
  }

  private initInstallPromptListener(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Prevent automatic browser banner so we can trigger custom prompt
      e.preventDefault();
      this.deferredPrompt = e;
      this.state.isInstallable = true;
      this.notifyListeners();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.state.isInstallable = false;
      this.state.isInstalled = true;
      this.notifyListeners();
      console.log('[PWA] SMART-AI.ID successfully installed as Progressive Web App.');
    });
  }

  public registerServiceWorker(): void {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // Only register after window load to prevent blocking initial critical render
    window.addEventListener('load', () => {
      // Record if page had a controller when it first started
      const hadControllerAtStart = Boolean(navigator.serviceWorker.controller);

      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          this.registration = reg;
          console.log('[PWA] Service Worker active with scope:', reg.scope);

          // Check for waiting SW (pending update)
          if (reg.waiting) {
            this.state.hasUpdate = true;
            this.notifyListeners();
          }

          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  this.state.hasUpdate = true;
                  this.notifyListeners();
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration skipped/failed:', err);
        });

      // Only reload on controller change if there was ALREADY an active controller (true app update)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing && hadControllerAtStart) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }

  public async promptInstall(): Promise<{ outcome: 'accepted' | 'dismissed' | 'unsupported' }> {
    if (this.deferredPrompt) {
      try {
        this.deferredPrompt.prompt();
        const choice = await this.deferredPrompt.userChoice;
        this.deferredPrompt = null;
        this.state.isInstallable = false;
        this.notifyListeners();
        return { outcome: choice.outcome };
      } catch (err) {
        console.error('[PWA] Install prompt failed:', err);
        return { outcome: 'dismissed' };
      }
    }
    return { outcome: 'unsupported' };
  }

  public applyUpdate(): void {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } else {
      window.location.reload();
    }
  }

  public async clearPWACache(): Promise<boolean> {
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
        return true;
      } catch (e) {
        console.error('[PWA] Failed to clear caches:', e);
        return false;
      }
    }
    return false;
  }

  public getState(): PWAState {
    return { ...this.state };
  }

  public subscribe(listener: PWAChangeListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    const currentState = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(currentState);
      } catch (err) {
        console.error('[PWA] Listener error:', err);
      }
    });
  }
}

export const PWAService = new PWAServiceClass();
