'use strict';

const config = m2Require('./helpers/config');
const { withGrunt } = m2Require('./helpers/exec');

module.exports = {
	command: 'watch [theme]',
	aliases: ['w'],
	describe: 'Watches .less source files for changes and recompiles as needed',

	builder: (yargs) => {
		const defaultTheme = config.get('defaultTheme');

		yargs
			.positional('theme', {
				describe: 'A specific theme to wach changes for',
				default: defaultTheme
			})
			.option('all', {
				alias: 'a',
				describe: 'Watch all themes',
				default: false
			})
			.example('$0 w -a', '=> grunt watch [all themes]')
			.example('$0 w mytheme', '=> grunt watch:mytheme');

		if (defaultTheme) {
			yargs.example('$0 w', '=> grunt watch:'+defaultTheme+' [uses default]');
		} else {
			yargs.example('$0 w', '=> grunt watch [no default set]');
		}
	},

	handler: (argv) => {
		let gruntArg = 'watch';

		// If a theme is specified, and --all has not been selected...
		if (argv.theme && !argv.all) {
			gruntArg = 'watch:' + argv.theme;
		}

		withGrunt(gruntArg);
	}
}
