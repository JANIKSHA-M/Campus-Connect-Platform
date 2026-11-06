import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  PlusCircle, 
  Calendar, 
  BookOpen, 
  Briefcase, 
  Bell, 
  Users, 
  CheckCircle, 
  FileText,
  Trash2,
  Download,
  Search
} from 'lucide-react';
import { DepartmentCode } from '../types';

export const FacultyDashboard: React.FC = () => {
  const { 
    currentUser, 
    announcements, 
    publishAnnouncement, 
    deleteAnnouncement,
    events, 
    createEvent,
    deleteEvent,
    registrations, 
    resources, 
    uploadResource, 
    deleteResource,
    opportunities, 
    createOpportunity 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'announcements' | 'createEvent' | 'uploadResource' | 'registrations'>('overview');

  // Form states for publishing
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<'Urgent' | 'Academic' | 'Event' | 'General'>('Academic');
  const [annDept, setAnnDept] = useState<DepartmentCode | 'ALL'>('CSE');

  // Event form
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDescription, setEvtDescription] = useState('');
  const [evtCategory, setEvtCategory] = useState<'Hackathon' | 'Workshop' | 'Seminar' | 'Cultural' | 'Career Fair'>('Workshop');
  const [evtVenue, setEvtVenue] = useState('');
  const [evtDate, setEvtDate] = useState('2026-11-28');
  const [evtTime, setEvtTime] = useState('10:00 AM - 04:00 PM');
  const [evtCapacity, setEvtCapacity] = useState(60);

  // Resource form
  const [resTitle, setResTitle] = useState('');
  const [resSubject, setResSubject] = useState('');
  const [resDept, setResDept] = useState<DepartmentCode>('CSE');
  const [resSemester, setResSemester] = useState(5);
  const [resType, setResType] = useState<'Lecture Notes' | 'Previous Question Paper' | 'Lab Manual' | 'Reference E-Book' | 'Syllabus'>('Lecture Notes');
  const [resDesc, setResDesc] = useState('');

  // Search in registrations
  const [regSearch, setRegSearch] = useState('');

  // Status message
  const [statusMsg, setStatusMsg] = useState('');

  if (!currentUser) return null;

  // Filter department events & registrations
  const deptEvents = events.filter(e => e.department === currentUser.department || currentUser.role === 'admin');
  const deptRegistrations = registrations.filter(r => 
    deptEvents.some(e => e.id === r.eventId) || r.userDepartment === currentUser.department
  );

  const filteredRegistrations = deptRegistrations.filter(r => 
    r.userName.toLowerCase().includes(regSearch.toLowerCase()) ||
    r.userEmail.toLowerCase().includes(regSearch.toLowerCase()) ||
    r.ticketCode.toLowerCase().includes(regSearch.toLowerCase())
  );

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    publishAnnouncement({
      title: annTitle.trim(),
      content: annContent.trim(),
      category: annCategory,
      department: annDept,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      pinned: annCategory === 'Urgent'
    });

    setAnnTitle('');
    setAnnContent('');
    setStatusMsg('Announcement successfully published to the university notice board!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle.trim() || !evtVenue.trim()) return;

    createEvent({
      title: evtTitle.trim(),
      description: evtDescription.trim() || 'Join us for this exciting departmental academic event.',
      category: evtCategory,
      department: currentUser.department,
      venue: evtVenue.trim(),
      date: evtDate,
      time: evtTime,
      capacity: Number(evtCapacity),
      organizer: `${currentUser.department} Department & Faculty Board`,
      contactEmail: currentUser.email
    });

    setEvtTitle('');
    setEvtDescription('');
    setEvtVenue('');
    setStatusMsg('Campus Event created successfully! Students can now register.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim() || !resSubject.trim()) return;

    uploadResource({
      title: resTitle.trim(),
      subject: resSubject.trim(),
      department: resDept,
      semester: Number(resSemester),
      resourceType: resType,
      fileFormat: 'PDF',
      fileSize: '3.4 MB',
      uploadedBy: currentUser.name,
      description: resDesc.trim() || 'Verified course curriculum materials and study guide.'
    });

    setResTitle('');
    setResSubject('');
    setResDesc('');
    setStatusMsg('Academic Resource uploaded successfully to the Resource Centre!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Faculty Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-semibold uppercase tracking-wider">
                Faculty Member
              </span>
              <span className="text-indigo-200 text-xs font-mono">{currentUser.identifier}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Faculty Workspace: {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Department of {currentUser.department} · Faculty Academic Advisor & Coordinator
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('announcements')}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4" />
              <span>Broadcast Notice</span>
            </button>
            <button
              onClick={() => setActiveTab('createEvent')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-purple-400" />
              <span>Create Event</span>
            </button>
            <button
              onClick={() => setActiveTab('uploadResource')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Upload Notes</span>
            </button>
          </div>
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div>
            <p className="text-slate-400 text-xs font-medium">Department Events</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">{deptEvents.length}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium">Student Registrations</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">{deptRegistrations.length}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium">Materials Uploaded</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
              {resources.filter(r => r.uploadedBy === currentUser.name || r.department === currentUser.department).length}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium">Active Notices</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
              {announcements.filter(a => a.authorName === currentUser.name || a.department === currentUser.department).length}
            </p>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Overview & Events
        </button>
        <button
          onClick={() => setActiveTab('registrations')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'registrations' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Student Registrations ({deptRegistrations.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'announcements' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Publish Announcement
        </button>
        <button
          onClick={() => setActiveTab('createEvent')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'createEvent' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Create Event
        </button>
        <button
          onClick={() => setActiveTab('uploadResource')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'uploadResource' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Upload Academic Resource
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Managed Events */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Department Campus Events</h3>
              <button
                onClick={() => setActiveTab('createEvent')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Event</span>
              </button>
            </div>

            <div className="space-y-3">
              {deptEvents.map((evt) => (
                <div key={evt.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700">
                      {evt.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>
                    <p className="text-xs text-slate-500">{evt.date} · {evt.venue}</p>
                    <div className="text-[11px] font-mono text-slate-600">
                      Enrolled: <span className="font-bold text-indigo-600">{evt.registeredCount}</span> / {evt.capacity} seats
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => deleteEvent(evt.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Study Materials */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Academic Resources Library</h3>
              <button
                onClick={() => setActiveTab('uploadResource')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Upload New</span>
              </button>
            </div>

            <div className="space-y-3">
              {resources.filter(r => r.department === currentUser.department).map((res) => (
                <div key={res.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                      {res.resourceType}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{res.title}</h4>
                    <p className="text-xs text-slate-500">{res.subject} · Semester {res.semester}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Downloads: {res.downloadCount}</p>
                  </div>
                  <button
                    onClick={() => deleteResource(res.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete resource"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: REGISTRATIONS TABLE */}
      {activeTab === 'registrations' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Event Registrations Monitor</h3>
              <p className="text-xs text-slate-500">Live roster of students registered for departmental events.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student or pass code..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg w-56 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={() => {
                  alert('Exporting student participation records as CSV for departmental reporting...');
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Dept</th>
                  <th className="px-4 py-3">Event Registered</th>
                  <th className="px-4 py-3">E-Pass Code</th>
                  <th className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400 font-sans">
                      No registrations match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => {
                    const evt = events.find(e => e.id === reg.eventId);
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3 font-sans font-semibold text-slate-900">{reg.userName}</td>
                        <td className="px-4 py-3 text-slate-600">{reg.userIdentifier}</td>
                        <td className="px-4 py-3 font-sans text-slate-500">{reg.userEmail}</td>
                        <td className="px-4 py-3">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 font-semibold text-slate-700">
                            {reg.userDepartment}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-sans text-slate-800 font-medium">{evt?.title || 'Event'}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[11px]">
                            {reg.ticketCode}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-[11px]">{reg.registeredAt}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PUBLISH ANNOUNCEMENT */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-2xl mx-auto space-y-4">
          <h3 className="text-base font-bold text-slate-900">Broadcast Campus Notice</h3>
          <p className="text-xs text-slate-500">
            Publish official academic notifications, examination dates, or departmental events directly to student feeds.
          </p>

          <form onSubmit={handlePublishAnnouncement} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Announcement Title *
              </label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. Schedule for Machine Learning Project Review 2"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Academic">Academic Notice</option>
                  <option value="Urgent">Urgent / Exam Alert</option>
                  <option value="Event">Event Announcement</option>
                  <option value="General">General Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Cohort / Department *
                </label>
                <select
                  value={annDept}
                  onChange={(e) => setAnnDept(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">Entire Campus (All Departments)</option>
                  <option value="CSE">CSE Department</option>
                  <option value="IT">IT Department</option>
                  <option value="ECE">ECE Department</option>
                  <option value="MECH">Mechanical Department</option>
                  <option value="BIOTECH">Biotechnology Department</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notice Content *
              </label>
              <textarea
                required
                rows={4}
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Write full details, venue, submission link, and deadlines..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Broadcast Announcement
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT: CREATE EVENT */}
      {activeTab === 'createEvent' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-2xl mx-auto space-y-4">
          <h3 className="text-base font-bold text-slate-900">Create Campus Event or Workshop</h3>
          <p className="text-xs text-slate-500">
            Publish an official college hackathon, technical workshop, or seminar with registration limits.
          </p>

          <form onSubmit={handleCreateEvent} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={evtTitle}
                onChange={(e) => setEvtTitle(e.target.value)}
                placeholder="e.g. Generative AI & Large Language Models Hands-on Boot Camp"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event Category *
                </label>
                <select
                  value={evtCategory}
                  onChange={(e) => setEvtCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Workshop">Technical Workshop</option>
                  <option value="Hackathon">Hackathon / Coding</option>
                  <option value="Seminar">Research Seminar</option>
                  <option value="Cultural">Cultural / Sports</option>
                  <option value="Career Fair">Career & Placement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seat Capacity *
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  max={1000}
                  value={evtCapacity}
                  onChange={(e) => setEvtCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date (YYYY-MM-DD) *
                </label>
                <input
                  type="date"
                  required
                  value={evtDate}
                  onChange={(e) => setEvtDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Slot *
                </label>
                <input
                  type="text"
                  required
                  value={evtTime}
                  onChange={(e) => setEvtTime(e.target.value)}
                  placeholder="10:00 AM - 04:00 PM"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Campus Venue *
              </label>
              <input
                type="text"
                required
                value={evtVenue}
                onChange={(e) => setEvtVenue(e.target.value)}
                placeholder="e.g. Block C, Seminar Hall 3 / Innovation Lab"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Description & Objectives
              </label>
              <textarea
                rows={3}
                value={evtDescription}
                onChange={(e) => setEvtDescription(e.target.value)}
                placeholder="Overview of the schedule, prerequisites, resource persons, and certification details..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Publish Campus Event
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT: UPLOAD RESOURCE */}
      {activeTab === 'uploadResource' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-2xl mx-auto space-y-4">
          <h3 className="text-base font-bold text-slate-900">Upload Academic Study Material</h3>
          <p className="text-xs text-slate-500">
            Share verified lecture notes, previous question papers, or laboratory manuals for student access.
          </p>

          <form onSubmit={handleUploadResource} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Material Title *
              </label>
              <input
                type="text"
                required
                value={resTitle}
                onChange={(e) => setResTitle(e.target.value)}
                placeholder="e.g. Distributed Operating Systems - Unit 3 Memory Virtualization"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject Name & Code *
                </label>
                <input
                  type="text"
                  required
                  value={resSubject}
                  onChange={(e) => setResSubject(e.target.value)}
                  placeholder="e.g. Operating Systems (CS401)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource Type *
                </label>
                <select
                  value={resType}
                  onChange={(e) => setResType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Lecture Notes">Lecture Notes</option>
                  <option value="Previous Question Paper">Previous Question Paper</option>
                  <option value="Lab Manual">Lab Manual</option>
                  <option value="Reference E-Book">Reference E-Book</option>
                  <option value="Syllabus">Syllabus Guide</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department *
                </label>
                <select
                  value={resDept}
                  onChange={(e) => setResDept(e.target.value as DepartmentCode)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="CSE">Computer Science & Eng</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics & Comm</option>
                  <option value="MECH">Mechanical Eng</option>
                  <option value="BIOTECH">Biotechnology</option>
                  <option value="CIVIL">Civil Eng</option>
                  <option value="MBA">Management Studies</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Semester *
                </label>
                <select
                  value={resSemester}
                  onChange={(e) => setResSemester(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description & Topics Covered
              </label>
              <textarea
                rows={3}
                value={resDesc}
                onChange={(e) => setResDesc(e.target.value)}
                placeholder="Include syllabus units covered, chapter topics, or exam notes..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Upload to Academic Repository
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
