// Models
const User = require('../models/User.model');
const { use } = require('../routes/shop.route');

module.exports.checkisShopAdmin = async (req, res, next) => {
    let { shopId } = req.params;
    let { id } = req.signedCookies;

    if (!shopId) {
        res.send('Có lỗi xảy ra');
        return;
    }

    if (id) {
        try {
            let user = await User.findById(id);
            res.locals.user = user;
            if (user.shopId && user.shopId === shopId) {
                res.locals.isShopAdmin = true;
            }
        } catch (error) {
            res.send('Có lỗi xảy ra');
            return;
        }
    }

    next();
}