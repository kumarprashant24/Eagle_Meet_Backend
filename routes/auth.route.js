const router = require('express').Router();
const passport = require('passport');
const user = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(
    new GoogleStrategy(
        {
            clientID: '911683311399-7ndq0oc584d5v1jjgj7gac0p89bts06s.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: `http://localhost:5000/api/auth/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            // find if a user exist with this email or not

            user.findOne({ email: profile.emails[0].value }, (err, data) => {
                if (data) {
                    // user exists
                    return done(null, data);
                } else {
                    console.log('user created');
                    // create a user
                    user({
                        firstname: profile.name.givenName,
                        lastname: profile.name.familyName,
                        picture_url: profile.photos[0].value,
                        email: profile.emails[0].value,
                        password: null,
                        provider: 'google',
                    }).save((err, data) => {
                        return done(null, data);
                    });
                }
            });
        }
    )
);



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    user
        .findById(id, { password: 0 })
        .exec((err, user) => {
            done(err, user);
        });
});


router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })

);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: `/login/success`,
        successRedirect: `http://localhost:3000`,
    })
);

router.get('/login/success', (req, res) => {
 
    if (req.user) {
        res.send({ success: true, user: req.user });
    } else res.send({ success: false });
});

// router.get('/logout', (req, res) => {
//      req.session = null;
//     req.user = null
//     req.logout();
   
   
//     console.log(req.session);
//     res.redirect('http://localhost:3000');
// });
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
        req.session=null
        res.redirect('http://localhost:3000');
    });
  });

module.exports = router;