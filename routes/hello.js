/**
 * Created by jonesleborn on 17/2/1.

exports.hello = function (req, res) {
    res.send('The time is' + new Date().toString());
}

module.exports =
 */
var express = require('express');
var router = express.Router();

router.get('/hello', function (req, res) {
    res.send('The time is ' + new Date().toString());
});

module.exports = router;