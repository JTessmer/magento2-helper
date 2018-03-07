'use strict';

const appMsg = m2Require('./helpers/appMsg');
const { withComposer } = m2Require('./helpers/exec');

module.exports = {
	command: 'composer-update [module]',
	aliases: ['cu'],
	describe: 'Updates composer resources',

	builder: (yargs) => {

		yargs
			.positional('module', {
				describe: 'A specific module to update'
			})
			.option('all', {
				alias: 'a',
				describe: 'Updates all modules',
				default: false
			})
			.option('flush', {
				alias: 'f',
				describe: 'Flush composer cache',
				default: false
			})
			.example('$0 cu mymodule', '=> update composer module')
			.example('$0 cu -a', '=> update all composer modules')
			.example('$0 cu mymodule -f', '=> flush cache, then update module')
			.example('$0 cu -a -f', '=> flush cache, then update all modules');
	},

	handler: (argv) => {
		if (argv.flush) {
			withComposer('clear-cache');
		}

		// If --all is set...
		if (argv.all) {
			withComposer('update');

		// If a module is specified...
		} else if (argv.module) {
			withComposer('update ' + argv.module + ' --with-dependencies');

		// No module is specified, and --all is not set
		} else {
			appMsg.error(
				'* Please specify either a specific module to update, ' +
				'or use "--all" to update all modules'
			);
		}

	}
}
