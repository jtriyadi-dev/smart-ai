import { GoogleGenAI } from '@google/genai';
import {
  CopilotQueryResponse,
  IndustryType,
  UserRole,
  ConfidenceLevel,
  InsightItem,
  CopilotRecommendation
} from '../../types';
import { IntentParserService } from './IntentParserService';
import { DataRegistryService } from './DataRegistryService';
import { CalculationEngine } from './CalculationEngine';
import { AnomalyDetectionService } from './AnomalyDetectionService';
import { ForecastEngine } from './ForecastEngine';
import { CopilotAuditService } from './CopilotAuditService';

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

export class BusinessCopilotService {
  /**
   * Main query processor
   */
  static async processQuery(
    question: string,
    industry: IndustryType = 'RETAIL',
    userRole: UserRole = 'CEO'
  ): Promise<CopilotQueryResponse> {
    const startTime = Date.now();

    // 1. Parse Intent
    const intent = IntentParserService.parseQuery(question, industry);

    // 2. Permission Check
    const roleAllowed = DataRegistryService.checkRolePermission(userRole, intent.metric);

    if (!roleAllowed) {
      CopilotAuditService.logAudit({
        userName: `User (${userRole})`,
        userRole,
        industry,
        question,
        intentMode: intent.mode,
        metricsQueried: [intent.metric],
        dataSource: 'Authorization Layer',
        executionTimeMs: Date.now() - startTime,
        confidence: 'LOW'
      });

      return {
        id: `cop-err-${Date.now()}`,
        question,
        intent,
        summaryText: `Akses ditolak: Peran Anda (${userRole}) tidak memiliki wewenang untuk membaca data metrik ${intent.metric}. Silakan hubungi System Administrator.`,
        insights: [],
        alerts: [],
        recommendations: [],
        dataSourceName: 'Authorization Layer',
        periodLabel: 'N/A',
        lastUpdated: new Date().toLocaleTimeString('id-ID'),
        confidence: 'LOW',
        calculationExplanation: 'Akses dibatasi oleh Kebijakan Role-Based Access Control (RBAC).',
        followUpQuestions: ['Lihat ringkasan bisnis umum', 'Ganti peran pengguna ke CEO/Finance'],
        roleAllowed: false,
        timestamp: new Date().toLocaleTimeString('id-ID')
      };
    }

    // 3. Fetch Data & Perform Deterministic Calculations
    const domainData = DataRegistryService.getIndustryData(industry, intent.metric, intent.timeRange);

    const metricResult = CalculationEngine.buildMetricResult(
      domainData.dataSourceName,
      domainData.dataPoints,
      domainData.unit,
      domainData.previousTotal,
      domainData.targetTotal
    );

    // 4. Anomaly Detection
    const alerts = AnomalyDetectionService.detectAnomalies(industry, intent.metric);

    // 5. Forecast if requested
    let forecast = undefined;
    if (intent.mode === 'FORECASTING') {
      forecast = ForecastEngine.generateForecast(industry, intent.metric, domainData.currentTotal, domainData.unit);
    }

    // 6. Build Insights & Recommendations
    const insights: InsightItem[] = [];
    const recommendations: CopilotRecommendation[] = [];

    if (metricResult.growthPercent !== undefined) {
      const isPos = metricResult.growthPercent >= 0;
      insights.push({
        id: 'ins-1',
        title: `${intent.metric} ${isPos ? 'Meningkat' : 'Menurun'} ${Math.abs(metricResult.growthPercent)}%`,
        summary: `Performa ${intent.metric.toLowerCase()} mencapai ${metricResult.formattedCurrent} pada periode ${domainData.periodLabel} (${isPos ? '+' : ''}${metricResult.growthPercent}% dibanding periode sebelumnya).`,
        impact: isPos ? 'POSITIVE' : 'NEGATIVE',
        magnitude: `${isPos ? '+' : ''}${metricResult.growthPercent}%`,
        metric: intent.metric,
        details: domainData.breakdowns?.map((b: any) => `${b.name}: ${CalculationEngine.formatValue(b.val, domainData.unit)} (${b.status})`)
      });
    }

    if (domainData.breakdowns && domainData.breakdowns.length > 0) {
      const topBreakdown = domainData.breakdowns[0];
      insights.push({
        id: 'ins-2',
        title: `Penyumbang Terbesar: ${topBreakdown.name}`,
        summary: `${topBreakdown.name} berkontribusi ${CalculationEngine.formatValue(topBreakdown.val, domainData.unit)} dengan status [${topBreakdown.status}].`,
        impact: 'POSITIVE',
        magnitude: 'Kontributor Utama',
        metric: intent.metric
      });
    }

    // Recommendations
    if (industry === 'MINING') {
      recommendations.push({
        id: 'rec-1',
        title: 'Evaluasi Efisiensi Fleet & Haul Road A',
        actionText: 'Lakukan perataan permukaan jalan angkut (Haul Road A) untuk menekan konsumsi solar dan kerusakan ban DT.',
        priority: 'HIGH',
        impactDescription: 'Dapat menghemat hingga 8.000 Liter solar per bulan.',
        targetPage: '/admin/projects',
        ctaText: 'Lihat Detail Armada'
      });
    } else if (industry === 'HOSPITAL') {
      recommendations.push({
        id: 'rec-1',
        title: 'Penambahan Meja Verifikasi Poli Penyakit Dalam',
        actionText: 'Aktifkan 1 loket pendaftaran paralel khusus jam sibuk (08:00–10:00).',
        priority: 'HIGH',
        impactDescription: 'Memangkas waktu tunggu rata-rata dari 48 menit menjadi < 25 menit.',
        targetPage: '/portal/tickets',
        ctaText: 'Lihat Antrean SIMRS'
      });
    } else {
      recommendations.push({
        id: 'rec-1',
        title: 'Optimasi Stok Produk dengan Pertumbuhan Tinggi',
        actionText: 'Pertahankan kuota stok Produk A dan evaluasi margin produk dengan pertumbuhan terendah.',
        priority: 'MEDIUM',
        impactDescription: 'Mengamankan kontinuitas omset dan kepuasan pelanggan.',
        targetPage: '/admin/invoices',
        ctaText: 'Kelola Inventory'
      });
    }

    // 7. Natural Language Summary & Explanation via AI Gemini or Fallback
    let summaryText = '';
    let calculationExplanation = '';

    const ai = getGeminiClient();
    if (ai) {
      try {
        const prompt = `
Anda adalah Enterprise AI Business Copilot untuk SMART-AI.ID (Industri: ${industry}).
Jawab pertanyaan bisnis user berikut secara sangat profesional, lugas, presisi, dan berbasis data aktual berikut:

Pertanyaan User: "${question}"
Data Metrik:
- Total Saat Ini: ${metricResult.formattedCurrent}
- Total Periode Lalu: ${metricResult.formattedPrevious || 'N/A'}
- Perubahan Growth: ${metricResult.growthPercent !== undefined ? metricResult.growthPercent + '%' : 'N/A'}
- Target Achievement: ${metricResult.achievementPercent !== undefined ? metricResult.achievementPercent + '%' : 'N/A'}
- Breakdown Terkait: ${JSON.stringify(domainData.breakdowns || [])}

Instruksi:
1. Berikan ringkasan analisis bisnis dalam 2-3 paragraf singkat dan scannable.
2. DILARANG MENGARANG ANGKA FIKTIF. Semua angka harus persis sesuai data di atas.
3. Sebutkan faktor penyumbang utama dan berikan rekomendasi operasional.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });

        summaryText = response.text || '';
      } catch (err) {
        console.warn('Gemini API call warning in Copilot, using deterministic summary fallback:', err);
      }
    }

    if (!summaryText) {
      summaryText = `${intent.metric} pada periode ${domainData.periodLabel} mencapai ${metricResult.formattedCurrent}. ${
        metricResult.growthPercent !== undefined
          ? `Terjadi perubahan sebesar ${metricResult.growthPercent >= 0 ? '+' : ''}${metricResult.growthPercent}% dibanding periode sebelumnya (${metricResult.formattedPrevious}).`
          : ''
      } Performa ini didorong oleh kontribusi utama ${domainData.breakdowns?.[0]?.name || 'komponen utama'}.`;
    }

    // Calculation Explainability Formula Text
    if (metricResult.growthPercent !== undefined) {
      calculationExplanation = `Rumus Formulasi Growth: ((Nilai Saat Ini [${metricResult.currentTotal}] - Nilai Sebelumnya [${metricResult.previousTotal}]) / Nilai Sebelumnya [${metricResult.previousTotal}]) x 100 = ${metricResult.growthPercent}%. Sumber Data: ${domainData.dataSourceName}. Mode Akses: READ-ONLY.`;
    } else {
      calculationExplanation = `Rumus Aggregasi: SUM(${intent.metric}) dari tabel ${domainData.dataSourceName}. Mode Akses: READ-ONLY.`;
    }

    // 8. Follow up questions
    const followUpQuestions = [
      `Detail breakdown ${intent.metric.toLowerCase()} per cabang/unit?`,
      `Prediksi ${intent.metric.toLowerCase()} bulan depan?`,
      `Berikan rekomendasi tindakan operasional lanjutan.`
    ];

    const confidence: ConfidenceLevel = 'HIGH';

    // 9. Audit Logging
    CopilotAuditService.logAudit({
      userName: `User (${userRole})`,
      userRole,
      industry,
      question,
      intentMode: intent.mode,
      metricsQueried: [intent.metric],
      dataSource: domainData.dataSourceName,
      executionTimeMs: Date.now() - startTime,
      confidence
    });

    return {
      id: `cop-ans-${Date.now()}`,
      question,
      intent,
      summaryText,
      metricResult,
      insights,
      alerts,
      recommendations,
      forecast,
      chartType: 'BAR',
      chartData: metricResult.dataPoints,
      dataSourceName: domainData.dataSourceName,
      periodLabel: domainData.periodLabel,
      lastUpdated: domainData.lastUpdated,
      confidence,
      dataQualityNotice: 'Analisis berbasis data realtime terintegrasi. Semua nilai numerik dihitung secara deterministik.',
      calculationExplanation,
      followUpQuestions,
      roleAllowed: true,
      timestamp: new Date().toLocaleTimeString('id-ID')
    };
  }
}
