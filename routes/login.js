const express = require('express');
const router = express.Router();
const {db} = require("../controllers/dbController");

router.get('/', function(req, res, next) {
    res.render('login', {title: "Papytus | Login"});
});

router.post('/', function(req, res, next) {
    if(req.body.login !== "" && req.body.password !== "") {
        const sql = 'SELECT * FROM Users WHERE username="'+ req.body.login +'" AND password="'+ req.body.password +'";';
        db.query(sql, (error, data) => {
            if(data.length) {
                res.cookie("currentUsername", data[0].username);
                res.redirect('/');
            } else {
                res.redirect("/login");
            }
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
