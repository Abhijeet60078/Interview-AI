import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin, Video, Plus, AlertCircle } from "lucide-react";

const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      title: "Mock Interview - DSA",
      interviewer: "Alex Chen",
      interviewerLevel: "Expert",
      date: "2024-02-20",
      time: "10:00 AM",
      duration: "60 min",
      type: "DSA",
      status: "scheduled",
      room: "virtual-001",
    },
    {
      id: 2,
      title: "System Design Practice",
      interviewer: "Sarah Johnson",
      interviewerLevel: "Senior",
      date: "2024-02-22",
      time: "2:00 PM",
      duration: "90 min",
      type: "System Design",
      status: "scheduled",
      room: "virtual-002",
    },
    {
      id: 3,
      title: "Mock Interview - Behavioral",
      interviewer: "Mike Rodriguez",
      interviewerLevel: "Advanced",
      date: "2024-02-25",
      time: "3:30 PM",
      duration: "45 min",
      type: "Behavioral",
      status: "pending",
      room: null,
    },
  ]);

  const [upcomingInterviews] = useState([
    {
      id: 4,
      title: "FAANG Prep - Google Style",
      interviewer: "Emily Davis",
      interviewerLevel: "Expert",
      date: "2024-02-28",
      time: "6:00 PM",
      duration: "120 min",
      type: "Full Round",
      difficulty: "Hard",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-green-500/20 text-green-300";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300";
      case "completed":
        return "bg-blue-500/20 text-blue-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "text-yellow-400";
      case "Senior":
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold">Interview Scheduler</h1>
              </div>
              <p className="text-muted-foreground">
                Book and manage mock interviews with experienced coders
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>

          {/* Alert */}
          <Card className="glass-card border-yellow-500/30 bg-yellow-500/5 mb-8">
            <CardContent className="pt-6 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule interviews at least 2 days in advance for better interviewer matching
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Scheduled Interviews */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Scheduled Interviews</h2>
            <div className="space-y-4">
              {interviews.map((interview) => (
                <Card
                  key={interview.id}
                  className="glass-card border-white/[0.08] hover:border-white/[0.16] transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{interview.title}</h3>
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status.charAt(0).toUpperCase() +
                              interview.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {interview.interviewer}
                            <span className={`ml-1 font-semibold ${getLevelColor(interview.interviewerLevel)}`}>
                              ({interview.interviewerLevel})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {interview.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {interview.time}
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-secondary/50 rounded text-xs">
                              {interview.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {interview.status === "scheduled" && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </Button>
                        )}
                        {interview.status === "pending" && (
                          <Button size="sm" variant="outline">
                            Waiting for Acceptance
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          Reschedule
                        </Button>
                      </div>
                    </div>

                    {interview.room && (
                      <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06] mt-4">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Room: {interview.room}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Interviews to Book */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Interviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingInterviews.map((interview) => (
                <Card
                  key={interview.id}
                  className="glass-card border-white/[0.08] hover:border-primary/50 hover:scale-105 transition-all cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {interview.title}
                      </h3>
                      <div className="flex gap-2 mb-4">
                        <Badge className="bg-purple-500/20 text-purple-300">
                          {interview.type}
                        </Badge>
                        <Badge className="bg-red-500/20 text-red-300">
                          {interview.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{interview.interviewer}</span>
                        <span
                          className={`font-semibold ${getLevelColor(
                            interview.interviewerLevel
                          )}`}
                        >
                          ({interview.interviewerLevel})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {interview.time} ({interview.duration})
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Book Interview
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <Card className="glass-card border-white/[0.08] mt-12">
            <CardHeader>
              <CardTitle>Interview Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                ✓ <strong>Prepare ahead:</strong> Review the interview type and
                difficulty level
              </p>
              <p>
                ✓ <strong>Test your setup:</strong> Check your audio, video, and
                internet connection
              </p>
              <p>
                ✓ <strong>Be early:</strong> Join the call 5 minutes before the
                scheduled time
              </p>
              <p>
                ✓ <strong>Ask questions:</strong> Understand the problem statement
                clearly
              </p>
              <p>
                ✓ <strong>Think out loud:</strong> Explain your approach to the
                interviewer
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
