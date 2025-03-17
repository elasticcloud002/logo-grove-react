
import React, { useEffect, useState } from 'react';
import LogoCard from './LogoCard';
import { useSearch } from '@/contexts/SearchContext';
import { Button } from '@/components/ui/button';

const LogoGrid: React.FC = () => {
  const { filteredLogos, totalResults } = useSearch();
  const [visibleLogos, setVisibleLogos] = useState<number>(12);
  const [animateItems, setAnimateItems] = useState<boolean>(true);

  // Reset animation state when filtered logos change
  useEffect(() => {
    setAnimateItems(false);
    setTimeout(() => setAnimateItems(true), 100);
    setVisibleLogos(12); // Reset to initial visible count
  }, [filteredLogos]);

  const loadMore = () => {
    setVisibleLogos((prev) => Math.min(prev + 12, filteredLogos.length));
  };

  return (
    <div>
      {filteredLogos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredLogos.slice(0, visibleLogos).map((logo, index) => (
              <div 
                key={logo.id}
                className={animateItems ? "animate-zoom-in" : ""}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <LogoCard logo={logo} />
              </div>
            ))}
          </div>
          
          {visibleLogos < filteredLogos.length && (
            <div className="mt-10 text-center">
              <Button 
                onClick={loadMore}
                className="px-6 py-2 rounded-full bg-primary/90 hover:bg-primary transition-all"
              >
                Load More Logos
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-20 text-center">
          <h3 className="text-xl font-medium mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoGrid;
