// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

// Import the product-related functions from db.js
const { insertProduct } = require('./functions/add-new-products');
const { deleteProductById } = require('./functions/delete-exisitng-products');
const { getAllProducts } = require('./functions/get-products'); // Import the function to get all products

// Initialize the express application
const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// POST route to create a new product
app.post('/create-product', async (req, res) => {
    const { name, description, price, stock } = req.body;

    // Basic validation
    if (!name || !price || stock === undefined) {
        return res.status(400).send('Missing required fields: name, price, or stock');
    }

    try {
        // Call the insertProduct function to insert the product into the database
        const newProduct = await insertProduct(name, description, price, stock);

        // Send the newly created product as a response
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

// DELETE product by ID
app.delete('/products/:id', async (req, res) => {
    const productID = req.params.id;

    const result = await deleteProductById(productID);

    if (result.error) {
        return res.status(500).send(result.error);
    }

    res.status(200).json(result);
});

// GET route to fetch all products
app.get('/products', async (req, res) => {
    try {
        const products = await getAllProducts(); // Call the function to get all products
        res.status(200).json(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

// Simple root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Product API');
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
