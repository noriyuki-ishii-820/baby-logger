const express = require("express");
const router = express.Router();

// Load User model
const Log = require("../../models/Log");

router.post('/api/addLog', (req, res) => {

    const today = new Date()

    const logData = {
        date: req.body.date,
        time: req.body.time,
        logCategory: req.body.logCategory,
        notes: req.body.notes,
        babyId: req.body.babyId,
        parentUserId: req.body.parentUserId,
        created: today
    }

    Log.create(logData)
    .then(logInfo => {
        res.json(logInfo);
    })
    .catch(err => {
        console.log(err);
    })

})


// get the logs
router.get('/api/getLogs', (req, res) => {
    Log.find()
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})


module.exports = router;