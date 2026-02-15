import { useState, useRef, useCallback, useEffect } from "react";
export function useSpeechRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState(null);
    const [isSupported, setIsSupported] = useState(true);
    const recognitionRef = useRef(null);
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setIsSupported(false);
            setError("Speech recognition not supported in this browser");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
            let interim = "";
            let final = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    final += result[0].transcript + " ";
                }
                else {
                    interim += result[0].transcript;
                }
            }
            if (final) {
                setTranscript((prev) => prev + final);
            }
            setInterimTranscript(interim);
        };
        recognition.onerror = (event) => {
            if (event.error !== "no-speech") {
                setError(`Speech recognition error: ${event.error}`);
            }
            setIsListening(false);
        };
        recognition.onend = () => {
            setIsListening(false);
            setInterimTranscript("");
        };
        recognitionRef.current = recognition;
        return () => {
            recognition.stop();
        };
    }, []);
    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setError(null);
            setTranscript("");
            setInterimTranscript("");
            try {
                recognitionRef.current.start();
                setIsListening(true);
            }
            catch (err) {
                console.error("Start listening error:", err);
            }
        }
    }, [isListening]);
    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [isListening]);
    const resetTranscript = useCallback(() => {
        setTranscript("");
        setInterimTranscript("");
    }, []);
    return {
        isListening,
        transcript,
        interimTranscript,
        error,
        isSupported,
        startListening,
        stopListening,
        resetTranscript,
    };
}
