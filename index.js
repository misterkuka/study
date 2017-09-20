'use strict'
const express = require('express');
const routes = require("./routes/api");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


// setting up express app
const app = express();

//connect to mongo
mongoose.connect("mongodb://localhost/random");
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// ROUTES
app.use('/api', routes);

// error handler
app.use(function(err, req, res, next) {
  res.redirect("/");
});

// VIEV ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// routes
app.get('/', function(req, res) {
  res.render('index');
});

// listen for requests

app.listen(4000, function() {
  console.log('listening to port 4000');

});
