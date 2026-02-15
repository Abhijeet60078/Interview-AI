import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWebcam } from "@/hooks/useWebcam";
import { useEffect } from "react";
const VideoPreview = ({ autoStart = false, className = "" }) => {
    const { videoRef, isActive, error, startWebcam, stopWebcam } = useWebcam();
    useEffect(() => {
        if (autoStart) {
            startWebcam();
        }
    }, [autoStart, startWebcam]);
    return (_jsxs("div", { className: `relative ${className}`, children: [_jsx("div", { className: "glass-card overflow-hidden aspect-video bg-secondary/30", children: isActive ? (_jsx("video", { ref: videoRef, autoPlay: true, playsInline: true, muted: true, className: "w-full h-full object-cover mirror", style: { transform: "scaleX(-1)" } })) : (_jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-3 p-4", children: [_jsx(VideoOff, { className: "w-12 h-12 text-muted-foreground" }), _jsx("p", { className: "text-sm text-muted-foreground text-center", children: error || "Camera is off" })] })) }), _jsx("div", { className: "absolute bottom-3 right-3", children: _jsx(Button, { variant: isActive ? "destructive" : "glow", size: "sm", onClick: isActive ? stopWebcam : startWebcam, children: isActive ? (_jsxs(_Fragment, { children: [_jsx(VideoOff, { className: "w-4 h-4 mr-1" }), "Stop"] })) : (_jsxs(_Fragment, { children: [_jsx(Video, { className: "w-4 h-4 mr-1" }), "Start"] })) }) }), isActive && (_jsxs("div", { className: "absolute top-3 left-3 flex items-center gap-2", children: [_jsx("span", { className: "w-2 h-2 bg-destructive rounded-full animate-pulse" }), _jsx("span", { className: "text-xs text-foreground/80", children: "Live" })] }))] }));
};
export default VideoPreview;
