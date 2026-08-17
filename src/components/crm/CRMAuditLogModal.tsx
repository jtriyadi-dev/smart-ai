import React from 'react';
import { ShieldCheck, X, Clock, User, FileText } from 'lucide-react';
import { CRMAuditLog } from '../../types';

interface CRMAuditLogModalProps {
  logs: CRMAuditLog[];
  isOpen: boolean;
  onClose: () => void;
}

export const CRMAuditLogModal: React.FC<CRMAuditLogModalProps> = ({ logs, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto">
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">CRM Audit Log & Security Activity History</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 text-xs">
          {logs.length === 0 ? (
            <div className="text-center p-8 text-slate-500">Belum ada riwayat log keamanan.</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {log.action}
                    </span>
                    <span className="font-bold text-white">{log.entity}: #{log.entityId}</span>
                  </div>
                  <p className="text-slate-300">{log.details}</p>
                </div>

                <div className="text-right text-[10px] text-slate-400 space-y-0.5">
                  <div>User: <strong className="text-slate-200">{log.user}</strong></div>
                  <div className="font-mono">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
