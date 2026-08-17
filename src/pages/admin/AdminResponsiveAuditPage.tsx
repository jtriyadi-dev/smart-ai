import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  RotateCw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Download,
  Copy,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  Layers,
  Globe,
  Sliders,
  ChevronRight,
  Eye
} from 'lucide-react';
import {
  ResponsiveAuditService,
  DevicePreset,
  ResponsiveCheckItem
} from '../../services/ResponsiveAuditService';

export const AdminResponsiveAuditPage: React.FC = () => {
  const presets = ResponsiveAuditService.DEVICE_PRESETS;
  const auditItems = ResponsiveAuditService.AUDIT_ITEMS;
  const summary = ResponsiveAuditService.getAuditSummary();

  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(presets[1]); // Default Galaxy S23
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [targetUrl, setTargetUrl] = useState<string>('/');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Active simulated dimensions
  const activeWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
  const activeHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

  const filteredAuditItems =
    filterCategory === 'ALL'
      ? auditItems
      : auditItems.filter(
          (item) =>
            item.targetCategory.toLowerCase().includes(filterCategory.toLowerCase()) ||
            item.component.toLowerCase().includes(filterCategory.toLowerCase())
        );

  const handleCopyReport = () => {
    const reportText = `# SMART-AI.ID CROSS-DEVICE RESPONSIVE UI/UX AUDIT REPORT
Generated: ${new Date().toLocaleString('id-ID')}
Target Version: ${summary.appVersion}
Score: ${summary.overallScore}/100

## 1. Executive Summary
- Total Devices Evaluated: ${summary.totalDevicesTested} presets (320px to 2560px)
- Total Checkpoints: ${summary.totalCheckpoints}
- Passed: ${summary.passedCount}
- Fixed: ${summary.fixedCount}
- Untested (Physical Foldable Hardware): ${summary.untestedCount}

## 2. Checkpoints Matrix
${auditItems
  .map(
    (i) =>
      `- [${i.status}] ${i.component} (${i.targetCategory}): ${i.testAspect} -> ${i.detail}`
  )
  .join('\n')}

## 3. Compliance & Architectural Notes
- Mobile Navigation touch targets >= 44px
- Responsive Tables with overflow-x-auto protection
- No horizontal body layout shifts or cuts
- iOS Safe Area Insets (env(safe-area-inset-bottom)) integrated
`;

    navigator.clipboard.writeText(reportText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'MOBILE':
        return <Smartphone className="w-4 h-4" />;
      case 'TABLET':
        return <Tablet className="w-4 h-4" />;
      case 'LAPTOP':
        return <Laptop className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Responsive & UI/UX Audit Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Cross-Device Testing & Viewport Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Simulasi interaktif 12 preset resolusi (Android, iPhone, iPad, MacBook, Desktop) dan verifikasi kepatuhan arsitektur Mobile-First SMART-AI.ID.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyReport}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 transition shadow"
          >
            {copySuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Salin Audit Report (MD)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-medium text-slate-400">Overall Readiness</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1">
            {summary.overallScore}%
          </div>
          <div className="text-[11px] text-emerald-500/90 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Production Grade Verified</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-medium text-slate-400">Device Presets</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
            {summary.totalDevicesTested}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Android, iPhone, iPad, macOS, Windows
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-medium text-slate-400">Audit Checkpoints</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-1">
            {summary.passedCount + summary.fixedCount} / {summary.totalCheckpoints}
          </div>
          <div className="text-[11px] text-cyan-500/90 mt-1">
            {summary.fixedCount} Optimasi Responsive Dilakukan
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-medium text-slate-400">Min Touch Target</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono mt-1">
            44 x 44 px
          </div>
          <div className="text-[11px] text-purple-400/90 mt-1">
            WCAG 2.2 AA Compliant
          </div>
        </div>
      </div>

      {/* SECTION: LIVE DEVICE SIMULATOR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>Interactive Device Frame Simulator</span>
            </h2>
            <p className="text-xs text-slate-400">
              Uji rendering halaman secara real-time pada frame viewport berukuran presisi.
            </p>
          </div>

          {/* Controls toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick URL Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="bg-transparent text-white font-mono focus:outline-none cursor-pointer"
              >
                <option value="/" className="bg-slate-900">/ (Landing Page)</option>
                <option value="/builder" className="bg-slate-900">/builder (AI App Builder)</option>
                <option value="/estimator" className="bg-slate-900">/estimator (Cost Estimator)</option>
                <option value="/portal" className="bg-slate-900">/portal (Customer Portal)</option>
                <option value="/admin/crm" className="bg-slate-900">/admin/crm (CRM Kanban)</option>
                <option value="/admin/invoices" className="bg-slate-900">/admin/invoices (Invoices & Billing)</option>
              </select>
            </div>

            {/* Orientation Rotate */}
            <button
              onClick={() => setIsLandscape(!isLandscape)}
              title="Putar Orientasi (Portrait / Landscape)"
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                isLandscape
                  ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <RotateCw className="w-4 h-4" />
              <span className="hidden sm:inline">{isLandscape ? 'Landscape' : 'Portrait'}</span>
            </button>

            {/* Zoom Slider */}
            <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
                className="p-1 text-slate-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-white font-mono min-w-[40px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.2, Number((z + 0.1).toFixed(2))))}
                className="p-1 text-slate-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Device Presets Horizontal Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {presets.map((dev) => {
            const isSelected = selectedDevice.id === dev.id;
            return (
              <button
                key={dev.id}
                onClick={() => setSelectedDevice(dev)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-500 text-cyan-200 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {getCategoryIcon(dev.category)}
                <span>{dev.name}</span>
                <span className="text-[10px] font-mono text-slate-500">
                  {dev.width}x{dev.height}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Frame Canvas Container */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center overflow-x-auto min-h-[560px]">
          <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-3">
            <span>
              Device: <strong className="text-white">{selectedDevice.name}</strong>
            </span>
            <span>•</span>
            <span>
              Viewport: <strong className="text-cyan-400">{activeWidth}px × {activeHeight}px</strong>
            </span>
            <span>•</span>
            <span>
              DPR: <strong className="text-purple-400">{selectedDevice.dpr}x</strong>
            </span>
          </div>

          {/* Mock Physical Frame */}
          <div
            style={{
              width: `${activeWidth * zoomLevel}px`,
              height: `${activeHeight * zoomLevel}px`,
              transition: 'all 0.3s ease-in-out'
            }}
            className="relative bg-slate-900 border-4 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Device Notch / Status Bar for Mobile */}
            {selectedDevice.category === 'MOBILE' && (
              <div className="h-6 bg-slate-950 text-slate-400 text-[10px] px-4 flex items-center justify-between shrink-0 border-b border-slate-800 select-none">
                <span>09:41</span>
                <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto"></div>
                <span>5G 100%</span>
              </div>
            )}

            {/* Simulated Content Iframe */}
            <div className="flex-1 w-full h-full relative bg-slate-950 overflow-hidden">
              <iframe
                src={targetUrl}
                title={`Device Simulator: ${selectedDevice.name}`}
                className="w-full h-full border-0"
                style={{
                  width: `${activeWidth}px`,
                  height: `${activeHeight}px`,
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left'
                }}
              />
            </div>

            {/* Bottom Home Indicator for Mobile */}
            {selectedDevice.category === 'MOBILE' && (
              <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0 border-t border-slate-800">
                <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION: AUDIT CHECKPOINTS MATRIX */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <span>Cross-Device Verification Matrix (12 Breakpoints)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Hasil audit komponen UI/UX terhadap standard responsiveness dan accessibility.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterCategory === 'ALL'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Semua ({auditItems.length})
            </button>
            <button
              onClick={() => setFilterCategory('Mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterCategory === 'Mobile'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mobile Only
            </button>
            <button
              onClick={() => setFilterCategory('Tablet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterCategory === 'Tablet'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Tablet Only
            </button>
          </div>
        </div>

        {/* Checkpoint Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                <th className="py-3 px-4">Komponen & Target</th>
                <th className="py-3 px-4">Aspek Uji</th>
                <th className="py-3 px-4">Kriteria Standar</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Catatan Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredAuditItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{item.component}</div>
                    <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                      {item.targetCategory}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                    {item.testAspect}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 max-w-xs">
                    {item.criterion}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.status === 'PASS' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>PASS</span>
                      </span>
                    ) : item.status === 'FIXED' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        <Sparkles className="w-3 h-3" />
                        <span>OPTIMIZED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <Clock className="w-3 h-3" />
                        <span>UNTESTED</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {item.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
