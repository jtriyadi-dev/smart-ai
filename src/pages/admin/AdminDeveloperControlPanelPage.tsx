import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Key,
  Users,
  FileEdit,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Shield,
  Eye,
  EyeOff,
  Server,
  Zap,
  Copy,
  Upload,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  Globe,
  Sliders,
  Database,
  Download,
  Building,
  Lock,
  Unlock,
  Check,
  Bell,
  Send,
  Radio,
  Webhook,
  Activity,
  Volume2,
  VolumeX,
  Layers,
  Clock,
  Code,
  Edit3
} from 'lucide-react';
import { WebsiteCMSContentService, WebsiteCMSData, MediaAssetItem } from '../../services/WebsiteCMSContentService';
import { APIKeyManagementService, ManagedAPIKeyConfig } from '../../services/APIKeyManagementService';
import { UserAccountManagementService, InternalUserAccount, CustomerClientAccount } from '../../services/UserAccountManagementService';
import { DeveloperControlService, DeveloperSystemState } from '../../services/DeveloperControlService';
import { NotificationService, NotificationWebhookEndpoint } from '../../services/NotificationService';
import { AppNotification, NotificationPriority, NotificationChannel, NotificationType } from '../../types';
import { useRouter } from '../../lib/router';

export const AdminDeveloperControlPanelPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'console' | 'users' | 'apikeys' | 'cms' | 'media' | 'notifications'>('console');
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Data states
  const [systemState, setSystemState] = useState<DeveloperSystemState>(DeveloperControlService.getSystemState());
  const [cmsData, setCmsData] = useState<WebsiteCMSData>(WebsiteCMSContentService.getCMSData());
  const [apiKeys, setApiKeys] = useState<ManagedAPIKeyConfig[]>(APIKeyManagementService.getAllKeys());
  const [internalUsers, setInternalUsers] = useState<InternalUserAccount[]>(UserAccountManagementService.getAllInternalUsers());
  const [customers, setCustomers] = useState<CustomerClientAccount[]>(UserAccountManagementService.getAllCustomerAccounts());
  const [mediaAssets, setMediaAssets] = useState<MediaAssetItem[]>(WebsiteCMSContentService.getAllMediaAssets());

  // Notification Engine states
  const [webhooks, setWebhooks] = useState<NotificationWebhookEndpoint[]>(NotificationService.getWebhooks());
  const [recentEvents, setRecentEvents] = useState<AppNotification[]>(NotificationService.getNotifications({ status: 'ALL' }).slice(0, 8));
  const [queueDiag, setQueueDiag] = useState(NotificationService.getQueueDiagnostics());
  const [testingWebhookId, setTestingWebhookId] = useState<string | null>(null);
  const [webhookModalOpen, setWebhookModalOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<Partial<NotificationWebhookEndpoint> | null>(null);
  const [playingTone, setPlayingTone] = useState<string | null>(null);

  // Broadcast Dispatcher state
  const [broadcastForm, setBroadcastForm] = useState<{
    title: string;
    message: string;
    priority: NotificationPriority;
    targetRole: any;
    channels: NotificationChannel[];
    actionUrl: string;
    category: string;
  }>({
    title: '',
    message: '',
    priority: 'HIGH',
    targetRole: 'ALL',
    channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
    actionUrl: '/admin',
    category: 'System Broadcast'
  });

  // Raw JSON Payload Injection state
  const [rawJsonPayload, setRawJsonPayload] = useState<string>(
    JSON.stringify(
      {
        type: 'SYSTEM',
        title: 'Dev Alert: High Memory Allocation Spike',
        message: 'Cluster worker pod-asia-02 reached 91.4% memory threshold. Auto-scaling initiated.',
        priority: 'HIGH',
        targetRole: 'DEVELOPER',
        channels: ['IN_APP', 'EMAIL', 'PUSH'],
        actionUrl: '/admin/developer-control-panel',
        metadata: { podId: 'pod-asia-02', region: 'asia-east1', timestamp: new Date().toISOString() }
      },
      null,
      2
    )
  );

  // UI helpers
  const [showKeySecret, setShowKeySecret] = useState<Record<string, boolean>>({});
  const [testingKeyId, setTestingKeyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // User modal / form state
  const [userModalType, setUserModalType] = useState<'internal' | 'customer' | 'edit-internal' | 'edit-customer' | null>(null);
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [editingInternalUser, setEditingInternalUser] = useState<(InternalUserAccount & { password?: string }) | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<CustomerClientAccount | null>(null);
  const [newInternalUser, setNewInternalUser] = useState<Partial<InternalUserAccount> & { password?: string }>({
    name: '',
    email: '',
    password: '',
    role: 'DEVELOPER',
    department: 'Engineering',
    phone: '',
    status: 'ACTIVE'
  });
  const [newCustomer, setNewCustomer] = useState<Partial<CustomerClientAccount>>({
    companyName: '',
    picName: '',
    picEmail: '',
    picPhone: '',
    industry: 'Enterprise Software',
    subscriptionPlan: 'Enterprise AI Tier',
    assignedProjectCount: 1,
    activeProjects: ['Smart Enterprise Solution'],
    portalAccessStatus: 'ACTIVE',
    aiTokenMonthlyLimit: 500000,
    aiTokenUsageCurrent: 0
  });

  // Media upload modal / form state
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [newMedia, setNewMedia] = useState<Partial<MediaAssetItem>>({
    name: '',
    type: 'image',
    category: 'hero',
    url: '',
    altText: '',
    videoEmbedProvider: 'youtube',
    isUsedInWebsite: true
  });
  const [selectedPreviewMedia, setSelectedPreviewMedia] = useState<MediaAssetItem | null>(null);

  // CMS active subtab
  const [cmsSubTab, setCmsSubTab] = useState<'hero' | 'about' | 'footer'>('hero');

  // JSON snapshot import modal
  const [importJsonOpen, setImportJsonOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Tersalin ke clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // -------------------------------------------------------------
  // HANDLERS: DEVELOPER CONSOLE
  // -------------------------------------------------------------
  const handleSaveSystemState = () => {
    const saved = DeveloperControlService.saveSystemState(systemState);
    setSystemState(saved);
    showToast('Konfigurasi Developer System & Feature Flags berhasil disimpan!');
  };

  const handlePurgeCache = () => {
    const res = DeveloperControlService.purgeAllCache();
    setSystemState(DeveloperControlService.getSystemState());
    showToast(`Cache aplikasi berhasil dibersihkan (${res.purgedKeys} items)!`);
  };

  const handleExportSnapshot = () => {
    const jsonStr = DeveloperControlService.exportFullSystemSnapshotJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart_ai_system_snapshot_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Snapshot database & konfigurasi sistem berhasil di-export ke JSON!');
  };

  const handleImportSnapshot = () => {
    if (!jsonInput.trim()) return;
    const res = DeveloperControlService.importFullSystemSnapshotJSON(jsonInput);
    if (res.success) {
      setImportJsonOpen(false);
      setJsonInput('');
      // Reload all state
      setSystemState(DeveloperControlService.getSystemState());
      setCmsData(WebsiteCMSContentService.getCMSData());
      setApiKeys(APIKeyManagementService.getAllKeys());
      setInternalUsers(UserAccountManagementService.getAllInternalUsers());
      setCustomers(UserAccountManagementService.getAllCustomerAccounts());
      setMediaAssets(WebsiteCMSContentService.getAllMediaAssets());
      showToast(`Snapshot berhasil di-import! (${res.importedKeysCount} modul diperbarui)`);
    } else {
      showToast('Gagal mengimpor file JSON. Periksa format syntax.', 'error');
    }
  };

  // -------------------------------------------------------------
  // HANDLERS: API KEYS
  // -------------------------------------------------------------
  const handleTestAPIKey = async (id: string) => {
    setTestingKeyId(id);
    try {
      const result = await APIKeyManagementService.testKeyConnection(id);
      setApiKeys(APIKeyManagementService.getAllKeys());
      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.message, 'error');
      }
    } finally {
      setTestingKeyId(null);
    }
  };

  const handleUpdateKeyField = (id: string, field: keyof ManagedAPIKeyConfig, value: any) => {
    const updated = apiKeys.map((k) => (k.id === id ? { ...k, [field]: value } : k));
    setApiKeys(updated);
    const target = updated.find((k) => k.id === id);
    if (target) {
      APIKeyManagementService.saveKey(target);
    }
  };

  // -------------------------------------------------------------
  // HANDLERS: USER & CUSTOMER ACCOUNTS
  // -------------------------------------------------------------
  const handleGenerateRandomUserPassword = () => {
    const generated = UserAccountManagementService.generateTemporaryPassword();
    if (userModalType === 'internal') {
      setNewInternalUser((prev) => ({ ...prev, password: generated }));
    } else if (userModalType === 'edit-internal' && editingInternalUser) {
      setEditingInternalUser((prev) => (prev ? { ...prev, password: generated } : null));
    } else if (userModalType === 'customer') {
      setNewCustomer((prev) => ({ ...prev, initialPasswordGenerated: generated }));
    } else if (userModalType === 'edit-customer' && editingCustomer) {
      setEditingCustomer((prev) => (prev ? { ...prev, initialPasswordGenerated: generated } : null));
    }
    setShowUserPassword(true);
    showToast(`Password baru dihasilkan: ${generated}`);
  };

  const handleCreateInternalUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInternalUser.name || !newInternalUser.email) {
      showToast('Nama dan Email wajib diisi', 'error');
      return;
    }
    const finalPassword = newInternalUser.password?.trim() || UserAccountManagementService.generateTemporaryPassword();
    const created = UserAccountManagementService.createInternalUser({
      name: newInternalUser.name!,
      email: newInternalUser.email!,
      password: finalPassword,
      role: newInternalUser.role as any || 'DEVELOPER',
      department: newInternalUser.department || 'Engineering',
      phone: newInternalUser.phone || '+62 812 0000 0000',
      status: 'ACTIVE'
    });
    setInternalUsers(UserAccountManagementService.getAllInternalUsers());
    setUserModalType(null);
    setNewInternalUser({ name: '', email: '', password: '', role: 'DEVELOPER', department: 'Engineering', phone: '', status: 'ACTIVE' });
    showToast(`Akun developer/staf ${created.name} (${created.role}) berhasil dibuat! Password: ${finalPassword}`);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.companyName || !newCustomer.picEmail) {
      showToast('Nama Perusahaan dan Email PIC wajib diisi', 'error');
      return;
    }
    const tempPassword = newCustomer.initialPasswordGenerated?.trim() || UserAccountManagementService.generateTemporaryPassword();
    const created = UserAccountManagementService.createCustomerAccount({
      companyName: newCustomer.companyName!,
      picName: newCustomer.picName || 'PIC Client',
      picEmail: newCustomer.picEmail!,
      picPhone: newCustomer.picPhone || '+62 812 0000 0000',
      industry: newCustomer.industry || 'Enterprise Software',
      subscriptionPlan: newCustomer.subscriptionPlan as any || 'Enterprise AI Tier',
      assignedProjectCount: Number(newCustomer.assignedProjectCount) || 1,
      activeProjects: newCustomer.activeProjects || ['Custom Business Software Project'],
      portalAccessStatus: 'ACTIVE',
      aiTokenMonthlyLimit: Number(newCustomer.aiTokenMonthlyLimit) || 500000,
      aiTokenUsageCurrent: 0,
      initialPasswordGenerated: tempPassword
    });
    setCustomers(UserAccountManagementService.getAllCustomerAccounts());
    setUserModalType(null);
    setNewCustomer({
      companyName: '',
      picName: '',
      picEmail: '',
      picPhone: '',
      industry: 'Enterprise Software',
      subscriptionPlan: 'Enterprise AI Tier',
      assignedProjectCount: 1,
      activeProjects: ['Smart Enterprise Solution'],
      portalAccessStatus: 'ACTIVE',
      aiTokenMonthlyLimit: 500000,
      aiTokenUsageCurrent: 0
    });
    showToast(`Akun Pelanggan ${created.companyName} aktif! Password: ${tempPassword}`);
  };

  const handleToggleCustomerStatus = (id: string, current: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED') => {
    const newStatus = current === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    UserAccountManagementService.updateCustomerAccount(id, { portalAccessStatus: newStatus });
    setCustomers(UserAccountManagementService.getAllCustomerAccounts());
    showToast(`Akses portal klien diperbarui ke status: ${newStatus}`);
  };

  const handleOpenEditInternalUser = (u: InternalUserAccount) => {
    setEditingInternalUser({ ...u, password: u.password || '' });
    setShowUserPassword(false);
    setUserModalType('edit-internal');
  };

  const handleUpdateInternalUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInternalUser) return;
    if (!editingInternalUser.name || !editingInternalUser.email) {
      showToast('Nama dan Email wajib diisi', 'error');
      return;
    }

    // Protection check: prevent removing last active Super Admin
    if (editingInternalUser.role !== 'SUPER_ADMIN') {
      const existing = internalUsers.find((u) => u.id === editingInternalUser.id);
      if (existing && existing.role === 'SUPER_ADMIN') {
        const activeSuperAdmins = internalUsers.filter(
          (u) => u.role === 'SUPER_ADMIN' && u.id !== editingInternalUser.id && u.status === 'ACTIVE'
        );
        if (activeSuperAdmins.length === 0) {
          showToast('Keamanan: Sistem membutuhkan minimal 1 Super Admin aktif!', 'error');
          return;
        }
      }
    }

    const updatePayload: Partial<InternalUserAccount> = {
      name: editingInternalUser.name,
      email: editingInternalUser.email,
      role: editingInternalUser.role,
      department: editingInternalUser.department || 'General',
      phone: editingInternalUser.phone || '',
      status: editingInternalUser.status || 'ACTIVE'
    };

    if (editingInternalUser.password && editingInternalUser.password.trim()) {
      updatePayload.password = editingInternalUser.password.trim();
    }

    const updated = UserAccountManagementService.updateInternalUser(editingInternalUser.id, updatePayload);

    if (updated) {
      setInternalUsers(UserAccountManagementService.getAllInternalUsers());
      setUserModalType(null);
      setEditingInternalUser(null);
      showToast(`Akun internal "${updated.name}" (${updated.role}) berhasil diperbarui!`);
    } else {
      showToast('Gagal memperbarui akun internal', 'error');
    }
  };

  const handleOpenEditCustomer = (c: CustomerClientAccount) => {
    setEditingCustomer({ ...c });
    setUserModalType('edit-customer');
  };

  const handleUpdateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    if (!editingCustomer.companyName || !editingCustomer.picEmail) {
      showToast('Nama Perusahaan dan Email PIC wajib diisi', 'error');
      return;
    }

    const updated = UserAccountManagementService.updateCustomerAccount(editingCustomer.id, {
      companyName: editingCustomer.companyName,
      picName: editingCustomer.picName || 'PIC Client',
      picEmail: editingCustomer.picEmail,
      picPhone: editingCustomer.picPhone || '',
      industry: editingCustomer.industry || 'Enterprise Software',
      subscriptionPlan: editingCustomer.subscriptionPlan,
      aiTokenMonthlyLimit: Number(editingCustomer.aiTokenMonthlyLimit) || 500000,
      portalAccessStatus: editingCustomer.portalAccessStatus || 'ACTIVE'
    });

    if (updated) {
      setCustomers(UserAccountManagementService.getAllCustomerAccounts());
      setUserModalType(null);
      setEditingCustomer(null);
      showToast(`Akun klien "${updated.companyName}" berhasil diperbarui!`);
    } else {
      showToast('Gagal memperbarui akun klien', 'error');
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Hapus akun klien ini secara permanen dari database portal?')) {
      UserAccountManagementService.deleteCustomerAccount(id);
      setCustomers(UserAccountManagementService.getAllCustomerAccounts());
      showToast('Akun pelanggan berhasil dihapus.');
    }
  };

  const handleDeleteInternalUser = (id: string) => {
    if (window.confirm('Hapus akun pengguna internal ini?')) {
      UserAccountManagementService.deleteInternalUser(id);
      setInternalUsers(UserAccountManagementService.getAllInternalUsers());
      showToast('Pengguna internal berhasil dihapus.');
    }
  };

  // -------------------------------------------------------------
  // HANDLERS: CMS EDITING
  // -------------------------------------------------------------
  const handleSaveCMS = () => {
    const saved = WebsiteCMSContentService.saveCMSData(cmsData, 'Jay Triyadi (Developer)');
    setCmsData(saved);
    showToast('Konten website berhasil di-update dan LIVE secara instan!');
  };

  const handleResetCMS = () => {
    if (window.confirm('Kembalikan semua teks website ke default bawaan pabrik?')) {
      const def = WebsiteCMSContentService.resetToDefaults();
      setCmsData(def);
      showToast('Konten website telah direset ke default.');
    }
  };

  // -------------------------------------------------------------
  // HANDLERS: MEDIA ASSETS
  // -------------------------------------------------------------
  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.name || !newMedia.url) {
      showToast('Nama dan URL Media wajib diisi', 'error');
      return;
    }
    const created = WebsiteCMSContentService.addMediaAsset({
      name: newMedia.name!,
      type: newMedia.type as any || 'image',
      category: newMedia.category as any || 'hero',
      url: newMedia.url!,
      thumbnailUrl: newMedia.thumbnailUrl || newMedia.url,
      altText: newMedia.altText || newMedia.name!,
      isUsedInWebsite: true,
      videoEmbedProvider: newMedia.videoEmbedProvider as any
    });
    setMediaAssets(WebsiteCMSContentService.getAllMediaAssets());
    setMediaModalOpen(false);
    setNewMedia({
      name: '',
      type: 'image',
      category: 'hero',
      url: '',
      altText: '',
      videoEmbedProvider: 'youtube',
      isUsedInWebsite: true
    });
    showToast(`Aset media "${created.name}" berhasil ditambahkan ke pustaka media!`);
  };

  const handleDeleteMedia = (id: string) => {
    if (window.confirm('Hapus aset media ini dari pustaka?')) {
      WebsiteCMSContentService.deleteMediaAsset(id);
      setMediaAssets(WebsiteCMSContentService.getAllMediaAssets());
      showToast('Aset media berhasil dihapus.');
    }
  };

  // -------------------------------------------------------------
  // HANDLERS: NOTIFICATION ENGINE & WEBHOOKS
  // -------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = NotificationService.subscribe((newNotif) => {
      setRecentEvents((prev) => [newNotif, ...prev.slice(0, 14)]);
      setQueueDiag(NotificationService.getQueueDiagnostics());
    });
    return () => unsubscribe();
  }, []);

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.message) {
      showToast('Judul dan pesan notifikasi wajib diisi', 'error');
      return;
    }
    const created = NotificationService.broadcastNotification({
      title: broadcastForm.title,
      message: broadcastForm.message,
      priority: broadcastForm.priority,
      targetRole: broadcastForm.targetRole,
      channels: broadcastForm.channels.length > 0 ? broadcastForm.channels : ['IN_APP'],
      actionUrl: broadcastForm.actionUrl || '/admin',
      category: broadcastForm.category || 'System Broadcast'
    });

    setRecentEvents((prev) => [created, ...prev.slice(0, 14)]);
    setQueueDiag(NotificationService.getQueueDiagnostics());
    showToast(`Broadcast "${created.title}" berhasil di-dispatch ke kanal ${created.channels.join(', ')}!`);
    setBroadcastForm({
      title: '',
      message: '',
      priority: 'HIGH',
      targetRole: 'ALL',
      channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
      actionUrl: '/admin',
      category: 'System Broadcast'
    });
  };

  const handleInjectRawJson = () => {
    try {
      const parsed = JSON.parse(rawJsonPayload);
      if (!parsed.title || !parsed.message) {
        showToast('JSON harus memuat minimal properti "title" dan "message"', 'error');
        return;
      }
      const created = NotificationService.createNotification({
        type: parsed.type || 'SYSTEM',
        title: parsed.title,
        message: parsed.message,
        priority: parsed.priority || 'MEDIUM',
        targetRole: parsed.targetRole,
        userId: parsed.userId,
        tenantId: parsed.tenantId,
        channels: parsed.channels || ['IN_APP'],
        actionUrl: parsed.actionUrl || '/admin',
        metadata: parsed.metadata
      });
      setRecentEvents((prev) => [created, ...prev.slice(0, 14)]);
      setQueueDiag(NotificationService.getQueueDiagnostics());
      showToast(`Payload notifikasi JSON "${created.title}" berhasil di-inject ke pipeline!`);
    } catch (err: any) {
      showToast(`Format JSON tidak valid: ${err.message}`, 'error');
    }
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWebhook || !editingWebhook.name || !editingWebhook.url) {
      showToast('Nama dan URL Webhook endpoint wajib diisi', 'error');
      return;
    }
    const webhookItem: NotificationWebhookEndpoint = {
      id: editingWebhook.id || `WH-${Date.now().toString().slice(-4)}`,
      name: editingWebhook.name,
      provider: editingWebhook.provider || 'CUSTOM',
      url: editingWebhook.url,
      authToken: editingWebhook.authToken,
      secretKey: editingWebhook.secretKey,
      enabled: editingWebhook.enabled !== false,
      eventSubscriptions: editingWebhook.eventSubscriptions && editingWebhook.eventSubscriptions.length > 0
        ? editingWebhook.eventSubscriptions
        : ['SYSTEM', 'NEW_LEAD', 'PAYMENT'],
      failureCount: editingWebhook.failureCount || 0,
      createdAt: editingWebhook.createdAt || new Date().toISOString().split('T')[0]
    };

    NotificationService.saveWebhook(webhookItem);
    setWebhooks(NotificationService.getWebhooks());
    setQueueDiag(NotificationService.getQueueDiagnostics());
    setWebhookModalOpen(false);
    setEditingWebhook(null);
    showToast(`Webhook Gateway "${webhookItem.name}" berhasil disimpan!`);
  };

  const handleDeleteWebhook = (id: string) => {
    if (window.confirm('Hapus endpoint webhook ini?')) {
      NotificationService.deleteWebhook(id);
      setWebhooks(NotificationService.getWebhooks());
      setQueueDiag(NotificationService.getQueueDiagnostics());
      showToast('Webhook endpoint berhasil dihapus.');
    }
  };

  const handleTestWebhook = async (id: string) => {
    setTestingWebhookId(id);
    try {
      const res = await NotificationService.testWebhook(id);
      setWebhooks(NotificationService.getWebhooks());
      if (res.success) {
        showToast(res.message, 'success');
      } else {
        showToast(res.message, 'error');
      }
    } catch (e: any) {
      showToast(`Gagal mengirim ping: ${e.message}`, 'error');
    } finally {
      setTestingWebhookId(null);
    }
  };

  const handleRetryAllFailedLogs = () => {
    const fixed = NotificationService.retryAllFailedLogs();
    setQueueDiag(NotificationService.getQueueDiagnostics());
    showToast(`${fixed} pengiriman log yang gagal telah di-retry sukses!`);
  };

  const handleClearNotificationLogs = () => {
    if (window.confirm('Hapus seluruh riwayat delivery logs notifikasi?')) {
      NotificationService.clearDeliveryLogs();
      setQueueDiag(NotificationService.getQueueDiagnostics());
      showToast('Riwayat delivery logs berhasil dibersihkan.');
    }
  };

  const handleExportNotificationLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(NotificationService.exportLogsJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `smart_ai_notification_logs_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Export delivery logs JSON berhasil diunduh!');
  };

  const handleResetDefaultTemplates = () => {
    if (window.confirm('Kembalikan seluruh template notifikasi ke format default pabrik?')) {
      NotificationService.resetDefaultTemplates();
      setQueueDiag(NotificationService.getQueueDiagnostics());
      showToast('Template notifikasi berhasil direset ke standar sistem.');
    }
  };

  const handlePlaySoundTone = (tone: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL') => {
    setPlayingTone(tone);
    NotificationService.playNotificationSound(tone);
    setTimeout(() => setPlayingTone(null), 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-cyan-500/30 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>DEVELOPER MASTER CONTROL PANEL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Pusat Kontrol & Manajemen Pasca-Deploy
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              Kelola konfigurasi live environment, otentikasi API Key, pembuatan akun klien/user, edit konten teks publik secara instan, serta manajemen pustaka gambar dan video.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePurgeCache}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Purge Cache</span>
            </button>
            <button
              onClick={handleExportSnapshot}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Backup JSON</span>
            </button>
            <button
              onClick={() => setImportJsonOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-600/20"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import State</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {feedbackMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 transition-all shadow-lg ${
            feedbackMessage.type === 'error'
              ? 'bg-rose-950 border border-rose-800 text-rose-300'
              : feedbackMessage.type === 'info'
              ? 'bg-cyan-950 border border-cyan-800 text-cyan-300'
              : 'bg-emerald-950 border border-emerald-800 text-emerald-300'
          }`}
        >
          {feedbackMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-3 text-xs font-mono font-bold">
        <button
          onClick={() => setActiveTab('console')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'console'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Server className="w-4 h-4 text-cyan-300" />
          <span>1. Developer Live Console</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-purple-400" />
          <span>2. Akun User & Pelanggan ({internalUsers.length + customers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('apikeys')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'apikeys'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Key className="w-4 h-4 text-amber-400" />
          <span>3. API Key & Gateway Hub ({apiKeys.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'cms'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileEdit className="w-4 h-4 text-emerald-400" />
          <span>4. Edit Tulisan Website (CMS)</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'media'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Video className="w-4 h-4 text-rose-400" />
          <span>5. Gambar & Video ({mediaAssets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Bell className="w-4 h-4 text-purple-400" />
          <span>6. Notification Engine & Webhooks ({webhooks.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DEVELOPER LIVE CONSOLE                                             */}
      {/* ========================================================================= */}
      {activeTab === 'console' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Status Card */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>Runtime Environment</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Node Runtime:</span>
                  <span className="font-mono font-bold text-white">v20 LTS (Cloud Run)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Application Version:</span>
                  <span className="font-mono font-bold text-cyan-400">{systemState.appVersion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target Port Ingress:</span>
                  <span className="font-mono font-bold text-white">3000 (Nginx Reverse Proxy)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Deploy Environment:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
                    PRODUCTION
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Cache Purged:</span>
                  <span className="font-mono text-slate-300">{systemState.cacheLastPurgedAt.slice(0, 16)}</span>
                </div>
              </div>
            </div>

            {/* Maintenance Mode Controller */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Maintenance & System Lock</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="font-bold text-white">Maintenance Mode</div>
                    <div className="text-[11px] text-slate-400">Tampilkan banner pemeliharaan ke pengunjung publik</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemState.maintenanceMode}
                      onChange={(e) => setSystemState({ ...systemState, maintenanceMode: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Pesan Pemeliharaan</label>
                  <input
                    type="text"
                    value={systemState.maintenanceNotice}
                    onChange={(e) => setSystemState({ ...systemState, maintenanceNotice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Developer Shortcuts</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => navigate('/')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-left space-y-1 transition-all cursor-pointer"
                >
                  <div className="font-bold text-white flex items-center gap-1">
                    <span>Lihat Website</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="text-[10px] text-slate-400">Buka Homepage publik</div>
                </button>
                <button
                  onClick={() => navigate('/portal/login')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-left space-y-1 transition-all cursor-pointer"
                >
                  <div className="font-bold text-white flex items-center gap-1">
                    <span>Client Portal</span>
                    <ExternalLink className="w-3 h-3 text-purple-400" />
                  </div>
                  <div className="text-[10px] text-slate-400">Portal Klien / Pelanggan</div>
                </button>
                <button
                  onClick={() => setActiveTab('apikeys')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-left space-y-1 transition-all cursor-pointer"
                >
                  <div className="font-bold text-white">Kelola API Keys</div>
                  <div className="text-[10px] text-slate-400">Gemini, OpenAI, WA Gateway</div>
                </button>
                <button
                  onClick={() => setActiveTab('cms')}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-left space-y-1 transition-all cursor-pointer"
                >
                  <div className="font-bold text-white">Edit Headline</div>
                  <div className="text-[10px] text-slate-400">Ubah teks website live</div>
                </button>
              </div>
            </div>
          </div>

          {/* Feature Flags Module */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Feature Flags & Module Switches</span>
                </h3>
                <p className="text-xs text-slate-400">Aktifkan atau nonaktifkan fitur aplikasi secara live tanpa perlu redeploy kode.</p>
              </div>
              <button
                onClick={handleSaveSystemState}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Feature Flags</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {Object.entries(systemState.featureFlags).map(([key, val]) => (
                <div key={key} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white font-mono">{key}</div>
                    <div className="text-[10px] text-slate-400">
                      {val ? 'Status: Aktif (Enabled)' : 'Status: Dimatikan (Disabled)'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={val}
                      onChange={(e) =>
                        setSystemState({
                          ...systemState,
                          featureFlags: {
                            ...systemState.featureFlags,
                            [key]: e.target.checked
                          }
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: USER & CUSTOMER ACCOUNTS                                           */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Header Action Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-white/10">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Manajemen Akun Internal & Klien Portal</span>
              </h2>
              <p className="text-xs text-slate-400">Buat akun untuk staf internal atau berikan akses portal interaktif kepada pelanggan baru.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setUserModalType('internal')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>+ Akun Internal / Staf</span>
              </button>
              <button
                onClick={() => setUserModalType('customer')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono font-bold text-white flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/20"
              >
                <Building className="w-3.5 h-3.5" />
                <span>+ Buat Akun Klien Baru</span>
              </button>
            </div>
          </div>

          {/* Section 1: Customer Accounts */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building className="w-4 h-4 text-purple-400" />
              <span>Daftar Akun Pelanggan & Klien Portal ({customers.length})</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Perusahaan & PIC</th>
                    <th className="py-2.5 px-3">Paket Langganan</th>
                    <th className="py-2.5 px-3">Proyek Aktif</th>
                    <th className="py-2.5 px-3">AI Token Quota</th>
                    <th className="py-2.5 px-3">Status Akses</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-900/50">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{c.companyName}</div>
                        <div className="text-[11px] text-slate-400">
                          {c.picName} • <span className="text-cyan-400">{c.picEmail}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[11px]">
                          {c.subscriptionPlan}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-200">{c.activeProjects.join(', ')}</div>
                        <div className="text-[10px] text-slate-400">{c.assignedProjectCount} Proyek Terdaftar</div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <div className="text-slate-200">{c.aiTokenUsageCurrent.toLocaleString()} / {c.aiTokenMonthlyLimit.toLocaleString()}</div>
                        <div className="w-24 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className="bg-cyan-500 h-1.5 rounded-full"
                            style={{ width: `${Math.min(100, (c.aiTokenUsageCurrent / c.aiTokenMonthlyLimit) * 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            c.portalAccessStatus === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {c.portalAccessStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditCustomer(c)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-purple-900/50 text-slate-300 hover:text-purple-300 border border-slate-800 transition-colors"
                            title="Edit Akun Klien"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleCustomerStatus(c.id, c.portalAccessStatus)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                            title={c.portalAccessStatus === 'ACTIVE' ? 'Suspend Portal' : 'Aktifkan Portal'}
                          >
                            {c.portalAccessStatus === 'ACTIVE' ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(c.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 border border-slate-800"
                            title="Hapus Akun"
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

          {/* Section 2: Internal Staff Accounts */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Daftar Akun Developer & Staff Internal ({internalUsers.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {internalUsers.map((u) => (
                <div key={u.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative group hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                        {u.role}
                      </span>
                      {u.status === 'SUSPENDED' && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[9px] font-bold border border-rose-500/30">
                          SUSPENDED
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        id={`btn-edit-internal-user-${u.id}`}
                        onClick={() => handleOpenEditInternalUser(u)}
                        className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors cursor-pointer"
                        title="Edit Akun Developer & Staf"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        id={`btn-delete-internal-user-${u.id}`}
                        onClick={() => handleDeleteInternalUser(u.id)}
                        className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer"
                        title="Hapus User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>{u.name}</span>
                      <button
                        onClick={() => handleOpenEditInternalUser(u)}
                        className="text-[10px] text-cyan-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5"
                      >
                        <Edit3 className="w-2.5 h-2.5" /> Edit
                      </button>
                    </div>
                    <div className="text-slate-400 text-[11px]">{u.email}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">Dept: {u.department} • Telp: {u.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: API KEY & GATEWAY HUB                                              */}
      {/* ========================================================================= */}
      {activeTab === 'apikeys' && (
        <div className="space-y-6">
          <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-400" />
                <span>API Key & External Gateway Vault</span>
              </h2>
              <p className="text-xs text-slate-400">Atur kredensial API AI Model, WhatsApp Gateway, Google Maps, dan Payment Gateway secara aman.</p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Total Gateway Terhubung: <span className="font-bold text-cyan-400">{apiKeys.length} Provider</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {apiKeys.map((keyCfg) => {
              const isRevealed = showKeySecret[keyCfg.id];
              const isTesting = testingKeyId === keyCfg.id;

              return (
                <div key={keyCfg.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <Key className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{keyCfg.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
                            {keyCfg.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{keyCfg.description}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                          keyCfg.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
                        <span>{keyCfg.status.toUpperCase()}</span>
                      </span>

                      <button
                        onClick={() => handleTestAPIKey(keyCfg.id)}
                        disabled={isTesting}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isTesting ? 'animate-spin' : ''}`} />
                        <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">API Key / Token</label>
                      <div className="relative">
                        <input
                          type={isRevealed ? 'text' : 'password'}
                          value={keyCfg.apiKey}
                          onChange={(e) => handleUpdateKeyField(keyCfg.id, 'apiKey', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 pr-20 text-white font-mono text-xs"
                          placeholder="Masukkan Kunci API..."
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <button
                            onClick={() => setShowKeySecret({ ...showKeySecret, [keyCfg.id]: !isRevealed })}
                            className="p-1 text-slate-400 hover:text-white"
                            title={isRevealed ? 'Sembunyikan' : 'Tampilkan'}
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleCopy(keyCfg.apiKey, keyCfg.id)}
                            className="p-1 text-slate-400 hover:text-white"
                            title="Copy Key"
                          >
                            {copiedId === keyCfg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Target Endpoint URL</label>
                      <input
                        type="text"
                        value={keyCfg.endpointUrl || ''}
                        onChange={(e) => handleUpdateKeyField(keyCfg.id, 'endpointUrl', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                    <div>
                      Environment:{' '}
                      <span className="font-bold text-white uppercase">{keyCfg.environment}</span> • Terakhir diuji:{' '}
                      <span className="text-slate-300">{keyCfg.lastTestedAt || 'Belum diuji'}</span>
                    </div>
                    {keyCfg.latencyMs && (
                      <div className="text-emerald-400 font-bold">Latency: {keyCfg.latencyMs}ms</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: EDIT KONTEN WEBSITE (CMS)                                          */}
      {/* ========================================================================= */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-emerald-400" />
                <span>Visual Website Content Manager (CMS)</span>
              </h2>
              <p className="text-xs text-slate-400">Edit headline, sub-headline, tombol CTA, dan informasi kontak publik. Perubahan langsung terupdate seketika.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCMS}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={handleSaveCMS}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-mono font-bold text-white flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Publish Live Updates</span>
              </button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-mono font-bold">
            <button
              onClick={() => setCmsSubTab('hero')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                cmsSubTab === 'hero' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              1. Hero Section & Headline
            </button>
            <button
              onClick={() => setCmsSubTab('about')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                cmsSubTab === 'about' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              2. About & Company Story
            </button>
            <button
              onClick={() => setCmsSubTab('footer')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                cmsSubTab === 'footer' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              3. Kontak, Alamat & Footer
            </button>
          </div>

          {/* Sub-tab 1: Hero Section */}
          {cmsSubTab === 'hero' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase font-display tracking-wider border-b border-slate-800 pb-3">
                Headline & Call-to-Action Utama
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Badge Tagline Atas</label>
                  <input
                    type="text"
                    value={cmsData.hero.badgeText}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, badgeText: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kata Highlight Gradient (Cyan)</label>
                  <input
                    type="text"
                    value={cmsData.hero.headlineHighlight}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, headlineHighlight: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Headline Utama (H1)</label>
                <input
                  type="text"
                  value={cmsData.hero.headlineMain}
                  onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, headlineMain: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Sub-headline Paragraf Deskripsi</label>
                <textarea
                  rows={3}
                  value={cmsData.hero.subheadline}
                  onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, subheadline: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Teks Tombol CTA Utama</label>
                  <input
                    type="text"
                    value={cmsData.hero.primaryCtaText}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, primaryCtaText: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Teks Tombol CTA Sekunder</label>
                  <input
                    type="text"
                    value={cmsData.hero.secondaryCtaText}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, secondaryCtaText: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Teks Tombol AI Blueprint</label>
                  <input
                    type="text"
                    value={cmsData.hero.tertiaryCtaText}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...cmsData.hero, tertiaryCtaText: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 2: About Section */}
          {cmsSubTab === 'about' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase font-display tracking-wider border-b border-slate-800 pb-3">
                Profil Perusahaan & Dampak Metrik
              </h3>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Judul Section About</label>
                <input
                  type="text"
                  value={cmsData.about.title}
                  onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, title: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Paragraf 1</label>
                  <textarea
                    rows={4}
                    value={cmsData.about.description1}
                    onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, description1: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Paragraf 2</label>
                  <textarea
                    rows={4}
                    value={cmsData.about.description2}
                    onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, description2: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tahun Berdiri</label>
                  <input
                    type="text"
                    value={cmsData.about.foundedYear}
                    onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, foundedYear: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Total Proyek</label>
                  <input
                    type="text"
                    value={cmsData.about.totalProjectsDelivered}
                    onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, totalProjectsDelivered: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kepuasan Klien</label>
                  <input
                    type="text"
                    value={cmsData.about.clientSatisfactionRate}
                    onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, clientSatisfactionRate: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Jumlah Engineer</label>
                  <input
                    type="text"
                    value={cmsData.about.teamEngineersCount}
                    onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, teamEngineersCount: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 3: Footer & Contact */}
          {cmsSubTab === 'footer' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase font-display tracking-wider border-b border-slate-800 pb-3">
                Informasi Kontak & Legal Footer
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Legal PT</label>
                  <input
                    type="text"
                    value={cmsData.contactFooter.companyLegalName}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        contactFooter: { ...cmsData.contactFooter, companyLegalName: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Brand Display Name</label>
                  <input
                    type="text"
                    value={cmsData.contactFooter.brandName}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        contactFooter: { ...cmsData.contactFooter, brandName: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Alamat Kantor</label>
                <input
                  type="text"
                  value={cmsData.contactFooter.officeAddress}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      contactFooter: { ...cmsData.contactFooter, officeAddress: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={cmsData.contactFooter.officialEmail}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        contactFooter: { ...cmsData.contactFooter, officialEmail: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nomor WhatsApp</label>
                  <input
                    type="text"
                    value={cmsData.contactFooter.whatsappNumber}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        contactFooter: { ...cmsData.contactFooter, whatsappNumber: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Jam Operasional</label>
                  <input
                    type="text"
                    value={cmsData.contactFooter.operationalHours}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        contactFooter: { ...cmsData.contactFooter, operationalHours: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MEDIA & VIDEO MANAGER                                              */}
      {/* ========================================================================= */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400" />
                <span>Pustaka Media, Gambar & Video Embed</span>
              </h2>
              <p className="text-xs text-slate-400">Tambahkan gambar aset atau sematkan URL video YouTube/Vimeo untuk ditampilkan pada demo dan showcase website.</p>
            </div>
            <button
              onClick={() => setMediaModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-mono font-bold text-white flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Tambah Media Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mediaAssets.map((asset) => (
              <div key={asset.id} className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col group">
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={asset.thumbnailUrl || asset.url}
                    alt={asset.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase flex items-center gap-1">
                    {asset.type === 'video' ? <Video className="w-3 h-3 text-rose-400" /> : <ImageIcon className="w-3 h-3 text-cyan-400" />}
                    <span>{asset.type} • {asset.category}</span>
                  </div>
                  {asset.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="p-3 rounded-full bg-rose-600 text-white shadow-xl">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-white text-xs">{asset.name}</h4>
                    <p className="text-[11px] text-slate-400 truncate font-mono mt-0.5">{asset.url}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                    <span className="text-slate-500">{asset.uploadedAt}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(asset.url, asset.id)}
                        className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] flex items-center gap-1"
                        title="Copy URL"
                      >
                        {copiedId === asset.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(asset.id)}
                        className="p-1 rounded bg-slate-900 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300"
                        title="Hapus Media"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: NOTIFICATION ENGINE & WEBHOOKS                                     */}
      {/* ========================================================================= */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* TOP DIAGNOSTICS & CONTROL BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-4 border border-cyan-500/20 bg-slate-950/60">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>Total Notifikasi</span>
                <Bell className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                {queueDiag.totalNotifications}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {queueDiag.unreadCount} belum dibaca (Unread)
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-emerald-500/20 bg-slate-950/60">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>Delivery Logs</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                {queueDiag.totalDeliveryLogs}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Multi-channel pipeline active</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-purple-500/20 bg-slate-950/60">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>Active Webhooks</span>
                <Webhook className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                {queueDiag.activeWebhooksCount} / {queueDiag.webhookCount}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Gateway & HTTP Dispatchers
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-amber-500/20 bg-slate-950/60">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>Storage Footprint</span>
                <Database className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                {queueDiag.totalStorageKB} <span className="text-xs text-slate-400">KB</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {queueDiag.templateCount} Templates loaded
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS & AUDIO SYNTHESIZER TESTER */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 bg-slate-950/70">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Developer Diagnostics & Audio Synthesizer</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Uji audio tone Web Audio API, retry transmission logs gagal, atau reset struktur template.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleRetryAllFailedLogs}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Retry all failed transmissions"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Failed Logs</span>
                </button>

                <button
                  onClick={handleExportNotificationLogs}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Export notification history JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Logs JSON</span>
                </button>

                <button
                  onClick={handleResetDefaultTemplates}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Reset templates to initial default"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Templates</span>
                </button>

                <button
                  onClick={handleClearNotificationLogs}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/50 border border-rose-900/50 text-xs font-mono text-rose-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Purge all delivery logs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Purge Logs</span>
                </button>

                <button
                  onClick={() => navigate('/admin/notifications')}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-purple-600/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Notification Center</span>
                </button>
              </div>
            </div>

            {/* SOUND SYNTHESIZER TESTER PILLS */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-2">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Test Audio Chime:</span>
              </span>

              <button
                onClick={() => handlePlaySoundTone('INFO')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  playingTone === 'INFO'
                    ? 'bg-cyan-500 text-white scale-95'
                    : 'bg-cyan-950/70 border border-cyan-800 text-cyan-300 hover:bg-cyan-900'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>Default Chime (D5-A5)</span>
              </button>

              <button
                onClick={() => handlePlaySoundTone('SUCCESS')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  playingTone === 'SUCCESS'
                    ? 'bg-emerald-500 text-white scale-95'
                    : 'bg-emerald-950/70 border border-emerald-800 text-emerald-300 hover:bg-emerald-900'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>Success Chord (C-E-G)</span>
              </button>

              <button
                onClick={() => handlePlaySoundTone('WARNING')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  playingTone === 'WARNING'
                    ? 'bg-amber-500 text-white scale-95'
                    : 'bg-amber-950/70 border border-amber-800 text-amber-300 hover:bg-amber-900'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>Warning Tone (Triangle 440Hz)</span>
              </button>

              <button
                onClick={() => handlePlaySoundTone('CRITICAL')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  playingTone === 'CRITICAL'
                    ? 'bg-rose-500 text-white scale-95'
                    : 'bg-rose-950/70 border border-rose-800 text-rose-300 hover:bg-rose-900'
                }`}
              >
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                <span>Critical Siren (Dual-Tone 880Hz)</span>
              </button>
            </div>
          </div>

          {/* TWO COLUMN WORKSPACE: BROADCAST DISPATCHER & JSON INJECTOR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* COLUMN 1: LIVE BROADCAST DISPATCHER */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 bg-slate-950/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <span>Instant Alert & Broadcast Dispatcher</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                    LIVE PIPELINE
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 mb-4">
                  Kirim notifikasi instan langsung ke user target, role tertentu, atau seluruh stakeholder via multi-channel delivery.
                </p>

                <form onSubmit={handleBroadcastSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      Judul Notifikasi
                    </label>
                    <input
                      type="text"
                      required
                      value={broadcastForm.title}
                      onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                      placeholder="e.g. Pemeliharaan Database Darurat Pukul 02:00 WIB"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      Isi Pesan Notifikasi
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={broadcastForm.message}
                      onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                      placeholder="Tuliskan instruksi atau detail pesan notifikasi di sini..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                        Target Role / Penerima
                      </label>
                      <select
                        value={broadcastForm.targetRole}
                        onChange={(e) => setBroadcastForm({ ...broadcastForm, targetRole: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
                      >
                        <option value="ALL">SEMUA PENGGUNA (BROADCAST)</option>
                        <option value="SUPER_ADMIN">SUPER_ADMIN ONLY</option>
                        <option value="DEVELOPER">DEVELOPER ONLY</option>
                        <option value="SALES">SALES TEAM</option>
                        <option value="FINANCE">FINANCE TEAM</option>
                        <option value="SUPPORT">SUPPORT TEAM</option>
                        <option value="PROJECT_MANAGER">PROJECT MANAGER</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                        Tingkat Prioritas
                      </label>
                      <select
                        value={broadcastForm.priority}
                        onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value as any })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
                      >
                        <option value="CRITICAL">CRITICAL (Alert Merah + Sound)</option>
                        <option value="HIGH">HIGH (Penting)</option>
                        <option value="MEDIUM">MEDIUM (Standar)</option>
                        <option value="LOW">LOW (Informasional)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                        Kategori Label
                      </label>
                      <input
                        type="text"
                        value={broadcastForm.category}
                        onChange={(e) => setBroadcastForm({ ...broadcastForm, category: e.target.value })}
                        placeholder="e.g. System Broadcast / Ops"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                        Deep-link Action URL
                      </label>
                      <input
                        type="text"
                        value={broadcastForm.actionUrl}
                        onChange={(e) => setBroadcastForm({ ...broadcastForm, actionUrl: e.target.value })}
                        placeholder="/admin/projects atau /admin"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                      Kanal Pengiriman Aktif (Channels)
                    </label>
                    <div className="flex items-center gap-3 flex-wrap">
                      {(['IN_APP', 'EMAIL', 'WHATSAPP', 'PUSH'] as NotificationChannel[]).map((ch) => {
                        const isChecked = broadcastForm.channels.includes(ch);
                        return (
                          <label
                            key={ch}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBroadcastForm({ ...broadcastForm, channels: [...broadcastForm.channels, ch] });
                                } else {
                                  setBroadcastForm({
                                    ...broadcastForm,
                                    channels: broadcastForm.channels.filter((c) => c !== ch)
                                  });
                                }
                              }}
                              className="accent-cyan-500 cursor-pointer"
                            />
                            <span>{ch}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Dispatch Broadcast Alert</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* COLUMN 2: RAW JSON PAYLOAD INJECTOR & PRESETS */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 bg-slate-950/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code className="w-4 h-4 text-purple-400" />
                    <span>Raw JSON Event Injector</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                    DEV SIMULATOR
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 mb-3">
                  Pilih skenario siap pakai atau edit payload JSON bebas untuk menguji penerimaan event notifikasi secara sintetis.
                </p>

                {/* TEMPLATE PRESET BUTTONS */}
                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  <span className="text-[10px] font-mono text-slate-400 mr-1">Presets:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setRawJsonPayload(
                        JSON.stringify(
                          {
                            type: 'NEW_LEAD',
                            title: 'Lead Masuk: PT Petrokimia Mandiri',
                            message: 'Permintaan AI Computer Vision Pipeline senilai Rp 850.000.000 (Score 94/100)',
                            priority: 'HIGH',
                            targetRole: 'SALES',
                            channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
                            actionUrl: '/admin/leads',
                            metadata: { leadScore: 94, budget: 'Rp 850 Jt', service: 'Computer Vision AI' }
                          },
                          null,
                          2
                        )
                      )
                    }
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-cyan-300 border border-slate-800"
                  >
                    + Lead Inflow
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setRawJsonPayload(
                        JSON.stringify(
                          {
                            type: 'PAYMENT',
                            title: 'Pembayaran Lunas: INV-2026-0099',
                            message: 'Pembayaran DP 50% sebesar Rp 275.000.000 dari PT Tripatra AI telah diverifikasi BCA VA.',
                            priority: 'CRITICAL',
                            targetRole: 'FINANCE',
                            channels: ['IN_APP', 'EMAIL', 'WHATSAPP'],
                            actionUrl: '/admin/invoices',
                            metadata: { invoiceId: 'INV-2026-0099', amount: 275000000, bank: 'BCA Escrow' }
                          },
                          null,
                          2
                        )
                      )
                    }
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-emerald-300 border border-slate-800"
                  >
                    + Payment Confirmed
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setRawJsonPayload(
                        JSON.stringify(
                          {
                            type: 'SYSTEM',
                            title: 'Keamanan: Percobaan Brute Force IP Terdeteksi',
                            message: 'IP 185.220.101.4 diblokir otomatis oleh Firewall setelah 10x gagal login SSH/API.',
                            priority: 'CRITICAL',
                            targetRole: 'DEVELOPER',
                            channels: ['IN_APP', 'EMAIL', 'PUSH'],
                            actionUrl: '/admin/developer-control-panel',
                            metadata: { blockedIp: '185.220.101.4', attempts: 10, firewallRule: 'FAIL2BAN-GEO-ID' }
                          },
                          null,
                          2
                        )
                      )
                    }
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-rose-300 border border-slate-800"
                  >
                    + Security Incident
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setRawJsonPayload(
                        JSON.stringify(
                          {
                            type: 'PROJECT_UPDATE',
                            title: 'Milestone Selesai: AI Poultry Sensor IoT',
                            message: 'Firmware Over-The-Air Update v2.4.1 berhasil di-rollout ke 1.200 unit kandang.',
                            priority: 'MEDIUM',
                            targetRole: 'DEVELOPER',
                            channels: ['IN_APP', 'EMAIL'],
                            actionUrl: '/admin/projects',
                            metadata: { firmwareVersion: 'v2.4.1', devicesUpdated: 1200 }
                          },
                          null,
                          2
                        )
                      )
                    }
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-amber-300 border border-slate-800"
                  >
                    + IoT Milestone
                  </button>
                </div>

                <div>
                  <textarea
                    rows={9}
                    value={rawJsonPayload}
                    onChange={(e) => setRawJsonPayload(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-300 focus:border-purple-500 outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[11px] font-mono text-slate-500">
                  Emit to listeners & persist in storage
                </span>
                <button
                  type="button"
                  onClick={handleInjectRawJson}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Inject Event Payload</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION: OUTGOING WEBHOOKS & GATEWAY HUBS */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 bg-slate-950/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Webhook className="w-4 h-4 text-purple-400" />
                  <span>Webhooks & Third-Party Outbound Gateways</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Teruskan event notifikasi real-time ke Discord bot, Slack channels, Fonnte WhatsApp, Telegram, atau custom webhook endpoint.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingWebhook({
                    name: '',
                    provider: 'DISCORD',
                    url: '',
                    enabled: true,
                    eventSubscriptions: ['NEW_LEAD', 'PAYMENT', 'SUPPORT_TICKET', 'SYSTEM']
                  });
                  setWebhookModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Webhook Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {webhooks.map((wh) => (
                <div
                  key={wh.id}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            wh.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                          }`}
                        />
                        <h4 className="font-bold text-white text-xs">{wh.name}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300">
                        {wh.provider}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] font-mono text-slate-400 truncate bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                      {wh.url}
                    </div>

                    <div className="mt-2 flex items-center gap-1 flex-wrap">
                      {wh.eventSubscriptions.map((ev) => (
                        <span
                          key={ev}
                          className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-[9px] font-mono text-purple-300"
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div className="text-[10px] text-slate-500">
                      {wh.lastLatencyMs ? (
                        <span className="text-emerald-400 font-bold">{wh.lastLatencyMs}ms ping</span>
                      ) : (
                        <span>Belum diuji</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleTestWebhook(wh.id)}
                        disabled={testingWebhookId === wh.id}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[10px] flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        title="Ping Webhook"
                      >
                        <Zap className="w-3 h-3" />
                        <span>{testingWebhookId === wh.id ? 'Pinging...' : 'Ping Test'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingWebhook(wh);
                          setWebhookModalOpen(true);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Edit Webhook"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteWebhook(wh.id)}
                        className="p-1 rounded bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300"
                        title="Hapus Webhook"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: REAL-TIME EVENT STREAM & PIPELINE LOG */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 bg-slate-950/70">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Real-time Live Notification Event Stream ({recentEvents.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monitor event notifikasi yang diterbitkan oleh sistem secara live (Event-driven subscriber).
                </p>
              </div>

              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>LISTENING ACTIVE</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {recentEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        evt.priority === 'CRITICAL'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : evt.priority === 'HIGH'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-xs">{evt.title}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300">
                          {evt.type}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            evt.priority === 'CRITICAL'
                              ? 'bg-rose-950 text-rose-300'
                              : evt.priority === 'HIGH'
                              ? 'bg-amber-950 text-amber-300'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {evt.priority}
                        </span>
                        {evt.targetRole && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-950/70 border border-purple-800 text-[10px] font-mono text-purple-300">
                            Role: {evt.targetRole}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 max-w-2xl">{evt.message}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col md:items-end justify-between items-center gap-1.5 text-[11px] font-mono text-slate-400 shrink-0">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{new Date(evt.createdAt).toLocaleTimeString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {evt.channels.map((ch) => (
                        <span key={ch} className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REGISTER / EDIT WEBHOOK ENDPOINT                                   */}
      {/* ========================================================================= */}
      {webhookModalOpen && editingWebhook && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Webhook className="w-5 h-5 text-purple-400" />
              <span>
                {editingWebhook.id ? 'Edit Outgoing Webhook Endpoint' : 'Daftarkan Webhook Endpoint Baru'}
              </span>
            </h3>

            <form onSubmit={handleSaveWebhook} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                  Nama Endpoint / Integrasi
                </label>
                <input
                  type="text"
                  required
                  value={editingWebhook.name || ''}
                  onChange={(e) => setEditingWebhook({ ...editingWebhook, name: e.target.value })}
                  placeholder="e.g. Discord Server Alerts #engineering"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Provider / Gateway
                  </label>
                  <select
                    value={editingWebhook.provider || 'CUSTOM'}
                    onChange={(e) => setEditingWebhook({ ...editingWebhook, provider: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    <option value="DISCORD">Discord Webhook</option>
                    <option value="SLACK">Slack Incoming Webhook</option>
                    <option value="TELEGRAM">Telegram Bot API</option>
                    <option value="FONNTE_WHATSAPP">Fonnte WhatsApp API</option>
                    <option value="TWILIO">Twilio SMS / WhatsApp</option>
                    <option value="SENDGRID">SendGrid SMTP Gateway</option>
                    <option value="CUSTOM">Custom HTTP POST Endpoint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Status Gateway
                  </label>
                  <select
                    value={editingWebhook.enabled ? 'ACTIVE' : 'DISABLED'}
                    onChange={(e) => setEditingWebhook({ ...editingWebhook, enabled: e.target.value === 'ACTIVE' })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    <option value="ACTIVE">ENABLED (Aktif)</option>
                    <option value="DISABLED">DISABLED (Non-aktif)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                  Webhook Target URL / Endpoint Destination
                </label>
                <input
                  type="url"
                  required
                  value={editingWebhook.url || ''}
                  onChange={(e) => setEditingWebhook({ ...editingWebhook, url: e.target.value })}
                  placeholder="https://discord.com/api/webhooks/... atau https://api.yourdomain.com/notifications"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                  Bearer Token / API Auth Key (Opsional)
                </label>
                <input
                  type="password"
                  value={editingWebhook.authToken || ''}
                  onChange={(e) => setEditingWebhook({ ...editingWebhook, authToken: e.target.value })}
                  placeholder="Bearer eyJhbGciOi... atau Secret Auth Token"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                  Event Subscriptions (Notifikasi yang akan diteruskan)
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {[
                    'NEW_LEAD',
                    'NEW_CUSTOMER',
                    'PROPOSAL',
                    'QUOTATION',
                    'PAYMENT',
                    'PROJECT_UPDATE',
                    'SUPPORT_TICKET',
                    'SYSTEM'
                  ].map((evType) => {
                    const subs = editingWebhook.eventSubscriptions || [];
                    const isSubbed = subs.includes(evType as any);
                    return (
                      <label key={evType} className="flex items-center gap-2 text-slate-300 font-mono text-[11px] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSubbed}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditingWebhook({
                                ...editingWebhook,
                                eventSubscriptions: [...subs, evType as any]
                              });
                            } else {
                              setEditingWebhook({
                                ...editingWebhook,
                                eventSubscriptions: subs.filter((s) => s !== evType)
                              });
                            }
                          }}
                          className="accent-purple-500 cursor-pointer"
                        />
                        <span>{evType}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setWebhookModalOpen(false);
                    setEditingWebhook(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold"
                >
                  Simpan Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: USER MANAGEMENT (CREATE & EDIT FOR INTERNAL & CUSTOMER)            */}
      {/* ========================================================================= */}
      {userModalType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg rounded-2xl p-6 border border-white/10 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>
                {userModalType === 'internal' && 'Buat Akun Staf / Developer Baru'}
                {userModalType === 'edit-internal' && 'Edit Akun Developer & Staf Internal'}
                {userModalType === 'customer' && 'Buat Akun Klien Portal Pelanggan'}
                {userModalType === 'edit-customer' && 'Edit Akun Klien Portal Pelanggan'}
              </span>
            </h3>

            {/* CREATE INTERNAL USER FORM */}
            {userModalType === 'internal' && (
              <form onSubmit={handleCreateInternalUser} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={newInternalUser.name}
                    onChange={(e) => setNewInternalUser({ ...newInternalUser, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    placeholder="e.g. Arif Wicaksono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Email Internal</label>
                  <input
                    type="email"
                    required
                    value={newInternalUser.email}
                    onChange={(e) => setNewInternalUser({ ...newInternalUser, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    placeholder="arif@smart-ai.id"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">
                      Password / Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomUserPassword}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-mono hover:underline"
                    >
                      <Key className="w-3 h-3" /> Auto Generate
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showUserPassword ? 'text' : 'password'}
                      value={newInternalUser.password || ''}
                      onChange={(e) => setNewInternalUser({ ...newInternalUser, password: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 pr-10 text-white font-mono"
                      placeholder="Masukkan kata sandi (atau klik Auto Generate)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowUserPassword(!showUserPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      title={showUserPassword ? 'Sembunyikan Password' : 'Lihat Password'}
                    >
                      {showUserPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Biarkan kosong untuk otomatis membuat password acak yang aman.
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Role / Peran</label>
                    <select
                      value={newInternalUser.role}
                      onChange={(e) => setNewInternalUser({ ...newInternalUser, role: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="DEVELOPER">DEVELOPER</option>
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
                      <option value="SALES">SALES</option>
                      <option value="FINANCE">FINANCE</option>
                      <option value="CONTENT_MANAGER">CONTENT_MANAGER</option>
                      <option value="SUPPORT">SUPPORT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Departemen</label>
                    <input
                      type="text"
                      value={newInternalUser.department}
                      onChange={(e) => setNewInternalUser({ ...newInternalUser, department: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">No. Telepon / WhatsApp</label>
                  <input
                    type="text"
                    value={newInternalUser.phone}
                    onChange={(e) => setNewInternalUser({ ...newInternalUser, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    placeholder="+62 812 0000 0000"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setUserModalType(null);
                      setShowUserPassword(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold cursor-pointer shadow-lg shadow-cyan-600/20"
                  >
                    Buat Akun
                  </button>
                </div>
              </form>
            )}

            {/* EDIT INTERNAL USER FORM */}
            {userModalType === 'edit-internal' && editingInternalUser && (
              <form onSubmit={handleUpdateInternalUser} className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-400">User ID:</span>
                  <span className="text-cyan-400 font-bold">{editingInternalUser.id}</span>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={editingInternalUser.name}
                    onChange={(e) => setEditingInternalUser({ ...editingInternalUser, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium"
                    placeholder="Nama Lengkap"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Email Akun</label>
                  <input
                    type="email"
                    required
                    value={editingInternalUser.email}
                    onChange={(e) => setEditingInternalUser({ ...editingInternalUser, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    placeholder="email@smart-ai.id"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">
                      Password / Ubah Kata Sandi (Opsional)
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomUserPassword}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-mono hover:underline"
                    >
                      <Key className="w-3 h-3" /> Auto Generate
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showUserPassword ? 'text' : 'password'}
                      value={editingInternalUser.password || ''}
                      onChange={(e) => setEditingInternalUser({ ...editingInternalUser, password: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 pr-10 text-white font-mono"
                      placeholder="Kosongkan jika tidak ingin mengubah password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowUserPassword(!showUserPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      title={showUserPassword ? 'Sembunyikan Password' : 'Lihat Password'}
                    >
                      {showUserPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Role / Peran</label>
                    <select
                      value={editingInternalUser.role}
                      onChange={(e) => setEditingInternalUser({ ...editingInternalUser, role: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    >
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="DEVELOPER">DEVELOPER</option>
                      <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
                      <option value="SALES">SALES</option>
                      <option value="FINANCE">FINANCE</option>
                      <option value="CONTENT_MANAGER">CONTENT_MANAGER</option>
                      <option value="SUPPORT">SUPPORT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Departemen</label>
                    <input
                      type="text"
                      value={editingInternalUser.department || ''}
                      onChange={(e) => setEditingInternalUser({ ...editingInternalUser, department: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      placeholder="e.g. Delivery & Engineering"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nomor Telepon / WA</label>
                    <input
                      type="text"
                      value={editingInternalUser.phone || ''}
                      onChange={(e) => setEditingInternalUser({ ...editingInternalUser, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Status Akun</label>
                    <select
                      value={editingInternalUser.status || 'ACTIVE'}
                      onChange={(e) => setEditingInternalUser({ ...editingInternalUser, status: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    >
                      <option value="ACTIVE">ACTIVE (Aktif)</option>
                      <option value="SUSPENDED">SUSPENDED (Ditangguhkan)</option>
                      <option value="PENDING">PENDING (Menunggu)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setUserModalType(null);
                      setEditingInternalUser(null);
                      setShowUserPassword(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold cursor-pointer shadow-lg shadow-cyan-600/20"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}

            {/* CREATE CUSTOMER FORM */}
            {userModalType === 'customer' && (
              <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Perusahaan / Klien</label>
                  <input
                    type="text"
                    required
                    value={newCustomer.companyName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    placeholder="PT Graha Solusi Prima"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama PIC</label>
                    <input
                      type="text"
                      value={newCustomer.picName}
                      onChange={(e) => setNewCustomer({ ...newCustomer, picName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      placeholder="Ibu Sarah Wijaya"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Email PIC</label>
                    <input
                      type="email"
                      required
                      value={newCustomer.picEmail}
                      onChange={(e) => setNewCustomer({ ...newCustomer, picEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      placeholder="sarah@grahasolusi.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">
                      Password Akun Portal (Opsional)
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomUserPassword}
                      className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer font-mono hover:underline"
                    >
                      <Key className="w-3 h-3" /> Auto Generate
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showUserPassword ? 'text' : 'password'}
                      value={newCustomer.initialPasswordGenerated || ''}
                      onChange={(e) => setNewCustomer({ ...newCustomer, initialPasswordGenerated: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 pr-10 text-white font-mono"
                      placeholder="Masukkan password atau klik Auto Generate"
                    />
                    <button
                      type="button"
                      onClick={() => setShowUserPassword(!showUserPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      title={showUserPassword ? 'Sembunyikan Password' : 'Lihat Password'}
                    >
                      {showUserPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Klien akan menggunakan email PIC dan password ini untuk login ke Portal Klien.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Paket Langganan</label>
                    <select
                      value={newCustomer.subscriptionPlan}
                      onChange={(e) => setNewCustomer({ ...newCustomer, subscriptionPlan: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Enterprise AI Tier">Enterprise AI Tier</option>
                      <option value="Professional Cloud">Professional Cloud</option>
                      <option value="Custom Project SLA">Custom Project SLA</option>
                      <option value="Pilot Prototype">Pilot Prototype</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kuota Token AI Bulanan</label>
                    <input
                      type="number"
                      value={newCustomer.aiTokenMonthlyLimit}
                      onChange={(e) => setNewCustomer({ ...newCustomer, aiTokenMonthlyLimit: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setUserModalType(null);
                      setShowUserPassword(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold cursor-pointer shadow-lg shadow-purple-600/20"
                  >
                    Buat Akun Klien & Simpan Password
                  </button>
                </div>
              </form>
            )}

            {/* EDIT CUSTOMER FORM */}
            {userModalType === 'edit-customer' && editingCustomer && (
              <form onSubmit={handleUpdateCustomer} className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-400">Customer ID:</span>
                  <span className="text-purple-400 font-bold">{editingCustomer.id}</span>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Perusahaan / Klien</label>
                  <input
                    type="text"
                    required
                    value={editingCustomer.companyName}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama PIC</label>
                    <input
                      type="text"
                      value={editingCustomer.picName}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, picName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Email PIC</label>
                    <input
                      type="email"
                      required
                      value={editingCustomer.picEmail}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, picEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">
                      Reset Password Portal (Opsional)
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomUserPassword}
                      className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer font-mono hover:underline"
                    >
                      <Key className="w-3 h-3" /> Auto Generate
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showUserPassword ? 'text' : 'password'}
                      value={editingCustomer.initialPasswordGenerated || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, initialPasswordGenerated: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 pr-10 text-white font-mono"
                      placeholder="Kosongkan jika tidak ingin mereset password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowUserPassword(!showUserPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      title={showUserPassword ? 'Sembunyikan Password' : 'Lihat Password'}
                    >
                      {showUserPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">No. Telepon PIC</label>
                    <input
                      type="text"
                      value={editingCustomer.picPhone || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, picPhone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Industri</label>
                    <input
                      type="text"
                      value={editingCustomer.industry || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, industry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Paket Langganan</label>
                    <select
                      value={editingCustomer.subscriptionPlan}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, subscriptionPlan: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Enterprise AI Tier">Enterprise AI Tier</option>
                      <option value="Professional Cloud">Professional Cloud</option>
                      <option value="Custom Project SLA">Custom Project SLA</option>
                      <option value="Pilot Prototype">Pilot Prototype</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Status Portal</label>
                    <select
                      value={editingCustomer.portalAccessStatus}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, portalAccessStatus: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    >
                      <option value="ACTIVE">ACTIVE (Aktif)</option>
                      <option value="SUSPENDED">SUSPENDED (Ditangguhkan)</option>
                      <option value="EXPIRED">EXPIRED (Kedaluwarsa)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kuota Token AI Bulanan</label>
                  <input
                    type="number"
                    value={editingCustomer.aiTokenMonthlyLimit}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, aiTokenMonthlyLimit: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setUserModalType(null);
                      setEditingCustomer(null);
                      setShowUserPassword(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold cursor-pointer shadow-lg shadow-purple-600/20"
                  >
                    Simpan Perubahan Klien
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD MEDIA ASSET                                                    */}
      {/* ========================================================================= */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Video className="w-5 h-5 text-rose-400" />
              <span>Tambah Gambar / Video Baru</span>
            </h3>

            <form onSubmit={handleAddMedia} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Judul / Nama Media</label>
                <input
                  type="text"
                  required
                  value={newMedia.name}
                  onChange={(e) => setNewMedia({ ...newMedia, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="e.g. Video Demo Smart Poultry IoT"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tipe Media</label>
                  <select
                    value={newMedia.type}
                    onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="image">Gambar (Image URL)</option>
                    <option value="video">Video (YouTube / Direct MP4)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kategori</label>
                  <select
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="hero">Hero Section</option>
                    <option value="showcase">Product Showcase</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="banner">Banner Promo</option>
                    <option value="team">Team & Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                  URL Media (Image link / YouTube Link / Video MP4)
                </label>
                <input
                  type="url"
                  required
                  value={newMedia.url}
                  onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  placeholder="https://images.unsplash.com/... atau https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Alt Text / Deskripsi Singkat</label>
                <input
                  type="text"
                  value={newMedia.altText}
                  onChange={(e) => setNewMedia({ ...newMedia, altText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="Deskripsi untuk SEO dan aksesibilitas"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold"
                >
                  Simpan Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: IMPORT JSON STATE                                                  */}
      {/* ========================================================================= */}
      {importJsonOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Upload className="w-5 h-5 text-cyan-400" />
              <span>Import Full System Snapshot JSON</span>
            </h3>
            <p className="text-xs text-slate-400">
              Paste data JSON snapshot sistem untuk memulihkan seluruh konfigurasi, API Key, akun user, dan konten website.
            </p>
            <textarea
              rows={8}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200"
              placeholder='{ "smart_ai_managed_api_keys": [...] }'
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setImportJsonOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleImportSnapshot}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold"
              >
                Terapkan Snapshot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
