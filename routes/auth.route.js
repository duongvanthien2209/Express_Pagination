const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');

// Login
router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

module.exports = router;