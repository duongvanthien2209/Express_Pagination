// Models
const Transaction = require('../models/Transaction.model');
const User = require('../models/User.model');
const Book = require('../models/Book.model');

module.exports.getIndex = async (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    try {
        let transactions = await Transaction.find({ userId: user._id });

        res.render('transaction/index', { transactions, user });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // let transactions = db.get('transactions').find({ userId: user.id }).value() || [];
}

module.exports.getCreate = async (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    try {
        let users = await User.find();
        let books = await Book.find();

        res.render('transaction/create', { users, books, user });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
}

module.exports.postCreate = async (req, res) => {
    let { user: userId, book: bookId } = req.body;
    // let id = shortid.generate();

    try {
        let transaction = new Transaction({ userId, bookId });
        await transaction.save();
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // db.get('transactions').push({ id, userId, bookId, isComplete: false }).write();
    res.redirect('/transactions');
}

module.exports.delete = async (req, res) => {
    let { id } = req.params;

    try {
        await Transaction.findByIdAndRemove(id);
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // db.get('transactions').remove({ id }).write();
    res.redirect('back');
}

module.exports.complete = async (req, res) => {
    let { id } = req.params;

    try {
        let transaction = await Transaction.findById(id);

        if (!transaction) {
            let transactions = await Transaction.find();

            res.render('transaction/index', { errors: ['Transaction không tồn tại'], transactions });
            return;
        }

        transaction.isComplete = !transaction.isComplete;
        await transaction.save();
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.redirect('back');
}