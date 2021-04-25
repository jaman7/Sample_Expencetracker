import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
function PublicRoute({ component: Component, baseURL, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				!getToken() ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: `/${baseURL}dashboard` }} />
				)
			}
		/>
	);
}

export default PublicRoute;
