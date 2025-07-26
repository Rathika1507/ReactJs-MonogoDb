import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/getAllOrders');
      console.log('API Response:', res.data);
      setOrders(res.data.orders || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch orders:', err.response?.data || err.message);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/order/${orderId}/status`, {
        status: newStatus
      });

      // Update the UI without refetching
      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Error updating status:', err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="container mt-4">
      {/* 🍔 Burger Button */}
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>

      {/* 👉 Side Menu */}
      {menuOpen && (
        <div className="side-menu">
          <ul>
            <li onClick={() => navigate('/Order')}>Order</li>
            <li onClick={() => navigate('/Report')}>Reports</li>
          </ul>
        </div>
      )}

      <center><h2>Admin - Manage Customer Orders</h2></center>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive mt-5">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody className="table-info">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="form-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td>₹{order.amount}</td>
                  <td>
                    <ul>
                      {order.cartItems?.map((item, idx) => (
                        <li key={idx}>
                          {item.product?.name || "Unnamed Product"} × {item.qty}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
