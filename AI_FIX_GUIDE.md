# 🔧 AI Not Working? Fix Guide

## Problem
Your AI feedback shows **generic responses** instead of analyzing the actual question and answer.

## Root Cause
❌ **Invalid or expired Gemini API key**

The current key in your `.env` file is not valid, so the system falls back to generic responses.

## ✅ Solution (2 minutes)

### Step 1: Get FREE API Key
1. Visit: **https://aistudio.google.com/app/apikey**
2. Sign in with Google account
3. Click "Create API Key" → "Create API key in new project"
4. Copy the key (starts with `AIza...`)

### Step 2: Update Backend
Open: `D:\Interview-AI\backend\.env`

Replace line 16:
```env
# OLD (invalid)
GEMINI_API_KEY=AIzaSyBIh8lMcGDD6ORh8hV0i5BQPVvU1b4uMxs

# NEW (your key)
GEMINI_API_KEY=AIza_YOUR_NEW_KEY_HERE
```

### Step 3: Restart Backend
```powershell
# Kill existing backend
taskkill /F /IM node.exe

# Start backend
cd D:\Interview-AI\backend
npm run dev
```

### Step 4: Test
1. Go to frontend (http://localhost:8080)
2. Start a mock interview
3. Submit an answer
4. You should now see **real AI analysis** without warning banners!

## How to Verify It's Working

### ✅ Real AI Working:
- No yellow warning banner
- Specific feedback related to your answer
- Analysis mentions question details
- Score reflects actual quality

### ❌ Fallback (Not Working):
- Yellow warning banner appears
- Generic feedback: "Your answer demonstrates good understanding..."
- Same feedback for all answers
- Message: "⚠️ INVALID API KEY"

## Free Tier Limits
- **60 requests per minute**
- **1,500 requests per day**
- More than enough for learning!

## Need Help?
- API Key Issues: https://ai.google.dev/gemini-api/docs/api-key
- Test your key with: `cd backend && node test-ai.js`
