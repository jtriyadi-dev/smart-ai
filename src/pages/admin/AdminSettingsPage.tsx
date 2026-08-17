import React, { useState } from 'react';
import { Settings, Building2, ShieldCheck, Bell, Sparkles, Key, Lock, DollarSign, Globe, CheckCircle2, Save } from 'lucide-react';
import { AdminControlService } from '../../services/AdminControlService';

export const AdminSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'company' | 'branding' | 'notifications' | 'security' | 'billing'>('company');
  const [settings, setSettings] = useState(AdminControlService.getSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    AdminControlService.saveSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-bold font-mono">
        <button
          onClick={() => setActiveSection('company')}
          className={`px-3 py-2 rounded-xl transition-all ${
            activeSection === 'company' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Company & Tax Info
        </button>
        <button
          onClick={() => setActiveSection('branding')}
          className={`px-3 py-2 rounded-xl transition-all ${
            activeSection === 'branding' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Branding & Identity
        </button>
        <button
          onClick={() => setActiveSection('notifications')}
          className={`px-3 py-2 rounded-xl transition-all ${
            activeSection === 'notifications' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Notifications & WhatsApp
        </button>
        <button
          onClick={() => setActiveSection('security')}
          className={`px-3 py-2 rounded-xl transition-all ${
            activeSection === 'security' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Security & Session
        </button>
        <button
          onClick={() => setActiveSection('billing')}
          className={`px-3 py-2 rounded-xl transition-all ${
            activeSection === 'billing' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Billing & Invoicing
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Pengaturan Enterprise SMART-AI.ID Berhasil Diperbarui!</span>
        </div>
      )}

      {/* Form Container */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {activeSection === 'company' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>COMPANY IDENTIFICATION & LEGAL DETAILS</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settings.company.companyName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, companyName: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={settings.company.brandName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, brandName: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Official Address</label>
                <textarea
                  rows={2}
                  value={settings.company.address}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, address: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tax Info (NPWP)</label>
                  <input
                    type="text"
                    value={settings.company.taxInformation}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, taxInformation: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Bank Information</label>
                  <input
                    type="text"
                    value={settings.company.bankInformation}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, bankInformation: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'branding' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>BRANDING & ASSETS</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={settings.branding.logo}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        branding: { ...settings.branding, logo: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Default OG Image URL</label>
                  <input
                    type="text"
                    value={settings.branding.defaultOgImage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        branding: { ...settings.branding, defaultOgImage: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>NOTIFICATION & WHATSAPP CHANNELS</span>
              </h3>

              <div className="space-y-3 font-mono">
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailEnabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailEnabled: e.target.checked }
                      })
                    }
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                  />
                  <span>Aktifkan Email Notifications untuk Lead & Proposal</span>
                </label>

                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={settings.notifications.whatsappEnabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, whatsappEnabled: e.target.checked }
                      })
                    }
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                  />
                  <span>Aktifkan Direct WhatsApp API Alert (Official Gateway)</span>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
                <Lock className="w-4 h-4 text-rose-400" />
                <span>SECURITY & SESSION TIMEOUT</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Session Timeout (Menit)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeoutMinutes}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeoutMinutes: parseInt(e.target.value) }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Password Minimum Length</label>
                  <input
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, passwordMinLength: parseInt(e.target.value) }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Setelan Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
