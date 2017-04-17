/**
 * Created by jonesleborn on 2017/3/16.
 *
 * 还款计划模块
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var PropertyModel = require('../models/properties');
var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var uuid = require('uuid');
var domain = require('domain');
var excelExport = require('excel-export');//关联excel-export模块
var mime = require('mime');

router.get('/', function (req, res) {
    res.render('property', {title: 'FFHelper'});
});



module.exports = router;