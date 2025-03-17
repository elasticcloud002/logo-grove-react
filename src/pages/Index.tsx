
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import LogoGrid from '@/components/LogoGrid';
import Footer from '@/components/Footer';
import { useSearch } from '@/contexts/SearchContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { selectedCategory, setSelectedCategory, categories, totalResults } = useSearch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading state for smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-gray-900/20">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 md:px-10">
          <div className="container mx-auto max-w-7xl">
            <div
              className={`transition-all duration-700 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge variant="outline" className="mb-4 px-3 py-1">
                  Over 10,000 high-quality logos
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                  Find the perfect logo for your next project
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Browse, download, and use premium logo assets from top brands and designers.
                </p>
                
                <div className="mb-12">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter and Logos Section */}
        <section className="px-6 md:px-10">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-1">
                <h2 className="text-2xl font-semibold">Logos</h2>
                {totalResults > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {totalResults} results
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full whitespace-nowrap ${
                      selectedCategory === category ? "bg-primary/90" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Logo Grid */}
            <LogoGrid />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
