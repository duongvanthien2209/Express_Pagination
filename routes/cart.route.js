const express = require('express');
const router = express.Router();

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');

// Controllers
const cartController = require('../controllers/cart.controller');

router.get('/', cartController.getIndex);

// Thêm sách vào giỏ
router.get('/:bookId/addBook', cartController.addBook);

// Thuê tất cả sách
router.get('/complete', authMiddleware.checkLogin, cartController.complete);

module.exports = router;