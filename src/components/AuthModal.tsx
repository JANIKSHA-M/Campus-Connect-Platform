import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, DepartmentCode } from '../types';
import { X, Lock, Mail, User as UserIcon, Building2, Hash, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const { login, register, quickSwitchRole } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('student');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regDepartment, setRegDepartment] = useState<DepartmentCode>('CSE');
  const [regIdentifier, setRegIdentifier] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('student');
  const [regSemester, setRegSemester] = useState<number>(3);

  // Status feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your university email address.');
      return;
    }

    const ok = login(loginEmail, loginPassword, loginRole);
    if (ok) {
      setSuccessMessage('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setErrorMessage('Invalid credentials. Please verify your email or use a demo account.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    const result = register({
      name: regName.trim(),
      email: regEmail.trim(),
      role: regRole,
      department: regDepartment,
      identifier: regIdentifier.trim() || `${regRole === 'faculty' ? 'FAC' : 'STU'}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      semester: regRole === 'student' ? regSemester : undefined
    });

    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setErrorMessage(result.message);
    }
  };

  const selectDemo = (role: UserRole) => {
    quickSwitchRole(role);
    setSuccessMessage(`Switched session to Demo ${role.toUpperCase()}!`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
              CAMPUS SECURITY & RBAC
            </span>
            <h3 className="text-base font-bold">
              {mode === 'login' ? 'Sign In to Campus Connect 360' : 'Student & Faculty Registration'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Credentials Helper */}
        <div className="bg-indigo-50/80 px-6 py-2.5 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-indigo-900 font-medium">1-Click Demo Profiles:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => selectDemo('student')}
              className="px-2.5 py-1 rounded-md bg-white border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 shadow-2xs"
            >
              Demo Student (JANIKSHA M)
            </button>
            <button
              type="button"
              onClick={() => selectDemo('faculty')}
              className="px-2.5 py-1 rounded-md bg-white border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 shadow-2xs"
            >
              Demo Faculty
            </button>
            <button
              type="button"
              onClick={() => selectDemo('admin')}
              className="px-2.5 py-1 rounded-md bg-white border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 shadow-2xs"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Registered Login
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              New Registration
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  University Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. janiksha.m@campus.edu"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Hint: Try janiksha.m@campus.edu or priya.raman@campus.edu</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Target Portal / Role
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="student">Student Portal</option>
                  <option value="faculty">Faculty Portal</option>
                  <option value="admin">Institutional Administrator Portal</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <span>Authorize & Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Maya Krishnan"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    University Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="maya@campus.edu"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Role *
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty Member</option>
                    <option value="admin">Campus Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Department *
                  </label>
                  <select
                    value={regDepartment}
                    onChange={(e) => setRegDepartment(e.target.value as DepartmentCode)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="CSE">Computer Science & Eng (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="ECE">Electronics & Comm (ECE)</option>
                    <option value="MECH">Mechanical Eng (MECH)</option>
                    <option value="BIOTECH">Biotechnology (BIOTECH)</option>
                    <option value="CIVIL">Civil Eng (CIVIL)</option>
                    <option value="MBA">Management Studies (MBA)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {regRole === 'faculty' ? 'Faculty ID' : 'Student Enrollment ID'}
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      value={regIdentifier}
                      onChange={(e) => setRegIdentifier(e.target.value)}
                      placeholder={regRole === 'faculty' ? 'FAC-CSE-024' : 'STU-2026-0812'}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {regRole === 'student' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Current Semester
                    </label>
                    <select
                      value={regSemester}
                      onChange={(e) => setRegSemester(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={s}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Create University Account</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
