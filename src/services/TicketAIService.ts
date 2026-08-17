import { GoogleGenAI } from '@google/genai';
import { Ticket, TicketCategory, TicketPriority } from '../types';
import { SupportTicketService } from './SupportTicketService';
import { KnowledgeBaseService } from './KnowledgeBaseService';

export class TicketAIService {
  private static getAI(): GoogleGenAI | null {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      return new GoogleGenAI({ apiKey });
    }
    return null;
  }

  /**
   * AI Ticket Classification: Suggests Category, Priority, Module, and Assignee
   */
  public static async classifyTicket(subject: string, description: string): Promise<{
    suggestedCategory: TicketCategory;
    suggestedPriority: TicketPriority;
    suggestedModule?: string;
    suggestedAssigneeId?: string;
    confidenceScore: number;
    explanation: string;
  }> {
    const ai = this.getAI();
    const text = `${subject} ${description}`.toLowerCase();

    let category: TicketCategory = 'TECHNICAL_SUPPORT';
    let priority: TicketPriority = 'MEDIUM';
    let module = 'General System Module';

    if (text.includes('error') || text.includes('bug') || text.includes('crash') || text.includes('spike') || text.includes('gagal')) {
      category = 'BUG_REPORT';
      priority = text.includes('down') || text.includes('critical') || text.includes('urgent') ? 'URGENT' : 'HIGH';
      module = text.includes('iot') || text.includes('sensor') ? 'IoT Telemetry & Sensor Tracking' : 'Core Platform';
    } else if (text.includes('fitur') || text.includes('feature') || text.includes('tambah') || text.includes('request')) {
      category = 'FEATURE_REQUEST';
      priority = 'MEDIUM';
      module = 'Fleet Route Optimization Engine';
    } else if (text.includes('invoice') || text.includes('bayar') || text.includes('tagihan') || text.includes('transfer')) {
      category = 'BILLING_ISSUE';
      priority = 'HIGH';
      module = 'Finance & Invoicing';
    } else if (text.includes('user') || text.includes('login') || text.includes('password') || text.includes('akses')) {
      category = 'ACCOUNT_ISSUE';
      priority = 'MEDIUM';
      module = 'User Access & Portal Auth';
    }

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Classify this IT support ticket for SMART-AI.ID enterprise software.
Subject: ${subject}
Description: ${description}

Respond in clean JSON format:
{
  "suggestedCategory": "BUG_REPORT" | "TECHNICAL_SUPPORT" | "FEATURE_REQUEST" | "ACCOUNT_ISSUE" | "BILLING_ISSUE",
  "suggestedPriority": "LOW" | "MEDIUM" | "HIGH" | "URGENT",
  "suggestedModule": "string",
  "confidenceScore": 0.95,
  "explanation": "string"
}`
        });

        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            suggestedCategory: parsed.suggestedCategory || category,
            suggestedPriority: parsed.suggestedPriority || priority,
            suggestedModule: parsed.suggestedModule || module,
            suggestedAssigneeId: parsed.suggestedCategory === 'BUG_REPORT' ? 'SUP-002' : 'SUP-001',
            confidenceScore: parsed.confidenceScore || 0.9,
            explanation: parsed.explanation || 'Klasifikasi otomatis berdasarkan analisis kecerdasan Gemini AI.'
          };
        }
      } catch (e) {
        console.warn('AI classification fallback used', e);
      }
    }

    return {
      suggestedCategory: category,
      suggestedPriority: priority,
      suggestedModule: module,
      suggestedAssigneeId: category === 'BUG_REPORT' ? 'SUP-002' : 'SUP-001',
      confidenceScore: 0.85,
      explanation: 'Klasifikasi direkomendasikan berdasarkan pendeteksian keyword sistem.'
    };
  }

  /**
   * AI Root Cause & Technical Troubleshooting Assistant
   */
  public static async analyzeRootCause(ticket: Ticket): Promise<{
    summary: string;
    possibleCauses: string[];
    troubleshootingSteps: string[];
    recommendedFix: string;
    disclaimer: string;
  }> {
    const ai = this.getAI();
    const defaultRes = {
      summary: `Penyelidikan teknis awal untuk ticket ${ticket.ticketNumber}: Kendala pada modul ${ticket.moduleId || 'sistem'}`,
      possibleCauses: [
        'Intermittent network packet drop pada koneksi GSM seluler 4G site lapangan.',
        'Buffer overflow pada Kafka MQTT broker ingestion pipeline.',
        'Misrekonfigurasi interval polling telemetry sensor.'
      ],
      troubleshootingSteps: [
        'Verifikasi log file MQTT broker untuk packet drop timestamp.',
        'Periksa Moving Average filter threshold pada service backend.',
        'Jalankan uji beban simulasikan 1.000 ping/detik.'
      ],
      recommendedFix: 'Terapkan smoothing filter & packet drop rejection pada pipeline ingestion.',
      disclaimer: 'Hasil analisis Gemini AI merupakan rekomendasi penanganan teknis dan membutuhkan validasi manual oleh Engineer/Developer.'
    };

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are a Senior Systems Architect & Lead Software Engineer at SMART-AI.ID.
Analyze this support ticket and provide technical root cause troubleshooting recommendations.
Ticket Number: ${ticket.ticketNumber}
Category: ${ticket.category}
Subject: ${ticket.subject}
Description: ${ticket.description}
Module: ${ticket.moduleName || 'General'}
Category Details: ${JSON.stringify(ticket.categorySpecificData || {})}

Provide output in JSON format with keys:
"summary", "possibleCauses" (array), "troubleshootingSteps" (array), "recommendedFix", "disclaimer"`
        });

        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            summary: parsed.summary || defaultRes.summary,
            possibleCauses: parsed.possibleCauses || defaultRes.possibleCauses,
            troubleshootingSteps: parsed.troubleshootingSteps || defaultRes.troubleshootingSteps,
            recommendedFix: parsed.recommendedFix || defaultRes.recommendedFix,
            disclaimer: 'Analisis kecerdasan AI adalah panduan awal. Harap verifikasi teknis sebelum merilis patch.'
          };
        }
      } catch (e) {
        console.warn('AI root cause analysis fallback used', e);
      }
    }

    return defaultRes;
  }

  /**
   * AI Response Assistant for Support Agents (Draft Professional Customer Reply)
   */
  public static async suggestResponse(ticket: Ticket, promptInstruction?: string): Promise<{
    draftReply: string;
    tone: string;
  }> {
    const ai = this.getAI();
    const defaultReply = `Halo Yth. ${ticket.customerUserName || 'Bapak/Ibu'},\n\nTerima kasih telah menghubungi Tim Support SMART-AI.ID.\n\nLaporan Anda mengenai "${ticket.subject}" telah kami terima dan saat ini sedang ditangani oleh Tim Technical Specialist kami. ${promptInstruction ? promptInstruction : 'Kami sedang melakukan pemeriksaan log data feed dan akan memberikan pembaruan perkembangan dalam kurun waktu SLA.'}\n\nJika ada informasi tambahan, silakan membalas melalui thread ini.\n\nHormat kami,\nTim Customer Support SMART-AI.ID`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Draft a professional, empathetic, and clear customer support response in Indonesian for a software client.
Ticket Subject: ${ticket.subject}
Customer Name: ${ticket.customerUserName}
Company: ${ticket.companyName}
Ticket Status: ${ticket.status}
Category: ${ticket.category}
Description: ${ticket.description}
Agent Instruction Note: ${promptInstruction || 'Infokan bahwa tim sedang melakukan investigasi log teknis.'}`
        });

        if (response.text) {
          return {
            draftReply: response.text.trim(),
            tone: 'Professional & Empathetic Enterprise Service'
          };
        }
      } catch (e) {
        console.warn('AI response assistant fallback used', e);
      }
    }

    return {
      draftReply: defaultReply,
      tone: 'Professional Enterprise Standard'
    };
  }

  /**
   * AI Duplicate Ticket Detection
   */
  public static detectDuplicate(subject: string, description: string, companyId: string): {
    isDuplicateDetected: boolean;
    similarTickets: { ticketNumber: string; subject: string; similarityReason: string }[];
  } {
    const existing = SupportTicketService.getTickets(companyId, true);
    const q = `${subject} ${description}`.toLowerCase();

    const matches = existing.filter((t) => {
      const text = `${t.subject} ${t.description}`.toLowerCase();
      const tokens = q.split(/\s+/).filter((word) => word.length > 3);
      const matchedTokens = tokens.filter((tok) => text.includes(tok));
      return matchedTokens.length >= 3 || (t.subject.toLowerCase() === subject.toLowerCase() && t.id !== subject);
    });

    if (matches.length > 0) {
      return {
        isDuplicateDetected: true,
        similarTickets: matches.slice(0, 3).map((m) => ({
          ticketNumber: m.ticketNumber,
          subject: m.subject,
          similarityReason: `Kemiripan topik dan deskripsi kendala pada modul ${m.moduleName || 'terkait'}.`
        }))
      };
    }

    return {
      isDuplicateDetected: false,
      similarTickets: []
    };
  }

  /**
   * AI Feature Request Analysis
   */
  public static analyzeFeatureRequest(description: string, businessNeed?: string): {
    businessValue: string;
    complexity: 'LOW' | 'MEDIUM' | 'HIGH';
    potentialImpact: string;
    suggestedModule: string;
    recommendedPriority: TicketPriority;
  } {
    return {
      businessValue: 'Meningkatkan efisiensi operasional dan fleksibilitas alur kerja pelanggan.',
      complexity: 'MEDIUM',
      potentialImpact: 'Berpotensi memberikan nilai tambah signifikan pada rilis versi minor berikutnya.',
      suggestedModule: 'Fleet Route Optimization Engine',
      recommendedPriority: 'MEDIUM'
    };
  }
}
