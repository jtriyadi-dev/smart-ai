import React, { useState, useEffect } from 'react';
import {
  FileText,
  ArrowLeft,
  CreditCard,
  Download,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
  Share2,
  Building2,
  Calendar,
  XCircle,
  Eye,
  Receipt as ReceiptIcon,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Invoice, Payment, Receipt } from '../../types';
import { InvoiceService } from '../../services/InvoiceService';
import { PaymentService } from '../../services/PaymentService';
import { ReceiptService } from '../../services/ReceiptService';
import { navigateTo } from '../../lib/router';

export const InvoiceDetailPage: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Parse ID from current URL path (/admin/invoices/:id)
    const path = window.location.pathname;
    const parts = path.split('/');
    const invId = parts[3]; // /admin/invoices/:id

    if (invId) {
      const inv = InvoiceService.getInvoiceById(invId);
      if (inv) {
        setInvoice(inv);
        setPayments(PaymentService.getPaymentsForInvoice(inv.id));
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendReminder = () => {
    if (!invoice) return;
    try {
      const updated = InvoiceService.sendInvoiceReminder(invoice.id, 'Email', 'Finance Admin');
      setInvoice({ ...updated });
      showToast(`Pengingat pembayaran telah dikirim ke ${invoice.contactEmail}`);
    } catch (e: any) {
      showToast(e.message || 'Gagal mengirim pengingat');
    }
  };

  const handleCancelInvoice = () => {
    if (!invoice || !cancelReason.trim()) return;
    try {
      const updated = InvoiceService.cancelInvoice(invoice.id, cancelReason, 'Finance Admin');
      setInvoice({ ...updated });
      setShowCancelModal(false);
      showToast(`Invoice ${invoice.invoiceNumber} berhasil dibatalkan.`);
    } catch (e: any) {
      showToast(e.message || 'Gagal membatalkan invoice.');
    }
  };

  if (!invoice) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md shadow-sm">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Invoice Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Data invoice yang Anda cari tidak tersedia di storage sistem.
          </p>
          <button
            onClick={() => navigateTo('/admin/invoices')}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
          >
            Kembali ke Dashboard Invoice
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (invoice.status) {
      case 'DRAFT':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700 border border-slate-300">DRAFT</span>;
      case 'SENT':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">SENT</span>;
      case 'PARTIALLY_PAID':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">PARTIALLY PAID</span>;
      case 'PAID':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">PAID</span>;
      case 'OVERDUE':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200">OVERDUE</span>;
      case 'CANCELLED':
        return <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-200 text-slate-500 line-through">CANCELLED</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16">
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Nav Back & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <button
            onClick={() => navigateTo('/admin/invoices')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Invoice</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
              <button
                onClick={() => navigateTo(`/admin/invoices/${invoice.id}/payments`)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow"
              >
                <CreditCard className="w-4 h-4" />
                <span>Catat Pembayaran (Record Payment)</span>
              </button>
            )}

            <button
              onClick={() => navigateTo(`/admin/invoices/${invoice.id}/preview`)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>

            {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
              <button
                onClick={handleSendReminder}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pengingat</span>
              </button>
            )}

            <button
              onClick={() => {
                const url = `${window.location.origin}/invoice/view/${invoice.secureToken}`;
                navigator.clipboard.writeText(url);
                showToast('Link Publik Customer Portal berhasil disalin!');
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Share2 className="w-4 h-4" />
              <span>Salin Link Client</span>
            </button>

            {invoice.status !== 'CANCELLED' && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="inline-flex items-center space-x-1 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 border border-rose-200 rounded-lg"
              >
                <XCircle className="w-4 h-4" />
                <span>Batalkan</span>
              </button>
            )}
          </div>
        </div>

        {/* MAIN INVOICE CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          {/* Header & Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{invoice.invoiceNumber}</span>
                {getStatusBadge()}
              </div>
              <p className="text-xs text-slate-500">
                Diterbitkan pada {invoice.invoiceDate} • Jatuh tempo pada{' '}
                <strong className="text-slate-800">{invoice.dueDate}</strong>
              </p>
            </div>

            <div className="text-right sm:text-right bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Sisa Tagihan (Outstanding)</div>
              <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">
                {invoice.currency} {invoice.outstandingAmount.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Total Invoice: {invoice.currency} {invoice.grandTotal.toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          {/* Customer & Billing Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50/70 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wide text-slate-400 block mb-2">BILL TO (CLIENT):</span>
              <div className="font-bold text-sm text-slate-900">{invoice.companyName}</div>
              <div className="text-slate-700 mt-1">u.p. {invoice.contactName}</div>
              <div className="text-slate-600 mt-0.5">{invoice.contactEmail} • {invoice.contactPhone}</div>
              <div className="text-slate-600 mt-1">{invoice.companyAddress}</div>
              {invoice.taxId && <div className="text-slate-500 mt-1">NPWP: {invoice.taxId}</div>}
            </div>

            <div>
              <span className="font-bold uppercase tracking-wide text-slate-400 block mb-2">INFORMASI PROYEK & QUOTATION:</span>
              <div className="font-semibold text-slate-900">{invoice.projectName}</div>
              <div className="text-slate-600 mt-1">Industri: {invoice.industry}</div>
              {invoice.quotationNumber && (
                <div className="text-indigo-600 font-medium mt-1">Rujukan Quotation: {invoice.quotationNumber}</div>
              )}
              {invoice.milestoneName && (
                <div className="text-amber-700 font-medium mt-1">Termin: {invoice.milestoneName} ({invoice.milestonePercentage}%)</div>
              )}
              <div className="text-slate-600 mt-1">Syarat Pembayaran: {invoice.paymentTerms}</div>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">RINCIAN TAGIHAN (INVOICE ITEMS)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs font-semibold uppercase border-b border-slate-200">
                    <th className="py-2.5 px-3">Layanan / Item</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Harga Satuan</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-3 font-medium text-slate-900">{item.description}</td>
                      <td className="py-3 px-3 text-slate-600">{item.category}</td>
                      <td className="py-3 px-3 text-center">{item.quantity} {item.unit}</td>
                      <td className="py-3 px-3 text-right text-slate-700">
                        {invoice.currency} {item.unitPrice.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">
                        {invoice.currency} {item.subtotal.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FINANCIAL TOTALS */}
            <div className="mt-6 flex justify-end">
              <div className="w-full sm:w-80 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{invoice.currency} {invoice.subtotal.toLocaleString('id-ID')}</span>
                </div>

                {invoice.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Diskon Komersial:</span>
                    <span>- {invoice.currency} {invoice.discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Pajak ({invoice.taxName} {invoice.taxRate}%):</span>
                  <span className="font-semibold">{invoice.currency} {invoice.taxAmount.toLocaleString('id-ID')}</span>
                </div>

                <div className="pt-2 border-t border-slate-300 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Grand Total:</span>
                  <span>{invoice.currency} {invoice.grandTotal.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between text-emerald-600 font-bold pt-1">
                  <span>Total Terbayar:</span>
                  <span>{invoice.currency} {invoice.paidAmount.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between text-amber-600 font-black text-sm pt-1 border-t border-slate-200">
                  <span>Sisa Tagihan (Outstanding):</span>
                  <span>{invoice.currency} {invoice.outstandingAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT HISTORY & RECEIPTS */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center justify-between">
              <span>RIWAYAT PEMBAYARAN & OFFICIAL RECEIPTS ({payments.length})</span>
              {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
                <button
                  onClick={() => navigateTo(`/admin/invoices/${invoice.id}/payments`)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  + Catat Transaksi Baru
                </button>
              )}
            </h3>

            {payments.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-500 text-xs">
                Belum ada transaksi pembayaran yang dicatat untuk invoice ini.
              </div>
            ) : (
              <div className="space-y-3">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-3"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{p.paymentNumber}</span>
                        <span className="text-slate-500">• {p.paymentDate}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                          {p.paymentMethod} ({p.bank})
                        </span>
                      </div>
                      <div className="text-slate-600 mt-1">Ref: {p.referenceNumber} • Catatan: {p.notes}</div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-extrabold text-sm text-emerald-600">
                          {p.currency} {p.amount.toLocaleString('id-ID')}
                        </div>
                        {p.receiptNumber && (
                          <div className="text-[10px] text-indigo-600 font-semibold">Receipt: {p.receiptNumber}</div>
                        )}
                      </div>

                      <button
                        onClick={() => navigateTo(`/admin/invoices/${invoice.id}/receipt`)}
                        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                        title="Lihat Receipt"
                      >
                        <ReceiptIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AUDIT LOG TIMELINE */}
          <div className="pt-6 border-t border-slate-200 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wide mb-3">FINANCIAL AUDIT TRAIL</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {invoice.auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between">
                  <div>
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="text-slate-600 ml-2">— {log.details}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono ml-4 flex-shrink-0">
                    {log.performedBy} • {new Date(log.timestamp).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Batalkan Invoice {invoice.invoiceNumber}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Membatalkan invoice akan mengubah status menjadi CANCELLED. Invoice tidak dapat digunakan untuk pembayaran baru.
            </p>

            <label className="block text-xs font-semibold text-slate-700 mb-1">Alasan Pembatalan (Mandatory):</label>
            <textarea
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="e.g. Pembatalan proyek / Re-issued replacement invoice..."
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
              >
                Kembali
              </button>
              <button
                onClick={handleCancelInvoice}
                disabled={!cancelReason.trim()}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 disabled:opacity-50"
              >
                Konfirmasi Pembatalan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
