const { status } = require('http-status')
const bcrypt = require('bcryptjs');
const prisma = require('prisma')
const { prismaClient } = require('../helpers/prisma');
const jwt = require('jsonwebtoken');


const signUp = async (body) => {
    try {

        console.log('body ', body)
        const salt = bcrypt.genSaltSync(10)
        const hashed = bcrypt.hashSync(body.password, salt);
        body.password = hashed;
        console.log('hashed: ', hashed)
        const saved = await prismaClient.user.create({
            data:
                body
        });
        console.log('saved user: ', saved)
        return saved;
    } catch (error) {
        console.log('Signup error: ', error.message)
        return { hasError: true, error };
    }
}

const signIn = async (body) => {
    try {
        const { email, password } = body;
        if (!email || !password) return { status: status.BAD_REQUEST, message: "email and password are required" }
        const user = await prismaClient.user.findFirst({ where: { email } });
        if (!user) return { status: status.UNAUTHORIZED, message: "invalid username or password" }
        if (!user.isEmailVerifield) return { status: status.BAD_REQUEST, message: "Please verify your email before signing in!" }
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) return { status: status.UNAUTHORIZED, message: "invalid username or password" }

        const token = jwt.sign({ email: user.email, phone: user.phone, id: user.id, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_TOKEN, { expiresIn: '1h' });

        return { token, status: status.OK, message: 'Signin is successful!' };
    } catch (error) {
        console.log('Error signing in: ', error)
    }
}

const verifyEmail = async (body) => {
    const { email, token } = body;
    if (!email || !token) return { status: status.BAD_REQUEST, message: "email and token are required!" }
    const foundUser = await prismaClient.user.findFirst({ where: { email } })
    if (!foundUser) return { status: status.NOT_FOUND, message: "user not found" }
    if (foundUser.emailToken == token) {
        prismaClient.user.update({ where: { email }, data: { emailToken: null, isEmailVerifield: 1 } });
        return { status: status.OK, message: "Your email is now verified. You can now login" }
    }
    return { status: status.CONFLICT, message: "invalid email token" }

}

module.exports = {
    signUp, signIn
}