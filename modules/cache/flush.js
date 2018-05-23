'use strict';

const config = m2Require('./helpers/config');
const { withMagento } = m2Require('./helpers/exec');
const { removeGenerated } = m2Require('./helpers/files');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'flush [caches]',
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
			.option('var', {
				alias: 'v',
				describe: 'Purge generated var folders',
				default: false
			})
	},

	handler: (argv) => {

		if (argv.all || argv.var) {
			appMsg.success('Purging generated var folders...');
			removeGenerated();
		}

		// If --all has been specified...
		if (argv.all) {
			appMsg.success('Flushing all caches...');
			withMagento('cache:flush');

		// If specific caches have been specified...
		} else if (argv.caches) {
			appMsg.success('Flushing '+argv.caches+'...');
			withMagento('cache:flush ' + argv.caches);

		// If nothing has been specified...
		} else {
			const commonCaches = config.get('commonCaches', true);

			appMsg.success('Flushing common caches...');
			withMagento('cache:flush ' + commonCaches);
		}

		appMsg.highlight('Caches flushed', true);

	}
}
