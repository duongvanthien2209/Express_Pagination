const db = require('../db');
const shortid = require('shortid');

module.exports.getIndex = (req,res) => {
    let { session } = res.locals;
    let books = []

    for(let item of session.books) {
        let book = db.get('books').find({ id: item }).value();
        books.push(book);
    }

    res.render('cart/index', { books });
}

module.exports.addBook = (req,res) => {
    let { bookId } = req.params;
    let { session } = res.locals;

    if(!session || !bookId) {
        res.send('Có lỗi xảy ra');
        return;
    }

    db.get('sessions').find({ id: session.id }).assign({ books: [...session.books, bookId] }).write();
    res.redirect('back');
}

module.exports.complete = (req,res) => {
    let { session, user } = res.locals;
    
    if(!session || !user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    for(let item of session.books) {
        db.get('transactions').push({ id: shortid.generate, userId: user.id, bookId: item }).write();
    }

    db.get('sessions').find({ id: session.id }).assign({ books: [] }).write();
    res.redirect('/transactions');
}