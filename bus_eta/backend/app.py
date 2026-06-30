from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_NAME = "database.db"


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


# ---------------- ROUTES ---------------- #

@app.route("/")
def home():
    return jsonify({
        "message": "Smart Bus Tracking API Running"
    })


@app.route("/routes", methods=["GET"])
def get_routes():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM routes")
    routes = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify({"routes": routes})


@app.route("/stops/<route_id>", methods=["GET"])
def get_stops(route_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT stop_name, stop_order
        FROM stops
        WHERE route_id = ?
        ORDER BY stop_order
    """, (route_id,))

    stops = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return jsonify({"stops": stops})


@app.route("/buses/<route_id>", methods=["GET"])
def get_buses(route_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM buses
        WHERE route_id = ?
    """, (route_id,))

    buses = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return jsonify({"buses": buses})


# ---------------- GPS UPDATE ---------------- #

@app.route("/gps/update", methods=["POST"])
def update_gps():

    data = request.json

    bus_id = data["bus_id"]
    latitude = data["latitude"]
    longitude = data["longitude"]

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO gps_history
        (bus_id, latitude, longitude, timestamp)
        VALUES (?, ?, ?, ?)
    """, (
        bus_id,
        latitude,
        longitude,
        datetime.now()
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "GPS updated successfully"
    })


# ---------------- ETA ---------------- #

@app.route("/eta/<bus_id>", methods=["GET"])
def get_eta(bus_id):

    # Dummy ETA
    eta_minutes = 8

    return jsonify({
        "bus_id": bus_id,
        "eta_minutes": eta_minutes
    })


# ---------------- LOGIN ---------------- #

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    username = data["username"]
    password = data["password"]

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        WHERE username = ?
        AND password = ?
    """, (username, password))

    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({
            "success": True,
            "message": "Login successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid credentials"
    })


if __name__ == "__main__":
    app.run(debug=True)