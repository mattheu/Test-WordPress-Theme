import React from 'react';

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

function Edit( { attributes, setAttributes }: BlockEditProps ) {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<RichText
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				placeholder={ __( 'Title...', 'test-theme' ) }
				tagName="h2"
				value={ attributes.title }
				onChange={ ( title: string ) => setAttributes( { title } ) }
			/>

			<RichText
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				placeholder={ __( 'Message...', 'test-theme' ) }
				tagName="p"
				value={ attributes.message }
				onChange={ ( message: string ) => setAttributes( { message } ) }
			/>
		</div>
	);
}

export default Edit;
