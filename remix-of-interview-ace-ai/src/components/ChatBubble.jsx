import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bot, User } from "lucide-react";
const ChatBubble = ({ message, isAI = false, timestamp }) => {
    return (_jsxs("div", { className: `flex gap-3 animate-fade-in ${isAI ? "" : "flex-row-reverse"}`, children: [_jsxs("div", { className: `relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isAI
                    ? "bg-gradient-to-br from-primary/20 to-accent/20"
                    : "bg-gradient-to-br from-secondary to-secondary/50"}`, children: [isAI ? (_jsx(Bot, { className: "w-5 h-5 text-primary" })) : (_jsx(User, { className: "w-5 h-5 text-foreground" })), isAI && (_jsx("div", { className: "absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-50" }))] }), _jsxs("div", { className: `max-w-[80%] ${isAI ? "" : "text-right"}`, children: [_jsx("div", { className: `inline-block px-5 py-3.5 rounded-2xl ${isAI
                            ? "glass-card text-left border-primary/10"
                            : "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"}`, children: _jsx("p", { className: "text-sm leading-relaxed", children: message }) }), timestamp && (_jsx("p", { className: "text-xs text-muted-foreground mt-1.5 px-2", children: timestamp }))] })] }));
};
export default ChatBubble;
