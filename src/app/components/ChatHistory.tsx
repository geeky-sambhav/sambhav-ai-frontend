import { ChatMessage } from "../lib/types";
import { useEffect, useRef } from "react";

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
  interimTranscript: string;
}

export default function ChatHistory({ chatHistory, interimTranscript }: ChatHistoryProps) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, interimTranscript]);

  return (
    <div 
      ref={chatContainerRef} 
      className="glass-deep rounded-2xl shadow-lg h-96 p-5 overflow-y-auto space-y-5 scroll-smooth border border-gray-700 card-3d scrollbar-hide"
    >
      {chatHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 mb-4 rounded-full bg-gradient-cosmic flex items-center justify-center animate-[bounce-subtle_2s_ease-in-out_infinite]">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p className="text-gray-400 text-center text-shadow">Start a conversation by clicking the microphone button below</p>
        </div>
      )}
      
      {chatHistory.map((msg, index) => (
        <div 
          key={index} 
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[float_0.5s_ease-in-out]`}
        >
          <div 
            className={`rounded-2xl px-5 py-3 max-w-sm break-words shadow-md transition-all duration-300 card-3d-inner ${
              msg.role === 'user' 
                ? 'bg-gradient-primary text-white' 
                : 'glass text-white border border-gray-700'
            }`}
          >
            {msg.role === 'bot' && (
              <div className="w-6 h-6 rounded-full bg-accent mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            )}
            <p className={msg.role === 'user' ? 'text-shadow' : ''}>{msg.content}</p>
          </div>
        </div>
      ))}
      
      {interimTranscript && (
        <div className="flex justify-end">
          <div className="rounded-2xl px-5 py-3 bg-primary opacity-50 max-w-sm break-words animate-pulse">
            <p>{interimTranscript}</p>
          </div>
        </div>
      )}
    </div>
  );
}
