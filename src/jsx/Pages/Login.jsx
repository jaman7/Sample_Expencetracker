/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { setUserSession } from '../Utils/Common';
import restdbInstance from '../resetdbAPI';
import AccuntDefaults from '../Layout/AccuntDefaults';

const signInSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(4, 'Password is too short - should be 4 chars min')
});

const initialValues = {
	email: '',
	password: ''
};

const Login = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { baseURL } = ExpenceStore;

		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(null);

		const handleLogin = async (values) => {
			setError(null);
			setLoading(true);
			await restdbInstance
				.get(`usersdb?q={"email":"${values.email}","pass":"${values.password}"}`)
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
					if (err.status === 401) setError(err.data.message);
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
								<Formik
									initialValues={initialValues}
									validationSchema={signInSchema}
									onSubmit={(values) => {
										handleLogin(values);
									}}
								>
									{(formik) => {
										const { errors, touched, isValid, dirty } = formik;
										return (
											<Form className="signin-form">
												<div className="form-group">
													<label htmlFor="email">Email</label>
													<Field
														type="email"
														name="email"
														id="email"
														className={`form-control ${
															errors.email && touched.email
																? ' input-error'
																: null
														}`}
													/>
													<ErrorMessage
														name="email"
														component="span"
														className="error"
													/>
												</div>

												<div className="form-group">
													<label htmlFor="password">Password</label>
													<Field
														type="password"
														name="password"
														id="password"
														className={`form-control ${
															errors.email && touched.email
																? ' input-error'
																: null
														}`}
													/>
													<ErrorMessage
														name="password"
														component="span"
														className="error"
													/>
												</div>

												{error && (
													<>
														<small style={{ color: 'red' }}>
															{error}
														</small>
														<br />
													</>
												)}

												<button
													type="submit"
													className="btn btn-primary"
													value={loading ? 'Loading...' : 'Login'}
													disabled={!(dirty && isValid)}
												>
													Sign In
												</button>
											</Form>
										);
									}}
								</Formik>

								<p className="lead mt-3 d-flex flex-column text-center">
									Default login
									<AccuntDefaults />
								</p>

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
