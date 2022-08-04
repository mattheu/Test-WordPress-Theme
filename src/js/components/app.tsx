import React from 'react';

import testFunc from '../utils/test-func';

/**
 * App component.
 */
function App() {

	return (
		<div>
			{ 'Hello ' + testFunc( 'World' )  }
		</div>
	);
}

export default App;
