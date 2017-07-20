const dgram = require('dgram');
const fs = require("fs");
const server = dgram.createSocket('udp4');
var sd = require('silly-datetime');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '59647813aaa48.sh.cdb.myqcloud.com',
    user: 'test_user',
    password: 'Jinx0007',
    port: '15955',
    database: 'test',
});

server.on('error', (err) => {
    console.log(`服务器异常：\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    try {
        msg = buffToStr(msg)
        msg = getJson(msg);
        if('48'==msg.type&&'30'==msg.method)
        insertIoT(msg,function (data) {
            if(data){
                var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                msg = JSON.stringify(msg)+'----'+time+'\n';
                fs.appendFile('log.txt', msg, 'utf8', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log(`服务器收到状态：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
            }
        });
    }catch (e){
        console.log('服务器接收出错:'+e);
    }

});

server.on('listening', () => {
    const address = server.address();
    console.log(`服务器监听 ${address.address}:${address.port}`);
});

function buffToStr(buff) {
    let hex_str = '';
    for (let i = 0; i < buff.length; i++) {
        let val = buff[i].toString(16);
        if (val.length == 1) {
            val = '0' + val;
        }
        hex_str = hex_str + val;
    }
    return hex_str;
}

function getJson(msg) {
    var mac = '', type = '', method = '', value = '';
    for (var i = 0; i < 16; i++) {
        mac += msg[i];
    }
    for (var i = 16; i < 18; i++) {
        type += msg[i];
    }
    for (var i = 20; i < 22; i++) {
        method += msg[i];
    }
    for (var i = 24; i < 26; i++) {
        value += parseInt(msg[i]);
    }
    return {mac: mac, type: type, method: method, value:parseInt(value)};
}

function insertIoT(obj,callback){
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

server.bind(5983);