// Models
const Book = require('../models/Book.model');

module.exports.getIndex = async (req, res) => {
    let { page } = req.query;
    let limitPage = 20;

    if (!page) {
        // let books = db.get('books').value().slice(0,limitPage);
        try {
            let books = await Book.find().skip(0).limit(limitPage);
            res.render('book/index', { books });
        } catch (error) {
            res.send('Có lỗi xảy ra');
        }
        return;
    }

    try {
        let books = await Book.find().skip((page - 1) * limitPage).limit(limitPage);
        res.render('book/index', { books });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // let start = (page-1)*limitPage;
    // let end = start + limitPage;
    // let books = db.get('books').value().slice(start, end);
}

module.exports.getCreate = (req, res) => {
    let { user } = res.locals;

    if(!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.render('book/create', { user });
}

module.exports.postCreate = async (req, res) => {
    let { title, description } = req.body;
    let { shopId } = req.params;
    // let id = shortid.generate();

    // db.get('books').push({ id, title, description }).write();
    try {
        if (shopId) {
            var book = new Book({ title, description, shopId });
        } else {
            var book = new Book({ title, description });
        }

        await book.save();
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    res.redirect('/books');
}

// Chưa dùng
module.exports.getUpdate = async (req, res) => {
    let { id } = req.params;
    let { user } = res.locals;

    if(!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    try {
        let book = await Book.findById(id);
        res.render('book/update', { book,user });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // let book = db.get('books').find({ id }).value();
}

module.exports.postUpdate = async (req, res) => {
    let { id } = req.params;
    let { title } = req.body;

    try {
        await Book.findByIdAndUpdate(id, { $set: { title } });
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // db.get('books').find({ id }).assign({ title }).write();
    res.redirect('/books');
}

module.exports.delete = async (req, res) => {
    let { id } = req.params;

    try {
        await Book.findByIdAndRemove(id);
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    // db.get('books').remove({ id }).write();
    res.redirect('back');
}