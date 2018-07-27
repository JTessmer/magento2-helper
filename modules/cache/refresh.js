'use strict';

const config = m2Require('./helpers/config');
const { withComposer, withMagento, withGrunt } = m2Require('./helpers/exec');
const { removeGenerated } = m2Require('./helpers/files');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'refresh [theme]',
	aliases: ['r'],
	describe: 'Resets composer & less content; ideal for switching branches',

	builder: (yargs) => {
		const defaultTheme = config.get('defaultTheme');

		yargs
			.positional('theme', {
				describe: 'A specific less theme to refresh',
				default: defaultTheme
			})
			.option('all', {
				alias: 'a',
				describe: 'Refresh all themes',
				default: false
			})
			.option('flush-composer', {
				alias: 'f',
				describe: 'Flush composer\'s cache',
				default: false
			})
			.example('$0 r -f', '=> flush composer cache and refresh')
			.example('$0 r -a', '=> refresh composer and all themes')
			.example('$0 r mytheme', '=> refresh composer and mytheme less files');

			if (defaultTheme) {
				yargs.example('$0 r', '=> refresh composer and '+defaultTheme+' [uses default]');
			} else {
				yargs.example('$0 r', '=> refresh composer and all themes [no default set]');
			}
	},

	handler: (argv) => {

		//----- Composer -----//
		if (argv.flush) {
			withComposer('clear-cache');
		}
		appMsg.success('Installing Composer dependencies...');
		withComposer('install');

		//----- Magento -----//
		appMsg.success('Purging generated var folders...');
		removeGenerated();
		appMsg.success('Flushing all caches...');
		withMagento('cache:flush');
		appMsg.success('Upgrading the database...');
		withMagento('setup:upgrade');
		withMagento('deploy:mode:set developer');

		//----- Grunt -----//
		let gruntExec = 'exec';
		let gruntLess = 'less';

		// If a theme is specified, and --all has not been selected...
		if (argv.theme && !argv.all) {
			gruntExec = 'exec:' + argv.theme;
			gruntLess = 'less:' + argv.theme;
		}

		appMsg.success('Generating Grunt symlinks...');
		withGrunt(gruntExec);
		withGrunt(gruntLess);

	}
}
