/**
 * Created by jonesleborn on 17/2/1.
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

// 表单内容
router.get('/data', function (req, res, next) {
    //console.log("data-->" + UserModel.getData());
    //res.send("[{\"name\":\"bootstrap-table\",\"stargazers_count\":\"526\",\"forks_count\":\"122\",\"state\":false,\"description\":\"An extended Bootstrap table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v2 and v3)\"},{\"name\":\"multiple-select\",\"stargazers_count\":\"288\",\"forks_count\":\"150\",\"state\":false,\"description\":\"A jQuery plugin to select multiple elements with checkboxes :)\"},{\"name\":\"bootstrap-show-password\",\"stargazers_count\":\"32\",\"forks_count\":\"11\",\"state\":false,\"description\":\"Show/hide password plugin for twitter bootstrap.\"},{\"name\":\"blog\",\"stargazers_count\":\"13\",\"forks_count\":\"4\",\"state\":false,\"description\":\"my blog\"},{\"name\":\"scutech-redmine\",\"stargazers_count\":\"6\",\"forks_count\":\"3\",\"state\":false,\"description\":\"Redmine notification tools for chrome extension.\"}]");
    var d = domain.create();

    d.on('error', function (error) {
        console.log('Error caught by domain:', error);
    });

    d.run(function () {
        process.nextTick(function () {
            PropertyModel.getData().then(function (property) {
                console.log(property);
                res.status(200).send({
                    property: property
                });
            }).catch(next);
        });
    });
});

// 新增数据
router.post('/edit', function (req, res) {

    console.log(req.body.name);
    console.log(req.body.password);

    var user = {
        name: req.body.name,
        password: req.body.password
    };

    UserModel.create(user).catch(function (e) {
        console.log(e);
    });
});

// 根据id查询
router.get('/:id', function (req, res) {
    console.log(UserModel.getUserById(req.body.id));
});

// 导出Excel
router.get('/doExport', function (req, res) {
    console.log("d")
    var conf = {};
    conf.stylesXmlFile = "styles.xml";
    conf.name = "mysheet";
    conf.cols = [{
        caption: 'string',
        type: 'string',
        beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
        },
        width: 28.7109375
    }, {
        caption: 'date',
        type: 'date',
        beforeCellWrite: function () {
            var originDate = new Date(Date.UTC(1899, 11, 30));
            return function (row, cellData, eOpt) {
                if (eOpt.rowNum % 2) {
                    eOpt.styleIndex = 1;
                }
                else {
                    eOpt.styleIndex = 2;
                }
                if (cellData === null) {
                    eOpt.cellType = 'string';
                    return 'N/A';
                } else
                    return (cellData - originDate) / (24 * 60 * 60 * 1000);
            }
        }()
    }, {
        caption: 'bool',
        type: 'bool'
    }, {
        caption: 'number',
        type: 'number'
    }];
    conf.rows = [
        ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        ["e", new Date(2012, 4, 1), false, 2.7182],
        ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
        ["null date", null, true, 1.414]
    ];
    var result = excelExport.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    // res.status(200).end(result, 'binary');
    fs.writeFile('book.xlsx', result, {'flag': 'w'});
    res.download('/', 'book.xlsx');
});

// 下载测试
router.get('/download', function (req, resp, next) {
    /*
     try {
     var realPath = path.resolve('.') + '/public';
     console.log(realPath);
     var file = realPath + '/excel.xlsx';

     var filename = path.basename(file);
     var mimetype = mime.lookup(file);

     resp.setHeader('Content-disposition', 'attachment;filename=' + filename);
     resp.setHeader('Content-type', mimetype);

     var filestream = fs.createReadStream(file);
     filestream.pipe(resp);
     } catch (e) {
     console.log(e);
     }
     */
    var path = 'public/excel.xlsx';  // 文件存储的路径
    // filename:设置下载时文件的文件名，可不填，则为原名称
    resp.download(path, filename);
});

// 导入excel
router.post('/import', function (req, res) {
    //创建上传表单
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置上传目录
    form.uploadDir = 'public/upload/';
    form.keepExtensions = true;
    //文件大小
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = /\.[^\.]+/.exec(files.file.name);
        var ext = Array.isArray(extName)
            ? extName[0]
            : '';
        //console.log(files.file);
        //重命名，以防文件重复
        var avatarName = uuid() + ext;
        //移动的文件目录
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.file.path, newPath);
        //res.send('{ data:success}');

        // todo 读取excel中的数据
        var obj = xlsx.parse(path.resolve('.') + '/' + form.uploadDir + avatarName);
        var sheets = obj;
        // 获取到第一个sheet
        var sheetOne = sheets[0];
        //console.log(obj[0].data);
        // todo 将excel中的数据保存到数据库中
        var cnt = obj[0].data.length;
        // 获取表格有几列
        var rowsCnt = sheetOne.data[0].length;
        // 读取表格中的内容
        if (cnt - 1 > 0) {
            var datas = sheetOne.data;
            for (var i = 1; i < cnt; i++) {
                var rows = datas[i];
                // 将每一行的数据保存到对象中
                var property = {};
                property.borrowerName = rows[0];
                property.loanCode = rows[1];
                property.moneyType = rows[2];
                property.loanMoney = rows[3];
                property.giveMoney = rows[4];
                property.giveSpecialMoney = rows[5];
                property.moneyRate = rows[6];
                property.moneyRateAdjustMethod = rows[7];
                property.loadDate = new Date(1900, 0, rows[8]).toLocaleString();
                property.loadEndDate = new Date(1900, 0, rows[9]).toLocaleString();
                property.loadPaybackDate = new Date(1900, 0, rows[10]).toLocaleString();
                property.loadPaybackMethod = rows[11];
                property.loadType = rows[12];
                property.loadVoucher = rows[13];
                property.guaranteeContractCode = rows[14];
                property.guaranteeStaffValue = rows[15].toString();
                property.handlePlace = rows[16];
                property.handlePeople = rows[17];
                property.interest = new Date(1900, 0, rows[18]).toLocaleString();
                property.lastPayInterestDate = new Date(1900, 0, rows[19]).toLocaleString();
                property.nextPayInterestDate = new Date(1900, 0, rows[20]).toLocaleString();
                property.interestCount = rows[21];
                PropertyModel.create(property).catch(function (e) {
                    console.log(e);
                });
            }
        }
        res.redirect('/property');
    });
});


module.exports = router;