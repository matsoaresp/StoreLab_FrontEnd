import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onRegisterClick: () => void;
  onLoginSuccess: () => void;
}

export function Login({ onRegisterClick, onLoginSuccess }: LoginProps) {
  const { login } = useAuth();
  const [userType, setUserType] = useState<'aluno' | 'professor'>('aluno');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    
    setTimeout(() => {
      login({
        id: Math.random().toString(),
        nome: userType === 'aluno' ? 'João Silva' : 'Prof. Maria Santos',
        email: formData.email,
        tipo: userType,
        disciplina: userType === 'professor' ? 'Desenvolvimento Web' : undefined,
        grupoId: userType === 'aluno' ? 'grupo-1' : undefined,
      });
      setLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <div className="bg-[#252525] rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] p-8 w-full max-w-md">
        
        <div className="mb-6">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'aluno' | 'professor')}
            className="w-full px-4 py-2 bg-[#1E1E1E] text-white text-xs rounded-lg outline-none border border-white/10 opacity-70 transition focus:opacity-100"
          >
            <option value="aluno">Acessar como Aluno</option>
            <option value="professor">Acessar como Professor</option>
          </select>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            {userType === 'aluno' ? 'Login Aluno' : 'Login Professor'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Nome"
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-bold text-black placeholder-black outline-none border-none"
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              required
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-bold text-black placeholder-black outline-none border-none"
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Turma"
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-bold text-black placeholder-black outline-none border-none"
            />
          </div>

          <input
            type="hidden"
            name="password"
            value={formData.password || "demo123"}
          />

          <div className="text-right text-xs text-white/80 space-y-0.5 pt-1">
            <p>Não possui conta?</p>
            <button
              type="button"
              onClick={onRegisterClick}
              className="hover:underline text-white font-bold"
            >
              Cadastre-se
            </button>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white px-5 py-3 font-bold text-black transition hover:bg-gray-200 shadow-md disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-xs text-white/40 hover:text-white/70 transition underline">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  );
}