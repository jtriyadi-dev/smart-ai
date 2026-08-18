import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  Clock,
  ListTodo,
  Calendar as CalendarIcon,
  Search,
  Sparkles,
  Plus,
  ShieldCheck,
  ArrowRight,
  Filter,
  MessageCircle,
  Briefcase,
  ChevronDown,
  Layers,
  Award
} from 'lucide-react';
import {
  Opportunity,
  OpportunityStage,
  CRMCompany,
  CRMContact,
  CRMActivity,
  CRMFollowUp,
  CRMAuditLog,
  CRMRole,
  Lead
} from '../../types';
import { CRMService } from '../../services/crmService';
import { PipelineService } from '../../services/pipelineService';
import { ActivityService } from '../../services/activityService';
import { FollowUpService } from '../../services/followUpService';
import { LeadService } from '../../services/leadService';
import { WhatsAppService } from '../../services/whatsappService';
import { useRouter } from '../../lib/router';

import { CRMKpiCards } from '../../components/crm/CRMKpiCards';
import { CRMPipelineKanban } from '../../components/crm/CRMPipelineKanban';
import { OpportunityDetailModal } from '../../components/crm/OpportunityDetailModal';
import { CRMLeadsTab } from '../../components/crm/CRMLeadsTab';
import { CRMCompaniesTab } from '../../components/crm/CRMCompaniesTab';
import { CRMContactsTab } from '../../components/crm/CRMContactsTab';
import { CRMActivitiesTab } from '../../components/crm/CRMActivitiesTab';
import { CRMFollowUpsTab } from '../../components/crm/CRMFollowUpsTab';
import { CRMCalendarView } from '../../components/crm/CRMCalendarView';
import { CRMAiAssistantModal } from '../../components/crm/CRMAiAssistantModal';
import { CRMAuditLogModal } from '../../components/crm/CRMAuditLogModal';

export const AdminCRMPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Active Sub-route Tab
  const getActiveTabFromPath = () => {
    if (currentPath.includes('/admin/crm/leads')) return 'leads';
    if (currentPath.includes('/admin/crm/companies')) return 'companies';
    if (currentPath.includes('/admin/crm/contacts')) return 'contacts';
    if (currentPath.includes('/admin/crm/activities')) return 'activities';
    if (currentPath.includes('/admin/crm/follow-ups')) return 'follow-ups';
    return 'pipeline';
  };

  const [activeTab, setActiveTab] = useState<'pipeline' | 'leads' | 'companies' | 'contacts' | 'activities' | 'follow-ups'>(getActiveTabFromPath);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // CRM State Data
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [companies, setCompanies] = useState<CRMCompany[]>([]);
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [followUps, setFollowUps] = useState<CRMFollowUp[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [auditLogs, setAuditLogs] = useState<CRMAuditLog[]>([]);

  // Selected Items & Modals
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [showNewOppModal, setShowNewOppModal] = useState<boolean>(false);

  // Global Search
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Role Access Abstraction
  const [currentRole, setCurrentRole] = useState<CRMRole>('Super Admin');

  // Form state for New Opportunity
  const [newOppName, setNewOppName] = useState('');
  const [newOppComp, setNewOppComp] = useState('');
  const [newOppContact, setNewOppContact] = useState('');
  const [newOppValueMin, setNewOppValueMin] = useState(200000000);
  const [newOppValueMax, setNewOppValueMax] = useState(350000000);

  const loadData = () => {
    CRMService.initializeInitialData();
    ActivityService.initializeInitialData();
    FollowUpService.initializeInitialData();

    setOpportunities(CRMService.getOpportunities());
    setCompanies(CRMService.getCompanies());
    setContacts(CRMService.getContacts());
    setActivities(ActivityService.getActivities());
    setFollowUps(FollowUpService.getFollowUps());
    setLeads(LeadService.getLeadsLocal());
    setAuditLogs(CRMService.getAuditLogs());
  };

  useEffect(() => {
    loadData();
  }, [currentPath]);

  const handleTabChange = (tab: 'pipeline' | 'leads' | 'companies' | 'contacts' | 'activities' | 'follow-ups') => {
    setActiveTab(tab);
    if (tab === 'pipeline') navigate('/admin/crm/pipeline');
    else navigate(`/admin/crm/${tab}`);
  };

  const handleMoveStage = (oppId: string, newStage: OpportunityStage) => {
    PipelineService.moveOpportunity(oppId, newStage, 'Admin');
    loadData();
  };

  const handleWhatsAppClick = (phoneOrOpp: string | Opportunity, nameCustom?: string, contextCustom?: string) => {
    let targetPhone = '+6285187869164';
    let targetName = 'Klien';
    let targetContext = 'Diskusi Proyek SMART-AI.ID';

    if (typeof phoneOrOpp === 'string') {
      targetPhone = phoneOrOpp;
      targetName = nameCustom || 'Klien';
      targetContext = contextCustom || 'Diskusi Proyek';
    } else {
      targetPhone = phoneOrOpp.contactPhone || '+6285187869164';
      targetName = phoneOrOpp.contactName;
      targetContext = phoneOrOpp.name;
    }

    const waUrl = WhatsAppService.generateWhatsAppUrl(targetPhone, targetName, targetContext);
    ActivityService.logWhatsAppClick(targetName, targetPhone, targetContext);
    window.open(waUrl, '_blank');
  };

  const handleCreateNewOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOppName.trim()) return;

    const newOpp = CRMService.createOpportunity({
      name: newOppName,
      companyName: newOppComp || 'PT Prospek Baru',
      contactName: newOppContact || 'Kontak Utama',
      estimatedValueMin: Number(newOppValueMin),
      estimatedValueMax: Number(newOppValueMax),
      stage: 'NEW',
      priority: 'High',
      owner: 'Budi Santoso'
    });

    setShowNewOppModal(false);
    setNewOppName('');
    setNewOppComp('');
    setNewOppContact('');
    loadData();
    setSelectedOpp(newOpp);
  };

  const summaryMetrics = PipelineService.getSummaryMetrics(opportunities, leads);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Top Header Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                CRM
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
                  <span>SMART-AI.ID CRM</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                    Internal Portal
                  </span>
                </h1>
                <p className="text-xs text-slate-400">
                  Manage leads, opportunities, follow-ups, and customer relationships.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {/* Global CRM Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Global CRM search..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Role Switcher */}
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as CRMRole)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="Super Admin">Role: Super Admin</option>
              <option value="Admin">Role: Admin</option>
              <option value="Sales">Role: Sales</option>
              <option value="Technical Consultant">Role: Tech Consultant</option>
              <option value="Project Manager">Role: Project Manager</option>
            </select>

            {/* Audit Log Button */}
            <button
              onClick={() => setShowAuditModal(true)}
              className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs flex items-center space-x-1"
              title="Audit Log"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </button>

            {/* + New Opportunity */}
            <button
              onClick={() => setShowNewOppModal(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Deal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* KPI Dashboard Banner */}
        <CRMKpiCards metrics={summaryMetrics} onOpenAiAnalysis={() => setShowAiModal(true)} />

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <nav className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'pipeline', label: 'Pipeline Kanban', icon: LayoutDashboard },
              { id: 'leads', label: `Leads (${leads.length})`, icon: Users },
              { id: 'companies', label: `Companies (${companies.length})`, icon: Building2 },
              { id: 'contacts', label: `Contacts (${contacts.length})`, icon: UserCheck },
              { id: 'activities', label: `Activities (${activities.length})`, icon: Clock },
              { id: 'follow-ups', label: `Follow-ups (${followUps.length})`, icon: ListTodo }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Toggle Calendar View */}
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center space-x-1.5 shrink-0 ${
              showCalendar
                ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{showCalendar ? 'Tutup Calendar' : 'Calendar View'}</span>
          </button>
        </div>

        {/* Calendar View Drawer / Section */}
        {showCalendar && (
          <div className="transition-all">
            <CRMCalendarView followUps={followUps} activities={activities} />
          </div>
        )}

        {/* Dynamic Tab Body */}
        <div className="pt-2">
          {activeTab === 'pipeline' && (
            <CRMPipelineKanban
              opportunities={opportunities}
              onSelectOpportunity={(opp) => setSelectedOpp(opp)}
              onEditOpportunity={(opp) => setSelectedOpp(opp)}
              onMoveStage={handleMoveStage}
              onWhatsAppClick={(opp) => handleWhatsAppClick(opp)}
            />
          )}

          {activeTab === 'leads' && (
            <CRMLeadsTab
              leads={leads}
              onRefresh={loadData}
              onWhatsAppClick={(phone, name, ctx) => handleWhatsAppClick(phone, name, ctx)}
              onOpenOpportunity={(oppId) => {
                const opp = CRMService.getOpportunity(oppId);
                if (opp) setSelectedOpp(opp);
              }}
            />
          )}

          {activeTab === 'companies' && (
            <CRMCompaniesTab
              companies={companies}
              opportunities={opportunities}
              onRefresh={loadData}
            />
          )}

          {activeTab === 'contacts' && (
            <CRMContactsTab
              contacts={contacts}
              companies={companies}
              onRefresh={loadData}
              onWhatsAppClick={(phone, name, ctx) => handleWhatsAppClick(phone, name, ctx)}
            />
          )}

          {activeTab === 'activities' && (
            <CRMActivitiesTab
              activities={activities}
              onRefresh={loadData}
            />
          )}

          {activeTab === 'follow-ups' && (
            <CRMFollowUpsTab
              followUps={followUps}
              onRefresh={loadData}
              onWhatsAppClick={(phone, name, ctx) => handleWhatsAppClick(phone, name, ctx)}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <OpportunityDetailModal
        opportunity={selectedOpp}
        onClose={() => setSelectedOpp(null)}
        onUpdate={loadData}
        onWhatsAppClick={(opp) => handleWhatsAppClick(opp)}
      />

      <CRMAiAssistantModal
        opportunities={opportunities}
        leads={leads}
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
      />

      <CRMAuditLogModal
        logs={auditLogs}
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />

      {/* Modal New Opportunity */}
      {showNewOppModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateNewOpportunity} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">+ Create New Opportunity Deal</h3>
            <div>
              <label className="text-xs text-slate-400">Nama Proyek / Solution</label>
              <input
                type="text"
                required
                value={newOppName}
                onChange={(e) => setNewOppName(e.target.value)}
                placeholder="Mining Telematics & Fleet AI..."
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Nama Perusahaan</label>
              <input
                type="text"
                required
                value={newOppComp}
                onChange={(e) => setNewOppComp(e.target.value)}
                placeholder="PT Nusantara Energi"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Nama Kontak Utama</label>
              <input
                type="text"
                required
                value={newOppContact}
                onChange={(e) => setNewOppContact(e.target.value)}
                placeholder="Hendra Gunawan"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Estimasi Min (IDR)</label>
                <input
                  type="number"
                  value={newOppValueMin}
                  onChange={(e) => setNewOppValueMin(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Estimasi Max (IDR)</label>
                <input
                  type="number"
                  value={newOppValueMax}
                  onChange={(e) => setNewOppValueMax(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewOppModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-500/20"
              >
                Buat Deal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
