import React, { useState, useEffect, useRef } from 'react';
import { ChatbotService } from '../../services/ChatbotService';
import { ChatSession, ChatMessage, ChatActionCTA } from '../../types';
import { useRouter } from '../../lib/router';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  BookOpen,
  ChevronRight,
  User,
  PhoneCall,
  Calculator,
  Cpu,
  Workflow,
  Boxes,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Building,
  Mail,
  Phone
} from 'lucide-react';

interface FloatingChatbotProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({ currentPath = '/', onNavigate }) => {
  const router = useRouter();
  const navigate = onNavigate || router.navigate;

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  // Lead capture form state
  const [leadForm, setLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize or load session
    let existingSessions = ChatbotService.getSessions();
    if (existingSessions.length === 0) {
      const newSess = ChatbotService.createSession(undefined, undefined, currentPath);
      setSession(newSess);
      setMessages(ChatbotService.getMessages(newSess.id));
    } else {
      const activeSess = existingSessions[0];
      setSession(activeSess);
      setMessages(ChatbotService.getMessages(activeSess.id));
    }
  }, [currentPath]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || !session || isLoading) return;

    setInputValue('');
    setIsLoading(true);

    try {
      const updatedMessages = await ChatbotService.sendMessage(session.id, text);
      setMessages(ChatbotService.getMessages(session.id));
    } catch (e) {
      console.error('Error sending chatbot message:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCTAAction = (cta: ChatActionCTA) => {
    switch (cta.action) {
      case 'OPEN_ESTIMATOR':
        setIsOpen(false);
        navigate('/ai-project-estimator');
        break;
      case 'OPEN_REQUIREMENT_ANALYZER':
        setIsOpen(false);
        navigate('/ai-requirement-analyzer');
        break;
      case 'OPEN_ARCHITECT':
        setIsOpen(false);
        navigate('/ai-solution-architect');
        break;
      case 'OPEN_MODULE_GENERATOR':
        setIsOpen(false);
        navigate('/ai-module-generator');
        break;
      case 'OPEN_BUILDER':
        setIsOpen(false);
        navigate('/ai-app-builder');
        break;
      case 'CREATE_TICKET':
        setIsOpen(false);
        navigate('/portal/tickets/new');
        break;
      case 'LEAD_CAPTURE':
        setShowLeadModal(true);
        break;
      case 'OPEN_WHATSAPP':
        window.open('https://wa.me/6285187869164?text=Halo%20SMART-AI.ID%2C%20saya%20butuh%20bantuan', '_blank');
        break;
      default:
        if (cta.targetRoute) {
          setIsOpen(false);
          navigate(cta.targetRoute);
        }
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !leadForm.name || !leadForm.phone) return;

    const success = ChatbotService.captureLeadFromChat(session.id, leadForm);
    if (success) {
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadModal(false);
        setLeadSubmitted(false);
        setLeadForm({ name: '', company: '', email: '', phone: '', notes: '' });
        setMessages(ChatbotService.getMessages(session.id));
      }, 1500);
    }
  };

  const handleResetChat = () => {
    const newSess = ChatbotService.createSession(undefined, undefined, currentPath);
    setSession(newSess);
    setMessages(ChatbotService.getMessages(newSess.id));
  };

  const quickChips = [
    '💡 Saya butuh aplikasi custom',
    '🏭 Aplikasi bisnis tambang / pabrik',
    '🤖 Fitur AI yang bisa digunakan',
    '💰 Hitung estimasi biaya',
    '📞 Jadwalkan Konsultasi'
  ];

  return (
    <>
      {/* Floating Entry Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 group flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-300/30"
          aria-label="Open AI Assistant Chatbot"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 rounded-full bg-cyan-400/30 animate-ping opacity-75"></div>
            <Bot className="w-6 h-6 text-slate-950 fill-current relative z-10" />
          </div>
          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="text-[11px] font-mono text-cyan-200 uppercase font-bold tracking-wider leading-none">
              SMART-AI.ID
            </span>
            <span className="text-xs font-extrabold text-white leading-tight">AI Consultant</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950 animate-pulse"></div>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-6 right-6 w-80 h-16 rounded-2xl bg-slate-950 border border-cyan-500/30 shadow-2xl flex items-center justify-between px-4'
              : 'bottom-0 right-0 w-full h-full sm:bottom-6 sm:right-6 sm:w-[430px] sm:h-[640px] sm:rounded-3xl bg-[#080c14]/95 border border-slate-800 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">SMART-AI.ID AI</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">AI Solution Consultant & Sales</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Sesi Baru / Reset Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition hidden sm:block"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'USER' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-slate-500">
                      {msg.role === 'ASSISTANT' && (
                        <span className="flex items-center gap-1 text-cyan-400 font-bold">
                          <Sparkles className="w-3 h-3" /> SMART-AI Assistant
                        </span>
                      )}
                      {msg.role === 'USER' && <span className="text-slate-400 font-bold">Anda</span>}
                      <span>•</span>
                      <span>
                        {new Date(msg.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'USER'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-lg font-medium'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
                      }`}
                    >
                      {msg.content}

                      {/* Disclaimer Badge */}
                      {msg.metadata?.disclaimer && (
                        <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{msg.metadata.disclaimer}</span>
                        </div>
                      )}

                      {/* Source Citation */}
                      {msg.metadata?.sources && msg.metadata.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px]">
                          <div className="flex items-center gap-1 text-cyan-400 font-mono font-semibold mb-1">
                            <BookOpen className="w-3 h-3" /> Sumber: SMART-AI Knowledge Base
                          </div>
                          {msg.metadata.sources.map((src, idx) => (
                            <div key={idx} className="text-slate-400 flex items-center gap-1">
                              <span>•</span>
                              <span className="font-medium text-slate-300">{src.title}</span>
                              <span className="text-slate-500">({src.category})</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Interactive Action CTAs */}
                      {msg.metadata?.ctaButtons && msg.metadata.ctaButtons.length > 0 && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-800 flex flex-wrap gap-2">
                          {msg.metadata.ctaButtons.map((cta, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleCTAAction(cta)}
                              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 font-bold text-[11px] transition flex items-center gap-1.5 shadow-sm active:scale-95"
                            >
                              <span>{cta.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Suggested Questions */}
                    {msg.metadata?.suggestedQuestions && msg.metadata.suggestedQuestions.length > 0 && (
                      <div className="mt-2 space-y-1.5 max-w-[88%] text-[11px]">
                        <div className="text-[10px] font-mono text-slate-500 uppercase">Saran Pertanyaan:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.metadata.suggestedQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(q)}
                              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition text-left text-[11px]"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono p-3 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-[70%]">
                    <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>AI Solution Consultant sedang berpikir...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Chips Bar */}
              <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5 text-[10px]">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition shrink-0"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 pb-safe bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik pertanyaan atau kebutuhan aplikasi Anda..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition disabled:opacity-50 min-h-[44px]"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Kirim Pesan Chatbot"
                  className="p-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Lead Capture Modal inside Chat */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase mb-1">
                <PhoneCall className="w-4 h-4" /> KONSULTASI SOLUSI AI
              </div>
              <h3 className="text-lg font-bold text-white">Jadwalkan Konsultasi Gratis SMART-AI.ID</h3>
              <p className="text-xs text-slate-400 mt-1">
                Isi formulir singkat di bawah ini agar Tim Solution Architect & Sales dapat merancang rekomendasi aplikasi & estimasi resmi untuk perusahaan Anda.
              </p>
            </div>

            {leadSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 text-emerald-400 text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <div className="font-bold text-white text-sm">Permintaan Konsultasi Diterima!</div>
                <p className="text-slate-300">Tim kami akan segera menghubungi Anda melalui WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="e.g. Budi Santoso"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Perusahaan / Organisasi</label>
                  <input
                    type="text"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    placeholder="e.g. PT Batu Bara Nusantara"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="e.g. 081298765432"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Corporate</label>
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="e.g. budi@perusahaan.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Catatan Kebutuhan Aplikasi</label>
                  <textarea
                    rows={2}
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    placeholder="e.g. Kebutuhan aplikasi fleet management 200 truk tambang dengan GPS"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition"
                >
                  Kirim Permintaan Konsultasi
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
