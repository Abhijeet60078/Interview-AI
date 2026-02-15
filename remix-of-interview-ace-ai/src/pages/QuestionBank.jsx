import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Breadcrumb from "@/components/Breadcrumb";
import { questionsData, companies, topics } from "@/data/questions";
import { questionAPI } from "@/api/services";
import { useState, useEffect } from "react";
import { Search, Bookmark, BookmarkCheck, Filter, X } from "lucide-react";

const QuestionBank = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Try to fetch from backend first
        const filters = {};
        if (selectedDifficulty !== "all") filters.difficulty = selectedDifficulty;
        if (selectedCompany !== "all") filters.company = selectedCompany;
        if (selectedTopic !== "all") filters.topic = selectedTopic;
        if (searchTerm) filters.search = searchTerm;

        const response = await questionAPI.getAllQuestions(filters);
        if (response.data.questions && response.data.questions.length > 0) {
          setQuestions(response.data.questions);
        } else {
          // Fallback to local data
          setQuestions(questionsData);
        }
      } catch (error) {
        console.log("Using local questions data...");
        // Fallback to local data if API fails
        setQuestions(questionsData);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search
    const timer = setTimeout(() => {
      fetchQuestions();
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedDifficulty, selectedCompany, selectedTopic, searchTerm]);

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
    const matchesCompany =
      selectedCompany === "all" || (q.company && q.company.includes(selectedCompany));
    const matchesTopic = selectedTopic === "all" || q.topic === selectedTopic;

    return (
      matchesSearch && matchesDifficulty && matchesCompany && matchesTopic
    );
  });

  const toggleSave = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, saved: !q.saved } : q))
    );
  };

  const isConceptualQuestion = (question) => {
    // Conceptual questions have solution field and don't have leetcodeSlug
    return question.solution && (!question.leetcodeSlug || question.category === "cpp" || question.category === "oop" || question.category === "dbms" || question.category === "os" || question.category === "quant" || question.category === "verbal");
  };

  const handlePractice = (question) => {
    // Use the leetcodeSlug from the question data for accurate LeetCode URL
    const leetcodeUrl = `https://leetcode.com/problems/${question.leetcodeSlug}/`;
    window.open(leetcodeUrl, '_blank');
  };

  const handleNotes = (question) => {
    setSelectedQuestion(question);
    setShowNotesModal(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-300";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300";
      case "hard":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ label: "Question Bank" }]} />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Question Bank</h1>
            <p className="text-muted-foreground">
              Browse {filteredQuestions.length} interview questions
            </p>
          </div>

          {/* Search & Filters */}
          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div
              className="glass-card rounded-xl p-4 cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </div>
            </div>

            {showFilters && (
              <div className="grid md:grid-cols-3 gap-4 glass-card rounded-xl p-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm border border-white/10"
                  >
                    <option value="all">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Company
                  </label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm border border-white/10"
                  >
                    <option value="all">All</option>
                    {companies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm border border-white/10"
                  >
                    <option value="all">All</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {loading && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading questions...</p>
              </div>
            )}
            {!loading && filteredQuestions.length > 0 && filteredQuestions.map((question) => (
              <Card
                key={question.id}
                className="glass-card border-white/[0.08] hover:border-white/[0.16] transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {question.title}
                        </h3>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {question.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{question.topic}</Badge>
                        {question.company && question.company.map((c) => (
                          <Badge key={c} variant="outline">
                            {c}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground flex gap-4">
                        {question.acceptance && <span>Acceptance: {question.acceptance}%</span>}
                        {question.likes && <span>👍 {question.likes}</span>}
                        {question.dislikes && <span>👎 {question.dislikes}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="glow" 
                        size="sm"
                        onClick={() => isConceptualQuestion(question) ? handleNotes(question) : handlePractice(question)}
                      >
                        {isConceptualQuestion(question) ? "Notes" : "Practice"}
                      </Button>
                      <button
                        onClick={() => toggleSave(question.id)}
                        className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        {question.saved ? (
                          <BookmarkCheck className="w-5 h-5 text-primary" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredQuestions.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No questions found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notes Modal */}
      <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
        <DialogContent className="glass-card border-white/[0.08] max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-2xl">{selectedQuestion?.title}</DialogTitle>
                <DialogDescription className="mt-2">
                  {selectedQuestion?.description}
                </DialogDescription>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="rounded-lg hover:bg-secondary/50 transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 mt-6">
            <div className="flex flex-wrap gap-2">
              <Badge className={getDifficultyColor(selectedQuestion?.difficulty)}>
                {selectedQuestion?.difficulty}
              </Badge>
              <Badge variant="outline">{selectedQuestion?.topic}</Badge>
              {selectedQuestion?.company && selectedQuestion?.company.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 border border-white/[0.08]">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="text-primary">📚</span> Solution & Notes
              </h3>
              <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
                {selectedQuestion?.solution}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionBank;
