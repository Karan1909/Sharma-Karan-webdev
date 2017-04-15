var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport=require('passport');
var cookieParser=require('cookie-parser');
var session=require('express-session');

app.use(session({
    secret: 'this is the secret', // process.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser()); //first express session to be initialized
app.use(passport.initialize());
app.use(passport.session()); //will use express session



// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
require ("./project/app.js")(app);
require ("./assignment/app.js")(app);

// require("./assignment/model/models.server")(app); //now switching to mongoose

require ("./test/app.js")(app);

// require ("./public/lectures-wed/mongo/movies.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);