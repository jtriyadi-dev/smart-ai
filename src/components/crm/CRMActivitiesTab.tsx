import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Filter,
  Phone,
  MessageCircle,
  Mail,
  Users,
  FileText,
  CheckCircle2,
  Calendar,
  UserCheck
} from 'lucide-react';
import { CRMActivity, ActivityType } from '../../types';
import { ActivityService } from '../../services/activityService';

interface CRMActivitiesTabProps {
  activities: CRMActivity[];
  onRefresh: () => void;
}

export const CRMActivitiesTab: React.FC<CRMActivitiesTabProps> = ({
  activities,
  onRefresh
}) => {
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form states
  const [actType, setActType] = useState<ActivityType>('Call');
  const [actSubject, setActSubject] = useState('');
  const [actDesc, setActDesc] = useState('');
  const [actDate, setActDate] = useState(new Date().toISOString().split('T')[0]);
  const [actTime, setActTime] = useState('09:30');
  const [actDuration, setActDuration] = useState('30 min');

  const filtered = activities.filter((act) =>
    typeFilter === 'All' ? true : act.type === typeFilter
  );

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actSubject.trim()) return;

    ActivityService.createActivity({
      type: actType,
      subject: actSubject,
      description: actDesc,
      date: actDate,
      time: actTime,
      duration: actDuration,
      assignedTo: 'Budi Santoso',
      actor: 'Admin'
    });

    setShowAddModal(false);
    setActSubject('');
    setActDesc('');
    onRefresh();
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'WhatsApp': return <MessageCircle className="w-4 h-4 text-emerald-400" />;
      case 'Call': return <Phone className="w-4 h-4 text-blue-400" />;
      case 'Email': return <Mail className="w-4 h-4 text-purple-400" />;
      case 'Meeting': return <Users className="w-4 h-4 text-amber-400" />;
      case 'Proposal': return <FileText className="w-4 h-4 text-pink-400" />;
      default: return <Clock className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Filter Tipe:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
          >
            <option value="All">Semua Aktivitas</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Call">Call</option>
            <option value="Meeting">Meeting</option>
            <option value="Proposal">Proposal</option>
            <option value="Status Change">Status Change</option>
            <option value="Note">Note</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Activity</span>
        </button>
      </div>

      {/* Vertical Timeline Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center p-8 text-slate-500 text-xs">
              Belum ada aktivitas tercatat.
            </div>
          ) : (
            filtered.map((act) => (
              <div key={act.id} className="relative group">
                {/* Node Icon */}
                <div className="absolute -left-[33px] top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center">
                  {getActivityIcon(act.type)}
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {act.type}
                      </span>
                      <h4 className="font-bold text-slate-100">{act.subject}</h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {act.date} {act.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{act.description}</p>

                  <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-900/80 flex items-center justify-between">
                    <div>
                      Perusahaan: <strong className="text-slate-200">{act.companyName || 'Umum'}</strong> • Kontak: <strong className="text-slate-200">{act.contactName || '-'}</strong>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-400">
                      <UserCheck className="w-3 h-3 text-blue-400" />
                      <span>{act.actor || act.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Add Activity */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateActivity} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">+ Catat Aktivitas Baru</h3>
            <div>
              <label className="text-xs text-slate-400">Tipe Aktivitas</label>
              <select
                value={actType}
                onChange={(e) => setActType(e.target.value as any)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Call">Call</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
                <option value="Demo">Demo</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Subjek Utama</label>
              <input
                type="text"
                required
                value={actSubject}
                onChange={(e) => setActSubject(e.target.value)}
                placeholder="Diskusi modul AI..."
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Deskripsi / Hasil Diskusi</label>
              <textarea
                rows={3}
                value={actDesc}
                onChange={(e) => setActDesc(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Tanggal</label>
                <input
                  type="date"
                  value={actDate}
                  onChange={(e) => setActDate(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Jam</label>
                <input
                  type="time"
                  value={actTime}
                  onChange={(e) => setActTime(e.target.value)}
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
