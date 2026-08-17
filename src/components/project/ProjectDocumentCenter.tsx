import React, { useState } from 'react';
import { FullProjectDocument, ProjectDocumentType } from '../../types';
import {
  FileText,
  Download,
  Upload,
  Eye,
  Lock,
  Plus,
  Search,
  Filter,
  CheckCircle,
} from 'lucide-react';

interface Props {
  documents: FullProjectDocument[];
  onUploadDocument?: (doc: Partial<FullProjectDocument>) => void;
  isCustomerView?: boolean;
}

export const ProjectDocumentCenter: React.FC<Props> = ({
  documents,
  onUploadDocument,
  isCustomerView = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form state
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState<ProjectDocumentType>('Specification');
  const [docVersion, setDocVersion] = useState('v1.0');
  const [docVisibility, setDocVisibility] = useState<'CUSTOMER_VISIBLE' | 'INTERNAL'>('CUSTOMER_VISIBLE');
  const [docDesc, setDocDesc] = useState('');

  const visibleDocs = documents.filter((d) => {
    if (isCustomerView && d.visibility !== 'CUSTOMER_VISIBLE') return false;
    if (selectedType !== 'ALL' && d.type !== selectedType) return false;
    if (searchTerm && !d.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    if (onUploadDocument) {
      onUploadDocument({
        name: docName,
        type: docType,
        version: docVersion,
        visibility: docVisibility,
        description: docDesc,
        fileSize: '2.5 MB',
        storageReference: '#',
      });
    }

    setDocName('');
    setDocDesc('');
    setShowUploadModal(false);
  };

  const handleDownload = (doc: FullProjectDocument) => {
    doc.downloadCount = (doc.downloadCount || 0) + 1;
    alert(`Downloading "${doc.name}" (${doc.version})...`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Project Document Repository
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official specifications, design mockups, proposals, and release manuals.
          </p>
        </div>

        {!isCustomerView && onUploadDocument && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Upload className="w-4 h-4" /> Upload Document
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Categories</option>
            <option value="Requirement Document">Requirement Documents</option>
            <option value="UI/UX Preview">UI/UX Previews</option>
            <option value="Proposal">Proposals</option>
            <option value="Quotation">Quotations</option>
            <option value="Specification">Specifications</option>
            <option value="User Manual">User Manuals</option>
            <option value="Release Notes">Release Notes</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      {visibleDocs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">No project documents found in this repository.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between hover:border-sky-500/50 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {doc.type}
                  </span>

                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {doc.version}
                    </span>

                    {!isCustomerView && (
                      <span
                        className={`p-1 rounded text-[10px] ${
                          doc.visibility === 'CUSTOMER_VISIBLE'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                        title={doc.visibility === 'CUSTOMER_VISIBLE' ? 'Visible to Client' : 'Internal Only'}
                      >
                        {doc.visibility === 'CUSTOMER_VISIBLE' ? <Eye className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug mb-1 group-hover:text-sky-600 transition-colors">
                  {doc.name}
                </h4>

                {doc.description && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                    {doc.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <div>
                  <div>Uploaded by {doc.uploadedBy}</div>
                  <div className="text-[10px] text-slate-400">{doc.createdAt.split('T')[0]} &bull; {doc.fileSize || '2 MB'}</div>
                </div>

                <button
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-sky-600" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Upload New Project Document
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Document Name *</label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Technical System Architecture Specification"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as ProjectDocumentType)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Requirement Document">Requirement Document</option>
                    <option value="UI/UX Preview">UI/UX Preview</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Quotation">Quotation</option>
                    <option value="Specification">Specification</option>
                    <option value="User Manual">User Manual</option>
                    <option value="Release Notes">Release Notes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Version Tag</label>
                  <input
                    type="text"
                    value={docVersion}
                    onChange={(e) => setDocVersion(e.target.value)}
                    placeholder="e.g. v1.0"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Visibility Level</label>
                <select
                  value={docVisibility}
                  onChange={(e) => setDocVisibility(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="CUSTOMER_VISIBLE">Client Visible (Customer Portal)</option>
                  <option value="INTERNAL">Internal PM Team Only</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                  placeholder="Brief summary of file content..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-xs"
                >
                  Upload & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
