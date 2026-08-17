import React, { useState, useEffect } from 'react';
import {
  FileText,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Send,
  Download,
  Eye,
  CreditCard,
  Sparkles,
  RefreshCw,
  Building2,
  Calendar,
  FileCheck,
  ChevronRight,
  TrendingUp,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Receipt as ReceiptIcon
} from 'lucide-react';
import { Invoice, InvoiceStatus, Payment } from '../../types';
import { InvoiceService } from '../../services/InvoiceService';
import { PaymentService } from '../../services/PaymentService';
import { ReceiptService } from '../../services/ReceiptService';
import { PaymentStatusService } from '../../services/PaymentStatusService';
import { AIFinancialAssistantService } from '../../services/AIFinancialAssistantService';
import { navigateTo } from '../../lib/router';

export const InvoicesDashboardPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'OVERDUE' | 'PAYMENTS' | 'RECEIPTS' | 'AGING'>('ALL');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'due_soon' | 'most_overdue'>('newest');

  // AI Modal & Reminder Toast
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const invs = InvoiceService.getAllInvoices();
    const pays = PaymentService.getAllPayments();
    setInvoices(invs);
    setPayments(pays);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Financial KPI calculations
  const totalInvoices = invoices.length;
  const draftCount = invoices.filter((i) => i.status === 'DRAFT').length;
  const sentCount = invoices.filter((i) => i.status === 'SENT').length;
  const partialCount = invoices.filter((i) => i.status === 'PARTIALLY_PAID').length;
  const paidCount = invoices.filter((i) => i.status === 'PAID').length;
  const overdueCount = invoices.filter((i) => i.status === 'OVERDUE').length;
  const cancelledCount = invoices.filter((i) => i.status === 'CANCELLED').length;

  // Amount Sums (Normalized approx to IDR for dashboard totals)
  let totalInvoicedIDR = 0;
  let totalPaidIDR = 0;
  let totalOutstandingIDR = 0;
  let totalOverdueIDR = 0;

  invoices.forEach((i) => {
    if (i.status === 'CANCELLED') return;
    const rate = i.currency === 'USD' ? i.exchangeRate || 16200 : 1;
    totalInvoicedIDR += i.grandTotal * rate;
    totalPaidIDR += i.paidAmount * rate;
    totalOutstandingIDR += i.outstandingAmount * rate;
    if (i.status === 'OVERDUE') {
      totalOverdueIDR += i.outstandingAmount * rate;
    }
  });

  // Expected Receivables (Cash Flow View)
  const todayStr = new Date().toISOString().split('T')[0];
  let dueTodayAmount = 0;
  let dueThisWeekAmount = 0;
  let dueThisMonthAmount = 0;

  const todayObj = new Date();
  const next7Days = new Date();
  next7Days.setDate(todayObj.getDate() + 7);
  const next30Days = new Date();
  next30Days.setDate(todayObj.getDate() + 30);

  invoices.forEach((i) => {
    if (i.status === 'CANCELLED' || i.outstandingAmount <= 0) return;
    const dueObj = new Date(i.dueDate);
    const rate = i.currency === 'USD' ? i.exchangeRate || 16200 : 1;
    const val = i.outstandingAmount * rate;

    if (i.dueDate === todayStr) {
      dueTodayAmount += val;
    }
    if (dueObj > todayObj && dueObj <= next7Days) {
      dueThisWeekAmount += val;
    }
    if (dueObj > todayObj && dueObj <= next30Days) {
      dueThisMonthAmount += val;
    }
  });

  const agingReport = PaymentStatusService.getAgingReport(invoices);
  const aiInsights = AIFinancialAssistantService.generateFinancialInsights(invoices, payments);

  // Filter & Search Logic
  const filteredInvoices = invoices.filter((inv) => {
    if (activeTab === 'OVERDUE' && inv.status !== 'OVERDUE') return false;

    if (selectedStatus !== 'ALL' && inv.status !== selectedStatus) return false;
    if (selectedCurrency !== 'ALL' && inv.currency !== selectedCurrency) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchNum = inv.invoiceNumber.toLowerCase().includes(q);
      const matchComp = inv.companyName.toLowerCase().includes(q);
      const matchProj = inv.projectName.toLowerCase().includes(q);
      const matchQuot = inv.quotationNumber?.toLowerCase().includes(q);
      return matchNum || matchComp || matchProj || matchQuot;
    }
    return true;
  });

  // Sort
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'highest') {
      return b.grandTotal - a.grandTotal;
    }
    if (sortBy === 'due_soon') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'most_overdue') {
      return b.overdueDays - a.overdueDays;
    }
    return 0;
  });

  const handleSendReminder = (inv: Invoice) => {
    try {
      InvoiceService.sendInvoiceReminder(inv.id, 'Email', 'Finance Admin');
      loadData();
      showToast(`Pengingat tagihan berhasil dikirim ke ${inv.contactEmail}`);
    } catch (e: any) {
      showToast(e.message || 'Gagal mengirim pengingat.');
    }
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'DRAFT':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-300">DRAFT</span>;
      case 'SENT':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">SENT</span>;
      case 'PARTIALLY_PAID':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">PARTIALLY PAID</span>;
      case 'PAID':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">PAID</span>;
      case 'OVERDUE':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">OVERDUE</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-200 text-slate-500 line-through">CANCELLED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-1">
              <span>ADMIN PORTAL</span>
              <span>/</span>
              <span className="text-slate-900">INVOICE & PAYMENT SYSTEM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileCheck className="w-7 h-7 text-indigo-600" />
              Invoice & Payment Management
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Sistem keuangan terintegrasi dengan CRM, Quotation, Project Milestones & AI Financial Assistant.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAIInsights(true)}
              className="inline-flex items-center space-x-2 px-3.5 py-2.5 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Collection Insights</span>
            </button>

            <button
              onClick={() => navigateTo('/admin/invoices/new')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Invoice Baru</span>
            </button>
          </div>
        </div>

        {/* FINANCIAL SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Invoiced</span>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">
              Rp {totalInvoicedIDR.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-slate-500 mt-1">{totalInvoices} Total Terbitan Invoice</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Paid</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600">
              Rp {totalPaidIDR.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-slate-500 mt-1">{paidCount} Invoice Lunas Terbayar</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Outstanding</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-600">
              Rp {totalOutstandingIDR.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-slate-500 mt-1">{sentCount + partialCount} Belum Lunas</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Overdue</span>
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-rose-600">
              Rp {totalOverdueIDR.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-slate-500 mt-1">{overdueCount} Invoice Melewati Jatuh Tempo</div>
          </div>
        </div>

        {/* CASH FLOW / EXPECTED RECEIVABLES */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Expected Receivables (Arus Kas Masuk)
              </h3>
              <p className="text-xs text-slate-500">Proyeksi penerimaan pembayaran tagihan berdasarkan due date.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs font-medium text-slate-500">Jatuh Tempo Hari Ini</div>
              <div className="text-base font-bold text-slate-900 mt-1">
                Rp {dueTodayAmount.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs font-medium text-slate-500">Jatuh Tempo Minggu Ini (7 Hari)</div>
              <div className="text-base font-bold text-indigo-600 mt-1">
                Rp {dueThisWeekAmount.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs font-medium text-slate-500">Jatuh Tempo Bulan Ini (30 Hari)</div>
              <div className="text-base font-bold text-blue-600 mt-1">
                Rp {dueThisMonthAmount.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
              <div className="text-xs font-medium text-rose-700">Tunggakan Overdue saat ini</div>
              <div className="text-base font-bold text-rose-700 mt-1">
                Rp {totalOverdueIDR.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>

        {/* TABS & FILTERS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="border-b border-slate-200 bg-slate-50/50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Semua Invoice ({totalInvoices})
              </button>

              <button
                onClick={() => setActiveTab('OVERDUE')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'OVERDUE'
                    ? 'bg-rose-600 text-white shadow'
                    : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                }`}
              >
                Overdue ({overdueCount})
              </button>

              <button
                onClick={() => setActiveTab('AGING')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'AGING'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Receivables Aging
              </button>

              <button
                onClick={() => setActiveTab('PAYMENTS')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'PAYMENTS'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Riwayat Payment ({payments.length})
              </button>

              <button
                onClick={() => setActiveTab('RECEIPTS')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'RECEIPTS'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Official Receipts ({ReceiptService.getAllReceipts().length})
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={loadData}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>

          {/* SEARCH BAR & FILTERS (if in ALL or OVERDUE) */}
          {(activeTab === 'ALL' || activeTab === 'OVERDUE') && (
            <div className="p-4 border-b border-slate-200 bg-white grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative md:col-span-2">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari No Invoice, Customer, Proyek, Quotation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">Semua Status Invoice</option>
                  <option value="DRAFT">DRAFT</option>
                  <option value="SENT">SENT</option>
                  <option value="PARTIALLY_PAID">PARTIALLY PAID</option>
                  <option value="PAID">PAID</option>
                  <option value="OVERDUE">OVERDUE</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="newest">Urutkan: Terbaru</option>
                  <option value="highest">Urutkan: Nilai Tertinggi</option>
                  <option value="due_soon">Urutkan: Jatuh Tempo Terdekat</option>
                  <option value="most_overdue">Urutkan: Terlama Overdue</option>
                </select>
              </div>
            </div>
          )}

          {/* CONTENT BASED ON TAB */}

          {/* TAB: AGING REPORT */}
          {activeTab === 'AGING' && (
            <div className="p-6 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Receivables Aging Report (Analisis Umur Piutang)
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Pembagian klaim tagihan belum lunas berdasarkan jumlah hari keterlambatan dari tanggal jatuh tempo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Current (Lancar)</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    Rp {agingReport.current.total.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{agingReport.current.count} Invoice</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-amber-200 bg-amber-50/30">
                  <div className="text-xs font-semibold text-amber-700 uppercase">1 – 30 Hari</div>
                  <div className="text-lg font-bold text-amber-700 mt-1">
                    Rp {agingReport.days1To30.total.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-amber-600 mt-1">{agingReport.days1To30.count} Invoice</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-amber-300 bg-amber-100/40">
                  <div className="text-xs font-semibold text-amber-800 uppercase">31 – 60 Hari</div>
                  <div className="text-lg font-bold text-amber-800 mt-1">
                    Rp {agingReport.days31To60.total.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-amber-700 mt-1">{agingReport.days31To60.count} Invoice</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-rose-200 bg-rose-50/50">
                  <div className="text-xs font-semibold text-rose-700 uppercase">61 – 90 Hari</div>
                  <div className="text-lg font-bold text-rose-700 mt-1">
                    Rp {agingReport.days61To90.total.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-rose-600 mt-1">{agingReport.days61To90.count} Invoice</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-rose-300 bg-rose-100/60">
                  <div className="text-xs font-semibold text-rose-900 uppercase">90+ Hari (Macet)</div>
                  <div className="text-lg font-bold text-rose-900 mt-1">
                    Rp {agingReport.days90Plus.total.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-rose-800 mt-1">{agingReport.days90Plus.count} Invoice</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PAYMENTS */}
          {activeTab === 'PAYMENTS' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">No Transaksi</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">No Invoice</th>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Metode & Bank</th>
                    <th className="py-3 px-4">Jumlah Bayar</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        Belum ada riwayat transaksi pembayaran.
                      </td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">{p.paymentNumber}</td>
                        <td className="py-3 px-4 font-medium text-slate-800">{p.companyName}</td>
                        <td className="py-3 px-4 text-indigo-600 font-medium">{p.invoiceNumber}</td>
                        <td className="py-3 px-4 text-slate-600">{p.paymentDate}</td>
                        <td className="py-3 px-4 text-slate-600">
                          {p.paymentMethod} ({p.bank})
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-600">
                          {p.currency} {p.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4">
                          {p.status === 'VALID' ? (
                            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded">
                              VALID
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-xs font-medium bg-rose-100 text-rose-800 rounded line-through">
                              VOIDED
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: RECEIPTS */}
          {activeTab === 'RECEIPTS' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">No Receipt</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Invoice</th>
                    <th className="py-3 px-4">Tgl Terbit</th>
                    <th className="py-3 px-4">Jumlah Diterima</th>
                    <th className="py-3 px-4">Sisa Saldo</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {ReceiptService.getAllReceipts().length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        Belum ada official receipt terbit.
                      </td>
                    </tr>
                  ) : (
                    ReceiptService.getAllReceipts().map((rcp) => (
                      <tr key={rcp.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-bold text-indigo-600">{rcp.receiptNumber}</td>
                        <td className="py-3 px-4 font-medium text-slate-800">{rcp.companyName}</td>
                        <td className="py-3 px-4 text-slate-600">{rcp.invoiceNumber}</td>
                        <td className="py-3 px-4 text-slate-600">{rcp.issuedAt.split('T')[0]}</td>
                        <td className="py-3 px-4 font-bold text-emerald-600">
                          {rcp.currency} {rcp.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {rcp.currency} {rcp.remainingBalance.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => navigateTo(`/admin/invoices/${rcp.invoiceId}/receipt`)}
                            className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            <ReceiptIcon className="w-3.5 h-3.5" />
                            <span>Cetak Receipt</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: ALL or OVERDUE TABLE */}
          {(activeTab === 'ALL' || activeTab === 'OVERDUE') && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4">Invoice No</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Proyek</th>
                    <th className="py-3.5 px-4">Jatuh Tempo</th>
                    <th className="py-3.5 px-4">Grand Total</th>
                    <th className="py-3.5 px-4">Outstanding</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {sortedInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        Tidak ada data invoice yang sesuai kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    sortedInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-bold text-indigo-600">
                          <button
                            onClick={() => navigateTo(`/admin/invoices/${inv.id}`)}
                            className="hover:underline text-left"
                          >
                            {inv.invoiceNumber}
                          </button>
                          {inv.milestoneName && (
                            <div className="text-[10px] text-slate-500 font-normal">
                              {inv.milestoneName} ({inv.milestonePercentage}%)
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{inv.companyName}</div>
                          <div className="text-[11px] text-slate-500">{inv.contactName}</div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs truncate text-slate-700">
                          {inv.projectName}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-800">{inv.dueDate}</div>
                          {inv.status === 'OVERDUE' && inv.overdueDays > 0 && (
                            <span className="text-[10px] font-bold text-rose-600">
                              Overdue {inv.overdueDays} hari
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {inv.currency} {inv.grandTotal.toLocaleString('id-ID')}
                        </td>

                        <td className="py-3.5 px-4 font-bold text-amber-600">
                          {inv.currency} {inv.outstandingAmount.toLocaleString('id-ID')}
                        </td>

                        <td className="py-3.5 px-4">{getStatusBadge(inv.status)}</td>

                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => navigateTo(`/admin/invoices/${inv.id}`)}
                            className="inline-flex items-center space-x-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition"
                            title="Lihat Detail"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Detail</span>
                          </button>

                          {inv.status !== 'PAID' && inv.status !== 'CANCELLED' && (
                            <button
                              onClick={() => navigateTo(`/admin/invoices/${inv.id}/payments`)}
                              className="inline-flex items-center space-x-1 text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded transition"
                              title="Record Payment"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Bayar</span>
                            </button>
                          )}

                          <button
                            onClick={() => navigateTo(`/admin/invoices/${inv.id}/preview`)}
                            className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded transition"
                            title="Preview PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </button>

                          {inv.status !== 'PAID' && inv.status !== 'CANCELLED' && (
                            <button
                              onClick={() => handleSendReminder(inv)}
                              className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded transition"
                              title="Kirim Pengingat"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* AI COLLECTION INSIGHTS MODAL */}
      {showAIInsights && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI Financial & Collection Assistant</h3>
                  <p className="text-xs text-slate-500">Analisis otomatis arus kas piutang & rekomendasi prioritas penagihan.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIInsights(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-xs">
              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl">
                <div className="font-semibold text-indigo-900 mb-1">Ringkasan Eksekutif Piutang:</div>
                <p className="text-slate-700 leading-relaxed">{aiInsights.summaryText}</p>
              </div>

              {aiInsights.riskAlerts.length > 0 && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="font-semibold text-rose-900 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Peringatan Risiko Piutang (Risk Alerts):</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-rose-800">
                    {aiInsights.riskAlerts.map((alert, idx) => (
                      <li key={idx}>{alert}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  Prioritas Penagihan Terjadwal (Collection Priorities)
                </div>
                <div className="space-y-2">
                  {aiInsights.collectionPriorities.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 bg-slate-50 rounded-lg">
                      Tidak ada invoice overdue yang memerlukan penagihan darurat saat ini.
                    </div>
                  ) : (
                    aiInsights.collectionPriorities.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
                          item.urgencyLevel === 'CRITICAL'
                            ? 'bg-rose-50/70 border-rose-200'
                            : item.urgencyLevel === 'HIGH'
                            ? 'bg-amber-50/70 border-amber-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900">{item.invoiceNumber}</span>
                            <span className="text-slate-600">— {item.companyName}</span>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                                item.urgencyLevel === 'CRITICAL'
                                  ? 'bg-rose-600 text-white'
                                  : item.urgencyLevel === 'HIGH'
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-slate-600 text-white'
                              }`}
                            >
                              {item.urgencyLevel}
                            </span>
                          </div>
                          <div className="text-slate-600 mt-1">
                            Aksi Direkomendasikan: <span className="font-medium">{item.recommendedAction}</span>
                          </div>
                        </div>

                        <div className="text-right sm:min-w-[120px]">
                          <div className="font-bold text-slate-900">
                            {item.currency} {item.outstandingAmount.toLocaleString('id-ID')}
                          </div>
                          <div className="text-rose-600 font-medium text-[10px]">Overdue {item.daysOverdue} hari</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Rekomendasi Strategis Arus Kas:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {aiInsights.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowAIInsights(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
              >
                Tutup Rekomendasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
