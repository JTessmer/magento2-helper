'use strict';

const { spawnSync } = require('child_process');
const config = require('./config');
const appMsg = require('./appMsg');

// Executes the given command and returns the resulting output
function _execCommand(command, args) {

	// Ensure supplied arguments are formatted as an array of strings
	if (typeof args !== 'object') {
		args = args.toString().split(' ');
	}

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

/*==================================================//
	We only expose wrappers in order to discourage
	modules from going too crazy with executing
	all sorts of random commands.
//==================================================*/
module.exports = {
	withGrunt: function(args) {
		return _execCommand('grunt', args);
	},
	withComposer: function(args) {
		return _execCommand('composer', args);
	},
	withMagento: function(args) {
		return _execCommand(config.get('magentoBin'), args);
	},
	withJsPackages: function(args) {
		return _execCommand(config.get('jsPackageManager'), args);
	}
}
