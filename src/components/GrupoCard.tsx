import { Users } from "lucide-react";

export interface Grupo {
  id: string;
  nome: string;
  descricao: string;
  participantes: number;
  totalVagas: number;
}

interface GrupoCardProps {
  grupo: Grupo;
  onClick?: (grupoId: string) => void;
}

export function GrupoCard({ grupo, onClick }: GrupoCardProps) {
  const percentualOcupado = (grupo.participantes / grupo.totalVagas) * 100;

  return (
    <div
      onClick={() => onClick?.(grupo.id)}
      className="cursor-pointer rounded-lg border border-white/10 bg-gray-900 p-4 transition-all hover:border-white/30 hover:bg-gray-800"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{grupo.nome}</h3>
        <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
          <Users size={16} />
          <span>
            {grupo.participantes}/{grupo.totalVagas}
          </span>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-400">{grupo.descricao}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Vagas ocupadas</span>
          <span>{percentualOcupado.toFixed(0)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-700">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
            style={{ width: `${percentualOcupado}%` }}
          />
        </div>
      </div>
    </div>
  );
}
