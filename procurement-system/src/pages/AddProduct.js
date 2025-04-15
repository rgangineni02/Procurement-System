import React, { useState } from "react";
import "../styles/AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productType: "",
    sku: "",
    price: "",
    availability: "",
    supplierName: "",
    location: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      alert("Product added successfully ✅");
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Type</label>
        <input
          type="text"
          name="productType"
          placeholder="e.g. skincare"
          value={product.productType}
          onChange={handleChange}
        />

        <label>SKU</label>
        <input
          type="text"
          name="sku"
          placeholder="e.g. SKU123"
          value={product.sku}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="e.g. 49.99"
          value={product.price}
          onChange={handleChange}
        />

        <label>Availability</label>
        <input
          type="number"
          name="availability"
          placeholder="Units available"
          value={product.availability}
          onChange={handleChange}
        />

        <label>Supplier Name</label>
        <input
          type="text"
          name="supplierName"
          placeholder="e.g. Supplier A"
          value={product.supplierName}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. Mumbai"
          value={product.location}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
