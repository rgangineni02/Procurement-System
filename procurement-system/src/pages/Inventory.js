import React, { useEffect, useState } from "react";
import "../styles/Inventory.css";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Stock Level</th>
            <th>Reorder Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.productType}</td>
              <td>{item.supplierName}</td>
              <td>{item.availability}</td>
              <td>
                <span
                  className={`reorder-status ${
                    item.availability <= 10
                      ? "restock-needed"
                      : item.availability <= 20
                      ? "low-stock"
                      : "sufficient"
                  }`}
                >
                  {item.availability <= 10
                    ? "Restock Needed"
                    : item.availability <= 20
                    ? "Low Stock"
                    : "Sufficient"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
