var express = require('express');
const {db} = require("../controllers/dbController");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.currentUsername) {
        var articles = null;

        var sql = 'SELECT * FROM Articles';
        db.query(sql, (error, data) => {
            articles = data;
            res.render('articles', {articles: articles, user: req.cookies.currentUsername});
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;