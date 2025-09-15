
'use client';

import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-4">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-pepsi-blue hover:bg-blue-900 text-pepsi-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
