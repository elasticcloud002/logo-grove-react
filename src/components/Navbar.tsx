
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '@/contexts/SearchContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { setSelectedCategory, categories } = useSearch();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        scrolled ? "glass-morphism shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="font-bold text-2xl tracking-tight transition-all hover:opacity-80"
            >
              LogoGrove
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {categories.slice(0, 5).map((category) => (
                <Button 
                  key={category}
                  variant="ghost" 
                  className="text-sm font-medium"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              size="sm"
              className="bg-primary/90 hover:bg-primary transition-all"
            >
              Upload Logo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
