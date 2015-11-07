var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var mysql = require('mysql');
var session = require('client-sessions');
var randomstring = require("randomstring");

var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'b06892c8247fe6',
  password : '403ca638',
  database : 'heroku_25407be8d611e66'
});

connection.connect();


var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({
	key: 'app.sess',
	secret: randomstring.generate(),
}))



// connection.query('COMMAND', function(err, rows, fields) { //function in response to query });

//require handlers

var post = require ('./post.js');
var get = require ('./get.js');

//other modules

//configs

 app.set('view engine', 'ejs');  //tell Express we're using EJS

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 
	 extended: true

})); 

//run handlers

get.run(app,connection);
post.run(app,connection);

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log ('server is starting up!!!');
  console.log('Example app listening at http://%s:%s', host, port);


});
