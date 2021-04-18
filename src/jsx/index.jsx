import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import ExpenceStore from './ExpenceStore';

const rootID = document.getElementById('transaction');

const Root = (
	<Provider ExpenceStore={ExpenceStore}>
		<App />
	</Provider>
);

if (typeof rootID !== 'undefined' && rootID != null) {
	ReactDOM.render(Root, rootID);
}
