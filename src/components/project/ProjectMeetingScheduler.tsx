import React, { useState } from 'react';
import { ProjectMeetingItem, MeetingType, MeetingStatus } from '../../types';
import { Video, Calendar, Clock, Users, ExternalLink, Plus, CheckCircle, FileText } from 'lucide-react';

interface Props {
  meetings: ProjectMeetingItem[];
  onScheduleMeeting?: (mtg: Partial<ProjectMeetingItem>) => void;
  isCustomerView?: boolean;
}

export const ProjectMeetingScheduler: React.FC<Props> = ({
  meetings,
  onScheduleMeeting,
  isCustomerView = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-08-30');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [meetingType, setMeetingType] = useState<MeetingType>('Progress Meeting');
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/smart-ai-project-sync');
  const [visibility, setVisibility] = useState<'CUSTOMER_VISIBLE' | 'INTERNAL'>('CUSTOMER_VISIBLE');
  const [customerNotes, setCustomerNotes] = useState('');

  const visibleMeetings = meetings.filter((m) => {
    if (isCustomerView && m.visibility !== 'CUSTOMER_VISIBLE') return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (onScheduleMeeting) {
      onScheduleMeeting({
        title,
        description,
        date,
        startTime,
        endTime,
        meetingType,
        meetingUrl,
        visibility,
        status: 'SCHEDULED',
        participants: ['Client Team', 'Project Manager', 'Lead Engineer'],
        notes: { customerVisibleNotes: customerNotes },
      });
    }

    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Project Meetings & Progress Reviews
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kickoff sessions, requirement alignments, design reviews, and UAT demos.
          </p>
        </div>

        {!isCustomerView && onScheduleMeeting && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" /> Schedule Meeting
          </button>
        )}
      </div>

      {/* Meetings List */}
      {visibleMeetings.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">No scheduled meetings currently listed.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleMeetings.map((mtg) => (
            <div
              key={mtg.id}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-sky-500/50 transition-all"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {mtg.meetingType}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      mtg.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {mtg.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{mtg.title}</h4>
                {mtg.description && <p className="text-xs text-slate-500 dark:text-slate-400">{mtg.description}</p>}

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>{mtg.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>
                      {mtg.startTime} - {mtg.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-600" />
                    <span>{mtg.participants.join(', ')}</span>
                  </div>
                </div>

                {mtg.notes?.customerVisibleNotes && (
                  <div className="mt-2 p-2.5 rounded-lg bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-xs text-slate-700 dark:text-slate-300">
                    <div className="font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1 mb-0.5">
                      <FileText className="w-3 h-3" /> Meeting Summary & Decisions:
                    </div>
                    {mtg.notes.customerVisibleNotes}
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {mtg.meetingUrl && mtg.status !== 'CANCELLED' && (
                  <a
                    href={mtg.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Join Meeting Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Schedule Project Meeting</h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Meeting Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Milestone 3 Architecture & UAT Review"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Meeting Type</label>
                  <select
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value as MeetingType)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Kickoff">Kickoff</option>
                    <option value="Requirement">Requirement</option>
                    <option value="Design Review">Design Review</option>
                    <option value="Development Review">Development Review</option>
                    <option value="UAT">UAT Review</option>
                    <option value="Progress Meeting">Progress Meeting</option>
                    <option value="Deployment">Deployment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Meeting Link (Google Meet/Zoom)</label>
                <input
                  type="url"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Notes / Agenda for Client</label>
                <textarea
                  rows={2}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Agenda points or key preparation instructions..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
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
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
