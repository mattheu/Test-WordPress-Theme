import React from 'react';
import App from './app';
import TestRenderer from 'react-test-renderer'; // ES6

test( 'Prepends the word "test"', () => {
	const testRenderer = TestRenderer.create(
		<App />
	);

	expect( testRenderer.toJSON() ).toMatchSnapshot();
});
