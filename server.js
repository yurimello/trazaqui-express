// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const dbConnection = mongoose.connect('mongodb://trazaqui:master01@ds159237.mlab.com:59237/trazaqui-express').connection;
// const connection = mongoose.connect('mongodb://localhost/test').connection;

dbConnection.on('error', console.log)

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// ROUTES FOR API
// =============================================================================

// middleware to use for all requests
app._router.use(function(req, res, next){
  // do loggin
  console.log('Request get');
  next();
})

app._router.get('/', function(req, res){
  res.json({message: 'Express Hello'});
})

// CONTROLLERS FOR API
// =============================================================================
fs.readdirSync('./app/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./app/controllers/' + file);
    route.controller(app);
  }
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
