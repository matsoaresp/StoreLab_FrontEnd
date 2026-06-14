import React, { createContext, useContext, useState } from "react";

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
  login: (usuario: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);

  const login = (user: User) => {
    setUsuario(user);
  };

  const logout = () => {
    setUsuario(null);
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
