# FlowSpace - AI-Powered Project Management Tool

A modern, full-stack project management application built with React, Node.js, and SQLite. Features user authentication, project management, and is ready for AI integration for intelligent task assignment and sentiment analysis.

![FlowSpace](https://img.shields.io/badge/FlowSpace-AI%20Project%20Management-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

## Features

- **User Authentication** - Secure JWT-based registration and login system
- **Project Management** - Create, view, and manage multiple projects
- **Modern UI** - Clean, responsive React interface with modern CSS
- **RESTful API** - Full backend API with Express.js
- **SQLite Database** - Lightweight database for development and production
- **Ready for AI** - Architecture prepared for OpenAI integration

## Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with Flexbox and Grid

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **SQLite** - Database with sqlite3 driver
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers

## Installation & Setup

## Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

## Quick Start

1. **Clone the repository**
   ```
   git clone https://github.com/EDLabel/flowspace.git
   cd flowspace
   
2. **Install all dependencies**
   ```
   npm run install:all

3. **Setup the database**
   ```
   npm run migrate

4. **Start the development servers**
   ```
   npm run dev

5. **Access the application**
   
   #### Open your browser and navigate to:
   ```
   Frontend: http://localhost:3000
   Backend API: http://localhost:3001

6. **Manual Setup (if needed)** 
   
   #### Backend Setup
   ```
   cd backend
   npm install
   npm run migrate
   npm run dev
   ```
   
   #### Frontend Setup
   ```
   cd frontend
   npm install
   npm run dev 
   ```
## Usage

**Registration:** Create a new account with email and password

**Login:** Sign in with your credentials

**Create Projects:** Click "+ New Project" to create your first project

**Manage Projects:** View all your projects on the dashboard

**Logout:** Secure logout functionality

## API Documentation

#### Authentication Endpoints
```
Method      Endpoint                Description             Body

POST        /api/auth/register      Register new user       {name, email, password, skills?}
POST        /api/auth/login         Login user              {email, password}
GET         /api/auth/profile       Get user profile        Requires Auth
```

#### Project Endpoints
```
Method   Endpoint                Description	          Body

GET      /api/projects	         Get user's projects	  Requires Auth
POST     /api/projects	         Create new project	  {name, description?}
GET      /api/projects/:id       Get specific project	  Requires Auth
```
#### Utility Endpoints
```
Method      Endpoint	         Description

GET         /api/health	         API health check
GET         /api/test-db         Database connection test
```

### Database Schema
```
-- Users table
CREATE TABLE users (
id TEXT PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
name TEXT NOT NULL,
skills TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Projects table  
CREATE TABLE projects (
id TEXT PRIMARY KEY,
name TEXT NOT NULL,
description TEXT,
owner_id TEXT REFERENCES users(id),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Project members table
CREATE TABLE project_members (
project_id TEXT REFERENCES projects(id),
user_id TEXT REFERENCES users(id),
role TEXT DEFAULT 'member',
PRIMARY KEY (project_id, user_id)
);
```

## Project Structure 
```
flowspace/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utilities & migrations
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # React entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── scripts/
│   └── setup.js            # Project setup script
├── README.md
├── LICENSE
└── package.json           # Root package.json
```

## Development

#### Available Scripts
From the root directory:

**npm run dev** - Start both frontend and backend in development mode

**npm run dev:backend** - Start only the backend server

**npm run dev:frontend** - Start only the frontend development server

**npm run migrate** - Run database migrations

**npm run install:all** - Install all dependencies for both frontend and backend


## Environment Variables

Create a .env file in the backend directory:

```
NODE_ENV=development
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-key
FRONTEND_URL=http://localhost:3000 
```

## Deployment

### Backend Deployment

The backend can be deployed to services like:

Heroku

Railway

DigitalOcean App Platform

AWS Elastic Beanstalk

### Frontend Deployment

The frontend can be deployed to:

Vercel

Netlify

GitHub Pages

AWS S3 + CloudFront

### Database

For production, consider migrating from SQLite to:

PostgreSQL

MySQL

AWS RDS

## Future Enhancements

**AI Task Assignment** - Integrate OpenAI for intelligent task assignment

**Kanban Board** - Drag-and-drop task management

**Real-time Updates** - WebSocket integration

**Task Comments** - Comment system with sentiment analysis

**File Uploads** - Attach files to projects and tasks

**Team Collaboration** - Invite team members to projects

**Advanced Analytics** - Project progress and team performance

## Contributing

Fork the project

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

## License
This project is licensed under the MIT License - see the **LICENSE** file for details.

## Authors
**Edward Gumenke** - Initial work

## Acknowledgments
React team for the amazing framework

Express.js for the simple and flexible backend

Vite for the fast development experience

Built with ❤️ for modern project management