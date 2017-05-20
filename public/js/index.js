/**
 * Created by jonesleborn on 17/2/6.
 */
const cMineSize = 180;
const cMinHeight = 250;
$(function () {
    $('#content').height(document.body.clientHeight - cMineSize);

    // 初始化每日用款总数的事件
    // 资产包总表
    $('#property').click(function () {
        $('#contentframe').attr("src", '/property');
    });
    // 本金清单
    $('#principal').click(function () {

    });
    // 还款计划
    $('#interest').click(function () {
        //$('#contentframe').attr("src", '/payback');
        window.location.href = "/payback";
    });

});

function showPayBackModule() {
    // 弹出窗口
    $('#PayBackModule').modal('show');
}

// 监听浏览器大小变化
$(window).resize(function () {
    if (document.body.clientHeight - cMineSize > cMinHeight) {
        $('#content').height(document.body.clientHeight - cMineSize)
    }
});