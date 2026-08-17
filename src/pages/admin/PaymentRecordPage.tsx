import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Upload,
  Receipt as ReceiptIcon,
  XCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Invoice, Payment, PaymentMethodType } from '../../types';
import { InvoiceService } from '../../services/InvoiceService';
import { PaymentService } from '../../services/PaymentService';
import { navigateTo } from '../../lib/router';

export const PaymentRecordPage: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Payment Form
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('IDR');
  const [appliedExchangeRate, setAppliedExchangeRate] = useState<number>(1);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('Bank Transfer');
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [externalReference, setExternalReference] = useState<string>('');
  const [bank, setBank] = useState<string>('Bank Central Asia (BCA)');
  const [account, setAccount] = useState<string>('888-0912-334');
  const [notes, setNotes] = useState<string>('');
  const [proofFileName, setProofFileName] = useState<string>('');

  // Overpayment state
  const [overpaymentAlert, setOverpaymentAlert] = useState<boolean>(false);
  const [overpaymentVal, setOverpaymentVal] = useState<number>(0);
  const [overpaymentOption, setOverpaymentOption] = useState<'CREDIT' | 'ALLOCATE' | 'REFUND'>('CREDIT');

  // Void modal
  const [voidPaymentId, setVoidPaymentId] = useState<string | null>(null);
  const [voidReason, setVoidReason] = useState<string>('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const invId = parts[3]; // /admin/invoices/:id/payments

    if (invId) {
      const inv = InvoiceService.getInvoiceById(invId);
      if (inv) {
        setInvoice(inv);
        setAmount(inv.outstandingAmount);
        setCurrency(inv.currency);
        setReferenceNumber(PaymentService.generatePaymentNumber());
        loadPayments(inv.id);
      }
    }
  }, []);

  const loadPayments = (invId: string) => {
    const pays = PaymentService.getPaymentsForInvoice(invId);
    setPayments(pays);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFileName(e.target.files[0].name);
    }
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!invoice) return;

    if (amount <= 0) {
      setErrorMessage('Jumlah pembayaran harus lebih dari 0. Pembayaran negatif tidak diperbolehkan.');
      return;
    }

    // Check overpayment
    if (amount > invoice.outstandingAmount && !overpaymentAlert) {
      setOverpaymentAlert(true);
      setOverpaymentVal(amount - invoice.outstandingAmount);
      return;
    }

    try {
      const result = PaymentService.recordPayment(
        {
          invoiceId: invoice.id,
          amount,
          currency,
          paymentDate,
          paymentMethod,
          referenceNumber,
          externalReference,
          bank,
          account,
          notes: notes || `Pembayaran diterima via ${paymentMethod}`,
          proofFileName,
          appliedExchangeRate,
          actor: 'Finance Admin'
        },
        invoice,
        (updatedInv) => {
          setInvoice(updatedInv);
        }
      );

      loadPayments(invoice.id);
      setOverpaymentAlert(false);
      showToast(`Pembayaran ${result.payment.paymentNumber} sebesar ${currency} ${amount.toLocaleString('id-ID')} berhasil dicatat & Official Receipt diterbitkan!`);

      // Reset form
      setAmount(Math.max(0, invoice.outstandingAmount - amount));
      setReferenceNumber(PaymentService.generatePaymentNumber());
      setNotes('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mencatat pembayaran.');
    }
  };

  const handleVoidPayment = () => {
    if (!invoice || !voidPaymentId || !voidReason.trim()) return;

    try {
      const res = PaymentService.voidPayment(
        voidPaymentId,
        voidReason,
        'Finance Admin',
        invoice,
        (updatedInv) => setInvoice(updatedInv)
      );

      loadPayments(invoice.id);
      setVoidPaymentId(null);
      setVoidReason('');
      showToast(res.message);
    } catch (e: any) {
      setErrorMessage(e.message || 'Gagal membatalkan pembayaran.');
    }
  };

  if (!invoice) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16">
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigateTo(`/admin/invoices/${invoice.id}`)}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Detail Invoice {invoice.invoiceNumber}</span>
          </button>
        </div>

        {/* Invoice Header Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">RECORD PAYMENT FOR</span>
            <h1 className="text-xl font-bold text-white mt-0.5">{invoice.invoiceNumber} — {invoice.companyName}</h1>
            <p className="text-xs text-slate-300 mt-1">Proyek: {invoice.projectName} • Jatuh Tempo: {invoice.dueDate}</p>
          </div>

          <div className="text-right bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="text-xs text-slate-400 font-medium">Sisa Tagihan (Outstanding)</div>
            <div className="text-2xl font-black text-amber-400 mt-0.5">
              {invoice.currency} {invoice.outstandingAmount.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Terbayar: {invoice.currency} {invoice.paidAmount.toLocaleString('id-ID')} / {invoice.currency} {invoice.grandTotal.toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* OVERPAYMENT WARNING MODAL/BANNER */}
        {overpaymentAlert && (
          <div className="mb-8 p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl shadow-sm text-xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Peringatan Keuangan: Overpayment Detected</span>
            </div>
            <p className="text-amber-800">
              Jumlah pembayaran dimasukkan ({currency} {amount.toLocaleString('id-ID')}) melebihi sisa tagihan ({currency} {invoice.outstandingAmount.toLocaleString('id-ID')}).
              Terdapat kelebihan bayar sebesar <strong className="text-amber-900">{currency} {overpaymentVal.toLocaleString('id-ID')}</strong>.
            </p>

            <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
              <span className="font-semibold text-slate-800 block">Pilih Opsi Penanganan Kelebihan Bayar:</span>
              <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="overpay"
                  checked={overpaymentOption === 'CREDIT'}
                  onChange={() => setOverpaymentOption('CREDIT')}
                  className="text-indigo-600"
                />
                <span>Catat sebagai Customer Deposit / Deposit Kredit Client untuk tagihan mendatang</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="overpay"
                  checked={overpaymentOption === 'ALLOCATE'}
                  onChange={() => setOverpaymentOption('ALLOCATE')}
                  className="text-indigo-600"
                />
                <span>Alokasikan ke Invoice Lain milik client ini</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="overpay"
                  checked={overpaymentOption === 'REFUND'}
                  onChange={() => setOverpaymentOption('REFUND')}
                  className="text-indigo-600"
                />
                <span>Proses Pengembalian Dana (Refund Request)</span>
              </label>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setOverpaymentAlert(false)}
                className="px-3.5 py-1.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Koreksi Jumlah
              </button>
              <button
                type="button"
                onClick={handleRecordPayment}
                className="px-4 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700"
              >
                Lanjutkan & Catat Transaksi
              </button>
            </div>
          </div>
        )}

        {/* PAYMENT RECORD FORM */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8 space-y-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-600" />
            Form Pencatatan Transaksi Pembayaran
          </h2>

          <form onSubmit={handleRecordPayment} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jumlah Pembayaran (Amount):</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currency}</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-12 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Transaksi Pembayaran:</label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Pembayaran:</label>
                <select
                  value={paymentMethod}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-semibold"
                >
                  <option value="Bank Transfer">Bank Transfer (Giro / VA / Fast)</option>
                  <option value="Cash">Cash / Tunai</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Payment Gateway">Payment Gateway / QRIS</option>
                  <option value="Other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Referensi Sistem (Auto):</label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-lg font-mono font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ref Bank Client (External Ref):</label>
                <input
                  type="text"
                  value={externalReference}
                  onChange={(e) => setExternalReference(e.target.value)}
                  placeholder="e.g. TRX-BCA-9876543"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Penerima / Rekening Tujuan:</label>
                <input
                  type="text"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  placeholder="e.g. Bank Central Asia (BCA)"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bukti Transfer / Payment Proof (Upload):</label>
                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer inline-flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>Pilih File Bukti...</span>
                    <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,.pdf" />
                  </label>
                  {proofFileName && <span className="text-xs text-emerald-600 font-semibold">{proofFileName}</span>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Pembayaran:</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Pelunasan termin 1 sesuai perjanjian..."
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 shadow-md flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Transaksi & Terbitkan Receipt</span>
              </button>
            </div>
          </form>
        </div>

        {/* PAYMENT HISTORY TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4">
            DAFTAR TRANSAKSI PEMBAYARAN TERDIRI ({payments.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs font-semibold uppercase border-b border-slate-200">
                  <th className="py-2.5 px-3">No Transaksi</th>
                  <th className="py-2.5 px-3">Tanggal</th>
                  <th className="py-2.5 px-3">Metode & Bank</th>
                  <th className="py-2.5 px-3">Jumlah</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500">
                      Belum ada pembayaran recorded.
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 px-3 font-bold text-slate-900">{p.paymentNumber}</td>
                      <td className="py-3 px-3 text-slate-600">{p.paymentDate}</td>
                      <td className="py-3 px-3 text-slate-600">
                        {p.paymentMethod} ({p.bank})
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-600">
                        {p.currency} {p.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                          VALID
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => navigateTo(`/admin/invoices/${invoice.id}/receipt`)}
                          className="inline-flex items-center space-x-1 text-indigo-600 hover:underline font-semibold"
                        >
                          <ReceiptIcon className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>

                        <button
                          onClick={() => setVoidPaymentId(p.id)}
                          className="inline-flex items-center space-x-1 text-rose-600 hover:text-rose-800 font-semibold"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Void</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VOID PAYMENT MODAL */}
      {voidPaymentId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Void Pembayaran</h3>
            <p className="text-xs text-slate-500 mb-4">
              Membatalkan pembayaran akan mengembalikan saldo outstanding invoice ini. Sesuai prinsip Financial Auditability, data transaksi tidak dihapus secara permanen.
            </p>

            <label className="block text-xs font-semibold text-slate-700 mb-1">Alasan Void Pembayaran (Mandatory):</label>
            <textarea
              rows={3}
              value={voidReason}
              onChange={(e) => setVoidReason(e.target.value)}
              placeholder="e.g. Salah input rekening / Batal transfer..."
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setVoidPaymentId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Kembali
              </button>
              <button
                onClick={handleVoidPayment}
                disabled={!voidReason.trim()}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 disabled:opacity-50"
              >
                Konfirmasi Void
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
