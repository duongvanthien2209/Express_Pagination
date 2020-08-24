const mongoose = require('mongoose');
const schema = mongoose.Schema({
    email: String,
    name: String,
    password: String,
    avatar: { type: String, default: 'https://picsum.photos/200' },
    wrongCount: { type: Number, default: 0 },
    isAdmin: Boolean,
    shopId: String
});

const User = mongoose.model('User', schema, 'users');
module.exports = User;