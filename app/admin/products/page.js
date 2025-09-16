'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { products as initialProducts } from '../../data/products';
import './page.css';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price) }]);
    setNewProduct({ name: '', price: '' });
    setIsModalOpen(false);
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-products-page">
      <Navbar />
      <div className="container">
        <div className="header">
          <h1 className="title">Administrar Productos</h1>
          <button onClick={() => setIsModalOpen(true)} className="add-product-btn">
            Agregar Producto
          </button>
        </div>
        
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Agregar Nuevo Producto</h3>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  className="modal-input"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  className="modal-input"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Precio Compra"
                  className="modal-input"
                  value={newProduct.purchasePrice}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddProduct}
                  className="confirm-btn"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && editingProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Editar Producto</h3>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  className="modal-input"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  className="modal-input"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="confirm-btn"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>
                  <td className="product-price">${product.price}</td>
                  <td className="actions-cell">
                    <button onClick={() => openEditModal(product)} className="edit-btn">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}