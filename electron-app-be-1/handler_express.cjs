const getKey = require('./handler_storing.cjs').getKey;
const setKey = require('./handler_storing.cjs').setKey;
const keyUserData = require('./handler_storing.cjs').keyUserData;
const Strategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const mainPage = "/";
const loginPage = "/login";

const expressApp = express();

expressApp.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

expressApp.use(passport.initialize());
expressApp.use(passport.session());

passport.use(new Strategy({
    clientID: '-',
    clientSecret: '-',
    callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

expressApp.get(mainPage, (req, res) => {
    userData = getKey(keyUserData);
    if (userData != undefined) {
        expressApp.isAuthenticated = true;
    }

    if(expressApp.isAuthenticated){
        res.sendFile(__dirname + '/index.html');
    }else{
        res.redirect(loginPage);
    }
});
expressApp.get('/styles', (req, res) => res.sendFile(__dirname + '/styles.css'));
expressApp.get('/renderer_list_ops.js', (req, res) => res.sendFile(__dirname + '/renderer_list_ops.js'));
expressApp.get('/renderer.js', (req, res) => res.sendFile(__dirname + '/renderer.js'));
expressApp.get('/renderer_header.js', (req, res) => res.sendFile(__dirname + '/renderer_header.js'));
expressApp.get('/renderer_content.js', (req, res) => res.sendFile(__dirname + '/renderer_content.js'));
expressApp.get('/renderer_qedit.js', (req, res) => res.sendFile(__dirname + '/renderer_qedit.js'));

expressApp.get(loginPage, (req, res) => res.sendFile(__dirname + '/login.html'));
expressApp.use('/static', express.static(__dirname + "/node_modules/bootstrap/dist/"));

expressApp.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

expressApp.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: mainPage }),
    (req, res) => {
        if (req.isAuthenticated()) {
            setKey(keyUserData, req.user);
            console.log('User information saved to local storage');

            res.redirect(mainPage);
        } else {
            res.redirect(loginPage);
        }
    }
);

const expressPort = process.env.PORT || 3000;
const expressServer = expressApp.listen(expressPort, () => {
    console.log(`Express server running on http://localhost:${expressPort}`);
});

module.exports = {
    expressServer,
    expressPort,
};