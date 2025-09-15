
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-pepsi-blue text-pepsi-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/sales" className="text-2xl font-bold text-pepsi-white hover:text-gray-200">
          Vendofy
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/admin/products" className="text-lg text-pepsi-white hover:text-gray-200">
            Admin
          </Link>
          {currentUser ? (
            <>
              <span className="text-lg">Hola, {currentUser.name}</span>
              <Link href="/cart" className="relative text-lg text-pepsi-white hover:text-gray-200">
                Carrito
                {totalItemsInCart > 0 && (
                  <span className="absolute -top-2 -right-4 bg-pepsi-red text-pepsi-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
              </Link>
              <button
                onClick={logout}
                className="bg-pepsi-red hover:bg-red-700 text-pepsi-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lg text-pepsi-white hover:text-gray-200">
                Login
              </Link>
              <Link href="/register" className="text-lg text-pepsi-white hover:text-gray-200">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
