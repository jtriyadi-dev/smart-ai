import React, { useState } from 'react';
import { Building2, Plus, Search, Mail, Phone, Briefcase, FileText, DollarSign, LifeBuoy, ChevronRight, X } from 'lucide-react';
import { AdminControlService } from '../../services/AdminControlService';
import { Customer } from '../../types';
import { useRouter } from '../../lib/router';

export const AdminCustomersPage: React.FC = () => {
  const { navigate } = useRouter();
  const [customers, setCustomers] = useState<Customer[]>(AdminControlService.getCustomers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'Pertambangan',
    status: 'ACTIVE_CLIENT' as Customer['status']
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: 'Pertambangan',
      status: 'ACTIVE_CLIENT'
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    AdminControlService.saveCustomer(formData);
    setCustomers(AdminControlService.getCustomers());
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari Perusahaan Customer atau Kontak..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-end sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Customer Baru</span>
        </button>
      </div>

      {/* Main Customers List */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-display">DAFTAR CLIENT & ENTERPRISE ACCOUNTS</h3>
            </div>
            <span className="text-xs font-mono text-purple-400 font-bold">{customers.length} Accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 font-mono text-[10px] text-cyan-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Perusahaan</th>
                  <th className="p-3">PIC Kontak</th>
                  <th className="p-3">Industri</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomer(cust)}
                    className={`hover:bg-slate-900/80 cursor-pointer transition-colors ${
                      selectedCustomer?.id === cust.id ? 'bg-purple-950/40 font-bold border-l-2 border-purple-500' : ''
                    }`}
                  >
                    <td className="p-3 font-bold text-white">{cust.companyName}</td>
                    <td className="p-3">{cust.contactPerson}</td>
                    <td className="p-3 font-mono text-slate-400">{cust.industry}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {cust.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-500 inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Customer Detail Sidebar */}
        <div>
          {selectedCustomer ? (
            <div className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-5 bg-slate-900/90">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{selectedCustomer.id}</span>
                  <h3 className="text-base font-bold text-white font-display">{selectedCustomer.companyName}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {selectedCustomer.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PIC: <strong>{selectedCustomer.contactPerson}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedCustomer.phone}</span>
                </div>
              </div>

              {/* Quick Module Navigation for Customer */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase">AKSI & MODUL TERHUBUNG</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold font-mono">
                  <button
                    onClick={() => navigate('/admin/projects')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-cyan-300 flex items-center justify-between"
                  >
                    <span>Projects</span>
                    <Briefcase className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('/admin/proposals')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-amber-300 flex items-center justify-between"
                  >
                    <span>Proposals</span>
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('/admin/invoices')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-emerald-300 flex items-center justify-between"
                  >
                    <span>Invoices</span>
                    <DollarSign className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('/admin/support')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-rose-300 flex items-center justify-between"
                  >
                    <span>Tickets</span>
                    <LifeBuoy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-8 border border-white/10 text-center text-slate-500 font-mono text-xs">
              Pilih salah satu customer pada tabel untuk melihat detail ringkasan account.
            </div>
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">Tambah Customer Enterprise Baru</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Perusahaan</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">PIC Kontak Person</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Telepon / WA</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Sektor Industri</label>
                <input
                  type="text"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                >
                  Simpan Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
