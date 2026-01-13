import React, { useState } from 'react';

interface InspectionResultsProps {
  content: string;
}

const InspectionResults: React.FC<InspectionResultsProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="inspection-results w-full flex-grow flex flex-col">
      <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800 flex-grow flex flex-col">
        <div
          onClick={toggleExpand}
          className="inspection-toggle p-3 flex justify-between items-center text-left text-gray-300 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleExpand();
            }
          }}
          aria-expanded={isExpanded}
          aria-controls="inspection-content"
        >
          <span className="font-semibold flex-grow truncate mr-2">Inspection Results</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 flex-shrink-0 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded && (
          <div id="inspection-content" className="inspection-content p-3 border-t border-gray-600 bg-gray-900 flex-grow">
            <pre className="whitespace-pre-wrap text-sm text-gray-300 w-full">{content}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionResults;
