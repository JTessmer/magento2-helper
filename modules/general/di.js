'use strict';

const { withMagento } = m2Require('./helpers/exec');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'di',
	describe: 'Generates DI configuration',

	builder: (yargs) => {
		yargs.example('$0 di', '=> run setup:di:compile');
	},

	handler: (argv) => {
		withMagento('setup:di:compile');
		appMsg.log('Flushing all caches...');
		withMagento('cache:flush');
	}
}
