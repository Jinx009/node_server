/**
 * Created by jinx on 7/7/17.
 */
var mysql = require('mysql');
var sd = require('silly-datetime');
var connection = mysql.createConnection({
    host: '59647813aaa48.sh.cdb.myqcloud.com',
    user: 'test_user',
    password: 'Jinx0007',
    port: '15955',
    database: 'test',
});
/**
 * 获取用户数据
 * @returns {string}
 */
module.exports = {
    users: function getUser(callback) {
        var sql = 'SELECT * FROM HOME_USER';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            callback(result);
        });
    }
}

module.exports = {
    insertIoT : function insertIoT(obj,callback){
        var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        var  _addSql = 'INSERT INTO tbl_sensor_operationlog(available,mac,change_time,create_time) VALUES(?,?,?,?)';
        var  _addParams = [obj.value, obj.mac,time,time];
        connection.query(_addSql,_addParams,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            console.log('-------INSERT----------');
            callback(result);
        });
    }

}

/**
 * 查询与删除
 * @type {{selectOrDelete: module.exports._selectOrDelete}}
 */
module.exports = {
    selectOrDelete: function _selectOrDelete(sql,callback) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[saveOrDel ERROR] - ', err.message);
                return;
            }
            callback(result);
        });
    }
}

/**
 * 更新与新增
 * @type {{updateOrInsert: module.exports._updateOrInsert}}
 */
module.exports = {
    updateOrInsert: function _updateOrInsert(sql,params,callback) {
        connection.query(sql,params, function (err, result) {
            if (err) {
                console.log('[updateOrInsert ERROR] - ', err.message);
                return;
            }
            callback(result);
        });
    }
}


function handleDisconnect(connection) {
    connection.on('error', function (err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }
        console.log('Re-connecting lost connection: ' + err.stack);
        connection = mysql.createConnection(connection.config);
        handleDisconnect(connection);
        connection.connect();
    });
}

handleDisconnect(connection);