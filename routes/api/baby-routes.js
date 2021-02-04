const express = require("express");
const router = express.Router();

// Load User model
const Baby = require("../../models/Baby");
const User = require("../../models/User");

//routes

// add new baby to the DB
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

// route to collect the user ID of the one currently logged in 
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
    
// get the Baby List
router.get('/api/displayBabies', (req, res) => {
    Baby.find()
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

//delete baby
router.delete("/api/deleteBaby/:id", (req, res) => {

    Baby.findOneAndRemove({
        _id: req.params.id,
    })
        .then(response => {
            console.log("removed successfully")
            res.json(response)
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

//updating a baby

router.put("/api/updateBaby/:id", (req, res) => {

    const BabyData = {
        baby_first_name: req.body.baby_first_name,
        baby_last_name: req.body.baby_last_name,
        dob: req.body.dob,
        gender: req.body.gender,
        tagNumber: req.body.tagNumber,
    }

    Baby.findOneAndUpdate({_id:req.params.id}, BabyData, 
        {new :true, upsert: true} )
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})


module.exports = router;