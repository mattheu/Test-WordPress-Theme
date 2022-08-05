<?php

namespace Test_Theme\Blocks;

use Test_Theme\Asset_Loader;

function setup() : void {
	register_blocks();
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register_scripts' );
}

function register_blocks() {
	register_block_type( get_stylesheet_directory() . '/src/js/blocks/test' );
}

function register_scripts() : void {
	Asset_Loader\register_asset( 'test-theme-editor', 'editor.js', [ 'wp-block-editor' ] );
}
