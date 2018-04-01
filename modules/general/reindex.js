'use strict';

const { withMagento } = m2Require('./helpers/exec');

module.exports = {
	command: 'i',
	describe: 'Reindexes Data',

	builder: (yargs) => {
		yargs.example('$0 i', '=> run indexer:reindex');
	},

	handler: (argv) => {
        withMagento('indexer:reindex');
	}
}
