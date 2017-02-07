/**
 * Created by jonesleborn on 17/2/1.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('property', {title: 'FFHelper'});
});

module.exports = router;