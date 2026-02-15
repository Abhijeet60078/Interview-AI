import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X, TrendingUp, Video } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    const navLinks = [
        { to: "/", label: "Home", icon: null },
        { to: "/mock", label: "Mock Interview", icon: Video },
        { to: "/analytics", label: "Analytics", icon: TrendingUp },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-4 mt-4">
                <div className="glass-card px-4 rounded-2xl">
                    <div className="flex items-center justify-between h-14">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                                    <Zap className="w-5 h-5 text-primary" />
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <span className="font-bold text-lg gradient-text">MockMate AI</span>
                        </Link>
                        <div className="hidden md:flex items-center gap-1 bg-secondary/30 rounded-xl p-1 overflow-x-auto max-w-3xl scrollbar-hide">
                            {navLinks.map((link, index) => {
                                return (
                                    <div key={link.to} className="flex items-center">
                                        <Link
                                            to={link.to}
                                            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${isActive(link.to)
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            {isActive(link.to) && <div className="absolute inset-0 bg-primary/10 rounded-lg" />}
                                            <span className="relative flex items-center gap-1.5">
                                                {link.icon && <link.icon className="w-3.5 h-3.5" />}
                                                {link.label}
                                            </span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            {user ? (
                                <ProfileDropdown />
                            ) : (
                                <Link to="/setup">
                                    <Button variant="glow" size="sm" className="px-5">
                                        Start Interview
                                    </Button>
                                </Link>
                            )}
                        </div>
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                    {isOpen && (
                        <div className="md:hidden py-4 border-t border-white/[0.06] animate-fade-in">
                            <div className="flex flex-col gap-1">
                                {/* Main Navigation */}
                                <div className="mb-2">
                                    {navLinks.slice(0, 2).map((link) => (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={() => setIsOpen(false)}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive(link.to)
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
                                        >
                                            {link.icon && <link.icon className="w-4 h-4" />}
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                {/* Practice Section */}
                                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                                    PRACTICE & LEARN
                                </div>
                                {navLinks.slice(2, 5).map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive(link.to)
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
                                    >
                                        {link.icon && <link.icon className="w-4 h-4" />}
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Progress Section */}
                                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground mt-2">
                                    TRACK PROGRESS
                                </div>
                                {navLinks.slice(5).map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive(link.to)
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
                                    >
                                        {link.icon && <link.icon className="w-4 h-4" />}
                                        {link.label}
                                    </Link>
                                ))}

                                {!user ? (
                                    <>
                                        <div className="my-3 border-t border-white/[0.06]" />
                                        <Link to="/login" onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" className="w-full mb-2">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                                            <Button variant="glow" className="w-full">
                                                Sign Up Free
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <div className="my-3 border-t border-white/[0.06]" />
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                        >
                                            Settings
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
