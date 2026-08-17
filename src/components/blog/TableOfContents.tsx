import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ contentHtml }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse H2 and H3 from contentHtml
    const doc = new DOMParser().parseFromString(contentHtml, 'text/html');
    const elements = doc.querySelectorAll('h2, h3');
    const items: TOCItem[] = [];

    elements.forEach((el, index) => {
      const text = el.textContent || '';
      const id = 'section-' + index;
      const level = el.tagName === 'H2' ? 2 : 3;
      items.push({ id, text, level });
    });

    setHeadings(items);

    // Attach IDs to DOM elements in the actual content container after render
    setTimeout(() => {
      const container = document.getElementById('article-content-body');
      if (container) {
        const domHeadings = container.querySelectorAll('h2, h3');
        domHeadings.forEach((el, index) => {
          el.id = 'section-' + index;
          el.classList.add('scroll-mt-24'); // offset for fixed headers
        });
      }
    }, 100);
  }, [contentHtml]);

  if (headings.length === 0) return null;

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 my-6">
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
        <List className="w-4 h-4" />
        <span>TABLE OF CONTENTS</span>
      </div>

      <nav className="space-y-1 text-xs">
        {headings.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full text-left py-1 px-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              item.level === 3 ? 'ml-3 text-slate-400 hover:text-slate-200' : 'text-slate-300 font-semibold hover:text-cyan-300'
            } ${activeId === item.id ? 'bg-cyan-950/80 text-cyan-300 font-bold border-l-2 border-cyan-400' : ''}`}
          >
            <ChevronRight className={`w-3 h-3 shrink-0 ${item.level === 3 ? 'text-slate-600' : 'text-cyan-500'}`} />
            <span className="line-clamp-1">{item.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
