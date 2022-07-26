require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const user = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_URL,
    SERVER_URL,
  } = require('../config');
  


passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: `${SERVER_URL}/api/auth/google/callback`,
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
        successRedirect: `${CLIENT_URL}`,
    })
);

router.get('/login/success', (req, res) => {
 
    if (req.user) {
        res.send({ success: true, user: req.user });
    } else res.send({ success: false , nothing:'nothing found'});
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
        req.session=null
        res.redirect(CLIENT_URL);
    });
  });

module.exports = router;