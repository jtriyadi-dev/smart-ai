import React, { useState } from 'react';
import { X, Send, Mail, MessageSquare, Link, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Quotation } from '../../types';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';

interface SendQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotation: Quotation;
  onSuccess?: () => void;
}

export const SendQuotationModal: React.FC<SendQuotationModalProps> = ({
  isOpen,
  onClose,
  quotation,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'email' | 'whatsapp'>('link');
  const [copied, setCopied] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(quotation.contactEmail || '');
  const [recipientPhone, setRecipientPhone] = useState(quotation.contactPhone || '');
  const [customMessage, setCustomMessage] = useState(
    `Halo Bp/Ibu ${quotation.contactName},\n\nBerikut kami sampaikan Dokumen Penawaran Resmi (Quotation) untuk proyek ${quotation.projectName}:\n\n` +
      `No. Quotation: ${quotation.quotationNumber} (${quotation.version})\n` +
      `Total Nilai: Rp ${quotation.grandTotal?.toLocaleString('id-ID')}\n` +
      `Masa Berluku: s/d ${quotation.validUntil}\n\n` +
      `Anda dapat meninjau rincian penawaran secara interaktif pada tautan berikut:`
  );

  const [emailIntegrationActive] = useState(false); // Flag for integration
  const [waIntegrationActive] = useState(false); // Flag for integration

  if (!isOpen) return null;

  const publicUrl = `${window.location.origin}/quotation/view/${quotation.secureToken}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    if (activeTab === 'email' && !emailIntegrationActive) {
      alert('Integration not configured. Modul pengiriman Email API Gateway belum dikonfigurasi.');
      return;
    }
    if (activeTab === 'whatsapp' && !waIntegrationActive) {
      alert('Integration not configured. Modul WhatsApp Business API Gateway belum dikonfigurasi.');
      return;
    }

    // Mark quotation status as SENT
    quotation.status = 'SENT';
    QuotationDocumentService.saveQuotation(quotation, 'Sales Representative');
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Kirim Official Quotation</h3>
            <p className="text-xs text-slate-400">{quotation.quotationNumber} • {quotation.companyName}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-800/60 p-1 rounded-xl mb-6 border border-slate-700/50">
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'link' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link className="w-3.5 h-3.5" /> Secure Link
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'whatsapp' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'email' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email
          </button>
        </div>

        {activeTab === 'link' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Tautan Publik Penawaran Resmi</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={publicUrl}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
              💡 Tautan ini dapat diakses secara langsung oleh Klien tanpa memerlukan login. Setiap kali Klien membuka tautan ini, statistik riwayat tampilan (View Tracker) akan tercatat otomatis.
            </p>
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Nomor WhatsApp Tujuan</label>
              <input
                type="text"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="+62 812..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            {!waIntegrationActive && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Integration not configured.</strong> Gateway WhatsApp API belum terpasang. Anda dapat menyalin teks di bawah dan mengirimkannya secara manual.
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Pesan Pengantar</label>
              <textarea
                rows={4}
                value={`${customMessage}\n${publicUrl}`}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Email Tujuan</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="klien@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            {!emailIntegrationActive && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Integration not configured.</strong> Service SMTP Email API belum aktif.
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Pesan Pengantar</label>
              <textarea
                rows={4}
                value={`${customMessage}\n${publicUrl}`}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleSend}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" /> Tandai Terkirim & Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
