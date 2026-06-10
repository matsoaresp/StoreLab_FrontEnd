import { useState } from "react";

import { ChevronRight } from "lucide-react";
import { GrupoCard, type Grupo } from "../components/GrupoCard";
import type { User } from "../context/AuthContext";
import { ParticipantesList, type Participante } from "../components/ParticipantesList";

interface DashboardAlunoProps {
  usuario: User;
  selectedGrupoId: string | null;
  onSelectGrupo: (grupoId: string | null) => void;
}

// Dados simulados - em produção viriam de uma API
const GRUPOS_SIMULADOS: Grupo[] = [
  {
    id: "grupo-1",
    nome: "Grupo A - Desenvolvimentistas",
    descricao:
      "Grupo focado em desenvolvimento de software e aplicações web",
    participantes: 4,
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
      id: "user-3",
      nome: "Pedro Costa",
      email: "pedro@example.com",
      dataAdesao: "17/01/2024",
      papel: "membro",
    },
    {
      id: "user-4",
      nome: "Ana Oliveira",
      email: "ana@example.com",
      dataAdesao: "18/01/2024",
      papel: "membro",
    },
  ],
};

export function DashboardAluno({
  usuario,
  selectedGrupoId,
  onSelectGrupo,
}: DashboardAlunoProps) {
  const grupo = usuario.grupoId
    ? GRUPOS_SIMULADOS.find((g) => g.id === usuario.grupoId)
    : null;
  const participantes = usuario.grupoId
    ? PARTICIPANTES_SIMULADOS[usuario.grupoId] || []
    : [];

  const [expandedSection, setExpandedSection] = useState<"grupo" | "participantes" | null>("grupo");

  return (
    <div className="space-y-6">
      {/* Seção Meu Grupo */}
      <section className="rounded-lg border border-white/10 bg-gray-900 p-6">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() =>
            setExpandedSection(
              expandedSection === "grupo" ? null : "grupo"
            )
          }
        >
          <h2 className="text-xl font-semibold text-white">Meu Grupo</h2>
          <ChevronRight
            size={24}
            className={`transition-transform ${
              expandedSection === "grupo" ? "rotate-90" : ""
            }`}
          />
        </div>

        {expandedSection === "grupo" && (
          <div className="mt-6">
            {grupo ? (
              <GrupoCard
                grupo={grupo}
                onClick={() => {
                  onSelectGrupo(grupo.id);
                  setExpandedSection("participantes");
                }}
              />
            ) : (
              <div className="rounded-lg border border-white/10 bg-gray-800 p-8 text-center text-gray-400">
                <p>Você ainda não está vinculado a nenhum grupo</p>
                <p className="mt-2 text-sm">
                  Solicite a um professor para ser adicionado
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Seção Participantes */}
      {grupo && (
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
              Participantes do Grupo ({participantes.length})
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
              <ParticipantesList participantes={participantes} />
            </div>
          )}
        </section>
      )}

      {/* Card de Info */}
      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6">
        <h3 className="font-semibold text-blue-300">Dica</h3>
        <p className="mt-2 text-sm text-gray-300">
          Colabore com seus colegas de grupo! Participe de atividades em grupo
          para melhorar seu desempenho.
        </p>
      </div>
    </div>
  );
}
