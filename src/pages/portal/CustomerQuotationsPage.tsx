import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';
import { FileCheck, Eye, CheckCircle2, MessageSquare, PhoneCall, AlertCircle, Sparkles } from 'lucide-react';

export const CustomerQuotationsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [responseAction, setResponseAction] = useState<'ACCEPT' | 'REVISION'>('ACCEPT');
  const [responseComment, setResponseComment] = useState('');
  const [signerName, setSignerName] = useState('');
  const [responseSent, setResponseSent] = useState(false);

  const loadData = () => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const list = CustomerPortalService.getQuotations(s.company.id, s.company.name);
      setQuotations(list);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!session) return null;

  const handleOpenResponse = (q: any, action: 'ACCEPT' | 'REVISION') => {
    setSelectedQuotation(q);
    setResponseAction(action);
    setSignerName(session.user.name);
    setResponseModalOpen(true);
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuotation) return;

    QuotationDocumentService.submitCustomerResponse(selectedQuotation.id, {
      status: responseAction === 'ACCEPT' ? 'ACCEPTED' : 'REVISION_REQUESTED',
      comment: responseComment || (responseAction === 'ACCEPT' ? 'Persetujuan resmi dari klien via Customer Portal.' : 'Permintaan revisi syarat komersial/ruang lingkup.'),
      timestamp: new Date().toISOString(),
      signerName: signerName || session.user.name,
      signerPosition: session.user.position
    });

    setResponseSent(true);
    setTimeout(() => {
      setResponseSent(false);
      setResponseModalOpen(false);
      loadData();
    }, 1500);
  };

  const fmtCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <CustomerPortalLayout activePath="/portal/quotations">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-cyan-400" /> Commercial Quotations
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Daftar Penawaran Harga Komersial Resmi (Quotation) untuk {session.company.name}.
        </p>
      </div>

      {quotations.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          Belum ada Quotation resmi yang diterbitkan untuk perusahaan Anda.
        </div>
      ) : (
        <div className="space-y-4">
          {quotations.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-cyan-500/40 transition"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {q.quotationNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    q.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {q.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{q.projectName}</h3>
                <div className="text-xs text-slate-400 mt-1">
                  Masa Berlaku: {q.validUntil} | Total Investment: <strong className="text-cyan-300">{fmtCurrency(q.grandTotal)}</strong>
                </div>

                {q.customerResponse && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Response Recorded ({q.customerResponse.status}): "{q.customerResponse.comment}" by {q.customerResponse.signerName}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => navigate(`/quotation/view?id=${q.id}&token=${q.secureToken}`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Eye className="w-4 h-4 text-cyan-400" /> View Document
                </button>

                {!q.customerResponse && (
                  <>
                    <button
                      onClick={() => handleOpenResponse(q, 'ACCEPT')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Accept Quotation
                    </button>
                    <button
                      onClick={() => handleOpenResponse(q, 'REVISION')}
                      className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      Request Revision
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Acceptance Modal */}
      {responseModalOpen && selectedQuotation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-1">
              {responseAction === 'ACCEPT' ? 'Persetujuan Official Quotation' : 'Pengajuan Revisi Quotation'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {selectedQuotation.quotationNumber} — {selectedQuotation.projectName}
            </p>

            {responseSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Respons Anda berhasil dicatat dan diteruskan ke tim SMART-AI.ID!
              </div>
            ) : (
              <form onSubmit={handleSubmitResponse} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Penanggung Jawab / Signer</label>
                  <input
                    type="text"
                    required
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catatan Tambahan</label>
                  <textarea
                    rows={3}
                    value={responseComment}
                    onChange={(e) => setResponseComment(e.target.value)}
                    placeholder={responseAction === 'ACCEPT' ? 'Konfirmasi persetujuan penawaran...' : 'Detail revisi yang diharapkan...'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setResponseModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-xl text-slate-950 font-bold text-xs ${
                      responseAction === 'ACCEPT' ? 'bg-emerald-400 hover:bg-emerald-300' : 'bg-amber-400 hover:bg-amber-300'
                    }`}
                  >
                    Kirim Respons
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
