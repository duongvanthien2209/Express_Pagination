const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const db = require('../db');

// Controllers
const bookController = require('../controllers/book.controller');

// Xem tất các sách
router.get('/', bookController.getIndex);

// Thêm sách
router.get('/add', bookController.getCreate);

router.post('/add', bookController.postCreate);

// Update sách
router.get('/:id/update', bookController.getUpdate);

router.post('/:id/update', bookController.postUpdate);

// Xóa sách
router.get('/:id/delete', bookController.delete);

module.exports = router;