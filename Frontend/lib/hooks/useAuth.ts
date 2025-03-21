'use client';

import { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (err) {
      setError('Authentication check failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.login(username, password);
      if (response.token) {
        apiService.setToken(response.token);
        setUser(response.user);
        return true;
      }
      return false;
    } catch (err) {
      setError('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.register(userData);
      if (response.token) {
        apiService.setToken(response.token);
        setUser(response.user);
        return true;
      }
      return false;
    } catch (err) {
      setError('Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await apiService.logout();
      setUser(null);
      return true;
    } catch (err) {
      setError('Logout failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
}
