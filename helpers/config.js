'use strict';

const fs = require('fs');
const path = require('path');

const SCOPE_GLOBAL = 'global';
const SCOPE_LOCAL = 'local';

// Current Configuration Store
let _configuration = {};

// Determine config file paths
const _configPath = {
	[SCOPE_GLOBAL]: path.join( (process.env.HOME || process.env.USERPROFILE), 'm2helper', '.m2helper' ),
	[SCOPE_LOCAL]: path.join(process.cwd(), '.m2helper')
};


// Checks whether the value is a simple (writable) type
function _valueIsWritable(key) {
	return !(typeof _configuration[key] === 'object');
}

function _loadConfigAsObject(configFilePath) {
	if (!fs.existsSync(configFilePath)) {
		return {};
	}
	return JSON.parse(fs.readFileSync(configFilePath) || '{}');
}

function _writeConfigData(scope, key, value) {
	const configPath = _configPath[scope];

	const currentScopeData = _loadConfigAsObject(configPath);

	// Merge the new values provided with any existing data
	const scopeData = {
		...currentScopeData,
		[key]: value
	};

	// Write to scope config file
	fs.writeFileSync( configPath, JSON.stringify(scopeData, null, '\t') );

	return scopeData;
}

function _resetConfigData(scope, key) {
	const configPath = _configPath[scope];

	const currentScopeData = _loadConfigAsObject(configPath);

	const scopeData = {
		...currentScopeData
	};

	delete scopeData[key];

	// Write to scope config data
	fs.writeFileSync( configPath, JSON.stringify(scopeData, null, '\t') );

	return scopeData;
}


module.exports = {
	populate: function() {
		const defaultConfig = require('../config/defaults');
		const globalConfig = _loadConfigAsObject(_configPath.global);
		const localConfig = _loadConfigAsObject(_configPath.local);

		_configuration = {
			...defaultConfig,
			...globalConfig,
			...localConfig
		};
	},

	// Retrieves the data for the given key, or all config data if specified
	get: function(key, joinArray) {
		if (key === 'all') {
			return _configuration;
		}
		return joinArray ? _configuration[key].join(' ') : _configuration[key];
	},

	set: function(key, value, setGlobal) {
		return _writeConfigData((setGlobal ? SCOPE_GLOBAL : SCOPE_LOCAL), key, value);
	},

	reset: function(key, resetGlobal) {
		return _resetConfigData((resetGlobal ? SCOPE_GLOBAL : SCOPE_LOCAL), key);
	}
};
