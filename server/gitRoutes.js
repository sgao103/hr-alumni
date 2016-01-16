var express = require('express');
var router = express.Router();
var passport = require('passport');
var userController = require('./users/userController.js')
var GithubStrategy = require('passport-github2').Strategy;

router.get('/github',
    passport.authenticate('github', {
        scope: ['user', 'user:email', 'read:org']
    }),
    function(req, res) {
        // place where github authentication should occur based on certain inputs
        //passport.authenticate('github', { scope: [ 'user:email' ] }));
    });

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    })
    ,function(req, res) {
        var data= {
            body: req.user,
            fromGitHub: true
        }
        userController.createProfile(data, res)
        //back end session can be created here
    });



module.exports = router;
