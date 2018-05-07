var express = require('express');
var router  = express.Router();
var WikipediaAPI = require('../utils/wikipedia');

router.get('/', function(req, res) {
    if (req.query.date) {
        var offset = req.query.offset || 0;
        WikipediaAPI.searchByDate(req.query.date, offset).then(data => {
            res.status(200).json(data);
        });
    } else {
        res.status(400).json({error: 'Invalid date'});
    }
});

module.exports = router;