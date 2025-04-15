import React, { useEffect, useState } from "react";
import "../styles/Suppliers.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  const handleContact = (supplier) => {
    // Open mail client with pre-filled email
    const subject = encodeURIComponent("Procurement Inquiry");
    const body = encodeURIComponent(`Hello ${supplier.name},\n\nWe would like to get in touch regarding supply availability.`);
    window.location.href = `mailto:${supplier.contact}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="suppliers-container">
      <h1>Suppliers</h1>
      <table className="suppliers-table">
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Contact Email</th>
            <th>Lead Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.leadTime}</td>
              <td>
                <button
                  className="contact-btn"
                  onClick={() => handleContact(supplier)}
                >
                  Contact Supplier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;
