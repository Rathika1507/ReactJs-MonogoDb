import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Report() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/getAllOrders')
      .then(res => {
        const orders = res.data.orders || [];
        setOrders(orders);

        const revenue = orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0);
        setTotalRevenue(revenue);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err.message);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>📊 Sales Report</h2>
      <p>Total Orders: {orders.length}</p>
      <p>Total Revenue: ₹{totalRevenue.toFixed(2)}</p>
    </div>
  );
}
