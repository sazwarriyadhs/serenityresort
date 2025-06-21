'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
  role: 'Administrator' | 'Manager' | 'Staff';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('serenity-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('serenity-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    (credentials: { email: string }) => {
      // In a real app, you'd validate credentials against a server.
      // Here, we'll just create a mock user.
      const mockUser: User = {
        name: credentials.email.split('@')[0].replace(/^\w/, (c) => c.toUpperCase()),
        email: credentials.email,
        role: 'Administrator', // Default role for demo
      };
      localStorage.setItem('serenity-user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.push('/dashboard');
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('serenity-user');
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
