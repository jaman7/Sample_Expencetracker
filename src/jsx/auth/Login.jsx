import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { setUserSession } from '../Utils/Common';
import restdbInstance from '../resetdbAPI';

const Login = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { baseURL } = ExpenceStore;

		const useFormInput = (initialValue) => {
			const [value, setValue] = useState(initialValue);

			const handleChange = (e) => {
				setValue(e.target.value);
			};
			return {
				value,
				onChange: handleChange
			};
		};

		const [loading, setLoading] = useState(false);
		const email = useFormInput('');
		const password = useFormInput('');
		const [error, setError] = useState(null);

		const handleLogin = async () => {
			setError(null);
			setLoading(true);
			await restdbInstance
				.get(`usersdb?q={"email":"${email.value}","pass":"${password.value}"}`)
				.then((response) => {
					setLoading(false);
					setUserSession(
						response.data[0].idToken,
						response.data[0].name,
						response.data[0]._id
					);
					props.history.push(`/${baseURL}dashboard`);
					ExpenceStore.Retrieve(response.data[0]._id);
				})
				.catch((err) => {
					setLoading(false);
					if (err.response.status === 401) setError(err.response.data.message);
					else setError('Something went wrong. Please try again later.');
				});
		};

		return (
			<>
				<div className="container-fluid auth">
					<div className="row">
						<div className="col-12">
							<div className="d-flex justify-content-center vh-100 align-items-center flex-column">
								<h4>Login</h4>
								<Form className="signin-form">
									<Form.Group controlId="email">
										<Form.Label>email</Form.Label>
										<Form.Control
											type="email"
											{...email}
											placeholder="email"
											autoComplete="off"
										/>
									</Form.Group>
									<Form.Group controlId="password">
										<Form.Label>password</Form.Label>
										<Form.Control
											type="password"
											{...password}
											placeholder="password"
											autoComplete="off"
										/>
									</Form.Group>

									{error && (
										<>
											<small style={{ color: 'red' }}>{error}</small>
											<br />
										</>
									)}

									<Button
										type="submit"
										className="btn btn-primary"
										value={loading ? 'Loading...' : 'Login'}
										onClick={handleLogin}
										disabled={loading}
									>
										Sign In
									</Button>
								</Form>
								<Link to={`/${baseURL}signup`} className="link mt-3">
									Dont have an account?
								</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	})
);

Login.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Login;
