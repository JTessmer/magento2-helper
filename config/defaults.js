'use strict';

module.exports = {
	debugMode:			false,
	verboseMode:		true,
	magentoCmd:			'php',
	magentoBin:			'bin/magento',
	jsPackageManager:	'npm',
	taskRunner:			'grunt',
	fileEditor:			'open',
	defaultVendor:		null,
	defaultTheme:		null,
	modules: [
		'./modules/grunt/setup',
		'./modules/grunt/exec',
		'./modules/grunt/less',
		'./modules/grunt/watch',
		'./modules/composer/install',
		'./modules/composer/require',
		'./modules/composer/update',
		'./modules/cache/flush',
		'./modules/cache/refresh',
		'./modules/general/deploy',
		'./modules/general/deploymode',
		'./modules/general/dicompile',
		'./modules/general/reindex',
		'./modules/general/template-hints',
		'./modules/general/upgrade',
		'./modules/general/nuke',
		'./modules/core/config',
		'./modules/system/open'
	],
	customModules: [
	],
	commonCaches: [
		'config',
		'layout',
		'block_html',
		'full_page'
	],
	generatedDirs: [
		'var/cache',
		'var/generation',
		'var/page_cache',
		'var/view_preprocessed',
		'var/di',
		'generated/code',
		'pub/static/frontend'
	],
	gruntSetupFiles: {
		'package.sample.json':						'package.json',
		'Gruntfile.js.sample':						'Gruntfile.js',
		'grunt-config.json.sample':					'grunt-config.json',
		'dev/tools/grunt/configs/local-themes.js':	'dev/tools/grunt/configs/themes.js'
	}
};
