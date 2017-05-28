/**
 * Created by jonesleborn on 2017/4/17.
 */
$(function () {

    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"]
    };

    // 标题初始化
    var navTag = $('#navTag');
    navTag.html("还款计划");

    initBootTable();


    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: "yyyy/M/dd"
    });
});

function getHeight() {
    return $(window).height() - $('h1').outerHeight(true);
}

function initBootTable() {
    $('#data-grid').bootstrapTable({
        clickToSelect: true,
        singleSelect: true,
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
            }],
        onDblClickRow: function (row) {
            console.log(row);
        }
    });
}

function responseHandler(res) {
    //远程数据加载之前,处理程序响应数据格式,对象包含的参数: 我们可以对返回的数据格式进行处理
    //在ajax后我们可以在这里进行一些事件的处理
    return res.payback;
}

function initTable() {
    $('#data-grid').bootstrapTable({
        idField: 'id',
        striped: true,  //表格显示条纹
        pagination: true, //启动分页
        url: '/property/data',
        pageSize: 15,  //每页显示的记录数
        pageNumber: 1, //当前第几页
        pageList: [10, 15, 20, 25],  //记录数可选列表
        search: false,  //是否启用查询
        showColumns: true,  //显示下拉框勾选要显示的列
        showRefresh: true,  //显示刷新按钮
        clickToSelect: true,
        onClickCell: function (field, value, row) {
            console.log(field + value);
            console.log(row);
        }
        ,
        //sidePagination: "server", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        responseHandler: function (res) {
            //远程数据加载之前,处理程序响应数据格式,对象包含的参数: 我们可以对返回的数据格式进行处理
            //在ajax后我们可以在这里进行一些事件的处理
            return res.property;
        }
        ,
        queryParams: function queryParams(params) {   //设置查询参数
            var param = {
                //这里是在ajax发送请求的时候设置一些参数 params有什么东西，自己看看源码就知道了
                pageNo: params.pageNumber,
                pageSize: params.pageSize
            };
            return param;
        }
        ,
        onLoadSuccess: function (data) {  //加载成功时执行
        }
        ,
        onLoadError: function () {  //加载失败时执行
        }
        ,
        height: getHeight(),
        columns: [
            {
                checkbox: true
            },
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
}
