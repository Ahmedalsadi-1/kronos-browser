interface ErrorMessageProps {
  content: string;
}

export const ErrorMessage = ({ content }: ErrorMessageProps) => {
  return (
    <div className="my-2">
      <div className="text-danger whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};
