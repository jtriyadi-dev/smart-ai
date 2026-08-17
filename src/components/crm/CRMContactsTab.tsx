import React, { useState } from 'react';
import {
  User,
  Plus,
  Search,
  Mail,
  Phone,
  MessageCircle,
  Building2,
  Trash2,
  X,
  UserCheck
} from 'lucide-react';
import { CRMContact, CRMCompany } from '../../types';
import { CRMService } from '../../services/crmService';

interface CRMContactsTabProps {
  contacts: CRMContact[];
  companies: CRMCompany[];
  onRefresh: () => void;
  onWhatsAppClick: (phone: string, name: string, context: string) => void;
}

export const CRMContactsTab: React.FC<CRMContactsTabProps> = ({
  contacts,
  companies,
  onRefresh,
  onWhatsAppClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [contName, setContName] = useState('');
  const [contPos, setContPos] = useState('IT Manager');
  const [contEmail, setContEmail] = useState('');
  const [contPhone, setContPhone] = useState('');
  const [contCompanyId, setContCompanyId] = useState('');
  const [contRole, setContRole] = useState<CRMContact['role']>('Decision Maker');

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contName.trim()) return;

    const matchedComp = companies.find((comp) => comp.id === contCompanyId);

    CRMService.createContact({
      name: contName,
      position: contPos,
      email: contEmail,
      phone: contPhone,
      whatsapp: contPhone,
      companyId: contCompanyId,
      companyName: matchedComp?.companyName || 'Umum',
      role: contRole,
      preferredContactMethod: 'WhatsApp'
    });

    setShowAddModal(false);
    setContName('');
    setContEmail('');
    setContPhone('');
    onRefresh();
  };

  const handleDeleteContact = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kontak "${name}"?`)) {
      CRMService.deleteContact(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kontak, jabatan, email, perusahaan..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all shadow-lg shadow-blue-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Contact</span>
        </button>
      </div>

      {/* Contacts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase border-b border-slate-800">
                <th className="p-3.5">Nama Kontak & Jabatan</th>
                <th className="p-3.5">Perusahaan</th>
                <th className="p-3.5">Role Keputusan</th>
                <th className="p-3.5">Email & Telepon</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Belum ada kontak terdaftar.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{c.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{c.position}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200 flex items-center space-x-1">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{c.companyName || '-'}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {c.role}
                      </span>
                    </td>
                    <td className="p-3.5 space-y-0.5 text-slate-300">
                      <div className="flex items-center space-x-1 text-[11px]">
                        <Mail className="w-3 h-3 text-slate-500" />
                        <span>{c.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-[11px]">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{c.phone}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onWhatsAppClick(c.whatsapp || c.phone, c.name, c.companyName || 'Diskusi Proyek')}
                        className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(c.id, c.name)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Contact */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateContact} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">+ Add New Contact</h3>
            <div>
              <label className="text-xs text-slate-400">Nama Lengkap</label>
              <input
                type="text"
                required
                value={contName}
                onChange={(e) => setContName(e.target.value)}
                placeholder="Budi Setiawan"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Jabatan / Position</label>
              <input
                type="text"
                required
                value={contPos}
                onChange={(e) => setContPos(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Email</label>
                <input
                  type="email"
                  required
                  value={contEmail}
                  onChange={(e) => setContEmail(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Nomor WhatsApp</label>
                <input
                  type="text"
                  required
                  value={contPhone}
                  onChange={(e) => setContPhone(e.target.value)}
                  placeholder="+62812..."
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400">Perusahaan</label>
              <select
                value={contCompanyId}
                onChange={(e) => setContCompanyId(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="">-- Pilih Perusahaan --</option>
                {companies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Role Pengambilan Keputusan</label>
              <select
                value={contRole}
                onChange={(e) => setContRole(e.target.value as any)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Decision Maker">Decision Maker (Direktur/VP)</option>
                <option value="Technical Evaluator">Technical Evaluator (Tim IT)</option>
                <option value="Procurement">Procurement (Tim Pengadaan)</option>
                <option value="Sponsor">Sponsor / Budget Holder</option>
                <option value="User">End User Representative</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
              >
                Simpan Kontak
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
