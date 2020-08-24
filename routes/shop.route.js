const express = require('express');
const router = express.Router();

// Middlewares
const shopMiddleware = require('../middlewares/shop.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const sessionMiddleware = require('../middlewares/session.middleware');

// Controllers
const shopController = require('../controllers/shop.controller');
const bookController = require('../controllers/book.controller');

// Lấy danh sách sách của shop - Check session với những ng chưa đăng nhập
router.get('/:shopId/books', sessionMiddleware.checkSession, shopMiddleware.checkisShopAdmin, shopController.getIndex);

// Kiểm tra đăng nhập
router.use(authMiddleware.checkLogin);

// Tạo shop
router.get('/create', shopController.getCreate);

router.post('/create', shopController.postCreate);

// Thêm sách vào shop
router.get('/:shopId/book/add', shopMiddleware.checkisShopAdmin, (req, res, next) => {
    let { isShopAdmin } = res.locals;

    if (!isShopAdmin) {
        res.send('Bạn không được phép thực hiện chức năng này');
        return;
    }

    next();
},  bookController.getCreate);

router.post('/:shopId/book/add', shopMiddleware.checkisShopAdmin, (req, res, next) => {
    let { isShopAdmin } = res.locals;

    if (!isShopAdmin) {
        res.send('Bạn không được phép thực hiện chức năng này');
        return;
    }

    next();
}, bookController.postCreate);

module.exports = router;