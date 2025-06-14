
import React from 'react';
import SearchIcon from './icons/SearchIcon'; 

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isVisible: boolean;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSuggestionClick, isVisible }) => {
  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <ul 
        className="absolute top-full left-0 right-0 mt-0.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-b-xl shadow-2xl z-[101] py-1 overflow-y-auto max-h-80 animate-fade-in-fast"
        role="listbox"
        aria-label="Search suggestions"
    >
      {suggestions.map((suggestion, index) => (
        <li key={index} role="option" aria-selected="false">
          <button
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full text-left px-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 transition-colors flex items-center"
          >
            <SearchIcon className="w-4 h-4 mr-3 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
            <span>{suggestion}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;