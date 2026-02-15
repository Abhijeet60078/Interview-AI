export const executeCode = async (req, res) => {
  try {
    const { language_id, source_code, stdin } = req.body;

    if (!language_id || !source_code) {
      return res.status(400).json({ message: 'Language ID and source code are required' });
    }

    // Submit code to Judge0 public API (free tier)
    const submitResponse = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true&fields=*',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': process.env.JUDGE0_API_KEY || '0c1bbf70eamsh0a3c2949bb8a43bp142c61jsn46e8df8b86cc'
        },
        body: JSON.stringify({
          language_id,
          source_code,
          stdin: stdin || '',
          cpu_time_limit: 2,
          memory_limit: 128000
        }),
      }
    );

    if (!submitResponse.ok) {
      // If RapidAPI fails, provide fallback response
      return res.status(200).json({
        stdout: '[Demo Mode] Code execution is currently unavailable.\nTo enable real code execution, configure a valid Judge0 API key in your backend .env file.\n\nYour code:\n' + source_code,
        stderr: '',
        compile_output: '',
        status: 'Demo',
        time: '0',
        memory: '0'
      });
    }

    const result = await submitResponse.json();

    // Format output
    let output = {
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      compile_output: result.compile_output || '',
      status: result.status?.description || 'Unknown',
      time: result.time || '',
      memory: result.memory || '',
    };

    res.status(200).json(output);
  } catch (error) {
    console.error('Code execution error:', error);
    // Return demo mode response on error
    res.status(200).json({
      stdout: '[Demo Mode] Code execution encountered an error.\nYour code has been received but cannot be executed at this time.\n\nError: ' + error.message,
      stderr: '',
      compile_output: '',
      status: 'Error',
      time: '0',
      memory: '0'
    });
  }
};
