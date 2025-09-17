'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './page.css';

export default function CartPage({showHeader = true}) {
  const { currentUser } = useAuth();
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! Tu pedido ha sido realizado.');
    clearCart();
  };

  return (
    <div className="cart-page">
      {showHeader && <Navbar />}
      <div className="cart-container">
        {showHeader && <><h1 className="title">
          Tu Carrito de Compras
        </h1></>}
        {!currentUser ? (
          <div className="login-prompt-card">
            <p className="login-prompt-text">Por favor, <Link href="/login" className="login-link">inicia sesión</Link> para ver tu carrito.</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart-card">
            <p className="empty-cart-text">Tu carrito está vacío.</p>
            <Link href="/" className="back-to-shop-btn">
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-list-container">
              <ul role="list" className="cart-list">
                {cartItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="item-image-container">
                      <img src={item.image} alt={item.name} className="item-image" />
                    </div>
                    <div className="item-details">
                      <div>
                        <div className="item-info">
                          <h3 className="item-name">
                            <Link href={`/products/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="item-quantity">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="item-actions">
                        <p className="item-quantity">Qty {item.quantity}</p>
                        <div className="flex">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            type="button" 
                            className="remove-btn"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="summary">
              <div className="total-price-container">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="checkout-btn-container">
                <button 
                  onClick={handleCheckout}
                  className="checkout-btn"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}