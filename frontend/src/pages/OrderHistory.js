import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.email) return;
    fetch(process.env.REACT_APP_API_URL + `/orders?email=${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div>Loading order history...</div>;

  return (
    <div className="container mt-5">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive" >
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody className="table-info">

              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-primary">{order._id}</td>
                  <td className="text-primary">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</td>
                  <td className="text-primary">{order.status}</td>
                  <td className="text-primary">₹{order.amount}</td>
                  <td className="text-primary">
                    <ul>
                      {order.cartItems.map((item, idx) => (
                        <li key={idx}>
                          {item.product.name} x {item.qty}
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
