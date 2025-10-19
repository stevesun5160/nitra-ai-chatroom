export type MessageRole = 'assistant' | 'user';

export type Message = {
  role: MessageRole;
  content: string | undefined;
  timestamp: string;
  isStreaming?: boolean;
  displayedContent?: string;
};
