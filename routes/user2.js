const router = require('express').Router();
const User= require('../models/User');
const bcrypt = require('bcryptjs')

router.post("/register",async (req,res) =>{

    // checking user email is already in database
    const emailExit = await User.findOne({
        email:req.body.email
    });
    if(emailExit) return res.status(400).send("Email is not valid");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create New USER
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:req.body.password,
    });
    try {
        const saveUser = await user.save(user);
        res.send(saveUser);

    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/login", async (req,res)=>{
    // checking email id from database
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email Is Not Register");
    
    // const validPass= await bcrypt.compare(req.body.password, user.password);
    const pass= req.body.password;
    const validPass = pass.localeCompare(user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    res.send(user);
})

module.exports = router;