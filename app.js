require('dotenv').config();
var express = require('express');
const fetch = require('node-fetch');
var createError = require('http-errors');
var hbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var cors = require('cors');

mongoose.connect(process.env.MONGO_CONNECTION, {
	useNewUrlParser: true,
	keepAlive: true,
	useUnifiedTopology: true
})
	.then(x => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch(err => {
		console.error('Error connecting to mongo', err.message);
		throw err;
	});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
	extname: 'hbs',
	defaultView: 'main',
	layoutsDir: path.join(__dirname, 'views')
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));

app.use('/', indexRouter);

// ping
const serverUrl = process.env.API_URL;

setInterval(() => {
    fetch(serverUrl)
        .then(res => console.log(`Pinged ${serverUrl}: ${res.status}`))
        .catch(err => console.error(`Error pinging ${serverUrl}: ${err}`));
}, 20 * 60 * 1000); // per ogni 20 minuti (1200000 ms)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
