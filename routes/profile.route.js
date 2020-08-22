const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });

// Controllers
const profileController = require('../controllers/profile.controller');

// Xem thông tin người dùng
router.get('/', profileController.getIndex);

// Cập nhật avatar
router.get('/avatar', profileController.getUpdate);

router.post('/avatar', upload.single('avatar'), profileController.postUpdate);

module.exports = router;