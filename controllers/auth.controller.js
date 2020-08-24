const bcrypt = require('bcrypt');
const sgMail = require('../sendgrid');

// Models
const User = require('../models/User.model');

module.exports.getLogin = (req, res) => {
    res.render('user/login');
}

module.exports.postLogin = async (req, res) => {
    let { email, password } = req.body;
    let errors = [];

    if (!email) {
        errors.push('Bạn chưa nhập email');
    }

    if (!password) {
        errors.push('Bạn chưa nhập mật khẩu');
    }

    if (errors.length > 0) {
        res.render('user/login', { errors, ...req.body });
        return;
    }

    // let user = db.get('users').find({ email }).value();
    try {
        let user = await User.findOne({ email });

        if (!user) {
            throw new Error();
        }

        if (user.wrongCount > 3) {
            let msg = {
                to: user.email,
                from: 'duongvanthienbkhoa@gmail.com',
                subject: 'Cảnh báo đăng nhập',
                text: 'Bạn đã nhập sai tài khoản quá số lần quy định',
                html: '<strong>Tài khoản của bạn đã bị khóa</strong>',
            };

            await sgMail.send(msg);
            res.redirect('back');
            return;
        }

        let result = await bcrypt.compare(password, user.password);

        if (!result) {
            // db.get('users').find({ email }).assign({ wrongLoginCount: user.wrongLoginCount + 1 }).write();
            user.wrongCount = user.wrongCount + 1;
            await user.save();
            res.send('Có lỗi xảy ra');
            return;
        }

        res.cookie('id', user._id, { signed: true });
        res.redirect('/books');
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
}