import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
const Setup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const roles = [
        { value: "java", label: "Java Developer", emoji: "☕" },
        { value: "mern", label: "MERN Stack Developer", emoji: "🚀" },
        { value: "dsa", label: "DSA & Algorithms", emoji: "🧮" },
        { value: "python", label: "Python Developer", emoji: "🐍" },
        { value: "frontend", label: "Frontend Developer", emoji: "🎨" },
        { value: "backend", label: "Backend Developer", emoji: "⚙️" },
    ];
    const experienceLevels = [
        { value: "fresher", label: "Fresher (0-1 years)" },
        { value: "junior", label: "Junior (1-3 years)" },
        { value: "mid", label: "Mid-Level (3-5 years)" },
        { value: "senior", label: "Senior (5+ years)" },
    ];
    const handleStart = () => {
        if (role && experience) {
            navigate("/interview", { state: { role, experience } });
        }
    };
    return (_jsxs("div", { className: "min-h-screen pt-24 flex items-center relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 -z-10 mesh-gradient" }), _jsx("div", { className: "absolute inset-0 -z-10 grid-pattern opacity-20" }), _jsx("div", { className: "orb orb-primary w-[400px] h-[400px] -top-40 -right-40" }), _jsx("div", { className: "orb orb-accent w-[300px] h-[300px] -bottom-32 -left-32" }), _jsx("div", { className: "container mx-auto px-4 py-12", children: _jsxs("div", { className: "max-w-lg mx-auto", children: [_jsxs("div", { className: "text-center mb-10 animate-fade-in", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6", children: [_jsx(Sparkles, { className: "w-4 h-4 text-primary" }), _jsx("span", { className: "text-sm text-muted-foreground", children: "Quick Setup" })] }), _jsxs("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: ["Setup Your", _jsx("br", {}), _jsx("span", { className: "gradient-text", children: "Interview" })] }), _jsx("p", { className: "text-muted-foreground text-lg", children: "Choose your role and experience level to get personalized questions." })] }), _jsxs("div", { className: "glass-card p-8 space-y-8 animate-fade-in", style: { animationDelay: '100ms' }, children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-2 text-sm font-medium", children: [_jsx("div", { className: "p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20", children: _jsx(Briefcase, { className: "w-4 h-4 text-primary" }) }), "Select Role"] }), _jsxs(Select, { value: role, onValueChange: setRole, children: [_jsx(SelectTrigger, { className: "h-14 bg-secondary/30 border-white/[0.06] rounded-xl text-base hover:bg-secondary/50 transition-colors", children: _jsx(SelectValue, { placeholder: "Choose your target role" }) }), _jsx(SelectContent, { className: "bg-card/95 backdrop-blur-xl border-white/[0.08] rounded-xl", children: roles.map((r) => (_jsx(SelectItem, { value: r.value, className: "focus:bg-primary/10 rounded-lg py-3", children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { children: r.emoji }), _jsx("span", { children: r.label })] }) }, r.value))) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-2 text-sm font-medium", children: [_jsx("div", { className: "p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20", children: _jsx(GraduationCap, { className: "w-4 h-4 text-primary" }) }), "Experience Level"] }), _jsxs(Select, { value: experience, onValueChange: setExperience, children: [_jsx(SelectTrigger, { className: "h-14 bg-secondary/30 border-white/[0.06] rounded-xl text-base hover:bg-secondary/50 transition-colors", children: _jsx(SelectValue, { placeholder: "Choose your experience level" }) }), _jsx(SelectContent, { className: "bg-card/95 backdrop-blur-xl border-white/[0.08] rounded-xl", children: experienceLevels.map((e) => (_jsx(SelectItem, { value: e.value, className: "focus:bg-primary/10 rounded-lg py-3", children: e.label }, e.value))) })] })] }), _jsxs(Button, { variant: "glow", size: "lg", className: "w-full h-14 text-base mt-4", onClick: handleStart, disabled: !role || !experience, children: ["Start Interview", _jsx(ArrowRight, { className: "w-5 h-5 ml-2" })] })] }), _jsxs("p", { className: "text-center text-sm text-muted-foreground mt-8 animate-fade-in", style: { animationDelay: '200ms' }, children: ["You'll be asked ", _jsx("span", { className: "text-primary font-medium", children: "5-10 questions" }), " based on your selection."] })] }) })] }));
};
export default Setup;
