import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@hr360.com',
    firstName: 'John',
    lastName: 'Admin',
    role: 'admin',
    department: 'Administration',
    position: 'System Administrator',
    joinDate: '2023-01-15',
    isActive: true,
  },
  {
    id: '2',
    email: 'hr@hr360.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    joinDate: '2023-02-01',
    isActive: true,
  },
  {
    id: '3',
    email: 'employee@hr360.com',
    firstName: 'Mike',
    lastName: 'Smith',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    joinDate: '2023-03-10',
    salary: 75000,
    isActive: true,
  },
  {
    id: '4',
    email: 'candidate@hr360.com',
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'candidate',
    position: 'Frontend Developer',
    isActive: true,
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('hr360_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in production, this would call your API
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('hr360_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hr360_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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