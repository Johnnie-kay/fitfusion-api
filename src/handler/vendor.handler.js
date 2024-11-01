const { verifyVendorEmail, registerVendor, addStaff, removeStaff, changeStaffPriviledge, changeLogo } = require('../services/vendor.service');

// const startVendorRegistrationHandler = async (req, res) => {
//     const { body } = req;
//     console.log('start vendor reg body: ', body);
//     const result = await startVendorRegistration(body);
//     res.status(result.status).json({ status: true, data: result, message: 'Verification code has been sent to vendor\'s email' });
// }

const verifyVendorEmailHandler = async (req, res) => {
    const { body } = req;
    console.log('verify vendor email: ', body);
    res.json(body)
}

const registerVendorHandler = async (req, res) => {
    const { body } = req;
    console.log('register vendor: ', body);
    const result = await registerVendor(body);
    return res.status(result.status).json(result);
}

const addStaffHandler = async (req, res) => {
    const { body } = req;
    console.log('add staff: ', body)
}

const removeStaffHandler = async (req, res) => {
    const { body } = req;
    console.log('remove staff: ', body)
    return body;
}

const changeStaffPriviledgeHandler = async (req, res) => {
    const { body } = req;
    console.log('change priviledge: ', body);
    return body;
}

const changeLogoHandler = async (req, res) => {
    const { body } = req;
    console.log('change logo: ', body)
}

module.exports = {
    verifyVendorEmailHandler, registerVendorHandler, addStaffHandler, removeStaffHandler, changeStaffPriviledgeHandler, changeLogoHandler
}