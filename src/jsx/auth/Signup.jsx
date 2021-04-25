import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import hash from 'hash-it';

import { setUserSession } from '../Utils/Common';
import restdbInstance from '../resetdbAPI';

const Signup = inject('ExpenceStore')(
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
		const useremail = useFormInput('');
		const username = useFormInput('');
		const password = useFormInput('');
		const [error, setError] = useState(null);

		const handleRegister = async () => {
			setError(null);
			setLoading(true);
			await restdbInstance
				.post('usersdb', {
					email: useremail.value,
					pass: password.value,
					name: username.value,
					idToken: hash(useremail.value + password.value)
				})
				.then((response) => {
					setLoading(false);
					setUserSession(response.data.idToken, response.data.name, response.data._id);
					props.history.push(`/${baseURL}dashboard`);
					ExpenceStore.Retrieve(response.data._id);
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
								<h4>Register new account in to the Expence tracker</h4>
								<Form className="signin-form">
									<Form.Group controlId="email">
										<Form.Label>email</Form.Label>
										<Form.Control
											type="email"
											{...useremail}
											placeholder="Enter email..."
											autoComplete="off"
										/>
									</Form.Group>
									<Form.Group controlId="name">
										<Form.Label>Your Name</Form.Label>
										<Form.Control
											type="text"
											{...username}
											placeholder="Enter name..."
											autoComplete="off"
										/>
									</Form.Group>
									<Form.Group controlId="password">
										<Form.Label>password</Form.Label>
										<Form.Control
											type="password"
											{...password}
											placeholder="Enter password..."
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
										value={loading ? 'Loading...' : 'Signup'}
										onClick={handleRegister}
										disabled={loading}
									>
										Sign Up
									</Button>
								</Form>
								<Link to={`/${baseURL}login`} className="link mt-3">
									Already have an account?
								</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	})
);

Signup.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Signup;
