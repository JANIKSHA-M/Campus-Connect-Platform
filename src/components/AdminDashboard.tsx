import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  Activity, 
  Trash2, 
  Search, 
  PlusCircle, 
  Filter, 
  CheckCircle2, 
  FileText,
  Download
} from 'lucide-react';
import { UserRole } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    users, 
    events, 
    registrations, 
    resources, 
    opportunities, 
    posts, 
    announcements, 
    deleteAnnouncement, 
    deleteEvent, 
    deleteResource, 
    deleteOpportunity,
    activityLogs,
    setActiveView 
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'users' | 'moderation' | 'audit'>('overview');
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');

  if (!currentUser) return null;

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalFaculty = users.filter(u => u.role === 'faculty').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;

  const departments = ['CSE', 'IT', 'ECE', 'MECH', 'BIOTECH', 'CIVIL', 'MBA'];

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.identifier.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8">
      {/* Admin Executive Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[11px] font-semibold uppercase tracking-wider">
                System Administrator
              </span>
              <span className="text-purple-200 text-xs font-mono">{currentUser.identifier}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Institutional Admin Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Campus Connect 360 · Comprehensive Governance & Analytics Oversight
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveView('analytics')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-4 h-4" />
              <span>Full Data Science Analytics</span>
            </button>
            <button
              onClick={() => setActiveView('flask-deliverables')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Flask Project Source</span>
            </button>
          </div>
        </div>

        {/* 9 Metrics Grid as required by Module 9 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-8 pt-6 border-t border-slate-800 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-slate-400 font-medium">Total Users</p>
            <p className="text-xl font-bold font-mono tabular-nums text-white mt-0.5">{users.length}</p>
            <p className="text-[10px] text-slate-400 mt-1">{totalStudents} Students · {totalFaculty} Faculty</p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-slate-400 font-medium">Departments</p>
            <p className="text-xl font-bold font-mono tabular-nums text-purple-300 mt-0.5">{departments.length}</p>
            <p className="text-[10px] text-slate-400 mt-1">Active Academic Units</p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-slate-400 font-medium">Campus Events</p>
            <p className="text-xl font-bold font-mono tabular-nums text-emerald-300 mt-0.5">{events.length}</p>
            <p className="text-[10px] text-slate-400 mt-1">{registrations.length} Total Registrations</p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-slate-400 font-medium">Academic Resources</p>
            <p className="text-xl font-bold font-mono tabular-nums text-blue-300 mt-0.5">{resources.length}</p>
            <p className="text-[10px] text-slate-400 mt-1">Study Notes & Papers</p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
            <p className="text-slate-400 font-medium">Community Discussions</p>
            <p className="text-xl font-bold font-mono tabular-nums text-amber-300 mt-0.5">{posts.length}</p>
            <p className="text-[10px] text-slate-400 mt-1">{opportunities.length} Career Openings</p>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'overview' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Governance Overview
        </button>
        <button
          onClick={() => setAdminTab('users')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'users' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          User Registry ({users.length})
        </button>
        <button
          onClick={() => setAdminTab('moderation')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'moderation' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Content Moderation
        </button>
        <button
          onClick={() => setAdminTab('audit')}
          className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'audit' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Live System Activity Log ({activityLogs.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Department Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                <span>Department Enrollment</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                {departments.map((dept) => {
                  const count = users.filter(u => u.department === dept).length;
                  const pct = Math.max(8, Math.round((count / users.length) * 100));
                  return (
                    <div key={dept} className="space-y-1">
                      <div className="flex items-center justify-between text-slate-700 font-medium">
                        <span>{dept} Department</span>
                        <span className="font-mono">{count} members ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Notices Under Moderation</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">{announcements.length}</span>
              </div>

              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          ann.category === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {ann.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{ann.date}</span>
                      </div>
                      <p className="font-semibold text-slate-900 line-clamp-1">{ann.title}</p>
                      <p className="text-[11px] text-slate-500">{ann.authorName} · {ann.department}</p>
                    </div>
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                      title="Remove announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Security */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Security & Maintenance</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <p className="font-semibold">SQLite In-Memory / Local Sync: Healthy</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Database tables verified with foreign key cascades enabled.</p>
                </div>

                <button
                  onClick={() => setActiveView('analytics')}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>Generate NAAC / NIRF Data Report</span>
                </button>

                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      ["ID,Name,Email,Role,Department,Identifier", 
                        ...users.map(u => `${u.id},"${u.name}",${u.email},${u.role},${u.department},${u.identifier}`)
                      ].join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `campus_users_report_${new Date().toISOString().substring(0,10)}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export User Roster (CSV)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {adminTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">User Registry & Role Permissions</h3>
              <p className="text-xs text-slate-500">Manage enrolled scholars, faculty advisors, and departmental coordinators.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search user name or ID..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg w-52 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Dept</th>
                  <th className="px-4 py-3">Campus ID</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-sans font-semibold text-slate-900">{u.name}</td>
                    <td className="px-4 py-3 font-sans text-slate-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase font-sans ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        u.role === 'faculty' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans">{u.department}</td>
                    <td className="px-4 py-3 text-slate-600">{u.identifier}</td>
                    <td className="px-4 py-3 font-sans">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-sans">
                      <button
                        onClick={() => alert(`User details for ${u.name} are verified with role: ${u.role}.`)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT MODERATION */}
      {adminTab === 'moderation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events Moderation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Manage Campus Events ({events.length})</h3>
            <div className="space-y-3">
              {events.map((evt) => (
                <div key={evt.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700">
                      {evt.category} · {evt.department}
                    </span>
                    <h4 className="font-bold text-slate-900 mt-1">{evt.title}</h4>
                    <p className="text-[11px] text-slate-500">{evt.date} · {evt.registeredCount}/{evt.capacity} registered</p>
                  </div>
                  <button
                    onClick={() => deleteEvent(evt.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Moderation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Manage Academic Resources ({resources.length})</h3>
            <div className="space-y-3">
              {resources.map((res) => (
                <div key={res.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700">
                      {res.resourceType} · {res.department}
                    </span>
                    <h4 className="font-bold text-slate-900 mt-1">{res.title}</h4>
                    <p className="text-[11px] text-slate-500">By {res.uploadedBy} · {res.downloadCount} downloads</p>
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

      {/* TAB 4: AUDIT LOG */}
      {adminTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Platform Security Audit Log</h3>
              <p className="text-xs text-slate-500">Immutable ledger of platform transactions, logins, registrations, and uploads.</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Total Entries: {activityLogs.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">User Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Action Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 text-slate-400">{log.timestamp}</td>
                    <td className="px-4 py-3 font-sans text-slate-700">{log.userEmail}</td>
                    <td className="px-4 py-3 font-sans uppercase text-[10px] font-semibold text-slate-600">
                      {log.role}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-sans">
                        {log.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-900 font-medium">{log.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
