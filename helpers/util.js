const { spawnSync } = require('child_process');
const config = require('./config');
const appMsg = require('./appMsg');

// Executes the given command and returns the resulting output
function execCommand(command, args) {

	const result = spawnSync(command, args, {
		stdio: 'inherit'
	});

	if (result.error) {
		switch (result.error.code) {
			case 'ENOENT':
				appMsg.error('Path "' + result.error.path + '" not found!');
				break;

			default:
				appMsg.error('Failed while issuing command "' + command + '"!');
				appMsg.log(result.error);
				break;
		}

		process.exit(1);
	}

	return true;
}

module.exports = {
	withMagento: function(args) {
		return execCommand(config.get('magentoBin'), args);
	},
	withJsPackages: function(args) {
		return execCommand(config.get('jsPackageManager'), args);
	}
}
