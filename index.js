const express = require('express');
const bodyParser = require('body-parser');
const journeyRoutes = require('./routes/journey.routes');
const winston = require('./config/winston');
const connectMongoose = require('./config/mongoose');
// setup mongo db connections
const port = process.env.PORT || 3000;

const app = express();

// setting up the logger to global to make sure the same instance can be accessible globally.
global.__logger = winston;

connectMongoose();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/health', (req, res) => {
	__logger.info('Health check done!');
	res.send('I am doing good!');
});

app.use('/api', journeyRoutes);

// global error handlers
app.use(function (err, req, res, next) {
	console.log('err', err);
	res.locals.message = err.message;
	res.locals.error = process.env.ENV === 'local' ? err : {};
	__logger.error(
		`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
			req.method
		} - ${req.ip}`,
	);
	res.status(err.status || 500);
	res.render('error');
});

app.listen(port, () => {
	__logger.info(`SERVER RUNNING AT PORT : ${port}`);
});

module.exports = app;
