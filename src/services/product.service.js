const { prismaClient } = require("../helpers/prisma");
const { status } = require('http-status');
const fs = require('node:fs')

const createProduct = async (body, files) => {
    console.log('files: ', files[0].originalname)
    try {
        const product = await prismaClient.product.create({
            data: {
                name: body.name,
                categoryId: parseInt(body.categoryId),
                sku: body.sku,
                storeId: parseInt(body.storeId),
                price: "155000.00",
                description: body.description,
                stock: parseInt(body.stock)
            }
        });
        console.log('product saved: ', product);
        if (product.id) {
            const productImages = [];
            for (let i = 0; i < files.length; i++) {
                console.log('files 1:', files[i], files[i]['originalname'])
                const productImage = {
                    originalName: files[i]['originalname'],
                    productId: product.id,
                    url: '/uploads/' + files[i]['filename'],
                    encoding: files[i]['encoding'],
                    mimetype: files[i]['mimetype'],
                    fileName: files[i]['filename'],
                    size: files[i]['size']
                }
                productImages.push(productImage);
            }
            const savedImages = await prismaClient.productImages.createMany({ data: productImages });
            console.log('saved images: ', savedImages)
            return { status: status.CREATED, data: { product, productImages: savedImages } }
        }
        return { status: status.INTERNAL_SERVER_ERROR, data: null }

    } catch (error) {
        console.log('Error creating product: ', error);
        files.forEach(file => fs.unlink('../../uploads/' + file.filename));
        return { status: status.INTERNAL_SERVER_ERROR, data: null }
    }
}

const getPaginatedProducts = async (params) => {
    try {
        const { page = 0, pageSize = 7 } = params;

        const products = await prismaClient.product.findMany({
            take: parseInt(pageSize), skip: parseInt(page), include: { productImages: true }, orderBy: {
                // stock: 'desc',
                createdAt: 'desc'
            }
        });
        console.log('products: ', products.length);
        return { status: status.OK, data: products }
    } catch (error) {
        console.error('Error fetching products', error);
        return { status: status.INTERNAL_SERVER_ERROR, data: null, message: error.message }
    }
}

const deleteProduct = async (id) => {
    try {
        const deleted = await prismaClient.product.delete({ where: { id } }); console.log('deleted product: ', deleted)
        if (deleted && deleted.id) {
            return {
                status: status.OK, data: deleted, message: 'product deleted successfully'
            }
        } else {
            return {
                status: status.INTERNAL_SERVER_ERROR, data: deleted, message: 'product deletion failed'
            }
        }
    } catch (error) {
        return {
            status: status.INTERNAL_SERVER_ERROR, data: deleted, message: error.message
        }
    }
}

module.exports = { createProduct, getPaginatedProducts, deleteProduct }