import React, { useState } from 'react';
import { useApp, ActiveView } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  FileCode, 
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { currentUser, activeView, setActiveView, logout, quickSwitchRole, announcements } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const urgentAnnouncement = announcements.find(a => a.category === 'Urgent');

  const navItems: { label: string; view: ActiveView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Community', view: 'community' },
    { label: 'Events', view: 'events' },
    { label: 'Resources', view: 'resources' },
    { label: 'Opportunities', view: 'opportunities' },
    { label: 'Analytics', view: 'analytics' },
    { label: 'FAQ', view: 'faq' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'faculty':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'student':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Top Academic Ribbon with quick demo role picker for testing */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-indigo-950/60 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CAMPUS DISPATCH
            </span>
            <span className="truncate text-slate-300 text-xs font-medium">
              {urgentAnnouncement ? urgentAnnouncement.title : 'Winter 2026 Academic Term in Session · University Directorate'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <span className="text-slate-400 font-medium hidden md:inline">Quick Demo Switcher:</span>
            <div className="inline-flex rounded-lg shadow-inner bg-slate-900 p-0.5 border border-slate-800">
              <button 
                onClick={() => quickSwitchRole('student')}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  currentUser?.role === 'student' 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Active Student: JANIKSHA M"
              >
                Student (JANIKSHA M)
              </button>
              <button 
                onClick={() => quickSwitchRole('faculty')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  currentUser?.role === 'faculty' 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Faculty
              </button>
              <button 
                onClick={() => quickSwitchRole('admin')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  currentUser?.role === 'admin' 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button 
                onClick={() => quickSwitchRole('guest')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  !currentUser ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Guest
              </button>
            </div>
            
            <button
              onClick={() => setActiveView('flask-deliverables')}
              className="hidden lg:flex items-center gap-1.5 ml-1 text-indigo-300 hover:text-white transition-colors cursor-pointer font-medium"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Flask Source & Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar - Adhering to the Top Bar 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single element brand wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-hidden cursor-pointer"
          >
            {/* University Crest Emblem */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-indigo-600/15 border border-indigo-200/80 group-hover:border-indigo-400 group-hover:scale-105 transition-all">
              <img 
                src="/src/assets/images/campus_crest_emblem_1793962641177.jpg" 
                alt="Campus Connect 360 Crest" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                  CAMPUS CONNECT
                </span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
                  360
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase hidden sm:flex items-center gap-1.5 font-mono">
                <span>Autonomous Academic Intelligence</span>
                <span className="text-slate-300">·</span>
                <span className="text-emerald-700 font-bold">Grade A++</span>
              </p>
            </div>
          </button>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  activeView === item.view 
                    ? 'text-indigo-600 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {activeView === item.view && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}

            {currentUser && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  activeView === 'dashboard' 
                    ? 'text-indigo-600 font-semibold' 
                    : 'text-slate-700 hover:text-indigo-600'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                <span>Dashboard</span>
                {activeView === 'dashboard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-800 text-xs font-medium transition-colors shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:flex items-center gap-2 leading-tight">
                    <div className="max-w-[120px] truncate">
                      <p className="font-semibold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{currentUser.identifier}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      <GraduationCap className="w-3 h-3 text-emerald-600" />
                      <span>{currentUser.role} · {currentUser.department}</span>
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-slate-900 truncate">{currentUser.name}</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                          <GraduationCap className="w-3 h-3" />
                          <span>{currentUser.role} · {currentUser.department}</span>
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] font-mono mt-0.5">{currentUser.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-slate-400 font-mono text-[10px]">ID: {currentUser.identifier}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                        <span>Go to {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('flask-deliverables')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <FileCode className="w-4 h-4 text-indigo-600" />
                        <span>Flask Project Files & Report</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('faq')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <HelpCircle className="w-4 h-4 text-indigo-600" />
                        <span>University FAQ Assistant</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === item.view 
                    ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {currentUser && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeView === 'dashboard' 
                    ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                <span>{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('flask-deliverables')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <FileCode className="w-4 h-4 text-indigo-600" />
              <span>Flask Project Source & Windows Guide</span>
            </button>

            {!currentUser && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Sign In to Campus Connect 360
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
