import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Share2, Plus, Search } from "lucide-react";

const DiscussionForum = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "Best approach for Two Sum problem?",
      author: "John Doe",
      category: "Arrays",
      replies: 12,
      views: 245,
      likes: 34,
      createdAt: "2 hours ago",
      preview: "I'm struggling with the optimal time complexity for this problem...",
    },
    {
      id: 2,
      title: "System Design Interview Tips",
      author: "Jane Smith",
      category: "System Design",
      replies: 28,
      views: 876,
      likes: 156,
      createdAt: "1 day ago",
      preview: "Here are some tips I learned from my recent Google interview...",
    },
    {
      id: 3,
      title: "How to prepare for behavioral rounds?",
      author: "Mike Johnson",
      category: "Interview Prep",
      replies: 18,
      views: 432,
      likes: 67,
      createdAt: "3 days ago",
      preview: "Any advice on how to structure answers to behavioral questions?",
    },
    {
      id: 4,
      title: "Dynamic Programming Patterns",
      author: "Sarah Lee",
      category: "Algorithms",
      replies: 45,
      views: 1250,
      likes: 234,
      createdAt: "1 week ago",
      preview: "I've compiled a list of common DP patterns used in interviews...",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["Arrays", "Strings", "Algorithms", "System Design", "Interview Prep"];

  const filteredThreads = threads.filter((thread) => {
    const matchesSearch = thread.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || thread.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold">Discussion Forum</h1>
              </div>
              <p className="text-muted-foreground">
                Connect with other coders and share knowledge
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Thread
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              size="sm"
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Threads List */}
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <Card
                key={thread.id}
                className="glass-card border-white/[0.08] hover:border-white/[0.2] hover:bg-secondary/30 transition-all cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                            {thread.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            by {thread.author} • {thread.createdAt}
                          </p>
                        </div>
                        <Badge variant="outline">{thread.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {thread.preview}
                      </p>
                      <div className="flex gap-6 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {thread.replies} replies
                        </div>
                        <div className="flex items-center gap-1">
                          👁️ {thread.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {thread.likes} likes
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="text-center">
                        <div className="text-xl font-bold">{thread.replies}</div>
                        <div className="text-xs text-muted-foreground">replies</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="glass-card border-white/[0.08] mt-8">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold mb-2">
                Have a question or want to share your insights?
              </h3>
              <p className="text-muted-foreground mb-4">
                Create a new thread to join our community discussion
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Start a New Discussion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
