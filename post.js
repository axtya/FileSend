var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var mysql = require('mysql');
var S = require('string');
var mkdirp = require('mkdirp');

function validate (usr,pass,confirm) {

	var r = 0;

	if (usr.length < 6) {r = -1;}
	if (pass.length < 8) {r = -1;}
	if (pass != confirm) {r = -1;}

	return r;
}

exports.run = function (app,connection) {


app.post('/signup', function (req, res) {

console.log (req.body.username);
console.log (req.body.password);

		var query = 'INSERT INTO users SET ?;';
		var exist = 'SELECT * FROM users WHERE username = ?'


			connection.query(exist,[req.body.username],function (err, rows, fields) { 
		
				if (validate(req.body.username,req.body.password,req.body.confirm) == -1) {

					res.send ('The username and/or password does not meet guidlines. <a href="javascript:history.back()">Go Back</a>');

				}

				else if (rows[0] == undefined) { 			

					var newuser = {

						username: req.body.username,
						password: req.body.password,
					};

					connection.query(query,[newuser],function (err, rows, fields) { 

						if (err) { res.send ('error adding to database: ' + err); } 

						else {


							mkdirp(__dirname + '/database/' + newuser.username, function(err) { 
							});

							mkdirp(__dirname + '/database/' + newuser.username + '/buffer', function(err) { 
							});

							res.redirect('/login');

					
						}
					
					});


				}


				else {

					res.send ('This username already exists, please choose another. <a href="javascript:history.back()">Go Back</a>');

				}


});
});

app.post('/login', function (req, res) {


var exist = 'SELECT * FROM users WHERE username = ? AND password = ?'


			connection.query(exist,[req.body.username,req.body.password],function (err, rows, fields) { 
		
				if (rows[0] == undefined) {

					res.send ('this login is incorrect. <a href="javascript:history.back()">Go Back</a>')

				}

				else {

					login = req.body.username;
					console.log ('user logged in as: ' + login);
					res.send ('Logged in!!!');

					req.session.user = req.body.username

					console.log (req.session.user);

					req.session.save();



				}

			});


});




};