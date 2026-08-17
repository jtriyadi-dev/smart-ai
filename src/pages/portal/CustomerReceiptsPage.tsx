import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { Receipt as ReceiptType } from '../../types';
import { CheckSquare, Eye, Download, Printer } from 'lucide-react';

export const CustomerReceiptsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const list = CustomerPortalService.getReceipts(s.company.id, s.company.name);
      setReceipts(list);
    }
  }, []);

  if (!session) return null;

  const fmtCurrency = (val: number, cur?: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: cur || 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <CustomerPortalLayout activePath="/portal/receipts">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-cyan-400" /> Official Payment Receipts
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Kuitansi Pembayaran Resmi (Payment Receipt) untuk {session.company.name}.
        </p>
      </div>

      {receipts.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          Belum ada Kuitansi Resmi yang diterbitkan untuk perusahaan Anda.
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map((r) => (
            <div
              key={r.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {r.receiptNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {r.status}
                  </span>
                </div>
                <div className="text-xs text-white font-bold">{r.projectName}</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Invoice: #{r.invoiceNumber} | Diterbitkan: {r.issuedAt ? new Date(r.issuedAt).toLocaleDateString('id-ID') : '-'}
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <div className="text-sm font-black text-cyan-300">
                  {fmtCurrency(r.amount, r.currency)}
                </div>
                <button
                  onClick={() => navigate(`/admin/invoices/${r.invoiceId}/receipt`)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerPortalLayout>
  );
};
