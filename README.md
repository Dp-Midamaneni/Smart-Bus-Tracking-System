# Smart Bus Tracking System - Person B (ETA Prediction)

## Overview

This branch contains the **Person B** implementation of the Smart Bus Tracking System.

The objective of this module is to predict the Estimated Time of Arrival (ETA) of buses using Machine Learning and display it to passengers through a web interface.

---

## Person B Responsibilities

### Frontend

- Passenger Login Page
- Route Selector
- Bus Stop Selector
- Display available buses
- Display Estimated Time of Arrival (ETA)

---

### Backend

Implemented REST APIs:

- GET /routes
- ETA Prediction API
- Historical GPS data processing
- Connects Frontend with Machine Learning models

---

### Machine Learning

Implemented:

- Support Vector Regression (SVR)
- K-Nearest Neighbors (kNN)

The models are trained using historical GPS data to predict the arrival time of buses.

---

## Project Structure

```
bus_eta/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── database.db
│   ├── gps_data.csv
│   ├── routes.json
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── css/
│   └── js/
│
├── ml/
│   ├── train.py
│   ├── app.py
│   ├── eta_model.pkl
│   └── knn_model.pkl
│
├── eta_model.pkl
├── knn_model.pkl
└── README.md
```

---

## Technologies Used

- Python
- Flask
- HTML
- CSS
- JavaScript
- SQLite
- Scikit-learn
- SVR
- kNN

---

## Machine Learning Workflow

1. Historical GPS data is collected.
2. Data is preprocessed.
3. SVR model predicts arrival time.
4. kNN finds similar historical journeys.
5. Final ETA is returned to the frontend.

---

## API Endpoints

### GET /routes

Returns available routes.

### POST /eta

Input

```json
{
    "speed": 35,
    "distance_to_stop": 4.5
}
```

Output

```json
{
    "eta": 8.4
}
```

---

## How to Run

### Install dependencies

```
pip install -r backend/requirements.txt
```

### Train ML Models

```
python ml/train.py
```

### Start Backend

```
python backend/app.py
```

### Open Frontend

Open

```
frontend/index.html
```

in your browser.

---

## Future Improvements

- Live GPS Integration
- Google Maps Integration
- Better ETA accuracy
- Real-time passenger notifications

---

## Team Project

Smart Bus Tracking System

Role: **Person B**

Feature:
**Arrival Time Prediction (ETA)**

Developed as part of the Smart Bus Tracking System team project.
