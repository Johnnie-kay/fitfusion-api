const generateToken = () => {
    const token = Date.now().toString().split('').reverse().join('').substring(0, 4)
    console.log('token: ', token);
    return token;
}

generateToken()

module.exports = {
    generateToken
}    