/**
 * Created by jonesleborn on 17/2/10.
 */
var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: {type: 'string'}
});

exports.User.index({name: 1}, {unique: true}).exec();// 根据用户名找到用户，用户名全局唯一

exports.Property = mongolass.model('Property', {
    borrowerName: {type: 'string'},
    loanCode: {type: 'string'},
    moneyType: {type: 'string'},
    loanMoney: {type: 'number'},
    giveMoney: {type: 'number'},
    giveSpecialMoney: {type: 'number'},
    moneyRate: {type: 'number'},
    moneyRateAdjustMethod: {type: 'string'},
    loadDate: {type: 'string'},
    loadEndDate: {type: 'string'},
    loadPaybackDate: {type: 'string'},
    loadPaybackMethod: {type: 'string'},
    loadType: {type: 'string'},
    loadVoucher: {type: 'string'},
    guaranteeContractCode: {type: 'string'},
    guaranteeStaffValue: {type: 'string'},
    handlePlace: {type: 'string'},
    handlePeople: {type: 'string'},
    interest: {type: 'string'},
    lastPayInterestDate: {type: 'string'},
    nextPayInterestDate: {type: 'string'},
    interestCount: {type: 'string'}
});

