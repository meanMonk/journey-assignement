const mongoose = require('mongoose');
module.exports = async () => {
	try {
		const dbUrl =
			process.env.ENV == 'dev'
				? 'mongodb://sahil:sahil1@ds161397.mlab.com:61397/journey-state'
				: 'mongodb://localhost/tour-db';
		await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
		});
		__logger.info('Mongoose connection success...!');
	} catch (err) {
		__logger.error('mongoose connection failed=>', err);
		// console.log('error occurred while connecting to mongodb!', err);
	}
};

/**
 * // before making any call to db make sure db connection healthy
 * 	yes  : go ahead
 * 	no : else put content in file
 * 	reconnection
 * 	connection
 * 	disconnect
 * 	error
 *
 *
 * 	db.on('connection', ()=> {
 *
 * 	})
 *
 */
