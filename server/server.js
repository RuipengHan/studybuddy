// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/config'),
    bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


// Create our Express application
var app = express();
// app.use(cors());
app.use(cors({ origin: true }));

// Use environment defined port or 4000
var port = secrets.server.port || 4000;

// Database connection
mongoose.connect(secrets.mongo_connection.uri, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, express.Router());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build'))); // Adjust the path as necessary

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html')); // Adjust the path as necessary
});

// Start the server
var port = secrets.server.port || 4000;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});