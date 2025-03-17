
import React, { useState } from 'react';
import { Download, Heart, Share2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from '@/contexts/SearchContext';

interface LogoCardProps {
  logo: Logo;
}

const LogoCard: React.FC<LogoCardProps> = ({ logo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className={cn(
        "logo-card group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer",
        isHovered ? "shadow-md scale-[1.02]" : "shadow-sm hover:shadow-md",
        !isLoaded && "animate-pulse"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square p-8 flex items-center justify-center">
        <img 
          src={logo.imageUrl} 
          alt={`${logo.name} logo`}
          className={cn(
            "max-h-full max-w-full object-contain transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Overlay with actions */}
      <div 
        className={cn(
          "logo-actions absolute inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
      >
        <div className="flex gap-2 mb-4">
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={cn(
                "h-4 w-4", 
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-700 dark:text-gray-300"
              )} 
            />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900"
          >
            <Download className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900"
          >
            <Share2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
        <Button 
          variant="default" 
          size="sm"
          className="rounded-full px-4 bg-white/90 dark:bg-gray-900/90 text-black dark:text-white hover:bg-white dark:hover:bg-gray-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Collection
        </Button>
      </div>

      {/* Footer with logo info */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <h3 className="font-medium text-sm mb-1">{logo.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{logo.category}</span>
          <div className="flex items-center">
            <Download className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{logo.downloads.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCard;
