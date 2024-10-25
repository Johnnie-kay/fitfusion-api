const express = require('express');
const router = express.Router();

const { signUpHandler, signInHandler, verifyEmailHandler } = require('../handler/user.handler.js');


router.post('/signup', signUpHandler);

router.post('/signin', signInHandler);
router.post('/verify-email', verifyEmailHandler)

module.exports = router;
