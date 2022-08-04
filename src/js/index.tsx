import React from 'react';
import ReactDOM from 'react-dom';

import './public-path';
import App from './components/app';

const container = document.querySelector( '#app-container' );
if ( container ) {
	ReactDOM.render( <App />, container );
}
