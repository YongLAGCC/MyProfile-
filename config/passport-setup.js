var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const passport = require('passport');
const keys = require('./keys');
const User = require('../models/user-model');


passport.serializeUser((user, done) =>{
    done(null, user.id); 
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then((user)=> {  // by id find user,then done
        done(null, user); 
    })
    
})


passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //callback function, next, send to mongoosedb, findOne...
    console.log(profile);

    // if find, then called currentUser
    User.findOne({googleId:profile.id}).then((currentUser) => {
        if(currentUser) {
            console.log("user is: " + currentUser);
            done(null, currentUser); // then call serilizater

        } else {
            new User({
                username: profile.displayName, 
                googleId: profile.id
            }).save().then((newUser)=>{
                console.log('new user created: '+ newUser);
                done(null, newUser);
            });
        }
    })


   
})
)