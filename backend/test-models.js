import { GoogleGenerativeAI } from '@google/generative-ai';

const listModels = async () => {
  try {
    console.log('🔍 Listing available models...');
    const genAI = new GoogleGenerativeAI('AIzaSyDEY_nXedn7R5e-8gcjpLw0bgr2xNfWyxs');
    
    // Try different model names
    const modelNames = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.0-pro',
      'models/gemini-pro',
      'models/gemini-1.5-flash'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say "test"');
        const response = await result.response;
        console.log(`✅ ${modelName} WORKS! Response:`, response.text());
        break;
      } catch (error) {
        console.log(`❌ ${modelName} failed:`);
        console.log(error.message);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
};

listModels();
