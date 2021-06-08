const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'kishanvaghani400@gmail.com',
            pass: 'kishan@1999',
         },
    secure: false,
    });

module.exports = transporter;
