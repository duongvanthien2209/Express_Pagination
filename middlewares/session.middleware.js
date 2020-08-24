// Models
const Session = require('../models/Session.model');

module.exports.checkSession = async(req,res,next) => {
    let { sessionId } = req.signedCookies;

    if(!sessionId) {
        // let id = shortid.generate();
        // db.get('sessions').push({ id, books: [] }).write();
        try {
            let session = new Session();
            await session.save();

            res.cookie('sessionId', session._id, { signed: true });
            next();
            return;
        } catch (error) {
            res.send('Có lỗi xảy ra');
            return;   
        }
    }

    // let session = db.get('sessions').find({ id: sessionId }).value();
    try {
        let session = await Session.findById(sessionId);
        if(!session) {
            throw new Error();
        }
        res.locals.session = session;
    } catch (error) {
        res.send('Có lỗi xảy ra');
        return;
    }
    next();
}