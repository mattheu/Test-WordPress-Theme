const glob = require('glob');
const { helpers, externals: helpersExternals } = require( '@humanmade/webpack-helpers' );
const { filePath } = helpers;

const theme = {
	name: 'main',
	context: filePath( '' ),
	entry: {
		'index': './src/js/index.tsx',
		'style': './src/css/style.scss',
	},
};

const entries = [
	theme,
];

const externals = {
	...helpersExternals,
};

module.exports = {
	entries,
	externals,
}
