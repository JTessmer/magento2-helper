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
			.option('less', {
				alias: 'l',
				describe: 'Compile less after exec completes'
			})
			.option('watch', {
				alias: 'w',
				describe: 'Watch for changes and recompile after exec completes'
			})
			.example('$0 e -a', '=> grunt exec [all themes]')
			.example('$0 e mytheme', '=> grunt exec:mytheme')
            .example('$0 e mytheme -lw', '=> run grunt exec, then less, then continue watching');

		if (defaultTheme) {
			yargs.example('$0 e', '=> grunt exec:'+defaultTheme+' [uses default]');
		} else {
			yargs.example('$0 e', '=> grunt exec [no default set]');
		}
	},

	handler: (argv) => {
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

	}
}
