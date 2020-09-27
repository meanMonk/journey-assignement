const mongoose = require('mongoose');
module.exports = async () => {
	try {
		await mongoose.connect('mongodb://localhost/tour-db', {
			useNewUrlParser: true,
		});
		__logger.info('Mongoose connection success...!');
	} catch (err) {
		__logger.error('mongoose connection failed=>', err);
		// console.log('error occurred while connecting to mongodb!', err);
	}
};
