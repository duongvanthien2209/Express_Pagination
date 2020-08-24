module.exports.checkCreate = (req, res, next) => {
    let { name, email } = req.body;

    if (name.length > 30) {
        res.render('user/create', { errors: ['Bạn không được nhập quá 30 ký tự'] });
        return;
    }

    next();
}
