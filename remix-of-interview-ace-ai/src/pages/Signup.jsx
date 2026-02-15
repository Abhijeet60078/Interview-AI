import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const Signup = () => {
  const { signup, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await signup({ email, password, name });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      // For demo purposes, create a local user
      await signup({ 
        email: "google.user@demo.com", 
        name: "Google User",
        password: "demo123",
        isDemo: true
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const GoogleIcon = () => (
    <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.61l6.86-6.86C35.9 2.53 30.3 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.08 6.28C12.6 13.06 17.86 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.22-.42-4.74H24v9.01h12.65c-.55 2.96-2.2 5.47-4.68 7.16l7.56 5.86C43.98 37.1 46.5 31.02 46.5 24z" />
      <path fill="#FBBC05" d="M10.64 28.5a14.5 14.5 0 0 1 0-9l-8.08-6.28A24 24 0 0 0 0 24c0 3.96.95 7.71 2.56 11.78l8.08-6.28z" />
      <path fill="#34A853" d="M24 48c6.3 0 11.9-2.08 15.86-5.65l-7.56-5.86c-2.1 1.41-4.8 2.24-8.3 2.24-6.14 0-11.4-3.56-13.36-8.5l-8.08 6.28C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />
      <div className="absolute -top-32 right-16 w-[420px] h-[420px] rounded-full blur-3xl bg-accent/20" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <Card className="glass-card border-white/[0.08] order-2 lg:order-1">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Join thousands improving interview performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(error || authError) && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error || authError}
                  </div>
                )}
                <Button 
                  type="button" 
                  variant="glass" 
                  className="w-full" 
                  onClick={handleGoogle}
                  disabled={loading}
                >
                  <GoogleIcon />
                  Sign up with Google
                </Button>
                <div className="relative text-center">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-white/[0.08]" />
                  <span className="relative px-3 text-xs uppercase text-muted-foreground bg-background/60">
                    Or sign up with email
                  </span>
                </div>
              </div>
              <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Alex Johnson"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button type="submit" variant="glow" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
                <div className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Log in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Secure onboarding</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Start practicing smarter.
              <span className="block gradient-text">Your next role is closer.</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your account to unlock AI-driven mock interviews, feedback, and dashboards.
            </p>
            <div className="hidden lg:flex flex-col gap-3">
              <div className="glass-card px-4 py-3 rounded-xl text-sm text-muted-foreground">
                ✔ Tailored interview packs
              </div>
              <div className="glass-card px-4 py-3 rounded-xl text-sm text-muted-foreground">
                ✔ Real-time coaching insights
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
