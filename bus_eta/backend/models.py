import sqlite3

DB_NAME = "database.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    # Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)

    # Routes Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS routes (
        route_id TEXT PRIMARY KEY,
        source TEXT NOT NULL,
        destination TEXT NOT NULL
    )
    """)

    # Stops Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS stops (
        stop_id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_id TEXT NOT NULL,
        stop_name TEXT NOT NULL,
        stop_order INTEGER NOT NULL,
        FOREIGN KEY(route_id) REFERENCES routes(route_id)
    )
    """)

    # Buses Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS buses (
        bus_id TEXT PRIMARY KEY,
        route_id TEXT NOT NULL,
        FOREIGN KEY(route_id) REFERENCES routes(route_id)
    )
    """)

    # GPS History Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS gps_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bus_id TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(bus_id) REFERENCES buses(bus_id)
    )
    """)

    conn.commit()
    conn.close()

def insert_sample_data():
    conn = get_connection()
    cursor = conn.cursor()

    # Routes
    cursor.execute("""
    INSERT OR IGNORE INTO routes
    VALUES ('R1', 'Ameerpet', 'Kukatpally')
    """)

    cursor.execute("""
    INSERT OR IGNORE INTO routes
    VALUES ('R2', 'Secunderabad', 'MGBS')
    """)

    # Stops for Route R1
    stops_r1 = [
        ('R1', 'Ameerpet', 1),
        ('R1', 'SR Nagar', 2),
        ('R1', 'Balanagar', 3),
        ('R1', 'Kukatpally', 4)
    ]

    cursor.executemany("""
    INSERT OR IGNORE INTO stops(route_id, stop_name, stop_order)
    VALUES (?, ?, ?)
    """, stops_r1)

    # Buses
    cursor.execute("""
    INSERT OR IGNORE INTO buses
    VALUES ('BUS101', 'R1')
    """)

    cursor.execute("""
    INSERT OR IGNORE INTO buses
    VALUES ('BUS102', 'R2')
    """)

    cursor.execute("""
    INSERT OR IGNORE INTO users
    (username,password)
    VALUES
    ('admin','admin123')
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_tables()
    insert_sample_data()
    print("Database created successfully!")