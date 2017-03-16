/**
 * Created by jonesleborn on 17/2/7.
 */
$(function () {
    // 初始化表头
    $('#data-grid').bootstrapTable({
        //idField: "_id",
        toolbar: '#toolbar',
        height: getHeight(),
        url: '/property/data',
        pagination: true,
        search: true,
        showRefresh: true,
        width: '100%',
        responseHandler: function (res) {
            return res.property;
        },
        clickToSelect: true,
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
            }, {
                title: '借款人名称',
                field: 'borrowerName',
                align: 'center'
            }, {
                title: '发放贷款合同编号',
                field: 'loanCode',
                align: 'center'
            }, {
                title: '币种',
                width: '100px',
                field: 'moneyType',
                align: 'center'
            }, {
                title: '贷款合同金额（万元）',
                field: 'loanMoney',
                align: 'center'
            }, {
                title: '本笔贷款放款金额（万元）',
                field: 'giveMoney',
                align: 'center'
            }, {
                title: '本笔贷款未偿本金余额（万元）',
                field: 'giveSpecialMoney',
                align: 'center'
            }, {
                title: '本笔贷款现行利率',
                field: 'moneyRate',
                align: 'center'
            }, {
                title: '利率调整方式',
                field: 'moneyRateAdjustMethod',
                align: 'center'
            }, {
                title: '本笔贷款发放时间',
                field: 'loadDate',
                align: 'center'
            }, {
                title: '本笔贷款到期日',
                field: 'loadEndDate',
                align: 'center'
            }, {
                title: '本笔贷款本金偿还期限',
                field: 'loadPaybackDate',
                align: 'center'
            }, {
                title: '付息方式',
                field: 'loadPaybackMethod',
                align: 'center'
            }, {
                title: '贷款种类（信用或保证）',
                field: 'loadType',
                align: 'center'
            }, {
                title: '保证人名称（如有）',
                field: 'loadVoucher',
                align: 'center'
            }, {
                title: '担保合同编号（如有）',
                field: 'guaranteeContractCode',
                align: 'center'
            }, {
                title: '担保物评估价值（如有）',
                field: 'guaranteeStaffValue',
                align: 'center'
            }, {
                title: '办事处',
                field: 'handlePlace',
                align: 'center'
            }, {
                title: '主办人',
                field: 'handlePeople',
                align: 'center'
            }, {
                title: '起息日',
                field: 'interest',
                align: 'center'
            }, {
                title: '上次结息日',
                field: 'lastPayInterestDate',
                align: 'center'
            }, {
                title: '下次应转利息日',
                field: 'nextPayInterestDate',
                align: 'center'
            }, {
                title: '利息金额',
                field: 'interestCount',
                align: 'center'
            }]
    });

    // 保存
    $('#submit').click(function () {
        $.post('/property/edit', {
            name: "asd",
            password: "123"
        }, function (data) {
            alert(data);
        });
    });

    // 导出excel
    $('#exportExcel').click(function () {
        alert('导出Excel');
        //window.open('/property/doExport');
        //window.location = '/property/doExport';
        $.get('/property/doExport', function (data) {
            alert(data);
        });
    });

    // 下载Excel
    $('#downloadExcel').click(function () {
        /*
         $.ajax({
         //data: {info: info, type: type},
         url: '/download/downloadProperty',
         //dataType: 'json',
         cache: false,
         timeout: 5000,
         type: 'get',    // 如果要使用GET方式，则将此处改为'get'
         success: function (data) {
         console.log(data);
         },
         error: function (jqXHR, textStatus, errorThrown) {
         console.log(errorThrown);
         }
         });
         */
        //window.location = '/download/downloadProperty';
        window.open('/download/downloadProperty');
    });
});

function getHeight() {
    return $(window).height() - $('h1').outerHeight(true);
}
