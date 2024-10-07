const express = require('express');
const router = express.Router();

const { signUpHandler, signInHandler } = require('../handler/user.handler.js')

router.post('/signup', signUpHandler);

router.post('/signin', signInHandler);

module.exports = router;
