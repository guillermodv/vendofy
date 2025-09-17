'use client';

import { useEffect, useState } from 'react';
import './page.css'; // Keep this import at the top


export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    purchasePrice: '',
    quantity: 0,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products');
      console.log('res', res)
      const data = await res.json();
      console.log('data', data)
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (productId) => {
    try {
      await fetch(`/api/products`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId }),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.price) return;

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price) || 0,
          purchasePrice: parseFloat(newProduct.purchasePrice) || 0,
          quantity: parseFloat(newProduct.quantity) || 0,
        }),
      });
      setNewProduct({ name: '', price: '', purchasePrice: '', quantity: 0 });
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct({ ...product, id: product._id });
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct.name.trim()) return;

    try {
      await fetch(`/api/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      setIsEditModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value || 0);

  const filteredProducts = products?.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPrice =
      (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
      (!priceRange.max || product.price <= parseFloat(priceRange.max));

    return matchesName && matchesPrice;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      
      <div className="admin-products-container">
        <h1>Administraree Productos</h1>

        <div className="filters-and-actions">
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio mín."
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio máx."
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
          <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
            + Agregar Producto
          </button>
        </div>

        {isLoading ? (
          <p>Cargando productos...</p>
        ) : (
          <>
            <div className="product-table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio de Venta</th>
                    <th>Precio de Compra</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{formatCurrency(product.purchasePrice)}</td>
                      <td>{product.quantity}</td>
                      <td className="action-buttons">
                        <button onClick={() => openEditModal(product)}>Editar</button>
                        <button onClick={() => handleDelete(product._id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Agregar Nuevo Producto</h2>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio de Venta"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio de Compra"
              value={newProduct.purchasePrice}
              onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleAddProduct}>Agregar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Precio de Venta"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Precio de Compra"
              value={editingProduct.purchasePrice}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, purchasePrice: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, quantity: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={handleUpdateProduct}>Actualizar</button>
              <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
