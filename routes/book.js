const express = require('express');
const {db} = require("../controllers/dbController");
const router = express.Router();


/* GET home page. */
router.get('/:bookId', function(req, res, next) {
    if(req.cookies.currentUsername) {
        let book = null;
        let sql = 'SELECT * FROM Books WHERE Id=' + req.params.bookId + ';';
        db.query(sql, (error, data) => {
            book = data;
            db.query('SELECT * FROM Comments WHERE book='+ req.params.bookId +' ORDER BY id DESC;', (error, data) => {
                let comments = data;
                console.log(req.params.bookId);
                console.log(comments);
                res.render('book', {book: book[0], comments: comments, user: req.cookies.currentUsername});
            });
        });
    } else {
        res.redirect("/login");
    }
});

router.post('/:bookId/addComment/', function(req, res, next) {
    if(req.cookies.currentUsername) {
        const sql = 'INSERT INTO Comments VALUES(null, "'
            + req.cookies.currentUsername +'", '
            + req.params.bookId +', "'
            + req.body.commentBody +'", CURDATE());';
        db.query(sql, (error, data) => {
            res.redirect("/book/"+req.params.bookId);
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;