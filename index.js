#!/usr/bin/env node
'use strict';

const path	= require('path');
const fs	= require('fs');
const yargs	= require('yargs');
const { withMagento } = require('./helpers/util');

// Helper Utilities
const appMsg = require('./helpers/appMsg');
const config = require('./helpers/config');

// Make sure we have configurations set
if ( !config.get('hasSetDefaults') ) {
	config.setDefaults();
}

// Ensure the user is in their M2 Root directory
// We can ignore this in debug mode
if (
	!config.get('debugMode') &&
	!fs.existsSync( path.join(__dirname, 'bin', 'magento') )
) {
	appMsg.error('* Magento 2 Helper must be executed from the root directory of your Magento 2 installation');
	return;
}

// Allow including modules using the root directory as the base
global.m2Require = function(name) {
	return require( path.join(__dirname, name) );
};


//===== Command Handling =====//
const argv = yargs
	.usage('Usage: $0 [command]')

	//----- Grunt Commands -----//
	.command( require('./modules/grunt/exec') )
	.command( require('./modules/grunt/less') )
	.command( require('./modules/grunt/exec-less') )

	//----- Unhandled Commands -----//
	.command('* [command]', 'Send command to Magento', () => {}, (argv) => {
		withMagento(argv._);
	})
	.help()
	.argv;
