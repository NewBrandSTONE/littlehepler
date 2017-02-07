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
        $('#contentframe').attr("src", 'http://www.baidu.com');
    });
    // 本金清单
    $('#principal').click(function () {

    });
    // 付息清单
    $('#interest').click(function () {

    });

});
// 监听浏览器大小变化
$(window).resize(function () {
    if (document.body.clientHeight - cMineSize > cMinHeight) {
        $('#content').height(document.body.clientHeight - cMineSize)
    }
});