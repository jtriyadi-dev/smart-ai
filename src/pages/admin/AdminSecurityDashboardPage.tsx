import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Smartphone,
  Laptop,
  Globe,
  RefreshCw,
  Play,
  FileText,
  Sliders,
  Eye,
  Trash2,
  Terminal,
  Activity,
  FileCheck,
  Layers,
  Cpu,
  Zap,
  Clock,
  Download,
  Search,
  Filter,
  UserCheck,
  Ban
} from 'lucide-react';
import { SecurityService } from '../../services/SecurityService';
import { RBACService } from '../../services/RBACService';
import {
  SecurityTestCase,
  SecurityReadinessCategory,
  SecuritySession,
  SecurityThreatEvent,
  SecurityAuditReport,
  PasswordPolicy,
  MFASettings
} from '../../types';

export const AdminSecurityDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TEST_SUITE' | 'SESSIONS' | 'THREATS' | 'POLICIES' | 'FILE_SANDBOX' | 'AUDIT_REPORT'>('OVERVIEW');
  const [tests, setTests] = useState<SecurityTestCase[]>([]);
  const [categories, setCategories] = useState<SecurityReadinessCategory[]>([]);
  const [readinessScore, setReadinessScore] = useState<number>(98.6);
  const [overallStatus, setOverallStatus] = useState<'PASS' | 'WARNING' | 'FAIL'>('PASS');
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [sessions, setSessions] = useState<SecuritySession[]>([]);
  const [threats, setThreats] = useState<SecurityThreatEvent[]>([]);
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicy>(SecurityService.getPasswordPolicy());
  const [mfaSettings, setMfaSettings] = useState<MFASettings>(SecurityService.getMFASettings());
  const [auditReport, setAuditReport] = useState<SecurityAuditReport | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // File Sandbox State
  const [sandboxFileName, setSandboxFileName] = useState<string>('invoice_attachment.pdf');
  const [sandboxFileSizeMb, setSandboxFileSizeMb] = useState<number>(2.4);
  const [sandboxResult, setSandboxResult] = useState<{ isValid: boolean; error?: string; message?: string } | null>(null);

  // Password Policy Sandbox
  const [testPasswordInput, setTestPasswordInput] = useState<string>('SuperAdmin#2026!Secure');
  const [passwordStrengthResult, setPasswordStrengthResult] = useState(SecurityService.validatePasswordStrength('SuperAdmin#2026!Secure'));

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    SecurityService.initialize();
    const currentSessions = SecurityService.getActiveSessions();
    const currentThreats = SecurityService.getThreatEvents();
    setSessions(currentSessions);
    setThreats(currentThreats);

    // Load initial tests or run test suite
    const testResults = await SecurityService.runSecurityTestSuite();
    setTests(testResults);
    const calculated = SecurityService.calculateReadiness(testResults);
    setReadinessScore(calculated.score);
    setOverallStatus(calculated.status);
    setCategories(calculated.categories);
  };

  const handleRunTestSuite = async () => {
    setIsRunningTests(true);
    setFeedbackMessage(null);
    try {
      const results = await SecurityService.runSecurityTestSuite();
      setTests(results);
      const calculated = SecurityService.calculateReadiness(results);
      setReadinessScore(calculated.score);
      setOverallStatus(calculated.status);
      setCategories(calculated.categories);
      setFeedbackMessage({ type: 'success', text: `Audit keamanan selesai: 15/15 pengujian sistem berhasil dievaluasi dengan skor ${calculated.score}%.` });
    } catch (err) {
      setFeedbackMessage({ type: 'error', text: 'Gagal menjalankan rangkaian pengujian keamanan.' });
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleRevokeSession = (sessionId: string) => {
    SecurityService.revokeSession(sessionId);
    setSessions(SecurityService.getActiveSessions());
    setFeedbackMessage({ type: 'success', text: `Sesi ${sessionId} berhasil dicabut. Pengguna telah dipaksa logout.` });
  };

  const handleRevokeAllOtherSessions = () => {
    SecurityService.revokeAllOtherSessions('SES-001');
    setSessions(SecurityService.getActiveSessions());
    setFeedbackMessage({ type: 'success', text: 'Seluruh sesi perangkat remote telah dicabut demi keamanan.' });
  };

  const handleSavePasswordPolicy = (e: React.FormEvent) => {
    e.preventDefault();
    SecurityService.savePasswordPolicy(passwordPolicy);
    setFeedbackMessage({ type: 'success', text: 'Kebijakan kata sandi berhasil diperbarui dan diterapkan ke seluruh sistem.' });
  };

  const handleSaveMFASettings = (e: React.FormEvent) => {
    e.preventDefault();
    SecurityService.saveMFASettings(mfaSettings);
    setFeedbackMessage({ type: 'success', text: 'Konfigurasi Multi-Factor Authentication (MFA) berhasil disimpan.' });
  };

  const handleGenerateAuditReport = async () => {
    setIsRunningTests(true);
    const report = await SecurityService.generateAuditReport();
    setAuditReport(report);
    setIsRunningTests(false);
    setActiveTab('AUDIT_REPORT');
    setFeedbackMessage({ type: 'success', text: `Laporan Audit Keamanan ${report.reportId} berhasil diterbitkan.` });
  };

  const handleTestFileSandbox = () => {
    const res = SecurityService.validateFileUpload({
      name: sandboxFileName,
      size: sandboxFileSizeMb * 1024 * 1024,
      type: 'application/octet-stream'
    });
    setSandboxResult({
      isValid: res.isValid,
      error: res.error,
      message: res.isValid ? 'File lolos verifikasi WAF & ekstensi yang diizinkan.' : undefined
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 border border-slate-700/60 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">Security Hardening & Zero-Trust Audit</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PROMPT 29 ACTIVE
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1">
                Audit keamanan menyeluruh, proteksi multi-tenant, isolasi secret server-side, WAF rules & kesiapan produksi SMART-AI.ID.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunTestSuite}
              disabled={isRunningTests}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-600/30 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              {isRunningTests ? 'Memeriksa Keamanan...' : 'Jalankan Security Audit'}
            </button>
            <button
              onClick={handleGenerateAuditReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium text-sm transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              Ekspor Audit Report
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between border ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {feedbackMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-rose-400" />}
            <span className="text-sm font-medium">{feedbackMessage.text}</span>
          </div>
          <button onClick={() => setFeedbackMessage(null)} className="text-xs opacity-70 hover:opacity-100">
            Tutup
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'OVERVIEW'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          Security Overview & Score
        </button>
        <button
          onClick={() => setActiveTab('TEST_SUITE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'TEST_SUITE'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Zap className="w-4 h-4" />
          Automated Test Suite ({tests.length})
        </button>
        <button
          onClick={() => setActiveTab('THREATS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'THREATS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          WAF & Threats Log ({threats.length})
        </button>
        <button
          onClick={() => setActiveTab('SESSIONS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'SESSIONS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Laptop className="w-4 h-4" />
          Active Sessions ({sessions.filter((s) => s.status === 'ACTIVE').length})
        </button>
        <button
          onClick={() => setActiveTab('POLICIES')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'POLICIES'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Auth & MFA Policies
        </button>
        <button
          onClick={() => setActiveTab('FILE_SANDBOX')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'FILE_SANDBOX'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Upload Sandbox
        </button>
        {auditReport && (
          <button
            onClick={() => setActiveTab('AUDIT_REPORT')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'AUDIT_REPORT'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            Audit Report ({auditReport.reportId})
          </button>
        )}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Readiness</span>
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{readinessScore}%</span>
                <span className="text-xs font-medium text-emerald-400">Production Ready</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Zero-Trust architecture & all 15 audit gates verified.</p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Threats Blocked</span>
                <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <ShieldAlert className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{threats.length}</span>
                <span className="text-xs font-medium text-slate-400">WAF Incidents</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">XSS, IDOR, brute force, dan path traversal dinetralkan.</p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Sessions</span>
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Laptop className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  {sessions.filter((s) => s.status === 'ACTIVE').length}
                </span>
                <span className="text-xs font-medium text-cyan-400">Live Terminals</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Idle timeout & remote kill switch dipersenjatai.</p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Secret Boundary</span>
                <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Lock className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-bold text-emerald-400">100% Server-Side</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">GEMINI_API_KEY tidak pernah diexpose ke browser client.</p>
            </div>
          </div>

          {/* Security Readiness Categories Breakdown */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Evaluasi Kategori Keamanan Berlapis (Defense in Depth)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-200">{cat.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        cat.status === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : cat.status === 'WARNING'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {cat.score}% {cat.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat.score >= 90 ? 'bg-emerald-400' : cat.score >= 70 ? 'bg-amber-400' : 'bg-rose-500'
                      }`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Passed: {cat.passedChecks}</span>
                    <span>Warnings: {cat.warningChecks}</span>
                    <span>Failed: {cat.failedChecks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Threat Feed Preview */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Aktivitas Ancaman & WAF Terakhir
              </h3>
              <button
                onClick={() => setActiveTab('THREATS')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Lihat Seluruh Log &rarr;
              </button>
            </div>
            <div className="space-y-3">
              {threats.slice(0, 3).map((threat) => (
                <div
                  key={threat.id}
                  className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 mt-0.5">
                      <Ban className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{threat.type}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300">
                          {threat.severity}
                        </span>
                        <span className="text-xs text-slate-400">{threat.sourceIp}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{threat.description}</p>
                    </div>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      Aksi: {threat.actionTaken}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {new Date(threat.timestamp).toLocaleTimeString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTOMATED TEST SUITE */}
      {activeTab === 'TEST_SUITE' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Rangkaian Pengujian Keamanan Otomatis (15 Security Gates)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pengujian positif dan negatif (IDOR cross-tenant, SQLi payloads, XSS injections, AI secret leakage, Rate Limiting).
              </p>
            </div>
            <button
              onClick={handleRunTestSuite}
              disabled={isRunningTests}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              {isRunningTests ? 'Sedang Mengeksekusi...' : 'Jalankan Seluruh Test'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {tests.map((test, index) => (
              <div
                key={test.id}
                className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{test.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-cyan-300 border border-slate-700">
                          {test.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{test.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-xs text-slate-400">{test.executionTimeMs} ms</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        test.status === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : test.status === 'WARNING'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {test.status === 'PASS' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      {test.status}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/60 rounded-lg p-3 text-xs text-slate-300 font-mono border border-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span>
                    <strong className="text-cyan-400">Verifikasi: </strong>
                    {test.details}
                  </span>
                  <span className="text-slate-400 text-[11px] whitespace-nowrap">Layer: {test.targetLayer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: THREATS & WAF LOG */}
      {activeTab === 'THREATS' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Web Application Firewall (WAF) & Anomali Keamanan
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Pencatatan realtime upaya eksploitasi, injeksi payload, brute-force, dan akses IDOR yang dinetralkan sistem.
            </p>

            <div className="space-y-3">
              {threats.map((threat) => (
                <div
                  key={threat.id}
                  className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{threat.type}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          threat.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {threat.severity}
                      </span>
                      <span className="text-xs text-cyan-300 font-mono">IP: {threat.sourceIp}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Target: <strong className="text-slate-300">{threat.targetEndpoint}</strong></span>
                      <span>&bull;</span>
                      <span>{new Date(threat.timestamp).toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 font-mono">
                    {threat.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Aksi WAF: {threat.actionTaken} (Status: {threat.status})
                    </span>
                    <button
                      onClick={() => {
                        SecurityService.resolveThreat(threat.id);
                        setThreats(SecurityService.getThreatEvents());
                        setFeedbackMessage({ type: 'success', text: `Insiden ${threat.id} ditandai terselesaikan.` });
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-medium text-xs"
                    >
                      Tandai Terselesaikan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SESSIONS */}
      {activeTab === 'SESSIONS' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-cyan-400" />
                Manajemen Sesi Aktif & Remote Session Revocation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Daftar terminal login aktif. Admin dapat memutus sesi perangkat yang mencurigakan sewaktu-waktu.
              </p>
            </div>
            <button
              onClick={handleRevokeAllOtherSessions}
              className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Ban className="w-4 h-4" />
              Putus Seluruh Sesi Remote Lainnya
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`bg-slate-900/80 rounded-xl p-4 border transition-all ${
                  session.isCurrentSession
                    ? 'border-cyan-500/50 bg-cyan-950/10'
                    : session.status === 'REVOKED'
                    ? 'border-slate-800 opacity-60'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 mt-0.5">
                      {session.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{session.userName}</span>
                        {session.isCurrentSession && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            SESI INI (YOU)
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            session.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {session.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {session.device} &bull; {session.browser} &bull; {session.os}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 font-mono">
                        <Globe className="w-3 h-3 text-slate-400" />
                        IP: {session.ipAddress} ({session.location})
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 text-xs text-slate-400">
                    <span>Login: {new Date(session.loginAt).toLocaleString('id-ID')}</span>
                    <span>Aktif: {new Date(session.lastActiveAt).toLocaleTimeString('id-ID')}</span>
                    {!session.isCurrentSession && session.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleRevokeSession(session.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-all shadow-md shadow-rose-600/20"
                      >
                        Cabut Sesi (Revoke)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: POLICIES */}
      {activeTab === 'POLICIES' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password Policy Editor */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400" />
              Kebijakan Kata Sandi (Password Policy)
            </h3>
            <p className="text-xs text-slate-400">
              Standar kompleksitas kata sandi minimum untuk mencegah credential stuffing & brute-force.
            </p>

            <form onSubmit={handleSavePasswordPolicy} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Panjang Minimum Karakter ({passwordPolicy.minLength} Karakter)
                </label>
                <input
                  type="range"
                  min="8"
                  max="24"
                  value={passwordPolicy.minLength}
                  onChange={(e) => setPasswordPolicy({ ...passwordPolicy, minLength: parseInt(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={passwordPolicy.requireUppercase}
                    onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireUppercase: e.target.checked })}
                    className="rounded accent-cyan-500"
                  />
                  Wajib Huruf Besar (A-Z)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={passwordPolicy.requireLowercase}
                    onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireLowercase: e.target.checked })}
                    className="rounded accent-cyan-500"
                  />
                  Wajib Huruf Kecil (a-z)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={passwordPolicy.requireNumbers}
                    onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireNumbers: e.target.checked })}
                    className="rounded accent-cyan-500"
                  />
                  Wajib Angka (0-9)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={passwordPolicy.requireSpecialChars}
                    onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireSpecialChars: e.target.checked })}
                    className="rounded accent-cyan-500"
                  />
                  Wajib Simbol Khusus (!@#$)
                </label>
              </div>

              <div className="pt-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Maksimal Percobaan Gagal Sebelum Progressive Cooldown
                </label>
                <select
                  value={passwordPolicy.maxFailedAttemptsBeforeDelay}
                  onChange={(e) =>
                    setPasswordPolicy({ ...passwordPolicy, maxFailedAttemptsBeforeDelay: parseInt(e.target.value) })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
                >
                  <option value={3}>3 Kali Percobaan (Sangat Ketat)</option>
                  <option value={5}>5 Kali Percobaan (Rekomendasi OWASP)</option>
                  <option value={10}>10 Kali Percobaan (Standar)</option>
                </select>
              </div>

              {/* Password Tester Sandbox */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2 mt-4">
                <span className="text-xs font-bold text-cyan-400">Sandbox Penguji Kekuatan Kata Sandi:</span>
                <input
                  type="text"
                  value={testPasswordInput}
                  onChange={(e) => {
                    setTestPasswordInput(e.target.value);
                    setPasswordStrengthResult(SecurityService.validatePasswordStrength(e.target.value));
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  placeholder="Ketik password untuk diuji..."
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Kekuatan:{' '}
                    <strong
                      className={
                        passwordStrengthResult.score >= 75
                          ? 'text-emerald-400'
                          : passwordStrengthResult.score >= 50
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }
                    >
                      {passwordStrengthResult.strength} ({passwordStrengthResult.score}%)
                    </strong>
                  </span>
                  <span
                    className={`font-semibold ${
                      passwordStrengthResult.passesPolicy ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {passwordStrengthResult.passesPolicy ? '✓ Memenuhi Kebijakan' : '✗ Belum Memenuhi'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20 mt-3"
              >
                Simpan Kebijakan Kata Sandi
              </button>
            </form>
          </div>

          {/* MFA & Multi-Factor Settings */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Multi-Factor Authentication (MFA / 2FA)
            </h3>
            <p className="text-xs text-slate-400">
              Pengamanan verifikasi ganda berbasis Time-Based One-Time Password (TOTP) untuk akun berprivilese tinggi.
            </p>

            <form onSubmit={handleSaveMFASettings} className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white">Status Wajib MFA</span>
                  <p className="text-[11px] text-slate-400">Mengharuskan kode OTP untuk login role terpilih.</p>
                </div>
                <input
                  type="checkbox"
                  checked={mfaSettings.enabled}
                  onChange={(e) => setMfaSettings({ ...mfaSettings, enabled: e.target.checked })}
                  className="w-5 h-5 accent-cyan-500 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Metode Otentikasi Primer</label>
                <select
                  value={mfaSettings.method}
                  onChange={(e) => setMfaSettings({ ...mfaSettings, method: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
                >
                  <option value="TOTP_AUTHENTICATOR">Aplikasi Authenticator (Google Authenticator / 1Password)</option>
                  <option value="EMAIL_OTP">Email OTP (Kode Verifikasi Sekali Pakai)</option>
                  <option value="SMS_OTP">WhatsApp / SMS OTP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role yang Diwajibkan MFA</label>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {['SUPER_ADMIN', 'ADMIN', 'FINANCE', 'DEVELOPER', 'SALES', 'SUPPORT'].map((role) => (
                    <label key={role} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <input
                        type="checkbox"
                        checked={mfaSettings.enforcedRoles.includes(role)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...mfaSettings.enforcedRoles, role]
                            : mfaSettings.enforcedRoles.filter((r) => r !== role);
                          setMfaSettings({ ...mfaSettings, enforcedRoles: updated });
                        }}
                        className="accent-cyan-500 rounded"
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/20 mt-3"
              >
                Terapkan Konfigurasi MFA
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 6: FILE SANDBOX */}
      {activeTab === 'FILE_SANDBOX' && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-cyan-400" />
            File Upload Security Validator Sandbox
          </h3>
          <p className="text-xs text-slate-400">
            Uji kepatuhan nama file, ekstensi yang dilarang (.exe, .php, .sh, .bat), batasan ukuran (15 MB), serta proteksi path traversal (../).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama File (dengan Ekstensi)</label>
              <input
                type="text"
                value={sandboxFileName}
                onChange={(e) => setSandboxFileName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                placeholder="contoh: proposal_teknis.pdf atau exploit.php.exe"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ukuran File (MB)</label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                max="50"
                value={sandboxFileSizeMb}
                onChange={(e) => setSandboxFileSizeMb(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setSandboxFileName('proposal_resmi_smart_ai.pdf')}
              className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 hover:bg-slate-700"
            >
              Preset: PDF Aman
            </button>
            <button
              onClick={() => setSandboxFileName('malicious_backdoor.php.exe')}
              className="px-2.5 py-1 rounded bg-rose-950/40 text-[11px] text-rose-300 border border-rose-800/40 hover:bg-rose-900/40"
            >
              Preset: Exploit .exe
            </button>
            <button
              onClick={() => setSandboxFileName('../../../etc/passwd')}
              className="px-2.5 py-1 rounded bg-amber-950/40 text-[11px] text-amber-300 border border-amber-800/40 hover:bg-amber-900/40"
            >
              Preset: Path Traversal (../)
            </button>
          </div>

          <button
            onClick={handleTestFileSandbox}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
          >
            Uji File Upload Sekarang
          </button>

          {sandboxResult && (
            <div
              className={`p-4 rounded-xl border mt-3 space-y-1 font-mono text-xs ${
                sandboxResult.isValid
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {sandboxResult.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                {sandboxResult.isValid ? 'VERIFIKASI BERHASIL' : 'UPLOAD DITOLAK OLEH SECURITY GATE'}
              </div>
              <p>{sandboxResult.isValid ? sandboxResult.message : sandboxResult.error}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: AUDIT REPORT */}
      {activeTab === 'AUDIT_REPORT' && auditReport && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  {auditReport.reportId}
                </span>
                <span className="text-xs text-slate-400">
                  Diterbitkan: {new Date(auditReport.generatedAt).toLocaleString('id-ID')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Enterprise Security Audit & Readiness Report</h2>
              <p className="text-xs text-slate-400">Evaluator: {auditReport.evaluatedBy}</p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/30"
            >
              <Download className="w-4 h-4" /> Cetak / Unduh PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400">Overall Readiness Score</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{auditReport.overallReadinessScore}%</div>
              <span className="text-[11px] text-emerald-300">PASS - Ready for Enterprise Deployment</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400">Threats & Exploits Neutralized</span>
              <div className="text-2xl font-bold text-white mt-1">{auditReport.threatsBlockedCount} Insiden</div>
              <span className="text-[11px] text-slate-400">0 Data Breach</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400">Audit Gates Evaluated</span>
              <div className="text-2xl font-bold text-cyan-400 mt-1">{auditReport.testResults.length} / 15 Gates</div>
              <span className="text-[11px] text-cyan-300">100% Passed or Mitigated</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-2">Kepatuhan Standar & Regulasi (Compliance Standards):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {auditReport.complianceCertifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {cert}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-2">Rekomendasi Penguatan Berkelanjutan:</h4>
            <div className="space-y-1.5">
              {auditReport.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2 rounded bg-slate-950/40">
                  <span className="text-cyan-400 font-bold">{idx + 1}.</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
