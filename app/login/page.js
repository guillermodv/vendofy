'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './page.css';

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
      router.push('/balance');
    } catch (err) {
      setError(err?.message || 'Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card">
          <div className="header">
            <h2 className="title">
              Inicia sesión
            </h2>
            <p className="subtitle">y empieza a comprar</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <p
                className="error-message"
                role="alert"
              >
                {error}
              </p>
            )}
            <div className="input-group">
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-email"
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
                  className="input input-password"
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
                className={`submit-btn ${
                  loading
                    ? 'submit-btn-disabled'
                    : 'submit-btn-enabled'
                }`}
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
          <div className="register-link-container">
            <Link href="/register" className="register-link">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}