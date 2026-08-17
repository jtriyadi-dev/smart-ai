import React, { useState, useEffect } from 'react';
import { AdminSupportLayout } from '../../components/admin/AdminSupportLayout';
import { SupportTicketService } from '../../services/SupportTicketService';
import { SupportCategoryConfig } from '../../types';
import { Grid, ShieldCheck, Check, Plus, Tag } from 'lucide-react';

export const AdminSupportCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<SupportCategoryConfig[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const list = SupportTicketService.getCategories();
    setCategories(list);
  };

  const toggleCategory = (catId: string) => {
    const updated = categories.map((c) => {
      if (c.id === catId) {
        return { ...c, active: !c.active };
      }
      return c;
    });
    setCategories(updated);
    localStorage.setItem('smart_ai_support_categories', JSON.stringify(updated));
  };

  return (
    <AdminSupportLayout activeTab="categories">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Grid className="w-5 h-5 text-cyan-400" /> Support Ticket Categories & Routing Config
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Konfigurasi kategori tiket support, peran spesialis terstruktur (Developer, Support Agent, Project Manager, Finance), dan aturan perutean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{cat.name}</h3>
                    <div className="text-[10px] font-mono text-cyan-400">{cat.code}</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                    cat.active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {cat.active ? 'Active' : 'Disabled'}
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{cat.description}</p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] text-slate-500 block font-semibold uppercase">Rekomendasi Penanganan Role:</span>
                <span className="font-bold text-cyan-300 font-mono">{cat.recommendedRole}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminSupportLayout>
  );
};
