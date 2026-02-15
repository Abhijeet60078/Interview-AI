import { createContext, useContext, useMemo, useState } from "react";
import { authAPI } from "@/api/services";

const AuthContext = createContext(null);

const storageKey = "interview_ai_user";
const tokenKey = "interview_ai_token";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const setStoredUser = (user) => {
  if (!user) {
    localStorage.removeItem(storageKey);
    return;
  }
  localStorage.setItem(storageKey, JSON.stringify(user));
};

const getStoredToken = () => {
  return localStorage.getItem(tokenKey);
};

const setStoredToken = (token) => {
  if (!token) {
    localStorage.removeItem(tokenKey);
    return;
  }
  localStorage.setItem(tokenKey, token);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      // If it's a local login (from demo), create local user
      if (payload?.isDemo) {
        const nextUser = {
          id: payload?.id ?? "local",
          email: payload?.email ?? "",
          name: payload?.name ?? "User",
          avatar: payload?.avatar ?? null,
          leetcode: payload?.leetcode ?? "",
          codeforces: payload?.codeforces ?? "",
          github: payload?.github ?? "",
        };
        setUser(nextUser);
        setStoredUser(nextUser);
        return nextUser;
      }

      // Call backend API for real login
      const response = await authAPI.login({
        email: payload?.email,
        password: payload?.password,
      });

      const { token, user: userData } = response.data;
      setStoredToken(token);
      setUser(userData);
      setStoredUser(userData);
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup({
        email: payload?.email,
        password: payload?.password,
        name: payload?.name,
      });

      const { token, user: userData } = response.data;
      setStoredToken(token);
      setUser(userData);
      setStoredUser(userData);
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setStoredUser(null);
      setStoredToken(null);
      setLoading(false);
    }
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const nextUser = { ...user, ...updates };
    setUser(nextUser);
    setStoredUser(nextUser);
  };

  const value = useMemo(
    () => ({ user, login, logout, updateProfile, signup, loading, error }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
