let express = require("express");
var compression = require('compression')
let bodyParser = require('body-parser');
let morgan = require('morgan');
let jwt = require("jsonwebtoken");
let cookieParser = require('cookie-parser');
let cors = require("cors");
const helmet = require('helmet')

let response = require("./libs/response");

var app = express();

app.use(require('express-status-monitor')({
    title: 'Church API Status',
    spans: [{
        interval: 1,            // Every second
        retention: 60           // Keep 60 datapoints in memory
    }, {
        interval: 5,            // Every 5 seconds
        retention: 60
    }, {
        interval: 15,           // Every 15 seconds
        retention: 60
    },
    {
        interval: 60,           // Every 60 seconds
        retention: 60
    }],
}));

// compress all responses
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


module.exports = app;