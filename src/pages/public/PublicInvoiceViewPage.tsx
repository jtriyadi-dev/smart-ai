import React, { useState, useEffect } from 'react';
import { Download, Printer, CheckCircle2, Clock, AlertTriangle, ShieldCheck, FileCheck, Receipt as ReceiptIcon } from 'lucide-react';
import { Invoice } from '../../types';
import { InvoiceService } from '../../services/InvoiceService';
import { FinancialDocumentService } from '../../services/FinancialDocumentService';

export const PublicInvoiceViewPage: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const tokenOrId = parts[parts.length - 1]; // /invoice/view/:secureToken

    if (tokenOrId) {
      const inv =
        InvoiceService.getInvoiceBySecureToken(tokenOrId) ||
        InvoiceService.getInvoiceById(tokenOrId);
      if (inv) {
        setInvoice(inv);
      }
    }
  }, []);

  if (!invoice) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center max-w-md shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">Invoice Tidak Ditemukan</h2>
          <p className="text-xs text-slate-400 mt-2">
            Tautan invoice ini mungkin tidak valid, telah kedaluwarsa, atau nomor token salah.
          </p>
        </div>
      </div>
    );
  }

  const watermark = FinancialDocumentService.getInvoiceWatermark(invoice);

  const handlePrint = () => {
    FinancialDocumentService.printDocument('public-invoice-container');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pt-20 pb-16">
      {/* Top Banner Branding for Client */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-600 text-white rounded-lg">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase">SMART-AI.ID CLIENT PORTAL</div>
            <div className="text-sm font-bold text-slate-900">Official Tagihan Invoice Digital</div>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 shadow"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Cetak PDF</span>
        </button>
      </div>

      {/* DOCUMENT CONTAINER */}
      <div
        id="public-invoice-container"
        className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200 relative overflow-hidden"
      >
        {watermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08] select-none z-10">
            <span
              className={`text-8xl sm:text-9xl font-black tracking-widest rotate-[-30deg] uppercase ${
                watermark === 'PAID'
                  ? 'text-emerald-600'
                  : watermark === 'CANCELLED'
                  ? 'text-rose-600'
                  : 'text-slate-900'
              }`}
            >
              {watermark}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b-2 border-slate-900 pb-6 mb-8 gap-4">
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-wider">SMART-AI.ID</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">PT SMART AI INDONESIA</div>
            <div className="text-xs text-slate-500">Gedung Menara Mandiri Lt. 18, Jakarta Selatan</div>
            <div className="text-xs text-slate-500">Email: billing@smart-ai.id</div>
          </div>

          <div className="sm:text-right">
            <div className="text-3xl font-black text-indigo-900">INVOICE</div>
            <div className="text-sm font-bold text-slate-800 mt-1">{invoice.invoiceNumber}</div>
            <div className="text-xs text-slate-600 mt-1">Tanggal: {invoice.invoiceDate}</div>
            <div className="text-xs text-slate-600">
              Jatuh Tempo: <span className="font-bold text-rose-600">{invoice.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2">TAGIHAN KEPADA (BILL TO):</span>
            <div className="font-bold text-sm text-slate-900">{invoice.companyName}</div>
            <div className="text-slate-700 mt-0.5">u.p. {invoice.contactName}</div>
            <div className="text-slate-600 mt-0.5">{invoice.contactEmail} • {invoice.contactPhone}</div>
            <div className="text-slate-600 mt-1">{invoice.companyAddress}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2">PROYEK & CATATAN:</span>
            <div className="font-bold text-sm text-slate-900">{invoice.projectName}</div>
            <div className="text-slate-600 mt-0.5">Syarat Pembayaran: {invoice.paymentTerms}</div>
            {invoice.milestoneName && (
              <div className="text-amber-800 font-semibold mt-1">
                Termin: {invoice.milestoneName} ({invoice.milestonePercentage}%)
              </div>
            )}
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-bold uppercase">
                <th className="py-2.5 px-3">No</th>
                <th className="py-2.5 px-3">Deskripsi Layanan</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Harga</th>
                <th className="py-2.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {invoice.items.map((it, idx) => (
                <tr key={it.id}>
                  <td className="py-3 px-3 text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{it.description}</td>
                  <td className="py-3 px-3 text-center">{it.quantity} {it.unit}</td>
                  <td className="py-3 px-3 text-right">{invoice.currency} {it.unitPrice.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-3 text-right font-bold">{invoice.currency} {it.subtotal.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Summary & Bank */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block mb-2 uppercase">REKENING BANK PEMBAYARAN:</span>
            <div className="font-bold text-indigo-900">{invoice.bankDetails?.bankName || 'Bank Central Asia (BCA)'}</div>
            <div>Atas Nama: <strong className="text-slate-800">{invoice.bankDetails?.accountName || 'PT SMART AI INDONESIA'}</strong></div>
            <div>No Rekening: <strong className="text-slate-900 font-mono text-sm">{invoice.bankDetails?.accountNumber || '888-0912-334'}</strong></div>
            <div className="text-slate-600 text-[11px] mt-2 italic">{invoice.paymentInstructions}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>{invoice.currency} {invoice.subtotal.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Pajak ({invoice.taxName} {invoice.taxRate}%):</span>
              <span>{invoice.currency} {invoice.taxAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="pt-2 border-t border-slate-300 flex justify-between text-sm font-black text-slate-900">
              <span>Grand Total:</span>
              <span>{invoice.currency} {invoice.grandTotal.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Terbayar:</span>
              <span>{invoice.currency} {invoice.paidAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between text-amber-600 font-black text-sm pt-1 border-t border-slate-200">
              <span>Sisa Tagihan:</span>
              <span>{invoice.currency} {invoice.outstandingAmount.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Secure Footer */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Dokumen Tagihan Resmi Terverifikasi SSL & Secure Digital Token</span>
          </div>
          <div>PT SMART AI INDONESIA</div>
        </div>
      </div>
    </div>
  );
};
