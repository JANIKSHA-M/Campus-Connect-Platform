import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentDashboard } from './StudentDashboard';
import { FacultyDashboard } from './FacultyDashboard';
import { AdminDashboard } from './AdminDashboard';
import { ShieldCheck, User, Users, GraduationCap } from 'lucide-react';
import { UserRole } from '../types';

export const DashboardContainer: React.FC = () => {
  const { currentUser, quickSwitchRole } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign In Required</h2>
        <p className="text-xs text-slate-500">
          Please sign in or select one of our demo profiles to access the university dashboard.
        </p>
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => quickSwitchRole('student')}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700"
          >
            Launch as Student
          </button>
          <button
            onClick={() => quickSwitchRole('faculty')}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700"
          >
            Launch as Faculty
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Role View Toggle Bar for Evaluation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-xl bg-white border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Viewing Dashboard as:</span>
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              currentUser.role === 'admin' ? 'bg-purple-600' :
              currentUser.role === 'faculty' ? 'bg-blue-600' : 'bg-emerald-600'
            }`} />
            {currentUser.name}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            <GraduationCap className="w-3 h-3 text-emerald-700" />
            <span>{currentUser.role} · {currentUser.department}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px] hidden sm:inline">Switch Active Role:</span>
          <button
            onClick={() => quickSwitchRole('student')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              currentUser.role === 'student' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Student View (JANIKSHA M)
          </button>
          <button
            onClick={() => quickSwitchRole('faculty')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              currentUser.role === 'faculty' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Faculty View
          </button>
          <button
            onClick={() => quickSwitchRole('admin')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              currentUser.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Admin View
          </button>
        </div>
      </div>

      {/* Render Role-Specific Dashboard */}
      {currentUser.role === 'admin' && <AdminDashboard />}
      {currentUser.role === 'faculty' && <FacultyDashboard />}
      {currentUser.role === 'student' && <StudentDashboard />}
    </div>
  );
};
