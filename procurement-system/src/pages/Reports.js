import React, { useEffect, useState } from "react";
import "../styles/Reports.css";

const Reports = () => {
  const [data, setData] = useState({
    totalProducts: 0,
    lowStock: 0,
    approvedOrders: 0,
    rejectedOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(products => {
        const lowStock = products.filter(p => p.availability <= 10).length;
        const approved = products.filter(p => p.orderStatus === "Approved").length;
        const rejected = products.filter(p => p.orderStatus === "Rejected").length;
        const pending = products.filter(p => !p.orderStatus || p.orderStatus === "Pending").length;

        setData({
          totalProducts: products.length,
          lowStock,
          approvedOrders: approved,
          rejectedOrders: rejected,
          pendingOrders: pending
        });
      })
      .catch(err => console.error("Error fetching report data:", err));
  }, []);

  return (
    <div className="reports-container">
      <h1>Reports Summary</h1>
      <div className="report-cards">
        <div className="report-card total">
          <h3>Total Products</h3>
          <p>{data.totalProducts}</p>
        </div>
        <div className="report-card low">
          <h3>Low Stock</h3>
          <p>{data.lowStock}</p>
        </div>
        <div className="report-card approved">
          <h3>Approved Orders</h3>
          <p>{data.approvedOrders}</p>
        </div>
        <div className="report-card rejected">
          <h3>Rejected Orders</h3>
          <p>{data.rejectedOrders}</p>
        </div>
        <div className="report-card pending">
          <h3>Pending Orders</h3>
          <p>{data.pendingOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
