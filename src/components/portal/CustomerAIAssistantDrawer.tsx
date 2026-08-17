import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, AlertCircle, CheckCircle2, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { AIChatMessage, AICustomerAssistantService } from '../../services/AICustomerAssistantService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  companyName: string;
}

export const CustomerAIAssistantDrawer: React.FC<Props> = ({ isOpen, onClose, companyId, companyName }) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Halo! Saya **AI Client Assistant SMART-AI.ID** khusus untuk **${companyName}**.\n\nAnda dapat bertanya mengenai progress proyek, rincian tagihan invoice, atau status support ticket secara riil. Ada yang bisa saya bantu hari ini?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'GENERAL'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setLoading(true);

    try {
      const res = await AICustomerAssistantService.answerClientQuestion(companyId, companyName, query);
      const assistantMsg: AIChatMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: res.category
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba beberapa saat lagi.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-[#0d131f] border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">AI Client Assistant</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  SMART-AI
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Isolated to {companyName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-slate-400 text-[11px] font-medium whitespace-nowrap pl-2">Saran:</span>
          <button
            onClick={() => handleSend('Bagaimana progress project saya?')}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 whitespace-nowrap transition"
          >
            📊 Progress Project
          </button>
          <button
            onClick={() => handleSend('Invoice mana yang belum dibayar?')}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 whitespace-nowrap transition"
          >
            💳 Invoice Outstanding
          </button>
          <button
            onClick={() => handleSend('Bagaimana status ticket saya?')}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 whitespace-nowrap transition"
          >
            🎫 Status Ticket Support
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 bg-cyan-950/30 border border-cyan-800/40 p-3 rounded-xl w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" /> Menganalisis data proyek & finansial {companyName}...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Tanyakan progress, invoice, atau ticket..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || loading}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold disabled:opacity-50 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-500" /> AI hanya mengakses data publik & authorized untuk perusahaan Anda.
          </div>
        </div>
      </div>
    </div>
  );
};
