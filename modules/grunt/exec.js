'use strict';

const config = m2Require('./helpers/config');
const { withGrunt } = m2Require('./helpers/exec');

module.exports = {
	command: 'exec [theme]',
	aliases: ['e'],
	describe: 'Creates symlinks for .less themes',

	builder: (yargs) => {
		const defaultTheme = config.get('defaultTheme');

		yargs
			.positional('theme', {
				describe: 'A specific theme to create symlinks for',
				default: defaultTheme
			})
			.option('all', {
				alias: 'a',
				describe: 'Exec all themes',
				default: false
			})
			.example('$0 e -a', '=> grunt exec [all themes]')
			.example('$0 e mytheme', '=> grunt exec:mytheme');

		if (defaultTheme) {
			yargs.example('$0 e', '=> grunt exec:'+defaultTheme+' [uses default]');
		} else {
			yargs.example('$0 e', '=> grunt exec [no default set]');
		}
	},

	handler: (argv) => {
		let gruntArg = 'exec';

		// If a theme is specified, and --all has not been selected...
		if (argv.theme && !argv.all) {
			gruntArg = 'exec:' + argv.theme;
		}

		withGrunt(gruntArg);
	}
}
