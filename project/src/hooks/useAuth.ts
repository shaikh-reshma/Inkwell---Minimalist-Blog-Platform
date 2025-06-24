import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState } from '../types';

const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (displayName: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('inkwell_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      username: email.split('@')[0].toLowerCase(),
      displayName: email.split('@')[0],
      email,
      avatar: `https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100`,
      bio: 'Passionate writer and storyteller',
      location: 'San Francisco, CA',
      website: 'https://example.com',
      joinedAt: new Date(),
      followersCount: 1247,
      followingCount: 89,
      articlesCount: 23,
    };

    localStorage.setItem('inkwell_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const signup = async (displayName: string, username: string, email: string, password: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      username: username.toLowerCase(),
      displayName,
      email,
      avatar: `https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100`,
      bio: 'New to Inkwell',
      joinedAt: new Date(),
      followersCount: 0,
      followingCount: 0,
      articlesCount: 0,
    };

    localStorage.setItem('inkwell_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('inkwell_user');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return { authState, login, signup, logout };
};

export { AuthContext };