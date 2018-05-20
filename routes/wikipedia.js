var express = require('express');
var router  = express.Router();
//var WikipediaAPI = require('../utils/wikipedia');
var WikipediaAPI = require('../utils/mock-wikipedia');

router.get('/', function(req, res) {
    if (req.query.date) {
        var offset = req.query.offset || 0;
        var limit = req.query.limit || 3;
        WikipediaAPI.searchByDate(req.query.date, limit, offset).then(data => {
            res.status(200).json(data);
        });
    } else {
        res.status(400).json({error: 'Invalid date'});
    }
});

module.exports = router;
