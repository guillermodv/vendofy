
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`cart_${currentUser.id}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } else {
      // Limpiar el carrito si no hay usuario
      setCartItems([]);
    }
  }, [currentUser]);

  useEffect(() => {
    // Guardar el carrito en localStorage cada vez que cambie
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
