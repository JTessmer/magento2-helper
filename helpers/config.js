'use strict';

const fs = require('fs'),
	path = require('path');

const filePath = path.join( (process.env.HOME || process.env.USERPROFILE), '.m2helper' );

// Writes the given data to the config file
function writeConfigData(data = {}) {
	fs.writeFileSync(filePath, JSON.stringify(data) );

	return data;
}

// Resets all configurations to default
function setDefaults() {
	writeConfigData({
		'hasSetDefaults':	true,
		'magentoBin':		'php bin/magento',
		'jsPackageManager':	'npm',
		'defaultTheme':		null
	});
}

// Loads the config file data as a JS object;
function readConfigData() {

	// If the file doesn't exist, we'll create it
	if ( !fs.existsSync(filePath) ) {
		setDefaults();
	}

	return JSON.parse(fs.readFileSync(filePath) || '{}');
}


const config = {
	setDefaults,

	get: function(key) {
		const config = readConfigData();

		if (!key) {
			return config;
		} else if (key in config) {
			return config[key];
		} else {
			return undefined;
		}
	},

	set: function(key, value) {
		const config = readConfigData();

		const newConfig = {
			...config,
			[key]: value
		};

		return writeConfigData(newConfig);
	},

	unset: function(key) {
		const config = readConfigData();

		delete config[key];

		return writeConfigData(config);
	}
};


module.exports = config;
