const express = require('express');
const router = express.Router();
const {db} = require("../controllers/dbController");

router.get('/', async function (req, res, next) {
    if (req.cookies.currentUsername){
        db.query('SELECT * FROM Books', (err, row, fields) => {
            if (err) {
                console.error(err);
            } else if (row) {
                res.render('index', {title: "Papyrus", books: row, user: req.cookies.currentUsername});
            }
        });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie("currentUsername");
    res.redirect('/login');
});

module.exports = router;