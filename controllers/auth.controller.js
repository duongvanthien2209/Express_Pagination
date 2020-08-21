const shortid = require('shortid');
const db = require('../db');
const bcrypt = require('bcrypt');
const sgMail = require('../sendgrid');

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

    let user = db.get('users').find({ email }).value();

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    if (user.wrongLoginCount > 3) {
        let msg = {
            to: 'thiendragontkt@gmail.com',
            from: 'duongvanthienbkhoa@gmail.com',
            subject: 'Cảnh báo đăng nhập',
            text: 'Bạn đã nhập sai tài khoản quá số lần quy định',
            html: '<strong>Tài khoản của bạn đã bị khóa</strong>',
        };

        try {
            await sgMail.send(msg);
        } catch (error) {
            res.send(error);
            return;
        }

        res.redirect('back');
        return;
    }

    try {
        let result = await bcrypt.compare(password, user.password);

        if (!result) {
            db.get('users').find({ email }).assign({ wrongLoginCount: user.wrongLoginCount + 1 }).write();
            res.send('Có lỗi xảy ra');
            return;
        }

        res.cookie('id', user.id, { signed: true });
        res.redirect('/books');
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
}