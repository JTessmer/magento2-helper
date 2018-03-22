'use strict';

const { withComposer } = m2Require('./helpers/exec');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'composer-require',
	aliases: ['cr'],
	describe: 'Installs a new required composer resource',

	builder: (yargs) => {

		yargs
			.positional('resource', {
				describe: 'The resource to require'
			})
			.example('$0 cr my/module', '=> composer require my/module');

	},

	handler: (argv) => {
		if (!argv.resource) {
			appMsg.error('Please specify a resource to require');
			return;
		}

		withComposer('require', argv.resource);
	}
}
