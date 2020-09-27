const express = require('express');
// load journey model;
const journeyModel = require('../models/journey.model');

// load journey route module;
const journeyRouterModule = (function () {
	const journeyService = require('../services/journey.service')(journeyModel);
	const journeyRoute = express.Router();

	journeyRoute
		.route('/journey')
		.get(journeyService.loadJourneyList)
		.post(journeyService.createJourney);
	return journeyRoute;
})();

module.exports = journeyRouterModule;
