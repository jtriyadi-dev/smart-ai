import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Download,
  MessageSquare,
  Building,
  User,
  Clock,
  Layers,
  Send
} from 'lucide-react';
import { useRouter } from '../../lib/router';
import { Quotation } from '../../types';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';
import { CurrencyService } from '../../services/CurrencyService';

export const PublicQuotationViewPage: React.FC = () => {
  const { currentPath } = useRouter();

  // Extract secure token from path e.g. /quotation/view/qtn_sec_xxx
  const secureToken = currentPath.replace('/quotation/view/', '');

  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [responseStatus, setResponseStatus] = useState<'ACCEPTED' | 'REVISION_REQUESTED'>('ACCEPTED');
  const [signerName, setSignerName] = useState('');
  const [signerPosition, setSignerPosition] = useState('');
  const [signerComment, setSignerComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (secureToken) {
      // Track view automatically
      QuotationDocumentService.trackView(secureToken);
      const q = QuotationDocumentService.getQuotationBySecureToken(secureToken);
      if (q) {
        setQuotation(q);
        setSignerName(q.contactName || '');
        setSignerPosition(q.contactPosition || '');
      }
    }
  }, [secureToken]);

  if (!quotation) {
    return (
      <div className="min-h-screen bg-[#06090e] text-white p-8 text-center pt-32 flex flex-col items-center justify-center">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-2">Penawaran Tidak Ditemukan atau Tautan Kadaluarsa</h2>
          <p className="text-xs text-slate-400">Silakan hubungi tim tim sales SMART-AI.ID untuk mendapatkan tautan penawaran resmi terbaru.</p>
        </div>
      </div>
    );
  }

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = QuotationDocumentService.recordCustomerResponse(
      secureToken,
      responseStatus,
      signerComment,
      signerName,
      signerPosition
    );
    if (updated) {
      setQuotation(updated);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 font-sans p-4 sm:p-6 lg:p-8 pt-12 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Public Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-black text-xl tracking-wider uppercase mb-1">
              <Sparkles className="w-6 h-6 fill-cyan-400" /> SMART-AI.ID
            </div>
            <p className="text-xs text-slate-400">Enterprise AI Solution & Custom Software Engineering</p>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 inline-block">
              Official Quotation • {quotation.status}
            </span>
            <div className="text-xs font-mono text-slate-400 mt-1">{quotation.quotationNumber} ({quotation.version})</div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
          <h1 className="text-2xl font-extrabold text-white mb-2">{quotation.projectName}</h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            Yang terhormat <strong>{quotation.contactName}</strong> ({quotation.contactPosition}), berikut adalah Dokumen Penawaran Harga Komersial Resmi (Official Quotation) dari PT SMART AI INDONESIA.
          </p>
        </div>

        {/* Overview Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Penerima Penawaran</span>
            <div className="font-bold text-white text-sm">{quotation.companyName}</div>
            <div className="text-slate-400">{quotation.contactName}</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Masa Berlaku Penawaran</span>
            <div className="font-bold text-slate-200 text-xs">{quotation.quotationDate} s/d {quotation.validUntil}</div>
            <div className="text-[10px] text-slate-500">Validity: {quotation.validityDays} Hari</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              {quotation.pricingModel === 'Monthly' ? 'Total Layanan Bulanan' : 'Total Nilai Investasi'}
            </span>
            <div className="font-mono font-black text-emerald-400 text-lg">
              {CurrencyService.formatCurrency(quotation.grandTotal, quotation.currency)}
              {quotation.pricingModel === 'Monthly' && <span className="text-xs font-normal text-slate-400 ml-1">/ bulan</span>}
            </div>
            {quotation.recurringMonthly > 0 && quotation.pricingModel !== 'Monthly' && (
              <div className="text-[11px] text-purple-400 font-mono mt-0.5">
                + {CurrencyService.formatCurrency(quotation.recurringMonthly, quotation.currency)} / bln (SLA)
              </div>
            )}
            <div className="mt-1">
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                quotation.pricingModel === 'Monthly'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : quotation.pricingModel === 'Hybrid'
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              }`}>
                {quotation.pricingModel === 'Monthly' ? '🔄 Layanan Bulanan (OpEx)' : quotation.pricingModel === 'Hybrid' ? '⚡ Hybrid Model' : '💎 CapEx (Sekali Bayar)'}
              </span>
            </div>
          </div>
        </div>

        {/* Scope Items Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-cyan-400" /> Rincian Modul & Item Penawaran
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Nama & Deskripsi Item</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Harga Satuan</th>
                  <th className="p-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {quotation.items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-3 font-semibold text-cyan-300">{item.category}</td>
                    <td className="p-3">
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400">{item.description}</div>
                    </td>
                    <td className="p-3 text-center">{item.quantity} {item.unit}</td>
                    <td className="p-3 text-right font-mono">{CurrencyService.formatCurrency(item.unitPrice, quotation.currency)}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-400">{CurrencyService.formatCurrency(item.subtotal, quotation.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono">{CurrencyService.formatCurrency(quotation.subtotal, quotation.currency)}</span>
              </div>
              {quotation.discountAmount > 0 && (
                <div className="flex justify-between text-rose-400">
                  <span>Diskon Komersial:</span>
                  <span className="font-mono">- {CurrencyService.formatCurrency(quotation.discountAmount, quotation.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Pajak ({quotation.taxName}):</span>
                <span className="font-mono">{CurrencyService.formatCurrency(quotation.taxAmount, quotation.currency)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-cyan-300 pt-2 border-t border-slate-800">
                <span>{quotation.pricingModel === 'Monthly' ? 'Grand Total Bulanan:' : 'Grand Total:'}</span>
                <span className="font-mono text-emerald-400 text-base">
                  {CurrencyService.formatCurrency(quotation.grandTotal, quotation.currency)}
                  {quotation.pricingModel === 'Monthly' && <span className="text-xs font-normal text-slate-400 ml-1">/ bulan</span>}
                </span>
              </div>
              {quotation.recurringMonthly > 0 && quotation.pricingModel !== 'Monthly' && (
                <div className="flex justify-between text-xs text-purple-400 pt-1">
                  <span>Retainer Bulanan (SLA):</span>
                  <span className="font-mono">{CurrencyService.formatCurrency(quotation.recurringMonthly, quotation.currency)} / bln</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Milestone Terms */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Jadwal Pembayaran (Milestone Terms):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {quotation.paymentMilestones.map((m) => (
              <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white">{m.milestoneName} ({m.percentage}%)</div>
                <div className="font-mono text-cyan-400 font-bold mt-1">{CurrencyService.formatCurrency(m.amount, quotation.currency)}</div>
                <div className="text-[10px] text-slate-400 mt-1">{m.dueCondition}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Approval Interactive Response Card */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tanggapan & Persetujuan Klien</h3>
              <p className="text-xs text-slate-400">Pilih tindakan persetujuan resmi di bawah ini.</p>
            </div>
          </div>

          {isSubmitted || quotation.customerResponse ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs space-y-1">
              <div className="font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Tanggapan Anda Telah Terdaftar!
              </div>
              <p>Status Tanggapan: <strong>{quotation.customerResponse?.status}</strong></p>
              <p>Ditandatangani oleh: <strong>{quotation.customerResponse?.signerName}</strong> ({quotation.customerResponse?.signerPosition})</p>
              {quotation.customerResponse?.comment && <p>Catatan: "{quotation.customerResponse?.comment}"</p>}
            </div>
          ) : (
            <form onSubmit={handleSubmitResponse} className="space-y-4 text-xs">
              <div className="flex gap-4">
                <label className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                  responseStatus === 'ACCEPTED' ? 'bg-cyan-500/10 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="responseStatus"
                    value="ACCEPTED"
                    checked={responseStatus === 'ACCEPTED'}
                    onChange={() => setResponseStatus('ACCEPTED')}
                    className="text-cyan-500"
                  />
                  <div>
                    <div className="font-bold text-xs">Setujui & Terima Penawaran</div>
                    <div className="text-[10px] text-slate-400">Penawaran disetujui untuk proses penandatanganan kontrak.</div>
                  </div>
                </label>

                <label className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                  responseStatus === 'REVISION_REQUESTED' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="responseStatus"
                    value="REVISION_REQUESTED"
                    checked={responseStatus === 'REVISION_REQUESTED'}
                    onChange={() => setResponseStatus('REVISION_REQUESTED')}
                    className="text-amber-500"
                  />
                  <div>
                    <div className="font-bold text-xs">Minta Penyesuaian / Revisi</div>
                    <div className="text-[10px] text-slate-400">Mengajukan perubahan scope, skema milestone, atau diskon.</div>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nama Lengkap Penanggung Jawab *</label>
                  <input
                    type="text"
                    required
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Jabatan / Position *</label>
                  <input
                    type="text"
                    required
                    value={signerPosition}
                    onChange={(e) => setSignerPosition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Catatan / Pesan Tambahan</label>
                <textarea
                  rows={3}
                  value={signerComment}
                  onChange={(e) => setSignerComment(e.target.value)}
                  placeholder="Tuliskan instruksi atau catatan khusus..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Kirim Tanggapan Resmi
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
