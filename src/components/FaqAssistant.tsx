import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQItem } from '../types';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  BookOpen,
  Calendar,
  Key,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const FaqAssistant: React.FC = () => {
  const { setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Campus Events',
      question: 'How do I register for campus hackathons, workshops, and symposiums?',
      answer: 'Navigate to the "Events" tab on Campus Connect 360. Browse the active event catalog, select an event, and click "Register for Event". Your registration is confirmed immediately, and a unique digital E-Pass token (e.g. TKT-HAC-84920) is generated and saved under your profile.',
      keywords: ['register', 'event', 'hackathon', 'workshop', 'symposium', 'pass', 'ticket']
    },
    {
      id: 'faq-2',
      category: 'Registration & Login',
      question: 'How do I resolve login errors, or what if I forgot my credentials?',
      answer: 'Campus Connect 360 uses your registered university email (e.g. yourname@campus.edu). If you encounter authentication issues, you can sign in with your student or faculty credentials. For quick demo evaluation, use the 1-click Demo Profiles (Student, Faculty, Admin) at the top of the login modal.',
      keywords: ['login', 'password', 'forgot', 'reset', 'credentials', 'sign in', 'account']
    },
    {
      id: 'faq-3',
      category: 'Academic Resources',
      question: 'Where can I access previous university question papers and lecture notes?',
      answer: 'Open the "Resources" tab. You can filter study materials by department (CSE, ECE, MECH, IT, etc.), semester (1 through 8), and document category (Lecture Notes, Question Papers, Lab Manuals). You can view an instant preview or download verified PDF bundles.',
      keywords: ['notes', 'question paper', 'study material', 'lab manual', 'syllabus', 'download', 'pdf']
    },
    {
      id: 'faq-4',
      category: 'Academic Resources',
      question: 'Can faculty members upload new study materials and lab manuals?',
      answer: 'Yes! Faculty members have full publishing privileges. From the Faculty Dashboard or the Academic Resources tab, click "Upload Study Material", specify the subject code, semester, and curriculum details. Uploaded materials immediately become available to students.',
      keywords: ['faculty', 'upload', 'materials', 'study', 'curriculum', 'share notes']
    },
    {
      id: 'faq-5',
      category: 'Internships & Careers',
      question: 'How do I apply for campus internships and scholarships?',
      answer: 'Visit the "Opportunities" portal. Every listing displays vetted corporate partnerships, eligibility CGPA requirements, monthly stipends, and deadlines. Click "View & Apply" to review the full job description and access the direct application portal.',
      keywords: ['internship', 'job', 'scholarship', 'career', 'stipend', 'placement', 'apply']
    },
    {
      id: 'faq-6',
      category: 'Platform Usage',
      question: 'What are the role permissions for Student vs Faculty vs Administrator?',
      answer: 'Students can participate in discussions, register for events, and access notes. Faculty can publish announcements, verify student event registrations, and upload syllabus notes. Administrators govern user rosters, oversee all departments, and inspect data science analytics.',
      keywords: ['roles', 'permissions', 'student', 'faculty', 'admin', 'rbac', 'access']
    },
    {
      id: 'faq-7',
      category: 'Platform Usage',
      question: 'How does Campus Connect 360 prevent duplicate event registrations?',
      answer: 'The platform checks the relational link between your student ID and the event ID in real time. Once registered, the action button updates to "Registered · Pass Confirmed", preventing duplicate submissions and ensuring fair seat allocation.',
      keywords: ['duplicate', 'seats', 'capacity', 'ticket', 're-register', 'prevention']
    }
  ];

  const categories = ['All', 'Campus Events', 'Registration & Login', 'Academic Resources', 'Internships & Careers', 'Platform Usage'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.keywords.some(k => k.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  const promptSuggestions = [
    'How do I get an event pass?',
    'Can faculty upload notes?',
    'Where do I find hackathons?',
    'How to resolve login problems?'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Built-in Instant Campus Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions & Help Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Instant guidance for event registrations, academic notes access, login troubleshooting, and role permissions.
        </p>
      </div>

      {/* Interactive Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Type your question or keywords (e.g. event pass, upload notes, login)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* Suggested Prompts */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Suggestions:</span>
          {promptSuggestions.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setSearchQuery(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-xs transition-colors"
            >
              {prompt}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-red-600 hover:underline text-xs ml-auto"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-2xs' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-500">
              Try rephrasing your question or contact the Academic Directorate at helpdesk@campus.edu.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase text-indigo-600 font-mono">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 space-y-3">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                    
                    <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
                      <span>Related Keywords:</span>
                      {faq.keywords.map(k => (
                        <span key={k} className="text-slate-500 font-mono">#{k}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Emergency Help Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-sm">Need In-Person Support on Campus?</h4>
          <p className="text-slate-400 mt-0.5">Visit the Student Affairs Help Desk, Academic Block B, Room 102 (Mon - Fri, 9 AM - 5 PM).</p>
        </div>
        <button
          onClick={() => setActiveView('dashboard')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shrink-0"
        >
          Go to Student Portal
        </button>
      </div>
    </div>
  );
};
