import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, TrendingUp, AlertCircle, CheckCircle, Lightbulb, Code, Loader2 } from "lucide-react";
import { aiAPI } from "@/api/services";

const AIFeedback = () => {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`);
  const [language, setLanguage] = useState("JavaScript");
  const [problemStatement, setProblemStatement] = useState("Find two numbers in an array that add up to a target value.");
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      alert("Please enter some code to analyze");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await aiAPI.analyzeCode(code, language, problemStatement);
      
      if (response.data.success && response.data.analysis) {
        setFeedback(response.data.analysis);
      } else {
        // Fallback feedback
        setFeedback(getSampleFeedback());
      }
    } catch (error) {
      console.error('Code analysis error:', error);
      // Show sample feedback on error
      setFeedback(getSampleFeedback());
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSampleFeedback = () => ({
    score: 8.5,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    feedback: [
      {
        type: "excellent",
        title: "Efficient Algorithm",
        description: "Great choice using a hash map! This achieves optimal O(n) time complexity.",
        tips: "This is the ideal approach for this problem.",
      },
      {
        type: "good",
        title: "Clean Code",
        description: "Your variable names are clear and the logic is easy to follow.",
        tips: "Consider adding comments for complex logic in interviews.",
      },
      {
        type: "improvement",
        title: "Edge Cases",
        description: "Your solution handles empty arrays correctly, but consider what happens with duplicate values.",
        tips: "Always test with edge cases like duplicates, negative numbers, and extreme values.",
      }
    ],
    improvements: [
      "Add input validation at the start",
      "Consider the case where no solution exists",
      "Add comments explaining the algorithm"
    ],
    strengths: [
      "Efficient use of hash map",
      "Clean, readable code",
      "Optimal time complexity"
    ],
    bugs: [],
    bestPractices: [
      "Add error handling",
      "Include input validation"
    ],
    comparison: {
      yourScore: 8.5,
      averageScore: 7.2,
      topScore: 9.8,
      percentile: 78
    }
  });

  const getFeedbackIcon = (type) => {
    switch (type) {
      case "excellent":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "good":
        return <Sparkles className="w-5 h-5 text-blue-400" />;
      case "improvement":
        return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      case "suggestion":
        return <Lightbulb className="w-5 h-5 text-purple-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getFeedbackColor = (type) => {
    switch (type) {
      case "excellent":
        return "bg-green-500/10 border-green-500/30";
      case "good":
        return "bg-blue-500/10 border-blue-500/30";
      case "improvement":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "suggestion":
        return "bg-purple-500/10 border-purple-500/30";
      default:
        return "bg-gray-500/10 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">AI Code Feedback</h1>
            </div>
            <p className="text-muted-foreground">
              Get instant AI-powered feedback on your code solutions
            </p>
          </div>

          {/* Code Input Section */}
          <Card className="glass-card border-white/[0.08] mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Your Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Problem Statement */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Problem Statement (Optional)
                </label>
                <Textarea
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="Describe the problem you're solving..."
                  className="min-h-[60px] bg-black/50"
                />
              </div>

              {/* Language Selector */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Programming Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-black/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="Go">Go</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Code Editor */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Your Solution
                </label>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your code here..."
                  className="min-h-[300px] font-mono text-sm bg-black/50"
                />
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyzeCode}
                disabled={isAnalyzing}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Code with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Feedback Results */}
          {feedback && (
            <>
              {/* Score Overview */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="glass-card border-white/[0.08]">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {feedback.score}
                      </div>
                      <p className="text-sm text-muted-foreground">Your Score</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/[0.08]">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {feedback.timeComplexity}
                      </div>
                      <p className="text-sm text-muted-foreground">Time Complexity</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/[0.08]">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {feedback.spaceComplexity}
                      </div>
                      <p className="text-sm text-muted-foreground">Space Complexity</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/[0.08]">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">
                        {feedback.comparison?.percentile || 75}%
                      </div>
                      <p className="text-sm text-muted-foreground">Percentile</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Feedback */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Detailed Feedback</h2>
                <div className="space-y-4">
                  {feedback.feedback && feedback.feedback.map((item, idx) => (
                    <Card
                      key={idx}
                      className={`glass-card border transition-all ${getFeedbackColor(item.type)}`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          {getFeedbackIcon(item.type)}
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.description}
                            </p>
                            <div className="p-2 bg-black/20 rounded text-xs text-muted-foreground italic">
                              💡 {item.tips}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              {feedback.strengths && feedback.strengths.length > 0 && (
                <Card className="glass-card border-white/[0.08] mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feedback.strengths.map((strength, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Improvements */}
              {feedback.improvements && feedback.improvements.length > 0 && (
                <Card className="glass-card border-white/[0.08] mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-yellow-400" />
                      Suggested Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feedback.improvements.map((improvement, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                          <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bugs */}
              {feedback.bugs && feedback.bugs.length > 0 && (
                <Card className="glass-card border-red-500/30 mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      Potential Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feedback.bugs.map((bug, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-colors">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{bug}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comparison */}
              {feedback.comparison && (
                <Card className="glass-card border-white/[0.08]">
                  <CardHeader>
                    <CardTitle>How You Compare</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Your Score</span>
                          <span className="text-sm font-bold text-primary">
                            {feedback.comparison.yourScore}/10
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-purple-500"
                            style={{
                              width: `${(feedback.comparison.yourScore / 10) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Average Score</span>
                          <span className="text-sm font-bold text-blue-400">
                            {feedback.comparison.averageScore}/10
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${(feedback.comparison.averageScore / 10) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Top Score</span>
                          <span className="text-sm font-bold text-green-400">
                            {feedback.comparison.topScore}/10
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{
                              width: `${(feedback.comparison.topScore / 10) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIFeedback;
