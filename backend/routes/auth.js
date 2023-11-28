// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers.js');

// Register route
router.post('/register', UserController.register);

// Login route
router.post('/login', UserController.login);

module.exports = router;
