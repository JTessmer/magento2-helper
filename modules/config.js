'use strict';

const config = m2Require('./helpers/config');
const { execCommand } = m2Require('./helpers/util');

module.exports = {
	command: 'setup',
	aliases: ['s'],
	describe: 'Creates new Javscript build config files, then installs node modules using the configured runner',

	builder: (yargs) => {},

	handler: (argv) => {
		let gruntArg = 'less';

		// If a theme is specified, and --all has not been selected...
		if (argv.theme && !argv.all) {
			gruntArg = 'less:' + argv.theme;
		}

		execCommand('grunt', gruntArg);
	}
}
