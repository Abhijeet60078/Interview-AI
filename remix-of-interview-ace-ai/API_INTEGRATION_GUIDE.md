# Frontend-Backend Integration Guide

## ✅ What Was Set Up

1. ✅ Axios HTTP client installed
2. ✅ API instance with interceptors (`src/api/axiosInstance.js`)
3. ✅ API services for all endpoints (`src/api/services.js`)
4. ✅ Environment variable for API URL (`.env`)

---

## 🔌 How to Use in Frontend Pages

### **Example: Login Page**

Update `src/pages/Login.jsx`:

```javascript
import { authAPI } from '@/api/services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      // Save token
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### **Example: Question Bank (Get Questions from Backend)**

Update `src/pages/QuestionBank.jsx`:

```javascript
import { questionAPI } from '@/api/services';
import { useEffect, useState } from 'react';

export default function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionAPI.getAllQuestions({
          difficulty: 'easy',
          category: 'dsa'
        });
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### **Example: Track Progress**

```javascript
import { progressAPI } from '@/api/services';

const trackQuestion = async (questionId) => {
  try {
    await progressAPI.trackProgress({
      questionId,
      status: 'solved',
      timeTaken: 1200,
      accuracy: 95
    });
    console.log('Progress saved!');
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};
```

---

### **Example: Get Analytics**

```javascript
import { analyticsAPI } from '@/api/services';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await analyticsAPI.getOverallStats();
        setStats(response.data.stats);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <p>Total Attempted: {stats.totalAttempted}</p>
      <p>Total Solved: {stats.totalSolved}</p>
      <p>Success Rate: {stats.successRate}%</p>
    </div>
  );
}
```

---

## 🚀 How to Run

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
Expected: Backend on http://localhost:5000

### Terminal 2: Frontend
```bash
cd remix-of-interview-ace-ai
npm run dev
```
Expected: Frontend on http://localhost:5173 (or similar)

---

## 🧪 Test Connection

Open browser DevTools (F12) → Network tab

1. Try to login
2. Should see POST to `http://localhost:5000/api/auth/login`
3. Response should include token & user data
4. Token saved in localStorage

---

## 📋 API Services Available

### Authentication
```javascript
authAPI.signup(data)
authAPI.login(data)
authAPI.logout()
authAPI.getCurrentUser()
```

### Questions
```javascript
questionAPI.getAllQuestions(params)
questionAPI.getQuestionById(id)
questionAPI.getQuestionsByCategory(category)
questionAPI.searchQuestions(query)
```

### User
```javascript
userAPI.getProfile()
userAPI.updateProfile(data)
userAPI.saveQuestion(questionId)
userAPI.unsaveQuestion(questionId)
userAPI.getSavedQuestions()
userAPI.changePassword(data)
```

### Progress
```javascript
progressAPI.trackProgress(data)
progressAPI.getUserProgress()
progressAPI.getSolvedQuestions()
progressAPI.getAttemptedQuestions()
progressAPI.getProgressByCategory(category)
progressAPI.clearProgress()
```

### Analytics
```javascript
analyticsAPI.getOverallStats()
analyticsAPI.getTopicStats()
analyticsAPI.getDifficultyStats()
analyticsAPI.getStrengthsAndWeaknesses()
analyticsAPI.getMockInterviewStats()
```

---

## ⚠️ Common Issues

### **CORS Error?**
- Backend CORS must allow frontend URL
- Check backend `server.js` CORS config
- Should be: `origin: 'http://localhost:3000'` or `'http://localhost:5173'`

### **404 on API Calls?**
- Check backend is running on port 5000
- Check `.env` has correct `VITE_API_URL`
- Check endpoint names match

### **401 Unauthorized?**
- Token not being sent with requests
- Token might be expired
- Check localStorage has 'authToken'

### **CORS Policy Error?**
Update backend `server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

---

## ✅ Integration Checklist

- [ ] Axios installed: `npm install axios`
- [ ] API instance created: `src/api/axiosInstance.js`
- [ ] API services created: `src/api/services.js`
- [ ] Frontend `.env` configured
- [ ] Backend running on port 5000
- [ ] Frontend running
- [ ] Test login/signup
- [ ] Test question fetching
- [ ] Test progress tracking
- [ ] Test analytics

---

## 🎯 Next Steps

1. ✅ Update Login/Signup pages to use `authAPI`
2. ✅ Update QuestionBank to use `questionAPI`
3. ✅ Add progress tracking on question attempts
4. ✅ Create Dashboard with `analyticsAPI`
5. ✅ Remove local data from frontend
6. ✅ Deploy both to cloud

---

Done! Frontend & Backend are now ready to communicate! 🚀
