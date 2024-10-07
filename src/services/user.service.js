const { writeFileSync, appendFileSync, existsSync, readFileSync } = require('node:fs');
const dbPath = './db/user.db'
const signUp = async (body) => {
    try {

        body.id = (Math.random() * 10).toString(32).replace('.', '');
        console.log('body ', body)
        const exists = existsSync(dbPath)
        console.log('exists: ', exists);
        if (exists) {
            // append to dbPath 
            appendFileSync(dbPath, '\n' + JSON.stringify(body))
        } else {
            await writeFileSync(dbPath, JSON.stringify(body));
            // console.log('write res: ', writeRes);
        }
        return body;
    } catch (error) {
        console.log('Signup error: ', error.message)
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