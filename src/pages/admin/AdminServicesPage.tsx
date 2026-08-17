import React, { useState } from 'react';
import { Cpu, Plus, Edit, Trash2, CheckCircle2, Archive, Search, Sparkles, X } from 'lucide-react';
import { PriceCatalogService } from '../../services/PriceCatalogService';
import { PriceCatalogItem, PricingType } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const [catalog, setCatalog] = useState<PriceCatalogItem[]>(PriceCatalogService.getAllCatalogItems());
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PriceCatalogItem | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Module' as PriceCatalogItem['category'],
    description: '',
    defaultPrice: 50000000,
    pricingModel: 'Per Module' as PricingType,
    active: true
  });

  const filteredItems = catalog.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: `CAT-SRV-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      category: 'Module',
      description: '',
      defaultPrice: 50000000,
      pricingModel: 'Per Module',
      active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: PriceCatalogItem) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      defaultPrice: item.defaultPrice,
      pricingModel: item.pricingModel,
      active: item.active !== false
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    if (editingItem) {
      const updatedItem: PriceCatalogItem = {
        ...editingItem,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        defaultPrice: Number(formData.defaultPrice) || 0,
        pricingModel: formData.pricingModel as PricingType,
        active: formData.active,
        updatedBy: 'Admin',
        updatedAt: now
      };
      PriceCatalogService.saveCatalogItem(updatedItem);
      setCatalog(PriceCatalogService.getAllCatalogItems());
    } else {
      const newItem: PriceCatalogItem = {
        id: formData.id || `CAT-SRV-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        defaultPrice: Number(formData.defaultPrice) || 0,
        pricingModel: formData.pricingModel as PricingType,
        currency: 'IDR',
        active: formData.active,
        updatedBy: 'Admin',
        updatedAt: now,
        priceHistory: []
      };
      PriceCatalogService.saveCatalogItem(newItem);
      setCatalog(PriceCatalogService.getAllCatalogItems());
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      const updated = catalog.filter((c) => c.id !== id);
      setCatalog(updated);
      try {
        localStorage.setItem('smart_ai_price_catalog_v1', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari Layanan Master SMART-AI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-end sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Service Baru</span>
        </button>
      </div>

      {/* Services List Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-display">MASTER SERVICE CATALOG ({catalog.length})</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 font-mono text-[10px] text-cyan-400 uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Kode Service</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Nama Layanan</th>
                <th className="p-3">Deskripsi Singkat</th>
                <th className="p-3">Estimasi Biaya Base</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50">
                  <td className="p-3 font-mono font-bold text-cyan-400">{item.id}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-white">{item.name}</td>
                  <td className="p-3 text-slate-400 max-w-xs truncate">{item.description}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">
                    Rp {item.defaultPrice?.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      item.active !== false
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.active !== false ? 'PUBLISHED' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 cursor-pointer"
                      title="Hapus Service"
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

      {/* CREATE/EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                {editingItem ? 'Edit Service Catalog' : 'Tambah Service Catalog Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded bg-slate-800 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kode Service</label>
                  <input
                    type="text"
                    required
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Service</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Module">Module</option>
                    <option value="AI">AI Integration</option>
                    <option value="Platform">Platform</option>
                    <option value="Integration">Integration</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Harga Base (IDR)</label>
                  <input
                    type="number"
                    value={formData.defaultPrice}
                    onChange={(e) => setFormData({ ...formData, defaultPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer"
                >
                  Simpan Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
