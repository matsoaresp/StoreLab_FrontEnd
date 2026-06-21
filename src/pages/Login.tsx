import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onRegisterClick?: () => void;
  onLoginSuccess?: () => void;
}

export function Login({ onRegisterClick, onLoginSuccess }: LoginProps) {
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data || 'E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <div className="bg-[#252525] rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] p-8 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">Login AppStore</h1>
        </div>

        {error && <div className="mb-4 text-red-400 text-sm text-center font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              required
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-bold text-black placeholder-gray-500 outline-none"
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
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-bold text-black placeholder-gray-500 outline-none"
            />
          </div>

          <div className="text-right text-xs text-white/80 pt-1">
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
              className="w-full rounded-xl bg-white px-5 py-3 font-bold text-black transition hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}