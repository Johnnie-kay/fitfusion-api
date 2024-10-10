const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
})

module.exports = { prismaClient }