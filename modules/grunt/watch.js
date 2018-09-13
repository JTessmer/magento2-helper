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
				describe: 'A specific theme to watch changes for'
			})
			.example('$0 w', '=> grunt watch [all themes]')
			.example('$0 w mytheme', '=> grunt watch:mytheme');
	},

	handler: (argv) => {
		const theme = argv.theme;
		const gruntArg = theme ? 'watch:'+theme : 'watch';

		withGrunt(gruntArg);
	}
}
