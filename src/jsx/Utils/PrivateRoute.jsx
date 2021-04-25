import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the private routes
function PrivateRoute({ component: Component, baseURL, ...rest }) {
	console.log(rest);
	return (
		<Route
			{...rest}
			render={(props) =>
				getToken() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: `/${baseURL}login`, state: { from: props.location } }}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;
