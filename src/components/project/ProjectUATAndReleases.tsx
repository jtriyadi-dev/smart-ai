import React, { useState } from 'react';
import { ProjectUATTestCase, ProjectUATApproval, ProjectReleaseItem } from '../../types';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Rocket,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Layers,
} from 'lucide-react';

interface Props {
  uatTestCases: ProjectUATTestCase[];
  uatApproval?: ProjectUATApproval;
  releases: ProjectReleaseItem[];
  onUpdateUatCase?: (caseId: string, status: any, notes?: string) => void;
  onSubmitUatApproval?: (status: 'APPROVED' | 'REJECTED' | 'REQUEST_CHANGES', comments: string) => void;
  isCustomerView?: boolean;
}

export const ProjectUATAndReleases: React.FC<Props> = ({
  uatTestCases,
  uatApproval,
  releases,
  onUpdateUatCase,
  onSubmitUatApproval,
  isCustomerView = false,
}) => {
  const [activeTab, setActiveTab] = useState<'UAT' | 'RELEASES'>('UAT');
  const [approvalComment, setApprovalComment] = useState('');
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const handleApprovalSubmit = (status: 'APPROVED' | 'REJECTED' | 'REQUEST_CHANGES') => {
    if (onSubmitUatApproval) {
      onSubmitUatApproval(status, approvalComment);
    }
    setShowApprovalModal(false);
  };

  const getUatStatusBadge = (status: string) => {
    switch (status) {
      case 'PASSED':
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'FAILED':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      case 'IN_PROGRESS':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
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
            <Rocket className="w-4 h-4 text-sky-600 dark:text-sky-400" /> UAT Testing & Release Management
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            User Acceptance Testing suite, feature sign-off requests, and release version history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('UAT')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'UAT'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              UAT Test Suite ({uatTestCases.length})
            </button>
            <button
              onClick={() => setActiveTab('RELEASES')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'RELEASES'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Releases ({releases.length})
            </button>
          </div>

          {isCustomerView && activeTab === 'UAT' && (
            <button
              onClick={() => setShowApprovalModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
            >
              <ThumbsUp className="w-3 h-3" /> Submit UAT Sign-Off
            </button>
          )}
        </div>
      </div>

      {/* UAT Status Banner */}
      {uatApproval && uatApproval.status === 'APPROVED' && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <div className="font-bold">UAT Acceptance Formally Approved</div>
            <div>Approved by {uatApproval.approvedBy || 'Client Representative'} &bull; Comment: "{uatApproval.comments}"</div>
          </div>
        </div>
      )}

      {/* UAT Content */}
      {activeTab === 'UAT' && (
        <div className="space-y-3">
          {uatTestCases.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
              No UAT test cases loaded yet.
            </div>
          ) : (
            uatTestCases.map((tc) => (
              <div
                key={tc.id}
                className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getUatStatusBadge(tc.status)}`}>
                    {tc.status}
                  </span>
                  {tc.tester && <span className="text-[10px] text-slate-400">Tested by {tc.tester}</span>}
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{tc.testCase}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300"><strong>Description:</strong> {tc.description}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300"><strong>Expected Result:</strong> {tc.expectedResult}</p>
                {tc.actualResult && <p className="text-xs text-emerald-700 dark:text-emerald-300"><strong>Actual Result:</strong> {tc.actualResult}</p>}

                {/* Customer Action Buttons */}
                {isCustomerView && onUpdateUatCase && tc.status !== 'PASSED' && (
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onUpdateUatCase(tc.id, 'PASSED', 'Verified by Client')}
                      className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[10px] font-semibold hover:bg-emerald-700"
                    >
                      Mark Passed
                    </button>
                    <button
                      onClick={() => onUpdateUatCase(tc.id, 'FAILED', 'Issue reported by Client')}
                      className="px-2.5 py-1 rounded bg-rose-600 text-white text-[10px] font-semibold hover:bg-rose-700"
                    >
                      Report Issue
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Releases Content */}
      {activeTab === 'RELEASES' && (
        <div className="space-y-4">
          {releases.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
              No software releases deployed yet.
            </div>
          ) : (
            releases.map((rel) => (
              <div
                key={rel.id}
                className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-sky-600 dark:text-sky-400 font-mono">{rel.version}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {rel.environment}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {rel.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Released {rel.releaseDate}</span>
                </div>

                {rel.releaseNotes?.newFeatures && rel.releaseNotes.newFeatures.length > 0 && (
                  <div className="text-xs text-slate-700 dark:text-slate-300">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">New Features:</div>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      {rel.releaseNotes.newFeatures.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* UAT Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Customer UAT Acceptance Decision</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Submit formal acceptance status for the current milestone test build.
            </p>

            <textarea
              rows={3}
              value={approvalComment}
              onChange={(e) => setApprovalComment(e.target.value)}
              placeholder="Provide comments or notes for the PM team..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
            />

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => handleApprovalSubmit('APPROVED')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Approve UAT Acceptance
              </button>
              <button
                onClick={() => handleApprovalSubmit('REQUEST_CHANGES')}
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
              >
                Request Revision / Changes
              </button>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="w-full py-2 rounded-lg text-slate-500 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
