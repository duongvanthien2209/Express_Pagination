// Models
const Shop = require('../models/Shop.model');
const User = require('../models/User.model');
const Book = require('../models/Book.model');

module.exports.getIndex = async (req, res) => { // Có thể có người ko đăng nhập vào coi sản phẩm
    let { user, isShopAdmin } = res.locals;
    let { shopId } = req.params;

    if (!shopId) {
        res.send('Có lỗi xảy ra');
        return;
    }

    try {
        let books = await Book.find({ shopId });

        if (!user) {
            res.render('shop/index', { books });
            return;
        }

        if (isShopAdmin) {
            res.render('shop/index', { books, user, isShopAdmin, shopId });
            return;
        }

        res.render('shop/index', { books, user, shopId });
        return;
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
}

module.exports.getCreate = async (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.render('shop/create', { user });
}

module.exports.postCreate = async (req, res) => {
    let { user } = res.locals;

    if (!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    let { name } = req.body;

    try {
        let shop = new Shop({ name });
        await shop.save();

        await User.findByIdAndUpdate(user._id, { $set: { shopId: shop._id } });
        res.redirect(`/shops/${shop._id}/books`);
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
}