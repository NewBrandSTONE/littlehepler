/**
 * Created by jonesleborn on 2017/3/1.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var excelExport = require('excel-export');//关联excel-export模块
var mime = require('mime');
var fs = require('fs');

router.get('/downloadProperty', function (req, res, next) {
    /*
     try {
     var realPath = path.resolve('.') + '/public';
     console.log(realPath);
     var file = realPath + '/excel.xlsx';

     var filename = path.basename(file);
     var mimetype = mime.lookup(file);

     res.setHeader('Content-disposition', 'attachment;filename=' + filename);
     res.setHeader('Content-type', mimetype);

     var filestream = fs.createReadStream(file);
     filestream.pipe(res);
     } catch (e) {
     console.log(e);
     }*/
    var conf = {};
    //conf.stylesXmlFile = "styles.xml";
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
    res.status(200).end(result, 'binary');
});

module.exports = router;