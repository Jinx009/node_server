/**
 * Created by jinx on 7/3/17.
 */
var _mysql = require('../modules/_mysql');
var _get = require('../modules/_get');
var _post = require('../modules/_post');

module.exports = function (app, _dirpath) {
    /**
     * 强制路由到指定目录html文件
     */
    app.get('/', function (req, res) {
        res.sendFile(_dirpath + "/views/index.html");
    });
    app.get('/get.html', function (req, res) {
        res.sendFile(_dirpath + "/views/get.html");
    });
    app.get('/mysql.html', function (req, res) {
        res.sendFile(_dirpath + "/views/mysql.html");
    });
    app.get('/post.html', function (req, res) {
        res.sendFile(_dirpath + "/views/post.html");
    });
    /**
     * 使用ejs模板
     */
    app.get('/users', function (req, res) {
        res.render('users', {
            title: '用户列表'
        });
    });
    /**
     * REST API
     */
    app.post('/mysql', function (req, res) {
        _mysql.users(function (data) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(data));
            res.end();
        });
    });

    app.get('/get', function (req, res) {
        _get.locations(function (data) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(data));
            res.end();
        });
    });

    app.post('/post', function (req, res) {
        _post.locations(function (data) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(data));
            res.end();
        });
    });
};