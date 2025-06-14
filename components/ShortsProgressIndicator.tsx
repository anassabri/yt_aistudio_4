import React from 'react';

interface ShortsProgressIndicatorProps {
  currentIndex: number;
  totalCount: number;
  className?: string;
}

const ShortsProgressIndicator: React.FC<ShortsProgressIndicatorProps> = ({
  currentIndex,
  totalCount,
  className = ''
}) => {
  if (totalCount <= 1) return null;

  const progress = ((currentIndex + 1) / totalCount) * 100;
  const displayIndex = currentIndex + 1;

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      {/* Numeric indicator */}
      <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
        {displayIndex} / {totalCount}
      </div>
      
      {/* Progress bar */}
      <div className="w-1 h-20 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="w-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
      
      {/* Dots indicator for smaller counts */}
      {totalCount <= 10 && (
        <div className="flex flex-col space-y-1">
          {Array.from({ length: totalCount }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? 'bg-white'
                  : index < currentIndex
                  ? 'bg-white/60'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortsProgressIndicator;
