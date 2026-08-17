import React, { useState, useEffect } from 'react';
import { X, DollarSign, Plus, Edit2, History, Check, Save, ShieldAlert } from 'lucide-react';
import { PriceCatalogItem, QuotationItemCategory, PricingType } from '../../types';
import { PriceCatalogService } from '../../services/PriceCatalogService';
import { CurrencyService } from '../../services/CurrencyService';

interface PriceCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceCatalogModal: React.FC<PriceCatalogModalProps> = ({ isOpen, onClose }) => {
  const [catalog, setCatalog] = useState<PriceCatalogItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [editingItem, setEditingItem] = useState<PriceCatalogItem | null>(null);
  const [historyItem, setHistoryItem] = useState<PriceCatalogItem | null>(null);

  const [formPrice, setFormPrice] = useState<number>(0);
  const [formReason, setFormReason] = useState<string>('Penyesuaian Tarif Katalog Resmi');

  useEffect(() => {
    if (isOpen) {
      loadCatalog();
    }
  }, [isOpen]);

  const loadCatalog = () => {
    setCatalog(PriceCatalogService.getAllCatalogItems());
  };

  if (!isOpen) return null;

  const categories = ['ALL', 'Module', 'AI', 'Integration', 'Mobile', 'Cloud', 'Maintenance'];

  const filteredCatalog = catalog.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  const handleEditClick = (item: PriceCatalogItem) => {
    setEditingItem(item);
    setFormPrice(item.defaultPrice);
    setFormReason('Penyesuaian Tarif Katalog Resmi');
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    const updated = {
      ...editingItem,
      defaultPrice: formPrice
    };
    PriceCatalogService.saveCatalogItem(updated, 'Admin Manager', formReason);
    setEditingItem(null);
    loadCatalog();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl p-6 sm:p-8 my-8 shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Pricing Catalog Management</h3>
            <p className="text-xs text-slate-400">Katalog standar tarif modul, AI services, integrasi & SLA maintenance.</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Table */}
        <div className="border border-slate-800 rounded-xl overflow-hidden mb-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-800 text-slate-400">
                <th className="p-3">Kategori</th>
                <th className="p-3">Nama Item Catalog</th>
                <th className="p-3">Pricing Model</th>
                <th className="p-3 text-right">Default Price</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredCatalog.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30">
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{item.description}</div>
                  </td>
                  <td className="p-3 text-slate-400">{item.pricingModel}</td>
                  <td className="p-3 text-right font-mono font-bold text-cyan-400">
                    {CurrencyService.formatCurrency(item.defaultPrice, item.currency)}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                        title="Edit Price"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setHistoryItem(item)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Price History"
                      >
                        <History className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Price Drawer / Section */}
        {editingItem && (
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 mb-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-cyan-400" /> Edit Tarif Katalog: {editingItem.name}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Harga Default Baru (Rp)</label>
                <input
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Alasan Perubahan Tarif</label>
                <input
                  type="text"
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" /> Simpan Perubahan Harga
              </button>
            </div>
          </div>
        )}

        {/* Price History Modal */}
        {historyItem && (
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" /> Riwayat Perubahan Tarif: {historyItem.name}
              </h4>
              <button
                onClick={() => setHistoryItem(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Tutup
              </button>
            </div>
            {(!historyItem.priceHistory || historyItem.priceHistory.length === 0) ? (
              <p className="text-xs text-slate-400 italic">Belum ada riwayat perubahan tarif untuk item catalog ini.</p>
            ) : (
              <div className="space-y-2">
                {historyItem.priceHistory.map((h, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs flex justify-between items-center">
                    <div>
                      <div className="text-slate-300 font-semibold">{h.reason}</div>
                      <div className="text-[10px] text-slate-500">Oleh {h.changedBy} • {new Date(h.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="line-through text-slate-500 mr-2">Rp {h.oldPrice.toLocaleString()}</span>
                      <span className="text-cyan-400 font-bold">Rp {h.newPrice.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-700"
          >
            Tutup Katalog
          </button>
        </div>
      </div>
    </div>
  );
};
