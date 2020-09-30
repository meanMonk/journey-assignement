const express = require('express');
// load journey model;
const journeyModel = require('../models/journey.model');
const journeyValidator = require('../validators/journey.validators');

// load journey route module;
const journeyRouterModule = (function () {
	const journeyService = require('../services/journey.service')(journeyModel);
	const journeyRoute = express.Router();

	journeyRoute
		.route('/journey')
		.get(journeyService.loadJourneyList)
		.post([journeyValidator, journeyService.createJourney]);
	return journeyRoute;
})();

module.exports = journeyRouterModule;
