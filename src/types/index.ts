export type UserRole = 'student' | 'faculty' | 'admin' | 'guest';

export type DepartmentCode = 
  | 'CSE' 
  | 'ECE' 
  | 'MECH' 
  | 'IT' 
  | 'BIOTECH' 
  | 'MBA' 
  | 'CIVIL' 
  | 'GENERAL';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: DepartmentCode;
  identifier: string; // e.g. "STU-2024-042" or "FAC-CSE-018"
  avatar?: string;
  joinedDate: string;
  semester?: number;
  phone?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Urgent' | 'Academic' | 'Event' | 'General';
  department: DepartmentCode | 'ALL';
  authorName: string;
  authorRole: UserRole;
  date: string;
  pinned?: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: 'Hackathon' | 'Workshop' | 'Seminar' | 'Cultural' | 'Career Fair' | 'Sports';
  department: DepartmentCode;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  registeredCount: number;
  organizer: string;
  contactEmail: string;
  imageUrl?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userDepartment: DepartmentCode;
  userIdentifier: string;
  registeredAt: string;
  ticketCode: string;
}

export interface AcademicResource {
  id: string;
  title: string;
  subject: string;
  department: DepartmentCode;
  semester: number;
  resourceType: 'Lecture Notes' | 'Previous Question Paper' | 'Lab Manual' | 'Reference E-Book' | 'Syllabus';
  fileFormat: 'PDF' | 'DOCX' | 'ZIP' | 'PPTX';
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  downloadCount: number;
  description: string;
  downloadUrl?: string;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  companyOrOrg: string;
  category: 'Internship' | 'Workshop' | 'Scholarship' | 'Competition' | 'Certification';
  location: string;
  stipendOrGrant: string;
  eligibility: string;
  deadline: string;
  applyLink: string;
  description: string;
  departmentScope: DepartmentCode | 'ALL';
  postedBy: string;
  postedDate: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: 'Academic Discussion' | 'Campus Life' | 'Project Collaboration' | 'Career Advice' | 'Q&A';
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorDepartment: DepartmentCode;
  authorIdentifier: string;
  createdAt: string;
  likes: number;
  tags: string[];
  commentsCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorDepartment: DepartmentCode;
  content: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userEmail: string;
  role: UserRole;
  action: string;
  category: 'Auth' | 'Event' | 'Resource' | 'Post' | 'Admin';
}

export interface FAQItem {
  id: string;
  category: 'Campus Events' | 'Registration & Login' | 'Academic Resources' | 'Internships & Careers' | 'Platform Usage';
  question: string;
  answer: string;
  keywords: string[];
}
