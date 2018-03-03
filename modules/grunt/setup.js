'use strict';

const fs = require('fs');

const appMsg = m2Require('./helpers/appMsg');
const config = m2Require('./helpers/config');
const { withJsPackages } = m2Require('./helpers/exec');

// Copies the source file to the destination if destination does not exist
function copyFileIfNotExist(src, dest) {

	appMsg.log('✦ Checking for '+dest+'...');

	// If the destination file doesn't exist...
	if ( !fs.existsSync(dest) ) {
		appMsg.warn('  ✗ Not found. Copying sample file.');

		// Try to copy the sample file to the destination
		try {
			fs.copyFileSync(src, dest);
			appMsg.success('  ✔ Copied.');
		}
		catch(error) {
			if (error.code === 'ENOENT') {
				appMsg.error('  ✗ Sample file \''+src+'\' not found. Could not copy.');
				return false;

			} else {
				throw new Error();
			}
		}
	} else {
		appMsg.success('  ✔ Found.');
	}

	return true;
}

module.exports = {
	command: 'setup',
	aliases: ['s'],
	describe: 'Creates new Javscript build config files, then installs node modules using the configured runner',

	builder: (yargs) => {
		yargs.option('use', {
			alias: 'a',
			describe: 'Use the specified package manager instead of the default',
			default: false
		})
	},

	handler: (argv) => {
		appMsg.log('--- Installing Grunt components:');

		// Ensure required files exist
		const packageExists		= copyFileIfNotExist('package.sample.json','package.json-x');
		const gruntfileExists	= copyFileIfNotExist('Gruntfile.js.sample','Gruntfile.js');
		const gruntConfigExists	= copyFileIfNotExist('grunt-config.json.sample','grunt-config.json');

		if (packageExists && gruntfileExists && gruntConfigExists) {
			appMsg.log('✦ Installing Node Modules...')
			withJsPackages('install');
			appMsg.success('--- Grunt setup complete.');

		} else {
			appMsg.error('--- Grunt setup failed.')
		}
	}
}
