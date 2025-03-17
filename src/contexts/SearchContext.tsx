
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logoData } from '@/lib/data';

export interface Logo {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  format: string;
  downloads: number;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredLogos: Logo[];
  categories: string[];
  totalResults: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredLogos, setFilteredLogos] = useState<Logo[]>(logoData);
  const [categories, setCategories] = useState<string[]>([]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(logoData.map(logo => logo.category))];
    setCategories(uniqueCategories);
  }, []);

  // Filter logos based on search term and category
  useEffect(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    const filtered = logoData.filter(logo => {
      const matchesSearch = 
        normalizedSearchTerm === '' || 
        logo.name.toLowerCase().includes(normalizedSearchTerm) ||
        logo.category.toLowerCase().includes(normalizedSearchTerm);
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        logo.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredLogos(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        filteredLogos,
        categories,
        totalResults: filteredLogos.length,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
