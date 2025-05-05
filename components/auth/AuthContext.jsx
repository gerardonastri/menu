"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AUTH_TOKEN_KEY,
  USER_DATA_KEY,
  verifyCredentials,
  generateToken,
} from "@/lib/auth";

// Creazione del contesto di autenticazione
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Controlla se l'utente è già autenticato all'avvio
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const userData = localStorage.getItem(USER_DATA_KEY);

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error(
          "Errore durante il controllo dell'autenticazione:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    // Esegui solo lato client
    if (typeof window !== "undefined") {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  // Funzione di login
  const login = (email, password) => {
    const user = verifyCredentials(email, password);

    if (user) {
      const token = generateToken();

      // Salva in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

      // Aggiorna lo stato
      setUser(user);
      return true;
    }

    return false;
  };

  // Funzione di logout
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizzato per utilizzare il contesto di autenticazione
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth deve essere utilizzato all'interno di un AuthProvider"
    );
  }
  return context;
}
