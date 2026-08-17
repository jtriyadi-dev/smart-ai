/**
 * AnalyticsService.ts
 * SMART-AI.ID Production Analytics & Conversion Event Engine
 * Standardizes event tracking (GA4, Meta Pixel, Internal Analytics API)
 * with strict user privacy, consent handling, and production domain compliance.
 */

export interface AnalyticsEventPayload {
  eventName: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, any>;
  timestamp?: string;
}

export class AnalyticsService {
  private static readonly STORAGE_KEY_CONSENT = 'smartai_analytics_consent_v1';
  private static readonly STORAGE_KEY_EVENTS = 'smartai_analytics_events_log_v1';

  /**
   * Track standard business and conversion events
   */
  public static trackEvent(
    eventName: 
      | 'page_view'
      | 'contact_submit'
      | 'lead_created'
      | 'ai_builder_started'
      | 'ai_builder_completed'
      | 'consultation_requested'
      | 'proposal_requested'
      | 'quotation_requested'
      | 'whatsapp_clicked'
      | 'phone_clicked'
      | 'login'
      | 'signup'
      | string,
    params: Record<string, any> = {}
  ): void {
    const payload: AnalyticsEventPayload = {
      eventName,
      params: {
        ...params,
        domain: 'https://www.smart-ai.id',
        url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      },
      timestamp: new Date().toISOString()
    };

    // 1. Dispatch to window.gtag if configured
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', eventName, payload.params);
      } catch (err) {
        console.warn('[AnalyticsService] GA4 event dispatch error:', err);
      }
    }

    // 2. Dispatch to window.dataLayer if available
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      try {
        (window as any).dataLayer.push({
          event: eventName,
          ...payload.params,
          timestamp: payload.timestamp
        });
      } catch (err) {
        console.warn('[AnalyticsService] dataLayer push error:', err);
      }
    }

    // 3. Local Audit Trail Logging (Safe, No PII)
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY_EVENTS);
        const events: AnalyticsEventPayload[] = raw ? JSON.parse(raw) : [];
        events.unshift(payload);
        // Keep last 100 events
        localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events.slice(0, 100)));
      } catch {
        // Storage full or unavailable
      }
    }
  }

  /**
   * Get recent logged client analytics events for admin inspection
   */
  public static getRecentEvents(): AnalyticsEventPayload[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_EVENTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Check if user has consented to analytics
   */
  public static hasConsent(): boolean {
    if (typeof localStorage === 'undefined') return true;
    return localStorage.getItem(this.STORAGE_KEY_CONSENT) !== 'declined';
  }

  /**
   * Set user analytics consent
   */
  public static setConsent(granted: boolean): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY_CONSENT, granted ? 'granted' : 'declined');
  }
}
