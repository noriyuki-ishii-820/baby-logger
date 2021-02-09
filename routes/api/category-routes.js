const express = require("express");
const router = express.Router();

// Load User model
const Category = require("../../models/Category");

router.post('/api/addCategory', (req, res) => {

    const CategoryData = {
        category: req.body.category,
        parentUserId: req.body.parentUserId,
    }

    Category.create(CategoryData)
    .then(logInfo => {
        res.json(logInfo);
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/api/getCategory', (req, res) => {
    Category.find()
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