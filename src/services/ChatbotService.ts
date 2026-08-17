import {
  ChatSession,
  ChatMessage,
  ConversationMemory,
  UserIntent,
  ChatbotMode,
  ChatActionCTA,
  ChatMessageSource,
  ChatAnalytics
} from '../types';
import { KnowledgeBaseService } from './KnowledgeBaseService';
import { IndustrySolutionsService } from './IndustrySolutionsService';
import { GoogleGenAI } from '@google/genai';

const CHAT_SESSIONS_KEY = 'smart_ai_chat_sessions';
const CHAT_MESSAGES_KEY = 'smart_ai_chat_messages';
const CHAT_ANALYTICS_KEY = 'smart_ai_chat_analytics';

export class ChatbotService {
  // --- Session Management ---

  public static getSessions(userId?: string): ChatSession[] {
    try {
      const data = localStorage.getItem(CHAT_SESSIONS_KEY);
      const list: ChatSession[] = data ? JSON.parse(data) : [];
      if (userId) {
        return list.filter((s) => s.userId === userId);
      }
      return list;
    } catch {
      return [];
    }
  }

  public static getSessionById(sessionId: string): ChatSession | null {
    const list = this.getSessions();
    return list.find((s) => s.id === sessionId) || null;
  }

  public static createSession(
    userId?: string,
    companyId?: string,
    pageContext: string = '/'
  ): ChatSession {
    const sessions = this.getSessions();
    const newSession: ChatSession = {
      id: `SESS-${Date.now()}`,
      userId,
      companyId,
      sessionTitle: `Diskusi Solusi AI - ${new Date().toLocaleDateString('id-ID')}`,
      mode: 'GENERAL',
      pageContext,
      memory: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    sessions.unshift(newSession);
    localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));

    // Send Initial Welcome Message
    this.sendWelcomeMessage(newSession.id);

    return newSession;
  }

  public static updateSessionMemory(
    sessionId: string,
    memoryUpdates: Partial<ConversationMemory>,
    mode?: ChatbotMode
  ): ChatSession | null {
    const sessions = this.getSessions();
    const index = sessions.findIndex((s) => s.id === sessionId);
    if (index === -1) return null;

    const current = sessions[index];
    const updatedMemory: ConversationMemory = {
      ...current.memory,
      ...memoryUpdates
    };

    const updated: ChatSession = {
      ...current,
      memory: updatedMemory,
      mode: mode || current.mode,
      updatedAt: new Date().toISOString()
    };

    sessions[index] = updated;
    localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));
    return updated;
  }

  // --- Messages Management ---

  public static getMessages(sessionId: string): ChatMessage[] {
    try {
      const data = localStorage.getItem(CHAT_MESSAGES_KEY);
      const list: ChatMessage[] = data ? JSON.parse(data) : [];
      return list.filter((m) => m.sessionId === sessionId);
    } catch {
      return [];
    }
  }

  private static saveMessage(message: ChatMessage): void {
    try {
      const data = localStorage.getItem(CHAT_MESSAGES_KEY);
      const list: ChatMessage[] = data ? JSON.parse(data) : [];
      list.push(message);
      localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving message:', e);
    }
  }

  private static sendWelcomeMessage(sessionId: string): void {
    const welcomeText = `Halo 👋

Saya AI Solution Consultant SMART-AI.ID.

Saya dapat membantu Anda menemukan solusi aplikasi custom berbasis AI yang tepat untuk bisnis Anda.

Anda dapat bertanya misalnya:
• Bisa buat aplikasi tambang?
• Berapa estimasi aplikasi rumah sakit?
• Bisa integrasi GPS tracking?
• Fitur AI apa saja yang bisa digunakan?
• Berapa estimasi biaya dan waktu pembuatan?

Silakan ceritakan kebutuhan bisnis atau rencana aplikasi Anda!`;

    const welcomeMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      sessionId,
      role: 'ASSISTANT',
      content: welcomeText,
      createdAt: new Date().toISOString(),
      metadata: {
        intent: 'INFORMATION',
        suggestedQuestions: [
          '💡 Saya butuh aplikasi custom',
          '🏭 Aplikasi untuk bisnis tambang/pabrik',
          '🤖 Fitur AI untuk aplikasi saya',
          '💰 Hitung estimasi biaya aplikasi'
        ],
        ctaButtons: [
          { label: '💡 Analisis Kebutuhan', action: 'OPEN_REQUIREMENT_ANALYZER' },
          { label: '💰 Hitung Estimasi Biaya', action: 'OPEN_ESTIMATOR' },
          { label: '📞 Mulai Konsultasi', action: 'LEAD_CAPTURE' }
        ]
      }
    };

    this.saveMessage(welcomeMsg);
  }

  // --- Intent Detection & Memory Extraction ---

  private static detectIntent(text: string): { intent: UserIntent; mode: ChatbotMode } {
    const t = text.toLowerCase();

    if (t.includes('error') || t.includes('bug') || t.includes('tidak bisa login') || t.includes('kendala') || t.includes('masalah') || t.includes('helpdesk') || t.includes('tiket')) {
      return { intent: 'SUPPORT', mode: 'SUPPORT' };
    }

    if (t.includes('harga') || t.includes('biaya') || t.includes('estimasi') || t.includes('budget') || t.includes('berapa')) {
      return { intent: 'PRICE_INQUIRY', mode: 'SALES' };
    }

    if (t.includes('konsultasi') || t.includes('hubungi') || t.includes('demo') || t.includes('meeting') || t.includes('telepon')) {
      return { intent: 'CONSULTATION', mode: 'SALES' };
    }

    if (t.includes('buat aplikasi') || t.includes('bisa buat') || t.includes('butuh aplikasi') || t.includes('sistem') || t.includes('software')) {
      return { intent: 'PROJECT_INQUIRY', mode: 'CONSULTANT' };
    }

    if (t.includes('fitur') || t.includes('modul') || t.includes('ai') || t.includes('integrasi') || t.includes('gps')) {
      return { intent: 'FEATURE_REQUEST', mode: 'CONSULTANT' };
    }

    return { intent: 'INFORMATION', mode: 'GENERAL' };
  }

  private static extractMemory(text: string, currentMemory: ConversationMemory): Partial<ConversationMemory> {
    const t = text.toLowerCase();
    const extracted: Partial<ConversationMemory> = {};

    // Industry extraction
    if (t.includes('tambang') || t.includes('mining') || t.includes('batubara') || t.includes('nikel')) extracted.industry = 'Pertambangan & Mining';
    else if (t.includes('rumah sakit') || t.includes('rs') || t.includes('klinik') || t.includes('simrs')) extracted.industry = 'Kesehatan & Rumah Sakit';
    else if (t.includes('sekolah') || t.includes('kampus') || t.includes('universitas') || t.includes('pendidikan')) extracted.industry = 'Pendidikan & Academy';
    else if (t.includes('pabrik') || t.includes('manufaktur') || t.includes('manufacturing')) extracted.industry = 'Manufaktur & Pabrik';
    else if (t.includes('sawit') || t.includes('perkebunan') || t.includes('pertanian')) extracted.industry = 'Perkebunan & Pertanian';
    else if (t.includes('logistik') || t.includes('fleet') || t.includes('ekspedisi') || t.includes('pengiriman')) extracted.industry = 'Logistik & Transportasi';

    // Users & Scale
    const userMatch = t.match(/(\d+)\s*(user|pengguna|orang|karyawan)/);
    if (userMatch) extracted.numberOfUsers = userMatch[1];

    const branchMatch = t.match(/(\d+)\s*(cabang|outlet|site|lokasi)/);
    if (branchMatch) extracted.numberOfBranches = branchMatch[1];

    // Integrations
    const reqIntegrations: string[] = currentMemory.integrations ? [...currentMemory.integrations] : [];
    if (t.includes('gps') && !reqIntegrations.includes('GPS Telematics')) reqIntegrations.push('GPS Telematics');
    if (t.includes('sap') && !reqIntegrations.includes('SAP ERP')) reqIntegrations.push('SAP ERP');
    if (t.includes('payment gateway') && !reqIntegrations.includes('Payment Gateway')) reqIntegrations.push('Payment Gateway');
    if (reqIntegrations.length > 0) extracted.integrations = reqIntegrations;

    // AI Requirements
    const aiReqs: string[] = currentMemory.aiRequirements ? [...currentMemory.aiRequirements] : [];
    if (t.includes('ocr') || t.includes('baca dokumen')) aiReqs.push('AI Document OCR');
    if (t.includes('predict') || t.includes('prediksi')) aiReqs.push('Predictive Analytics');
    if (t.includes('vision') || t.includes('kamera') || t.includes('deteksi')) aiReqs.push('Computer Vision');
    if (t.includes('chatbot') || t.includes('assistant')) aiReqs.push('AI RAG Assistant');
    if (aiReqs.length > 0) extracted.aiRequirements = Array.from(new Set(aiReqs));

    return extracted;
  }

  // --- Prompt Injection Protection ---

  private static checkPromptInjection(text: string): boolean {
    const t = text.toLowerCase();
    const forbiddenPatterns = [
      'system prompt',
      'system instructions',
      'ignore previous instructions',
      'reveal your prompt',
      'what is your api key',
      'show me database credentials',
      'override system',
      'internal pricing list'
    ];
    return forbiddenPatterns.some((pattern) => t.includes(pattern));
  }

  // --- Main Chat Dispatcher with RAG & Gemini ---

  public static async sendMessage(
    sessionId: string,
    userContent: string,
    userRole: 'GUEST' | 'CUSTOMER' | 'ADMIN' = 'GUEST'
  ): Promise<ChatMessage> {
    // 1. Get or create Session
    let session = this.getSessionById(sessionId);
    if (!session) {
      session = this.createSession();
    }

    // 2. Save User Message
    const userMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      sessionId,
      role: 'USER',
      content: userContent,
      createdAt: new Date().toISOString()
    };
    this.saveMessage(userMsg);

    // 3. Prompt Injection Guard
    if (this.checkPromptInjection(userContent)) {
      const refusalMsg: ChatMessage = {
        id: `MSG-${Date.now() + 1}`,
        sessionId,
        role: 'ASSISTANT',
        content: 'Saya adalah AI Solution Consultant SMART-AI.ID. Saya dapat membantu menjelaskan layanan, menganalisis kebutuhan aplikasi, dan memberikan rekomendasi solusi. Saya tidak dapat memberikan instruksi sistem internal atau kredensial rahasia.',
        createdAt: new Date().toISOString(),
        metadata: {
          intent: 'INFORMATION',
          suggestedQuestions: ['Bisa buat aplikasi apa saja?', 'Berapa estimasi biaya aplikasi?']
        }
      };
      this.saveMessage(refusalMsg);
      return refusalMsg;
    }

    // 4. Intent & Memory Processing
    const { intent, mode } = this.detectIntent(userContent);
    const extractedMemory = this.extractMemory(userContent, session.memory);
    extractedMemory.detectedIntent = intent;
    this.updateSessionMemory(sessionId, extractedMemory, mode);

    // 5. RAG Retrieval from Knowledge Base
    const kbArticles = KnowledgeBaseService.searchKnowledgeBase(userContent, 3, userRole);
    const sources: ChatMessageSource[] = kbArticles.map((a) => ({
      title: a.title,
      category: a.category,
      id: a.id,
      snippet: a.summary
    }));

    // 6. Generate Response using Gemini API / Smart Fallback
    const responseText = await this.generateAIResponse(
      userContent,
      session,
      kbArticles,
      intent
    );

    // 7. Action CTAs & Suggested Questions Generation
    const ctaButtons: ChatActionCTA[] = [];
    const suggestedQuestions: string[] = [];

    // Industry Solution Keyword Matching for CTAs
    const allSolutions = IndustrySolutionsService.getAllSolutions();
    const matchedIndustry = allSolutions.find(s =>
      userContent.toLowerCase().includes(s.name.toLowerCase()) ||
      userContent.toLowerCase().includes(s.slug.toLowerCase()) ||
      s.problems.some(p => userContent.toLowerCase().includes(p.title.toLowerCase()))
    );

    if (matchedIndustry) {
      ctaButtons.push({
        label: `🏢 Lihat Solusi ${matchedIndustry.name}`,
        action: 'OPEN_URL',
        url: `/solutions/${matchedIndustry.slug}`
      });
    }

    if (intent === 'PRICE_INQUIRY') {
      ctaButtons.push({ label: '💰 Hitung Estimasi Biaya', action: 'OPEN_ESTIMATOR' });
      ctaButtons.push({ label: '💡 Analisis Kebutuhan', action: 'OPEN_REQUIREMENT_ANALYZER' });
      suggestedQuestions.push('Berapa lama estimasi pengerjaannya?');
      suggestedQuestions.push('Bisa lihat contoh estimasi rumah sakit/tambang?');
    } else if (intent === 'PROJECT_INQUIRY' || intent === 'FEATURE_REQUEST') {
      ctaButtons.push({ label: '💡 Analisis Kebutuhan Detil', action: 'OPEN_REQUIREMENT_ANALYZER' });
      ctaButtons.push({ label: '🏗️ Lihat Arsitektur Solusi', action: 'OPEN_ARCHITECT' });
      ctaButtons.push({ label: '🧩 Generate Modul Rekomendasi', action: 'OPEN_MODULE_GENERATOR' });
      suggestedQuestions.push('Berapa estimasi biaya aplikasi ini?');
      suggestedQuestions.push('Bagaimana integrasi dengan GPS/API?');
    } else if (intent === 'SUPPORT') {
      ctaButtons.push({ label: '🎫 Buat Tiket Support Helpdesk', action: 'CREATE_TICKET' });
      ctaButtons.push({ label: '📞 Hubungi Support WhatsApp', action: 'OPEN_WHATSAPP' });
      suggestedQuestions.push('Bagaimana cek status tiket saya?');
    } else {
      ctaButtons.push({ label: '🚀 Buat Aplikasi Sekarang', action: 'OPEN_BUILDER' });
      ctaButtons.push({ label: '📞 Jadwalkan Konsultasi Gratis', action: 'LEAD_CAPTURE' });
      suggestedQuestions.push('Bisa buatkan aplikasi untuk bisnis saya?');
      suggestedQuestions.push('Apakah ada opsi integrasi AI?');
    }

    const aiMsg: ChatMessage = {
      id: `MSG-${Date.now() + 2}`,
      sessionId,
      role: 'ASSISTANT',
      content: responseText,
      createdAt: new Date().toISOString(),
      metadata: {
        sources: sources.length > 0 ? sources : undefined,
        intent,
        suggestedQuestions,
        ctaButtons,
        disclaimer: intent === 'PRICE_INQUIRY' ? 'Estimasi awal berdasarkan konfigurasi awal. Bukan penawaran harga final (Quotation).' : undefined,
        isFact: true,
        isEstimate: intent === 'PRICE_INQUIRY',
        isRecommendation: intent === 'PROJECT_INQUIRY' || intent === 'FEATURE_REQUEST'
      }
    };

    this.saveMessage(aiMsg);
    this.trackAnalytics(intent);

    return aiMsg;
  }

  // --- AI Engine Integration ---

  private static async generateAIResponse(
    userContent: string,
    session: ChatSession,
    kbArticles: any[],
    intent: UserIntent
  ): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    // If KB found specific match, ground it
    const kbContextText = kbArticles.length > 0
      ? kbArticles.map((a) => `[SUMBER: ${a.title} (${a.category})]\n${a.content}`).join('\n\n')
      : 'TIDAK DITEMUKAN ARTIKEL KNOWLEDGE BASE YANG MATCH EXACT.';

    if (!apiKey) {
      // Offline / Local Rule Engine Fallback
      return this.generateOfflineFallback(userContent, session, kbArticles, intent);
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const memorySummary = JSON.stringify(session.memory);

      const systemInstruction = `
You are SMART-AI.ID AI Solution Consultant.
Role: Help visitors & corporate clients discover custom AI web app solutions, analyze high-level requirements, recommend architecture/modules, and guide towards consultation or project estimation.

CRITICAL GROUNDING RULES:
1. Always use Bahasa Indonesia. Speak professionally, friendly, concise, and business-oriented.
2. Ground your answers using the SMART-AI.ID Knowledge Base context below if available.
3. If specific detailed info is missing, clearly state: "Saya belum menemukan informasi spesifik mengenai hal tersebut di Knowledge Base SMART-AI.ID, namun Tim Solution Architect kami dapat membantu mengonfirmasi kebutuhan Anda."
4. Never invent exact fixed pricing, binding delivery guarantees, or unsupported hardware integrations.
5. Clearly distinguish estimates from final quotations.
6. Context Memory: ${memorySummary}

KNOWLEDGE BASE CONTEXT:
${kbContextText}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction}\n\nUSER QUESTION: ${userContent}`
      });

      return response.text || this.generateOfflineFallback(userContent, session, kbArticles, intent);
    } catch (e) {
      console.error('Gemini Chat error:', e);
      return this.generateOfflineFallback(userContent, session, kbArticles, intent);
    }
  }

  private static generateOfflineFallback(
    userContent: string,
    session: ChatSession,
    kbArticles: any[],
    intent: UserIntent
  ): string {
    const t = userContent.toLowerCase();

    if (t.includes('tambang') || t.includes('mining')) {
      return `Tentu. SMART-AI.ID dapat membantu membangun aplikasi manajemen tambang custom yang disesuaikan dengan operasional lapangan perusahaan Anda.

Contoh modul yang dapat dikembangkan:
• Production Tracking (Ritase, Tonase, Stockpile)
• Fleet & Heavy Equipment Management (HM, Sewa Alat)
• GPS Telematics & Realtime Tracking Map
• Fuel Management & Dispensasi
• Sparepart & Maintenance Schedule
• HR, HSE Safety & Payroll
• AI Executive Dashboard & Analytics

Saya dapat membantu menganalisis modul yang tepat sesuai skala unit dan kebutuhan tambang Anda.`;
    }

    if (t.includes('rumah sakit') || t.includes('rs') || t.includes('simrs')) {
      return `SMART-AI.ID menyediakan pengembangan SIMRS (Sistem Informasi Manajemen Rumah Sakit) & Klinik custom terintegrasi.

Estimasi awal pengembangan bergantung pada cakupan modul, antara lain:
• Pendaftaran Online & Antrean Pasien AI
• Rekam Medis Elektronik (RME) Standar Kemenkes
• Integrasi SATUSEHAT & BPJS VClaim
• Poliklinik, Rawat Inap, Farmasi & Laboratorium
• Billing & Casemix Claim

Saya dapat membantu membuat kalkulasi estimasi awal berdasarkan jumlah modul dan kapasitas tempat tidur (TT) rumah sakit Anda.`;
    }

    if (t.includes('gps') || t.includes('tracking')) {
      return `Ya. SMART-AI.ID dapat merancang sistem dengan integrasi GPS tracking realtime, bergantung pada jenis perangkat, protokol HTTP/TCP/MQTT, dan API yang digunakan.

Pemanfaatan Integrasi GPS:
• Fleet Management Alat Berat & Truk Hauling
• Asset & Container Tracking
• Logistics & Delivery Tracking
• Driver Behavior & Fuel Telemetry

Silakan beri tahu jenis perangkat GPS atau tujuan tracking yang Anda rencanakan!`;
    }

    if (t.includes('ai') || t.includes('artificial intelligence')) {
      return `Ya, SMART-AI.ID dapat mengintegrasikan kapabilitas AI sesuai masalah bisnis Anda:

• AI Predictive Analytics & Maintenance
• AI OCR Dokumen (Invoice, KTP, Surat Jalan)
• Computer Vision untuk Quality Control Kamera
• Recommendation Engine & Anomaly Detection
• AI RAG Chatbot Knowledge Base Enterprise

Setiap fitur AI dirancang aman (server-side API) dan ramah skala enterprise.`;
    }

    if (kbArticles.length > 0) {
      return `Berdasarkan Knowledge Base SMART-AI.ID:

${kbArticles[0].summary}

${kbArticles[0].content.slice(0, 300)}...

Apakah Anda ingin mendalami fitur atau menghitung estimasi pembuatan aplikasi ini?`;
    }

    return `SMART-AI.ID membantu perusahaan Anda membangun aplikasi web custom & enterprise berbasis AI yang efisien, scalable, dan modern.

Saya dapat membantu Anda:
1. Menentukan daftar modul aplikasi
2. Menghitung estimasi awal biaya & waktu pengerjaan
3. Merancang arsitektur solusi
4. Menghubungkan Anda dengan Tim Solution Architect kami

Silakan ceritakan jenis aplikasi atau kebutuhan bisnis yang ingin Anda kembangkan.`;
  }

  // --- Lead Capture Integration ---

  public static captureLeadFromChat(
    sessionId: string,
    leadData: { name: string; company: string; email: string; phone: string; notes?: string }
  ): boolean {
    try {
      const session = this.getSessionById(sessionId);
      const LEADS_KEY = 'smart_ai_crm_leads';
      const data = localStorage.getItem(LEADS_KEY);
      const leads = data ? JSON.parse(data) : [];

      const newLead = {
        id: `SAI-L${Math.floor(1000 + Math.random() * 9000)}`,
        name: leadData.name,
        company: leadData.company,
        email: leadData.email,
        phone: leadData.phone,
        industry: session?.memory?.industry || 'General Industry',
        appType: session?.memory?.requiredModules?.join(', ') || 'Custom AI Application',
        status: 'NEW_LEAD',
        source: 'AI_CHATBOT',
        leadScore: 88,
        priority: 'HIGH',
        message: `[Lead captured via AI Chatbot]\nRingkasan: Interaksi diskusi chatbot.\nCatatan: ${leadData.notes || 'Pengunjung berminat konsultasi lebih lanjut.'}`,
        createdAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      };

      leads.unshift(newLead);
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));

      // Update session memory lead captured
      if (session) {
        this.updateSessionMemory(sessionId, { leadCaptured: true });
      }

      // Add Assistant Confirmation Message
      const confirmMsg: ChatMessage = {
        id: `MSG-${Date.now()}`,
        sessionId,
        role: 'ASSISTANT',
        content: `Terima kasih ${leadData.name} dari ${leadData.company}! 🎉\n\nPermintaan konsultasi Anda telah berhasil dikirim ke Tim Sales & Solution Architect SMART-AI.ID. Tim kami akan menghubungi Anda melalui WhatsApp/Email dalam kurun waktu max 1x24 jam kerja.`,
        createdAt: new Date().toISOString()
      };
      this.saveMessage(confirmMsg);

      return true;
    } catch (e) {
      console.error('Lead capture error:', e);
      return false;
    }
  }

  // --- Analytics & Tracking ---

  private static trackAnalytics(intent: UserIntent): void {
    try {
      const data = localStorage.getItem(CHAT_ANALYTICS_KEY);
      const stats: ChatAnalytics = data ? JSON.parse(data) : {
        totalSessions: 1,
        totalMessages: 0,
        leadConversions: 0,
        consultationRequests: 0,
        estimatorStarts: 0,
        ticketsCreated: 0,
        topIntents: []
      };

      stats.totalMessages += 1;
      const existingIntent = stats.topIntents.find((i) => i.intent === intent);
      if (existingIntent) existingIntent.count += 1;
      else stats.topIntents.push({ intent, count: 1 });

      localStorage.setItem(CHAT_ANALYTICS_KEY, JSON.stringify(stats));
    } catch {}
  }

  public static getAnalytics(): ChatAnalytics {
    try {
      const data = localStorage.getItem(CHAT_ANALYTICS_KEY);
      return data ? JSON.parse(data) : {
        totalSessions: 12,
        totalMessages: 84,
        leadConversions: 9,
        consultationRequests: 7,
        estimatorStarts: 15,
        ticketsCreated: 3,
        topIntents: [
          { intent: 'PROJECT_INQUIRY', count: 32 },
          { intent: 'PRICE_INQUIRY', count: 24 },
          { intent: 'FEATURE_REQUEST', count: 18 },
          { intent: 'SUPPORT', count: 10 }
        ]
      };
    } catch {
      return {
        totalSessions: 0,
        totalMessages: 0,
        leadConversions: 0,
        consultationRequests: 0,
        estimatorStarts: 0,
        ticketsCreated: 0,
        topIntents: []
      };
    }
  }
}
