'use strict';

const config = m2Require('./helpers/config');
const { withMagento } = m2Require('./helpers/exec');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'template-hints [status]',
	aliases: ['th'],
	describe: 'Enables or Disables Template Hints',

	builder: (yargs) => {

		yargs
			.positional('status', {
				describe: 'Whether to [e]nable or [d]isable path hints'
			})
			.example('$0 th e', '=> enable path hints')
			.example('$0 th d', '=> disable path hints');

	},

	handler: (argv) => {

		if ( argv.status === 'e' ) {
			withMagento('dev:template-hints:enable');
		} elseif ( argv.status === 'd' ) {
			withMagento('dev:template-hints:disable');
		} else {
			appMsg.error(
				'Please specify either [e] to enable, or [d] to disable. ' +
				'Use \'--help th\' for more info.'
			);
			return;
		}

		const commonCaches = config.get('commonCaches', true);

		appMsg.success('Flushing common caches...');
		withMagento('cache:flush ' + commonCaches);

	}
}
