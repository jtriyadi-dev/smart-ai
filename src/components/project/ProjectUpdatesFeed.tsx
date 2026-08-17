import React, { useState } from 'react';
import { ProjectUpdateNotice, FullProjectRecord } from '../../types';
import { AIProjectManagerService } from '../../services/AIProjectManagerService';
import { Megaphone, Sparkles, Send, Calendar, User, Eye, Lock } from 'lucide-react';

interface Props {
  project: FullProjectRecord;
  updates: ProjectUpdateNotice[];
  onPostUpdate?: (update: Partial<ProjectUpdateNotice>) => void;
  isCustomerView?: boolean;
}

export const ProjectUpdatesFeed: React.FC<Props> = ({
  project,
  updates,
  onPostUpdate,
  isCustomerView = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'CUSTOMER_VISIBLE' | 'INTERNAL'>('CUSTOMER_VISIBLE');
  const [additionalPrompt, setAdditionalPrompt] = useState('');

  const visibleUpdates = updates.filter((u) => {
    if (isCustomerView && u.visibility !== 'CUSTOMER_VISIBLE') return false;
    return true;
  });

  const handleGenerateAIUpdate = async () => {
    setIsGeneratingAI(true);
    try {
      const aiResult = await AIProjectManagerService.generateCustomerSafeUpdate(project, additionalPrompt);
      setTitle(aiResult.title);
      setContent(aiResult.content);
    } catch (e) {
      console.error('Failed to generate AI update:', e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (onPostUpdate) {
      onPostUpdate({
        title,
        content,
        visibility,
        status: 'PUBLISHED',
      });
    }

    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Official Project Updates & Announcements
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official progress releases and milestone progress announcements.
          </p>
        </div>

        {!isCustomerView && onPostUpdate && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" /> Post New Announcement
          </button>
        )}
      </div>

      {/* Feed List */}
      {visibleUpdates.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Megaphone className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">No project updates posted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleUpdates.map((u) => (
            <div
              key={u.id}
              className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 hover:border-sky-500/40 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{u.title}</h4>

                {!isCustomerView && (
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                      u.visibility === 'CUSTOMER_VISIBLE'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {u.visibility === 'CUSTOMER_VISIBLE' ? <Eye className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    {u.visibility === 'CUSTOMER_VISIBLE' ? 'Client Visible' : 'Internal'}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {u.content}
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>By {u.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{u.createdAt.split('T')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Post Project Announcement
              </h3>
              <button
                type="button"
                onClick={handleGenerateAIUpdate}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-500/30 transition-all"
              >
                {isGeneratingAI ? 'Generating...' : 'AI Customer Update Generator'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Optional AI Context Hint</label>
                <input
                  type="text"
                  value={additionalPrompt}
                  onChange={(e) => setAdditionalPrompt(e.target.value)}
                  placeholder="e.g. Highlight successful completion of fuel anomaly AI model"
                  className="w-full px-3 py-2 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Milestone 2 Completed - Development Phase Initiated"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Announcement Content *</label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write customer-safe progress release notes..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Visibility Level</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="CUSTOMER_VISIBLE">Client Visible (Customer Portal)</option>
                  <option value="INTERNAL">Internal Team Only</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-xs"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
