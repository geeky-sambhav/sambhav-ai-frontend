"use client";

import ChatHistory from "./components/ChatHistory";
import MicButton from "./components/MicButton";
import StatusDisplay from "./components/StatusDisplay";
import { useVoiceProcessor } from "./hooks/useVoiceProcessor";

export default function Home() {
  const { status, chatHistory, interimTranscript, toggleListening } = useVoiceProcessor();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-dark pattern-overlay text-white p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-56 h-56 rounded-full bg-secondary opacity-5 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-2xl z-10">
        <h1 className="text-5xl font-bold text-center mb-2 bg-clip-text bg-gradient-primary text-glow">Sambhav AI</h1>
        
        {/* Component to display the bot's current status */}
        <StatusDisplay status={status} />

        {/* Component to display the conversation */}
        <ChatHistory 
          chatHistory={chatHistory} 
          interimTranscript={interimTranscript} 
        />
        
        {/* Component for the main user interaction button */}
        <MicButton 
          status={status} 
          toggleListening={toggleListening} 
        />
      </div>
    </main>
  );
}
