const express = require('express');
const { createProductHandler, updateProductHandler, getProductByVendorHandler, markProductOutOfStockHandler, getAllProductsHandler, searchProductHandler } = require('../handler/product.handler');

const router = express.Router();

router.post('/create', createProductHandler)
    .patch('/update-product/:id', updateProductHandler)
    .get('/', getAllProductsHandler)
    .get('/get-product-by-vendor', getProductByVendorHandler)
    .get('/search', searchProductHandler)
    .patch('/mark-out-of-stock', markProductOutOfStockHandler);

module.exports = router; 