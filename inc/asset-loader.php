<?php

namespace Test_Theme\Asset_Loader;

use Exception;

/**
 * Undocumented function
 *
 * @param string $dir Build directory.
 * @return string|null Path.
 */
function get_asset_manifest_file_path( string $dir ) : ?string {
	$files = [
		'development-asset-manifest.json',
		'production-asset-manifest.json',
	];

	foreach ( $files as $file ) {
		$try = trailingslashit( $dir ) . $file;
		if ( is_readable( $try ) ) {
			return $try;
		}
	}
}

function load_manifest( string $dir ) : array {
	$file = get_asset_manifest_file_path( $dir );

	if ( ! $file ) {
		throw new Exception( 'Asset manifest file not found.' );
	}

	return json_decode( file_get_contents( $file ), true );
}

function is_css( $uri ) : bool {
	return preg_match( '/\.css(\?.*)?$/', $uri ) === 1;
}

/**
 * Register a script.
 *
 * @param string $handle
 * @param array $deps
 * @param array $args
 * @return array Array of registered handles.
 */
function register_asset( string $handle, string $src, array $deps = [], array $args = [] ) : array {
	$handles = [ 'scripts' => [], 'styles' => [] ];
	$runtime_handle = 'test-typescript-runtime';
	$theme_build_dir = get_stylesheet_directory() . '/build';
	$manifest = load_manifest( $theme_build_dir );

	// In dev mode, a runtime file needs to be loaded only once per page.
	if ( isset( $manifest['runtime.js'] ) ) {
		wp_register_script( $runtime_handle, $manifest['runtime.js'] );
		$deps[] = $runtime_handle;
		$handles['scripts'][] = $runtime_handle;
	}

	if ( is_css( $src ) ) {
		$args = wp_parse_args( $args, [
			'media' => 'all',
		] );

		if ( isset( $manifest[ $src ] ) ) {
			wp_register_style(
				$handle,
				get_stylesheet_directory_uri() . '/build/' . $manifest[ $src ],
				$deps,
				false,
				$args['media']
			);
			$handles['styles'][] = $handle;
		} else {
			$style_js_src = preg_replace( '/.css$/', '.js', $src );

			if ( ! isset( $manifest[ $style_js_src ] ) ) {
				throw new Exception( 'Stylesheet or JS fallback not found.' );
			}

			$runtime_dep = array_search( $runtime_handle, $deps );
			$js_deps = [];
			if ( false !== $runtime_dep ) {
				unset( $deps[ $runtime_dep ] );
				$js_deps[] = $runtime_handle;
			}


			wp_register_style( $handle, '', $deps, false, $args['media'] );
			wp_register_script( $handle . '-js', $manifest[ $style_js_src ], $js_deps );

			$handles['styles'][] = $handle;
			$handles['scripts'][] = $handle . '-js';
		}
	} else {
		if ( ! isset( $manifest[ $src ] ) ) {
			throw new Exception( 'Script not found in asset Manifest.' );
		}

		$args = wp_parse_args( $args, [
			'in_footer' => true,
			'async' => false,
			'defer' => false,
		]);

		wp_register_script(
			$handle,
			get_stylesheet_directory_uri() . '/build/' . $manifest[ $src ],
			$deps,
			false,
			$args['in_footer']
		);

		$handles['scripts'][] = $handle;

		if ( isset( $args['defer'] ) && $args['defer'] ) {
			wp_script_add_data( $handle, 'defer', true );
		}

		if ( isset( $args['async'] ) && $args['async'] ) {
			wp_script_add_data( $handle, 'defer', true );
		}
	}

	return $handles;
}

/**
 * Register and enqueue an asset.
 *
 * @param string $handle
 * @param array $deps
 * @param array $args
 * @return void
 */
function enqueue_asset( string $handle, string $src, array $deps = [], array $args = [] ) : void {
	try {
		$handles = register_asset( $handle, $src, $deps, $args );
	} catch ( Exception $e ) {
		$handles = [];
	}

	foreach ( $handles['scripts'] as $handle ) {
		wp_enqueue_script( $handle );
	}

	foreach ( $handles['styles'] as $handle ) {
		wp_enqueue_style( $handle );
	}
}




