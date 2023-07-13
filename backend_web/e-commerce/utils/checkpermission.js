const { user } = require('pg/lib/defaults');
const {unauthorized} = require('../errors');

const checkPermission = (reqUserId,resUserID) => {
    if(reqUserId.role === 'admin' || reqUserId.userId === resUserID.userId){
        return true;
    }
    throw new unauthorized('You are not allowed to do this');
}

module.exports = checkPermission;
