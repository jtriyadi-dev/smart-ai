import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { SupportTicketService } from '../../services/SupportTicketService';
import { TicketAIService } from '../../services/TicketAIService';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { SupportNotificationService } from '../../services/SupportNotificationService';
import { TicketCategory, TicketPriority, TicketAttachment, CustomerProject, KnowledgeArticle } from '../../types';
import {
  LifeBuoy,
  ArrowLeft,
  Send,
  AlertTriangle,
  Upload,
  X,
  FileText,
  Sparkles,
  BookOpen,
  Info,
  ShieldCheck,
  CheckCircle2,
  FolderOpen,
  Layers,
  Lock,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const CustomerNewTicketPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [projects, setProjects] = useState<CustomerProject[]>([]);

  // Base Form Fields
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<TicketCategory>('BUG_REPORT');
  const [priority, setPriority] = useState<TicketPriority>('MEDIUM');
  const [projectId, setProjectId] = useState<string>('');
  const [moduleId, setModuleId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<TicketAttachment[]>([]);

  // Category Specific Fields
  const [bugAffectedModule, setBugAffectedModule] = useState('');
  const [bugStepsToReproduce, setBugStepsToReproduce] = useState('');
  const [bugExpectedResult, setBugExpectedResult] = useState('');
  const [bugActualResult, setBugActualResult] = useState('');
  const [bugBrowser, setBugBrowser] = useState('Chrome');
  const [bugDevice, setBugDevice] = useState('Desktop Workstation');
  const [bugOS, setBugOS] = useState('Windows 11');

  const [techProblemDescription, setTechProblemDescription] = useState('');
  const [techEnvironment, setTechEnvironment] = useState('Production');
  const [techErrorMessage, setTechErrorMessage] = useState('');

  const [featureName, setFeatureName] = useState('');
  const [featureBusinessNeed, setFeatureBusinessNeed] = useState('');
  const [featureExpectedBenefit, setFeatureExpectedBenefit] = useState('');

  const [accountIssueType, setAccountIssueType] = useState('Aktivasi User / Hak Akses');
  const [accountAffectedUser, setAccountAffectedUser] = useState('');
  const [accountEmail, setAccountEmail] = useState('');

  const [billingInvoiceNumber, setBillingInvoiceNumber] = useState('');
  const [billingPaymentRef, setBillingPaymentRef] = useState('');

  // Modals & UI States
  const [urgentWarningOpen, setUrgentWarningOpen] = useState(false);
  const [createdTicketNumber, setCreatedTicketNumber] = useState<string | null>(null);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [kbSuggestions, setKbSuggestions] = useState<KnowledgeArticle[]>([]);
  const [duplicateWarning, setDuplicateWarning] = useState<{ isDuplicateDetected: boolean; similarTickets: any[] }>({
    isDuplicateDetected: false,
    similarTickets: []
  });

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const projList = CustomerPortalService.getProjects(s.company.id);
      setProjects(projList);
      if (projList.length > 0) {
        setProjectId(projList[0].id);
      }
    }
  }, []);

  // Update modules when project changes
  const selectedProject = projects.find((p) => p.id === projectId);
  const availableModules = selectedProject ? selectedProject.modules : [];

  // Live KB Article Suggestions as subject/description change
  useEffect(() => {
    if (subject.length > 5) {
      const articles = KnowledgeBaseService.getArticles('PUBLIC', 'ALL', subject);
      setKbSuggestions(articles.slice(0, 3));

      if (session) {
        const dupCheck = TicketAIService.detectDuplicate(subject, description, session.company.id);
        setDuplicateWarning(dupCheck);
      }
    } else {
      setKbSuggestions([]);
      setDuplicateWarning({ isDuplicateDetected: false, similarTickets: [] });
    }
  }, [subject, description, session?.company?.id]);

  // Handle priority choice with urgent confirmation
  const handlePriorityChange = (val: TicketPriority) => {
    if (val === 'URGENT') {
      setUrgentWarningOpen(true);
    }
    setPriority(val);
  };

  // Mock Attachment Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAtt: TicketAttachment = {
        id: `ATT-${Date.now()}`,
        name: file.name,
        fileName: file.name,
        url: URL.createObjectURL(file),
        storageReference: `/attachments/temp/${file.name}`,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: file.type || 'application/octet-stream',
        uploadedBy: session?.user.id,
        uploadedByName: session?.user.name,
        isScanned: true,
        scanStatus: 'CLEAN',
        createdAt: new Date().toISOString()
      };
      setAttachments((prev) => [...prev, newAtt]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Ticket Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    if (subject.length < 5) {
      alert('Subject ticket minimal 5 karakter.');
      return;
    }
    if (!description && category !== 'FEATURE_REQUEST') {
      alert('Deskripsi ticket wajib diisi.');
      return;
    }

    setSubmitting(true);

    // Build Category Specific Data
    let categorySpecificData: any = {};
    if (category === 'BUG_REPORT') {
      categorySpecificData = {
        affectedModule: bugAffectedModule || (availableModules.find((m) => m.id === moduleId)?.name || 'General Module'),
        stepsToReproduce: bugStepsToReproduce,
        expectedResult: bugExpectedResult,
        actualResult: bugActualResult,
        browser: bugBrowser,
        device: bugDevice,
        operatingSystem: bugOS
      };
    } else if (category === 'TECHNICAL_SUPPORT') {
      categorySpecificData = {
        problemDescription: techProblemDescription || description,
        affectedModule: availableModules.find((m) => m.id === moduleId)?.name || 'General Module',
        environment: techEnvironment,
        errorMessage: techErrorMessage
      };
    } else if (category === 'FEATURE_REQUEST') {
      categorySpecificData = {
        featureName: featureName || subject,
        businessNeed: featureBusinessNeed,
        expectedBenefit: featureExpectedBenefit,
        priority
      };
    } else if (category === 'ACCOUNT_ISSUE') {
      categorySpecificData = {
        issueType: accountIssueType,
        affectedUser: accountAffectedUser || session.user.name,
        accountEmail: accountEmail || session.user.email
      };
    } else if (category === 'BILLING_ISSUE') {
      categorySpecificData = {
        invoiceNumber: billingInvoiceNumber,
        paymentReference: billingPaymentRef,
        issueDescription: description
      };
    }

    const selectedMod = availableModules.find((m) => m.id === moduleId);

    setTimeout(() => {
      const newTicket = SupportTicketService.createTicket({
        companyId: session.company.id,
        companyName: session.company.name,
        customerUserId: session.user.id,
        customerUserName: session.user.name,
        projectId: projectId || undefined,
        projectName: selectedProject?.projectName,
        moduleId: moduleId || undefined,
        moduleName: selectedMod?.name,
        category,
        priority,
        subject,
        description: description || featureBusinessNeed || 'Support ticket submission.',
        categorySpecificData,
        attachments
      });

      // Dispatch Notification
      SupportNotificationService.notifyCustomer({
        companyId: session.company.id,
        userId: session.user.id,
        title: `Ticket Baru Berhasil Dibuat`,
        message: `Support Ticket #${newTicket.ticketNumber} telah diterima dan masuk antrean penanganan SLA.`,
        ticketId: newTicket.id
      });

      setCreatedTicketNumber(newTicket.ticketNumber);
      setCreatedTicketId(newTicket.id);
      setSubmitting(false);
    }, 600);
  };

  if (!session) return null;

  return (
    <CustomerPortalLayout activePath="/portal/tickets">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/portal/tickets')}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Ticket List
        </button>
        <span className="text-xs text-slate-400 font-medium">
          Layanan Bantuan Resmi SMART-AI.ID
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <LifeBuoy className="w-5 h-5 text-cyan-400" /> Create Support Ticket
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Sampaikan kendala teknis, laporan bug, masalah akun, tagihan, atau pengajuan fitur baru untuk sistem Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Kategori Support Ticket <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'BUG_REPORT', label: 'Bug Report', desc: 'Error, crash, spike' },
                    { id: 'TECHNICAL_SUPPORT', label: 'Technical Support', desc: 'Bantuan sistem, API, IoT' },
                    { id: 'FEATURE_REQUEST', label: 'Feature Request', desc: 'Pengajuan fitur baru' },
                    { id: 'ACCOUNT_ISSUE', label: 'Account Issue', desc: 'Hak akses & akun' },
                    { id: 'BILLING_ISSUE', label: 'Billing Issue', desc: 'Invoice & pembayaran' }
                  ].map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setCategory(c.id as TicketCategory)}
                      className={`p-3 rounded-xl border text-left transition ${
                        category === c.id
                          ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200">{c.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Subjek Ticket <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-slate-500">{subject.length}/200 Karakter</span>
                </div>
                <input
                  type="text"
                  required
                  minLength={5}
                  maxLength={200}
                  placeholder="Contoh: Anomali Sensor Telemetry Bahan Bakar CAT 777"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Priority & Project/Module Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Priority */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tingkat Prioritas <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="LOW">Low (Respon 24 Jam)</option>
                    <option value="MEDIUM">Medium (Respon 12 Jam)</option>
                    <option value="HIGH">High (Respon 4 Jam)</option>
                    <option value="URGENT">URGENT (Respon 1 Jam - Kritis)</option>
                  </select>
                </div>

                {/* Project */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Terkait
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">-- Tanpa Spesifik Project --</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.projectName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Module */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Modul Terkait
                  </label>
                  <select
                    value={moduleId}
                    onChange={(e) => setModuleId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">-- Seluruh Modul --</option>
                    {availableModules.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DYNAMIC CATEGORY SPECIFIC FORM FIELDS */}

              {/* 1. BUG REPORT FIELDS */}
              {category === 'BUG_REPORT' && (
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-4">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Detail Laporan Bug
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Browser</label>
                      <select
                        value={bugBrowser}
                        onChange={(e) => setBugBrowser(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="Chrome">Google Chrome</option>
                        <option value="Safari">Apple Safari</option>
                        <option value="Firefox">Mozilla Firefox</option>
                        <option value="Edge">Microsoft Edge</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Perangkat (Device)</label>
                      <select
                        value={bugDevice}
                        onChange={(e) => setBugDevice(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="Desktop Workstation">Desktop / Workstation</option>
                        <option value="Laptop">Laptop / Notebook</option>
                        <option value="Tablet">Tablet (iPad/Android)</option>
                        <option value="Mobile Smartphone">Mobile Smartphone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Sistem Operasi</label>
                      <select
                        value={bugOS}
                        onChange={(e) => setBugOS(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="Windows 11">Windows 11 / 10</option>
                        <option value="macOS">macOS Apple Silicon</option>
                        <option value="Linux">Linux (Ubuntu/Fedora)</option>
                        <option value="iOS">iOS / iPadOS</option>
                        <option value="Android">Android OS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Steps to Reproduce (Langkah Mengulang Bug)</label>
                    <textarea
                      rows={2}
                      placeholder="1. Buka halaman Fleet Live Monitor&#10;2. Filter unit CAT 777-B12&#10;3. Amati lonjakan grafik"
                      value={bugStepsToReproduce}
                      onChange={(e) => setBugStepsToReproduce(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Expected Result (Hasil yang Diharapkan)</label>
                      <input
                        type="text"
                        placeholder="Grafik kontinyu dalam range normal 45-60 L/jam"
                        value={bugExpectedResult}
                        onChange={(e) => setBugExpectedResult(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Actual Result (Hasil Aktual yang Terjadi)</label>
                      <input
                        type="text"
                        placeholder="Spike mendadak hingga 999 L/jam"
                        value={bugActualResult}
                        onChange={(e) => setBugActualResult(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TECHNICAL SUPPORT FIELDS */}
              {category === 'TECHNICAL_SUPPORT' && (
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" /> Detail Bantuan Teknis
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Environment Server</label>
                      <select
                        value={techEnvironment}
                        onChange={(e) => setTechEnvironment(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="Production">Production Live Server</option>
                        <option value="Staging">Staging UAT Server</option>
                        <option value="Development">Development Sandbox</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Error Code / Message (Jika Ada)</label>
                      <input
                        type="text"
                        placeholder="e.g. 504 Gateway Timeout / MQTT Connection Refused"
                        value={techErrorMessage}
                        onChange={(e) => setTechErrorMessage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. FEATURE REQUEST FIELDS WITH MANDATORY DISCLAIMER */}
              {category === 'FEATURE_REQUEST' && (
                <div className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-4 space-y-3">
                  {/* Mandatory Disclaimer Banner */}
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>
                      <strong>Disclaimer Pengajuan Fitur:</strong> Feature request yang diajukan akan dievaluasi oleh Product Manager SMART-AI.ID. Pengajuan ticket ini tidak otomatis berarti fitur akan langsung dikembangkan tanpa kesepakatan scope & timeline.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Kebutuhan Bisnis (Business Need)</label>
                    <textarea
                      rows={2}
                      placeholder="Jelaskan alasan bisnis di balik kebutuhan fitur ini..."
                      value={featureBusinessNeed}
                      onChange={(e) => setFeatureBusinessNeed(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Ekspektasi Manfaat (Expected Benefit)</label>
                    <input
                      type="text"
                      placeholder="e.g. Mempercepat perhitungan ETA rute 15%"
                      value={featureExpectedBenefit}
                      onChange={(e) => setFeatureExpectedBenefit(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* 4. ACCOUNT ISSUE FIELDS (STRICT NO PASSWORD WARNING) */}
              {category === 'ACCOUNT_ISSUE' && (
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>
                      <strong>Jaminan Keamanan:</strong> Demi keamanan akun, JANGAN PERNAH menyertakan kata sandi (password) atau credential rahasia Anda pada form ini.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Tipe Masalah Akun</label>
                      <select
                        value={accountIssueType}
                        onChange={(e) => setAccountIssueType(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="Aktivasi User / Hak Akses">Aktivasi User Baru / Hak Akses Portal</option>
                        <option value="Lupa Email Login">Perubahan Email Login User</option>
                        <option value="Kendala 2FA Otentikasi">Kendala Otentikasi 2FA</option>
                        <option value="Lainnya">Masalah Akun Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Email Akun Terdampak</label>
                      <input
                        type="email"
                        placeholder="user@nusantaramining.co.id"
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. BILLING ISSUE FIELDS (STRICT NO CREDIT CARD / PAYMENT CREDENTIALS) */}
              {category === 'BILLING_ISSUE' && (
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong>Keamanan Finansial:</strong> JANGAN PERNAH menyertakan Nomor Kartu Kredit, CVV, PIN Bank, atau kata sandi perbankan.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Nomor Invoice Terkait</label>
                      <input
                        type="text"
                        placeholder="e.g. SAI-INV-2026-0001"
                        value={billingInvoiceNumber}
                        onChange={(e) => setBillingInvoiceNumber(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Nomor / Kode Referensi Transfer</label>
                      <input
                        type="text"
                        placeholder="e.g. TRX-VA-988123778"
                        value={billingPaymentRef}
                        onChange={(e) => setBillingPaymentRef(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Description (Rich formatting supported) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Deskripsi Lengkap Kendala / Detail Request <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Jelaskan secara kronologis permasalahan atau kronologi kendala yang dialami..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
                />
              </div>

              {/* File Attachment Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Lampiran (Screenshot, PDF, Image, Log File)
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 text-center bg-slate-950/40 transition">
                  <input
                    type="file"
                    id="ticket-attachment-upload"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.pdf,.docx,.txt,.log,.zip"
                  />
                  <label htmlFor="ticket-attachment-upload" className="cursor-pointer space-y-1 block">
                    <Upload className="w-6 h-6 text-cyan-400 mx-auto" />
                    <div className="text-xs font-semibold text-slate-200">
                      Klik untuk Upload File Lampiran
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Format didukung: PNG, JPG, PDF, DOCX, LOG, ZIP (Maks 25MB). Otomatis terscan bebas malware.
                    </p>
                  </label>
                </div>

                {/* Uploaded attachments list */}
                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="text-slate-200 truncate">{att.name}</span>
                          <span className="text-[10px] text-slate-500">({att.size})</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                            Clean Scanned
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/portal/tickets')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> Memproses Ticket...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Support Ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar Assistant & Suggestions (1 col) */}
        <div className="space-y-6">
          {/* Duplicate Detection Alert */}
          {duplicateWarning.isDuplicateDetected && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Kemungkinan Ticket Serupa Terdeteksi
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Kecerdasan AI menemukan ticket yang mungkin memiliki topik serupa yang sedang ditangani:
              </p>
              <div className="space-y-1.5">
                {duplicateWarning.similarTickets.map((st: any, i: number) => (
                  <div key={i} className="p-2 rounded bg-slate-950/80 border border-slate-800">
                    <span className="font-mono font-bold text-cyan-400">{st.ticketNumber}</span>: {st.subject}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Knowledge Base Auto Suggestions */}
          {kbSuggestions.length > 0 && (
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> AI Knowledge Suggestions
              </div>
              <p className="text-[11px] text-slate-400">
                Artikel bantuan berikut mungkin membantu memecahkan kendala Anda secara instan:
              </p>

              <div className="space-y-2">
                {kbSuggestions.map((art) => (
                  <div
                    key={art.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-cyan-300 mb-1">{art.title}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{art.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLA Info Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> SLA Service Target
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seluruh Support Ticket diproses berdasarkan Service Level Agreement resmi SMART-AI.ID:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-rose-400 font-bold">URGENT</span>
                <span className="text-slate-300 font-mono">1 Jam Respon</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-amber-400 font-bold">HIGH</span>
                <span className="text-slate-300 font-mono">4 Jam Respon</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-blue-400 font-bold">MEDIUM</span>
                <span className="text-slate-300 font-mono">12 Jam Respon</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">LOW</span>
                <span className="text-slate-300 font-mono">24 Jam Respon</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500">
              Jam Kerja Support: Senin – Jumat 08:00 – 17:00 WIB (SLA Priority 24/7 untuk URGENT).
            </div>
          </div>
        </div>
      </div>

      {/* URGENT WARNING MODAL */}
      {urgentWarningOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0 animate-bounce" />
              <h3 className="text-base font-bold text-white">Confirmation: Urgent Priority</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Please use urgent priority only for critical business-impacting issues."
            </p>
            <p className="text-[11px] text-slate-400">
              Penggunaan prioritas URGENT akan mengaktifkan alarm On-Call Engineer 24/7 SMART-AI.ID.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setPriority('HIGH');
                  setUrgentWarningOpen(false);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Ganti ke Priority High
              </button>
              <button
                onClick={() => setUrgentWarningOpen(false)}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold shadow-lg"
              >
                Konfirmasi Urgent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CREATED MODAL */}
      {createdTicketNumber && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">Ticket Created Successfully</h3>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm font-bold text-cyan-400">
              {createdTicketNumber}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Support Ticket Anda telah diterima. Tim Specialist kami akan segera menindaklanjuti berdasarkan target SLA.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate(`/portal/support/${createdTicketId}`)}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                View Ticket Thread
              </button>
              <button
                onClick={() => navigate('/portal/tickets')}
                className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Kembali ke Support Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
