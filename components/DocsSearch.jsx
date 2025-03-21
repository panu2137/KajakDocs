'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const DocsSearch = ({ placeholder = "Szukaj w dokumentacji...", onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  
  // Mock search function - in a real app, replace with actual search functionality
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock results - replace with actual search implementation
    const mockResults = [
      { title: 'Instalacja gry', url: '/docs/installation', excerpt: 'Jak zainstalować grę Kayak Racing na różnych platformach...' },
      { title: 'Sterowanie kajakiem', url: '/docs/controls', excerpt: 'Podstawowe sterowanie kajakiem w grze Kayak Racing...' },
      { title: 'Tworzenie własnych tras', url: '/docs/track-creation', excerpt: 'Przewodnik po tworzeniu własnych tras wyścigowych...' },
    ].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(mockResults);
    setLoading(false);
    
    // Call external onSearch handler if provided
    if (onSearch) {
      onSearch(searchQuery, mockResults);
    }
  };
  
  // Handle search query changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);
  
  // Open dropdown when typing
  useEffect(() => {
    if (query.trim().length > 0) {
      setIsOpen(true);
    }
  }, [query]);
  
  // Handle key navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-full p-2 pl-10 pr-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        
        {query && (
          <button 
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      {/* Results dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2">Szukanie...</p>
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result, index) => (
                <li key={index} className="border-b border-gray-100 last:border-0">
                  <a 
                    href={result.url}
                    className="block p-3 hover:bg-blue-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <h4 className="font-medium text-blue-700">{result.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{result.excerpt}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <div className="p-4 text-center text-gray-500">
              Brak wyników dla "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DocsSearch;