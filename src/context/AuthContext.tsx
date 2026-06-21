import React, { createContext, useContext, useState } from "react";
import { api } from "../services/axios";

export type UserType = "aluno" | "professor";

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: UserType;
  disciplina?: string;
  grupoId?: string;
}

interface AuthContextType {
  usuario: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);

  const login = async (email: string, senha: string) => {
    const response = await api.post("/auth/login", {
      login: email,
      senha: senha,
    });

    const { token, userId, nome, role, email: userEmail } = response.data;

    localStorage.setItem("@AppStore:token", token);
    
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const tipoUsuario = role === "STUDENT" ? "aluno" : "professor";

    setUsuario({
      id: String(userId),
      nome: nome,
      email: userEmail,
      tipo: tipoUsuario,
    });
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("@AppStore:token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        isAuthenticated: usuario !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}