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
    res.render('payback', {title: 'FFHelper'});
});

// 表单内容
router.get('/data', function (req, res, next) {
    var d = domain.create();

    d.on('error', function (error) {
        console.log('Error caught by domain:', error);
    });

    d.run(function () {
        process.nextTick(function () {
            PropertyModel.getPageData(req.query.offset, req.query.limit).then(function (payback) {
                console.log(payback);
                res.status(200).send({
                    payback: payback
                });
            }).catch(next);
        });
    });
});

module.exports = router;