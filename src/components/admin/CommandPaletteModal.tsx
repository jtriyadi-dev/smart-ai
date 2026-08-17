import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, FileText, Globe, Users, Briefcase, FileCode, Layers, ArrowRight } from 'lucide-react';
import { AdminControlService } from '../../services/AdminControlService';
import { useRouter } from '../../lib/router';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    leads: any[];
    customers: any[];
    projects: any[];
    documents: any[];
    content: any[];
  }>({ leads: [], customers: [], projects: [], documents: [], content: [] });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const res = AdminControlService.globalSearch(query);
      setResults(res);
    } else {
      setResults({ leads: [], customers: [], projects: [], documents: [], content: [] });
    }
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    results.leads.length +
    results.customers.length +
    results.projects.length +
    results.documents.length +
    results.content.length;

  const handleSelect = (link: string) => {
    navigate(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search leads, customers, projects, invoices, proposals, articles... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500 font-sans"
          />
          <button onClick={onClose} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {query.trim().length === 0 ? (
            <div className="py-8 text-center text-slate-500 space-y-2">
              <p className="font-mono text-cyan-400">COMMAND CENTER SEARCH</p>
              <p className="text-[11px]">Ketik kata kunci untuk mencari Leads, Customer, Project, Proposal, Invoice, atau Artikel Blog.</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-400">
              Pencarian untuk "<span className="text-white font-bold">{query}</span>" tidak ditemukan.
            </div>
          ) : (
            <>
              {results.leads.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                    LEADS ({results.leads.length})
                  </div>
                  {results.leads.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.link)}
                      className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-bold text-white">{item.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              {results.customers.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider mb-1">
                    CUSTOMERS ({results.customers.length})
                  </div>
                  {results.customers.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.link)}
                      className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-bold text-white">{item.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              {results.projects.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
                    PROJECTS ({results.projects.length})
                  </div>
                  {results.projects.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.link)}
                      className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-bold text-white">{item.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              {results.documents.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                    DOCUMENTS ({results.documents.length})
                  </div>
                  {results.documents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.link)}
                      className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-bold text-white">{item.title}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400">
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {results.content.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider mb-1">
                    CONTENT ({results.content.length})
                  </div>
                  {results.content.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.link)}
                      className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-rose-400" />
                        <span className="font-bold text-white">{item.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between font-mono">
          <span>Gunakan panah & enter untuk memilih</span>
          <span>SMART-AI.ID Enterprise Search</span>
        </div>
      </div>
    </div>
  );
};
