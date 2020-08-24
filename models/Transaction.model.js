const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userId: String,
    bookId: String,
    isComplete: { type: Boolean, default: false }
});

const Transaction = mongoose.model('Transaction', schema, 'transactions');
module.exports = Transaction;