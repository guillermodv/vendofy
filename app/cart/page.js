
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function CartPage() {
  const { currentUser } = useAuth();
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! Tu pedido ha sido realizado.');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-pepsi-blue mb-10">
          Tu Carrito de Compras
        </h1>
        {!currentUser ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-xl text-gray-700">Por favor, <Link href="/login" className="text-pepsi-blue hover:underline">inicia sesión</Link> para ver tu carrito.</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-xl text-gray-700">Tu carrito está vacío.</p>
            <Link href="/" className="mt-4 inline-block bg-pepsi-blue hover:bg-blue-900 text-pepsi-white font-bold py-2 px-4 rounded transition duration-300">
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-pepsi-red hover:text-red-700 font-semibold"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <h3 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
              <button 
                onClick={handleCheckout}
                className="mt-4 bg-pepsi-blue hover:bg-blue-900 text-pepsi-white font-bold py-3 px-6 rounded transition duration-300"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
