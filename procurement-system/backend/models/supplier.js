const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  leadTime: {
    type: String, // e.g., "3 Days"
    required: true,
  },
});

module.exports = mongoose.model('Supplier', supplierSchema);
