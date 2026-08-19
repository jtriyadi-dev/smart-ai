import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PWAService } from './services/pwaService';

// Initialize PWA Service Worker
PWAService.registerServiceWorker();

interface GlobalErrorState {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<{ children: ReactNode }, GlobalErrorState> {
  public override state: GlobalErrorState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): GlobalErrorState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled runtime error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 font-bold text-xl">
              !
            </div>
            <h1 className="text-xl font-bold text-white">SMART-AI.ID</h1>
            <p className="text-sm text-slate-300">
              Aplikasi sedang memuat pembaruan sistem. Silakan klik tombol di bawah untuk memuat ulang halaman.
            </p>
            {this.state.error && (
              <p className="text-xs text-rose-400/80 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-left overflow-x-auto">
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
);
