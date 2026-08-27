import React, { useState } from 'react';
import {
  FileText,
  Download,
  Upload,
  Search,
  Plus,
  Eye,
  FileCheck,
  FolderOpen,
  Image as ImageIcon,
  ShieldCheck,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { WeddingDocument } from '../../types';
import { ConfirmModal } from '../common/Toast';

export const DocumentVault: React.FC = () => {
  const { documents, addDocument, deleteDocument, showToast } = useWedding();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<WeddingDocument | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<WeddingDocument['category']>('Contract');
  const [fileType, setFileType] = useState('PDF');
  const [fileSize, setFileSize] = useState('2.4 MB');

  const categories = [
    'Contract',
    'ID Proof',
    'Ticket',
    'Moodboard',
    'Invoice',
    'Puja List',
    'Script',
  ];

  const filteredDocs = documents.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addDocument({
      title,
      category,
      fileType,
      fileSize,
      uploadedAt: '2026-11-25',
      url: '#',
    });

    setIsUploadModalOpen(false);
    setTitle('');
    showToast(`Uploaded "${title}" to document vault`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Dastavej & Vault
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Wedding Document & Contract Vault
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Secure digital repository for vendor MoUs, venue clearances, ID proofs, decor moodboards, and ritual scripts.
            </p>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-center"
          >
            <Upload className="w-4 h-4 text-amber-300" />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Filters */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
              }`}
            >
              All Files ({documents.length})
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === c ? 'bg-[#7A1C2E] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
                }`}
              >
                {c}s
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
            />
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#FAF0E1] text-[#7A1C2E] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-heading">
                      {doc.category}
                    </span>
                    <h3 className="font-heading font-bold text-xs text-[#2C1810] mt-1 leading-snug">
                      {doc.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="pt-3 space-y-1.5 text-xs text-stone-500">
                <div className="flex items-center justify-between">
                  <span>File Format:</span>
                  <span className="font-mono font-bold text-stone-800">{doc.fileType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>File Size:</span>
                  <span>{doc.fileSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Uploaded On:</span>
                  <span>{doc.uploadedAt}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => showToast(`Opened "${doc.title}" preview`)}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => showToast(`Downloaded "${doc.title}"`)}
                  className="p-1.5 hover:bg-[#FAF0E1] text-[#7A1C2E] rounded-lg"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDocToDelete(doc)}
                  className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Upload Document</h3>
            <p className="text-xs text-stone-500 mb-5">Upload contract, flight ticket, ID proof or ritual list</p>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Oberoi Udaivilas Banquet MoU"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WeddingDocument['category'])}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Format
                  </label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="PDF">PDF</option>
                    <option value="JPG/PNG">Image (JPG/PNG)</option>
                    <option value="DOCX">Word DOCX</option>
                    <option value="ZIP">Archive ZIP</option>
                  </select>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-[#D4AF37]/50 rounded-2xl p-6 text-center bg-white/70 space-y-2">
                <FolderOpen className="w-8 h-8 mx-auto text-[#7A1C2E]" />
                <div className="text-xs font-bold text-stone-700">
                  Drag & Drop files here, or <span className="text-[#7A1C2E] underline cursor-pointer">browse</span>
                </div>
                <div className="text-[10px] text-stone-400">Supported: PDF, JPG, PNG up to 25MB</div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!docToDelete}
        title="Delete Document?"
        message={`Are you sure you want to delete "${docToDelete?.title}" from the wedding vault?`}
        confirmLabel="Delete File"
        isDestructive={true}
        onConfirm={() => {
          if (docToDelete) {
            deleteDocument(docToDelete.id);
            setDocToDelete(null);
          }
        }}
        onCancel={() => setDocToDelete(null)}
      />
    </div>
  );
};
