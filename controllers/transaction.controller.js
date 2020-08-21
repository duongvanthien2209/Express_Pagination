const shortid = require('shortid');
const db = require('../db');

module.exports.getIndex = (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    let transactions = db.get('transactions').find({ userId: user.id }).value() || [];

    res.render('transaction/index', { transactions, user });
}

module.exports.getCreate = (req, res) => {
    let users = db.get('users').value();
    let books = db.get('books').value();
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.render('transaction/create', { users, books, user });
}

module.exports.postCreate = (req, res) => {
    let { user: userId, book: bookId } = req.body;
    let id = shortid.generate();

    db.get('transactions').push({ id, userId, bookId, isComplete: false }).write();
    res.redirect('/transactions');
}

module.exports.delete = (req, res) => {
    let { id } = req.params;

    db.get('transactions').remove({ id }).write();
    res.redirect('back');
}

module.exports.complete = (req, res) => {
    let { id } = req.params;

    let transaction = db.get('transactions').find({ id }).value();

    if (!transaction) {
        let transactions = db.get('transactions').value();

        console.log('Done');
        res.render('transaction/index', { errors: ['Transaction không tồn tại'], transactions });
        return;
    }

    db.get('transactions').find({ id }).assign({ isComplete: true }).write();
    res.redirect('back');
}