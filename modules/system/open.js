'use strict';

const { withMagento } = m2Require('./helpers/exec');
const config = m2Require('./helpers/config');
const appMsg = m2Require('./helpers/appMsg');
const exec = m2Require('./helpers/exec');

async function findFile(argv) {
	appMsg.highlight('Searching for file...\n');

	const fileUrl = argv.url.match(/pub\/static\/(.*)/)[0];

	try {
		const {stdout, stderr} = await exec.async('ls -lah ' + fileUrl);
		const parsedOutput = stdout.match(/\-\> (.*)/);

		// File is discovered, but is not a symlink
		if (!parsedOutput || parsedOutput.length < 2) {
			const nonLinkPath = stdout
			.split(' ')
			.pop()
			.replace(/\n/gm,'');

			appMsg.warn('Discovered file was not a symlink:\n • \'' + process.cwd() + '/' + nonLinkPath + '\'\n');

			return false;
		}

		const filePath = parsedOutput[1];

		appMsg.success('Discovered file:\n • \'' + filePath + '\'\n');

		if (!argv.show) {
			const fileEditor = config.get('fileEditor');

			appMsg.log('Opening with \'' + fileEditor + '\'...');
			exec.sync( fileEditor + ' ' + filePath );
		}

	} catch (err) {
		if (err.stderr && err.stderr.indexOf('No such file or directory')) {
			appMsg.error('No source file found for:\n • \'' + fileUrl + '\'\n');
		} else {
			appMsg.error('Error: Failed to discover file:\n • ' + err + '\n');

		}
	}
}

module.exports = {
	command: 'open [url]',
	aliases: ['o'],
	describe: 'Finds the source for the given static file',

	builder: (yargs) => {
		yargs
		.positional('url', {
			describe: 'URL of the file in question'
		})
		.option('show', {
			alias: 's',
			describe: 'Show path only to the discovered file without opening',
			default: false
		})
		.example('$0 fi', '=> opens the discovered file in the default editor')
			.example('$0 fi -s', '=> just show the path to the file; do not open');
	},

	handler: (argv) => {
		findFile(argv);
	}
}
