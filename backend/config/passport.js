const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs'); // Import bcrypt

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Incorrect password' });
            }
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
