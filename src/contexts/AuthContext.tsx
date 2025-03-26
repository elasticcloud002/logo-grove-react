import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  user: {
    id: string;
    email: string;
    name: string;
  },
  authToken: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // In a real app, this would call an API
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      // const user = { id: '1', email, name: email.split('@')[0] };
      const user = await axios.post<User>('http://localhost:3001/api/auth/sign-in', {
        email, password
      });
      setUser(user.data as User);
      localStorage.setItem('userId', JSON.stringify(user.data.user.id));
      localStorage.setItem('userEmail', JSON.stringify(user.data.user.email));
      localStorage.setItem('userName', JSON.stringify(user.data.user.name));
      localStorage.setItem('authToken', JSON.stringify(user.data.authToken));
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    // In a real app, this would call an API
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const user = await axios.post<User>('http://localhost:3001/api/auth/sign-up', {
        email, password, name,
      });
      setUser(user.data as User);
      localStorage.setItem('userId', JSON.stringify(user.data.user.id));
      localStorage.setItem('userEmail', JSON.stringify(user.data.user.email));
      localStorage.setItem('userName', JSON.stringify(user.data.user.name));
      localStorage.setItem('authToken', JSON.stringify(user.data.authToken));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
