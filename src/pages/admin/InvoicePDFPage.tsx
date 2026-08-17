import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Download, Share2 } from 'lucide-react';
import { Invoice } from '../../types';
import { InvoiceService } from '../../services/InvoiceService';
import { FinancialDocumentService } from '../../services/FinancialDocumentService';
import { navigateTo } from '../../lib/router';

export const InvoicePDFPage: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const invId = parts[3]; // /admin/invoices/:id/preview

    if (invId) {
      const inv = InvoiceService.getInvoiceById(invId);
      if (inv) {
        setInvoice(inv);
      }
    }
  }, []);

  if (!invoice) return null;

  const watermark = FinancialDocumentService.getInvoiceWatermark(invoice);

  const handlePrint = () => {
    FinancialDocumentService.printDocument('invoice-pdf-container');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pt-20 pb-16">
      {/* Top Controls Toolbar */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex items-center justify-between no-print">
        <button
          onClick={() => navigateTo(`/admin/invoices/${invoice.id}`)}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-3.5 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Detail Invoice</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Print PDF</span>
          </button>
        </div>
      </div>

      {/* A4 PRINTABLE DOCUMENT CONTAINER */}
      <div
        id="invoice-pdf-container"
        className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200 relative overflow-hidden"
      >
        {/* WATERMARK OVERLAY IF DRAFT, PAID, CANCELLED */}
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

        {/* HEADER BRANDING */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b-2 border-slate-900 pb-6 mb-8 gap-4">
          <div>
            <div className="text-2xl font-black tracking-wider text-slate-900">SMART-AI.ID</div>
            <div className="text-xs text-slate-500 font-medium mt-1">PT SMART AI INDONESIA</div>
            <div className="text-xs text-slate-500">Gedung Menara Mandiri Lt. 18, Jl. Jend. Sudirman, Jakarta</div>
            <div className="text-xs text-slate-500">Email: billing@smart-ai.id • Telp: +62 21 8062 9000</div>
          </div>

          <div className="sm:text-right">
            <div className="text-3xl font-black text-indigo-900 tracking-tight">INVOICE</div>
            <div className="text-sm font-bold text-slate-800 mt-1">{invoice.invoiceNumber}</div>
            <div className="text-xs text-slate-600 mt-1">
              Tanggal: <span className="font-semibold text-slate-900">{invoice.invoiceDate}</span>
            </div>
            <div className="text-xs text-slate-600">
              Jatuh Tempo: <span className="font-bold text-rose-600">{invoice.dueDate}</span>
            </div>
          </div>
        </div>

        {/* BILL TO & PROJECT INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2">BILL TO (CLIENT):</span>
            <div className="font-bold text-sm text-slate-900">{invoice.companyName}</div>
            <div className="text-slate-700 mt-0.5">u.p. {invoice.contactName}</div>
            <div className="text-slate-600 mt-0.5">{invoice.contactEmail} • {invoice.contactPhone}</div>
            <div className="text-slate-600 mt-1">{invoice.companyAddress}</div>
            {invoice.taxId && <div className="text-slate-500 mt-1">NPWP: {invoice.taxId}</div>}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2">INFORMASI PROYEK:</span>
            <div className="font-bold text-sm text-slate-900">{invoice.projectName}</div>
            <div className="text-slate-600 mt-0.5">Industri: {invoice.industry}</div>
            {invoice.quotationNumber && (
              <div className="text-indigo-600 font-semibold mt-1">Quotation Ref: {invoice.quotationNumber}</div>
            )}
            {invoice.milestoneName && (
              <div className="text-amber-800 font-semibold mt-1">
                Termin: {invoice.milestoneName} ({invoice.milestonePercentage}%)
              </div>
            )}
            <div className="text-slate-600 mt-1">Terms: {invoice.paymentTerms}</div>
          </div>
        </div>

        {/* LINE ITEMS TABLE */}
        <div className="mb-8">
          <table className="w-full text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-bold uppercase">
                <th className="py-2.5 px-3">No</th>
                <th className="py-2.5 px-3">Deskripsi Layanan / Item</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Harga Satuan</th>
                <th className="py-2.5 px-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {invoice.items.map((it, idx) => (
                <tr key={it.id}>
                  <td className="py-3 px-3 font-medium text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{it.description}</td>
                  <td className="py-3 px-3 text-center">
                    {it.quantity} {it.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-medium">
                    {invoice.currency} {it.unitPrice.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    {invoice.currency} {it.subtotal.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FINANCIAL SUMMARY BOX */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-8 text-xs gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md w-full">
            <span className="font-bold text-slate-900 block mb-1">REKENING BANK PEMBAYARAN:</span>
            <div className="font-bold text-indigo-900">{invoice.bankDetails?.bankName || 'Bank Central Asia (BCA)'}</div>
            <div>Atas Nama: <strong className="text-slate-800">{invoice.bankDetails?.accountName || 'PT SMART AI INDONESIA'}</strong></div>
            <div>No Rekening: <strong className="text-slate-900 font-mono text-sm">{invoice.bankDetails?.accountNumber || '888-0912-334'}</strong></div>
            <div className="mt-2 text-slate-600 text-[11px] italic">{invoice.paymentInstructions}</div>
          </div>

          <div className="w-full sm:w-72 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold">{invoice.currency} {invoice.subtotal.toLocaleString('id-ID')}</span>
            </div>

            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
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

        {/* FOOTER SIGNATURE & NOTES */}
        <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
          <div>
            <div className="font-semibold text-slate-700">PT SMART AI INDONESIA</div>
            <div>Invoice resmi diterbitkan oleh sistem komputer berwenang.</div>
          </div>

          <div className="text-right">
            <div className="font-bold text-slate-900 mb-8">Finance & Treasury Department</div>
            <div className="text-[11px] text-slate-400">Authorized Digital Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
};
