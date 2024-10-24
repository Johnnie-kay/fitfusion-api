const nodemailer = require('nodemailer')

const sendEmail = (template, receivers, from, title, body, cc) => {
    try {
        let html = '';
        if (template) {

        }
        transporter.sendMail({
            title,
            text: body,
            to: receivers,
            from: from || process.env.EMAIL_UER
            // html:
        })
    } catch (error) {
        console.log('email error: ', error.message
        )
    }
}

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    // port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_UER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = {
    sendEmail
}