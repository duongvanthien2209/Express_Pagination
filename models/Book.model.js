const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: String,
    description: String,
    image: { type: String, default: 'https://picsum.photos/200' },
    shopId: String
});

const Book = mongoose.model('Book', schema, 'books');
module.exports = Book;