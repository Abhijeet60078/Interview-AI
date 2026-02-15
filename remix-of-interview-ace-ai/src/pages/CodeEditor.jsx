import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/components/Breadcrumb";
import { Play, Copy, RotateCcw, AlertCircle, Loader } from "lucide-react";

const languages = ["JavaScript", "Python", "Java", "C++", "Go"];

// Map languages to Judge0 language IDs
const languageMap = {
  JavaScript: 63,    // JavaScript
  Python: 71,        // Python 3
  Java: 62,          // Java
  "C++": 54,         // C++
  Go: 60,            // Go
};

const codeTemplates = {
  JavaScript: "",
  Python: "",
  Java: "",
  "C++": "",
  Go: "",
};

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(codeTemplates[lang]);
    setOutput("");
    setError("");
  };

  const handleKeyDown = (e) => {
    // Handle Tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + "\t" + code.substring(end);
      
      setCode(newCode);
      
      // Move cursor after inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
    
    // Handle Enter key to maintain indentation
    if (e.key === "Enter") {
      const textarea = e.target;
      const start = textarea.selectionStart;
      const lineStart = code.lastIndexOf("\n", start - 1) + 1;
      const lineBeforeCursor = code.substring(lineStart, start);
      
      // Count leading whitespace
      const leadingWhitespace = lineBeforeCursor.match(/^[\s]*/)[0];
      
      if (leadingWhitespace) {
        e.preventDefault();
        const newCode = code.substring(0, start) + "\n" + leadingWhitespace + code.substring(start);
        setCode(newCode);
        
        // Move cursor to proper position
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + leadingWhitespace.length;
        }, 0);
      }
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      setError("Please write some code first");
      return;
    }

    setIsRunning(true);
    setOutput("");
    setError("");

    try {
      // Submit code to backend API proxy
      const response = await fetch('http://localhost:5000/api/code/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language_id: languageMap[selectedLanguage],
          source_code: code,
          stdin: input,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Code execution failed');
      }

      const result = await response.json();

      // Format output
      let outputText = "";

      if (result.stdout) {
        outputText += result.stdout;
      }

      if (result.stderr) {
        outputText += (outputText ? "\n\n" : "") + "[Error]\n" + result.stderr;
      }

      if (result.compile_output) {
        outputText += (outputText ? "\n\n" : "") + "[Compile Error]\n" + result.compile_output;
      }

      if (!outputText) {
        outputText = result.status === "Accepted" 
          ? "✓ Code executed successfully (no output)" 
          : `Status: ${result.status}`;
      }

      // Add execution statistics
      if (result.time || result.memory) {
        outputText += "\n\n--- Execution Statistics ---";
        if (result.time) outputText += `\nTime: ${result.time}s`;
        if (result.memory) outputText += `\nMemory: ${result.memory} KB`;
      }

      setOutput(outputText || "No output");
    } catch (err) {
      setError(`Execution error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClearOutput = () => {
    setOutput("");
    setError("");
  };

  const handleResetCode = () => {
    setCode("");
    setInput("");
    setOutput("");
    setError("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <Breadcrumb items={[{ label: "Code Editor" }]} />

        <div className="max-w-6xl mx-auto space-y-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Code Editor</h1>
            <p className="text-muted-foreground">Write and execute code in your favorite language</p>
          </div>

          {/* Language Selector and Controls */}
          <Card className="glass-card border-white/[0.08]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Language:</span>
                  <Tabs value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <TabsList className="bg-secondary">
                      {languages.map((lang) => (
                        <TabsTrigger key={lang} value={lang} className="text-xs">
                          {lang}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyCode}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={handleResetCode}
                    variant="outline"
                    size="sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isRunning ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card className="glass-card border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-lg">Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={code}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                className="w-full h-80 bg-black/50 text-white font-mono text-sm p-4 rounded-lg border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={`Write your ${selectedLanguage} code here...`}
                spellCheck="false"
              />
            </CardContent>
          </Card>

          {/* Input */}
          <Card className="glass-card border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-lg">Input (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-24 bg-black/50 text-white font-mono text-sm p-4 rounded-lg border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Enter input for your program here..."
                spellCheck="false"
              />
            </CardContent>
          </Card>

          {/* Error Alert */}
          {error && (
            <Card className="glass-card border-red-500/30 bg-red-500/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Terminal Output */}
          <Card className="glass-card border-white/[0.08]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Output</CardTitle>
                {output && (
                  <Button
                    onClick={handleClearOutput}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-black/80 text-green-400 p-4 rounded-lg font-mono text-sm min-h-40 max-h-64 overflow-y-auto border border-green-500/20">
                {output ? (
                  <pre className="whitespace-pre-wrap break-words">{output}</pre>
                ) : (
                  <p className="text-muted-foreground">Output will appear here...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
