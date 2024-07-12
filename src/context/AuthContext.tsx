import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../services/api';

type UserData = {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  isLoading: boolean;
  loggedInUser: UserData | null;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);                   
  const navigate = useNavigate();
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    console.log('checkAuth token:', token);
    if (token) {
      try {
       const userData = await fetchUserDetails(token);
       if(userData){
        setLoggedInUser({ firstName: userData.data.firstName, lastName:userData.data.lastName , image: userData.data.image, email: userData.data.email });
        setIsAuthenticated(true);
       }
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (token: string) => {
      console.log('login token:', token);
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,loggedInUser,isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
