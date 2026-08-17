import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { FileText, Download, Eye, Calendar, Sparkles } from 'lucide-react';

export const CustomerProposalsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const list = CustomerPortalService.getProposals(s.company.id, s.company.name);
      setProposals(list);
    }
  }, []);

  if (!session) return null;

  return (
    <CustomerPortalLayout activePath="/portal/proposals">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" /> Proposals Hub
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Daftar dokumen Proposal Teknis & Arsitektur Solusi untuk {session.company.name}.
        </p>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          Belum ada proposal teknis yang diterbitkan untuk perusahaan Anda.
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-purple-500/40 transition"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-purple-400">
                    {prop.proposalNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    {prop.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{prop.projectName}</h3>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>Dibuat: {prop.createdAt ? new Date(prop.createdAt).toLocaleDateString('id-ID') : '-'}</span>
                  <span>Versi: {prop.version || 'v1'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/proposal/view?id=${prop.id}&token=${prop.secureToken}`)}
                  className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Eye className="w-4 h-4" /> View Proposal
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerPortalLayout>
  );
};
