import { StreamingSource } from "@/types/api.types";

export interface PreviewProps {
  className?: string;
}

export interface PreviewHeaderProps {
  streamingSource: StreamingSource;
  interactiveMode: boolean;
  status: string;
  onSourceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onInteractiveModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PreviewUrlBarProps {
  urlInput: string;
  urlHistory: string[];
  onUrlSubmit: (e: React.FormEvent) => void;
  onUrlInputChange: (value: string) => void;
  onBackNavigation: () => void;
}

export interface PreviewContentProps {
  error: string | null;
  screenshot: string | null;
  streamingSource: StreamingSource;
  interactiveMode: boolean;
  handleInteraction: (event: React.MouseEvent | React.KeyboardEvent | WheelEvent) => void;
  previewRef: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
}
