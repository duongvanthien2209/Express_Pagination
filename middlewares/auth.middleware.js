const db = require('../db');

module.exports.checkLogin = (req, res, next) => {
    let { id } = req.signedCookies;

    if (!id) {
        res.redirect('/auth/login');
        return;
    }

    let user = db.get('users').find({ id }).value();

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.locals.user = user;
    next();
}