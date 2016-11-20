// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();     // get an instance of express router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)

router.get('/', function(req, res){
  res.json({message: 'Express Hello'});
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
