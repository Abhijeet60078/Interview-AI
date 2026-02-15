import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, TrendingUp, Sparkles } from "lucide-react";
const FeedbackCard = ({ score, strengths, improvements }) => {
    const getScoreColor = (score) => {
        if (score >= 8)
            return "text-success";
        if (score >= 5)
            return "text-warning";
        return "text-destructive";
    };
    const getScoreBg = (score) => {
        if (score >= 8)
            return "from-success/20 to-success/5 border-success/20";
        if (score >= 5)
            return "from-warning/20 to-warning/5 border-warning/20";
        return "from-destructive/20 to-destructive/5 border-destructive/20";
    };
    return (_jsxs("div", { className: "glass-card p-6 space-y-6 animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20", children: _jsx(Sparkles, { className: "w-4 h-4 text-primary" }) }), _jsx("h3", { className: "font-semibold", children: "AI Feedback" })] }), _jsxs("div", { className: `flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r border ${getScoreBg(score)}`, children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Score:" }), _jsxs("span", { className: `text-2xl font-bold ${getScoreColor(score)}`, children: [score, "/10"] })] })] }), _jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-1 rounded-md bg-success/10", children: _jsx(CheckCircle, { className: "w-4 h-4 text-success" }) }), _jsx("span", { className: "text-sm font-medium", children: "Strengths" })] }), _jsx("ul", { className: "space-y-2.5", children: strengths.map((strength, index) => (_jsxs("li", { className: "text-sm text-muted-foreground flex items-start gap-2.5 group", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0 group-hover:scale-150 transition-transform" }), _jsx("span", { className: "group-hover:text-foreground transition-colors", children: strength })] }, index))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-1 rounded-md bg-warning/10", children: _jsx(TrendingUp, { className: "w-4 h-4 text-warning" }) }), _jsx("span", { className: "text-sm font-medium", children: "Areas to Improve" })] }), _jsx("ul", { className: "space-y-2.5", children: improvements.map((improvement, index) => (_jsxs("li", { className: "text-sm text-muted-foreground flex items-start gap-2.5 group", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0 group-hover:scale-150 transition-transform" }), _jsx("span", { className: "group-hover:text-foreground transition-colors", children: improvement })] }, index))) })] })] })] }));
};
export default FeedbackCard;
