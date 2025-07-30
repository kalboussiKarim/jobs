"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import acc from "../backend/users";

interface User {
  $id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkSession = async () => {
    setLoading(true);
    try {
      const session = await acc.get();
      setUser(session);
    } catch (error: any) {
      if (error.code !== 401) {
        console.error("Error checking session:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Temporarily suppress console errors
      const originalError = console.error;
      console.error = () => {};

      await acc.login(email, password);

      // Restore console.error
      console.error = originalError;

      const session = await acc.get();
      setUser(session);
      router.push("/admin/applications");
      return { success: true };
    } catch (error: any) {
      // Restore console.error in case of error
      console.error = console.error || (() => {});

      // Handle different types of errors with user-friendly messages
      let message = "Login failed. Please try again.";

      if (error.message?.includes("Invalid `email`")) {
        message = "Please enter a valid email address.";
      } else if (error.message?.includes("Invalid `password`")) {
        message = "Password must be between 8 and 256 characters long.";
      } else if (error.message?.includes("Invalid credentials")) {
        message = "Invalid email or password. Please try again.";
      } else if (error.message?.includes("User (role: guests) missing scope")) {
        message = "Invalid email or password. Please try again.";
      }

      return { success: false, message };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await acc.logout();
      setUser(null);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
