const express = require('express');
const router = express.Router();
const {db} = require("../controllers/dbController");

router.get('/', async function (req, res, next) {
    if (req.cookies.currentUsername){
        db.query('SELECT * FROM Books', (err, row, fields) => {
            let books = row;

            if (err) {
                console.error(err);
            } else if(row) {
                db.query('SELECT * FROM Articles', (error, data) => {
                    let articles = data;

                    if (err) {
                        console.error(err);
                    } else if (data) {
                        res.render('index', {title: "Papyrus", books: books, articles: articles, user: req.cookies.currentUsername});
                    }
                });
            }
        });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie("currentUsername");
    res.redirect('/login');
});

module.exports = router;