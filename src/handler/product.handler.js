

const createProductHandler = async (req, res) => {
    const { body } = req;
    console.log('product body: ', body)
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