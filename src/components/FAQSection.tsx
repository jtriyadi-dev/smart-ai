import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  onOpenConsultation: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_ITEMS.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-[#070a12] border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Pertanyaan yang Sering <span className="text-gradient-cyan">Diajukan</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Temukan jawaban lengkap terkait proses pengembangan aplikasi custom, fitur AI, dukungan teknis, dan integrasi di SMART-AI.ID.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari pertanyaan Anda di sini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass-card rounded-xl border border-white/5 hover:border-slate-700 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold font-display text-white pr-2">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-cyan-950 border-cyan-500 text-cyan-400' : 'text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs bg-slate-900/60 rounded-xl border border-slate-800">
              Pertanyaan tidak ditemukan. Silakan hubungi kami langsung via WhatsApp untuk pertanyaan spesifik.
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center p-6 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-0.5">
            <div className="text-sm font-bold text-white">Masih Memiliki Pertanyaan Lain?</div>
            <div className="text-xs text-slate-400">Tim konsultan teknis kami siap memberikan penjelasan lengkap.</div>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tanyakan via WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
