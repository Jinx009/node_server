/**
 * Created by jinx on 7/7/17.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '56f34b014db7d.sh.cdb.myqcloud.com',
    user: 'test_user',
    password: 'Jinx0007',
    port: '5492',
    database: 'base',
});
module.exports = {
    /**
     * 获取数据
     * @returns {string}
     */
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