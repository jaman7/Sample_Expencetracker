/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './Dashboard';
import Home from './Home';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

@inject('ExpenceStore')
@observer
class App extends Component {
	async componentDidMount() {
		const { ExpenceStore } = this.props;
		const id = JSON.parse(sessionStorage.getItem('id'));
		if (id) {
			await ExpenceStore.Retrieve(id);
		}
	}

	render() {
		const { ExpenceStore } = this.props;
		const { token, setToken, baseURL } = ExpenceStore;

		return (
			<BrowserRouter>
				<Switch>
					<Route exact path={`/${baseURL}`} component={Home} />
					<PublicRoute path={`/${baseURL}login`} component={Login} baseURL={baseURL} />
					<PublicRoute path={`/${baseURL}signup`} component={Signup} />
					<PrivateRoute
						path={`/${baseURL}dashboard`}
						component={Dashboard}
						baseURL={baseURL}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}

App.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default App;
