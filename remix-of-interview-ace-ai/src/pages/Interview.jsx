import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send, ArrowLeft, RotateCcw, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatBubble from "@/components/ChatBubble";
import FeedbackCard from "@/components/FeedbackCard";
import VideoPreview from "@/components/VideoPreview";
import VoiceControls from "@/components/VoiceControls";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
const mockQuestions = {
    java: [
        "What is the difference between JDK, JRE, and JVM?",
        "Explain the concept of multithreading in Java.",
        "What are the main principles of Object-Oriented Programming?",
    ],
    mern: [
        "What is the virtual DOM in React and how does it work?",
        "Explain the difference between SQL and NoSQL databases.",
        "How does Node.js handle asynchronous operations?",
    ],
    dsa: [
        "What is the time complexity of QuickSort in the worst case?",
        "Explain the difference between a stack and a queue.",
        "How would you detect a cycle in a linked list?",
    ],
    python: [
        "What are Python decorators and how do they work?",
        "Explain the difference between a list and a tuple.",
        "What is the GIL in Python?",
    ],
    frontend: [
        "What is the CSS box model?",
        "Explain the difference between let, const, and var.",
        "What are React hooks and why are they useful?",
    ],
    backend: [
        "What is RESTful API design?",
        "Explain the concept of database indexing.",
        "What are microservices and their advantages?",
    ],
};
const Interview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { role = "java" } = location.state || {};
    const questions = mockQuestions[role] || mockQuestions.java;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [messages, setMessages] = useState([
        {
            text: questions[0],
            isAI: true,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
    ]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState({
        score: 0,
        strengths: [],
        improvements: [],
    });
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const { isListening, transcript, interimTranscript, startListening, stopListening, resetTranscript, isSupported: speechSupported } = useSpeechRecognition();
    const { isSpeaking, speak, stop: stopSpeaking } = useTextToSpeech();
    // Speak the first question when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            speak(questions[0]);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    // Update answer with speech transcript
    useEffect(() => {
        if (transcript) {
            setAnswer(transcript + interimTranscript);
        }
        else if (interimTranscript) {
            setAnswer(interimTranscript);
        }
    }, [transcript, interimTranscript]);
    const handleToggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        }
        else {
            resetTranscript();
            setAnswer("");
            startListening();
        }
    }, [isListening, startListening, stopListening, resetTranscript]);
    const handleSubmit = () => {
        if (!answer.trim())
            return;
        // Stop listening if active
        if (isListening) {
            stopListening();
        }
        const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        // Add user message
        setMessages((prev) => [
            ...prev,
            { text: answer, isAI: false, timestamp },
        ]);
        // Generate mock feedback
        const mockScore = Math.floor(Math.random() * 4) + 6; // 6-9
        setFeedback({
            score: mockScore,
            strengths: [
                "Good understanding of core concepts",
                "Clear explanation structure",
            ],
            improvements: [
                "Include more specific examples",
                "Mention edge cases and error handling",
            ],
        });
        setShowFeedback(true);
        setAnswer("");
        resetTranscript();
    };
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            const nextQ = currentQuestion + 1;
            setCurrentQuestion(nextQ);
            const newMessage = {
                text: questions[nextQ],
                isAI: true,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, newMessage]);
            setShowFeedback(false);
            // Speak the next question
            setTimeout(() => speak(questions[nextQ]), 500);
        }
        else {
            navigate("/dashboard");
        }
    };
    return (_jsxs("div", { className: "min-h-screen pt-16 pb-4 flex flex-col", children: [_jsx("div", { className: "glass-card border-t-0 rounded-t-none px-4 py-3", children: _jsxs("div", { className: "container mx-auto flex items-center justify-between", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate("/setup"), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Exit"] }), _jsxs("span", { className: "text-sm text-muted-foreground", children: ["Question ", currentQuestion + 1, " of ", questions.length] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => window.location.reload(), children: _jsx(RotateCcw, { className: "w-4 h-4" }) })] }) }), _jsx("div", { className: "flex-1 container mx-auto px-4 py-6 overflow-y-auto", children: _jsxs("div", { className: "grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto", children: [_jsxs("div", { className: "lg:col-span-1", children: [_jsx(VideoPreview, { autoStart: isVideoEnabled, className: "sticky top-4" }), speechSupported && (_jsxs("div", { className: "mt-4 glass-card p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h4", { className: "text-sm font-medium", children: "Voice Mode" }), _jsx(VoiceControls, { isListening: isListening, isSpeaking: isSpeaking, onToggleListening: handleToggleListening, onStopSpeaking: stopSpeaking, disabled: showFeedback })] }), isListening && (_jsxs("div", { className: "text-xs text-muted-foreground", children: [_jsx("span", { className: "text-primary", children: "\u25CF " }), "Listening... speak your answer"] }))] }))] }), _jsxs("div", { className: "lg:col-span-2 space-y-4", children: [messages.map((msg, index) => (_jsx(ChatBubble, { message: msg.text, isAI: msg.isAI, timestamp: msg.timestamp }, index))), showFeedback && (_jsxs("div", { className: "mt-6", children: [_jsx(FeedbackCard, { ...feedback }), _jsx(Button, { variant: "glow", className: "w-full mt-4", onClick: handleNextQuestion, children: currentQuestion < questions.length - 1
                                                ? "Next Question"
                                                : "Finish & View Results" })] }))] })] }) }), !showFeedback && (_jsx("div", { className: "glass-card border-b-0 rounded-b-none px-4 py-4", children: _jsxs("div", { className: "container mx-auto max-w-4xl", children: [_jsxs("div", { className: "flex gap-3", children: [speechSupported && (_jsx(Button, { variant: isListening ? "destructive" : "secondary", size: "icon", className: "h-auto shrink-0", onClick: handleToggleListening, disabled: isSpeaking, children: isListening ? (_jsx(MicOff, { className: "w-5 h-5" })) : (_jsx(Mic, { className: "w-5 h-5" })) })), _jsx(Textarea, { placeholder: isListening ? "Listening... speak your answer" : "Type your answer here...", value: answer, onChange: (e) => setAnswer(e.target.value), className: "min-h-[80px] bg-secondary/50 border-border/50 resize-none", onKeyDown: (e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    } }), _jsx(Button, { variant: "glow", size: "icon", className: "h-auto", onClick: handleSubmit, disabled: !answer.trim(), children: _jsx(Send, { className: "w-5 h-5" }) })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-2", children: speechSupported
                                ? "Click mic or press Enter to submit • Shift+Enter for new line"
                                : "Press Enter to submit, Shift+Enter for new line" })] }) }))] }));
};
export default Interview;
