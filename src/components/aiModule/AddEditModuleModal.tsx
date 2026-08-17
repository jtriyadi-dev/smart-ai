import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle2, Boxes, Sparkles, Layers, Users } from 'lucide-react';
import { ApplicationModule, ModuleFeature, ModulePriority, ModuleCategory } from '../../types';

interface AddEditModuleModalProps {
  isOpen: boolean;
  editingModule: ApplicationModule | null;
  onClose: () => void;
  onSave: (module: ApplicationModule) => void;
}

const CATEGORIES = [
  'Core',
  'Operations',
  'Management',
  'Finance',
  'HR',
  'Reporting',
  'Integration',
  'AI',
  'Administration'
];

export const AddEditModuleModal: React.FC<AddEditModuleModalProps> = ({
  isOpen,
  editingModule,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ModuleCategory>('Operations');
  const [priority, setPriority] = useState<ModulePriority>('Must Have');
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('');
  const [roles, setRoles] = useState('');
  const [aiFeaturesText, setAiFeaturesText] = useState('');
  const [integrationsText, setIntegrationsText] = useState('');
  const [dataReqText, setDataReqText] = useState('');

  // Features List
  const [features, setFeatures] = useState<ModuleFeature[]>([
    { id: 'F-1', name: '', description: '', priority: 'Must Have' }
  ]);

  useEffect(() => {
    if (editingModule) {
      setName(editingModule.name || '');
      setCategory(editingModule.category || 'Operations');
      setPriority(editingModule.priority || 'Must Have');
      setDescription(editingModule.description || '');
      setPurpose(editingModule.purpose || '');
      setRoles(Array.isArray(editingModule.roles) ? editingModule.roles.join(', ') : '');
      setAiFeaturesText(
        Array.isArray(editingModule.aiFeatures)
          ? editingModule.aiFeatures.map((a) => (typeof a === 'object' ? a.name : a)).join(', ')
          : ''
      );
      setIntegrationsText(Array.isArray(editingModule.integrations) ? editingModule.integrations.join(', ') : '');
      setDataReqText(Array.isArray(editingModule.dataRequirements) ? editingModule.dataRequirements.join(', ') : '');
      setFeatures(
        editingModule.features && editingModule.features.length > 0
          ? editingModule.features
          : [{ id: 'F-1', name: '', description: '', priority: 'Must Have' }]
      );
    } else {
      // Reset form
      setName('');
      setCategory('Operations');
      setPriority('Must Have');
      setDescription('');
      setPurpose('');
      setRoles('Operator, Supervisor, Manager');
      setAiFeaturesText('');
      setIntegrationsText('Internal API');
      setDataReqText('Operational Ledger');
      setFeatures([{ id: 'F-1', name: 'Standard Operation Input', description: 'Form pengisian data harian', priority: 'Must Have' }]);
    }
  }, [editingModule, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      { id: `F-${features.length + 1}`, name: '', description: '', priority: 'Recommended' }
    ]);
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleFeatureChange = (idx: number, field: keyof ModuleFeature, val: string) => {
    const updated = [...features];
    updated[idx] = { ...updated[idx], [field]: val };
    setFeatures(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedRoles = roles
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    const parsedAiFeatures = aiFeaturesText
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean)
      .map((aName, i) => ({
        id: `AI-CUSTOM-${i + 1}`,
        name: aName,
        description: `Fitur AI untuk ${aName}`
      }));

    const parsedIntegrations = integrationsText
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    const parsedDataReq = dataReqText
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const validFeatures = features.filter((f) => f.name.trim().length > 0);

    const finalModule: ApplicationModule = {
      id: editingModule ? editingModule.id : `MOD-USR-${Date.now().toString(36).toUpperCase().slice(-4)}`,
      name,
      category,
      priority,
      description,
      purpose,
      roles: parsedRoles.length > 0 ? parsedRoles : ['User'],
      features: validFeatures.length > 0 ? validFeatures : [{ id: 'F-1', name: 'Basic Feature', description: 'Fitur dasar', priority: 'Must Have' }],
      dependencies: editingModule ? editingModule.dependencies : [],
      aiFeatures: parsedAiFeatures,
      integrations: parsedIntegrations,
      dataRequirements: parsedDataReq,
      workflow: editingModule ? editingModule.workflow : [{ step: 1, title: 'Input Data', description: 'Pengisian data', role: parsedRoles[0] || 'User' }],
      status: editingModule ? 'User Modified' : 'User Added',
      source: editingModule ? editingModule.source : 'User',
      order: editingModule ? editingModule.order : 99,
      architectureImpact: {
        frontend: [`${name} View`],
        backend: [`${name.replace(/\s+/g, '')}Service`],
        database: [`${name.replace(/\s+/g, '')}Table`],
        api: [`/api/v1/${name.toLowerCase().replace(/\s+/g, '-')}`]
      }
    };

    onSave(finalModule);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              {editingModule ? 'Edit Modul Aplikasi' : 'Tambah Modul Aplikasi Baru'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Module Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Nama Modul <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Fleet & Heavy Equipment"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Kategori Modul</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority & User Roles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Tingkat Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ModulePriority)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Must Have">Must Have (Wajib)</option>
                <option value="Recommended">Recommended (Sangat Disarankan)</option>
                <option value="Optional">Optional (Opsional)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">User Roles (Pisahkan Koma)</label>
              <input
                type="text"
                placeholder="Contoh: Manager, Supervisor, Operator"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description & Purpose */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">Deskripsi Singkat Modul</label>
            <textarea
              rows={2}
              placeholder="Penjelasan ringkas mengenai fungsi utama modul..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Tujuan Bisnis (Business Purpose)</label>
            <input
              type="text"
              placeholder="Contoh: Digitalisasi dan optimalisasi utilitas alat berat di lapangan"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Features Builder Section */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-cyan-400" />
                <span>Daftar Fitur Fungsional ({features.length})</span>
              </label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Fitur</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <input
                    type="text"
                    placeholder="Nama Fitur"
                    value={feat.name}
                    onChange={(e) => handleFeatureChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white focus:outline-none"
                  />
                  <select
                    value={feat.priority}
                    onChange={(e) => handleFeatureChange(idx, 'priority', e.target.value as any)}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-slate-300 text-[11px]"
                  >
                    <option value="Must Have">Must Have</option>
                    <option value="Recommended">Recommended</option>
                    <option value="Optional">Optional</option>
                  </select>
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Features & Integrations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fitur AI (Pisahkan Koma)</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: AI Anomaly Alert, Production Forecast"
                value={aiFeaturesText}
                onChange={(e) => setAiFeaturesText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Integrasi Sistem (Pisahkan Koma)</label>
              <input
                type="text"
                placeholder="Contoh: WhatsApp Gateway, Payment API"
                value={integrationsText}
                onChange={(e) => setIntegrationsText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-950 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{editingModule ? 'Simpan Perubahan' : 'Tambah Modul'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
