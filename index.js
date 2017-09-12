'use strict'
var http = require('http'); //http
var express = require('express'); //express
var fs = require('fs');
var url = require('url');
var uc = require('upper-case');
var formidable =require('formidable');
var module = require('./module');
var app = express();
var server = http.createServer(app);
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


server.listen(4000);
