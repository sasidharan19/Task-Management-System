# Task Management System

A full-stack Task Management System built using Angular, Node.js, Express, Prisma, and SQLite.

This application supports JWT-based authentication and role-based access control for Admin and User roles.

---

# Live Demo

## Frontend

```txt
https://task-management-system-azure-five.vercel.app/
```

## Backend

```txt
https://task-management-api-en8k.onrender.com
```

---

# Tech Stack

## Frontend
- Angular
- Angular Material
- TypeScript
- RxJS

## Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt

## Database
- SQLite

---

# Features

## Authentication
- JWT-based login
- Protected APIs
- Role-based authorization

---

# Admin Features
- Login
- Create users
- Create tasks
- Assign tasks to users
- View all tasks and statuses

---

# User Features
- Login
- View assigned tasks
- Update task status

---

# Task Statuses

- PENDING
- IN_PROGRESS
- COMPLETED

---

# Application Architecture

## Frontend

Angular frontend application using:
- Angular standalone components
- Angular Material UI
- Route Guards
- HTTP Interceptor

---

## Backend

Node.js + Express backend using:
- Prisma ORM
- SQLite database
- JWT authentication
- Role-based access middleware

---

# Folder Structure

## Backend Structure

```txt
backend/
│
├── prisma/
│   ├── migrations/
│   ├── dev.db
│   └── schema.prisma
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── .env
```

---

## Frontend Structure

```txt
frontend/
│
├── src/app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── admin/
│   │   └── user/
│   │
│   ├── shared/
│   ├── app.routes.ts
│   └── app.config.ts
│
├── angular.json
└── package.json
```

---

# Database Design

## User Table

| Column | Type |
|---|---|
| id | Integer |
| name | String |
| email | String |
| password | String |
| role | ADMIN / USER |
| createdAt | DateTime |

---

## Task Table

| Column | Type |
|---|---|
| id | Integer |
| title | String |
| description | String |
| status | PENDING / IN_PROGRESS / COMPLETED |
| assignedToId | Integer |
| createdAt | DateTime |

---

# Setup Instructions

# Prerequisites

Ensure the following are installed:

- Node.js
- npm
- Angular CLI

Install Angular CLI globally if needed:

```bash
npm install -g @angular/cli
```

---

# 1. Clone Repository

```bash
git clone <YOUR_GITHUB_REPO_URL>
```

---

# 2. Backend Setup

## Navigate to backend

```bash
cd backend
```

---

## Install dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create `.env` file in backend root.

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecretkey"
PORT=5000
```

---

## Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

---

## Start Backend Server

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

# 3. Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

---

## Install dependencies

```bash
npm install
```

---

## Start Angular Application

```bash
ng serve
```

Frontend will run on:

```txt
http://localhost:4200
```

---

# Default Admin Credentials

```txt
Email: admin@test.com
Password: 123456
```

---

# API Documentation

## Authentication APIs

### Login

#### Endpoint

```http
POST /auth/login
```

#### Request Body

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

#### Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@test.com",
    "role": "ADMIN"
  }
}
```

---

# User APIs

## Create User

### Endpoint

```http
POST /users
```

### Access
ADMIN only

### Request Body

```json
{
  "name": "John",
  "email": "john@test.com",
  "password": "123456",
  "role": "USER"
}
```

---

## Get Users

### Endpoint

```http
GET /users
```

### Access
ADMIN only

---

# Task APIs

## Create Task

### Endpoint

```http
POST /tasks
```

### Access
ADMIN only

### Request Body

```json
{
  "title": "Build Dashboard UI",
  "description": "Create dashboard",
  "assignedToId": 2
}
```

---

## Get All Tasks

### Endpoint

```http
GET /tasks
```

### Access
ADMIN only

---

## Get My Tasks

### Endpoint

```http
GET /tasks/my-tasks
```

### Access
USER only

---

## Update Task Status

### Endpoint

```http
PATCH /tasks/:id/status
```

### Access
USER only

### Request Body

```json
{
  "status": "COMPLETED"
}
```

---

# Authentication

Protected APIs require JWT token.

Example:

```http
Authorization: Bearer <TOKEN>
```

---

# Role-Based Access Control

## Admin Permissions
- Create users
- View users
- Create tasks
- Assign tasks
- View all tasks

---

## User Permissions
- View assigned tasks
- Update assigned task status

---

# UI Screens

## Login Page
- Email/password login
- JWT authentication

---

## Admin Dashboard
- Create users
- Create tasks
- Assign tasks
- View all tasks

---

## User Dashboard
- View assigned tasks
- Update task status

---

# Prisma Commands

## Run Migration

```bash
npx prisma migrate dev --name init
```

---

## Open Prisma Studio

```bash
npx prisma studio
```

---

# Build Commands

## Backend

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production

```bash
npm start
```

---

## Frontend

### Development

```bash
ng serve
```

### Production Build

```bash
ng build
```

---

# Future Improvements

- Pagination
- Search and filtering
- Snackbar notifications
- Better validation
- Unit testing
- Docker support
- CI/CD pipeline
- Refresh token authentication
- Dark mode

---

# Author

Sasidharan Senthilkumar

---