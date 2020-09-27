const appRoot = require('app-root-path');
const winston = require('winston');

/**
 @TODO
	As winston by default rotate the logs daily but if size exceeds it will remove existing logs
	 for setting rotation policy we can utilize the winston-logrotate
	 https://www.npmjs.com/package/winston-logrotate	 
*/

const logOptions = {
	file: {
		error: {
			level: 'error',
			filename: `${appRoot}/logs/error.log`,
			handleExceptions: true,
			json: true,
			colorize: false,
			maxsize: 5242880, //5MB,
			maxFiles: 5,
		},
		info: {
			level: 'info',
			filename: `${appRoot}/logs/combined.log`,
			handleExceptions: true,
			json: true,
			colorize: false,
			maxsize: 5242880, //5MB,
			maxFiles: 5,
		},
		debug: {
			level: 'debug',
			filename: `${appRoot}/logs/debug.log`,
			handleExceptions: true,
			json: true,
			colorize: false,
			maxsize: 5242880, //5MB,
			maxFiles: 5,
		},
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: true,
		colorize: true,
	},
};

const logger = new winston.createLogger({
	transports: [
		new winston.transports.File(logOptions.file.info),
		new winston.transports.File(logOptions.file.error),
		new winston.transports.File(logOptions.file.debug),
		new winston.transports.Console(logOptions.console),
	],
	exitOnError: false,
});

winston.stream = {
	write: (message, encoding) => {
		logger.info(message);
	},
};

module.exports = logger;
