const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// GET all products
router.get('/', productController.getAllProducts);

// POST create a new product
router.post('/', productController.uploadImage, productController.resizeImage, productController.addImagetoCloud, productController.createProduct);

// PUT update a product
router.put('/:id', productController.uploadImage, productController.resizeImage, productController.addImagetoCloud, productController.updateProduct);

// DELETE delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
