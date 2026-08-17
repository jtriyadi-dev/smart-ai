import React from 'react';

interface PageSkeletonLoaderProps {
  title?: string;
  type?: 'dashboard' | 'table' | 'cards' | 'editor';
}

export const PageSkeletonLoader: React.FC<PageSkeletonLoaderProps> = ({
  title = 'Memuat modul SMART-AI.ID...',
  type = 'dashboard'
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="space-y-2">
          <div className="h-7 w-64 bg-slate-800/80 rounded-md" />
          <div className="h-4 w-96 max-w-full bg-slate-800/50 rounded-md" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-28 bg-slate-800/60 rounded-xl" />
          <div className="h-10 w-36 bg-cyan-950/40 rounded-xl" />
        </div>
      </div>

      {type === 'dashboard' && (
        <>
          {/* Metric Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-slate-800/80 rounded" />
                  <div className="w-8 h-8 rounded-lg bg-slate-800/60" />
                </div>
                <div className="h-7 w-32 bg-slate-700/60 rounded" />
              </div>
            ))}
          </div>

          {/* Main Visual / Chart Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
              <div className="h-5 w-48 bg-slate-800 rounded" />
              <div className="h-52 bg-slate-800/40 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
              </div>
            </div>
            <div className="h-80 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="h-5 w-36 bg-slate-800 rounded" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-12 bg-slate-800/50 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {type === 'table' && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center pb-4">
            <div className="h-10 w-72 bg-slate-800 rounded-xl" />
            <div className="h-10 w-32 bg-slate-800 rounded-xl" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div key={row} className="h-14 bg-slate-800/40 rounded-lg flex items-center px-4 gap-4">
                <div className="h-4 w-1/4 bg-slate-700/60 rounded" />
                <div className="h-4 w-1/4 bg-slate-700/40 rounded" />
                <div className="h-4 w-1/6 bg-slate-700/40 rounded" />
                <div className="h-4 w-1/6 bg-slate-700/40 rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center pt-2 text-xs text-slate-500 font-mono">
        {title}
      </div>
    </div>
  );
};
