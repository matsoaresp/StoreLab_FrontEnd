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
      className="cursor-pointer rounded-[24px] bg-[#F28E2B] p-6 text-white shadow-md transition-all hover:brightness-95 flex flex-col gap-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold">{grupo.nome}</h3>
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
            <Users size={16} />
            <span>
              {grupo.participantes}/{grupo.totalVagas}
            </span>
          </div>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onClick?.(grupo.id); }} 
          className="w-full md:w-auto rounded-full bg-[#9E9E9E] px-8 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-gray-500"
        >
          Visualizar
        </button>
      </div>

      <p className="text-sm font-medium text-white/90">{grupo.descricao}</p>

      <div className="mt-2 space-y-2">
        <div className="flex justify-between text-xs font-bold text-white/80 uppercase tracking-wider">
          <span>Vagas ocupadas</span>
          <span>{percentualOcupado.toFixed(0)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-black/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${percentualOcupado}%` }}
          />
        </div>
      </div>
    </div>
  );
}