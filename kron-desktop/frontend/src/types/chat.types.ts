export interface ChatMessage {
  text: string;
  timestamp: Date;
  isUser: boolean;
  isPartial?: boolean;
  isAutomatic?: boolean;
  isHistory: boolean;
}

export interface ChatHistory {
  messages: ChatMessage[];
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isStreaming: boolean;
  onStopStreaming?: () => void;
}

export interface ChatMessagesProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ComponentPropsWithNode {
  children?: React.ReactNode;
  [key: string]: any;
}

export interface CodeProps extends ComponentPropsWithNode {
  inline?: boolean;
  className?: string;
}

export interface OmniParserResult {
  image: string;
  parsed_content: string[];
  label_coordinates: {
    [key: string]: [number, number, number, number];
  };
}

export interface ActionResult {
  status: 'success' | 'error';
  message: string;
  screenshot: string; // Base64 encoded screenshot
  screenshotPath?: string; // Optional path if screenshot was saved
  error?: string;
  omniParserResult?: OmniParserResult;
}
