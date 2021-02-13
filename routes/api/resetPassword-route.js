const crypto = require("crypto");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const nodemailer = require("nodemailer")
const dotenv = require("dotenv");
dotenv.config();

// Load User model
const User = require("../../models/User");

router.post('/api/resetPassword', (req, res) => {

   const token = crypto.randomBytes(20).toString('hex');

    const tokenData = {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
    }

   User.findOneAndUpdate({
        email:req.body.email
    }, tokenData, {new :true, upsert: true})
    .then(response => {
        console.log("success")
        res.json(response)
    })
    .catch(err => {
        res.send('error: ' + err);
    }) 
       
    let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: process.env.RESETEMAIL,
            pass: process.env.RESETPASSWORD
        } 
       
    }); 

    const host = req.get('host')

    let mailDetails = { 
        from: 'baby.logger.app.info@gmail.com', 
        to: req.body.email,
        subject: 'Baby Logger: Link to Reset Password', 
        text: 
            `Hello ${req.body.first_name}, \n\n`
            + "Your are receiving this email because you have requested the reset of your password. \n\n"
            + "Please click on the following link to proceed: \n\n"
            + `${host}/reset/${token} \n\n`
            + "If you have not requested this, please ignore. \n\n"
            + "Thank you! \n\n"
            + "Baby Logger Development Team. :) "
    }; 

    mailTransporter.sendMail(mailDetails, function (err,data){
        if(err){
            console.log(err)
        } else {
            console.log("email has been sent successfully log is available: " + data)
        }
    })

})

router.get("/reset/:token", (req,res) => {
    return res.send(req.params.token)
})

router.put("/api/updateUser", (req, res) => {

    const updateUserData = {
        email: req.body.email,
        password: req.body.password
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) throw err;
        updateUserData.password = hash

    User.findOneAndUpdate({email:req.body.email}, updateUserData,
        {new :true, upsert: true} )
        .then(response => {
            console.log("success")
            res.json(response)
        })
        .catch(err => {
            res.send('error: ' + err);
        }) 
    })
})

module.exports = router;