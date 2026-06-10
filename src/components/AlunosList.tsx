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
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 bg-gray-900">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Nome
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Matrícula
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Grupo
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Ações
            </th>
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
                className="border-b border-white/10 transition-all hover:bg-gray-900/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                      <UserIcon size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-white">{aluno.nome}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail size={14} />
                    {aluno.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {aluno.matricula}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-blue-400" />
                    <span className="text-sm text-gray-300">
                      {aluno.grupoNome}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelectAluno?.(aluno.id)}
                    className="text-sm font-medium text-blue-400 transition-all hover:text-blue-300"
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
