import React from 'react';
import { Link } from '../../lib/router';
import { ChevronRight, Home, Layers } from 'lucide-react';

interface IndustryBreadcrumbProps {
  industryName: string;
}

export const IndustryBreadcrumb: React.FC<IndustryBreadcrumbProps> = ({ industryName }) => {
  return (
    <div className="bg-slate-950 border-b border-slate-800/80 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link to="/" className="hover:text-cyan-400 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/solutions" className="hover:text-cyan-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Industry Solutions</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-300 font-semibold">{industryName}</span>
        </nav>
      </div>
    </div>
  );
};
