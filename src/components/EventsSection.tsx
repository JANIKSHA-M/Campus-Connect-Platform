import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CampusEvent, DepartmentCode } from '../types';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  Ticket, 
  X, 
  Sparkles,
  Mail,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { 
    currentUser, 
    events, 
    registrations, 
    registerForEvent, 
    isRegisteredForEvent, 
    createEvent,
    cancelEventRegistration 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'myEvents'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Confirmation modal
  const [confirmationTicket, setConfirmationTicket] = useState<{
    eventName: string;
    ticketCode: string;
    venue: string;
    dateTime: string;
  } | null>(null);

  // New Event Modal (for faculty/admin)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CampusEvent['category']>('Workshop');
  const [newDept, setNewDept] = useState<DepartmentCode>('CSE');
  const [newVenue, setNewVenue] = useState('');
  const [newDate, setNewDate] = useState('2026-12-05');
  const [newTime, setNewTime] = useState('10:00 AM - 04:00 PM');
  const [newCapacity, setNewCapacity] = useState(100);
  const [newDescription, setNewDescription] = useState('');

  const categories = ['All', 'Hackathon', 'Workshop', 'Seminar', 'Cultural', 'Career Fair'];
  const departments = ['All', 'CSE', 'IT', 'ECE', 'MECH', 'BIOTECH', 'CIVIL'];

  const filteredEvents = events.filter((e) => {
    const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesDept = selectedDept === 'All' || e.department === selectedDept;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDept && matchesSearch;
  });

  const myRegistrations = currentUser 
    ? registrations.filter(r => r.userId === currentUser.id)
    : [];

  const handleRegisterClick = (event: CampusEvent) => {
    if (!currentUser) {
      alert('Please sign in with a student or faculty account to register for events.');
      return;
    }

    const res = registerForEvent(event.id);
    if (res.success && res.ticketCode) {
      // Trigger festive celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setConfirmationTicket({
        eventName: event.title,
        ticketCode: res.ticketCode,
        venue: event.venue,
        dateTime: `${event.date} · ${event.time}`
      });
    } else {
      alert(res.message);
    }
  };

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVenue.trim()) return;

    createEvent({
      title: newTitle.trim(),
      description: newDescription.trim() || 'Comprehensive campus technical activity for student development.',
      category: newCategory,
      department: newDept,
      venue: newVenue.trim(),
      date: newDate,
      time: newTime,
      capacity: Number(newCapacity),
      organizer: `${newDept} Academic Society`,
      contactEmail: currentUser ? currentUser.email : 'events@campus.edu'
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewVenue('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[11px] font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Engagement System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Campus Events, Hackathons & Seminars
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
            Explore inter-collegiate tech symposiums, workshops, and career fairs with instant seat reservation and digital passes.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {(currentUser?.role === 'faculty' || currentUser?.role === 'admin') && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          )}

          <div className="inline-flex p-1 bg-white/10 rounded-xl border border-white/20 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'all' ? 'bg-white text-indigo-950 font-bold shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('myEvents')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'myEvents' ? 'bg-white text-indigo-950 font-bold shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>My Passes ({myRegistrations.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {activeTab === 'all' && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-purple-600 text-white shadow-2xs' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Department selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">Department:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
                ))}
              </select>

              {/* Search */}
              <div className="relative w-48 sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search events, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALL EVENTS GRID */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const registered = isRegisteredForEvent(event.id);
            const isFull = event.registeredCount >= event.capacity;

            return (
              <div 
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Event Thumbnail with Scrim (§1.F) */}
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    {event.imageUrl ? (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-white/30" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-white/90 text-slate-900 uppercase tracking-wider backdrop-blur-xs font-mono">
                        {event.department} · {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-mono">{event.date} · {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>

                    {/* Progress Bar of capacity */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
                        <span>Seat Capacity</span>
                        <span className="font-bold text-slate-800">
                          {event.registeredCount} / {event.capacity} Filled
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-purple-600'}`}
                          style={{ width: `${Math.min(100, (event.registeredCount / event.capacity) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  {registered ? (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Registered · Pass Confirmed</span>
                    </div>
                  ) : isFull ? (
                    <button 
                      disabled
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed text-center"
                    >
                      Registration Closed (Full)
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegisterClick(event)}
                      className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Register for Event</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MY REGISTERED PASSES VIEW */}
      {activeTab === 'myEvents' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">My Confirmed Event Passes</h3>
            <p className="text-xs text-slate-500 mb-6">
              Present these digital pass codes at the campus venue checkpoint for entry verification.
            </p>

            {myRegistrations.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                <Ticket className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">You haven't registered for any events yet</p>
                <p className="text-xs text-slate-400 mt-1">Browse upcoming hackathons and symposiums to secure your pass.</p>
                <button
                  onClick={() => setActiveTab('all')}
                  className="mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700"
                >
                  Browse Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myRegistrations.map((reg) => {
                  const event = events.find(e => e.id === reg.eventId);
                  return (
                    <div 
                      key={reg.id}
                      className="p-5 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/50 to-indigo-50/30 shadow-2xs space-y-4 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700 uppercase">
                          {event?.category || 'Event'}
                        </span>
                        <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Valid E-Pass
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{event?.title}</h4>
                        <div className="space-y-1 text-xs text-slate-600 mt-2">
                          <p className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {event?.date} · {event?.time}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {event?.venue}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-purple-200/60 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Pass Token</span>
                          <span className="text-xs font-mono font-extrabold text-purple-700 bg-white px-2.5 py-1 rounded-md border border-purple-300 inline-block mt-0.5">
                            {reg.ticketCode}
                          </span>
                        </div>

                        <button
                          onClick={() => cancelEventRegistration(reg.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-semibold"
                        >
                          Cancel Pass
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONFIRMATION TICKET POPUP */}
      {confirmationTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
                REGISTRATION CONFIRMED
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {confirmationTicket.eventName}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Venue:</span>
                <span className="font-semibold text-slate-800">{confirmationTicket.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-semibold text-slate-800">{confirmationTicket.dateTime}</span>
              </div>
              <div className="pt-2 border-t border-purple-200/80 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Digital E-Pass Code:</span>
                <span className="font-mono font-extrabold text-sm text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-300">
                  {confirmationTicket.ticketCode}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              A copy has been pinned to your dashboard. Duplicate registration prevention is active.
            </p>

            <button
              onClick={() => setConfirmationTicket(null)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Done & Return to Events
            </button>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-purple-950 px-6 py-4 flex items-center justify-between text-white border-b border-purple-900">
              <h3 className="text-base font-bold">Create Campus Event</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-purple-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEventSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Autonomous Robotics Hackathon 2026"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Career Fair">Career Fair</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="BIOTECH">BIOTECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time *</label>
                  <input
                    type="text"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 AM - 04:00 PM"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Venue *</label>
                  <input
                    type="text"
                    required
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="Campus Auditorium Hall A"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seat Capacity *</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline topics, eligibility, prizes, and schedule..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
