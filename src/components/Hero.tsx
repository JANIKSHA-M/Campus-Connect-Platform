import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DepartmentCode } from '../types';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Briefcase, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Compass,
  CheckCircle2,
  Clock,
  MapPin,
  Ticket,
  Download,
  GraduationCap,
  MessageSquare,
  ThumbsUp,
  Award,
  ChevronRight,
  TrendingUp,
  Building,
  ExternalLink,
  Bell
} from 'lucide-react';

interface HeroProps {
  onOpenAuth: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  const { 
    currentUser, 
    setActiveView, 
    users, 
    events, 
    resources, 
    opportunities, 
    posts,
    announcements,
    registerForEvent,
    isRegisteredForEvent
  } = useApp();

  const [activeDeptTab, setActiveDeptTab] = useState<DepartmentCode>('CSE');

  // Spotlight event for hero card
  const spotlightEvent = events[0] || {
    id: 'evt-1',
    title: 'Technovate 2026: 36-Hour National Collegiate Hackathon',
    date: '2026-12-01',
    time: '09:00 AM',
    venue: 'Campus Innovation Center, Auditorium B',
    registeredCount: 182,
    capacity: 250,
    category: 'Hackathon',
    department: 'CSE'
  };

  const isSpotlightRegistered = isRegisteredForEvent(spotlightEvent.id);

  // Department data for interactive branch explorer
  const departmentProfiles: Record<DepartmentCode, {
    name: string;
    hod: string;
    subjects: string[];
    placementRate: string;
    activeScholars: number;
    upcomingEvent: string;
    description: string;
  }> = {
    CSE: {
      name: 'Computer Science & Engineering',
      hod: 'Dr. Priya Ramanathan, Ph.D.',
      subjects: ['Design & Analysis of Algorithms', 'Database Systems', 'Cloud & Distributed Computing', 'Deep Learning & AI'],
      placementRate: '98.2%',
      activeScholars: 420,
      upcomingEvent: 'Technovate 2026 Hackathon (Dec 1-2)',
      description: 'Premier department specializing in artificial intelligence, software engineering, systems design, and high-performance computing.'
    },
    IT: {
      name: 'Information Technology',
      hod: 'Prof. Rajesh Kulkarni, M.Tech',
      subjects: ['Cybersecurity & Cryptography', 'DevOps & Microservices', 'Full-Stack Web Engineering', 'Big Data Analytics'],
      placementRate: '96.5%',
      activeScholars: 380,
      upcomingEvent: 'Hands-on Deep Learning Workshop (Nov 18)',
      description: 'Focused on enterprise cloud networks, distributed information systems, and scalable full-stack application frameworks.'
    },
    ECE: {
      name: 'Electronics & Communication Eng',
      hod: 'Dr. S. K. Nair, Ph.D. (IIT)',
      subjects: ['Embedded Systems & ARM', 'VLSI Design & FinFET', 'Digital Signal Processing', 'IoT Sensor Networks'],
      placementRate: '92.4%',
      activeScholars: 340,
      upcomingEvent: 'VLSI Circuit Design Seminar (Nov 20)',
      description: 'Leading research in semiconductor architecture, microcontrollers, embedded firmware, and modern telecommunications.'
    },
    MECH: {
      name: 'Mechanical Engineering',
      hod: 'Dr. Vikram Joshi, Ph.D.',
      subjects: ['Finite Element Analysis', 'Thermodynamics & Heat Transfer', 'EV Powertrain Dynamics', 'CAD/CAM Robotics'],
      placementRate: '89.6%',
      activeScholars: 290,
      upcomingEvent: 'Electric Mobility & Clean Energy Symposium (Nov 25)',
      description: 'Pioneering sustainable automotive design, automated robotics manufacturing, and structural stress modeling.'
    },
    BIOTECH: {
      name: 'Biotechnology & Bio-informatics',
      hod: 'Dr. Sunita Rao, Ph.D.',
      subjects: ['Genomics & Proteomics', 'Bioprocess Engineering', 'Drug Discovery & AI', 'Molecular Diagnostics'],
      placementRate: '88.1%',
      activeScholars: 210,
      upcomingEvent: 'Computational Genomics Masterclass',
      description: 'Interdisciplinary research bridging biological data modeling, CRISPR mechanics, and synthetic bio-manufacturing.'
    },
    CIVIL: {
      name: 'Civil & Environmental Engineering',
      hod: 'Prof. Anand Deshmukh, M.E.',
      subjects: ['Structural Dynamics & Earthquake Eng', 'Geotechnical Mechanics', 'Smart City Urban Planning', 'Hydrology'],
      placementRate: '87.4%',
      activeScholars: 240,
      upcomingEvent: 'Smart Urban Infrastructure Conference',
      description: 'Designing resilient sustainable infrastructure, green building modeling, and seismic structural analysis.'
    },
    MBA: {
      name: 'School of Management Studies',
      hod: 'Dean Marcus Vance, MBA, Ph.D.',
      subjects: ['Product Management & Strategy', 'Financial Technology & Analytics', 'Operations & Logistics', 'Venture Capital'],
      placementRate: '95.0%',
      activeScholars: 260,
      upcomingEvent: 'Annual Campus Placement & Career Fair (Dec 10)',
      description: 'Nurturing tech leaders, venture strategists, and data-driven product managers for global enterprises.'
    },
    GENERAL: {
      name: 'General Sciences & Humanities',
      hod: 'Dean Marcus Vance',
      subjects: ['Engineering Mathematics', 'Applied Physics', 'Technical Communication', 'Environmental Science'],
      placementRate: 'N/A',
      activeScholars: 500,
      upcomingEvent: 'University Foundation Day Celebrations',
      description: 'Foundational sciences and multidisciplinary humanities for first-year engineering cohorts.'
    }
  };

  const currentDept = departmentProfiles[activeDeptTab] || departmentProfiles.CSE;

  return (
    <div className="w-full space-y-0">
      {/* 1. HERO SECTION: Cinematic University Hub */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Architectural backdrop glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left 7 Columns: Vision, Identity & Calls-to-action */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Pill & Live Session Context */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>NAAC A++ Autonomous University Ecosystem</span>
                </div>

                {currentUser && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Active: {currentUser.name} ({currentUser.department})</span>
                  </span>
                )}
              </div>

              {/* Bold Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
                Your Campus. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">Your Community.</span> Your Opportunities.
              </h1>

              {/* Lead Subtitle */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Campus Connect 360 is the centralized digital nerve-centre bringing together academic resource repositories, departmental announcements, hackathon ticketing, and real-time student engagement analytics.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {currentUser ? (
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Launch {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onOpenAuth}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Join University Portal</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => setActiveView('community')}
                      className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    >
                      Explore Student Forum
                    </button>
                  </>
                )}

                <button
                  onClick={() => setActiveView('events')}
                  className="px-5 py-3.5 rounded-xl font-medium text-xs text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Upcoming Hackathons ({events.length})</span>
                </button>
              </div>

              {/* Quick Institutional Pillars */}
              <div className="pt-6 border-t border-slate-800/90 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="space-y-0.5">
                  <span className="font-bold text-white text-sm font-mono block">100% Verified</span>
                  <span className="text-[11px] text-slate-400">Past Papers & Syllabus</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-emerald-400 text-sm font-mono block">Instant E-Passes</span>
                  <span className="text-[11px] text-slate-400">One-Click Registrations</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-purple-300 text-sm font-mono block">Python Analytics</span>
                  <span className="text-[11px] text-slate-400">Pandas & SQLite Engine</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive "Live Campus Atrium" Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
                {/* Header of the Atrium card */}
                <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono font-bold text-white tracking-wider uppercase text-[11px]">
                      CAMPUS SPOTLIGHT · WINTER 2026
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px] font-mono">SEMESTER 5</span>
                </div>

                {/* Hero Graphic Container with Scrim */}
                <div className="relative h-56 sm:h-64 overflow-hidden group">
                  <img 
                    src="/src/assets/images/campus_hero_banner_1793962641319.jpg" 
                    alt="University Campus Innovation Atrium" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/90 text-white w-max mb-1.5 font-mono">
                      FEATURED EVENT
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {spotlightEvent.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" /> {spotlightEvent.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Auditorium B
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action & Live Seats Counter */}
                <div className="p-5 bg-slate-900 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Seat Reservation:</span>
                      <span className="text-white font-bold">{spotlightEvent.registeredCount} / {spotlightEvent.capacity} Claimed</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        style={{ width: `${(spotlightEvent.registeredCount / spotlightEvent.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    {isSpotlightRegistered ? (
                      <div className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Pass Confirmed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (!currentUser) onOpenAuth();
                          else {
                            const res = registerForEvent(spotlightEvent.id);
                            alert(res.message);
                          }
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>Claim Digital Pass</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveView('events')}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
                    >
                      All Events
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE ANNOUNCEMENT NOTICE RIBBON */}
      <section className="bg-slate-900 border-y border-slate-800 py-3 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              CAMPUS DISPATCH:
            </span>
          </div>

          <div className="flex-1 truncate text-slate-300 flex items-center gap-3">
            {announcements.slice(0, 2).map((ann, idx) => (
              <span key={ann.id} className="truncate">
                <strong className="text-indigo-400">[{ann.category}]</strong> {ann.title} · {ann.date}
                {idx === 0 && announcements.length > 1 && <span className="mx-2 text-slate-600">|</span>}
              </span>
            ))}
          </div>

          <button
            onClick={() => setActiveView('dashboard')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 shrink-0 flex items-center gap-1"
          >
            <span>Notice Board</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. DYNAMIC INSTITUTIONAL METRICS COUNTER */}
      <section className="bg-white border-b border-slate-200 py-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-colors">
              <div className="flex items-center justify-center text-indigo-600 mb-2">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {users.length * 150 + 24}
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">Enrolled Scholars</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Across 7 Departments</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-center text-purple-600 mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {events.length}
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">Active Campus Events</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Hackathons & Workshops</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-center text-blue-600 mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {resources.length * 40 + 8}
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">Verified Study Notes</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Solved Question Papers</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-center text-emerald-600 mb-2">
                <Briefcase className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {opportunities.length}
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">Career Openings</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Internships & Grants</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-colors col-span-2 md:col-span-1">
              <div className="flex items-center justify-center text-amber-600 mb-2">
                <BarChart3 className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                98.4%
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">Placement Index</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Top Tier Recruiters</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MASTERWORK BENTO GRID: Platform Highlights */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-mono">
              COMPREHENSIVE ECOSYSTEM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              One Unified Workspace for University Life
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Replacing fragmented messaging groups and physical notice boards with authenticated student workflows and institutional data science.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Bento Card 1: Student Community (Spans 2 columns) */}
            <div 
              onClick={() => setActiveView('community')}
              className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-xl hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    {posts.length} Active Discussions
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Intelligent Student Community
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Collaborate on engineering projects, ask algorithmic questions, find hackathon teammates, and seek guidance from seniors and faculty mentors.
                  </p>
                </div>

                {/* Live Post Snippet Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-slate-900">JANIKSHA M · CSE Department</span>
                    <span className="font-mono">Nov 4, 14:30</span>
                  </div>
                  <p className="text-slate-700 font-medium line-clamp-2">
                    "Tips for mastering Dynamic Programming for upcoming campus placements? Formulating state transitions..."
                  </p>
                  <div className="flex items-center gap-4 pt-1 text-[11px] text-indigo-600 font-semibold">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> 19 Upvotes</span>
                    <span>3 Faculty Replies</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                <span>Open Community Discussions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Bento Card 2: Campus Hackathons Showcase */}
            <div 
              onClick={() => setActiveView('events')}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-purple-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img 
                  src="/src/assets/images/campus_event_hackathon_1793962642137.jpg" 
                  alt="Student Hackathon" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono uppercase font-bold text-purple-300">COMPETITIONS</span>
                  <h4 className="text-sm font-bold text-white">Technovate 2026</h4>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Discover college hackathons, technical symposiums, and robotics challenges. Instant e-passes with duplicate guards.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600">
                  <span>Browse Campus Events</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Bento Card 3: Academic Resource Centre */}
            <div 
              onClick={() => setActiveView('resources')}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img 
                  src="/src/assets/images/academic_library_study_1793962642265.jpg" 
                  alt="University Library Study" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-300">REPOSITORY</span>
                  <h4 className="text-sm font-bold text-white">Academic Resources</h4>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  5 years of previous university question papers, verified lecture notes, and lab manuals organized by branch & semester.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  <span>Access Notes & Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Bento Card 4: Career & Opportunities (Spans 2 columns on lg) */}
            <div 
              onClick={() => setActiveView('opportunities')}
              className="lg:col-span-2 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-3xl border border-slate-800 p-8 shadow-xl hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Vetted Placement Cell
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Career Opportunities & Fellowships
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Direct access to Google Engineering, Bosch Automotive, and IISc Summer Research Fellowships with active deadline trackers.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                    <span className="text-[10px] text-emerald-300 font-mono uppercase">Google India</span>
                    <p className="font-bold text-white truncate">SWE Summer Intern 2027</p>
                    <p className="text-slate-400 text-[11px] font-mono">$1,200/mo · Deadline Nov 30</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                    <span className="text-[10px] text-emerald-300 font-mono uppercase">IISc Bangalore</span>
                    <p className="font-bold text-white truncate">Undergrad Summer Fellowship</p>
                    <p className="text-slate-400 text-[11px] font-mono">Full Grant · Deadline Dec 15</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <span>Explore Vetted Opportunities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Bento Card 5: Python & Pandas Analytics */}
            <div 
              onClick={() => setActiveView('analytics')}
              className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Data Science Capstone
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Institutional Data Science Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Powered by Python 3.12, Pandas DataFrames, and Chart.js telemetry calculating actual student participation curves and event utilization rates.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-mono">CSE SHARE</span>
                    <span className="font-bold text-indigo-600 text-sm font-mono">42.8%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-mono">AVG CAPACITY</span>
                    <span className="font-bold text-purple-600 text-sm font-mono">180 Seats</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-mono">FILL RATE</span>
                    <span className="font-bold text-emerald-600 text-sm font-mono">92.4%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-600">
                <span>View Full Analytics Charts & Pandas Pipeline</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE BRANCH EXPLORER: "Academic Departments at a Glance" */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-mono">
                ACADEMIC CURRICULUM
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                Explore Engineering & Management Departments
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Select any department to inspect syllabus modules, HOD credentials, and active student participation.
            </p>
          </div>

          {/* Department Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
            {(['CSE', 'IT', 'ECE', 'MECH', 'BIOTECH', 'CIVIL', 'MBA'] as DepartmentCode[]).map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDeptTab(dept)}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeDeptTab === dept
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept} Department
              </button>
            ))}
          </div>

          {/* Department Detail Showcase Card */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800 font-mono">
                    {activeDeptTab} DIRECTORY
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Head of Department: {currentDept.hod}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900">
                  {currentDept.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentDept.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase font-mono mb-2">
                    Key Course Modules & Question Papers Available:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentDept.subjects.map((sub, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2 text-slate-700 font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Department Statistics Box */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider border-b border-slate-100 pb-2">
                  Departmental Metrics & Highlights
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Placement Conversion:</span>
                    <span className="font-bold text-emerald-600 font-mono text-sm">{currentDept.placementRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Active Department Scholars:</span>
                    <span className="font-bold text-slate-900 font-mono">{currentDept.activeScholars}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-mono">Upcoming Event / Review:</span>
                    <span className="font-semibold text-purple-700 text-xs block mt-0.5">{currentDept.upcomingEvent}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView('resources')}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {activeDeptTab} Question Papers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION & SOURCE CODE FOOTPRINT BANNER */}
      <section className="py-16 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold tracking-tight">
              Ready for Academic Evaluation & Deployment?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Inspect the complete working Python 3.12 Flask code, SQLite database schema, test checklist, and PowerPoint presentation slides.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('flask-deliverables')}
              className="px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-xs shadow-lg hover:bg-indigo-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Open Flask Deliverables Hub</span>
            </button>
            <button
              onClick={() => setActiveView('faq')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Ask FAQ Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
