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
const routes = require('./routes');
let controllers = {}

// CONTROLLERS FOR API
// =============================================================================
fs.readdirSync('./app/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    class_name = file.slice(0, -3)
    let controller_class = require('./app/controllers/' + file);
    controllers[class_name] = new controller_class();
  }
});

routes.setup(app, controllers);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
