'use strict';

const config = m2Require('./helpers/config');
const { withGrunt } = m2Require('./helpers/exec');

module.exports = {
	command: 'exec-less [theme]',
	aliases: ['el'],
	describe: 'Creates symlinks and compiles CSS',

	builder: (yargs) => {
		const defaultTheme = config.get('defaultTheme');

		yargs
			.positional('theme', {
				describe: 'A specific theme to generate CSS for',
				default: defaultTheme
			})
			.option('all', {
				alias: 'a',
				describe: 'Compile all themes',
				default: false
			})
			.example('$0 el -a', '=> grunt exec, grunt less [all themes]')
			.example('$0 el mytheme', '=> grunt exec:mytheme, grunt less:mytheme');

		if (defaultTheme) {
			yargs.example('$0 el', '=> grunt exec:'+defaultTheme+', grunt less:'+defaultTheme+' [uses default]');
		} else {
			yargs.example('$0 el', '=> grunt exec, grunt less [no default set]');
		}
	},

	handler: (argv) => {
		let gruntExec = 'exec';
		let gruntLess = 'less';

		// If a theme is specified, and --all has not been selected...
		if (argv.theme && !argv.all) {
			gruntExec = 'exec:' + argv.theme;
			gruntLess = 'less:' + argv.theme;
		}

		withGrunt(gruntExec);
		withGrunt(gruntLess);
	}
}
