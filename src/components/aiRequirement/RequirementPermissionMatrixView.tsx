import React from 'react';
import { PermissionMatrixItem } from '../../types';
import { ShieldCheck, ShieldAlert, Check, Minus } from 'lucide-react';

interface RequirementPermissionMatrixViewProps {
  matrix: PermissionMatrixItem[];
}

export const RequirementPermissionMatrixView: React.FC<RequirementPermissionMatrixViewProps> = ({
  matrix
}) => {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
        Matriks otorisasi hak akses belum tersedia.
      </div>
    );
  }

  const renderPermissionBadge = (perms: string[]) => {
    if (!perms || perms.length === 0 || (perms.length === 1 && perms[0] === '-')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-slate-600 text-[10px] font-mono">
          <Minus className="w-3 h-3" />
          <span>Tidak Ada Akses</span>
        </span>
      );
    }

    if (perms.includes('View') && perms.includes('Create') && perms.includes('Edit') && perms.includes('Delete') && perms.includes('Approve')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold font-mono">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>FULL ACCESS</span>
        </span>
      );
    }

    return (
      <div className="flex flex-wrap gap-1">
        {perms.map((p, idx) => (
          <span
            key={idx}
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
              p === 'Approve'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                : p === 'Delete'
                ? 'bg-red-950 text-red-300 border border-red-500/40'
                : 'bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            {p}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>ROLE-BASED ACCESS CONTROL (RBAC) PERMISSION MATRIX</span>
        </div>
      </div>

      {/* Desktop Responsive Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <table className="w-full text-left text-xs text-slate-300 border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <th className="py-3 px-4 font-bold text-white w-1/4">MODUL APLIKASI</th>
              <th className="py-3 px-3">SUPER ADMIN</th>
              <th className="py-3 px-3">MANAGEMENT</th>
              <th className="py-3 px-3">MANAGER</th>
              <th className="py-3 px-3">STAFF</th>
              <th className="py-3 px-3">OPERATOR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {matrix.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-4 font-bold text-white font-mono text-xs">
                  {row.module}
                </td>
                <td className="py-3 px-3">{renderPermissionBadge(row.superAdmin)}</td>
                <td className="py-3 px-3">{renderPermissionBadge(row.management)}</td>
                <td className="py-3 px-3">{renderPermissionBadge(row.manager)}</td>
                <td className="py-3 px-3">{renderPermissionBadge(row.staff)}</td>
                <td className="py-3 px-3">{renderPermissionBadge(row.operator)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Collapsible Module Section Card Fallback */}
      <div className="block md:hidden space-y-3">
        {matrix.map((row, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-white font-mono text-sm border-b border-slate-800 pb-1">
              {row.module}
            </h4>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-[11px]">Super Admin:</span>
                <div>{renderPermissionBadge(row.superAdmin)}</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-[11px]">Management:</span>
                <div>{renderPermissionBadge(row.management)}</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-[11px]">Manager:</span>
                <div>{renderPermissionBadge(row.manager)}</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-[11px]">Staff:</span>
                <div>{renderPermissionBadge(row.staff)}</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-[11px]">Operator:</span>
                <div>{renderPermissionBadge(row.operator)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
