const { restart } = require("nodemon");

const shortid = require('shortid');
const db = require('../db');

module.exports.checkSession = (req,res,next) => {
    let { sessionId } = req.signedCookies;

    if(!sessionId) {
        let id = shortid.generate();
        db.get('sessions').push({ id, books: [] }).write();
        res.cookie('sessionId', id, { signed: true });
        next();
        return;
    }

    let session = db.get('sessions').find({ id: sessionId }).value();

    if(!session) {
        res.send('Có lỗi xảy ra');
        return;
    }

    res.locals.session = session;
    next();
}