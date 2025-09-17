'use client';

import { useState } from 'react';
import CartPage from '../cart/page';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext'; // 🔑 mismo hook que usa ProductCard
import { products } from '../data/products';
import './page.css';

const subtitleMessage = "Sistema de ventas simple y eficiente";

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart(); // ✅ obtenemos la función del contexto

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sales-page">
      <Navbar />
      <main className="container">
        <div className="hero">
          <p className="hero-subtitle">{subtitleMessage}</p>
        </div>

<div className="search-container" role="search">
  <div className="search-input-container">
    <label htmlFor="product-search" className="sr-only">
      Buscar productos
    </label>
    <span className="search-icon" aria-hidden="true">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </span>
    <input
      id="product-search"
      type="text"
      placeholder="Buscar productos..."
      className="search-input"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    {searchTerm && (
      <button
        type="button"
        className="clear-search-btn"
        onClick={() => setSearchTerm('')}
        aria-label="Limpiar búsqueda"
      >
        ✖
      </button>
    )}
  </div>
</div>


        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category || "N/A"}</td>
                    <td>
                      {new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(product.price)}
                    </td>
                    <td>{product.stock ?? "—"}</td>
                    <td>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        Agregar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🛒 Carrito */}
        <CartPage showHeader={false} />
      </main>
    </div>
  );
}
