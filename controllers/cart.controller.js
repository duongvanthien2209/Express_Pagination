// Models
const Book = require('../models/Book.model');
const Session = require('../models/Session.model');
const Transaction = require('../models/Transaction.model');

module.exports.getIndex = async (req, res) => {
    let { session } = res.locals;

    try {
        let books = await Promise.all(session.books.map(item => {
            return Book.findById(item);
        }));
        res.render('cart/index', { books });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
}

module.exports.addBook = async (req, res) => {
    let { bookId } = req.params;
    let { session } = res.locals;

    if (!session || !bookId) {
        res.send('Có lỗi xảy ra');
        return;
    }

    try {
        await Session.findByIdAndUpdate(session._id, { $addToSet: { books: bookId } });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // db.get('sessions').find({ id: session.id }).assign({ books: [...session.books, bookId] }).write();
    res.redirect('back');
}

module.exports.complete = async (req, res) => {
    let { session, user } = res.locals;

    if (!session || !user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    try {
        await Promise.all(session.books.map(item => {
            let transacion = new Transaction({ userId: user._id, bookId: item });
            return transacion.save();
        }));

        await Session.findByIdAndUpdate(session._id, { $set: { books: [] } });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.redirect('/transactions');
}