import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Container } from "../components/Container";
import { useAuth } from "../context/AuthContext";

import { LogOut } from "lucide-react";
import { DashboardProfessor } from "./DashboardProfessor";
import { DashboardAluno } from "./DashboardAluno";

export function Dashboard() {
  const { usuario, logout } = useAuth();
  const [selectedGrupoId, setSelectedGrupoId] = useState<string | null>(null);

  if (!usuario) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-400">Redirecionando para login...</p>
      </div>
    );
  }

  const categoriasAluno = ["Meu Grupo", "Participantes"];
  const categoriasProfessor = ["Alunos", "Grupos", "Participantes por Grupo"];

  const categorias =
    usuario.tipo === "aluno" ? categoriasAluno : categoriasProfessor;

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar
        titulo={`${usuario.tipo === "aluno" ? "Aluno" : "Professor"}`}
        categorias={categorias}
      />

      <main className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <div className="border-b border-white/10 bg-gray-900 px-6 py-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-400">
                Bem-vindo, {usuario.nome}
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-red-400 transition-all hover:bg-red-500/30"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Container className="py-6">
            {usuario.tipo === "aluno" ? (
              <DashboardAluno
                usuario={usuario}
                selectedGrupoId={selectedGrupoId}
                onSelectGrupo={setSelectedGrupoId}
              />
            ) : (
              <DashboardProfessor
                usuario={usuario}
                selectedGrupoId={selectedGrupoId}
                onSelectGrupo={setSelectedGrupoId}
              />
            )}
          </Container>
        </div>
      </main>
    </div>
  );
}
