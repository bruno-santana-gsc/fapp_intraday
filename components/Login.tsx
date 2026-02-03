
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciais solicitadas: admin / v61RGoSDU8Rq
    if (username === 'admin' && password === 'v61RGoSDU8Rq') {
      onLogin(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bgGray flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1 select-none mb-2">
            <span className="text-3xl font-bold text-brand-darkGray tracking-tight">Farmácias</span>
            <span className="text-3xl font-light text-brand-turquoise opacity-60 tracking-tight">app</span>
          </div>
          <p className="text-brand-teal text-xs font-bold uppercase tracking-widest">Painel de Controle Intradiário</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-2 px-1">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/20 outline-none transition-all text-brand-darkGray font-medium"
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-2 px-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/20 outline-none transition-all text-brand-darkGray font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-brand-salmon text-[11px] font-bold text-center uppercase tracking-tighter">
              Credenciais inválidas. Tente novamente.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-brand-turquoise hover:bg-brand-turquoise/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-turquoise/20 transform active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
          >
            Acessar Dashboard
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-[9px] text-brand-teal font-bold uppercase tracking-widest opacity-40">
            Acesso restrito a colaboradores autorizados
          </p>
        </div>
      </div>
    </div>
  );
};
