const shortid = require('shortid');
const db = require('../db');

module.exports.getIndex = (req, res) => {
    let { user } = res.locals;
    let { page } = req.query;
    let limitPage = 20;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    if(!page) {
        let books = db.get('books').value().slice(0,limitPage);
        res.render('book/index', { books, user });
        return;
    }

    let start = (page-1)*limitPage;
    let end = start + limitPage;
    let books = db.get('books').value().slice(start, end);
    res.render('book/index', { books, user });
}

module.exports.getCreate = (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.render('book/create', { user });
}

module.exports.postCreate = (req, res) => {
    let { title, description } = req.body;
    let id = shortid.generate();

    db.get('books').push({ id, title, description }).write();
    res.redirect('/books');
}

module.exports.getUpdate = (req, res) => {
    let { id } = req.params;
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    let book = db.get('books').find({ id }).value();
    res.render('book/update', { book, user });
}

module.exports.postUpdate = (req, res) => {
    let { id } = req.params;
    let { title } = req.body;

    db.get('books').find({ id }).assign({ title }).write();
    res.redirect('/books');
}

module.exports.delete = (req, res) => {
    let { id } = req.params;

    db.get('books').remove({ id }).write();
    res.redirect('back');
}