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
			.option('dev', {
				alias: 'd',
				describe: 'Apply Developer mode',
				default: false
			})
			.option('prod', {
				alias: 'p',
				describe: 'Apply Production mode',
				default: false
			})
			.conflicts('dev','prod')
			.example('$0 dep', '=> run deploy:mode:set developer')
			.example('$0 dep -d', '=> run deploy:mode:set developer')
			.example('$0 dep -p', '=> run delpoy:mode:set production');

	},

	handler: (argv) => {

		let deployMode = argv.mode;

		if (argv.dev) {
			deployMode = 'developer';
		} else if (argv.prod) {
			deployMode = 'production';
		}

		withMagento('deploy:mode:set ' + deployMode);
	}
}
