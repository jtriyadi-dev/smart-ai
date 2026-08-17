import { RequirementAnalyzerInput, RequirementAnalysis } from '../types';

const STORAGE_KEY_REQUIREMENT = 'smart_ai_saved_requirement_analysis';
const STORAGE_KEY_VERSIONS = 'smart_ai_requirement_versions';

export class AIRequirementAnalyzerService {
  /**
   * Request AI requirement analysis from server API
   */
  static async analyzeRequirements(
    input: RequirementAnalyzerInput
  ): Promise<{ success: boolean; data?: RequirementAnalysis; error?: string }> {
    try {
      this.trackEvent('requirement_analysis_requested', {
        industry: input.businessProfile.industry,
        depth: input.requirementDepth,
        hasBlueprint: !!input.applicationBlueprint
      });

      const response = await fetch('/api/ai-requirement-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      const json = await response.json();

      if (response.ok && json.success && json.requirement) {
        const requirement = json.requirement as RequirementAnalysis;
        
        // Save to storage
        this.saveRequirementToStorage(requirement);
        this.saveVersion(requirement, 'Analisis Awal AI Business Analyst');

        this.trackEvent('requirement_analysis_completed', {
          score: requirement.requirementCompleteness?.score
        });

        return { success: true, data: requirement };
      } else {
        this.trackEvent('requirement_analysis_failed', { error: json.error });
        return {
          success: false,
          error: json.error || 'Gagal memproses analisis requirement. Silakan periksa koneksi Anda.'
        };
      }
    } catch (err: any) {
      console.error('Error in analyzeRequirements:', err);
      this.trackEvent('requirement_analysis_failed', { error: err.message });
      return {
        success: false,
        error: 'Terjadi kesalahan jaringan saat menghubungi AI Requirement Server.'
      };
    }
  }

  /**
   * Save active requirement specification to local storage
   */
  static saveRequirementToStorage(requirement: RequirementAnalysis): void {
    try {
      const payload = {
        savedAt: new Date().toISOString(),
        requirement
      };
      localStorage.setItem(STORAGE_KEY_REQUIREMENT, JSON.stringify(payload));
      this.trackEvent('requirement_saved');
    } catch (e) {
      console.warn('Could not save requirement to localStorage:', e);
    }
  }

  /**
   * Get saved requirement specification from local storage
   */
  static getSavedRequirement(): { savedAt: string; requirement: RequirementAnalysis } | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_REQUIREMENT);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  /**
   * Requirement Versioning Service Abstraction
   */
  static saveVersion(requirement: RequirementAnalysis, changeSummary: string): any[] {
    try {
      const existing = this.getVersions();
      const newVersionNum = existing.length + 1;
      
      const newRequirementWithVersion = {
        ...requirement,
        version: newVersionNum
      };

      const versionItem = {
        version: newVersionNum,
        date: new Date().toISOString(),
        summary: changeSummary,
        data: newRequirementWithVersion
      };

      const updated = [versionItem, ...existing];
      localStorage.setItem(STORAGE_KEY_VERSIONS, JSON.stringify(updated.slice(0, 10))); // keep top 10 versions
      return updated;
    } catch (e) {
      console.warn('Could not save version:', e);
      return [];
    }
  }

  static getVersions(): Array<{ version: number; date: string; summary: string; data: RequirementAnalysis }> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_VERSIONS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  /**
   * Export Requirement Document as JSON file
   */
  static exportJSON(requirement: RequirementAnalysis): void {
    const filename = `Software_Requirement_Specification_${(requirement.projectOverview.solutionName || 'SMART-AI')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase()}.json`;

    const blob = new Blob([JSON.stringify(requirement, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.trackEvent('requirement_exported', { format: 'json' });
  }

  /**
   * Export Printable Specification Sheet (PDF Print Window)
   */
  static exportPDF(requirement: RequirementAnalysis): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Mohon izinkan popup browser untuk mengunduh / mencetak dokumen SRS.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Software Requirement Specification (SRS) - ${requirement.projectOverview.solutionName}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 40px; line-height: 1.6; font-size: 13px; }
          .header { border-bottom: 2px solid #0284c7; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
          .title { font-size: 22px; font-weight: bold; color: #0f172a; margin: 0; }
          .subtitle { font-size: 13px; color: #64748b; margin-top: 5px; }
          .badge { background-color: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 12px; font-weight: bold; font-size: 11px; }
          .section { margin-bottom: 25px; page-break-inside: avoid; }
          .section-title { font-size: 15px; font-weight: bold; color: #0369a1; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: bold; color: #334155; }
          .priority-high { color: #dc2626; font-weight: bold; }
          .priority-must { color: #2563eb; font-weight: bold; }
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
            <h1 class="title">${requirement.projectOverview.solutionName}</h1>
            <div class="subtitle">SOFTWARE REQUIREMENT SPECIFICATION (SRS) — SMART-AI.ID</div>
            <div class="subtitle">Target Domain: ${requirement.projectOverview.targetDomain} | Versi: ${requirement.version || 1}</div>
          </div>
          <div>
            <span class="badge">AI BUSINESS ANALYST</span>
          </div>
        </div>

        <div style="margin-bottom: 20px; font-size: 12px; color: #475569; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #0284c7;">
          <strong>Ringkasan Eksekutif:</strong> ${requirement.projectOverview.executiveSummary}
        </div>

        <div class="section">
          <div class="section-title">1. Business Requirements (BR)</div>
          <table>
            <thead>
              <tr>
                <th style="width: 80px;">ID</th>
                <th>Nama Requirement</th>
                <th>Deskripsi Kebutuhan</th>
                <th>Business Value</th>
                <th style="width: 80px;">Prioritas</th>
              </tr>
            </thead>
            <tbody>
              ${requirement.businessRequirements.map(br => `
                <tr>
                  <td><strong>${br.id}</strong></td>
                  <td>${br.name} ${br.isAIRecommendation ? '<small style="color:#0284c7;">(AI Rec)</small>' : ''}</td>
                  <td>${br.description}</td>
                  <td>${br.businessValue}</td>
                  <td class="${br.priority === 'High' ? 'priority-high' : ''}">${br.priority}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">2. Functional Requirements (FR)</div>
          <table>
            <thead>
              <tr>
                <th style="width: 70px;">ID</th>
                <th style="width: 100px;">Modul</th>
                <th>Fitur & Deskripsi</th>
                <th style="width: 110px;">User Role</th>
                <th style="width: 90px;">Prioritas</th>
              </tr>
            </thead>
            <tbody>
              ${requirement.functionalRequirements.map(fr => `
                <tr>
                  <td><strong>${fr.id}</strong></td>
                  <td>${fr.module}</td>
                  <td><strong>${fr.feature}</strong><br/>${fr.description}</td>
                  <td>${fr.userRole}</td>
                  <td class="priority-must">${fr.priority}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">3. Non-Functional Requirements (NFR)</div>
          <table>
            <thead>
              <tr>
                <th style="width: 70px;">ID</th>
                <th style="width: 110px;">Kategori</th>
                <th>Spesifikasi Requirement</th>
                <th>Rasionalisasi</th>
                <th style="width: 90px;">Prioritas</th>
              </tr>
            </thead>
            <tbody>
              ${requirement.nonFunctionalRequirements.map(nfr => `
                <tr>
                  <td><strong>${nfr.id}</strong></td>
                  <td>${nfr.category}</td>
                  <td>${nfr.requirement}</td>
                  <td>${nfr.rationale}</td>
                  <td>${nfr.priority}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">4. Modul & User Roles</div>
          <div style="display: flex; gap: 20px;">
            <div style="flex: 1;">
              <strong>Daftar Modul Utama:</strong>
              <ul>
                ${requirement.modules.map(m => `<li><strong>${m.id} - ${m.name}:</strong> ${m.description}</li>`).join('')}
              </ul>
            </div>
            <div style="flex: 1;">
              <strong>Peran Pengguna (User Roles):</strong>
              <ul>
                ${requirement.userRoles.map(r => `<li><strong>${r.roleName}:</strong> ${r.description} (<em>${r.accessLevel}</em>)</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">5. Integrasi System & AI Capabilities</div>
          <ul>
            ${requirement.aiRequirements.map(ai => `<li><strong>[AI Feature] ${ai.feature}:</strong> ${ai.businessPurpose} (${ai.recommendedAITechnology})</li>`).join('')}
            ${requirement.integrations.map(i => `<li><strong>[Integration] ${i.system}:</strong> ${i.purpose}</li>`).join('')}
          </ul>
        </div>

        <div class="disclaimer">
          <strong>Catatan & Disclaimers:</strong> Dokumen ini merupakan <em>AI-generated preliminary software requirements</em> yang disusun oleh AI Requirement Analyzer SMART-AI.ID. Digunakan sebagai dasar awal perencanaan teknis, diskusi arsitektur, dan pembuatan proposal resmi.
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

    this.trackEvent('requirement_exported', { format: 'pdf' });
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
