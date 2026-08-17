import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CRMFollowUp, CRMActivity } from '../../types';

interface CRMCalendarViewProps {
  followUps: CRMFollowUp[];
  activities: CRMActivity[];
}

export const CRMCalendarView: React.FC<CRMCalendarViewProps> = ({ followUps, activities }) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Month days placeholder
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Kalender Aktivitas & Agenda Meetings</h3>
            <p className="text-xs text-slate-400">Agustus 2026 • SMART-AI.ID Sales Schedule</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid View */}
      {viewMode === 'month' && (
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
            <div key={day} className="text-center text-[11px] font-bold text-slate-400 py-1 uppercase">
              {day}
            </div>
          ))}

          {daysInMonth.map((d) => {
            const isToday = d === 14;
            const dayString = `2026-08-${d.toString().padStart(2, '0')}`;
            const dayEvents = followUps.filter((f) => f.dueDate === dayString);

            return (
              <div
                key={d}
                className={`min-h-[75px] sm:min-h-[90px] p-1.5 rounded-xl border flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-blue-950/40 border-blue-500/60 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                      isToday ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    {d}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  )}
                </div>

                <div className="space-y-1 my-1">
                  {dayEvents.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 truncate"
                      title={ev.task}
                    >
                      {ev.task}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[9px] text-slate-500 font-semibold pl-1">
                      +{dayEvents.length - 2} agenda lagi
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode !== 'month' && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
          <p className="font-semibold text-slate-200">Tampilan {viewMode.toUpperCase()} Calendar</p>
          <p className="mt-1">Menampilkan agenda rapat Zoom, demonstrasi produk, dan konsolidasi requirement minggu ini.</p>
        </div>
      )}
    </div>
  );
};
