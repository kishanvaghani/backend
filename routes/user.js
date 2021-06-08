const router = require('express').Router();
const connection = require('../connection');
router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM userdata', (err, results, fields) => {
        !err ? res.json(results) : res.json({ err });
    });
})

router.post('/userLogin', async function (req, res, next) {

    let { email, pass } = req.body;
    const sql = `SELECT  * FROM userdata WHERE email = ? AND pass = ?`;

    connection.query(sql, [email, pass], (err, rows, fields) => {
        // console.log(Object.keys(rows).length === 0);
        // console.log(type of(rows));
        if (err) throw err;
        else {
            res.send(...rows);
        }
    })
});

router.post('/register', async (req, res, next) => {
    let emp = req.body;
    console.log(emp.mobile);
    let sql = `INSERT INTO userdata (name,email,mobile,pass) VALUES ("${emp.name}", "${emp.email}","${emp.mobile}","${emp.pass}")`;
    try {
        const save = await connection.query(sql);
        res.status(201).send({ msg: 'User Register' });
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;