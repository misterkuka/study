'use strict'
var http = require('http'); //http
var express = require('express'); //express
var fs = require('fs');
var url = require('url');
var mongoose = require('mongoose');
var uc = require('upper-case');
var formidable =require('formidable');
const path = require('path');
var module = require('./module');
var app = express();
var server = http.createServer(app);
let Users = require('module');
const bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


// PASSPORT CONFIG
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.get('*', function(req,res, next){
  res.locals.user = req.user|| null;
  next();
});
// database
mongoose.connect("mongodb://localhost:27017/egz");

// VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/upload', function(req, res){
  fs.readFile('upload.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

app.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files){
    res.write('File uploaded');
    console.log(files.uploader.path);
    res.end();
  });
});

app.get('/', function(req, res){
  res.render('index');
});

server.listen(4000);
