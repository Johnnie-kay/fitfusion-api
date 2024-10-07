const { signUp, signIn } = require('../services/user.service');

const signUpHandler = async (req, res) => {
    const { body } = req;

    const result = signUp(body)
    res.json({ message: 'Signup is successful' })
}

const signInHandler = async (req, res) => {
    const { body } = req;

    const result = signIn(body)
    res.json({ message: 'Signup is successful' })
}

module.exports = {
    signUpHandler,
    signInHandler
}