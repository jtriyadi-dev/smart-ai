import React, { useState } from 'react';
import { ProjectService } from '../../../services/ProjectService';
import { useRouter } from '../../../lib/router';
import { FolderKanban, ArrowLeft, CheckCircle2, Building, Calendar, DollarSign } from 'lucide-react';

export const AdminProjectNewPage: React.FC = () => {
  const { navigate } = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [companyId, setCompanyId] = useState('comp_01');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('Logistics & Supply Chain');
  const [appType, setAppType] = useState('Enterprise Web Application');
  const [startDate, setStartDate] = useState('2026-08-15');
  const [targetDate, setTargetDate] = useState('2026-11-15');
  const [contractValue, setContractValue] = useState<number>(150000000);
  const [projectManagerName, setProjectManagerName] = useState('Ahmad PM (SMART-AI.ID)');
  const [techStackInput, setTechStackInput] = useState('React 18, TypeScript, Node.js, Express, Tailwind CSS, Gemini AI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !customerName.trim()) return;

    const techStack = techStackInput.split(',').map((s) => s.trim()).filter(Boolean);

    const newProject = ProjectService.createProject({
      customerName,
      companyId,
      projectName,
      description,
      industry,
      appType,
      startDate,
      targetDate,
      projectManagerName,
      techStack,
      financialSummary: {
        contractValue,
        invoiced: Math.round(contractValue * 0.5),
        paid: Math.round(contractValue * 0.5),
        outstanding: Math.round(contractValue * 0.5),
        currency: 'IDR',
      },
    });

    navigate(`/admin/projects/${newProject.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <a
          href="/admin/projects"
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </a>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Initialize New Software Project</h1>
          <p className="text-xs text-slate-500">Create a new development project workspace for client tracking.</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Client Organization Name *</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. PT Global Logistics Indonesia"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Company ID / Tenant Key</label>
            <input
              type="text"
              required
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              placeholder="e.g. comp_global_logistics"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Project Name *</label>
          <input
            type="text"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g. Fleet AI & Telematics Management Platform"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Project Description & Scope</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Key functional requirements, modules, and deliverables..."
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Industry Vertical</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Application Type</label>
            <input
              type="text"
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Target Completion Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Contract Value (IDR)</label>
            <input
              type="number"
              value={contractValue}
              onChange={(e) => setContractValue(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Assigned Project Manager</label>
            <input
              type="text"
              value={projectManagerName}
              onChange={(e) => setProjectManagerName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">Technologies & Frameworks (Comma-separated)</label>
          <input
            type="text"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <a
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 transition-all"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Initialize Project Workspace
          </button>
        </div>
      </form>
    </div>
  );
};
