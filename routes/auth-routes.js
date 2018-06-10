const router = require('express').Router(); 
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
})


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    //res.send('logging out');
})

// router.get('/google', passport.authenticate(
//     'google', { scope:['profile']
// }));


// router.get('/google/redirect', passport.authenticate('google'), (req, res) => { 
//     //res.send(req.user);
//     res.redirect('/profile');
// })
     
// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router; 

