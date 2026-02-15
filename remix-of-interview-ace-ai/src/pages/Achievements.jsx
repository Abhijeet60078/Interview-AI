import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Zap, Clock, BookOpen, Flame, Target, Award } from "lucide-react";

const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Solve your first question",
    icon: "🎯",
    unlocked: true,
    date: "2024-01-15",
    rarity: "common",
  },
  {
    id: 2,
    name: "Speed Runner",
    description: "Solve a question in under 5 minutes",
    icon: "⚡",
    unlocked: true,
    date: "2024-01-20",
    rarity: "common",
  },
  {
    id: 3,
    name: "Accuracy Master",
    description: "Achieve 90% accuracy on medium difficulty",
    icon: "🎯",
    unlocked: true,
    date: "2024-01-25",
    rarity: "uncommon",
  },
  {
    id: 4,
    name: "On Fire 🔥",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    unlocked: true,
    date: "2024-02-01",
    rarity: "uncommon",
  },
  {
    id: 5,
    name: "Century Club",
    description: "Solve 100 questions",
    icon: "💯",
    unlocked: false,
    progress: 54,
    total: 100,
    rarity: "rare",
  },
  {
    id: 6,
    name: "Hard Mode",
    description: "Solve 50 hard difficulty questions",
    icon: "💎",
    unlocked: false,
    progress: 8,
    total: 50,
    rarity: "rare",
  },
  {
    id: 7,
    name: "Algorithm Expert",
    description: "Master all algorithm topics",
    icon: "🧠",
    unlocked: false,
    progress: 3,
    total: 5,
    rarity: "epic",
  },
  {
    id: 8,
    name: "Interview Ready",
    description: "Complete 30-day challenge",
    icon: "🚀",
    unlocked: false,
    progress: 12,
    total: 30,
    rarity: "epic",
  },
  {
    id: 9,
    name: "Perfect Score",
    description: "Achieve 100% accuracy on a question",
    icon: "⭐",
    unlocked: false,
    rarity: "legendary",
  },
  {
    id: 10,
    name: "Teaching Matters",
    description: "Help 10 community members",
    icon: "👥",
    unlocked: false,
    progress: 2,
    total: 10,
    rarity: "legendary",
  },
];

const getRarityColor = (rarity) => {
  switch (rarity) {
    case "common":
      return "bg-gray-600/20 border-gray-400/50 text-gray-300";
    case "uncommon":
      return "bg-green-600/20 border-green-400/50 text-green-300";
    case "rare":
      return "bg-blue-600/20 border-blue-400/50 text-blue-300";
    case "epic":
      return "bg-purple-600/20 border-purple-400/50 text-purple-300";
    case "legendary":
      return "bg-yellow-600/20 border-yellow-400/50 text-yellow-300";
    default:
      return "bg-gray-600/20 border-gray-400/50 text-gray-300";
  }
};

const getRarityLabel = (rarity) => {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
};

const Achievements = () => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h1 className="text-4xl font-bold">Achievements</h1>
            </div>
            <p className="text-muted-foreground">
              Earn badges and unlock achievements as you progress
            </p>
          </div>

          {/* Progress */}
          <Card className="glass-card border-white/[0.08] mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
                  <p className="text-2xl font-bold">
                    {unlockedCount}/{totalCount} Achievements
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Completion</p>
                  <p className="text-2xl font-bold">
                    {Math.round((unlockedCount / totalCount) * 100)}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`glass-card border-white/[0.08] transition-all hover:scale-105 cursor-pointer ${
                  !achievement.unlocked && "opacity-60"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{achievement.icon}</div>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {getRarityLabel(achievement.rarity)}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-1">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>

                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <Star className="w-4 h-4 fill-green-400" />
                      <span>Unlocked on {achievement.date}</span>
                    </div>
                  ) : achievement.progress !== undefined ? (
                    <div>
                      <div className="flex justify-between mb-2 text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-purple-500 h-full rounded-full transition-all"
                          style={{
                            width: `${(achievement.progress / achievement.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Complete the requirements to unlock
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievement Categories */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Achievement Categories</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="glass-card border-white/[0.08]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-blue-400" />
                    <h3 className="font-semibold">Milestones</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Unlock achievements for reaching important milestones in your journey
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/[0.08]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Flame className="w-6 h-6 text-orange-400" />
                    <h3 className="font-semibold">Streaks</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maintain consistency and earn streak-based achievements
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/[0.08]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-purple-400" />
                    <h3 className="font-semibold">Excellence</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excel in specific areas and earn recognition badges
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
