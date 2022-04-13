var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
const cors = require('cors');
const supertokens = require('supertokens-node');
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

var Code = require('./utils/code');
var respond = require('./utils/respond');
var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/employee');
var weatherRouter = require('./routes/weather');
var storeRouter = require('./routes/store');
// var scheduleRouter = require('./routes/schedule');
var evalRouter = require('./routes/eval');
var authRouter = require('./routes/auth');
var app = express();
app.use(cors());

// supertokens setup
supertokens.init({
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_URL
  },
  appInfo: {
    apiDomain: "http://localhost:3000",
    appName: "appName",
    websiteDomain: "http://localhost:3000"
  },
  recipeList: [
    Session.init(),
    EmailPassword.init()
  ]
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('common', { stream: fs.createWriteStream('./log.log', { flags: 'a' }) }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/employee', employeeRouter);
app.use('/weather', weatherRouter);
app.use('/store', storeRouter);
// app.use('/schedule', scheduleRouter);
app.use('/eval', evalRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(Code.HTTP_NOT_FOUND);
  res.json(respond.createErrorRespond(Code.ERROR_API_NOT_FOUND, "API not found", null, Code.HTTP_NOT_FOUND));
});

// error handler
app.use(function (err, req, res, next) {

  console.log(err.message);
  console.log(err.stack);
  res.status(Code.HTTP_INTERNAL_SERVER_ERROR);
  res.json(respond.createErrorRespond(Code.ERROR_INTERNAL_ERROR, "Internal server error", err, Code.HTTP_INTERNAL_SERVER_ERROR));
});

module.exports = app;
