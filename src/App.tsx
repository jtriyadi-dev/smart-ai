import React, { useState } from 'react';
import { useRouter } from './lib/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { DetailModal } from './components/DetailModal';
import { AIBlueprintModal } from './components/AIBlueprintModal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { TechPage } from './pages/TechPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { AIAppBuilderPage } from './pages/AIAppBuilderPage';
import { AIRequirementAnalyzerPage } from './pages/AIRequirementAnalyzerPage';
import { AIArchitecturePage } from './pages/AIArchitecturePage';
import { AIModuleGeneratorPage } from './pages/AIModuleGeneratorPage';
import { AIProjectEstimatorPage } from './pages/AIProjectEstimatorPage';
import { RequestApplicationPage } from './pages/RequestApplicationPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { AdminLeadsPage } from './pages/AdminLeadsPage';
import { AdminCRMPage } from './pages/admin/AdminCRMPage';
import { AISalesAssistantPage } from './pages/admin/AISalesAssistantPage';
import { AdminSupportDashboardPage } from './pages/admin/AdminSupportDashboardPage';
import { AdminSupportQueuePage } from './pages/admin/AdminSupportQueuePage';
import { AdminSupportDetailPage } from './pages/admin/AdminSupportDetailPage';
import { AdminSupportAgentsPage } from './pages/admin/AdminSupportAgentsPage';
import { AdminSupportCategoriesPage } from './pages/admin/AdminSupportCategoriesPage';
import { AdminSupportReportsPage } from './pages/admin/AdminSupportReportsPage';
import { AdminSupportSettingsPage } from './pages/admin/AdminSupportSettingsPage';
import { AdminKnowledgePage } from './pages/admin/AdminKnowledgePage';
import { AdminCopilotPage } from './pages/admin/AdminCopilotPage';
import { FloatingChatbot } from './components/chat/FloatingChatbot';
import { AdminProjectsListPage } from './pages/admin/projects/AdminProjectsListPage';
import { AdminProjectNewPage } from './pages/admin/projects/AdminProjectNewPage';
import { AdminProjectDetailPage } from './pages/admin/projects/AdminProjectDetailPage';
import { ProposalsDashboardPage } from './pages/admin/ProposalsDashboardPage';
import { ProposalEditorPage } from './pages/admin/ProposalEditorPage';
import { ProposalViewPage } from './pages/admin/ProposalViewPage';
import { PublicProposalViewPage } from './pages/PublicProposalViewPage';
import { QuotationsDashboardPage } from './pages/admin/QuotationsDashboardPage';
import { QuotationEditorPage } from './pages/admin/QuotationEditorPage';
import { QuotationDetailPage } from './pages/admin/QuotationDetailPage';
import { QuotationPDFPage } from './pages/admin/QuotationPDFPage';
import { PublicQuotationViewPage } from './pages/public/PublicQuotationViewPage';
import { InvoicesDashboardPage } from './pages/admin/InvoicesDashboardPage';
import { InvoiceEditorPage } from './pages/admin/InvoiceEditorPage';
import { InvoiceDetailPage } from './pages/admin/InvoiceDetailPage';
import { PaymentRecordPage } from './pages/admin/PaymentRecordPage';
import { InvoicePDFPage } from './pages/admin/InvoicePDFPage';
import { ReceiptDetailPage } from './pages/admin/ReceiptDetailPage';
import { PublicInvoiceViewPage } from './pages/public/PublicInvoiceViewPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Control Center Imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardHome } from './pages/admin/AdminDashboardHome';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminIndustriesPage } from './pages/admin/AdminIndustriesPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminRolesPage } from './pages/admin/AdminRolesPage';
import { AdminRoleDetailPage } from './pages/admin/AdminRoleDetailPage';
import { AdminAICenterPage } from './pages/admin/AdminAICenterPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminApprovalsPage } from './pages/admin/AdminApprovalsPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminSecurityDashboardPage } from './pages/admin/AdminSecurityDashboardPage';
import { AdminPerformanceDashboardPage } from './pages/admin/AdminPerformanceDashboardPage';
import { AdminResponsiveAuditPage } from './pages/admin/AdminResponsiveAuditPage';
import { AdminQADashboardPage } from './pages/admin/AdminQADashboardPage';
import { AdminProductionPage } from './pages/admin/AdminProductionPage';
import { AdminDeveloperControlPanelPage } from './pages/admin/AdminDeveloperControlPanelPage';
import { NotificationToastContainer } from './components/common/NotificationToastContainer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { IndustrySolutionsPage } from './pages/solutions/IndustrySolutionsPage';
import { IndustryDetailPage } from './pages/solutions/IndustryDetailPage';
import { PortfolioLandingPage } from './pages/portfolio/PortfolioLandingPage';
import { PortfolioDetailPage } from './pages/portfolio/PortfolioDetailPage';
import { AdminPortfolioPage } from './pages/admin/AdminPortfolioPage';

import { BlogLandingPage } from './pages/blog/BlogLandingPage';
import { BlogDetailPage } from './pages/blog/BlogDetailPage';
import { BlogCategoryPage } from './pages/blog/BlogCategoryPage';
import { BlogTagPage } from './pages/blog/BlogTagPage';
import { BlogSearchPage } from './pages/blog/BlogSearchPage';
import { BlogAuthorPage } from './pages/blog/BlogAuthorPage';
import { AdminBlogPage } from './pages/admin/blog/AdminBlogPage';

import { SEOLandingPageDetail } from './pages/seo/SEOLandingPageDetail';
import { AdminSEOPage } from './pages/admin/seo/AdminSEOPage';
import { SEOService } from './services/SEOService';
import { SEOHead } from './components/seo/SEOHead';

import { CustomerLoginPage } from './pages/portal/CustomerLoginPage';
import { CustomerRegisterPage } from './pages/portal/CustomerRegisterPage';
import { CustomerForgotPasswordPage } from './pages/portal/CustomerForgotPasswordPage';
import { CustomerDashboardPage } from './pages/portal/CustomerDashboardPage';
import { CustomerProjectsPage } from './pages/portal/CustomerProjectsPage';
import { CustomerProjectDetailPage } from './pages/portal/CustomerProjectDetailPage';
import { CustomerProposalsPage } from './pages/portal/CustomerProposalsPage';
import { CustomerQuotationsPage } from './pages/portal/CustomerQuotationsPage';
import { CustomerInvoicesPage } from './pages/portal/CustomerInvoicesPage';
import { CustomerPaymentsPage } from './pages/portal/CustomerPaymentsPage';
import { CustomerReceiptsPage } from './pages/portal/CustomerReceiptsPage';
import { CustomerDocumentsPage } from './pages/portal/CustomerDocumentsPage';
import { CustomerDocumentDetailPage } from './pages/portal/CustomerDocumentDetailPage';
import { CustomerTicketsPage } from './pages/portal/CustomerTicketsPage';
import { CustomerTicketDetailPage } from './pages/portal/CustomerTicketDetailPage';
import { CustomerNewTicketPage } from './pages/portal/CustomerNewTicketPage';
import { CustomerCompanyPage } from './pages/portal/CustomerCompanyPage';
import { CustomerProfilePage } from './pages/portal/CustomerProfilePage';
import { CustomerSettingsPage } from './pages/portal/CustomerSettingsPage';
import { CustomerNotificationsPage } from './pages/portal/CustomerNotificationsPage';

// PWA Mode Components
import { PWAInstallBanner } from './components/pwa/PWAInstallBanner';
import { PWAInstallModal } from './components/pwa/PWAInstallModal';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';
import { PWAUpdateToast } from './components/pwa/PWAUpdateToast';

import { ServiceItem, IndustrySolution, PortfolioItem, AIScopeBlueprint, LeadFormData } from './types';

export default function App() {
  const { currentPath, navigate } = useRouter();

  const [pwaModalOpen, setPwaModalOpen] = useState(false);

  const [modalData, setModalData] = useState<{
    item: ServiceItem | IndustrySolution | PortfolioItem | null;
    type: 'service' | 'industry' | 'portfolio' | null;
  }>({ item: null, type: null });

  const [aiBlueprintModalOpen, setAiBlueprintModalOpen] = useState(false);
  const [initialLeadData, setInitialLeadData] = useState<Partial<LeadFormData>>({});

  const navigateToConsultationForm = () => {
    if (currentPath !== '/') {
      navigate('/', { scrollTargetId: '#request-form' });
    } else {
      const el = document.querySelector('#request-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setModalData({ item: service, type: 'service' });
  };

  const handleSelectIndustry = (industry: IndustrySolution) => {
    setModalData({ item: industry, type: 'industry' });
  };

  const handleSelectPortfolio = (item: PortfolioItem) => {
    setModalData({ item: item, type: 'portfolio' });
  };

  const handleApplyBlueprintToForm = (blueprint: AIScopeBlueprint, userPrompt: string) => {
    setInitialLeadData({
      applicationType: 'AI Web Application Development',
      requiredFeatures: blueprint.coreModules,
      message: `[AI Blueprint Applied]:\nRingkasan: ${blueprint.summary}\nStack: ${blueprint.recommendedStack.frontend} + ${blueprint.recommendedStack.backend}\nPesan Tambahan: ${userPrompt}`
    });
    setAiBlueprintModalOpen(false);
    navigateToConsultationForm();
  };

  const handleLoginSuccess = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  // Render view based on route path
  const renderCurrentPage = () => {
    // Customer Portal Routes & Aliases (/portal/* and /customer/*)
    if (currentPath === '/portal/login' || currentPath === '/customer/login') return <CustomerLoginPage />;
    if (currentPath === '/portal/register' || currentPath === '/customer/register' || currentPath === '/register') return <CustomerRegisterPage />;
    if (currentPath === '/portal/forgot-password' || currentPath === '/customer/forgot-password' || currentPath === '/forgot-password' || currentPath === '/reset-password') return <CustomerForgotPasswordPage />;
    if (currentPath === '/portal/dashboard' || currentPath === '/customer/dashboard' || currentPath === '/customer') return <CustomerDashboardPage />;
    if (currentPath === '/portal/projects' || currentPath === '/customer/projects') return <CustomerProjectsPage />;
    if (currentPath.startsWith('/portal/projects/') || currentPath.startsWith('/customer/projects/')) return <CustomerProjectDetailPage />;
    if (currentPath === '/portal/proposals' || currentPath === '/customer/proposals') return <CustomerProposalsPage />;
    if (currentPath === '/portal/quotations' || currentPath === '/customer/quotations') return <CustomerQuotationsPage />;
    if (currentPath === '/portal/invoices' || currentPath === '/customer/invoices') return <CustomerInvoicesPage />;
    if (currentPath === '/portal/payments' || currentPath === '/customer/payments') return <CustomerPaymentsPage />;
    if (currentPath === '/portal/receipts' || currentPath === '/customer/receipts') return <CustomerReceiptsPage />;
    if (currentPath.startsWith('/portal/documents/') || currentPath.startsWith('/customer/documents/')) return <CustomerDocumentDetailPage />;
    if (currentPath === '/portal/documents' || currentPath === '/customer/documents') return <CustomerDocumentsPage />;
    if (currentPath === '/portal/tickets/new' || currentPath === '/portal/support/new' || currentPath === '/customer/tickets/new' || currentPath === '/customer/support/new') return <CustomerNewTicketPage />;
    if (currentPath.startsWith('/portal/tickets/') || currentPath.startsWith('/portal/support/') || currentPath.startsWith('/customer/tickets/') || currentPath.startsWith('/customer/support/')) return <CustomerTicketDetailPage />;
    if (currentPath === '/portal/tickets' || currentPath === '/portal/support' || currentPath === '/customer/tickets' || currentPath === '/customer/support') return <CustomerTicketsPage />;
    if (currentPath === '/portal/company' || currentPath === '/customer/company') return <CustomerCompanyPage />;
    if (currentPath === '/portal/profile' || currentPath === '/customer/profile') return <CustomerProfilePage />;
    if (currentPath === '/portal/settings' || currentPath === '/customer/settings') return <CustomerSettingsPage />;
    if (currentPath === '/portal/notifications' || currentPath === '/customer/notifications') return <CustomerNotificationsPage />;

    if (currentPath.startsWith('/invoice/view')) {
      return <PublicInvoiceViewPage />;
    }

    // ADMIN & CONTROL PANEL ROUTES (25 Primary Menus + Sub-routes)
    if (
      currentPath === '/admin' ||
      currentPath === '/admin/dashboard' ||
      currentPath === '/control-panel' ||
      currentPath === '/control-panel/dashboard'
    ) {
      return (
        <AdminLayout activeRoute="/admin" pageTitle="Control Center Overview" pageSubtitle="Monitoring real-time performance, pipeline sales, dan AI telemetry">
          <AdminDashboardHome />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/notifications') || currentPath.startsWith('/control-panel/notifications')) {
      return (
        <AdminLayout activeRoute="/admin/notifications" pageTitle="Enterprise Notification Center" pageSubtitle="Pusat orkestrasi notifikasi & alert real-time">
          <AdminNotificationsPage />
        </AdminLayout>
      );
    }

    if (
      currentPath === '/admin/leads' ||
      currentPath === '/control-panel/leads' ||
      currentPath.startsWith('/admin/leads/') ||
      currentPath.startsWith('/control-panel/leads/')
    ) {
      return (
        <AdminLayout activeRoute="/admin/leads" pageTitle="Leads Management" pageSubtitle="Kelola pendaftaran prospek & pengajuan aplikasi">
          <AdminLeadsPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/crm') || currentPath.startsWith('/control-panel/crm')) {
      return (
        <AdminLayout activeRoute="/admin/crm" pageTitle="Enterprise CRM & Pipeline" pageSubtitle="Kanban pipeline, kontak, perusahaan & riwayat interaksi">
          <AdminCRMPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/customers') || currentPath.startsWith('/control-panel/customers')) {
      return (
        <AdminLayout activeRoute="/admin/customers" pageTitle="Customer Accounts" pageSubtitle="Kelola akun perusahaan, kontak PIC & relasi bisnis">
          <AdminCustomersPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/projects/new' || currentPath === '/control-panel/projects/new') {
      return (
        <AdminLayout activeRoute="/admin/projects" pageTitle="Tambah Project Baru">
          <AdminProjectNewPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/projects/') || currentPath.startsWith('/control-panel/projects/')) {
      return (
        <AdminLayout activeRoute="/admin/projects" pageTitle="Detail Execution Project">
          <AdminProjectDetailPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/projects') || currentPath.startsWith('/control-panel/projects')) {
      return (
        <AdminLayout activeRoute="/admin/projects" pageTitle="Project Delivery Management" pageSubtitle="Status pengerjaan, milestone, tim & SLA delivery">
          <AdminProjectsListPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/services') || currentPath.startsWith('/control-panel/services')) {
      return (
        <AdminLayout activeRoute="/admin/services" pageTitle="Services Master Catalog" pageSubtitle="Kelola katalog layanan, paket & estimasi biaya">
          <AdminServicesPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/industries') || currentPath.startsWith('/control-panel/industries')) {
      return (
        <AdminLayout activeRoute="/admin/industries" pageTitle="Sektor Solusi Industri" pageSubtitle="Master 19 modul industri spesifik SMART-AI.ID">
          <AdminIndustriesPage />
        </AdminLayout>
      );
    }

    if (
      currentPath === '/admin/portfolio' ||
      currentPath === '/control-panel/portfolio' ||
      currentPath.startsWith('/admin/portfolio/') ||
      currentPath.startsWith('/control-panel/portfolio/')
    ) {
      return (
        <AdminLayout activeRoute="/admin/portfolio" pageTitle="Portfolio & Case Studies" pageSubtitle="Kelola hasil karya & bukti studi kasus">
          <AdminPortfolioPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/blog') || currentPath.startsWith('/control-panel/blog')) {
      return (
        <AdminLayout activeRoute="/admin/blog" pageTitle="Blog & Content CMS" pageSubtitle="Kelola artikel, edukasi, kategori & pengarang">
          <AdminBlogPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/proposals/new' || currentPath === '/control-panel/proposals/new') {
      return (
        <AdminLayout activeRoute="/admin/proposals" pageTitle="Buat Proposal Baru">
          <ProposalsDashboardPage />
        </AdminLayout>
      );
    }

    if (
      (currentPath.startsWith('/admin/proposals/') || currentPath.startsWith('/control-panel/proposals/')) &&
      currentPath.endsWith('/edit')
    ) {
      return (
        <AdminLayout activeRoute="/admin/proposals" pageTitle="Edit Proposal">
          <ProposalEditorPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/proposals/') || currentPath.startsWith('/control-panel/proposals/')) {
      return (
        <AdminLayout activeRoute="/admin/proposals" pageTitle="View Proposal">
          <ProposalViewPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/proposals') || currentPath.startsWith('/control-panel/proposals')) {
      return (
        <AdminLayout activeRoute="/admin/proposals" pageTitle="Proposals Control" pageSubtitle="Kelola draf, penawaran & approval proposal komersial">
          <ProposalsDashboardPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/quotations/new' || currentPath === '/control-panel/quotations/new') {
      return (
        <AdminLayout activeRoute="/admin/quotations" pageTitle="Buat Quotation Baru">
          <QuotationEditorPage />
        </AdminLayout>
      );
    }

    if (
      (currentPath.startsWith('/admin/quotations/') || currentPath.startsWith('/control-panel/quotations/')) &&
      currentPath.endsWith('/edit')
    ) {
      return (
        <AdminLayout activeRoute="/admin/quotations" pageTitle="Edit Quotation">
          <QuotationEditorPage />
        </AdminLayout>
      );
    }

    if (
      (currentPath.startsWith('/admin/quotations/') || currentPath.startsWith('/control-panel/quotations/')) &&
      currentPath.endsWith('/pdf')
    ) {
      return <QuotationPDFPage />;
    }

    if (currentPath.startsWith('/admin/quotations/') || currentPath.startsWith('/control-panel/quotations/')) {
      return (
        <AdminLayout activeRoute="/admin/quotations" pageTitle="Detail Quotation">
          <QuotationDetailPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/quotations') || currentPath.startsWith('/control-panel/quotations')) {
      return (
        <AdminLayout activeRoute="/admin/quotations" pageTitle="Quotations Management" pageSubtitle="Penawaran resmi QTN-2026-XXXXXX">
          <QuotationsDashboardPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/invoices/new' || currentPath === '/control-panel/invoices/new') {
      return (
        <AdminLayout activeRoute="/admin/invoices" pageTitle="Buat Invoice Baru">
          <InvoiceEditorPage />
        </AdminLayout>
      );
    }

    if (
      (currentPath.startsWith('/admin/invoices/') || currentPath.startsWith('/control-panel/invoices/')) &&
      currentPath.endsWith('/edit')
    ) {
      return (
        <AdminLayout activeRoute="/admin/invoices" pageTitle="Edit Invoice">
          <InvoiceEditorPage />
        </AdminLayout>
      );
    }

    if (
      (currentPath.startsWith('/admin/invoices/') || currentPath.startsWith('/control-panel/invoices/')) &&
      currentPath.endsWith('/payments')
    ) {
      return (
        <AdminLayout activeRoute="/admin/invoices" pageTitle="Catat Pembayaran Invoice">
          <PaymentRecordPage />
        </AdminLayout>
      );
    }

    if (
      (currentPath.startsWith('/admin/invoices/') || currentPath.startsWith('/control-panel/invoices/')) &&
      currentPath.endsWith('/preview')
    ) {
      return <InvoicePDFPage />;
    }

    if (
      (currentPath.startsWith('/admin/invoices/') || currentPath.startsWith('/control-panel/invoices/')) &&
      currentPath.endsWith('/receipt')
    ) {
      return (
        <AdminLayout activeRoute="/admin/invoices" pageTitle="Kwitansi Resmi">
          <ReceiptDetailPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/invoices/') || currentPath.startsWith('/control-panel/invoices/')) {
      return (
        <AdminLayout activeRoute="/admin/invoices" pageTitle="Detail Invoice">
          <InvoiceDetailPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/invoices') || currentPath.startsWith('/control-panel/invoices')) {
      return (
        <AdminLayout activeRoute="/admin/invoices" pageTitle="Invoices & Payment Tracking" pageSubtitle="Tagihan, piutang, dan pencatatan pembayaran">
          <InvoicesDashboardPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/support/queue' || currentPath === '/control-panel/support/queue') {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Support Ticket Queue">
          <AdminSupportQueuePage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/support/agents' || currentPath === '/control-panel/support/agents') {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Support Staff & Agents">
          <AdminSupportAgentsPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/support/categories' || currentPath === '/control-panel/support/categories') {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Support Categories & SLA">
          <AdminSupportCategoriesPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/support/reports' || currentPath === '/control-panel/support/reports') {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Support Analytics Reports">
          <AdminSupportReportsPage />
        </AdminLayout>
      );
    }

    if (currentPath === '/admin/support/settings' || currentPath === '/control-panel/support/settings') {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Support System Settings">
          <AdminSupportSettingsPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/support/') || currentPath.startsWith('/control-panel/support/')) {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Detail Support Ticket">
          <AdminSupportDetailPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/support') || currentPath.startsWith('/control-panel/support')) {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Support Command Center" pageSubtitle="Antrean tiket, respon agen & SLA monitoring">
          <AdminSupportDashboardPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/ai-sales-assistant') || currentPath.startsWith('/control-panel/ai-sales-assistant')) {
      return (
        <AdminLayout activeRoute="/admin/ai" pageTitle="AI Sales Assistant">
          <AISalesAssistantPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/copilot') || currentPath.startsWith('/control-panel/copilot')) {
      return (
        <AdminLayout activeRoute="/admin/ai" pageTitle="AI Business Copilot">
          <AdminCopilotPage onNavigate={navigate} />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/ai') || currentPath.startsWith('/control-panel/ai')) {
      return (
        <AdminLayout activeRoute="/admin/ai" pageTitle="AI Control Center" pageSubtitle="Model architecture, telemetry, prompt settings & chatbot logs">
          <AdminAICenterPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/users/roles/') || currentPath.startsWith('/control-panel/users/roles/')) {
      return (
        <AdminLayout activeRoute="/admin/users" pageTitle="Granular Role Permission Matrix" pageSubtitle="Pengaturan matriks hak akses per role">
          <AdminRoleDetailPage />
        </AdminLayout>
      );
    }

    if (
      currentPath === '/admin/users/roles' ||
      currentPath === '/admin/roles' ||
      currentPath === '/control-panel/users/roles' ||
      currentPath === '/control-panel/roles'
    ) {
      return (
        <AdminLayout activeRoute="/admin/users" pageTitle="Enterprise Roles & Custom Roles" pageSubtitle="Kelola hirarki peran dan kustomisasi role tim">
          <AdminRolesPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/users') || currentPath.startsWith('/control-panel/users')) {
      return (
        <AdminLayout activeRoute="/admin/users" pageTitle="User Management & RBAC" pageSubtitle="Pengguna admin, peran & matriks hak akses">
          <AdminUsersPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/approvals') || currentPath.startsWith('/control-panel/approvals')) {
      return (
        <AdminLayout activeRoute="/admin/approvals" pageTitle="Approval Center" pageSubtitle="Persetujuan dokumen, proposal, quotation & konten">
          <AdminApprovalsPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/activity') || currentPath.startsWith('/control-panel/activity')) {
      return (
        <AdminLayout activeRoute="/admin/activity" pageTitle="Activity Trail & Audit Log" pageSubtitle="Jejak audit aktivitas seluruh pengguna admin">
          <AdminActivityPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/security') || currentPath.startsWith('/control-panel/security')) {
      return (
        <AdminLayout activeRoute="/admin/security" pageTitle="Security Hardening & WAF" pageSubtitle="Audit keamanan Zero-Trust, proteksi multi-tenant & manajemen ancaman">
          <AdminSecurityDashboardPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/performance') || currentPath.startsWith('/control-panel/performance')) {
      return (
        <AdminLayout activeRoute="/admin/performance" pageTitle="Performance Optimization & Web Vitals" pageSubtitle="Real-time Core Web Vitals, memory footprint, bundle health & live benchmark suite">
          <AdminPerformanceDashboardPage />
        </AdminLayout>
      );
    }

    if (
      currentPath.startsWith('/admin/responsive') ||
      currentPath.startsWith('/admin/responsive-audit') ||
      currentPath.startsWith('/control-panel/responsive') ||
      currentPath.startsWith('/control-panel/responsive-audit')
    ) {
      return (
        <AdminLayout activeRoute="/admin/responsive" pageTitle="Responsive UI/UX Audit & Simulator" pageSubtitle="Cross-device viewport testing suite & Mobile-First compliance engine">
          <AdminResponsiveAuditPage />
        </AdminLayout>
      );
    }

    if (
      currentPath.startsWith('/admin/qa') ||
      currentPath.startsWith('/admin/system-test') ||
      currentPath.startsWith('/control-panel/qa') ||
      currentPath.startsWith('/control-panel/system-test')
    ) {
      return (
        <AdminLayout activeRoute="/admin/qa" pageTitle="Master QA & System Verification" pageSubtitle="Master 21-kategori test plan, defect status, & Production Quality Gate">
          <AdminQADashboardPage />
        </AdminLayout>
      );
    }

    if (
      currentPath.startsWith('/admin/production') ||
      currentPath.startsWith('/admin/devops') ||
      currentPath.startsWith('/control-panel/production') ||
      currentPath.startsWith('/control-panel/devops')
    ) {
      return (
        <AdminLayout activeRoute="/admin/production" pageTitle="Production DevOps & Architecture" pageSubtitle="Audit environment, database pooling, DNS mapping & backup disaster recovery">
          <AdminProductionPage />
        </AdminLayout>
      );
    }

    if (
      currentPath.startsWith('/admin/developer') ||
      currentPath.startsWith('/admin/developer-control-panel') ||
      currentPath.startsWith('/control-panel/developer') ||
      currentPath.startsWith('/control-panel/developer-control-panel') ||
      currentPath === '/developer'
    ) {
      return (
        <AdminLayout activeRoute="/admin/developer" pageTitle="Developer Control Panel" pageSubtitle="Pusat konfigurasi live post-deploy, API Key, akun user/klien, edit teks website & media">
          <AdminDeveloperControlPanelPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/settings') || currentPath.startsWith('/control-panel/settings')) {
      return (
        <AdminLayout activeRoute="/admin/settings" pageTitle="System Settings" pageSubtitle="Setelan identitas perusahaan, branding, notifikasi & keamanan">
          <AdminSettingsPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/knowledge') || currentPath.startsWith('/control-panel/knowledge')) {
      return (
        <AdminLayout activeRoute="/admin/support" pageTitle="Knowledge Base CMS" pageSubtitle="Basis pengetahuan & dokumentasi bantuan">
          <AdminKnowledgePage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/admin/seo') || currentPath.startsWith('/control-panel/seo')) {
      return (
        <AdminLayout activeRoute="/admin/settings" pageTitle="SEO Engine Control" pageSubtitle="Mesin SEO, landing page otomatis & meta tags">
          <AdminSEOPage />
        </AdminLayout>
      );
    }

    if (currentPath.startsWith('/copilot')) {
      return <AdminCopilotPage onNavigate={navigate} />;
    }

    if (currentPath === '/blog') {
      return <BlogLandingPage />;
    }

    if (currentPath === '/blog/search') {
      return <BlogSearchPage />;
    }

    if (currentPath.startsWith('/blog/category/')) {
      const parts = currentPath.split('/blog/category/');
      return <BlogCategoryPage slug={parts[1] || ''} />;
    }

    if (currentPath.startsWith('/blog/tag/')) {
      const parts = currentPath.split('/blog/tag/');
      return <BlogTagPage slug={parts[1] || ''} />;
    }

    if (currentPath.startsWith('/blog/author/')) {
      const parts = currentPath.split('/blog/author/');
      return <BlogAuthorPage slug={parts[1] || ''} />;
    }

    if (currentPath.startsWith('/blog/')) {
      const parts = currentPath.split('/blog/');
      return <BlogDetailPage slug={parts[1] || ''} />;
    }

    if (currentPath === '/portfolio-hub') {
      return <PortfolioLandingPage />;
    }

    if (currentPath.startsWith('/portfolio/')) {
      return (
        <PortfolioDetailPage
          onOpenConsultationForm={(initialData) => {
            setInitialLeadData(initialData);
            navigateToConsultationForm();
          }}
        />
      );
    }

    if (currentPath === '/solutions') {
      return <IndustrySolutionsPage />;
    }

    if (currentPath.startsWith('/solutions/')) {
      return <IndustryDetailPage />;
    }

    // Target SEO Landing Pages (only if not root and not standard reserved routes)
    const reservedRoutes = ['/', '/services', '/layanan', '/solusi-industri', '/portfolio', '/teknologi', '/tentang-kami', '/about', '/faq', '/contact', '/ai-app-builder', '/ai-requirement-analyzer', '/ai-solution-architect', '/ai-module-generator', '/ai-project-estimator', '/request-application', '/consultation', '/thank-you', '/login', '/dashboard', '/admin', '/developer', '/control-panel', '/blog', '/solutions'];
    const seoLpSlug = currentPath.replace(/^\//, '').trim();
    if (seoLpSlug && !reservedRoutes.includes(currentPath) && !currentPath.startsWith('/admin') && !currentPath.startsWith('/portal') && !currentPath.startsWith('/customer')) {
      const matchedSeoLp = SEOService.getLandingPageBySlug(seoLpSlug);
      if (matchedSeoLp) {
        return <SEOLandingPageDetail slug={matchedSeoLp.slug} />;
      }
    }

    switch (currentPath) {
      case '/':
        return (
          <>
            <SEOHead
              title="Jasa Pembuatan Aplikasi AI & Web Custom Indonesia | SMART-AI.ID"
              description="Perusahaan jasa pembuatan aplikasi AI, custom web software, dashboard bisnis, dan AI automation terdepan di Indonesia. Dapatkan estimasi & konsultasi arsitektur gratis."
              canonicalUrl="https://www.smart-ai.id"
              jsonLd={{
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'SMART-AI.ID',
                url: 'https://www.smart-ai.id',
                logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
                description: 'Perusahaan pengembang aplikasi berbasis Artificial Intelligence (AI) dan custom enterprise software di Indonesia.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Jakarta',
                  addressCountry: 'ID'
                },
                sameAs: ['https://www.smart-ai.id']
              }}
            />
            <HomePage
              onOpenConsultation={navigateToConsultationForm}
              onOpenAIGenerator={() => setAiBlueprintModalOpen(true)}
              onSelectService={handleSelectService}
              onSelectIndustry={handleSelectIndustry}
              onSelectPortfolio={handleSelectPortfolio}
              initialLeadData={initialLeadData}
            />
          </>
        );
      case '/services':
      case '/layanan':
        return (
          <ServicesPage
            onSelectService={handleSelectService}
            onOpenConsultation={navigateToConsultationForm}
          />
        );
      case '/industries':
      case '/solusi-industri':
        return <IndustrySolutionsPage />;
      case '/portfolio':
        return (
          <PortfolioPage
            onSelectPortfolio={handleSelectPortfolio}
            onOpenConsultation={navigateToConsultationForm}
          />
        );
      case '/teknologi':
      case '/tech':
        return <TechPage />;
      case '/about':
      case '/tentang-kami':
        return <AboutPage onOpenConsultation={navigateToConsultationForm} />;
      case '/faq':
        return <FAQPage onOpenConsultation={navigateToConsultationForm} />;
      case '/contact':
      case '/kontak':
        return <ContactPage onOpenConsultation={navigateToConsultationForm} />;
      case '/builder':
      case '/ai-builder':
      case '/ai-app-builder':
        return (
          <AIAppBuilderPage
            onOpenConsultationWithBlueprint={(bp) => {
              handleApplyBlueprintToForm(bp, 'Applied from AI App Builder Interactive Tool');
            }}
            onOpenConsultationWithAnalysis={(analysis) => {
              setInitialLeadData({
                applicationType: 'AI Web Application Development',
                requiredFeatures: analysis.recommendedModules.map((m) => m.name),
                message: `[AI App Builder Analysis Applied]:\nSolusi: ${analysis.recommendedSolution?.solutionName}\nDeskripsi: ${analysis.recommendedSolution?.solutionDescription}\nPlatform: ${analysis.executiveSummary?.platformText || 'Web Desktop + PWA'}`
              });
              navigateToConsultationForm();
            }}
            onOpenRequirementAnalyzer={() => {
              navigate('/ai-requirement-analyzer');
            }}
          />
        );
      case '/ai-requirement-analyzer':
        return (
          <AIRequirementAnalyzerPage
            onOpenConsultationForm={(analysis) => {
              setInitialLeadData({
                applicationType: 'AI Web Application Development',
                requiredFeatures: analysis.functionalRequirements.map((fr) => fr.feature),
                message: `[AI Requirement Analysis Applied]:\nSolusi: ${analysis.projectOverview?.solutionName}\nDeskripsi: ${analysis.projectOverview?.executiveSummary}`
              });
              navigateToConsultationForm();
            }}
            onOpenSolutionArchitect={() => {
              navigate('/ai-solution-architect');
            }}
            onOpenModuleGenerator={() => {
              navigate('/ai-module-generator');
            }}
          />
        );
      case '/ai-solution-architect':
        return (
          <AIArchitecturePage
            onOpenConsultationForm={(arch) => {
              setInitialLeadData({
                applicationType: 'AI Web Application Development',
                requiredFeatures: arch.systemComponents.map((c) => c.name),
                message: `[AI Solution Architecture Applied]:\nPattern: ${arch.architectureOverview?.pattern}\nStack: ${arch.technologyStack?.map((t) => t.technology).join(', ')}\nRingkasan: ${arch.summary}`
              });
              navigateToConsultationForm();
            }}
            onOpenModuleGenerator={() => {
              navigate('/ai-module-generator');
            }}
          />
        );
      case '/ai-module-generator':
        return (
          <AIModuleGeneratorPage
            onOpenConsultationForm={(modConfig) => {
              setInitialLeadData({
                applicationType: 'AI Web Application Development',
                requiredFeatures: modConfig.modules.map((m) => m.name),
                message: `[AI Module Generator Configured]:\nIndustri: ${modConfig.industry} (${modConfig.businessType})\nTotal Modul: ${modConfig.summary.totalModules} (${modConfig.summary.mustHaveCount} Must Have, ${modConfig.summary.aiEnabledCount} AI-Enabled)`
              });
              navigateToConsultationForm();
            }}
            onContinueToNextStage={(stage) => {
              if (stage === 'architect') {
                navigate('/ai-solution-architect');
              } else {
                navigate('/ai-solution-architect');
              }
            }}
          />
        );
      case '/estimator':
      case '/ai-estimator':
      case '/ai-project-estimator':
        return (
          <AIProjectEstimatorPage
            onOpenProposalGenerator={(estimate) => {
              navigate('/consultation');
            }}
          />
        );
      case '/request-application':
        return <RequestApplicationPage />;
      case '/consultation':
        return <ConsultationPage />;
      case '/thank-you':
        return <ThankYouPage />;
      case '/login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case '/dashboard':
        return <DashboardPage />;
      default:
        return <NotFoundPage onGoHome={() => navigate('/')} />;
    }
  };

  const isStandaloneLayout = currentPath.startsWith('/admin') || currentPath.startsWith('/portal') || currentPath.startsWith('/customer');

  if (isStandaloneLayout) {
    return (
      <div className="min-h-screen bg-[#06090e] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {renderCurrentPage()}
        <NotificationToastContainer />
        <OfflineIndicator />
        <PWAUpdateToast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      
      {/* Fixed Sticky Glass Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenConsultation={navigateToConsultationForm}
        onOpenPWAInstall={() => setPwaModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* SMART-AI.ID AI Floating Chatbot Widget */}
      <FloatingChatbot currentPath={currentPath} onNavigate={navigate} />

      {/* Global Realtime Notification Toast Container */}
      <NotificationToastContainer />

      {/* PWA Mode Floating Banner & Modals */}
      <PWAInstallBanner onOpenModal={() => setPwaModalOpen(true)} />
      <PWAInstallModal isOpen={pwaModalOpen} onClose={() => setPwaModalOpen(false)} />
      <OfflineIndicator />
      <PWAUpdateToast />

      {/* Detail Specs Modal */}
      <DetailModal
        data={modalData.item}
        type={modalData.type}
        onClose={() => setModalData({ item: null, type: null })}
        onOpenConsultation={navigateToConsultationForm}
      />

      {/* Instant AI Architecture Blueprint Generator Modal */}
      <AIBlueprintModal
        isOpen={aiBlueprintModalOpen}
        onClose={() => setAiBlueprintModalOpen(false)}
        onApplyBlueprintToForm={handleApplyBlueprintToForm}
      />

    </div>
  );
}
