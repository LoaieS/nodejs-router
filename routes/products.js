// Loaie Shalloufi
// Tareq Abu Yunis

const express = require('express');
const router = express.Router();
const data = require('../data')

// GET /api/products
router.get('/', (req, res) => {
    res.json({ products: data.products });
});

// GET /api/products/:id
// get product by id (path param)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = data.products.find(item => item.id === parseInt(id))
    if (product) 
        res.json(product);
    else 
        res.status(404).json({ message: `Product with ID: ${id} not found` });
});

// POST /api/products
// add products (body data)
router.post('/', (req, res) => {
    const { id, name, price } = req.body

    // Check if the product ID already exists
    const productIndex = data.products.findIndex(item => item.id === parseInt(id))
    if (productIndex !== -1) {
        return res.status(400).send({"error": `Product with ID: ${id} already exists.`})
    }
    
    // If it doesn't exist, check if the details are correct
    if (!id || name === undefined || price === undefined || parseInt(price) <= 0) {
        return res.status(400).send({"error": `Invalid product details`})
    }

    // If all checks pass, add it to the products
    data.products.push({
        "id": parseInt(id),
        "name": name,
        "price": parseInt(price)
    });
    return res.json({ message: `Product with ID: ${id} added successfully`});
});

// PUT /api/products/:id
// update product by id (path param + body data)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body
    
    // Find index of product by id
    const productIndex = data.products.findIndex(item => item.id === parseInt(id))

    // If the product exists
    if (productIndex !== -1) {
        // Check if the details are correct
        if (!id || !name || !price || parseInt(price) <= 0) {
            return res.status(400).json({"error": `Invalid product details`})
        }
        // If all checks pass, update the matching product in the array
        data.products[productIndex] = {
            "id": parseInt(id),
            "name": name,
            "price": parseInt(price)
        };
        return res.json({ message: `Product with ID: ${id} updated` });
    }
    // Otherwise if the product doesn't exist
    else {
        return res.status(404).json({ message: `Product with ID: ${id} not found` })
    }
});

// DELETE /api/products/:id
// delete product by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = data.products.findIndex(item => item.id === parseInt(id))

    // If the product exists
    if (productIndex !== -1) {
        // delete product from array
        data.products.splice(productIndex, 1)
        return res.json({ message: `Product with ID: ${id} deleted` });
    }
    // Otherwise if the product doesn't exist
    else {
        return res.status(404).json({ message: `Product with ID: ${id} not found` })
    }
});


module.exports = router;
