import { useState } from "react";
import { ChevronRight, Plus, Users } from "lucide-react";
import { Button } from "../components/Button";
import type { User } from "../context/AuthContext";
import { AlunosList, type Aluno } from "../components/AlunosList";
import { GrupoCard, type Grupo } from "../components/GrupoCard";
import { ParticipantesList, type Participante } from "../components/ParticipantesList";

interface DashboardProfessorProps {
  usuario: User;
  selectedGrupoId: string | null;
  onSelectGrupo: (grupoId: string | null) => void;
}

const ALUNOS_SIMULADOS: Aluno[] = [
  { id: "aluno-1", nome: "João Silva", email: "joao@example.com", grupoId: "grupo-1", grupoNome: "Grupo A", matricula: "2024001" },
  { id: "aluno-2", nome: "Maria Santos", email: "maria@example.com", grupoId: "grupo-1", grupoNome: "Grupo A", matricula: "2024002" },
  { id: "aluno-3", nome: "Pedro Costa", email: "pedro@example.com", grupoId: "grupo-2", grupoNome: "Grupo B", matricula: "2024003" },
  { id: "aluno-4", nome: "Ana Oliveira", email: "ana@example.com", grupoId: "grupo-1", grupoNome: "Grupo A", matricula: "2024004" },
  { id: "aluno-5", nome: "Carlos Mendes", email: "carlos@example.com", grupoId: "grupo-2", grupoNome: "Grupo B", matricula: "2024005" },
];

const GRUPOS_SIMULADOS: Grupo[] = [
  { id: "grupo-1", nome: "Grupo A - Desenvolvimentistas", descricao: "Grupo focado em desenvolvimento de software e aplicações web", participantes: 4, totalVagas: 5 },
  { id: "grupo-2", nome: "Grupo B - Data Science", descricao: "Grupo especializado em análise de dados e machine learning", participantes: 2, totalVagas: 5 },
];

const PARTICIPANTES_SIMULADOS: Record<string, Participante[]> = {
  "grupo-1": [
    { id: "user-1", nome: "João Silva", email: "joao@example.com", dataAdesao: "15/01/2024", papel: "lider" },
    { id: "user-2", nome: "Maria Santos", email: "maria@example.com", dataAdesao: "16/01/2024", papel: "membro" },
    { id: "user-4", nome: "Ana Oliveira", email: "ana@example.com", dataAdesao: "18/01/2024", papel: "membro" },
    { id: "user-5", nome: "Carlos Mendes", email: "carlos@example.com", dataAdesao: "19/01/2024", papel: "membro" },
  ],
  "grupo-2": [
    { id: "user-3", nome: "Pedro Costa", email: "pedro@example.com", dataAdesao: "17/01/2024", papel: "lider" },
    { id: "user-6", nome: "Lucas Ferreira", email: "lucas@example.com", dataAdesao: "20/01/2024", papel: "membro" },
  ],
};

export function DashboardProfessor({
  usuario,
  selectedGrupoId,
  onSelectGrupo,
}: DashboardProfessorProps) {
  const [expandedSection, setExpandedSection] = useState<
    "alunos" | "grupos" | "participantes" | null
  >("alunos");
  const [searchAlunos, setSearchAlunos] = useState("");

  const alunosFiltrados = ALUNOS_SIMULADOS.filter(
    (aluno) =>
      aluno.nome.toLowerCase().includes(searchAlunos.toLowerCase()) ||
      aluno.email.toLowerCase().includes(searchAlunos.toLowerCase()) ||
      aluno.matricula.includes(searchAlunos)
  );

  const grupoSelecionado = GRUPOS_SIMULADOS.find(
    (g) => g.id === selectedGrupoId
  );
  const participantesGrupo = selectedGrupoId
    ? PARTICIPANTES_SIMULADOS[selectedGrupoId] || []
    : [];

  const totalAlunos = ALUNOS_SIMULADOS.length;
  const totalGrupos = GRUPOS_SIMULADOS.length;

  return (
    <div className="space-y-12 pb-12">
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-[24px] bg-[#252525] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total de Alunos</p>
              <p className="text-4xl font-extrabold text-white mt-1">{totalAlunos}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
              <Users className="text-[#F28E2B]" size={28} />
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-[#252525] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total de Grupos</p>
              <p className="text-4xl font-extrabold text-white mt-1">{totalGrupos}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
              <Users className="text-white" size={28} />
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-[#252525] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Alunos sem Grupo</p>
              <p className="text-4xl font-extrabold text-white mt-1">0</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
              <Users className="text-gray-500" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Seção Alunos */}
      <section>
        <div
          className="flex cursor-pointer items-center justify-between mb-8 group"
          onClick={() => setExpandedSection(expandedSection === "alunos" ? null : "alunos")}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Alunos ({totalAlunos})
          </h1>
          <ChevronRight
            size={32}
            className={`text-gray-400 group-hover:text-white transition-transform duration-300 ${
              expandedSection === "alunos" ? "rotate-90" : ""
            }`}
          />
        </div>

        {expandedSection === "alunos" && (
          <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Buscar por nome, email ou matrícula..."
                value={searchAlunos}
                onChange={(e) => setSearchAlunos(e.target.value)}
                className="flex-1 rounded-full bg-[#1E1E1E] px-6 py-4 text-sm font-semibold text-white placeholder-gray-500 transition-all focus:ring-2 focus:ring-[#F28E2B] focus:outline-none border-none shadow-inner"
              />
              <Button className="flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 shadow-lg">
                <Plus size={20} />
                Adicionar
              </Button>
            </div>
            {/* O componente AlunosList gerará o visual das barras laranjas automaticamente */}
            <AlunosList alunos={alunosFiltrados} />
          </div>
        )}
      </section>

      {/* Seção Grupos */}
      <section>
        <div
          className="flex cursor-pointer items-center justify-between mb-8 group"
          onClick={() => setExpandedSection(expandedSection === "grupos" ? null : "grupos")}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Grupos
          </h1>
          <ChevronRight
            size={32}
            className={`text-gray-400 group-hover:text-white transition-transform duration-300 ${
              expandedSection === "grupos" ? "rotate-90" : ""
            }`}
          />
        </div>

        {expandedSection === "grupos" && (
          <div className="grid gap-6 md:grid-cols-2 animate-in slide-in-from-top-4 duration-300">
            {GRUPOS_SIMULADOS.map((grupo) => (
              <GrupoCard
                key={grupo.id}
                grupo={grupo}
                onClick={() => {
                  onSelectGrupo(grupo.id);
                  setExpandedSection("participantes");
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Seção Participantes por Grupo */}
      {grupoSelecionado && (
        <section>
          <div
            className="flex cursor-pointer items-center justify-between mb-8 group"
            onClick={() => setExpandedSection(expandedSection === "participantes" ? null : "participantes")}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Integrantes <span className="text-xl text-gray-400 font-medium ml-2">({grupoSelecionado.nome})</span>
            </h1>
            <ChevronRight
              size={32}
              className={`text-gray-400 group-hover:text-white transition-transform duration-300 ${
                expandedSection === "participantes" ? "rotate-90" : ""
              }`}
            />
          </div>

          {expandedSection === "participantes" && (
            <div className="animate-in slide-in-from-top-4 duration-300">
              <ParticipantesList
                participantes={participantesGrupo}
                isProfessor={true}
                onRemover={(participanteId) => {
                  console.log("Removendo participante:", participanteId);
                }}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}