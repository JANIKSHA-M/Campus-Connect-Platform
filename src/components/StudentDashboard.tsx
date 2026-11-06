import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  Ticket, 
  Clock, 
  MapPin, 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  Bell, 
  GraduationCap,
  Sparkles,
  Download
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    announcements, 
    events, 
    registrations, 
    resources, 
    opportunities, 
    posts, 
    setActiveView, 
    cancelEventRegistration,
    recordDownload 
  } = useApp();

  if (!currentUser) return null;

  // Filter registrations for this student
  const myRegistrations = registrations.filter(r => r.userId === currentUser.id);
  const myRegisteredEvents = events.filter(e => myRegistrations.some(r => r.eventId === e.id));

  // Department-specific resources
  const deptResources = resources.filter(r => r.department === currentUser.department || r.department === 'CSE');

  // Department-specific announcements
  const relevantAnnouncements = announcements.filter(a => a.department === 'ALL' || a.department === currentUser.department);

  return (
    <div className="space-y-8">
      {/* Student Profile & Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold uppercase tracking-wider">
                Active Student
              </span>
              <span className="text-indigo-200 text-xs font-mono">{currentUser.identifier}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {currentUser.name}!
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 shadow-xs backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{currentUser.role} · {currentUser.department}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200">
              Department of {currentUser.department} · Semester {currentUser.semester || 5} · Academic Year 2026-27
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('events')}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-semibold text-xs shadow-md hover:bg-indigo-50 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Explore Events</span>
            </button>
            <button
              onClick={() => setActiveView('resources')}
              className="px-4 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-medium text-xs border border-indigo-400/30 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Study Materials</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-indigo-700/60">
          <div>
            <p className="text-indigo-300 text-xs font-medium">Registered Events</p>
            <p className="text-2xl font-bold font-mono tabular-nums mt-0.5">{myRegistrations.length}</p>
          </div>
          <div>
            <p className="text-indigo-300 text-xs font-medium">Dept Resources</p>
            <p className="text-2xl font-bold font-mono tabular-nums mt-0.5">{deptResources.length}</p>
          </div>
          <div>
            <p className="text-indigo-300 text-xs font-medium">Community Posts</p>
            <p className="text-2xl font-bold font-mono tabular-nums mt-0.5">
              {posts.filter(p => p.authorId === currentUser.id).length}
            </p>
          </div>
          <div>
            <p className="text-indigo-300 text-xs font-medium">Opportunities Open</p>
            <p className="text-2xl font-bold font-mono tabular-nums mt-0.5">{opportunities.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Announcements & My Registered Events */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Campus Announcements */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Official Campus Announcements
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {relevantAnnouncements.length} Notices
              </span>
            </div>

            <div className="space-y-3">
              {relevantAnnouncements.map((ann) => (
                <div 
                  key={ann.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    ann.category === 'Urgent' 
                      ? 'bg-red-50/40 border-red-200' 
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      ann.category === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {ann.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{ann.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{ann.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ann.content}</p>
                  <div className="mt-2 text-[11px] text-slate-400 font-medium">
                    Published by: {ann.authorName} · {ann.department === 'ALL' ? 'University Wide' : ann.department}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Campus Events & E-Passes */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Ticket className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  My Registered Events ({myRegistrations.length})
                </h2>
              </div>
              <button
                onClick={() => setActiveView('events')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Find More Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {myRegistrations.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-200">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">No active event registrations yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Browse hackathons, technical symposiums, and career workshops.
                </p>
                <button
                  onClick={() => setActiveView('events')}
                  className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                >
                  Browse Campus Events
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myRegistrations.map((reg) => {
                  const evt = events.find(e => e.id === reg.eventId);
                  return (
                    <div 
                      key={reg.id} 
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-colors shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700">
                            {evt?.category || 'Event'}
                          </span>
                          <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{evt?.title || 'Campus Event'}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {evt?.date} · {evt?.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt?.venue}
                          </span>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                          Digital E-Pass
                        </span>
                        <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-200 inline-block mt-0.5">
                          {reg.ticketCode}
                        </span>
                        <div className="mt-2">
                          <button
                            onClick={() => cancelEventRegistration(reg.id)}
                            className="text-[11px] text-red-600 hover:text-red-800 font-medium"
                          >
                            Cancel Pass
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Academic Resources & Opportunities */}
        <div className="space-y-8">
          {/* Department Recommended Resources */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Study Materials ({currentUser.department})
                </h3>
              </div>
              <button
                onClick={() => setActiveView('resources')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                All
              </button>
            </div>

            <div className="space-y-3">
              {deptResources.slice(0, 3).map((res) => (
                <div 
                  key={res.id} 
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-100 text-blue-800">
                      {res.resourceType}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{res.fileSize}</span>
                  </div>
                  <p className="font-semibold text-slate-900 line-clamp-1">{res.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{res.subject}</p>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">By {res.uploadedBy}</span>
                    <button
                      onClick={() => {
                        recordDownload(res.id);
                        alert(`Downloading verified copy of "${res.title}"...`);
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 text-[11px]"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Career Opportunities */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Career Opportunities
                </h3>
              </div>
              <button
                onClick={() => setActiveView('opportunities')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800"
              >
                View
              </button>
            </div>

            <div className="space-y-3">
              {opportunities.slice(0, 3).map((opp) => (
                <div 
                  key={opp.id} 
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all text-xs"
                >
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    {opp.category}
                  </span>
                  <h4 className="font-semibold text-slate-900 mt-1 line-clamp-1">{opp.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{opp.companyOrOrg}</p>
                  <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                    <span className="text-amber-700 font-medium">Deadline: {opp.deadline}</span>
                    <span className="text-slate-600 font-mono">{opp.stipendOrGrant}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
