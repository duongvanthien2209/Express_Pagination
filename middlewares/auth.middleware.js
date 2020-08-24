// const db = require('../db');
// Models
const User = require('../models/User.model');

module.exports.checkLogin = async (req, res, next) => {
    let { id } = req.signedCookies;

    if (!id) {
        res.redirect('/auth/login');
        return;
    }

    // let user = db.get('users').find({ id }).value();
    try {
        let user = await User.findById(id);
        res.locals.user = user;
        next();
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
}