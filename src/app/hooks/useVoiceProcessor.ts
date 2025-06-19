"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getBotResponse } from "../lib/api";
import { ChatMessage, Status } from "../lib/types";

// Declare the Web Speech API types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

// Add these properties to the Window interface
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export function useVoiceProcessor() {
  const [status, setStatus] = useState<Status>("idle");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [interimTranscript, setInterimTranscript] = useState("");
  
  const recognitionRef = useRef<any| null>(null);

  // --- Text-to-Speech Function ---
  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported.");
        setStatus("error");
        return;
    }
    
    setStatus("speaking");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setStatus("idle");
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      setStatus("error");
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  // --- Effect for Initializing Speech Recognition ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser.");
      setStatus("error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // Collect all results (both final and interim) into the interim transcript
        interim += event.results[i][0].transcript;
      }
      
      setInterimTranscript(interim.trim());
      
      // We don't process final transcripts here anymore
      // Instead, we wait for the user to click the mic button again
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed') {
        setChatHistory(prev => [...prev, {role: "bot", content: "Microphone permissions were denied. I can't listen without them."}]);
      }
      setStatus("error");
    };
    
    recognitionRef.current = recognition;
  }, []);

  // --- Control Function to Toggle Listening ---
  const toggleListening = () => {
    if (status === "speaking" || status === "thinking") return;

    window.speechSynthesis.cancel(); // Stop any speaking

    if (status === "listening") {
      recognitionRef.current?.stop();
      setStatus("idle");
      
      // If there's an interim transcript when stopping, send it as a message
      if (interimTranscript.trim()) {
        const finalTranscript = interimTranscript.trim();
        setStatus("thinking");
        
        const userMessage: ChatMessage = { role: "user", content: finalTranscript };
        setChatHistory(prev => [...prev, userMessage]);
        setInterimTranscript("");
        
        // Process the message
        getBotResponse(finalTranscript).then(botResponseText => {
          const botMessage: ChatMessage = { role: "bot", content: botResponseText };
          setChatHistory(prev => [...prev, botMessage]);
          speak(botResponseText);
        });
      }
    } else {
      setInterimTranscript("");
      recognitionRef.current?.start();
      setStatus("listening");
    }
  };

  // --- Effect for Initial Welcome Message ---
  useEffect(() => {
    setChatHistory([{ role: "bot", content: "Hello! Click the microphone to start our conversation." }]);
  }, []);

  return { status, chatHistory, interimTranscript, toggleListening };
}
