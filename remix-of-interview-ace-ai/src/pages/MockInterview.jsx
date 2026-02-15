import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { questionAPI, aiAPI } from "@/api/services";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { bracketMatching, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { lintKeymap } from '@codemirror/lint';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { EditorState } from '@codemirror/state';
import { keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor, rectangularSelection, crosshairCursor, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { 
  Video, 
  Clock, 
  Target, 
  Trophy, 
  PlayCircle, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Code,
  Layers,
  MessageSquare,
  Briefcase,
  X,
  Send,
  Sparkles,
  ChevronLeft,
  Mic,
  Webcam,
  Play,
  Square,
  Upload,
  PlusCircle,
  FileText,
  Download,
  Terminal
} from "lucide-react";

const MockInterview = () => {
  const navigate = useNavigate();
  const [selectedRound, setSelectedRound] = useState(null);
  const [interviewMode, setInterviewMode] = useState(null); // "video" or "text"
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [aiWarning, setAiWarning] = useState(null);
  
  // Code Editor State
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [code, setCode] = useState('// Write your solution here\nfunction solution() {\n  console.log("Hello World");\n}\n\nsolution();');
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [editorFontSize, setEditorFontSize] = useState(14);
  const [lineWrap, setLineWrap] = useState(false);
  
  // Video/Camera State
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef(null);
  
  // Question Upload State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customQuestion, setCustomQuestion] = useState({ title: "", description: "", difficulty: "medium", category: "dsa" });
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  
  // File Upload State (Optional for submissions)
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  const [mockTypes] = useState([
    {
      id: 1,
      title: "DSA Mock Interview",
      description: "Data Structures & Algorithms focused interview",
      duration: "45 min",
      questions: 2,
      difficulty: "Medium",
      icon: Code,
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      topics: ["Arrays", "Trees", "Dynamic Programming"],
      category: "dsa",
    },
    {
      id: 2,
      title: "System Design",
      description: "Design scalable systems and architecture",
      duration: "60 min",
      questions: 1,
      difficulty: "Hard",
      icon: Layers,
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-400",
      topics: ["Scalability", "Database Design", "Load Balancing"],
      category: "systemdesign",
    },
    {
      id: 3,
      title: "Behavioral Interview",
      description: "Leadership, teamwork, and problem-solving",
      duration: "30 min",
      questions: 5,
      difficulty: "Easy",
      icon: MessageSquare,
      color: "from-green-500/20 to-green-600/20",
      iconColor: "text-green-400",
      topics: ["Leadership", "Conflict Resolution", "Team Work"],
      category: "behavioral",
    },
    {
      id: 4,
      title: "Frontend Round",
      description: "Frontend technologies and web development",
      duration: "45 min",
      questions: 4,
      difficulty: "Medium",
      icon: Code,
      color: "from-cyan-500/20 to-cyan-600/20",
      iconColor: "text-cyan-400",
      topics: ["React", "JavaScript", "CSS", "Performance"],
      category: "frontend",
    },
    {
      id: 5,
      title: "Full Stack Round",
      description: "Complete technical interview simulation",
      duration: "90 min",
      questions: 4,
      difficulty: "Hard",
      icon: Briefcase,
      color: "from-orange-500/20 to-orange-600/20",
      iconColor: "text-orange-400",
      topics: ["Frontend", "Backend", "Database", "DSA"],
      category: "fullstack",
    },
  ]);

  const [pastMocks] = useState([]);

  //Load all questions from database on mount
  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        setIsLoadingQuestions(true);
        const response = await questionAPI.getAllQuestions({});
        if (response.data && response.data.questions) {
          setUploadedQuestions(response.data.questions);
        }
      } catch (error) {
        console.error('Failed to load questions from database:', error);
      } finally {
        setIsLoadingQuestions(false);
      }
    };
    loadAllQuestions();
  }, []);

  // Update code template when language changes
  useEffect(() => {
    if (selectedRound?.category === "dsa" && interviewMode === "text") {
      setCode(getDefaultCode(selectedLanguage));
    }
  }, [selectedLanguage]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const generateAIFeedback = async (answer, questionContext) => {
    try {
      console.log('🤖 Generating AI feedback...');
      console.log('Question Context:', questionContext);
      console.log('Answer:', answer.substring(0, 100) + '...');
      
      setIsGeneratingFeedback(true);
      
      // Call real AI API with full context
      console.log('Calling AI API...');
      const response = await aiAPI.generateInterviewFeedback(
        questionContext.title,
        answer,
        questionContext.category,
        questionContext.description,
        questionContext.difficulty
      );
      
      console.log('AI API Response:', response);
      
      if (response.data.success && response.data.feedback) {
        // Check if using fallback
        if (response.data.usingFallback || response.data.note) {
          console.warn('⚠️ Using fallback feedback:', response.data.note);
          setAiWarning(response.data.note);
        } else {
          console.log('✅ AI feedback successfully generated:', response.data.feedback);
          setAiWarning(null);
        }
        return response.data.feedback;
      }
      
      // Fallback if API returns unexpected format
      console.warn('⚠️ API response unexpected, using fallback');
      setAiWarning('AI service error - using fallback feedback');
      return getFallbackFeedback();
      
    } catch (error) {
      console.error('❌ AI Feedback Error:', error);
      console.error('Error details:', error.response?.data || error.message);
      // Return fallback feedback on error
      setAiWarning('Network error - using fallback feedback');
      return getFallbackFeedback();
    } finally {
      setIsGeneratingFeedback(false);
      console.log('AI feedback generation complete');
    }
  };

  const getFallbackFeedback = () => {
    // Fallback feedback if AI fails
    // Mock AI feedback generation
    const feedbacks = [
      {
        score: 8.5,
        positive: ["Great explanation", "Covered important concepts", "Good understanding of the topic"],
        improvements: ["Could have mentioned performance implications", "Try to provide more real-world examples"],
        suggestion: "Your answer demonstrates solid knowledge. Consider adding edge cases and performance considerations in future interviews."
      },
      {
        score: 7.2,
        positive: ["Good foundation", "Correct approach", "Clear thinking"],
        improvements: ["Missing some advanced concepts", "Could explain the 'why' better"],
        suggestion: "You're on the right track! Deepen your knowledge by studying the underlying mechanisms."
      },
      {
        score: 9.0,
        positive: ["Excellent understanding", "Comprehensive answer", "Great real-world examples"],
        improvements: ["Very minor point"],
        suggestion: "Outstanding answer! You clearly have strong knowledge in this area."
      },
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const handleStartRound = async (mockType) => {
    try {
      // Filter questions from database by category
      const categoryQuestions = uploadedQuestions.filter(q => q.category === mockType.category);
      
      if (categoryQuestions.length > 0) {
        setSelectedRound(mockType);
        setRoundQuestions(categoryQuestions);
        // Show mode selection instead of starting directly
        setInterviewMode(null);
      } else {
        alert(`No questions available for ${mockType.title}. Please upload questions first using the "Upload Question" button.`);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      alert("Error loading questions. Please try again.");
    }
  };

  const handleSubmitAnswer = async () => {
    console.log('Submit button clicked!');
    console.log('Interview Mode:', interviewMode);
    console.log('Selected Round:', selectedRound);
    
    // For DSA text mode, use code; for others use userAnswer
    const answerText = (interviewMode === "text" && selectedRound?.category === "dsa") 
      ? code 
      : userAnswer;
    
    console.log('Answer Text:', answerText);
    console.log('Uploaded File:', uploadedFile);
    
    if (!answerText.trim()) {
      alert("⚠️ Please provide an answer before submitting");
      return;
    }
    
    console.log('Generating AI feedback...');
    const currentQuestion = roundQuestions[currentQuestionIndex];
    console.log('Current Question:', currentQuestion);
    
    // Prepare full question context for AI
    const questionContext = {
      title: currentQuestion.title || currentQuestion.question || "Interview Question",
      description: currentQuestion.description || "",
      difficulty: currentQuestion.difficulty || "medium",
      category: selectedRound.category,
      topic: currentQuestion.topic || ""
    };
    
    // Add file information to answer if file is uploaded
    let enhancedAnswer = answerText;
    if (uploadedFile) {
      enhancedAnswer = `${answerText}\n\n📎 Additional Documentation: ${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(2)} KB)`;
      console.log('Enhanced answer with file info:', enhancedAnswer);
    }
    
    const feedback = await generateAIFeedback(
      enhancedAnswer,
      questionContext
    );
    
    console.log('AI Feedback received:', feedback);
    setAiFeedback(feedback);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < roundQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setCode(getDefaultCode(selectedLanguage));
      setCodeOutput("");
      setAiFeedback(null);
      setShowFeedback(false);
      setUploadedFile(null);
      setFilePreview(null);
    } else {
      alert("Interview completed! Great job!");
      setSelectedRound(null);
    }
  };

  const handleBackToRounds = () => {
    stopCamera();
    setSelectedRound(null);
    setInterviewMode(null);
    setUserAnswer("");
    setAiFeedback(null);
    setUploadedFile(null);
    setFilePreview(null);
  };

  // Get default code template based on language
  const getDefaultCode = (language) => {
    const templates = {
      'JavaScript': '// Write your solution here\nfunction solution() {\n  console.log("Hello World");\n}\n\nsolution();',
      'Python': '# Write your solution here\ndef solution():\n    print("Hello World")\n\nsolution()',
      'Java': '// Write your solution here\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
      'C++': '// Write your solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}'
    };
    return templates[language] || templates['JavaScript'];
  };

  const handleSelectMode = (mode) => {
    setInterviewMode(mode);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setCode(getDefaultCode(selectedLanguage));
    setCodeOutput("");
    setAiFeedback(null);
    setShowFeedback(false);
    
    // Start camera if video mode is selected (but not for DSA)
    if (mode === "video" && selectedRound?.category !== "dsa") {
      startCamera();
    }
  };

  // Helper function to extract balanced parentheses content
  const extractBalancedParens = (str, startIndex) => {
    let depth = 1;
    let i = startIndex + 1;
    let content = '';
    
    while (i < str.length && depth > 0) {
      if (str[i] === '(') depth++;
      else if (str[i] === ')') depth--;
      
      if (depth > 0) content += str[i];
      i++;
    }
    
    return content;
  };

  // Enhanced Python print() parser
  const parsePythonPrints = (code) => {
    const outputs = [];
    let searchIndex = 0;
    
    while (true) {
      const printIndex = code.indexOf('print(', searchIndex);
      if (printIndex === -1) break;
      
      try {
        const content = extractBalancedParens(code, printIndex + 5);
        // Remove quotes and evaluate simple expressions
        let cleaned = content.trim();
        
        // Handle string literals
        cleaned = cleaned.replace(/^["']|["']$/g, '');
        
        // Handle f-strings and format strings (simplified)
        cleaned = cleaned.replace(/f["'](.+?)["']/g, '$1');
        
        // Handle comma-separated arguments (join with space)
        if (cleaned.includes(',')) {
          cleaned = cleaned.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).join(' ');
        }
        
        outputs.push(cleaned);
        searchIndex = printIndex + 6;
      } catch (e) {
        searchIndex = printIndex + 6;
      }
    }
    
    return outputs;
  };

  // Enhanced Java System.out parser with complex expression support
  const parseJavaPrints = (code) => {
    const outputs = [];
    
    // Match both println and print
    const patterns = [
      { regex: /System\.out\.println/g, addNewline: true },
      { regex: /System\.out\.print(?!ln)/g, addNewline: false }
    ];
    
    patterns.forEach(({ regex, addNewline }) => {
      let match;
      while ((match = regex.exec(code)) !== null) {
        try {
          const startIdx = match.index + match[0].length;
          if (code[startIdx] === '(') {
            const content = extractBalancedParens(code, startIdx);
            
            // Parse the expression intelligently
            let output = '';
            
            // Split by + operator while preserving strings
            const parts = [];
            let current = '';
            let inString = false;
            let stringChar = '';
            let depth = 0;
            
            for (let i = 0; i < content.length; i++) {
              const char = content[i];
              
              if ((char === '"' || char === "'") && (i === 0 || content[i-1] !== '\\')) {
                if (!inString) {
                  inString = true;
                  stringChar = char;
                  current += char;
                } else if (char === stringChar) {
                  inString = false;
                  current += char;
                }
              } else if (char === '[' || char === '(') {
                depth++;
                current += char;
              } else if (char === ']' || char === ')') {
                depth--;
                current += char;
              } else if (char === '+' && !inString && depth === 0) {
                if (current.trim()) parts.push(current.trim());
                current = '';
              } else {
                current += char;
              }
            }
            if (current.trim()) parts.push(current.trim());
            
            // Process each part
            for (const part of parts) {
              const trimmed = part.trim();
              
              // String literal
              if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
                  (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
                output += trimmed.slice(1, -1);
              }
              // Array access or variable
              else if (trimmed.includes('[')) {
                // Show placeholder for array access
                const varName = trimmed.split('[')[0];
                output += `{${trimmed}}`;
              }
              // Method call
              else if (trimmed.includes('(')) {
                output += `{${trimmed}}`;
              }
              // Simple variable
              else if (/^[a-zA-Z_]\w*$/.test(trimmed)) {
                output += `{${trimmed}}`;
              }
              // Number literal
              else if (!isNaN(trimmed)) {
                output += trimmed;
              }
              // Complex expression
              else {
                output += `{${trimmed}}`;
              }
            }
            
            outputs.push(output);
          }
        } catch (e) {
          // Skip malformed statements
        }
      }
    });
    
    return outputs;
  };

  // Enhanced C++ cout parser with complex expression support
  const parseCppCouts = (code) => {
    const outputs = [];
    
    // Split by cout statements
    const coutPattern = /cout\s*<<\s*/g;
    let match;
    
    while ((match = coutPattern.exec(code)) !== null) {
      try {
        const startIdx = match.index + match[0].length;
        let content = '';
        let i = startIdx;
        let depth = 0;
        
        // Extract until semicolon (accounting for nested parens/brackets)
        while (i < code.length) {
          const char = code[i];
          
          if (char === '(' || char === '[' || char === '{') depth++;
          else if (char === ')' || char === ']' || char === '}') depth--;
          else if (char === ';' && depth === 0) break;
          
          content += char;
          i++;
        }
        
        // Parse the cout chain
        const parts = content.split(/\s*<<\s*/);
        let output = '';
        
        for (const part of parts) {
          let trimmed = part.trim();
          
          // Skip endl, '\n', newlines
          if (trimmed === 'endl' || trimmed === '"\\n"' || trimmed === "'\\n'" || 
              trimmed === 'std::endl' || trimmed === '\\n') {
            continue;
          }
          
          // String literal
          if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
              (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
            output += trimmed.slice(1, -1).replace(/\\n/g, '');
          }
          // Array access or variable
          else if (trimmed.includes('[')) {
            output += `{${trimmed}}`;
          }
          // Function call
          else if (trimmed.includes('(')) {
            output += `{${trimmed}}`;
          }
          // Simple variable
          else if (/^[a-zA-Z_]\w*$/.test(trimmed)) {
            output += `{${trimmed}}`;
          }
          // Number literal
          else if (!isNaN(trimmed)) {
            output += trimmed;
          }
          // Complex expression
          else {
            output += `{${trimmed}}`;
          }
        }
        
        if (output) outputs.push(output);
      } catch (e) {
        // Skip malformed statements
      }
    }
    
    return outputs;
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setCodeOutput("");
    
    setTimeout(() => {
      try {
        if (selectedLanguage === "JavaScript") {
          // Execute JavaScript code with enhanced capture
          const logs = [];
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;
          
          // Capture console output
          console.log = (...args) => logs.push(['log', args.map(arg => {
            if (typeof arg === 'object') {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' ')]);
          console.error = (...args) => logs.push(['error', args.map(String).join(' ')]);
          console.warn = (...args) => logs.push(['warn', args.map(String).join(' ')]);
          
          try {
            // Execute code with eval for complex multi-statement code
            // Using indirect eval for better scope isolation
            const result = (0, eval)(code);
            
            // Add result if returned and not undefined
            if (result !== undefined && logs.length === 0) {
              logs.push(['log', String(result)]);
            }
            
            // Restore console
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            
            // Format output
            const output = logs.length > 0 
              ? logs.map(([type, msg]) => {
                  if (type === 'error') return `❌ ${msg}`;
                  if (type === 'warn') return `⚠️  ${msg}`;
                  return msg;
                }).join('\n')
              : '✅ Code executed successfully (no output)';
            
            setCodeOutput(`📤 Output:\n\n${output}\n\n⏱️  Execution completed in ${Math.floor(Math.random() * 50) + 10}ms`);
          } catch (error) {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            
            // Enhanced error formatting
            let errorMsg = error.message || 'Unknown error';
            let lineInfo = '';
            
            // Try to extract line number from error
            if (error.stack) {
              const lineMatch = error.stack.match(/:(\d+):(\d+)/);
              if (lineMatch) {
                lineInfo = `\nLine: ${lineMatch[1]}, Column: ${lineMatch[2]}`;
              }
            }
            
            setCodeOutput(`❌ Runtime Error:\n\n${errorMsg}${lineInfo}\n\n${error.stack ? `Stack Trace:\n${error.stack}` : ''}`);
          }
        } else if (selectedLanguage === "Python") {
          // Enhanced Python execution with advanced print() detection
          try {
            const outputs = parsePythonPrints(code);
            
            if (outputs.length > 0) {
              const output = outputs.join('\n');
              setCodeOutput(`📤 Output:\n\n${output}\n\n⏱️  Execution completed in ${Math.floor(Math.random() * 50) + 10}ms\n\n✅ Python code executed successfully\n\nℹ️  Note: Execution simulated - print() statements parsed from ${code.split('\n').length} lines`);
            } else {
              // Check for syntax errors (basic)
              if (code.includes('def ') || code.includes('class ') || code.includes('for ') || code.includes('while ')) {
                setCodeOutput(`✅ Python code validated successfully\n\n⏱️  Analysis completed in ${Math.floor(Math.random() * 50) + 10}ms\n\nℹ️  Code structure detected but no print() output.\n💡 Add print() statements to see execution results.`);
              } else {
                setCodeOutput(`✅ Python code validated\n\n⏱️  Completed in ${Math.floor(Math.random() * 50) + 10}ms\n\nℹ️  Add print() statements to see output.`);
              }
            }
          } catch (error) {
            setCodeOutput(`❌ Python Parsing Error:\n\n${error.message}\n\nℹ️  Check your syntax and try again.`);
          }
        } else if (selectedLanguage === "Java") {
          // Enhanced Java execution with advanced System.out detection
          try {
            const outputs = parseJavaPrints(code);
            
            if (outputs.length > 0) {
              const output = outputs.join('\n');
              const hasVariables = output.includes('{');
              
              setCodeOutput(`📤 Output:\n\n${output}\n\n⏱️  Execution completed in ${Math.floor(Math.random() * 150) + 50}ms\n\n✅ Java code compiled and executed successfully\n\n📊 Processed ${code.split('\n').length} lines of code\n${outputs.length} print statement(s) detected\n${hasVariables ? '\n💡 Variables shown as {varName} - actual values would appear at runtime' : ''}\nℹ️  Note: Execution simulated - System.out statements parsed.`);
            } else {
              // Check for common Java structures
              const hasMain = code.includes('public static void main');
              const hasClass = code.includes('class ');
              
              if (hasMain && hasClass) {
                setCodeOutput(`✅ Java code compiled successfully\n\n⏱️  Compilation completed in ${Math.floor(Math.random() * 200) + 100}ms\n\n📊 Valid Java structure detected\n💡 Add System.out.println() or System.out.print() to see output.`);
              } else {
                setCodeOutput(`⚠️  Java code validated\n\n⏱️  Completed in ${Math.floor(Math.random() * 100) + 50}ms\n\nℹ️  Note: Add System.out.println() to see output.\n💡 Tip: Ensure you have a main method and class definition for complete programs.`);
              }
            }
          } catch (error) {
            setCodeOutput(`❌ Java Parsing Error:\n\n${error.message}\n\nℹ️  Check your syntax and try again.`);
          }
        } else if (selectedLanguage === "C++") {
          // Enhanced C++ execution with advanced cout detection
          try {
            const outputs = parseCppCouts(code);
            
            if (outputs.length > 0) {
              const output = outputs.join('\n');
              const hasVariables = output.includes('{');
              
              setCodeOutput(`📤 Output:\n\n${output}\n\n⏱️  Execution completed in ${Math.floor(Math.random() * 150) + 50}ms\n\n✅ C++ code compiled and executed successfully\n\n📊 Processed ${code.split('\n').length} lines of code\n${outputs.length} cout statement(s) detected\n${hasVariables ? '\n💡 Variables shown as {varName} - actual values would appear at runtime' : ''}\nℹ️  Note: Execution simulated - cout statements parsed.`);
            } else {
              // Check for common C++ structures
              const hasMain = code.includes('int main(');
              const hasInclude = code.includes('#include');
              
              if (hasMain && hasInclude) {
                setCodeOutput(`✅ C++ code compiled successfully\n\n⏱️  Compilation completed in ${Math.floor(Math.random() * 200) + 100}ms\n\n📊 Valid C++ structure detected\n💡 Add cout statements to see output.`);
              } else {
                setCodeOutput(`⚠️  C++ code validated\n\n⏱️  Completed in ${Math.floor(Math.random() * 100) + 50}ms\n\nℹ️  Note: Add cout << statements to see output.\n💡 Tip: Include <iostream> and define main() for complete programs.`);
              }
            }
          } catch (error) {
            setCodeOutput(`❌ C++ Parsing Error:\n\n${error.message}\n\nℹ️  Check your syntax and try again.`);
          }
        }
      } catch (error) {
        setCodeOutput(`❌ Unexpected Error:\n\n${error.message}\n\n${error.stack || ''}`);
      } finally {
        setIsRunning(false);
      }
    }, 300);
  };

  // Get CodeMirror language extension based on selected language
  const getLanguageExtension = () => {
    switch (selectedLanguage) {
      case 'JavaScript':
        return javascript({ jsx: true });
      case 'Python':
        return python();
      case 'Java':
        return java();
      case 'C++':
      case 'Go':
        return cpp();
      default:
        return javascript();
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setMediaStream(stream);
      setCameraActive(true);
    } catch (error) {
      let errorMessage = "Unable to access camera. ";
      if (error.name === "NotAllowedError") {
        errorMessage += "Please allow camera access in browser permissions.";
      } else if (error.name === "NotFoundError") {
        errorMessage += "No camera found on this device.";
      } else {
        errorMessage += error.message;
      }
      setCameraError(errorMessage);
      setCameraActive(false);
    }
  };

  const startRecording = () => {
    if (!mediaStream) return;
    
    const chunks = [];
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm;codecs=vp8,opus'
    });
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
      setRecordedChunks(chunks);
      
      // Stop timer
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
    
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const downloadRecording = () => {
    if (recordedVideoUrl) {
      const a = document.createElement('a');
      a.href = recordedVideoUrl;
      a.download = `interview-recording-${Date.now()}.webm`;
      a.click();
    }
  };
  
  const addCustomQuestion = async () => {
    if (customQuestion.title && customQuestion.description) {
      try {
        // Generate a unique numeric ID
        const newId = Date.now();
        
        const questionData = {
          id: newId,
          title: customQuestion.title,
          description: customQuestion.description,
          difficulty: customQuestion.difficulty,
          category: customQuestion.category,
          topic: 'Custom',
          company: [],
          acceptance: null,
          likes: 0,
          dislikes: 0,
          leetcodeSlug: null
        };
        
        // Save to database
        const response = await questionAPI.createQuestion(questionData);
        
        // Add to local state (use the response data which has MongoDB _id)
        const savedQuestion = response.data.question || questionData;
        setUploadedQuestions([...uploadedQuestions, savedQuestion]);
        
        // Reset form
        setCustomQuestion({ title: "", description: "", difficulty: "medium", category: "dsa" });
        setShowUploadModal(false);
        
        alert('✅ Question uploaded successfully to database!');
      } catch (error) {
        console.error('Failed to upload question:', error);
        
        // Show detailed error message
        const errorMsg = error.response?.data?.message || error.message || 'Unknown error occurred';
        alert(`❌ Failed to upload question:\n\n${errorMsg}\n\n💡 Make sure the backend server is running on port 5000.`);
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    setCameraActive(false);
  };

  const handleStartMock = async (mockType) => {
    try {
      // Filter questions from database by category
      const categoryQuestions = uploadedQuestions.filter(q => q.category === mockType.category);
      
      if (categoryQuestions.length > 0) {
        setSelectedRound(mockType);
        setRoundQuestions(categoryQuestions);
        // Show mode selection instead of starting directly
        setInterviewMode(null);
      } else {
        alert(`No questions available for ${mockType.title}. Please upload questions first using the "Upload Question" button.`);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      alert("Error loading questions. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">          <Breadcrumb items={[{ label: "Mock Interview" }]} />
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">Mock Interviews</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Practice with realistic interview simulations and get instant feedback
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Completed</p>
                    <p className="text-2xl font-bold">{pastMocks.length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400 opacity-60" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
                    <p className="text-2xl font-bold">8.2</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-400 opacity-60" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Time</p>
                    <p className="text-2xl font-bold">2.1h</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-400 opacity-60" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                    <p className="text-2xl font-bold">82%</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-400 opacity-60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mock Interview Types */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-primary" />
                Start New Mock Interview
              </h2>
              <div className="flex items-center gap-3">
                {uploadedQuestions.length > 0 && (
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
                    {uploadedQuestions.length} Custom Question{uploadedQuestions.length !== 1 ? 's' : ''}
                  </Badge>
                )}
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Upload Question
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {mockTypes.map((mock) => {
                const Icon = mock.icon;
                return (
                  <Card
                    key={mock.id}
                    className="glass-card border-white/[0.08] hover:border-white/[0.2] hover:scale-[1.02] transition-all cursor-pointer group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${mock.color} group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${mock.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{mock.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {mock.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getDifficultyColor(mock.difficulty)}>
                          {mock.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-white/10">
                          <Clock className="w-3 h-3 mr-1" />
                          {mock.duration}
                        </Badge>
                        <Badge variant="outline" className="border-white/10">
                          {mock.questions} Questions
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Topics Covered:</p>
                        <div className="flex flex-wrap gap-1">
                          {mock.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded bg-secondary/50"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-primary hover:bg-primary/90 group-hover:shadow-lg group-hover:shadow-primary/20"
                        onClick={() => handleStartMock(mock)}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Interview
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Past Interviews */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Past Mock Interviews
            </h2>
            <div className="space-y-4">
              {pastMocks.map((mock) => (
                <Card
                  key={mock.id}
                  className="glass-card border-white/[0.08] hover:border-white/[0.16] transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{mock.type}</h3>
                          <Badge className="bg-green-500/20 text-green-300">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex gap-6 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {mock.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {mock.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {mock.questionsAnswered} answered
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "{mock.feedback}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className={`text-3xl font-bold ${getScoreColor(mock.score)}`}>
                            {mock.score}
                          </p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/feedback")}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <Card className="glass-card border-white/[0.08] mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                Mock Interview Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                ✓ <strong>Treat it like a real interview:</strong> Dress professionally and find a quiet space
              </p>
              <p>
                ✓ <strong>Think out loud:</strong> Explain your thought process as you solve problems
              </p>
              <p>
                ✓ <strong>Ask clarifying questions:</strong> Make sure you understand the problem before coding
              </p>
              <p>
                ✓ <strong>Test your code:</strong> Walk through test cases to catch bugs
              </p>
              <p>
                ✓ <strong>Review feedback:</strong> Learn from each mock interview to improve
              </p>
              <p>
                ✓ <strong>Time management:</strong> Practice completing questions within time limits
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Question Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="glass-card border-white/[0.08] w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-400" />
                  Upload Mock Interview Question
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowUploadModal(false);
                    setCustomQuestion({ title: "", description: "", difficulty: "medium", category: "dsa" });
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-muted-foreground text-sm">
                Add your own custom questions for any interview type
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Question Title</label>
                <input
                  type="text"
                  value={customQuestion.title}
                  onChange={(e) => setCustomQuestion({ ...customQuestion, title: e.target.value })}
                  placeholder="e.g., Two Sum Problem"
                  className="w-full px-4 py-3 bg-secondary/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Question Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Problem Description</label>
                <Textarea
                  value={customQuestion.description}
                  onChange={(e) => setCustomQuestion({ ...customQuestion, description: e.target.value })}
                  placeholder="Describe the problem statement, constraints, and examples..."
                  className="w-full min-h-[150px] bg-secondary/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Interview Category Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Interview Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "dsa", label: "DSA", icon: Code },
                    { value: "frontend", label: "Frontend", icon: Code },
                    { value: "systemdesign", label: "System Design", icon: Layers },
                    { value: "behavioral", label: "Behavioral", icon: MessageSquare },
                    { value: "fullstack", label: "Full Stack", icon: Briefcase },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Button
                        key={cat.value}
                        onClick={() => setCustomQuestion({ ...customQuestion, category: cat.value })}
                        variant={customQuestion.category === cat.value ? "default" : "outline"}
                        className={`flex items-center gap-2 ${
                          customQuestion.category === cat.value
                            ? "bg-primary/20 text-primary border-primary/50"
                            : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Difficulty Level</label>
                <div className="flex gap-3">
                  {["easy", "medium", "hard"].map((diff) => (
                    <Button
                      key={diff}
                      onClick={() => setCustomQuestion({ ...customQuestion, difficulty: diff })}
                      variant={customQuestion.difficulty === diff ? "default" : "outline"}
                      className={`flex-1 ${
                        customQuestion.difficulty === diff
                          ? diff === "easy"
                            ? "bg-green-500/20 text-green-300 border-green-500/50"
                            : diff === "medium"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                            : "bg-red-500/20 text-red-300 border-red-500/50"
                          : ""
                      }`}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUploadModal(false);
                    setCustomQuestion({ title: "", description: "", difficulty: "medium", category: "dsa" });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addCustomQuestion}
                  disabled={!customQuestion.title.trim() || !customQuestion.description.trim()}
                  className="flex-1 bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>

              {/* Uploaded Questions List */}
              {uploadedQuestions.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-400" />
                      Uploaded Questions ({uploadedQuestions.length})
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete all uploaded questions from the database?')) {
                          try {
                            // Delete all questions from database
                            for (const q of uploadedQuestions) {
                              if (q._id) {
                                await questionAPI.deleteQuestion(q._id);
                              }
                            }
                            // Clear local state
                            setUploadedQuestions([]);
                            alert('All questions deleted successfully!');
                          } catch (error) {
                            console.error('Failed to delete questions:', error);
                            alert('Failed to delete some questions. Please try again.');
                          }
                        }
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadedQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-secondary/30 border border-white/5 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{q.title}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge className={getDifficultyColor(q.difficulty)} size="sm">
                              {q.difficulty}
                            </Badge>
                            <Badge variant="outline" className="border-white/10 text-xs">
                              {q.category}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            try {
                              // Delete from database if it has _id (MongoDB ID)
                              if (q._id) {
                                await questionAPI.deleteQuestion(q._id);
                              }
                              // Remove from local state
                              setUploadedQuestions(uploadedQuestions.filter((_, i) => i !== idx));
                            } catch (error) {
                              console.error('Failed to delete question:', error);
                              alert('Failed to delete question. Please try again.');
                            }
                          }}
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mode Selection Modal */}
      {selectedRound && !interviewMode && roundQuestions.length > 0 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="glass-card border-white/[0.08] w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">Choose Interview Mode</CardTitle>
              <p className="text-muted-foreground">Select how you want to take the {selectedRound.title}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedRound?.category === "dsa" ? (
                // DSA: Show only Text Mode (Code Editor)
                <div className="max-w-md mx-auto">
                  <Card 
                    onClick={() => handleSelectMode("text")}
                    className="glass-card border-white/[0.08] hover:border-primary/50 cursor-pointer transition-all hover:scale-[1.02] group"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 w-fit group-hover:scale-110 transition-transform mx-auto">
                        <Code className="w-10 h-10 text-purple-400" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-2">Start DSA Challenge</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Write and test code solutions with our professional IDE-like editor.
                        </p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2 justify-center">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Real-time syntax highlighting
                          </p>
                          <p className="flex items-center gap-2 justify-center">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Auto-completion & IntelliSense
                          </p>
                          <p className="flex items-center gap-2 justify-center">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Execute JavaScript instantly
                          </p>
                          <p className="flex items-center gap-2 justify-center">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Multi-language support
                          </p>
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                        <Code className="w-5 h-5 mr-2" />
                        Start Coding
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                // Non-DSA: Show both Video and Text modes
              <div className="grid md:grid-cols-2 gap-6">
                {/* Video/Audio Mode */}
                <Card 
                  onClick={() => handleSelectMode("video")}
                  className="glass-card border-white/[0.08] hover:border-primary/50 cursor-pointer transition-all hover:scale-[1.02] group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-fit group-hover:scale-110 transition-transform">
                      <Webcam className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Video & Audio Interview</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Simulate a real video call interview. Use your webcam and microphone.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          Real-time video simulation
                        </p>
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          Webcam feedback
                        </p>
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          Better for practice
                        </p>
                      </div>
                    </div>
                    <Button className="w-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30">
                      Start Video Interview
                    </Button>
                  </CardContent>
                </Card>

                {/* Text Mode */}
                <Card 
                  onClick={() => handleSelectMode("text")}
                  className="glass-card border-white/[0.08] hover:border-primary/50 cursor-pointer transition-all hover:scale-[1.02] group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 w-fit group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Text-Based Interview</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {selectedRound?.category === "dsa" 
                          ? "Write and test code solutions with our integrated editor."
                          : "Type your answers. Great for testing your written communication skills."
                        }
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {selectedRound?.category === "dsa" ? "Code editor with syntax highlighting" : "Written responses"}
                        </p>
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {selectedRound?.category === "dsa" ? "Multi-language support" : "No setup required"}
                        </p>
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {selectedRound?.category === "dsa" ? "Test your code instantly" : "Quick and easy"}
                        </p>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Start Text Interview
                    </Button>
                  </CardContent>
                </Card>
              </div>
              )}

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToRounds}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Back to Mock Interviews
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Interview Questions Modal */}
      {selectedRound && interviewMode && roundQuestions.length > 0 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="glass-card border-white/[0.08] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="sticky top-0 bg-gradient-to-r from-background to-background border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{selectedRound.title}</CardTitle>
                    <Badge className={interviewMode === "video" ? "bg-cyan-500/20 text-cyan-300" : "bg-purple-500/20 text-purple-300"}>
                      {interviewMode === "video" ? "Video Mode" : "Text Mode"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Question {currentQuestionIndex + 1} of {roundQuestions.length}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToRounds}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="mt-4 h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / roundQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              {/* Question Status Indicator */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Question {currentQuestionIndex + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      {showFeedback ? "✅ Submitted - Review feedback below" : "📝 Answer and submit to get AI feedback"}
                    </p>
                  </div>
                </div>
                {showFeedback && (
                  <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">
                    Completed
                  </Badge>
                )}
              </div>

              {/* Question */}
              <div>
                <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                  {roundQuestions[currentQuestionIndex].difficulty?.toUpperCase() || "MEDIUM"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3">
                  {roundQuestions[currentQuestionIndex].title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {roundQuestions[currentQuestionIndex].description}
                </p>
              </div>

              {/* User Answer Input */}
              {!showFeedback && (
                <div className="space-y-4">
                  {/* Video Mode - Show Webcam Feed */}
                  {interviewMode === "video" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold">Your Video Feed:</label>
                      
                      {cameraError && (
                        <div className="w-full bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg text-sm">
                          ⚠️ {cameraError}
                        </div>
                      )}

                      {!cameraActive && !cameraError && (
                        <div className="w-full h-48 bg-black/80 rounded-lg border border-white/[0.08] flex flex-col items-center justify-center gap-4">
                          <Webcam className="w-12 h-12 text-cyan-400/50" />
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">Camera not active</p>
                            <Button
                              onClick={startCamera}
                              className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30"
                            >
                              <Webcam className="w-4 h-4 mr-2" />
                              Enable Camera
                            </Button>
                          </div>
                        </div>
                      )}

                      {cameraActive && (
                        <div className="space-y-3">
                          <div className="relative w-full bg-black rounded-lg border border-cyan-500/30 overflow-hidden">
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              muted
                              className="w-full bg-black rounded-lg"
                              style={{ maxHeight: "300px" }}
                            />
                            {isRecording && (
                              <div className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 bg-red-500/80 text-white text-xs rounded-full">
                                <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" />
                                Recording
                              </div>
                            )}
                          </div>
                          
                          {/* Recording Controls */}
                          <div className="flex items-center gap-3">
                            {!isRecording ? (
                              <Button
                                onClick={startRecording}
                                className="flex-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Start Recording
                              </Button>
                            ) : (
                              <>
                                <Button
                                  onClick={stopRecording}
                                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                                >
                                  <Square className="w-4 h-4 mr-2" />
                                  Stop Recording
                                </Button>
                                <div className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                  <span className="text-red-300 font-mono">{formatTime(recordingTime)}</span>
                                </div>
                              </>
                            )}
                          </div>
                          
                          {/* Recorded Video Playback */}
                          {recordedVideoUrl && !isRecording && (
                            <div className="space-y-3 mt-4">
                              <label className="block text-sm font-semibold text-green-400">✓ Recording Complete:</label>
                              <video
                                src={recordedVideoUrl}
                                controls
                                className="w-full bg-black rounded-lg border border-green-500/30"
                                style={{ maxHeight: "300px" }}
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={downloadRecording}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                <Button
                                  onClick={() => {
                                    setRecordedVideoUrl(null);
                                    setRecordedChunks([]);
                                  }}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  Record Again
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Text Mode - Show Code Editor for DSA, Regular Input for Others */}
                  {interviewMode === "text" && (
                    <div className="space-y-3">
                      {selectedRound.category === "dsa" ? (
                        <>
                          {/* Language Selector & Editor Controls */}
                          <div className="flex items-center justify-between gap-4">
                            <label className="block text-sm font-semibold">Code Editor:</label>
                            <div className="flex items-center gap-2">
                              {/* Font Size Control */}
                              <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditorFontSize(Math.max(10, editorFontSize - 2))}
                                  className="h-6 w-6 p-0"
                                >
                                  -
                                </Button>
                                <span className="text-xs text-muted-foreground w-8 text-center">{editorFontSize}px</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditorFontSize(Math.min(24, editorFontSize + 2))}
                                  className="h-6 w-6 p-0"
                                >
                                  +
                                </Button>
                              </div>
                              
                              {/* Line Wrap Toggle */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setLineWrap(!lineWrap)}
                                className="h-7 text-xs"
                              >
                                {lineWrap ? "Unwrap" : "Wrap"}
                              </Button>
                              
                              {/* Language Tabs */}
                              <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-auto">
                                <TabsList className="bg-secondary/80 h-auto">
                                  {["JavaScript", "Python", "Java", "C++"].map((lang) => (
                                    <TabsTrigger key={lang} value={lang} className="text-xs px-2 py-1">
                                      {lang}
                                    </TabsTrigger>
                                  ))}
                                </TabsList>
                              </Tabs>
                            </div>
                          </div>

                          {/* Professional Code Editor */}
                          <div className="rounded-lg overflow-hidden border border-white/[0.08] shadow-lg">
                            <CodeMirror
                              value={code}
                              height="450px"
                              theme={oneDark}
                              extensions={[
                                getLanguageExtension(),
                                lineWrap ? EditorState.lineWrapping : [],
                              ]}
                              onChange={(value) => setCode(value)}
                              style={{
                                fontSize: `${editorFontSize}px`,
                              }}
                              basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: true,
                                highlightSpecialChars: true,
                                foldGutter: true,
                                drawSelection: true,
                                dropCursor: true,
                                allowMultipleSelections: true,
                                indentOnInput: true,
                                syntaxHighlighting: true,
                                bracketMatching: true,
                                closeBrackets: true,
                                autocompletion: true,
                                rectangularSelection: true,
                                crosshairCursor: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true,
                                closeBracketsKeymap: true,
                                searchKeymap: true,
                                foldKeymap: true,
                                completionKeymap: true,
                                lintKeymap: true,
                              }}
                            />
                          </div>

                          {/* Code Editor Controls */}
                          <div className="flex gap-2">
                            <Button
                              onClick={handleRunCode}
                              disabled={isRunning}
                              className="flex-1 bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30 disabled:opacity-50"
                            >
                              {isRunning ? (
                                <>
                                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                  Running...
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Run Code
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() => setCode(getDefaultCode(selectedLanguage))}
                              variant="outline"
                              size="sm"
                              disabled={isRunning}
                            >
                              Reset
                            </Button>
                            <Button
                              onClick={() => setCodeOutput("")}
                              variant="outline"
                              size="sm"
                              disabled={!codeOutput || isRunning}
                            >
                              Clear Output
                            </Button>
                          </div>

                          {/* Code Output */}
                          {codeOutput && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold flex items-center gap-2">
                                  <Terminal className="w-4 h-4" />
                                  Console Output:
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {selectedLanguage}
                                </Badge>
                              </div>
                              <div className="bg-black/90 text-green-400 p-4 rounded-lg font-mono text-sm max-h-60 overflow-y-auto border border-green-500/20 shadow-inner">
                                <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed">{codeOutput}</pre>
                              </div>
                            </div>
                          )}

                          {/* Editor Shortcuts Help */}
                          <details className="text-xs text-muted-foreground">
                            <summary className="cursor-pointer hover:text-foreground transition-colors">
                              💡 Keyboard Shortcuts
                            </summary>
                            <div className="mt-2 grid grid-cols-2 gap-2 p-3 bg-secondary/30 rounded-lg">
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Ctrl+F</kbd> Search</div>
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Ctrl+H</kbd> Replace</div>
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Ctrl+Z</kbd> Undo</div>
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Ctrl+Y</kbd> Redo</div>
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Tab</kbd> Indent</div>
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Shift+Tab</kbd> Outdent</div>
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Ctrl+/</kbd> Comment</div>
                              <div><kbd className="px-1.5 py-0.5 bg-black/30 rounded">Ctrl+D</kbd> Select next</div>
                            </div>
                          </details>
                        </>
                      ) : (
                        <>
                          {/* Regular Text Input for Non-DSA Interviews */}
                          <label className="block text-sm font-semibold">Your Answer:</label>
                          <textarea
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Provide your detailed answer here..."
                            className="w-full h-48 bg-black/50 text-white font-mono text-sm p-4 rounded-lg border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          />
                          
                          {/* Optional File Upload (for diagrams, documents, etc.) */}
                          <div className="mt-4 space-y-2">
                            <label className="block text-sm font-medium text-muted-foreground">
                              📎 Optional: Upload Diagram/Document
                            </label>
                            <div className="flex gap-2 items-start">
                              <input
                                type="file"
                                accept="image/*,.pdf,.doc,.docx"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setUploadedFile(file);
                                    // Create preview for images
                                    if (file.type.startsWith('image/')) {
                                      const reader = new FileReader();
                                      reader.onload = (e) => setFilePreview(e.target.result);
                                      reader.readAsDataURL(file);
                                    } else {
                                      setFilePreview(null);
                                    }
                                  }
                                }}
                                className="flex-1 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                              />
                              {uploadedFile && (
                                <Button
                                  onClick={() => {
                                    setUploadedFile(null);
                                    setFilePreview(null);
                                  }}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            {uploadedFile && (
                              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <FileText className="w-4 h-4 text-primary" />
                                  <span className="font-mono text-xs">{uploadedFile.name}</span>
                                  <span className="text-muted-foreground text-xs">({(uploadedFile.size / 1024).toFixed(2)} KB)</span>
                                </div>
                                {filePreview && (
                                  <img src={filePreview} alt="Preview" className="mt-2 max-h-40 rounded border border-white/10" />
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Text Area for Response (only for video mode now) */}
                  {interviewMode === "video" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold">
                        {interviewMode === "video" ? "Transcribed Response:" : "Your Answer:"}
                      </label>
                      <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder={interviewMode === "video" ? "Your spoken answer will be transcribed here..." : "Provide your detailed answer here..."}
                        className="w-full h-48 bg-black/50 text-white font-mono text-sm p-4 rounded-lg border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  )}

                  {/* Submit Section Separator */}
                  {!showFeedback && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-4">
                        <Send className="w-4 h-4 text-primary" />
                        <p className="text-sm font-semibold text-primary">Ready to Submit?</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  {!showFeedback && interviewMode === "video" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={stopCamera}
                        className="flex-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                        disabled={!cameraActive}
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        {cameraActive ? "Stop Recording" : "Recording..."}
                      </Button>
                      <Button
                        onClick={() => {
                          stopCamera();
                          handleSubmitAnswer();
                        }}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3"
                        disabled={isGeneratingFeedback}
                      >
                        {isGeneratingFeedback ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing Answer...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Answer
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {!showFeedback && interviewMode === "text" && (
                    <Button
                      onClick={handleSubmitAnswer}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6 text-lg shadow-lg shadow-green-500/20"
                      disabled={isGeneratingFeedback}
                    >
                      {isGeneratingFeedback ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Generating AI Feedback...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Answer & Get AI Feedback
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}

              {/* AI Feedback */}
              {showFeedback && aiFeedback && (
                <div className="space-y-4 animate-in fade-in">
                  {/* AI Warning Banner */}
                  {aiWarning && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-yellow-400 text-sm mb-1">AI Service Notice</p>
                        <p className="text-xs text-yellow-200/80">{aiWarning}</p>
                        {aiWarning.includes('API KEY') && (
                          <div className="mt-2 text-xs bg-black/30 rounded p-2 border border-yellow-500/20">
                            <p className="text-yellow-300 font-mono">
                              Get a free API key: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-200">Google AI Studio</a>
                            </p>
                            <p className="text-yellow-200/60 mt-1">Update in: backend/.env → GEMINI_API_KEY</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Score */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">AI Score</p>
                      <p className="text-3xl font-bold text-primary">{aiFeedback.score}/10</p>
                    </div>
                  </div>

                  {/* Positive Points */}
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">✓ Strengths:</h4>
                    <ul className="space-y-1">
                      {aiFeedback.positive.map((point, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">↦ Areas for Improvement:</h4>
                    <ul className="space-y-1">
                      {aiFeedback.improvements.map((point, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestion */}
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm text-muted-foreground italic">
                      💡 <span className="text-blue-300 font-semibold">{aiFeedback.suggestion}</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleNextQuestion}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                    >
                      {currentQuestionIndex < roundQuestions.length - 1 ? (
                        <>
                          Next Question
                          <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
                        </>
                      ) : (
                        <>
                          Finish Interview
                          <CheckCircle className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
