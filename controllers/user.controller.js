const shortid = require('shortid');
const db = require('../db');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
    res.render('user/create');
}

module.exports.postUser = async (req, res) => {
    let { name, email, password } = req.body;
    let id = shortid.generate();

    try {
        password = await bcrypt.hash(password, 10);

        db.get('users').push({ id, name, email, password, wrongLoginCount: 0 }).write();
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.redirect('/books');
}

module.exports.delete = (req, res) => {
    let { id } = req.params;

    db.get('users').remove({ id }).write();
    res.redirect('back');
}