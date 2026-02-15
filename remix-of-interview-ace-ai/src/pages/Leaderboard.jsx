import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Trophy, TrendingUp, Star, Zap, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchPlatformStats, calculateOverallRating } from "@/lib/platformRatings";

const mockLeaderboard = [
  { rank: 1, name: "Alex Chen", points: 8520, solved: 342, streak: 45, level: "Master", leetcode: "alex-chen", codeforces: "alexchen" },
  { rank: 2, name: "Sarah Johnson", points: 7840, solved: 298, streak: 38, level: "Expert", leetcode: "sarah-j", codeforces: "" },
  { rank: 3, name: "Mike Rodriguez", points: 7120, solved: 276, streak: 32, level: "Expert", leetcode: "", codeforces: "mike_rod" },
  { rank: 4, name: "Emily Davis", points: 6890, solved: 261, streak: 28, level: "Advanced", leetcode: "emily-d", codeforces: "emily-d" },
  { rank: 5, name: "John Smith", points: 6450, solved: 245, streak: 24, level: "Advanced", leetcode: "", codeforces: "" },
  { rank: 6, name: "Lisa Wang", points: 6120, solved: 232, streak: 21, level: "Intermediate", leetcode: "lisa-wang", codeforces: "" },
  { rank: 7, name: "Tom Wilson", points: 5980, solved: 218, streak: 19, level: "Intermediate", leetcode: "", codeforces: "" },
  { rank: 8, name: "Rachel Brown", points: 5640, solved: 203, streak: 16, level: "Intermediate", leetcode: "rachel-b", codeforces: "rachel_b" },
];

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboard);
  const [loading, setLoading] = useState(true);
  const [platformStats, setPlatformStats] = useState({});

  useEffect(() => {
    const fetchAndUpdateLeaderboard = async () => {
      setLoading(true);
      const stats = {};

      // Fetch platform stats for each user
      for (const user of mockLeaderboard) {
        const userStats = await fetchPlatformStats(
          user.leetcode || "",
          user.codeforces || ""
        );
        stats[user.name] = userStats;
      }

      setPlatformStats(stats);

      // Sort users by combined rating
      const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => {
        const aRating = calculateOverallRating(stats[a.name] || {});
        const bRating = calculateOverallRating(stats[b.name] || {});
        return bRating - aRating;
      });

      // Update ranks
      const updatedLeaderboard = sortedLeaderboard.map((user, idx) => ({
        ...user,
        rank: idx + 1,
      }));

      setLeaderboardData(updatedLeaderboard);
      setLoading(false);
    };

    fetchAndUpdateLeaderboard();
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case "Master":
        return "text-yellow-400";
      case "Expert":
        return "text-purple-400";
      case "Advanced":
        return "text-blue-400";
      default:
        return "text-green-400";
    }
  };

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: "Leaderboard" }]} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h1 className="text-4xl font-bold">Leaderboard</h1>
            </div>
            <p className="text-muted-foreground mb-4">
              Compete with other coders and climb the ranks
            </p>
            <Card className="glass-card border-white/[0.08] bg-gradient-to-r from-primary/10 to-accent/10 p-4">
              <p className="text-sm text-muted-foreground">
                💡 <span className="font-semibold">Tip:</span> Add your LeetCode and Codeforces usernames in your{" "}
                <a href="/profile" className="text-primary hover:underline font-semibold">
                  profile
                </a>{" "}
                to display your real platform ratings on the leaderboard!
              </p>
            </Card>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-3 mb-8">
            {["week", "month", "year"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  timeframe === tf
                    ? "bg-primary text-primary-foreground"
                    : "glass-card hover:bg-secondary/50"
                }`}
              >
                This {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </button>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Top Streak</p>
                    <p className="text-2xl font-bold">45 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Points</p>
                    <p className="text-2xl font-bold">6,832</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Solved</p>
                    <p className="text-2xl font-bold">269</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Users</p>
                    <p className="text-2xl font-bold">12.4K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Table */}
          <Card className="glass-card border-white/[0.08]">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Fetching leaderboard data...</span>
                </div>
              ) : (
                <div className="space-y-1 overflow-x-auto">
                  <div className="min-w-full">
                    {leaderboardData.map((user, idx) => {
                      const userStats = platformStats[user.name] || {};
                      const leetcodeRating = userStats.leetcode?.rating || 0;
                      const codeforcesRating = userStats.codeforces?.rating || 0;
                      const overallRating = calculateOverallRating(userStats);

                      return (
                        <div
                          key={user.rank}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-all border-b border-white/[0.05] last:border-b-0"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-xs">
                            <div className="w-8 text-center font-bold text-lg">
                              {user.rank === 1 ? (
                                <Trophy className="w-6 h-6 text-yellow-400 mx-auto" />
                              ) : user.rank === 2 ? (
                                <Trophy className="w-6 h-6 text-gray-400 mx-auto" />
                              ) : user.rank === 3 ? (
                                <Trophy className="w-6 h-6 text-orange-400 mx-auto" />
                              ) : (
                                `#${user.rank}`
                              )}
                            </div>
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className={`text-xs font-semibold ${getLevelColor(user.level)}`}>
                                {user.level}
                              </p>
                            </div>
                          </div>

                          {/* Platform Ratings */}
                          <div className="flex items-center gap-6 text-sm">
                            {/* LeetCode Rating */}
                            <div className="text-right min-w-[80px]">
                              <p className="text-muted-foreground text-xs">LeetCode</p>
                              {leetcodeRating > 0 ? (
                                <p className="font-bold text-lg text-yellow-400">{leetcodeRating}</p>
                              ) : (
                                <p className="text-xs text-muted-foreground">-</p>
                              )}
                            </div>

                            {/* Codeforces Rating */}
                            <div className="text-right min-w-[80px]">
                              <p className="text-muted-foreground text-xs">Codeforces</p>
                              {codeforcesRating > 0 ? (
                                <p className="font-bold text-lg text-blue-400">{codeforcesRating}</p>
                              ) : (
                                <p className="text-xs text-muted-foreground">-</p>
                              )}
                            </div>

                            {/* Overall Rating */}
                            <div className="text-right min-w-[80px]">
                              <p className="text-muted-foreground text-xs">Overall</p>
                              {overallRating > 0 ? (
                                <p className="font-bold text-lg text-purple-400">{overallRating}</p>
                              ) : (
                                <p className="text-xs text-muted-foreground">-</p>
                              )}
                            </div>

                            {/* Points */}
                            <div className="text-right min-w-[80px]">
                              <p className="text-muted-foreground text-xs">Points</p>
                              <p className="font-bold text-lg">{user.points}</p>
                            </div>

                            {/* Solved */}
                            <div className="text-right min-w-[80px]">
                              <p className="text-muted-foreground text-xs">Solved</p>
                              <p className="font-bold text-lg">{user.solved}</p>
                            </div>

                            {/* Streak */}
                            <div className="text-right min-w-[80px]">
                              <p className="text-muted-foreground text-xs">Streak</p>
                              <p className="font-bold text-lg flex items-center justify-end gap-1">
                                {user.streak}
                                <Zap className="w-4 h-4 text-yellow-400" />
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
