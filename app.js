/**
 * Created by jinx on 7/3/17.
 */
var express = require('express')
    , routes = require('./routes/routes')
    , http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
/**
 * 静态文件目录
 */
app.use(express.static('public'));
/**
 * 加载路由配置
 */
routes(app,__dirname);
/**
 * 启动服务器
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("服务器已经启动了" + app.get('port'));
});