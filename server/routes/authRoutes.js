// routes/authRoutes.js
const express = require('express');
const { login } = require('../controllers/authController');  // Adjust path

const router = express.Router();

router.post('/login', login);

module.exports = router;
