import { AIScopeBlueprint } from '../types';

export interface AIRequest {
  prompt: string;
  industry?: string;
  appType?: string;
  context?: Record<string, any>;
  provider?: 'gemini' | 'openai' | 'heuristic';
}

export interface AIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  providerUsed: string;
}

/**
 * AI Service Abstraction Layer for SMART-AI.ID Platform
 * Routes calls through backend API routes to keep API keys secure and enable swapping LLM providers.
 */
export class AIService {
  private static instance: AIService;

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Generates AI Scope & Architecture Blueprint for clients
   */
  public async generateScopeBlueprint(request: AIRequest): Promise<AIResponse<AIScopeBlueprint>> {
    try {
      const response = await fetch('/api/ai-scope-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const result = await response.json();
      return {
        success: result.success,
        data: result.blueprint,
        error: result.error,
        timestamp: new Date().toISOString(),
        providerUsed: 'Google Gemini 2.5 / Heuristic Engine',
      };
    } catch (err: any) {
      console.warn('[AIService] API Call failed, returning heuristic fallback', err);
      return {
        success: true,
        data: this.getFallbackBlueprint(request),
        error: err?.message,
        timestamp: new Date().toISOString(),
        providerUsed: 'Local Heuristic Engine',
      };
    }
  }

  /**
   * Fallback heuristic generator when offline or server unreachable
   */
  private getFallbackBlueprint(request: AIRequest): AIScopeBlueprint {
    const industry = request.industry || 'Cross-Industry Enterprise';
    const appType = request.appType || 'Custom Business Application & AI';

    return {
      summary: `Arsitektur sistem ${appType} custom berbasis web untuk industri ${industry} yang mengintegrasikan otomatisasi alur kerja, analisis data real-time, dan model AI Google Gemini.`,
      recommendedStack: {
        frontend: 'React 19 + TypeScript + PWA Mobile Ready',
        backend: 'Node.js Express REST API / GraphQL',
        database: 'PostgreSQL / Supabase High Performance',
        aiEngine: 'Google Gemini 2.5 Flash Multimodal',
        cloud: 'Google Cloud Platform + Cloudflare',
      },
      coreModules: [
        `Dashboard Eksekutif ${industry}`,
        'Sistem Manajemen User & Multi-Role Access Control (RBAC)',
        'Otomatisasi Approval & Notifikasi WhatsApp Gateway',
        'Export Laporan PDF/Excel & Audit Log Complete',
      ],
      aiCapabilities: [
        'Ringkasan Laporan AI Otomatis (Executive Summary)',
        'Pencarian Cerdas Dokumen SOP & Knowledge Base (RAG)',
        'Deteksi Anomali Data Operational & Smart Alerts',
      ],
      estimatedTimeWeeks: '3 - 5 Minggu',
      recommendedPhases: [
        { phase: 'Fase 1', duration: '1 Minggu', title: 'Discovery, UI/UX Wireframe & DB Schema' },
        { phase: 'Fase 2', duration: '2-3 Minggu', title: 'Core Application Development & AI Model Integration' },
        { phase: 'Fase 3', duration: '1 Minggu', title: 'Testing Interaktif, Training User & Cloud Deployment' },
      ],
      budgetTier: 'Professional Custom Package',
    };
  }
}

export const aiService = AIService.getInstance();
