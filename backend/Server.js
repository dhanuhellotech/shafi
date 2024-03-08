const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes= require('./Router/productRoutes')
const studyCenterRoutes = require('./Router/studyCenterRoutes');
const contactRoutes = require('./Router/contactRoutes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000; // Set the port number

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming request bodies in a middleware

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://dhanalakshmihellotech:GppWgtpvyNsu2A6Z@cluster0.qzu8ito.mongodb.net/shafi",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
    console.log('Connected to MongoDB');
  });
  



// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!'); // Example route
});
app.use('/products', productRoutes);
app.use('/study', studyCenterRoutes);
app.use('/contact', contactRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

