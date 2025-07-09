import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function ProductHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.email) return;

    fetch(`${process.env.REACT_APP_API_URL}/orders?email=${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div>Loading Product History...</div>;

  return (
    <div className="container mt-5">
      <h2>Product History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                   <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</td>
                  <td>
                    <ul>
                      {order.cartItems.map((item, idx) => (
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
