var express = require('express');
//var bodyParser = require('body-parser')
var authRoutes = require('./routes/auth-routes');
var profileRoutes = require('./routes/profile-routes');
var passportSetup = require('./config/passport-setup');
var keys = require('./config/keys');
var mongoose = require('mongoose');

var cookieSession = require('cookie-session')
var passport = require('passport');
var app = express(); 



app.use(cookieSession({
  keys: [keys.session.cookieKey],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//initialize pasport
app.use(passport.initialize());
app.use(passport.session());//another middleware that alters the request object and change the 'user' value that is currently the session id



//connect to mongodb 
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('connected to mongodb');
})


app.set('view engine', 'ejs');
app.use('/auth', authRoutes); 
app.use('/profile', profileRoutes); 

app.get('/', (req, res) => {
    res.render('home', {user:req.user});
})

app.listen(3000, (req, res)=> {
    console.log('app listens for requests on port 3000');
})