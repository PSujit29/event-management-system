import { useMemo, useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import apiClient from "../lib/apiClient";
import {
  clearStoredUser,
  clearToken,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken as setStoredToken,
} from "../utils/storage.utils";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getToken());
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(() => getStoredUser());

  const logout = useCallback(() => {
    clearToken();
    clearStoredUser();
    setToken(null);
    setUser(null);
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const { data } = await apiClient.get("users/me");
      setStoredUser(data);
      setUser(data);
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      }
      throw error;
    }
  }, [logout]);

  const applyAuth = (data) => {
    const token = data.token || data.accessToken;
    const user = data.user || data;
    if (!token) return data;
    setStoredToken(token);
    setStoredUser(user);
    setToken(token);
    setUser(user);
    return data;
  };

  const login = async (credentials) => {
    const { data } = await apiClient.post("auth/login", credentials);
    applyAuth(data);
    // Fetch fresh user profile from DB after login
    await fetchMe();
    return data;
  };

  // CHANGED: now calls /auth/register instead of /users/add
  const registerUser = async (payload) => {
    const { data } = await apiClient.post("auth/register", payload);
    return data.user;
  };

  // Bootstrap: rehydrate user on page refresh
  useEffect(() => {
    const bootstrap = async () => {
      if (token && !user) {
        try {
          await fetchMe();
        } catch (e) {
          console.error("Bootstrap failed", e);
        }
      }
      setIsInitialized(true);
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      registerUser,
      fetchMe,
      logout,
      isInitialized,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, user, isInitialized, fetchMe, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
