import { registerBlockType } from '@wordpress/blocks';

import config from './block.json';
import Edit from './components/edit';
import Save from './components/save';

// Register the block
registerBlockType( config, {
	edit: Edit,
	save: Save,
} );
