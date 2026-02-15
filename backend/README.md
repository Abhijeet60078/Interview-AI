# Interview Ace AI - Backend

Backend server for Interview Ace AI, an intelligent interview preparation platform.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Project Structure](#project-structure)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/interview-ace
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment type (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `FRONTEND_URL`: Frontend application URL for CORS

## Running the Server

### Development Mode
```bash
npm run dev
```
Server runs with nodemon for auto-restart on file changes.

### Production Mode
```bash
npm start
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/logout` | Logout user | ✅ |
| GET | `/me` | Get current user | ✅ |

### Question Routes (`/api/questions`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all questions (with filters) | ❌ |
| GET | `/:id` | Get single question | ❌ |
| GET | `/category/:category` | Get questions by category | ❌ |
| GET | `/search?query=` | Search questions | ❌ |
| POST | `/` | Create new question | ✅ |
| PUT | `/:id` | Update question | ✅ |
| DELETE | `/:id` | Delete question | ✅ |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get user profile | ✅ |
| PUT | `/profile` | Update user profile | ✅ |
| POST | `/bookmark` | Save question | ✅ |
| DELETE | `/bookmark` | Unsave question | ✅ |
| GET | `/bookmarked` | Get saved questions | ✅ |
| POST | `/change-password` | Change password | ✅ |

### Progress Routes (`/api/progress`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/track` | Track question attempt | ✅ |
| GET | `/` | Get user progress | ✅ |
| GET | `/solved` | Get solved questions | ✅ |
| GET | `/attempted` | Get attempted questions | ✅ |
| GET | `/category/:category` | Get progress by category | ✅ |
| DELETE | `/clear` | Clear all progress | ✅ |

### Analytics Routes (`/api/analytics`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/overview` | Overall statistics | ✅ |
| GET | `/topics` | Statistics by topic | ✅ |
| GET | `/difficulty` | Statistics by difficulty | ✅ |
| GET | `/insights` | Strengths & weaknesses | ✅ |
| GET | `/interviews` | Mock interview stats | ✅ |

## Database Models

### User
```javascript
{
  firstname: String,
  lastname: String,
  email: String (unique),
  password: String (hashed),
  profileImage: String,
  bio: String,
  targetCompanies: [String],
  targetRole: String,
  experienceLevel: 'beginner' | 'intermediate' | 'advanced',
  preferredTopics: [String],
  savedQuestions: [QuestionId],
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Question
```javascript
{
  id: Number,
  title: String,
  description: String,
  difficulty: 'easy' | 'medium' | 'hard',
  company: [String],
  topic: String,
  category: String,
  acceptance: Number,
  likes: Number,
  dislikes: Number,
  leetcodeSlug: String,
  solution: String,
  createdAt: Date
}
```

### UserProgress
```javascript
{
  userId: UserId,
  questionId: QuestionId,
  status: 'attempted' | 'solved' | 'skipped' | 'bookmarked',
  attempts: Number,
  timeTaken: Number (seconds),
  code: String,
  notes: String,
  accuracy: Number (0-100),
  isSaved: Boolean,
  lastAttempt: Date,
  completedAt: Date
}
```

### MockInterview
```javascript
{
  userId: UserId,
  title: String,
  difficulty: 'easy' | 'medium' | 'hard',
  category: String,
  duration: Number (minutes),
  questions: [{
    questionId: QuestionId,
    asked: Boolean,
    answered: Boolean,
    feedback: String,
    score: Number
  }],
  score: Number,
  feedback: String,
  status: 'ongoing' | 'completed' | 'abandoned',
  startedAt: Date,
  completedAt: Date
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── questionController.js # Question management
│   ├── userController.js    # User management
│   ├── progressController.js # Progress tracking
│   └── analyticsController.js # Analytics logic
├── models/
│   ├── User.js              # User schema
│   ├── Question.js          # Question schema
│   ├── UserProgress.js      # Progress schema
│   └── MockInterview.js     # Interview schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── questionRoutes.js    # Question endpoints
│   ├── userRoutes.js        # User endpoints
│   ├── progressRoutes.js    # Progress endpoints
│   └── analyticsRoutes.js   # Analytics endpoints
├── middleware/
│   └── auth.js              # JWT authentication
├── utils/
│   └── (utility functions)
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── server.js                # Main server entry point
└── README.md                # Documentation
```

## Example API Usage

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Questions with Filters
```bash
curl "http://localhost:5000/api/questions?difficulty=medium&category=dsa&topic=Arrays"
```

### Track Progress
```bash
curl -X POST http://localhost:5000/api/progress/track \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "QUESTION_ID",
    "status": "solved",
    "timeTaken": 1200,
    "accuracy": 95
  }'
```

## Next Steps

1. Set up MongoDB database
2. Configure environment variables
3. Run `npm install`
4. Start with `npm run dev`
5. Test endpoints using Postman or curl
6. Connect frontend to backend APIs

## Support

For issues or questions, please create an issue in the repository.
