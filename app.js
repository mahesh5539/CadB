
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mastermenu = require('./routes/mastermenu');
var cookieParser = require('cookie-parser');
var session= require('express-session');
var bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'cadb007',
		 resave: true,
		    saveUninitialized: true
}));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', user.index);
app.get('/signin', user.signin);
app.get('/signup', user.signup);
app.get('/users', user.list);
app.get('/navigate', user.navigate );
app.get('/home', mastermenu.home);
app.get('/menu', mastermenu.menu);
app.get('/galary', mastermenu.galary); 
app.get('/aboutus', mastermenu.aboutus);

//user login and signup
app.post('/usersignin',user.usersignin);
app.post('/usersignup',user.usersignup);
app.get('signedIn', user.successSignin);
app.get('/failureSignin', user.failureSignin);

//user search for product

//user add product to card

// user place order

// user views order

// user updates recent order

// user cancel recent order
 
// Admin get notification of new order

//Admin proceed with order

//Admin deliver the order



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
