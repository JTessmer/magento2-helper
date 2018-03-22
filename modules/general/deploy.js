'use strict';

const config = m2Require('./helpers/config');
const { withMagento } = m2Require('./helpers/exec');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'deploy',
	aliases: ['d'],
	describe: 'Deploys static content',

	builder: (yargs) => {
		const defaultTheme = config.get('defaultTheme');
		const defaultVendor = config.get('defaultVendor');

		yargs
			.option('force', {
				alias: 'f',
				describe: 'Force deployment, even when not in developer mode',
				default: false
			})
			.option('all', {
				alias: 'a',
				describe: 'Deploy all themes',
				default: false
			})
			.option('vendor', {
				alias: 'v',
				describe: 'A specific vendor to deploy themes for',
				default: defaultVendor
			})
			.option('theme', {
				alias: 't',
				describe: 'A specific theme to deploy',
				default: defaultTheme
			})

			.example('$0 th e', '=> enable path hints')
			.example('$0 th d', '=> disable path hints');

	},

	handler: (argv) => {

        let themeArg = '';

        if (argv.vendor && argv.theme && !argv.all) {
            themeArg = ' --theme=' + argv.vendor + '/' + argv.theme;
        }

        withMagento('cache:flush');
        withMagento('setup:static-content:deploy' + themeArg + (argv.force ? ' -f' : '') );
        withMagento('dev:source-theme:deploy' + themeArg);

	}
}
