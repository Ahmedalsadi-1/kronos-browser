export const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2 text-blue-300">
    <div className="w-2 h-2 rounded-full animate-pulse bg-blue-300"></div>
    <div className="w-2 h-2 rounded-full animate-pulse bg-blue-300" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 rounded-full animate-pulse bg-blue-300" style={{ animationDelay: '0.4s' }}></div>
  </div>
);
