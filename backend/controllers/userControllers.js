const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const newUser = new User({
        username,
        email,
        password
      });

      // Hash password before saving to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // Successful login
            res.json({ message: 'Login successful' });
          } else {
            return res.status(400).json({ message: 'Invalid password' });
          }
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
