import React, { useState, useEffect } from 'react';
import {
  Save,
  Send,
  Plus,
  Trash2,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Lock,
  Layers,
  HelpCircle,
  FileCheck,
  Zap,
  Info,
  Building2,
  RefreshCw,
  Check,
  SlidersHorizontal,
  Gem,
  Calendar
} from 'lucide-react';
import { useRouter } from '../../lib/router';
import {
  Quotation,
  QuotationItem,
  QuotationItemCategory,
  PricingType,
  DiscountType,
  PaymentMilestone,
  QuotationPackage
} from '../../types';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';
import { QuotationPricingService } from '../../services/QuotationPricingService';
import { CurrencyService, SUPPORTED_CURRENCIES } from '../../services/CurrencyService';
import { QuotationAIReviewService } from '../../services/QuotationAIReviewService';
import { PriceCatalogService } from '../../services/PriceCatalogService';
import { PackageComparisonModal } from '../../components/quotation/PackageComparisonModal';
import { IndustryPricingService, INDUSTRY_SECTOR_CONFIGS } from '../../services/IndustryPricingService';

export const QuotationEditorPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Extract ID if in edit mode (e.g. /admin/quotations/QTN-123/edit)
  const isEditMode = currentPath.includes('/admin/quotations/') && currentPath.endsWith('/edit');
  const quotationId = isEditMode
    ? currentPath.replace('/admin/quotations/', '').replace('/edit', '')
    : null;

  const [formData, setFormData] = useState<Quotation>(() => {
    return {
      id: `QTN-${Date.now()}`,
      quotationNumber: QuotationDocumentService.generateQuotationNumber(),
      version: 'v1',
      secureToken: QuotationDocumentService.generateSecureToken(),
      status: 'DRAFT',
      pricingModel: 'One-time',
      companyName: '',
      contactName: '',
      contactPosition: 'IT Manager / Director',
      contactEmail: '',
      contactPhone: '',
      companyAddress: '',
      projectName: '',
      industry: 'Teknologi & Operasional',
      platform: 'Web Desktop + PWA Mobile',
      usersCount: '50-100 Users',
      branchesCount: '1 Site',
      projectType: 'Enterprise Custom',
      packageName: 'Standard',
      currency: 'IDR',
      exchangeRate: 1,
      subtotal: 0,
      discountType: 'Percentage',
      discountValue: 0,
      discountAmount: 0,
      discountReason: '',
      taxName: 'PPN',
      taxRate: 11,
      taxIncluded: false,
      taxAmount: 0,
      taxableAmount: 0,
      grandTotal: 0,
      recurringMonthly: 0,
      recurringAnnual: 0,
      items: [
        {
          id: 'ITEM-1',
          quotationId: `QTN-${Date.now()}`,
          category: 'Module',
          name: 'Executive Dashboard & Core Management',
          description: 'Dasbor interaktif dengan analisis KPI, visualisasi data, dan manajemen pengguna.',
          pricingType: 'Per Module',
          quantity: 1,
          unit: 'Module',
          unitPrice: 45000000,
          discountType: 'Percentage',
          discountValue: 0,
          discountAmount: 0,
          taxRate: 11,
          taxAmount: 4950000,
          subtotal: 45000000,
          total: 45000000,
          recurringFrequency: 'One-time',
          sortOrder: 1
        }
      ],
      paymentTermsType: 'Milestone',
      paymentMilestones: [
        { id: 'M1', milestoneName: 'Project Initiation & Contract Signing', percentage: 30, amount: 0, dueCondition: 'Upon Contract Signing' },
        { id: 'M2', milestoneName: 'Development Completion & Beta Test', percentage: 40, amount: 0, dueCondition: 'After Beta Milestone' },
        { id: 'M3', milestoneName: 'UAT Approval & Deployment', percentage: 20, amount: 0, dueCondition: 'Before Production Go-Live' },
        { id: 'M4', milestoneName: 'Handover & Final Acceptance', percentage: 10, amount: 0, dueCondition: '30 Days Post Launch' }
      ],
      validityDays: 30,
      quotationDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      commercialNotes: 'Harga penawaran dapat berubah jika terjadi penambahan spesifikasi di luar dokumen ini.',
      technicalNotes: 'Pengembangan berbasis arsitektur microservices cloud-native.',
      customerNotes: 'Garansi pemeliharaan berlaku 6 bulan sejak go-live.',
      assumptions: [
        'Cakupan modul mengacu pada dokumen rincian spesifikasi teknis.',
        'Akses staging server & data sampel disediakan oleh tim Klien.'
      ],
      exclusions: [
        'Pengadaan perangkat keras / hardware fisik.',
        'Biaya penggunaan API pihak ketiga yang ditagihkan langsung.'
      ],
      termsAndConditions: {
        paymentTerms: 'Pembayaran dilakukan sesuai skema milestone.',
        scope: 'Penawaran mengikat sesuai modul terdaftar.',
        changeRequest: 'Penambahan fitur diproses melalui Change Request.',
        timeline: 'Pengembangan dimulai setelah menerima DP Milestone 1.',
        customerResponsibilities: 'Klien menyediakan PIC pengetesan UAT.',
        thirdPartyCosts: 'Biaya API pihak ketiga ditanggung Klien.',
        warranty: 'Garansi sistem selama 6 bulan.',
        maintenance: 'SLA perbaikan sesuai kesepakatan.',
        cancellation: 'Pembatalan dikenakan penalty 15%.',
        confidentiality: 'Terikat kerahasiaan NDA.',
        intellectualProperty: 'Hak cipta milik Klien setelah pelunasan.',
        acceptance: 'Persetujuan dokumen ini bersifat resmi.'
      },
      createdBy: 'Sales Representative',
      approvalHistory: [],
      auditLogs: [],
      versionHistory: [
        {
          version: 'v1',
          status: 'DRAFT',
          author: 'Sales Representative',
          date: new Date().toISOString(),
          summaryOfChanges: 'Draf Penawaran Awal'
        }
      ],
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });

  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [catalogItems, setCatalogItems] = useState(PriceCatalogService.getActiveCatalogItems());

  useEffect(() => {
    if (quotationId) {
      const existing = QuotationDocumentService.getQuotationById(quotationId);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [quotationId]);

  // Lock status check
  const isLocked = formData.status === 'APPROVED';

  // Live Recalculations
  useEffect(() => {
    recalculateTotals();
  }, [
    formData.items,
    formData.discountType,
    formData.discountValue,
    formData.taxRate,
    formData.taxIncluded,
    formData.currency
  ]);

  const recalculateTotals = () => {
    const subtotal = QuotationPricingService.calculateSubtotal(formData.items);
    const discountAmount = QuotationPricingService.calculateDiscount(
      subtotal,
      formData.discountType,
      formData.discountValue
    );
    const { taxAmount, taxableAmount } = QuotationPricingService.calculateTax(
      subtotal,
      discountAmount,
      formData.taxRate,
      formData.taxIncluded
    );
    const grandTotal = QuotationPricingService.calculateGrandTotal(taxableAmount, taxAmount, formData.taxIncluded);
    const recurring = QuotationPricingService.calculateRecurringCost(formData.items);
    const milestones = QuotationPricingService.calculatePaymentMilestones(grandTotal, formData.paymentMilestones);

    const updatedAIReview = QuotationAIReviewService.reviewQuotation({
      ...formData,
      subtotal,
      discountAmount,
      taxableAmount,
      taxAmount,
      grandTotal,
      recurringMonthly: recurring.monthly,
      recurringAnnual: recurring.annual,
      paymentMilestones: milestones
    });

    setFormData((prev) => ({
      ...prev,
      subtotal,
      discountAmount,
      taxableAmount,
      taxAmount,
      grandTotal,
      recurringMonthly: recurring.monthly,
      recurringAnnual: recurring.annual,
      paymentMilestones: milestones,
      aiReview: updatedAIReview
    }));
  };

  // Item Table Operations
  const handleAddItem = (category: QuotationItemCategory = 'Module') => {
    const newItem: QuotationItem = {
      id: `ITEM-${Date.now()}`,
      quotationId: formData.id,
      category,
      name: 'New Custom Module / Service',
      description: 'Deskripsi modul penawaran.',
      pricingType: 'Fixed Price',
      quantity: 1,
      unit: 'Module',
      unitPrice: 20000000,
      discountType: 'Percentage',
      discountValue: 0,
      discountAmount: 0,
      taxRate: formData.taxRate,
      taxAmount: 0,
      subtotal: 20000000,
      total: 20000000,
      recurringFrequency: 'One-time',
      sortOrder: formData.items.length + 1
    };

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const handleAddItemFromCatalog = (catalogId: string) => {
    const catItem = catalogItems.find((c) => c.id === catalogId);
    if (!catItem) return;

    const newItem: QuotationItem = {
      id: `ITEM-${Date.now()}`,
      quotationId: formData.id,
      category: catItem.category,
      name: catItem.name,
      description: catItem.description,
      pricingType: catItem.pricingModel,
      quantity: 1,
      unit: catItem.category === 'Maintenance' ? 'Month' : 'Item',
      unitPrice: catItem.defaultPrice,
      discountType: 'Percentage',
      discountValue: 0,
      discountAmount: 0,
      taxRate: formData.taxRate,
      taxAmount: 0,
      subtotal: catItem.defaultPrice,
      total: catItem.defaultPrice,
      recurringFrequency: catItem.category === 'Maintenance' ? 'Monthly' : 'One-time',
      sortOrder: formData.items.length + 1
    };

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const handleItemChange = (index: number, field: keyof QuotationItem, value: any) => {
    const updatedItems = [...formData.items];
    const item = { ...updatedItems[index], [field]: value };

    item.subtotal = item.quantity * item.unitPrice;
    item.total = item.subtotal;

    updatedItems[index] = item;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.items.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  // Industry & Package Handlers
  const currentIndustryConfig = IndustryPricingService.getIndustryById(formData.industry);

  const handleIndustryChange = (newIndustryIdOrName: string) => {
    const indConfig = IndustryPricingService.getIndustryById(newIndustryIdOrName);
    setFormData((prev) => ({
      ...prev,
      industry: indConfig.name
    }));
  };

  const handleSelectPackage = (pkg: Partial<QuotationPackage>, selectedIndustryName?: string) => {
    if (!pkg) return;
    const targetIndName = selectedIndustryName || formData.industry;
    const indConfig = IndustryPricingService.getIndustryById(targetIndName);
    const selectedModel = pkg.pricingModel || formData.pricingModel || 'One-time';
    const moduleCount = pkg.modules?.length || 1;

    let items: QuotationItem[] = [];

    if (selectedModel === 'Monthly') {
      const monthlyTotal = pkg.monthlyPrice || indConfig.monthlyPackagePrices[pkg.name as keyof typeof indConfig.monthlyPackagePrices] || Math.round(indConfig.packagePrices.Standard * 0.055);
      const pricePerModule = Math.round(monthlyTotal / moduleCount);

      items = (pkg.modules || []).map((modName, idx) => ({
        id: `ITEM-PKG-${Date.now()}-${idx + 1}`,
        quotationId: formData.id,
        category: 'Module',
        name: modName,
        description: `Layanan SaaS bulanan modul ${modName} (${indConfig.name})`,
        pricingType: 'Subscription',
        quantity: 1,
        unit: 'Bulan',
        unitPrice: pricePerModule,
        discountType: 'Percentage',
        discountValue: 0,
        discountAmount: 0,
        taxRate: formData.taxRate,
        taxAmount: 0,
        subtotal: pricePerModule,
        total: pricePerModule,
        recurringFrequency: 'Monthly',
        sortOrder: idx + 1
      }));
    } else if (selectedModel === 'Hybrid') {
      const oneTimeTotal = pkg.basePrice || indConfig.packagePrices[pkg.name as keyof typeof indConfig.packagePrices] || indConfig.packagePrices.Standard;
      const monthlyRetainer = pkg.monthlyPrice || indConfig.monthlyPackagePrices[pkg.name as keyof typeof indConfig.monthlyPackagePrices] || Math.round(oneTimeTotal * 0.055);
      const pricePerModule = Math.round(oneTimeTotal / moduleCount);

      items = (pkg.modules || []).map((modName, idx) => ({
        id: `ITEM-PKG-${Date.now()}-${idx + 1}`,
        quotationId: formData.id,
        category: 'Module',
        name: modName,
        description: `Implementasi setup awal modul ${modName} (${indConfig.name})`,
        pricingType: 'Per Module',
        quantity: 1,
        unit: 'Module',
        unitPrice: pricePerModule,
        discountType: 'Percentage',
        discountValue: 0,
        discountAmount: 0,
        taxRate: formData.taxRate,
        taxAmount: 0,
        subtotal: pricePerModule,
        total: pricePerModule,
        recurringFrequency: 'One-time',
        sortOrder: idx + 1
      }));

      // Add Managed Support / SLA retainer
      items.push({
        id: `ITEM-PKG-${Date.now()}-${moduleCount + 1}`,
        quotationId: formData.id,
        category: 'Maintenance',
        name: `Managed SLA & Maintenance Berkelanjutan (${pkg.name})`,
        description: `Layanan pemeliharaan sistem, cloud support, dan SLA responsif untuk sektor ${indConfig.name}.`,
        pricingType: 'Subscription',
        quantity: 1,
        unit: 'Bulan',
        unitPrice: monthlyRetainer,
        discountType: 'Percentage',
        discountValue: 0,
        discountAmount: 0,
        taxRate: formData.taxRate,
        taxAmount: 0,
        subtotal: monthlyRetainer,
        total: monthlyRetainer,
        recurringFrequency: 'Monthly',
        sortOrder: moduleCount + 1
      });
    } else {
      // One-time
      const oneTimeTotal = pkg.basePrice || indConfig.packagePrices[pkg.name as keyof typeof indConfig.packagePrices] || indConfig.packagePrices.Standard;
      const pricePerModule = Math.round(oneTimeTotal / moduleCount);

      items = (pkg.modules || []).map((modName, idx) => ({
        id: `ITEM-PKG-${Date.now()}-${idx + 1}`,
        quotationId: formData.id,
        category: 'Module',
        name: modName,
        description: `Modul spesifikasi Paket ${pkg.name} (${indConfig.name})`,
        pricingType: 'Per Module',
        quantity: 1,
        unit: 'Module',
        unitPrice: pricePerModule,
        discountType: 'Percentage',
        discountValue: 0,
        discountAmount: 0,
        taxRate: formData.taxRate,
        taxAmount: 0,
        subtotal: pricePerModule,
        total: pricePerModule,
        recurringFrequency: 'One-time',
        sortOrder: idx + 1
      }));
    }

    setFormData((prev) => ({
      ...prev,
      industry: targetIndName,
      pricingModel: selectedModel,
      packageName: pkg.name || 'Custom',
      items
    }));
  };

  const handleApplyIndustryPackage = (packageName: 'MVP' | 'Standard' | 'Professional' | 'Enterprise') => {
    const packages = IndustryPricingService.getPackagesForIndustry(currentIndustryConfig.id, formData.currency, formData.pricingModel || 'One-time');
    const selectedPkg = packages.find((p) => p.name === packageName) || packages[1];
    handleSelectPackage(selectedPkg, currentIndustryConfig.name);
  };

  const handleBulkSetFrequency = (freq: 'One-time' | 'Monthly') => {
    const updated = formData.items.map((item) => ({
      ...item,
      recurringFrequency: freq,
      unit: freq === 'Monthly' ? 'Bulan' : (item.unit === 'Bulan' ? 'Item' : item.unit)
    }));
    setFormData((prev) => ({
      ...prev,
      pricingModel: freq === 'Monthly' ? 'Monthly' : 'One-time',
      items: updated
    }));
  };

  // Milestone Handler
  const handleMilestoneChange = (index: number, field: keyof PaymentMilestone, value: any) => {
    const updated = [...formData.paymentMilestones];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, paymentMilestones: updated }));
  };

  const handleSaveDraft = () => {
    const saved = QuotationDocumentService.saveQuotation(formData, 'Sales Rep');
    alert(`Quotation ${saved.quotationNumber} berhasil disimpan sebagai Draft.`);
    navigate('/admin/quotations');
  };

  const handleSubmitApproval = () => {
    const val = QuotationPricingService.validatePricing(formData);
    if (!val.isValid) {
      alert(`Gagal mengajukan approval:\n- ${val.errors.join('\n- ')}`);
      return;
    }
    QuotationDocumentService.submitForApproval(formData.id, 'Sales Rep');
    alert(`Quotation ${formData.quotationNumber} berhasil diajukan untuk Approval Manajerial.`);
    navigate('/admin/quotations');
  };

  const handleCreateNewVersion = () => {
    const newVer = QuotationDocumentService.createNewVersion(formData.id, 'Revisi Penawaran Baru', 'Sales Rep');
    if (newVer) {
      alert(`Versi baru ${newVer.version} dibuat secara otomatis!`);
      navigate(`/admin/quotations/${newVer.id}/edit`);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 p-4 sm:p-6 lg:p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/quotations')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">{formData.quotationNumber}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">
                  {formData.version}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-cyan-300 uppercase">
                  {formData.status}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-0.5">
                {isEditMode ? 'Edit Official Quotation' : 'Buat Official Quotation Baru'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLocked ? (
              <button
                onClick={handleCreateNewVersion}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-amber-400"
              >
                <Lock className="w-4 h-4" /> Quotation Approved • Buat Versi Baru
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Draft
                </button>
                <button
                  onClick={handleSubmitApproval}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Ajukan Approval
                </button>
              </>
            )}
          </div>
        </div>

        {/* Price Lock Warning Banner */}
        {isLocked && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs">
            <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <strong>Price Lock Active:</strong> Penawaran ini telah disetujui (APPROVED) dan bersifat immutable untuk menjaga integritas komersial. Untuk melakukan perubahan harga, diskon, atau item, silakan buat <strong>Versi Baru (e.g. v2)</strong>.
            </div>
          </div>
        )}

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Editor Sections (2 Columns Wide on Desktop) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Customer Information */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileCheck className="w-4 h-4 text-cyan-400" /> Informasi Customer & Perusahaan (CRM)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nama Perusahaan / Customer *</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="PT Bank Fintek Indonesia"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nama Kontak Utama (PIC) *</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Ir. Hendra Gunawan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Jabatan Kontak</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.contactPosition}
                    onChange={(e) => setFormData({ ...formData, contactPosition: e.target.value })}
                    placeholder="VP Information Technology"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Email Kontak</label>
                  <input
                    type="email"
                    disabled={isLocked}
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="hendra@company.co.id"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nomor Telepon / WhatsApp</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+62 812-..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Alamat Kantor Perusahaan</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.companyAddress}
                    onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                    placeholder="Jl. HR Rasuna Said, Jakarta"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* 2. Project Information & Package Selection with Industry Pricing Matrix */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Package className="w-4 h-4 text-cyan-400" /> Spesifikasi Proyek & Paket Berbasis Sektor Industri
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tarif, skema bulanan (SaaS), dan modul disesuaikan otomatis dengan tingkat kompleksitas sektor.
                  </p>
                </div>
                <button
                  onClick={() => setIsPackageModalOpen(true)}
                  disabled={isLocked}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:bg-cyan-500 hover:text-slate-950 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
                >
                  <Zap className="w-3.5 h-3.5" /> Bandingkan Matriks Paket Sektor
                </button>
              </div>

              {/* Pricing Model Segmented Control */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Model Finansial:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, pricingModel: 'One-time' }));
                      handleBulkSetFrequency('One-time');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      formData.pricingModel === 'One-time' || !formData.pricingModel
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Gem className="w-3.5 h-3.5" />
                    Proyek Sekali Bayar (CapEx)
                  </button>

                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, pricingModel: 'Monthly' }));
                      handleBulkSetFrequency('Monthly');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      formData.pricingModel === 'Monthly'
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Layanan Bulanan (SaaS / OpEx)
                  </button>

                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, pricingModel: 'Hybrid' }));
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      formData.pricingModel === 'Hybrid'
                        ? 'bg-purple-500 text-white shadow-md font-extrabold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Hybrid (Setup + Retainer)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nama Proyek Penawaran *</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="Platform AI Smart Mining & Telemetry"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-60 font-medium"
                  />
                </div>

                {/* Industry / Sector Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-medium flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Industri / Sektor Klien *
                    </label>
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      Rate Multiplier: {currentIndustryConfig.priceMultiplier}x
                    </span>
                  </div>
                  <select
                    disabled={isLocked}
                    value={currentIndustryConfig.id}
                    onChange={(e) => handleIndustryChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:border-cyan-500 focus:outline-none disabled:opacity-60 cursor-pointer"
                  >
                    {INDUSTRY_SECTOR_CONFIGS.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.name} [{ind.complexityLevel} • {ind.priceMultiplier}x]
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Tingkat Paket Penawaran</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.packageName}
                    onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-bold focus:outline-none disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Mata Uang Penawaran (Currency)</label>
                  <select
                    disabled={isLocked}
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-bold focus:outline-none disabled:opacity-60"
                  >
                    {SUPPORTED_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Industry Sector Pricing & Package Preset Cards */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-[11px]">
                      {currentIndustryConfig.category}
                    </span>
                    <span className="text-slate-300 font-medium">
                      Kompleksitas: <strong className="text-white">{currentIndustryConfig.complexityLevel}</strong>
                    </span>
                  </div>
                  {currentIndustryConfig.complianceStandards && currentIndustryConfig.complianceStandards.length > 0 && (
                    <div className="text-[11px] text-slate-400">
                      Standar Kepatuhan: <span className="text-slate-300">{currentIndustryConfig.complianceStandards.join(' • ')}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-800/60 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1">
                      <SlidersHorizontal className="w-3 h-3 text-cyan-400" /> Tarif Paket Sektor {currentIndustryConfig.name.split(' ')[0]} ({formData.pricingModel === 'Monthly' ? 'Layanan Bulanan' : formData.pricingModel === 'Hybrid' ? 'Hybrid' : 'Sekali Bayar'}):
                    </span>
                    <span className="text-[10px] text-slate-500">Klik paket untuk memuat modul & harga otomatis</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(['MVP', 'Standard', 'Professional', 'Enterprise'] as const).map((pName) => {
                      const isSelected = formData.packageName === pName;
                      const oneTimePrice = currentIndustryConfig.packagePrices[pName];
                      const monthlyPrice = currentIndustryConfig.monthlyPackagePrices[pName];

                      return (
                        <button
                          key={pName}
                          type="button"
                          disabled={isLocked}
                          onClick={() => handleApplyIndustryPackage(pName)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? formData.pricingModel === 'Monthly'
                                ? 'bg-emerald-950/50 border-emerald-500 text-white ring-1 ring-emerald-500/40 shadow-md'
                                : 'bg-cyan-950/50 border-cyan-500 text-white ring-1 ring-cyan-500/40 shadow-md'
                              : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-xs">{pName}</span>
                            {isSelected && (
                              <Check className={`w-3.5 h-3.5 ${formData.pricingModel === 'Monthly' ? 'text-emerald-400' : 'text-cyan-400'}`} />
                            )}
                          </div>

                          {formData.pricingModel === 'Monthly' ? (
                            <div className="text-xs font-extrabold text-emerald-400">
                              {CurrencyService.formatCurrency(monthlyPrice, formData.currency)}
                              <span className="text-[10px] font-normal text-slate-400 ml-0.5">/ bln</span>
                            </div>
                          ) : formData.pricingModel === 'Hybrid' ? (
                            <div>
                              <div className="text-xs font-extrabold text-cyan-400">
                                {CurrencyService.formatCurrency(oneTimePrice, formData.currency)}
                              </div>
                              <div className="text-[10px] font-bold text-purple-400">
                                + {CurrencyService.formatCurrency(monthlyPrice, formData.currency)}/bln
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs font-extrabold text-cyan-400">
                              {CurrencyService.formatCurrency(oneTimePrice, formData.currency)}
                            </div>
                          )}

                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {currentIndustryConfig.packageModules[pName]?.length || 0} Modul Standar
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Items & Pricing Line Items Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" /> Rincian Item Penawaran & Pricing Engine
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-slate-400">Atur frekuensi penagihan per baris:</span>
                    <button
                      type="button"
                      onClick={() => handleBulkSetFrequency('Monthly')}
                      className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-semibold cursor-pointer"
                    >
                      🔄 Set Semua Bulanan
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBulkSetFrequency('One-time')}
                      className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 font-semibold cursor-pointer"
                    >
                      💎 Set Semua Sekali Bayar
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    disabled={isLocked}
                    onChange={(e) => {
                      if (e.target.value) handleAddItemFromCatalog(e.target.value);
                    }}
                    value=""
                    className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none disabled:opacity-50"
                  >
                    <option value="" disabled>+ Tambah dari Katalog Harga...</option>
                    {catalogItems.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        [{cat.category}] {cat.name} - Rp {cat.defaultPrice.toLocaleString()}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleAddItem('Module')}
                    disabled={isLocked}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" /> Item Kustom
                  </button>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-800/80 border-b border-slate-800 text-slate-400 text-[10px] uppercase font-semibold">
                      <th className="p-3 w-24">Kategori</th>
                      <th className="p-3">Nama & Deskripsi Item</th>
                      <th className="p-3 w-28 text-center">Penagihan</th>
                      <th className="p-3 w-16 text-center">Qty</th>
                      <th className="p-3 w-28 text-right">Harga Satuan</th>
                      <th className="p-3 w-28 text-right">Subtotal</th>
                      <th className="p-3 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {formData.items.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-800/30">
                        <td className="p-3">
                          <select
                            disabled={isLocked}
                            value={item.category}
                            onChange={(e) => handleItemChange(idx, 'category', e.target.value as QuotationItemCategory)}
                            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-cyan-300 font-semibold focus:outline-none disabled:opacity-60"
                          >
                            <option value="Package">Package</option>
                            <option value="Module">Module</option>
                            <option value="Feature">Feature</option>
                            <option value="Customization">Customization</option>
                            <option value="Development">Development</option>
                            <option value="AI">AI</option>
                            <option value="Integration">Integration</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Cloud">Cloud</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>

                        <td className="p-3 space-y-1">
                          <input
                            type="text"
                            disabled={isLocked}
                            value={item.name}
                            onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white font-bold focus:outline-none disabled:opacity-60"
                            placeholder="Nama Item"
                          />
                          <input
                            type="text"
                            disabled={isLocked}
                            value={item.description}
                            onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                            className="w-full bg-slate-950/60 border border-slate-800/60 rounded px-2 py-0.5 text-[11px] text-slate-400 focus:outline-none disabled:opacity-60"
                            placeholder="Deskripsi spesifikasi item"
                          />
                        </td>

                        <td className="p-3 text-center">
                          <select
                            disabled={isLocked}
                            value={item.recurringFrequency || 'One-time'}
                            onChange={(e) => handleItemChange(idx, 'recurringFrequency', e.target.value)}
                            className={`border rounded px-2 py-1 text-[11px] font-bold focus:outline-none disabled:opacity-60 ${
                              item.recurringFrequency === 'Monthly'
                                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
                                : item.recurringFrequency === 'Quarterly' || item.recurringFrequency === 'Annual'
                                ? 'bg-purple-950/80 border-purple-500/50 text-purple-400'
                                : 'bg-slate-950 border-slate-800 text-slate-300'
                            }`}
                          >
                            <option value="One-time">💎 Sekali (CapEx)</option>
                            <option value="Monthly">🔄 Bulanan (/ Bln)</option>
                            <option value="Quarterly">📅 Triwulan (/ Qtr)</option>
                            <option value="Annual">📆 Tahunan (/ Thn)</option>
                          </select>
                        </td>

                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="1"
                            disabled={isLocked}
                            value={item.quantity}
                            onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                            className="w-14 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-center text-white focus:outline-none disabled:opacity-60"
                          />
                        </td>

                        <td className="p-3 text-right">
                          <input
                            type="number"
                            disabled={isLocked}
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
                            className="w-28 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-cyan-400 text-right focus:outline-none disabled:opacity-60"
                          />
                        </td>

                        <td className="p-3 text-right font-mono font-bold text-emerald-400">
                          {CurrencyService.formatCurrency(item.subtotal, formData.currency)}
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleRemoveItem(idx)}
                            disabled={isLocked}
                            className="p-1 rounded bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors disabled:opacity-30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Commercial Discount & Tax System */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Sistem Diskon Komersial & Pajak (Tax)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Tipe Diskon</label>
                  <select
                    disabled={isLocked}
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as DiscountType })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none disabled:opacity-60"
                  >
                    <option value="Percentage">Persentase (%)</option>
                    <option value="Fixed">Nilai Tetap (Rp)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nilai Diskon</label>
                  <input
                    type="number"
                    disabled={isLocked}
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-mono font-bold focus:outline-none disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Alasan Diskon (Discount Reason) *</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.discountReason}
                    onChange={(e) => setFormData({ ...formData, discountReason: e.target.value })}
                    placeholder="Contoh: Volume Proyek Korporat / Promo Kemitraan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nama Pajak</label>
                  <input
                    type="text"
                    disabled={isLocked}
                    value={formData.taxName}
                    onChange={(e) => setFormData({ ...formData, taxName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Tarif Pajak (%)</label>
                  <input
                    type="number"
                    disabled={isLocked}
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none disabled:opacity-60"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      disabled={isLocked}
                      checked={formData.taxIncluded}
                      onChange={(e) => setFormData({ ...formData, taxIncluded: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                    />
                    <span>Pajak Sudah Termasuk (Tax Included)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 5. Payment Milestones Builder */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" /> Skema Milestone Pembayaran (100% Total)
                </h3>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Total Milestone: {formData.paymentMilestones.reduce((s, m) => s + m.percentage, 0)}%
                </span>
              </div>

              <div className="space-y-3">
                {formData.paymentMilestones.map((m, idx) => (
                  <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                    <div className="md:col-span-5">
                      <label className="text-[10px] text-slate-400 block mb-0.5">Tahap / Milestone</label>
                      <input
                        type="text"
                        disabled={isLocked}
                        value={m.milestoneName}
                        onChange={(e) => handleMilestoneChange(idx, 'milestoneName', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white focus:outline-none disabled:opacity-60"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] text-slate-400 block mb-0.5">Persen (%)</label>
                      <input
                        type="number"
                        disabled={isLocked}
                        value={m.percentage}
                        onChange={(e) => handleMilestoneChange(idx, 'percentage', Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-cyan-400 font-mono font-bold focus:outline-none disabled:opacity-60"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-[10px] text-slate-400 block mb-0.5">Estimasi Nominal</label>
                      <div className="font-mono font-bold text-emerald-400 py-1">
                        {CurrencyService.formatCurrency(m.amount, formData.currency)}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] text-slate-400 block mb-0.5">Syarat Penagihan</label>
                      <input
                        type="text"
                        disabled={isLocked}
                        value={m.dueCondition}
                        onChange={(e) => handleMilestoneChange(idx, 'dueCondition', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none disabled:opacity-60"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Live Commercial Summary & AI Review */}
          <div className="space-y-6">
            
            {/* Live Financial Calculation Card */}
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl sticky top-24">
              <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Commercial Summary</span>
                <span className="text-xs font-mono text-cyan-400 uppercase">{formData.currency}</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold">{CurrencyService.formatCurrency(formData.subtotal, formData.currency)}</span>
                </div>

                {formData.discountAmount > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Diskon ({formData.discountValue}{formData.discountType === 'Percentage' ? '%' : ' IDR'}):</span>
                    <span className="font-mono font-bold">- {CurrencyService.formatCurrency(formData.discountAmount, formData.currency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                  <span>Dasar Pengenaan Pajak:</span>
                  <span className="font-mono">{CurrencyService.formatCurrency(formData.taxableAmount, formData.currency)}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Pajak ({formData.taxName} {formData.taxRate}%):</span>
                  <span className="font-mono font-bold">{CurrencyService.formatCurrency(formData.taxAmount, formData.currency)}</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-cyan-300 pt-3 border-t border-slate-800">
                  <span>Grand Total Investment:</span>
                  <span className="font-mono text-emerald-400 text-lg">
                    {CurrencyService.formatCurrency(formData.grandTotal, formData.currency)}
                  </span>
                </div>
              </div>

              {/* Recurring Revenue Section */}
              {(formData.recurringMonthly > 0 || formData.recurringAnnual > 0) && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                    Layanan Berulang (Recurring Cost):
                  </span>
                  {formData.recurringMonthly > 0 && (
                    <div className="flex justify-between text-cyan-400 font-mono">
                      <span>Monthly Recurring:</span>
                      <span>{CurrencyService.formatCurrency(formData.recurringMonthly, formData.currency)} / bulan</span>
                    </div>
                  )}
                </div>
              )}

              {/* AI Quotation Review Widget */}
              {formData.aiReview && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" /> AI Review Readiness
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      formData.aiReview.status === 'READY FOR REVIEW'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {formData.aiReview.score}/100 • {formData.aiReview.status}
                    </span>
                  </div>

                  {formData.aiReview.issues.length > 0 && (
                    <div className="space-y-1.5 text-[11px]">
                      {formData.aiReview.issues.map((iss, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-amber-300">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span><strong>{iss.category}:</strong> {iss.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Package Comparison Modal */}
      <PackageComparisonModal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        onSelectPackage={handleSelectPackage}
        currentIndustry={formData.industry}
        currency={formData.currency}
        initialPricingModel={formData.pricingModel || 'One-time'}
      />
    </div>
  );
};
