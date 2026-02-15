import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
const VoiceControls = ({ isListening, isSpeaking, onToggleListening, onStopSpeaking, disabled = false, }) => {
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: isListening ? "destructive" : "glow", size: "icon", onClick: onToggleListening, disabled: disabled || isSpeaking, className: "relative", children: isListening ? (_jsxs(_Fragment, { children: [_jsx(MicOff, { className: "w-5 h-5" }), _jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" })] })) : (_jsx(Mic, { className: "w-5 h-5" })) }), isSpeaking && (_jsx(Button, { variant: "secondary", size: "icon", onClick: onStopSpeaking, children: _jsx(VolumeX, { className: "w-5 h-5" }) })), isSpeaking && (_jsxs("div", { className: "flex items-center gap-1 text-primary", children: [_jsx(Volume2, { className: "w-4 h-4 animate-pulse" }), _jsx("span", { className: "text-xs", children: "AI Speaking..." })] }))] }));
};
export default VoiceControls;
