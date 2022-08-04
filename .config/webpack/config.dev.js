const { helpers, presets } = require( '@humanmade/webpack-helpers' );
const { choosePort, filePath, cleanOnExit } = helpers;
const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');

const { entries, externals } = require( './shared' );

cleanOnExit( entries.map( config => {
	return config.context + '/build/development-asset-manifest.json';
} ) );

// Path to local environment key/cert files.
const localServerHost = 'altis-test.altis.dev';
const localServerKeyFile = filePath( '../../../vendor/altis/local-server/docker/ssl.key' );
const localServerCertFile = filePath( '../../../vendor/altis/local-server/docker/ssl.cert' );

/**
 * Remove trailing slash from string.
 */
function untrailingslashit( string ) {
	return string.replace( /\/$/, '' );
}

if ( ! fs.existsSync( localServerKeyFile ) ) {
	console.error( 'Key/Cert files not found.' );
	process.exit(1);
}

// For each entry, return a development config.
// Note dev server only supports a single config at a type. You must pass --config-name $name to select the one you want to run.
module.exports = choosePort( 8081 ).then( port => entries.map( config => {
	const defaultConfig = {
		resolve: {
			...config.resolve || {},
			extensions: [ '.ts', '.tsx', '.js','.jsx' ],
		},
		devServer: {
			port,
			server: {
				type: 'https',
				options: {
					key: fs.readFileSync( localServerKeyFile ),
					cert: fs.readFileSync( localServerCertFile ),
				},
			},
			client: {
				logging: "info",
				webSocketURL: `wss://${localServerHost}:${port}/ws`,
			},
		},
		externals,
		output: {
			path: untrailingslashit( config.context ) + '/assets',
			publicPath: `https://${localServerHost}:${port}/assets/`,
		},
		ignoreWarnings: [
			// Ignore errors from source-map-loader caused by packages that don't ship source code (e.g. react-timeago)
			/Failed to parse source map/
		],
		optimization: {
			runtimeChunk: 'single'
		},
	};

	return presets.development( merge( defaultConfig, config ) );
} )
);
