/**
 * Created by jonesleborn on 17/2/1.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('property', {title: 'FFHelper'});
});

router.get('/data', function (req, res) {
    res.send("[{\"name\":\"bootstrap-table\",\"stargazers_count\":\"526\",\"forks_count\":\"122\",\"state\":false,\"description\":\"An extended Bootstrap table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v2 and v3)\"},{\"name\":\"multiple-select\",\"stargazers_count\":\"288\",\"forks_count\":\"150\",\"state\":false,\"description\":\"A jQuery plugin to select multiple elements with checkboxes :)\"},{\"name\":\"bootstrap-show-password\",\"stargazers_count\":\"32\",\"forks_count\":\"11\",\"state\":false,\"description\":\"Show/hide password plugin for twitter bootstrap.\"},{\"name\":\"blog\",\"stargazers_count\":\"13\",\"forks_count\":\"4\",\"state\":false,\"description\":\"my blog\"},{\"name\":\"scutech-redmine\",\"stargazers_count\":\"6\",\"forks_count\":\"3\",\"state\":false,\"description\":\"Redmine notification tools for chrome extension.\"}]");
});

router.post('/edit', function (req, res) {

});

module.exports = router;