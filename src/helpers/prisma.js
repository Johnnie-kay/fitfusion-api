const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
})
prismaClient.$connect().then(con => console.log('db connection: ', con)).catch(error => console.log('db connecion error: ', error))
module.exports = { prismaClient }   