const { status } = require('http-status')
const bcrypt = require('bcryptjs');
const prisma = require('prisma')
const { prismaClient } = require('../helpers/prisma');
const jwt = require('jsonwebtoken');
const { signUpUserValidatorSchema } = require('../validators/signup-user.validator');
const { sendEmail } = require('../helpers/email.helper');
const { generateToken } = require('../helpers/token.helper')


const signUp = async (body) => {
    try {
        console.log('body ', body)
        const validatedData = await signUpUserValidatorSchema.validateAsync(body)
        console.log('isDataValid: ', validatedData)

        const salt = bcrypt.genSaltSync(10)
        const hashed = bcrypt.hashSync(body.password, salt);
        body.password = hashed;

        // sendEmail('', validatedData.email, '', 'Signup Successful!', 'Signup Successful!', 'You are welcome to FitFution');
        // return validatedData;

        const saved = await prismaClient.user.

            create({
                data:
                    validatedData
            });
        console.log('saved user: ', saved);
        const token = generateToken();
        const verificationTokens = await prismaClient.verificationTokens.create({
            data: {
                token: token,
                userId: saved.id,
                // user: saved,
                type: 'EmailVerification',
                expiresAt: new Date()
            }
        })
        const html = `<html>
   <head>
   <title>Account signup successful</title>
   </head>
   <body>
   <h3>Hi ${saved.firstName},</h3>
   <p> You are welcome to FitFusion. Your number place for everything fashion</p>

   <p> To verify your email, enter the token: ${verificationTokens.token} on the verification page and verify.
   </body>
   </html>`;
        console.log('Verificaton data: ', verificationTokens);
        sendEmail('', validatedData.email, '', 'Signup Successful!', 'Signup Successful!', 'You are welcome to FitFution', '', html);
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
    const foundUser = await prismaClient.user.findFirst({
        where: { email },
        include: {
            verificationTokens: true,
        },
    })
    if (!foundUser) return { status: status.NOT_FOUND, message: "user not found" }
    const founToken = foundUser.verificationTokens.find(t => t.token == token && t.type == 'EmailVerification');
    if (founToken) {
        const updateRes = await prismaClient.user.update({ where: { email }, data: { isEmailVerifield: true } });

        await prismaClient.verificationTokens.delete({ where: { id: founToken.id } });

        return { status: status.OK, message: "Your email is now verified. You can now login" }
    }
    return { status: status.CONFLICT, message: "invalid email token" }

}



module.exports = {
    signUp, signIn, verifyEmail
}