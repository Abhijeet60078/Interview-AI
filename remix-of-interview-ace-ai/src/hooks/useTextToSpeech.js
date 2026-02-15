import { useState, useCallback, useEffect, useRef } from "react";
export function useTextToSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const utteranceRef = useRef(null);
    useEffect(() => {
        if (!("speechSynthesis" in window)) {
            setIsSupported(false);
        }
    }, []);
    const speak = useCallback((text) => {
        if (!("speechSynthesis" in window))
            return;
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        // Try to get a natural-sounding voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find((voice) => voice.lang.startsWith("en") &&
            (voice.name.includes("Google") || voice.name.includes("Natural"))) || voices.find((voice) => voice.lang.startsWith("en"));
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, []);
    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);
    return { isSpeaking, isSupported, speak, stop };
}
