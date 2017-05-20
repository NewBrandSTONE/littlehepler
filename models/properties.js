/**
 * Created by jonesleborn on 2017/2/23.
 */
var Property = require('../lib/mongo').Property;

module.exports = {
    // 注册资产信息
    create: function create(property) {
        return Property.create(property).exec();
    },
    getUserById: function (propertyId) {
        return Property
            .findOne({_id: propertyId})
            .exec();
    },
    getData: function () {
        return Property
            .find({})
            .addCreatedAt()
            .sort({_id: -1})
            .exec();
    },
    getPageData: function (currentPage, pageSize) {
        console.log(currentPage + "/" + pageSize);
        return Property
            .find({})
            .skip(Number(currentPage))
            .limit(Number(pageSize))
            .exec(function (err, datas) {
                console.log(datas.length);
            });
    }
};