import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StatCard = ({ icon: Icon, label, value, trend, trendUp }) => {
    return (_jsxs("div", { className: "glass-card-glow p-6 group transition-all duration-500 hover:-translate-y-1", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors duration-300", children: _jsx(Icon, { className: "w-5 h-5 text-primary" }) }), _jsx("div", { className: "absolute inset-0 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }), trend && (_jsx("span", { className: `text-xs font-medium px-2.5 py-1 rounded-lg ${trendUp
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-warning/10 text-warning border border-warning/20"}`, children: trend }))] }), _jsx("p", { className: "text-muted-foreground text-sm mb-1.5", children: label }), _jsx("p", { className: "text-3xl font-bold gradient-text", children: value })] }));
};
export default StatCard;
