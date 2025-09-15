'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err?.message || 'Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-200">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-600">
              Inicia sesión en tu cuenta
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <p
                className="text-red-500 text-center mb-4"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? 'bg-gray-400'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300`}
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
