const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileModel = new Schema({
	mobileNumber: String,
	customerId: {
		type: String,
		unique: true,
	},
});

// Indexing would help us to query the data base on customerId
profileModel.index({ customerId: 1 });

const formDataModel = new Schema({
	dateTime: String,
	disbursementMode: {
		type: String,
		uppercase: true,
	},
	interestRate: String,
	minimummProcessingFee: String,
	plan: {
		type: String,
		uppercase: true,
	},
	tenure: String,
});

const JourneyStateModel = new Schema({
	action: {
		type: String,
	},
	journeyStateId: {
		type: String,
		unique: true,
	},
	timeInfo: String,
	formData: formDataModel,
});

const journeyInfoModel = new Schema({
	journeyId: {
		type: String,
		unique: true,
	},
	journeyName: String,
	journeyState: [JourneyStateModel],
});

const journeyModel = new Schema({
	profile: profileModel,
	journeyInfo: journeyInfoModel,
});

const journeyCol = mongoose.model('Journey_Col', journeyModel);
journeyCol.ensureIndexes((err) => {
	__logger.error(err);
});
module.exports = journeyCol;
