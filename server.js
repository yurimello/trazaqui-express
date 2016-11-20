// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan')

const config = require('./config')
const routes = require('./routes');

const port = process.env.PORT || 3000;
const enviroment = process.env.ENV || 'development'

let controllers = {}

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Use morgan for logging
app.use(morgan('combined'));


// ROUTES FOR API
// =============================================================================



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
console.log("Express server listening on port %d in %s mode", port, enviroment);
