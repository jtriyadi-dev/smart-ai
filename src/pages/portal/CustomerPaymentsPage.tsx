import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { Payment } from '../../types';
import { CreditCard, CheckCircle2, Building2 } from 'lucide-react';

export const CustomerPaymentsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const list = CustomerPortalService.getPayments(s.company.id, s.company.name);
      setPayments(list);
    }
  }, []);

  if (!session) return null;

  const fmtCurrency = (val: number, cur?: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: cur || 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <CustomerPortalLayout activePath="/portal/payments">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" /> Payment History
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Riwayat Penerimaan Pembayaran untuk {session.company.name}.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-400">
          Belum ada riwayat pembayaran yang tercatat untuk perusahaan Anda.
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {p.paymentNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {p.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-semibold">
                  Invoice #{p.invoiceNumber}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Metode: {p.paymentMethod} | Ref: {p.referenceNumber} | Tanggal: {p.paymentDate}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-emerald-400">
                  {fmtCurrency(p.amount, p.currency)}
                </div>
                {p.receiptNumber && (
                  <button
                    onClick={() => navigate('/portal/receipts')}
                    className="text-[11px] text-cyan-400 hover:underline mt-1 block"
                  >
                    Receipt: {p.receiptNumber}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerPortalLayout>
  );
};
