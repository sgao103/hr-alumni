var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var session = require('express-session');

//github Authentication
require('./config/passportAuth.js')(app);

// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect("mongodb://localhost/hralumnimark2");


require('./middleware.js')(app,express)

app.use(session({
  secret: 'lambo',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
