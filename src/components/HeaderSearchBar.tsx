import { useRef } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../lib/auth.tsx';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, MapPin, Plus } from 'lucide-react';

export function HeaderSearchBar() {
  const { user } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    performSearch
  } = useSearch();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const isSeller = user?.role === 'provider';
  const placeholder = isSeller ? 'Search projects...' : 'Search services...';

  return (
    <div className="flex-1 max-w-2xl mx-8">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder={placeholder}
            className="w-full pl-10"
            value={searchQuery}
            name="search"
            id="search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchInputRef.current?.blur();
                performSearch();
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 150);
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchQuery(suggestion);
                    setShowSuggestions(false);
                    searchInputRef.current?.blur();
                    performSearch(suggestion);
                  }}
                >
                  <Search className="inline h-3 w-3 mr-2 text-gray-400" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative w-36">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Postcode"
            className="w-full pl-10"
            value={location}
            name="location"
            id="location-input"
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                performSearch();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
