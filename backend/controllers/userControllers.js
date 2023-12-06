// backend/controllers/userControllers.js

import User from '../models/user.js';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ message: 'Email already exists' });
        } else {
          return res.status(400).json({ message: 'Username already exists' });
        }
      }
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password
      });
  
      // Hash password before saving to database
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
  
      await newUser.save();

      res.status(200).json({username, email, token}); // Respond with the newly created user
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Successful login
        res.json({ message: 'Login successful' });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };