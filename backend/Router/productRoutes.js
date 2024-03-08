const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Route to get all products
router.get('/', productController.getProducts);

// Route to add a new product
router.post('/', productController.uploadImage, productController.resizeImage, productController.addImageToCloud, productController.addProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to update a product by ID
router.put('/:id', productController.uploadImage, productController.resizeImage, productController.addImageToCloud, productController.updateProduct);
router.get('/:id', productController.getProductById);
module.exports = router;
