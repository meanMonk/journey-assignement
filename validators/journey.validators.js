const Joi = require('joi');
const validateRequest = require('../utils/utils');
const journeyValidator = (req, res, next) => {
	const profileSchema = {
		mobileNumber: Joi.string()
			.required()
			.regex(/^[6789]\d{9}$/)
			.messages({
				'any.required': 'Mobile number is required field!',
				'string.error': 'Invalid mobile number!',
			}),
		customerId: Joi.string().required().messages({
			'any.required': `"customerId" is a required field`,
		}),
	};

	const stateInfo = {
		action: Joi.string()
			.required()
			.allow('CUSTOMER_ONBOARDING_STARTED', 'CUSTOMER_ONBOARDING_COMPLETE')
			.messages({
				'any.required': `"action" is a required field`,
			}),
		journeyStateId: Joi.string().required().messages({
			'any.required': `"journeyStateId" is a required field`,
		}),
		timeinfo: Joi.string().required(),
		formData: Joi.when('action', {
			is: 'CUSTOMER_ONBOARDING_STARTED',
			// TODO:(SAHIL) Can extend it to more generic way as well.
			then: Joi.object({
				dateTime: Joi.string().required().messages({
					'any.required': `"dateTime" is a required field`,
				}),
				disbursementMode: Joi.string().required().messages({
					'any.required': `"disbursementMode" is a required field`,
				}),
				plan: Joi.string().required().messages({
					'any.required': `"plan" is a required field`,
				}),
				interestRate: Joi.string(),
				minimumProcessingFee: Joi.string(),
				tenure: Joi.string(),
			}),
			otherwise: Joi.object({
				dateTime: Joi.string().required().messages({
					'any.required': `"dateTime" is a required field`,
				}),
				disbursementMode: Joi.string().required().messages({
					'any.required': `"disbursementMode" is a required field`,
				}),
				interestRate: Joi.string().required().messages({
					'any.required': `"interestRate" is a required field`,
				}),
				minimumProcessingFee: Joi.string().required().messages({
					'any.required': `"minimumProcessingFee" is a required field`,
				}),
				plan: Joi.string().required().messages({
					'any.required': `"plan" is a required field`,
				}),
				tenure: Joi.string().required().messages({
					'any.required': `"tenure" is a required field`,
				}),
			}),
		}),
	};
	const journeyInfo = {
		journeyId: Joi.string().required().messages({
			'any.required': `"journeyId" is a required field`,
		}),
		journeyName: Joi.string().required().messages({
			'any.required': `"journeyName" is a required field`,
		}),
		journeyState: Joi.array().items(stateInfo),
	};
	const schema = Joi.object({
		profile: Joi.object(profileSchema),
		journeyInfo: Joi.object(journeyInfo),
	});

	validateRequest(req, next, schema);
};

module.exports = journeyValidator;
