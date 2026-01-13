import { LoadingSpinnerIcon } from "../../Icons/LoadingSpinnerIcon";

interface ThinkingAnimationProps {
  hasActiveAction?: boolean;
}

export const ThinkingAnimation = ({ hasActiveAction = false }: ThinkingAnimationProps) => {
  return (
    <div className={`flex items-center space-x-2 max-w-[90%] ${!hasActiveAction && 'p-3 bg-content1 rounded-lg rounded-bl-none'}`}>
      {hasActiveAction ? (
        <div className="flex items-center space-x-2 text-white">
          <LoadingSpinnerIcon />
          <span className="text-sm">Executing Action</span>
        </div>
      ) : (
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"></div>
        </div>
      )}
    </div>
  );
};
