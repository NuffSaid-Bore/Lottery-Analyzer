# 🎲 Lottery Analysis Dashboard

A full-stack lottery analysis application that allows users to analyze past lottery draw data, generate insights such as hot/cold numbers, rolling frequency trends, and receive recommended numbers for future draws. Built with **Flask** for the backend and **React** for the frontend.

---


## Features

* Analyze past lottery draws from CSV datasets
* Compute frequency of each number
* Identify **hot** (frequently drawn) and **cold** (rarely drawn) numbers
* Generate rolling frequency trends
* Recommend numbers for the next draw
* Upload custom CSV files for analysis
* Interactive frontend dashboard with charts for visualizing results

---

## Project Structure

```
project-root/
│
├─ backend/
│   ├─ app.py                 # Flask backend
│   ├─ lottery_analysis.py    # LotteryAnalyzer class
│   ├─ data/
│   │   └─ past_draws.csv     # Example dataset
│   └─ requirements.txt       # Python dependencies
│
├─ frontend/
│   ├─ src/
│   │   ├─ LotteryAnalyzer.jsx
│   │   ├─ FrequencyChart.jsx
│   │   ├─ HotColdChart.jsx
│   │   ├─ RollingChart.jsx
│   │   └─ HeatmapChart.jsx
│   └─ package.json
│
├─ README.md
└─ .gitignore
```

---

## Backend

The backend is built with **Flask** and exposes REST API endpoints for lottery analysis.

* **Key Dependencies:** `Flask`, `pandas`, `Flask-CORS`
* **Main File:** `app.py`
* **Analyzer Class:** `LotteryAnalyzer`
* **Dataset Location:** `backend/data/past_draws.csv`
* **Dependencies File:** `backend/requirements.txt`

### Features

* Frequency analysis of numbers
* Hot/cold number detection
* Rolling frequency analysis
* Recommended numbers generation
* CSV file upload for custom datasets

---

## Frontend

The frontend is built with **React** and provides a user-friendly interface to interact with the backend.

* **Key Dependencies:** `axios`, `react`
* **Main Component:** `LotteryAnalyzer.jsx`

### Features

* Upload CSV datasets or use backend default dataset
* Visualize frequency, hot/cold, rolling trends, and heatmaps
* Display recommended numbers dynamically
* Responsive, modern dashboard interface

---

## Installation

### Backend

1. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

2. Install dependencies from `backend/requirements.txt`:

```bash
pip install -r backend/app/requirements.txt
```

3. Run the backend:

```bash
python backend/app/app.py
```

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Frontend runs by default on `http://localhost:3000` and communicates with the backend on `http://localhost:5000`.

---

## Usage

1. Open the frontend in your browser.
2. Use the default dataset (`backend/data/past_draws.csv`) or upload your CSV file.
3. Click **Analyze** to view charts and recommended numbers.
4. Visualizations include:

* **Frequency Chart** – how often numbers appear
* **Hot/Cold Chart** – highlights frequent vs rare numbers
* **Rolling Frequency Chart** – shows trends over recent draws
* **Heatmap** – visualizes number distribution across draws

---

## API Endpoints

| Endpoint           | Method | Description                           |
| ------------------ | ------ | ------------------------------------- |
| `/api/frequency`   | GET    | Returns frequency of each number      |
| `/api/hotcold`     | GET    | Returns hot and cold numbers          |
| `/api/rolling`     | GET    | Returns rolling frequency trends      |
| `/api/recommended` | GET    | Returns recommended numbers           |
| `/api/analyze`     | POST   | Accepts CSV file and returns analysis |

**Request Example (POST /api/analyze):**

```http
POST /api/analyze
Content-Type: multipart/form-data
csv_file=<file>
```

**Response Example:**

```json
{
  "frequency": { "1": 5, "2": 3, ... },
  "hot": { "5": 10, "12": 8 },
  "cold": { "23": 1, "45": 0 },
  "rolling": { "1": [1,2,0,1], ... },
  "recommended": [5, 12, 23, 7, 8, 10]
}
```

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m "Description of change"`
5. Push: `git push origin feature-name`
6. Create a pull request

