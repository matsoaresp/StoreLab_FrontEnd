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

// Dados simulados - em produção viriam de uma API
const ALUNOS_SIMULADOS: Aluno[] = [
  {
    id: "aluno-1",
    nome: "João Silva",
    email: "joao@example.com",
    grupoId: "grupo-1",
    grupoNome: "Grupo A",
    matricula: "2024001",
  },
  {
    id: "aluno-2",
    nome: "Maria Santos",
    email: "maria@example.com",
    grupoId: "grupo-1",
    grupoNome: "Grupo A",
    matricula: "2024002",
  },
  {
    id: "aluno-3",
    nome: "Pedro Costa",
    email: "pedro@example.com",
    grupoId: "grupo-2",
    grupoNome: "Grupo B",
    matricula: "2024003",
  },
  {
    id: "aluno-4",
    nome: "Ana Oliveira",
    email: "ana@example.com",
    grupoId: "grupo-1",
    grupoNome: "Grupo A",
    matricula: "2024004",
  },
  {
    id: "aluno-5",
    nome: "Carlos Mendes",
    email: "carlos@example.com",
    grupoId: "grupo-2",
    grupoNome: "Grupo B",
    matricula: "2024005",
  },
];

const GRUPOS_SIMULADOS: Grupo[] = [
  {
    id: "grupo-1",
    nome: "Grupo A - Desenvolvimentistas",
    descricao:
      "Grupo focado em desenvolvimento de software e aplicações web",
    participantes: 4,
    totalVagas: 5,
  },
  {
    id: "grupo-2",
    nome: "Grupo B - Data Science",
    descricao: "Grupo especializado em análise de dados e machine learning",
    participantes: 2,
    totalVagas: 5,
  },
];

const PARTICIPANTES_SIMULADOS: Record<string, Participante[]> = {
  "grupo-1": [
    {
      id: "user-1",
      nome: "João Silva",
      email: "joao@example.com",
      dataAdesao: "15/01/2024",
      papel: "lider",
    },
    {
      id: "user-2",
      nome: "Maria Santos",
      email: "maria@example.com",
      dataAdesao: "16/01/2024",
      papel: "membro",
    },
    {
      id: "user-4",
      nome: "Ana Oliveira",
      email: "ana@example.com",
      dataAdesao: "18/01/2024",
      papel: "membro",
    },
    {
      id: "user-5",
      nome: "Carlos Mendes",
      email: "carlos@example.com",
      dataAdesao: "19/01/2024",
      papel: "membro",
    },
  ],
  "grupo-2": [
    {
      id: "user-3",
      nome: "Pedro Costa",
      email: "pedro@example.com",
      dataAdesao: "17/01/2024",
      papel: "lider",
    },
    {
      id: "user-6",
      nome: "Lucas Ferreira",
      email: "lucas@example.com",
      dataAdesao: "20/01/2024",
      papel: "membro",
    },
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
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-gray-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total de Alunos</p>
              <p className="text-3xl font-bold text-white">{totalAlunos}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
              <Users className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-gray-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total de Grupos</p>
              <p className="text-3xl font-bold text-white">{totalGrupos}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
              <Users className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-gray-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Alunos sem Grupo</p>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/20">
              <Users className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Seção Alunos */}
      <section className="rounded-lg border border-white/10 bg-gray-900 p-6">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() =>
            setExpandedSection(expandedSection === "alunos" ? null : "alunos")
          }
        >
          <h2 className="text-xl font-semibold text-white">
            Alunos ({totalAlunos})
          </h2>
          <ChevronRight
            size={24}
            className={`transition-transform ${
              expandedSection === "alunos" ? "rotate-90" : ""
            }`}
          />
        </div>

        {expandedSection === "alunos" && (
          <div className="mt-6 space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar por nome, email ou matrícula..."
                value={searchAlunos}
                onChange={(e) => setSearchAlunos(e.target.value)}
                className="flex-1 rounded-lg border border-white/10 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 transition-all focus:border-blue-500/50 focus:outline-none"
              />
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                Adicionar
              </Button>
            </div>
            <AlunosList alunos={alunosFiltrados} />
          </div>
        )}
      </section>

      {/* Seção Grupos */}
      <section className="rounded-lg border border-white/10 bg-gray-900 p-6">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() =>
            setExpandedSection(
              expandedSection === "grupos" ? null : "grupos"
            )
          }
        >
          <h2 className="text-xl font-semibold text-white">
            Grupos ({totalGrupos})
          </h2>
          <ChevronRight
            size={24}
            className={`transition-transform ${
              expandedSection === "grupos" ? "rotate-90" : ""
            }`}
          />
        </div>

        {expandedSection === "grupos" && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
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
        <section className="rounded-lg border border-white/10 bg-gray-900 p-6">
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() =>
              setExpandedSection(
                expandedSection === "participantes" ? null : "participantes"
              )
            }
          >
            <h2 className="text-xl font-semibold text-white">
              Participantes - {grupoSelecionado.nome} (
              {participantesGrupo.length})
            </h2>
            <ChevronRight
              size={24}
              className={`transition-transform ${
                expandedSection === "participantes" ? "rotate-90" : ""
              }`}
            />
          </div>

          {expandedSection === "participantes" && (
            <div className="mt-6">
              <ParticipantesList
                participantes={participantesGrupo}
                isProfessor={true}
                onRemover={(participanteId) => {
                  console.log("Removendo participante:", participanteId);
                  // Implementar lógica de remoção
                }}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
