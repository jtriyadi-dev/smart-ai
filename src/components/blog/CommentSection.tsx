import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/BlogService';
import { BlogComment } from '../../types';
import { MessageSquare, Send, CheckCircle2, User } from 'lucide-react';

interface CommentSectionProps {
  articleId: string;
  articleTitle: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ articleId, articleTitle }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = () => {
    const list = BlogService.getComments(articleId).filter((c) => c.status === 'APPROVED');
    setComments(list);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !commentText.trim()) return;

    BlogService.addComment({
      articleId,
      articleTitle,
      name,
      email,
      comment: commentText
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setCommentText('');

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="space-y-6 pt-8 border-t border-slate-800 my-12">
      <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
        <MessageSquare className="w-5 h-5 text-cyan-400" />
        <h3>Discussion & Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-slate-300 font-mono uppercase">Leave a Comment</h4>

        {submitted && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Terima kasih! Komentar Anda telah terkirim dan akan tampil setelah disetujui moderator.</span>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Your Email * (Not Published)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>

        <textarea
          rows={3}
          required
          placeholder="Share your thoughts or questions about this article..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white focus:outline-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Comment</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((cmt) => (
          <div key={cmt.id} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
                  {cmt.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-white">{cmt.name}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{new Date(cmt.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-9">{cmt.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
