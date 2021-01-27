const express = require("express");
const router = express.Router();

// Load User model
const Baby = require("../../models/Baby");
const User = require("../../models/User");

//routes

router.post('/api/addNewBaby', (req, res) => {

    const today = new Date()
    
    const babyData = {
        baby_first_name: req.body.baby_first_name,
        baby_last_name: req.body.baby_last_name,
        dob: req.body.dob,
        gender: req.body.gender,
        tagNumber: req.body.tagNumber,
        parentUserId: req.body.parentUserId,
        created: today
    }

    Baby.create(babyData)
    .then(babyInfo => {
        res.json(babyInfo);
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/api/getUserId', (req, res) => {

    User.find()
    .then(response => {
        if (response) {
            res.json(response)
        }
        else {
            res.status(400).json({ error: "Users do not exist" });
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })

})
    
module.exports = router;