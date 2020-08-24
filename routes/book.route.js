const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const db = require('../db');

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');

// Controllers
const bookController = require('../controllers/book.controller');
const { use } = require('./profile.route');

// Xem tất các sách
router.get('/', bookController.getIndex);

// Chỉ có admin - chủ shop mới có khả năng thêm sửa xóa
router.use(authMiddleware.checkLogin, (req, res, next) => {
    let { user } = res.locals;
    
    if(!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    if(user.isAdmin || user.shopId) {
        next();
    }else {
        res.send('Bạn không được phép thực hiện chức năng này');
        return;
    }
});

// Thêm sách
router.get('/add', bookController.getCreate);

router.post('/add', bookController.postCreate);

// Update sách
router.get('/:id/update', bookController.getUpdate);

router.post('/:id/update', bookController.postUpdate);

// Xóa sách
router.get('/:id/delete', bookController.delete);

module.exports = router;