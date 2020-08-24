// const db = require('../db');
const cloudinary = require('../cloudinary');

// Models
const User = require('../models/User.model');

module.exports.getIndex = (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.render('user/index', { user });
}

module.exports.getUpdate = (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.render('user/update', { user });
}

module.exports.postUpdate = async (req, res) => {
    let { user } = res.locals;
    let file = req.file;

    if (!file || !user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    try {
        let result = await cloudinary.uploader.upload(file.path, { folder: 'single' });
        // db.get('users').find({ id: user.id }).assign({ avatar: result.secure_url }).write();
        await User.findByIdAndUpdate(user._id, { $set: { avatar: result.secure_url } });
        res.redirect('back');
    } catch (error) {
        res.send(error);
        return;
    }
}

