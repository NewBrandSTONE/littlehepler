/**
 * Created by jonesleborn on 17/2/10.
 */
var User = require('../lib/mongo').User;

module.exports = {
    // 注册用户
    create: function create(user) {
        return User.create(user).exec();
    },
    getUserById: function (userId) {
        return User
            .findOne({_id: userId})
            .exec();
    },
    getData: function () {
        return User
            .find({})
            .addCreatedAt()
            .sort({_id: -1})
            .exec();
    }
};