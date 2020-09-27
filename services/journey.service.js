const journeyService = (model) => {
	const createJourney = async (req, res) => {
		try {
			const journey = new model({
				...req.body,
			});

			// save journey to database
			const data = await journey.save();
			res.send(data);
			// TOOD: need to improve the way of logging due to time being not spending much time.
			__logger.info(`new document created!`);
		} catch (err) {
			__logger.error(err);
			if (err.code === 11000) {
				// 409: conflict with document
				res.status(409).send({
					message: 'Document already exist!',
				});
			} else {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while creating the journey!',
				});
			}
		}
	};
	const loadJourneyList = async (req, res) => {
		try {
			const data = await model.find({
				['profile.customerId']: req.query.customerId,
			});
			if (!data.length) {
				__logger.info(`Load journey list failed with no data found!`);
				res.status(404).send({
					message: 'No data found!',
				});
			} else {
				res.send({
					data: data,
				});
			}
			return;
		} catch (err) {
			// TODO: can make more improvisation on this to get the appropriate logs.
			__logger.error(`Load journey list failed with `, err);
			res.status(500).send({
				message: err.message || 'Something went wrong!',
			});
			return;
		}
	};

	return {
		loadJourneyList,
		createJourney,
	};
};

module.exports = journeyService;
