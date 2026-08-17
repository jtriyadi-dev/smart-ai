import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { Invoice } from '../../types';
import { Receipt, Eye, Download, AlertTriangle, CheckCircle2, Clock, ShieldCheck, Mail } from 'lucide-react';

export const CustomerInvoicesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const list = CustomerPortalService.getInvoices(s.company.id, s.company.name);
      setInvoices(list);
    }
  }, []);

  if (!session) return null;

  const fmtCurrency = (val: number, cur?: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: cur || 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const overdueInvoices = invoices.filter((inv) => inv.status === 'OVERDUE');

  return (
    <CustomerPortalLayout activePath="/portal/invoices">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Receipt className="w-5 h-5 text-amber-400" /> Invoices & Billing Portal
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Daftar Tagihan & Invoice Perusahaan {session.company.name}.
        </p>
      </div>

      {/* Overdue Warning Alert Banner if any */}
      {overdueInvoices.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm text-white">Perhatian: {overdueInvoices.length} Invoice Memasuki Masa Overdue</div>
              <p className="text-slate-300 mt-0.5">
                Silakan lakukan konfirmasi pembayaran untuk menghindari penundaan jadwal milestone proyek.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/portal/tickets/new')}
            className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs shrink-0 transition"
          >
            Hubungi Tim Finance
          </button>
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          Belum ada tagihan Invoice yang diterbitkan untuk {session.company.name}.
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-500/40 transition"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    #{inv.invoiceNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    inv.status === 'PAID'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : inv.status === 'OVERDUE'
                      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{inv.projectName}</h3>
                <div className="text-xs text-slate-400 mt-1">
                  Tanggal: {inv.invoiceDate} | Jatuh Tempo: <strong className="text-slate-200">{inv.dueDate}</strong>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <div className="text-xs text-slate-400">
                  Total: <span className="text-white font-bold">{fmtCurrency(inv.grandTotal, inv.currency)}</span>
                </div>
                <div className="text-xs font-extrabold text-amber-400">
                  Outstanding: {fmtCurrency(inv.outstandingAmount, inv.currency)}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/invoice/view?id=${inv.id}&token=${inv.secureToken}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" /> View & Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerPortalLayout>
  );
};
