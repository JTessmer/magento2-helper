'use strict';

const config = m2Require('./helpers/config');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'config [key] [value]',
	aliases: ['c'],
	describe: 'Shows and/or sets m2h configuration options',

	builder: (yargs) => {

		yargs
			.positional('key', {
				describe: 'The setting to view or adjust'
			})
			.positional('value', {
				describe: 'The value to apply'
			})

			.option('reset', {
				alias: 'r',
				describe: 'Resets setting to default value',
				default: false
			})
			.option('global', {
				alias: 'g',
				describe: 'Store setting globally',
				default: false
			})

			.example('$0 c', '=> show all configuration values')
			.example('$0 c <key>', '=> show the specified configuration value')
			.example('$0 c <key> <value>', '=> set a new local value for the given configuration')
			.example('$0 c <key> <value> -g', '=> set a new global value for the given configuration')
			.example('$0 c <key> -r', '=> reset the specified value to default')
			.example('$0 c <key> -rg', '=> reset the global value to default');

	},

	handler: (argv) => {

		// No key: Display all configuration values
		if (!argv.key) {
			appMsg.success('All configuration for the current path:');
			appMsg.log( JSON.stringify(config.get('all'), null, '\t') );
			return;
		}

		// Key with no changes: Display the key's value
		if (!argv.reset && !argv.value) {
			appMsg.success(argv.key + ' value based on the current path:');
			appMsg.log( JSON.stringify({ [argv.key]: config.get(argv.key) } ));
			return;
		}

		// Key with reset flag: Reset the key's value
		if (argv.key && argv.reset) {
			config.reset(argv.key, argv.global);
			appMsg.success('Reset ' + argv.key + ' to default value');
			return;
		}

		// Key with value: Apply the new value
		if (argv.key && argv.value) {
			config.set(argv.key, argv.value, argv.global);
			return;
		}

	}
}
