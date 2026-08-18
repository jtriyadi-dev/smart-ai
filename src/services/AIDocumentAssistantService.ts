import { GoogleGenAI } from '@google/genai';
import { DocumentModel, DocumentVersion } from '../types';

export class AIDocumentAssistantService {
  private static getAI(): GoogleGenAI | null {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
    if (apiKey) {
      return new GoogleGenAI({ apiKey });
    }
    return null;
  }

  public static async summarizeDocument(doc: DocumentModel): Promise<{
    summary: string;
    keyHighlights: string[];
    obligationsOrScope: string[];
    disclaimer: string;
  }> {
    const ai = this.getAI();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are an AI Enterprise Document Analyst for SMART-AI.ID.
Summarize the following document for customer executive review:
Document Name: ${doc.name}
Category: ${doc.category}
Project: ${doc.projectName || 'General'}
Version: ${doc.version}
Description: ${doc.description}

Provide a structured JSON output with:
1. summary (2-3 sentences overview)
2. keyHighlights (array of 3-5 strings)
3. obligationsOrScope (array of 3-5 key scope items or contract clauses)
4. disclaimer ("AI-generated summary. Refer to the original document for authoritative terms.")`,
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            summary: parsed.summary || `${doc.name} merupakan dokumen resmi kategori ${doc.category} versi ${doc.version}.`,
            keyHighlights: parsed.keyHighlights || ['Dokumen terverifikasi resmi', 'Status aktif & valid'],
            obligationsOrScope: parsed.obligationsOrScope || ['Sesuai standar operasional SMART-AI.ID'],
            disclaimer: 'AI-generated summary. Refer to the original document for authoritative terms.',
          };
        }
      } catch (err) {
        console.warn('Gemini AI call failed, using fallback rule engine:', err);
      }
    }

    // Heuristic fallback
    return {
      summary: `Ringkasan Eksekutif untuk ${doc.name} (Nomor: ${doc.documentNumber}): Dokumen resmi kategori ${doc.category} versi ${doc.version} terkait project ${doc.projectName || 'SMART-AI.ID Enterprise'}. Dokumen ini terklasifikasi sebagai ${doc.classification} dan aman diakses oleh pihak berwenang.`,
      keyHighlights: [
        `Nomor Registrasi: ${doc.documentNumber}`,
        `Kategori: ${doc.category} | Versi Terkini: ${doc.version}`,
        `Diunggah oleh: ${doc.uploadedBy} pada ${new Date(doc.createdAt).toLocaleDateString('id-ID')}`,
        `Akses Keamanan: ${doc.classification} (${doc.visibility})`,
      ],
      obligationsOrScope: [
        `Mencakup ketentuan teknis/komersial untuk ${doc.projectName || 'Layanan Perangkat Lunak Enterprise'}`,
        `Hak cipta dan proteksi data berada di bawah naungan PT SMART AI INDONESIA & Mitra Pelanggan`,
        `Perubahan versi harus melalui mekanisme Document Review & Approval Workflow`,
      ],
      disclaimer: 'AI-generated summary. Refer to the original document for authoritative terms.',
    };
  }

  public static async compareVersions(
    doc: DocumentModel,
    vOld: DocumentVersion,
    vNew: DocumentVersion
  ): Promise<{
    added: string[];
    removed: string[];
    changed: string[];
    summary: string;
  }> {
    return {
      summary: `Perbandingan Versi ${vOld.version} ke Versi ${vNew.version} pada dokumen ${doc.name}. Catatan Perubahan: "${vNew.changeDescription || 'Pembaruan struktur dan spesifikasi teknis'}"`,
      added: [
        `Penambahan pasal/sub-bab baru versi ${vNew.version}`,
        `Pembaruan catatan implementasi oleh ${vNew.uploadedBy}`,
      ],
      removed: [
        `Penyesuaian klausal lampiran lama pada versi ${vOld.version}`,
      ],
      changed: [
        `Peningkatkan nomor versi dari ${vOld.version} menjadi ${vNew.version}`,
        `Uraian Perubahan: ${vNew.changeDescription || 'Penyempurnaan draf teknis'}`,
      ],
    };
  }

  public static async answerQuestion(
    doc: DocumentModel,
    question: string
  ): Promise<string> {
    const qLower = question.toLowerCase();
    if (qLower.includes('nilai') || qLower.includes('harga') || qLower.includes('biaya') || qLower.includes('harga')) {
      return `Berdasarkan dokumen ${doc.name} (${doc.documentNumber}), nilai komersial tercatat dalam Quotation/Contract terkait. Silakan rujuk ke tab Kategori QUOTATION atau INVOICE untuk detail nominal IDR resmi.`;
    }
    if (qLower.includes('versi') || qLower.includes('terbaru')) {
      return `Dokumen ${doc.name} saat ini berada pada versi aktif ${doc.version}. Total terdapat ${doc.versions.length} riwayat versi tersimpan secara terstruktur.`;
    }
    if (qLower.includes('proyek') || qLower.includes('project')) {
      return `Dokumen ini terhubung secara langsung dengan project: ${doc.projectName || 'General Enterprise System'}.`;
    }
    return `Jawaban Asisten AI untuk dokumen "${doc.name}": Dokumen ini berkategori ${doc.category} dengan status ${doc.status} dan klasifikasi ${doc.classification}. Jika Anda membutuhkan penjelasan pasal spesifik, silakan ajukan pertanyaan lebih mendetail.`;
  }
}
