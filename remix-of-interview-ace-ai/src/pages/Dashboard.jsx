import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  Video,
  Sparkles,
  Flame,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Trophy,
  Lightbulb,
} from "lucide-react";

const Dashboard = () => {
  const [tipsIndex, setTipsIndex] = useState(0);

  // Main Practice Features
  const practiceFeatures = [
    {
      title: "Question Bank",
      description: "Browse 5000+ interview questions",
      icon: BookOpen,
      link: "/questions",
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      badge: "Start Here",
    },
    {
      title: "Code Editor",
      description: "Write and test your solutions",
      icon: Zap,
      link: "/editor",
      color: "from-yellow-500/20 to-yellow-600/20",
      iconColor: "text-yellow-400",
      badge: null,
    },
    {
      title: "Mock Interview",
      description: "Full interview simulations",
      icon: Video,
      link: "/mock",
      color: "from-red-500/20 to-red-600/20",
      iconColor: "text-red-400",
      badge: "Popular",
    },
  ];

  // Simplified Stats
  const stats = [
    { label: "Problems Solved", value: "54", icon: CheckCircle, color: "text-blue-400" },
    { label: "Success Rate", value: "87%", icon: Trophy, color: "text-yellow-400" },
    { label: "Current Score", value: "8.2/10", icon: Target, color: "text-purple-400" },
  ];

  // Weak Topics (based on performance)
  const weakTopics = [
    { name: "Trees", accuracy: "45%", icon: AlertCircle, color: "text-red-400" },
    { name: "Dynamic Programming", accuracy: "52%", icon: AlertCircle, color: "text-orange-400" },
    { name: "Graphs", accuracy: "60%", icon: AlertCircle, color: "text-yellow-400" },
  ];

  // Daily Tips Carousel
  const tips = [
    {
      title: "Repeat Back the Problem",
      content: "Always repeat the problem back to confirm understanding. This shows clarity and prevents mistakes.",
      icon: Lightbulb,
    },
    {
      title: "Think Out Loud",
      content: "Explain your approach before coding. Interviewers want to see your thought process, not just final code.",
      icon: Lightbulb,
    },
    {
      title: "Test Edge Cases",
      content: "Before submitting, test your code with edge cases: empty input, null, single element, duplicates.",
      icon: Lightbulb,
    },
    {
      title: "Ask Clarifying Questions",
      content: "Ask about constraints: size limits, duplicates allowed, integer range, special cases?",
      icon: Lightbulb,
    },
    {
      title: "Optimize Step by Step",
      content: "Start with a brute force solution, then optimize. Explain the trade-offs between time and space.",
      icon: Lightbulb,
    },
  ];

  // Daily Challenge
  const dailyChallenge = {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers that add up to target. 6,850 users solved this today.",
    link: "/questions",
  };

  // Recommended Mock Interview
  const recommendedMock = {
    title: "Frontend Round",
    reason: "Based on your progress in JavaScript and React",
    action: "Start Frontend Round",
    link: "/mock",
  };

  const handleNextTip = () => {
    setTipsIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Welcome with Streak */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <p className="text-lg font-semibold text-orange-400">12-Day Streak! 🔥</p>
                  <p className="text-muted-foreground">Great job! One more day to reach 13!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Challenge - Big Card */}
          <Link to={dailyChallenge.link}>
            <Card className="glass-card border-white/[0.08] mb-8 hover:border-white/[0.2] transition-all cursor-pointer overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary mb-3">
                      ⭐ Question of the Day
                    </span>
                    <h3 className="text-3xl font-bold mb-2">{dailyChallenge.title}</h3>
                    <p className="text-muted-foreground mb-4">{dailyChallenge.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-green-500/20 text-green-300">
                        {dailyChallenge.difficulty}
                      </span>
                      <span className="text-sm text-muted-foreground">+50 bonus points</span>
                    </div>
                  </div>
                  <div className="text-primary group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Simplified Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="glass-card border-white/[0.08]">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color} opacity-60`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Weak Topics Section */}
            <Card className="glass-card border-white/[0.08]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  Your Weak Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weakTopics.map((topic, idx) => (
                  <Link key={idx} to="/questions">
                    <div className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{topic.name}</p>
                        <span className={`text-xs font-bold ${topic.color}`}>{topic.accuracy}</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                          style={{ width: topic.accuracy }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                        Practice {topic.name} →
                      </p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Interview Tips Carousel */}
            <Card className="glass-card border-white/[0.08] lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Daily Interview Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-4 min-h-[140px]">
                  <h4 className="text-lg font-bold mb-2">{tips[tipsIndex].title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{tips[tipsIndex].content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {tips.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 w-2 rounded-full transition-all ${
                          idx === tipsIndex ? "bg-primary w-6" : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    onClick={handleNextTip}
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary/10"
                  >
                    Next Tip <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Practice & Learn */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Practice & Learn</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {practiceFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <Link key={idx} to={feature.link}>
                    <Card className="glass-card border-white/[0.08] hover:border-white/[0.2] hover:scale-105 transition-all cursor-pointer h-full group">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                          </div>
                          {feature.badge && (
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary">
                              {feature.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Track Progress & Recommended Mock */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Analytics Card */}
            <Link to="/analytics">
              <Card className="glass-card border-white/[0.08] hover:border-white/[0.2] hover:scale-105 transition-all cursor-pointer h-full group">
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your progress over time with comprehensive insights
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Recommended Mock Interview */}
            <Link to={recommendedMock.link}>
              <Card className="glass-card border-white/[0.08] hover:border-white/[0.2] transition-all cursor-pointer h-full group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="pt-6 relative">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 mb-2">
                    Recommended
                  </span>
                  <h3 className="font-semibold text-lg mb-1">{recommendedMock.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{recommendedMock.reason}</p>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                    {recommendedMock.action}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
