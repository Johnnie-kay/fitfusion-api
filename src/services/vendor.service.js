const { prismaClient } = require('../helpers/prisma');
const { sendEmail } = require('../helpers/email.helper');
const { signUp } = require('./user.service')
const { status } = require('http-status')

// const startVendorRegistration = async (body) => {

// }

const registerVendor = async (body) => {
    try {
        const { name, email, logo, phone, password, cacNumber } = body;
        const user = await signUp({ email, phone, firstName: name, lastName: 'admin', password: password }, 'Admin');
        if (!user.hasError) {
            const store = await prismaClient.store.create({
                data: {
                    name,
                    logo,
                    email,
                    phone,
                    cacNumber
                }
            });
            return { status: status.OK, data: store, message: 'Your store has been created' };
        }
        return { status: status.INTERNAL_SERVER_ERROR, data: store, message: 'Your store creation failed' };
    } catch (error) {
        return { status: status.INTERNAL_SERVER_ERROR, data: null, message: 'Your store creation failed...' + error.message };
    }


}

const verifyVendorEmail = async (body) => { }


const addStaff = async (body) => { }

const removeStaff = async (body) => { }

const changeStaffPriviledge = async (body) => { }

const changeLogo = async (body) => { }


module.exports = {
    verifyVendorEmail, registerVendor, addStaff, removeStaff, changeStaffPriviledge, changeLogo
}