'use client';

import { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Navbar from "../components/Navbar";
import './page.css';

// Datos de ejemplo (los mismos de antes)
const transactionsData = [
  { id: 1, description: "Venta de Laptop Pro", amount: 1200, purchasePrice: 900, type: "income", date: new Date().toISOString() },
  { id: 2, description: "Compra de Auriculares", amount: 150, type: "expense", date: new Date().toISOString() },
  { id: 3, description: "Venta de Teclado", amount: 120, purchasePrice: 80, type: "income", date: "2024-09-16T10:30:00Z" },
  { id: 4, description: "Venta de Smartphone X", amount: 800, purchasePrice: 600, type: "income", date: "2024-09-16T11:00:00Z" },
  { id: 5, description: "Compra de Monitor 4K", amount: 600, type: "expense", date: "2024-09-15T15:00:00Z" },
];

function BalancePage() {
  const [isChartsVisible, setIsChartsVisible] = useState(true);
  const [filters, setFilters] = useState({ type: 'all', startDate: '', endDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const TRANSACTIONS_PER_PAGE = 5;

  // --- Lógica de Cálculos y Filtros ---
  const filteredTransactions = useMemo(() => {
    return transactionsData.filter(t => {
      const transactionDate = new Date(t.date);
      const matchesType = filters.type === 'all' || t.type === filters.type;
      const matchesStartDate = !filters.startDate || transactionDate >= new Date(filters.startDate);
      const matchesEndDate = !filters.endDate || transactionDate <= new Date(filters.endDate + 'T23:59:59');
      return matchesType && matchesStartDate && matchesEndDate;
    });
  }, [filters]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + TRANSACTIONS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / TRANSACTIONS_PER_PAGE);

  const dailyBalance = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactionsData.filter(t => t.date.startsWith(today));
    
    const dailyIncome = todayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const dailyExpenses = todayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const dailyCosts = todayTransactions
      .filter(t => t.type === 'income' && t.purchasePrice)
      .reduce((sum, t) => sum + t.purchasePrice, 0);

    const dailyProfit = dailyIncome - dailyCosts - dailyExpenses;

    return { dailyIncome, dailyExpenses, dailyProfit };
  }, []);

  // --- Lógica para Gráficos (sin cambios) ---
  const monthlyData = useMemo(() => transactionsData.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { month, Ingresos: 0, Gastos: 0 };
    }
    if (transaction.type === 'income') acc[month].Ingresos += transaction.amount;
    else acc[month].Gastos += transaction.amount;
    return acc;
  }, {}), []);
  const chartData = Object.values(monthlyData).reverse();

  // --- Handlers ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // --- Helpers ---
  const formatCurrency = (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value || 0);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="balance-page">
      <Navbar />
      <div className="balance-header">
        <h1>Balance y Transacciones</h1>
        <button onClick={() => setIsChartsVisible(!isChartsVisible)} className="toggle-charts-btn">
          {isChartsVisible ? 'Ocultar Gráficos' : 'Mostrar Gráficos'}
        </button>
      </div>

      <div className="balance-layout">
        {/* --- Columna Principal --- */}
        <div className="main-content">
          {/* Balance del Día */}
          <section className="daily-balance-section">
            <h2 className="section-title">Resumen del Día</h2>
            <div className="daily-cards-container">
              <div className="daily-card">
                <h3>Ingresos Hoy</h3>
                <p className="amount income">{formatCurrency(dailyBalance.dailyIncome)}</p>
              </div>
              <div className="daily-card">
                <h3>Gastos Hoy</h3>
                <p className="amount expense">{formatCurrency(dailyBalance.dailyExpenses)}</p>
              </div>
              <div className="daily-card">
                <h3>Beneficio Neto Hoy</h3>
                <p className="amount profit">{formatCurrency(dailyBalance.dailyProfit)}</p>
              </div>
            </div>
          </section>

          {/* Tabla de Transacciones */}
          <section className="transactions-section">
            <h2 className="section-title">Historial de Transacciones</h2>
            <div className="table-filters">
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="all">Todo Tipo</option>
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
              </select>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
            </div>

            <div className="table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map(t => (
                    <tr key={t.id}>
                      <td>{t.description}</td>
                      <td>{formatDate(t.date)}</td>
                      <td>
                        <span className={`badge ${t.type}`}>{t.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
                      </td>
                      <td className={`amount ${t.type}`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Siguiente</button>
              </div>
            )}
          </section>
        </div>

        {/* --- Barra Lateral de Gráficos --- */}
        <aside className={`charts-sidebar ${isChartsVisible ? '' : 'hidden'}`}>
          <div className="chart-card">
            <h2 className="section-title">Resumen Mensual</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="Ingresos" fill="#82ca9d" />
                <Bar dataKey="Gastos" fill="#ff6b6b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BalancePage;