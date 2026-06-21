import { useState, useEffect } from "react";
import { Plus, Users, X } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import type { User } from "../context/AuthContext";
import { AlunosList, type Aluno } from "../components/AlunosList";
import { api } from "../services/axios";

interface DashboardProfessorProps {
  usuario: User;
}

export function DashboardProfessor({ usuario }: DashboardProfessorProps) {
  const [searchAlunos, setSearchAlunos] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState<Aluno | null>(null);
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
  const [salvando, setSalvando] = useState(false);

  const [isVisualizarModalOpen, setIsVisualizarModalOpen] = useState(false);
  const [detalhesAluno, setDetalhesAluno] = useState<any>(null);
  const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);

  async function buscarAlunos() {
    setCarregando(true);
    try {
      const resposta = await api.get('/usuario/alunos');
      const alunosFormatados = resposta.data.map((aluno: any) => ({
        id: aluno.id.toString(),
        nome: aluno.nome,
        email: aluno.email,
        matricula: "N/A", 
        grupoId: null,
        grupoNome: "Sem Grupo"
      }));
      setAlunos(alunosFormatados);
    } catch (erro) {
      console.error("Erro ao buscar alunos:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarAlunos();
  }, []);

  // DELETE: Excluir Aluno
  const handleDelete = async (id: string) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.");
    if (!confirmacao) return;

    try {
      await api.delete(`/usuario/${id}`);
      setAlunos(alunos.filter(aluno => aluno.id !== id));
      alert("Aluno excluído com sucesso!");
    } catch (erro: any) {
      alert(erro.response?.data || "Erro ao excluir aluno.");
    }
  };

  // PUT: Abrir o modal com os dados do aluno
  const handleEditClick = (aluno: Aluno) => {
    setAlunoEditando(aluno);
    setFormData({ nome: aluno.nome, email: aluno.email, senha: "" });
    setIsModalOpen(true);
  };

  // PUT: Salvar as alterações
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alunoEditando) return;

    setSalvando(true);
    try {
      await api.put(`/usuario/${alunoEditando.id}`, {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha || null
      });
      
      setIsModalOpen(false);
      buscarAlunos();
      alert("Aluno atualizado com sucesso!");
    } catch (erro: any) {
      alert(erro.response?.data || "Erro ao atualizar aluno.");
    } finally {
      setSalvando(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GET: Buscar detalhes de um aluno específico
  const handleVisualizar = async (id: string) => {
    setCarregandoDetalhes(true);
    setIsVisualizarModalOpen(true); 
    
    try {
      const resposta = await api.get(`/usuario/${id}`);
      setDetalhesAluno(resposta.data);
    } catch (erro: any) {
      alert(erro.response?.data || "Erro ao buscar detalhes do aluno.");
      setIsVisualizarModalOpen(false);
    } finally {
      setCarregandoDetalhes(false);
    }
  };

  const alunosFiltrados = alunos.filter(
    (aluno) =>
      aluno.nome?.toLowerCase().includes(searchAlunos.toLowerCase()) ||
      aluno.email?.toLowerCase().includes(searchAlunos.toLowerCase())
  );

  const totalAlunos = alunos.length;

  if (carregando && alunos.length === 0) {
    return <div className="text-white text-center py-10">Carregando dados...</div>;
  }

  return (
    <div className="space-y-12 pb-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
      </div>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Alunos ({totalAlunos})
          </h1>
        </div>

        <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchAlunos}
              onChange={(e) => setSearchAlunos(e.target.value)}
              className="flex-1 rounded-full bg-[#1E1E1E] px-6 py-4 text-sm font-semibold text-white placeholder-gray-500 transition-all focus:ring-2 focus:ring-[#F28E2B] focus:outline-none border-none shadow-inner"
            />
            <Button className="flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 shadow-lg">
              <Plus size={20} />
              Adicionar
            </Button>
          </div>
          <AlunosList 
            alunos={alunosFiltrados} 
            onDelete={handleDelete}
            onEdit={handleEditClick}
            onSelectAluno={handleVisualizar}
          />
        </div>
      </section>

      {/* MODAL DE EDIÇÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#252525] rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Editar Aluno</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 pl-2">Nome Completo</label>
                <Input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl bg-[#1E1E1E] px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-[#F28E2B]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 pl-2">E-mail</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl bg-[#1E1E1E] px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-[#F28E2B]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 pl-2">Nova Senha (opcional)</label>
                <Input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Deixe em branco para manter a atual"
                  className="w-full rounded-xl bg-[#1E1E1E] px-4 py-3 text-white placeholder-gray-600 border-none outline-none focus:ring-2 focus:ring-[#F28E2B]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl bg-gray-600 px-5 py-3 font-bold text-white transition hover:bg-gray-500"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={salvando}
                  className="flex-1 rounded-xl bg-[#F28E2B] px-5 py-3 font-bold text-white transition hover:bg-[#d97b22] disabled:opacity-50"
                >
                  {salvando ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE VISUALIZAÇÃO */}
      {isVisualizarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#252525] rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Perfil do Aluno</h2>
              <button 
                onClick={() => {
                  setIsVisualizarModalOpen(false);
                  setDetalhesAluno(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {carregandoDetalhes ? (
              <div className="text-center py-8 text-gray-400 font-medium">Carregando informações...</div>
            ) : detalhesAluno ? (
              <div className="space-y-4">
                <div className="bg-[#1E1E1E] p-4 rounded-xl">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nome Completo</p>
                  <p className="text-white font-medium text-lg">{detalhesAluno.nome}</p>
                </div>
                
                <div className="bg-[#1E1E1E] p-4 rounded-xl">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">E-mail</p>
                  <p className="text-white font-medium">{detalhesAluno.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1E1E1E] p-4 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                    <p className={`font-bold ${detalhesAluno.ativo ? 'text-green-400' : 'text-red-400'}`}>
                      {detalhesAluno.ativo ? 'Ativo' : 'Inativo'}
                    </p>
                  </div>
                  <div className="bg-[#1E1E1E] p-4 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tipo</p>
                    <p className="text-white font-medium capitalize">{detalhesAluno.role?.toLowerCase()}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setIsVisualizarModalOpen(false);
                      setDetalhesAluno(null);
                    }}
                    className="w-full rounded-xl bg-gray-600 px-5 py-3 font-bold text-white transition hover:bg-gray-500"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-red-400 font-medium">Não foi possível carregar os dados.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}