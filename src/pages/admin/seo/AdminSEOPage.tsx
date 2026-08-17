import React, { useState, useEffect } from 'react';
import { SEOService } from '../../../services/SEOService';
import {
  SEOLandingPage,
  SEOKeyword,
  SEORedirect,
  SEOInternalLink,
  SEOSettings,
  SearchIntentType,
  SEOPageStatus
} from '../../../types';
import {
  BarChart2,
  Globe,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Copy,
  ExternalLink,
  Link,
  Sliders,
  Settings,
  FileCode,
  ShieldCheck,
  Check,
  X,
  Code2,
  Eye,
  Filter,
  Layers,
  HelpCircle,
  TrendingUp,
  Activity,
  Zap
} from 'lucide-react';

export const AdminSEOPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'pages' | 'keywords' | 'redirects' | 'sitemap' | 'robots' | 'schema' | 'links' | 'assistant' | 'settings'
  >('dashboard');

  // State
  const [landingPages, setLandingPages] = useState<SEOLandingPage[]>([]);
  const [keywords, setKeywords] = useState<SEOKeyword[]>([]);
  const [redirects, setRedirects] = useState<SEORedirect[]>([]);
  const [internalLinks, setInternalLinks] = useState<SEOInternalLink[]>([]);
  const [settings, setSettings] = useState<SEOSettings>(SEOService.getSettings());
  const [auditResult, setAuditResult] = useState<any>(null);

  // Modal / Form States
  const [isLpModalOpen, setIsLpModalOpen] = useState<boolean>(false);
  const [editingLpId, setEditingLpId] = useState<string | null>(null);
  const [lpForm, setLpForm] = useState<Partial<SEOLandingPage>>({
    title: '',
    slug: '',
    keyword: '',
    description: '',
    status: 'DRAFT'
  });

  const [isKwModalOpen, setIsKwModalOpen] = useState<boolean>(false);
  const [kwForm, setKwForm] = useState<Partial<SEOKeyword>>({
    keyword: '',
    searchIntent: 'Commercial',
    targetPage: '/jasa-pembuatan-aplikasi-ai',
    priority: 'HIGH'
  });

  const [isRedModalOpen, setIsRedModalOpen] = useState<boolean>(false);
  const [redForm, setRedForm] = useState<Partial<SEORedirect>>({
    source: '',
    destination: '',
    statusCode: 301
  });

  // AI SEO Assistant State
  const [aiKwInput, setAiKwInput] = useState<string>('');
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const lps = SEOService.getLandingPages();
    setLandingPages(lps);

    const kws = SEOService.getKeywords();
    setKeywords(kws);

    const reds = SEOService.getRedirects();
    setRedirects(reds);

    const links = SEOService.getInternalLinks();
    setInternalLinks(links);

    const sets = SEOService.getSettings();
    setSettings(sets);

    const audit = SEOService.runAudit();
    setAuditResult(audit);
  };

  // Actions
  const handleSaveLp = () => {
    if (!lpForm.title?.trim() || !lpForm.slug?.trim()) {
      alert('Judul dan Slug wajib diisi.');
      return;
    }
    SEOService.saveLandingPage(lpForm);
    setIsLpModalOpen(false);
    loadAllData();
  };

  const handleSaveKw = () => {
    if (!kwForm.keyword?.trim()) {
      alert('Keyword wajib diisi.');
      return;
    }
    SEOService.saveKeyword(kwForm);
    setIsKwModalOpen(false);
    loadAllData();
  };

  const handleSaveRed = () => {
    if (!redForm.source?.trim() || !redForm.destination?.trim()) {
      alert('Source dan Destination wajib diisi.');
      return;
    }
    SEOService.saveRedirect(redForm);
    setIsRedModalOpen(false);
    loadAllData();
  };

  const handleDeleteRed = (id: string) => {
    if (confirm('Hapus redirect ini?')) {
      SEOService.deleteRedirect(id);
      loadAllData();
    }
  };

  const handleRunAiAssistant = () => {
    if (!aiKwInput.trim()) return;
    const res = SEOService.aiSuggestMetadata(aiKwInput);
    setAiSuggestion(res);
  };

  const handleApplyAiToLp = () => {
    if (!aiSuggestion) return;
    setLpForm({
      title: aiSuggestion.suggestedTitle,
      slug: aiKwInput.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      keyword: aiKwInput,
      secondaryKeywords: aiSuggestion.secondaryKeywords,
      description: aiSuggestion.suggestedMetaDescription,
      seoTitle: aiSuggestion.suggestedTitle,
      seoDescription: aiSuggestion.suggestedMetaDescription,
      status: 'DRAFT'
    });
    setEditingLpId(null);
    setIsLpModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Globe className="w-4 h-4" />
              <span>SMART-AI.ID SEO ENGINE & TECHNICAL VISIBILITY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">SEO Management Suite</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setEditingLpId(null);
                setLpForm({ title: '', slug: '', keyword: '', description: '', status: 'DRAFT' });
                setIsLpModalOpen(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New SEO Page</span>
            </button>
            <button
              onClick={() => setActiveTab('assistant')}
              className="px-4 py-2.5 bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI SEO Assistant</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
          {[
            { id: 'dashboard', label: 'SEO Audit', icon: BarChart2 },
            { id: 'pages', label: 'Landing Pages', icon: Globe, badge: landingPages.length },
            { id: 'keywords', label: 'Keywords', icon: Search, badge: keywords.length },
            { id: 'redirects', label: 'Redirects', icon: Link, badge: redirects.length },
            { id: 'sitemap', label: 'XML Sitemap', icon: FileCode },
            { id: 'robots', label: 'Robots.txt', icon: Code2 },
            { id: 'schema', label: 'Structured Data', icon: Layers },
            { id: 'links', label: 'Internal Links', icon: Link, badge: internalLinks.length },
            { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-cyan-950 border border-cyan-500/40 text-cyan-300 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: SEO DASHBOARD & AUDIT ENGINE */}
        {activeTab === 'dashboard' && auditResult && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">SEO Health Score</span>
                <div className="text-3xl font-bold font-mono text-emerald-400">{auditResult.overallScore}/100</div>
                <div className="text-[10px] font-mono text-slate-500">{auditResult.totalChecked} pages audited</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Critical Issues</span>
                <div className="text-3xl font-bold font-mono text-rose-400">{auditResult.issuesCount.critical}</div>
                <div className="text-[10px] font-mono text-slate-500">Missing Title or Meta</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Orphan Pages</span>
                <div className="text-3xl font-bold font-mono text-amber-400">{auditResult.orphanPages.length}</div>
                <div className="text-[10px] font-mono text-slate-500">Pages lacking internal links</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Cannibalization Warnings</span>
                <div className="text-3xl font-bold font-mono text-indigo-400">{auditResult.cannibalizationWarnings.length}</div>
                <div className="text-[10px] font-mono text-slate-500">Overlapping target keywords</div>
              </div>
            </div>

            {/* Cannibalization & Orphan Warnings */}
            {auditResult.cannibalizationWarnings.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs space-y-2">
                <div className="font-bold font-mono uppercase flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>POTENTIAL KEYWORD CANNIBALIZATION</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {auditResult.cannibalizationWarnings.map((w: string, i: number) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Audit Breakdown Table */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Page-Level Audit Breakdown</h3>
              <div className="divide-y divide-slate-800 text-xs">
                {auditResult.results.map((res: any) => (
                  <div key={res.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-200">{res.pageUrl}</div>
                      <div className="text-[10px] font-mono text-slate-500">{res.pageType}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-bold ${res.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        Score: {res.score}/100
                      </span>

                      {res.issues.length > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-mono">
                          {res.issues.length} Issues
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono">
                          PASS
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LANDING PAGES */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Target SEO Landing Pages ({landingPages.length})</h3>
              <button
                onClick={() => {
                  setEditingLpId(null);
                  setLpForm({ title: '', slug: '', keyword: '', description: '', status: 'DRAFT' });
                  setIsLpModalOpen(true);
                }}
                className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add SEO Page</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Title & URL</th>
                      <th className="p-3">Target Keyword</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">SEO Score</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {landingPages.map((lp) => (
                      <tr key={lp.id} className="hover:bg-slate-950/50">
                        <td className="p-3">
                          <div className="font-bold text-white">{lp.title}</div>
                          <a
                            href={`/${lp.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <span>/{lp.slug}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 font-mono text-[10px] border border-slate-800">
                            {lp.keyword}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              lp.status === 'PUBLISHED'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {lp.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-400">95/100</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingLpId(lp.id);
                                setLpForm({ ...lp });
                                setIsLpModalOpen(true);
                              }}
                              className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-cyan-400 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KEYWORDS */}
        {activeTab === 'keywords' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Target Keywords ({keywords.length})</h3>
              <button
                onClick={() => setIsKwModalOpen(true)}
                className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Keyword</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Keyword</th>
                    <th className="p-3">Search Intent</th>
                    <th className="p-3">Target Page</th>
                    <th className="p-3">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {keywords.map((kw) => (
                    <tr key={kw.id}>
                      <td className="p-3 font-bold text-white">{kw.keyword}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-indigo-300 font-mono text-[10px]">
                          {kw.searchIntent}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-cyan-400">{kw.targetPage}</td>
                      <td className="p-3 font-mono font-bold text-amber-400">{kw.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REDIRECTS */}
        {activeTab === 'redirects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">URL Redirect Manager ({redirects.length})</h3>
              <button
                onClick={() => setIsRedModalOpen(true)}
                className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Redirect</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Source URL</th>
                    <th className="p-3">Destination URL</th>
                    <th className="p-3">Status Code</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {redirects.map((red) => (
                    <tr key={red.id}>
                      <td className="p-3 font-mono text-rose-300">{red.source}</td>
                      <td className="p-3 font-mono text-emerald-300">{red.destination}</td>
                      <td className="p-3 font-mono font-bold text-amber-400">{red.statusCode} Permanent</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteRed(red.id)} className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-rose-400 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: XML SITEMAP */}
        {activeTab === 'sitemap' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Dynamic XML Sitemap Generator</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(SEOService.generateSitemapXml());
                  alert('Sitemap XML disalin ke clipboard!');
                }}
                className="px-3 py-1.5 bg-cyan-950 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy XML</span>
              </button>
            </div>

            <textarea
              readOnly
              rows={12}
              value={SEOService.generateSitemapXml()}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300"
            />
          </div>
        )}

        {/* TAB 6: ROBOTS.TXT */}
        {activeTab === 'robots' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Robots.txt Editor</h3>
            <textarea
              rows={8}
              value={settings.robotsRules}
              onChange={(e) => setSettings({ ...settings, robotsRules: e.target.value })}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200"
            />
            <button
              onClick={() => {
                SEOService.saveSettings(settings);
                alert('Aturan Robots.txt tersimpan!');
              }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Save Robots.txt
            </button>
          </div>
        )}

        {/* TAB 7: AI SEO ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Sparkles className="w-5 h-5" />
              <span>AI SEO Content & Metadata Assistant</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400">Target Keyword Utama:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: jasa pembuatan aplikasi AI"
                  value={aiKwInput}
                  onChange={(e) => setAiKwInput(e.target.value)}
                  className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
                <button
                  onClick={handleRunAiAssistant}
                  className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Generate Recommendations
                </button>
              </div>
            </div>

            {aiSuggestion && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4 text-xs">
                <div>
                  <span className="font-mono text-slate-400 block mb-1">Suggested SEO Title:</span>
                  <div className="font-bold text-white p-2.5 bg-slate-900 rounded-lg">{aiSuggestion.suggestedTitle}</div>
                </div>

                <div>
                  <span className="font-mono text-slate-400 block mb-1">Suggested Meta Description:</span>
                  <div className="text-slate-300 p-2.5 bg-slate-900 rounded-lg">{aiSuggestion.suggestedMetaDescription}</div>
                </div>

                <div>
                  <span className="font-mono text-slate-400 block mb-1">Suggested Content Outline:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 p-2.5 bg-slate-900 rounded-lg">
                    {aiSuggestion.outline.map((o: string, idx: number) => (
                      <li key={idx}>{o}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleApplyAiToLp}
                  className="w-full py-2.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold rounded-xl cursor-pointer"
                >
                  Apply to New SEO Landing Page Draft
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: SETTINGS & SEARCH CONSOLE */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 max-w-xl">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Global SEO Defaults</h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 block">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Default Title</label>
                <input
                  type="text"
                  value={settings.defaultTitle}
                  onChange={(e) => setSettings({ ...settings, defaultTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Default Meta Description</label>
                <textarea
                  rows={3}
                  value={settings.defaultDescription}
                  onChange={(e) => setSettings({ ...settings, defaultDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">Google Search Console Status</span>
                <span className="text-slate-400 block">Connect Search Console to sync live impressions & clicks.</span>
                <button
                  onClick={() => alert('Search Console API Integration pending credentials.')}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 font-bold rounded-lg cursor-pointer"
                >
                  Connect Analytics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO LANDING PAGE MODAL */}
      {isLpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-2xl w-full my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                {editingLpId ? 'Edit SEO Landing Page' : 'Create SEO Landing Page'}
              </h2>
              <button onClick={() => setIsLpModalOpen(false)} className="p-1 rounded bg-slate-950 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Title *</label>
                <input
                  type="text"
                  value={lpForm.title || ''}
                  onChange={(e) =>
                    setLpForm({
                      ...lpForm,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      seoTitle: `${e.target.value} | SMART-AI.ID`
                    })
                  }
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Slug (URL) *</label>
                <input
                  type="text"
                  value={lpForm.slug || ''}
                  onChange={(e) => setLpForm({ ...lpForm, slug: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-cyan-300"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Keyword Utama *</label>
                <input
                  type="text"
                  value={lpForm.keyword || ''}
                  onChange={(e) => setLpForm({ ...lpForm, keyword: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={lpForm.description || ''}
                  onChange={(e) => setLpForm({ ...lpForm, description: e.target.value, seoDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Status</label>
                <select
                  value={lpForm.status || 'DRAFT'}
                  onChange={(e) => setLpForm({ ...lpForm, status: e.target.value as SEOPageStatus })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="REVIEW">REVIEW</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button onClick={() => setIsLpModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button onClick={handleSaveLp} className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-xl text-xs">
                Save Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KEYWORD MODAL */}
      {isKwModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">Add Target Keyword</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Keyword..."
                value={kwForm.keyword || ''}
                onChange={(e) => setKwForm({ ...kwForm, keyword: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <select
                value={kwForm.searchIntent || 'Commercial'}
                onChange={(e) => setKwForm({ ...kwForm, searchIntent: e.target.value as SearchIntentType })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              >
                <option value="Commercial">Commercial</option>
                <option value="Informational">Informational</option>
                <option value="Transactional">Transactional</option>
                <option value="Navigational">Navigational</option>
              </select>
              <input
                type="text"
                placeholder="Target Page (e.g. /jasa-pembuatan-aplikasi-ai)"
                value={kwForm.targetPage || ''}
                onChange={(e) => setKwForm({ ...kwForm, targetPage: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsKwModalOpen(false)} className="px-3 py-1.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button onClick={handleSaveKw} className="px-4 py-1.5 bg-cyan-950 text-cyan-300 font-bold rounded-xl text-xs border border-cyan-500/40">
                Save Keyword
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REDIRECT MODAL */}
      {isRedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">Add 301 Redirect</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Source URL (e.g. /services/ai)"
                value={redForm.source || ''}
                onChange={(e) => setRedForm({ ...redForm, source: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <input
                type="text"
                placeholder="Destination URL (e.g. /jasa-pembuatan-aplikasi-ai)"
                value={redForm.destination || ''}
                onChange={(e) => setRedForm({ ...redForm, destination: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsRedModalOpen(false)} className="px-3 py-1.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button onClick={handleSaveRed} className="px-4 py-1.5 bg-cyan-950 text-cyan-300 font-bold rounded-xl text-xs border border-cyan-500/40">
                Save Redirect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
