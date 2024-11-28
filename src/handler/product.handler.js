const { createProduct, getPaginatedProducts, deleteProduct } = require('../services/product.service')

const createProductHandler = async (req, res) => {
    try {
        const { body } = req;
        const { files } = req;
        // console.log('files: ', files)
        console.log('product body: ', body);
        const result = await createProduct(body, files);
        res.status(result.status).json({ message: 'Product created successfully', data: result.data })

    } catch (error) {
        res.status(result.status).json({ message: 'Product creation failed', data: null })
    }
}

const getProductByVendorHandler = async (req, res) => {

}

const updateProductHandler = async (req, res) => {

}

const markProductOutOfStockHandler = async (req, res) => {

}

const getPaginatedProductsHandler = async (req, res) => {
    const params = req.query;
    console.log('params: ', params);
    const result = await getPaginatedProducts(params);
    return res.status(result.status).json(result);
}

const searchProductHandler = async (req, res) => {

}

const deleteProductHandler = async (req, res) => {
    const id = req.param;
    const result = await deleteProduct(id);
    return res.status(result.status).json(result)
}

module.exports = { createProductHandler, updateProductHandler, getProductByVendorHandler, markProductOutOfStockHandler, getPaginatedProductsHandler, searchProductHandler, deleteProductHandler }