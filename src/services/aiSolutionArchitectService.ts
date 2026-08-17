import { SolutionArchitectInput, SolutionArchitecture } from '../types';

const STORAGE_KEY_ARCHITECTURE = 'smart_ai_saved_solution_architecture';
const STORAGE_KEY_VERSIONS = 'smart_ai_architecture_versions';

export class AISolutionArchitectService {
  /**
   * Request AI Solution Architecture generation from backend API
   */
  static async analyzeArchitecture(
    input: SolutionArchitectInput
  ): Promise<{ success: boolean; data?: SolutionArchitecture; error?: string }> {
    try {
      this.trackEvent('architecture_generation_requested', {
        scale: input.scale,
        applicationType: input.applicationType,
        deploymentPreference: input.deploymentPreference,
        aiPreference: input.aiArchitecturePreference
      });

      const response = await fetch('/api/ai-solution-architecture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      const json = await response.json();

      if (response.ok && json.success && json.architecture) {
        const architecture = json.architecture as SolutionArchitecture;

        // Save to Local Storage & Version History
        this.saveArchitectureToStorage(architecture);
        this.saveVersion(architecture, 'Analisis Awal Senior Solution Architect');

        this.trackEvent('architecture_generation_completed', {
          pattern: architecture.architectureOverview?.pattern,
          componentCount: architecture.systemComponents?.length || 0
        });

        return { success: true, data: architecture };
      } else {
        this.trackEvent('architecture_generation_failed', { error: json.error });
        return {
          success: false,
          error: json.error || 'Gagal memproses rekomendasi arsitektur. Silakan periksa koneksi Anda.'
        };
      }
    } catch (err: any) {
      console.error('Error in analyzeArchitecture:', err);
      this.trackEvent('architecture_generation_failed', { error: err.message });
      return {
        success: false,
        error: 'Terjadi kesalahan jaringan saat menghubungi AI Solution Architect Server.'
      };
    }
  }

  /**
   * Save active solution architecture to Local Storage
   */
  static saveArchitectureToStorage(architecture: SolutionArchitecture): void {
    try {
      const payload = {
        savedAt: new Date().toISOString(),
        architecture
      };
      localStorage.setItem(STORAGE_KEY_ARCHITECTURE, JSON.stringify(payload));
      this.trackEvent('architecture_saved');
    } catch (e) {
      console.warn('Could not save architecture to localStorage:', e);
    }
  }

  /**
   * Retrieve active solution architecture from Local Storage
   */
  static getSavedArchitecture(): { savedAt: string; architecture: SolutionArchitecture } | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ARCHITECTURE);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  /**
   * Versioning Service for Architecture Document
   */
  static saveVersion(architecture: SolutionArchitecture, changeSummary: string): any[] {
    try {
      const existing = this.getVersions();
      const newVersionNum = existing.length + 1;

      const archWithVer = {
        ...architecture,
        version: newVersionNum
      };

      const versionItem = {
        version: newVersionNum,
        date: new Date().toISOString(),
        summary: changeSummary,
        data: archWithVer
      };

      const updated = [versionItem, ...existing];
      localStorage.setItem(STORAGE_KEY_VERSIONS, JSON.stringify(updated.slice(0, 10)));
      return updated;
    } catch (e) {
      console.warn('Could not save architecture version:', e);
      return [];
    }
  }

  static getVersions(): Array<{ version: number; date: string; summary: string; data: SolutionArchitecture }> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_VERSIONS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  /**
   * Export Architecture Data as JSON
   */
  static exportJSON(architecture: SolutionArchitecture): void {
    const filename = `Technical_Architecture_${(architecture.summary || 'SMART_AI_Architecture')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase()}.json`;

    const blob = new Blob([JSON.stringify(architecture, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.trackEvent('architecture_exported', { format: 'json' });
  }

  /**
   * Export Printable Architecture Technical Specification Sheet (PDF Window)
   */
  static exportPDF(architecture: SolutionArchitecture): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Mohon izinkan popup browser untuk mengunduh / mencetak dokumen Arsitektur.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Technical Solution Architecture Specification - SMART-AI.ID</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 40px; line-height: 1.6; font-size: 13px; }
          .header { border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
          .title { font-size: 22px; font-weight: bold; color: #0f172a; margin: 0; }
          .subtitle { font-size: 13px; color: #64748b; margin-top: 5px; }
          .badge { background-color: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 12px; font-weight: bold; font-size: 11px; }
          .section { margin-bottom: 25px; page-break-inside: avoid; }
          .section-title { font-size: 15px; font-weight: bold; color: #1d4ed8; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: bold; color: #334155; }
          .tech-badge { background: #eff6ff; color: #1d4ed8; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
          .disclaimer { font-size: 11px; color: #94a3b8; font-style: italic; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 30px; }
          @media print {
            body { padding: 20px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">TECHNICAL SOLUTION ARCHITECTURE SPECIFICATION</h1>
            <div class="subtitle">SMART-AI.ID Enterprise Solution Architecture Platform</div>
            <div class="subtitle">Pattern: ${architecture.architectureOverview?.pattern} | Versi: ${architecture.version || 1}</div>
          </div>
          <div>
            <span class="badge">AI SOLUTION ARCHITECT</span>
          </div>
        </div>

        <div style="margin-bottom: 20px; font-size: 12px; color: #1e3a8a; background: #eff6ff; padding: 12px; border-radius: 8px; border-left: 4px solid #2563eb;">
          <strong>Ringkasan Arsitektur:</strong> ${architecture.summary || architecture.architectureOverview?.reason}
        </div>

        <div class="section">
          <div class="section-title">1. System Architecture Pattern</div>
          <p><strong>Pattern Target:</strong> ${architecture.architectureOverview?.pattern}</p>
          <p><strong>Rasionalisasi:</strong> ${architecture.architectureOverview?.reason}</p>
          <div style="display: flex; gap: 20px; margin-top: 10px;">
            <div style="flex: 1;">
              <strong>Keunggulan Utam:</strong>
              <ul>
                ${architecture.architectureOverview?.advantages.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
            <div style="flex: 1;">
              <strong>Trade-Offs:</strong>
              <ul>
                ${architecture.architectureOverview?.tradeOffs.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">2. System Components List</div>
          <table>
            <thead>
              <tr>
                <th style="width: 80px;">ID</th>
                <th style="width: 140px;">Komponen</th>
                <th>Tujuan & Deskripsi</th>
                <th style="width: 150px;">Teknologi</th>
                <th style="width: 100px;">Kategori</th>
              </tr>
            </thead>
            <tbody>
              ${architecture.systemComponents.map(c => `
                <tr>
                  <td><strong>${c.id}</strong></td>
                  <td><strong>${c.name}</strong></td>
                  <td>${c.purpose}</td>
                  <td><span class="tech-badge">${c.technology}</span></td>
                  <td>${c.category}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">3. Technology Stack Overview</div>
          <table>
            <thead>
              <tr>
                <th style="width: 120px;">Kategori</th>
                <th style="width: 180px;">Teknologi Pilihan</th>
                <th>Alasan Pemilihan</th>
                <th style="width: 120px;">Alternatif</th>
              </tr>
            </thead>
            <tbody>
              ${architecture.technologyStack.map(t => `
                <tr>
                  <td><strong>${t.category}</strong></td>
                  <td><span class="tech-badge">${t.technology}</span></td>
                  <td>${t.reason}</td>
                  <td>${t.alternative}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">4. Database Architecture & Entities</div>
          <p><strong>Database Type:</strong> ${architecture.databaseArchitecture?.databaseType} (${architecture.databaseArchitecture?.primaryDatabase})</p>
          <p><strong>Rationale:</strong> ${architecture.databaseArchitecture?.rationale}</p>
          <table>
            <thead>
              <tr>
                <th style="width: 120px;">Entity Name</th>
                <th style="width: 80px;">Primary Key</th>
                <th>Atribut Utama</th>
                <th>Relasi</th>
              </tr>
            </thead>
            <tbody>
              ${architecture.databaseEntities.map(e => `
                <tr>
                  <td><strong>${e.entityName}</strong></td>
                  <td><code>${e.primaryKey}</code></td>
                  <td>${e.attributes.join(', ')}</td>
                  <td>${e.relationships.map(r => `${r.type} to ${r.targetEntity}`).join('; ')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">5. API Architecture & Specification</div>
          <table>
            <thead>
              <tr>
                <th style="width: 70px;">Method</th>
                <th style="width: 160px;">Path</th>
                <th>Tujuan API</th>
                <th style="width: 110px;">Auth & Role</th>
              </tr>
            </thead>
            <tbody>
              ${architecture.apiEndpoints.map(ep => `
                <tr>
                  <td><strong style="color: ${ep.method === 'GET' ? '#0284c7' : ep.method === 'POST' ? '#16a34a' : '#d97706'}">${ep.method}</strong></td>
                  <td><code>${ep.path}</code></td>
                  <td>${ep.purpose}</td>
                  <td>${ep.authentication ? '🔒 ' + ep.role : 'Public'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">6. AI, Security & Cloud Infrastructure</div>
          <div style="display: flex; gap: 20px;">
            <div style="flex: 1;">
              <strong>AI Architecture Strategy:</strong>
              <p>${architecture.aiArchitecture?.providerStrategy}</p>
              <ul>
                ${architecture.aiArchitecture?.guardrails.map(g => `<li>${g}</li>`).join('')}
              </ul>
            </div>
            <div style="flex: 1;">
              <strong>Cloud & Security Hosting:</strong>
              <p>Provider: ${architecture.cloudArchitecture?.provider}</p>
              <ul>
                <li>Backend: ${architecture.cloudArchitecture?.backendHosting}</li>
                <li>Database: ${architecture.cloudArchitecture?.databaseHosting}</li>
                <li>CDN: ${architecture.cloudArchitecture?.cdn}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="disclaimer">
          <strong>Catatan & Disclaimer:</strong> Dokumen ini merupakan <em>AI-generated preliminary solution architecture</em> yang dibuat oleh AI Solution Architect SMART-AI.ID. Digunakan sebagai acuan umum rancangan teknis dan tidak menggantikan keputusan arsitek software pada saat implementasi.
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 600);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    this.trackEvent('architecture_exported', { format: 'pdf' });
  }

  /**
   * Analytics Event Tracker Foundation
   */
  static trackEvent(eventName: string, payload?: any): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, payload);
    } else {
      console.log(`[Analytics Event] ${eventName}`, payload || {});
    }
  }
}
