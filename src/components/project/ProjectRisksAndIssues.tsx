import React, { useState } from 'react';
import { ProjectRiskItem, ProjectIssueItem, RiskSeverity, IssueSeverity } from '../../types';
import { ShieldAlert, AlertTriangle, CheckCircle, Plus, Lock, Eye } from 'lucide-react';

interface Props {
  risks: ProjectRiskItem[];
  issues: ProjectIssueItem[];
  onAddRisk?: (risk: Partial<ProjectRiskItem>) => void;
  onAddIssue?: (issue: Partial<ProjectIssueItem>) => void;
  isCustomerView?: boolean;
}

export const ProjectRisksAndIssues: React.FC<Props> = ({
  risks,
  issues,
  onAddRisk,
  onAddIssue,
  isCustomerView = false,
}) => {
  const [activeTab, setActiveTab] = useState<'RISKS' | 'ISSUES'>('RISKS');
  const [showRiskModal, setShowRiskModal] = useState(false);

  // Risk form
  const [riskTitle, setRiskTitle] = useState('');
  const [riskImpact, setRiskImpact] = useState('');
  const [riskSeverity, setRiskSeverity] = useState<RiskSeverity>('MEDIUM');
  const [riskMitigation, setRiskMitigation] = useState('');

  const visibleRisks = risks.filter((r) => {
    if (isCustomerView && r.visibility !== 'CUSTOMER_VISIBLE') return false;
    return true;
  });

  const visibleIssues = issues.filter((i) => {
    if (isCustomerView && i.visibility !== 'CUSTOMER_VISIBLE') return false;
    return true;
  });

  const handleRiskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskTitle.trim()) return;

    if (onAddRisk) {
      onAddRisk({
        title: riskTitle,
        impact: riskImpact,
        severity: riskSeverity,
        mitigation: riskMitigation,
        probability: 'MEDIUM',
        status: 'ACTIVE',
        visibility: 'CUSTOMER_VISIBLE',
      });
    }

    setRiskTitle('');
    setRiskImpact('');
    setRiskMitigation('');
    setShowRiskModal(false);
  };

  const getSeverityBadge = (severity: RiskSeverity | IssueSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold';
      case 'HIGH':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'MEDIUM':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'LOW':
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" /> Project Risk & Issue Tracker
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Transparent mitigation strategies, technical hurdles, and resolution logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('RISKS')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'RISKS'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Project Risks ({visibleRisks.length})
            </button>
            <button
              onClick={() => setActiveTab('ISSUES')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'ISSUES'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Open Issues ({visibleIssues.length})
            </button>
          </div>

          {!isCustomerView && onAddRisk && activeTab === 'RISKS' && (
            <button
              onClick={() => setShowRiskModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Flag Risk
            </button>
          )}
        </div>
      </div>

      {/* Risks Table/Cards */}
      {activeTab === 'RISKS' && (
        <div className="space-y-3">
          {visibleRisks.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
              No project risks currently flagged.
            </div>
          ) : (
            visibleRisks.map((risk) => (
              <div
                key={risk.id}
                className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${getSeverityBadge(risk.severity)}`}>
                      {risk.severity} SEVERITY
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        risk.status === 'MITIGATED'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {risk.status}
                    </span>
                  </div>

                  {!isCustomerView && (
                    <span className="text-[10px] text-slate-400">
                      {risk.visibility === 'CUSTOMER_VISIBLE' ? 'Client Visible' : 'Internal Only'}
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{risk.title}</h4>
                {risk.impact && <p className="text-xs text-slate-600 dark:text-slate-300"><strong>Potential Impact:</strong> {risk.impact}</p>}
                {risk.mitigation && (
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs text-emerald-900 dark:text-emerald-300">
                    <strong>Mitigation Plan:</strong> {risk.mitigation}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Issues Table/Cards */}
      {activeTab === 'ISSUES' && (
        <div className="space-y-3">
          {visibleIssues.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
              No active project issues logged.
            </div>
          ) : (
            visibleIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${getSeverityBadge(issue.severity)}`}>
                      {issue.severity}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        issue.status === 'RESOLVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400">Due: {issue.dueDate}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{issue.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{issue.description}</p>
                {issue.resolution && (
                  <div className="p-2 rounded bg-sky-50 dark:bg-sky-950/30 text-xs text-sky-900 dark:text-sky-300">
                    <strong>Resolution Action:</strong> {issue.resolution}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Risk Modal */}
      {showRiskModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Flag Project Risk</h3>

            <form onSubmit={handleRiskSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Risk Title *</label>
                <input
                  type="text"
                  required
                  value={riskTitle}
                  onChange={(e) => setRiskTitle(e.target.value)}
                  placeholder="e.g. Third-party Payment Gateway Sandbox Downtime"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Severity Level</label>
                <select
                  value={riskSeverity}
                  onChange={(e) => setRiskSeverity(e.target.value as RiskSeverity)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Potential Impact</label>
                <input
                  type="text"
                  value={riskImpact}
                  onChange={(e) => setRiskImpact(e.target.value)}
                  placeholder="e.g. Delay testing of checkout flow by 2 days"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Mitigation Strategy</label>
                <textarea
                  rows={2}
                  value={riskMitigation}
                  onChange={(e) => setRiskMitigation(e.target.value)}
                  placeholder="Actionable steps to resolve or mitigate risk..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRiskModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs"
                >
                  Save Risk Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
