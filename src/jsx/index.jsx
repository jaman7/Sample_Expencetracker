import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import ExpenceStore from './ExpenceStore';
import * as serviceWorker from './serviceWorker';

const rootID = document.getElementById('transaction');

const Root = (
	<Provider ExpenceStore={ExpenceStore}>
		<App />
	</Provider>
);

if (typeof rootID !== 'undefined' && rootID != null) {
	ReactDOM.render(Root, rootID);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
