'use strict';

const { withComposer } = m2Require('./helpers/exec');

module.exports = {
	command: 'composer-install',
	aliases: ['ci'],
	describe: 'Installs all resources required in composer.json',

	builder: (yargs) => {

		yargs
			.option('flush', {
				alias: 'f',
				describe: 'Flush composer cache',
				default: false
			})
			.example('$0 ci', '=> composer install')
			.example('$0 ci -f', '=> composer flush, then install');

	},

	handler: (argv) => {
		if (argv.flush) {
			withComposer('clear-cache');
		}
		withComposer('install');
	}
}
