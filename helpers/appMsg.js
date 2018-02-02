'use strict';

const logStyle = {
	reset:			"\x1b[0m",
	variant: {
		bright:		"\x1b[1m",
		dim:		"\x1b[2m",
		underscore:	"\x1b[4m",
		blink:		"\x1b[5m",
		reverse:	"\x1b[7m",
		hidden:		"\x1b[8m",
	},
	foreground: {
		black:		"\x1b[30m",
		red:		"\x1b[31m",
		green:		"\x1b[32m",
		yellow:		"\x1b[33m",
		blue:		"\x1b[34m",
		magenta:	"\x1b[35m",
		cyan:		"\x1b[36m",
		white:		"\x1b[37m",
		crimson:	"\x1b[38m"
	},
	background: {
		black:		"\x1b[40m",
		red:		"\x1b[41m",
		green:		"\x1b[42m",
		yellow:		"\x1b[43m",
		blue:		"\x1b[44m",
		magenta:	"\x1b[45m",
		cyan:		"\x1b[46m",
		white:		"\x1b[47m",
		crimson:	"\x1b[48m"
	}
};

module.exports = {
	// General, configurable message
	log: function(message, options) {
		let config = {};

		if (options) {
			config = {
				v: logStyle.variant[options.v],
				fg: logStyle.foreground[options.fg],
				bg: logStyle.background[options.bg]
			};
		}

		console.log(
			(config.v || '') +
			(config.bg || '') +
			(config.fg || '') +
			'%s' +
			logStyle.reset,
		message);
	},

	// Specific preconfigured message types
	success: function(message) {
		this.log(message, {
			fg: 'green'
		});
	},

	warn: function(message) {
		this.log(message, {
			fg: 'yellow'
		})
	},

	error: function(message) {
		this.log(message, {
			fg: 'red'
		});
	}

};
