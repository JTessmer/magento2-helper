'use strict';

const config = m2Require('./helpers/config');
const { withMagento } = m2Require('./helpers/exec');

module.exports = {
	command: 'flush',
	aliases: ['f'],
	describe: 'Flushes the Magento cache',

	builder: (yargs) => {

		yargs
			.positional('caches', {
				describe: 'Specific cache areas to flush'
			})
			.option('all', {
				alias: 'a',
				describe: 'Flush all cache areas',
				default: false
			})
	},

	handler: (argv) => {
		console.log('argv._', argv._);
		console.log('caches', argv.caches);

		// If --all has been specified...
		if (argv.all) {
			withMagento('cache:flush');

		// If specific caches have been specified...
		} else if (argv.caches) {
			withMagento('cache:flush ' + argv.caches);

		// If nothing has been specified...
		} else {
			const commonCaches = config.get('commonCaches', true);

			withMagento('cache:flush ' + commonCaches);
		}

	}
}
