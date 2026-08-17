import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { NotificationService } from '../../services/NotificationService';
import { RBACService } from '../../services/RBACService';
import {
  AppNotification,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  NotificationPreference,
  NotificationTemplate,
  NotificationDeliveryLog
} from '../../types';
import {
  Bell,
  CheckCheck,
  Trash2,
  Archive,
  Search,
  Filter,
  Users,
  Building2,
  FileText,
  DollarSign,
  Receipt,
  FolderKanban,
  LifeBuoy,
  ShieldAlert,
  Sliders,
  Send,
  RefreshCw,
  ExternalLink,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  Clock,
  Mail,
  Smartphone,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Eye,
  FileEdit
} from 'lucide-react';

export const AdminNotificationsPage: React.FC = () => {
  const { navigate } = useRouter();
  const currentUser = RBACService.getCurrentUser();

  const [activeTab, setActiveTab] = useState<'list' | 'preferences' | 'templates' | 'delivery-logs' | 'simulator'>('list');

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    unread: 0,
    read: 0,
    archived: 0,
    today: 0,
    thisWeek: 0,
    critical: 0,
    deliveryRate: 100,
    readRate: 100
  });

  // Filters
  const [statusFilter, setStatusFilter] = useState<'ALL' | NotificationStatus>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | NotificationType>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | NotificationPriority>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Preferences State
  const [preferences, setPreferences] = useState<NotificationPreference>(
    NotificationService.getPreferences(currentUser.id, currentUser.role)
  );
  const [prefsSavedMessage, setPrefsSavedMessage] = useState(false);

  // Templates State
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null);

  // Logs State
  const [deliveryLogs, setDeliveryLogs] = useState<NotificationDeliveryLog[]>([]);

  // Simulator State
  const [simulatingType, setSimulatingType] = useState<string | null>(null);
  const [simResult, setSimResult] = useState<string | null>(null);

  // Retention cleanup notice
  const [retentionCleanedCount, setRetentionCleanedCount] = useState<number | null>(null);

  const loadData = () => {
    const list = NotificationService.getNotifications({
      role: currentUser.role,
      tenantId: (currentUser as any).companyId,
      userId: currentUser.id,
      status: statusFilter,
      type: typeFilter,
      priority: priorityFilter,
      searchQuery
    });
    setNotifications(list);
    setStats(NotificationService.getStats(currentUser.role, (currentUser as any).companyId));
    setPreferences(NotificationService.getPreferences(currentUser.id, currentUser.role));
    setTemplates(NotificationService.getTemplates());
    setDeliveryLogs(NotificationService.getDeliveryLogs());
  };

  useEffect(() => {
    loadData();

    // Subscribe to realtime updates
    const unsubscribe = NotificationService.subscribe(() => {
      loadData();
    });

    return () => {
      unsubscribe();
    };
  }, [statusFilter, typeFilter, priorityFilter, searchQuery, currentUser.id, currentUser.role]);

  // Single Item Actions
  const handleMarkRead = (id: string) => {
    NotificationService.markAsRead(id);
    loadData();
  };

  const handleMarkUnread = (id: string) => {
    NotificationService.markAsUnread(id);
    loadData();
  };

  const handleArchive = (id: string) => {
    NotificationService.archiveNotification(id);
    loadData();
  };

  const handleRestore = (id: string) => {
    NotificationService.restoreNotification(id);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus notifikasi ini secara permanen?')) {
      NotificationService.deleteNotification(id);
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      loadData();
    }
  };

  const handleMarkAllRead = () => {
    NotificationService.markAllAsRead({
      role: currentUser.role,
      tenantId: (currentUser as any).companyId,
      userId: currentUser.id
    });
    loadData();
  };

  // Bulk Actions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(notifications.map((n) => n.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleBulkMarkRead = () => {
    NotificationService.bulkMarkAsRead(selectedIds);
    setSelectedIds([]);
    loadData();
  };

  const handleBulkArchive = () => {
    NotificationService.bulkArchive(selectedIds);
    setSelectedIds([]);
    loadData();
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Hapus ${selectedIds.length} notifikasi yang dipilih?`)) {
      NotificationService.bulkDelete(selectedIds);
      setSelectedIds([]);
      loadData();
    }
  };

  // Preferences Actions
  const handlePreferenceToggle = (type: NotificationType, channel: 'inApp' | 'email' | 'whatsapp' | 'push') => {
    const updated: NotificationPreference = {
      ...preferences,
      preferences: {
        ...preferences.preferences,
        [type]: {
          ...preferences.preferences[type],
          [channel]: !preferences.preferences[type]?.[channel]
        }
      }
    };
    setPreferences(updated);
    NotificationService.savePreferences(updated);
    setPrefsSavedMessage(true);
    setTimeout(() => setPrefsSavedMessage(false), 2000);
  };

  const handleSaveGeneralPrefs = (updates: Partial<NotificationPreference>) => {
    const updated: NotificationPreference = {
      ...preferences,
      ...updates
    };
    setPreferences(updated);
    NotificationService.savePreferences(updated);
    setPrefsSavedMessage(true);
    setTimeout(() => setPrefsSavedMessage(false), 2000);
  };

  const handleApplyRetention = () => {
    const count = NotificationService.applyRetentionPolicy(preferences.retentionDays);
    setRetentionCleanedCount(count);
    loadData();
    setTimeout(() => setRetentionCleanedCount(null), 4000);
  };

  // Template Editing
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    NotificationService.updateTemplate(editingTemplate.id, editingTemplate);
    setEditingTemplate(null);
    loadData();
  };

  // Simulation Events
  const triggerSimulationEvent = (eventType: NotificationType) => {
    setSimulatingType(eventType);
    setSimResult(null);

    setTimeout(() => {
      let created: AppNotification | null = null;
      switch (eventType) {
        case 'NEW_LEAD':
          created = NotificationService.notifyNewLead({
            leadId: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
            companyName: 'PT Mega Inovasi Nusantara',
            contactName: 'Ir. Hendra Gunawan',
            service: 'Custom Enterprise ERP & AI Assistant',
            budget: 'Rp 650.000.000',
            leadScore: 94
          });
          break;
        case 'NEW_CUSTOMER':
          created = NotificationService.notifyNewCustomer({
            customerId: `CUST-${Math.floor(100 + Math.random() * 900)}`,
            companyName: 'PT Samudera Logistik Prima',
            contactName: 'Bambang Wijaya',
            industry: 'Logistics & Supply Chain'
          });
          break;
        case 'PROPOSAL':
          created = NotificationService.notifyProposal({
            proposalId: 'PRP-2026-009',
            proposalNumber: 'SAI-PRP-2026-000009',
            companyName: 'PT Bank Digital Mandiri',
            status: 'ACCEPTED',
            amount: 'Rp 380.000.000'
          });
          break;
        case 'QUOTATION':
          created = NotificationService.notifyQuotation({
            quotationId: 'QTN-2026-021',
            quotationNumber: 'SAI-QTN-2026-000021',
            companyName: 'PT Astra Solusi Energi',
            status: 'APPROVED',
            total: 'Rp 275.000.000'
          });
          break;
        case 'PAYMENT':
          created = NotificationService.notifyPayment({
            invoiceId: 'INV-2026-0012',
            invoiceNumber: 'SAI-INV-2026-000012',
            companyName: 'PT Agro Industri Sentosa',
            amount: 'Rp 145.000.000',
            status: 'LUNAS (Verified)'
          });
          break;
        case 'PROJECT_UPDATE':
          created = NotificationService.notifyProjectUpdate({
            projectId: 'PRJ-108',
            projectName: 'Smart Mining Fleet AI',
            progress: 75,
            healthStatus: 'AT_RISK',
            milestoneName: 'Telemetry Sensor Integration'
          });
          break;
        case 'SUPPORT_TICKET':
          created = NotificationService.notifySupportTicket({
            ticketId: 'TCK-990',
            ticketNumber: 'SAI-TKT-2026-000018',
            subject: 'Latensi Tinggi pada Endpoint AI OCR',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            companyName: 'PT Finansial Sejahtera'
          });
          break;
        case 'SYSTEM':
          created = NotificationService.notifySystemAlert({
            title: 'Security Alert: Upaya Akses Anomali Terdeteksi',
            message: 'Sistem WAF memblokir 14 request mencurigakan dari IP asing ke endpoint admin.',
            priority: 'CRITICAL'
          });
          break;
      }

      setSimResult(`Event ${eventType} berhasil ditembakkan! Notifikasi masuk: "${created?.title}"`);
      setSimulatingType(null);
      loadData();
    }, 400);
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'NEW_LEAD':
        return <Users className="w-4 h-4 text-cyan-400" />;
      case 'NEW_CUSTOMER':
        return <Building2 className="w-4 h-4 text-indigo-400" />;
      case 'PROPOSAL':
        return <FileText className="w-4 h-4 text-amber-400" />;
      case 'QUOTATION':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'PAYMENT':
        return <Receipt className="w-4 h-4 text-teal-400" />;
      case 'PROJECT_UPDATE':
        return <FolderKanban className="w-4 h-4 text-blue-400" />;
      case 'SUPPORT_TICKET':
        return <LifeBuoy className="w-4 h-4 text-rose-400" />;
      case 'SYSTEM':
        return <ShieldAlert className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-purple-400" />;
    }
  };

  const getPriorityBadge = (priority: NotificationPriority) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-mono font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>CRITICAL</span>
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono font-bold">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-mono font-bold">
            MEDIUM
          </span>
        );
      case 'LOW':
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">LOW</span>
        );
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-950/50">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Enterprise Notification Center & Alert Engine
              </h1>
              <p className="text-xs text-slate-400">
                Pusat orkestrasi notifikasi real-time, preferensi multi-channel, dan template otomatis SMART-AI.ID
              </p>
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSaveGeneralPrefs({ soundEnabled: !preferences.soundEnabled })}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
              preferences.soundEnabled
                ? 'bg-purple-950/70 border-purple-600 text-purple-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Notification Sound"
          >
            {preferences.soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{preferences.soundEnabled ? 'Audio Alert: ON' : 'Audio: OFF'}</span>
          </button>

          <button
            onClick={handleMarkAllRead}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <CheckCheck className="w-4 h-4 text-cyan-400" />
            <span>Tandai Semua Dibaca</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Event Simulator</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
        <div className="glass-card p-3.5 rounded-2xl border border-slate-800 bg-slate-900/80">
          <div className="text-[10px] text-slate-500 uppercase">Total Alerts</div>
          <div className="text-white font-bold text-lg mt-0.5 font-display">{stats.total}</div>
          <div className="text-[10px] text-slate-400 mt-1">{stats.thisWeek} minggu ini</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-purple-800/40 bg-purple-950/20">
          <div className="text-[10px] text-purple-400 uppercase">Belum Dibaca</div>
          <div className="text-purple-300 font-bold text-lg mt-0.5 font-display flex items-center gap-2">
            <span>{stats.unread}</span>
            {stats.unread > 0 && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
          </div>
          <div className="text-[10px] text-purple-400/80 mt-1">{stats.read} sudah dibaca</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-rose-800/40 bg-rose-950/20">
          <div className="text-[10px] text-rose-400 uppercase">Alert Kritis</div>
          <div className="text-rose-300 font-bold text-lg mt-0.5 font-display">{stats.critical}</div>
          <div className="text-[10px] text-rose-400/80 mt-1">Butuh respon segera</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-emerald-800/40 bg-emerald-950/20">
          <div className="text-[10px] text-emerald-400 uppercase">Delivery Rate</div>
          <div className="text-emerald-300 font-bold text-lg mt-0.5 font-display">{stats.deliveryRate}%</div>
          <div className="text-[10px] text-emerald-400/80 mt-1">Multi-Channel SLA</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-cyan-800/40 bg-cyan-950/20">
          <div className="text-[10px] text-cyan-400 uppercase">Read Rate</div>
          <div className="text-cyan-300 font-bold text-lg mt-0.5 font-display">{stats.readRate}%</div>
          <div className="text-[10px] text-cyan-400/80 mt-1">Engagement tim</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-slate-800 bg-slate-900/80">
          <div className="text-[10px] text-slate-500 uppercase">Alert Hari Ini</div>
          <div className="text-white font-bold text-lg mt-0.5 font-display">{stats.today}</div>
          <div className="text-[10px] text-cyan-400 mt-1">Real-time Stream</div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'list'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Daftar Notifikasi</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-[10px] font-mono">
            {notifications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'preferences'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Preferensi Saluran</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'templates'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>Template Notifikasi ({templates.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('delivery-logs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'delivery-logs'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Log Transmisi Saluran</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'simulator'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
              : 'bg-slate-900 text-purple-400 hover:text-purple-300 border border-purple-900/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Event Simulator (Prompt 28)</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: NOTIFICATIONS LIST */}
      {/* ============================================================ */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Status Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    statusFilter === 'ALL'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setStatusFilter('UNREAD')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    statusFilter === 'UNREAD'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Belum Dibaca ({stats.unread})
                </button>
                <button
                  onClick={() => setStatusFilter('READ')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    statusFilter === 'READ'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Sudah Dibaca
                </button>
                <button
                  onClick={() => setStatusFilter('ARCHIVED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    statusFilter === 'ARCHIVED'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Arsip ({stats.archived})
                </button>
              </div>

              {/* Category Filter Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="ALL">Semua Kategori</option>
                  <option value="NEW_LEAD">💼 Lead Baru</option>
                  <option value="NEW_CUSTOMER">🏢 Klien Baru</option>
                  <option value="PROPOSAL">📄 Proposal</option>
                  <option value="QUOTATION">💰 Quotation</option>
                  <option value="PAYMENT">💳 Pembayaran & Invoice</option>
                  <option value="PROJECT_UPDATE">🚀 Proyek</option>
                  <option value="SUPPORT_TICKET">🛟 Support Ticket</option>
                  <option value="SYSTEM">🛡️ Sistem & Keamanan</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="ALL">Semua Prioritas</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari notifikasi berdasarkan judul, pesan, nomor referensi..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedIds.length > 0 && (
            <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-700/60 flex items-center justify-between gap-3 text-xs animate-in fade-in">
              <span className="font-mono font-bold text-purple-200">
                {selectedIds.length} notifikasi dipilih
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBulkMarkRead}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1 transition"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Tandai Dibaca</span>
                </button>
                <button
                  onClick={handleBulkArchive}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1 transition"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Arsipkan</span>
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-bold flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          )}

          {/* Retention Notification Purge Notice */}
          {retentionCleanedCount !== null && (
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Pembersihan Retensi Berhasil: {retentionCleanedCount} notifikasi lama berhasil dibersihkan.</span>
            </div>
          )}

          {/* Notifications Card List */}
          {notifications.length === 0 ? (
            <div className="glass-card rounded-2xl p-16 text-center border border-slate-800 bg-slate-900/50 flex flex-col items-center gap-3">
              <Bell className="w-12 h-12 text-slate-700 stroke-1" />
              <div>
                <h3 className="text-sm font-bold text-white">Tidak ada notifikasi ditemukan</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Coba ubah kata kunci pencarian atau sesuaikan filter status / kategori.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Select all bar */}
              <div className="flex items-center justify-between px-2 text-xs text-slate-400 font-mono">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === notifications.length && notifications.length > 0}
                    onChange={handleSelectAll}
                    className="rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Pilih Semua ({notifications.length})</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleApplyRetention}
                    className="text-[11px] text-slate-500 hover:text-cyan-400 transition underline"
                  >
                    Jalankan Pembersihan Retensi ({preferences.retentionDays} Hari)
                  </button>
                </div>
              </div>

              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    item.status === 'UNREAD'
                      ? 'bg-slate-900/90 border-purple-500/40 shadow-lg shadow-purple-950/20'
                      : item.status === 'ARCHIVED'
                      ? 'bg-slate-950/40 border-slate-900 opacity-60'
                      : 'bg-slate-950/80 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleToggleSelect(item.id)}
                      className="mt-1 rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0"
                    />

                    {/* Icon */}
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                      {getTypeIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-xs">{item.title}</span>
                        {getPriorityBadge(item.priority)}
                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {item.category}
                        </span>
                        {item.status === 'UNREAD' && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>

                      <p className="text-slate-300 text-xs leading-relaxed">{item.message}</p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-mono text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-600" />
                          <span>{formatTimeAgo(item.createdAt)}</span>
                        </span>

                        {item.channels && item.channels.length > 0 && (
                          <div className="flex items-center gap-1">
                            <span>Saluran:</span>
                            {item.channels.map((ch) => (
                              <span
                                key={ch}
                                className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[9px]"
                              >
                                {ch}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.entityId && (
                          <span className="text-purple-400">Ref: {item.entityId}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    {item.status === 'UNREAD' ? (
                      <button
                        onClick={() => handleMarkRead(item.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-purple-950 text-slate-300 hover:text-purple-300 border border-slate-800 transition"
                        title="Tandai Dibaca"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkUnread(item.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                        title="Tandai Belum Dibaca"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {item.status === 'ARCHIVED' ? (
                      <button
                        onClick={() => handleRestore(item.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                        title="Kembalikan dari Arsip"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleArchive(item.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                        title="Arsipkan"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-800 transition"
                      title="Hapus Notifikasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {item.actionUrl && (
                      <button
                        onClick={() => {
                          NotificationService.markAsRead(item.id);
                          navigate(item.actionUrl);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
                      >
                        <span>Buka Detail</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: NOTIFICATION PREFERENCES & CHANNELS */}
      {/* ============================================================ */}
      {activeTab === 'preferences' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/90 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Pengaturan Saluran & Preferensi Notifikasi
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Konfigurasikan saluran (In-App, Email, WhatsApp, Push) per kategori event bisnis SMART-AI.ID
              </p>
            </div>

            {prefsSavedMessage && (
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold animate-in fade-in">
                ✓ Preferensi Disimpan
              </span>
            )}
          </div>

          {/* Matrix of Channels */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Kategori Notifikasi</th>
                  <th className="p-3.5 text-center">In-App (Bell & Toast)</th>
                  <th className="p-3.5 text-center">Email Notification</th>
                  <th className="p-3.5 text-center">WhatsApp Alert</th>
                  <th className="p-3.5 text-center">Mobile/Browser Push</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {(
                  [
                    { type: 'NEW_LEAD', label: 'Lead Baru (CRM)', desc: 'Setiap formulir konsultasi & estimasi AI masuk' },
                    { type: 'NEW_CUSTOMER', label: 'Pelanggan Baru', desc: 'Registrasi akun klien perusahaan baru' },
                    { type: 'PROPOSAL', label: 'Update Proposal', desc: 'Proposal dibuat, dikirim, dilihat & disetujui' },
                    { type: 'QUOTATION', label: 'Penawaran Harga (Quotation)', desc: 'Persetujuan atau revisi penawaran harga resmi' },
                    { type: 'PAYMENT', label: 'Pembayaran & Invoice', desc: 'Penerimaan pembayaran lunas, cicilan & overdue' },
                    { type: 'PROJECT_UPDATE', label: 'Progres & Milestone Proyek', desc: 'Pembaruan fase dev, milestone selesai, atau delay' },
                    { type: 'SUPPORT_TICKET', label: 'Tiket Support Klien', desc: 'Tiket baru, eskalasi kritis & penyelesaian issue' },
                    { type: 'SYSTEM', label: 'Keamanan & Sistem WAF', desc: 'Alert login asing, MFA, maintenance & audit notice' }
                  ] as const
                ).map((row) => (
                  <tr key={row.type} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                          {getTypeIcon(row.type)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{row.label}</div>
                          <div className="text-[10px] text-slate-400">{row.desc}</div>
                        </div>
                      </div>
                    </td>

                    {/* In-App Toggle */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={preferences.preferences[row.type]?.inApp ?? true}
                        onChange={() => handlePreferenceToggle(row.type, 'inApp')}
                        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                      />
                    </td>

                    {/* Email Toggle */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={preferences.preferences[row.type]?.email ?? false}
                        onChange={() => handlePreferenceToggle(row.type, 'email')}
                        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                      />
                    </td>

                    {/* WhatsApp Toggle */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={preferences.preferences[row.type]?.whatsapp ?? false}
                        onChange={() => handlePreferenceToggle(row.type, 'whatsapp')}
                        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                      />
                    </td>

                    {/* Push Toggle */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={preferences.preferences[row.type]?.push ?? false}
                        onChange={() => handlePreferenceToggle(row.type, 'push')}
                        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Retention & Digest Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-white block">Kebijakan Retensi Notifikasi</label>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Notifikasi non-kritis yang lebih lama dari periode ini akan otomatis dibersihkan.
              </p>
              <select
                value={preferences.retentionDays}
                onChange={(e) => handleSaveGeneralPrefs({ retentionDays: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value={30}>30 Hari</option>
                <option value={60}>60 Hari (Rekomendasi)</option>
                <option value={90}>90 Hari</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-white block">Frekuensi Email Digest</label>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Kirimkan ringkasan berkala aktivitas operasional langsung ke email terdaftar.
              </p>
              <select
                value={preferences.emailDigest}
                onChange={(e) => handleSaveGeneralPrefs({ emailDigest: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="NONE">Nonaktifkan Digest</option>
                <option value="DAILY">Harian (Daily Digest Pukul 08:00 WIB)</option>
                <option value="WEEKLY">Mingguan (Weekly Digest Senin Pagi)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-white block">Audio Sound Alert</label>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mainkan audio sintetis Web Audio saat notifikasi masuk saat membuka tab browser.
              </p>
              <button
                onClick={() => handleSaveGeneralPrefs({ soundEnabled: !preferences.soundEnabled })}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  preferences.soundEnabled
                    ? 'bg-purple-950 border-purple-700 text-purple-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                {preferences.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{preferences.soundEnabled ? 'Suara Aktif' : 'Suara Dimatikan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: NOTIFICATION TEMPLATES */}
      {/* ============================================================ */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/90 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display text-white">Kelola Template Notifikasi</h3>
                <p className="text-xs text-slate-400">
                  Sesuaikan format pesan, variabel dinamis, dan subjek email untuk seluruh event platform
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(tpl.type)}
                        <span className="font-bold text-white text-xs">{tpl.type}</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400">{tpl.id}</span>
                    </div>

                    <div className="text-xs font-bold text-slate-200">{tpl.title}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      {tpl.message}
                    </p>

                    {/* Variables */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-500">Variabel:</span>
                      {tpl.variables.map((v) => (
                        <span
                          key={v}
                          className="px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60 text-[9px] font-mono"
                        >
                          {`{${v}}`}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingTemplate(tpl)}
                    className="w-full mt-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <FileEdit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit Template</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Template Modal */}
          {editingTemplate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileEdit className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-bold text-white">Edit Template: {editingTemplate.type}</h3>
                  </div>
                  <button
                    onClick={() => setEditingTemplate(null)}
                    className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveTemplate} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1 font-bold">Judul Notifikasi</label>
                    <input
                      type="text"
                      value={editingTemplate.title}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 font-bold">Isi Pesan Notifikasi</label>
                    <textarea
                      rows={3}
                      value={editingTemplate.message}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, message: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 font-bold">Subjek Email (Opsional)</label>
                    <input
                      type="text"
                      value={editingTemplate.emailSubject || ''}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, emailSubject: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingTemplate(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: DELIVERY LOGS */}
      {/* ============================================================ */}
      {activeTab === 'delivery-logs' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/90 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white">Log Transmisi Multi-Saluran</h3>
              <p className="text-xs text-slate-400">
                Riwayat status pengiriman alert melalui In-App, Email Server, WhatsApp Gateway, dan Push Engine
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Status</th>
                  <th className="p-3">Waktu</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Penerima</th>
                  <th className="p-3">Saluran</th>
                  <th className="p-3">Judul Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
                {deliveryLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{formatTimeAgo(log.createdAt)}</td>
                    <td className="p-3 font-bold text-white">{log.type}</td>
                    <td className="p-3 text-purple-300">{log.recipientName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[10px]">
                        {log.channel}
                      </span>
                    </td>
                    <td className="p-3 text-slate-200">{log.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: REALTIME SIMULATOR (PROMPT 28) */}
      {/* ============================================================ */}
      {activeTab === 'simulator' && (
        <div className="glass-card rounded-2xl p-6 border border-purple-500/30 bg-slate-900/90 space-y-6">
          <div className="space-y-1 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold font-display text-white">
                Real-Time Notification Event Simulator
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[9px] font-mono font-bold">
                PROMPT 28 TEST SUITE
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl">
              Uji coba instant trigger untuk semua 8 kategori event notifikasi bisnis SMART-AI.ID. Klik tombol event untuk menembakkan alert real-time, menguji kemunculan toast alert, pembaruan badge bell, dan pencatatan riwayat delivery.
            </p>
          </div>

          {/* Feedback banner */}
          {simResult && (
            <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-700/80 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{simResult}</span>
            </div>
          )}

          {/* 8 Event Grid Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => triggerSimulationEvent('NEW_LEAD')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-cyan-800/60 hover:border-cyan-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <Users className="w-5 h-5 text-cyan-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-cyan-300 font-bold">EVENT 01</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: New Lead Received</div>
              <p className="text-[11px] text-slate-400">
                Simulasi calon klien PT Mega Inovasi mengirim formulir estimasi AI senilai Rp 650 Juta.
              </p>
            </button>

            <button
              onClick={() => triggerSimulationEvent('NEW_CUSTOMER')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-indigo-800/60 hover:border-indigo-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <Building2 className="w-5 h-5 text-indigo-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-indigo-300 font-bold">EVENT 02</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: New Customer Registered</div>
              <p className="text-[11px] text-slate-400">
                Simulasi akun klien PT Samudera Logistik Prima resmi aktif di portal.
              </p>
            </button>

            <button
              onClick={() => triggerSimulationEvent('PROPOSAL')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-amber-800/60 hover:border-amber-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <FileText className="w-5 h-5 text-amber-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-amber-300 font-bold">EVENT 03</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: Proposal Accepted</div>
              <p className="text-[11px] text-slate-400">
                Simulasi proposal AI Banking disetujui Direktur PT Bank Digital Mandiri.
              </p>
            </button>

            <button
              onClick={() => triggerSimulationEvent('QUOTATION')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-emerald-800/60 hover:border-emerald-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <DollarSign className="w-5 h-5 text-emerald-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-emerald-300 font-bold">EVENT 04</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: Quotation Approved</div>
              <p className="text-[11px] text-slate-400">
                Simulasi penawaran harga QTN-2026-021 resmi diapprove senilai Rp 275 Juta.
              </p>
            </button>

            <button
              onClick={() => triggerSimulationEvent('PAYMENT')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-teal-800/60 hover:border-teal-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <Receipt className="w-5 h-5 text-teal-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-teal-300 font-bold">EVENT 05</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: Payment Received</div>
              <p className="text-[11px] text-slate-400">
                Simulasi invoice INV-2026-0012 sebesar Rp 145 Juta lunas dan kwitansi diterbitkan.
              </p>
            </button>

            <button
              onClick={() => triggerSimulationEvent('PROJECT_UPDATE')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-blue-800/60 hover:border-blue-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <FolderKanban className="w-5 h-5 text-blue-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-blue-300 font-bold">EVENT 06</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: Project At Risk / Progress</div>
              <p className="text-[11px] text-slate-400">
                Simulasi proyek Smart Mining 75% membutuhkan atensi developer (Priority: HIGH).
              </p>
            </button>

            <button
              onClick={() => triggerSimulationEvent('SUPPORT_TICKET')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-rose-800/60 hover:border-rose-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <LifeBuoy className="w-5 h-5 text-rose-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-rose-300 font-bold">EVENT 07</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: Support Ticket Urgent</div>
              <p className="text-[11px] text-slate-400">
                Simulasi tiket support baru perihal issue latensi endpoint OCR API.
              </p>
            </button>

            <button
              onClick={() => triggerSimulationEvent('SYSTEM')}
              disabled={simulatingType !== null}
              className="p-4 rounded-2xl bg-slate-950 border border-purple-800/60 hover:border-purple-500 text-left space-y-2 group transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <ShieldAlert className="w-5 h-5 text-purple-400 group-hover:animate-bounce" />
                <span className="text-[10px] font-mono text-purple-300 font-bold">EVENT 08</span>
              </div>
              <div className="font-bold text-white text-xs">Trigger: Security & System Alert</div>
              <p className="text-[11px] text-slate-400">
                Simulasi peringatan WAF memblokir ancaman keamanan anomali (Critical Priority).
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
