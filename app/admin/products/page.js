"use client";
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { products as initialProducts } from '../../data/products';

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
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Administrar Productos</h1>
      
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-pepsi-blue hover:bg-blue-900 text-pepsi-white font-bold py-2 px-4 rounded">
          Agregar Producto
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Agregar Nuevo Producto</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Nombre del producto"
                className="px-4 py-2 border rounded-lg"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Precio"
                className="px-4 py-2 border rounded-lg"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
            <div className="items-center px-4 py-3 mt-4">
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-pepsi-blue text-pepsi-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Agregar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Editar Producto</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Nombre del producto"
                className="px-4 py-2 border rounded-lg"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Precio"
                className="px-4 py-2 border rounded-lg"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="items-center px-4 py-3 mt-4">
              <button
                onClick={handleUpdateProduct}
                className="px-4 py-2 bg-pepsi-blue text-pepsi-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Actualizar
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEditModal(product)} className="text-pepsi-blue hover:text-blue-700">Editar</button>
                  <button onClick={() => handleDelete(product.id)} className="text-pepsi-red hover:text-red-700 ml-4">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
