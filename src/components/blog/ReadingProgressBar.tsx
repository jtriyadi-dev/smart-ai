import React, { useState, useEffect } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [completion, setCompletion] = useState<number>(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollCompletion);
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-900">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-150"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};
