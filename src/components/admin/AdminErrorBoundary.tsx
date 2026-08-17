import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AdminErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="glass-card max-w-lg w-full rounded-2xl p-8 border border-rose-500/30 bg-slate-950/90 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800 uppercase mb-2">
                MODULE ERROR CAUGHT
              </span>
              <h2 className="text-xl font-bold font-display text-white">
                {this.props.fallbackTitle || 'Gagal Memuat Komponen Modul'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Terjadi kesalahan runtime saat merender halaman ini. Data sistem Anda tetap aman.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left font-mono text-[11px] text-rose-300 overflow-x-auto max-h-24">
                {this.state.error.message || 'Unknown Error'}
              </div>
            )}

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Muat Ulang Modul</span>
              </button>
              <button
                onClick={() => {
                  window.location.href = '/admin';
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Kembali ke Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
