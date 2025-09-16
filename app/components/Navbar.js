'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="containerNavbar">
        <Link href="/sales" className="brand">
          Vendofy
        </Link>
        <div className="nav-links">
          <Link href="/admin/products" className="nav-link">
            Admin
          </Link>
          <Link href="/balance" className="nav-link">
            Balance
          </Link>
          {currentUser ? (
            <>
              <span className="user-info">Hola, {currentUser.name}</span>
              <Link href="/cart" className="cart-link">
                <svg className="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                {totalItemsInCart > 0 && (
                  <span className="cart-badge">
                    {totalItemsInCart}
                  </span>
                )}
              </Link>
              <button
                onClick={logout}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="login-link">
                Login
              </Link>
              <Link href="/register" className="register-btn">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}