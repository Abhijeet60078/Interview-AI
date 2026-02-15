# 🚀 Quick Start - AI Features

## Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

## Start Frontend (Terminal 2)
```bash
cd remix-of-interview-ace-ai
npm run dev
```

## Test AI Features

### 1. **Test Mock Interview AI Feedback**
1. Open: http://localhost:3000/mock
2. Click "Start Interview" on any card
3. Choose "Text Mode"
4. Answer a question
5. Click "Get AI Feedback"
6. See real AI analysis! ✨

### 2. **Test Code Analysis AI**
1. Open: http://localhost:3000/ai-feedback
2. Paste any code
3. Click "Analyze Code"
4. See detailed AI analysis! ✨

## API Test with curl/Postman

### Test Interview Feedback
```bash
curl -X POST http://localhost:5000/api/ai/feedback/interview \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is a closure in JavaScript?",
    "answer": "A closure is a function that has access to variables in its outer scope, even after the outer function has returned. This creates a private scope.",
    "category": "frontend"
  }'
```

### Test Code Analysis
```bash
curl -X POST http://localhost:5000/api/ai/feedback/code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
    "language": "JavaScript",
    "problemStatement": "Find two numbers in array that sum to target"
  }'
```

## Expected Response Times
- Interview Feedback: ~3-5 seconds
- Code Analysis: ~5-10 seconds

## Troubleshooting

### Backend not starting?
- Check MongoDB connection in .env
- Ensure PORT 5000 is free

### AI not responding?
- Check backend logs for errors
- Verify GEMINI_API_KEY in backend/.env
- Check internet connection

### Frontend not connecting?
- Ensure backend is running first
- Check FRONTEND_URL in backend/.env matches your frontend URL

## Success Indicators

✅ Backend: "Interview Ace Backend running on http://localhost:5000"
✅ Frontend: "Local: http://localhost:3000"
✅ AI Response: Detailed feedback with scores and suggestions

---

**You're all set!** 🎉 The AI integration is working!
