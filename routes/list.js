var express = require('express');
const {db} = require("../controllers/dbController");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.currentUsername) {
        let books = null;

        const sql = 'SELECT * FROM Books;';
        db.query(sql, (error, data) => {
            books = data;
            console.log(data);
            res.render('list', {books: books, user: req.cookies.currentUsername});
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;