import React, { useState } from 'react';
import {
  ListTodo,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  Plus,
  MessageCircle,
  XCircle,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { CRMFollowUp } from '../../types';
import { FollowUpService } from '../../services/followUpService';

interface CRMFollowUpsTabProps {
  followUps: CRMFollowUp[];
  onRefresh: () => void;
  onWhatsAppClick: (phone: string, name: string, context: string) => void;
}

export const CRMFollowUpsTab: React.FC<CRMFollowUpsTabProps> = ({
  followUps,
  onRefresh,
  onWhatsAppClick
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'overdue' | 'completed'>('today');
  const [showAddModal, setShowAddModal] = useState(false);

  // New FollowUp form
  const [taskName, setTaskName] = useState('');
  const [compName, setCompName] = useState('');
  const [contName, setContName] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueTime, setDueTime] = useState('10:00');
  const [assignedTo, setAssignedTo] = useState('Budi Santoso');

  const todayList = FollowUpService.getTodayFollowUps();
  const upcomingList = FollowUpService.getUpcomingFollowUps();
  const overdueList = FollowUpService.getOverdueFollowUps();
  const completedList = FollowUpService.getCompletedFollowUps();

  const handleCreateFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    FollowUpService.createFollowUp({
      task: taskName,
      companyName: compName || 'Prospek Perusahaan',
      contactName: contName || 'Kontak Utama',
      dueDate,
      dueTime,
      assignedTo,
      priority: 'High'
    });

    setShowAddModal(false);
    setTaskName('');
    setCompName('');
    setContName('');
    onRefresh();
  };

  const currentList =
    activeTab === 'today'
      ? todayList
      : activeTab === 'upcoming'
      ? upcomingList
      : activeTab === 'overdue'
      ? overdueList
      : completedList;

  return (
    <div className="space-y-4">
      {/* Overdue Warning Alert */}
      {overdueList.length > 0 && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between text-rose-300 text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-rose-500/20 rounded-xl text-rose-400">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="font-bold text-sm text-rose-200">
                Peringatan: Terdapat {overdueList.length} Task Follow-up Terlambat (Overdue)!
              </div>
              <p className="text-rose-300/80 mt-0.5">Segera hubungi prospek atau perbarui tanggal jatuh tempo.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('overdue')}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-rose-500/20 shrink-0"
          >
            Lihat Overdue
          </button>
        </div>
      )}

      {/* Tabs & Add Button Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'today' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Hari Ini (Today)</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-950 font-mono">{todayList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'overdue' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Overdue</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-950 text-rose-400 font-mono">{overdueList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'upcoming' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Akan Datang (Upcoming)</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-950 font-mono">{upcomingList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'completed' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Selesai (Completed)</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-950 font-mono">{completedList.length}</span>
          </button>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all shadow-lg shadow-blue-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Task</span>
        </button>
      </div>

      {/* Task Cards Container */}
      <div className="space-y-3">
        {currentList.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
            Tidak ada tugas follow-up pada kategori ini.
          </div>
        ) : (
          currentList.map((fol) => (
            <div
              key={fol.id}
              className={`bg-slate-900 border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                fol.status === 'Overdue' ? 'border-rose-500/40 bg-rose-500/5' : 'border-slate-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      fol.status === 'Overdue'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : fol.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {fol.status}
                  </span>
                  <h4 className="text-sm font-bold text-white">{fol.task}</h4>
                </div>

                <div className="text-xs text-slate-400">
                  Perusahaan: <strong className="text-slate-200">{fol.companyName}</strong> • Kontak: <strong className="text-slate-200">{fol.contactName}</strong>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center space-x-3 pt-1">
                  <span className="flex items-center space-x-1 text-amber-300 font-semibold">
                    <Calendar className="w-3 h-3" />
                    <span>Jatuh Tempo: {fol.dueDate} jam {fol.dueTime}</span>
                  </span>
                  <span>•</span>
                  <span>PJ: {fol.assignedTo}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => onWhatsAppClick('+6285187869164', fol.contactName || 'Klien', fol.task)}
                  className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl flex items-center space-x-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                {fol.status !== 'Completed' && (
                  <button
                    onClick={() => {
                      FollowUpService.completeFollowUp(fol.id);
                      onRefresh();
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1 shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tandai Selesai</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Add Follow-up */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateFollowUp} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">+ Create Follow-up Task</h3>
            <div>
              <label className="text-xs text-slate-400">Deskripsi Tugas</label>
              <input
                type="text"
                required
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Contoh: Diskusi proposal harga..."
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Nama Perusahaan</label>
              <input
                type="text"
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                placeholder="PT Nusantara Mining Energy"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Nama Kontak PIC</label>
              <input
                type="text"
                value={contName}
                onChange={(e) => setContName(e.target.value)}
                placeholder="Hendra Gunawan"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Tanggal Jatuh Tempo</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Jam</label>
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
