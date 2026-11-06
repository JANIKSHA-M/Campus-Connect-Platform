import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicResource, DepartmentCode } from '../types';
import { 
  BookOpen, 
  Download, 
  FileText, 
  Search, 
  PlusCircle, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  X,
  FileCheck,
  Share2
} from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const { currentUser, resources, uploadResource, recordDownload } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');

  // Preview Modal
  const [previewResource, setPreviewResource] = useState<AcademicResource | null>(null);

  // Upload Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDept, setNewDept] = useState<DepartmentCode>('CSE');
  const [newSemester, setNewSemester] = useState(5);
  const [newType, setNewType] = useState<AcademicResource['resourceType']>('Lecture Notes');
  const [newDesc, setNewDesc] = useState('');

  const departments = ['All', 'CSE', 'IT', 'ECE', 'MECH', 'BIOTECH', 'CIVIL', 'MBA'];
  const resourceTypes = [
    'All',
    'Lecture Notes',
    'Previous Question Paper',
    'Lab Manual',
    'Reference E-Book',
    'Syllabus'
  ];

  const filteredResources = resources.filter((res) => {
    const matchesDept = selectedDept === 'All' || res.department === selectedDept;
    const matchesType = selectedType === 'All' || res.resourceType === selectedType;
    const matchesSem = selectedSemester === 'All' || res.semester.toString() === selectedSemester;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesType && matchesSem && matchesSearch;
  });

  const handleDownload = (res: AcademicResource) => {
    recordDownload(res.id);
    // Trigger simulated download prompt
    const element = document.createElement('a');
    const file = new Blob([
      `--- CAMPUS CONNECT 360 ACADEMIC REPOSITORY ---\n` +
      `Title: ${res.title}\n` +
      `Subject: ${res.subject} (${res.department})\n` +
      `Semester: ${res.semester}\n` +
      `Resource Type: ${res.resourceType}\n` +
      `Uploaded By: ${res.uploadedBy}\n` +
      `Upload Date: ${res.uploadDate}\n\n` +
      `Description & Curriculum Outline:\n${res.description}\n\n` +
      `[Verified Academic Document - University Accreditation Grade A++]`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${res.title.replace(/[^a-zA-Z0-9]/g, '_')}_verified.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubject.trim()) return;

    uploadResource({
      title: newTitle.trim(),
      subject: newSubject.trim(),
      department: newDept,
      semester: Number(newSemester),
      resourceType: newType,
      fileFormat: 'PDF',
      fileSize: '4.2 MB',
      uploadedBy: currentUser ? currentUser.name : 'Faculty Contributor',
      description: newDesc.trim() || 'Verified course curriculum materials and study guide.'
    });

    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewSubject('');
    setNewDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Learning Commons</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic Resource Centre
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
            Verified university course notes, 5-year previous question papers, laboratory experiment manuals, and syllabus roadmaps.
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) {
              alert('Please sign in with a faculty or admin account to upload academic materials.');
              return;
            }
            setIsUploadModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-white text-blue-950 font-semibold text-xs shadow-md hover:bg-blue-50 transition-colors flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-blue-600" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        {/* Resource types filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedType === type 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Secondary filters: Department, Semester, Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Department:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Semester:</span>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s.toString()}>Semester {s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by subject, title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div 
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 uppercase font-mono">
                  {res.resourceType}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{res.fileFormat} · {res.fileSize}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {res.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {res.subject} · {res.department} (Sem {res.semester})
                </p>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {res.description}
              </p>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>By {res.uploadedBy}</span>
                <span className="font-mono tabular-nums">{res.downloadCount} Downloads</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setPreviewResource(res)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => handleDownload(res)}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="truncate pr-4">
                <span className="text-xs text-blue-400 font-mono uppercase">{previewResource.resourceType}</span>
                <h3 className="text-base font-bold truncate">{previewResource.title}</h3>
              </div>
              <button onClick={() => setPreviewResource(null)} className="text-slate-400 hover:text-white shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Subject</span>
                  <span className="font-semibold text-slate-900">{previewResource.subject}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Department</span>
                  <span className="font-semibold text-slate-900">{previewResource.department}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Semester</span>
                  <span className="font-semibold text-slate-900">Sem {previewResource.semester}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">File Size</span>
                  <span className="font-semibold text-slate-900">{previewResource.fileSize} ({previewResource.fileFormat})</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Course Summary & Syllabus Notes</h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                  {previewResource.description}
                  {`\n\n[DOCUMENT CONTENT PREVIEW]\n` +
                    `1. Fundamental Principles and Architectural Taxonomy\n` +
                    `2. Step-by-Step Mathematical & Algorithmic Derivations\n` +
                    `3. Real-world Engineering Applications & Benchmark Evaluations\n` +
                    `4. University Model Examination Questions & Solved Solutions\n` +
                    `\nVerified by Department Faculty Board · Campus Connect 360 Repository.`}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 text-xs">Uploaded by {previewResource.uploadedBy} on {previewResource.uploadDate}</span>
              <button
                onClick={() => {
                  handleDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verified File</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-950 px-6 py-4 flex items-center justify-between text-white border-b border-blue-900">
              <h3 className="text-base font-bold">Upload Academic Study Resource</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-blue-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Computer Networks - OSI & TCP/IP Protocol Stack Notes"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject & Code *</label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Computer Networks (CS502)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Resource Type *</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Previous Question Paper">Previous Question Paper</option>
                    <option value="Lab Manual">Lab Manual</option>
                    <option value="Reference E-Book">Reference E-Book</option>
                    <option value="Syllabus">Syllabus</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value as DepartmentCode)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="BIOTECH">BIOTECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Semester *</label>
                  <select
                    value={newSemester}
                    onChange={(e) => setNewSemester(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description & Topics</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summarize key chapters, laboratory experiments, or solved questions..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
                >
                  Submit & Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
