'use strict';

const { withMagento } = m2Require('./helpers/exec');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'upgrade',
	aliases: ['u'],
	describe: 'Upgrades Magento DB and schema; re-sets developer mode',

	builder: (yargs) => {

		yargs
			.option('keepmode', {
				alias: 'k',
				describe: 'Keep the current mode; do not switch to developer',
				default: false
			})
			.example('$0 u', '=> run setup:upgrade and set mode to developer')
			.example('$0 u p', '=> run setup:upgrade and preserve mode');

	},

	handler: (argv) => {
		appMsg.log('Flushing all caches...');
		withMagento('cache:flush');
		withMagento('setup:upgrade');

		if (!argv.keepmode) {
			withMagento('deploy:mode:set', 'developer');
		}
	}
}
