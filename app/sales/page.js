'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-pepsi-blue mb-6">
          Catálogo de Productos
        </h1>
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pepsi-blue"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
