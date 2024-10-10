const { signUp, signIn } = require('../services/user.service');

const signUpHandler = async (req, res) => {
    const { body } = req;

    const result = await signUp(body)
    if (result.hasError) {
        return res.json({ message: result.error.message, statusCode: result.error.status ?? 500 })
    }
    return res.json({ message: 'Signup is successful', data: result })
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