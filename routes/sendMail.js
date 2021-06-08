const router = require('express').Router();
const connection = require('../connection');
const transporter = require('../mailConfig');

router.post('/', async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    if (!email) { res.send(false) }
    const findMail = `SELECT * FROM sub_email WHERE email = ?`;
    const insertMail = `INSERT INTO sub_email (email) VALUES ("${email}")`;

    connection.query(insertMail, async (err, rows, fields) => {
        if (err) res.status(400).send(err);
        const mailData = {
            from: 'kishanvaghani400@gmail.com',  // sender address
            to: `${email}`,   // list of receivers
            subject: 'You Subscribed Our Services',
            text: 'That was easy!',
            html: '<b>Hey there! </b> <br> This is our service Regarding to Your Subscription <br/>',
        };
        transporter.sendMail(mailData, function (err, info) {
            if (err) {
                res.send("email not send");
            }
            else {
                res.status(200).json('Email Sent Success');
            }
        });
    });
});


module.exports = router;