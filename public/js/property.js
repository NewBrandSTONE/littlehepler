/**
 * Created by jonesleborn on 17/2/7.
 */
$(function () {
    /*
     var $result = $('#eventsResult');

     $('#data-grid').on('all.bs.table', function (e, name, args) {
     console.log('Event:', name, ', data:', args);
     })
     .on('click-row.bs.table', function (e, row, $element) {
     $result.text('Event: click-row.bs.table');
     })
     .on('dbl-click-row.bs.table', function (e, row, $element) {
     $result.text('Event: dbl-click-row.bs.table');
     })
     .on('sort.bs.table', function (e, name, order) {
     $result.text('Event: sort.bs.table');
     })
     .on('check.bs.table', function (e, row) {
     $result.text('Event: check.bs.table');
     })
     .on('uncheck.bs.table', function (e, row) {
     $result.text('Event: uncheck.bs.table');
     })
     .on('check-all.bs.table', function (e) {
     $result.text('Event: check-all.bs.table');
     })
     .on('uncheck-all.bs.table', function (e) {
     $result.text('Event: uncheck-all.bs.table');
     })
     .on('load-success.bs.table', function (e, data) {
     $result.text('Event: load-success.bs.table');
     })
     .on('load-error.bs.table', function (e, status) {
     $result.text('Event: load-error.bs.table');
     })
     .on('column-switch.bs.table', function (e, field, checked) {
     $result.text('Event: column-switch.bs.table');
     })
     .on('page-change.bs.table', function (e, number, size) {
     $result.text('Event: page-change.bs.table');
     })
     .on('search.bs.table', function (e, text) {
     $result.text('Event: search.bs.table');
     });
     */
    // 初始化表头
    $('#data-grid').bootstrapTable({
        idField: "id",
        toolbar: '#toolbar',
        height: getHeight(),
        url: '/property/data',
        pagination: true,
        search: true,
        showRefresh: true,
        responseHandler: function (res) {
            console.log(res);
            return res;
        },
        clickToSelect: true,
        columns: [{
            title: 'index',
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, {
            field: 'state',
            checkbox: true,
            rowspan: 1,
            align: 'center',
            valign: 'middle'
        }, {
            title: 'Name',
            field: 'name'
        }, {
            title: 'Stars',
            field: 'stargazers_count'
        }, {
            title: 'Forks',
            field: 'forks_count'
        }, {
            title: 'Description',
            field: 'description'
        }]
    });


});

function getHeight() {
    return $(window).height() - $('h1').outerHeight(true);
}
