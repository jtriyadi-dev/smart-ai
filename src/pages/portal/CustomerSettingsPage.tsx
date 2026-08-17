import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { Settings, Globe, Bell, DollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CustomerSettingsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [emailNotifProjects, setEmailNotifProjects] = useState(true);
  const [emailNotifInvoices, setEmailNotifInvoices] = useState(true);
  const [emailNotifTickets, setEmailNotifTickets] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
    }
  }, []);

  if (!session) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <CustomerPortalLayout activePath="/portal/settings">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" /> Pengaturan Portal & Preferences
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Atur preferensi bahasa, notifikasi email, dan tampilan mata uang portal.
        </p>
      </div>

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Pengaturan preferensi berhasil disimpan!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Language & Currency */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" /> Bahasa & Mata Uang Tampilan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Bahasa Tampilan Interface</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="id">Bahasa Indonesia (Default)</option>
                <option value="en">English (International)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mata Uang Acuan Ringkasan</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="IDR">Rupiah Indonesia (IDR)</option>
                <option value="USD">US Dollar (USD)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Preference */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" /> Preferensi Notifikasi Email
          </h2>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
              <span className="text-slate-300 font-medium">Notifikasi Update Progress Proyek & Milestone</span>
              <input
                type="checkbox"
                checked={emailNotifProjects}
                onChange={(e) => setEmailNotifProjects(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
              <span className="text-slate-300 font-medium">Notifikasi Penerbitan Invoice & Pengingat Jatuh Tempo</span>
              <input
                type="checkbox"
                checked={emailNotifInvoices}
                onChange={(e) => setEmailNotifInvoices(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer">
              <span className="text-slate-300 font-medium">Notifikasi Balasan Support Ticket oleh Tim SMART-AI.ID</span>
              <input
                type="checkbox"
                checked={emailNotifTickets}
                onChange={(e) => setEmailNotifTickets(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition"
          >
            Simpan Pengaturan
          </button>
        </div>
      </form>
    </CustomerPortalLayout>
  );
};
