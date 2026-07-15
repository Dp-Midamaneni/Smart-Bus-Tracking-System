# Smart Bus Tracking System - Person C

## Overview

This branch contains the Person C implementation of the Smart Bus Tracking System.

The objective of this module is to provide an administrator dashboard that displays system information, manages passenger feedback, and shows real-time notifications through a user-friendly web interface.

---

# Person C Responsibilities

## Frontend

- Designed the Admin Dashboard
- Displayed system statistics
- Developed Passenger Feedback Form
- Developed Notifications Panel
- Displayed System Status
- Displayed Date & Time
- Added Last Synchronization information

## Backend

Implemented REST APIs:

- POST /feedback
- GET /alerts
- POST /alerts

Connected frontend components with the backend and MongoDB database.

---

# Dashboard Features

Implemented:

- Total Buses Counter
- Feedback Counter
- Notifications Counter
- Online Status Indicator
- Recent Notifications Section
- Passenger Feedback Form

---

# Project Structure

```
person_c/

├── backend/
│   ├── routes/
│   │   ├── feedbackRoutes.js
│   │   └── alertRoutes.js
│   │
│   ├── models/
│   │   ├── Feedback.js
│   │   └── Alert.js
│   │
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── Dashboard.js
│   │   ├── FeedbackForm.js
│   │   ├── Notifications.js
│   │   └── Dashboard.css
│   │
│   └── App.js
│
└── README.md
```

---

# Technologies Used

- React.js
- Node.js
- Express.js
- MongoDB
- HTML
- CSS
- JavaScript

---

# Module Workflow

1. Administrator opens the dashboard.
2. Dashboard displays system statistics.
3. Recent notifications are fetched from the backend.
4. Passenger feedback is submitted through the feedback form.
5. Feedback is stored in MongoDB.
6. Notifications and dashboard information are updated dynamically.

---

# API Endpoints

## Feedback API

### POST /feedback

**Input**

```json
{
  "name": "Divya",
  "busNumber": "101",
  "rating": 5,
  "feedback": "Bus arrived on time."
}
```

**Output**

```json
{
  "message": "Feedback submitted successfully."
}
```

---

## Notifications API

### GET /alerts

Returns all recent notifications.

### POST /alerts

Adds a new notification.

---

# How to Run

## Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Start Backend

```bash
cd backend
npm start
```

## Start Frontend

```bash
cd frontend
npm start
```

Open:

```
http://localhost:3000
```

in your browser.

---

# Future Improvements

- Real-time notifications using Socket.IO
- Push notification support
- Dashboard analytics and charts
- Feedback filtering and search
- Export feedback reports

---

# Team Project

**Smart Bus Tracking System**

**Role:** Person C

**Features:**
- Admin Dashboard
- Passenger Feedback Module
- Notifications Module

Developed as part of the Smart Bus Tracking System team project.