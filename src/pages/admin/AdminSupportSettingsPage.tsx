import React, { useState, useEffect } from 'react';
import { AdminSupportLayout } from '../../components/admin/AdminSupportLayout';
import { SupportTicketService } from '../../services/SupportTicketService';
import { SupportSLAPolicy, SupportSystemSettings } from '../../types';
import { Settings, ShieldCheck, Clock, Save, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export const AdminSupportSettingsPage: React.FC = () => {
  const [slaPolicies, setSlaPolicies] = useState<SupportSLAPolicy[]>([]);
  const [settings, setSettings] = useState<SupportSystemSettings>({
    ticketPrefix: 'SAI-TKT',
    numberFormat: 'SAI-TKT-2026-{6DIGITS}',
    autoCloseDays: 7,
    enableAutoClose: false,
    enableAutoAssignment: false,
    enableMalwareScan: true,
    allowedFileTypes: ['.png', '.jpg', '.jpeg', '.pdf', '.docx', '.txt', '.log', '.zip'],
    maxFileSizeMb: 25,
    whatsappSupportNumber: '+6281298765432',
    businessHours: 'Monday–Friday 08:00–17:00 WIB'
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const policies = SupportTicketService.getSLAPolicies();
    setSlaPolicies(policies);
    const set = SupportTicketService.getSettings();
    setSettings(set);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    SupportTicketService.updateSettings(settings);
    localStorage.setItem('smart_ai_support_sla_policies', JSON.stringify(slaPolicies));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminSupportLayout activeTab="settings">
      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" /> SLA Target Policies & System Settings
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Pengaturan target waktu respon & resolusi Service Level Agreement (SLA), jam kerja, integrasi WhatsApp Helpdesk, dan batas keamanan berkas.
            </p>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Pengaturan SLA & Helpdesk berhasil disimpan!
          </div>
        )}

        {/* SLA Policies Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <Clock className="w-4 h-4 text-cyan-400" /> Target SLA Response & Resolution Hours
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slaPolicies.map((pol, idx) => (
              <div key={pol.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{pol.name} ({pol.priority})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                    {pol.priority}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Response Target (Hours)</label>
                    <input
                      type="number"
                      value={pol.responseTimeTargetHours}
                      onChange={(e) => {
                        const updated = [...slaPolicies];
                        updated[idx].responseTimeTargetHours = parseInt(e.target.value) || 1;
                        setSlaPolicies(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Resolution Target (Hours)</label>
                    <input
                      type="number"
                      value={pol.resolutionTimeTargetHours}
                      onChange={(e) => {
                        const updated = [...slaPolicies];
                        updated[idx].resolutionTimeTargetHours = parseInt(e.target.value) || 1;
                        setSlaPolicies(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General & WhatsApp Configuration */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Helpdesk & System Config
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Nomor WhatsApp Official Helpdesk</label>
              <input
                type="text"
                value={settings.whatsappSupportNumber}
                onChange={(e) => setSettings({ ...settings, whatsappSupportNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Jam Kerja Operasional SLA</label>
              <input
                type="text"
                value={settings.businessHours}
                onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Max File Attachment Size (MB)</label>
              <input
                type="number"
                value={settings.maxFileSizeMb}
                onChange={(e) => setSettings({ ...settings, maxFileSizeMb: parseInt(e.target.value) || 20 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="font-semibold text-white">Enable Automated Malware Scanning</div>
                <div className="text-[10px] text-slate-400">Pindaian otomatis berkas lampiran pelanggan sebelum diunggah</div>
              </div>
              <input
                type="checkbox"
                checked={settings.enableMalwareScan}
                onChange={(e) => setSettings({ ...settings, enableMalwareScan: e.target.checked })}
                className="w-4 h-4 accent-cyan-500"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminSupportLayout>
  );
};
