import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, resetDatabaseToDefaults } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                CAMPUS CONNECT 360
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              An intelligent student community, campus engagement, and academic support analytics platform uniting university scholars, faculty mentors, and departmental administrators.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> Academic Accreditation Grade A++
              </span>
              <span>·</span>
              <span>Autonomous Institute</span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('community')} className="hover:text-white transition-colors">
                  Student Community Forum
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('events')} className="hover:text-white transition-colors">
                  Campus Events & Workshops
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('resources')} className="hover:text-white transition-colors">
                  Academic Resource Centre
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('opportunities')} className="hover:text-white transition-colors">
                  Career & Internships Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('analytics')} className="hover:text-white transition-colors">
                  Institutional Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Academic Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition-colors">
                  Student & Faculty Dashboards
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faq')} className="hover:text-white transition-colors">
                  Campus Knowledge Base & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('flask-deliverables')} className="hover:text-white transition-colors text-indigo-400">
                  Python/Flask Source Code
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (window.confirm('Reset all demo data back to default values?')) {
                      resetDatabaseToDefaults();
                    }
                  }} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Reset Demo Database
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: University Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Campus Directorate
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                <span>Central Campus Innovation Block, Tech Hub 360, University Road</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                <span>campusconnect@university.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                <span>+1 (800) 555-CAMPUS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Campus Connect 360. Final Year Engineering Capstone & Academic Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Architecture: Python 3.12 · Flask · SQLite · Pandas · Chart.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
