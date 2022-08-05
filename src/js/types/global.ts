export {};

declare global {
	// Webpack public path. Used by code splitting.
	let  __webpack_public_path__:string;

	/**
	 * Abstract block attributes. Can be any object.
	 * Precise structure of a blocks attributes is described in the block.json.
	 */
	type BlockAttributes = Record<string, any>;

	/**
	 * Generic Block Edit Props.
	 */
	interface BlockEditProps {
		attributes: BlockAttributes,
		setAttributes: ( attrs: BlockAttributes ) => void,
	}
}
