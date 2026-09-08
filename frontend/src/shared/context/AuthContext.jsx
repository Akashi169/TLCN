import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      const cachedUser = authService.getCurrentUser();

      if (token && cachedUser) {
        setCurrentUser(cachedUser);
        // Seamless background profile refresh if server is running
        try {
          const freshUser = await authService.getMe();
          if (freshUser) setCurrentUser(freshUser);
        } catch {
          // Token expired or server offline, clear cache if unauthenticated
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (identity, password) => {
    const data = await authService.login(identity, password);
    setCurrentUser(data.user);
    return data.user;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const normalizeRole = (role) => {
    if (!role) return 'CUSTOMER';
    const r = role.toUpperCase();
    if (r === 'MEMBER') return 'CUSTOMER';
    if (r === 'EMPLOYEE') return 'STAFF';
    return r;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: normalizeRole(currentUser?.role),
        loading,
        login,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
