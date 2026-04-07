# Fullstack Challenge - User & Posts Management

A full-stack application built with Next.js, Express.js, PostgreSQL, and deployed to AWS Lambda. This application allows users to import user data from ReqRes API, manage posts, and includes authentication with magic code email verification.

## Live Demo

- **Frontend:** https://samy-fullstack-challenge.vercel.app
- **Backend API (AWS Lambda):** https://m1k4e4b2pg.execute-api.us-east-1.amazonaws.com/dev
- **GitHub Repository:** https://github.com/DavidRochaTabares/SAMY-fullstack-challenge

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Bonus Features](#bonus-features)

## Features

### Core Features
-  User authentication with magic code (email verification)
-  Import users from ReqRes API to local database
-  CRUD operations for posts
-  User-post relationships with author information
-  Pagination on posts and users lists
-  Error handling and validation
-  Comprehensive test coverage (frontend & backend)

### Bonus Features
-  Rate Limiting: 100 requests per 15 minutes per IP
-  Observability: Request IDs and structured JSON logs
-  Pagination: Implemented on posts and users endpoints
-  Deployed to AWS Lambda with API Gateway

## Tech Stack

### Frontend
- **Framework:** Next.js 16.2.2 (React 19)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios
- **Testing:** Jest + React Testing Library

### Backend
- **Runtime:** Node.js 18.x
- **Framework:** Express.js 5.2.1
- **Database:** PostgreSQL (Supabase)
- **ORM:** Sequelize 6.37.8
- **Authentication:** JWT + Magic Code
- **Testing:** Jest + Supertest
- **Deployment:** AWS Lambda + Serverless Framework

### DevOps
- **Cloud Provider:** AWS (Lambda, API Gateway)
- **Database Hosting:** Supabase (PostgreSQL)
- **Deployment Tool:** Serverless Framework 4.33.3
- **CI/CD:** Git + GitHub

## Project Structure

```
SAMY/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Sequelize models
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express app setup
│   ├── tests/               # Backend tests
│   ├── handler.js           # AWS Lambda handler
│   ├── serverless.yml       # Serverless config
│   └── package.json
├── frontend/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Redux store and utilities
│   ├── tests/               # Frontend tests
│   └── package.json
├── .env                     # Environment variables
├── .gitignore
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** v18.x or higher
- **npm:** v9.x or higher
- **PostgreSQL:** v14.x or higher (or use Supabase)
- **Git:** Latest version
- **AWS CLI:** (Optional, for deployment)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/DavidRochaTabares/SAMY-fullstack-challenge.git
cd SAMY-fullstack-challenge
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

### Root `.env` File

Create a `.env` file in the **root directory** with the following variables:

```env
# Database - Local Development
DATABASE_URL=postgresql://user:password@localhost:5432/samy_db

# Database - Production (Supabase)
DATABASE_URL_PRODUCTION=postgresql://postgres:[password]@[host].supabase.co:6543/postgres?pgbouncer=true

# ReqRes API
REQRES_API_URL=https://reqres.in/api
REQRES_API_KEY=your_reqres_api_key_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000

# AWS Credentials (for deployment)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
```

### Frontend `.env.local` File

Create a `.env.local` file in the **frontend directory**:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Important Notes

- **Never commit `.env` files** to version control
- For production, use environment-specific values
- `DATABASE_URL_PRODUCTION` should use Supabase's **transaction pooler** connection string (port 6543)
- Get your ReqRes API key from [app.reqres.in/api-keys](https://app.reqres.in/api-keys)

## Running Locally

### 1. Setup Database

#### Option A: Local PostgreSQL

```bash
# Create database
createdb samy_db

# Run migrations (sync models)
cd backend
npm run db:sync
```

#### Option B: Supabase (Recommended)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings → Database
4. Use the **Transaction Pooler** connection string (port 6543)
5. Run the table creation script:

```bash
cd backend
node src/db/createTablesSupabase.js
```

### 2. Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on **http://localhost:3001**

### 3. Start Frontend Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on **http://localhost:3000**

### 4. Verify Setup

- Backend health check: http://localhost:3001/health
- Frontend: http://localhost:3000

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

**Test Coverage:**
- Authentication endpoints
- User import and management
- Posts CRUD operations
- 12 tests total

### Frontend Tests

```bash
cd frontend
npm test
```

**Test Coverage:**
- Component rendering
- User interactions
- Form validation
- 9 tests total

### Run Tests in Watch Mode

```bash
# Backend
cd backend
npm test -- --watch

# Frontend
cd frontend
npm run test:watch
```

## Deployment

### Deploy to AWS Lambda

#### Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** configured (or use environment variables)
3. **Serverless Framework** installed globally (optional)

#### Deployment Steps

1. **Configure Environment Variables**

Ensure your `.env` file has all production values:
- `DATABASE_URL_PRODUCTION` (Supabase connection string)
- `REQRES_API_KEY`
- `JWT_SECRET`
- AWS credentials

2. **Deploy Backend**

```bash
cd backend
npx serverless deploy
```

Or with force update:

```bash
npx serverless deploy --force
```

3. **Verify Deployment**

After deployment, you'll see output like:

```
endpoints:
  ANY - https://[api-id].execute-api.us-east-1.amazonaws.com/dev/
  ANY - https://[api-id].execute-api.us-east-1.amazonaws.com/dev/{proxy+}
functions:
  api: samy-backend-dev-api
```

4. **Test Deployed API**

```bash
curl https://[api-id].execute-api.us-east-1.amazonaws.com/dev/health
```

#### Important Configuration Notes

- Lambda function timeout: **30 seconds**
- API Gateway timeout: **29 seconds**
- Memory: **512 MB**
- Runtime: **Node.js 18.x**
- Region: **us-east-1**

#### Manual Environment Variables (if needed)

If environment variables don't deploy correctly via `serverless.yml`, add them manually:

1. Go to AWS Console → Lambda
2. Select function `samy-backend-dev-api`
3. Configuration → Environment variables
4. Add missing variables (especially `REQRES_API_KEY`)

### View Logs

```bash
# Real-time logs
npx serverless logs -f api --tail

# Last 5 minutes
npx serverless logs -f api --startTime 5m
```

### Rollback Deployment

```bash
npx serverless rollback -t [timestamp]
```

### Remove Deployment

```bash
npx serverless remove
```

## API Documentation

### Base URL

- **Local:** http://localhost:3001
- **Production:** https://m1k4e4b2pg.execute-api.us-east-1.amazonaws.com/dev

### Authentication

#### POST `/api/auth/request-code`
Request a magic code sent to email.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Magic code sent to your email",
  "expiresInMinutes": 15
}
```

#### POST `/api/auth/verify-code`
Verify magic code and get JWT token.

**Request:**
```json
{
  "token": "magic_code_from_email"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

#### POST `/api/auth/login`
Login with email and password (ReqRes proxy).

**Request:**
```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

**Response:**
```json
{
  "success": true,
  "token": "QpwL5tke4Pnpja7X4",
  "message": "Login successful"
}
```

### Users

#### POST `/api/users/import/:id`
Import user from ReqRes API to local database.

**Response:**
```json
{
  "success": true,
  "message": "User imported and saved locally",
  "user": {
    "id": 1,
    "email": "janet.weaver@reqres.in",
    "firstName": "Janet",
    "lastName": "Weaver",
    "avatar": "https://reqres.in/img/faces/2-image.jpg",
    "reqresId": 2
  }
}
```

#### GET `/api/users/saved`
Get all saved users with pagination.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)

**Response:**
```json
{
  "success": true,
  "users": [...],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

#### GET `/api/users/saved/:id`
Get a specific saved user by ID.

### Posts

#### GET `/api/posts`
Get all posts with pagination and author information.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)

**Response:**
```json
{
  "success": true,
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "content": "Post content...",
      "authorUserId": 1,
      "author": {
        "id": 1,
        "firstName": "Janet",
        "lastName": "Weaver",
        "email": "janet.weaver@reqres.in"
      }
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

#### POST `/api/posts`
Create a new post.

**Request:**
```json
{
  "title": "My Post Title",
  "content": "Post content here...",
  "authorUserId": 1
}
```

#### GET `/api/posts/:id`
Get a specific post by ID.

#### PUT `/api/posts/:id`
Update a post.

**Request:**
```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### DELETE `/api/posts/:id`
Delete a post.

### Health Check

#### GET `/health`
Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Backend is running",
  "timestamp": "2026-04-07T17:00:00.000Z"
}
```

### Rate Limiting

All `/api/*` endpoints are rate-limited to **100 requests per 15 minutes** per IP address.

**Rate Limit Response (429):**
```json
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

### Request IDs

Every response includes an `X-Request-ID` header for tracing and debugging.

## Bonus Features

### 1. Rate Limiting 
- Implemented using `express-rate-limit`
- 100 requests per 15-minute window per IP
- Applies to all `/api/*` routes
- Returns `429 Too Many Requests` when exceeded

### 2. Observability 
- **Request IDs:** Unique UUID for each request in `X-Request-ID` header
- **Structured Logging:** JSON-formatted logs with:
  - `requestId`
  - `method`
  - `path`
  - `statusCode`
  - `duration`
  - `timestamp`

### 3. Pagination 
- Implemented on:
  - `GET /api/posts` (page, limit, totalPages)
  - `GET /api/users/saved` (page, limit, totalPages)

### 4. Testing 
- **Backend:** 12 tests covering auth, users, and posts
- **Frontend:** 9 tests for components and user interactions
- Run with `npm test`

## Troubleshooting

### Common Issues

#### Database Connection Errors

**Problem:** `Unable to connect to database`

**Solution:**
- Verify `DATABASE_URL` is correct
- For Supabase, use the **transaction pooler** connection string (port 6543)
- Check if database is running: `pg_isready`

#### ReqRes API 401 Errors

**Problem:** `missing_api_key` error

**Solution:**
- Get API key from [app.reqres.in/api-keys](https://app.reqres.in/api-keys)
- Add to `.env`: `REQRES_API_KEY=your_key_here`
- Restart backend server

#### Lambda Deployment Fails

**Problem:** Environment variables not loading

**Solution:**
- Check `.env` file exists in root directory
- Verify `serverless.yml` has correct variable references
- Add variables manually in AWS Console if needed

#### Frontend Can't Connect to Backend

**Problem:** CORS errors or connection refused

**Solution:**
- Verify backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Ensure `CORS_ORIGIN` in backend `.env` includes frontend URL

## License

This project is licensed under the ISC License.

## Author

**David Rocha Tabares**

- GitHub: [@DavidRochaTabares](https://github.com/DavidRochaTabares)

## Acknowledgments

- [ReqRes](https://reqres.in) for the mock API
- [Supabase](https://supabase.com) for PostgreSQL hosting
- [Serverless Framework](https://www.serverless.com) for AWS deployment
- Atlassian for the challenge guidelines
