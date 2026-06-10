import { User as UserIcon, Trash2 } from "lucide-react";

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
    <div className="space-y-2">
      {participantes.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-gray-900 p-8 text-center text-gray-400">
          Nenhum participante adicionado
        </div>
      ) : (
        participantes.map((participante) => (
          <div
            key={participante.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-900 p-4 transition-all hover:border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <UserIcon size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{participante.nome}</p>
                  {participante.papel === "lider" && (
                    <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-300">
                      Líder
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{participante.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                Aderiu em {participante.dataAdesao}
              </span>
              {isProfessor && onRemover && (
                <button
                  onClick={() => onRemover(participante.id)}
                  className="rounded p-2 transition-all hover:bg-red-500/20 text-red-400"
                  title="Remover participante"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
