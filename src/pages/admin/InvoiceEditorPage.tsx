import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Layers,
  Sparkles,
  CreditCard
} from 'lucide-react';
import {
  Invoice,
  InvoiceItem,
  Quotation,
  PaymentMilestone,
  BankSettings
} from '../../types';
import { InvoiceService, DEFAULT_BANK_SETTINGS } from '../../services/InvoiceService';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';
import { InvoiceNumberService } from '../../services/InvoiceNumberService';
import { navigateTo } from '../../lib/router';

export const InvoiceEditorPage: React.FC = () => {
  const [sourceType, setSourceType] = useState<'QUOTATION' | 'MILESTONE' | 'MANUAL'>('QUOTATION');
  const [approvedQuotations, setApprovedQuotations] = useState<Quotation[]>([]);
  const [allQuotations, setAllQuotations] = useState<Quotation[]>([]);
  const [selectedQuotationId, setSelectedQuotationId] = useState<string>('');
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(0);
  const [manualOverride, setManualOverride] = useState<boolean>(false);

  // Form Fields
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [taxId, setTaxId] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('Technology');
  const [currency, setCurrency] = useState<string>('IDR');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>('');
  const [paymentTerms, setPaymentTerms] = useState<string>('Net 30 Days');
  const [notes, setNotes] = useState<string>('');
  const [paymentInstructions, setPaymentInstructions] = useState<string>(
    DEFAULT_BANK_SETTINGS.paymentInstructions
  );

  // Financial Items
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [taxName, setTaxName] = useState<string>('PPN');
  const [taxRate, setTaxRate] = useState<number>(11);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Generate new Invoice Number
    setInvoiceNumber(InvoiceNumberService.generateInvoiceNumber());

    // Calculate default due date (+30 days)
    const due = new Date();
    due.setDate(due.getDate() + 30);
    setDueDate(due.toISOString().split('T')[0]);

    // Load quotations
    const quots = QuotationDocumentService.getAllQuotations();
    setAllQuotations(quots);
    const approved = quots.filter((q) => q.status === 'APPROVED');
    setApprovedQuotations(approved);

    if (approved.length > 0) {
      setSelectedQuotationId(approved[0].id);
      populateFromQuotation(approved[0]);
    } else if (quots.length > 0) {
      setSelectedQuotationId(quots[0].id);
      populateFromQuotation(quots[0]);
    } else {
      // Default manual item
      addManualItem();
    }
  }, []);

  const populateFromQuotation = (q: Quotation, mIdx?: number) => {
    setCompanyName(q.companyName || 'Not Provided');
    setContactName(q.contactName || 'Not Provided');
    setContactEmail(q.contactEmail || 'Not Provided');
    setContactPhone(q.contactPhone || 'Not Provided');
    setCompanyAddress(q.companyAddress || 'Not Provided');
    setProjectName(q.projectName || 'Not Provided');
    setIndustry(q.industry || 'Technology');
    setCurrency(q.currency || 'IDR');
    setExchangeRate(q.exchangeRate || 1);
    setTaxName(q.taxName || 'PPN');
    setTaxRate(q.taxRate || 11);

    if (sourceType === 'MILESTONE' && q.paymentMilestones && q.paymentMilestones.length > 0) {
      const milestone = q.paymentMilestones[mIdx || 0] || q.paymentMilestones[0];
      const mName = milestone.milestoneName || milestone.name || 'Termin';
      setItems([
        {
          id: `item_${Date.now()}_0`,
          invoiceId: '',
          description: `Pembayaran ${mName} (${milestone.percentage}% dari Total Proyek ${q.projectName})`,
          category: 'Milestone Payment',
          quantity: 1,
          unit: 'Termin',
          unitPrice: milestone.amount,
          discount: 0,
          taxRate: 0,
          subtotal: milestone.amount,
          taxAmount: 0,
          total: milestone.amount,
          sortOrder: 1
        }
      ]);
      setDiscountAmount(0);
    } else {
      // Full quotation items
      const converted: InvoiceItem[] = q.items.map((it, idx) => {
        const sub = it.quantity * it.unitPrice;
        return {
          id: `item_${Date.now()}_${idx}`,
          invoiceId: '',
          description: `${it.name} - ${it.description}`,
          category: it.category,
          quantity: it.quantity,
          unit: 'Unit',
          unitPrice: it.unitPrice,
          discount: it.discountAmount,
          taxRate: q.taxRate,
          subtotal: sub,
          taxAmount: (sub * (q.taxRate || 0)) / 100,
          total: sub * (1 + (q.taxRate || 0) / 100),
          sortOrder: idx + 1
        };
      });
      setItems(converted);
      setDiscountAmount(q.discountAmount || 0);
    }

    setNotes(`Invoice diterbitkan dari Quotation ${q.quotationNumber}.`);
  };

  const handleQuotationChange = (qId: string) => {
    setSelectedQuotationId(qId);
    const q = allQuotations.find((item) => item.id === qId);
    if (q) {
      populateFromQuotation(q, selectedMilestoneIdx);
    }
  };

  const addManualItem = () => {
    const newItem: InvoiceItem = {
      id: `item_${Date.now()}_${items.length}`,
      invoiceId: '',
      description: 'Layanan Pengembanan Aplikasi AI',
      category: 'Development',
      quantity: 1,
      unit: 'Paket',
      unitPrice: 50000000,
      discount: 0,
      taxRate: 11,
      subtotal: 50000000,
      taxAmount: 5500000,
      total: 55500000,
      sortOrder: items.length + 1
    };
    setItems([...items, newItem]);
  };

  const handleItemChange = (idx: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    const item = { ...updated[idx], [field]: value };

    if (field === 'quantity' || field === 'unitPrice') {
      const q = Number(item.quantity) || 0;
      const p = Number(item.unitPrice) || 0;
      item.subtotal = q * p;
      item.taxAmount = (item.subtotal * (item.taxRate || 0)) / 100;
      item.total = item.subtotal + item.taxAmount;
    }

    updated[idx] = item;
    setItems(updated);
  };

  const removeItem = (idx: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * taxRate) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const handleSaveInvoice = (asDraft: boolean = false) => {
    setErrorMessage(null);

    if (!companyName.trim()) {
      setErrorMessage('Company Name wajib diisi.');
      return;
    }
    if (!projectName.trim()) {
      setErrorMessage('Project Name wajib diisi.');
      return;
    }
    if (items.length === 0) {
      setErrorMessage('Invoice harus memiliki minimal 1 item.');
      return;
    }

    // Check quotation approval if source is quotation/milestone
    const selectedQuotation = allQuotations.find((q) => q.id === selectedQuotationId);
    if (
      (sourceType === 'QUOTATION' || sourceType === 'MILESTONE') &&
      selectedQuotation &&
      selectedQuotation.status !== 'APPROVED' &&
      !manualOverride
    ) {
      setErrorMessage(
        'Quotation yang dipilih belum berstatus APPROVED. Mohon dapatkan persetujuan quotation terlebih dahulu atau gunakan fitur Admin Override.'
      );
      return;
    }

    try {
      const secureToken = `sec_inv_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      const selectedM =
        sourceType === 'MILESTONE' && selectedQuotation?.paymentMilestones?.[selectedMilestoneIdx]
          ? selectedQuotation.paymentMilestones[selectedMilestoneIdx]
          : undefined;

      const newInvoice: Invoice = {
        id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        invoiceNumber,
        status: asDraft ? 'DRAFT' : 'SENT',
        paymentStatus: 'UNPAID',
        secureToken,
        quotationId: selectedQuotation?.id,
        quotationNumber: selectedQuotation?.quotationNumber,
        proposalId: selectedQuotation?.proposalId,
        proposalNumber: selectedQuotation?.proposalNumber,
        projectId: selectedQuotation?.projectId,
        projectName,
        companyName,
        contactName,
        contactEmail,
        contactPhone,
        companyAddress,
        taxId,
        industry,
        currency,
        exchangeRate,
        invoiceDate,
        dueDate,
        paymentTerms,
        milestoneName: selectedM?.name,
        milestonePercentage: selectedM?.percentage,
        items,
        subtotal,
        discountAmount,
        taxName,
        taxRate,
        taxAmount,
        taxableAmount,
        grandTotal,
        paidAmount: 0,
        outstandingAmount: grandTotal,
        overdueDays: 0,
        bankDetails: DEFAULT_BANK_SETTINGS,
        notes,
        paymentInstructions,
        version: 'v1',
        createdBy: 'Finance User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        auditLogs: [
          {
            id: `audit_${Date.now()}`,
            invoiceId: '',
            action: asDraft ? 'INVOICE_DRAFT_CREATED' : 'INVOICE_SENT',
            performedBy: 'Finance User',
            details: `Invoice ${invoiceNumber} dibuat (${asDraft ? 'DRAFT' : 'SENT'})`,
            timestamp: new Date().toISOString()
          }
        ],
        reminderLogs: []
      };

      InvoiceService.saveInvoice(newInvoice, 'Finance User');
      navigateTo(`/admin/invoices/${newInvoice.id}`);
    } catch (e: any) {
      setErrorMessage(e.message || 'Gagal menyimpan invoice.');
    }
  };

  const selectedQ = allQuotations.find((q) => q.id === selectedQuotationId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('/admin/invoices')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard Invoice</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSaveInvoice(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 shadow-sm"
            >
              <Save className="w-4 h-4 text-slate-500" />
              <span>Simpan Draft</span>
            </button>

            <button
              onClick={() => handleSaveInvoice(false)}
              className="inline-flex items-center space-x-2 px-5 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Terbitkan Invoice (Generate)</span>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* MAIN EDITOR FORM CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          {/* Section 1: Source & Quotation Selection */}
          <div className="pb-6 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              1. Sumber Draf Invoice (Invoice Generation Source)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <button
                type="button"
                onClick={() => {
                  setSourceType('QUOTATION');
                  if (selectedQ) populateFromQuotation(selectedQ);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  sourceType === 'QUOTATION'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs text-slate-900">Dari Quotation Resmi</div>
                <div className="text-[11px] text-slate-500 mt-1">Otomatis tarik item & total dari Quotation.</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSourceType('MILESTONE');
                  if (selectedQ) populateFromQuotation(selectedQ, selectedMilestoneIdx);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  sourceType === 'MILESTONE'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs text-slate-900">Dari Payment Milestone (Termin)</div>
                <div className="text-[11px] text-slate-500 mt-1">Tagihan per termin (30% DP, 40% Dev, dsb).</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSourceType('MANUAL');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  sourceType === 'MANUAL'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs text-slate-900">Manual Invoice</div>
                <div className="text-[11px] text-slate-500 mt-1">Input manual untuk kebutuhan khusus / Finance.</div>
              </button>
            </div>

            {/* Quotation Selector dropdown if QUOTATION or MILESTONE */}
            {(sourceType === 'QUOTATION' || sourceType === 'MILESTONE') && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-semibold text-slate-700">Pilih Quotation Rujukan:</label>
                <select
                  value={selectedQuotationId}
                  onChange={(e) => handleQuotationChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {allQuotations.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.quotationNumber} — {q.companyName} ({q.projectName}) — Status: [{q.status}]
                    </option>
                  ))}
                </select>

                {selectedQ && selectedQ.status !== 'APPROVED' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center justify-between">
                    <span>
                      ⚠️ <strong>Peringatan:</strong> Quotation {selectedQ.quotationNumber} belum disetujui (Status: {selectedQ.status}).
                    </span>
                    <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] font-bold text-amber-900">
                      <input
                        type="checkbox"
                        checked={manualOverride}
                        onChange={(e) => setManualOverride(e.target.checked)}
                        className="rounded border-amber-400 text-indigo-600"
                      />
                      <span>Authorized Admin Override</span>
                    </label>
                  </div>
                )}

                {/* Milestone picker if MILESTONE */}
                {sourceType === 'MILESTONE' && selectedQ?.paymentMilestones && (
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Termin / Payment Milestone:</label>
                    <select
                      value={selectedMilestoneIdx}
                      onChange={(e) => {
                        const idx = Number(e.target.value);
                        setSelectedMilestoneIdx(idx);
                        if (selectedQ) populateFromQuotation(selectedQ, idx);
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {selectedQ.paymentMilestones.map((m, idx) => (
                        <option key={idx} value={idx}>
                          Termin {idx + 1}: {m.name} ({m.percentage}%) — {selectedQ.currency} {m.amount.toLocaleString('id-ID')}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Header & Billing Information */}
          <div className="pb-6 border-b border-slate-200 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              2. Informasi Header & Client (Bill To)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nomor Invoice:</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal Invoice:</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Jatuh Tempo (Due Date):</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-bold text-rose-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nama Perusahaan (Bill To):</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. PT Nusantara Teknologi"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nama Contact Person:</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Budi Santoso"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email Penagihan:</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. finance@nusantara.co.id"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nomor Telepon / WhatsApp:</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+62812..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Alamat Lengkap Client:</label>
                <input
                  type="text"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="Alamat kantor..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nama Proyek:</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Smart Banking AI"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Mata Uang (Currency):</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-bold"
                >
                  <option value="IDR">IDR (Rupiah)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="SGD">SGD (Singapore Dollar)</option>
                  <option value="MYR">MYR (Malaysian Ringgit)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Line Items Table */}
          <div className="pb-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                3. Detail Rincian Tagihan (Invoice Items)
              </h2>

              <button
                type="button"
                onClick={addManualItem}
                className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs font-semibold uppercase">
                    <th className="py-2.5 px-3">Deskripsi Layanan</th>
                    <th className="py-2.5 px-3 w-20">Qty</th>
                    <th className="py-2.5 px-3 w-24">Satuan</th>
                    <th className="py-2.5 px-3 w-36">Harga Satuan</th>
                    <th className="py-2.5 px-3 w-36">Subtotal</th>
                    <th className="py-2.5 px-3 w-12">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {items.map((it, idx) => (
                    <tr key={it.id}>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={it.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>

                      <td className="py-2 px-3">
                        <input
                          type="number"
                          min="1"
                          value={it.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-center"
                        />
                      </td>

                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={it.unit}
                          onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>

                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={it.unitPrice}
                          onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-right font-medium"
                        />
                      </td>

                      <td className="py-2 px-3 font-bold text-slate-900 text-right">
                        {currency} {(it.quantity * it.unitPrice).toLocaleString('id-ID')}
                      </td>

                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Hapus Line"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FINANCIAL TOTALS SUMMARY */}
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end">
              <div className="w-full sm:w-80 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{currency} {subtotal.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Diskon Komersial:</span>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(Number(e.target.value))}
                    className="w-28 px-2 py-0.5 bg-white border border-slate-300 rounded text-right text-xs"
                  />
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Pajak ({taxName} {taxRate}%):</span>
                  <span className="font-semibold">{currency} {taxAmount.toLocaleString('id-ID')}</span>
                </div>

                <div className="pt-2 border-t border-slate-300 flex justify-between text-sm font-bold text-indigo-900">
                  <span>Grand Total Tagihan:</span>
                  <span>{currency} {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Bank Details & Instructions */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              4. Rekening Pembayaran & Catatan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Instruksi Pembayaran:</label>
                <textarea
                  rows={3}
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Catatan Tambahan (Notes):</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
