const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: ["sfsdfsdfsdfs"]
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);
require('./models/DesktopModel');
require('./models/UserModel');

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const User = mongoose.model('User');
        let user_for_login = await User.findOne({$and: [{name: username}, {password}]});
        if (user_for_login) {
            return done(null, user_for_login);
        }

        return done(null, false)
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
require('./routes/desktopRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendfile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
