import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  User,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  Plus,
  FileText,
  CheckCircle2,
  Calendar,
  Tag,
  DollarSign,
  AlertCircle,
  Copy,
  Check,
  Send,
  Layers,
  Award,
  ChevronRight,
  Briefcase,
  HelpCircle,
  ListTodo
} from 'lucide-react';
import {
  Opportunity,
  OpportunityStage,
  CRMCompany,
  CRMContact,
  CRMActivity,
  CRMFollowUp,
  CRMNote,
  NoteType
} from '../../types';
import { CRMService } from '../../services/crmService';
import { ActivityService } from '../../services/activityService';
import { FollowUpService } from '../../services/followUpService';
import { AICRMService, AIMeetingBrief } from '../../services/aiCrmService';
import { AISalesAssistantPanel } from './AISalesAssistantPanel';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onUpdate: () => void;
  onWhatsAppClick: (opp: Opportunity) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onUpdate,
  onWhatsAppClick
}) => {
  if (!opportunity) return null;

  const [activeTab, setActiveTab] = useState<
    'overview' | 'activities' | 'notes' | 'followups' | 'ai' | 'documents'
  >('overview');

  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [followUps, setFollowUps] = useState<CRMFollowUp[]>([]);
  const [notes, setNotes] = useState<CRMNote[]>([]);
  const [company, setCompany] = useState<CRMCompany | undefined>();
  const [contact, setContact] = useState<CRMContact | undefined>();

  // AI Assistant states
  const [nextActionRecommendation, setNextActionRecommendation] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [isGeneratingMsg, setIsGeneratingMsg] = useState<boolean>(false);
  const [copiedMsg, setCopiedMsg] = useState<boolean>(false);
  const [meetingBrief, setMeetingBrief] = useState<AIMeetingBrief | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState<boolean>(false);

  // New Note State
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [newNoteType, setNewNoteType] = useState<NoteType>('Sales');

  // New Activity State
  const [showAddActivityModal, setShowAddActivityModal] = useState<boolean>(false);
  const [newActType, setNewActType] = useState<CRMActivity['type']>('Call');
  const [newActSubject, setNewActSubject] = useState<string>('');
  const [newActDesc, setNewActDesc] = useState<string>('');

  // New Follow-up State
  const [showAddFollowUpModal, setShowAddFollowUpModal] = useState<boolean>(false);
  const [newFolTask, setNewFolTask] = useState<string>('');
  const [newFolDate, setNewFolDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newFolTime, setNewFolTime] = useState<string>('10:00');

  useEffect(() => {
    if (opportunity) {
      // Fetch related data
      const acts = ActivityService.getTimeline('opportunity', opportunity.id);
      setActivities(acts);

      const fols = FollowUpService.getFollowUps().filter((f) => f.opportunityId === opportunity.id);
      setFollowUps(fols);

      if (opportunity.companyId) {
        setCompany(CRMService.getCompany(opportunity.companyId));
      }
      if (opportunity.contactId) {
        setContact(CRMService.getContact(opportunity.contactId));
      }

      // Recommend next action
      const rec = AICRMService.recommendNextAction(opportunity, acts, fols);
      setNextActionRecommendation(rec);
    }
  }, [opportunity]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || !opportunity) return;

    const newNoteObj: CRMNote = {
      id: `NOTE-${Date.now().toString(36)}`,
      entityType: 'opportunity',
      entityId: opportunity.id,
      type: newNoteType,
      content: newNoteContent,
      author: 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes([newNoteObj, ...notes]);
    setNewNoteContent('');
    ActivityService.createActivity({
      type: 'Note',
      subject: `Catatan Baru (${newNoteType})`,
      description: newNoteContent,
      opportunityId: opportunity.id
    });
    onUpdate();
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActSubject.trim() || !opportunity) return;

    const newAct = ActivityService.createActivity({
      type: newActType,
      subject: newActSubject,
      description: newActDesc,
      opportunityId: opportunity.id,
      companyId: opportunity.companyId,
      companyName: opportunity.companyName,
      contactName: opportunity.contactName
    });

    setActivities([newAct, ...activities]);
    setShowAddActivityModal(false);
    setNewActSubject('');
    setNewActDesc('');
    onUpdate();
  };

  const handleCreateFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolTask.trim() || !opportunity) return;

    const newFol = FollowUpService.createFollowUp({
      opportunityId: opportunity.id,
      companyName: opportunity.companyName,
      contactName: opportunity.contactName,
      task: newFolTask,
      dueDate: newFolDate,
      dueTime: newFolTime,
      priority: opportunity.priority
    });

    setFollowUps([newFol, ...followUps]);
    setShowAddFollowUpModal(false);
    setNewFolTask('');
    onUpdate();
  };

  const handleGenerateFollowUpMessage = async () => {
    if (!opportunity) return;
    setIsGeneratingMsg(true);
    const msg = await AICRMService.generateFollowUpMessage(opportunity, contact);
    setGeneratedMessage(msg);
    setIsGeneratingMsg(false);
  };

  const handleGenerateMeetingBrief = async () => {
    if (!opportunity) return;
    setIsGeneratingBrief(true);
    const brief = await AICRMService.generateMeetingBrief(opportunity, company, contact);
    setMeetingBrief(brief);
    setIsGeneratingBrief(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-5 bg-slate-950 border-b border-slate-800/80 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {opportunity.stage}
              </span>
              <span className="text-xs text-slate-400 font-mono">Ref ID: #{opportunity.id}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                Score: {opportunity.leadScore}/100
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{opportunity.name}</h2>
            <p className="text-xs text-slate-400 flex items-center space-x-2">
              <span className="text-slate-200 font-semibold">{opportunity.companyName}</span>
              <span>•</span>
              <span>{opportunity.industry}</span>
              <span>•</span>
              <span>Sales Owner: <strong className="text-blue-300">{opportunity.owner}</strong></span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onWhatsAppClick(opportunity)}
              className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center space-x-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Next Action Bar */}
        {nextActionRecommendation && (
          <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-blue-500/30 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs">
              <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <span className="font-bold text-blue-300 mr-2">AI Recommended Next Action:</span>
                <span className="text-slate-200">{nextActionRecommendation}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 px-5 pt-3 bg-slate-950/60 border-b border-slate-800 overflow-x-auto">
          {[
            { id: 'overview', label: 'Ringkasan Deals', icon: Briefcase },
            { id: 'activities', label: `Timeline (${activities.length})`, icon: Clock },
            { id: 'notes', label: 'Internal Notes', icon: FileText },
            { id: 'followups', label: `Follow-up (${followUps.length})`, icon: ListTodo },
            { id: 'ai', label: 'AI Assistant', icon: Sparkles },
            { id: 'documents', label: 'Requirements & Spec', icon: Layers }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-blue-400 border-t-2 border-blue-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1 & 2: Financials & Project Context */}
              <div className="md:col-span-2 space-y-5">
                {/* Financial Summary Card */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Perkiraan Nilai Investasi & Probabilitas</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Estimated Investment</div>
                      <div className="text-base font-bold text-white font-mono mt-1">
                        Rp {((opportunity.estimatedValueMin + opportunity.estimatedValueMax) / 2 / 1e6).toFixed(0)} Juta
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Range: {opportunity.estimatedValueMin / 1e6}M - {opportunity.estimatedValueMax / 1e6}M</div>
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Stage Probability</div>
                      <div className="text-base font-bold text-cyan-400 font-mono mt-1">
                        {opportunity.probability}%
                      </div>
                      <div className="text-[10px] text-cyan-500/80 mt-0.5">Weighted: Rp {(opportunity.weightedValue / 1e6).toFixed(0)} Jt</div>
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Expected Close Date</div>
                      <div className="text-sm font-bold text-amber-300 mt-1 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{opportunity.expectedCloseDate || 'Agustus 2026'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi Proyek</h3>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                    {opportunity.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                    <Tag className="w-3.5 h-3.5 text-blue-400" />
                    <span>Tags / Label</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags?.map((t) => (
                      <span key={t} className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold rounded-lg">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 3: Contact & Company Profile */}
              <div className="space-y-5">
                {/* Contact Card */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                    <User className="w-4 h-4 text-purple-400" />
                    <span>Kontak Penanggung Jawab</span>
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="text-sm font-bold text-white">{opportunity.contactName}</div>
                    {contact && <div className="text-slate-400 font-medium">{contact.position}</div>}

                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <a href={`mailto:${opportunity.contactEmail}`} className="hover:underline truncate">{opportunity.contactEmail || 'Belum diisi'}</a>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{opportunity.contactPhone || 'Belum diisi'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Card */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>Profil Perusahaan</span>
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="text-sm font-bold text-white">{opportunity.companyName}</div>
                    <div className="text-slate-400">{opportunity.industry}</div>

                    {company && (
                      <div className="pt-2 border-t border-slate-800 space-y-1.5 text-slate-300 text-[11px]">
                        <div>Ukuran: <strong className="text-slate-200">{company.companySize}</strong></div>
                        <div>Website: <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{company.website}</a></div>
                        <div>Kota: <strong className="text-slate-200">{company.city}</strong></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITIES TIMELINE */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Vertical Activity Timeline</h3>
                <button
                  onClick={() => setShowAddActivityModal(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Activity</span>
                </button>
              </div>

              {/* Timeline Container */}
              <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                {activities.map((act) => (
                  <div key={act.id} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {act.type}
                          </span>
                          <span className="font-bold text-slate-200">{act.subject}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {act.date} {act.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{act.description}</p>
                      <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-slate-900">
                        <span>Oleh: <strong>{act.actor || act.assignedTo}</strong></span>
                        {act.duration && <span>Durasi: {act.duration}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-5">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tambah Internal Note</h3>
                  <select
                    value={newNoteType}
                    onChange={(e) => setNewNoteType(e.target.value as NoteType)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    <option value="General">General</option>
                    <option value="Sales">Sales</option>
                    <option value="Technical">Technical</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Tuliskan catatan internal mengenai preferensi customer, arsitektur, atau hambatan nego..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                ></textarea>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Simpan Catatan</span>
                  </button>
                </div>
              </form>

              {/* Note List */}
              <div className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {note.type} Note
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{note.content}</p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                      Penulis: <strong>{note.author}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FOLLOW-UPS */}
          {activeTab === 'followups' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Daftar Task Follow-up</h3>
                <button
                  onClick={() => setShowAddFollowUpModal(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Follow-up</span>
                </button>
              </div>

              <div className="space-y-3">
                {followUps.length === 0 ? (
                  <div className="text-center p-8 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs">
                    Belum ada tugas follow-up terdaftar.
                  </div>
                ) : (
                  followUps.map((fol) => (
                    <div key={fol.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              fol.status === 'Overdue'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : fol.status === 'Completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}
                          >
                            {fol.status}
                          </span>
                          <span className="text-xs font-bold text-white">{fol.task}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Jatuh Tempo: <strong className="text-amber-300">{fol.dueDate} ({fol.dueTime})</strong> • PJ: {fol.assignedTo}
                        </div>
                      </div>

                      {fol.status !== 'Completed' && (
                        <button
                          onClick={() => {
                            FollowUpService.completeFollowUp(fol.id);
                            onUpdate();
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selesai</span>
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: AI CRM ASSISTANT */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <AISalesAssistantPanel opportunity={opportunity} />
            </div>
          )}

          {/* TAB 6: DOCUMENTS & TECHNICAL SPECS */}
          {activeTab === 'documents' && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Dokumen Kebutuhan & Integrasi AI Tools</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-blue-300">Sumber Lead: {opportunity.source}</div>
                  <p className="text-slate-400">
                    Terintegrasi secara otomatis dengan kalkulasi AI Project Estimator dan AI Requirement Analyzer.
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-purple-300">Status Proposal: {opportunity.proposalStatus || 'Draf Ditinjau'}</div>
                  <p className="text-slate-400">
                    Proposal ID: {opportunity.proposalId || 'PROP-2026-PENDING'} (Tanggal: {opportunity.proposalDate || '10 Ags 2026'})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Add Activity */}
      {showAddActivityModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateActivity} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">+ Tambah Aktivitas CRM</h3>
            <div>
              <label className="text-xs text-slate-400">Jenis Aktivitas</label>
              <select
                value={newActType}
                onChange={(e) => setNewActType(e.target.value as any)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Call">Call</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
                <option value="Demo">Demo</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Subjek</label>
              <input
                type="text"
                required
                value={newActSubject}
                onChange={(e) => setNewActSubject(e.target.value)}
                placeholder="Contoh: Panggilan Diskusi Arsitektur"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Deskripsi/Catatan</label>
              <textarea
                rows={3}
                value={newActDesc}
                onChange={(e) => setNewActDesc(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddActivityModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Add Follow-up */}
      {showAddFollowUpModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateFollowUp} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">+ Create Follow-up Task</h3>
            <div>
              <label className="text-xs text-slate-400">Deskripsi Tugas</label>
              <input
                type="text"
                required
                value={newFolTask}
                onChange={(e) => setNewFolTask(e.target.value)}
                placeholder="Contoh: Follow-up penawaran harga via WA"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Tanggal Jatuh Tempo</label>
                <input
                  type="date"
                  value={newFolDate}
                  onChange={(e) => setNewFolDate(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Jam</label>
                <input
                  type="time"
                  value={newFolTime}
                  onChange={(e) => setNewFolTime(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddFollowUpModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
              >
                Simpan Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
