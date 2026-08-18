import { GoogleGenAI } from '@google/genai';
import { FullProjectRecord } from '../types';

export class AIProjectManagerService {
  private static getGenAIClient(): GoogleGenAI | null {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  /**
   * Generates a customer-safe, professional, non-technical project progress update
   */
  public static async generateCustomerSafeUpdate(
    project: FullProjectRecord,
    additionalPrompt?: string
  ): Promise<{ title: string; content: string }> {
    const ai = this.getGenAIClient();

    // Prepare safe summary of progress
    const activeTasks = (project.tasks || [])
      .filter((t) => t.visibility === 'CUSTOMER_VISIBLE' && t.status === 'DONE')
      .map((t) => t.name)
      .slice(0, 5);

    const upcomingTasks = (project.tasks || [])
      .filter((t) => t.visibility === 'CUSTOMER_VISIBLE' && t.status === 'IN_PROGRESS')
      .map((t) => t.name)
      .slice(0, 5);

    const promptText = `
You are the AI Project Manager for SMART-AI.ID, a premier software application development agency.
Generate a professional, transparent, friendly, non-technical weekly project progress update for the client "${project.customerName}".

Project Context:
- Project Name: ${project.projectName}
- Overall Progress: ${project.overallProgress}%
- Status: ${project.status}
- Health: ${project.health}
- Target Completion Date: ${project.targetDate}
- Recently Completed Items: ${activeTasks.join(', ') || 'Phase milestones on schedule'}
- Currently Working On: ${upcomingTasks.join(', ') || 'Next phase preparation'}
${additionalPrompt ? `Special Note to include: ${additionalPrompt}` : ''}

RULES:
1. NEVER include internal technical jargon, internal developer names, server passwords, source code files, or internal risk details.
2. Structure the response clearly with a Title and Bullet points for:
   - What was accomplished this week
   - Current focus and next milestones
   - Schedule confidence & next sync meeting
3. Language: Business Indonesian (Bahasa Indonesia) or English as appropriate (Use Bahasa Indonesia for Indonesian clients).
`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptText,
        });

        const text = response.text || '';
        const lines = text.trim().split('\n');
        const title = lines[0].replace(/^#+\s*/, '').replace(/\*\*/g, '') || `Project Update: ${project.projectName}`;
        const content = lines.slice(1).join('\n').trim();

        return { title, content };
      } catch (e) {
        console.warn('Gemini API call failed, using deterministic fallback:', e);
      }
    }

    // High quality fallback
    return {
      title: `Update Perkembangan Project: ${project.projectName} (${project.overallProgress}% Selesai)`,
      content: `Yth. Tim ${project.customerName},

Berikut adalah ringkasan perkembangan project software Anda per minggu ini:

1. Pencapaian & Task Selesai:
${activeTasks.map((t) => ` - ${t}`).join('\n') || ' - Penyelesaian milestone dan modul utama sesuai roadmap.'}

2. Ffokus Pengerjaan Saat Ini:
${upcomingTasks.map((t) => ` - ${t}`).join('\n') || ' - Pengujian integrasi API dan penyiapan lingkungan UAT.'}

3. Status & Target:
 - Progress Keseluruhan: ${project.overallProgress}% (${project.health.replace('_', ' ')})
 - Target Selesai: ${project.targetDate}

Tim SMART-AI.ID terus berkomitmen menjaga kualitas dan ketepatan waktu pengiriman. Silakan hubungi Project Manager Anda jika ada hal yang ingin didiskusikan.

Salam hangat,
Tim PM SMART-AI.ID`,
    };
  }

  /**
   * Generates internal AI risk analysis & recommendations for the PM team
   */
  public static async analyzeProjectRisks(project: FullProjectRecord): Promise<{
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    summary: string;
    recommendations: string[];
  }> {
    const ai = this.getGenAIClient();
    const overdueTasks = (project.tasks || []).filter(
      (t) => t.status !== 'DONE' && new Date(t.dueDate) < new Date()
    );
    const blockedTasks = (project.tasks || []).filter((t) => t.status === 'BLOCKED');

    if (ai) {
      try {
        const prompt = `Analyze project risks for "${project.projectName}". Progress: ${project.overallProgress}%, Status: ${project.status}, Health: ${project.health}. Overdue tasks count: ${overdueTasks.length}, Blocked tasks: ${blockedTasks.length}. Return JSON: { "riskLevel": "LOW"|"MEDIUM"|"HIGH", "summary": "...", "recommendations": ["...", "..."] }`;
        const res = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });

        if (res.text) {
          const json = JSON.parse(res.text);
          return json;
        }
      } catch (e) {
        console.warn('Risk analysis AI call failed:', e);
      }
    }

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (blockedTasks.length > 0 || overdueTasks.length > 2) riskLevel = 'HIGH';
    else if (overdueTasks.length > 0) riskLevel = 'MEDIUM';

    return {
      riskLevel,
      summary:
        riskLevel === 'HIGH'
          ? 'Perhatian: Terdapat task terhambat (blocked) atau melewati tenggat waktu yang membutuhkan intervensi PM.'
          : riskLevel === 'MEDIUM'
          ? 'Project berjalan dengan sedikit potensi keterlambatan pada beberapa task minor.'
          : 'Project berada dalam kondisi optimal, semua milestone dan task berjalan sesuai jadwal.',
      recommendations: [
        'Review task berprioritas HIGH dan URGENT setiap hari.',
        'Pastikan dependency antara task tidak mengunci progress developer lain.',
        'Lakukan alokasi resources tambahan jika terdapat task UAT yang tertunda.',
      ],
    };
  }
}
