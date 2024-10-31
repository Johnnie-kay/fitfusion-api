const nodemailer = require('nodemailer');
// const hbs = require('nodemailer/-express-handlebars');
const path = require('path');

const sendEmail = (template, receivers, from, title, subject, body, cc, html) => {
    try {

        transporter.sendMail({
            title,
            subject,
            text: body,
            to: receivers,
            from: from || process.env.EMAIL_USER,
            cc: cc,
            html: html
        }).then(res => console.log('email res: ', res));
    } catch (error) {
        console.log('email error: ', error.message
        )
    }
}
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailHost = process.env.EMAIL_HOST;
// console.log('host, user and pass ', emailHost, emailUser, emailPass);

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,                          // SMTP port for secure transport (465 for SSL)
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_UsER,
        pass: process.env.EMAIL_PASS,
    }, tls: {
        rejectUnauthorized: false // In case of self-signed certificates
    }
});

// const handlebarOptions = {
//     viewEngine: {
//         partialsDir: path.join(__dirname, 'templates/partials'),
//         layoutsDir: path.join(__dirname, 'templates'),
//         extname: '.hbs',
//         defaultLayout: false,
//     },
//     viewPath: path.join(__dirname, 'templates'),
//     extName: '.hbs',
// };

// Attach handlebars as a template engine to the transporter
// transporter.use('compile', hbs(handlebarOptions));

module.exports = {
    sendEmail
}