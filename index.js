require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const shortid = require('shortid');
const cookieParser = require('cookie-parser');

app.use(express.static("public"));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

// Middlewares
const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

// Routes
const bookRoute = require('./routes/book.route');
const userRoute = require('./routes/user.route');
const transactionRoute = require('./routes/transaction.route');
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const cartRoute = require('./routes/cart.route');

app.use('/users', userRoute);
app.use('/auth', authRoute);

app.use(sessionMiddleware.checkSession);

app.use('/cart', cartRoute);
app.use('/books', bookRoute);

app.use(authMiddleware.checkLogin);

app.use('/transactions', transactionRoute);
app.use('/profile', profileRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});