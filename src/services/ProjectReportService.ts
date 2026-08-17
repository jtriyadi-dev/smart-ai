import { FullProjectRecord } from '../types';

export class ProjectReportService {
  /**
   * Triggers browser print window optimized for A4 PDF export
   */
  public static printProjectReport(project: FullProjectRecord, isCustomerView: boolean = false): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const visibleTasks = isCustomerView
      ? (project.tasks || []).filter((t) => t.visibility === 'CUSTOMER_VISIBLE')
      : project.tasks || [];

    const visibleDocs = isCustomerView
      ? (project.documents || []).filter((d) => d.visibility === 'CUSTOMER_VISIBLE')
      : project.documents || [];

    const visibleUpdates = isCustomerView
      ? (project.updates || []).filter((u) => u.visibility === 'CUSTOMER_VISIBLE')
      : project.updates || [];

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Project Report - ${project.projectNumber} - ${project.projectName}</title>
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #1e293b;
              margin: 0;
              padding: 0;
              font-size: 11pt;
              line-height: 1.5;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #0f172a;
              padding-bottom: 12px;
              margin-bottom: 20px;
            }
            .brand {
              font-size: 18pt;
              font-weight: 800;
              color: #0284c7;
              letter-spacing: -0.5px;
            }
            .brand span {
              color: #0f172a;
            }
            .doc-title {
              text-align: right;
            }
            .doc-title h1 {
              margin: 0;
              font-size: 14pt;
              text-transform: uppercase;
              color: #0f172a;
            }
            .doc-title p {
              margin: 0;
              font-size: 9pt;
              color: #64748b;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-size: 12pt;
              font-weight: 700;
              color: #0f172a;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 4px;
              margin-bottom: 10px;
              text-transform: uppercase;
            }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            .grid-3 {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 10px;
            }
            .card {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
              padding: 10px 14px;
            }
            .card label {
              display: block;
              font-size: 8pt;
              text-transform: uppercase;
              color: #64748b;
              font-weight: 600;
            }
            .card value {
              font-size: 11pt;
              font-weight: 700;
              color: #0f172a;
            }
            .progress-bar-bg {
              background: #e2e8f0;
              border-radius: 10px;
              height: 12px;
              width: 100%;
              overflow: hidden;
              margin-top: 4px;
            }
            .progress-bar-fill {
              background: #0284c7;
              height: 100%;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 8px;
              font-size: 9.5pt;
            }
            th {
              background: #f1f5f9;
              color: #334155;
              text-align: left;
              padding: 8px;
              font-weight: 700;
              border-bottom: 1px solid #cbd5e1;
            }
            td {
              padding: 8px;
              border-bottom: 1px solid #e2e8f0;
            }
            .badge {
              display: inline-block;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 8pt;
              font-weight: 700;
            }
            .badge-success { background: #dcfce7; color: #166534; }
            .badge-progress { background: #e0f2fe; color: #075985; }
            .badge-warning { background: #fef3c7; color: #92400e; }
            .footer {
              margin-top: 30px;
              border-top: 1px solid #e2e8f0;
              padding-top: 10px;
              text-align: center;
              font-size: 8.5pt;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="brand">SMART-AI<span>.ID</span></div>
            <div class="doc-title">
              <h1>Project Progress Report</h1>
              <p>Generated: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div class="section grid-2">
            <div class="card">
              <label>Project Name & Number</label>
              <value>${project.projectName} (${project.projectNumber})</value>
            </div>
            <div class="card">
              <label>Client Organization</label>
              <value>${project.customerName}</value>
            </div>
            <div class="card">
              <label>Project Manager</label>
              <value>${project.projectManagerName}</value>
            </div>
            <div class="card">
              <label>Timeline Schedule</label>
              <value>${project.startDate} to ${project.targetDate}</value>
            </div>
          </div>

          <div class="section card" style="background: #f0f9ff; border-color: #bae6fd;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <label>Overall Project Progress</label>
                <div style="font-size: 20pt; font-weight: 800; color: #0369a1;">${project.overallProgress}%</div>
              </div>
              <div>
                <span class="badge ${project.health === 'ON_TRACK' ? 'badge-success' : 'badge-warning'}">
                  Health: ${project.health}
                </span>
                <span class="badge badge-progress" style="margin-left: 6px;">
                  Status: ${project.status}
                </span>
              </div>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${project.overallProgress}%;"></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Project Phases Status</div>
            <table>
              <thead>
                <tr>
                  <th>Phase Name</th>
                  <th>Weight</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Target Due Date</th>
                </tr>
              </thead>
              <tbody>
                ${(project.phases || [])
                  .map(
                    (p) => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td>${p.weight}%</td>
                    <td>${p.progress}%</td>
                    <td><span class="badge ${p.progress === 100 ? 'badge-success' : 'badge-progress'}">${p.status}</span></td>
                    <td>${p.dueDate}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Milestones Roadmap</div>
            <table>
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Owner</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                ${(project.milestones || [])
                  .map(
                    (m) => `
                  <tr>
                    <td><strong>${m.name}</strong><br><small style="color:#64748b">${m.description}</small></td>
                    <td>${m.ownerName || '-'}</td>
                    <td>${m.progress}%</td>
                    <td><span class="badge ${m.status === 'COMPLETED' ? 'badge-success' : 'badge-progress'}">${m.status}</span></td>
                    <td>${m.dueDate}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Recent Tasks Overview (${visibleTasks.length} Total)</div>
            <table>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                ${visibleTasks
                  .slice(0, 8)
                  .map(
                    (t) => `
                  <tr>
                    <td>${t.name}</td>
                    <td>${t.assigneeName || 'Team'}</td>
                    <td>${t.priority}</td>
                    <td><span class="badge ${t.status === 'DONE' ? 'badge-success' : 'badge-progress'}">${t.status}</span></td>
                    <td>${t.dueDate}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>

          ${
            visibleUpdates.length > 0
              ? `
            <div class="section">
              <div class="section-title">Latest Official Update</div>
              <div class="card">
                <strong>${visibleUpdates[0].title}</strong> (${visibleUpdates[0].createdAt.split('T')[0]})
                <p style="margin-top:6px; font-size:9.5pt;">${visibleUpdates[0].content}</p>
              </div>
            </div>
          `
              : ''
          }

          <div class="footer">
            SMART-AI.ID Enterprise Project Management Platform &bull; Confidential Official Report &bull; www.smart-ai.id
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  }
}
