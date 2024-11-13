const express = require('express');
const { createProductHandler, updateProductHandler, getProductByVendorHandler, markProductOutOfStockHandler, getAllProductsHandler, searchProductHandler } = require('../handler/product.handler');

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/create', upload.array('images', 10), createProductHandler)
    .patch('/update-product/:id', updateProductHandler)
    .get('/', getAllProductsHandler)
    .get('/get-product-by-vendor', getProductByVendorHandler)
    .get('/search', searchProductHandler)
    .patch('/mark-out-of-stock', markProductOutOfStockHandler);

module.exports = router; 