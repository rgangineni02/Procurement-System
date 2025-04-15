const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');

// GET all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new supplier (optional feature)
router.post('/', async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    const saved = await newSupplier.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving supplier:", err);
    res.status(500).json({ error: "Failed to create supplier" });
  }
});

module.exports = router;
