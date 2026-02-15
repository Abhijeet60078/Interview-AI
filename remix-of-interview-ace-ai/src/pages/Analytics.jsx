import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Clock, Target, Zap, Award, BookOpen } from "lucide-react";

const analyticsData = {
  questionsOverTime: [
    { date: "Mon", solved: 4 },
    { date: "Tue", solved: 6 },
    { date: "Wed", solved: 3 },
    { date: "Thu", solved: 8 },
    { date: "Fri", solved: 7 },
    { date: "Sat", solved: 9 },
    { date: "Sun", solved: 5 },
  ],
  byDifficulty: [
    { difficulty: "Easy", count: 28, accuracy: 95 },
    { difficulty: "Medium", count: 18, accuracy: 78 },
    { difficulty: "Hard", count: 8, accuracy: 62 },
  ],
  topicBreakdown: [
    { name: "Arrays", value: 20 },
    { name: "Trees", value: 18 },
    { name: "Strings", value: 16 },
    { name: "DP", value: 14 },
    { name: "Graphs", value: 12 },
  ],
};

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const Analytics = () => {
  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ label: "Analytics" }]} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Analytics & Progress</h1>
            </div>
            <p className="text-muted-foreground">
              Track your interview preparation journey
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Solved</p>
                    <p className="text-3xl font-bold">54</p>
                    <p className="text-xs text-green-400 mt-1">+8 this week</p>
                  </div>
                  <Target className="w-10 h-10 text-primary opacity-30" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Avg Accuracy</p>
                    <p className="text-3xl font-bold">78%</p>
                    <p className="text-xs text-green-400 mt-1">+5% this month</p>
                  </div>
                  <Award className="w-10 h-10 text-yellow-400 opacity-30" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-xs text-green-400 mt-1">days in a row</p>
                  </div>
                  <Zap className="w-10 h-10 text-yellow-400 opacity-30" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/[0.08]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Study Time</p>
                    <p className="text-3xl font-bold">42h</p>
                    <p className="text-xs text-green-400 mt-1">+6h this week</p>
                  </div>
                  <Clock className="w-10 h-10 text-blue-400 opacity-30" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Questions Over Time */}
            <Card className="glass-card border-white/[0.08]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Questions Solved (This Week)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.questionsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="solved"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* By Difficulty */}
            <Card className="glass-card border-white/[0.08]">
              <CardHeader>
                <CardTitle>Performance by Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.byDifficulty}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="difficulty" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#3b82f6" name="Questions" />
                    <Bar dataKey="accuracy" fill="#10b981" name="Accuracy %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Topic Breakdown and Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Topic Distribution */}
            <Card className="glass-card border-white/[0.08] md:col-span-2">
              <CardHeader>
                <CardTitle>Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topicBreakdown.map((topic) => {
                    const percentage = (topic.value / 80) * 100;
                    return (
                      <div key={topic.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{topic.name}</span>
                          <span className="text-sm text-muted-foreground">{topic.value}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-purple-500 h-full rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Topic Pie Chart */}
            <Card className="glass-card border-white/[0.08]">
              <CardHeader>
                <CardTitle>Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.topicBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.topicBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
