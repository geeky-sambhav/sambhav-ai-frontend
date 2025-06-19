import { Status } from "../lib/types";

interface MicButtonProps {
  status: Status;
  toggleListening: () => void;
}

// Helper to determine button style based on status
const getButtonClass = (status: Status) => {
  switch (status) {
    case "listening":
      return "bg-gradient-cosmic animate-[glow_1.5s_infinite] shadow-lg";
    case "thinking":
      return "bg-gradient-to-r from-yellow-400 to-amber-500";
    case "speaking":
      return "bg-gradient-to-r from-green-400 to-emerald-500";
    case "error":
      return "bg-gradient-to-r from-red-500 to-rose-600";
    default:
      return "bg-gradient-primary hover:shadow-lg hover:scale-105";
  }
};

const MicIcon = () => (
  <svg className="w-10 h-10 text-white text-shadow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2h2v2a5 5 0 0 0 10 0v-2h2z" fill="currentColor"/>
  </svg>
);

const SpinnerIcon = () => (
  <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
  </svg>
);

export default function MicButton({ status, toggleListening }: MicButtonProps) {
  const isDisabled = status === 'speaking' || status === 'thinking';

  return (
    <div className="flex flex-col justify-center items-center pt-8">
      <div className="relative">
        {/* Outer ring for visual effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-cosmic opacity-20 blur-md transform scale-125"></div>
        
        <button
          onClick={toggleListening}
          disabled={isDisabled}
          className={`w-24 h-24 rounded-full focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-xl ${getButtonClass(status)}`}
          aria-label={status === 'idle' ? 'Start listening' : 'Stop listening'}
        >
          <div className="relative">
            {status === 'thinking' ? <SpinnerIcon /> : <MicIcon />}
            
            {/* Ripple effect for listening state */}
            {status === 'listening' && (
              <>
                <span className="absolute inset-0 rounded-full animate-ping bg-white opacity-10"></span>
                <span className="absolute inset-0 rounded-full animate-ping delay-300 bg-white opacity-10"></span>
                <span className="absolute inset-0 rounded-full animate-ping delay-500 bg-white opacity-5"></span>
              </>
            )}
          </div>
        </button>
      </div>
      
      {/* Status indicator below the button */}
      <div className={`mt-4 text-sm font-medium ${
        status === 'listening' ? 'text-primary-light animate-pulse' :
        status === 'thinking' ? 'text-yellow-400' :
        status === 'speaking' ? 'text-green-400' :
        status === 'error' ? 'text-red-400' : 'text-gray-400'
      }`}>
        {status === 'idle' ? 'Tap to speak' : 
         status === 'listening' ? 'Listening...' :
         status === 'thinking' ? 'Processing...' :
         status === 'speaking' ? 'Speaking...' : 'Error'}
      </div>
    </div>
  );
}
