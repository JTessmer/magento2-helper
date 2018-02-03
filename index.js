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
if ( !fs.existsSync( path.join(__dirname, 'bin', 'magento') ) ) {
	appMsg.error('* Magento 2 Helper must be executed from the root directory of your Magento 2 installation');
	return;
}

// Allow including modules using the root directory as the base
global.m2Require = function(name) {
	return require( path.join(__dirname, name) );
};


const argv = yargs
	.usage('Usage: $0 [command]')
	.command('*', 'send command to Magento', () => {}, (argv) => {
		withMagento(argv._);
	})
	.help()
	.argv;

// var argv = yargs
//   .usage('usage: $0 <command>')
//   .command('create', 'create a new [project|module]', function (yargs) {
//     argv = yargs
//       .usage('usage: $0 create <item> [options]')
//       .command('project', 'create a new project', function (yargs) {
//         console.log('creating project :)')
//       })
//       .command('module', 'create a new module', function (yargs) {
//         console.log('creating module :)')
//       })
//       .help('help')
//       .updateStrings({
//         'Commands:': 'item:'
//       })
//       .wrap(null)
//       .argv
//     checkCommands(yargs, argv, 2)
//   })
//   .command('list', 'list items in project', function (yargs) {
//     console.log('listing items in project :)')
//   })
//   .help('help')
//   .wrap(null)
//   .argv
