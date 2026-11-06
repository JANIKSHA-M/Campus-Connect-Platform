import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  DepartmentCode, 
  Announcement, 
  CampusEvent, 
  EventRegistration, 
  AcademicResource, 
  CareerOpportunity, 
  CommunityPost, 
  Comment, 
  ActivityLog 
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_EVENTS, 
  INITIAL_RESOURCES, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_POSTS, 
  INITIAL_COMMENTS, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/initialData';

export type ActiveView = 
  | 'home' 
  | 'community' 
  | 'events' 
  | 'resources' 
  | 'opportunities' 
  | 'analytics' 
  | 'faq' 
  | 'dashboard' 
  | 'flask-deliverables';

interface AppContextType {
  currentUser: User | null;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  users: User[];
  announcements: Announcement[];
  events: CampusEvent[];
  registrations: EventRegistration[];
  resources: AcademicResource[];
  opportunities: CareerOpportunity[];
  posts: CommunityPost[];
  comments: Comment[];
  activityLogs: ActivityLog[];
  
  // Auth actions
  login: (email: string, password?: string, overrideRole?: UserRole) => boolean;
  register: (user: Omit<User, 'id' | 'joinedDate'> & { password?: string }) => { success: boolean; message: string };
  logout: () => void;
  quickSwitchRole: (role: UserRole) => void;

  // Event actions
  registerForEvent: (eventId: string) => { success: boolean; message: string; ticketCode?: string };
  cancelEventRegistration: (registrationId: string) => void;
  isRegisteredForEvent: (eventId: string) => boolean;
  createEvent: (event: Omit<CampusEvent, 'id' | 'registeredCount'>) => void;
  deleteEvent: (eventId: string) => void;

  // Community actions
  createPost: (title: string, content: string, category: CommunityPost['category'], tags: string[]) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;

  // Academic Resources
  uploadResource: (resource: Omit<AcademicResource, 'id' | 'uploadDate' | 'downloadCount'>) => void;
  recordDownload: (resourceId: string) => void;
  deleteResource: (resourceId: string) => void;

  // Opportunities
  createOpportunity: (opp: Omit<CareerOpportunity, 'id' | 'postedDate'>) => void;
  deleteOpportunity: (oppId: string) => void;

  // Announcements & Admin
  publishAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  deleteAnnouncement: (announcementId: string) => void;
  resetDatabaseToDefaults: () => void;
}

const STORAGE_KEY = 'campus_connect_360_db_v3';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_currentUser`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[0]; // Default to student JANIKSHA M
      }
    }
    return INITIAL_USERS[0];
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_announcements`);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState<EventRegistration[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_registrations`);
    if (saved) return JSON.parse(saved);
    // Initial pre-seed registration for demo student JANIKSHA M
    return [
      {
        id: 'reg-demo-1',
        eventId: 'evt-1',
        userId: 'usr-student-1',
        userName: 'JANIKSHA M',
        userEmail: 'janiksha.m@campus.edu',
        userDepartment: 'CSE',
        userIdentifier: 'STU-2024-0104',
        registeredAt: '2026-11-05 10:20',
        ticketCode: 'TECH-84920'
      }
    ];
  });

  const [resources, setResources] = useState<AcademicResource[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_resources`);
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_opportunities`);
    return saved ? JSON.parse(saved) : INITIAL_OPPORTUNITIES;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_posts`);
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_comments`);
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_logs`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_announcements`, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_registrations`, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_resources`, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_opportunities`, JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_posts`, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_comments`, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_logs`, JSON.stringify(activityLogs));
  }, [activityLogs]);

  const logActivity = (action: string, category: ActivityLog['category']) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userEmail: currentUser ? currentUser.email : 'guest@campus.edu',
      role: currentUser ? currentUser.role : 'guest',
      action,
      category
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const login = (email: string, _password?: string, overrideRole?: UserRole): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      const userToSet = overrideRole ? { ...found, role: overrideRole } : found;
      setCurrentUser(userToSet);
      logActivity(`User logged in: ${found.name} (${userToSet.role})`, 'Auth');
      return true;
    }
    // If not found but has valid format, create temporary profile
    if (email.includes('@')) {
      const namePart = email.split('@')[0].replace('.', ' ');
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: formattedName,
        email,
        role: overrideRole || 'student',
        department: 'CSE',
        identifier: `ID-${Math.floor(1000 + Math.random() * 9000)}`,
        joinedDate: new Date().toISOString().substring(0, 10)
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      logActivity(`New user session initiated: ${newUser.name}`, 'Auth');
      return true;
    }
    return false;
  };

  const register = (userData: Omit<User, 'id' | 'joinedDate'> & { password?: string }) => {
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      identifier: userData.identifier || `STU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      semester: userData.semester || 1,
      phone: userData.phone || '',
      joinedDate: new Date().toISOString().substring(0, 10)
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    logActivity(`Registered new ${newUser.role} account: ${newUser.name}`, 'Auth');
    return { success: true, message: `Account created successfully! Welcome to Campus Connect 360, ${newUser.name}.` };
  };

  const logout = () => {
    if (currentUser) {
      logActivity(`User signed out: ${currentUser.name}`, 'Auth');
    }
    setCurrentUser(null);
  };

  const quickSwitchRole = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUser(null);
      setActiveView('home');
      return;
    }
    const demoUser = users.find(u => u.role === role);
    if (demoUser) {
      setCurrentUser(demoUser);
      logActivity(`Switched session role to: ${demoUser.role} (${demoUser.name})`, 'Auth');
    }
  };

  const isRegisteredForEvent = (eventId: string): boolean => {
    if (!currentUser) return false;
    return registrations.some(r => r.eventId === eventId && r.userId === currentUser.id);
  };

  const registerForEvent = (eventId: string) => {
    if (!currentUser) {
      return { success: false, message: 'Please sign in or create an account to register for campus events.' };
    }
    if (isRegisteredForEvent(eventId)) {
      return { success: false, message: 'You are already registered for this event. Check your dashboard for your pass.' };
    }
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return { success: false, message: 'Event not found.' };
    }
    if (event.registeredCount >= event.capacity) {
      return { success: false, message: 'Sorry, this event has reached maximum capacity.' };
    }

    const ticketCode = `TKT-${event.category.substring(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReg: EventRegistration = {
      id: `reg-${Date.now()}`,
      eventId,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userDepartment: currentUser.department,
      userIdentifier: currentUser.identifier,
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ticketCode
    };

    setRegistrations(prev => [newReg, ...prev]);
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));
    logActivity(`Registered for ${event.title} (Ticket: ${ticketCode})`, 'Event');

    return { 
      success: true, 
      message: `Registration confirmed! Your e-pass code is ${ticketCode}. Details added to your dashboard.`,
      ticketCode 
    };
  };

  const cancelEventRegistration = (registrationId: string) => {
    const reg = registrations.find(r => r.id === registrationId);
    if (!reg) return;
    setRegistrations(prev => prev.filter(r => r.id !== registrationId));
    setEvents(prev => prev.map(e => e.id === reg.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e));
    logActivity(`Cancelled registration for event id: ${reg.eventId}`, 'Event');
  };

  const createEvent = (eventData: Omit<CampusEvent, 'id' | 'registeredCount'>) => {
    const newEvent: CampusEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      registeredCount: 0
    };
    setEvents(prev => [newEvent, ...prev]);
    logActivity(`Created campus event: ${newEvent.title}`, 'Event');
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setRegistrations(prev => prev.filter(r => r.eventId !== eventId));
    logActivity(`Deleted event id: ${eventId}`, 'Admin');
  };

  const createPost = (title: string, content: string, category: CommunityPost['category'], tags: string[]) => {
    if (!currentUser) return;
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      category,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorDepartment: currentUser.department,
      authorIdentifier: currentUser.identifier,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      likes: 1,
      tags: tags.length > 0 ? tags : ['General'],
      commentsCount: 0
    };
    setPosts(prev => [newPost, ...prev]);
    logActivity(`Published community discussion: "${title}"`, 'Post');
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser || !content.trim()) return;
    const newComment: Comment = {
      id: `cmt-${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorDepartment: currentUser.department,
      content: content.trim(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setComments(prev => [...prev, newComment]);
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
    logActivity(`Commented on discussion post #${postId.substring(0, 8)}`, 'Post');
  };

  const uploadResource = (resourceData: Omit<AcademicResource, 'id' | 'uploadDate' | 'downloadCount'>) => {
    const newResource: AcademicResource = {
      ...resourceData,
      id: `res-${Date.now()}`,
      uploadDate: new Date().toISOString().substring(0, 10),
      downloadCount: 0
    };
    setResources(prev => [newResource, ...prev]);
    logActivity(`Uploaded academic resource: ${newResource.title}`, 'Resource');
  };

  const recordDownload = (resourceId: string) => {
    setResources(prev => prev.map(r => r.id === resourceId ? { ...r, downloadCount: r.downloadCount + 1 } : r));
    const res = resources.find(r => r.id === resourceId);
    if (res) {
      logActivity(`Downloaded resource: ${res.title}`, 'Resource');
    }
  };

  const deleteResource = (resourceId: string) => {
    setResources(prev => prev.filter(r => r.id !== resourceId));
    logActivity(`Deleted resource id: ${resourceId}`, 'Admin');
  };

  const createOpportunity = (oppData: Omit<CareerOpportunity, 'id' | 'postedDate'>) => {
    const newOpp: CareerOpportunity = {
      ...oppData,
      id: `opp-${Date.now()}`,
      postedDate: new Date().toISOString().substring(0, 10)
    };
    setOpportunities(prev => [newOpp, ...prev]);
    logActivity(`Added career opportunity: ${newOpp.title}`, 'Admin');
  };

  const deleteOpportunity = (oppId: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== oppId));
    logActivity(`Deleted opportunity id: ${oppId}`, 'Admin');
  };

  const publishAnnouncement = (announcementData: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...announcementData,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10)
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logActivity(`Published campus announcement: ${newAnn.title}`, 'Admin');
  };

  const deleteAnnouncement = (announcementId: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    logActivity(`Deleted announcement id: ${announcementId}`, 'Admin');
  };

  const resetDatabaseToDefaults = () => {
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setEvents(INITIAL_EVENTS);
    setRegistrations([
      {
        id: 'reg-demo-1',
        eventId: 'evt-1',
        userId: 'usr-student-1',
        userName: 'JANIKSHA M',
        userEmail: 'janiksha.m@campus.edu',
        userDepartment: 'CSE',
        userIdentifier: 'STU-2024-0104',
        registeredAt: '2026-11-05 10:20',
        ticketCode: 'TECH-84920'
      }
    ]);
    setResources(INITIAL_RESOURCES);
    setOpportunities(INITIAL_OPPORTUNITIES);
    setPosts(INITIAL_POSTS);
    setComments(INITIAL_COMMENTS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeView,
        setActiveView,
        users,
        announcements,
        events,
        registrations,
        resources,
        opportunities,
        posts,
        comments,
        activityLogs,
        login,
        register,
        logout,
        quickSwitchRole,
        registerForEvent,
        cancelEventRegistration,
        isRegisteredForEvent,
        createEvent,
        deleteEvent,
        createPost,
        likePost,
        addComment,
        uploadResource,
        recordDownload,
        deleteResource,
        createOpportunity,
        deleteOpportunity,
        publishAnnouncement,
        deleteAnnouncement,
        resetDatabaseToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
