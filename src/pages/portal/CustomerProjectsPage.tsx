import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { CustomerProject } from '../../types';
import { FolderKanban, Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const CustomerProjectsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [projects, setProjects] = useState<CustomerProject[]>([]);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const list = CustomerPortalService.getProjects(s.company.id);
      setProjects(list);
    }
  }, []);

  if (!session) return null;

  return (
    <CustomerPortalLayout activePath="/portal/projects">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-cyan-400" /> Projects Portfolio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Daftar proyek digital & aplikasi milik {session.company.name}.
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center">
          <FolderKanban className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">No Active Projects Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Saat ini belum ada proyek aktif yang tercatat untuk {session.company.name}. Silakan ajukan konsultasi untuk memulai pengajuan proyek baru.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/portal/projects/${p.id}`)}
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 cursor-pointer transition shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {p.status}
                  </span>
                  <span className="text-xs text-slate-400">{p.industry}</span>
                </div>

                <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition mb-2">
                  {p.projectName}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {p.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Progress Overall</span>
                    <span className="font-bold text-cyan-400">{p.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${p.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Target Selesai: <strong className="text-slate-200">{p.expectedCompletion}</strong></span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition flex items-center gap-1">
                  Detail <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerPortalLayout>
  );
};
