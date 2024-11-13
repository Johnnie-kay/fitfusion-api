const { prismaClient } = require("../helpers/prisma");
const { status } = require('http-status')

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
        console.log('Error creating product: ', error)
        return { status: status.INTERNAL_SERVER_ERROR, data: null }
    }
}


module.exports = { createProduct }