
'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(name, email, password);
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md border border-gray-200">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-pepsi-blue">
              Crea tu cuenta
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-pepsi-red text-center mb-4">{error}</p>}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pepsi-blue focus:border-pepsi-blue focus:z-10 sm:text-sm"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pepsi-blue focus:border-pepsi-blue focus:z-10 sm:text-sm"
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
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pepsi-blue focus:border-pepsi-blue focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pepsi-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pepsi-blue"
              >
                Registrarse
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            <Link href="/login" className="font-medium text-pepsi-blue hover:text-blue-700">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
