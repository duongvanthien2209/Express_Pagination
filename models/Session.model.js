const mongoose = require('mongoose');
const schema = mongoose.Schema({
    books: Array
});

const Session = mongoose.model('Session', schema, 'sessions');
module.exports = Session;