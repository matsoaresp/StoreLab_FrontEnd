import { User as UserIcon } from "lucide-react";

export interface Participante {
  id: string;
  nome: string;
  email: string;
  dataAdesao: string;
  papel?: "lider" | "membro";
}

interface ParticipantesListProps {
  participantes: Participante[];
  isProfessor?: boolean;
  onRemover?: (participanteId: string) => void;
}

export function ParticipantesList({
  participantes,
  isProfessor = false,
  onRemover,
}: ParticipantesListProps) {
  return (
    <div className="space-y-4">
      {participantes.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#252525] p-8 text-center text-gray-400">
          Nenhum participante adicionado
        </div>
      ) : (
        participantes.map((participante) => (
          <div
            key={participante.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[32px] bg-[#F28E2B] px-6 py-4 shadow-md transition-all hover:brightness-95"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <UserIcon size={24} className="text-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-bold text-white">{participante.nome}</p>
                  {participante.papel === "lider" && (
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                      Líder
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-white/80">{participante.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <span className="hidden text-sm font-medium text-white/70 lg:block">
                Aderiu em {participante.dataAdesao}
              </span>
              {isProfessor && onRemover && (
                <button
                  onClick={() => onRemover(participante.id)}
                  className="rounded-full bg-[#EF5350] px-6 py-2 font-bold text-white shadow-sm transition-all hover:bg-red-600"
                  title="Remover participante"
                >
                  Excluir
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}