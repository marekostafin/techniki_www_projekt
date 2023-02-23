const express = require('express');
const router = express.Router();
const {db} = require("../controllers/dbController");
let errors = [];

router.get('/', function(req, res, next) {
    res.render('signup', {passErrors: ''});
});

router.post('/', async function (req, res, next) {
    if (req.body.login !== "" && req.body.password !== "" && req.body.email !== "") {
        if (req.body.password !== req.body.confirmPassword) {
            errors.push("Passwords do not match.\n");
        }
        await db.query('SELECT * FROM Users WHERE username="' + req.body.login + '";', async (error, data) => {
            console.log(data)
            if (data.length > 0) {
                await errors.push("Username is already taken.\n");
            }
        });

        await db.query('SELECT * FROM Users WHERE email="' + req.body.email + '";', async (error, data) => {
            if (data.length > 0) {
                await errors.push("Email is already used.\n");
            }
        });

        if (errors.length === 0) {
            console.log("TEST TEST TEST")
            console.log(errors)
            const sql2 = 'INSERT INTO Users VALUES(null, "' + req.body.login + '", "' + req.body.password + '", "' + req.body.email + '");';
            db.query(sql2, (error, data) => {
                res.redirect('/login');
            });
        } else {
            console.log("TEST TEST TEST")
            console.log(errors)
            res.render('signup', {passErrors: errors});
            errors.length = 0;
        }
    } else {
        res.redirect("/signup");
    }
});



module.exports = router;
