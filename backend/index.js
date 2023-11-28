// backend/index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./config/keys');
const User = require('./models/user');
const UserController = require('./controllers/userControllers');

const app = express();

app.use(cors()); 
// This allows requestis from any origins (I was getting errors due to CORS 
// (Cross-Origin Resource Sharing) policy restrictions. This issue occurs when the frontend, 
// hosted at http://localhost:3000, attempts to make requests to the backend at 
// http://localhost:5000 and the backend doesn't allow such requests due to security restrictions.)
// Found this by doing inspect element on the Sign Up button and seeing Network
//
// app.use(cors({
//  origin: 'http://localhost:3000', // Allow requests from this origin
//  credentials: true, // Include credentials (if any)
// }));

// Connect to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use(passport.initialize());

// Register route
app.post('/api/users/register', UserController.register);

// Login route
app.post('/api/users/login', UserController.login);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
