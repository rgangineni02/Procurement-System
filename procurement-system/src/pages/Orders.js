import React, { useEffect, useState } from "react";
import "../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Called when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Approve/Reject
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      // Refresh orders list
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.productType || "N/A"}</td>
              <td>{order.supplierName || "N/A"}</td>
              <td>
                <span className={`status ${order.orderStatus?.toLowerCase()}`}>
                  {order.orderStatus || "Pending"}
                </span>
              </td>
              <td>
                {order.orderStatus === "Pending" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleStatusChange(order._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleStatusChange(order._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
