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

    const result = await signIn(body);
    console.log('signin response: ', result)
    res.status(result.status).json(result)
}


module.exports = {
    signUpHandler,
    signInHandler
}