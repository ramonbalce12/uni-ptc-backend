// server.js

const express = require('express');
const app = express();
const port = 3000;

// In-memory data (no database)
let products = [
  { id: 1, name: 'Uniform Boys', price: 20 },
  { id: 2, name: 'Uniform Girls', price: 40 },
  { id: 3, name: 'PE Uniform', price: 60 },
  { id: 4, name: 'NSTP', price: 60 },
];

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Route to get a single product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.json(product);
});

// Route to create a new product
app.post('/products', (req, res) => {
  const newProduct = req.body; // Get the new product from the request body
  newProduct.id = products.length + 1; // Simple ID assignment
  products.push(newProduct); // Add it to the in-memory array
  res.status(201).json(newProduct); // Send back the created product
});

// Route to update a product by ID
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  let product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).send('Product not found');
  }
  product = { ...product, ...updatedProduct }; // Update the product data
  products = products.map(p => (p.id === productId ? product : p)); // Update in-memory data
  res.json(product);
});

// Route to delete a product by ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(p => p.id !== productId); // Remove product from the array
  res.status(204).send(); // No content
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
