import React, { useState, useEffect } from 'react';
import { PortfolioService } from '../../services/PortfolioService';
import { PortfolioConfig, PortfolioAuditLog } from '../../types';
import { useNavigate } from '../../lib/router';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  Filter,
  BarChart3,
  History,
  ShieldAlert,
  CheckCircle2,
  Save,
  X,
  Sparkles,
  ExternalLink,
  Box,
  Sliders,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const AdminPortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'catalog' | 'editor' | 'analytics' | 'audit'>('catalog');
  const [portfolios, setPortfolios] = useState<PortfolioConfig[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<PortfolioConfig> | null>(null);
  const [auditLogs, setAuditLogs] = useState<PortfolioAuditLog[]>([]);

  useEffect(() => {
    loadData();
  }, [searchQuery, activeTab]);

  const loadData = () => {
    const list = PortfolioService.getAllPortfolios({ query: searchQuery });
    setPortfolios(list);
    setAuditLogs(PortfolioService.getAuditLogs());
  };

  const handleCreateNew = () => {
    setEditingPortfolio({
      name: '',
      slug: '',
      industry: 'Mining',
      category: 'Mining',
      description: '',
      fullDescription: '',
      projectType: 'Concept',
      status: 'CONCEPT PROJECT',
      visibility: 'PUBLIC',
      approvalStatus: 'PUBLISHED',
      featured: false,
      coverImage: 'from-amber-950 via-slate-900 to-slate-950',
      problems: [
        { id: '1', title: 'Manual operational recording', description: 'Paper records lead to error and latency.', impact: 'High operational delay' }
      ],
      solution: {
        summary: 'Centralized cloud platform for automated tracking.',
        digitalSolution: 'Real-time telemetry and web dashboard.',
        businessImpact: '35% efficiency boost.'
      },
      modules: [
        { id: 'm1', name: 'Operational Dashboard', description: 'Real-time overview.', iconName: 'LayoutDashboard', aiEnabled: true }
      ],
      technology: [
        { category: 'Frontend', name: 'React & Tailwind' },
        { category: 'Backend', name: 'Node.js Express' }
      ],
      aiFeatures: [
        { id: 'af1', name: 'AI Predictive Insights', description: 'Early warning anomaly detection.', status: 'CONCEPT' }
      ],
      benefits: ['Real-time visibility', 'Automated reporting'],
      workflow: [
        { step: 1, title: 'Data Ingestion', description: 'Telemetry collected.' },
        { step: 2, title: 'AI Processing', description: 'Insights generated.' }
      ],
      screenshots: [
        { id: 'sc1', title: 'Main Dashboard UI', description: 'Executive view', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80', device: 'desktop', sortOrder: 1 }
      ]
    });
    setActiveTab('editor');
  };

  const handleEdit = (p: PortfolioConfig) => {
    setEditingPortfolio({ ...p });
    setActiveTab('editor');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      PortfolioService.deletePortfolio(id);
      loadData();
    }
  };

  const handleTogglePublish = (p: PortfolioConfig) => {
    const newStatus = p.approvalStatus === 'PUBLISHED' ? 'ARCHIVED' : 'PUBLISHED';
    PortfolioService.updatePortfolio(p.id, { approvalStatus: newStatus });
    loadData();
  };

  const handleToggleFeatured = (p: PortfolioConfig) => {
    PortfolioService.updatePortfolio(p.id, { featured: !p.featured });
    loadData();
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio || !editingPortfolio.name) return;

    const slug = editingPortfolio.slug || editingPortfolio.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingPortfolio.id) {
      PortfolioService.updatePortfolio(editingPortfolio.id, {
        ...editingPortfolio,
        slug
      });
    } else {
      PortfolioService.createPortfolio({
        ...editingPortfolio,
        slug
      } as any);
    }

    setEditingPortfolio(null);
    setActiveTab('catalog');
    loadData();
  };

  const analyticsSummary = PortfolioService.getAnalyticsSummary();

  return (
    <div className="py-20 md:py-28 bg-[#06090e] bg-tech-grid text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>ADMIN &bull; PORTFOLIO MANAGEMENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Portfolio & Showcase Admin
            </h1>
            <p className="text-xs text-slate-400">
              Manage enterprise portfolio items, concept projects, status badges, and analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateNew}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Portfolio</span>
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Portfolios Catalog ({portfolios.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & Performance</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Audit Trail & History ({auditLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: CATALOG TABLE */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, industry, status..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
                  <thead className="bg-slate-950 font-mono text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Portfolio Name</th>
                      <th className="px-6 py-4">Industry</th>
                      <th className="px-6 py-4">Status Badge</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Approval</th>
                      <th className="px-6 py-4">Featured</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {portfolios.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span>{item.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">({item.slug})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-cyan-300">{item.industry}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-400">{item.projectType}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            item.approvalStatus === 'PUBLISHED'
                              ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
                              : 'bg-amber-950 border border-amber-500/40 text-amber-400'
                          }`}>
                            {item.approvalStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleFeatured(item)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              item.featured
                                ? 'bg-amber-950 border-amber-500/50 text-amber-400'
                                : 'bg-slate-950 border-slate-800 text-slate-600 hover:text-slate-400'
                            }`}
                            title="Toggle Featured"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/portfolio/${item.slug}`)}
                              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                              title="Preview Case Study"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleTogglePublish(item)}
                              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                              title={item.approvalStatus === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                            >
                              {item.approvalStatus === 'PUBLISHED' ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            </button>
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-colors cursor-pointer"
                              title="Edit Portfolio"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-400 transition-colors cursor-pointer"
                              title="Delete Portfolio"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        {/* TAB 2: CREATE / EDIT FORM */}
        {activeTab === 'editor' && editingPortfolio && (
          <form onSubmit={handleSavePortfolio} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingPortfolio.id ? 'Edit Portfolio Showcase' : 'Create New Portfolio Showcase'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CLIENT PROJECT WARNING BANNER */}
            {editingPortfolio.status === 'CLIENT PROJECT' && (
              <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 font-bold">Client Project Claim Warning:</strong>
                  Only use Client Project status when this project is an actual client project and you have explicit permission to publish its details.
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Project Name *</label>
                <input
                  type="text"
                  required
                  value={editingPortfolio.name || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Slug (URL)</label>
                <input
                  type="text"
                  value={editingPortfolio.slug || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, slug: e.target.value })}
                  placeholder="e.g. smart-mining"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Industry</label>
                <input
                  type="text"
                  required
                  value={editingPortfolio.industry || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, industry: e.target.value, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Status Badge Label</label>
                <select
                  value={editingPortfolio.status || 'CONCEPT PROJECT'}
                  onChange={(e: any) => setEditingPortfolio({ ...editingPortfolio, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="CONCEPT PROJECT">CONCEPT PROJECT</option>
                  <option value="PROTOTYPE">PROTOTYPE</option>
                  <option value="DEMO">DEMO</option>
                  <option value="IN DEVELOPMENT">IN DEVELOPMENT</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CLIENT PROJECT">CLIENT PROJECT</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Approval Status</label>
                <select
                  value={editingPortfolio.approvalStatus || 'PUBLISHED'}
                  onChange={(e: any) => setEditingPortfolio({ ...editingPortfolio, approvalStatus: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="REVIEW">REVIEW</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Cover Gradient / Style</label>
                <input
                  type="text"
                  value={editingPortfolio.coverImage || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Short Summary</label>
              <textarea
                rows={2}
                value={editingPortfolio.description || ''}
                onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Full Description</label>
              <textarea
                rows={4}
                value={editingPortfolio.fullDescription || ''}
                onChange={(e) => setEditingPortfolio({ ...editingPortfolio, fullDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Portfolio</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Total Showcases</span>
                <div className="text-2xl font-bold text-white">{analyticsSummary.total}</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Published / Concept</span>
                <div className="text-2xl font-bold text-cyan-400">
                  {analyticsSummary.published} / {analyticsSummary.concept}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Featured</span>
                <div className="text-2xl font-bold text-amber-400">{analyticsSummary.featured}</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">Client Projects</span>
                <div className="text-2xl font-bold text-purple-400">{analyticsSummary.client}</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono">Top Featured Portfolio Item</h3>
              {analyticsSummary.mostViewed && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{analyticsSummary.mostViewed.name}</span>
                    <span className="text-xs font-mono text-cyan-400">{analyticsSummary.mostViewed.industry}</span>
                  </div>
                  <p className="text-xs text-slate-400">{analyticsSummary.mostViewed.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono">System Audit Logs</h3>
            <div className="divide-y divide-slate-800 text-xs font-mono">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold mr-2 uppercase">
                      {log.action}
                    </span>
                    <span className="text-slate-200">{log.portfolioName}</span>
                    <span className="text-slate-500 ml-2">by {log.author}</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
