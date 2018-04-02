'use strict';

const config = m2Require('./helpers/config');
const { withMagento, withComposer, withGrunt, removeGenerated } = m2Require('./helpers/exec');
const appMsg = m2Require('./helpers/appMsg');

module.exports = {
	command: 'nuke [theme]',
	aliases: ['n'],
	describe: '"Take off and nuke the entire site from orbit... it\'s the only way to be sure."\n\n'+
		'Flushes and regenerates Grunt, Composer, and Magento data & themes',

	builder: (yargs) => {
		const defaultTheme = config.get('defaultTheme');

		yargs
			.positional('theme', {
				describe: 'A specific less theme to regenerate',
				default: defaultTheme
			})
			.option('all', {
				alias: 'a',
				describe: 'Regenerate all themes',
				default: false
			})
			.example('$0 n -a', '=> clear generated content and regenerate all grunt less')
			.example('$0 n mytheme', '=> clear generated content and regenerate mytheme less');

		if (defaultTheme) {
			yargs.example('$0 r', '=> clear generated content and regenerate '+defaultTheme+' less [uses default]');
		} else {
			yargs.example('$0 r', '=> clear generated content and regenerate all less [no default set]');
		}

	},

	handler: (argv) => {

		appMsg.log('"In nineteen minutes, this area\'s gonna be a cloud of vapor the size of Nebraska."');

		appMsg.warn('--- Ensuring NPM packages are installed...')

		// Ensure required files exist
		let setupSuccess = true;

		for (let source in setupFiles) {
			let destination = setupFiles[source];

			// If any files are non-existant, fail success and quit
			if ( !copyFileIfNotExist(source, destination) ) {
				setupSuccess = false;
				break;
			}
		}

		if (!setupSuccess) {
			appMsg.error('+ Grunt Setup files could not be created.');
			return false;
		}

		appMsg.success('+ Grunt Setup files created.');

		//---

		appMsg.warn('--- Installing Node modules...');
		withJsPackages('install');

		//---

		appMsg.warn('--- Removing generated files...');
		removeGenerated();

		//---

		appMsg.warn('--- Installing Composer modules...')
		withComposer('clear-cache');
		withComposer('install');

		//---

		appMsg.warn('--- Flushing Magento caches...');
		withMagento('cache:flush');

		//---

		appMsg.warn('--- Regenerating Magento data...');
		withMagento('setup:upgrade');
		// Deploy mode occasionally gets reset after running setup:upgrade, so...
		withMagento('deploy:mode:set developer');
		withMagento('setup:di:compile');

		//---

		appMsg.warn('--- Rebuilding Grunt files...');

		let themeArg = '';

		// If a theme is specified, and --all has not been selected...
		if (argv.theme && !argv.all) {
			themeArg = ':' + argv.theme;
		}

		withGrunt('exec' + themeArg);
		if (argv.less) {
			withGrunt('less' + themeArg);
		}

		if (argv.watch) {
			withGrunt('watch' + themeArg);
		}

		//---

		appMsg.success('--- Complete.');
		appMsg.log('"We\'re in the pipe, five by five."');

	}
}
