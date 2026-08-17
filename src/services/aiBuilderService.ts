import { AIBuilderInput, ApplicationAnalysis } from '../types';

/**
 * AI Application Builder Service Architecture
 * Manages server communication, AI analysis requests, local storage blueprint caching,
 * export helpers, and analytics event abstraction.
 */
export const AIApplicationBuilderService = {
  /**
   * Request structured AI analysis from server endpoint
   */
  async analyzeApplication(input: AIBuilderInput): Promise<{ success: boolean; data?: ApplicationAnalysis; error?: string }> {
    try {
      this.trackEvent('ai_analysis_requested', {
        industry: input.businessIndustry,
        businessType: input.businessType,
        userScale: input.userScale,
      });

      const response = await fetch('/api/ai-builder-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      const json = await response.json();

      if (json.success && json.analysis) {
        this.trackEvent('ai_analysis_completed', {
          solutionName: json.analysis.recommendedSolution?.solutionName,
          modulesCount: json.analysis.recommendedModules?.length
        });
        return { success: true, data: json.analysis };
      } else {
        this.trackEvent('ai_analysis_failed', { error: json.error || 'Unknown error' });
        return { success: false, error: json.error || 'Gagal menghasilkan analisis AI.' };
      }
    } catch (err: any) {
      console.error('AIApplicationBuilderService error:', err);
      this.trackEvent('ai_analysis_failed', { error: err.message });
      return {
        success: false,
        error: 'Gagal terhubung ke layanan AI Application Builder. Periksa koneksi Anda dan coba lagi.'
      };
    }
  },

  /**
   * Blueprint Storage Service Abstraction
   */
  saveBlueprintToStorage(blueprint: ApplicationAnalysis, inputData?: AIBuilderInput): boolean {
    try {
      const storageItem = {
        id: `blueprint-${Date.now()}`,
        savedAt: new Date().toISOString(),
        blueprint,
        inputData
      };
      localStorage.setItem('smart_ai_saved_blueprint', JSON.stringify(storageItem));
      this.trackEvent('blueprint_saved', { id: storageItem.id });
      return true;
    } catch (e) {
      console.warn('BlueprintStorageService save error:', e);
      return false;
    }
  },

  getSavedBlueprint(): { id: string; savedAt: string; blueprint: ApplicationAnalysis; inputData?: AIBuilderInput } | null {
    try {
      const data = localStorage.getItem('smart_ai_saved_blueprint');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Export Blueprint as JSON File
   */
  exportAsJSON(blueprint: ApplicationAnalysis, filename: string = 'smart-ai-application-blueprint.json') {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(blueprint, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.trackEvent('blueprint_exported_json', { filename });
  },

  /**
   * Export Blueprint as Printable PDF Document
   */
  exportAsPrintablePDF() {
    window.print();
    this.trackEvent('blueprint_exported_pdf', {});
  },

  /**
   * Analytics Foundation Abstraction
   */
  trackEvent(eventName: string, payload: Record<string, any>) {
    if (typeof window !== 'undefined') {
      // Clean event tracking hook without invasive logging
      const windowObj = window as any;
      if (windowObj.__SMART_AI_ANALYTICS_EVENTS) {
        windowObj.__SMART_AI_ANALYTICS_EVENTS.push({
          event: eventName,
          payload,
          timestamp: new Date().toISOString()
        });
      } else {
        windowObj.__SMART_AI_ANALYTICS_EVENTS = [{
          event: eventName,
          payload,
          timestamp: new Date().toISOString()
        }];
      }
    }
  }
};
