<?php

namespace Test_Theme;

require 'inc/asset-loader.php';

add_action( 'after_setup_theme', __NAMESPACE__ . '\\setup' );

function setup() : void {
	add_filter( 'script_loader_tag', __NAMESPACE__ . '\\do_extra_script_attrs', 10, 2 );

	Asset_Loader\enqueue_asset( 'test-theme-main', 'index.js', [ 'wp-element' ], [ 'defer' => true ] );
	Asset_Loader\enqueue_asset( 'test-theme-stylesheet', 'style.css' );
}


/**
 * Adds extra attributes to enqueued scripts e.g. async/defer
 *
 * If #12009 lands in WordPress, this function can no-op since it would be handled in core.
 *
 * @link https://core.trac.wordpress.org/ticket/12009
 *
 * @param string $tag The script tag.
 * @param string $handle The script handle.
 *
 * @return array
 */
function do_extra_script_attrs( string $tag, string $handle ) : string {
	foreach ( [ 'async', 'defer' ] as $attr ) {
		if ( ! wp_scripts()->get_data( $handle, $attr ) ) {
			continue;
		}

		// Prevent adding attribute when already added in #12009.
		if ( ! preg_match( ":\s$attr(=|>|\s):", $tag ) ) {
			$tag = preg_replace( ':(?=></script>):', " $attr", $tag, 1 );
		}

		// Only allow async or defer, not both.
		break;
	}

	return $tag;
}

