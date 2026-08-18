import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, ArrowRight, MessageSquare, Sparkles, User, ShieldCheck, Cpu, Workflow, Boxes, Calculator, FileText, FileCheck, BookOpen, Layers, Globe } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Solusi Industri', path: '/solutions' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Teknologi', path: '/teknologi' },
    { name: 'Tentang Kami', path: '/tentang-kami' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const secondaryPortalLinks = [
    { name: 'Industry Solutions', path: '/solutions', icon: Boxes },
    { name: 'Blog Insights', path: '/blog', icon: BookOpen },
    { name: 'Blog CMS Admin', path: '/admin/blog', icon: FileText },
    { name: 'SEO Engine', path: '/admin/seo', icon: Globe },
    { name: 'AI Builder', path: '/ai-app-builder', icon: Cpu },
    { name: 'Req Analyzer', path: '/ai-requirement-analyzer', icon: Cpu },
    { name: 'AI Modules', path: '/ai-module-generator', icon: Boxes },
    { name: 'AI Estimator', path: '/ai-project-estimator', icon: Calculator },
    { name: 'AI Architect', path: '/ai-solution-architect', icon: Workflow },
    { name: 'AI Sales', path: '/admin/ai-sales-assistant', icon: Sparkles },
    { name: 'Proposals', path: '/admin/proposals', icon: FileText },
    { name: 'Quotations', path: '/admin/quotations', icon: FileCheck },
    { name: 'Invoices', path: '/admin/invoices', icon: Calculator },
    { name: 'Support Admin', path: '/admin/support', icon: ShieldCheck },
    { name: 'Client Helpdesk', path: '/portal/tickets', icon: MessageSquare },
    { name: 'AI Business Copilot', path: '/admin/copilot', icon: Sparkles },
    { name: 'Knowledge Base', path: '/admin/knowledge', icon: BookOpen },
    { name: 'CRM System', path: '/admin/crm', icon: ShieldCheck },
    { name: 'CRM Leads', path: '/admin/leads', icon: ShieldCheck },
    { name: 'Portfolio Admin', path: '/admin/portfolio', icon: Layers },
    { name: 'Admin', path: '/admin', icon: ShieldCheck },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.querySelector(path);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(path);
        if (el) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          window.scrollTo({
            top: elementRect - bodyRect - offset,
            behavior: 'smooth'
          });
        }
      }
    } else {
      onNavigate(path);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Halo Tim SMART-AI.ID, saya ingin berkonsultasi mengenai pembuatan aplikasi web custom berbasis AI untuk perusahaan kami.');
    window.open(`https://wa.me/6285187869164?text=${text}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentPath !== '/'
          ? 'bg-[#06090e]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all shrink-0">
              <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div className="flex flex-col whitespace-nowrap justify-center">
              <div className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap leading-none">
                SMART-AI<span className="text-cyan-400">.ID</span>
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-mono whitespace-nowrap leading-tight mt-0.5">
                Enterprise AI &amp; Web
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0a0f1d]/90 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Desktop Portals & CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={() => handleLinkClick('/ai-app-builder')}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                currentPath === '/ai-app-builder'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-slate-700'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Builder</span>
            </button>

            <button
              onClick={() => handleLinkClick('/ai-module-generator')}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                currentPath === '/ai-module-generator'
                  ? 'bg-purple-950 text-purple-300 border-purple-500'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-purple-300 hover:border-slate-700'
              }`}
            >
              <Boxes className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Modules</span>
            </button>

            <button
              onClick={() => handleLinkClick('/ai-solution-architect')}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                currentPath === '/ai-solution-architect'
                  ? 'bg-blue-950 text-blue-300 border-blue-500'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-blue-300 hover:border-slate-700'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Architect</span>
            </button>

            <button
              onClick={() => handleLinkClick('/login')}
              className="px-3 py-1.5 text-xs font-mono font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Login</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="btn-primary px-4 py-2 text-xs font-bold flex items-center gap-2 cursor-pointer glow-primary-cta"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Mulai Konsultasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="btn-primary px-3 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Konsultasi</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Full-Width Mobile Navigation Overlay Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-50 bg-[#06090e]/98 backdrop-blur-2xl border-t border-slate-800 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-6 max-w-lg mx-auto w-full">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Navigasi Utama
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links list */}
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.path)}
                    className={`w-full px-4 py-3 text-sm font-semibold rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/50 font-bold'
                        : 'text-slate-200 hover:bg-slate-900 hover:text-white border border-transparent'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Portals grid */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Portal System
              </span>
              <div className="grid grid-cols-3 gap-2">
                {secondaryPortalLinks.map((portal) => {
                  const IconComp = portal.icon;
                  return (
                    <button
                      key={portal.name}
                      onClick={() => handleLinkClick(portal.path)}
                      className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono text-slate-300 hover:text-cyan-300 flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      <IconComp className="w-4 h-4 text-cyan-400" />
                      <span className="text-[11px] font-medium">{portal.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Actions */}
          <div className="pt-6 mt-6 border-t border-slate-800 max-w-lg mx-auto w-full space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp();
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Konsultasi Cepat via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="btn-primary w-full py-3.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Konsultasi Gratis</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};

