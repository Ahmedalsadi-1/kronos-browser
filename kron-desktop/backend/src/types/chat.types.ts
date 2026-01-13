export interface ChatMessage {
  text: string;
  timestamp: Date;
  isUser: boolean;
  isPartial?: boolean;
  imageData?: string;
}

export interface ChatHistory {
  messages: ChatMessage[];
}
