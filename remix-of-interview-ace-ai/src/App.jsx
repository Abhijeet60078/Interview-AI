import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RequireAuth from "@/components/RequireAuth";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Setup from "./pages/Setup";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import QuestionBank from "./pages/QuestionBank";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import CodeEditor from "./pages/CodeEditor";
import ResumeManager from "./pages/ResumeManager";
import DiscussionForum from "./pages/DiscussionForum";
import InterviewScheduler from "./pages/InterviewScheduler";
import AIFeedback from "./pages/AIFeedback";
import MockInterview from "./pages/MockInterview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<AuthProvider>
					<Navbar />
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/setup"
							element={
								<RequireAuth>
									<Setup />
								</RequireAuth>
							}
						/>
						<Route
							path="/interview"
							element={
								<RequireAuth>
									<Interview />
								</RequireAuth>
							}
						/>
						<Route
							path="/dashboard"
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}
						/>
						<Route
							path="/profile"
							element={
								<RequireAuth>
									<Profile />
								</RequireAuth>
							}
						/>
						<Route
							path="/settings"
							element={
								<RequireAuth>
									<Settings />
								</RequireAuth>
							}
						/>
						<Route
							path="/questions"
							element={
								<RequireAuth>
									<QuestionBank />
								</RequireAuth>
							}
						/>
						<Route
							path="/analytics"
							element={
								<RequireAuth>
									<Analytics />
								</RequireAuth>
							}
						/>
						<Route
							path="/leaderboard"
							element={
								<RequireAuth>
									<Leaderboard />
								</RequireAuth>
							}
						/>
						<Route
							path="/achievements"
							element={
								<RequireAuth>
									<Achievements />
								</RequireAuth>
							}
						/>
						<Route
							path="/editor"
							element={
								<RequireAuth>
									<CodeEditor />
								</RequireAuth>
							}
						/>
						<Route
							path="/resume"
							element={
								<RequireAuth>
									<ResumeManager />
								</RequireAuth>
							}
						/>
						<Route
							path="/forum"
							element={
								<RequireAuth>
									<DiscussionForum />
								</RequireAuth>
							}
						/>
						<Route
							path="/schedule"
							element={
								<RequireAuth>
									<InterviewScheduler />
								</RequireAuth>
							}
						/>
						<Route
							path="/feedback"
							element={
								<RequireAuth>
									<AIFeedback />
								</RequireAuth>
							}
						/>
						<Route
							path="/mock"
							element={
								<RequireAuth>
									<MockInterview />
								</RequireAuth>
							}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
