const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String
});

const Shop = mongoose.model('Shop', schema, 'shops');
module.exports = Shop;