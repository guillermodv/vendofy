'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Navbar from "../components/Navbar";
import './page.css';

function BalancePage() {
  const balance = 1250.75;
  const transactions = [
    { id: 1, description: "Venta de Laptop Pro", amount: 1200, type: "income", date: "2024-10-01" },
    { id: 2, description: "Compra de Auriculares Inalámbricos", amount: -150, type: "expense", date: "2024-10-02" },
    { id: 3, description: "Venta de Teclado Mecánico", amount: 120, type: "income", date: "2024-10-03" },
    { id: 4, description: "Venta de Smartphone X", amount: 800, type: "income", date: "2024-09-04" },
    { id: 5, description: "Compra de Monitor 4K", amount: -600, type: "expense", date: "2024-09-05"  },
    { id: 6, description: "Venta de Silla Gamer", amount: 300, type: "income", date: "2024-08-15" },
    { id: 7, description: "Compra de Mousepad", amount: -25, type: "expense", date: "2024-08-16" },
  ];

  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (transaction.type === 'income') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expense += Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  const chartData = Object.values(monthlyData);

  return (
    <div className="balance-page">
      <Navbar />
      <div className="container">
        <h1 className="title">
          Balance de tu Cuenta
        </h1>
        <div className="balance-card">
          <h2 className="balance-title">Balance Actual</h2>
          <p className="balance-amount">${balance.toFixed(2)}</p>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Resumen Mensual</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#82ca9d" name="Ingresos" />
              <Bar dataKey="expense" fill="#ff6b6b" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        <div className="transactions-card">
          <h2 className="transactions-title">Historial de Transacciones</h2>
          <div className="transactions-list-container">
            <ul role="list" className="transactions-list">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="transaction-item">
                  <p className="transaction-description">{transaction.description}</p>
                  <p className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalancePage;