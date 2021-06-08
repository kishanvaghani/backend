const router = require('express').Router();
const connection = require('../connection');
router.post('/', (req,res,next)=>{
    const {u_id,name,message,time} = req.body;
    if(!name || !u_id || !message) { return res.send(false)}
    const insertMessage = `INSERT INTO chats ( name, message,u_id) VALUES ("${name}","${message}","${u_id}")`;
    connection.query(insertMessage,(err, rows,fields)=>{
        !err ? res.send(rows) : res.send({ err });
    })
})

router.get('/getChat', (req,res,next)=>{
    // const findMail = `SELECT * FROM sub_email WHERE email = ?`;
    connection.query('SELECT * FROM chats', (err, results, fields) => {
        // console.log(results);
        !err ? res.json(results) : res.json({ err });
    });
})


module.exports = router;