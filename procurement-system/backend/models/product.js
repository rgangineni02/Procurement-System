// backend/models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productType: String,
  sku: String,
  price: Number,
  availability: Number,
  supplierName: String,
  location: String,
  orderStatus: { type: String, default: 'Pending' } // optional
});

module.exports = mongoose.model('Product', productSchema);
