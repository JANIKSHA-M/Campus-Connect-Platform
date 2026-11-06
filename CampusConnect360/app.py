"""
CAMPUS CONNECT 360 - FLASK BACKEND APPLICATION
An Intelligent Student Community, Campus Engagement and Academic Support Analytics Platform

Technology Stack:
- Python 3.12
- Flask Web Framework
- SQLite3 Relational Database
- Pandas for Data Analytics
"""

import os
import sqlite3
import hashlib
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'campus_connect_360_production_secret_key_2026')
DATABASE = os.path.join(os.path.dirname(__file__), 'campus.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def init_db():
    """Initializes SQLite database tables and seeds demo records if empty."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # 1. Users Table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT CHECK(role IN ('student', 'faculty', 'admin')) NOT NULL,
            department TEXT NOT NULL,
            identifier TEXT NOT NULL,
            semester INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')

        # 2. Campus Events Table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL,
            department TEXT NOT NULL,
            venue TEXT NOT NULL,
            event_date TEXT NOT NULL,
            event_time TEXT NOT NULL,
            capacity INTEGER NOT NULL,
            registered_count INTEGER DEFAULT 0,
            organizer TEXT NOT NULL
        )''')

        # 3. Event Registrations Table (Prevents duplicates)
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS event_registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            ticket_code TEXT NOT NULL,
            registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(event_id, user_id)
        )''')

        # 4. Academic Resources Table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS resources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subject TEXT NOT NULL,
            department TEXT NOT NULL,
            semester INTEGER NOT NULL,
            resource_type TEXT NOT NULL,
            file_size TEXT,
            uploaded_by TEXT NOT NULL,
            download_count INTEGER DEFAULT 0,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')

        # 5. Career Opportunities Table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS opportunities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            company TEXT NOT NULL,
            category TEXT NOT NULL,
            location TEXT NOT NULL,
            stipend TEXT,
            eligibility TEXT NOT NULL,
            deadline TEXT NOT NULL,
            apply_link TEXT NOT NULL,
            description TEXT,
            posted_by TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')

        # 6. Community Posts Table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category TEXT NOT NULL,
            author_id INTEGER NOT NULL,
            author_name TEXT NOT NULL,
            author_role TEXT NOT NULL,
            author_dept TEXT NOT NULL,
            likes INTEGER DEFAULT 0,
            tags TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (author_id) REFERENCES users(id)
        )''')

        # 7. Announcements Table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category TEXT NOT NULL,
            department TEXT NOT NULL,
            author_name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')

        conn.commit()

        # Seed initial demo admin & student if users table is empty
        user_check = cursor.execute("SELECT COUNT(*) FROM users").fetchone()[0]
        if user_check == 0:
            cursor.execute('''
            INSERT INTO users (name, email, password_hash, role, department, identifier, semester)
            VALUES 
            ('JANIKSHA M', 'janiksha.m@campus.edu', ?, 'student', 'CSE', 'STU-2024-0104', 5),
            ('Dr. Priya Ramanathan', 'priya.raman@campus.edu', ?, 'faculty', 'CSE', 'FAC-CSE-004', NULL),
            ('Dean Marcus Vance', 'admin@campus.edu', ?, 'admin', 'GENERAL', 'ADM-EXEC-001', NULL)
            ''', (hash_password('student123'), hash_password('faculty123'), hash_password('admin123')))

            cursor.execute('''
            INSERT INTO events (title, description, category, department, venue, event_date, event_time, capacity, registered_count, organizer)
            VALUES 
            ('Technovate 2026: 36-Hour Hackathon', 'National intercollegiate hackathon with cash prizes.', 'Hackathon', 'CSE', 'Auditorium Hall B', '2026-12-01', '09:00 AM - Next Day', 250, 42, 'CSE Society'),
            ('Deep Learning Workshop', 'Mastering transformer fine-tuning with PyTorch.', 'Workshop', 'IT', 'Computing Lab 4', '2026-11-20', '10:00 AM - 04:00 PM', 60, 28, 'Data Science Club')
            ''')

            cursor.execute('''
            INSERT INTO resources (title, subject, department, semester, resource_type, file_size, uploaded_by, download_count, description)
            VALUES 
            ('Design and Analysis of Algorithms Complete Notes', 'Algorithms (CS301)', 'CSE', 5, 'Lecture Notes', '4.8 MB', 'Dr. Priya Ramanathan', 142, 'Detailed dynamic programming notes and graph algorithms.'),
            ('Database Systems 5 Years Solved Papers', 'DBMS (CS402)', 'CSE', 4, 'Previous Question Paper', '6.2 MB', 'Prof. Ananya Sen', 310, 'Comprehensive university solved question papers.')
            ''')

            cursor.execute('''
            INSERT INTO opportunities (title, company, category, location, stipend, eligibility, deadline, apply_link, description, posted_by)
            VALUES 
            ('Software Engineering Summer Intern', 'Google India', 'Internship', 'Bangalore / Hybrid', '$1,200/mo', 'Pre-final year B.Tech', '2026-11-30', 'https://careers.google.com', '10-week summer internship with mentor guidance.', 'Placement Office')
            ''')

            conn.commit()

# --- WEB APPLICATION ROUTES ---

@app.route('/')
def home():
    db = get_db()
    events = db.execute('SELECT * FROM events ORDER BY event_date ASC LIMIT 3').fetchall()
    stats = {
        'total_users': db.execute('SELECT COUNT(*) FROM users').fetchone()[0],
        'total_events': db.execute('SELECT COUNT(*) FROM events').fetchone()[0],
        'total_resources': db.execute('SELECT COUNT(*) FROM resources').fetchone()[0],
        'total_posts': db.execute('SELECT COUNT(*) FROM posts').fetchone()[0]
    }
    return render_template('index.html', events=events, stats=stats)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email'].strip()
        password = request.form['password']
        hashed = hash_password(password)

        db = get_db()
        user = db.execute('SELECT * FROM users WHERE email = ? AND password_hash = ?', (email, hashed)).fetchone()
        if user:
            session['user_id'] = user['id']
            session['name'] = user['name']
            session['role'] = user['role']
            session['department'] = user['department']
            session['identifier'] = user['identifier']
            flash(f"Welcome back, {user['name']}!", 'success')
            return redirect(url_for('dashboard'))
        else:
            flash("Invalid email or password. Please verify your credentials.", 'danger')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name'].strip()
        email = request.form['email'].strip()
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        role = request.form['role']
        department = request.form['department']
        identifier = request.form.get('identifier', f"STU-{datetime.now().year}")

        if password != confirm_password:
            flash("Passwords do not match. Please verify.", 'warning')
            return render_template('register.html')

        db = get_db()
        existing = db.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
        if existing:
            flash("An account with this email already exists. Please log in.", 'warning')
            return redirect(url_for('login'))

        hashed = hash_password(password)
        db.execute('''
        INSERT INTO users (name, email, password_hash, role, department, identifier)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (name, email, hashed, role, department, identifier))
        db.commit()

        flash("Account registered successfully! You may now sign in.", 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()
    flash("You have been signed out safely.", 'info')
    return redirect(url_for('home'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash("Please log in to access your dashboard.", 'warning')
        return redirect(url_for('login'))

    role = session.get('role')
    db = get_db()

    if role == 'student':
        my_events = db.execute('''
        SELECT e.*, r.ticket_code, r.registered_at 
        FROM events e 
        JOIN event_registrations r ON e.id = r.event_id 
        WHERE r.user_id = ?
        ''', (session['user_id'],)).fetchall()
        announcements = db.execute('SELECT * FROM announcements ORDER BY id DESC LIMIT 5').fetchall()
        resources = db.execute('SELECT * FROM resources WHERE department = ? LIMIT 5', (session['department'],)).fetchall()
        return render_template('student_dashboard.html', my_events=my_events, announcements=announcements, resources=resources)
    
    elif role == 'faculty':
        dept_events = db.execute('SELECT * FROM events WHERE department = ?', (session['department'],)).fetchall()
        registrations = db.execute('''
        SELECT r.*, u.name as student_name, u.identifier, e.title as event_title 
        FROM event_registrations r
        JOIN users u ON r.user_id = u.id
        JOIN events e ON r.event_id = e.id
        WHERE e.department = ?
        ''', (session['department'],)).fetchall()
        return render_template('faculty_dashboard.html', events=dept_events, registrations=registrations)

    else:
        # Admin
        users_list = db.execute('SELECT * FROM users ORDER BY id DESC').fetchall()
        events_list = db.execute('SELECT * FROM events').fetchall()
        resources_list = db.execute('SELECT * FROM resources').fetchall()
        return render_template('admin_dashboard.html', users=users_list, events=events_list, resources=resources_list)

@app.route('/events')
def events_page():
    db = get_db()
    all_events = db.execute('SELECT * FROM events ORDER BY event_date ASC').fetchall()
    return render_template('events.html', events=all_events)

@app.route('/events/register/<int:event_id>', methods=['POST'])
def register_event(event_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Please log in to register'}), 401
    
    db = get_db()
    user_id = session['user_id']
    
    # Duplicate prevention
    existing = db.execute('SELECT id FROM event_registrations WHERE event_id = ? AND user_id = ?', (event_id, user_id)).fetchone()
    if existing:
        return jsonify({'error': 'You are already registered for this event.'}), 400

    import random
    ticket_code = f"TKT-{random.randint(10000, 99999)}"
    db.execute('INSERT INTO event_registrations (event_id, user_id, ticket_code) VALUES (?, ?, ?)', (event_id, user_id, ticket_code))
    db.execute('UPDATE events SET registered_count = registered_count + 1 WHERE id = ?', (event_id,))
    db.commit()

    return jsonify({'success': True, 'ticket_code': ticket_code})

@app.route('/resources')
def resources_page():
    db = get_db()
    all_resources = db.execute('SELECT * FROM resources ORDER BY id DESC').fetchall()
    return render_template('resources.html', resources=all_resources)

@app.route('/community')
def community_page():
    db = get_db()
    posts = db.execute('SELECT * FROM posts ORDER BY id DESC').fetchall()
    return render_template('community.html', posts=posts)

@app.route('/analytics')
def analytics_page():
    from analysis.analytics import get_analytics_payload
    data = get_analytics_payload()
    return render_template('analytics.html', data=data)

if __name__ == '__main__':
    init_db()
    print("Campus Connect 360 initialized.")
    app.run(debug=True, host='127.0.0.1', port=5000)
