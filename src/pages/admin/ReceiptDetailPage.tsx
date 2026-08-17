import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, CheckCircle2, Receipt as ReceiptIcon } from 'lucide-react';
import { Receipt, Invoice } from '../../types';
import { ReceiptService } from '../../services/ReceiptService';
import { InvoiceService } from '../../services/InvoiceService';
import { FinancialDocumentService } from '../../services/FinancialDocumentService';
import { navigateTo } from '../../lib/router';

export const ReceiptDetailPage: React.FC = () => {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const invId = parts[3]; // /admin/invoices/:id/receipt

    if (invId) {
      const inv = InvoiceService.getInvoiceById(invId);
      if (inv) {
        setInvoice(inv);
        const rcp = ReceiptService.getReceiptsForInvoice
          ? ReceiptService.getReceiptsForInvoice(inv.id)[0]
          : ReceiptService.getAllReceipts().find((r) => r.invoiceId === inv.id);
        if (rcp) {
          setReceipt(rcp);
        } else {
          // Fallback receipt view if created from latest payment
          const defaultRcp: Receipt = {
            id: `rcp_fallback`,
            receiptNumber: `SAI-RCP-2026-0001`,
            paymentId: 'pay_01',
            paymentNumber: 'TRX-20260814-001',
            invoiceId: inv.id,
            invoiceNumber: inv.invoiceNumber,
            companyName: inv.companyName,
            contactName: inv.contactName,
            projectName: inv.projectName,
            amount: inv.paidAmount > 0 ? inv.paidAmount : inv.grandTotal,
            currency: inv.currency,
            issuedAt: new Date().toISOString(),
            paymentMethod: 'Bank Transfer (BCA)',
            referenceNumber: 'TRX-20260814-001',
            remainingBalance: inv.outstandingAmount,
            notes: `Official Payment Receipt for Invoice ${inv.invoiceNumber}`,
            status: 'ISSUED',
            createdBy: 'Finance Admin'
          };
          setReceipt(defaultRcp);
        }
      }
    }
  }, []);

  if (!receipt || !invoice) return null;

  const handlePrint = () => {
    FinancialDocumentService.printDocument('receipt-pdf-container');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pt-20 pb-16">
      {/* Top Bar */}
      <div className="max-w-3xl mx-auto px-4 mb-6 flex items-center justify-between no-print">
        <button
          onClick={() => navigateTo(`/admin/invoices/${invoice.id}`)}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-3.5 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Detail Invoice</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Receipt PDF</span>
        </button>
      </div>

      {/* RECEIPT DOCUMENT CONTAINER */}
      <div
        id="receipt-pdf-container"
        className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200 relative overflow-hidden"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none z-10">
          <span className="text-8xl font-black tracking-widest rotate-[-25deg] text-emerald-600 uppercase">
            {receipt.status}
          </span>
        </div>

        {/* Header Branding */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b-2 border-emerald-600 pb-6 mb-6 gap-4">
          <div>
            <div className="text-xl font-black text-slate-900 tracking-wider">SMART-AI.ID</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">PT SMART AI INDONESIA</div>
            <div className="text-xs text-slate-500">Gedung Menara Mandiri Lt. 18, Jakarta Selatan</div>
          </div>

          <div className="sm:text-right">
            <div className="text-2xl font-black text-emerald-700 tracking-tight">PAYMENT RECEIPT</div>
            <div className="text-sm font-bold text-slate-800 mt-0.5">{receipt.receiptNumber}</div>
            <div className="text-xs text-slate-500 mt-1">Tanggal Terbit: {receipt.issuedAt.split('T')[0]}</div>
          </div>
        </div>

        {/* Receipt Content Body */}
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="font-semibold text-slate-400 block mb-1 uppercase">DITERIMA DARI (RECEIVED FROM):</span>
              <div className="font-bold text-sm text-slate-900">{receipt.companyName}</div>
              <div className="text-slate-600 mt-0.5">u.p. {receipt.contactName}</div>
            </div>

            <div>
              <span className="font-semibold text-slate-400 block mb-1 uppercase">UNTUK PEMBAYARAN:</span>
              <div className="font-bold text-slate-900">{receipt.projectName}</div>
              <div className="text-indigo-600 font-semibold mt-0.5">Invoice: {receipt.invoiceNumber}</div>
            </div>
          </div>

          <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
              JUMLAH PEMBAYARAN DITERIMA (AMOUNT RECEIVED)
            </span>
            <div className="text-3xl font-black text-emerald-700">
              {receipt.currency} {receipt.amount.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="font-medium text-slate-500 block">Metode Pembayaran:</span>
              <span className="font-bold text-slate-800">{receipt.paymentMethod}</span>
            </div>

            <div>
              <span className="font-medium text-slate-500 block">No Referensi:</span>
              <span className="font-bold text-slate-800 font-mono">{receipt.referenceNumber}</span>
            </div>

            <div>
              <span className="font-medium text-slate-500 block">Sisa Saldo Tagihan:</span>
              <span className="font-bold text-amber-600">
                {receipt.currency} {receipt.remainingBalance.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {receipt.notes && (
            <div className="p-3 bg-slate-50 rounded-lg text-slate-600 italic">
              Catatan: {receipt.notes}
            </div>
          )}
        </div>

        {/* Footer Signature */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
          <div>
            <div className="font-bold text-slate-800">PT SMART AI INDONESIA</div>
            <div className="text-[11px] text-slate-400">Kwitansi resmi tercatat secara digital.</div>
          </div>

          <div className="text-right">
            <div className="font-bold text-slate-900 mb-6">Finance & Treasury</div>
            <div className="text-[10px] text-slate-400">Verified Stamp & Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
};
