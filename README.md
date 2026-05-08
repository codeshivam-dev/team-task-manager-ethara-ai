# Team Task Manager

A full-stack task management application with role-based access control (Admin/Member). Built with MERN stack.

## Live Demo
https://team-task-manager-ethara-ai-wine.vercel.app

## Demo Video

https://youtu.be/usaB2qI1G1k

## Features

- **Authentication** - Signup/Login with JWT
- **Role-Based Access** - Admin (full control) & Member (limited access)
- **Project Management** - Create, view, and delete projects
- **Task Management** - Create, assign, update status, delete tasks
- **Team Collaboration** - Add members to projects
- **Dashboard** - View task statistics, recent tasks, and overdue tasks

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

```bash
# Clone repository
git clone https://github.com/codeshivam-dev/team-task-manager-ethara-ai
cd task-manager/backend

# Install dependencies
npm install

# Create environment file
cp example.env .env

# Update .env with your values
# - MONGO_URI (your MongoDB connection string)
# - JWT_SECRET (any random string)
# - ALLOW_ORIGIN (http://localhost:3000 for development)

# Start backend server
npm run dev
```

### Frontend Setup

```bash
# Open new terminal
cd task-manager/frontend

# Install dependencies
npm install

# Create environment file
cp example.env .env

# Update .env with your backend URL
# VITE_API_URL=http://localhost:5000/api

# Start frontend
npm run dev
```

### Access the App

Open `http://localhost:3000` in your browser

## Default Roles

**Admin (First user automatically gets admin role)**
- Create/delete projects
- Add/remove team members
- Create/delete any task
- View all projects and tasks

**Member**
- View assigned projects
- Create tasks in their projects
- Update task status (only tasks assigned to them)
- View dashboard

## Project Structure

```
task-manager/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & role checks
│   └── config/          # Database config
└── frontend/
    ├── src/
    │   ├── api/         # API calls
    │   ├── components/  # Reusable UI
    │   ├── pages/       # Page components
    │   ├── context/     # Auth state
    │   └── utils/       # Helper functions
    └── public/
```

## API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Auth |
| GET | `/api/auth/me` | Get current user | Auth |
| POST | `/api/projects` | Create project | Admin |
| GET | `/api/projects` | Get all projects | Auth |
| POST | `/api/projects/:id/members` | Add member | Admin |
| DELETE | `/api/projects/:id` | Delete project | Admin |
| POST | `/api/tasks/project/:id` | Create task | Auth |
| PATCH | `/api/tasks/:id/status` | Update status | Auth |
| DELETE | `/api/tasks/:id` | Delete task | Admin |
| GET | `/api/tasks/dashboard` | Get stats | Auth |

## Testing the App

1. Signup first user → becomes **Admin**
2. Login as Admin
3. Create a project
4. Signup another user → becomes **Member**
5. Add member to project
6. Create tasks and assign to member
7. Login as member → update task status
8. Check dashboard for statistics

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ALLOW_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Author

Shivam Kumar
