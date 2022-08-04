const { presets, plugins } = require( '@humanmade/webpack-helpers' );
const { merge } = require('webpack-merge');

const { entries, externals } = require( './shared.js' );

module.exports = [
	...entries.map( config => presets.production( merge( config, {
		externals,
		resolve: {
			...config.resolve || {},
			extensions: [ '.ts', '.tsx', '.js','.jsx' ],

		},
		output: {
			path: `${ config.context }/build`,
		},
		plugins: [
			plugins.clean(),
		]
	} ) ) ),
]
