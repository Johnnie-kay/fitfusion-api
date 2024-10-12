const { writeFileSync, appendFileSync, existsSync, readFileSync } = require('node:fs');
const bcrypt = require('bcryptjs');
const prisma = require('prisma')
const { prismaClient } = require('../helpers/prisma')

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
        const db = readFileSync(dbPath, 'UTF-8');
        const users = db.split('\n');

        console.log('Db Content: ', email);
        let foundUser = null;
        for (const user of users) {
            const parsedUser = JSON.parse(JSON.stringify(user));
            console.log('found user email: ', parsedUser.email)
            if (Object.values(parsedUser).includes(email.toString())) {
                console.log('parsed user: ', parsedUser)
                console.log('user is found: ', parsedUser);
                foundUser = parsedUser;
                break;
            }
        }
        return foundUser;
    } catch (error) {
        console.log('Error signing in: ', error)
    }
}

module.exports = {
    signUp, signIn
}