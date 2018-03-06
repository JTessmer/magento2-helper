'use strict';

const DEFAULT_CONFIG = {
	debugMode:			false,
	magentoCmd:			'php',
	magentoBin:			'bin/magento',
	jsPackageManager:	'npm',
	taskRunner:			'grunt',
	defaultVendor:		null,
	defaultTheme:		null,
	modules: [
		'./modules/grunt/setup',
		'./modules/grunt/exec',
		'./modules/grunt/less',
		'./modules/grunt/exec-less',
		'./modules/grunt/watch',
		'./modules/composer/install',
		'./modules/composer/update',
		'./modules/cache/flush',
		'./modules/cache/refresh'
	],
	commonCaches: [
		'config',
		'layout',
		'block_html',
		'full_page'
	]
};

const fs = require('fs'),
	path = require('path');

const filePath = path.join( (process.env.HOME || process.env.USERPROFILE), '.m2helper' );


// Writes the given data to the config file
function writeConfigData(data = {}) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t') );

	return data;
}

// Resets all configurations to default
function setDefaults() {
	writeConfigData(DEFAULT_CONFIG);

	return true;
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

	// Checks for the presence of a config file; creates it with defaults if absent
	ensureConfigFileExists: function() {
		return (fs.existsSync(filePath) ? false : setDefaults());
	},

	// Retrieves the data for the given key
	get: function(key, joinArray) {
		if (!key) {
			throw new Error('get() called without a key!');
		}

		const config = readConfigData();

		return joinArray ? config[key].join(' ') : config[key];
	},

	// Sets the given key to the supplied value
	set: function(key, value) {
		if (!key || !value) {
			throw new Error('set() called with insufficient arguments!');
		}

		const config = readConfigData();

		return writeConfigData({
			...config,
			[key]: value
		});
	},

	// Resets the given key to its default value
	reset: function(key) {
		if (!key) {
			throw new Error('reset() called without a key!');
		}

		const config = readConfigData();

		return writeConfigData({
			...config,
			[key]: DEFAULT_CONFIG[key]
		});
	}
};


module.exports = config;
