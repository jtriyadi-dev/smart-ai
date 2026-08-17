import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 border-y border-slate-800 my-8">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mr-2">
        <Share2 className="w-3.5 h-3.5 text-cyan-400" />
        <span>Share Article:</span>
      </div>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
      >
        <span>WhatsApp</span>
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
      >
        <span>LinkedIn</span>
      </a>

      {/* X / Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
      >
        <span>X (Twitter)</span>
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
      >
        <span>Facebook</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
};
