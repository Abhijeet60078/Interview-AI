import { useState, useRef, useCallback, useEffect } from "react";
export function useWebcam() {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);
    const startWebcam = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: 640, height: 480 },
                audio: false,
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsActive(true);
        }
        catch (err) {
            setError("Camera access denied. Please allow camera permissions.");
            console.error("Webcam error:", err);
        }
    }, []);
    const stopWebcam = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsActive(false);
    }, []);
    useEffect(() => {
        return () => {
            stopWebcam();
        };
    }, [stopWebcam]);
    return { videoRef, isActive, error, startWebcam, stopWebcam };
}
