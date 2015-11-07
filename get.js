var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

exports.run = function (app,connection) {


var mysql = require('mysql');

app.get('/', function (req, res) {
  
  console.log ('someone tried to get the homepage');

  res.sendFile(__dirname + '/views/index.html');

  console.log (req.session.username);


});

app.get('/signup', function (req, res) {
  
    res.sendFile(__dirname + '/views/signup.html');

});

app.get ('/login', function (req, res) {

	res.sendFile (__dirname + '/views/login.html');

});

app.get ('/user/:username', function (req, res) {

	var user = req.session.user;
	var username = req.params.username;

	if (user == username) {

	fs.readFile(__dirname + "/database" + user + "/inbox/inbox.txt", "utf8", function (error, data){

	});

	res.send ('Welcome user ' + user + " !");

	}

	else {

		res.send ('This is not the user you are logged in as. Please login');
	}

});

};