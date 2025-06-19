import { Status } from "../lib/types";

interface StatusDisplayProps {
  status: Status;
}

const statusText: Record<Status, string> = {
  idle: "Click the mic to start",
  listening: "Listening...",
  thinking: "Thinking...",
  speaking: "Speaking...",
  error: "An error occurred",
};

const getStatusClass = (status: Status) => {
  switch (status) {
    case "listening":
      return "text-primary-light animate-pulse";
    case "thinking":
      return "text-yellow-400";
    case "speaking":
      return "text-green-400";
    case "error":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case "listening":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case "thinking":
      return (
        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "speaking":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case "error":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      );
  }
};

export default function StatusDisplay({ status }: StatusDisplayProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="glass rounded-full px-5 py-2 inline-flex items-center space-x-2 shadow-md bg-opacity-30 border border-gray-700">
        <span className={`flex items-center justify-center ${getStatusClass(status)}`}>
          {getStatusIcon(status)}
        </span>
        <p className={`text-center font-medium ${getStatusClass(status)}`}>
          {statusText[status] || "Idle"}
        </p>
      </div>
    </div>
  );
}
