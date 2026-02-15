import { GoogleGenerativeAI } from '@google/generative-ai';

const testAI = async () => {
  try {
    console.log('🔍 Testing Gemini API...');
    const genAI = new GoogleGenerativeAI('AIzaSyDEY_nXedn7R5e-8gcjpLw0bgr2xNfWyxs');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    console.log('📤 Sending test prompt...');
    const result = await model.generateContent('What is 2 + 2? Answer in one short sentence.');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ AI Response:', text);
    console.log('✅ AI is working correctly!');
  } catch (error) {
    console.error('❌ AI Error:', error.message);
    console.error('❌ Full error:', error);
    
    if (error.message.includes('API key')) {
      console.error('\n⚠️ API Key Issue: The API key might be invalid or expired.');
      console.error('Get a new key from: https://makersuite.google.com/app/apikey');
    } else if (error.message.includes('429') || error.message.includes('quota')) {
      console.error('\n⚠️ Rate Limit: You have exceeded the API quota.');
    }
  }
};

testAI();
