export type Status = "idle" | "listening" | "thinking" | "speaking" | "error";

export interface ChatMessage {
  role: "user" | "bot";
  content: string;
}
