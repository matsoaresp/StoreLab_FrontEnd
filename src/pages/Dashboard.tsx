import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Container } from "../components/Container";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; 

import { LogOut, LayoutGrid } from "lucide-react";
import { DashboardProfessor } from "./DashboardProfessor";
import { DashboardAluno } from "./DashboardAluno";

export function Dashboard() {
  const { usuario, logout } = useAuth();
  const [selectedGrupoId, setSelectedGrupoId] = useState<string | null>(null);

  if (!usuario) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#202024]">
        <p className="text-gray-400 font-bold tracking-widest uppercase">Redirecionando para login...</p>
      </div>
    );
  }

  const categoriasAluno = ["Meu Grupo", "Participantes"];
  const categoriasProfessor = ["Alunos", "Grupos", "Participantes por Grupo"];

  const categorias =
    usuario.tipo === "aluno" ? categoriasAluno : categoriasProfessor;

  return (
    <div className="flex h-screen bg-[#202024] text-white font-sans overflow-hidden">
      <Sidebar
        titulo={`${usuario.tipo === "aluno" ? "Dashboard Aluno" : "Dashboard Professor"}`}
        categorias={categorias}
      />

      <main className="flex-1 flex flex-col md:ml-64 overflow-hidden">
        <div className="px-6 py-6 md:px-8 md:pt-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
              Bem-vindo(a), <span className="text-white">{usuario.nome}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/store" 
              className="hidden md:flex items-center gap-2 rounded-full bg-[#252525] px-6 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-gray-700"
            >
              <LayoutGrid size={16} />
              StoreLab
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full bg-[#EF5350] px-6 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-red-600"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <Container className="py-0">
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