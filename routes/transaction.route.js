const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const db = require('../db');

// Controllers
const transactionController = require('../controllers/transaction.controller');

// Xem tất cả các transactions
router.get('/', transactionController.getIndex);

// Thêm transaction
router.get('/create', transactionController.getCreate);

router.post('/create', transactionController.postCreate);

// Xóa transactions
router.get('/:id/delete', transactionController.delete);

// Hoàn thành
router.get('/:id/complete', transactionController.complete);

module.exports = router;