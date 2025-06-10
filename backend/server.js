const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://vedanttyagielecbits:U49us4S3YvfbxA4t@cluster0.wpd6nl4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ Connection error:', err));

// Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running and connected to MongoDB!');
});

// Get all product data
app.get("/data", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Create or update a product (specifically our "counter")
app.post("/data", async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const updated = await Product.findOneAndUpdate(
      { name },               // Find by name
      { quantity },           // Update quantity
      { new: true, upsert: true } // Create if not found
    );

    res.status(201).json({ message: "Item added/updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to save item" });
  }
});

// Delete a product by ID (optional)
app.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
