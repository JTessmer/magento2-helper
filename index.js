#!/usr/bin/env node
'use strict';

const path				= require('path');
const fs				= require('fs');
const yargs				= require('yargs');
const { withMagento }	= require('./helpers/exec');

// Helper Utilities
const appMsg			= require('./helpers/appMsg');
const config			= require('./helpers/config');

// Create the m2helper folder if it doesn't exist
const m2helperHome		= path.join( (process.env.HOME || process.env.USERPROFILE), 'm2helper' );

if ( !fs.existsSync(m2helperHome) ) {
	fs.mkdirSync(m2helperHome);
}

// Create config file with defaults if none exists
config.populate();

// Ensure the user is in their M2 Root directory
// We can ignore this in debug mode
if (
	!config.get('debugMode') &&
	!fs.existsSync( path.join(process.cwd(), 'bin', 'magento') )
) {
	appMsg.error('* Magento 2 Helper must be executed from the root directory of your Magento 2 installation');
	return;
}

// Allow including modules using the root directory as the base
global.m2Require = function(name) {
	return require( path.join(__dirname, name) );
};


//===== Command Handling =====//

const commandModules = config.get('modules');
// Load configured modules
if (commandModules) {
	commandModules.forEach( (module) => {
		yargs.command( require(module) );
	});
}

const customModules = config.get('customModules');
// Load custom modules
if (customModules) {
	customModules.forEach( (module) => {
		const modulePath = path.join( (process.env.HOME || process.env.USERPROFILE), '.m2helper', 'modules', module );
		yargs.command( require(modulePath) );
	});
}

//----- Unhandled Commands -----//
yargs.command('*', 'Send command to Magento', () => {}, (argv) => {
	withMagento(argv._);
});

yargs.usage('Usage: $0 <command> [arguments]').help();

const argv = yargs.argv;
