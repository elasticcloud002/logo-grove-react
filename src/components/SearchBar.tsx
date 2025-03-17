
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/contexts/SearchContext';
import { Badge } from '@/components/ui/badge';
import { popularSearches } from '@/lib/data';
import { cn } from '@/lib/utils';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={searchRef}
      className={cn(
        "relative w-full max-w-3xl transition-all duration-300",
        isFocused ? "scale-105" : "scale-100"
      )}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        
        <Input
          type="search"
          placeholder="Search for logos, brands, categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 py-6 rounded-xl w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-all"
        />
        
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClearSearch} 
              className="h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Search suggestions */}
      {showSuggestions && (
        <div className="absolute mt-2 w-full rounded-xl bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-gray-800 p-4 z-10 animate-fade-in">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Popular searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 transition-all"
                  onClick={() => handleSuggestionClick(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
