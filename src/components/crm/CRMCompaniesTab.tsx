import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Globe,
  Users,
  MapPin,
  Briefcase,
  DollarSign,
  X,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react';
import { CRMCompany, Opportunity } from '../../types';
import { CRMService } from '../../services/crmService';

interface CRMCompaniesTabProps {
  companies: CRMCompany[];
  opportunities: Opportunity[];
  onRefresh: () => void;
}

export const CRMCompaniesTab: React.FC<CRMCompaniesTabProps> = ({
  companies,
  opportunities,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CRMCompany | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Company form
  const [compName, setCompName] = useState('');
  const [compIndustry, setCompIndustry] = useState('Pertambangan & Energi');
  const [compWebsite, setCompWebsite] = useState('');
  const [compSize, setCompSize] = useState('100-250 karyawan');
  const [compCity, setCompCity] = useState('Jakarta');

  const filtered = companies.filter((c) =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim()) return;

    CRMService.createCompany({
      companyName: compName,
      industry: compIndustry,
      website: compWebsite,
      companySize: compSize,
      city: compCity,
      status: 'Prospect'
    });

    setShowAddModal(false);
    setCompName('');
    setCompWebsite('');
    onRefresh();
  };

  const handleDeleteCompany = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus perusahaan "${name}"? Data akan di-soft delete.`)) {
      CRMService.deleteCompany(id);
      if (selectedCompany?.id === id) setSelectedCompany(null);
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
            placeholder="Cari perusahaan, industri, kota..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all shadow-lg shadow-blue-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Company</span>
        </button>
      </div>

      {/* Main Grid: Companies Table + Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Company Table */}
        <div className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl ${selectedCompany ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase border-b border-slate-800">
                  <th className="p-3.5">Company Name</th>
                  <th className="p-3.5">Industry</th>
                  <th className="p-3.5">Company Size</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Owner</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Belum ada perusahaan terdaftar.
                    </td>
                  </tr>
                ) : (
                  filtered.map((comp) => {
                    const compOpps = opportunities.filter((o) => o.companyId === comp.id || o.companyName === comp.companyName);
                    const totalOppVal = compOpps.reduce((acc, o) => acc + (o.estimatedValueMin + o.estimatedValueMax) / 2, 0);

                    return (
                      <tr
                        key={comp.id}
                        onClick={() => setSelectedCompany(comp)}
                        className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          selectedCompany?.id === comp.id ? 'bg-blue-600/10 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <td className="p-3.5">
                          <div className="font-bold text-white flex items-center space-x-1.5">
                            <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{comp.companyName}</span>
                          </div>
                          {comp.website && (
                            <a
                              href={comp.website}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-blue-400 hover:underline flex items-center space-x-1 mt-0.5"
                            >
                              <span>{comp.website}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </td>
                        <td className="p-3.5 font-medium text-slate-300">{comp.industry}</td>
                        <td className="p-3.5 text-slate-400">{comp.companySize}</td>
                        <td className="p-3.5 text-slate-400">{comp.city || 'Jakarta'}</td>
                        <td className="p-3.5 text-blue-300 font-semibold">{comp.assignedOwner}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCompany(comp.id, comp.companyName);
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Company Detail Panel */}
        {selectedCompany && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-mono">Company ID: #{selectedCompany.id}</span>
                <h3 className="text-base font-bold text-white">{selectedCompany.companyName}</h3>
                <span className="text-xs text-blue-400 font-medium">{selectedCompany.industry}</span>
              </div>
              <button onClick={() => setSelectedCompany(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Deskripsi Perusahaan</div>
                <p className="text-slate-200 leading-relaxed">{selectedCompany.description || 'Penyedia layanan solusi terpadu.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Ukuran Perusahaan</div>
                  <div className="font-bold text-slate-200 mt-0.5">{selectedCompany.companySize}</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Cabang</div>
                  <div className="font-bold text-slate-200 mt-0.5">{selectedCompany.branches || '1 Lokasi Utama'}</div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Alamat Lengkap</div>
                <div className="text-slate-200 font-medium">{selectedCompany.address || 'Gedung Perkantoran Jakarta'}</div>
              </div>

              {/* Related Deals in Company */}
              <div className="pt-2 border-t border-slate-800">
                <div className="font-bold text-slate-300 mb-2">Kesempatan Proyek Terkait:</div>
                {opportunities.filter((o) => o.companyId === selectedCompany.id || o.companyName === selectedCompany.companyName).map((o) => (
                  <div key={o.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 mb-2 space-y-1">
                    <div className="font-bold text-blue-300">{o.name}</div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Stage: {o.stage}</span>
                      <span className="text-emerald-400 font-bold">Rp {((o.estimatedValueMin + o.estimatedValueMax) / 2 / 1e6).toFixed(0)} Jt</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Add Company */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateCompany} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">+ Add New Company</h3>
            <div>
              <label className="text-xs text-slate-400">Nama Perusahaan</label>
              <input
                type="text"
                required
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                placeholder="PT Contoh Indonesia"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Industri</label>
              <select
                value={compIndustry}
                onChange={(e) => setCompIndustry(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Pertambangan & Energi">Pertambangan & Energi</option>
                <option value="Kesehatan & Rumah Sakit">Kesehatan & Rumah Sakit</option>
                <option value="Keuangan & Perbankan">Keuangan & Perbankan</option>
                <option value="Logistik & Supply Chain">Logistik & Supply Chain</option>
                <option value="Pendidikan & EdTech">Pendidikan & EdTech</option>
                <option value="Ritel & E-Commerce">Ritel & E-Commerce</option>
                <option value="Manufaktur">Manufaktur</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Website</label>
              <input
                type="text"
                value={compWebsite}
                onChange={(e) => setCompWebsite(e.target.value)}
                placeholder="https://contoh.co.id"
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Ukuran</label>
                <select
                  value={compSize}
                  onChange={(e) => setCompSize(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="10-50 karyawan">10-50 karyawan</option>
                  <option value="50-100 karyawan">50-100 karyawan</option>
                  <option value="100-250 karyawan">100-250 karyawan</option>
                  <option value="500+ karyawan">500+ karyawan</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400">Kota Utama</label>
                <input
                  type="text"
                  value={compCity}
                  onChange={(e) => setCompCity(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
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
                Simpan Perusahaan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
