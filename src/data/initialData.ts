import { 
  User, 
  CampusEvent, 
  AcademicResource, 
  CareerOpportunity, 
  CommunityPost, 
  Comment, 
  Announcement, 
  FAQItem,
  ActivityLog 
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-student-1',
    name: 'JANIKSHA M',
    email: 'janiksha.m@campus.edu',
    role: 'student',
    department: 'CSE',
    identifier: 'STU-2024-0104',
    joinedDate: '2024-08-15',
    semester: 5,
    phone: '+91 98765 43210'
  },
  {
    id: 'usr-student-2',
    name: 'Sneha Patel',
    email: 'sneha.patel@campus.edu',
    role: 'student',
    department: 'ECE',
    identifier: 'STU-2024-0231',
    joinedDate: '2024-08-18',
    semester: 3,
    phone: '+91 98765 43211'
  },
  {
    id: 'usr-student-3',
    name: 'Rohan Verma',
    email: 'rohan.verma@campus.edu',
    role: 'student',
    department: 'IT',
    identifier: 'STU-2023-0098',
    joinedDate: '2023-08-20',
    semester: 7,
    phone: '+91 98765 43212'
  },
  {
    id: 'usr-faculty-1',
    name: 'Dr. Priya Ramanathan',
    email: 'priya.raman@campus.edu',
    role: 'faculty',
    department: 'CSE',
    identifier: 'FAC-CSE-004',
    joinedDate: '2019-01-10',
    phone: '+91 98765 11223'
  },
  {
    id: 'usr-faculty-2',
    name: 'Prof. Rajesh Kulkarni',
    email: 'rajesh.k@campus.edu',
    role: 'faculty',
    department: 'MECH',
    identifier: 'FAC-MEC-012',
    joinedDate: '2020-07-01',
    phone: '+91 98765 11224'
  },
  {
    id: 'usr-admin-1',
    name: 'Marcus Vance (Dean of Academic Affairs)',
    email: 'admin@campus.edu',
    role: 'admin',
    department: 'GENERAL',
    identifier: 'ADM-EXEC-001',
    joinedDate: '2018-06-15',
    phone: '+91 98765 99999'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Semester End Examination Schedule - Winter 2026',
    content: 'The Office of the Controller of Examinations has published the final timetable for the End Semester Theory & Laboratory examinations. Hall tickets can be downloaded from the student portal starting Nov 12.',
    category: 'Urgent',
    department: 'ALL',
    authorName: 'Office of Academic Affairs',
    authorRole: 'admin',
    date: '2026-11-04',
    pinned: true
  },
  {
    id: 'ann-2',
    title: 'Annual Inter-Collegiate Hackathon "Technovate 360" Announced',
    content: 'Department of Computer Science & Engineering is organizing Technovate 360 on Dec 1-2. Cash prizes up to $5,000 with recruitment fast-tracks. Registrations open on the Events tab!',
    category: 'Event',
    department: 'CSE',
    authorName: 'Dr. Priya Ramanathan',
    authorRole: 'faculty',
    date: '2026-11-02',
    pinned: true
  },
  {
    id: 'ann-3',
    title: 'Campus Central Library Extended Study Hours for Mid-Terms',
    content: 'The Central Library and Digital Learning Commons will remain open until 2:00 AM on weekdays throughout November to assist students with project submissions and revisions.',
    category: 'Academic',
    department: 'ALL',
    authorName: 'Chief Librarian',
    authorRole: 'faculty',
    date: '2026-10-28',
    pinned: false
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'Technovate 2026: 36-Hour National Collegiate Hackathon',
    description: 'Build innovative AI, IoT, and Cloud solutions in teams of 2-4. Judged by senior engineers from leading technology firms with incubation grants and mentorship.',
    category: 'Hackathon',
    department: 'CSE',
    venue: 'Campus Innovation Center, Auditorium Hall B',
    date: '2026-12-01',
    time: '09:00 AM - Next Day 09:00 PM',
    capacity: 250,
    registeredCount: 182,
    organizer: 'CSE Tech Innovation Club',
    contactEmail: 'technovate@campus.edu',
    imageUrl: '/src/assets/images/campus_event_hackathon_1793962642137.jpg'
  },
  {
    id: 'evt-2',
    title: 'Hands-on Workshop: Deep Learning with PyTorch & HuggingFace',
    description: 'Comprehensive 1-day technical masterclass covering transformer fine-tuning, embeddings, and deployment on edge devices with live coding notebooks.',
    category: 'Workshop',
    department: 'IT',
    venue: 'Advanced Computing Lab 4, Block C',
    date: '2026-11-18',
    time: '10:00 AM - 04:30 PM',
    capacity: 60,
    registeredCount: 54,
    organizer: 'Data Science & AI Society',
    contactEmail: 'datascience@campus.edu',
    imageUrl: '/src/assets/images/academic_library_study_1793962642265.jpg'
  },
  {
    id: 'evt-3',
    title: 'Clean Energy & Electric Mobility Symposium 2026',
    description: 'Keynote sessions by automotive R&D directors on solid-state battery engineering, regenerative braking algorithms, and sustainable manufacturing.',
    category: 'Seminar',
    department: 'MECH',
    venue: 'Mechanical Engineering Seminar Hall',
    date: '2026-11-25',
    time: '02:00 PM - 05:30 PM',
    capacity: 120,
    registeredCount: 89,
    organizer: 'Dept of Mechanical Engineering',
    contactEmail: 'mech.symp@campus.edu'
  },
  {
    id: 'evt-4',
    title: 'Annual Campus Placement & Career Fair 2026-27',
    description: 'Meet recruiters from over 45 visiting companies across software, finance, core engineering, and consulting. On-spot resume reviews and preliminary interviews.',
    category: 'Career Fair',
    department: 'CSE',
    venue: 'University Indoor Sports Complex',
    date: '2026-12-10',
    time: '09:30 AM - 05:00 PM',
    capacity: 600,
    registeredCount: 430,
    organizer: 'University Training & Placement Cell',
    contactEmail: 'placement@campus.edu'
  },
  {
    id: 'evt-5',
    title: 'VLSI Circuit Design & Semiconductor Fabrication Seminar',
    description: 'An industry overview of 3nm FinFET architecture, physical design workflows, and career roadmaps in modern silicon foundries.',
    category: 'Seminar',
    department: 'ECE',
    venue: 'ECE Microelectronics Lab 2',
    date: '2026-11-20',
    time: '11:00 AM - 01:30 PM',
    capacity: 80,
    registeredCount: 65,
    organizer: 'IEEE Student Branch',
    contactEmail: 'ieee@campus.edu'
  }
];

export const INITIAL_RESOURCES: AcademicResource[] = [
  {
    id: 'res-1',
    title: 'Design and Analysis of Algorithms - Complete Lecture Notes',
    subject: 'Algorithms (CS301)',
    department: 'CSE',
    semester: 5,
    resourceType: 'Lecture Notes',
    fileFormat: 'PDF',
    fileSize: '4.8 MB',
    uploadedBy: 'Dr. Priya Ramanathan',
    uploadDate: '2026-10-15',
    downloadCount: 342,
    description: 'Covers Divide & Conquer, Dynamic Programming, Greedy approaches, Graph algorithms, NP-Completeness with solved university question proofs.'
  },
  {
    id: 'res-2',
    title: 'Database Management Systems - Previous 5 Years Solved Papers',
    subject: 'DBMS (CS402)',
    department: 'CSE',
    semester: 4,
    resourceType: 'Previous Question Paper',
    fileFormat: 'PDF',
    fileSize: '6.2 MB',
    uploadedBy: 'Prof. Ananya Sen',
    uploadDate: '2026-09-28',
    downloadCount: 512,
    description: 'Comprehensive compilation of university end-term questions with detailed step-by-step SQL queries, B-Tree indexing diagrams, and normalization solutions.'
  },
  {
    id: 'res-3',
    title: 'Embedded Systems & ARM Microcontroller Lab Manual',
    subject: 'Embedded Systems (EC503)',
    department: 'ECE',
    semester: 5,
    resourceType: 'Lab Manual',
    fileFormat: 'PDF',
    fileSize: '3.1 MB',
    uploadedBy: 'Dr. S. K. Nair',
    uploadDate: '2026-08-30',
    downloadCount: 189,
    description: 'Step-by-step practical experiment procedures for STM32 microcontroller programming, GPIO, ADC, PWM timers, and UART communication.'
  },
  {
    id: 'res-4',
    title: 'Cloud Computing & Distributed Architecture Syllabus Guide',
    subject: 'Cloud Computing (IT601)',
    department: 'IT',
    semester: 6,
    resourceType: 'Syllabus',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    uploadedBy: 'Prof. Rajesh Kulkarni',
    uploadDate: '2026-09-05',
    downloadCount: 220,
    description: 'Curriculum roadmap covering AWS/GCP primitives, container orchestration with Kubernetes, microservices design patterns, and CAP theorem.'
  },
  {
    id: 'res-5',
    title: 'Finite Element Analysis & Structural Mechanics Reference Handbook',
    subject: 'FEA (ME602)',
    department: 'MECH',
    semester: 6,
    resourceType: 'Reference E-Book',
    fileFormat: 'PDF',
    fileSize: '14.5 MB',
    uploadedBy: 'Dr. Vikram Joshi',
    uploadDate: '2026-10-10',
    downloadCount: 145,
    description: 'Mathematical formulations for 1D, 2D, and axisymmetric elements, stiffness matrices, thermal stress analysis, and ANSYS simulation workflows.'
  }
];

export const INITIAL_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Software Engineering Summer Intern 2027',
    companyOrOrg: 'Google Engineering Bangalore / Hyderabad',
    category: 'Internship',
    location: 'Hybrid / On-site',
    stipendOrGrant: '$1,200 / Month + Relocation',
    eligibility: 'B.Tech/M.Tech Pre-final Year students (CSE, IT, ECE) with minimum CGPA 7.5',
    deadline: '2026-11-30',
    applyLink: 'https://careers.google.com/students',
    description: 'Work alongside senior engineering teams on distributed systems, machine learning pipelines, and production web applications. 10-12 week structured internship with conversion opportunities.',
    departmentScope: 'ALL',
    postedBy: 'Training & Placement Office',
    postedDate: '2026-11-01'
  },
  {
    id: 'opp-2',
    title: 'Undergraduate Summer Research Fellowship 2027',
    companyOrOrg: 'Indian Institute of Science (IISc)',
    category: 'Scholarship',
    location: 'Bengaluru, India',
    stipendOrGrant: '$600 / Month + Free Campus Housing',
    eligibility: '2nd & 3rd Year undergraduates in Engineering and Physical Sciences',
    deadline: '2026-12-15',
    applyLink: 'https://iisc.ac.in/admissions/fellowship',
    description: 'Prestigious 8-week research fellowship under faculty guides in Quantum Information, Robotics, Biomaterials, and Sustainable Energy.',
    departmentScope: 'ALL',
    postedBy: 'Dr. Priya Ramanathan',
    postedDate: '2026-10-25'
  },
  {
    id: 'opp-3',
    title: 'Autonomous Vehicle Embedded Systems Internship',
    companyOrOrg: 'Bosch Global Software Technologies',
    category: 'Internship',
    location: 'Pune / Bengaluru',
    stipendOrGrant: '$750 / Month',
    eligibility: 'ECE, EEE & MECH 6th/7th Semester with C/C++ and CAN bus proficiency',
    deadline: '2026-11-20',
    applyLink: 'https://bosch.com/careers',
    description: 'Develop and validate safety-critical firmware for electric vehicle powertrain ECUs and ADAS sensor fusion modules.',
    departmentScope: 'ECE',
    postedBy: 'Prof. Rajesh Kulkarni',
    postedDate: '2026-10-30'
  },
  {
    id: 'opp-4',
    title: 'AWS Certified Cloud Practitioner - Sponsored Certification',
    companyOrOrg: 'AWS Academy Campus Partnership',
    category: 'Certification',
    location: 'Online Examination',
    stipendOrGrant: '100% Exam Fee Waiver ($100 Value)',
    eligibility: 'All active enrolled university students across all departments',
    deadline: '2026-12-05',
    applyLink: 'https://aws.amazon.com/training',
    description: 'Full scholarship vouchers provided by the University Alumni Fund to certify 100 students in foundational cloud services, architecture, security, and pricing.',
    departmentScope: 'ALL',
    postedBy: 'Dean Marcus Vance',
    postedDate: '2026-11-02'
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'Tips for mastering Dynamic Programming for upcoming campus placements?',
    content: 'Hey everyone! Placements are approaching fast and I often get stuck formulating state transition equations for 2D DP problems. Does anyone have recommended question playlists or visual intuition guides? How did seniors approach this?',
    category: 'Academic Discussion',
    authorId: 'usr-student-1',
    authorName: 'JANIKSHA M',
    authorRole: 'student',
    authorDepartment: 'CSE',
    authorIdentifier: 'STU-2024-0104',
    createdAt: '2026-11-04 14:30',
    likes: 19,
    tags: ['Algorithms', 'PlacementPrep', 'Coding', 'DSA'],
    commentsCount: 3
  },
  {
    id: 'post-2',
    title: 'Looking for 2 teammates for Technovate 2026 Hackathon (Web & IoT track)',
    content: 'We are building an intelligent real-time campus energy monitoring dashboard using ESP32 nodes and React/Flask. We already have the hardware sensors calibrated and need one frontend enthusiast and one backend/cloud student. DM or reply below!',
    category: 'Project Collaboration',
    authorId: 'usr-student-2',
    authorName: 'Sneha Patel',
    authorRole: 'student',
    authorDepartment: 'ECE',
    authorIdentifier: 'STU-2024-0231',
    createdAt: '2026-11-03 18:15',
    likes: 24,
    tags: ['Hackathon', 'IoT', 'TeamBuilding', 'Technovate'],
    commentsCount: 2
  },
  {
    id: 'post-3',
    title: 'Open Source Software Development Club - Orientation this Friday',
    content: 'Whether you have contributed to Linux or never typed `git commit` before, our campus OSS club invites you to learn GitHub workflows, open-source licensing, and prepare for Google Summer of Code (GSoC) 2027.',
    category: 'Campus Life',
    authorId: 'usr-student-3',
    authorName: 'Rohan Verma',
    authorRole: 'student',
    authorDepartment: 'IT',
    authorIdentifier: 'STU-2023-0098',
    createdAt: '2026-11-02 09:45',
    likes: 31,
    tags: ['OpenSource', 'Clubs', 'GSoC', 'Git'],
    commentsCount: 4
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'cmt-1',
    postId: 'post-1',
    authorId: 'usr-faculty-1',
    authorName: 'Dr. Priya Ramanathan',
    authorRole: 'faculty',
    authorDepartment: 'CSE',
    content: 'Janiksha, check the lecture notes uploaded in our Academic Resources tab under "CS301". Section 4.2 has a 5-step blueprint for defining sub-problems: 1. State definition in plain English, 2. Base cases, 3. Recurrence, 4. Order of computation, 5. Location of optimal answer.',
    createdAt: '2026-11-04 15:10'
  },
  {
    id: 'cmt-2',
    postId: 'post-1',
    authorId: 'usr-student-3',
    authorName: 'Rohan Verma',
    authorRole: 'student',
    authorDepartment: 'IT',
    content: 'Seconding Dr. Priya! Also NeetCode 150 DP category helped me immensely. Start with 1D DP (Climbing Stairs, House Robber) before jumping into 2D grid problems.',
    createdAt: '2026-11-04 15:45'
  },
  {
    id: 'cmt-3',
    postId: 'post-2',
    authorId: 'usr-student-1',
    authorName: 'JANIKSHA M',
    authorRole: 'student',
    authorDepartment: 'CSE',
    content: 'Sneha, I would love to join your team for Technovate! I have experience with Tailwind and Flask REST APIs. Let us connect at the library after 4 PM.',
    createdAt: '2026-11-03 19:00'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Campus Events',
    question: 'How do I register for campus hackathons and workshops?',
    answer: 'Navigate to the "Events" tab on Campus Connect 360. Browse the active events list, click on any event card to view full guidelines, and click the blue "Register for Event" button. Your registration is confirmed instantly and saved under your profile.',
    keywords: ['register', 'event', 'hackathon', 'workshop', 'ticket', 'attend']
  },
  {
    id: 'faq-2',
    category: 'Registration & Login',
    question: 'What should I do if I forgot my login credentials or cannot sign in?',
    answer: 'Your default campus email is your registered student/faculty email (e.g. name@campus.edu). If you encounter authentication issues, you can click "Reset Password" or contact the IT Helpdesk at helpdesk@campus.edu or visit Room 102, Administrative Block.',
    keywords: ['login', 'password', 'forgot', 'reset', 'credentials', 'account', 'sign in']
  },
  {
    id: 'faq-3',
    category: 'Academic Resources',
    question: 'How can faculty or students upload notes and past question papers?',
    answer: 'Faculty members can upload study materials directly via their Faculty Dashboard under "Upload Resource". Students can access, search, and download question papers, lab manuals, and syllabus guides categorized by subject and semester in the Academic Resource Centre.',
    keywords: ['resource', 'notes', 'upload', 'question paper', 'syllabus', 'study material', 'download']
  },
  {
    id: 'faq-4',
    category: 'Internships & Careers',
    question: 'Who is eligible to apply for internships on the Opportunities portal?',
    answer: 'Each posting displays specific eligibility criteria (e.g. required semester, minimum CGPA, eligible departments). Click on "View Details" to see company requirements and direct application links vetted by the University Training & Placement Cell.',
    keywords: ['internship', 'career', 'eligibility', 'stipend', 'job', 'placement', 'apply']
  },
  {
    id: 'faq-5',
    category: 'Platform Usage',
    question: 'What is the difference between Student, Faculty, and Admin roles?',
    answer: 'Students can participate in discussions, register for events, and access materials. Faculty can publish announcements, verify registrations, and contribute resources. Administrators oversee all user records, manage departments, and review platform analytics.',
    keywords: ['roles', 'student', 'faculty', 'admin', 'permissions', 'privilege']
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: '2026-11-06 09:15',
    userEmail: 'janiksha.m@campus.edu',
    role: 'student',
    action: 'Registered for Technovate 2026 Hackathon',
    category: 'Event'
  },
  {
    id: 'act-2',
    timestamp: '2026-11-06 08:45',
    userEmail: 'priya.raman@campus.edu',
    role: 'faculty',
    action: 'Published announcement: Technovate 360 Hackathon',
    category: 'Admin'
  },
  {
    id: 'act-3',
    timestamp: '2026-11-05 16:30',
    userEmail: 'sneha.patel@campus.edu',
    role: 'student',
    action: 'Downloaded CS301 Algorithms Lecture Notes',
    category: 'Resource'
  },
  {
    id: 'act-4',
    timestamp: '2026-11-05 14:20',
    userEmail: 'admin@campus.edu',
    role: 'admin',
    action: 'Approved new department curriculum for ECE',
    category: 'Admin'
  }
];
