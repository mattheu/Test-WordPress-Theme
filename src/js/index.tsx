import React from 'react';
import ReactDOM from 'react-dom';

import './types/global';
import './public-path';
import App from './components/app';

const container = document.querySelector( '#app-container' );
if ( container ) {
	ReactDOM.render( <App greeting="Hola" />, container );
}
