import { User as UserIcon, Mail, BookOpen } from "lucide-react";

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  grupoId: string;
  grupoNome: string;
  matricula: string;
}

interface AlunosListProps {
  alunos: Aluno[];
  onSelectAluno?: (alunoId: string) => void;
}

export function AlunosList({ alunos, onSelectAluno }: AlunosListProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate" style={{ borderSpacing: "0 16px" }}>
        <thead>
          <tr>
            <th className="px-6 pb-2 text-left text-sm font-semibold text-gray-400">Nome</th>
            <th className="px-6 pb-2 text-left text-sm font-semibold text-gray-400">Email</th>
            <th className="px-6 pb-2 text-left text-sm font-semibold text-gray-400">Matrícula</th>
            <th className="px-6 pb-2 text-left text-sm font-semibold text-gray-400">Grupo</th>
            <th className="px-6 pb-2 text-right text-sm font-semibold text-gray-400">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                Nenhum aluno encontrado
              </td>
            </tr>
          ) : (
            alunos.map((aluno) => (
              <tr
                key={aluno.id}
                className="bg-[#F28E2B] text-white shadow-md transition-all hover:brightness-95"
              >
                <td className="px-6 py-4 rounded-l-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                      <UserIcon size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-lg">{aluno.nome}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Mail size={14} />
                    {aluno.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white/90">
                  {aluno.matricula}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-white/80" />
                    <span className="text-sm font-medium">
                      {aluno.grupoNome}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 rounded-r-2xl text-right">
                  <button
                    onClick={() => onSelectAluno?.(aluno.id)}
                    className="rounded-full bg-[#9E9E9E] px-6 py-2 text-sm font-bold text-white transition-all hover:bg-gray-500 shadow-sm"
                  >
                    Visualizar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}