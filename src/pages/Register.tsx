import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface RegisterProps {
  onLoginClick: () => void;
  onRegisterSuccess: () => void;
}

export function Register({ onLoginClick, onRegisterSuccess }: RegisterProps) {
  const { login } = useAuth();
  const [userType, setUserType] = useState<'aluno' | 'professor'>('aluno');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    matricula: '',
    turma: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular registro
    setTimeout(() => {
      login({
        id: Math.random().toString(),
        nome: formData.name,
        email: formData.email,
        tipo: userType,
        disciplina: userType === 'professor' ? formData.turma : undefined,
        grupoId: userType === 'aluno' ? 'grupo-1' : undefined,
      });
      setLoading(false);
      onRegisterSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black flex items-center justify-center p-4">
      <div className="bg-black border border-gray-700 rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Cadastro</h1>
          <button
            onClick={onLoginClick}
            className="text-sm text-blue-400 hover:text-blue-300 font-semibold underline"
          >
            Já possui conta?
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tipo de Usuário
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'aluno' | 'professor')}
              className="w-full px-4 py-2 border border-white bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nome Completo
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu.email@exemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Senha
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {userType === 'aluno' && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Matrícula
              </label>
              <Input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleInputChange}
                placeholder="Digite sua matrícula"
                required
              />
            </div>
          )}

          {userType === 'professor' && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Disciplina
              </label>
              <Input
                type="text"
                name="turma"
                value={formData.turma}
                onChange={handleInputChange}
                placeholder="Digite a disciplina"
                required
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
