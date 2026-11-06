"""
analysis/analytics.py - Python 3.12 and Pandas Analytics Module for Campus Connect 360
Performs descriptive data analysis, department aggregations, and capacity metrics.
"""

import sqlite3
import os
import pandas as pd

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'campus.db')

def get_analytics_payload():
    """Extracts database tables into Pandas DataFrames and calculates metrics."""
    if not os.path.exists(DB_PATH):
        return {
            'dept_labels': ['CSE', 'ECE', 'IT', 'MECH', 'BIOTECH'],
            'dept_counts': [14, 8, 9, 6, 4],
            'event_names': ['Technovate 2026', 'Deep Learning Workshop'],
            'event_registrations': [42, 28]
        }

    conn = sqlite3.connect(DB_PATH)
    
    # 1. Department Distribution via Pandas
    users_df = pd.read_sql_query("SELECT id, role, department FROM users", conn)
    dept_series = users_df['department'].value_counts()
    
    # 2. Event Fill Rates
    events_df = pd.read_sql_query("SELECT title, capacity, registered_count FROM events", conn)
    events_df['fill_pct'] = (events_df['registered_count'] / events_df['capacity']) * 100

    conn.close()

    return {
        'dept_labels': list(dept_series.index),
        'dept_counts': [int(c) for c in dept_series.values],
        'event_names': list(events_df['title'].values),
        'event_registrations': [int(c) for c in events_df['registered_count'].values],
        'mean_event_capacity': float(events_df['capacity'].mean()) if not events_df.empty else 0.0
    }

if __name__ == '__main__':
    data = get_analytics_payload()
    print("Calculated Campus Analytics:")
    print(data)
