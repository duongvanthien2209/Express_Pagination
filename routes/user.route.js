const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const db = require('../db');

// Middlewares
const userMiddleware = require('../middlewares/user.middleware');

// Controllers
const userController = require('../controllers/user.controller');

// Thêm users
router.get('/add', userController.createUser);

router.post('/add', userMiddleware.checkCreate, userController.postUser);

// Xóa user
router.get('/:id/delete', userController.delete);

module.exports = router;