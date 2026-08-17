import React, { useEffect, useState } from 'react';
import { Printer, ArrowLeft, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from '../../lib/router';
import { Quotation } from '../../types';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';
import { CurrencyService } from '../../services/CurrencyService';

export const QuotationPDFPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Extract ID e.g. /admin/quotations/QTN-123/pdf
  const quotationId = currentPath.replace('/admin/quotations/', '').replace('/pdf', '');

  const [quotation, setQuotation] = useState<Quotation | null>(null);

  useEffect(() => {
    if (quotationId) {
      const q = QuotationDocumentService.getQuotationById(quotationId);
      if (q) setQuotation(q);
    }
  }, [quotationId]);

  if (!quotation) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 text-center pt-32">
        <h2>Quotation tidak ditemukan.</h2>
        <button
          onClick={() => navigate('/admin/quotations')}
          className="mt-4 px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Kembali
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 font-sans print:bg-white print:p-0 p-4 sm:p-8 pt-24">
      
      {/* Print Control Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-6 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/admin/quotations/${quotation.id}`)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-white">Official Printable Quotation Document</h3>
            <p className="text-xs text-slate-400">{quotation.quotationNumber} • {quotation.companyName}</p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Cetak / Download PDF
        </button>
      </div>

      {/* Official Quotation Letter Paper A4 Container */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl print:shadow-none print:max-w-none print:w-full print:p-0 print:rounded-none">
        
        {/* Letterhead */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-slate-950 font-black text-2xl tracking-wider uppercase mb-1">
              <Sparkles className="w-6 h-6 text-cyan-600 fill-cyan-600" /> SMART-AI.ID
            </div>
            <p className="text-xs text-slate-600 font-semibold">PT SMART AI INDONESIA ENTERPRISE</p>
            <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed mt-1">
              Menara Multimedia Lt. 18, Jl. Kebon Sirih No. 12, Jakarta Pusat 10110<br />
              Email: commercial@smart-ai.id | Hotline: +62 21 555 8899
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-black text-cyan-800 tracking-wider uppercase">OFFICIAL QUOTATION</h2>
            <div className="text-xs font-mono font-bold text-slate-900 mt-1">{quotation.quotationNumber}</div>
            <div className="text-[10px] font-semibold text-slate-500">Versi: {quotation.version}</div>
            <div className="mt-2 text-[11px] text-slate-600">
              Tanggal: <strong>{quotation.quotationDate}</strong><br />
              Masa Berlaku: <strong>{quotation.validUntil}</strong>
            </div>
          </div>
        </div>

        {/* Customer Address & Project Info Box */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Diberikan Kepada (Customer):</span>
            <div className="font-extrabold text-slate-900 text-sm">{quotation.companyName}</div>
            <div className="text-slate-700 font-medium">{quotation.contactName} ({quotation.contactPosition})</div>
            <div className="text-slate-500">{quotation.contactEmail} • {quotation.contactPhone}</div>
            <div className="text-slate-500 mt-1">{quotation.companyAddress}</div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Rincian Proyek:</span>
            <div className="font-bold text-slate-900 text-xs">{quotation.projectName}</div>
            <div className="text-slate-600">Paket: <strong className="text-cyan-700">{quotation.packageName}</strong></div>
            <div className="text-slate-600">Platform: {quotation.platform}</div>
            <div className="text-slate-600">Industri: {quotation.industry}</div>
            <div className="text-slate-600 mt-1">
              Model Finansial: <strong className="text-cyan-800">
                {quotation.pricingModel === 'Monthly' ? 'Layanan Bulanan (OpEx / SaaS)' : quotation.pricingModel === 'Hybrid' ? 'Hybrid (CapEx + SLA Bulanan)' : 'Investasi Sekali Bayar (CapEx)'}
              </strong>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[10px] uppercase">
                <th className="p-3 w-12 text-center">No</th>
                <th className="p-3">Modul / Deskripsi Item</th>
                <th className="p-3 text-center w-16">Qty</th>
                <th className="p-3 text-right w-32">Harga Satuan</th>
                <th className="p-3 text-right w-36">Total Harga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {quotation.items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="p-3 text-center font-bold">{idx + 1}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-950">{item.name}</div>
                    <div className="text-[11px] text-slate-600 leading-snug">{item.description}</div>
                  </td>
                  <td className="p-3 text-center">{item.quantity} {item.unit}</td>
                  <td className="p-3 text-right font-mono">{CurrencyService.formatCurrency(item.unitPrice, quotation.currency)}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-950">{CurrencyService.formatCurrency(item.subtotal, quotation.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-72 space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono font-bold">{CurrencyService.formatCurrency(quotation.subtotal, quotation.currency)}</span>
            </div>
            {quotation.discountAmount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>Diskon:</span>
                <span className="font-mono font-bold">- {CurrencyService.formatCurrency(quotation.discountAmount, quotation.currency)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{quotation.taxName} ({quotation.taxRate}%):</span>
              <span className="font-mono font-bold">{CurrencyService.formatCurrency(quotation.taxAmount, quotation.currency)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-950 border-t-2 border-slate-900 pt-2">
              <span>{quotation.pricingModel === 'Monthly' ? 'Grand Total Bulanan:' : 'Grand Total:'}</span>
              <span className="font-mono text-cyan-800">
                {CurrencyService.formatCurrency(quotation.grandTotal, quotation.currency)}
                {quotation.pricingModel === 'Monthly' && <span className="text-xs font-normal text-slate-600 ml-1">/ bulan</span>}
              </span>
            </div>
            {quotation.recurringMonthly > 0 && quotation.pricingModel !== 'Monthly' && (
              <div className="flex justify-between text-xs text-purple-700 font-bold pt-1">
                <span>Retainer Bulanan (SLA):</span>
                <span className="font-mono">{CurrencyService.formatCurrency(quotation.recurringMonthly, quotation.currency)} / bln</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Milestones */}
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Jadwal Pembayaran (Milestone Payment Terms):</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {quotation.paymentMilestones.map((m) => (
              <div key={m.id} className="p-2 bg-white rounded border border-slate-200">
                <div className="font-bold text-slate-900">{m.milestoneName} ({m.percentage}%)</div>
                <div className="font-mono text-cyan-700 font-bold mt-0.5">{CurrencyService.formatCurrency(m.amount, quotation.currency)}</div>
                <div className="text-[10px] text-slate-500 mt-1">{m.dueCondition}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Assumptions & Terms */}
        <div className="grid grid-cols-2 gap-6 text-[11px] text-slate-600 mb-12">
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Ketentuan & Garansi:</h5>
            <ul className="list-disc pl-4 space-y-1">
              <li>Penawaran berlaku hingga tanggal {quotation.validUntil}.</li>
              <li>Sudah mencakup garansi pemeliharaan sistem selama 6 bulan.</li>
              <li>Perubahan spesifikasi di luar lampiran ditagih via Change Request.</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Penerimaan & Legalitas:</h5>
            <p className="leading-relaxed">
              Dokumen ini diterbitkan secara sah oleh PT SMART AI INDONESIA. Persetujuan digital atau penandatanganan fisik dokumen ini mengikat kedua belah pihak.
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 text-center text-xs text-slate-900 pt-8 border-t border-slate-200">
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold mb-12">Disetujui Oleh (PT SMART AI INDONESIA):</p>
            <div className="font-bold text-sm underline">{quotation.approvedBy || 'Rahmat Wijaya'}</div>
            <div className="text-slate-500 text-[11px]">Director of Commercials</div>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold mb-12">Diterima Oleh (Klien):</p>
            <div className="font-bold text-sm underline">{quotation.contactName}</div>
            <div className="text-slate-500 text-[11px]">{quotation.contactPosition} • {quotation.companyName}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
