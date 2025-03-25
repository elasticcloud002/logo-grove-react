
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '@/contexts/SearchContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogIn, LogOut, User } from 'lucide-react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const Navbar: React.FC = () => {
  const { setSelectedCategory, categories } = useSearch();
  const { user, isAuthenticated, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

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

  const handleSignIn = () => {
    setShowSignInModal(true);
    setShowSignUpModal(false);
  };

  const handleSignUp = () => {
    setShowSignUpModal(true);
    setShowSignInModal(false);
  };

  const handleSignOut = () => {
    signOut();
  };

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
            {isAuthenticated ? (
              <>
                <Button 
                  size="sm"
                  className="bg-primary/90 hover:bg-primary transition-all"
                >
                  Upload Logo
                </Button>
                <div className="flex items-center gap-2 ml-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </div>
                <Button 
                  size="sm"
                  variant="ghost"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={handleSignIn}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  className="bg-primary/90 hover:bg-primary transition-all"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
        onSwitchToSignUp={() => {
          setShowSignInModal(false);
          setShowSignUpModal(true);
        }}
      />

      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)} 
        onSwitchToSignIn={() => {
          setShowSignUpModal(false);
          setShowSignInModal(true);
        }}
      />
    </header>
  );
};

export default Navbar;
