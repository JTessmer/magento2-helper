'use strict';

const { _execCommand } = m2Require('./helpers/exec');
const config = m2Require('./helpers/config');

// Copies the source file to the destination if destination does not exist
function copyFileIfNotExist(src, dest) {

	appMsg.log('✦ Checking for '+dest+'...');

	// If the destination file doesn't exist...
	if ( !fs.existsSync(dest) ) {
		appMsg.warn('  ✗ Not found. Copying sample file.');

		// Try to copy the sample file to the destination
		try {
			fs.copyFileSync(src, dest);
			appMsg.success('  ✔ Copied.');
		}
		catch(error) {
			if (error.code === 'ENOENT') {
				appMsg.error('  ✗ Sample file \''+src+'\' not found. Could not copy.');
				return false;

			} else {
				throw new Error();
			}
		}
	} else {
		appMsg.success('  ✔ Found.');
	}

	return true;
}


// Removes generated files
function removeGenerated() {
	const generatedDirs = config.get('generatedDirs', true);

	// @TODO: Refactor to not require a private method belonging to /helpers/exec
	//		(and remove said method from exports in /helpers/exec)
	return _execCommand('rm', '-rf ' + generatedDirs);
}


module.exports = {
	copyFileIfNotExist,
	removeGenerated
};
