# 🎓 Placement Portal - MERN Stack System

A robust, full-stack management system designed for educational placement cells to track students, schedule interviews, and manage recruitment outcomes. Built with a focus on data integrity, real-time job fetching, and professional UI/UX.

---

## 🚀 Key Features

### 📋 Student & Interview Management

- **Centralized Database:** Manage student profiles, batches, and current placement status.
- **Smart Allocation:** Link students to specific company interview rounds with a unique constraint (prevents duplicate allocations).
- **Outcome Tracking:** Update interview results (PASS, FAIL, On Hold, Didnt Attempt) with real-time status badges.

### 🔍 Advanced Job Portal

- **Adzuna API Integration:** Real-time job fetching directly from a backend proxy for better security and performance.
- **Live Search:** View available roles, companies, and locations with direct application links.

### 📊 Data & Analytics

- **Live Stats Strip:** Instant breakdown of total interviews, pass rates, and pending results.
- **CSV Export:** Download comprehensive interview records for offline reporting and audit purposes.

---

## 🛠️ Technical Stack

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS, Lucide Icons, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Mongoose ODM).
- **Authentication:** JWT (JSON Web Tokens) with LocalStorage persistence.
- **Architecture:** Monolithic - Express serving optimized React static builds.

---

# 💻 Local Setup Instructions

Follow these steps to run the project on your local machine:

## 1. Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas Account
- Adzuna API Credentials (ID & Key)

## 2. Clone and Install

```bash
git clone git@github.com:Juneja16/placement-portal.git
cd placement-portal
```

_Install all dependencies (Root, Frontend, and Backend)_

```bash
npm run install-client && npm run install-server
```

## 3. Environment Configuration

Create a `.env` file inside the `Server/` folder with the following content:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_string
ADZUNA_APP_ID=your_adzuna_id
ADZUNA_APP_KEY=your_adzuna_key
```

## 4. Running the Application

To build the frontend and start the production server:

```bash
npm run build
npm start
```

The application will be available at [http://localhost:5000](http://localhost:5000).

---

# 🛡️ Security & Optimization

- **Backend Protection:** Sensitive API keys are stored in environment variables.
- **Token Interceptors:** Axios interceptors automatically attach JWT tokens to every outgoing request.
- **Clean Code:** Separation of concerns using MVC architecture on the backend.

## 📁 Project Structure

```text
Project_Root/
├── Client/frontend/       # React Source Code (Vite)
├── Server/                # Express Server
│   ├── App/
│   │   ├── Config/        # DB Connection
│   │   ├── Controllers/   # Request Logic
│   │   ├── Middlewares/   # Auth & Error Handling
│   │   ├── Models/        # Mongoose Schemas
│   │   ├── Routes/        # API Endpoints
│   │   ├── Services/      # Business Logic (Adzuna API, etc.)
│   │   └── Utils/         # Helper functions
│   ├── node_modules/
│   ├── .env               # Server Secrets
│   └── server.js          # Entry Point & Static Serving
├── package.json           # Root Orchestrator
└── README.md
```
