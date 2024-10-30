const express = require('express');
const { verifyVendorEmailHandler, registerVendorHandler, addStaffHandler, removeStaffHandler, changeStaffPriviledgeHandler, changeLogoHandler } = require('../handler/vendor.handler.js');

const vendorRouter = express.Router();

vendorRouter
    // .post('/start', startVendorRegistrationHandler)
    .post('/verify-vendor-email', verifyVendorEmailHandler)
    .post('/register-vendor', registerVendorHandler)
    .post('/add-staff', addStaffHandler)
    .post('/remove-staff', removeStaffHandler)
    .post('change-staff-privilege', changeStaffPriviledgeHandler)
    .post('/change-logo', changeLogoHandler)

module.exports = vendorRouter;