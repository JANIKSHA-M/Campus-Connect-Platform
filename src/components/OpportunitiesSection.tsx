import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CareerOpportunity, DepartmentCode } from '../types';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  PlusCircle, 
  Search, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  X,
  Award
} from 'lucide-react';

export const OpportunitiesSection: React.FC = () => {
  const { currentUser, opportunities, createOpportunity } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);
  const [appliedOpportunities, setAppliedOpportunities] = useState<string[]>([]);

  // Apply Modal
  const [activeOpportunityForModal, setActiveOpportunityForModal] = useState<CareerOpportunity | null>(null);

  // New Opportunity Modal (Faculty / Admin)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCategory, setNewCategory] = useState<CareerOpportunity['category']>('Internship');
  const [newLocation, setNewLocation] = useState('Bangalore / Hybrid');
  const [newStipend, setNewStipend] = useState('$1,000 / month');
  const [newEligibility, setNewEligibility] = useState('All 3rd & 4th Year B.Tech Students');
  const [newDeadline, setNewDeadline] = useState('2026-12-15');
  const [newApplyLink, setNewApplyLink] = useState('https://careers.example.com');
  const [newDesc, setNewDesc] = useState('');

  const categories = ['All', 'Internship', 'Workshop', 'Scholarship', 'Competition', 'Certification'];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.companyOrOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSave = (id: string) => {
    setSavedOpportunities(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleApplyClick = (opp: CareerOpportunity) => {
    setActiveOpportunityForModal(opp);
  };

  const confirmApply = () => {
    if (activeOpportunityForModal) {
      setAppliedOpportunities(prev => [...prev, activeOpportunityForModal.id]);
      alert(`Application initiated for "${activeOpportunityForModal.title}" at ${activeOpportunityForModal.companyOrOrg}! Redirecting to company portal...`);
      window.open(activeOpportunityForModal.applyLink, '_blank');
      setActiveOpportunityForModal(null);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    createOpportunity({
      title: newTitle.trim(),
      companyOrOrg: newCompany.trim(),
      category: newCategory,
      location: newLocation.trim(),
      stipendOrGrant: newStipend.trim(),
      eligibility: newEligibility.trim(),
      deadline: newDeadline,
      applyLink: newApplyLink.trim(),
      description: newDesc.trim() || 'Exciting career opportunity for university students.',
      departmentScope: 'ALL',
      postedBy: currentUser ? currentUser.name : 'Placement Cell'
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewCompany('');
    setNewDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>University Training & Placement Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Career, Internships & Scholarships Portal
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
            Vetted technical internships, research fellowships, corporate certifications, and hackathons with verified deadlines.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {(currentUser?.role === 'faculty' || currentUser?.role === 'admin') && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Opportunity</span>
            </button>
          )}

          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Placement Status</span>
            <span className="text-xs font-mono font-bold text-emerald-400">94.8% Verified Placed</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by company, role or stipend..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp) => {
          const isSaved = savedOpportunities.includes(opp.id);
          const isApplied = appliedOpportunities.includes(opp.id);

          return (
            <div 
              key={opp.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase font-mono">
                    {opp.category}
                  </span>

                  <button
                    onClick={() => toggleSave(opp.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-emerald-600 transition-colors"
                    title={isSaved ? 'Remove Bookmark' : 'Save Opportunity'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                    {opp.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.companyOrOrg}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Compensation</span>
                    <span className="font-semibold text-slate-800 font-mono">{opp.stipendOrGrant}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Location</span>
                    <span className="font-semibold text-slate-800 truncate block">{opp.location}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-slate-500 font-medium">Eligibility:</p>
                  <p className="text-slate-700 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/60 leading-relaxed text-[11px]">
                    {opp.eligibility}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {opp.description}
                </p>
              </div>

              {/* Footer Row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Deadline: {opp.deadline}</span>
                </div>

                {isApplied ? (
                  <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Applied</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApplyClick(opp)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>View & Apply</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* APPLICATION CONFIRMATION MODAL */}
      {activeOpportunityForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-emerald-950 px-6 py-4 flex items-center justify-between text-white border-b border-emerald-900">
              <h3 className="text-base font-bold">Apply for Career Opportunity</h3>
              <button onClick={() => setActiveOpportunityForModal(null)} className="text-emerald-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase text-emerald-700 font-mono">
                  {activeOpportunityForModal.category}
                </span>
                <h4 className="text-base font-bold text-slate-900">{activeOpportunityForModal.title}</h4>
                <p className="text-slate-600 font-medium">{activeOpportunityForModal.companyOrOrg}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Stipend / Grant:</span>
                  <span className="font-semibold text-slate-900 font-mono">{activeOpportunityForModal.stipendOrGrant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">{activeOpportunityForModal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deadline:</span>
                  <span className="font-semibold text-amber-700">{activeOpportunityForModal.deadline}</span>
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-800 mb-1">Detailed Description:</p>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {activeOpportunityForModal.description}
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-800 mb-1">Eligibility Criteria:</p>
                <p className="text-slate-700 leading-relaxed bg-emerald-50/40 p-3 rounded-lg border border-emerald-200">
                  {activeOpportunityForModal.eligibility}
                </p>
              </div>

              {currentUser && (
                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-between">
                  <span>Applicant: <strong>{currentUser.name}</strong> ({currentUser.identifier})</span>
                  <span className="font-mono text-[10px] uppercase font-semibold text-indigo-700">{currentUser.department}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveOpportunityForModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmApply}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md flex items-center gap-1.5"
                >
                  <span>Proceed to Official Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE OPPORTUNITY MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-emerald-950 px-6 py-4 flex items-center justify-between text-white border-b border-emerald-900">
              <h3 className="text-base font-bold">Post Career Opportunity</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-emerald-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Position / Program Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Research Intern - Summer 2027"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Microsoft India / ISRO"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Competition">Competition</option>
                    <option value="Certification">Certification</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Bangalore / Remote"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stipend / Grant *</label>
                  <input
                    type="text"
                    required
                    value={newStipend}
                    onChange={(e) => setNewStipend(e.target.value)}
                    placeholder="$1,200 / month"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Deadline *</label>
                  <input
                    type="date"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application URL *</label>
                  <input
                    type="url"
                    required
                    value={newApplyLink}
                    onChange={(e) => setNewApplyLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria *</label>
                <input
                  type="text"
                  required
                  value={newEligibility}
                  onChange={(e) => setNewEligibility(e.target.value)}
                  placeholder="e.g. B.Tech Pre-final Year (CSE, IT, ECE) with minimum CGPA 7.0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Description & Responsibilities</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summarize project scope, tech stack, perks, and selection stages..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
                >
                  Publish Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
