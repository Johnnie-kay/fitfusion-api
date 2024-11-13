const { createProduct } = require('../services/product.service')

const createProductHandler = async (req, res) => {
    const { body } = req;
    const { files } = req;
    // console.log('files: ', files)
    console.log('product body: ', body);
    const result = await createProduct(body, files);
    res.status(result.status).json({ message: 'Product created successfully', data: result.data })
}

const getProductByVendorHandler = async (req, res) => {

}

const updateProductHandler = async (req, res) => {

}

const markProductOutOfStockHandler = async (req, res) => {

}

const getAllProductsHandler = async (req, res) => {

}

const searchProductHandler = async (req, res) => {

}

module.exports = { createProductHandler, updateProductHandler, getProductByVendorHandler, markProductOutOfStockHandler, getAllProductsHandler, searchProductHandler }