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


const GRUPOS_SIMULADOS: Grupo[] = [
  { id: "grupo-1", nome: "Grupo A - Desenvolvimentistas", descricao: "Grupo focado em desenvolvimento de software e aplicações web", participantes: 4, totalVagas: 5 },
];

const PARTICIPANTES_SIMULADOS: Record<string, Participante[]> = {
  "grupo-1": [
    { id: "user-1", nome: "João Silva", email: "joao@example.com", dataAdesao: "15/01/2024", papel: "lider" },
    { id: "user-2", nome: "Maria Santos", email: "maria@example.com", dataAdesao: "16/01/2024", papel: "membro" },
    { id: "user-3", nome: "Pedro Costa", email: "pedro@example.com", dataAdesao: "17/01/2024", papel: "membro" },
    { id: "user-4", nome: "Ana Oliveira", email: "ana@example.com", dataAdesao: "18/01/2024", papel: "membro" },
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
    <div className="space-y-12 pb-12">
      {/* Seção Meu Grupo */}
      <section>
        <div
          className="flex cursor-pointer items-center justify-between mb-8 group"
          onClick={() => setExpandedSection(expandedSection === "grupo" ? null : "grupo")}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Meu Grupo
          </h1>
          <ChevronRight
            size={32}
            className={`text-gray-400 group-hover:text-white transition-transform duration-300 ${
              expandedSection === "grupo" ? "rotate-90" : ""
            }`}
          />
        </div>

        {expandedSection === "grupo" && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            {grupo ? (
              <div className="max-w-3xl">
                <GrupoCard
                  grupo={grupo}
                  onClick={() => {
                    onSelectGrupo(grupo.id);
                    setExpandedSection("participantes");
                  }}
                />
              </div>
            ) : (
              <div className="rounded-[32px] bg-[#252525] p-12 text-center text-gray-400 shadow-xl max-w-3xl">
                <p className="text-xl font-bold text-white mb-2">Você ainda não está vinculado a nenhum grupo</p>
                <p className="text-sm font-medium">
                  Solicite a um professor para ser adicionado
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Seção Participantes */}
      {grupo && (
        <section>
          <div
            className="flex cursor-pointer items-center justify-between mb-8 group"
            onClick={() => setExpandedSection(expandedSection === "participantes" ? null : "participantes")}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Integrantes
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
              <ParticipantesList participantes={participantes} />
            </div>
          )}
        </section>
      )}

      {/* Card de Info */}
      <div className="rounded-[24px] bg-[#252525] p-8 shadow-lg max-w-3xl border-l-4 border-[#F28E2B]">
        <h3 className="font-extrabold text-white text-lg">Dica</h3>
        <p className="mt-2 text-sm font-medium text-gray-300 leading-relaxed">
          Colabore com seus colegas de grupo! Participe de atividades em grupo
          para melhorar seu desempenho.
        </p>
      </div>
    </div>
  );
}