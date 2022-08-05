import React from 'react';

import testFunc from '../utils/test-func';

interface AppProps {
	greeting?: string;
}

/**
 * App component.
 */
function App( { greeting = 'Hello' }: AppProps ) {
	return (
		<div>
			{ greeting + ' ' + testFunc( 'World' )  }
		</div>
	);
}

export default App;
