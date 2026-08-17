import React, { useState, useEffect } from 'react';
import { Bot, Mail, Phone, MapPin, Globe, MessageSquare } from 'lucide-react';
import { WebsiteCMSContentService } from '../services/WebsiteCMSContentService';

export const Footer: React.FC = () => {
  const [footerContent, setFooterContent] = useState(
    WebsiteCMSContentService.getCMSData().contactFooter
  );

  useEffect(() => {
    const unsubscribe = WebsiteCMSContentService.subscribe((cms) => {
      setFooterContent(cms.contactFooter);
    });
    return () => unsubscribe();
  }, []);
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#04060a] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 shrink-0">
                <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col whitespace-nowrap justify-center">
                <div className="font-display font-extrabold text-xl text-white tracking-wider whitespace-nowrap leading-none">
                  {footerContent.brandName || 'SMART-AI.ID'}
                </div>
                <div className="text-[10px] text-cyan-400 tracking-widest uppercase font-mono whitespace-nowrap leading-tight mt-0.5">
                  {footerContent.tagline || 'AI-Powered Application Development'}
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              Perusahaan teknologi pengembang aplikasi web berbasis Artificial Intelligence (AI), custom business software, sistem informasi, dashboard bisnis, dan solusi transformasi digital untuk berbagai sektor industri di Indonesia.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              {footerContent.socialLinkedin && (
                <a href={footerContent.socialLinkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              )}
              <a href={`https://wa.me/${footerContent.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 flex items-center justify-center transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href={`mailto:${footerContent.officialEmail}`} className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-400 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Menu */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Menu Utama</h4>
            <ul className="space-y-2 font-normal">
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#layanan" onClick={(e) => handleNavClick(e, '#layanan')} className="hover:text-cyan-400 transition-colors">Layanan</a></li>
              <li><a href="#industri" onClick={(e) => handleNavClick(e, '#industri')} className="hover:text-cyan-400 transition-colors">Solusi Industri</a></li>
              <li><a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#teknologi" onClick={(e) => handleNavClick(e, '#teknologi')} className="hover:text-cyan-400 transition-colors">Teknologi</a></li>
              <li><a href="#tentang" onClick={(e) => handleNavClick(e, '#tentang')} className="hover:text-cyan-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-cyan-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Layanan Spesialis & SEO Target */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Topik & SEO Landing</h4>
            <ul className="space-y-2 text-[11px] font-normal">
              <li><a href="/jasa-pembuatan-aplikasi-ai" className="hover:text-cyan-400 transition-colors">Jasa Pembuatan Aplikasi AI</a></li>
              <li><a href="/jasa-pembuatan-aplikasi-web" className="hover:text-cyan-400 transition-colors">Jasa Pembuatan Aplikasi Web</a></li>
              <li><a href="/aplikasi-berbasis-ai" className="hover:text-cyan-400 transition-colors">Aplikasi Berbasis AI</a></li>
              <li><a href="/custom-software-indonesia" className="hover:text-cyan-400 transition-colors">Custom Software Indonesia</a></li>
              <li><a href="/ai-application-development" className="hover:text-cyan-400 transition-colors">AI Application Development</a></li>
              <li><a href="/software-development-indonesia" className="hover:text-cyan-400 transition-colors">Software Development Indonesia</a></li>
              <li><a href="/blog" className="hover:text-cyan-400 transition-colors">Blog Insights & Publication</a></li>
            </ul>
          </div>

          {/* Col 4: Kontak & Alamat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Kontak Perusahaan</h4>
            <div className="space-y-2.5 text-xs font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{footerContent.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{footerContent.phoneHotline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{footerContent.officialEmail}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-300">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>www.smart-ai.id</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            {footerContent.copyrightText || `© 2026 ${footerContent.companyLegalName}. All Rights Reserved.`}
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px]">
            <span>Domain: www.smart-ai.id</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

