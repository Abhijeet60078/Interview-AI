# Backend Setup Guide

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and set:
```env
MONGODB_URI=mongodb://localhost:27017/interview-ace
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3000
```

### Step 3: Start Backend
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server runs on: `http://localhost:5000`

### Step 4: Seed Database (Optional)
```bash
npm run seed
```

This populates the database with sample questions.

---

## 📊 Database Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-ace
```

---

## ✅ Verify Installation

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "message": "Backend is running successfully",
  "timestamp": "2026-02-08T..."
}
```

### Test Authentication
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Test",
    "lastname": "User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

---

## 🔌 Connect Frontend to Backend

Update frontend API base URL in your environment:

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Frontend API Service** (create `src/api/axiosInstance.js`):
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 📁 Directory Structure

```
backend/
├── config/           # Database & app config
├── controllers/      # Business logic
├── models/          # Database schemas
├── routes/          # API endpoints
├── middleware/      # Auth & validation
├── utils/           # Helper functions
├── scripts/         # Seed & utilities
├── .env.example     # Environment template
├── .gitignore       # Git ignore rules
├── package.json     # Dependencies
├── server.js        # Entry point
└── README.md        # Full documentation
```

---

## 🛣️ API Endpoints Quick Reference

| Category | Endpoint | Method |
|----------|----------|--------|
| **Auth** | `/auth/signup` | POST |
| | `/auth/login` | POST |
| | `/auth/me` | GET |
| **Questions** | `/questions` | GET |
| | `/questions/category/:category` | GET |
| | `/questions/search` | GET |
| **User** | `/users/profile` | GET/PUT |
| | `/users/bookmark` | POST/DELETE |
| **Progress** | `/progress/track` | POST |
| | `/progress` | GET |
| **Analytics** | `/analytics/overview` | GET |
| | `/analytics/topics` | GET |

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Ensure MongoDB is running
```bash
mongod  # or check MongoDB Atlas connection string
```

### Port Already in Use
```
Error: EADDRINUSE: address already in use :::5000
```
**Solution:** Change port in `.env`
```env
PORT=5001
```

### JWT Secret Missing
```
Error: JWT_SECRET not defined
```
**Solution:** Add to `.env`
```env
JWT_SECRET=your-secret-key
```

---

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jwt**: Authentication tokens
- **bcryptjs**: Password hashing
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **nodemon**: Auto-reload (dev)

---

## 🎯 Next Steps

1. ✅ Install & run backend
2. ✅ Test API endpoints
3. ✅ Connect frontend to backend
4. ✅ Add authentication to frontend
5. ✅ Build progress tracking UI
6. ✅ Create analytics dashboard

---

## 📞 Support

For issues:
1. Check `.env` configuration
2. Verify MongoDB connection
3. Review error logs
4. Check API documentation in README.md

Enjoy! 🚀
