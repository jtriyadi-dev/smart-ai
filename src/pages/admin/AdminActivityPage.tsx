import React, { useState } from 'react';
import { History, Search, ShieldCheck, User } from 'lucide-react';
import { AdminControlService } from '../../services/AdminControlService';
import { AdminAuditLog } from '../../types';

export const AdminActivityPage: React.FC = () => {
  const [logs] = useState<AdminAuditLog[]>(AdminControlService.getAuditLogs());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.details && l.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between glass-card p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari User, Action, atau Modul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <span className="text-xs font-mono text-purple-400 font-bold bg-purple-950/80 px-3 py-1.5 rounded-xl border border-purple-800">
          Audit Trail: {logs.length} Log Recorded
        </span>
      </div>

      {/* Logs Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 font-mono text-[10px] text-cyan-400 uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Waktu</th>
                <th className="p-3">User & Role</th>
                <th className="p-3">Aksi</th>
                <th className="p-3">Modul</th>
                <th className="p-3">Detail Aktivitas</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50">
                  <td className="p-3 text-slate-400 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 font-sans font-bold text-white">
                    {log.userName}{' '}
                    <span className="text-[10px] font-mono font-normal text-purple-400">({log.userRole})</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 font-bold border border-slate-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-amber-300 font-bold">{log.module}</td>
                  <td className="p-3 font-sans text-slate-300 max-w-sm">{log.details}</td>
                  <td className="p-3 text-slate-500 text-[10px]">{log.ipAddress || '180.252.88.10'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
