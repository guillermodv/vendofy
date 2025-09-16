'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './page.css';

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
    <div className="register-page">
      <div className="container">
        <div className="register-card">
          <div className="header">
            <h2 className="title">
              Crea tu cuenta
            </h2>
            <p className="subtitle">y únete a la comunidad</p>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input input-name"
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
                  className="input"
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
                className="submit-btn"
              >
                Registrarse
              </button>
            </div>
          </form>
          <div className="login-link-container">
            <Link href="/login" className="login-link">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}