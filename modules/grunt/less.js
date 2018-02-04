'use strict';

const config = m2Require('./helpers/config');
const { execCommand } = m2Require('./helpers/util');

module.exports = {
	command: 'less [theme]',
	aliases: ['l'],
	describe: 'Compiles CSS from .less source files',

	builder: (yargs) => {
		const defaultTheme = config.get('defaultTheme');

		yargs
			.positional('theme', {
				describe: 'A specific theme to compile CSS for',
				default: defaultTheme
			})
			.option('all', {
				alias: 'a',
				'describe': 'Compile all themes',
				'default': false
			})
			.example('$0 l -a', '=> grunt less [all themes]')
			.example('$0 l mytheme', '=> grunt less:mytheme');

		if (defaultTheme) {
			yargs.example('$0 l', '=> grunt less:'+defaultTheme+' [uses default]');
		} else {
			yargs.example('$0 l', '=> grunt less [no default set]');
		}
	},

	handler: (argv) => {
		let gruntArg = 'less';

		// If a theme is specified, and --all has not been selected...
		if (argv.theme && !argv.all) {
			gruntArg = 'less:' + argv.theme;
		}

		execCommand('grunt', gruntArg);
	}
}
