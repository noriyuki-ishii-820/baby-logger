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

//delete a log

router.delete("/api/deleteLogs/:id", (req, res) => {

    Log.findOneAndRemove({
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

//updating a log 

router.put("/api/updateLog/:id", (req, res) => {

    const logData = {
        date: req.body.date,
        time: req.body.time,
        logCategory: req.body.logCategory,
        notes: req.body.notes,
    }

    Log.findOneAndUpdate({_id:req.params.id}, logData, 
        {new :true, upsert: true} )
        .then(response => {
            console.log(logData)
            console.log("success")
            res.json(response)
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})


module.exports = router;