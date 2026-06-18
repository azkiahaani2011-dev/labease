import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@labease.com': {
    password: 'admin123',
    user: { id: 'u1', email: 'admin@labease.com', name: 'Super Admin', role: 'super_admin' },
  },
  'lab@labease.com': {
    password: 'lab123',
    user: { id: 'u2', email: 'lab@labease.com', name: 'Lab Manager', role: 'lab_admin', labId: 'lab1' },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('labease_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    const entry = MOCK_USERS[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      return { error: 'Invalid email or password' };
    }
    setUser(entry.user);
    localStorage.setItem('labease_user', JSON.stringify(entry.user));
    return {};
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('labease_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
