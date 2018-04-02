'use strict';

const { withMagento } = m2Require('./helpers/exec');

module.exports = {
	command: 'deploymode',
	aliases: ['dep'],
	describe: 'Sets the deploy mode',

	builder: (yargs) => {

		yargs
			.positional('mode', {
				describe: 'Desired deployment mode',
				default: 'developer'
			})
			.example('$0 di', '=> run setup:di:compile');

	},

	handler: (argv) => {
		withMagento('deploy:mode:set', argv.mode);
	}
}
