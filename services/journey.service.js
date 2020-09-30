const CircuitBreaker = require('opossum');

const journeyService = (model) => {
	const circuitFn = (req, res, model) => {
		let circuit = new CircuitBreaker(model.save);
		circuit.fallback(() => {
			__logger.error('Mongodb server instance is unavailable!');
		});
		circuit.on('fallback', (err) => {
			__logger.info('write the data to files', req.body);
			//TODO: (Sahil) Can extend this function to write the data to file.
			//  base on config file from env params or better to go with redis client.
		});
		circuit.on('success', () => {
			res.send({
				message: 'journey info has been created!',
			});
			// TOOD: need to improve the way of logging due to time being not spending much time.
			__logger.info(`New document created!`);
			return;
		});
		circuit.fire();
	};

	const createJourney = async (req, res) => {
		try {
			const journey = new model({
				...req.body,
			});

			await journey.save();

			res.send({
				message: 'Journey info created!',
			});

			// save journey to database
			// TODO: circuit breaker function
			// First time i tried to implement need more time to understand the flow so unable to complete.
			// circuitFn(req, res, journey);
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
