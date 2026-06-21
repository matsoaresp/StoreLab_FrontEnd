import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/axios';

interface RegisterProps {
  onLoginClick: () => void;
  onRegisterSuccess: () => void;
}

export function Register({ onLoginClick, onRegisterSuccess }: RegisterProps) {
  const [userType, setUserType] = useState<'aluno' | 'professor'>('aluno');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const roleBackend = userType === 'aluno' ? 'STUDENT' : 'ADMIN';

      await api.post('/auth/register', {
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
        role: roleBackend
      });
      
      onRegisterSuccess();

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data || "Erro ao realizar o cadastro. Verifique os dados.");
    } finally {
      setLoading(false);
    }
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
            <option value="aluno">Cadastrar como Aluno</option>
            <option value="professor">Cadastrar como Professor</option>
          </select>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            {userType === 'aluno' ? 'Cadastro Aluno' : 'Cadastro Professor'}
          </h1>
        </div>

        {error && <div className="mb-4 text-red-400 text-sm text-center font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome"
              required
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Senha"
              required
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-bold text-black placeholder-black outline-none border-none"
            />
          </div>

          <div className="text-right text-xs text-white/80 space-y-0.5 pt-1">
            <p>Já possui uma conta?</p>
            <button
              type="button"
              onClick={onLoginClick}
              className="hover:underline text-white font-bold"
            >
              Login
            </button>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white px-5 py-3 font-bold text-black transition hover:bg-gray-200 shadow-md disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}